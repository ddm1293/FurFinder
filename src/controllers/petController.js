import PetService from '../services/petService.js';

export const getPet = async (req, res, next) => {
  try {
    console.log('Server::Getting a pet\'s information - running getPet');
    const petId = req.params.id;
    const pet = await PetService.getPetById(petId);
    res.status(200).json(pet);
  } catch (err) {
    next(err);
  }
};

export const getPetPic = async (req, res, next) => {
  try {
    console.log('Server::Getting a pet\'s picture - running getPetPic');
    const petId = req.params.id;
    const pic = await PetService.getPetPic(petId);
    if (pic) {
      const base64String = Buffer.from(pic.data.buffer, 'binary').toString('base64');
      res.json({ contentType: pic.contentType, base64: base64String });
    } else {
      res.status(404).json({ message: 'Picture not found' });
    }
  } catch (err) {
    next(err);
  }
};
