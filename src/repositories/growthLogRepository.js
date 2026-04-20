// Growth Log repository - handle database operations

const prisma = require('../config/database');

/**
 * Get all growth logs by plant ID
 * @param {number} plantId
 */
const findAllByPlantId = async (plantId) => {
  return await prisma.growthLog.findMany({
    where: { plant_id: plantId },
    orderBy: { tanggal_log: 'desc' },
  });
};

/**
 * Get growth log by ID (with plant ownership check)
 * @param {number} id
 * @param {number} plantId
 */
const findById = async (id, plantId) => {
  return await prisma.growthLog.findFirst({
    where: {
      id,
      plant_id: plantId,
    },
  });
};

/**
 * Create new growth log
 * @param {Object} data
 */
const create = async (data) => {
  return await prisma.growthLog.create({
    data,
  });
};

/**
 * Update growth log
 * @param {number} id
 * @param {Object} data
 */
const update = async (id, data) => {
  return await prisma.growthLog.update({
    where: { id },
    data,
  });
};

/**
 * Delete growth log
 * @param {number} id
 */
const remove = async (id) => {
  return await prisma.growthLog.delete({
    where: { id },
  });
};

module.exports = {
  findAllByPlantId,
  findById,
  create,
  update,
  remove,
};
