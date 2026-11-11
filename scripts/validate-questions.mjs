import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const bankPath = join(root, 'aws-dea-c01', 'practice', 'research-questions.json')

if (!existsSync(bankPath)) {
  console.error(`✖ Missing compiled bank: ${bankPath}`)
  process.exit(1)
}

const doc = JSON.parse(readFileSync(bankPath, 'utf8'))
const questions = Array.isArray(doc) ? doc : doc.questions
if (!Array.isArray(questions) || !questions.length) {
  console.error('✖ Compiled bank is empty')
  process.exit(1)
}

let errors = 0
const ids = new Set()

for (const raw of questions) {
  const path = raw.id || '(missing-id)'
  const fail = (msg) => {
    console.error(`✖ ${path}: ${msg}`)
    errors += 1
  }

  if (!/^LOC-\d{3,4}$/.test(String(raw.id || ''))) fail('invalid id (expected LOC-###)')
  if (ids.has(raw.id)) fail('duplicate id')
  ids.add(raw.id)
  if (!['D1', 'D2', 'D3', 'D4'].includes(raw.domain)) fail('invalid domain')
  if (!['easy', 'medium', 'hard'].includes(raw.difficulty)) fail('invalid difficulty')
  if (!['single', 'multi'].includes(raw.type)) fail('invalid type')
  if (!['draft', 'reviewed', 'published'].includes(raw.status)) fail('invalid status')
  if (!Array.isArray(raw.options) || raw.options.length < 2) fail('options missing')
  const correct = (raw.options || []).filter((o) => o.correct)
  if (raw.type === 'single' && correct.length !== 1) fail('single must have exactly one correct')
  if (raw.type === 'multi' && correct.length < 2) fail('multi must have >=2 correct')
  if (!raw.explanation || raw.explanation.length < 20) fail('explanation too short')
  if (!raw.stem || raw.stem.length < 20) fail('stem too short')
}

if (errors) {
  console.error(`Validation failed with ${errors} error(s) across ${questions.length} questions.`)
  process.exit(1)
}

console.log(`Validated ${questions.length} compiled questions OK (${bankPath}).`)
