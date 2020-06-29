import React, { useState, useEffect } from "react"
import { Button, Form, FormGroup, Label, Input, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const TrailsIndex = () => {

  const [newTrails, setNewTrails] = useState([])
  const [newForm, setNewForm] = useState({
    latitude: "",
    longitude: ""
  })
  // useEffect(() => {
  //   getTrails()},[])

    const handleChange = (e) =>{
      setNewForm({
        ...newForm,
        [e.target.name]: e.target.value
      })
    }
    const handleSubmit = (e) =>{
      e.preventDefault()
      getTrails()
      console.log("newTrails", newTrails);
    }
    async function getTrails() {
      try {
        //GET data from the backend
        let response = await fetch(`https://www.hikingproject.com/data/get-trails?lat=${ newForm.latitude }&lon=${ newForm.longitude }&maxDistance=10&key=200805451-d58078a69001bb6f37cb92b68bbebae3`)
          let data = await response.json();
          //all good?
          if(response.status === 200) {
            //check the console to make sure we have all the trails
            console.log("data", data.trails)
            //populate the newTrails state array with data
            setNewTrails(data.trails)
          }
        } catch (err) {
          console.log(err)
        }
      }

      return (
        <>
        <h2>All of the Fancy Trails</h2>
        <Container>
          <Form>
            <FormGroup>
              <Label htmlFor="latitude">Latitude</Label>
                <Input type="text" name="latitude" value={ newForm.latitude } onChange={ handleChange } placeholder="" />
              <Label htmlFor="longitude">Longitude</Label>
                <Input type="text" name="longitude" value={ newForm.longitude } onChange={ handleChange } placeholder="" />
            </FormGroup>
            <Button onClick={handleSubmit}>Let's Go Hiking</Button>
          </Form>
          <ListGroup>
            { newTrails.map((trail, index) => {
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

    export default TrailsIndex
