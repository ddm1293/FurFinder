import { UserModel } from '../models/userModel.js';
import { UserAlreadyExistException } from '../exceptions/userException.js';
import bcrypt from 'bcrypt';

class UserService {
  static async getUser(username) {
    return UserModel.findOne({ username });
  }

  static async createUser(body) {
    const { username, email, password } = body;
    const exist = await UserService.getUser(username);
    // TODO check if email already exists as well
    if (exist) {
      throw new UserAlreadyExistException(`${username} with email: ${email} has already registered`);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      return UserModel.create({ username, email, password: hashedPassword });
    }
  }
}

export default UserService;
