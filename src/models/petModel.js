import mongoose from 'mongoose';

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pic: [{
    type: Buffer
  }],
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
