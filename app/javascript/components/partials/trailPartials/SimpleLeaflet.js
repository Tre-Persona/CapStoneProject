import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, withLeaflet } from 'react-leaflet'
import LeafletSearch from './LeafletSearch.js'

class SimpleLeaflet extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 32.7157,
      lng: -117.1611,
      zoom: 13,
  }
  }
<<<<<<< HEAD
   render() {
=======

  render() {
>>>>>>> c5500d100c6475dba67cc78e09ddd9ab3ab1d654
    const position = [this.state.lat, this.state.lng]
    const LeafletSearchbox = withLeaflet(LeafletSearch);
    return (
      <Map onclick={this.props.handleClick} center={position} zoom={this.state.zoom}>
        <LeafletSearchbox/>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}
export default SimpleLeaflet