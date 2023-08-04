import PetService from '../services/petService.js';

export const getPet = async (req, res, next) => {
  console.log('Server::Getting a pet\'s information - running getPet');
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
  console.log('Server::GetPetImage');
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
