# 🐳 Docker Setup Guide

Complete guide for running Bean & Bliss Coffee with Docker.

## 📋 Prerequisites

- Docker Desktop installed
- Docker Compose installed (included with Docker Desktop)
- Git

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/maristella2128/bean-and-bliss-coffee.git
cd bean-and-bliss-coffee

# Copy environment file
cp env.example .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Frontend (React + Vite)                        │
│  http://localhost:5173                          │
│  (Run separately with npm)                      │
│                                                 │
└────────────────┬────────────────────────────────┘
                 │
                 │ API Calls
                 ▼
┌─────────────────────────────────────────────────┐
│                                                 │
│  API (PHP 8.2 + Apache)                         │
│  http://localhost:8080                          │
│  Container: beanandbliss-api                    │
│                                                 │
└────────────────┬────────────────────────────────┘
                 │
                 │ Database Queries
                 ▼
┌─────────────────────────────────────────────────┐
│                                                 │
│  PostgreSQL 15                                  │
│  localhost:5432                                 │
│  Container: beanandbliss-db                     │
│                                                 │
└─────────────────────────────────────────────────┘
                 │
                 │ Management
                 ▼
┌─────────────────────────────────────────────────┐
│                                                 │
│  pgAdmin 4                                      │
│  http://localhost:5050                          │
│  Container: beanandbliss-pgadmin                │
│                                                 │
└─────────────────────────────────────────────────┘
```

## 📦 Services

### 1. PostgreSQL Database
- **Container**: beanandbliss-db
- **Port**: 5432
- **Database**: beanandblisscoffee
- **User**: postgres
- **Password**: Set in .env file

### 2. PHP API
- **Container**: beanandbliss-api
- **Port**: 8080
- **Base URL**: http://localhost:8080/api

### 3. pgAdmin (Optional)
- **Container**: beanandbliss-pgadmin
- **Port**: 5050
- **Email**: admin@beanandbliss.com
- **Password**: Set in .env file

## ⚙️ Configuration

### Environment Variables (.env)

```bash
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=beanandblisscoffee
DB_USER=postgres
DB_PASSWORD=your_secure_password

# API
API_PORT=8080
ALLOWED_ORIGINS=http://localhost:5173

# pgAdmin
PGADMIN_PORT=5050
PGADMIN_EMAIL=admin@beanandbliss.com
PGADMIN_PASSWORD=admin123
```

## 🎮 Docker Commands

### Start Services

```bash
# Start all services in background
docker-compose up -d

# Start all services with logs visible
docker-compose up

# Start specific service
docker-compose up -d postgres
```

### Stop Services

```bash
# Stop all services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (DELETES DATA!)
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs

# Specific service
docker-compose logs api
docker-compose logs postgres

# Follow logs (real-time)
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100
```

### Service Status

```bash
# List running containers
docker-compose ps

# View resource usage
docker stats
```

### Database Operations

```bash
# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d beanandblisscoffee

# Backup database
docker-compose exec postgres pg_dump -U postgres beanandblisscoffee > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres beanandblisscoffee < backup.sql

# Reset database (WARNING: Deletes all data)
docker-compose down -v
docker-compose up -d
```

### Rebuild Containers

```bash
# Rebuild all services
docker-compose build

# Rebuild without cache
docker-compose build --no-cache

# Rebuild and restart
docker-compose up -d --build
```

## 🔧 Troubleshooting

### Port Already in Use

```bash
# Find process using port (Windows PowerShell)
netstat -ano | findstr :8080

# Kill process by PID
taskkill /PID <process_id> /F

# Or change port in .env file
API_PORT=8081
```

### Database Connection Issues

```bash
# Check if database is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### API Not Responding

```bash
# Check API logs
docker-compose logs api

# Restart API
docker-compose restart api

# Check if port is accessible
curl http://localhost:8080/api/
```

### Container Won't Start

```bash
# Check container status
docker-compose ps

# View detailed logs
docker-compose logs --tail=50 <service_name>

# Remove and recreate
docker-compose down
docker-compose up -d
```

### Clear Everything and Start Fresh

```bash
# CAREFUL: This deletes all data!
docker-compose down -v
docker system prune -a --volumes
docker-compose up -d
```

## 🗃️ Data Persistence

### Volumes

Docker Compose creates persistent volumes:

```yaml
volumes:
  postgres_data:  # Database data
  pgadmin_data:   # pgAdmin configuration
```

### View Volumes

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect coffeeshopcelis_postgres_data

# Remove volume (DELETES DATA!)
docker volume rm coffeeshopcelis_postgres_data
```

## 🧪 Testing

### Test Database Connection

```bash
# From host machine
psql -h localhost -p 5432 -U postgres -d beanandblisscoffee

# From API container
docker-compose exec api php -r "new PDO('pgsql:host=postgres;port=5432;dbname=beanandblisscoffee', 'postgres', 'password');"
```

### Test API Endpoints

```bash
# Contact form
curl -X POST http://localhost:8080/api/contact_pg.php \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "message=Hello from Docker"

# Order form
curl -X POST http://localhost:8080/api/orderform_pg.php \
  -d "order-name=John Doe" \
  -d "order-email=john@example.com" \
  -d "order-phone=1234567890" \
  -d "order-time=14:00" \
  -d "coffee-selection=cappuccino" \
  -d "quantity=2"
```

## 🔍 Monitoring

### Resource Usage

```bash
# Real-time stats
docker stats

# Specific container
docker stats beanandbliss-api
```

### Health Checks

```bash
# API health
curl http://localhost:8080/api/

# Database health
docker-compose exec postgres pg_isready
```

## 🚀 Production Considerations

### DO NOT use this setup for production!

This Docker setup is for **local development only**.

For production:
- Use separate containers for each service
- Implement proper security (secrets, firewall rules)
- Use managed database services (Render, AWS RDS)
- Implement proper backup strategies
- Use container orchestration (Kubernetes, Docker Swarm)
- Configure proper logging and monitoring

See `DEPLOYMENT_GUIDE.md` for production deployment instructions.

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [PHP Docker Image](https://hub.docker.com/_/php)

## ✅ Quick Reference

```bash
# Essential Commands
docker-compose up -d              # Start
docker-compose down              # Stop
docker-compose logs -f           # View logs
docker-compose ps                # Status
docker-compose restart <service> # Restart service

# Database
docker-compose exec postgres psql -U postgres -d beanandblisscoffee

# Cleanup
docker-compose down -v           # Remove all
docker system prune              # Clean unused

# Rebuild
docker-compose build --no-cache
docker-compose up -d --build
```

---

**Happy Dockerizing! 🐳**

