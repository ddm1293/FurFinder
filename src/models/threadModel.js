import mongoose from 'mongoose';
const { Schema } = mongoose;

// TODO: possibly create two separate schema for lost pet threads and witness threads
const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  content: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  archived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const ThreadModel = mongoose.model('Thread', ThreadSchema);
