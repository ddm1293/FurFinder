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
            }
          },
          {
            text: {
              query: threadType,
              path: 'kind'
            }
          }
        ]
      }
    }
  };
};

export const petInformationSearch = (criteria, threadType) => {
  const filters = [];

  for (const criterion in criteria) {
    if (criteria[criterion]) {
      filters.push({
        text: {
          query: threadType,
          path: 'kind'
        }
      });
      filters.push({
        text: {
          query: criteria[criterion],
          path: criterion
        }
      });
    }
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
