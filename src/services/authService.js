// Auth service - handle business logic

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = 10;

/**
 * Register new user
 * @param {Object} userData
 */
const register = async (userData) => {
  const { email, password, nama } = userData;

  // Check if email exists
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    const error = new Error('Email sudah terdaftar');
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await userRepository.create({
    email,
    password: hashedPassword,
    nama,
  });

  // Generate token
  const token = generateToken(user);

  return {
    user,
    token,
  };
};

/**
 * Login user
 * @param {Object} credentials
 */
const login = async (credentials) => {
  const { email, password } = credentials;

  // Find user
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error('Email atau password salah');
    error.statusCode = 401;
    throw error;
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const error = new Error('Email atau password salah');
    error.statusCode = 401;
    throw error;
  }

  // Generate token
  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      nama: user.nama,
      created_at: user.created_at,
    },
    token,
  };
};

/**
 * Generate JWT token
 * @param {Object} user
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      user_id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

module.exports = {
  register,
  login,
};
