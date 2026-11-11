import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const qdir = join(root, 'aws-dea-c01', 'content', 'questions')
const outDir = join(root, 'supabase', 'seed')
mkdirSync(outDir, { recursive: true })

const files = readdirSync(qdir).filter((f) => f.endsWith('.json'))
const questions = files.map((f) => JSON.parse(readFileSync(join(qdir, f), 'utf8')))

const services = new Map()
for (const q of questions) {
  for (const s of q.services) {
    if (!services.has(s)) services.set(s, s)
  }
}

const esc = (s) => String(s).replace(/'/g, "''")

let sql = `-- Auto-generated seed from content/questions. Do not edit by hand.\n`
sql += `begin;\n`

for (const [slug] of services) {
  sql += `insert into public.aws_services (id, slug, name, category) values ('${esc(slug)}', '${esc(slug)}', '${esc(slug)}', 'general') on conflict (id) do nothing;\n`
}

for (const q of questions) {
  if (q.status !== 'published') continue
  sql += `insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('${esc(q.id)}', '${esc(q.stem)}', '${esc(q.type)}', '${esc(q.difficulty)}', '${esc(q.domain)}', '${esc(q.status)}', '${esc(q.provenance)}', '${esc(q.verification_status)}', '${esc(q.reviewed_at)}')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();\n`

  q.options.forEach((o, i) => {
    sql += `insert into public.question_options (id, question_id, label, body, sort_order)
values ('${esc(o.id + '-' + q.id)}', '${esc(q.id)}', '${esc(o.label)}', '${esc(o.body)}', ${i})
on conflict (id) do update set body = excluded.body, label = excluded.label;\n`
  })

  const correct = q.options.filter((o) => o.correct).map((o) => o.id + '-' + q.id)
  sql += `insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('${esc(q.id)}', array[${correct.map((id) => `'${esc(id)}'`).join(',')}]::text[], '${esc(q.explanation)}')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;\n`

  for (const t of q.topics) {
    sql += `insert into public.question_tags (question_id, tag) values ('${esc(q.id)}', '${esc(t)}') on conflict do nothing;\n`
  }
  for (const s of q.services) {
    sql += `insert into public.question_services (question_id, service_id) values ('${esc(q.id)}', '${esc(s)}') on conflict do nothing;\n`
  }
}

sql += `commit;\n`
writeFileSync(join(outDir, 'questions.sql'), sql)
console.log(`Wrote seed for ${questions.length} questions → supabase/seed/questions.sql`)
