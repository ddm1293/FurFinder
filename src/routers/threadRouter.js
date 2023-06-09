import express from 'express';
import multer from 'multer';
import * as threadController from '../controllers/threadController.js';
import { processPet, searchQueryValidator } from '../middleware/threadMiddleware.js';
import { handleError } from '../middleware/handleError.js';

const threadRouter = express.Router();
const upload = multer();

// GET APIS
threadRouter.get('/userId/:id', threadController.getThreadsByUserId, handleError);
threadRouter.get('/getThreads', threadController.getThreads, handleError);
threadRouter.get('/getAllThreads', threadController.getAllThreads, handleError);
threadRouter.get('/getTotalThreadNumber', threadController.getTotalThreadNumber, handleError);
threadRouter.get('/search', searchQueryValidator, threadController.searchThreads, handleError);
threadRouter.get('/:id', threadController.getThread, handleError);

// POST APIS
threadRouter.post('/', upload.any(), processPet, threadController.createThread, handleError);

// PUT APIS
threadRouter.put('/:id', threadController.updateThread, handleError);

// PATCH APIS
threadRouter.patch('/archive/:id', threadController.archiveThread, handleError);
threadRouter.patch('/:id', threadController.patchThread, handleError);
threadRouter.patch('/:id/:userId/favorite', threadController.favoriteThread, handleError);

// DELETE APIS
threadRouter.delete('/:id', threadController.deleteThread, handleError);

export default threadRouter;
