import { readdirSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dir = join(root, 'aws-dea-c01', 'content', 'questions')
const files = readdirSync(dir).filter((f) => f.endsWith('.json'))

let errors = 0
const ids = new Set()

for (const file of files) {
  const raw = JSON.parse(readFileSync(join(dir, file), 'utf8'))
  const path = file
  const fail = (msg) => {
    console.error(`✖ ${path}: ${msg}`)
    errors += 1
  }

  if (!/^DEA-\d{3}$/.test(raw.id)) fail('invalid id')
  if (ids.has(raw.id)) fail('duplicate id')
  ids.add(raw.id)
  if (!['D1', 'D2', 'D3', 'D4'].includes(raw.domain)) fail('invalid domain')
  if (!['easy', 'medium', 'hard'].includes(raw.difficulty)) fail('invalid difficulty')
  if (!['single', 'multi'].includes(raw.type)) fail('invalid type')
  if (!['draft', 'reviewed', 'published'].includes(raw.status)) fail('invalid status')
  if (!Array.isArray(raw.options) || raw.options.length < 2) fail('options missing')
  const correct = raw.options.filter((o) => o.correct)
  if (raw.type === 'single' && correct.length !== 1) fail('single must have exactly one correct')
  if (raw.type === 'multi' && correct.length < 2) fail('multi must have >=2 correct')
  if (!raw.explanation || raw.explanation.length < 20) fail('explanation too short')
  if (!raw.stem || raw.stem.length < 20) fail('stem too short')
  if (file !== `${raw.id}.json`) fail(`filename must be ${raw.id}.json`)
}

if (errors) {
  console.error(`Validation failed with ${errors} error(s) across ${files.length} files.`)
  process.exit(1)
}

console.log(`Validated ${files.length} question files OK.`)
