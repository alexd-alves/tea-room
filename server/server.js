// server/server.js

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path: './server/config.env' });
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());
app.use(require('./routes/player.js'));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const connectDatabase = require('./db/conn');

// Call the connectDatabase function and pass the startServer function as a callback
connectDatabase((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    // Database connection successful, start the server
    startServer();
  }
});
