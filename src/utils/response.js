// Response formatter dengan snake_case keys

/**
 * Format success response
 * @param {Object} data - Data response
 * @param {string} message - Pesan sukses
 * @returns {Object} Formatted response
 */
const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    data,
    message,
  };
};

/**
 * Format error response
 * @param {string} message - Pesan error
 * @param {number} statusCode - HTTP status code
 * @returns {Object} Formatted error response
 */
const errorResponse = (message, statusCode = 400) => {
  return {
    success: false,
    error: {
      message,
      status_code: statusCode,
    },
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
