import express from 'express';
import * as petController from '../controllers/petController.js';

const petRouter = express.Router();

petRouter.get('/:id', petController.getPet);

export default petRouter;
