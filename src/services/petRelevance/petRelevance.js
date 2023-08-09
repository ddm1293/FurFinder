import { colorDiffWeight, idwValue, maxPossibleCategoryDiff, maxPossibleSizeDiff } from './petAssumption.js'
import { idwInterpolation } from './models.js'
import { diff } from 'color-diff'
import { callGPT } from '../gpt/gpt.js'

const indexWeight = {
  breedSimilarity: 1,
  colorSimilarity: 1,
  sizeSimilarity: 1,
  timeSequenceIndex: 1,
  geoDistanceIndex: 1,
  descriptionIndex: 0.5
};

export const relevanceThreshold = 1;

export const getPetRelevanceIndex = async (lost, witnessed, exponentialDecayModels) => {
  const breedSimilarity = compareBreed(lost, witnessed);
  const colorSimilarity = await compareColor(lost, witnessed, exponentialDecayModels.color);
  const sizeSimilarity = compareSize(lost, witnessed);
  const timeSequenceIndex = await compareLastSeenTime(lost, witnessed, exponentialDecayModels.lastSeenTime);
  const geoDistanceIndex = compareLastSeenLocation(lost, witnessed);
  const descriptionIndex = await compareDescription(lost, witnessed);

  if (timeSequenceIndex) {
    return indexWeight.breedSimilarity * breedSimilarity +
      indexWeight.colorSimilarity * colorSimilarity +
      indexWeight.sizeSimilarity * sizeSimilarity +
      indexWeight.timeSequenceIndex * timeSequenceIndex +
      indexWeight.geoDistanceIndex * geoDistanceIndex +
      indexWeight.descriptionIndex * descriptionIndex;
  } else {
    return 0;
  }
};

export const compareBreed = (lost, witnessed) => {
  const lostBreed = lost.breed;
  const witnessedBreed = witnessed.breed;
  return lostBreed === witnessedBreed ? 1 : 0;
};

export const compareColor = async (lost, witnessed, model) => {
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
  return model(weightedDiff);
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

export const compareLastSeenTime = async (lost, witnessed, model) => {
  const lostTime = lost.lastSeenTime;
  const witnessedTime = witnessed.lastSeenTime;
  const oneDay = 24 * 60 * 60 * 1000;
  const timeGap = Math.abs(lostTime - witnessedTime) / oneDay;
  let timeSequenceIndex;
  if (lostTime > witnessedTime) {
    timeSequenceIndex = 0;
  } else {
    timeSequenceIndex = model(timeGap);
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

export const compareDescription = async (lost, witnessed) => {
  try {
    if (!lost.description || !witnessed.description) {
      return 0;
    }
    const prompt =
      'Based on these two descriptions, give me the probability as an exact number (percentage), not a sentence, that they are describing the same pet without any other words: ' +
      `Description of the lost pet: ${lost.description}` +
      `Description of the witnessed pet: ${witnessed.description}`;
    return await callGPT(prompt);
  } catch {
    return 0;
  }
};
