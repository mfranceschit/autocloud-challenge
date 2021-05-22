import USStates from '../data/states.json';

/**
 * Search a Region given a coordinate
 * @param lat latitute
 * @param lon longitude
 */
export const locateRegion = (coordinate: { lat: number; lon: number }): string => {
  let region = '';
  let storedDiff;
  for (const state of USStates) {
    const currentCoordinate = state.coordinate;

    const currentDiff = {
      lat: Math.abs(currentCoordinate.lat - coordinate.lat),
      lon: Math.abs(currentCoordinate.lon - coordinate.lon),
    };

    if (!storedDiff) {
      region = state.region;
      storedDiff = currentDiff;
    } else if (currentDiff.lat <= storedDiff.lat && currentDiff.lon <= storedDiff.lon) {
      region = state.region;
      storedDiff = {
        lat: currentDiff.lat,
        lon: currentDiff.lon,
      };
    }
  }

  return region;
};
