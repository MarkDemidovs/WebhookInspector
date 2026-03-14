- ─────────────────────────────────────────
--  Webhook Inspector — Database Schema
-- ─────────────────────────────────────────
 
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- for gen_random_uuid()
 
-- ── USERS ──────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR     UNIQUE NOT NULL,
  password_hash VARCHAR     NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
-- ── ENDPOINTS ──────────────────────────────────────────────────────────────
CREATE TABLE endpoints (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  slug       VARCHAR     UNIQUE NOT NULL,
  label      VARCHAR,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
 
CREATE INDEX idx_endpoints_user_id ON endpoints(user_id);
 
-- ── REQUESTS ───────────────────────────────────────────────────────────────
CREATE TABLE requests (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint_id UUID        NOT NULL REFERENCES endpoints(id) ON DELETE CASCADE,
  method      VARCHAR     NOT NULL,
  headers     JSONB       NOT NULL DEFAULT '{}',
  body        TEXT,
  ip          VARCHAR,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  share_token VARCHAR     UNIQUE
);
 
CREATE INDEX idx_requests_endpoint_id ON requests(endpoint_id);
CREATE INDEX idx_requests_received_at ON requests(received_at DESC);
CREATE INDEX idx_requests_share_token ON requests(share_token) WHERE share_token IS NOT NULL;
 