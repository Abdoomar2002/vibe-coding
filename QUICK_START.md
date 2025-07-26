# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

## 🏃‍♂️ Quick Setup

### 1. Clone and Setup
```bash
git clone https://github.com/Abdoomar2002/vibe-coding.git
cd vibe-coding
```

### 2. Backend Setup
```bash
cd backend
npm install --legacy-peer-deps
cp env.example .env
npm run start:dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **API Health**: http://localhost:4000/health

## 🐳 Docker Setup (Alternative)
```bash
docker-compose up -d
```

## 🧪 Test the Application
1. Open http://localhost:3000
2. Enter a website idea (e.g., "Landing page for bakery")
3. Click "Generate Sections"
4. View AI-generated sections
5. Explore statistics and search functionality

## 📚 Full Documentation
See [README.md](README.md) for comprehensive documentation.

## 🆘 Troubleshooting
- **Dependency issues**: Use `npm install --legacy-peer-deps` for backend
- **MongoDB connection**: Ensure MongoDB is running on localhost:27017
- **Port conflicts**: Check if ports 3000 and 4000 are available 