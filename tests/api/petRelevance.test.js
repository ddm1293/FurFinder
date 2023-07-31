import {
  describe,
  expect,
  it
} from '@jest/globals';
import {
  compareLastSeenLocation,
  compareLastSeenTime
} from '../../src/services/petRelevance/petRelevance.js';
import mongoose from 'mongoose';

const generatePet = (breed, time, lastSeenLocation, homeAddress, threadType) => {
  return {
    _id: new mongoose.Types.ObjectId(),
    name: 'MockCat1',
    pic: [],
    sex: 'male',
    breed: '',
    lastSeenTime: new Date(time),
    threadType,
    description: '',
    threadId: new mongoose.Types.ObjectId(),
    ownerId: new mongoose.Types.ObjectId(),
    lastSeenLocation: {
      _id: new mongoose.Types.ObjectId(),
      type: 'Point',
      coordinates: lastSeenLocation
    },
    homeAddress: {
      _id: new mongoose.Types.ObjectId(),
      type: 'Point',
      coordinates: homeAddress
    },
    species: 'Cat'
  };
};

describe('Test petRelevance helpers', () => {
  it('Test compareLastSeenTime: witness happened before lost', async () => {
    const lost = generatePet('', '2023-04-29T18:00:00.000+00:00', [0, 0], '', 'lostPetThread');
    const witnessed = generatePet('', '2023-04-28T07:00:00.000+00:00', [0, 0], '', 'witnessThread');
    const timeIndex = await compareLastSeenTime(lost, witnessed);
    expect(timeIndex).toBe(0);
  });

  it('Test compareLastSeenTime: successfully calculate timeIndex', async () => {
    const lost = generatePet('', '2023-04-29T18:00:00.000+00:00', [0, 0], '', 'lostPetThread');
    const witnessed = generatePet('', '2023-04-30T07:00:00.000+00:00', [0, 0], '', 'witnessThread');
    const timeIndex = await compareLastSeenTime(lost, witnessed);
    console.log('see timeIndex: ', timeIndex);
  }, 30000);

  it('Test compareLastSeenLocation', () => {
    const lost = generatePet('', '', [-123.20969076096888, 49.251320577014916], [-123.18939184573237, 49.25208040892073], 'lostPetThread');
    const witnessed1 = generatePet('', '', [-123.1976439045317, 49.25427737746856], '', 'witnessThread');
    compareLastSeenLocation(lost, witnessed1);

    const witnessed2 = generatePet('', '', [-123.03766936373003, 49.25376369634729], '', 'witnessThread');
    compareLastSeenLocation(lost, witnessed2);
  });
});
