import UserService from '../services/userService.js';
import { UserModel } from '../models/userModel.js';
import { UserAlreadyExistException } from '../exceptions/userException.js';

export const getAllUsers = async (req, res) => {
  try {
    const all = await UserModel.find({});
    res.json(all);
  } catch (err) {
  }
};

export const registerUser = async (req, res) => {
  try {
    console.log('Server::registerUser');
    const newUser = await UserService.createUser(req.body);
    res.status(200).json({ message: 'Registered successfully!', newUser });
  } catch (err) {
    console.error(err);
    if (err instanceof UserAlreadyExistException) {
      res.status(409).send(err.message);
    } else {
      res.status(400).send(err.message);
    }
  }
};

// TODO:
export const userLogin = async (req, res) => {
  console.log('Server::userLogin');
};
