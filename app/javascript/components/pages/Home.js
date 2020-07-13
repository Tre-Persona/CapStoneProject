import React, { useState, useEffect } from "react"
import { Container, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import HikeHome from '../images/hiking-generic-cropped.jpg'


const Home = props => {
  const [featuredTrails, setFeaturedTrails] = useState([])

  useEffect(() =>{
    getFeaturedTrails()},[])

  async function getFeaturedTrails() {
    try {
      let commentResponse = await fetch('/comments')
      let commentData = await commentResponse.json()
      let commentOnlyArray = []
      if (commentResponse.ok) {
        commentOnlyArray = [...commentData]
      }

      let formResponse = await fetch('/questionnaires')
      let formData = await formResponse.json()
      let actArray = []
      if (formResponse.ok) {
        actArray = [...commentOnlyArray, ...formData]
      }

      let actObject = {}
      actArray.map(value=>{
        if (actObject[value.trail_id] === undefined && value.trail_id !== null) {
          actObject[value.trail_id] = 1
        } else if (actObject[value.trail_id] !== undefined && value.trail_id !== null){
          actObject[value.trail_id] += 1
        }
      })
      
      let actKeys = Object.keys(actObject)
      let sortedActKeys = actKeys.sort((a,b) => {
        if (actObject[a] === actObject[b]) return 0
        else if (actObject[a] > actObject[b]) return -1
        else return 1
      })

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
          <img className="home-jumbotron-image" src={HikeHome} />
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

        <div className="home-featured-trails-wrapper">
          {featuredTrails.map((trail,index) => {
            return(
              <div
              key={index} 
              className="home-trail-card">

                <NavLink className="home-trail-link" to={`/trails/${trail.id}`}>
                  <img className="home-trail-image" src={trail.imgSmallMed} />
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
