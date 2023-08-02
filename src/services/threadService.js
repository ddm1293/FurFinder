import { LostPetThreadModel, ThreadModel, WitnessThreadModel } from '../models/threadModel.js';
import UserService from './userService.js';
import { ThreadDoesNotExistException } from '../exceptions/threadException.js';
import { UserDoesNotExistException } from '../exceptions/userException.js';
import PetService from './petService.js';
import _ from 'lodash';
import { keywordSearch, petInformationSearch, threadTypeMatch } from './search.js';
import { UserModel } from '../models/userModel.js';

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

  static async getAllThreads(threadType) {
    return ThreadModel.find();
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

  static async createThread(body, res) {
    const thread = await ThreadModel.create(body);
    await UserService.updateThread(body.poster, thread._id);
    res.petCreated = await PetService.updatePetByThreadId(body.pet, thread._id);
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

  static async updateThread(id, body) {
    const updated = await ThreadModel.findByIdAndUpdate(id, body, { new: true });
    if (updated) {
      return updated;
    } else {
      throw new ThreadDoesNotExistException(`thread ${id} does not exist`);
    }
  }

  static async getLostThreads() {
    return LostPetThreadModel.find({});
  }

  static async getWitnessThreads() {
    return WitnessThreadModel.find({});
  }

  static async favoriteThread(id, userId) {
    const user = await UserModel.findById(userId);
    if (user) {
      await UserService.getUserFavoriteOrUnfavorite(userId, id);
      // const thread = await ThreadModel.findById(id);
      return user;
    } else {
      throw new UserDoesNotExistException(`user ${userId} does not exist`);
    }
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

  static async searchThreads(data) {
    const { keyword, threadType, searchOn, breed, species, sex, petName: name, lastSeenStart, lastSeenEnd } = data;
    const criteria = { species, breed, name, sex, lastSeenStart, lastSeenEnd };
    const filterExist = _.some(criteria, _.negate(_.isUndefined));

    const pipeline = [];

    if (keyword && !filterExist) {
      console.log('search case 1: keyword only');
      pipeline.push(keywordSearch(keyword, searchOn.split(','), threadType));
    }

    else if (!keyword && filterExist) {
      console.log('search case 2: filter only');
      pipeline.push(threadTypeMatch(threadType));
      pipeline.push(petInformationSearch(criteria));
      pipeline.push({
        $match: {
          target_pets: { $ne: [] }
        }
      });
    }

    else if (keyword && filterExist) {
      console.log('search case 3: both');
      pipeline.push(keywordSearch(keyword, searchOn.split(','), threadType));
      pipeline.push(petInformationSearch(criteria));
      pipeline.push({
        $match: {
          target_pets: { $ne: [] }
        }
      });
    }

    return ThreadModel.aggregate(pipeline);
  }

  static async linkThreads(threadId1, threadId2) {
    // Find the threads
    const thread1 = await ThreadModel.findById(threadId1);
    const thread2 = await ThreadModel.findById(threadId2);

    if (!thread1 || !thread2) {
      throw new ThreadDoesNotExistException(`One or both threads do not exist`);
    }

    // Add each thread to the other's relevant array if not already there
    if (!thread1.relevant.includes(threadId2)) {
      thread1.relevant.push(threadId2);
      await thread1.save();
    }

    if (!thread2.relevant.includes(threadId1)) {
      thread2.relevant.push(threadId1);
      await thread2.save();
    }

    return { thread1, thread2 };
  }
}

export default ThreadService;
