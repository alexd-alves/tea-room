// server/routes/health.js

const express = require('express');
const healthRoutes = express.Router();
const { healthCheck } = require('../controllers/healthController.js');

// GET /api/health
healthRoutes.route('/').get(healthCheck);

module.exports = healthRoutes;
