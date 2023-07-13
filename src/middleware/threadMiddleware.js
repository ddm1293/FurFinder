import PetService from '../services/petService.js';
import { validationResult } from 'express-validator';
import { InvalidQueryException } from '../exceptions/threadException.js';
import {
  keywordValidator,
  petFilterValidator,
  searchOnWhereValidator,
  threadTypeValidator
} from './queryValidator.js';
import { produce } from 'immer';

export const processPet = async (req, res, next) => {
  try {
    const geoPoint = JSON.parse(req.body.lastSeenLocation);
    const lastSeenLocation = {
      type: 'Point',
      coordinates: [geoPoint.lng, geoPoint.lat]
    };
    const pic = [{
      data: req.files[0].buffer,
      contentType: req.files[0].mimetype
    }];
    const petBody = produce(req.body, draftState => {
      draftState.ownerId = draftState.poster;
      draftState.lastSeenLocation = lastSeenLocation;
      draftState.pic = pic;
    });
    const pet = await PetService.createPet(petBody);
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
