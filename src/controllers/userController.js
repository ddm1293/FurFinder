import UserService from '../services/userService.js';
import { UserModel } from '../models/userModel.js';

export const getUser = async (req, res) => {
  try {
    console.log('Server::getUser');
    let user = await UserService.getUserByName(req.user);
    user = UserService.getLeanUser(user);
    res.status(200).json({ message: 'GetUser Successfully', user });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const all = await UserModel.find({});
    res.json(all);
  } catch (err) {
  }
};

export const getPublicUser = async (req, res) => {
  try {
    console.log('Server::getPublicUser');
    let user = await UserService.getUserById(req.params.id);
    user = user.getPublicProfile();
    res.status(200).json({ message: 'GetPublicUser Successfully', user });
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
