// server/routes/player.js

import express from 'express';
const playerRoutes = express.Router();
import {
  getAllPlayers,
  getPlayerCount,
  getPlayerById,
  addPlayer,
  updatePlayerById,
  deletePlayerById,
  addFlowerToPlayerById,
  getAllFlowersByPlayerId,
} from '../controllers/playerController.js';

// GET /api/players and POST /api/players
playerRoutes.route('/').get(getAllPlayers).post(addPlayer);

// GET /api/players/:id, PUT /api/players/:id, and DELETE /api/players/:id
playerRoutes.route('/:id').get(getPlayerById).put(updatePlayerById).delete(deletePlayerById);

// GET /api/players/count
playerRoutes.route('/get/count').get(getPlayerCount);

//  GET /api/players/:id/flowers and POST /api/players/:id/flowers
playerRoutes.route('/:id/flowers').get(getAllFlowersByPlayerId).post(addFlowerToPlayerById);

export default playerRoutes;
