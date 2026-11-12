import { marked } from 'marked'

marked.setOptions({
  gfm: true,
  breaks: true,
})

/** Render quiz/knowledge markdown snippets to HTML (sync). */
export function renderMarkdown(source: string | null | undefined): string {
  const text = (source || '').trim()
  if (!text) return ''
  return marked.parse(text, { async: false }) as string
}
