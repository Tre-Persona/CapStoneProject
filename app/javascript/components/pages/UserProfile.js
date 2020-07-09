import React, { useEffect, useState } from "react"
import { Button, Container } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import Badges from '../partials/userPartials/Badges'
import FavoritesList from '../partials/userPartials/FavoritesList'
import ActivityList from '../partials/userPartials/ActivityList'


const UserProfile = (props) => {
  const [favTrails, setFavTrails] = useState([])
  const [activity, setActivity] = useState([])
  const [showEmptyFavsMessage, setShowEmptyFavsMessage] = useState(false)
  const [showEmptyActivityMessage, setShowEmptyActivityMessage] = useState(false)

  useEffect(() =>{
    getTrails()
    console.log(props.user_id)
    console.log(props.match.params.id)
    console.log("props:",props)
  },[])

  async function getTrails() {
    try {
      // Fetch JSON of favorites specific to current user
      let favResponse = await fetch('/favorites')
      let favData = await favResponse.json()
      // Declare array to hold only favorited Ids to be used in trail fetch call
      let trailsIdsArray = []
      if(favResponse.ok) {
        console.log("favData:", favData)
        // Create array of just the ids of the trails favorited by current user
        trailsIdsArray = favData.map(value=>value.fav_trail_id)
        console.log("Fav trail Ids:", trailsIdsArray)
        if (favData.length === 0) setShowEmptyFavsMessage(true)
      }

      //GET trail data from the API
      if (trailsIdsArray.length > 0) {
        let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailsIdsArray.join(",")}&key=${props.apiKey}`)
        let trailData = await trailResponse.json()
        if(trailResponse.ok) {
          //check the console to make sure we have all the trails
          console.log("data", trailData.trails)
          //populate the newTrails state array with data
          setFavTrails(trailData.trails)
        }
      }

      let activityResponse = await fetch('/users/comments')
      let activityData = await activityResponse.json()
      if (activityResponse.ok) {
        let sortedData = activityData.sort((a,b)=>{
          if (a.updated_at === b.updated_at) return 0
          else if (a.updated_at > b.updated_at) return -1
          else return 1
        })
        if (sortedData.length === 0) setShowEmptyActivityMessage(true)
        setActivity(sortedData)
        console.log("sorted Activity Data", sortedData)
      }
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
        <img src={props.avatar}/>

        <NavLink to={`/user/${props.match.params.id}/settings`}>
            <Button className="dashboard-settings-button">Settings</Button>
        </NavLink>

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
            activity={activity}
            showEmptyActivityMessage={showEmptyActivityMessage}
          />
        </div>
      </Container>
    </>
  );
}

export default UserProfile