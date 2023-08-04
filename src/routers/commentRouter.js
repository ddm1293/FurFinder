import express from 'express';
import * as commentController from '../controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.get('/:threadId/getComments', commentController.getCommentsByThread);
commentRouter.get('/:id', commentController.getComment);
commentRouter.post('/:threadId/create', commentController.createComment);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.patch('/:id', commentController.patchComment);
commentRouter.delete('/:id', commentController.deleteComment);

export default commentRouter;
