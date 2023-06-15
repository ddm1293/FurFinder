import PetService from '../services/petService.js';
import { checkSchema, query } from 'express-validator';
import _ from 'lodash';

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

export const searchQueryValidator = [
  // Validate keyword
  query('keyword')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Keyword must not be empty'),

  // Validate searchON
  query('searchOn')
    .if(query('keyword').notEmpty())
    .trim()
    .isLength({ min: 1 })
    .withMessage('SearchOn must not be empty')
    .custom((value) => {
      const allowed = ['title', 'content'];
      const where = value.split(',');
      return where.length <= allowed.length &&
        _.difference(where, allowed).length === 0 &&
        _.uniq(where).length === where.length;
    })
    .withMessage('Invalid or duplicate values in searchOn parameter')
];

// export const searchQueryValidator = () => {
//   checkSchema({
//     keyword: {
//       optional: true,
//       trim: true,
//       isLength: {
//         options: { min: 1 },
//         errorMessage: 'Keyword must not be empty'
//       }
//     },
//     searchOn: {
//       optional: true,
//       if: query('keyword').exists('null'),
//       exists: {
//         options: 'null',
//         if: query('keyword')
//       },
//       isLength: {
//         options: { min: 1 },
//         errorMessage: 'SearchOn must not be empty'
//       },
//       custom: {
//         options: (value) => {
//           const allowed = ['title', 'content'];
//           const where = value.split(',');
//           return where.length <= allowed.length &&
//             _.difference(where, allowed).length === 0 &&
//             _.uniq(where).length === where.length;
//         },
//         errorMessage: 'Invalid or duplicate values in searchOn parameter'
//       }
//     }
//   }, ['query']);
// };
