import PetService from '../services/petService.js';

export const getPet = async (req, res, next) => {
  try {
    const petId = req.params.id;

    let pet = await PetService.getPetById(petId);
    pet = pet.toObject(); // need to remove pic property
    delete pet.pic;

    res.status(200).json(pet);
  } catch (err) {
    next(err);
  }
};

export const getPetImage = async (req, res, next) => {
  try {
    const petId = req.params.id;
    const pet = await PetService.getPetById(petId);
    const petPic = pet.pic?.[0];

    if (petPic) {
      res.setHeader('Content-Type', petPic.contentType);
      res.send(petPic.data);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};
