# Partnerly Landing — Waitlist Site

Astro 5 + Vercel adapter · EN/ES · Supabase waitlist · Rive mascot ready

## Stack

| Layer | Tech |
|-------|------|
| Framework | Astro 5 (SSR, output: server) |
| Hosting | Vercel (`@astrojs/vercel`, edge middleware) |
| Database | Supabase (`waitlist` table) |
| Fonts | Plus Jakarta Sans (self-hosted via `@fontsource`) |
| Mascot | Rive (`@rive-app/canvas`) — drop `public/mascot.riv` to activate |
| Analytics | GTM + TikTok Pixel + Microsoft Clarity (consent-gated) |

---

## Local dev

```bash
cp .env.example .env   # fill in your values
npm install
npm run dev            # http://localhost:4321
```

---

## Environment variables

Copy `.env.example` → `.env` and fill in:

| Variable | Where to find it |
|----------|-----------------|
| `PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → `anon` `public` key |
| `PUBLIC_GTM_ID` | Google Tag Manager → container ID (format `GTM-XXXXXXX`) |
| `PUBLIC_TIKTOK_PIXEL_ID` | TikTok Ads → Assets → Events → Pixel ID |
| `PUBLIC_CLARITY_ID` | Microsoft Clarity → Settings → Overview → Project ID |

Analytics variables are optional — if absent, no pixel scripts are injected.

---

## Supabase — `waitlist` table

The table must already exist. Minimal schema:

```sql
create table waitlist (
  id         bigint generated always as identity primary key,
  email      text not null unique,
  source     text default 'direct',
  locale     text default 'en',
  created_at timestamptz default now()
);

-- RLS: allow anonymous insert only (no select)
alter table waitlist enable row level security;
create policy "allow anon insert" on waitlist
  for insert to anon with check (true);
```

---

## i18n

- Default locale: **`en`** → `partnerly.io/en`
- Spanish: `partnerly.io/es`
- Root `/` auto-redirects via edge middleware:
  1. Reads `pl_lang` cookie (respects manual switch)
  2. `x-vercel-ip-country` header → Spanish-speaking country → `/es`
  3. `Accept-Language` → Spanish → `/es`
  4. Default → `/en`
- Language switcher in nav + footer updates the cookie.

---

## Mascot (Rive)

Drop your compiled `mascot.riv` in `public/`. The site detects its presence via a HEAD request and swaps the SVG placeholder for the Rive canvas automatically.

**State machine name expected:** `State Machine 1`

**Inputs (respect exact casing):**

| Name | Type |
|------|------|
| `isListening` | Bool |
| `isThinking` | Bool |
| `isSpeaking` | Bool |
| `isEmpathize` | Bool |
| `isSleeping` | Bool |
| `celebrate` | Trigger |
| `cheer` | Trigger |
| `curious` | Trigger |
| `wave` | Trigger |
| `tapReact` | Trigger |
| `success` | Trigger |
| `stageMood` | Number (0-6) |

On waitlist signup the site fires a `celebrate` or `success` trigger automatically.

---

## Deploy to Vercel

```bash
npm run build   # sanity check locally
vercel deploy   # or push to main — auto-deploys if connected
```

### Domain config (document only — set in Vercel dashboard)

| Domain | Points to |
|--------|-----------|
| `partnerly.io` | This Vercel project |
| `www.partnerly.io` | Redirect → `partnerly.io` |
| `app.partnerly.io` | Flutter web app (separate project) |

---

## Adding SEO content pages

Put `.mdx` or `.md` files in `src/content/articles/`. The route `articles/[slug]` is already wired. Frontmatter schema:

```yaml
---
title: "How to improve communication in a relationship"
description: "..."
pubDate: 2026-06-01
locale: en        # en | es
draft: false
noindex: false
---
```
