import { PetModel } from '../models/pet.js';

class PetService {
  static createPet(body) {
    return PetModel.create(body);
  }
}

export default PetService;
