import React, { useState, useEffect } from "react"
import CommentIndex from './CommentIndex'
import TrailDisplay from '../partials/trailPartials/TrailDisplay.js'
import { Container } from 'reactstrap'


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
      if (props.loggedIn) {
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
      let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${props.match.params.id}&key=200805451-d58078a69001bb6f37cb92b68bbebae3`)
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
        <Container>
          <TrailDisplay
            currentTrail={currentTrail}
            favorited={favorited}
            handleFavorite={handleFavorite}
            loggedIn={props.loggedIn}
          />
          <CommentIndex 
            trail_id={props.match.params.id}
            user_name={props.user_name}
            user_id={props.user_id}
            trail_name={currentTrail.name}
            loggedIn={props.loggedIn}
          />
        </Container>
      </>
    );
}

export default TrailsProfile;