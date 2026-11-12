#!/usr/bin/env node
/**
 * Terapkan patches.json ke practice/research-questions.json.
 * - hapus duplikat
 * - perbaiki kunci / struktur bila ada usulan
 * - set study_only untuk soal cacat / opsi hilang / ambigu
 * - strip header scrape + awalan huruf ganda di opsi
 * Tidak menyentuh apps/web (jalankan sync-content.mjs setelahnya).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const practice = path.join(root, 'aws-dea-c01/practice')
const bankPath = path.join(practice, 'research-questions.json')
const patchPath = path.join(practice, 'audit/patches.json')
const reportPath = path.join(practice, 'audit/apply-report.json')

const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const qs = Array.isArray(bank) ? bank : bank.questions
const byId = new Map(qs.map((q) => [q.id, q]))
const patchDoc = JSON.parse(fs.readFileSync(patchPath, 'utf8'))
const patches = patchDoc.patches || []

const HEADER_RE = /^\s*Question\s*#:\s*\d+\s*Topic\s*#:\s*\d+\s*\[[^\]]*\]\s*/i
const OPT_PREFIX_RE = /^(?:\*{0,2}[A-F]:?\*{0,2}\s*[.)]\s+|[A-F][.)]\s+)/

function acts(p) {
  return Array.isArray(p.action) ? p.action : [p.action]
}
function letters(s) {
  return [...new Set(String(s || '').toUpperCase().replace(/[^A-F]/g, '').split(''))].sort().join('')
}
function stripHeader(stem) {
  return String(stem || '').replace(HEADER_RE, '').replace(/\s+/g, ' ').trim()
}
function stripOptBody(body) {
  return String(body || '').replace(OPT_PREFIX_RE, '').trim()
}
function applyCorrect(q, key) {
  const L = new Set(letters(key).split(''))
  for (const o of q.options || []) o.correct = L.has(o.label)
  const n = [...L].length
  q.type = n > 1 ? 'multi' : 'single'
  q.has_answer_key = n >= 1
  if (n > 1 && !/\(\s*Choose\s+(two|three|four|five)/i.test(q.stem) && !/Select\s+Two/i.test(q.stem)) {
    const word = { 2: 'two', 3: 'three', 4: 'four', 5: 'five' }[n]
    if (word && !/\(\s*Choose\s+/i.test(q.stem)) {
      q.stem = `${q.stem.replace(/\s*$/, '')} (Choose ${word}.)`
    }
  }
}
function setStudyOnly(q, note) {
  q.has_answer_key = false
  q.verification_status = 'uncertain'
  for (const o of q.options || []) o.correct = false
  if (note) {
    const tag = `\n\n_Catatan audit: ${note}_`
    if (!String(q.explanation || '').includes('_Catatan audit:')) {
      q.explanation = `${String(q.explanation || '').trim()}${tag}\n`
    }
  }
}
function applyStructure(q, proposed) {
  if (!proposed) return false
  let changed = false
  if (proposed.stem && proposed.stem.length > 40) {
    q.stem = proposed.stem
    changed = true
  }
  if (Array.isArray(proposed.options) && proposed.options.length >= 2) {
    const oldCorrect = letters((q.options || []).filter((o) => o.correct).map((o) => o.label).join(''))
    const want = letters(proposed.correct || oldCorrect)
    q.options = proposed.options.map((o, i) => ({
      id: `opt-${String(o.label || String.fromCharCode(65 + i)).toLowerCase()}`,
      label: o.label || String.fromCharCode(65 + i),
      body: stripOptBody(o.text || o.body || ''),
      correct: false,
    }))
    if (want) applyCorrect(q, want)
    changed = true
  }
  if (proposed.type === 'single' || proposed.type === 'multi') {
    q.type = proposed.type
    changed = true
  }
  return changed
}

const stats = {
  remove_duplicate: 0,
  fix_key: 0,
  fix_structure: 0,
  study_only: 0,
  header_stripped: 0,
  option_prefix_stripped: 0,
  missing: [],
  regen_ids: [],
  study_only_ids: [],
  removed_ids: [],
}
const removed = new Set()
const patchById = Object.fromEntries(patches.map((p) => [p.id, p]))

// 1) remove duplicates first
for (const p of patches) {
  if (!acts(p).includes('remove_duplicate')) continue
  if (!byId.has(p.id)) {
    stats.missing.push(p.id)
    continue
  }
  removed.add(p.id)
  stats.remove_duplicate++
  stats.removed_ids.push(p.id)
}

// 2) apply per-id patches on remaining
for (const p of patches) {
  if (removed.has(p.id)) continue
  const q = byId.get(p.id)
  if (!q) {
    stats.missing.push(p.id)
    continue
  }
  const a = acts(p)
  const proposed = p.proposed || {}

  if (a.includes('fix_structure') && (proposed.stem || proposed.options)) {
    if (applyStructure(q, proposed)) {
      stats.fix_structure++
      stats.regen_ids.push(q.id)
    }
  }

  if (a.includes('fix_key') && (proposed.correct || p.key_per_aws)) {
    applyCorrect(q, proposed.correct || p.key_per_aws)
    q.verification_status = 'community'
    q.has_answer_key = true
    q.reviewed_at = new Date().toISOString().slice(0, 10)
    q.audit_patch = {
      previous_key: p.current_key,
      new_key: letters(proposed.correct || p.key_per_aws),
      docs: p.docs || [],
      summary: p.correct_solution_summary || '',
      confidence: p.confidence || null,
    }
    stats.fix_key++
    stats.regen_ids.push(q.id)
  }

  if (a.includes('set_study_only_until_reviewed')) {
    const note =
      p.correct_solution_summary ||
      'Soal bermasalah (opsi hilang / cacat / ambigu). Tidak dinilai sampai direview ulang.'
    // jika ada kandidat kunci dan opsi lengkap (>=4) serta status bukan OPSI_HILANG, tetap biarkan kunci kandidat untuk study? Plan: study_only = tidak grade
    setStudyOnly(q, note.slice(0, 400))
    q.audit_patch = {
      previous_key: p.current_key,
      study_only: true,
      candidate: proposed.candidate_correct || p.key_per_aws || null,
      docs: p.docs || [],
      summary: p.correct_solution_summary || '',
      status: p.status,
    }
    stats.study_only++
    stats.study_only_ids.push(q.id)
    stats.regen_ids.push(q.id)
  }

  // fix_structure_manual tanpa proposed: tetap strip header / prefix di langkah global
}

// 3) global cleanups on remaining questions
let out = qs.filter((q) => !removed.has(q.id))
for (const q of out) {
  const before = q.stem
  q.stem = stripHeader(q.stem)
  if (q.stem !== before) stats.header_stripped++
  for (const o of q.options || []) {
    const b = o.body
    o.body = stripOptBody(o.body)
    if (o.body !== b) stats.option_prefix_stripped++
  }
}

// re-number nothing; keep LOC ids. Write bank as array.
fs.writeFileSync(bankPath, `${JSON.stringify(out, null, 2)}\n`)
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      before: qs.length,
      after: out.length,
      stats,
      unique_regen: [...new Set(stats.regen_ids)],
    },
    null,
    2,
  ),
)
console.log(
  JSON.stringify(
    {
      before: qs.length,
      after: out.length,
      removed: stats.remove_duplicate,
      fix_key: stats.fix_key,
      fix_structure: stats.fix_structure,
      study_only: stats.study_only,
      header_stripped: stats.header_stripped,
      option_prefix_stripped: stats.option_prefix_stripped,
      regen: [...new Set(stats.regen_ids)].length,
    },
    null,
    2,
  ),
)
