import React, { useEffect, useState } from "react"
import { Button, Container } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import Badges from '../partials/user/Badges'
import FavoritesList from '../partials/user/FavoritesList'
import ActivityList from '../partials/user/ActivityList'


const UserProfile = (props) => {
  const [favTrails, setFavTrails] = useState([])
  const [activity, setActivity] = useState([])

  useEffect(() =>{
    getTrails()
    console.log(props.user_id)
    console.log(props.match.params.id)
  },[])

  async function getTrails() {
    try {
      // Fetch JSON of favorites specific to current user
      let favResponse = await fetch('/favorites')
      let favData = await favResponse.json()
      // Declare array to hold only favorited Ids to be used in trail fetch call
      let trailsIdsArray
      if(favResponse.ok) {
        console.log("favData:", favData)
        // Create array of just the ids of the trails favorited by current user
        trailsIdsArray = favData.map(value=>value.fav_trail_id)
        console.log("Fav trail Ids:", trailsIdsArray)
      }

      //GET trail data from the API
      let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailsIdsArray.join(",")}&key=200805451-d58078a69001bb6f37cb92b68bbebae3`)
      let trailData = await trailResponse.json()
      if(trailResponse.ok) {
        //check the console to make sure we have all the trails
        console.log("data", trailData.trails)
        //populate the newTrails state array with data
        setFavTrails(trailData.trails)
      }

      let activityResponse = await fetch('/users/comments')
      let activityData = await activityResponse.json()
      if (activityResponse.ok) {
        let sortedData = activityData.sort((a,b)=>{
          if (a.updated_at === b.updated_at) return 0
          else if (a.updated_at > b.updated_at) return -1
          else return 1
        })
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
      <Container>
        <h2>Your Dashboard</h2>
        <h4> Hello {props.user_name}</h4>

        <NavLink to={`/user/${props.match.params.id}/settings`}>
          <Button>Settings</Button>
        </NavLink>

        <FavoritesList 
          user_id={props.match.params.id}
          favTrails={favTrails}
        />

        <Badges 
          user_id={props.user_id}
        />

        <ActivityList 
          user_id={props.match.params.id}
          activity={activity}
        />

      </Container>
    </>
  );
}

export default UserProfile
