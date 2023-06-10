import express from 'express';
import * as commentController from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.post('/', commentController.createComment);
commentRouter.get('/:id', commentController.getComment);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.patch('/:id', commentController.patchComment);
commentRouter.delete('/:id', commentController.deleteComment);

export default commentRouter;
