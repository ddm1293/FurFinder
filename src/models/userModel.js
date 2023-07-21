import mongoose from 'mongoose';
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
  }],
  refreshToken: String,
  avatar: {
    data: {
      type: Buffer
    },
    contentType: {
      type: String
    },
    url: { // google profile pic
      type: String
    }
  }
});

UserSchema.methods.getPublicProfile = function() {
  const { _id, username } = this;
  return { _id, username };
};

export const UserModel = mongoose.model('User', UserSchema, 'users');
