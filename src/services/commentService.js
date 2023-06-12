import { commentModel } from '../models/commentModel.js';
import { ThreadModel } from '../models/threadModel.js';
import req from 'express/lib/request.js';

class commentService {
  static totalNumber = async () => await commentModel.countDocuments();

  static async getComment(id) {
    return commentModel.findById(id);
  }

  static async getCommentsByThread(threadId) {
    return ThreadModel.findById(threadId)
      .select('comments')
      .populate('comments');
  }

  static async createComment(threadId, body) {
    const comment = commentModel.create(body);
    console.log(comment);
    // return ThreadModel.findById(threadId)
    //   .select('comments')
    //   .set({ comments: comment });
    await ThreadModel.findOneAndUpdate(threadId, { $push: { comments: comment } });
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
