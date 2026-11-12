#!/usr/bin/env node
/**
 * Rekonstruksi soal slide (practice exam + worked scenario) dari OCR 2 kolom.
 * Huruf "B" di halaman soal adalah penanda kolom, BUKAN kunci jawaban.
 * Kunci diambil dari paragraf THE SIGNAL di halaman WORKED.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const practice = path.join(root, 'aws-dea-c01/practice')
const bankPath = path.join(practice, 'research-questions.json')
const rebuildDir = path.join(practice, 'audit/rebuild-input')

const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const qs = Array.isArray(bank) ? bank : bank.questions
const byId = new Map(qs.map((q) => [q.id, q]))

const rebuild = ['01', '02', '03', '04']
  .flatMap((n) => JSON.parse(fs.readFileSync(path.join(rebuildDir, `slide-${n}.json`), 'utf8')))

function clean(t) {
  return String(t || '')
    .replace(/ﬁ/g, 'fi')
    .replace(/ﬂ/g, 'fl')
    .replace(/QUESTI0N/gi, 'QUESTION')
    .replace(/D0MAIN/gi, 'DOMAIN')
    .replace(/W0RKED/gi, 'WORKED')
    .replace(/AWs /g, 'AWS ')
    .replace(/Aws /g, 'AWS ')
    .replace(/AwS /g, 'AWS ')
    .replace(/s3\b/g, 'S3')
    .replace(/JsoN/g, 'JSON')
    .replace(/APl/g, 'API')
    .replace(/Gsl/g, 'GSI')
    .replace(/LSl/g, 'LSI')
    .replace(/MsK/g, 'MSK')
    .replace(/Msk/g, 'MSK')
}

function tidy(s) {
  return s
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:])/g, '$1')
    .replace(/\bAWS AWS\b/g, 'AWS')
    .trim()
}

function questionPage(ocr) {
  const pages = Object.values(ocr || {}).map(clean)
  return (
    pages.find((p) => /PAUSE\s*AND\s*DECIDE/i.test(p) && !/THE SIGNAL/i.test(p)) ||
    pages.find((p) => /\?\s*\n/.test(p) && !/THE SIGNAL/i.test(p)) ||
    ''
  )
}

function workedPage(ocr) {
  const pages = Object.values(ocr || {}).map(clean)
  return pages.find((p) => /THE SIGNAL/i.test(p)) || pages.find((p) => /WORKED/i.test(p)) || ''
}

function extractSignal(worked) {
  const m = clean(worked).match(/THE SIGNAL\s*([\s\S]*?)(?:\n(?:PRACTICE EXAM|MONITORING|AUTHENTICATION|ALL DOMAINS|admin@|D\d)|$)/i)
  return m ? tidy(m[1]) : ''
}

function extractStem(qpage) {
  const t = clean(qpage)
  const body = t
    .replace(/^[\s\S]*?QUESTION\s*\d+[^\n]*\n?/i, '')
    .replace(/^[\s\S]*?WORKED\s*SCENARIO[^\n]*\n?/i, '')
  const cut = [...body.matchAll(/\?/g)].pop()
  if (!cut) return ''
  let stem = tidy(body.slice(0, cut.index + 1))
  stem = stem.replace(/^DOMAIN\s*[1-4]\s*/i, '')
  if (/Select\s*Two/i.test(stem) && !/\(\s*Choose\s+two/i.test(stem)) {
    stem = `${stem.replace(/\.\s*$/, '')} (Choose two.)`
  }
  return stem
}

function optionLines(qpage) {
  const t = clean(qpage)
  const body = t
    .replace(/^[\s\S]*?QUESTION\s*\d+[^\n]*\n?/i, '')
    .replace(/^[\s\S]*?WORKED\s*SCENARIO[^\n]*\n?/i, '')
  const cut = [...body.matchAll(/\?/g)].pop()
  if (!cut) return []
  let after = body.slice(cut.index + 1)
  after = after.split(/PAUSE\s*AND\s*DECIDE|admin@|PRACTICE EXAM|MONITORING AND|AUTHENTICATION AND/i)[0]
  return after
    .split(/\n/)
    .map((ln) => ln.replace(/\s+/g, ' ').trim())
    .filter((ln) => ln && !/^(ALL DOMAINS|QUESTION|DOMAIN\s*\d|PAUSE)/i.test(ln))
}

function isCont(line, prev) {
  if (!prev) return false
  const s = line.trim()
  if (!s) return true
  if (/^[a-z]/.test(s)) return true
  if (
    /^(and |or |with |to |the |of |by |from |on |in |for |which |that |backed |mode\b|topics\b|files\b|memory\b|job\b|policy\b|compatible\b|columns\b|sort key|primary copies|performing |EventBridge Scheduler|export older|loss of older)/i.test(
      s,
    )
  )
    return true
  if (/(?:\bby|\bfor|\bthe|\band|\bwith|\bto|\bas|\ban|\ba|\bper|\beach|\bexisting|\binddefinitely)$/i.test(prev.trim()))
    return true
  if (s.split(/\s+/).length <= 2 && !/^(Amazon|AWS|Enable|Add|Use|Create|Build|Keep|Set)$/i.test(s)) return true
  return false
}

function unwrapOptions(lines) {
  const src = lines.filter((ln) => !/^[A-D]$/.test(ln))
  if (src.length < 2) return []
  const left = [src[0]]
  const right = []
  let side = 'L'
  const last = (arr) => arr[arr.length - 1]
  const add = (arr, ln) => {
    arr[arr.length - 1] = tidy(`${arr[arr.length - 1]} ${ln}`)
  }
  for (let i = 1; i < src.length; i++) {
    const ln = src[i]
    const L = last(left)
    const R = right.length ? last(right) : ''
    const cL = isCont(ln, L)
    const cR = isCont(ln, R)
    if (cL && !cR) {
      add(left, ln)
      side = 'L'
    } else if (cR && !cL) {
      add(right, ln)
      side = 'R'
    } else if (cL && cR) {
      if (side === 'L') add(left, ln)
      else add(right, ln)
    } else if (!right.length) {
      right.push(ln)
      side = 'R'
    } else if (left.length === right.length) {
      left.push(ln)
      side = 'L'
    } else {
      right.push(ln)
      side = 'R'
    }
  }
  const opts = [left[0], right[0], left[1], right[1]].filter(Boolean).map(tidy)
  return opts.slice(0, 4)
}

function tokenize(s) {
  return new Set(
    String(s || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(' ')
      .filter((w) => w.length > 3),
  )
}

function score(opt, signal) {
  const a = tokenize(opt)
  const b = tokenize(signal)
  let n = 0
  for (const w of a) if (b.has(w)) n++
  const low = opt.toLowerCase()
  const sig = signal.toLowerCase()
  const boost = [
    ['transfer family', 8],
    ['documentdb', 8],
    ['appflow', 8],
    ['batch', 5],
    ['global secondary', 8],
    ['gsi', 8],
    ['msk provisioned', 8],
    ['bucket key', 8],
    ['intelligent-tiering', 6],
    ['glue flex', 6],
    ['flex execution', 6],
    ['distributed map', 8],
    ['lake formation', 6],
    ['partition index', 6],
    ['athena', 3],
    ['redshift', 2],
  ]
  for (const [k, v] of boost) if (sig.includes(k) && low.includes(k)) n += v
  if (/names ([a-z0-9 ]{3,40})/i.test(signal)) {
    const named = signal.match(/names ([a-z0-9 ]{3,40})/i)[1].toLowerCase()
    if (low.includes(named.trim().split(' ').slice(0, 3).join(' '))) n += 10
  }
  return n
}

function pickCorrect(options, signal) {
  if (!signal || options.length < 2) return -1
  const scores = options.map((o) => score(o, signal))
  const best = Math.max(...scores)
  if (best <= 0) return -1
  const idx = scores.indexOf(best)
  // unique winner
  if (scores.filter((s) => s === best).length > 1 && best < 6) return -1
  return idx
}

function workedVerdicts(worked) {
  const t = clean(worked)
  let body = t.replace(/^[\s\S]*?(?:WORKED\s*(?:SCENARIO)?[^\n]*\n|QUESTION\s*\d+[^\n]*WORKED[^\n]*\n)/i, '')
  body = body.replace(/^(What should|What is|Which combination|Which approach|Select Two)[^\n]*\n?/i, '')
  body = body.split(/THE SIGNAL|PRACTICE EXAM|admin@/i)[0]
  const lines = body
    .split(/\n/)
    .map((ln) => tidy(ln))
    .filter(Boolean)
  const blocks = []
  for (const ln of lines) {
    if (ln.length <= 90 && !/^[a-z]/.test(ln) && blocks.length < 6) {
      blocks.push({ title: ln, text: '' })
    } else if (blocks.length) {
      blocks[blocks.length - 1].text = tidy(`${blocks[blocks.length - 1].text} ${ln}`)
    }
  }
  return blocks.slice(0, 4)
}

function explanation(letter, options, signal, verdicts, extra) {
  const idx = letter.charCodeAt(0) - 65
  const correctBody = options[idx] || ''
  const lines = [
    `**Pembahasan:** Jawaban yang tepat adalah **${letter}**.`,
    '',
    `**Mengapa ${letter} benar**`,
    correctBody,
  ]
  if (signal) {
    lines.push('')
    lines.push(`**THE SIGNAL:** ${signal}`)
  }
  if (extra) {
    lines.push('')
    lines.push(extra)
  }
  const wrong = options
    .map((body, i) => ({ body, L: String.fromCharCode(65 + i) }))
    .filter((x) => x.L !== letter)
  if (wrong.length) {
    lines.push('')
    lines.push('**Mengapa opsi lain salah**')
    for (const w of wrong) {
      const v = verdicts.find((b) => score(w.body, b.title + ' ' + b.text) >= score(w.body, signal || '') && b.text)
      const why = v?.text ? tidy(v.text).slice(0, 280) : `Tidak memenuhi constraint di stem (dibanding ${letter}).`
      lines.push(`- **${w.L}** (${w.body}): ${why}`)
    }
  }
  lines.push('')
  lines.push('_Rekonstruksi dari halaman WORKED materi slide + dokumentasi AWS._')
  return lines.join('\n')
}

const report = []
let updated = 0
let study = 0
let skipped = 0

for (const item of rebuild) {
  const q = byId.get(item.id)
  if (!q) {
    skipped++
    continue
  }
  const ocr = item.ocr_pages || {}
  const qpage = questionPage(ocr)
  const wpage = workedPage(ocr)
  const signal = extractSignal(wpage)
  const stem = extractStem(qpage) || (q.stem.length > 80 ? q.stem : '')
  const lines = optionLines(qpage)
  let options = unwrapOptions(lines)
  // slide_deck worked-scenario: try from current OCR dump if unwrap failed
  if (options.length < 3 && item.source === 'pdf_slide_deck') {
    options = unwrapOptions(optionLines(Object.values(ocr).join('\n')))
  }
  if (stem.length < 40 || options.length < 3) {
    report.push({ id: item.id, action: 'leave', reason: 'unwrap_failed', options: options.length, stem: stem.slice(0, 80) })
    skipped++
    continue
  }
  const idx = pickCorrect(options, signal)
  const verdicts = workedVerdicts(wpage)
  q.stem = stem
  const labels = ['A', 'B', 'C', 'D'].slice(0, options.length)
  const choose = (stem.match(/Choose\s+(two|three)/i) || [])[1]
  const wantN = choose ? { two: 2, three: 3 }[choose.toLowerCase()] : 1

  if (idx < 0 || (wantN === 1 && options.length >= 3 && score(options[idx], signal) < 2)) {
    q.options = options.map((body, i) => ({
      id: `opt-${labels[i].toLowerCase()}`,
      label: labels[i],
      body,
      correct: false,
    }))
    q.has_answer_key = false
    q.verification_status = 'uncertain'
    q.type = wantN > 1 ? 'multi' : 'single'
    q.explanation = explanation('?', options, signal, verdicts, 'Kunci belum dipastikan otomatis dari THE SIGNAL — mode study-only.')
    q.explanation_origin = 'slide_ocr_rebuild_v1'
    study++
    report.push({ id: item.id, action: 'study_only', signal: signal.slice(0, 120), options })
    continue
  }

  q.options = options.map((body, i) => ({
    id: `opt-${labels[i].toLowerCase()}`,
    label: labels[i],
    body,
    correct: i === idx,
  }))
  q.type = 'single'
  q.has_answer_key = true
  q.verification_status = 'community'
  q.explanation = explanation(labels[idx], options, signal, verdicts)
  q.explanation_origin = 'slide_ocr_rebuild_v1'
  q.reviewed_at = new Date().toISOString().slice(0, 10)
  q.audit_patch = {
    ...(q.audit_patch || {}),
    rebuilt_from_ocr: true,
    new_key: labels[idx],
    signal,
  }
  updated++
  report.push({ id: item.id, action: 'rebuilt', key: labels[idx], options, signal: signal.slice(0, 140) })
}

fs.writeFileSync(bankPath, `${JSON.stringify(qs, null, 2)}\n`)
fs.writeFileSync(path.join(practice, 'audit/slide-rebuild-report.json'), JSON.stringify({ updated, study, skipped, report }, null, 2))
console.log(JSON.stringify({ total_rebuild_items: rebuild.length, updated, study, skipped }, null, 2))
console.log('sample', report.filter((r) => ['LOC-433', 'LOC-393', 'LOC-402', 'LOC-414', 'LOC-415', 'LOC-419', 'LOC-385'].includes(r.id)))
