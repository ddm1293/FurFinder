import { UserModel } from '../models/userModel.js';
import { UserAlreadyExistException } from '../exceptions/userException.js';
import bcrypt from 'bcrypt';

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
    return toPatch.save();
  }

  static getPrivateProfile(user) {
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refreshToken;
    delete userObject.__v;
    return userObject;
  }
}

export default UserService;
