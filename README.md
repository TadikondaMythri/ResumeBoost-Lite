# ResumeBoost AI

ResumeBoost Lite is a production-ready full-stack web application that helps students and job seekers upload a PDF resume, extract its text, and calculate a basic ATS score against a predefined technical skill set.

## Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: FastAPI, SQLAlchemy
- Database: PostgreSQL
- Deployment: Vercel frontend, Railway backend

## Project Structure

```text
ResumeBoost AI/
  backend/
  frontend/
```

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

Set `DATABASE_URL` in `backend/.env` before starting the API.

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` in `frontend/.env` to your backend URL.

## API

- `POST /upload-resume` uploads and analyzes a PDF resume.
- `GET /analysis/{id}` returns a stored analysis by ID.

## Docker

Run the full app locally with PostgreSQL:

```bash
docker compose up --build
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8000`

## Deployment

### Railway Backend

1. Create a PostgreSQL database in Railway.
2. Deploy the `backend/` directory.
3. Add environment variables from `backend/.env.example`.
4. Set `FRONTEND_ORIGIN` to your Vercel app URL.

### Vercel Frontend

1. Deploy the `frontend/` directory.
2. Add `VITE_API_BASE_URL` pointing to your Railway backend URL.

