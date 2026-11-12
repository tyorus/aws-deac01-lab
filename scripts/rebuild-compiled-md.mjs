#!/usr/bin/env node
/** Rebuild practice/compiled-question-bank.md from research-questions.json. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const practice = path.join(root, 'aws-dea-c01', 'practice')
const quiz = JSON.parse(
  fs.readFileSync(path.join(practice, 'research-questions.json'), 'utf8'),
)

const lines = [
  '# DEA-C01 Compiled Local Question Bank',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  'Bank soal lokal (scrape + PDF) lengkap dengan **pembahasan**.',
  'Bukan materi resmi AWS.',
  '',
  `- Total entri quiz-ready: **${quiz.length}**`,
  `- Dengan pembahasan: **${quiz.filter((q) => (q.explanation || '').trim().length >= 40).length}**`,
  `- Multi-select: **${quiz.filter((q) => q.type === 'multi').length}**`,
  '',
  '---',
  '',
]

for (let i = 0; i < quiz.length; i += 1) {
  const q = quiz[i]
  const meta = q.source_meta || {}
  const src = meta.source || 'compiled'
  const num = meta.source_question_number
  let title = `## Q${i + 1}. [${src}]`
  if (num != null) title += ` #${num}`
  lines.push(title)
  lines.push(`*App id: \`${q.id}\` · type: \`${q.type}\`*`)
  lines.push('')
  lines.push(q.stem || '')
  lines.push('')
  for (const o of q.options || []) {
    lines.push(`- ${o.label}. ${o.body}`)
  }
  lines.push('')
  const ans = (q.options || []).filter((o) => o.correct).map((o) => o.label).join('')
  if (ans) {
    lines.push(`**Answer:** ${ans}`)
    lines.push('')
  }
  const expl = String(q.explanation || '').trim()
  if (expl) {
    if (!expl.startsWith('**Pembahasan:') && !expl.slice(0, 40).includes('Pembahasan')) {
      lines.push('**Explanation / Pembahasan:**')
      lines.push('')
    }
    lines.push(expl)
    lines.push('')
  }
  if (meta.source_url) {
    lines.push(`Source URL: ${meta.source_url}`)
    lines.push('')
  }
  lines.push('---')
  lines.push('')
}

const out = path.join(practice, 'compiled-question-bank.md')
fs.writeFileSync(out, `${lines.join('\n')}\n`)
console.log(`wrote ${quiz.length} entries → ${out}`)
