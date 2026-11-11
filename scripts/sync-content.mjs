import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, dirname, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const kbRoot = join(root, 'aws-dea-c01')
const outDir = join(root, 'apps', 'web', 'src', 'generated')
mkdirSync(outDir, { recursive: true })

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (name === 'content' && dir === kbRoot) {
        // skip content/questions JSON here; handled separately
        const nested = join(p, 'flashcards')
        if (statSync(p).isDirectory()) {
          // still walk non-question content markdown if any later
        }
        continue
      }
      if (name === 'questions' && dir.endsWith('content')) continue
      walk(p, files)
    } else {
      files.push(p)
    }
  }
  return files
}

// Questions bundle
const qDir = join(kbRoot, 'content', 'questions')
const questions = readdirSync(qDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(readFileSync(join(qDir, f), 'utf8')))
writeFileSync(join(outDir, 'questions.json'), JSON.stringify(questions, null, 2))

// Knowledge markdown bundle
const mdFiles = []
function walkMd(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (name === 'questions') continue
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
import kb from './kb.json'
import examConfig from './exam-config.json'

export type RawQuestion = (typeof questions)[number]
export const allQuestions = questions as RawQuestion[]
export const knowledgeFiles = kb as Record<string, string>
export { examConfig }
`,
)

console.log(`Synced ${questions.length} questions and ${mdFiles.length} markdown files → apps/web/src/generated`)
