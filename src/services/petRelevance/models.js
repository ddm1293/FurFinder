import { computeDistanceBetween, convertLatLng } from 'spherical-geometry-js';
import { PythonShell } from 'python-shell';

const getDistance = (from, to) => {
  const dist = computeDistanceBetween(convertLatLng(from), convertLatLng(to));
  // console.log('see from and to and dist : ', convertLatLng(from).toString(), convertLatLng(to).toString(), dist);
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
  console.log('see here exponentialDecay is running');
  let exponentialDecayModel;
  await PythonShell.run(
    'src/services/petRelevance/exponentialDecay.py',
    {
      args: [
        JSON.stringify(x),
        JSON.stringify(y)]
    })
    .then((params) => {
      console.log('are u running?');
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
  console.log('see if this run ends');
  return exponentialDecayModel;
};
