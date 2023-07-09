import PetService from '../services/petService.js';

export const getPet = async (req, res, next) => {
  try {
    console.log('Server::Getting a pet\'s information - running getPet');
    const petId = req.params.id;
    const pet = await PetService.getPetById(petId);
    // console.log(pet);
    res.status(200).json(pet);
  } catch (err) {
    next(err);
  }
};
