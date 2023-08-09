import PetService from '../services/petService.js';

export const getPet = async (req, res, next) => {
  try {
    const petId = req.params.id;

    let pet = await PetService.getPetById(petId);
    pet = pet.toObject();
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
    const petPics = pet.pic;

    if (petPics) {
      if (petPics.length === 1) {
        res.setHeader('Content-Type', petPics[0].contentType);
        res.send(petPics[0].data);
      } else {
        const images = petPics.map((pic) => {
          return {
            data: pic.data.toString('base64'),
            contentType: pic.contentType
          };
        });
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(images));
      }
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export const getPetCoverImage = async (req, res, next) => {
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
