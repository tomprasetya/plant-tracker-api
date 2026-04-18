// Auth controller - handle HTTP requests

const authService = require('../services/authService');
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

module.exports = {
  register,
  login,
};
