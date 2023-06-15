import { ThreadModel } from '../models/threadModel.js';
import UserService from './userService.js';
import { ThreadDoesNotExistException } from '../exceptions/threadException.js';
import { UserModel } from '../models/userModel.js';
import { UserDoesNotExistException } from '../exceptions/userException.js';


class ThreadService {
  static totalNumber = async () => await ThreadModel.countDocuments();

  static async getThread(id) {
    const thread = await ThreadModel.findById(id);
    if (thread) {
      return thread;
    } else {
      throw new ThreadDoesNotExistException(`thread ${id} does not exist`);
    }
  }

  static async getThreadsOfUserById(userId) {
    const user = await UserService.getUserById(userId);
    if (user) {
      return user.myThreads;
    } else {
      throw new UserDoesNotExistException(`user ${userId} does not exist`);
    }
  }

  static async getThreadsOfUserByName(name) {
    const user = await UserService.getUserByName(name);
    return user.myThreads;
  }

  static async createThread(body) {
    const thread = await ThreadModel.create(body);
    await UserService.updateThread(body.poster, thread._id);
    return thread;
  }

  static async getThreads(page, limit) {
    const skip = (page - 1) * limit;
    return ThreadModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit * 1)
      .exec();
  }

  // TODO: do we really need to update the whole? or should pet and user should remain the same?
  static async updateThread(id, body) {
    const updated = await ThreadModel.findByIdAndUpdate(id, body, { new: true });
    if (updated) {
      return updated;
    } else {
      throw new ThreadDoesNotExistException(`thread ${id} does not exist`);
    }
  }

  static async favoriteThread(id, userId) {
    const user = await UserModel.findById(userId);
    await user._favorites.threads(id);
    console.log(user);
  }

  static async patchThread(id, body) {
    const toPatch = await ThreadService.getThread(id);
    for (const prop in body) {
      if (prop in toPatch) {
        toPatch[prop] = body[prop];
      }
    }
    return toPatch.save();
  }

  static async archiveThread(id) {
    const toArchive = await ThreadService.getThread(id);
    toArchive.archived = true;
    return toArchive.save();
  }

  static async deleteThread(id) {
    const deleted = await ThreadModel.findByIdAndDelete(id);
    if (deleted) {
      return deleted;
    } else {
      throw new ThreadDoesNotExistException(`thread ${id} does not exist`);
    }
  }
}

export default ThreadService;
