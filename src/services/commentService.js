import { commentModel } from '../models/commentModel.js';

class commentService {
  // static totalNumber = async () => await commentModel.countDocuments();

  static async getComment(id) {
    return commentModel.findById(id);
  }

  static async createComment(body) {
    return commentModel.create(body);
  }

  static async updateComment(id, body) {
    return commentModel.findByIdAndUpdate(id, body, { new: true, upsert: true });
  }

  static async patchComment(id, body) {
    const toPatch = await commentService.getComment(id);
    for (const prop in body) {
      if (prop in toPatch) {
        toPatch[prop] = body[prop];
      }
    }
    return toPatch.save();
  }

  static async deleteComment(id) {
    return commentModel.findByIdAndDelete(id);
  }
}

export default commentService;
