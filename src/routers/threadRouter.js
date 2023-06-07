import express from 'express';
import * as threadController from '../controllers/threadController.js';

const threadRouter = express.Router();

threadRouter.post('/', threadController.createThread);
threadRouter.get('/:id', threadController.getThread);
threadRouter.get('/userId/:id', threadController.getThreadsByUser);
threadRouter.get('/getAllThreads', threadController.getAllThreads);
threadRouter.put('/:id', threadController.updateThread);
threadRouter.patch('/:id', threadController.patchThread);
threadRouter.put('/:id/archive', threadController.archiveThread);
threadRouter.delete('/:id', threadController.deleteThread);

export default threadRouter;
