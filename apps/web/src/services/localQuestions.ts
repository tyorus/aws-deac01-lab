import type { Difficulty, Question } from '@/types'
import { stripAnswerKeys } from '@/services/localGrader'
import { allQuestions, type RawQuestion } from '@/generated/index'

export type { RawQuestion }

export function getAllRawQuestions(): RawQuestion[] {
  return allQuestions
}

export async function loadLocalQuestions(filters?: {
  domain?: string
  service?: string
  topic?: string
  difficulty?: string
  status?: string
}): Promise<Question[]> {
  let items = getAllRawQuestions()
  if (filters?.status) items = items.filter((q) => q.status === filters.status)
  if (filters?.domain) {
    items = items.filter(
      (q) => q.domain === filters.domain || String(q.domain).startsWith(String(filters.domain)),
    )
  }
  if (filters?.difficulty) items = items.filter((q) => q.difficulty === filters.difficulty)
  if (filters?.topic) items = items.filter((q) => q.topics.includes(filters.topic!))
  if (filters?.service) items = items.filter((q) => q.services.includes(filters.service!))

  return items.map((q) => ({
    id: q.id,
    stem: q.stem,
    type: q.type as Question['type'],
    difficulty: q.difficulty as Difficulty,
    domain_id: q.domain,
    status: q.status as Question['status'],
    provenance: q.provenance,
    verification_status: q.verification_status as Question['verification_status'],
    topics: q.topics,
    services: q.services,
    options: stripAnswerKeys(q.options),
  }))
}

export function getRawById(id: string): RawQuestion | undefined {
  return getAllRawQuestions().find((q) => q.id === id)
}
