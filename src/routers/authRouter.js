import express from 'express';
import * as authController from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/login', authController.userLogin);
authRouter.post('/register', authController.registerUser);
authRouter.get('/refresh', authController.refreshUser);
authRouter.get('/logout', authController.logoutUser);

export default authRouter;
