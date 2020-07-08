import React, { useState, useEffect } from "react"
import { Button, Container } from 'reactstrap'
import { NavLink, Redirect } from 'react-router-dom'
import TrailSqDefault from '../images/trail-image-square-default.jpg'


const UserFavorites = props => {
  // Array of trail objects fetched from API
  const [trails, setTrails] = useState([])
  const [showEmptyMessage, setShowEmptyMessage] = useState(false)

  useEffect(() => {
    getTrails()
  }, [])

  async function getTrails() {
    try {
      // Fetch JSON of favorites specific to current user
      let favResponse = await fetch('/favorites')
      let favData = await favResponse.json()
      // Declare array to hold only favorited Ids to be used in trail fetch call
      let trailsIdsArray = []
      if (favResponse.ok) {
        console.log("favData:", favData)
        // Create array of just the ids of the trails favorited by current user
        trailsIdsArray = favData.map(value => value.fav_trail_id)
        console.log("Fav trail Ids:", trailsIdsArray)
        if (favData.length === 0) setShowEmptyMessage(true)
      }

      //GET trail data from the API
      if (trailsIdsArray.length > 0) {
        let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${trailsIdsArray.join(",")}&key=${props.apiKey}`)
        let trailData = await trailResponse.json()
        if (trailResponse.ok) {
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
        <div className="trails-index-list-group">
          {trails.map((trail, index) => {
            return (
              <div key={index} className="trails-index-list-wrapper">

                {trail.imgSmallMed === "" &&
                  <NavLink to={`/trails/${trail.id}`}>
                    <img alt={`Image opens trail profile for ${trail.name}.`} className="trails-index-list-image" src={TrailSqDefault} />
                  </NavLink>
                }

                {trail.imgSmallMed.length > 0 &&
                  <NavLink to={`/trails/${trail.id}`}>
                    <img alt={`Image opens trail profile for ${trail.name}.`} className="trails-index-list-image" src={trail.imgSmallMed} />
                  </NavLink>
                }

                <div className="trails-index-list-text-box">
                  <div className="trails-index-list-text-wrapper">
                    <NavLink className="trails-index-list-link" to={`/trails/${trail.id}`}>
                      <h4 className="trails-index-list-title">{trail.name}</h4>
                    </NavLink>

                    <p className="trails-index-list-location">
                      {trail.location}
                    </p>
                    {typeof trail.length === "number" &&
                      <div className="trails-index-list-length-wrapper">
                        <p className="trails-index-list-length">
                          {trail.length} mi long
                        </p>
                      </div>
                    }
                    <p className="trails-index-list-summary">
                      {trail.summary}
                    </p>
                  </div>
                  <div className="trails-index-list-button-wrapper">
                    <NavLink to={`/trails/${trail.id}`}>
                      <Button className="trails-index-list-button" aria-label={`Button opens trail profile for ${trail.name}.`}>
                        More Info
                        </Button>
                    </NavLink>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
        {showEmptyMessage &&
          <p className="favorites-empty-message">You haven't favorited any trails yet.</p>
        }
      </Container>
    </>
  );
}

export default UserFavorites