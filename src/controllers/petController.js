import petService from '../services/petService.js';

export const getPet = async (req, res) => {
  try {
    console.log('Server::get the pet');
    const id = req.params.id;
    const pet = await petService.getPet(id);
    res.status(200).json({ pet });
  } catch (err) {
    res.status(400).json({
      error: err.message
    });
  }
};
