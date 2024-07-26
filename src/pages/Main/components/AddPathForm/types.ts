import { Path } from "../PathList/types";

export type FormValues = {
  title: string;
  description: string;
  fullDescription: string;
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
};

export type Props = {
  close: () => void;
};
