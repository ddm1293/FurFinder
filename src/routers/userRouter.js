import express from 'express';

const userRouter = express.Router();

// TODO:
const registerUser = async (req, res) => {
  console.log('Server::registerUser');
};

// TODO:
const userLogin = async (req, res) => {
  console.log('Server::userLogin');
};

userRouter.post('/auth/register', registerUser);
userRouter.post('/auth/login', userLogin);

export default userRouter;
