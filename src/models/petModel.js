import mongoose from 'mongoose';

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
  threadId: {
    type: mongoose.Types.ObjectId,
    ref: 'Thread'
  },
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
