import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const parts = JSON.parse(readFileSync(join(root, 'scripts', '_seed_parts.json'), 'utf8'))
const out = join(root, 'scripts', 'seed-parts')
mkdirSync(out, { recursive: true })

parts.forEach((p, i) => {
  let sql = p
  if (i === 0) sql = sql.replace(/^[\s\S]*?begin;\s*/i, '')
  if (i === parts.length - 1) sql = sql.replace(/\s*commit;\s*$/i, '')
  writeFileSync(join(out, `part-${i}.sql`), sql)
})
console.log(`wrote ${parts.length} parts to scripts/seed-parts`)
