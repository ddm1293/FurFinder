import express from 'express';
import * as userController from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/auth/register', userController.registerUser);
userRouter.post('/auth/login', userController.userLogin);
userRouter.get('/getAllUsers', userController.getAllUsers);

export default userRouter;
