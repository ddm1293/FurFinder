import PetService from '../services/petService.js';

export const processPet = async (req, res, next) => {
  try {
    const petData = req.body.pet;
    const ownerId = req.body.poster;
    const pet = await PetService.createPet(petData, ownerId);
    req.body.pet = pet._id;
    res.petCreated = pet;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process pet data' });
  }
};
