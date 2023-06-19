import { CommentModel } from '../models/commentModel.js';
import { ThreadModel } from '../models/threadModel.js';
import { CommentDoesNotExistException } from '../exceptions/commentException.js';
import ThreadService from './threadService.js';
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
    // return ThreadModel.findById(threadId)
    //   .select('comments')
    //   .populate('comments');
    const thread = await ThreadModel.findById(threadId);
    if (thread) {
      return thread.comments;
    } else {
      throw new ThreadDoesNotExistException(`thread ${threadId} does not exist`);
    }
  }

  static async createComment(threadId, body) {
    const comment = await CommentModel.create(body);
    const thread = await ThreadModel.findById(threadId);
    console.log(thread);
    thread.comments.push(comment);
    await thread.save();
    return thread;
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
    const deleted = await CommentModel.findByIdAndDelete(id);
    if (deleted) {
      return deleted;
    } else {
      throw new CommentDoesNotExistException(`comment ${id} does not exist`);
    }
  }
}

export default commentService;
