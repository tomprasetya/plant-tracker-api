# Plant Grow Tracker API

Backend API untuk aplikasi **Pelacak Pertumbuhan Tanaman** (Plant Growth Tracker) yang dibangun dengan Node.js dan Express. API ini mendukung aplikasi Flutter untuk mencatat dan memantau pertumbuhan tanaman.

## Project Overview

Aplikasi ini memungkinkan pengguna untuk:
- Mencatat data tanaman (nama, jenis, tanggal tanam, foto)
- Memantau pertumbuhan tanaman dengan log berkala
- Mengupload foto dokumentasi pertumbuhan
- Melacak kondisi daun, batang, dan akar tanaman

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL |
| ORM | Prisma |
| Authentication | JWT (JSON Web Token) |
| Validation | Zod |
| File Upload | Multer |
| Password Hash | bcrypt |

## Database Schema (ERD)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     users       │     │     plants      │     │  growth_logs    │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id (PK)         │────<│ id (PK)         │────<│ id (PK)         │
│ email           │  1:N  │ user_id (FK)    │  1:N  │ plant_id (FK)   │
│ password        │       │ nama_tanaman    │       │ tinggi          │
│ nama            │       │ jenis           │       │ kondisi_daun    │
│ created_at      │       │ tanggal_tanam   │       │ kondisi_batang  │
│ updated_at      │       │ status          │       │ kondisi_akar    │
└─────────────────┘       │ foto_url        │       │ catatan         │
                          │ created_at      │       │ foto_url        │
                          │ updated_at      │       │ tanggal_log     │
                          └─────────────────┘       │ created_at      │
                                                    └─────────────────┘
```

**Catatan:** Semua field menggunakan `snake_case` untuk konsistensi dengan Flutter app.

## Setup (MySQL Required)

```bash
# 1. Clone repository
git clone <repo-url>
cd plant-tracker-api

# 2. Install dependencies
npm install

# 3. Setup database MySQL
# - Pastikan MySQL sudah running
# - Buat database: CREATE DATABASE plant_tracker;
# - Copy .env.example ke .env dan sesuaikan DATABASE_URL

# 4. Run migration
npx prisma migrate dev

# 5. Generate Prisma client
npm run db:generate

# 6. Run server
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | MySQL connection URL | `mysql://root:password@localhost:3306/plant_tracker` |
| `JWT_SECRET` | Secret key JWT | `your-secret-key-here` |
| `JWT_EXPIRES_IN` | JWT expiration | `7d` |

## API Documentation

### Base URL

```
/api/v1
```

### Authentication

Semua endpoint (kecuali register dan login) memerlukan **Bearer Token** di header:

```
Authorization: Bearer <jwt_token>
```

### Endpoints

#### Auth

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/v1/auth/register` | No | Register user baru |
| POST | `/api/v1/auth/login` | No | Login user |
| POST | `/api/v1/auth/logout` | Yes | Logout user |
| GET | `/api/v1/auth/me` | Yes | Get data user saat ini |

#### Plants

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/v1/plants` | Yes | Get semua tanaman user |
| GET | `/api/v1/plants/:id` | Yes | Get detail tanaman |
| POST | `/api/v1/plants` | Yes | Tambah tanaman baru |
| PUT | `/api/v1/plants/:id` | Yes | Update tanaman |
| DELETE | `/api/v1/plants/:id` | Yes | Hapus tanaman |

#### Growth Logs (Log Pertumbuhan)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/v1/plants/:plantId/growth-logs` | Yes | Get semua log untuk tanaman |
| GET | `/api/v1/plants/:plantId/growth-logs/:id` | Yes | Get detail log |
| POST | `/api/v1/plants/:plantId/growth-logs` | Yes | Tambah log baru |
| PUT | `/api/v1/plants/:plantId/growth-logs/:id` | Yes | Update log |
| DELETE | `/api/v1/plants/:plantId/growth-logs/:id` | Yes | Hapus log |

## Request/Response Examples

### Response Format Standard

**Success:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Pesan sukses"
}
```

**Error:**

```json
{
  "success": false,
  "error": {
    "message": "Pesan error",
    "status_code": 400
  }
}
```

### 1. Register User

**Request:**

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "nama": "John Doe"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "nama": "John Doe",
      "created_at": "2026-01-15T08:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Registrasi berhasil"
}
```

### 2. Login User

**Request:**

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "nama": "John Doe",
      "created_at": "2026-01-15T08:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login berhasil"
}
```

### 3. Create Plant

**Request:**

```http
POST /api/v1/plants
Authorization: Bearer <token>
Content-Type: multipart/form-data

nama_tanaman: Monstera Deliciosa
jenis: Tanaman Hias
tanggal_tanam: 2026-01-20
status: aktif
foto: [file image]
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "nama_tanaman": "Monstera Deliciosa",
    "jenis": "Tanaman Hias",
    "tanggal_tanam": "2026-01-20T00:00:00.000Z",
    "status": "aktif",
    "foto_url": "/uploads/monstera-123.jpg",
    "created_at": "2026-01-20T09:00:00.000Z",
    "updated_at": "2026-01-20T09:00:00.000Z"
  },
  "message": "Tanaman berhasil ditambahkan"
}
```

### 4. Create Growth Log

**Request:**

```http
POST /api/v1/plants/1/growth-logs
Authorization: Bearer <token>
Content-Type: multipart/form-data

tinggi: 25.5
kondisi_daun: Hijau segar
kondisi_batang: Kokoh
kondisi_akar: Baik
catatan: Pertumbuhan bagus
tanggal_log: 2026-01-25
foto: [file image]
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "plant_id": 1,
    "tinggi": 25.5,
    "kondisi_daun": "Hijau segar",
    "kondisi_batang": "Kokoh",
    "kondisi_akar": "Baik",
    "catatan": "Pertumbuhan bagus",
    "foto_url": "/uploads/growth-1.jpg",
    "tanggal_log": "2026-01-25T00:00:00.000Z",
    "created_at": "2026-01-25T10:30:00.000Z"
  },
  "message": "Log pertumbuhan berhasil ditambahkan"
}
```

### 5. Get All Plants

**Request:**

```http
GET /api/v1/plants
Authorization: Bearer <token>
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "nama_tanaman": "Monstera Deliciosa",
      "jenis": "Tanaman Hias",
      "tanggal_tanam": "2026-01-20T00:00:00.000Z",
      "status": "aktif",
      "foto_url": "/uploads/monstera-123.jpg",
      "created_at": "2026-01-20T09:00:00.000Z",
      "updated_at": "2026-01-20T09:00:00.000Z"
    }
  ],
  "message": "Daftar tanaman berhasil diambil"
}
```

## Integration Contract

Untuk dokumentasi lengkap integrasi dengan Flutter, lihat file:

📄 **[INTEGRATION_CONTRACT.md](./INTEGRATION_CONTRACT.md)**

Isi dokumentasi tersebut mencakup:
- Format autentikasi (Bearer Token)
- Konvensi `snake_case` untuk semua response JSON
- Contoh payload lengkap untuk semua endpoint
- Error codes dan penanganannya
- Catatan integrasi khusus Flutter

## Project Structure

```
plant-tracker-api/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── config/
│   │   └── database.js     # Prisma client config
│   ├── controllers/        # HTTP request handlers
│   │   ├── authController.js
│   │   ├── plantController.js
│   │   └── growthLogController.js
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   ├── errorHandler.js
│   │   └── upload.js       # File upload handler
│   ├── repositories/       # Database operations
│   │   ├── userRepository.js
│   │   ├── plantRepository.js
│   │   └── growthLogRepository.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── plantRoutes.js
│   │   └── growthLogRoutes.js
│   ├── services/           # Business logic
│   │   └── authService.js
│   ├── validators/         # Input validation
│   │   └── authValidator.js
│   ├── utils/              # Utilities
│   │   └── response.js     # Response formatter
│   └── app.js              # Express app config
├── uploads/                # Uploaded files storage
├── .env.example            # Environment variables template
├── .gitignore
├── INTEGRATION_CONTRACT.md # Flutter integration docs
├── package.json
├── README.md
└── server.js               # Entry point
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run server dengan nodemon (development) |
| `npm start` | Run server (production) |
| `npm run db:migrate` | Run Prisma migration |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:studio` | Buka Prisma Studio (GUI database) |

## Key Features

- ✅ **JWT Authentication** - Bearer token untuk semua protected routes
- ✅ **Password Hashing** - bcrypt dengan salt rounds 10
- ✅ **Snake Case JSON** - Semua response menggunakan `snake_case`
- ✅ **CORS Enabled** - Mendukung cross-origin requests
- ✅ **File Upload** - Upload foto tanaman dan log dengan Multer
- ✅ **Input Validation** - Zod untuk validasi request body
- ✅ **Layered Architecture** - Controller → Service → Repository pattern
- ✅ **Error Handling** - Centralized error handler

## License

ISC
