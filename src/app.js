// Express app configuration

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Load env vars
 dotenv.config();

// Create app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

module.exports = app;
