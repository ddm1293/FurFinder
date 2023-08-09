import { computeDistanceBetween, convertLatLng } from 'spherical-geometry-js';
import { PythonShell } from 'python-shell';

const getDistance = (from, to) => {
  const dist = computeDistanceBetween(convertLatLng(from), convertLatLng(to));
  return dist;
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
  return idw;
};

export const exponentialDecay = async (x, y) => {
  let exponentialDecayModel;
  await PythonShell.run(
    'src/services/petRelevance/exponentialDecay.py',
    {
      args: [
        JSON.stringify(x),
        JSON.stringify(y)]
    })
    .then((params) => {
      const A = params[0];
      const k = params[1];
      exponentialDecayModel = (x) => {
        return A * Math.exp(-k * x);
      };
    })
    .catch((err) => {
      console.error(err);
    });
  return exponentialDecayModel;
};
