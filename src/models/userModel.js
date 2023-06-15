import mongoose from 'mongoose';
import { ThreadModel } from './threadModel.js';
const { Schema } = mongoose;

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: validateEmail,
      message: '{VALUE} is not a valid email'
    }
  },
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

UserSchema.methods = {
  _favorites: {
    async threads(threadId) {
      if (this.favoredThreads.indexOf(threadId) >= 0) {
        this.favoredThreads.remove(threadId);
        await ThreadModel.decFavoriteCount(threadId);
      } else {
        await ThreadModel.incFavoriteCount(threadId);
        this.favoredThreads.push(threadId);
      }
      return this.save();
    }
  }
};

export const UserModel = mongoose.model('User', UserSchema, 'users');
