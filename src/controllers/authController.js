// Auth controller - handle HTTP requests

const authService = require('../services/authService');
const userRepository = require('../repositories/userRepository');
const { validateRegister, validateLogin } = require('../validators/authValidator');
const { successResponse } = require('../utils/response');

/**
 * Register user
 */
const register = async (req, res, next) => {
  try {
    // Validate input
    const validData = validateRegister(req.body);

    // Call service
    const result = await authService.register(validData);

    res.status(201).json(
      successResponse(result, 'Registrasi berhasil')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
const login = async (req, res, next) => {
  try {
    // Validate input
    const validData = validateLogin(req.body);

    // Call service
    const result = await authService.login(validData);

    res.status(200).json(
      successResponse(result, 'Login berhasil')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Logout user
 */
const logout = async (req, res, next) => {
  try {
    // JWT is stateless - client should delete the token
    res.status(200).json(
      successResponse(null, 'Logout berhasil')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user
 */
const me = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const user = await userRepository.findById(userId);

    if (!user) {
      const error = new Error('User tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json(
      successResponse(userWithoutPassword, 'Data user berhasil diambil')
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  me,
};
