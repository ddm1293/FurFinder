import express from 'express';
import * as userController from '../controllers/userController.js';
import verifyJWT from '../middleware/verifyJwt.js';


const userRouter = express.Router();

userRouter.get('/getAllUsers', userController.getAllUsers);
userRouter.get('/:id', verifyJWT, userController.getUser);
userRouter.patch('/:id', userController.patchUser);

// TODO: get a user by id

export default userRouter;
