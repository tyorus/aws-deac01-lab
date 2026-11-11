# Deployment

## Local

```bash
cd apps/web
cp .env.example .env.local   # fill Supabase URL + anon key
npm install
npm run dev
```

## Supabase

1. Run `supabase/migrations/20261111000000_init.sql` in the SQL editor (or `supabase db push`).
2. Generate seed: `node scripts/build-seed-sql.mjs` then run `supabase/seed/questions.sql`.
3. Deploy functions `grade-attempt` and `submit-exam` with the Supabase CLI.
4. Auth → enable Email provider; set Site URL and redirect URLs for local (`http://localhost:5173`) and GitHub Pages URL.

## GitHub Pages

1. Repo Settings → Pages → Source: GitHub Actions.
2. Add Actions secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.
3. Push to `main` to run `.github/workflows/deploy.yml`.

## Cloudflare Pages (later)

Build command: `npm ci --prefix apps/web && npm run build --prefix apps/web`  
Output: `apps/web/dist`  
Add `_redirects` or switch router to HTML5 history.
