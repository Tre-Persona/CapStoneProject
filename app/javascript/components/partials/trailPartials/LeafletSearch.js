import { Map, TileLayer, Marker, MapControl, Popup, withLeaflet } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

class LeafletSearch extends MapControl {
  createLeafletElement() {
    //imported pulgin that provides a search bar using a built in API request from OpenStreetMaps
    const provider = new OpenStreetMapProvider();
    console.log(provider)
    return GeoSearchControl({ provider: provider });
    
  }
}
export default LeafletSearch