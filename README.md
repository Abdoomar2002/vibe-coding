# 🚀 Vibe Coding - AI Website Section Generator

A sophisticated full-stack application that generates intelligent, contextual website sections using advanced AI-powered analysis. Built with modern technologies and enterprise-grade architecture.

![Vibe Coding](https://img.shields.io/badge/Vibe-Coding-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-11.1.5-red?style=for-the-badge&logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-7.8.7-green?style=for-the-badge&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=for-the-badge&logo=typescript)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Vibe Coding is an intelligent website section generator that analyzes user input and generates contextual, relevant sections for various types of websites. The application uses advanced AI algorithms to understand website types and suggest appropriate sections without requiring external API keys.

### Key Highlights

- **🤖 AI-Powered Analysis**: Intelligent contextual understanding of website types
- **⚡ Real-time Generation**: Instant section generation with no external dependencies
- **🎨 Modern UI/UX**: Beautiful, responsive interface with smooth animations
- **🏗️ Enterprise Architecture**: Scalable, maintainable codebase with best practices
- **🔒 Type Safety**: Full TypeScript implementation with strict typing
- **📊 Analytics**: Built-in statistics and insights
- **🔍 Search & Filter**: Advanced search capabilities with pagination

## ✨ Features

### Core Functionality
- **Intelligent Section Generation**: AI-powered analysis of website ideas
- **Contextual Understanding**: Recognizes 14+ website types automatically
- **Real-time Processing**: Instant results without external API calls
- **Data Persistence**: MongoDB integration with optimized queries
- **Search & Filter**: Full-text search with relevance scoring

### User Experience
- **Modern Interface**: Beautiful, responsive design with Tailwind CSS
- **Smooth Animations**: Framer Motion powered interactions
- **Real-time Feedback**: Loading states, error handling, and success messages
- **Statistics Dashboard**: Usage analytics and insights
- **Pagination**: Efficient data loading and navigation

### Technical Excellence
- **Type Safety**: Full TypeScript implementation
- **Input Validation**: Comprehensive validation with class-validator
- **Error Handling**: Graceful error management and user feedback
- **Logging**: Structured logging with different levels
- **CORS Support**: Configurable cross-origin resource sharing
- **Performance**: Optimized database queries and caching

## 🏗️ Architecture

```
vibe-coding/
├── backend/                 # NestJS API Server
│   ├── src/
│   │   ├── config/         # Configuration management
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── interfaces/    # TypeScript interfaces
│   │   ├── controllers/   # API endpoints
│   │   ├── services/      # Business logic
│   │   ├── schemas/       # MongoDB schemas
│   │   └── main.ts        # Application entry point
│   ├── test/              # Unit and e2e tests
│   └── package.json       # Backend dependencies
├── frontend/              # Next.js React Application
│   ├── app/              # App router components
│   ├── components/       # Reusable UI components
│   ├── styles/           # Global styles and Tailwind
│   └── package.json      # Frontend dependencies
└── README.md             # Project documentation
```

### Design Patterns

- **Repository Pattern**: Data access abstraction
- **Service Layer**: Business logic separation
- **DTO Pattern**: Data transfer validation
- **Factory Pattern**: Object creation management
- **Observer Pattern**: Event-driven architecture

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS 11.1.5
- **Language**: TypeScript 5.7.3
- **Database**: MongoDB 7.8.7 with Mongoose
- **Validation**: class-validator & class-transformer
- **Configuration**: @nestjs/config
- **Testing**: Jest & Supertest
- **Logging**: Built-in NestJS Logger

### Frontend
- **Framework**: Next.js 15.4.4
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion 11.0.0
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Build Tool**: Turbopack

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git
- **Environment**: Node.js 18+

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: Version 18 or higher
- **npm**: Version 9 or higher
- **MongoDB**: Version 5.0 or higher (local or Atlas)
- **Git**: For version control

### System Requirements

- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: 2GB free space
- **Network**: Internet connection for package installation

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Abdoomar2002/vibe-coding.git
cd vibe-coding
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Start MongoDB (if running locally)
mongod

# Start development server
npm run start:dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Verify Installation

- **Backend**: http://localhost:4000
- **Frontend**: http://localhost:3000
- **API Health**: http://localhost:4000/health

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/vibechallenge
MONGODB_NAME=vibechallenge

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

# Logging
LOG_LEVEL=info
```

### MongoDB Setup

#### Local MongoDB
```bash
# Install MongoDB (Ubuntu/Debian)
sudo apt update
sudo apt install mongodb

# Start MongoDB service
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verify installation
mongo --version
```

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Docker Setup (Optional)

```bash
# Run MongoDB with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Run application with Docker Compose
docker-compose up -d
```

## 🎮 Usage

### 1. Start the Application

```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Generate Website Sections

1. Open http://localhost:3000 in your browser
2. Enter a website idea (e.g., "Landing page for a bakery")
3. Click "Generate Sections"
4. View AI-generated sections
5. Explore statistics and search functionality

### 3. Example Ideas

- **E-commerce**: "Online store for handmade jewelry"
- **Restaurant**: "Pizza restaurant website"
- **Portfolio**: "Photographer portfolio site"
- **Blog**: "Tech blog about AI"
- **Business**: "Consulting firm website"

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api/v1
```

### Authentication
Currently, the API is open and doesn't require authentication.

### Endpoints

#### 1. Create Section
```http
POST /sections
Content-Type: application/json

{
  "idea": "Landing page for bakery"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "idea": "Landing page for bakery",
    "sections": ["Hero", "Menu", "Reservations", "Location & Hours"],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Section created successfully"
}
```

#### 2. Get All Sections
```http
GET /sections?page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "idea": "Landing page for bakery",
      "sections": ["Hero", "Menu", "Reservations", "Location & Hours"],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "message": "Retrieved 1 sections"
}
```

#### 3. Get Section by ID
```http
GET /sections/507f1f77bcf86cd799439011
```

#### 4. Search Sections
```http
GET /sections/search/bakery
```

#### 5. Get Statistics
```http
GET /sections/stats/overview
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSections": 150,
    "todaySections": 12,
    "popularIdeas": [
      { "_id": "bakery", "count": 25 },
      { "_id": "restaurant", "count": 20 }
    ]
  },
  "message": "Statistics retrieved successfully"
}
```

### Error Responses

```json
{
  "success": false,
  "error": "Validation failed",
  "message": "idea must be at least 3 characters long"
}
```

## 🧪 Testing

### Backend Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Frontend Testing

```bash
# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

### API Testing

```bash
# Test health endpoint
curl http://localhost:4000/health

# Test section creation
curl -X POST http://localhost:4000/api/v1/sections \
  -H "Content-Type: application/json" \
  -d '{"idea": "Test website"}'
```

## 🚀 Deployment

### Production Build

```bash
# Backend
cd backend
npm run build
npm run start:prod

# Frontend
cd frontend
npm run build
npm start
```

### Environment Variables (Production)

```env
NODE_ENV=production
PORT=4000
MONGODB_URI=mongodb://your-production-mongodb-uri
CORS_ORIGINS=https://your-frontend-domain.com
LOG_LEVEL=error
```

### Deployment Platforms

#### Vercel (Frontend)
1. Connect GitHub repository
2. Configure build settings
3. Set environment variables
4. Deploy

#### Railway/Heroku (Backend)
1. Connect repository
2. Set environment variables
3. Configure MongoDB connection
4. Deploy

#### Docker Deployment
```bash
# Build images
docker build -t vibe-coding-backend ./backend
docker build -t vibe-coding-frontend ./frontend

# Run containers
docker run -p 4000:4000 vibe-coding-backend
docker run -p 3000:3000 vibe-coding-frontend
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation
- Use conventional commits
- Follow ESLint rules

### Code Style

```bash
# Backend
npm run lint
npm run format

# Frontend
npm run lint
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NestJS Team** for the excellent framework
- **Next.js Team** for the React framework
- **MongoDB** for the database
- **Tailwind CSS** for the styling framework
- **Framer Motion** for animations

## 📞 Support

For support and questions:

- **Email**: support@vibecoding.com
- **Issues**: [GitHub Issues](https://github.com/Abdoomar2002/vibe-coding/issues)
- **Documentation**: [Wiki](https://github.com/Abdoomar2002/vibe-coding/wiki)

---

**Built with ❤️ by the Vibe Coding Team**

*Empowering developers to create better websites with AI* 