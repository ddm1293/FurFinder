import { PetModel } from '../models/petModel.js';

class PetService {
  static createPet(body, id) {
    return PetModel.create({ ...body, ownerId: id });
  }
}

export default PetService;
