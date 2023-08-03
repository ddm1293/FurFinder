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
    console.log('see req.body: ', req.body);
    const lastSeenLocationPoint = JSON.parse(req.body.lastSeenLocation);
    const lastSeenLocation = {
      type: 'Point',
      coordinates: [lastSeenLocationPoint.lng, lastSeenLocationPoint.lat]
    };

    let homeAddress;
    if (req.body.homeAddress !== 'null') {
      console.log('see homeAddress: ', req.body.homeAddress);
      const homeAddressPoint = JSON.parse(req.body.homeAddress);
      homeAddress = {
        type: 'Point',
        coordinates: [homeAddressPoint.lng, homeAddressPoint.lat]
      };
    }

    let pic;
    if (req.body.pic !== 'undefined') {
      console.log('see pic: ', req.body.pic);
      pic = [{
        data: req.files[0].buffer,
        contentType: req.files[0].mimetype
      }];
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
      draftState.pic = pic;
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
