import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    commenterName: String
  },
  threadId: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const commentModel = mongoose.model('Comment', CommentSchema);
