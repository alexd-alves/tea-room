// server/routes/player.js

const express = require('express');
const playerRoutes = express.Router();
const {
  getAllPlayers,
  getPlayerCount,
  getPlayerById,
  addPlayer,
  updatePlayerById,
  deletePlayerById,
} = require('../controllers/playerController.js');

// GET /api/players and POST /api/players
playerRoutes.route('/').get(getAllPlayers).post(addPlayer);

// GET /api/players/:id, PUT /api/players/:id, and DELETE /api/players/:id
playerRoutes.route('/:id').get(getPlayerById).put(updatePlayerById).delete(deletePlayerById);

// GET /api/players/count
playerRoutes.route('/get/count').get(getPlayerCount);

module.exports = playerRoutes;
