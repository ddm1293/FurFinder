import { ThreadModel } from '../models/threadModel.js';

class ThreadService {
  static totalNumber = async () => await ThreadModel.countDocuments();

  static async getThread(id) {
    return ThreadModel.findById(id);
  }

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

  // TODO: add validation to body; potentially increment versionkey
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
