#!/bin/bash

# Bean & Bliss Coffee - Quick Setup Script
# This script helps you set up the project for local development

set -e

echo "🚀 Bean & Bliss Coffee - Setup Script"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
echo "Checking prerequisites..."
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker Desktop first.${NC}"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker and Docker Compose are installed${NC}"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    if [ -f env.example ]; then
        cp env.example .env
        echo -e "${GREEN}✅ .env file created${NC}"
        echo -e "${YELLOW}⚠️  Please edit .env file with your configuration${NC}"
    else
        echo -e "${RED}❌ env.example not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi
echo ""

# Ask user what they want to do
echo "What would you like to do?"
echo "1) Start with Docker (Backend + Database)"
echo "2) Setup Frontend only"
echo "3) Full setup (Docker + Frontend)"
echo "4) Stop all services"
echo "5) Clean everything and restart"
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🐳 Starting Docker services..."
        docker-compose up -d
        echo ""
        echo -e "${GREEN}✅ Services started successfully!${NC}"
        echo ""
        echo "📊 Service URLs:"
        echo "   API: http://localhost:8080/api"
        echo "   Database: localhost:5432"
        echo "   pgAdmin: http://localhost:5050"
        echo ""
        echo "📝 To view logs: docker-compose logs -f"
        ;;
    2)
        echo ""
        echo "⚛️  Setting up Frontend..."
        cd Celiscoffeeshop
        
        # Check if .env.local exists
        if [ ! -f .env.local ]; then
            echo "📝 Creating .env.local file..."
            if [ -f env.example.txt ]; then
                cp env.example.txt .env.local
                echo "VITE_API_URL=http://localhost:8080/api" > .env.local
                echo -e "${GREEN}✅ .env.local file created${NC}"
            fi
        fi
        
        if [ ! -d node_modules ]; then
            echo "📦 Installing dependencies..."
            npm install
        else
            echo -e "${GREEN}✅ Dependencies already installed${NC}"
        fi
        
        echo ""
        echo -e "${GREEN}✅ Frontend setup complete!${NC}"
        echo ""
        echo "🚀 To start the development server:"
        echo "   cd Celiscoffeeshop"
        echo "   npm run dev"
        echo ""
        echo "   Then visit: http://localhost:5173"
        ;;
    3)
        echo ""
        echo "🚀 Full setup starting..."
        echo ""
        
        # Start Docker
        echo "🐳 Starting Docker services..."
        docker-compose up -d
        echo -e "${GREEN}✅ Docker services started${NC}"
        echo ""
        
        # Setup Frontend
        echo "⚛️  Setting up Frontend..."
        cd Celiscoffeeshop
        
        if [ ! -f .env.local ]; then
            echo "VITE_API_URL=http://localhost:8080/api" > .env.local
            echo -e "${GREEN}✅ .env.local file created${NC}"
        fi
        
        if [ ! -d node_modules ]; then
            echo "📦 Installing dependencies..."
            npm install
        fi
        
        echo ""
        echo -e "${GREEN}🎉 Full setup complete!${NC}"
        echo ""
        echo "📊 Service URLs:"
        echo "   Frontend: http://localhost:5173 (run 'npm run dev' in Celiscoffeeshop/)"
        echo "   API: http://localhost:8080/api"
        echo "   Database: localhost:5432"
        echo "   pgAdmin: http://localhost:5050"
        echo ""
        echo "🚀 Next steps:"
        echo "   1. cd Celiscoffeeshop"
        echo "   2. npm run dev"
        echo "   3. Visit http://localhost:5173"
        ;;
    4)
        echo ""
        echo "🛑 Stopping all services..."
        docker-compose down
        echo -e "${GREEN}✅ All services stopped${NC}"
        ;;
    5)
        echo ""
        echo -e "${RED}⚠️  WARNING: This will delete all data!${NC}"
        read -p "Are you sure? (yes/no): " confirm
        if [ "$confirm" = "yes" ]; then
            echo "🧹 Cleaning everything..."
            docker-compose down -v
            echo "🐳 Starting fresh..."
            docker-compose up -d
            echo -e "${GREEN}✅ Clean restart complete!${NC}"
        else
            echo "❌ Cancelled"
        fi
        ;;
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo "📖 For more information, see:"
echo "   - DOCKER_GUIDE.md (Docker setup)"
echo "   - QUICK_DEPLOYMENT.md (Cloud deployment)"
echo "   - DEPLOYMENT_GUIDE.md (Full guide)"
echo ""

