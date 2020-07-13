import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, withLeaflet } from "react-leaflet";
import LeafletSearch from "./LeafletSearch.js";

class SimpleLeaflet extends Component {
  //passing methods as props into class SimpleLeaflet
  constructor(props) {
    super(props);
    this.state = {
      //cooridinates for San Diego to start
      lat: 32.7157,
      lng: -117.1611,
      zoom: 13,
    };
  }
  render() {
    const position = [this.state.lat, this.state.lng];

    const LeafletSearchbox = withLeaflet(LeafletSearch);
    return (
      //pass in handle click and map render locations
      <Map
        onclick={this.props.handleClick}
        onMoveend={this.props.handleMoveend}
        center={position}
        zoom={this.state.zoom}
        onLocationfound={this.props.handleMoveend}
      >
        <LeafletSearchbox />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    );
  }
}
export default SimpleLeaflet;
