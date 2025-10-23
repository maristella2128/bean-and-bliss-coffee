# ⚡ Quick Deployment Guide

Get your Bean & Bliss Coffee app deployed in minutes!

## 🚀 Quick Steps

### 1. Backend (Render) - 5 minutes

```bash
# 1. Create PostgreSQL Database on Render
- Go to: https://dashboard.render.com/
- New + → PostgreSQL
- Name: beanandbliss-db
- Click "Create Database"

# 2. Initialize Database
# Copy the External Database URL and run:
psql <EXTERNAL_DATABASE_URL> < database/beanandblisscoffee_postgresql.sql

# 3. Deploy API
- New + → Web Service
- Connect GitHub repo
- Environment: Docker
- Dockerfile: Dockerfile.render
- Add Environment Variables:
  DB_HOST=<from database page>
  DB_PORT=5432
  DB_NAME=beanandblisscoffee
  DB_USER=<from database page>
  DB_PASSWORD=<from database page>
  ALLOWED_ORIGINS=*
  PORT=10000

# 4. Copy Your API URL
https://your-service.onrender.com
```

### 2. Frontend (Netlify) - 3 minutes

```bash
# 1. Update API URL in netlify.toml
# Edit: Celiscoffeeshop/netlify.toml
# Change: VITE_API_URL = "https://your-api.onrender.com/api"

# 2. Commit and push
git add .
git commit -m "Update API URL"
git push

# 3. Deploy on Netlify
- Go to: https://app.netlify.com/
- New site from Git → GitHub
- Select your repository
- Base directory: Celiscoffeeshop
- Build command: npm run build
- Publish directory: Celiscoffeeshop/dist
- Environment variable:
  VITE_API_URL=https://your-api.onrender.com/api
- Click "Deploy site"
```

### 3. Update CORS (Important!)

```bash
# Go to Render → Your API Service → Environment
# Update ALLOWED_ORIGINS:
ALLOWED_ORIGINS=https://your-site.netlify.app

# Save and redeploy
```

## ✅ Test Your Deployment

1. Visit your Netlify URL
2. Try the contact form
3. Try placing an order
4. Register a new user

## 🐳 Local Development (Optional)

```bash
# Start everything with Docker
docker-compose up -d

# Frontend
cd Celiscoffeeshop
npm install
npm run dev
```

- API: http://localhost:8080
- Frontend: http://localhost:5173
- pgAdmin: http://localhost:5050

## 📝 Environment Variables Cheat Sheet

### Render (Backend)
```
DB_HOST=<postgres-host>.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=beanandblisscoffee
DB_USER=<your-db-user>
DB_PASSWORD=<your-db-password>
ALLOWED_ORIGINS=https://your-site.netlify.app
PORT=10000
```

### Netlify (Frontend)
```
VITE_API_URL=https://your-api.onrender.com/api
NODE_VERSION=18
```

## 🆘 Common Issues

**CORS Error?**
- Update `ALLOWED_ORIGINS` in Render with your Netlify URL

**API Timeout?**
- Render free tier sleeps after 15min inactivity
- First request may take 30-60 seconds

**Build Failed?**
- Check environment variables are set
- Verify Node version is 18+

## 📚 Full Documentation

See `DEPLOYMENT_GUIDE.md` for complete details.

---

**Total Time: ~10 minutes** ⏱️

