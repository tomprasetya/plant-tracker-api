// Growth Log controller - handle HTTP requests

const growthLogRepository = require('../repositories/growthLogRepository');
const plantRepository = require('../repositories/plantRepository');
const { successResponse } = require('../utils/response');

/**
 * Get all growth logs for a plant
 */
const getAllGrowthLogs = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plantId = parseInt(req.params.plantId);

    // Check if plant exists and belongs to user
    const plant = await plantRepository.findById(plantId, userId);
    if (!plant) {
      const error = new Error('Tanaman tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    const growthLogs = await growthLogRepository.findAllByPlantId(plantId);

    res.status(200).json(
      successResponse(growthLogs, 'Daftar log pertumbuhan berhasil diambil')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get growth log by ID
 */
const getGrowthLogById = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plantId = parseInt(req.params.plantId);
    const growthLogId = parseInt(req.params.id);

    // Check if plant exists and belongs to user
    const plant = await plantRepository.findById(plantId, userId);
    if (!plant) {
      const error = new Error('Tanaman tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    const growthLog = await growthLogRepository.findById(growthLogId, plantId);

    if (!growthLog) {
      const error = new Error('Log pertumbuhan tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(
      successResponse(growthLog, 'Data log pertumbuhan berhasil diambil')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Create new growth log
 */
const createGrowthLog = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plantId = parseInt(req.params.plantId);
    const { tinggi, kondisi_daun, kondisi_batang, kondisi_akar, catatan, tanggal_log } = req.body;

    // Check if plant exists and belongs to user
    const plant = await plantRepository.findById(plantId, userId);
    if (!plant) {
      const error = new Error('Tanaman tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    // If file uploaded, use the file path
    const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

    const growthLog = await growthLogRepository.create({
      plant_id: plantId,
      tinggi: tinggi ? parseFloat(tinggi) : null,
      kondisi_daun,
      kondisi_batang,
      kondisi_akar,
      catatan,
      foto_url,
      tanggal_log: tanggal_log ? new Date(tanggal_log) : new Date(),
    });

    res.status(201).json(
      successResponse(growthLog, 'Log pertumbuhan berhasil ditambahkan')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update growth log
 */
const updateGrowthLog = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plantId = parseInt(req.params.plantId);
    const growthLogId = parseInt(req.params.id);
    const { tinggi, kondisi_daun, kondisi_batang, kondisi_akar, catatan, tanggal_log } = req.body;

    // Check if plant exists and belongs to user
    const plant = await plantRepository.findById(plantId, userId);
    if (!plant) {
      const error = new Error('Tanaman tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    // Check if growth log exists
    const existingGrowthLog = await growthLogRepository.findById(growthLogId, plantId);
    if (!existingGrowthLog) {
      const error = new Error('Log pertumbuhan tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    // If new file uploaded, use it; otherwise keep existing or use body value
    const foto_url = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.foto_url || existingGrowthLog.foto_url;

    const growthLog = await growthLogRepository.update(growthLogId, {
      tinggi: tinggi ? parseFloat(tinggi) : existingGrowthLog.tinggi,
      kondisi_daun,
      kondisi_batang,
      kondisi_akar,
      catatan,
      foto_url,
      tanggal_log: tanggal_log ? new Date(tanggal_log) : existingGrowthLog.tanggal_log,
    });

    res.status(200).json(
      successResponse(growthLog, 'Log pertumbuhan berhasil diperbarui')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete growth log
 */
const deleteGrowthLog = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plantId = parseInt(req.params.plantId);
    const growthLogId = parseInt(req.params.id);

    // Check if plant exists and belongs to user
    const plant = await plantRepository.findById(plantId, userId);
    if (!plant) {
      const error = new Error('Tanaman tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    // Check if growth log exists
    const existingGrowthLog = await growthLogRepository.findById(growthLogId, plantId);
    if (!existingGrowthLog) {
      const error = new Error('Log pertumbuhan tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    await growthLogRepository.remove(growthLogId);

    res.status(200).json(
      successResponse(null, 'Log pertumbuhan berhasil dihapus')
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGrowthLogs,
  getGrowthLogById,
  createGrowthLog,
  updateGrowthLog,
  deleteGrowthLog,
};
