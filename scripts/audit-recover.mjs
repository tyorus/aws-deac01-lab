#!/usr/bin/env node
/**
 * Fase 3: rekonstruksi opsi/kunci dari sumber mentah + siapkan input verifikasi.
 * Input : practice/research-questions.json, practice/audit/audit-structure.json,
 *         _work/multi-source/all-questions.json, _work/compiled/pdf-retry/*.json
 * Output: practice/audit/recovery.json  dan  practice/audit/verify-input/batch-XX.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const J = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'))
const bank = J('aws-dea-c01/practice/research-questions.json')
const qs = Array.isArray(bank) ? bank : bank.questions
const audit = J('aws-dea-c01/practice/audit/audit-structure.json')
const raw = J('aws-dea-c01/_work/multi-source/all-questions.json').records
const dumps = J('aws-dea-c01/_work/compiled/pdf-retry/dumps-items.json')
const slidePe = J('aws-dea-c01/_work/compiled/pdf-retry/slide-practice-exams.json').items

const strip = (s) =>
  String(s || '')
    .replace(/^\s*Question\s*#:\s*\d+\s*Topic\s*#:\s*\d+\s*\[[^\]]*\]\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim()
const norm = (s) =>
  strip(s)
    .toLowerCase()
    .replace(/\(\s*choose\s+(two|three|four|five)\.?\s*\)/gi, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
const ckey = (s) => norm(s).slice(0, 140)

// raw index
const rawIdx = {}
for (const r of raw) {
  if (!r.question_text) continue
  ;(rawIdx[ckey(r.question_text)] = rawIdx[ckey(r.question_text)] || []).push({
    src: r.source,
    prov: r.provenance_detail,
    n: r.source_question_number,
    ans: r.source_answer || '',
    nopts: (r.answer_options || []).length,
    url: r.source_url,
  })
}
for (const r of slidePe) {
  ;(rawIdx[ckey(r.question_text)] = rawIdx[ckey(r.question_text)] || []).push({
    src: 'pdf_slide_practice_exam',
    n: r.source_question_number,
    ans: r.source_answer || '',
    nopts: (r.answer_options || []).length,
  })
}
for (const r of dumps) {
  ;(rawIdx[ckey(r.question_text)] = rawIdx[ckey(r.question_text)] || []).push({
    src: 'pdf_exam_dumps',
    n: r.source_question_number,
    ans: r.source_answer || '',
    nopts: (r.answer_options || []).length,
  })
}

const cleanBody = (b) => String(b || '').replace(/^\*{0,2}[A-F]:?\*{0,2}[.)]?\s+/, '').replace(/^[A-F][.)]\s+/, '').trim()

const byId = Object.fromEntries(qs.map((q) => [q.id, q]))
const auditById = Object.fromEntries(audit.entries.map((e) => [e.id, e]))

// ---- per-entry source answer comparison
const entryInfo = {}
for (const q of qs) {
  const k = ckey(q.stem)
  const hits = rawIdx[k] || []
  const key = q.options.filter((o) => o.correct).map((o) => o.label).join('')
  const labels = q.options.map((o) => o.label)
  const srcAns = [...new Set(hits.map((h) => h.ans).filter(Boolean))]
  const info = { id: q.id, key, raw_hits: hits.length, source_answers: srcAns, flags: [] }
  const own = hits.filter((h) => h.src === q.provenance.replace('local-compile:', ''))
  info.own_source_answer = [...new Set(own.map((h) => h.ans).filter(Boolean))].join('|') || null
  if (srcAns.length === 0) info.flags.push('no_source_answer_key_origin_unknown')
  for (const a of srcAns) {
    if (a.split('').some((c) => !labels.includes(c))) info.flags.push(`source_answer_${a}_not_in_visible_options`)
    if (/^ABCD?E?$/.test(a) && a.length >= 4) info.flags.push(`source_answer_placeholder_${a}`)
    if (a !== key) info.flags.push(`bank_key_${key}_differs_from_source_${a}`)
  }
  entryInfo[q.id] = info
}

// ---- per group: baseline + merged option proposal
const groups = {}
for (const e of audit.entries) (groups[e.group_id] = groups[e.group_id] || []).push(e.id)

const items = []
const recovery = []
for (const [gid, ids] of Object.entries(groups)) {
  const members = ids.map((i) => byId[i])
  // baseline: opsi terbanyak yang tidak rusak
  const score = (q) => {
    const f = auditById[q.id].flags
    return (
      q.options.length * 2 -
      (f.includes('options_merged_in_one') ? 6 : 0) -
      (f.includes('option_very_long') ? 6 : 0) -
      (f.includes('label_sequence_broken') ? 6 : 0) -
      (f.includes('ocr_noise') ? 8 : 0) -
      (q.provenance.includes('pdf_exam_dumps') ? 1 : 0)
    )
  }
  const base = [...members].sort((a, b) => score(b) - score(a))[0]
  const bflags = auditById[base.id].flags
  const rec = {
    group_id: gid,
    baseline_id: base.id,
    member_ids: ids,
    recovered_from_sibling: false,
    options_incomplete: false,
  }
  // opsi tambahan dari saudara bila baseline < 4 opsi
  if (base.options.length < 4) {
    const richer = members.filter((m) => m.id !== base.id && m.options.length > base.options.length)
    if (richer.length) rec.recovered_from_sibling = true
    else rec.options_incomplete = true
  }
  const entryKeys = Object.fromEntries(members.map((m) => [m.id, entryInfo[m.id].key]))
  const srcAns = [...new Set(members.flatMap((m) => entryInfo[m.id].source_answers))]
  items.push({
    group_id: gid,
    q_no_in_markdown: members.map((m) => audit.entries.find((e) => e.id === m.id).q_no),
    ids,
    baseline_id: base.id,
    type: base.type,
    choose_n: auditById[base.id].choose_n,
    stem: strip(base.stem),
    options: base.options.map((o) => ({ label: o.label, text: cleanBody(o.body), marked_correct: !!o.correct })),
    baseline_flags: bflags.filter((f) => !['status_uncertain', 'stem_scrape_header'].includes(f)),
    copy_keys: entryKeys,
    copy_sources: Object.fromEntries(members.map((m) => [m.id, m.provenance.replace('local-compile:', '')])),
    raw_source_answers: srcAns,
    entry_flags: Object.fromEntries(members.map((m) => [m.id, entryInfo[m.id].flags])),
    alt_option_sets: members
      .filter((m) => m.id !== base.id)
      .map((m) => ({ id: m.id, options: m.options.map((o) => ({ label: o.label, text: cleanBody(o.body).slice(0, 300), marked_correct: !!o.correct })) })),
  })
  recovery.push(rec)
}

// urutkan item: prioritas risiko (konflik kunci, multi, struktur rusak) dulu agar tersebar merata ke batch
items.sort((a, b) => a.q_no_in_markdown[0] - b.q_no_in_markdown[0])

fs.writeFileSync(
  path.join(root, 'aws-dea-c01/practice/audit/recovery.json'),
  JSON.stringify({ entry_source_comparison: entryInfo, groups: recovery }, null, 1),
)

const BATCH = 8
const outDir = path.join(root, 'aws-dea-c01/practice/audit/verify-input')
fs.mkdirSync(outDir, { recursive: true })
const nBatches = Math.ceil(items.length / 37)
const per = Math.ceil(items.length / nBatches)
for (let b = 0; b < nBatches; b++) {
  const chunk = items.slice(b * per, (b + 1) * per)
  fs.writeFileSync(path.join(outDir, `batch-${String(b + 1).padStart(2, '0')}.json`), JSON.stringify(chunk, null, 1))
}

// ringkasan
const c = {}
for (const e of Object.values(entryInfo)) for (const f of e.flags) {
  const k = f.replace(/_[A-E]+_/g, '_X_').replace(/_[A-E]+$/g, '_X')
  c[k] = (c[k] || 0) + 1
}
console.log({ groups: recovery.length, batches: nBatches, per, recovered_from_sibling: recovery.filter((r) => r.recovered_from_sibling).length, options_incomplete: recovery.filter((r) => r.options_incomplete).length })
console.log(c)
