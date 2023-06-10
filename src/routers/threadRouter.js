import express from 'express';
import * as threadController from '../controllers/threadController.js';
import { processPet } from '../middleware/threadMiddleware.js';

const threadRouter = express.Router();

// GET APIS
threadRouter.get('/userId', threadController.getThreadsByUser);
threadRouter.get('/getThreads', threadController.getThreads);
threadRouter.get('/:id', threadController.getThread);

// POST APIS
threadRouter.post('/', processPet, threadController.createThread);

// PUT APIS
threadRouter.put('/:id', threadController.updateThread);

// PATCH APIS
threadRouter.patch('/archive/:id', threadController.archiveThread);
threadRouter.patch('/:id', threadController.patchThread);

// DELETE APIS
threadRouter.delete('/:id', threadController.deleteThread);

export default threadRouter;
