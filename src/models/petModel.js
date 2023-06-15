import mongoose from 'mongoose';

// TODO: finish using discriminator
const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pic: [{
    type: Buffer
  }],
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  sex: {
    type: String,
    enum: {
      values: ['male', 'female', 'unknown'],
      message: '{VALUE} is not supported'
    }
  },
  lastSeenTime: {
    type: Date,
    required: true
  }
}, {
  discriminatorKey: 'species'
});

export const PetModel = mongoose.model('Pet', PetSchema);
