import questions from './questions.json'
import kb from './kb.json'
import examConfig from './exam-config.json'

export type RawQuestion = (typeof questions)[number]
export const allQuestions = questions as RawQuestion[]
export const knowledgeFiles = kb as Record<string, string>
export { examConfig }
