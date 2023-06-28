import { PetModel } from '../models/petModel.js';

class PetService {
  static createPet(body, id) {
    return PetModel.create({ ...body, ownerId: id });
  }

  static async getPet(id) {
    return PetModel.findById(id);
  }
}

export default PetService;
