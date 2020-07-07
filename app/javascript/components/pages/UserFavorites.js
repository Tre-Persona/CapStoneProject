import React, { useState, useEffect } from "react"
import { Button, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'


const UserFavorites = props => {
  // Array of trail objects fetched from API
  const [trails, setTrails] = useState([])
  const [showEmptyMessage, setShowEmptyMessage] = useState(false)

  useEffect(() =>{
    getTrails()},[])

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
        if (favData.length === 0) setShowEmptyMessage(true)
      }

      //GET trail data from the API
      if (trailsIdsArray.length > 0) {
        let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailsIdsArray.join(",")}&key=${props.apiKey}`)
        let trailData = await trailResponse.json()
        if(trailResponse.ok) {
          //check the console to make sure we have all the trails
          console.log("data", trailData.trails)
          //populate the newTrails state array with data
          setTrails(trailData.trails)
        }
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
        <Container className="trails-index-container">
          <h2 className="page-title">Your Favorite Trails</h2>
          <ListGroup className="trails-index-list-group">
            {trails.map((trail,index) => {
              return(
                <ListGroupItem key={index} className="trails-index-list-wrapper">

                  <img className="trails-index-list-image" src={trail.imgSmall} />

                  <NavLink className="trails-index-list-link" to={`/trails/${ trail.id }`}>
                    <ListGroupItemHeading className="trails-index-list-title">{trail.name}</ListGroupItemHeading>
                  </NavLink>

                  <ListGroupItemText className="trails-index-list-text">
                    <strong>{trail.location}</strong><br/>
                    {trail.summary}
                  </ListGroupItemText>

                </ListGroupItem>
              )
            })}
          </ListGroup>
          {showEmptyMessage &&
            <p className="favorites-empty-message">You haven't favorited any trails yet.</p>
          }
        </Container>
      </>
    );
}

export default UserFavorites