import express from 'express';
import * as userController from '../controllers/userController.js';
import verifyJWT from '../middleware/verifyJwt.js';
import multer from 'multer';

const userRouter = express.Router();
const upload = multer();

userRouter.get('/me', verifyJWT, userController.getUser);
userRouter.get('/getAllUsers', userController.getAllUsers);
userRouter.get('/:id', userController.getPublicUser);
userRouter.patch('/:id', userController.patchUser);
userRouter.patch('/:id/avatar', upload.any(), userController.updateAvatar);

// TODO: get a user by id

export default userRouter;
