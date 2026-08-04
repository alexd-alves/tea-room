// server/models/flower.model.js

import mongoose from 'mongoose';

const flowerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    compPoints: {
      type: Number,
    },
    imgUrl: {
      type: String,
    },
  },
  {
    versionKey: false, // Disable the __v field
    timestamps: false, // Disable createdAt and updatedAt fields
    collection: 'flowers', // Specify the collection name
  }
);

export default mongoose.model('Flower', flowerSchema);
