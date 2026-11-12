import type { Difficulty, Question, QuestionType } from '@/types'
import { stripAnswerKeys } from '@/services/localGrader'
import { allQuestions, type RawQuestion } from '@/generated/index'

export type { RawQuestion }

export interface QuestionFilters {
  domain?: string
  service?: string
  topic?: string
  difficulty?: string
  type?: QuestionType | ''
  status?: string
}

export function getAllRawQuestions(): RawQuestion[] {
  return allQuestions
}

export function filterRawQuestions(filters?: QuestionFilters): RawQuestion[] {
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
  if (filters?.type) items = items.filter((q) => q.type === filters.type)
  return items
}

export async function loadLocalQuestions(filters?: QuestionFilters): Promise<Question[]> {
  return filterRawQuestions(filters).map((q) => ({
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

export function getDrillCatalog(status = 'published') {
  const published = filterRawQuestions({ status })
  const domainCounts: Record<string, number> = {}
  const serviceCounts: Record<string, number> = {}
  const difficultyCounts: Record<string, number> = {}
  const typeCounts: Record<string, number> = {}

  for (const q of published) {
    domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1
    difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1
    typeCounts[q.type] = (typeCounts[q.type] || 0) + 1
    for (const s of q.services || []) {
      serviceCounts[s] = (serviceCounts[s] || 0) + 1
    }
  }

  return {
    total: published.length,
    domainCounts,
    serviceCounts,
    difficultyCounts,
    typeCounts,
    services: Object.entries(serviceCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([slug, count]) => ({ slug, count })),
  }
}
