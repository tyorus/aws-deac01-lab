#!/usr/bin/env node
/**
 * Fase 5: konsolidasi hasil verifikasi (ronde 1 + ronde 2) dengan temuan struktur.
 * Output (di aws-dea-c01/practice/audit/): final-status.json, patches.json, AUDIT-REPORT.md
 * TIDAK mengubah compiled-question-bank.md maupun research-questions.json.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const A = path.join(root, 'aws-dea-c01/practice/audit')
const J = (p) => JSON.parse(fs.readFileSync(p, 'utf8'))
const P = (n) => String(n).padStart(2, '0')

const bank = J(path.join(root, 'aws-dea-c01/practice/research-questions.json'))
const qs = Array.isArray(bank) ? bank : bank.questions
const qById = Object.fromEntries(qs.map((q) => [q.id, q]))
const audit = J(path.join(A, 'audit-structure.json'))
const recovery = J(path.join(A, 'recovery.json'))
const eById = Object.fromEntries(audit.entries.map((e) => [e.id, e]))
const recG = Object.fromEntries(recovery.groups.map((g) => [g.group_id, g]))

let p1 = []
for (let i = 1; i <= 10; i++) p1 = p1.concat(J(path.join(A, `verify-output/batch-${P(i)}.json`)))
let p2 = []
for (let i = 1; i <= 3; i++) p2 = p2.concat(J(path.join(A, `verify2-output/batch-${P(i)}.json`)))
const P1 = Object.fromEntries(p1.map((x) => [x.group_id, x]))
const P2 = Object.fromEntries(p2.map((x) => [x.group_id, x]))

const letters = (s) => [...new Set(String(s || '').toUpperCase().replace(/[^A-F]/g, '').split(''))].sort().join('')
const eq = (a, b) => letters(a) === letters(b)
const confRank = { high: 3, medium: 2, low: 1 }
const minConf = (a, b) => ((confRank[a] || 1) <= (confRank[b] || 1) ? a : b)

const groups = {}
for (const e of audit.entries) (groups[e.group_id] = groups[e.group_id] || []).push(e)

const STRUCT_IGNORE = new Set(['status_uncertain', 'study_only', 'stem_scrape_header'])
const FLAG_DESC = {
  options_lt4: 'opsi terpotong (<4 opsi, opsi benar mungkin hilang)',
  options_gt5: 'opsi >5 (label kacau)',
  label_sequence_broken: 'urutan label opsi rusak',
  option_letter_prefix_dup: 'awalan huruf ganda di teks opsi',
  options_merged_in_one: 'beberapa opsi menyatu dalam satu teks',
  option_very_long: 'opsi terlalu panjang (kontaminasi stem/opsi lain)',
  option_too_short: 'opsi sangat pendek',
  option_duplicate_text: 'teks opsi duplikat',
  ocr_noise: 'sampah OCR di opsi/stem',
  stem_too_short: 'stem terlalu pendek/terpotong',
  stem_no_terminal_punct: 'stem tidak berakhir normal (terpotong)',
  stem_truncated: 'stem terpotong',
  multi_without_choose_n: 'tipe multi tanpa "Choose N" di stem',
  option_contains_stem_text: 'opsi berisi salinan teks stem',
  key_label_duplicated: 'label kunci ganda (mis. BB)',
  single_key_count_wrong: 'jumlah kunci tidak sesuai tipe single',
  multi_key_lt2: 'multi tetapi kunci <2',
}

// ---------- status per grup ----------
const groupFinal = {}
const anomalies = []
for (const [gid, members] of Object.entries(groups)) {
  const rec = recG[gid]
  const base = eById[rec.baseline_id]
  const v1 = P1[gid]
  const v2 = P2[gid]
  if (!v1) throw new Error('verifikasi ronde 1 hilang untuk ' + gid)
  if (v1.current_key !== undefined && letters(v1.current_key) !== letters(base.key)) {
    anomalies.push(`${gid}: current_key reviewer '${v1.current_key}' != baseline '${base.key}'`)
  }
  const baseKey = letters(base.key)
  let p1Ans = null
  if (v1.verdict === 'key_correct') p1Ans = baseKey
  else if (v1.verdict === 'key_wrong' || v1.verdict === 'ambiguous') p1Ans = v1.correct_answer ? letters(v1.correct_answer) : null

  let status, answer = null, conf = v1.confidence, note = ''
  if (v1.verdict === 'options_incomplete') {
    status = 'OPSI_HILANG'
    if (v2 && v2.answer_status === 'determined' && v2.answer) {
      // ronde 2 menemukan jawaban pada opsi terlihat; tetap tandai opsi hilang, simpan sebagai kandidat
      answer = letters(v2.answer)
      note = 'ronde 2 menemukan kandidat pada opsi terlihat, tetapi ronde 1 menilai opsi benar tidak terlihat'
    }
  } else if (v2) {
    if (v2.answer_status === 'correct_option_missing') {
      status = 'OPSI_HILANG'
    } else if (v2.answer_status === 'flawed_question' || v2.answer_status === 'stem_or_options_unusable') {
      status = 'SOAL_CACAT_AMBIGU'
      if (p1Ans && v1.verdict === 'key_wrong') note = 'ronde 1: ' + p1Ans
    } else if (v2.answer && p1Ans && eq(v2.answer, p1Ans)) {
      answer = letters(v2.answer)
      conf = minConf(v1.confidence, v2.confidence)
      if (v1.verdict === 'ambiguous' || conf === 'low') {
        status = eq(answer, baseKey) ? 'KEY_BENAR_CONF_RENDAH' : 'KUNCI_DIDUGA_SALAH'
      } else status = eq(answer, baseKey) ? 'KEY_BENAR' : 'KUNCI_SALAH'
    } else if (v2.answer) {
      status = 'AMBIGU_REVIEWER_BERBEDA'
      answer = letters(v2.answer)
      note = `ronde 1: ${p1Ans || '-'}; ronde 2: ${letters(v2.answer)}`
      conf = 'low'
    } else {
      status = 'SOAL_CACAT_AMBIGU'
    }
  } else if (v1.verdict === 'key_correct') {
    status = 'KEY_BENAR'
    answer = baseKey
  } else {
    status = 'AMBIGU_REVIEWER_BERBEDA'
  }
  // kunci sumber menunjuk huruf yang tidak terlihat di bank -> opsi yang dimaksud sumber tidak diketahui
  const labelsVisible = qById[rec.baseline_id].options.map((o) => o.label)
  const hiddenSrc = (recovery.entry_source_comparison[rec.baseline_id]?.source_answers || []).filter(
    (a) => !/^ABCD/.test(a) && a.split('').some((c) => !labelsVisible.includes(c)),
  )
  if (status === 'KEY_BENAR' && hiddenSrc.length) {
    status = 'KEY_BENAR_CONF_RENDAH'
    conf = 'low'
    note = `sumber mentah menunjuk opsi ${hiddenSrc.join('/')} yang hilang; jawaban ${answer} benar secara teknis tetapi belum tentu yang dimaksud soal`
  }
  groupFinal[gid] = { gid, status, answer, conf, note, baseline: rec.baseline_id, baseKey, v1, v2 }
}

// ---------- status per entri ----------
const entries = []
for (const e of audit.entries) {
  const gf = groupFinal[e.group_id]
  const q = qById[e.id]
  const isBase = gf.baseline === e.id
  const structFlags = e.flags.filter((f) => !STRUCT_IGNORE.has(f))
  const minorFlags = e.flags.includes('stem_scrape_header') ? ['stem_scrape_header'] : []
  const entryKey = letters(e.key)
  let status, keyState = 'unknown'
  if (['KEY_BENAR', 'KEY_BENAR_CONF_RENDAH', 'KUNCI_SALAH', 'KUNCI_DIDUGA_SALAH'].includes(gf.status)) {
    keyState = eq(entryKey, gf.answer) ? 'ok' : 'wrong'
  }
  if (keyState === 'wrong') status = gf.status === 'KUNCI_DIDUGA_SALAH' ? 'KUNCI_DIDUGA_SALAH' : 'KUNCI_SALAH'
  else if (gf.status === 'OPSI_HILANG') status = 'OPSI_HILANG'
  else if (gf.status === 'SOAL_CACAT_AMBIGU') status = 'SOAL_CACAT_AMBIGU'
  else if (gf.status === 'AMBIGU_REVIEWER_BERBEDA') status = 'AMBIGU_PERLU_REVIEW'
  else if (structFlags.length) status = 'KUNCI_BENAR_STRUKTUR_KACAU'
  else if (gf.status === 'KEY_BENAR_CONF_RENDAH') status = 'KUNCI_BENAR_CONF_RENDAH'
  else status = 'OK'
  // salinan duplikat yang bukan baseline dan kuncinya benar -> status tetap, tetapi aksi = hapus duplikat
  entries.push({
    q_no: e.q_no,
    id: e.id,
    source: e.source,
    type: e.type,
    group_id: e.group_id,
    group_size: e.group_size,
    is_group_baseline: isBase,
    status,
    key_in_bank: entryKey || null,
    key_per_aws: gf.answer || null,
    key_state: keyState,
    group_status: gf.status,
    confidence: gf.conf,
    struct_flags: structFlags,
    minor_flags: minorFlags,
    options_missing: e.flags.includes('options_lt4'),
    source_url: e.source_url,
  })
}
const eFinal = Object.fromEntries(entries.map((x) => [x.id, x]))

// ---------- patches ----------
const uniq = (a) => [...new Set(a.filter(Boolean))]
const patches = []
for (const en of entries) {
  const gf = groupFinal[en.group_id]
  const q = qById[en.id]
  const v1 = gf.v1
  const v2 = gf.v2
  const docs = uniq([...(v2?.docs_opened || []), ...(v1.aws_doc_urls || [])])
  const base = { id: en.id, q_no: en.q_no, group_id: en.group_id, status: en.status, current_key: en.key_in_bank, source: en.source }
  const actions = []
  let proposed = {}

  if (en.group_size > 1 && !en.is_group_baseline) {
    patches.push({
      ...base,
      action: 'remove_duplicate',
      duplicate_of: gf.baseline,
      reason: `Duplikat dari ${gf.baseline} (stem sama). Pertahankan salinan baseline; salinan ini ${en.key_state === 'wrong' ? 'juga berkunci SALAH' : en.struct_flags.length ? 'juga bermasalah struktur' : 'tidak diperlukan'}.`,
      key_per_aws: en.key_per_aws,
    })
    continue
  }

  const fp = v1.fix_proposal
  const needsKey = en.status === 'KUNCI_SALAH' || en.status === 'KUNCI_DIDUGA_SALAH'
  const needsStruct = en.struct_flags.length > 0 || en.minor_flags.length > 0

  if (needsKey) {
    actions.push('fix_key')
    proposed.correct = gf.answer
    proposed.type = gf.answer.length > 1 ? 'multi' : 'single'
  }
  if (['OPSI_HILANG', 'SOAL_CACAT_AMBIGU', 'AMBIGU_PERLU_REVIEW'].includes(en.status)) {
    actions.push('set_study_only_until_reviewed')
    if (gf.answer) proposed.candidate_correct = gf.answer
  }
  if (fp && (fp.stem || fp.options?.length)) {
    actions.push('fix_structure')
    if (fp.stem) proposed.stem = fp.stem
    if (fp.options?.length) proposed.options = fp.options.map((o) => ({ label: o.label, text: o.text }))
    if (fp.type && !proposed.type) proposed.type = fp.type
  } else if (needsStruct || en.status === 'OPSI_HILANG') {
    actions.push('fix_structure_manual')
  }
  if (!actions.length) continue
  const solution = v2?.correct_solution_summary || v1.correct_answer_summary || ''
  patches.push({
    ...base,
    action: uniq(actions),
    key_per_aws: gf.answer || null,
    proposed,
    correct_solution_summary: solution,
    struct_issues: uniq([...en.struct_flags, ...(v1.structure_issues || [])]),
    reason: [v1.reasoning, v2 ? '[ronde 2] ' + v2.reasoning : ''].filter(Boolean).join(' '),
    confidence: gf.conf,
    docs: docs,
    docs_opened_ronde2: v2?.docs_opened || [],
    notes: uniq([gf.note, v2?.notes]).join(' | '),
    regenerate_explanation: needsKey || undefined,
  })
}

fs.writeFileSync(
  path.join(A, 'patches.json'),
  JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      note: 'Patch hanya untuk REVIEW. Belum diterapkan ke research-questions.json / compiled-question-bank.md.',
      global_rules: [
        { rule: 'strip_stem_header', regex: '^\\s*Question\\s*#:\\s*\\d+\\s*Topic\\s*#:\\s*\\d+\\s*\\[[^\\]]*\\]\\s*', applies_to: entries.filter((e) => e.minor_flags.length).map((e) => e.id) },
        { rule: 'strip_option_letter_prefix', description: 'hapus awalan "X. " / "**X:** " pada teks opsi' },
      ],
      patches,
    },
    null,
    1,
  ),
)
fs.writeFileSync(path.join(A, 'final-status.json'), JSON.stringify({ groups: Object.values(groupFinal).map(({ v1, v2, ...r }) => r), entries, anomalies }, null, 1))

// ---------- laporan ----------
const cnt = (arr, f) => arr.reduce((a, x) => ((a[f(x)] = (a[f(x)] || 0) + 1), a), {})
const eCnt = cnt(entries, (x) => x.status)
const gCnt = cnt(Object.values(groupFinal), (x) => x.status)
const cell = (s, n = 200) => String(s ?? '').replace(/\|/g, '/').replace(/\s+/g, ' ').trim().slice(0, n)
const link = (u) => (u ? `[src](${u})` : '-')
const short = (u) => {
  try {
    return new URL(u).pathname.split('/').slice(-1)[0].replace('.html', '') || u
  } catch {
    return u
  }
}
const docLinks = (arr) => uniq(arr).slice(0, 2).map((u) => `[${cell(short(u), 28)}](${u})`).join(' ') || '-'

const L = []
const push = (s = '') => L.push(s)

push('# Audit Bank Soal DEA-C01')
push()
push(`Dibuat: ${new Date().toISOString()}  `)
push('Objek: `aws-dea-c01/practice/compiled-question-bank.md` (452 entri, nomor Q# = urutan entri, LOC-### = id di `research-questions.json`).  ')
push('Status: **hanya laporan + patch usulan**; bank soal asli TIDAK diubah.')
push()
push('## 1. Ringkasan')
push()
push('| Ukuran | Jumlah |')
push('|---|---|')
push(`| Total entri | ${entries.length} |`)
push(`| Soal unik (setelah dedupe stem) | ${Object.keys(groups).length} |`)
push(`| Entri dalam grup duplikat | ${audit.summary.entries_in_duplicate_groups} (${audit.summary.duplicate_groups} grup) |`)
push(`| Grup duplikat dengan kunci berbeda antar salinan | ${audit.summary.duplicate_groups_with_key_conflict} |`)
push()
push('**Status per entri (452)**')
push()
push('| Status | Jumlah | Arti |')
push('|---|---|---|')
const MEAN = {
  OK: 'kunci benar menurut dokumentasi AWS dan struktur bersih',
  KUNCI_BENAR_CONF_RENDAH: 'kunci benar tetapi reviewer kurang yakin / soal ambigu',
  KUNCI_BENAR_STRUKTUR_KACAU: 'kunci benar tetapi susunan stem/opsi rusak',
  KUNCI_SALAH: 'kunci di bank TIDAK sesuai dokumentasi AWS (terkonfirmasi dua reviewer independen)',
  KUNCI_DIDUGA_SALAH: 'kunci kemungkinan salah (kedua reviewer sepakat, tetapi keyakinan rendah)',
  OPSI_HILANG: 'opsi yang benar tidak ada di bank (hasil scrape terpotong); kunci apa pun yang tampil tidak valid',
  SOAL_CACAT_AMBIGU: 'soal cacat/ambigu, tidak ada jawaban pasti dari opsi yang ada',
  AMBIGU_PERLU_REVIEW: 'dua reviewer berbeda pendapat; perlu keputusan manual',
}
for (const k of Object.keys(MEAN)) push(`| ${k} | ${eCnt[k] || 0} | ${MEAN[k]} |`)
push()
const bad = entries.filter((e) => e.status !== 'OK' && e.status !== 'KUNCI_BENAR_CONF_RENDAH')
const keyBad = entries.filter((e) => e.status === 'KUNCI_SALAH' || e.status === 'KUNCI_DIDUGA_SALAH')
push(`Hanya **${eCnt.OK || 0} dari ${entries.length}** entri yang lolos penuh. Kunci jawaban salah atau diduga salah pada **${keyBad.length}** entri (${eCnt.KUNCI_SALAH || 0} terkonfirmasi, ${eCnt.KUNCI_DIDUGA_SALAH || 0} diduga), dan **${eCnt.OPSI_HILANG || 0}** entri tidak dapat dipakai sebagai soal berkunci karena opsi benarnya hilang.`)
push()

push('## 2. Temuan sistemik (akar masalah)')
push()
const bySrc = cnt(entries, (e) => e.source)
const srcBad = {}
for (const e of entries) {
  const s = (srcBad[e.source] = srcBad[e.source] || { total: 0, wrong: 0 })
  s.total++
  if (e.status === 'KUNCI_SALAH' || e.status === 'KUNCI_DIDUGA_SALAH') s.wrong++
}
push('1. **Kunci dari sumber PDF tidak dapat dipercaya.** Sumber `pdf_exam_dumps` tidak punya kunci jawaban sama sekali di file mentah (`dumps-items.json`: 0 kunci); kunci di bank berasal dari penyalinan antar-sibling atau tebakan heuristik (`fill_study_only_keys.py`), dan hampir semuanya `A`/`AB`. Contoh: Q299 (LOC-299, kunci A "buat tabel per negara") padahal jawaban benar B (Lake Formation row-level security). `pdf_slide_deck` (LOC-385..392) seluruhnya dikunci `A`.')
push('2. **Opsi terpotong dari scrape ExamTopics.** Halaman publik hanya menyertakan 3 dari 4-5 opsi (mis. Q369, Q380). File mentah menyimpan kunci seperti `D` untuk soal yang hanya punya opsi A-C , tetapi bank menandai opsi yang terlihat (mis. A) sebagai benar. Total ' + (audit.summary.flag_counts.options_lt4 || 0) + ' entri berflag `options_lt4`.')
push('3. **Kunci placeholder `ABCD`/`ABCDE`** dari ExamTopics "live-partial" diubah menjadi multi-select dengan semua opsi dianggap benar (mis. Q82, Q83, Q84, Q85, Q86, Q90, Q91) - tidak masuk akal secara teknis.')
push('4. **Kunci komunitas (ExamTopics/GitHub) sering salah**, terutama pada soal multi-select dan soal yang jawabannya berubah setelah diskusi komunitas.')
push('5. **Konflik antar salinan**: dari ' + audit.summary.duplicate_groups + ' grup duplikat, ' + audit.summary.duplicate_groups_with_key_conflict + ' grup punya kunci berbeda antar salinan; hampir selalu salinan PDF yang salah.')
push('6. **Pembahasan di bank adalah template otomatis** (`generated_explanatory_v3`) yang membenarkan kunci apa pun yang tertulis; jika kunci salah, pembahasannya ikut salah. Semua entri berstatus KUNCI_SALAH perlu pembahasan digenerate ulang.')
push('7. **Header scrape** `Question #: N Topic #: 1 [All AWS Certified ...]` masih menempel di ' + (audit.summary.flag_counts.stem_scrape_header || 0) + ' stem (kosmetik, patch global tersedia).')
push()
push('Rasio kunci salah per sumber:')
push()
push('| Sumber | Entri | Kunci salah/diduga salah |')
push('|---|---|---|')
for (const [s, v] of Object.entries(srcBad).sort((a, b) => b[1].total - a[1].total)) push(`| ${s} | ${v.total} | ${v.wrong} |`)
push()

push('## 3. Kunci jawaban SALAH')
push()
push('Kunci yang tertulis di bank berbeda dari jawaban menurut dokumentasi AWS. "Kunci AWS" = hasil kesepakatan dua reviewer independen (ronde 1 dan ronde 2). Untuk salinan duplikat, kunci yang salah juga dicantumkan.')
push()
push('| Q# | ID | Sumber | Kunci bank | Kunci AWS | Yakin | Alasan ringkas | Dok. AWS |')
push('|---|---|---|---|---|---|---|---|')
for (const en of keyBad.sort((a, b) => a.q_no - b.q_no)) {
  const gf = groupFinal[en.group_id]
  const reason = gf.v2?.reasoning || gf.v1.reasoning
  const docs = [...(gf.v2?.docs_opened || []), ...(gf.v1.aws_doc_urls || [])]
  push(`| Q${en.q_no} | ${en.id}${en.group_size > 1 ? ` (grup ${en.group_id}${en.is_group_baseline ? ', baseline' : ', salinan'})` : ''} | ${en.source} | ${en.key_in_bank || '-'} | **${en.key_per_aws}** | ${en.confidence}${en.status === 'KUNCI_DIDUGA_SALAH' ? ' (diduga)' : ''} | ${cell(reason, 230)} | ${docLinks(docs)} |`)
}
push()

push('## 4. Opsi hilang / soal cacat / ambigu (kunci tidak dapat dipastikan)')
push()
push('Entri ini sebaiknya dikeluarkan dari mode berkunci (jadikan `study_only`) sampai opsi lengkap dipulihkan dari sumber lain atau soal diputuskan secara manual.')
push()
push('| Q# | ID | Status | Kunci bank | Solusi benar menurut AWS | Yakin | Catatan |')
push('|---|---|---|---|---|---|---|')
for (const en of entries.filter((e) => ['OPSI_HILANG', 'SOAL_CACAT_AMBIGU', 'AMBIGU_PERLU_REVIEW'].includes(e.status) || (e.group_status === 'KEY_BENAR_CONF_RENDAH' && e.key_state !== 'wrong')).sort((a, b) => a.q_no - b.q_no)) {
  const gf = groupFinal[en.group_id]
  const sol = gf.v2?.correct_solution_summary || gf.v1.correct_answer_summary || gf.v1.reasoning
  push(`| Q${en.q_no} | ${en.id} | ${en.status} | ${en.key_in_bank || '-'} | ${cell(sol, 200)} | ${en.confidence} | ${cell([gf.note, gf.v2?.notes].filter(Boolean).join(' | '), 140)} |`)
}
push()

push('## 5. Susunan soal/opsi kacau (kunci benar atau tidak dapat dinilai)')
push()
push('Termasuk entri yang kuncinya benar tetapi stem/opsi rusak, sehingga tidak layak dipakai apa adanya.')
push()
push('| Q# | ID | Status | Masalah struktur | Usulan perbaikan |')
push('|---|---|---|---|---|')
const structEntries = entries.filter((e) => e.struct_flags.length && !(e.group_size > 1 && !e.is_group_baseline && false))
for (const en of structEntries.sort((a, b) => a.q_no - b.q_no)) {
  const patch = patches.find((p) => p.id === en.id)
  const gf = groupFinal[en.group_id]
  const issues = uniq([...en.struct_flags.map((f) => FLAG_DESC[f] || f), ...(en.is_group_baseline ? gf.v1.structure_issues || [] : [])]).join('; ')
  let fix = '-'
  if (patch?.action === 'remove_duplicate') fix = `hapus (duplikat ${patch.duplicate_of})`
  else if (patch?.proposed?.options) fix = 'ada usulan opsi/stem bersih di patches.json'
  else if (patch) fix = 'perlu perbaikan manual (lihat patches.json)'
  push(`| Q${en.q_no} | ${en.id} | ${en.status} | ${cell(issues, 260)} | ${fix} |`)
}
push()

push('## 6. Duplikat')
push()
push('| Grup | Anggota (ID: sumber, kunci) | Kunci berbeda? | Pertahankan |')
push('|---|---|---|---|')
for (const g of audit.duplicate_groups) {
  const gid = 'G' + String(Math.min(...g.members.map((m) => m.q_no))).padStart(3, '0')
  const gf = groupFinal[gid]
  push(`| ${gid} | ${g.members.map((m) => `${m.id}: ${m.source}, ${m.key || '-'}`).join(' ; ')} | ${g.key_conflict ? 'ya' : 'tidak'} | ${gf?.baseline || g.recommended_baseline} |`)
}
push()

push('## 7. Keterbatasan audit (harap dibaca)')
push()
push('- Verifikasi dilakukan dua ronde oleh reviewer AI yang memakai WebSearch/WebFetch ke dokumentasi AWS. Ronde 1 mencakup semua ' + Object.keys(groups).length + ' soal unik; sebagian jawaban untuk soal sederhana didasarkan pengetahuan reviewer dan tidak semua URL dokumentasi dibuka langsung. Ronde 2 (independen, tanpa melihat kunci lama, wajib membuka dokumentasi) dilakukan untuk ' + Object.keys(P2).length + ' soal berisiko: semua yang ronde 1 nilai salah/ambigu/tidak dapat diverifikasi.')
push('- Soal berstatus `KEY_BENAR` yang tidak masuk ronde 2 hanya diverifikasi satu reviewer; sebagian berkeyakinan medium. Soal exam asli sering ambigu; "benar" di sini berarti paling sesuai dokumentasi AWS dan kata kunci stem (cost, latency, operational overhead).')
push('- Beberapa fitur kini deprecated/tertutup untuk pelanggan baru (S3 Select, S3 Object Lambda, Glacier Select); kunci tetap dinilai menurut maksud soal.')
push('- Untuk soal yang opsinya terpotong, jawaban benar hanya dapat dinyatakan sebagai ringkasan solusi, bukan huruf. Teks opsi yang hilang tidak dikarang.')
push('- Entri yang jatuh pada `AMBIGU_PERLU_REVIEW` dan `KUNCI_DIDUGA_SALAH` butuh keputusan manusia.')
if (anomalies.length) {
  push('- Anomali data: ' + anomalies.join('; '))
}
push()

push('## 8. Lampiran: status seluruh 452 entri')
push()
push('| Q# | ID | Status | Kunci bank | Kunci AWS | Grup |')
push('|---|---|---|---|---|---|')
for (const en of entries) push(`| Q${en.q_no} | ${en.id} | ${en.status} | ${en.key_in_bank || '-'} | ${en.key_per_aws || '-'} | ${en.group_id}${en.group_size > 1 ? (en.is_group_baseline ? ' (baseline)' : ' (salinan)') : ''} |`)
push()
fs.writeFileSync(path.join(A, 'AUDIT-REPORT.md'), L.join('\n'))

console.log('entries', eCnt)
console.log('groups', gCnt)
console.log('anomalies', anomalies)
console.log('patches', patches.length, cnt(patches, (p) => (Array.isArray(p.action) ? p.action.join('+') : p.action)))
