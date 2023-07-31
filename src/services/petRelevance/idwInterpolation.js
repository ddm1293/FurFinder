import { computeDistanceBetween, convertLatLng } from 'spherical-geometry-js';

const getDistance = (from, to) => {
  const dist = computeDistanceBetween(convertLatLng(from), convertLatLng(to));
  console.log('see from and to and dist : ', convertLatLng(from).toString(), convertLatLng(to).toString(), dist);
  return computeDistanceBetween(convertLatLng(from), convertLatLng(to));
};

export const idwInterpolation = (point, referencePoints, p) => {
  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < referencePoints.length; i++) {
    const distance = getDistance(point, referencePoints[i].coordinates);
    if (distance === 0) {
      return referencePoints[i].value;
    }
    const weight = 1 / Math.pow(distance, p);
    numerator += weight * referencePoints[i].value;
    denominator += weight;
  }
  const idw = numerator / denominator;
  console.log('see idw: ', idw);
  return idw;
};
