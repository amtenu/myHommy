import GoogleMapReact from "google-map-react";
import { GOOGLE_MAP_PLACES_KEY } from "../../config/config";

const Marker = () => <span className="lead">📍</span>;

export default function Map({ ad }) {
  const defaultProps = {
    center: {
      lat: ad?.location?.coordinates[1],
      lng: ad?.location?.coordinates[0],
    },
    zoom: 12,
  };

  // console.log("Ad object:", ad);
  // console.log("Coordinates array:", ad?.location?.coordinates);
  // console.log("Latitude:", ad?.location?.coordinates?.[1]);
  // console.log("Longitude:", ad?.location?.coordinates?.[0]);
  

  if (ad?.location?.coordinates?.length) {
    return (
      <div style={{ width: "100%", height: "350px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_MAP_PLACES_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <Marker
            lat={ad?.location?.coordinates[1]}
            lng={ad?.location?.coordinates[0]}
          />
        </GoogleMapReact>
      </div>
    
    );
  }

  // You might want to return something in case the coordinates are not available
  return <div>Map not available</div>;
}
