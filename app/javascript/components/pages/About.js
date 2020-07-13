import React from "react"
import { Container } from 'reactstrap'
import Dogs from '../images/tre-persona-dogs.jpg'


const About = () => {
 
    return (
      <Container className="about-container"> 
        <h2 className="page-title">About Tre Persona</h2>
        <p className="about-text">Tre Presona is captured in dog spirit form from left to right below: Austin Walker (Sheldon), Jeremy Gabriel (Bud), and Chrissie Akau (Parker).  Austin, Jeremy, and Chrissie met while attending LEARN Academy and share a love of coding, the outdoors, and making the world a better place. Austin has big ideas and original ways to implement them.  Chrissie has vision and a creative eye for details.  Jeremy has focus and logic that helps ground these ideas and vision into reality.  Their personal strengths combined with a mutual respect and trust amongst each other make up the legendary team, Tre Persona.</p>
        <img className="about-image" alt="Image of Tre Persona" src={Dogs} />
      </Container>
    );
}

export default About