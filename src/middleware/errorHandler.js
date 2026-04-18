// Global error handler middleware

const { errorResponse } = require('../utils/response');

/**
 * Error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma error handling
  if (err.code) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0] || 'field';
      return res.status(409).json(
        errorResponse(`${field} sudah digunakan`, 409)
      );
    }

    // Record not found
    if (err.code === 'P2025') {
      return res.status(404).json(
        errorResponse('Data tidak ditemukan', 404)
      );
    }

    // Foreign key constraint
    if (err.code === 'P2003') {
      return res.status(400).json(
        errorResponse('Referensi data tidak valid', 400)
      );
    }
  }

  // Zod validation error
  if (err.name === 'ZodError') {
    const messages = err.errors.map((e) => e.message);
    return res.status(400).json(
      errorResponse(messages.join(', '), 400)
    );
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(
      errorResponse('Token tidak valid', 401)
    );
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(
      errorResponse('Token sudah expired', 401)
    );
  }

  // Default error
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json(errorResponse(message, statusCode));
};

/**
 * Not found handler
 */
const notFoundHandler = (req, res) => {
  res.status(404).json(
    errorResponse(`Route ${req.originalUrl} tidak ditemukan`, 404)
  );
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
