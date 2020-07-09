import React, { useState, useEffect } from "react"
import CommentIndex from './CommentIndex'
import TrailDisplay from '../partials/trailPartials/TrailDisplay.js'
import { Container, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom';


const TrailsProfile = (props) => {
  const [currentTrail, setCurrentTrail] = useState({})
  // Conditional rendering for the favorite button styling
  const [favorited, setFavorited] = useState(false)
  // Favorite model id of the current trail showing (if favorited)
  const [favId, setFavId] = useState()

  useEffect(() => {
    getTrail()
 },[])

  const handleFavorite = () =>{
    if (favorited) {
      removeFromFavorites()
    } else {
      addToFavorites()
    }
  }

  const addToFavorites = () => {
    fetch('/favorites', {
      body: JSON.stringify({fav_trail_id: props.match.params.id}),
      headers:{
        "Content-Type": "application/json"
      },
      method: "POST"
    })
    .then(response => {
      if (response.ok) {
        // If favorite post request is successful, set favorited to true
        setFavorited(true)
        // Refresh the API call after favoriting action
        getTrail()
      }
    })
  }

  const removeFromFavorites = () => {
    fetch(`/favorites/${favId}`, {
      headers:{
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        // If favorite delete request is successful, set favorited to false
        setFavorited(false)
        // Refresh the API call after delete action
        getTrail()
      }
    })
  }

  async function getTrail() {
    try {
      // Declare array to hold only favorited Ids to be used in both if-statements below
      let trailsIdsArray = []
      if (props.logged_in) {
        // Fetch JSON of favorites specific to current user
        let favResponse = await fetch('/favorites')
        let favData = await favResponse.json()
        
        if(favResponse.ok) {
          console.log("favData:", favData)
          favData.map(value=> {
            // Determine the favorite id (for use in the favorite delete call) if current trail is currently favorited
            if (value.fav_trail_id == props.match.params.id) {
              setFavId(value.id)
            }
          })
          // Create array of just the ids of the trails favorited by current user
          trailsIdsArray = favData.map(value=>value.fav_trail_id)
          console.log("Fav trail Ids:", trailsIdsArray)
        }
      }

      //GET data from the API
      let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${props.match.params.id}&key=${props.apiKey}`)
      let trailData = await trailResponse.json()
        //all good?
      if(trailResponse.ok) {
        //check the console to make sure we have all the trails
        console.log("trailData", trailData.trails[0])
        //populate the newTrails state array with trailData
        setCurrentTrail(trailData.trails[0])
        // Upon rednering the component, if the current trail id is one of the favorited ids of the current user, set Favorited to true
        if (trailsIdsArray.includes(trailData.trails[0].id)) {
          setFavorited(true)
        }
      }
    } catch (err) {
        console.log(err)
      }
  }

    return (
      <>
        <Container className="trail-profile-container">
          <TrailDisplay
            currentTrail={currentTrail}
            favorited={favorited}
            handleFavorite={handleFavorite}
            logged_in={props.logged_in}
          />
          <NavLink to={`/trails/${props.match.params.id}/questionnaire`} ><Button color="success">Click To Fill Out Questionnaire</Button></NavLink>
          <CommentIndex 
            trail_id={props.match.params.id}
            user_name={props.user_name}
            user_id={props.user_id}
            trail_name={currentTrail.name}
            logged_in={props.logged_in}
            avatar={props.avatar}
          />
        </Container>
      </>
    );
}

export default TrailsProfile;