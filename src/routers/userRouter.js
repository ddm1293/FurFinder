import express from 'express';
import * as userController from '../controllers/userController.js';
import verifyJWT from '../middleware/verifyJwt.js';

const userRouter = express.Router();

userRouter.get('/me', verifyJWT, userController.getUser);
userRouter.get('/getAllUsers', userController.getAllUsers);
userRouter.get('/:id', userController.getPublicUser);
userRouter.patch('/:id', userController.patchUser);

// TODO: get a user by id

export default userRouter;
