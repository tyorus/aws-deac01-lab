# DEA-C01 Lab

Authenticated AWS Certified Data Engineer - Associate (DEA-C01) learning platform:

- Structured knowledge base
- Interactive drills
- Timed exam simulator (official 65Q / 130m defaults)
- Analytics + SM-2-inspired spaced review

## Quick start

```bash
cd apps/web
npm install
# .env.local already used locally; see .env.example
npm run dev
```

Open the Vite URL (hash routes): `/#/`, `/#/drill`, `/#/exam`, `/#/knowledge`.

Without Supabase Auth configured in the dashboard, the app still runs in **local mode** using published JSON questions and localStorage progress.

## Monorepo layout

| Path | Purpose |
| --- | --- |
| `aws-dea-c01/` | Knowledge base + question content pack |
| `apps/web/` | Vue 3 + Vite + Tailwind client |
| `supabase/` | SQL migrations, Edge Functions, seed |
| `scripts/` | Validate questions, seed SQL, SM-2 tests |
| `docs/` | Architecture, schema, deploy, content pipeline |

## Scripts

```bash
npm run validate:questions
npm run build
npm run test --prefix apps/web
```

## Supabase setup (required for cloud auth/grading)

1. Apply `supabase/migrations/20261111000000_init.sql`.
2. `node scripts/build-seed-sql.mjs` then run `supabase/seed/questions.sql`.
3. Deploy `grade-attempt` and `submit-exam` functions.
4. Enable Email auth + redirect URLs.
5. Never put the **service_role** key in the frontend.

## Deploy

GitHub Actions workflows:

- `ci.yml` — validate + build
- `deploy.yml` — GitHub Pages

Add repository secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## License / content policy

Original study content and practice items in this repo are authored for personal learning. Do not paste third-party exam dumps into the content pack.
