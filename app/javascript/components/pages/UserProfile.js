import React, { useEffect, useState } from "react"
import { Button, Container } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import Badges from '../partials/userPartials/Badges'
import FavoritesList from '../partials/userPartials/FavoritesList'
import ActivityList from '../partials/userPartials/ActivityList'

const UserProfile = (props) => {
  // Arra of all user's favorited trail objects
  const [favTrails, setFavTrails] = useState([])
  // Array of all user's activity objects
  const [activities, setActivities] = useState([])
  // Conditional for showing empty favorites message
  const [showEmptyFavsMessage, setShowEmptyFavsMessage] = useState(false)
  // Conditional for showing empty activity message
  const [showEmptyActivityMessage, setShowEmptyActivityMessage] = useState(false)

  useEffect(() =>{
    getTrails()
  },[])

  // ---------- CODE TO GRAB FAVORITED TRAILS BY USER ----------
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

      // Fetch all user's comment data
      let commentResponse = await fetch('/users/comments')
      let commentData = await commentResponse.json()
      let commentOnlyArray = []
      if (commentResponse.ok) {
        commentOnlyArray = [...commentData]
      }

      // Fetch all user's form submission data
      let formResponse = await fetch('/users/questionnaires')
      let formData = await formResponse.json()
      let activityArray = []
      if (formResponse.ok) {
        activityArray = [...commentOnlyArray, ...formData]
      }

      // Sort all activity from most recently updated
      let sortedActivities = activityArray.sort((a,b)=>{
        if (a.updated_at === b.updated_at) return 0
        else if (a.updated_at > b.updated_at) return -1
        else return 1
      })

      // If array of activities is zero, show empty message
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
        <div className="dashboard-title-super-wrapper">
          <div className="dashboard-title-left-div"></div>
          <div className="dashboard-title-wrapper">
            <img src="" className="dashboard-avatar" alt="Avatar image of current user." style={{display:"none"}}/>
            <h2 className="page-title dashboard">Your Dashboard</h2>
          </div>
          <a href="/users/edit">
            <Button className="dashboard-settings-button">Settings</Button>
        </a>
        </div>

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