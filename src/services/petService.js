import { PetModel } from '../models/petModel.js';

class PetService {
  static async createPet(body, ownerId) {
    return PetModel.create({ ...body, ownerId });
  }

  static async getPetById(petId) {
    return PetModel.findById(petId);
  }

  static async updatePet(petId, threadId) {
    const pet = await PetService.getPetById(petId);
    console.log('updatePet in petService: ', pet);
    pet.threadId = threadId;
    return await pet.save();
  }
}

export default PetService;
