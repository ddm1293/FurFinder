import { ThreadModel } from '../models/thread.js';

class ThreadService {
  static totalNumber = async () => await ThreadModel.countDocuments();

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