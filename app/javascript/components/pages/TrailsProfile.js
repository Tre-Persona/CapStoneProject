import React, { useState, useEffect } from "react"
import {  Button, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'


const TrailsProfile = (props) => {
 const [currentTrail, setCurrentTrail] = useState({})
 const [favorited, setFavorited] = useState(false)
 const [trailID, setTrailID] = useState(props.match.params.id)

useEffect(() => {
  console.log("get trail called")
  getTrail()},[])

const handleFavorite = (e) =>{
    e.preventDefault()
    addToFavorites({fav_trail_id: 7022523})
    console.log("id", props.match.params.id)
}

const addToFavorites = (id) => {
  fetch('/favorites', {
    body: JSON.stringify(id),
    headers:{
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  .then(response => {
    if (response.ok) {
      setFavorited(true)
    }
  })
  .then(() => {
    getTrail()
  })
}

  async function getTrail() {
    try {
      //GET data from the backend
      let response = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${props.match.params.id}&key=200805451-d58078a69001bb6f37cb92b68bbebae3`)
        let data = await response.json();
        //all good?
        if(response.status === 200) {
          //check the console to make sure we have all the trails
          console.log("data", data.trails[0])
          //populate the newTrails state array with data
          setCurrentTrail(data.trails[0])
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
          <Button onClick={handleFavorite}>Favorite</Button>
          
      </>
    );
}

export default TrailsProfile