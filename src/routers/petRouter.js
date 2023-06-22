import express from 'express';
import * as commentController from '../controllers/petController.js';

const petRouter = express.Router();

petRouter.get('/:id', commentController.getPet);
export default petRouter;
