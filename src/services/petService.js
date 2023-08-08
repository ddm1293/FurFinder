import { PetModel } from '../models/petModel.js';
import async from 'async';
import { getPetRelevanceIndex, relevanceThreshold } from './petRelevance/petRelevance.js';
import _ from 'lodash';
import ThreadService from './threadService.js';

class PetService {
  static async createPet(body) {
    // clone the body to a new object
    const newBody = { ...body };

    // ensure the pic property is an array of images
    newBody.pic = Array.isArray(body.pic) ? body.pic : [body.pic];

    return PetModel.create(newBody);
  }

  static async getPetById(petId) {
    return PetModel.findById(petId);
  }

  static async updatePetByThreadId(petId, threadId) {
    const pet = await PetService.getPetById(petId);
    pet.threadId = threadId;
    return await pet.save();
  }

  static async getPet(id) {
    return PetModel.findById(id);
  }

  static async updatePet(id, body) {
    return PetModel.findByIdAndUpdate(id, body, { overwriteDiscriminatorKey: true, new: true });
  }

  static async getPetPic(petId) {
    const pet = await PetService.getPetById(petId);
    if (pet && pet.pic && pet.pic.length > 0) {
      return pet.pic[0];
    } else {
      return null;
    }
  }

  static async linkRelevantPets(pet) {
    const threadType = pet.threadType === 'lostPetThread' ? 'witnessThread' : 'lostPetThread';
    const targetPets = await PetModel.find({ threadType, species: pet.species });
    const relevantPets = await async.filter(targetPets, async (targetPet) => {
      console.log('print 3');
      const petRelevance = await getPetRelevanceIndex(pet, targetPet);
      console.log('print petRelevance in 3: ', petRelevance);
      if (petRelevance >= relevanceThreshold) {
        console.log('see relevantPet: ', petRelevance, targetPet.name);
      }
      return petRelevance >= relevanceThreshold;
    });
    const relevantThreadIds = _.map(relevantPets, (pet) => pet.threadId);
    await async.forEach(relevantThreadIds, async (relevantThreadId) => {
      await ThreadService.linkThreads(pet.threadId, relevantThreadId);
    });
    return await ThreadService.getThread(pet.threadId);
  }
}

export default PetService;
