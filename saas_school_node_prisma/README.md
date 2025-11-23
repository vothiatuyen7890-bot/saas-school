# saas-school-node-prisma (demo scaffold)

This scaffold contains a minimal Node.js + Express + Prisma backend and a Next.js frontend.
It is intended as a starting point for the "Web quản lý điểm của học sinh" SaaS.

## Quick start (local)

1. Start Postgres:
   - With Docker Compose: `docker-compose up -d db`
   - Or run a local Postgres and set DATABASE_URL in backend/.env

2. Backend:
   - cd backend
   - npm install
   - npx prisma generate
   - npx prisma migrate dev --name init
   - npm run seed
   - npm run dev

3. Frontend:
   - cd frontend
   - npm install
   - NEXT_PUBLIC_API_URL=http://localhost:4000 npm run dev

## Notes
- This is a scaffold. Expand models, add validation, and secure tokens for production.
- If you deploy to Render, create two web services (backend and frontend) and a managed Postgres.
