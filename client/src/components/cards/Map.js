import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_PLACES_KEY } from "../../config/config";
export default function Map() {
  //-114.057968,51.04731

  const defaultProps = {
    center: {
      lat: 51.04731,
      lng: -114.057968,
    },
    zoom: 11,
  };

  return (
    <div style={{ width: "100%", height: "350px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_PLACES_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        >
        <div lat={51.04731} lng={-114.057968}>
          <span className="lead">📍</span>
        </div>
      </GoogleMapReact>
    </div>
  );
}
