// Growth Log routes (nested under plants)

const express = require('express');
const growthLogController = require('../controllers/growthLogController');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router({ mergeParams: true }); // Enable access to parent route params

// All growth log routes require authentication
router.use(authenticate);

// GET /api/v1/plants/:plantId/growth-logs - Get all growth logs for a plant
router.get('/', growthLogController.getAllGrowthLogs);

// GET /api/v1/plants/:plantId/growth-logs/:id - Get growth log by ID
router.get('/:id', growthLogController.getGrowthLogById);

// POST /api/v1/plants/:plantId/growth-logs - Create new growth log (with optional file upload)
router.post('/', upload.single('foto'), growthLogController.createGrowthLog);

// PUT /api/v1/plants/:plantId/growth-logs/:id - Update growth log (with optional file upload)
router.put('/:id', upload.single('foto'), growthLogController.updateGrowthLog);

// DELETE /api/v1/plants/:plantId/growth-logs/:id - Delete growth log
router.delete('/:id', growthLogController.deleteGrowthLog);

module.exports = router;
