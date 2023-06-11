import React, { useCallback } from 'react'

const useThreadTypeKeywordSwitch = (threadType) => {
  const keywords = {
    threadType: {
      lostPet: 'Lost Pet',
      witness: 'Witness'
    },
    petDescription: {
      lostPet: 'Details of the Missing Pet',
      witness: 'Details of the Witnessed Pet'
    },
    threadContent: {
      lostPet: 'You could describe how your pet was lost',
      witness: 'You could describe the witness'
    }
  }

  return useCallback((placeCalled) => {
    if (threadType === 'lost-pet-thread') {
      return keywords[placeCalled].lostPet;
    }
    if (threadType === 'witness-thread') {
      return keywords[placeCalled].witness;
    }
    return 'Error'
  }, [threadType]);
}

export default useThreadTypeKeywordSwitch
