# MediConnect - Doctor Appointment System

## Project Overview
A fully client-side Single Page Application (SPA) for online doctor appointment booking. No backend or build step required — open `index.html` directly in any browser.

## File Structure
```
doctor-appointment/
├── index.html      # SPA shell: navbar, footer, toast container, CDN links
├── styles.css      # All styles — CSS variables, dark/light mode, components, animations
├── app.js          # All logic — routing, dummy data, views, filters, auth, booking
└── CLAUDE.md       # This file
```

## Architecture

### SPA Routing
Views are rendered into `<div id="app">` by JavaScript. Navigation is handled via `Router.navigate(route)`.

Available routes:
- `home` — Landing page
- `doctors` — Doctor listing with filters
- `login` — Login form
- `signup` — Signup form
- `profile` — Doctor profile (requires `?id=<doctorId>`)
- `booking` — Appointment booking (requires `?id=<doctorId>`)
- `dashboard` — Patient dashboard (requires auth)

### State Management
All state lives in `app.js` global variables:
- `doctors` — Array of 24 dummy doctor objects
- `appointments` — Loaded/saved to `localStorage` key `mediconnect_appointments`
- `currentUser` — Loaded/saved to `localStorage` key `mediconnect_user`
- `darkMode` — Loaded/saved to `localStorage` key `mediconnect_darkmode`

### Theming (Dark/Light Mode)
Toggled by adding/removing the `dark` class on `<body>`. All colors use CSS variables defined in `:root` (light) and `body.dark` (dark) blocks in `styles.css`.

Key CSS variables: `--bg-primary`, `--bg-secondary`, `--card-bg`, `--text-primary`, `--text-secondary`, `--border-color`, `--shadow`

## Dummy Data
24 doctors across 12 specializations, 10 US cities. Each doctor object shape:
```js
{
  id, name, photo, specialization, diseases_treated[],
  location, rating, reviews_count, experience_years,
  fee, availability[], bio, education, hospital
}
```

## Demo Credentials
- Email: `demo@mediconnect.com`
- Password: `demo123`

## Key Features
- Dark / Light mode toggle (persisted)
- Doctor search: by name, disease, specialty, hospital (live filter)
- Filter by location, date (day-of-week availability), rating, fee range
- Multi-step booking: date → time slot → confirm → success
- Auth: login, signup, logout with localStorage persistence
- Dashboard: Upcoming / Past / Cancelled appointments, cancel & rebook
- Toast notifications for all user actions
- Fully responsive (mobile hamburger menu)

## External Dependencies (CDN, no install needed)
- Google Fonts — Inter (`fonts.googleapis.com`)
- Font Awesome 6.5 — icons (`cdnjs.cloudflare.com`)
- UI Avatars — doctor photo placeholders (`ui-avatars.com`)

## How to Run
Open `index.html` in any modern browser. No server, build tool, or package manager needed.

## How to Extend

### Add a new doctor
Append an object to the `doctors` array in `app.js` following the existing shape.

### Add a new page/view
1. Register a render function: `Router.register('route-name', renderMyPage)`
2. Create `function renderMyPage() { document.getElementById('app').innerHTML = \`...\`; }`
3. Link to it via `Router.navigate('route-name')`

### Add a new filter
1. Add the filter control HTML inside `renderDoctors()` filter sidebar
2. Update `filterDoctors(search, location, date, rating, fee)` to handle the new parameter
3. Wire the input event inside `setupDoctorFilters()`

### Change color scheme
Update the `--primary` and `--secondary` CSS variables in `styles.css` `:root` block.
