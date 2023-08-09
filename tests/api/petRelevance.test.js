import {
  describe,
  expect,
  it
} from '@jest/globals';
import {
  compareColor, compareDescription,
  compareLastSeenLocation,
  compareLastSeenTime, compareSize
} from '../../src/services/petRelevance/petRelevance.js'
import mongoose from 'mongoose';
import { diff } from 'color-diff';
import { callGPT } from '../../src/services/gpt/gpt.js';

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

  it('Test compareLastSeenLocation: no homeAddress', () => {
    const lost = {
      lastSeenLocation: [-123.20969076096888, 49.251320577014916]
    };
    const witnessed = {
      lastSeenLocation: [-123.1976439045317, 49.25427737746856]
    };
    expect(compareLastSeenLocation(lost, witnessed)).toBe(0);
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

  it('Test compareDescription', async () => {
    const lost = {
      description: 'Shadow is a sprightly Border Collie with a unique split-colored face; the left side is jet black, while the right side is pristine white. He\'s got this characteristic bushy tail that curls slightly upwards, especially when he\'s excited. Shadow has medium-length fur, predominantly black with white patches on his paws, chest, and the tip of his tail. His eyes are a striking shade of blue, reminiscent of clear skies.'
    };
    const witnessed = {
      description: 'I found this energetic dog that looks a lot like a Border Collie, I think. Half of its face is black and the other half white, which caught my attention. The dog\'s fur is mostly black but with some white areas, especially around its legs and a bit on the chest. One of the distinct features were its bright blue eyes. It\'s pretty lively, kept trying to chase after some pigeons around the park.'
    };
    const descriptionIndex = await compareDescription(lost, witnessed);
    console.log('see descriptionIndex: ', descriptionIndex);
  });
});
