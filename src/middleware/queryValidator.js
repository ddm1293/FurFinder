import { query } from 'express-validator';
import _ from 'lodash';
import { getBreeds } from '../utils/getBreeds.js';
import { parseISO, isValid, isBefore } from 'date-fns';

export const threadTypeValidator = query('threadType')
  .trim()
  .isLength({ min: 1 })
  .withMessage('threadType must exist')
  .bail()
  .custom((value) => {
    const allowed = ['lostPetThread', 'witnessThread'];
    return allowed.includes(value);
  })
  .withMessage('threadType can be either lostPetThread or witnessThread');

export const keywordValidator = query('keyword')
  .trim()
  .isLength({ min: 1 })
  .withMessage('Keyword must not be empty');

export const searchOnWhereValidator = [
  query('searchOn')
    .if(query('keyword')
      .not()
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

const petNameValidator = query('petName')
  .optional()
  .trim()
  .isLength({ min: 1 })
  .withMessage('Pet name must not be empty')
  .bail()
  .custom((name) => {
    return /^[a-zA-Z0-9 .\-'_]+$/.test(name);
  })
  .withMessage('Illegal pet name');

const speciesValidator = query('species')
  .optional()
  .trim()
  .custom((value) => {
    const allowed = ['cat', 'dog'];
    return allowed.includes(value);
  })
  .withMessage('breed can be either cat or dog');

const breedValidator = [
  query('breed')
    .if(query('species')
      .not()
      .exists())
    .not()
    .exists()
    .withMessage('Breed should not exist when species does not exist'),

  query('breed')
    .optional()
    .trim()
    .custom(async (value, { req }) => {
      const species = req.query.species;
      const breeds = await getBreeds(species);
      if (!breeds.includes(value.toLowerCase())) {
        return Promise.reject(new Error('Failed to validate breed'));
      }
    })
    .withMessage('Unknown/illegal breed')
];

const sexValidator = query('sex')
  .optional()
  .trim()
  .custom((value) => {
    const allowed = ['male', 'female', 'unknown'];
    return allowed.includes(value);
  })
  .withMessage('Illegal sex');

const lastSeenTimeValidator = [
  query('lastSeenStart')
    .optional()
    .customSanitizer((value) => {
      return parseISO(value);
    })
    .custom((value) => {
      return isValid(value);
    })
    .withMessage('Invalid Date'),

  query('lastSeenEnd')
    .if(query('lastSeenStart')
      .not()
      .exists())
    .not()
    .exists()
    .withMessage('lastSeenEnd should not exist when lastSeenStart does not exist'),

  query('lastSeenEnd')
    .optional()
    .customSanitizer((value) => {
      return parseISO(value);
    })
    .custom((value) => {
      return isValid(value);
    })
    .withMessage('Invalid Date')
    .bail()
    .custom((endDate, { req }) => {
      const startDate = req.query.lastSeenStart;
      return isBefore(startDate, endDate);
    })
    .withMessage('lastSeenStart is not before lastSeenEnd')
];

export const petFilterValidator = [
  petNameValidator,
  speciesValidator,
  ...breedValidator,
  sexValidator,
  ...lastSeenTimeValidator
];
