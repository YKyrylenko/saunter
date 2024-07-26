export type Props = {
  markers: google.maps.LatLngLiteral[];
  waypoints: google.maps.LatLngLiteral[];
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  isView?: boolean;
  setMarkers: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral[]>>;
};
