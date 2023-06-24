import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  threadId: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const CommentModel = mongoose.model('Comment', commentSchema);
