// Plant routes

const express = require('express');
const plantController = require('../controllers/plantController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All plant routes require authentication
router.use(authenticate);

// GET /api/v1/plants - Get all plants
router.get('/', plantController.getAllPlants);

// GET /api/v1/plants/:id - Get plant by ID
router.get('/:id', plantController.getPlantById);

// POST /api/v1/plants - Create new plant (with optional file upload)
router.post('/', upload.single('foto'), plantController.createPlant);

// PUT /api/v1/plants/:id - Update plant (with optional file upload)
router.put('/:id', upload.single('foto'), plantController.updatePlant);

// DELETE /api/v1/plants/:id - Delete plant
router.delete('/:id', plantController.deletePlant);

module.exports = router;
