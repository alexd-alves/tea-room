// server/models/flower.model.js

const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    compPoints: {
      type: Number,
    },
  },
  {
    versionKey: false, // Disable the __v field
    timestamps: false, // Disable createdAt and updatedAt fields
    collection: 'flowers', // Specify the collection name
  }
);

module.exports = mongoose.model('Flower', flowerSchema);
