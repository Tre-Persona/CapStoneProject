import React from "react"
import Image404 from "./images/404.png"
import { Container } from 'reactstrap'

const NotFound = () => {
    return(
        <>
            <Container style={{marginTop:"60px"}}>
            
                <h6 >Error 404</h6>
                <br></br>
                <h3>Seem's like you're lost</h3>
            </Container>
            <img src={Image404} id="404" />
        </>
    )
}
export default NotFound