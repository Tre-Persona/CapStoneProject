import React, { useState, useEffect } from "react"
import { Button, Form, FormGroup, Label, Input, Container, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { NavLink } from 'react-router-dom'


const TrailsSearch = (props) => {

  const [newTrails, setNewTrails] = useState([])
  const [newForm, setNewForm] = useState({
    latitude: null,
    longitude: null
  })
  // useEffect(() => {
  //   getTrails()},[])
  const updateCord = () => {
    setNewForm({latitude: props.lat, longitude: props.lng})
  }

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
      console.log("newForm", newForm)
    }
    

      return (
        <>
        <h2>The top 10 local trails</h2>
        <Container>
          <Form>
            <FormGroup>
              <Label htmlFor="latitude">Latitude</Label>
                <Input type="text" name="latitude" value={ newForm.latitude } onChange={ handleChange } placeholder="" />
              <Label htmlFor="longitude">Longitude</Label>
                <Input type="text" name="longitude" value={ newForm.longitude } onChange={ handleChange } placeholder="" />
            </FormGroup>
            <Button onClick={handleSubmit}>Let's Go Hiking</Button>
            <Button onClick={updateCord}>Update Cords</Button>
          </Form>
        </Container>
        </>
      );
    }

    export default TrailsSearch
