import React, { useState, useEffect } from "react"
import { Container, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import HikeHome from '../images/hiking-generic-cropped.jpg'


const Home = props => {
  const [featuredTrails, setFeaturedTrails] = useState([])

  useEffect(() =>{
    getTrendingTrails()},[])

  // ---------- CODE FOR POPULATING TOP 4 MOST ACTIVE TRAILS ----------
  async function getTrendingTrails() {
    try {
      // Fetch all comment data
      let commentResponse = await fetch('/comments')
      let commentData = await commentResponse.json()
      let commentOnlyArray = []
      if (commentResponse.ok) {
        commentOnlyArray = [...commentData]
      }

      // Fetch all form submission data
      let formResponse = await fetch('/questionnaires')
      let formData = await formResponse.json()
      let actArray = []
      if (formResponse.ok) {
        actArray = [...commentOnlyArray, ...formData]
      }
      
      // Create object containing tally of every trail id
      let actObject = {}
      actArray.map(value=>{
        if (actObject[value.trail_id] === undefined && value.trail_id !== null) {
          actObject[value.trail_id] = 1
        } else if (actObject[value.trail_id] !== undefined && value.trail_id !== null){
          actObject[value.trail_id] += 1
        }
      })
      
      // Sort from descending order the trail ids
      let actKeys = Object.keys(actObject)
      let sortedActKeys = actKeys.sort((a,b) => {
        if (actObject[a] === actObject[b]) return 0
        else if (actObject[a] > actObject[b]) return -1
        else return 1
      })

      // Fetch trail data from the top 4 trail ids  
      let trailResponse = await fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${`${sortedActKeys[0]},${sortedActKeys[1]},${sortedActKeys[2]},${sortedActKeys[3]},`}&key=${props.apiKey}`)
      let trailData = await trailResponse.json()
      if(trailResponse.ok) {
        setFeaturedTrails(trailData.trails)
      }
    } catch (err) {
        console.log(err)
      }
  }

  return (
    <>
      <Container className="home-container">
        <div className="home-jumbotron-wrapper">
          <img className="home-jumbotron-image" src={HikeHome} alt="Large image of hiking trail in display on home page." />
          <div className="home-jumbotron-text-box">
            <h2 className="home-jumbotron-title">Where accessibility and nature meet</h2>
            <p className="home-jumbotron-text">Here at happy trails, we set out to create a platform that empowers users from all walks of life to go outside and enjoy nature. Our platform encourages our registered users to fill out information regarding the hikes they go on. Users collaboratively discover and archive accessibility data in order to support the wider community.</p>

            {props.logged_in &&
              <NavLink to={`/user/${props.user_id}`}><Button className="home-jumbotron-button">Go to Dashboard</Button></NavLink>
            }

            {!props.logged_in &&
              <a href={props.sign_up_route}><Button className="home-jumbotron-button">Sign Up</Button></a>
            }
          </div>
        </div>

        <h3 className="home-subtitle">Trending Trails</h3>
        <label className="home-label">Current trails with most active contributions.</label>

        <div className="home-featured-trails-wrapper">
          {featuredTrails.map((trail,index) => {
            return(
              <div
              key={index} 
              className="home-trail-card">

                <NavLink className="home-trail-link" to={`/trails/${trail.id}`}>
                  <img className="home-trail-image" src={trail.imgSmallMed} alt={`Image of ${trail.name}.`} />
                </NavLink>

                <div className="home-trail-text-box">
                  <NavLink className="home-trail-link" to={`/trails/${trail.id}`}>
                    <h6 className="home-trail-title">{trail.name}</h6>
                  </NavLink>

                  <p className="home-trail-location">
                    {trail.location}
                  </p>
                  <p className="home-trail-summary">
                    {trail.summary}
                  </p>
                </div>
                
              </div>
            )
          })}
        </div>


        <NavLink to="/trails"><Button className="home-trails-button">Discover More Trails</Button></NavLink>

      </Container>
    </>
  );
}

export default Home
