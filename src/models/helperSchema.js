import mongoose from 'mongoose';

export const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

export const rgbSchema = new mongoose.Schema({
  r: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  g: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  b: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  a: {
    type: Number,
    required: false,
    min: 0,
    max: 1
  }
});
