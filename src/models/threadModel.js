import mongoose from 'mongoose';
const { Schema } = mongoose;

// TODO: possibly create two separate schema for lost pet threads and witness threads
const ThreadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  content: String,
  kind: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  archived: {
    type: Boolean,
    default: false
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  discriminatorKey: 'kind'
});

ThreadSchema.statics = {

  incFavoriteCount(threadId) {
    return this.findByIdAndUpdate(threadId, { $inc: { favoriteCount: 1 } });
  },

  decFavoriteCount(threadId) {
    return this.findByIdAndUpdate(threadId, { $inc: { favoriteCount: -1 } });
  }
};

export const ThreadModel = mongoose.model('Thread', ThreadSchema);

const LostPetThreadSchema = new mongoose.Schema({});

export const LostPetThreadModel = ThreadModel.discriminator('LostPetThread', LostPetThreadSchema);

const WitnessThreadSchema = new mongoose.Schema({});

export const WitnessThreadModel = ThreadModel.discriminator('WitnessThread', WitnessThreadSchema);
