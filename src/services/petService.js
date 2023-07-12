import { PetModel } from '../models/petModel.js';

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
}

export default PetService;
