import mongoose from 'mongoose';
const { Schema } = mongoose;

// TODO: possibly create two separate schema for lost pet threads and witness threads
const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  postDate: Date,
  originalPoster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

export const ThreadModel = mongoose.model('Thread', ThreadSchema);
