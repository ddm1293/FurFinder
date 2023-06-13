import { CommentModel } from '../models/commentModel.js';
import { ThreadModel } from '../models/threadModel.js';

class commentService {
  static totalNumber = async () => await CommentModel.countDocuments();

  static async getComment(id) {
    return CommentModel.findById(id);
  }

  static async getCommentsByThread(threadId) {
    return ThreadModel.findById(threadId)
      .select('comments')
      .populate('comments');
  }

  static async createComment(id, params, body) {
    const comment = await CommentModel.create(body);
    const threadRelated = await ThreadModel.findById(id);
    threadRelated.comments.push(comment);
    return threadRelated.save();
  }

  static async updateComment(id, body) {
    return CommentModel.findByIdAndUpdate(id, body, { new: true, upsert: true });
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
    return CommentModel.findByIdAndDelete(id);
  }
}

export default commentService;
