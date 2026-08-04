// server/server.mjs

import dotenv from 'dotenv';
// Load env variables
dotenv.configDotenv();

import express from 'express';
import cors from 'cors';

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

// Database connection
import connectDatabase from './db/conn.js';
connectDatabase((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  }
});

// Import routes
import playerRoutes from './routes/player.js';
import flowerRoutes from './routes/flower.js';
import uploadRoutes from './routes/upload.js';
import healthRoutes from './routes/health.js';

// Mount routers
app.use('/api/players', playerRoutes);
app.use('/api/flowers', flowerRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/health', healthRoutes);

// Error handlers

// Listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
