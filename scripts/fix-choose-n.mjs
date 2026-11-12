#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const q = JSON.parse(
  fs.readFileSync(path.join(root, 'apps/web/src/generated/questions.json'), 'utf8'),
)

function chooseN(stem) {
  const m = String(stem || '').match(/\(Choose\s+(two|three|four|five)\)/i)
  if (!m) return 0
  return { two: 2, three: 3, four: 4, five: 5 }[m[1].toLowerCase()] || 0
}

function coreStem(stem) {
  return String(stem || '')
    .replace(/^Question\s*#:\s*\d+[\s\S]*?Questions\]\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .slice(-180)
}

function explLetters(expl) {
  const m = String(expl || '').match(/Jawaban yang tepat adalah \*\*([A-F]+)\*\*/i)
  return m ? m[1].toUpperCase() : ''
}

const bad = q.filter((x) => {
  const n = chooseN(x.stem)
  if (!n) return false
  const corr = x.options.filter((o) => o.correct).length
  return x.type !== 'multi' || corr !== n
})

console.log('mismatched', bad.length)
for (const x of bad) {
  const n = chooseN(x.stem)
  const corr = x.options.filter((o) => o.correct).map((o) => o.label).join('')
  const core = coreStem(x.stem)
  const sib = q.filter(
    (y) =>
      y.id !== x.id &&
      chooseN(y.stem) === n &&
      coreStem(y.stem) === core &&
      y.options.filter((o) => o.correct).length === n,
  )
  console.log(
    x.id,
    'want',
    n,
    'have',
    corr || '-',
    'type',
    x.type,
    'expl',
    explLetters(x.explanation) || '-',
    'sib',
    sib.map((s) => `${s.id}:${s.options.filter((o) => o.correct).map((o) => o.label).join('')}`).join('|') ||
      '-',
  )
}
