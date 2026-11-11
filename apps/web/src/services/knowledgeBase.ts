import { marked } from 'marked'
import { knowledgeFiles } from '@/generated/index'

export interface KbDoc {
  path: string
  title: string
  category: 'root' | 'domain' | 'service' | 'practice' | 'other'
  html: string
  text: string
}

function titleFrom(path: string, body: string): string {
  const heading = body.match(/^#\s+(.+)$/m)
  if (heading) return heading[1].trim()
  return path.replace(/\.md$/, '').split('/').pop()!.replace(/-/g, ' ')
}

function categoryOf(path: string): KbDoc['category'] {
  if (path.startsWith('domains/')) return 'domain'
  if (path.startsWith('aws-services/')) return 'service'
  if (path.startsWith('practice/')) return 'practice'
  if (!path.includes('/')) return 'root'
  return 'other'
}

let cache: KbDoc[] | null = null

export function listKnowledgeDocs(): KbDoc[] {
  if (cache) return cache
  cache = Object.entries(knowledgeFiles)
    .filter(([path]) => !path.startsWith('_work/') && !path.startsWith('content/'))
    .map(([path, body]) => ({
      path,
      title: titleFrom(path, body),
      category: categoryOf(path),
      html: marked.parse(body, { async: false }) as string,
      text: body,
    }))
  return cache
}

export function getKnowledgeDoc(path: string): KbDoc | undefined {
  return listKnowledgeDocs().find((d) => d.path === path || d.path === `${path}.md`)
}

export function searchKnowledge(query: string): KbDoc[] {
  const q = query.trim().toLowerCase()
  if (!q) return listKnowledgeDocs()
  return listKnowledgeDocs().filter(
    (d) => d.title.toLowerCase().includes(q) || d.text.toLowerCase().includes(q),
  )
}
