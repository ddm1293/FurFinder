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
    console.log(user);
    user.myThreads.push(threadId);
    await user.save();
  }
}

export default UserService;
