import { PetModel } from '../models/petModel.js';
import async from 'async';
import { getPetRelevanceIndex, relevanceThreshold } from './petRelevance/petRelevance.js';
import _ from 'lodash';
import ThreadService from './threadService.js';
import { initializeModels } from './petRelevance/models.js';

class PetService {
  static async createPet(body) {
    const newBody = { ...body };
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
    const exponentialDecayModels = await initializeModels();
    const relevantPets = await async.filter(targetPets, async (targetPet) => {
      const lostPet = pet.threadType === 'lostPetThread' ? pet : targetPet;
      const witnessedPet = pet.threadType === 'witnessThread' ? pet : targetPet;
      const petRelevance = await getPetRelevanceIndex(lostPet, witnessedPet, exponentialDecayModels);
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
