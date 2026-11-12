#!/usr/bin/env node
/**
 * Audit struktur + dedupe bank soal DEA-C01.
 * Input : aws-dea-c01/practice/research-questions.json
 * Output: aws-dea-c01/practice/audit/audit-structure.json
 * Read-only terhadap bank soal; hanya menulis ke folder audit/.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bankPath = path.join(root, 'aws-dea-c01/practice/research-questions.json')
const outDir = path.join(root, 'aws-dea-c01/practice/audit')
fs.mkdirSync(outDir, { recursive: true })

const doc = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const qs = Array.isArray(doc) ? doc : doc.questions

const WORDNUM = { two: 2, three: 3, four: 4, five: 5 }

export function stripHeader(stem) {
  return String(stem || '')
    .replace(/^\s*Question\s*#:\s*\d+\s*Topic\s*#:\s*\d+\s*\[[^\]]*\]\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\(\s*choose\s+(two|three|four|five)\.?\s*\)/gi, '')
    .replace(/[\u2018\u2019\u201c\u201d]/g, "'")
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function tokens(s) {
  return new Set(norm(s).split(' ').filter((w) => w.length > 2))
}

function jaccard(a, b) {
  let inter = 0
  for (const x of a) if (b.has(x)) inter++
  const uni = a.size + b.size - inter
  return uni ? inter / uni : 0
}

function stemChoose(stem) {
  const m = String(stem).match(/choose\s+(two|three|four|five)/i)
  return m ? WORDNUM[m[1].toLowerCase()] : 0
}

const rows = []
qs.forEach((q, idx) => {
  const flags = []
  const opts = q.options || []
  const labels = opts.map((o) => o.label).join('')
  const corr = opts.filter((o) => o.correct)
  const corrLabels = corr.map((o) => o.label).join('')
  const n = stemChoose(q.stem)
  const src = String(q.provenance || '').replace('local-compile:', '')
  const clean = stripHeader(q.stem)

  if (/Question\s*#:/i.test(q.stem)) flags.push('stem_scrape_header')
  if (opts.length < 4) flags.push('options_lt4')
  if (opts.length > 5) flags.push('options_gt5')
  if (!'ABCDEF'.startsWith(labels)) flags.push('label_sequence_broken')
  if (opts.some((o) => /^[A-F][.)]\s/.test(o.body))) flags.push('option_letter_prefix_dup')
  if (opts.some((o) => /\s[B-F]\.\s+[A-Z]/.test(o.body) && o.body.length > 120)) flags.push('options_merged_in_one')
  if (opts.some((o) => o.body.length > 400)) flags.push('option_very_long')
  if (opts.some((o) => o.body.length < 4)) flags.push('option_too_short')
  const bodies = opts.map((o) => norm(o.body))
  if (new Set(bodies).size !== bodies.length) flags.push('option_duplicate_text')
  if (opts.some((o) => /--- page \d+ ---|com \d+\/\s*\d+|THE SIGNAL|WORKED SCENARIO/i.test(o.body))) flags.push('ocr_noise')
  if (clean.length < 80) flags.push('stem_too_short')
  if (!/[?.:)]\s*$/.test(clean)) flags.push('stem_no_terminal_punct')
  if (/\.\.\.|…/.test(clean.slice(-6))) flags.push('stem_truncated')
  if (n && (q.type !== 'multi' || corr.length !== n)) flags.push(`choose_${n}_mismatch`)
  if (!n && q.type === 'multi') flags.push('multi_without_choose_n')
  if (n === 0 && q.type === 'single' && /choose\s+(two|three)/i.test(q.stem)) flags.push('single_but_choose')
  if (q.type === 'single' && corr.length !== 1) flags.push('single_key_count_wrong')
  if (corrLabels.length > 0 && corrLabels.split('').some((c, i, a) => a.indexOf(c) !== i)) flags.push('key_label_duplicated')
  // opsi pertama stem yang menyalin seluruh stem (kontaminasi)
  const stemTok = tokens(clean)
  if (opts.some((o) => o.body.length > 120 && jaccard(tokens(o.body), stemTok) > 0.6)) flags.push('option_contains_stem_text')
  // tipe multi tapi kunci tunggal/ >n
  if (q.type === 'multi' && corr.length < 2) flags.push('multi_key_lt2')
  if (q.verification_status === 'uncertain') flags.push('status_uncertain')
  if (q.has_answer_key === false) flags.push('study_only')

  rows.push({
    q_no: idx + 1,
    id: q.id,
    source: src,
    type: q.type,
    verification_status: q.verification_status,
    option_count: opts.length,
    option_labels: labels,
    key: corrLabels,
    choose_n: n || null,
    source_url: q.source_meta?.source_url || null,
    flags,
  })
})

// ---------- dedupe ----------
const toks = qs.map((q) => tokens(stripHeader(q.stem)))
const parent = qs.map((_, i) => i)
const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])))
const union = (a, b) => {
  parent[find(a)] = find(b)
}
for (let i = 0; i < qs.length; i++) {
  for (let j = i + 1; j < qs.length; j++) {
    const a = norm(stripHeader(qs[i].stem))
    const b = norm(stripHeader(qs[j].stem))
    if (!a || !b) continue
    if (a === b) {
      union(i, j)
      continue
    }
    // salah satu stem berisi yang lain, atau Jaccard tinggi
    const short = a.length < b.length ? a : b
    const long = a.length < b.length ? b : a
    if (short.length > 80 && long.includes(short.slice(0, 120))) {
      union(i, j)
      continue
    }
    if (toks[i].size > 12 && toks[j].size > 12 && jaccard(toks[i], toks[j]) >= 0.85) union(i, j)
  }
}
const groups = {}
qs.forEach((_, i) => {
  const r = find(i)
  ;(groups[r] = groups[r] || []).push(i)
})

function completeness(q) {
  const opts = q.options || []
  const bad =
    (opts.length < 4 ? 3 : 0) +
    (/Question\s*#:/i.test(q.stem) ? 0 : 1) +
    (opts.some((o) => o.body.length > 400) ? -3 : 0) +
    (opts.some((o) => /^[A-F][.)]\s/.test(o.body)) ? -1 : 0)
  return bad + (q.verification_status === 'community' ? 1 : 0) + opts.length * 0.1
}

const dupGroups = []
let uniqueCount = 0
for (const idxs of Object.values(groups)) {
  uniqueCount++
  if (idxs.length < 2) continue
  const members = idxs.map((i) => ({
    id: qs[i].id,
    q_no: i + 1,
    source: rows[i].source,
    option_count: rows[i].option_count,
    key: rows[i].key,
    type: qs[i].type,
    flags: rows[i].flags.filter((f) => !['status_uncertain'].includes(f)),
  }))
  const keys = new Set(members.map((m) => m.key).filter(Boolean))
  const best = [...idxs].sort((a, b) => completeness(qs[b]) - completeness(qs[a]))[0]
  dupGroups.push({
    members,
    key_conflict: keys.size > 1,
    keys: [...keys],
    recommended_baseline: qs[best].id,
  })
}
rows.forEach((r, i) => {
  const g = groups[find(i)]
  r.group_id = 'G' + String(Math.min(...g) + 1).padStart(3, '0')
  r.group_size = g.length
})

// ---------- ringkasan ----------
const flagCount = {}
rows.forEach((r) => r.flags.forEach((f) => (flagCount[f] = (flagCount[f] || 0) + 1)))
const summary = {
  generated_at: new Date().toISOString(),
  total_entries: qs.length,
  unique_stems: uniqueCount,
  duplicate_groups: dupGroups.length,
  entries_in_duplicate_groups: dupGroups.reduce((a, g) => a + g.members.length, 0),
  duplicate_groups_with_key_conflict: dupGroups.filter((g) => g.key_conflict).length,
  flag_counts: Object.fromEntries(Object.entries(flagCount).sort((a, b) => b[1] - a[1])),
  entries_with_any_structural_flag: rows.filter((r) =>
    r.flags.some((f) => !['status_uncertain', 'study_only', 'stem_scrape_header'].includes(f)),
  ).length,
}

fs.writeFileSync(path.join(outDir, 'audit-structure.json'), JSON.stringify({ summary, duplicate_groups: dupGroups, entries: rows }, null, 1))
console.log(JSON.stringify(summary, null, 2))
