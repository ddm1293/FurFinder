import mongoose from 'mongoose';

const ThreadSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  postDate: Date,
  originalPosterId: String
});

export const ThreadModel = mongoose.model('threads', ThreadSchema);
