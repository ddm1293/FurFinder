import { PetModel } from '../models/petModel.js';

class PetService {
  static createPet(body) {
    return PetModel.create(body);
  }
}

export default PetService;
