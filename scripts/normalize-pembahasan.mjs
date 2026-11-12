#!/usr/bin/env node
/** Normalize explanation markdown spacing in the practice bank. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bankPath = path.join(root, 'aws-dea-c01', 'practice', 'research-questions.json')

const questions = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
let changed = 0

function normalizeExplanation(raw) {
  let e = String(raw || '')
  e = e.replace(/\.\.(?=\s|$)/g, '.')
  e = e.replace(/^(\*\*Pembahasan:\*\*[^\n]*)\n(?!\n)/, '$1\n\n')
  e = e.replace(
    /\n(Konteks layanan terkait:|Mengapa opsi lain kurang tepat:|Ini soal pilihan ganda majemuk[^\n]*)\n/g,
    '\n\n$1\n',
  )
  e = e.replace(/\n(_Catatan:[^\n]*)\s*$/, '\n\n$1')
  e = e
    .split('\n')
    .map((l) => l.replace(/[ \t]+$/, ''))
    .join('\n')
    .trim()
  e = e.replace(/\n{3,}/g, '\n\n')
  return e ? `${e}\n` : ''
}

for (const item of questions) {
  const before = item.explanation || ''
  const after = normalizeExplanation(before)
  if (after !== before) {
    item.explanation = after
    changed += 1
  }
}

fs.writeFileSync(bankPath, `${JSON.stringify(questions, null, 2)}\n`)
console.log(`normalized ${changed} of ${questions.length}`)
