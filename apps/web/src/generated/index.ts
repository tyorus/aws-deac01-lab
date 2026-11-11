import questions from './questions.json'
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
