#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const q = JSON.parse(
  fs.readFileSync(path.join(root, 'aws-dea-c01/practice/research-questions.json'), 'utf8'),
)

function chooseN(stem) {
  const m = String(stem || '').match(/\(Choose\s+(two|three|four|five)\.?\)/i)
  if (!m) return 0
  return { two: 2, three: 3, four: 4, five: 5 }[m[1].toLowerCase()] || 0
}

function core(stem) {
  return String(stem || '')
    .replace(/^Question\s*#:\s*\d+[\s\S]*?Questions\]\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\(choose\s+(two|three|four|five)\.?\)/gi, '')
    .slice(-160)
}

const choose = q.filter((x) => chooseN(x.stem) > 0)
console.log('choose-N', choose.length)
for (const x of choose) {
  const n = chooseN(x.stem)
  const corr = x.options.filter((o) => o.correct).map((o) => o.label).join('')
  const ok = x.type === 'multi' && corr.length === n
  if (ok) continue
  const sibs = choose.filter(
    (y) => y.id !== x.id && core(y.stem) === core(x.stem) && y.options.filter((o) => o.correct).length === n,
  )
  console.log(
    `${ok ? 'OK' : 'BAD'} ${x.id} type=${x.type} want=${n} ans=${corr || '-'} opts=${x.options.length} sib=${sibs.map((s) => s.id + ':' + s.options.filter((o) => o.correct).map((o) => o.label).join('')).join('|') || '-'}`,
  )
}
