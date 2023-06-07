import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  myThreads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }],
  favoredThreads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }]
});

export const UserModel = mongoose.model('User', UserSchema);
