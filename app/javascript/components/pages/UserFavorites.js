import React, { useState, useEffect } from "react"
import { Button, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'


const UserFavorites = props => {
  // Array of trail objects fetched from API
  const [trails, setTrails] = useState([])

  useEffect(() =>{
    getTrails()},[])

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
        setTrails(trailData.trails)
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
          <h2>User Favorites</h2>
          <ListGroup>
            {trails.map((trail,index) => {
              return(
                <ListGroupItem>
                  <NavLink to={`/trails/${ trail.id }`}>
                    <ListGroupItemHeading>{trail.name}</ListGroupItemHeading>
                  </NavLink>
                  <img src={trail.imgSmall} />
                  <ListGroupItemText>
                  {trail.summary}
                  </ListGroupItemText>
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </Container>
      </>
    );
}

export default UserFavorites
