import { ThreadModel } from '../models/threadModel.js';

class ThreadService {
  static totalNumber = async () => await ThreadModel.countDocuments();

  // TODO: update User's threads field after they create a thread
  static async createThread(body) {
    return ThreadModel.create(body);
  }

  static async getThreads(page, limit) {
    const skip = (page - 1) * limit;
    return ThreadModel.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit * 1)
      .exec();
  }
}

export default ThreadService;
