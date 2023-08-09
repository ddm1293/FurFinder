import _ from 'lodash';

export const keywordSearch = (keyword, searchOn, threadType) => {
  return {
    $search: {
      index: 'default',
      compound: {
        filter: [
          {
            text: {
              query: keyword,
              path: searchOn
              // fuzzy: {
              //   maxEdits: 1,
              //   maxExpansions: 100
              // }
            }
          },
          {
            text: {
              query: threadType,
              path: 'threadType'
            }
          }
        ]
      }
    }
  };
};

export const threadTypeMatch = (threadType) => {
  return {
    $match: {
      threadType: {
        $regex: `^${threadType}$`,
        $options: 'i'
      }
    }
  };
};

export const petInformationSearch = (criteria) => {
  const filters = [];

  const textualCriteria = _.pickBy(criteria, _.isString);
  const { lastSeenStart, lastSeenEnd } = _.pickBy(criteria, _.isDate);

  for (const criterion in textualCriteria) {
    if (textualCriteria[criterion]) {
      filters.push({
        text: {
          query: textualCriteria[criterion],
          path: criterion
        }
      });
    }
  }

  if (lastSeenStart && lastSeenEnd) {
    filters.push({
      range: {
        path: 'lastSeenTime',
        gt: lastSeenStart,
        lt: lastSeenEnd
      }
    });
  }

  return {
    $lookup: {
      from: 'pets',
      localField: '_id',
      foreignField: 'threadId',
      as: 'target_pets',
      pipeline: [{
        $search: {
          index: 'pets_index',
          compound: {
            filter: filters
          }
        }
      }]
    }
  };
};
