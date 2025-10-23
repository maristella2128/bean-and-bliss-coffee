# 🚀 Bean & Bliss Coffee - Complete Deployment Guide

This guide covers deploying your Bean & Bliss Coffee application with:
- **Backend API** on Render (PHP + PostgreSQL)
- **Frontend** on Netlify (React + Vite)
- **Docker** support for local development

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development with Docker](#local-development-with-docker)
3. [Database Setup (PostgreSQL)](#database-setup-postgresql)
4. [Backend Deployment on Render](#backend-deployment-on-render)
5. [Frontend Deployment on Netlify](#frontend-deployment-on-netlify)
6. [Environment Variables](#environment-variables)
7. [Testing the Deployment](#testing-the-deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before you begin, make sure you have:

- ✅ Git installed
- ✅ Docker and Docker Compose installed (for local development)
- ✅ Node.js 18+ and npm installed
- ✅ GitHub account
- ✅ Render account (free tier available)
- ✅ Netlify account (free tier available)

---

## 🐳 Local Development with Docker

### Step 1: Clone the Repository

```bash
git clone https://github.com/maristella2128/bean-and-bliss-coffee.git
cd bean-and-bliss-coffee
```

### Step 2: Set Up Environment Variables

```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your preferred values
# Default values work fine for local development
```

### Step 3: Start Docker Containers

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v
```

### Services Running:
- **API**: http://localhost:8080
- **PostgreSQL**: localhost:5432
- **pgAdmin**: http://localhost:5050

### Step 4: Set Up Frontend for Local Development

```bash
cd Celiscoffeeshop

# Install dependencies
npm install

# Create .env.local file
cp env.example.txt .env.local

# Edit .env.local
echo "VITE_API_URL=http://localhost:8080/api" > .env.local

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:5173

---

## 🗄️ Database Setup (PostgreSQL)

### For Docker (Automatic)
The database is automatically initialized when you run `docker-compose up`.

### For Manual PostgreSQL Setup

```bash
# Connect to PostgreSQL
psql -U postgres

# Run the schema
\i database/beanandblisscoffee_postgresql.sql
```

---

## ☁️ Backend Deployment on Render

### Option 1: Using Render Dashboard (Recommended)

#### Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `beanandbliss-db`
   - **Database**: `beanandblisscoffee`
   - **User**: `beanandbliss_user`
   - **Region**: Choose closest to your users
   - **Plan**: Free
4. Click **"Create Database"**
5. **Save the connection details** (Internal/External Database URL)

#### Step 2: Initialize Database Schema

1. In Render Dashboard, go to your PostgreSQL database
2. Click **"Connect"** → **"External Connection"**
3. Use the psql command provided or use a PostgreSQL client
4. Run the SQL file:
   ```bash
   psql <EXTERNAL_DATABASE_URL> < database/beanandblisscoffee_postgresql.sql
   ```

#### Step 3: Create Web Service for API

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `beanandbliss-api`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: Leave empty
   - **Environment**: `Docker`
   - **Dockerfile Path**: `Dockerfile.render`
   - **Plan**: Free

#### Step 4: Set Environment Variables

In the "Environment" section, add:

```
DB_HOST=<your-postgres-host>.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=beanandblisscoffee
DB_USER=beanandbliss_user
DB_PASSWORD=<your-database-password>
ALLOWED_ORIGINS=https://your-frontend.netlify.app
PORT=10000
```

**Note**: Get DB credentials from your PostgreSQL database page on Render.

5. Click **"Create Web Service"**

#### Step 5: Get Your API URL

After deployment completes, your API will be available at:
```
https://beanandbliss-api.onrender.com
```

**Save this URL** - you'll need it for the frontend deployment.

### Option 2: Using render.yaml (Blueprint)

1. Update `render.yaml` with your frontend URL
2. Push to GitHub
3. In Render Dashboard:
   - Click **"New +"** → **"Blueprint"**
   - Connect your repository
   - Select `render.yaml`
   - Click **"Apply"**

---

## 🌐 Frontend Deployment on Netlify

### Option 1: Using Netlify Dashboard (Recommended)

#### Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Update `Celiscoffeeshop/netlify.toml`:
   ```toml
   [build.environment]
     VITE_API_URL = "https://your-beanandbliss-api.onrender.com/api"
   ```
   Replace with your actual Render API URL from the previous step.

#### Step 2: Deploy on Netlify

1. Go to [Netlify](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **"GitHub"** and select your repository
4. Configure build settings:
   - **Base directory**: `Celiscoffeeshop`
   - **Build command**: `npm run build`
   - **Publish directory**: `Celiscoffeeshop/dist`
5. Add Environment Variables:
   - Key: `VITE_API_URL`
   - Value: `https://your-beanandbliss-api.onrender.com/api`
6. Click **"Deploy site"**

#### Step 3: Custom Domain (Optional)

1. In Netlify site settings, go to **"Domain management"**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `ALLOWED_ORIGINS` in Render environment variables

### Option 2: Using Netlify CLI

```bash
cd Celiscoffeeshop

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy --prod
```

---

## 🔐 Environment Variables

### Backend (Render)

| Variable | Description | Example |
|----------|-------------|---------|
| `DB_HOST` | PostgreSQL host | `xxx.oregon-postgres.render.com` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `beanandblisscoffee` |
| `DB_USER` | Database user | `beanandbliss_user` |
| `DB_PASSWORD` | Database password | `your_secure_password` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `https://yourapp.netlify.app` |
| `PORT` | Server port (Render sets this) | `10000` |

### Frontend (Netlify)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://your-api.onrender.com/api` |
| `NODE_VERSION` | Node.js version | `18` |

---

## 🧪 Testing the Deployment

### 1. Test Backend API

```bash
# Test health
curl https://your-api.onrender.com/api/

# Test contact endpoint
curl -X POST https://your-api.onrender.com/api/contact_pg.php \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "message=Test message"
```

### 2. Test Frontend

1. Visit your Netlify URL: `https://your-site.netlify.app`
2. Test the contact form
3. Test the order form
4. Test user registration
5. Check browser console for any errors

### 3. Test Database Connection

1. Go to pgAdmin in your Docker setup or use Render's psql connect
2. Verify tables were created
3. Check if data is being inserted correctly

---

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors

**Problem**: Frontend can't connect to backend
**Solution**: 
- Verify `ALLOWED_ORIGINS` in Render includes your Netlify URL
- Check that API URLs in frontend config are correct
- Ensure API endpoints have proper CORS headers

#### 2. Database Connection Failed

**Problem**: API can't connect to database
**Solution**:
- Verify database credentials in Render environment variables
- Check that database is in the same region as web service
- Ensure PostgreSQL database is running (check Render dashboard)

#### 3. 404 Errors on Frontend Routes

**Problem**: Refreshing page gives 404
**Solution**: 
- Ensure `netlify.toml` has the redirect rule for SPA
- Check that the file is in the correct location

#### 4. Build Fails on Netlify

**Problem**: Build command fails
**Solution**:
- Check Node version matches (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors
- Ensure `VITE_API_URL` is set in environment variables

#### 5. API Slow or Times Out (Render Free Tier)

**Problem**: First request takes 30+ seconds
**Solution**:
- This is normal on Render's free tier (spins down after inactivity)
- Consider upgrading to a paid plan for 24/7 uptime
- Implement a keep-alive ping (every 14 minutes)

### Render Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- 750 hours/month (enough for 1 service running 24/7)
- Cold starts take 30-60 seconds
- PostgreSQL: 1GB storage, 90 day expiration if inactive

### Logs and Debugging

**Render:**
```bash
# View logs in Render Dashboard
# Or use Render CLI
render logs -s your-service-name
```

**Netlify:**
```bash
# View logs in Netlify Dashboard under "Functions" > "Function logs"
# Or use CLI
netlify logs
```

**Local Docker:**
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs api
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f
```

---

## 📊 Monitoring and Maintenance

### Regular Tasks

1. **Backup Database** (if using Render free tier)
   ```bash
   # Export database
   pg_dump <DATABASE_URL> > backup_$(date +%Y%m%d).sql
   ```

2. **Monitor Usage**
   - Check Render dashboard for service usage
   - Monitor Netlify bandwidth usage
   - Review error logs regularly

3. **Update Dependencies**
   ```bash
   # Frontend
   cd Celiscoffeeshop
   npm update
   
   # Rebuild Docker images
   docker-compose build --no-cache
   ```

---

## 🔄 Continuous Deployment

Both Render and Netlify support automatic deployments:

### Auto-Deploy on Git Push

1. **Render**: Automatically deploys when you push to `main` branch
2. **Netlify**: Automatically deploys when you push to `main` branch

### Disable Auto-Deploy

- **Render**: Service Settings → Build & Deploy → Auto-Deploy (toggle off)
- **Netlify**: Site Settings → Build & Deploy → Continuous Deployment → Stop builds

---

## 🎉 Success Checklist

- [ ] PostgreSQL database created on Render
- [ ] Database schema initialized
- [ ] Backend API deployed on Render
- [ ] Backend environment variables configured
- [ ] API is accessible and responding
- [ ] Frontend deployed on Netlify
- [ ] Frontend environment variables configured
- [ ] CORS configured correctly
- [ ] Contact form works
- [ ] Order form works
- [ ] User registration works
- [ ] Custom domain configured (optional)

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 💡 Tips for Production

1. **Security:**
   - Use strong database passwords
   - Enable 2FA on Render and Netlify
   - Keep dependencies updated
   - Use HTTPS only

2. **Performance:**
   - Enable CDN on Netlify (automatic)
   - Optimize images before uploading
   - Use appropriate cache headers

3. **Monitoring:**
   - Set up Render service notifications
   - Monitor Netlify build notifications
   - Use uptime monitoring service (e.g., UptimeRobot)

4. **Cost Optimization:**
   - Free tiers are great for testing/low traffic
   - Monitor usage to avoid unexpected charges
   - Consider upgrading as traffic grows

---

## 🆘 Need Help?

If you encounter issues:

1. Check the troubleshooting section
2. Review service logs (Render/Netlify dashboard)
3. Check environment variables are correct
4. Verify database connection strings
5. Test API endpoints directly with curl/Postman

---

**Congratulations! Your Bean & Bliss Coffee application is now deployed! ☕**

