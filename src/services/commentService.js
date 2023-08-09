import { CommentModel } from '../models/commentModel.js';
import { ThreadModel } from '../models/threadModel.js';
import { CommentDoesNotExistException } from '../exceptions/commentException.js';
import { ThreadDoesNotExistException } from '../exceptions/threadException.js';

class commentService {
  static totalNumber = async () => await CommentModel.countDocuments();

  static async getComment(id) {
    const comment = await CommentModel.findById(id);
    if (comment) {
      return comment;
    } else {
      throw new CommentDoesNotExistException(`comment ${id} does not exist`);
    }
  }

  static async getCommentsByThread(threadId) {
    const thread = await ThreadModel.findById(threadId);
    if (thread) {
      return CommentModel.find({ threadId });
    } else {
      throw new ThreadDoesNotExistException(`thread ${threadId} does not exist`);
    }
  }

  static async createComment(threadId, body) {
    const comment = await CommentModel.create(body);
    const thread = await ThreadModel.findById(threadId);
    thread.comments.push(comment);
    await thread.save();
    return comment;
  }

  static async updateComment(id, body) {
    const updated = await CommentModel.findByIdAndUpdate(id, body, { new: true });
    if (updated) {
      return updated;
    } else {
      throw new CommentDoesNotExistException(`comment ${id} does not exist`);
    }
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
    const comment = await CommentModel.findById(id);
    if (!comment) {
      throw new CommentDoesNotExistException(`comment ${id} does not exist`);
    }
    const threadRelated = await ThreadModel.findById(comment.threadId);
    if (!threadRelated) {
      throw new ThreadDoesNotExistException(`thread ${comment.threadId} does not exist`);
    }
    const replies = await CommentModel.find({ parentId: comment._id });
    if (replies.length > 0) {
      for (const reply of replies) {
        threadRelated.comments.pull(reply._id);
        await CommentModel.findByIdAndDelete(reply._id);
      }
    }
    threadRelated.comments.pull(comment._id);
    await threadRelated.save();
    return CommentModel.findByIdAndDelete(id);
  }
}

export default commentService;
