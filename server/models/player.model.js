const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    discord_id: {
      type: String,
      required: [true, 'Discord ID is required'],
      trim: true,
      minlength: [17, 'Discord ID must be at least 17 characters long'],
      maxlength: [20, 'Discord ID must be at most 20 characters long'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [1, 'Name must be at least 1 character long'],
      maxlength: [100, 'Name must be at most 100 characters long'],
    },
    flowers: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false, // Disable the __v field
    timestamps: false, // Disable createdAt and updatedAt fields
    collection: 'players', // Specify the collection name
  }
);

module.exports = mongoose.model('Player', playerSchema);
