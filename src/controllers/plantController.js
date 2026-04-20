// Plant controller - handle HTTP requests

const plantRepository = require('../repositories/plantRepository');
const { successResponse } = require('../utils/response');

/**
 * Get all plants for current user
 */
const getAllPlants = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plants = await plantRepository.findAllByUserId(userId);

    res.status(200).json(
      successResponse(plants, 'Daftar tanaman berhasil diambil')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get plant by ID
 */
const getPlantById = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plantId = parseInt(req.params.id);

    const plant = await plantRepository.findById(plantId, userId);

    if (!plant) {
      const error = new Error('Tanaman tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(
      successResponse(plant, 'Data tanaman berhasil diambil')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Create new plant
 */
const createPlant = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const { nama_tanaman, jenis, tanggal_tanam, status } = req.body;

    // If file uploaded, use the file path
    const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

    const plant = await plantRepository.create({
      user_id: userId,
      nama_tanaman,
      jenis,
      tanggal_tanam: tanggal_tanam ? new Date(tanggal_tanam) : null,
      status: status || 'aktif',
      foto_url,
    });

    res.status(201).json(
      successResponse(plant, 'Tanaman berhasil ditambahkan')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update plant
 */
const updatePlant = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plantId = parseInt(req.params.id);
    const { nama_tanaman, jenis, tanggal_tanam, status } = req.body;

    // Check if plant exists and belongs to user
    const existingPlant = await plantRepository.findById(plantId, userId);

    if (!existingPlant) {
      const error = new Error('Tanaman tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    // If new file uploaded, use it; otherwise keep existing or use body value
    const foto_url = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.foto_url || existingPlant.foto_url;

    const plant = await plantRepository.update(plantId, {
      nama_tanaman,
      jenis,
      tanggal_tanam: tanggal_tanam ? new Date(tanggal_tanam) : null,
      status,
      foto_url,
    });

    res.status(200).json(
      successResponse(plant, 'Tanaman berhasil diperbarui')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete plant
 */
const deletePlant = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const plantId = parseInt(req.params.id);

    // Check if plant exists and belongs to user
    const existingPlant = await plantRepository.findById(plantId, userId);

    if (!existingPlant) {
      const error = new Error('Tanaman tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    await plantRepository.remove(plantId);

    res.status(200).json(
      successResponse(null, 'Tanaman berhasil dihapus')
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
};
