import { PetModel } from '../models/petModel.js';

class PetService {
  static createPet(body) {
    return PetModel.create(body);
  }

  static async getPet(id) {
    return PetModel.findById(id);
  }
}

export default PetService;
