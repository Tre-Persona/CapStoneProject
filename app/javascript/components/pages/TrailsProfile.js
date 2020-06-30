import React, { useState, useEffect } from "react"
import {  Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'


const TrailsProfile = (props) => {
 const [currentTrail, setCurrentTrail] = useState({})
 const [favorited, setFavorited] = useState(false)
 // Array of just trail Ids favorited by the current user
 const [favTrailIds, setFavTrailIds] = useState([])
 // Favorite model id of the current trail showing (if favorited)
 const [favId, setFavId] = useState()

useEffect(() => {
  console.log("get trail called")
  getTrail()},[])

const handleFavorite = (e) =>{
    e.preventDefault()
    addToFavorites()
    console.log("id", props.match.params.id)
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
    }
  })
  .then(() => {
    getTrail()
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
    }
  })
  .then(() => {
    getTrail()
  })
}

  async function getTrail() {
    try {
      // Fetch JSON of favorites specific to current user
      let favResponse = await fetch('/favorites')
      let favData = await favResponse.json()
      // Declare array to hold only favorited Ids to be used in both if-statements below
      let trailsIdsArray
      if(favResponse.ok) {
        console.log("favData:", favData)
        favData.map(value=> {
          // Determine the favorite id (for use in the favorite delete call) if current trail is currently favorited
          if (value.fav_trail_id == props.match.params.id) setFavId(value.id)
        })
        // Create array of just the ids of the trails favorited by current user
        trailsIdsArray = favData.map(value=>value.fav_trail_id)
        console.log("Fav trail Ids:", trailsIdsArray)
        setFavTrailIds(trailsIdsArray)
      }

      //GET data from the API
      let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${props.match.params.id}&key=200805451-d58078a69001bb6f37cb92b68bbebae3`)
      let trailData = await trailResponse.json();
        //all good?
      if(trailResponse.ok) {
        //check the console to make sure we have all the trails
        console.log("trailData", trailData.trails[0])
        //populate the newTrails state array with trailData
        setCurrentTrail(trailData.trails[0])
        // Upon mounting the page, if the current trail id is one of the favorited ids of the current user, set Favorited to true
        if (trailsIdsArray.includes(trailData.id)) setFavorited(true)
      }
      } catch (err) {
        console.log(err)
      }
    }
    return (
      <>
            <ListGroup>
            { currentTrail &&
                <ListGroupItem>
                  <ListGroupItemHeading>{currentTrail.name}</ListGroupItemHeading>

                  <img src={currentTrail.imgSmall} />

                  <ListGroupItemText>
                    {currentTrail.summary}
                  </ListGroupItemText>

                  <ListGroupItemText>
                    Current Trail Conditions for {currentTrail.conditionDate}:&nbsp;
                    { currentTrail.conditionDetails} and {currentTrail.conditionStatus}
                  </ListGroupItemText>
                </ListGroupItem>
            }
          </ListGroup>
          {/*Conditional render for how the favorite button looks between toggles*/}
          <Button color={favorited? "success" : "secondary"} onClick={handleFavorite}>
            {favorited && "Unfavorite"}
            {!favorited && "Favorite"}
          </Button>

      </>
    );
}

export default TrailsProfile
