// User repository - handle database operations

const prisma = require('../config/database');

/**
 * Find user by email
 * @param {string} email
 */
const findByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Find user by id
 * @param {number} id
 */
const findById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

/**
 * Create new user
 * @param {Object} data
 */
const create = async (data) => {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      email: true,
      nama: true,
      created_at: true,
    },
  });
};

module.exports = {
  findByEmail,
  findById,
  create,
};
