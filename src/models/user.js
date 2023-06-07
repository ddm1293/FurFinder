import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  threads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread',
  }]
});
