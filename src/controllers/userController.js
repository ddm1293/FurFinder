import bcrypt from 'bcrypt';
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

export const getUser = async (req, res) => {
  try {
    console.log('Server::getUser');

    let user = await UserService.getUserByName(req.params.username);
    if (!user && req.query.didSignInFromGoogle) {
      user = await UserService.createUser({
        username: req.params.username,
        email: req.params.username,
        password: ''
      });
      user = user.toObject();
      delete user.password;
      res.status(200).json({ message: 'GetUser Successfully', user });
    } else if (user && (
      req.query.didSignInFromGoogle || (!req.query.didSignInFromGoogle && await bcrypt.compare(req.query.password, user.password))
    )) {
      user = user.toObject();
      delete user.password;
      res.status(200).json({ message: 'GetUser Successfully', user });
    } else {
      res.status(200).json({ message: 'Incorrect username or password!', user: null });
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export const patchUser = async (req, res) => {
  try {
    console.log('Server::patchUser');
    const user = await UserService.patchUser(req.params.id, req.body);
    res.status(200).json({ message: 'Update user information Successfully', user });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

// TODO:
export const userLogin = async (req, res) => {
  console.log('Server::userLogin');
};
