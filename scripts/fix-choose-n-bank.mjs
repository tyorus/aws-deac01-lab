#!/usr/bin/env node
/**
 * Repair Choose-N items in the practice bank:
 * - Promote type to multi when stem asks for N answers and keys match
 * - Copy full options/keys from a better sibling when available
 * - Draft incomplete Choose-N items that cannot be graded fairly
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bankPath = path.join(root, 'aws-dea-c01', 'practice', 'research-questions.json')

const CHOOSE_RE = /\(\s*Choose\s+(two|three|four|five)\.?\s*\)/i
const WORD_TO_N = { two: 2, three: 3, four: 4, five: 5 }

function chooseN(stem) {
  const m = String(stem || '').match(CHOOSE_RE)
  if (!m) return 0
  return WORD_TO_N[m[1].toLowerCase()] || 0
}

function coreStem(stem) {
  return String(stem || '')
    .replace(/^Question\s*#:\s*\d+[\s\S]*?Questions\]\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(CHOOSE_RE, '')
    .slice(-160)
}

function correctLetters(q) {
  return (q.options || [])
    .filter((o) => o.correct)
    .map((o) => o.label)
    .join('')
}

function cloneOptions(options) {
  return options.map((o) => ({ ...o }))
}

const questions = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const stats = { upgradedFromSibling: [], promoted: [], drafted: [] }

for (const q of questions) {
  const n = chooseN(q.stem)
  if (!n) continue

  const corr = (q.options || []).filter((o) => o.correct)
  const healthy =
    q.status === 'published' &&
    q.type === 'multi' &&
    corr.length === n &&
    (q.options || []).length >= n + 1

  if (healthy) continue

  const siblings = questions.filter((y) => {
    if (y.id === q.id) return false
    if (chooseN(y.stem) !== n) return false
    if (coreStem(y.stem) !== coreStem(q.stem)) return false
    const yc = (y.options || []).filter((o) => o.correct)
    return y.type === 'multi' && yc.length === n && (y.options || []).length >= n + 1
  })

  // Prefer published siblings with more options
  siblings.sort((a, b) => (b.options?.length || 0) - (a.options?.length || 0))

  if (siblings[0]) {
    const sib = siblings[0]
    q.type = 'multi'
    q.options = cloneOptions(sib.options)
    q.status = 'published'
    // Keep stem (may include examtopics header) but ensure choose cue present
    if (!CHOOSE_RE.test(q.stem) && CHOOSE_RE.test(sib.stem)) {
      q.stem = `${q.stem.trim()} (Choose two.)`
    }
    // Refresh explanation opening letters if generated
    const letters = correctLetters(q)
    if (/Jawaban yang tepat adalah \*\*[A-F]+\*\*/i.test(q.explanation || '')) {
      q.explanation = String(q.explanation).replace(
        /Jawaban yang tepat adalah \*\*[A-F]+\*\*/i,
        `Jawaban yang tepat adalah **${letters}**`,
      )
    }
    q.explanation_origin = q.explanation_origin || 'repaired_from_sibling'
    stats.upgradedFromSibling.push(`${q.id}←${sib.id}:${letters}`)
    continue
  }

  // No sibling: if keys already match N, just promote type
  if (corr.length === n) {
    q.type = 'multi'
    q.status = 'published'
    stats.promoted.push(`${q.id}:${correctLetters(q)}`)
    continue
  }

  // Cannot grade fairly — keep for knowledge MD but exclude from quiz pool
  if (q.status === 'published') {
    q.status = 'draft'
    q.type = corr.length >= 2 ? 'multi' : 'single'
    stats.drafted.push(`${q.id}:ans=${correctLetters(q) || '-'} want=${n}`)
  }
}

fs.writeFileSync(bankPath, `${JSON.stringify(questions, null, 2)}\n`)
console.log(JSON.stringify(stats, null, 2))
console.log(
  'published',
  questions.filter((q) => q.status === 'published').length,
  'draft',
  questions.filter((q) => q.status === 'draft').length,
)
