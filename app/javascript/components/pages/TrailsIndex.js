import React, { useState, useEffect } from "react"
import { Button, Form, FormGroup, Label, Input, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'


const TrailsIndex = () => {

  const [newTrails, setNewTrails] = useState([])
  const [newForm, setNewForm] = useState({
    latitude: "",
    longitude: ""
  })
  useEffect(() => {
    getTrails()},[])

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
        let response = await fetch(`https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200805451-d58078a69001bb6f37cb92b68bbebae3`)
          let data = await response.json();
          //all good?
          if(response.status === 200) {
            //check the console to make sure we have all the cats
            console.log("data", data)
            //populate the newCats state array with data
            setNewTrails(data)

          }
        } catch (err) {
          console.log(err)
        }
      }

      return (
        <>
        <h2>All of the fancy trails</h2>
        <Container>

          <Form>
            <FormGroup>
              <Label htmlFor="latitude">Latitude</Label>

              <Input type="text" name="latitude" value={ newForm.latitude } onChange={ handleChange } placeholder="" />

              <Label htmlFor="longitude">Longitude</Label>

              <Input type="text" name="longitude" value={ newForm.longitude } onChange={ handleChange } placeholder="" />
            </FormGroup>
            <Button onClick={handleSubmit}>Lets Go Hiking</Button>
          </Form>
          <ListGroup>
          { newTrails.map((trail, index) => {
            return(

              <ListGroupItem >
                <ListGroupItemHeading>{trail.name}</ListGroupItemHeading>
                <img src={trail.imgSqSmall} />
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
