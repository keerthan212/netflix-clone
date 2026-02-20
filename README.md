# StreamVault - OTT Streaming Platform

A modern, premium streaming web application built with React. Features a responsive landing page, authentication flow, and a protected dashboard with a cinematic dark theme.

## Features

- **Landing Page**: Full-screen hero, glass-style navigation, horizontal scrollable content rows (Trending, Popular, New Releases)
- **Sign Up Page**: User registration with database storage
- **Login Page**: Glassmorphism card UI, email/password with show/hide toggle, form validation, database authentication
- **Dashboard**: Protected route, streaming-style layout with hero banner and movie rows
- **Responsive**: Mobile-first design with smooth animations
- **Tech**: React, React Router, TailwindCSS, Express, PostgreSQL

## Quick Start

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env`** in the project root:
   ```
   VITE_API_URL=http://localhost:3001
   ```

3. **Run the frontend:**
   ```bash
   npm run dev
   ```

Then open [http://localhost:5173](http://localhost:5173)

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   ```bash
   npm run setup-db
   ```

4. **Start the server:**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

The backend server will run on [http://localhost:3001](http://localhost:3001)

## Database Configuration

The backend uses PostgreSQL. Database credentials are configured in `server/.env`:

- Host: pg-207e694a-keerthanrajgopal-f5ec.l.aivencloud.com
- Port: 28973
- User: avnadmin
- Database: defaultdb
- SSL: Required

## User Flow

1. **Sign Up**: Users can create an account on `/signup` page
2. **Database Storage**: User credentials are stored securely in PostgreSQL with hashed passwords
3. **Login**: Users can sign in on `/login` page
4. **Verification**: Login credentials are verified against the database
5. **Dashboard**: After successful login, users are redirected to the dashboard

## Project Structure

```
src/
├── components/     # Reusable UI (Navbar, MovieRow, ProtectedRoute)
├── context/        # AuthContext for login state
├── pages/          # LandingPage, LoginPage, SignUpPage, Dashboard
├── hooks/          # Custom hooks (useAuth)
├── api/            # API clients (movies.js)
├── styles/         # (index.css)
└── main.jsx

server/
├── server.js       # Express server with auth endpoints
├── setup-db.js     # Database setup script
└── package.json    # Backend dependencies
```

## API Endpoints

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Authenticate user and login
- `GET /health` - Health check endpoint

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start server
- `npm run dev` - Start server with auto-reload
- `npm run setup-db` - Set up database tables
