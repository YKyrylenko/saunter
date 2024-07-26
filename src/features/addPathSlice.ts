import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type InitialState = {
  origin: google.maps.LatLngLiteral;
  destination: google.maps.LatLngLiteral;
  waypoints: google.maps.LatLngLiteral[];
  pathLength: number;
};

const initialState: InitialState = {
  origin: {} as google.maps.LatLngLiteral,
  destination: {} as google.maps.LatLngLiteral,
  waypoints: [],
  pathLength: 0,
};

const addPathSlice = createSlice({
  name: "addPath",
  initialState,
  reducers: {
    setPathLength: (
      state: InitialState,
      { payload: pathLength }: PayloadAction<number>
    ) => {
      state.pathLength = pathLength;
    },

    setOrigin: (
      state: InitialState,
      { payload: origin }: PayloadAction<google.maps.LatLngLiteral>
    ) => {
      state.origin = origin;
    },

    setDestination: (
      state: InitialState,
      { payload: destination }: PayloadAction<google.maps.LatLngLiteral>
    ) => {
      state.destination = destination;
    },

    setWaypoints: (
      state: InitialState,
      { payload: waypoints }: PayloadAction<google.maps.LatLngLiteral[]>
    ) => {
      state.waypoints = [...state.waypoints, ...waypoints];
    },

    reset: (state: InitialState) => {
      state.destination = initialState.destination;
      state.origin = initialState.origin;
      state.pathLength = initialState.pathLength;
      state.waypoints = initialState.waypoints;
    },
  },
});

export const { setPathLength, setOrigin, setDestination, setWaypoints, reset } =
  addPathSlice.actions;

export const selectPathOrigin = (state: RootState) => state.addPath.origin;
export const selectPathDestination = (state: RootState) =>
  state.addPath.destination;
export const selectPathWaypoints = (state: RootState) =>
  state.addPath.waypoints;
export const selectPathInfo = (state: RootState) => state.addPath;

export default addPathSlice.reducer;
