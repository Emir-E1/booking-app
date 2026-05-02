# The Wild Oasis — Staff Booking Dashboard

An internal **staff-facing** web app to manage a small hotel/guesthouse. It allows staff members to manage **cabins**, handle **bookings/reservations**, perform **check-in/check-out**, and manage **staff accounts**, all from a central **dashboard**.

## Features

- **Authentication & access control** (staff only)
- **Dashboard** with key metrics and charts
- **Cabins management**: create, edit, delete cabins (incl. images)
- **Bookings management**: view reservations, filter/sort, inspect booking details
- **Check-in / Check-out** workflow
- **Staff management**: create staff users and manage account profile (avatar, password)
- **Toasts, loading states, and error boundaries** for better UX

## Tech Stack

- **React 18** + **Vite**
- **React Router** for routing
- **@tanstack/react-query** for server state, caching, and mutations
- **Supabase** (Auth, Database, Storage)
- **styled-components** for styling
- **react-hook-form** for forms
- **recharts** for charts
- **date-fns** for date utilities
- **react-hot-toast** for notifications
- **react-error-boundary** for runtime error handling

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app in development:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure (high-level)

```text
src/
  App.jsx                # Routes and providers
  main.jsx               # App bootstrap
  pages/                 # Top-level route pages (Dashboard, Bookings, Login, ...)
  features/              # Domain features (auth, bookings, cabins, check-in/out, users)
  services/              # API layer (Supabase clients and calls)
  ui/                    # Reusable UI components (layout, menus, spinners, etc.)
  hooks/                 # Shared custom hooks
  styles/                # Global styles and theme helpers
```

## Notes

- This project assumes a working **Supabase** setup (Auth + tables + storage bucket).
- Protected pages redirect unauthenticated users to `/login`.
  ²
