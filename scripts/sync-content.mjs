import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync, existsSync } from 'node:fs'
import { join, dirname, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const kbRoot = join(root, 'aws-dea-c01')
const outDir = join(root, 'apps', 'web', 'src', 'generated')
mkdirSync(outDir, { recursive: true })

function loadQuestionBank() {
  const candidates = [
    // Committed source of truth (compiled bank)
    join(kbRoot, 'practice', 'research-questions.json'),
    // Local recompile output
    join(kbRoot, '_work', 'compiled', 'research-questions.json'),
    // Last generated fallback
    join(outDir, 'research-questions.json'),
  ]

  for (const path of candidates) {
    if (!existsSync(path)) continue
    try {
      const doc = JSON.parse(readFileSync(path, 'utf8'))
      const list = Array.isArray(doc) ? doc : doc.questions
      if (Array.isArray(list) && list.length) {
        return { path, questions: list }
      }
    } catch {
      /* try next */
    }
  }
  return { path: null, questions: [] }
}

const bank = loadQuestionBank()
const questions = bank.questions

writeFileSync(join(outDir, 'research-questions.json'), JSON.stringify(questions, null, 2))
writeFileSync(join(outDir, 'questions.json'), JSON.stringify(questions, null, 2))

// Knowledge markdown bundle
const mdFiles = []
function walkMd(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (name === 'questions') continue
      if (name === '_work') continue
      walkMd(p)
    } else if (extname(p) === '.md') {
      mdFiles.push(p)
    }
  }
}
walkMd(kbRoot)

const kb = {}
for (const p of mdFiles) {
  const rel = relative(kbRoot, p).replace(/\\/g, '/')
  kb[rel] = readFileSync(p, 'utf8')
}
writeFileSync(join(outDir, 'kb.json'), JSON.stringify(kb, null, 2))

// Exam config copy
const examConfig = readFileSync(join(kbRoot, 'content', 'schemas', 'exam-config.json'), 'utf8')
writeFileSync(join(outDir, 'exam-config.json'), examConfig)

writeFileSync(
  join(outDir, 'index.ts'),
  `import questions from './questions.json'
import researchQuestions from './research-questions.json'
import kb from './kb.json'
import examConfig from './exam-config.json'

export type RawQuestion = (typeof questions)[number]
export const allQuestions = questions as RawQuestion[]
/** @deprecated Old DEA-* originals removed; alias kept for compatibility */
export const originalQuestions = [] as RawQuestion[]
export const compiledResearchQuestions = researchQuestions as RawQuestion[]
export const knowledgeFiles = kb as Record<string, string>
export { examConfig }
`,
)

console.log(
  `Synced ${questions.length} compiled questions from ${bank.path || '(none)'} + ${mdFiles.length} markdown files → apps/web/src/generated`,
)
