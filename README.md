# 🚀 Smart Leads Dashboard

A production-grade lead management dashboard built with the **MERN stack + TypeScript**.

![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

## ✨ Features

- 🔐 **JWT Authentication** with role-based access control (Admin / Sales)
- 📋 **Lead Management** — full CRUD with status tracking
- 🔍 **Search & Filter** — debounced search, status/source filtering
- 📄 **Pagination** — server-side with configurable limits
- 📊 **CSV Export** — download leads data
- 🌙 **Dark Mode** — beautiful dark/light theme toggle
- 🐳 **Docker Ready** — one-command deployment

## 📁 Project Structure

```
smart-leads-dashboard/
├── client/                 # React + TypeScript + TailwindCSS
│   ├── src/
│   │   ├── api/            # Axios instance & API calls
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Feature modules (auth, leads)
│   │   ├── hooks/          # Custom hooks
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Route pages
│   │   ├── routes/         # Protected routes
│   │   ├── store/          # State management
│   │   ├── types/          # TypeScript interfaces
│   │   └── utils/          # Helper functions
│   └── Dockerfile
├── server/                 # Express + TypeScript + MongoDB
│   ├── src/
│   │   ├── config/         # Database & env config
│   │   ├── controllers/    # Route handlers
│   │   ├── middlewares/     # Auth, error, validation
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # ApiError, ApiResponse, logger
│   │   └── validators/     # Zod schemas
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/divyanshibokade54/Smart_Leads_Dashboard.git
cd Smart_Leads_Dashboard

# Install server dependencies
cd server
npm install
cp .env.example .env    # Edit with your values

# Install client dependencies
cd ../client
npm install
cp .env.example .env
```

### 2. Configure Environment

Edit `server/.env`:
```env
PORT=5000
NODE_ENV=development

JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Run Development Servers

```bash
# Terminal 1: Start server
cd server
npm run dev

# Terminal 2: Start client
cd client
npm run dev
```

### 4. Verify Setup

- **Client**: http://localhost:5173
- **Server Health**: http://localhost:5000/api/v1/health

### 🐳 Docker (Alternative)

```bash
docker-compose up --build
```
- Client: http://localhost:3000
- Server: http://localhost:5000

## 📡 API Endpoints

| Method | Endpoint            | Description       | Access  |
|--------|--------------------|--------------------|---------|
| GET    | `/api/v1/health`   | Health check       | Public  |

> More endpoints will be added in subsequent feature branches.

## 🔀 Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready |
| `develop` | Integration |
| `feat/01-project-setup` | ✅ Initial setup |
| `feat/02-docker-setup` | Docker configuration |
| `feat/03-auth-backend` | JWT auth backend |
| ... | More features |

## 📝 Commit Convention

```
feat: add new feature
fix: bug fix
refactor: code refactoring
docs: documentation
chore: maintenance
style: styling changes
```

## 📄 License

MIT
