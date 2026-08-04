// server/controllers/healthController.js

// @desc Health check endpoint
// @route GET /api/health
// @access Public
const healthCheck = (req, res) => {
  const healthStatus = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    res.status(200).json(healthStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  healthCheck,
};
