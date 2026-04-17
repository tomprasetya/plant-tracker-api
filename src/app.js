// Express app configuration

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Create app
const app = express();

// Route
app.get('/', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), 'message': 'Hello World!' });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;