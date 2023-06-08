import UserService from '../services/userService.js';
import { UserModel } from '../models/user.js';
import bcrypt from 'bcrypt';

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
    const { username, password } = req.body;
    const exist = await UserService.getUser(username);
    if (exist) {
      res.status(409).json({ message: 'User with the same username already exists.' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const newUser = await UserService.createUser(username, hashedPassword);
      res.status(200).json({ message: 'Registered successfully!', newUser });
    }
  } catch (err) {}
};

// TODO:
export const userLogin = async (req, res) => {
  console.log('Server::userLogin');
};
