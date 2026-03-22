# Webhook Inspector
<a href="https://webhook-inspector-rho.vercel.app/">https://webhook-inspector-rho.vercel.app</a> 

Small app for debugging inbound webhooks: you get a unique URL per endpoint, requests show up in a log, and you can share a read-only link to a single captured request.

Stack is a Vite/React client + Router (`client/`) and an Express + Postgres API (`server/`). Auth is email/password with JWTs stored in `localStorage`. Everything built using Typescript.

## Running it locally

You need Postgres running and a database created. Apply `server/schema.sql` once to create tables.

**API** — from `server/`, add a `.env` file. Minimum variables:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Postgres connection string |
| `JWT_SECRET` | Signing key for tokens (use something long and random) |
| `CLIENT_URL` | Where the frontend runs, e.g. `http://localhost:5173` — used for CORS |
| `PORT` | Optional, defaults to `4000` |

Then:

```
npm install
npm run dev
```

**Client** — from `client/`:

```
npm install --legacy-peer-deps
```

The client talks to the API at `VITE_API_URL` (defaults to `http://localhost:4000`). The code appends `/api` itself, so set the base only — not `.../api`.

```
npm run dev
```

Open the URL Vite prints (usually port 5173), sign up, create an endpoint, and hit the webhook URL shown on the dashboard. Incoming requests are stored and listed under that endpoint.

## Deploying

Split hosting is normal: static frontend (e.g. Vercel) and API elsewhere (e.g. Render).

**Build the client** with `VITE_API_URL` set to your **public API origin** (no `/api` suffix). That value is baked in at build time; if you skip it, the bundle will still point at `localhost` and nothing will work in production.

**On the server**, set `CLIENT_URL` to your real frontend origin (scheme + host, exact match for CORS). Same for any preview URLs you care about.

**Vercel:** point the project at the `client` folder. This repo includes `client/vercel.json` so routes like `/share/...` resolve to the SPA instead of Vercel’s 404 page. Without that, share links break when opened in a new tab.

Sessions expire after 15 minutes with the current JWT settings; there’s no refresh flow yet.

## Layout

- `server/src` — Express routes, webhook ingest under `/hooks/:slug`, REST under `/api/...`
- `client/src` — React Router, dashboard, endpoint detail, shared request view

That’s enough to get oriented; the rest is in the code.
