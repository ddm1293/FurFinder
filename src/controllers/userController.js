import UserService from '../services/userService.js';
import { UserModel } from '../models/userModel.js';

export const getUser = async (req, res) => {
  try {
    console.log('Server::getUser');
    let user = await UserService.getUserByName(req.user.username);
    user = UserService.getPrivateProfile(user);
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

export const updateAvatar = async (req, res) => {
  try {
    console.log('Server::updateAvatar');
    const userId = req.params.id;
    const file = req.files[0];
    const avatar = {
      data: file.buffer,
      contentType: file.mimetype
    };
    const user = await UserService.updateAvatar(userId, avatar);
    const base64String = avatar.data.toString('base64');
    // res.status(200).json({ message: 'Update user avatar successfully', user });
    res.status(200).json({
      message: 'Update user avatar Successfully',
      user: {
        ...user.toObject(),
        avatar: {
          ...user.avatar,
          data: base64String
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
};
