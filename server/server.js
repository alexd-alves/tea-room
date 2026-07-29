// server/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./db/conn');

// Import routes
const playerRoutes = require('./routes/player.js');

// Load env variables
require('dotenv').config({ path: './server/config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(
  // Set up CORS to allow requests from the frontend
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json()); // Built in parser

// Mount routers
app.use('/api/players', playerRoutes);

// Error handlers

// Listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Database connection
connectDatabase((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    // Connection successful
    startServer();
  }
});
