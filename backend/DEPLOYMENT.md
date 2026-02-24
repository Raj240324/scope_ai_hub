# SCOPE AI HUB — Backend Deployment Guide

## Local Development Setup

### Prerequisites

- Python 3.11+
- PostgreSQL 14+ (running locally or via Docker)

### Step 1: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Configure Environment

```bash
cp .env.example .env
# Edit .env — set your DATABASE_URL and SENDGRID_API_KEY
```

### Step 3: Create Database

```sql
-- In psql or pgAdmin:
CREATE DATABASE scope_ai_hub;
```

### Step 4: Run Migrations

```bash
cd backend
alembic revision --autogenerate -m "initial_schema"
alembic upgrade head
```

### Step 5: Start the Server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

- Health check: `GET /health`
- API docs (dev only): `GET /docs`

---

## Docker Deployment

### Quick Start

```bash
cd backend
docker-compose up --build -d
```

This starts:

- PostgreSQL on port 5432
- FastAPI backend on port 8000
- Runs Alembic migrations automatically before app start

### Check Logs

```bash
docker-compose logs -f backend
```

---

## Render Deployment

1. **Create a PostgreSQL database** in Render Dashboard
2. **Create a Web Service** → connect your repo
3. **Configure:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `cd backend && alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 4 --proxy-headers`
4. **Add Environment Variables** (from `.env.example`)
5. **Set `DATABASE_URL`** to the internal connection string from your Render Postgres
6. **Set `ENV=production`** and **`DEBUG=False`**
7. **Set `FRONTEND_URL`** to your Vercel/Netlify frontend URL

---

## Railway Deployment

1. **Create a new project** → add PostgreSQL plugin
2. **Deploy from GitHub** → select the backend directory
3. **Configure:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `cd backend && alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 4 --proxy-headers`
4. **Add Variables** from `.env.example`
5. Railway auto-provides `DATABASE_URL` from the PostgreSQL plugin
6. **Set `ENV=production`** and **`DEBUG=False`**

---

## Production Checklist

- [ ] `ENV=production`, `DEBUG=False`
- [ ] `SENDGRID_API_KEY` set and sender email verified
- [ ] `FRONTEND_URL` set to actual frontend domain
- [ ] `DATABASE_URL` points to production PostgreSQL
- [ ] `ADMIN_EMAIL` set to correct admin inbox
- [ ] Migrations run: `alembic upgrade head`
- [ ] CORS allows only your frontend origin
- [ ] Rate limiting is active (5/min default)
