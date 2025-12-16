# Altan Dynamics Platform

A full-stack web application for **Altan Dynamics**, featuring a public landing page, secure investor portal, and admin dashboard for managing the Altan Sensor Grid platform powered by **Orto AI**.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![.NET](https://img.shields.io/badge/.NET-512BD4?style=flat&logo=dotnet&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)

## 🎯 Overview

This platform serves as both an academic capstone demonstration and a production-ready business application for Altan Dynamics, a developer of multi-domain distributed sensor grids.

### Key Features

- **Public Landing Page** — Professional 7-section landing page with animated visuals
- **Lead Management** — Intelligent lead capture with email domain triage (.mil/.gov priority)
- **Secure Investor Portal** — Gated access for accredited investors
- **Admin Dashboard** — User management, lead tracking, approval workflows
- **Real-Time Capabilities** — SignalR-powered threat simulation demonstrations
- **JWT Authentication** — Secure token-based authentication system

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│     React 18 + TypeScript + Tailwind CSS + React Router         │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Landing  │  │  Login   │  │ Investor │  │  Admin   │        │
│  │  Page    │  │ Register │  │  Portal  │  │Dashboard │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Axios + JWT
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
│        ASP.NET Core 8.0 Web API + SignalR                       │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │   Auth   │  │  Users   │  │  Leads   │  │ SignalR  │        │
│  │   API    │  │   API    │  │   API    │  │   Hub    │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Entity Framework Core
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE                                  │
│                   PostgreSQL (Supabase)                         │
│                                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Users   │  │  Leads   │  │ Documents│  │ Activity │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- .NET 8.0 SDK
- PostgreSQL database (Supabase recommended)

### ⚡ One-Click Start (Recommended)

For the fastest setup, simply double-click either file in the project root:
- **`start-dev.bat`** (Command Prompt)
- **`start-dev.ps1`** (PowerShell)

This automatically starts both frontend and backend servers in separate terminals!

See [QUICK_START.md](./QUICK_START.md) for detailed setup instructions and troubleshooting.

### Manual Setup

#### Frontend Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### Backend Setup

```bash
# Navigate to backend
cd backend/src/AltanDynamics.Api

# Update connection string in appsettings.json

# Run database migrations (EF Core will create tables on first run)
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5224`
- HTTPS: `https://localhost:7212`
- Swagger: `https://localhost:7212/swagger`

## 📁 Project Structure

```
altan-dynamics/
├── src/                           # React Frontend
│   ├── components/                # Reusable UI components
│   │   ├── auth/                  # Auth components
│   │   ├── HeroSection.tsx        # Landing sections
│   │   ├── ContactFormModal.tsx   # Lead capture form
│   │   └── ...
│   ├── contexts/                  # React contexts
│   │   └── AuthContext.tsx        # Authentication state
│   ├── pages/                     # Page components
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── PortalPage.tsx
│   │   └── AdminPage.tsx
│   ├── services/                  # API services
│   │   └── api.ts                 # Axios configuration
│   └── types/                     # TypeScript types
│       └── auth.ts
│
├── backend/                       # ASP.NET Core Backend
│   └── src/AltanDynamics.Api/
│       ├── Controllers/           # API endpoints
│       ├── Models/                # Entities & DTOs
│       ├── Data/                  # EF Core DbContext
│       ├── Hubs/                  # SignalR hubs
│       └── Program.cs             # App configuration
│
├── .github/workflows/             # CI/CD pipelines
├── vercel.json                    # Vercel deployment config
├── SCOPE_OF_WORK.md               # Full project specification
└── README.md                      # This file
```

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, get JWT tokens |
| POST | `/api/auth/refresh` | Refresh access token |

### Users (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user profile |
| PUT | `/api/users/me` | Update profile |
| GET | `/api/users` | Admin: List all users |
| PUT | `/api/users/{id}/approve` | Admin: Approve investor |
| PUT | `/api/users/{id}/reject` | Admin: Reject investor |

### Leads
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/leads` | Submit contact form |
| GET | `/api/leads` | Admin: List all leads |
| GET | `/api/leads/{id}` | Admin: Get lead details |
| PUT | `/api/leads/{id}` | Admin: Update lead status |

## 🎨 Design System

- **Theme**: Dark mode exclusively
- **Primary Background**: `bg-zinc-950` (#09090b)
- **Accent Color**: `bg-cyan-500` (#06b6d4)
- **Threat Color**: `bg-amber-500` / `bg-red-500`
- **Typography**: Inter (Google Fonts)

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Password hashing via ASP.NET Identity (PBKDF2)
- Role-based authorization (Admin, Investor)
- CORS configuration for frontend domains
- XSS/CSRF protection headers

## 🚢 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variable: `VITE_API_URL=https://your-api-url.com`

### Backend (Azure App Service)

```bash
# Build for production
dotnet publish -c Release

# Deploy via Azure CLI or GitHub Actions
```

### Backend (Railway)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway up
```

## 📊 Lead Triage Logic

| Priority | Criteria |
|----------|----------|
| **Critical** | Email domain: `.mil`, `.gov` |
| **High** | Inquiry Type: DoD/Federal, Investor |
| **Medium** | Inquiry Type: State/Local |
| **Standard** | All others |

## 🧪 Testing

```bash
# Frontend - TypeScript check
npm run build

# Backend - Run tests
cd backend
dotnet test
```

## 📖 Documentation

- **[Quick Start Guide](./QUICK_START.md)** — Fastest way to get started (5 minutes!)
- **[Email Setup Guide](./EMAIL_SETUP.md)** — Configure SendGrid email notifications
- **[Scope of Work](./SCOPE_OF_WORK.md)** — Full project specification
- **[Backend README](./backend/README.md)** — API documentation
- **[Swagger Docs](https://localhost:7212/swagger)** — Interactive API docs (when running)

## 📄 License

Proprietary — Altan Dynamics, LLC. All rights reserved.

## 🤝 Contributing

This is a private project. Contact the development team for contribution guidelines.

---

Built with ❤️ by the Altan Dynamics Engineering Team
