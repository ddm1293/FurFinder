import {
  describe,
  expect,
  it,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll
} from '@jest/globals';
import { compareLastSeenTime } from '../../src/services/petRelevance/petRelevance.js';
import mongoose from 'mongoose';

const generatePet = (breed, time, latLng, threadType) => {
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
      coordinates: latLng
    },
    species: 'Cat'
  };
};

describe('Test petRelevance helpers', () => {
  it('Test compareLastSeenTime: witness happened before lost', () => {
    const lost = generatePet('', '2023-04-29T18:00:00.000+00:00', [0, 0], 'lostPetThread');
    const witnessed = generatePet('', '2023-04-28T07:00:00.000+00:00', [0, 0], 'witnessThread');
    const timeIndex = compareLastSeenTime(lost, witnessed);
    expect(timeIndex).toBe(0);
  });

  it('Test compareLastSeenTime: successfully calculate timeIndex', async () => {
    const lost = generatePet('', '2023-04-29T18:00:00.000+00:00', [0, 0], 'lostPetThread');
    const witnessed = generatePet('', '2023-04-30T07:00:00.000+00:00', [0, 0], 'witnessThread');
    const timeIndex = await compareLastSeenTime(lost, witnessed);
    console.log('see timeIndex: ', timeIndex);
  }, 30000);
});
