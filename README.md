# WebhookInspector

## Setup

1. client
   - `cd client`
   - `npm install --legacy-peer-deps`
   - `VITE_API_URL=https://yourapi.example.com` (or `http://localhost:4000` locally)
   - `npm run dev`

2. server
   - `cd server`
   - `npm install`
   - create `.env` with:
     - `NODE_ENV=development` (or `production` in prod)
     - `PORT=4000`
     - `DATABASE_URL=postgres://...`
     - `JWT_SECRET=some-long-secure-string`
     - `CLIENT_URL=http://localhost:5173` (or your frontend URL in prod)
   - `npm run dev`

## Production env vars
- `JWT_SECRET`: required for login tokens (no value => auth is broken)
- `DATABASE_URL`: required for DB access
- `CLIENT_URL`: required for CORS to allow browser calls
- `VITE_API_URL`: for client build, should point to the backend root (`https://api.example.com`)

## Common production pitfalls
- `VITE_API_URL` incorrectly set to `https://api.example.com/api` or missing `/api` path (fixed in code to normalize).
- cookies are `secure` + `sameSite=none` in production, so backend must be served via HTTPS and domain aligned.
- login token expires in 15m; consider refresh tokens or longer `expiresIn` if desired.
