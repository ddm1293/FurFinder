import { PetModel } from '../models/petModel.js';

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

  static async getPetPic(petId) { // New service function
    const pet = await PetService.getPetById(petId);
    if (pet && pet.pic && pet.pic.length > 0) {
      return pet.pic[0];
    } else {
      return null;
    }
  }
}

export default PetService;
