import {
  colorDiffWeight,
  colorProbabilityData,
  idwValue,
  maxPossibleCategoryDiff,
  maxPossibleSizeDiff,
  timeProbabilityData
} from './petAssumption.js';
import { exponentialDecay, idwInterpolation } from './models.js';
import { diff } from 'color-diff';

const indexWeight = {
  breedSimilarity: 1,
  colorSimilarity: 1,
  sizeSimilarity: 1,
  timeSequenceIndex: 1,
  geoDistanceIndex: 1
};

export const relevanceThreshold = 0.7;

export const getPetRelevanceIndex = async (lost, witnessed) => {
  const breedSimilarity = compareBreed(lost, witnessed);
  console.log('see before compareColor');
  const colorSimilarity = await compareColor(lost, witnessed);
  console.log('see after compareColor: ', colorSimilarity);
  const sizeSimilarity = compareSize(lost, witnessed);
  const timeSequenceIndex = await compareLastSeenTime(lost, witnessed);
  const geoDistanceIndex = compareLastSeenLocation(lost, witnessed);

  // console.log('see all the indexes: ', timeSequenceIndex, geoDistanceIndex);
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
  const lostBreed = lost.breed;
  const witnessedBreed = witnessed.breed;
  return lostBreed === witnessedBreed ? 1 : 0;
};

export const compareColor = async (lost, witnessed) => {
  // TODO: nlp - get rgb from a description
  if (!witnessed.color.dominantColor) {
    return 0;
  }
  const lostDominantColor = lost.color.dominantColor;
  const witnessedDominantColor = witnessed.color.dominantColor;
  const dominantColorDiff = diff(lostDominantColor, witnessedDominantColor);

  const lostSecondaryColor = lost.color.secondaryColor;
  const witnessedSecondaryColor = lost.color.secondaryColor;
  let secondaryColorDiff = 0;
  if (lostSecondaryColor && witnessedSecondaryColor) {
    secondaryColorDiff = diff(lostSecondaryColor, witnessedSecondaryColor);
  }
  const weightedDiff = (dominantColorDiff * colorDiffWeight.dominantColor +
      secondaryColorDiff * colorDiffWeight.secondaryColor) /
    (colorDiffWeight.dominantColor + colorDiffWeight.secondaryColor);
  const exponentialDecayModel = await exponentialDecay(
    colorProbabilityData.x_colorDiff, colorProbabilityData.y_probability
  );
  return exponentialDecayModel(weightedDiff);
};

export const compareSize = (lost, witnessed) => {
  if (!witnessed.sizeCategory) {
    return 0;
  }
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
  let timeSequenceIndex;
  if (lostTime > witnessedTime) {
    timeSequenceIndex = 0;
  } else {
    const exponentialDecayModel = await exponentialDecay(
      timeProbabilityData.x_lostTime,
      timeProbabilityData.y_probability);
    timeSequenceIndex = exponentialDecayModel(timeGap);
  }
  return timeSequenceIndex;
};

export const compareLastSeenLocation = (lost, witnessed) => {
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
