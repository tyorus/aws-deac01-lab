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
  const hasKey = raw.has_answer_key !== false && correct.length > 0
  if (raw.has_answer_key === false) {
    // study-only items may have zero correct flags
  } else if (raw.type === 'single' && correct.length !== 1) {
    fail('single must have exactly one correct')
  } else if (raw.type === 'multi' && correct.length < 2) {
    fail('multi must have >=2 correct')
  }
  if (!raw.explanation || raw.explanation.length < 20) fail('explanation too short')
  if (!raw.stem || raw.stem.length < 20) fail('stem too short')

  const chooseMatch = String(raw.stem || '').match(/\(\s*Choose\s+(two|three|four|five)\.?\s*\)/i)
  if (chooseMatch && raw.status === 'published' && hasKey) {
    const want = { two: 2, three: 3, four: 4, five: 5 }[chooseMatch[1].toLowerCase()]
    if (raw.type !== 'multi' || correct.length !== want) {
      fail(`published Choose-${want} with key must be multi with exactly ${want} correct`)
    }
  }
}

if (errors) {
  console.error(`Validation failed with ${errors} error(s) across ${questions.length} questions.`)
  process.exit(1)
}

const published = questions.filter((q) => q.status === 'published')
const keyed = published.filter((q) => q.has_answer_key !== false && (q.options || []).some((o) => o.correct))
console.log(
  `Validated ${questions.length} compiled questions OK (${bankPath}). published=${published.length} with_key=${keyed.length} study_only=${published.length - keyed.length}`,
)
