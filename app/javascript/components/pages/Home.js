import React from "react"
import { Container, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const Home = props => {
    return (
      <>
        <Container className="home-container">
          <h2 className="home-title">Where accessibility and nature meet</h2>
          <p className="home-text">Here at happy trails, we set out to create a platform that empowers users from all walks of life to go outside and enjoy nature. Our platform encourages our registered users to fill out information regarding the hikes they go on. Users collaboratively discover and archive accessibility data in order to support the wider community.</p>

          {!props.logged_in &&
            <a href={props.sign_in_route}><Button className="home-signup-button">Sign Up</Button></a>
          }

          <h3 className="home-subtitle">Top Trails</h3>

          <NavLink to="/trails"><Button className="home-trails-button">Discover More Trails</Button></NavLink>

        </Container>
      </>
    );
}

export default Home
