import mongoose from 'mongoose';
const { Schema } = mongoose;

// TODO: finish using discriminator
const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pic: [{
    type: Buffer
  }],
  sex: {
    type: String,
    enum: ['male', 'female', 'unknown']
  },
  lastSeenTime: {
    type: Date,
    required: true
  }
}, {
  discriminatorKey: 'species'
});

const PetModel = mongoose.model('Pet', PetSchema);
