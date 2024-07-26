export const metersToKilometers = (meters: number) => {
  return meters < 1000 ? `${meters} m` : `${(meters / 1000).toFixed(2)} km`;
};
