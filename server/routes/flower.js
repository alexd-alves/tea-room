// server/routes/flower.js

import express from 'express';
const flowerRoutes = express.Router();
import {
  getAllFlowers,
  getFlowerCount,
  getFlowerById,
  addFlower,
  updateFlowerById,
  deleteFlowerById,
} from '../controllers/flowerController.js';

// GET /api/flower and POST /api/flower
flowerRoutes.route('/').get(getAllFlowers).post(addFlower);

// GET /api/flower/:id, PUT /api/flower/:id, and DELETE /api/flower/:id
flowerRoutes.route('/:id').get(getFlowerById).put(updateFlowerById).delete(deleteFlowerById);

// GET /api/flowers/count
flowerRoutes.route('/get/count').get(getFlowerCount);

export default flowerRoutes;
