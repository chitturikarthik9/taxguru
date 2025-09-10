# Fullstack App (Express + Vanilla JS)

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start in development (auto-reload):
```bash
npm run dev
```

3. Open the app:
`http://localhost:3000`

## Scripts
- `npm run dev`: Start with nodemon
- `npm start`: Start with node

## Structure
- `server.js`: Express server
- `public/`: Static frontend
  - `index.html`, `styles.css`, `app.js`

## API
- `GET /api/health` → `{ status, uptimeSeconds }`
- `POST /api/echo` → `{ echo: { message } }`

