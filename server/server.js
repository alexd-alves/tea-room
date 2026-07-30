// server/server.js

require('dotenv').config();
// Load env variables
require('dotenv').config({ path: './server/config.env' });

const express = require('express');
const cors = require('cors');
const connectDatabase = require('./db/conn');
const connectS3 = require('./services/s3client.js');

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

// S3
connectS3((err) => {
  if (err) {
    console.error('Error connecting to S3', err);
  }
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

// Import routes
const playerRoutes = require('./routes/player.js');
const flowerRoutes = require('./routes/flower.js');
const uploadRoutes = require('./routes/upload.js');

// Mount routers
app.use('/api/players', playerRoutes);
app.use('/api/flowers', flowerRoutes);
app.use('/api/upload', uploadRoutes);

// Error handlers

// Listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
