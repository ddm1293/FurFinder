import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  commenterId: String,
  content: String,
  date: Date
});

export const CommentModel = mongoose.model('Comment', CommentSchema);
