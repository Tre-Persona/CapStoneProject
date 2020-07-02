import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class SimpleLeaflet extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: 32.7157,
      lng: -117.1611,
      zoom: 13,
  }
  }
 handleMapClick = (e) => {
    alert(e.latlng);
} 
  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map onclick={this.handleMapClick} center={position} zoom={this.state.zoom}>
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