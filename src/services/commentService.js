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
    // Method 1 - error : Cannot read properties of undefined (reading 'push')
    // const comment = CommentModel.create(body);
    // const threadRelated = ThreadModel.findById(id);
    // threadRelated.comments.push(comment);

    // Method 2- error : comment.save() is not a function; if delete save, same error with Method 1
    // const comment = new CommentModel({
    //   content: body.content,
    //   threadId: id,
    //   author: {
    //     id: body.author.id,
    //     commenterName: body.author.commenterName
    //   }
    // });
    // await comment.save();
    // const threadRelated = ThreadModel.findById(id);
    // threadRelated.comments.push(comment);
    // await threadRelated.save();

    // Method 3 - error : No error but doesn't work on Postman
    // const comment = CommentModel.create(body);
    // return ThreadModel.findById(id)
    //   .select('comments')
    //   .set({ comments: comment });

    // Method 4 - errors : No error but doesn't work, commentCreated: null on Postman
    // const comment = CommentModel.create(body);
    // const comment = new CommentModel({
    //   content: body.content,
    //   threadId: id,
    //   author: {
    //     id: body.author.id,
    //     commenterName: body.author.commenterName
    //   }
    // });
    // console.log(comment);
    // const update = { comments: comment };
    // return ThreadModel.findOneAndUpdate(params, update);
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
