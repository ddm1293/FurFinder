import PetService from '../services/petService.js';

// export const processPet = async (req, res, next) => {
//   try {
//     const petData = req.body.pet;
//     const pet = await PetService.createPet(petData);
//     req.body.pet = pet._id;
//     res.petCreated = pet;
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to process pet data' });
//   }
// };

export const processPet = async (req, res, next) => {
  try {
    const petData = {
      name: req.body['pet-name'],
      sex: req.body['pet-sex'],
      lastSeenTime: req.body['missing-date'],
      pic: []
    };
    console.log('missing-date:', req.body['missing-date']);
    const pet = await PetService.createPet(petData);
    req.body.pet = pet._id;
    res.petCreated = pet;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process pet data' });
  }
};
