// server/routes/player.js
const express = require('express');
const playerRoutes = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  addPlayer,
  updatePlayerById,
  deletePlayerById,
} = require('../controllers/playerController.js');

// GET /api/player and POST /api/player
playerRoutes.route('/').get(getAllPlayers).post(addPlayer);

// GET /api/player/:id, PUT /api/player/:id, and DELETE /api/player/:id
playerRoutes.route('/:id').get(getPlayerById).put(updatePlayerById).delete(deletePlayerById);

module.exports = playerRoutes;
