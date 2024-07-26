import React, { FC, useState } from "react";
import {
  APIProvider,
  Map,
  MapMouseEvent,
  Marker,
} from "@vis.gl/react-google-maps";
import Directions from "./components/Directions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectPathDestination,
  selectPathOrigin,
  selectPathWaypoints,
  setDestination,
  setOrigin,
  setWaypoints,
} from "../../features/addPathSlice";
import { Props } from "./types";

const position = {
  lat: 49.4413,
  lng: 32.0643,
};

const GoogleMap: FC<Props> = ({
  pathDestination,
  pathOrigin,
  pathMarks = [],
  pathWaypoints = [],
  isView = false,
}) => {
  const dispatch = useAppDispatch();

  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
  const origin = useAppSelector(selectPathOrigin);
  const destination = useAppSelector(selectPathDestination);
  const waypoints = useAppSelector(selectPathWaypoints);

  const mapOnClick = (event: MapMouseEvent) => {
    if (isView) return;

    const { latLng } = event.detail;

    if (latLng) {
      switch (markers.length) {
        case 0:
          dispatch(setOrigin(latLng));
          break;
        case 1:
          dispatch(setDestination(latLng));
          break;
        default:
          if (destination) {
            dispatch(setDestination(latLng));
            dispatch(setWaypoints([destination]));
          }
          break;
      }
      setMarkers((prevValue) => {
        return [...prevValue, latLng];
      });
    }
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
      <Map
        defaultZoom={9}
        defaultCenter={position}
        disableDefaultUI
        onClick={mapOnClick}
      >
        {markers.length === 1 &&
          markers.map((marker) => (
            <Marker position={marker} key={marker.lat} />
          ))}

        {origin && destination && (
          <Directions
            origin={
              Object.values(origin).length
                ? origin
                : pathOrigin || ({} as google.maps.LatLngLiteral)
            }
            destination={
              Object.values(destination).length
                ? destination
                : pathDestination || ({} as google.maps.LatLngLiteral)
            }
            waypoints={waypoints.length ? waypoints : pathWaypoints}
            markers={markers.length ? markers : pathMarks}
            isView={isView}
            setMarkers={setMarkers}
          />
        )}
      </Map>
    </APIProvider>
  );
};

export default GoogleMap;
