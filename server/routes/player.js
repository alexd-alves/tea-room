const express = require('express');
const playerRoutes = express.Router();
const mongoose = require('mongoose');

// Defining: Player Model
const Player = mongoose.model('Player', {
  discord_id: String,
  name: String,
  flowers: [String],
});

// Get all players
playerRoutes.route('/player').get(async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get player by discord_id
playerRoutes.route('/player/:discord_id').get(async (req, res) => {
  try {
    const player = await Player.findById(req.params.discord_id);
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new record
playerRoutes.route('/player/add').post(async (req, res) => {
  try {
    const newPlayer = new Player({
      discord_id: req.body.discord_id,
      name: req.body.name,
      flowers: req.body.flowers,
    });
    await newPlayer.save();
    res.json({ message: 'Player added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update player by discord_id
playerRoutes.route('/update/:discord_id').post(async (req, res) => {
  try {
    await Player.findByIdAndUpdate(req.params.discord_id, {
      $set: {
        discord_id: req.body.discord_id,
        name: req.body.name,
        flowers: req.body.flowers,
      },
    });
    res.json({ message: 'Player updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete player by discord_id
playerRoutes.route('/:discord_id').delete(async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.discord_id);
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = playerRoutes;
