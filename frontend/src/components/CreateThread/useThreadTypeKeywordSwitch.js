// eslint-disable-next-line no-unused-vars
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
    if (threadType === 'lostPetThread') {
      return keywords[placeCalled].lostPet;
    }
    if (threadType === 'witnessThread') {
      return keywords[placeCalled].witness;
    }
    return 'Error'
  }, [threadType]);
}

export default useThreadTypeKeywordSwitch
