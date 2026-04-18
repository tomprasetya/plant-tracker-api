# Plant Grow Tracker API

Backend API untuk aplikasi Plant Grow Tracker (Flutter).

## Tech Stack

- Node.js + Express.js
- MySQL + Prisma ORM
- JWT Authentication
- Zod Validation

## Setup (MySQL Required)

```bash
# 1. Install dependencies
npm install

# 2. Setup database MySQL
# - Pastikan MySQL sudah running
# - Buat database: CREATE DATABASE plant_tracker;
# - Copy .env.example ke .env dan sesuaikan DATABASE_URL

# 3. Run migration
npx prisma migrate dev

# 4. Generate Prisma client
npm run db:generate

# 5. Run server
npm run dev
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | MySQL connection URL | `mysql://root:pass@localhost:3306/plant_tracker` |
| `JWT_SECRET` | Secret key JWT | `your-secret-key` |
| `JWT_EXPIRES_IN` | JWT expiration | `7d` |

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login user |

## Response Format

```json
{
  "success": true/false,
  "data": { ... },
  "message": "..."
}
```

## Scripts

- `npm run dev` - Run dengan nodemon
- `npm run db:migrate` - Run Prisma migrate
- `npm run db:studio` - Buka Prisma Studio
