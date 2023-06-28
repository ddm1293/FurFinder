import PetService from '../services/petService.js';
import { validationResult } from 'express-validator';
import { InvalidQueryException } from '../exceptions/threadException.js';
import {
  keywordValidator,
  petFilterValidator,
  searchOnWhereValidator,
  threadTypeValidator
} from './queryValidator.js';

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
    // const petData = req.body.pet;
    // const ownerId = req.body.poster;
    // const pet = await PetService.createPet(petData, ownerId);
    const petData = {
      id: req.body.id,
      name: req.body['pet-name'],
      species: req.body['pet-species'],
      breed: req.body['pet-breed'] || req.body['cat-breed'] || req.body['dog-breed'],
      type: req.body['select-thread-type'],
      description: req.body.description,
      sex: req.body['pet-sex'],
      lastSeenTime: req.body['missing-date'],
      pic: [{
        data: req.files[0].buffer,
        contentType: req.files[0].mimetype
      }]
    };
    console.log('missing-date:', req.body['missing-date']);
    const pet = await PetService.createPet(petData);
    req.body.pet = pet._id;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process pet data' });
  }
};

const invalidQueryHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new InvalidQueryException(errors.array()));
  } else {
    next();
  }
};

export const searchQueryValidator = [
  keywordValidator,
  ...searchOnWhereValidator,
  threadTypeValidator,
  ...petFilterValidator,
  invalidQueryHandler
];
