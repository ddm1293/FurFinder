import { PetModel } from '../models/petModel.js';
import async from 'async';
import { getPetRelevanceIndex, relevanceThreshold } from './petRelevance/petRelevance.js';
import _ from 'lodash';
import ThreadService from './threadService.js';

class PetService {
  static async createPet(body) {
    return PetModel.create(body);
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
      const petRelevance = await getPetRelevanceIndex(pet, targetPet);
      return petRelevance >= relevanceThreshold;
    });
    // console.log('see relevantPets: ', relevantPets);
    const relevantThreadIds = _.map(relevantPets, (pet) => pet.threadId);
    await async.forEach(relevantThreadIds, async (relevantThreadId) => {
      await ThreadService.linkThreads(pet.threadId, relevantThreadId);
    });
    return await ThreadService.getThread(pet.threadId);
  }
}

export default PetService;
