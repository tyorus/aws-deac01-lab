<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getKnowledgeDoc, listKnowledgeDocs, searchKnowledge } from '@/services/knowledgeBase'
import { getAllRawQuestions } from '@/services/localQuestions'

const route = useRoute()
const router = useRouter()
const query = ref('')
const docs = listKnowledgeDocs()

const selectedPath = computed(() => {
  const p = route.params.path
  if (typeof p === 'string' && p) return p.endsWith('.md') ? p : `${p}.md`
  return 'README.md'
})

const filtered = computed(() => searchKnowledge(query.value))
const doc = computed(() => getKnowledgeDoc(selectedPath.value))

const related = computed(() => {
  if (!doc.value) return []
  const hay = `${doc.value.title} ${doc.value.path}`.toLowerCase()
  return getAllRawQuestions()
    .filter((q) => q.status === 'published')
    .filter((q) => q.services.some((s) => hay.includes(s)) || q.topics.some((t) => hay.includes(t)))
    .slice(0, 5)
})

watch(
  () => route.params.path,
  () => {
    /* reactive via computed */
  },
)

function open(path: string) {
  router.push({ name: 'knowledge-doc', params: { path: path.replace(/\.md$/, '') } })
}
</script>

<template>
  <div class="grid lg:grid-cols-[240px_1fr] gap-6">
    <aside class="space-y-3">
      <input
        v-model="query"
        type="search"
        placeholder="Search knowledge…"
        class="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-sm"
      />
      <nav class="space-y-4 text-sm max-h-[70vh] overflow-auto pr-1">
        <div v-for="cat in ['root', 'domain', 'service', 'practice']" :key="cat">
          <div class="text-xs uppercase tracking-wide text-[var(--color-ink-muted)] mb-1">{{ cat }}</div>
          <ul class="space-y-1">
            <li v-for="d in filtered.filter((x) => x.category === cat)" :key="d.path">
              <button
                type="button"
                class="text-left w-full rounded px-2 py-1 hover:bg-[var(--color-accent)]/10"
                :class="selectedPath === d.path ? 'text-[var(--color-accent)] font-medium' : 'text-[var(--color-ink-muted)]'"
                @click="open(d.path)"
              >
                {{ d.title }}
              </button>
            </li>
          </ul>
        </div>
        <p class="text-xs text-[var(--color-ink-muted)]">{{ docs.length }} documents</p>
      </nav>
    </aside>

    <div class="space-y-4">
      <article
        v-if="doc"
        class="prose-kb rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-5"
        v-html="doc.html"
      />
      <article v-else class="rounded-xl border border-[var(--color-border)] p-5 text-sm text-[var(--color-ink-muted)]">
        Document not found.
      </article>

      <section v-if="related.length" class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <h2 class="font-medium mb-2">Related practice questions</h2>
        <ul class="text-sm space-y-2">
          <li v-for="q in related" :key="q.id" class="text-[var(--color-ink-muted)]">
            <span class="font-mono text-xs text-[var(--color-accent)] mr-2">{{ q.id }}</span>
            {{ q.stem.slice(0, 120) }}…
          </li>
        </ul>
        <RouterLink to="/drill" class="inline-block mt-3 text-sm text-[var(--color-accent)]">Practice in drill</RouterLink>
      </section>
    </div>
  </div>
</template>
