import React, { useState, useEffect } from "react"
import {  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'


const TrailsProfile = (props) => {
 const [currentTrail, setCurrentTrail] = useState({})

useEffect(() => {
  console.log("get trail called")
  getTrail()},[])

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
      </>
    );
}

export default TrailsProfile