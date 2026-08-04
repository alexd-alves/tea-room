// server/routes/health.js

import express from 'express';
const healthRoutes = express.Router();
import { healthCheck } from '../controllers/healthController.js';

// GET /api/health
healthRoutes.route('/').get(healthCheck);

export default healthRoutes;
