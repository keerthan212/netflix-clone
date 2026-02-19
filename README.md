# StreamVault - OTT Streaming Platform

A modern, premium streaming web application built with React. Features a responsive landing page, authentication flow, and a protected dashboard with a cinematic dark theme.

## Features

- **Landing Page**: Full-screen hero, glass-style navigation, horizontal scrollable content rows (Trending, Popular, New Releases)
- **Login Page**: Glassmorphism card UI, email/password with show/hide toggle, form validation, fake auth
- **Dashboard**: Protected route, streaming-style layout with hero banner and movie rows
- **Responsive**: Mobile-first design with smooth animations
- **Tech**: React, React Router, TailwindCSS

## Quick Start

1. **Get a free TMDB API key** at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)

2. **Create `.env`** in the project root:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

3. **Run the app:**
   ```bash
   npm install
   npm run dev
   ```

Then open [http://localhost:5173](http://localhost:5173)

## Demo Login

- **Email**: Any valid email (e.g., `demo@example.com`)
- **Password**: 6+ characters (e.g., `password123`)

## Project Structure

```
src/
├── components/     # Reusable UI (Navbar, MovieRow, ProtectedRoute)
├── context/        # AuthContext for login state
├── pages/          # LandingPage, LoginPage, Dashboard
├── hooks/          # Custom hooks (useAuth)
├── styles/         # (index.css)
└── main.jsx
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
