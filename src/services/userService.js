import { UserModel } from '../models/userModel.js';
import { UserAlreadyExistException, UserDoesNotExistException } from '../exceptions/userException.js';
import bcrypt from 'bcrypt';
import { ThreadModel } from '../models/threadModel.js';

class UserService {
  static async getUserByName(username) {
    return UserModel.findOne({ username });
  }

  static async getUserById(userId) {
    return UserModel.findById(userId);
  }

  static async getUserByRefreshToken(refreshToken) {
    return UserModel.findOne({ refreshToken });
  }

  static async createUser(body) {
    const { username, email, password } = body;
    const exist = await UserService.getUserByName(username);
    // TODO check if email already exists as well
    if (exist) {
      throw new UserAlreadyExistException(`${username} with email: ${email} has already registered`);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      return UserModel.create({ username, email, password: hashedPassword });
    }
  }

  static async updateThread(userId, threadId) {
    const user = await UserService.getUserById(userId);
    console.log('updateThread in userService: ', user);
    user.myThreads.push(threadId);
    await user.save();
  }

  static async patchUser(userId, body) {
    const toPatch = await UserService.getUserById(userId);
    for (const prop in body) {
      if (prop in toPatch) {
        toPatch[prop] = body[prop];
      }
    }
    await toPatch.save();
    return toPatch;
  }

  static async updateAvatar(userId, avatar) {
    const user = await UserService.getUserById(userId);
    if (!user) {
      throw new UserDoesNotExistException(`User ${userId} does not exist`);
    }
    if (!user.avatar) {
      user.avatar = {};
    }
    // if (typeof avatar.data === 'string' && avatar.data.startsWith('http')) {// google profile pic
    //   user.avatar.data = avatar.data;
    // }
    user.avatar.data = Buffer.from(avatar.data, 'base64');
    user.avatar.contentType = avatar.contentType;
    return await user.save();
  }

  static getPrivateProfile(user) {
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.__v;
    return userObject;
  }

  static async getUserFavoriteOrUnfavorite (userId, threadId) {
    const user = await UserService.getUserById(userId);
    console.log('Favorite Or Unfavorite Thread in userService: ', user);
    if (user.favoredThreads.indexOf(threadId) >= 0) {
      user.favoredThreads.remove(threadId);
      await ThreadModel.decFavoriteCount(threadId);
    } else {
      await ThreadModel.incFavoriteCount(threadId);
      user.favoredThreads.push(threadId);
    }
    return user.save();
  }
}

export default UserService;
