import { ThreadModel } from '../models/threadModel.js';
import UserService from './userService.js';
import { ThreadDoesNotExistException } from '../exceptions/threadException.js';
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

  // TODO: add validation to body; potentially increment versionKey
  static async updateThread(id, body) {
    return ThreadModel.findByIdAndUpdate(id, body, { new: true, upsert: true });
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
    return ThreadModel.findByIdAndDelete(id);
  }
}

export default ThreadService;
