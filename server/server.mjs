// server/server.mjs

import { configDotenv } from 'dotenv';
// Load env variables
configDotenv({ path: '.env' });

import express from 'express';
import cors from 'cors';
import connectDatabase from './db/conn.js';
import connectS3 from './services/s3client.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(
  // Set up CORS to allow requests from the frontend
  cors({
    origin: process.env.VITE_FRONTEND_URL,
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
import playerRoutes from './routes/player.js';
import flowerRoutes from './routes/flower.js';
import uploadRoutes from './routes/upload.js';

// Mount routers
app.use('/api/players', playerRoutes);
app.use('/api/flowers', flowerRoutes);
app.use('/api/upload', uploadRoutes);

// Error handlers

// Listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
