#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const q = JSON.parse(
  fs.readFileSync(path.join(root, 'apps/web/src/generated/questions.json'), 'utf8'),
)
const CHOOSE = /\(\s*Choose\s+(two|three|four|five)\.?\s*\)/i
const WORD = { two: 2, three: 3, four: 4, five: 5 }

const pub = q.filter((x) => x.status === 'published')
const choose = pub.filter((x) => CHOOSE.test(x.stem))
const bad = choose.filter((x) => {
  const n = WORD[x.stem.match(CHOOSE)[1].toLowerCase()]
  return x.type !== 'multi' || x.options.filter((o) => o.correct).length !== n
})

console.log({
  total: q.length,
  published: pub.length,
  choosePublished: choose.length,
  badPublished: bad.map((b) => b.id),
  sample: choose.slice(0, 3).map((x) => ({
    id: x.id,
    type: x.type,
    ans: x.options.filter((o) => o.correct).map((o) => o.label).join(''),
  })),
})
