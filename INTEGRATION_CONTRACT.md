# Integration Contract (Flutter Integration)

Dokumen ini berisi kontrak integrasi antara Backend API dan Aplikasi Flutter untuk memastikan kompatibilitas dan konsistensi data.

## Base URL

```
/api/v1
```

## CORS Configuration

- **Enabled**: Yes
- **Allowed Origins**: `*` (all origins) - untuk development
- **Production**: Sesuaikan dengan domain Flutter app

## Authentication

Semua endpoint (kecuali register dan login) memerlukan autentikasi menggunakan **Bearer Token**.

### Header Format

```
Authorization: Bearer <jwt_token>
```

### Contoh

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Response Format Standard

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Pesan sukses"
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Pesan error",
    "status_code": 400
  }
}
```

## Naming Convention

- **Semua response JSON menggunakan `snake_case`**
- Contoh: `nama_tanaman`, `user_id`, `created_at`, `tinggi_saat_ini`

---

## Endpoints

### Authentication

#### 1. Register

```
POST /api/v1/auth/register
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "nama": "John Doe"
}
```

**Success Response (201):**

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

#### 2. Login

```
POST /api/v1/auth/login
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**

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

#### 3. Get Current User

```
GET /api/v1/auth/me
```

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "nama": "John Doe",
    "created_at": "2026-01-15T08:30:00.000Z",
    "updated_at": "2026-01-15T08:30:00.000Z"
  },
  "message": "Data user berhasil diambil"
}
```

#### 4. Logout

```
POST /api/v1/auth/logout
```

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": null,
  "message": "Logout berhasil"
}
```

---

### Plants (Tanaman)

#### 5. Get All Plants

```
GET /api/v1/plants
```

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "nama_tanaman": "Monstera Deliciosa",
      "jenis": "Tanaman Hias",
      "tanggal_tanam": "2026-01-10T00:00:00.000Z",
      "status": "aktif",
      "foto_url": "/uploads/monstera-123.jpg",
      "created_at": "2026-01-10T08:00:00.000Z",
      "updated_at": "2026-01-15T10:00:00.000Z"
    }
  ],
  "message": "Daftar tanaman berhasil diambil"
}
```

#### 6. Get Plant by ID

```
GET /api/v1/plants/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "nama_tanaman": "Monstera Deliciosa",
    "jenis": "Tanaman Hias",
    "tanggal_tanam": "2026-01-10T00:00:00.000Z",
    "status": "aktif",
    "foto_url": "/uploads/monstera-123.jpg",
    "created_at": "2026-01-10T08:00:00.000Z",
    "updated_at": "2026-01-15T10:00:00.000Z"
  },
  "message": "Data tanaman berhasil diambil"
}
```

#### 7. Create Plant

```
POST /api/v1/plants
```

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nama_tanaman` | string | Yes | Nama tanaman |
| `jenis` | string | No | Jenis tanaman |
| `tanggal_tanam` | string (ISO date) | No | Tanggal tanam (YYYY-MM-DD) |
| `status` | string | No | Status: `aktif`, `nonaktif`, `panen` |
| `foto` | file | No | File gambar tanaman |

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 2,
    "user_id": 1,
    "nama_tanaman": "Lidah Mertua",
    "jenis": "Tanaman Hias",
    "tanggal_tanam": "2026-01-20T00:00:00.000Z",
    "status": "aktif",
    "foto_url": "/uploads/lidah-mertua-456.jpg",
    "created_at": "2026-01-20T09:00:00.000Z",
    "updated_at": "2026-01-20T09:00:00.000Z"
  },
  "message": "Tanaman berhasil ditambahkan"
}
```

#### 8. Update Plant

```
PUT /api/v1/plants/:id
```

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nama_tanaman` | string | No | Nama tanaman |
| `jenis` | string | No | Jenis tanaman |
| `tanggal_tanam` | string (ISO date) | No | Tanggal tanam |
| `status` | string | No | Status tanaman |
| `foto_url` | string | No | URL foto existing (jika tidak upload foto baru) |
| `foto` | file | No | File gambar baru |

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "nama_tanaman": "Monstera Variegata",
    "jenis": "Tanaman Hias Langka",
    "tanggal_tanam": "2026-01-10T00:00:00.000Z",
    "status": "aktif",
    "foto_url": "/uploads/monstera-updated.jpg",
    "created_at": "2026-01-10T08:00:00.000Z",
    "updated_at": "2026-01-25T14:00:00.000Z"
  },
  "message": "Tanaman berhasil diperbarui"
}
```

#### 9. Delete Plant

```
DELETE /api/v1/plants/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": null,
  "message": "Tanaman berhasil dihapus"
}
```

---

### Growth Logs (Log Pertumbuhan)

**Base Path:** `/api/v1/plants/:plantId/growth-logs`

#### 10. Get All Growth Logs for a Plant

```
GET /api/v1/plants/:plantId/growth-logs
```

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "plant_id": 1,
      "tinggi": 25.5,
      "kondisi_daun": "Hijau segar, tidak ada kuning",
      "kondisi_batang": "Kokoh, tidak ada gejala busuk",
      "kondisi_akar": "Baik, tidak keluar dari pot",
      "catatan": "Pertumbuhan bagus, tambah pupuk minggu depan",
      "foto_url": "/uploads/growth-1.jpg",
      "tanggal_log": "2026-01-15T00:00:00.000Z",
      "created_at": "2026-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "plant_id": 1,
      "tinggi": 22.0,
      "kondisi_daun": "Sedikit kuning di ujung",
      "kondisi_batang": "Baik",
      "kondisi_akar": "Normal",
      "catatan": "Perlu perhatian daun yang menguning",
      "foto_url": null,
      "tanggal_log": "2026-01-10T00:00:00.000Z",
      "created_at": "2026-01-10T08:00:00.000Z"
    }
  ],
  "message": "Daftar log pertumbuhan berhasil diambil"
}
```

#### 11. Get Growth Log by ID

```
GET /api/v1/plants/:plantId/growth-logs/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

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
    "tanggal_log": "2026-01-15T00:00:00.000Z",
    "created_at": "2026-01-15T10:30:00.000Z"
  },
  "message": "Data log pertumbuhan berhasil diambil"
}
```

#### 12. Create Growth Log

```
POST /api/v1/plants/:plantId/growth-logs
```

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tinggi` | number | No | Tinggi tanaman (cm) |
| `kondisi_daun` | string | No | Kondisi daun |
| `kondisi_batang` | string | No | Kondisi batang |
| `kondisi_akar` | string | No | Kondisi akar |
| `catatan` | string | No | Catatan tambahan |
| `tanggal_log` | string (ISO date) | No | Tanggal log (default: sekarang) |
| `foto` | file | No | Foto dokumentasi |

**Success Response (201):**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "plant_id": 1,
    "tinggi": 28.0,
    "kondisi_daun": "Sangat hijau dan lebat",
    "kondisi_batang": "Kokoh",
    "kondisi_akar": "Baik",
    "catatan": "Sudah dipupuk",
    "foto_url": "/uploads/growth-3.jpg",
    "tanggal_log": "2026-01-25T00:00:00.000Z",
    "created_at": "2026-01-25T09:00:00.000Z"
  },
  "message": "Log pertumbuhan berhasil ditambahkan"
}
```

#### 13. Update Growth Log

```
PUT /api/v1/plants/:plantId/growth-logs/:id
```

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):** (sama dengan create, semua field optional)

**Success Response (200):**

```json
{
  "success": true,
  "data": {
    "id": 3,
    "plant_id": 1,
    "tinggi": 29.5,
    "kondisi_daun": "Sangat hijau dan lebat, ada tunas baru",
    "kondisi_batang": "Kokoh",
    "kondisi_akar": "Baik",
    "catatan": "Sudah dipupuk, ada pertumbuhan baru",
    "foto_url": "/uploads/growth-3-updated.jpg",
    "tanggal_log": "2026-01-25T00:00:00.000Z",
    "created_at": "2026-01-25T09:00:00.000Z"
  },
  "message": "Log pertumbuhan berhasil diperbarui"
}
```

#### 14. Delete Growth Log

```
DELETE /api/v1/plants/:plantId/growth-logs/:id
```

**Headers:**

```
Authorization: Bearer <token>
```

**Success Response (200):**

```json
{
  "success": true,
  "data": null,
  "message": "Log pertumbuhan berhasil dihapus"
}
```

---

## Error Codes

| Status Code | Meaning | Contoh Kasus |
|-------------|---------|--------------|
| 400 | Bad Request | Validation error, data tidak valid |
| 401 | Unauthorized | Token tidak ada, token expired, token invalid |
| 404 | Not Found | Resource tidak ditemukan |
| 409 | Conflict | Email sudah terdaftar |
| 500 | Internal Server Error | Server error |

## Flutter Integration Notes

1. **Gunakan `snake_case`** untuk semua key JSON di request dan response
2. **Simpan JWT token** secara aman (Flutter Secure Storage)
3. **Include token** di header `Authorization: Bearer <token>` untuk semua request yang memerlukan autentikasi
4. **Upload file** menggunakan `multipart/form-data`
5. **Base URL untuk API calls**: `/api/v1`
