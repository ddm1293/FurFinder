import mongoose from 'mongoose';
import { pointSchema } from './helperSchema.js';

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  threadType: {
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
  threadId: {
    type: mongoose.Types.ObjectId,
    ref: 'Thread',
    required: true
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sex: {
    type: String,
    enum: {
      values: ['male', 'female', 'unknown'],
      message: '{VALUE} is not supported'
    },
    required: true
  },
  lastSeenTime: {
    type: Date,
    required: true
  },
  lastSeenLocation: {
    type: pointSchema,
    required: true
  },
  homeAddress: {
    type: pointSchema
  }
}, {
  discriminatorKey: 'species'
});

export const PetModel = mongoose.model('Pet', PetSchema);

const CatSchema = new mongoose.Schema({
  breed: {
    type: String
  }
});

export const CatModel = PetModel.discriminator('Cat', CatSchema);

const DogSchema = new mongoose.Schema({
  breed: {
    type: String
  }
});

export const DogModel = PetModel.discriminator('Dog', DogSchema);
