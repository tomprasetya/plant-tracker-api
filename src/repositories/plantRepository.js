// Plant repository - handle database operations

const prisma = require('../config/database');

/**
 * Get all plants by user ID
 * @param {number} userId
 */
const findAllByUserId = async (userId) => {
  return await prisma.plant.findMany({
    where: { user_id: userId },
    orderBy: { created_at: 'desc' },
  });
};

/**
 * Get plant by ID (check ownership)
 * @param {number} id
 * @param {number} userId
 */
const findById = async (id, userId) => {
  return await prisma.plant.findFirst({
    where: {
      id,
      user_id: userId,
    },
  });
};

/**
 * Create new plant
 * @param {Object} data
 */
const create = async (data) => {
  return await prisma.plant.create({
    data,
  });
};

/**
 * Update plant
 * @param {number} id
 * @param {Object} data
 */
const update = async (id, data) => {
  return await prisma.plant.update({
    where: { id },
    data,
  });
};

/**
 * Delete plant
 * @param {number} id
 */
const remove = async (id) => {
  return await prisma.plant.delete({
    where: { id },
  });
};

module.exports = {
  findAllByUserId,
  findById,
  create,
  update,
  remove,
};
