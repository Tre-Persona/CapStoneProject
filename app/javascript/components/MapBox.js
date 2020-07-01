import React, { Component } from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';


const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoidHJlcGVyc29uYSIsImEiOiJja2MwdXE4emQwbmFpMnpydWxscXB1eGN2In0.jvnJJL0dHCAi-iSSO1-WTw'
  });


class MapBox extends Component{
constructor(props) {
    super(props);
    this.state = {
    lng: -117.1611,
    lat: 32.7157,
    zoom: 5
    };
    }
// componentDidMount() {
    
//     const map = new ReactMapboxGl.Map({
//         container: this.mapContainer,
//             style: 'mapbox://styles/mapbox/streets-v11',
//             center: [this.state.lng, this.state.lat],
//             zoom: this.state.zoom
//     });
//     }
    render() {
        return (
            <Map
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: '100vh',
              width: '100vw'
            }}
          >
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
              <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            </Layer>
          </Map>
          )}
}
export default MapBox