/*
timeSequenceIndex:
The object `timeProbabilityData` holds data points that represent the relation between time elapsed since a pet is lost (`x_lostTime`)
and the probability of finding the pet (`y_probability`).
These data points are used for curve fitting to model the probability of finding a lost pet as a function of time.
*/
export const timeProbabilityData = {
  x_lostTime: [0, 0.5, 1, 2, 3, 7, 15, 30, 45],
  y_probability: [1, 0.97, 0.93, 0.85, 0.77, 0.62, 0.31, 0.23, 0.19]
};

/*
geoDistanceIndex:
 */
export const travelMilesPerDay = {
  dog: 2.5,
  cat: 1
};

export const goldenSearchRange = {
  dog: 2,
  cat: 2
};

export const idwValue = {
  lastSeenLocation: 0,
  homeAddress: 1
};

// compareSize
export const maxPossibleCategoryDiff = 2;

export const maxPossibleSizeDiff = {
  dog: 22,
  cat: 11
};

// compareColor
export const colorDiffThreshold = 8;

export const colorProbabilityData = {
  x_colorDiff: [0, 0.5, 1, 2, 2.3, 2.5, 3, 7, 15, 30, 45],
  y_probability: [1, 0.96, 0.93, 0.72, 0.61, 0.5, 0.43, 0.10, 0.0018]
};

export const colorDiffWeight = {
  dominantColor: 3,
  secondaryColor: 1
};
