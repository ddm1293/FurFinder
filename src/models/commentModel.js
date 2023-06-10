import mongoose from 'mongoose';
const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  commenterName: {
    type: String,
    required: true
  },
  authorID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  threadID: {
    type: Schema.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const commentModel = mongoose.model('Comment', CommentSchema);
