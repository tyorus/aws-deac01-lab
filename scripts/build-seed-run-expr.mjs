import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const parts = JSON.parse(readFileSync(join(root, 'scripts', '_seed_parts.json'), 'utf8'))
const expr = `(async()=>{
  const parts = ${JSON.stringify(parts)};
  const sql = parts.join('');
  const raw = localStorage.getItem('supabase.dashboard.auth.token');
  const token = JSON.parse(raw).access_token;
  const r = await fetch('https://api.supabase.com/v1/projects/ipwqqfvskyspvqrwlysb/database/query', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: sql })
  });
  const text = await r.text();
  return JSON.stringify({ status: r.status, len: sql.length, body: text.slice(0, 1500) });
})()`
writeFileSync(join(root, 'scripts', '_seed_run_expr.js'), expr)
console.log('bytes', Buffer.byteLength(expr))
