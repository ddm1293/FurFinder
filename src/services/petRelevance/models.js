import { computeDistanceBetween, convertLatLng } from 'spherical-geometry-js';
import { PythonShell } from 'python-shell';
import { colorProbabilityData, timeProbabilityData } from './petAssumption.js'

const getDistance = (from, to) => {
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
  // console.log('see idw: ', idw);
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
      // console.log('see params: ', A, k);
      exponentialDecayModel = (x) => {
        return A * Math.exp(-k * x);
      };
    })
    .catch((err) => {
      console.error(err);
    });
  return exponentialDecayModel;
};

export const initializeModels = async () => {
  const exponentialDecayModels = {};
  exponentialDecayModels.color = await exponentialDecay(
    colorProbabilityData.x_colorDiff, colorProbabilityData.y_probability
  );
  exponentialDecayModels.lastSeenTime = await exponentialDecay(
    timeProbabilityData.x_lostTime, timeProbabilityData.y_probability
  );
  return exponentialDecayModels;
};
