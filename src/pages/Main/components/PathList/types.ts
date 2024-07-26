export type Path = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  isFavorite: boolean;
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  waypoints: google.maps.LatLngLiteral[];
  pathLength: number;
};

export type Props = {
  paths: Path[];
  selectedPathId: string;
  onSelectPath: (id: string) => () => void;
};
