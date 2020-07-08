import React, { Component } from "react"
import { Container } from 'reactstrap'
import SimpleLeaflet from '../partials/trailPartials/SimpleLeaflet.js'
import TrailList from '../partials/trailPartials/TrailList.js'

class TrailsIndex extends Component {
  constructor(props){
    super(props)
    this.state={
      trails: [],
    }
  }
handleMapClick = (e) => {
    console.log(e)
    this.getTrails(e.latlng.lat,e.latlng.lng)
} 
handleMoveend = (e) =>{
  console.log("this is the handle move end", e)
  
  
  // this.getTrails(e.latlng.lat,e.latlng.lng)
    //if marker exits 
    //then find LatLng
    //else
}

getTrails = async(lat,lng) => {
  try {
    //GET data from the backend
    let response = await fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lng}&maxDistance=30&minStars=3&sort=distance&key=${this.props.apiKey}`)
      let data = await response.json();
      if(response.status === 200) {
        //check the console to make sure we have all the trails
        console.log("data", data.trails)
        //populate the newTrails state array with data
        this.setState({ trails: data.trails })
      }
    } catch (err) {
      console.log(err)
    }
  }
render(){
  
  return (
    <>
      <Container className="trails-index-container">
        <h2 className="page-title">Search Trails</h2>
        <SimpleLeaflet handleClick={this.handleMapClick.bind(this)} handleMoveend={this.handleMoveend.bind(this)} />
        <TrailList trails={this.state.trails}/>
      </Container>
    </>
  )
  }
} 
export default TrailsIndex
