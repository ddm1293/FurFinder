import PetService from '../services/petService.js';
import { query, validationResult } from 'express-validator';
import _ from 'lodash';
import { InvalidQueryException } from '../exceptions/threadException.js';

export const processPet = async (req, res, next) => {
  try {
    const petData = req.body.pet;
    const ownerId = req.body.poster;
    const pet = await PetService.createPet(petData, ownerId);
    req.body.pet = pet._id;
    res.petCreated = pet;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process pet data' });
  }
};

const threadTypeValidator = query('threadType')
  .trim()
  .isLength({ min: 1 })
  .withMessage('threadType must exist')
  .bail()
  .custom((value) => {
    const allowed = ['lostPetThread', 'witnessThread'];
    return allowed.includes(value);
  })
  .withMessage('threadType can be either lostPetThread or witnessThread');

const keywordValidator = query('keyword')
  .optional()
  .trim()
  .isLength({ min: 1 })
  .withMessage('Keyword must not be empty');

const searchOnWhereValidator = [
  query('searchOn')
    .if(query('keyword').not()
      .exists())
    .not()
    .exists()
    .withMessage('SearchOn should not exist when keyword does not exist'),

  query('searchOn')
    .if(query('keyword').notEmpty())
    .trim()
    .isLength({ min: 1 })
    .withMessage('SearchOn must not be empty when keyword exists')
    .custom((value) => {
      const allowed = ['title', 'content'];
      const where = value.split(',');
      return where.length <= allowed.length &&
        _.difference(where, allowed).length === 0 &&
        _.uniq(where).length === where.length;
    })
    .withMessage('Invalid or duplicate values in searchOn parameter')
];

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
  invalidQueryHandler
];
