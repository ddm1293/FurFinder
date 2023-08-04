import {
  describe,
  expect,
  it
} from '@jest/globals';
import {
  compareColor,
  compareLastSeenLocation,
  compareLastSeenTime, compareSize
} from '../../src/services/petRelevance/petRelevance.js';
import mongoose from 'mongoose';
import { diff } from 'color-diff';

const generatePet = (
  breed,
  time,
  lastSeenLocation,
  homeAddress,
  threadType,
  species,
  sizeCategory,
  sizeNumber,
  dominantColor,
  secondaryColor) => {
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
    species,
    sizeCategory,
    sizeNumber,
    color: {
      dominantColor,
      secondaryColor
    }
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

  it('Test compareSize: same size category, no size number', () => {
    const lost = generatePet('', '', '', '', 'lostPetThread', 'Dog', 1);
    const witnessed = generatePet('', '', '', '', 'witnessThread', 'Dog', 1);
    const sizeSimilarity = compareSize(lost, witnessed);
    console.log('see sizeSimilarity: ', sizeSimilarity);
  });

  it('Test compareSize: different size category', () => {
    const lost = generatePet('', '', '', '', 'lostPetThread', 'Dog', 1);
    const witnessed = generatePet('', '', '', '', 'witnessThread', 'Dog', 2);
    const sizeSimilarity = compareSize(lost, witnessed);
    console.log('see sizeSimilarity: ', sizeSimilarity);
  });

  it('Test compareSize: same size category with size number, dog', () => {
    const lost = generatePet('', '', '', '', 'lostPetThread', 'Dog', 1, 10);
    const witnessed = generatePet('', '', '', '', 'witnessThread', 'Dog', 1, 12);
    const sizeSimilarity = compareSize(lost, witnessed);
    console.log('see sizeSimilarity: ', sizeSimilarity);
  });

  it('Test compareSize: same size category with size number, cat', () => {
    const lost = generatePet('', '', '', '', 'lostPetThread', 'Cat', 1, 4);
    const witnessed = generatePet('', '', '', '', 'witnessThread', 'Cat', 1, 8);
    const sizeSimilarity = compareSize(lost, witnessed);
    console.log('see sizeSimilarity: ', sizeSimilarity);
  });

  it('Test compareColor', () => {
    const lost = {
      color: {
        dominantColor: {
          r: 157,
          g: 103,
          b: 120
        }
      }
    };
    const witnessed = {
      color: {
        dominantColor: {
          r: 161,
          g: 103,
          b: 100
        }
      }
    };
    console.log(diff(lost.color.dominantColor, witnessed.color.dominantColor));
  });
});
