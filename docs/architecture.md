# Architecture

Vue 3 SPA (`apps/web`) + Supabase (Auth, Postgres, RLS, Edge Functions) + Markdown/JSON content pack (`aws-dea-c01`).

## Content flow

1. Authors maintain Markdown knowledge and original question JSON.
2. `scripts/validate-questions.mjs` gates CI.
3. `scripts/build-seed-sql.mjs` produces `supabase/seed/questions.sql`.
4. App loads Markdown/JSON at build time for KB + offline/local grading fallback.
5. When authenticated against Supabase, grading/submission prefer Edge Functions so answer keys stay server-side.

## Routing

Hash history for GitHub Pages compatibility (`createWebHashHistory`).
