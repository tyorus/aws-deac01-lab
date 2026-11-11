import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
let sql = readFileSync(join(root, 'supabase', 'seed', 'questions.sql'), 'utf8')
sql = sql.replace(/^--.*$/m, '').replace(/\bbegin;\s*/i, '').replace(/\s*commit;\s*$/i, '')

const stmts = sql
  .split(/;\s*\n/)
  .map((s) => s.trim())
  .filter((s) => s.length > 0)
  .map((s) => (s.endsWith(';') ? s : s + ';'))

const maxBytes = 10000
const parts = []
let buf = ''
for (const stmt of stmts) {
  if (buf && buf.length + stmt.length + 1 > maxBytes) {
    parts.push(buf)
    buf = ''
  }
  buf += stmt + '\n'
}
if (buf.trim()) parts.push(buf)

writeFileSync(join(root, 'scripts', '_seed_parts.json'), JSON.stringify(parts))
const out = join(root, 'scripts', 'seed-parts')
mkdirSync(out, { recursive: true })
parts.forEach((p, i) => writeFileSync(join(out, `part-${i}.sql`), p))
console.log({ statements: stmts.length, parts: parts.length, sizes: parts.map((p) => p.length) })
