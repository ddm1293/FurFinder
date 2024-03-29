import express from 'express';
import multer from 'multer';
import * as threadController from '../controllers/threadController.js';
import { processPet, searchQueryValidator, deleteRelatedPet, removeFromRelevantThreads } from '../middleware/threadMiddleware.js';
import { handleError } from '../middleware/handleError.js';

const threadRouter = express.Router();
const upload = multer();

threadRouter.get('/userId/:id', threadController.getThreadsByUserId, handleError);
threadRouter.get('/getLostPetThread', threadController.getLostThreads, handleError);
threadRouter.get('/getWitnessThread', threadController.getWitnessThreads, handleError);
threadRouter.get('/getThreads', threadController.getThreads, handleError);
threadRouter.get('/getAllThreads', threadController.getAllThreads, handleError);
threadRouter.get('/getTotalThreadNumber', threadController.getTotalThreadNumber, handleError);
threadRouter.get('/search', searchQueryValidator, threadController.searchThreads, handleError);
threadRouter.get('/:id', threadController.getThread, handleError);

threadRouter.post('/',
  upload.any(),
  processPet,
  threadController.createThread,
  threadController.findThreadsWithRelevantPet,
  handleError
);

threadRouter.put('/:id', threadController.updateThread, handleError);

threadRouter.patch('/archive/:id', threadController.archiveThread, handleError);
threadRouter.patch('/:id', threadController.patchThread, handleError);
threadRouter.patch('/:id/:userId/favorite', threadController.favoriteThread, handleError);

threadRouter.delete('/:id',
  removeFromRelevantThreads,
  deleteRelatedPet,
  threadController.deleteThread,
  handleError);

export default threadRouter;
