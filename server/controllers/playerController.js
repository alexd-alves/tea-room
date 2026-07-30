// server/controllers/playerController.js
const Player = require('../models/player.model.js');

// @desc Get all players
// @route GET /api/players
// @access Public
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get player count
// @route GET /api/players/get/count
// @access Public
const getPlayerCount = async (req, res) => {
  try {
    const count = await Player.countDocuments({});
    res.json({ count: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get player by id
// @route GET /api/players/:id
// @access Public
const getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Add a new player
// @route POST /api/players
// @access Private
const addPlayer = async (req, res) => {
  try {
    const newPlayer = new Player({
      discord_id: req.body.discord_id,
      name: req.body.name,
      flowers: req.body.flowers,
    });
    await newPlayer.save();
    res.json({ message: 'Player added successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ errors: errors });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// @desc Update player by id
// @route PUT /api/players/:id
// @access Private
const updatePlayerById = async (req, res) => {
  try {
    await Player.findByIdAndUpdate(req.params.id, {
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
};

// @desc Delete player by id
// @route DELETE /api/players/:id
// @access Private
const deletePlayerById = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerCount,
  getPlayerById,
  addPlayer,
  updatePlayerById,
  deletePlayerById,
};
