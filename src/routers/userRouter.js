import express from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/getAllUsers', userController.getAllUsers);
userRouter.get('/:username', userController.getUser);
userRouter.patch('/:id', userController.patchUser);

// TODO: get a user by id

export default userRouter;
