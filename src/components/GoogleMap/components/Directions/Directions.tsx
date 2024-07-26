import { FC, useEffect, useState } from "react";
import { Props } from "./types";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useAppDispatch } from "../../../../app/hooks";
import { reset, setPathLength } from "../../../../features/addPathSlice";

import { useSnackbar } from "../../../Snackbar/useSnackbar";

const Directions: FC<Props> = ({
  markers,
  waypoints,
  origin,
  destination,
  isView = false,
  setMarkers,
}) => {
  const { showSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");

  const [directionService, setDirectionService] =
    useState<google.maps.DirectionsService>();
  const [directionRenderer, setDirectionRenderer] =
    useState<google.maps.DirectionsRenderer>();

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
        draggable: false,
      })
    );
  }, [map, routesLibrary]);

  useEffect(() => {
    if (!directionService || !directionRenderer || markers.length < 2) return;
    const route = async () => {
      try {
        const result = await directionService.route({
          origin,
          destination,
          travelMode: google.maps.TravelMode.WALKING,
          waypoints: waypoints.map((waypoint) => ({
            location: {
              lat: waypoint.lat,
              lng: waypoint.lng,
            },
          })),
          avoidTolls: true,
        });

        directionRenderer.setDirections(result);

        const routeLength = result.routes[0].legs.reduce(
          (prevValue, currentValue) => {
            return prevValue + currentValue?.distance?.value!;
          },
          0
        );

        if (!isView) {
          dispatch(setPathLength(routeLength));
        }
      } catch (err: unknown) {
        if (err instanceof google.maps.MapsRequestError) {
          if (err.code === google.maps.DirectionsStatus.ZERO_RESULTS) {
            setMarkers([]);
            dispatch(reset());
            showSnackbar("No route could be found. Select a new path");
          }
        }
      }
    };

    route();
  }, [
    directionService,
    directionRenderer,
    origin,
    destination,
    waypoints,
    markers,
    setMarkers,
    dispatch,
    showSnackbar,
    isView,
  ]);

  return null;
};

export default Directions;
