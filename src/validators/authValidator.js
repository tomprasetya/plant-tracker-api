// Auth validation schemas dengan Zod

const { z } = require('zod');

const registerSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
});

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

const validateRegister = (data) => {
  return registerSchema.parse(data);
};

const validateLogin = (data) => {
  return loginSchema.parse(data);
};

module.exports = {
  validateRegister,
  validateLogin,
};
