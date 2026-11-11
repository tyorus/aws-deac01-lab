import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const kind = process.argv[2] || 'migration'
const file =
  kind === 'seed'
    ? join(root, 'supabase', 'seed', 'questions.sql')
    : join(root, 'supabase', 'migrations', '20261111000000_init.sql')

const sql = readFileSync(file, 'utf8')
const chunkSize = 4000
const chunks = []
for (let i = 0; i < sql.length; i += chunkSize) chunks.push(sql.slice(i, i + chunkSize))

writeFileSync(
  join(root, 'scripts', `_chunks_${kind}.json`),
  JSON.stringify({ kind, total: sql.length, chunks }, null, 0),
)
console.log(JSON.stringify({ kind, total: sql.length, chunkCount: chunks.length }))
