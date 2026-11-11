import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const i = process.argv[2]
const sql = readFileSync(join(root, 'scripts', 'seed-parts', `part-${i}.sql`), 'utf8')
const expr = `(async()=>{
  const sql = ${JSON.stringify(sql)};
  const raw = localStorage.getItem('supabase.dashboard.auth.token');
  const token = JSON.parse(raw).access_token;
  const r = await fetch('https://api.supabase.com/v1/projects/ipwqqfvskyspvqrwlysb/database/query', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql })
  });
  const text = await r.text();
  return JSON.stringify({ part: ${JSON.stringify(i)}, status: r.status, body: text.slice(0, 800) });
})()`
writeFileSync(join(root, 'scripts', `_part_${i}_expr.js`), expr)
console.log('part', i, 'bytes', Buffer.byteLength(expr))
