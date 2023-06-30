import { PetModel } from '../models/petModel.js';

class PetService {
  static createPet(body, id) {
    return PetModel.create({ ...body, ownerId: id });
  }

  static async getPet(id) {
    return PetModel.findById(id);
  }

  static async updatePet(id, body) {
    return PetModel.findByIdAndUpdate(id, body, { new: true });
  }
}

export default PetService;
