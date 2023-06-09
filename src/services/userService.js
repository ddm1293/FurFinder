import { UserModel } from '../models/userModel.js';

class UserService {
  static async getUser(username) {
    console.log(username);
    return UserModel.findOne({ username });
  }

  static async createUser(username, password) {
    return UserModel.create({ username, password });
  }
}

export default UserService;
