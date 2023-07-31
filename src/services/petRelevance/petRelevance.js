import { PythonShell } from 'python-shell';
import {
  idwValue,
  maxPossibleCategoryDiff,
  maxPossibleSizeDiff,
  timeProbabilityData
} from './petAssumption.js';
import { idwInterpolation } from './idwInterpolation.js';

const indexWeight = {
  breedSimilarity: 1,
  colorSimilarity: 1,
  sizeSimilarity: 1,
  timeSequenceIndex: 1,
  geoDistanceIndex: 1
};

const relevanceThreshold = 1;

export const getPetRelevanceIndex = (lost, witnessed) => {
  const breedSimilarity = compareBreed(lost, witnessed);
  const colorSimilarity = compareColor(lost, witnessed);
  const sizeSimilarity = compareSize(lost, witnessed);
  const timeSequenceIndex = compareLastSeenTime(lost, witnessed);
  const geoDistanceIndex = compareLastSeenLocation(lost, witnessed);

  if (timeSequenceIndex) {
    return indexWeight.breedSimilarity * breedSimilarity +
      indexWeight.colorSimilarity * colorSimilarity +
      indexWeight.sizeSimilarity * sizeSimilarity +
      indexWeight.timeSequenceIndex * timeSequenceIndex +
      indexWeight.geoDistanceIndex * geoDistanceIndex;
  } else {
    return 0;
  }
};

export const compareBreed = (lost, witnessed) => {

};

export const compareColor = (lost, witnessed) => {

};

export const compareSize = (lost, witnessed) => {
  const lostSizeCategory = lost.sizeCategory;
  const witnessedSizeCategory = witnessed.sizeCategory;
  if (lostSizeCategory === witnessedSizeCategory) {
    return compareSizeNumber(lost, witnessed);
  } else {
    const categoryDifference = Math.abs(lostSizeCategory - witnessedSizeCategory);
    return 1 - (categoryDifference / maxPossibleCategoryDiff);
  }
};

const compareSizeNumber = (lost, witnessed) => {
  const lostSizeNumber = lost.sizeNumber;
  const witnessedSizeNumber = witnessed.sizeNumber;
  if (lostSizeNumber && witnessedSizeNumber) {
    const sizeDifference = Math.abs(lost.sizeNumber - witnessed.sizeNumber);
    const species = lost.species;
    const maxPossibleDiff = species === 'Cat' ? maxPossibleSizeDiff.cat : maxPossibleSizeDiff.dog;
    // TODO: what if sizeDifference is bigger than maxPossibleDiff?
    return 1 - (sizeDifference / maxPossibleDiff);
  } else {
    return 1;
  }
};

export const compareLastSeenTime = async (lost, witnessed) => {
  const lostTime = lost.lastSeenTime;
  const witnessedTime = witnessed.lastSeenTime;
  const oneDay = 24 * 60 * 60 * 1000;
  const timeGap = Math.abs(lostTime - witnessedTime) / oneDay;
  console.log('see timeGap: ', timeGap);
  let timeSequenceIndex;
  if (lostTime > witnessedTime) {
    timeSequenceIndex = 0;
  } else {
    let exponentialDecayModel;
    await PythonShell.run(
      'src/services/petRelevance/timeIndex.py',
      {
        args: [
          JSON.stringify(timeProbabilityData.x_lostTime),
          JSON.stringify(timeProbabilityData.y_probability)]
      })
      .then((params) => {
        const A = params[0];
        const k = params[1];
        console.log('see params: ', A, k);
        exponentialDecayModel = (x) => {
          return A * Math.exp(-k * x);
        };
      })
      .catch((err) => {
        console.error(err);
      });
    timeSequenceIndex = exponentialDecayModel(timeGap);
  }
  return timeSequenceIndex;
};

export const compareLastSeenLocation = async (lost, witnessed) => {
  const lostLocation = {
    coordinates: lost.lastSeenLocation.coordinates,
    value: idwValue.lastSeenLocation
  };
  const homeAddress = {
    coordinates: lost.homeAddress.coordinates,
    value: idwValue.homeAddress
  };
  const witnessedLocation = witnessed.lastSeenLocation.coordinates;
  return idwInterpolation(witnessedLocation, [lostLocation, homeAddress], 6);
};
