import React, { useEffect, useState } from "react"
import { Button, Container } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import Badges from '../partials/userPartials/Badges'
import FavoritesList from '../partials/userPartials/FavoritesList'
import ActivityList from '../partials/userPartials/ActivityList'


const UserProfile = (props) => {
  const [favTrails, setFavTrails] = useState([])
  const [activities, setActivities] = useState([])
  const [showEmptyFavsMessage, setShowEmptyFavsMessage] = useState(false)
  const [showEmptyActivityMessage, setShowEmptyActivityMessage] = useState(false)

  useEffect(() =>{
    getTrails()
  },[])

  async function getTrails() {
    try {
      // Fetch JSON of favorites specific to current user
      let favResponse = await fetch('/favorites')
      let favData = await favResponse.json()
      // Declare array to hold only favorited Ids to be used in trail fetch call
      let trailsIdsArray = []
      if(favResponse.ok) {
        // Create array of just the ids of the trails favorited by current user
        trailsIdsArray = favData.map(value=>value.fav_trail_id)
        if (favData.length === 0) setShowEmptyFavsMessage(true)
      }

      //GET trail data from the API
      if (trailsIdsArray.length > 0) {
        let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailsIdsArray.join(",")}&key=${props.apiKey}`)
        let trailData = await trailResponse.json()
        if(trailResponse.ok) {
          //populate the newTrails state array with data
          setFavTrails(trailData.trails)
        }
      }

      let commentResponse = await fetch('/users/comments')
      let commentData = await commentResponse.json()
      let commentOnlyArray = []
      if (commentResponse.ok) {
        commentOnlyArray = [...commentData]
      }

      let formResponse = await fetch('/users/questionnaires')
      let formData = await formResponse.json()
      let activityArray = []
      if (formResponse.ok) {
        activityArray = [...commentOnlyArray, ...formData]
      }

      let sortedActivities = activityArray.sort((a,b)=>{
        if (a.updated_at === b.updated_at) return 0
        else if (a.updated_at > b.updated_at) return -1
        else return 1
      })

      if (sortedActivities.length === 0) setShowEmptyActivityMessage(true)
      setActivities(sortedActivities)

    } catch (err) {
        console.log(err)
      }
  }

  return (
    <>
      {props.user_id != props.match.params.id &&
        <Redirect to="/" />
      }
      <Container className="dashboard-container">
        <h2 className="page-title">Your Dashboard</h2>

        <a href={`/users/edit`}>
            <Button className="dashboard-settings-button">Settings</Button>
        </a>

        <div className="dashboard-content-wrapper">
          <h4 className="dashboard-greeting"> Hello {props.user_name}!</h4>

          <FavoritesList 
            user_id={props.match.params.id}
            favTrails={favTrails}
            showEmptyFavsMessage={showEmptyFavsMessage}
          />

          <NavLink to="/trails">
            <Button className="dashboard-trails-button">Discover More Trails</Button>
          </NavLink>

          <Badges 
            user_id={props.user_id}
          />

          <ActivityList 
            user_id={props.match.params.id}
            activities={activities}
            showEmptyActivityMessage={showEmptyActivityMessage}
          />
        </div>
      </Container>
    </>
  );
}

export default UserProfile