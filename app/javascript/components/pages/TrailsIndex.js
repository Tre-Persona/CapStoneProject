import React, { Component } from "react"
import TrailsSearch from '../partials/TrailsSearch.js'
import SimpleLeaflet from '../partials/SimpleLeaflet.js'

class TrailsIndex extends Component {
  constructor(props){
    super(props)
    this.state={
      lat:null,
      lng:null,
    }
  }
  handleMapClick = (e) => {
    console.log(e)
    this.setState({
      lat:e.latlng.lat,
      lng:e.latlng.lng
    })

} 
render(){
  return (
    <>
      <SimpleLeaflet handleClick={this.handleMapClick.bind(this)} />
      <TrailsSearch lat={this.state.lat} lng={this.state.lng}/>
    </>
  )
  }
} 
export default TrailsIndex
