import mongoose from 'mongoose';

// TODO: finish using discriminator
const PetSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  pic: [
    {
      data: {
        type: Buffer
      },
      contentType: {
        type: String
      }
    }
  ],
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  sex: {
    type: String,
    enum: {
      values: ['male', 'female', 'unknown', 'enby', 'not-sure-sex'],
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
