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
import { ThreadModel } from '../models/threadModel.js';
import { PetModel } from '../models/petModel.js';

export const processPet = async (req, res, next) => {
  try {
    const lastSeenLocationPoint = JSON.parse(req.body.lastSeenLocation);
    const lastSeenLocation = {
      type: 'Point',
      coordinates: [lastSeenLocationPoint.lng, lastSeenLocationPoint.lat]
    };

    let homeAddress;
    if (req.body.homeAddress !== 'null') {
      const homeAddressPoint = JSON.parse(req.body.homeAddress);
      homeAddress = {
        type: 'Point',
        coordinates: [homeAddressPoint.lng, homeAddressPoint.lat]
      };
    }

    let pics;
    if (req.body.pic !== 'undefined') {
      pics = req.files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype
      }));
    }

    const dominantColor = JSON.parse(req.body.dominantColor);

    let secondaryColor;
    if (req.body.secondaryColor !== 'undefined') {
      secondaryColor = JSON.parse(req.body.secondaryColor);
    }

    const color = secondaryColor
      ? {
          dominantColor,
          secondaryColor
        }
      : {
          dominantColor
        };

    let sizeNumber;
    if (req.body.sizeNumber !== 'undefined') {
      sizeNumber = req.body.sizeNumber;
    }

    const petBody = produce(req.body, draftState => {
      draftState.ownerId = draftState.poster;
      draftState.lastSeenLocation = lastSeenLocation;
      draftState.homeAddress = homeAddress;
      draftState.pic = pics;
      draftState.color = color;
      draftState.sizeNumber = sizeNumber;
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

export const deleteRelatedPet = async (req, res, next) => {
  try {
    const threadId = req.params.id;
    const thread = await ThreadModel.findById(threadId);
    if (thread && thread.pet) {
      await PetModel.findByIdAndDelete(thread.pet);
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete related pet data' });
  }
};

export const removeFromRelevantThreads = async (req, res, next) => {
  try {
    const threadId = req.params.id;
    const thread = await ThreadModel.findById(threadId);

    if (thread && thread.relevant && thread.relevant.length > 0) {
      const relevantThreads = thread.relevant;
      for (const relevantThreadId of relevantThreads) {
        await ThreadModel.findByIdAndUpdate(relevantThreadId, {
          $pull: { relevant: threadId }
        });
      }
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove relevant thread references' });
  }
};
