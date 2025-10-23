# Bean & Bliss Coffee - Quick Setup Script for Windows
# Run this script in PowerShell

Write-Host "🚀 Bean & Bliss Coffee - Setup Script" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
Write-Host "Checking prerequisites..." -ForegroundColor Yellow
try {
    docker --version | Out-Null
    docker-compose --version | Out-Null
    Write-Host "✅ Docker and Docker Compose are installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}
Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    if (Test-Path env.example) {
        Copy-Item env.example .env
        Write-Host "✅ .env file created" -ForegroundColor Green
        Write-Host "⚠️  Please edit .env file with your configuration" -ForegroundColor Yellow
    } else {
        Write-Host "❌ env.example not found" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}
Write-Host ""

# Ask user what they want to do
Write-Host "What would you like to do?" -ForegroundColor Cyan
Write-Host "1) Start with Docker (Backend + Database)"
Write-Host "2) Setup Frontend only"
Write-Host "3) Full setup (Docker + Frontend)"
Write-Host "4) Stop all services"
Write-Host "5) Clean everything and restart"
$choice = Read-Host "Enter your choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🐳 Starting Docker services..." -ForegroundColor Yellow
        docker-compose up -d
        Write-Host ""
        Write-Host "✅ Services started successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Service URLs:" -ForegroundColor Cyan
        Write-Host "   API: http://localhost:8080/api"
        Write-Host "   Database: localhost:5432"
        Write-Host "   pgAdmin: http://localhost:5050"
        Write-Host ""
        Write-Host "📝 To view logs: docker-compose logs -f"
    }
    "2" {
        Write-Host ""
        Write-Host "⚛️  Setting up Frontend..." -ForegroundColor Yellow
        Set-Location Celiscoffeeshop
        
        # Check if .env.local exists
        if (-not (Test-Path .env.local)) {
            Write-Host "📝 Creating .env.local file..." -ForegroundColor Yellow
            "VITE_API_URL=http://localhost:8080/api" | Out-File -FilePath .env.local -Encoding UTF8
            Write-Host "✅ .env.local file created" -ForegroundColor Green
        }
        
        if (-not (Test-Path node_modules)) {
            Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
            npm install
        } else {
            Write-Host "✅ Dependencies already installed" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "✅ Frontend setup complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 To start the development server:" -ForegroundColor Cyan
        Write-Host "   cd Celiscoffeeshop"
        Write-Host "   npm run dev"
        Write-Host ""
        Write-Host "   Then visit: http://localhost:5173"
        
        Set-Location ..
    }
    "3" {
        Write-Host ""
        Write-Host "🚀 Full setup starting..." -ForegroundColor Cyan
        Write-Host ""
        
        # Start Docker
        Write-Host "🐳 Starting Docker services..." -ForegroundColor Yellow
        docker-compose up -d
        Write-Host "✅ Docker services started" -ForegroundColor Green
        Write-Host ""
        
        # Setup Frontend
        Write-Host "⚛️  Setting up Frontend..." -ForegroundColor Yellow
        Set-Location Celiscoffeeshop
        
        if (-not (Test-Path .env.local)) {
            "VITE_API_URL=http://localhost:8080/api" | Out-File -FilePath .env.local -Encoding UTF8
            Write-Host "✅ .env.local file created" -ForegroundColor Green
        }
        
        if (-not (Test-Path node_modules)) {
            Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
            npm install
        }
        
        Set-Location ..
        
        Write-Host ""
        Write-Host "🎉 Full setup complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Service URLs:" -ForegroundColor Cyan
        Write-Host "   Frontend: http://localhost:5173 (run 'npm run dev' in Celiscoffeeshop/)"
        Write-Host "   API: http://localhost:8080/api"
        Write-Host "   Database: localhost:5432"
        Write-Host "   pgAdmin: http://localhost:5050"
        Write-Host ""
        Write-Host "🚀 Next steps:" -ForegroundColor Cyan
        Write-Host "   1. cd Celiscoffeeshop"
        Write-Host "   2. npm run dev"
        Write-Host "   3. Visit http://localhost:5173"
    }
    "4" {
        Write-Host ""
        Write-Host "🛑 Stopping all services..." -ForegroundColor Yellow
        docker-compose down
        Write-Host "✅ All services stopped" -ForegroundColor Green
    }
    "5" {
        Write-Host ""
        Write-Host "⚠️  WARNING: This will delete all data!" -ForegroundColor Red
        $confirm = Read-Host "Are you sure? (yes/no)"
        if ($confirm -eq "yes") {
            Write-Host "🧹 Cleaning everything..." -ForegroundColor Yellow
            docker-compose down -v
            Write-Host "🐳 Starting fresh..." -ForegroundColor Yellow
            docker-compose up -d
            Write-Host "✅ Clean restart complete!" -ForegroundColor Green
        } else {
            Write-Host "❌ Cancelled" -ForegroundColor Red
        }
    }
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "📖 For more information, see:" -ForegroundColor Cyan
Write-Host "   - DOCKER_GUIDE.md (Docker setup)"
Write-Host "   - QUICK_DEPLOYMENT.md (Cloud deployment)"
Write-Host "   - DEPLOYMENT_GUIDE.md (Full guide)"
Write-Host ""

