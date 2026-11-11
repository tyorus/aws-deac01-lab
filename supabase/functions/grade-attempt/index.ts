import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return json({ error: 'Missing Authorization' }, 401)
    }

    const body = await req.json()
    const questionId = String(body.question_id || '')
    const selectedIds: string[] = Array.isArray(body.selected_ids) ? body.selected_ids.map(String) : []
    const sessionId = body.session_id ? String(body.session_id) : null
    const confidence = body.confidence == null ? null : Number(body.confidence)
    const latencyMs = body.latency_ms == null ? null : Number(body.latency_ms)

    if (!questionId) return json({ error: 'question_id required' }, 400)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const userClient = createClient(supabaseUrl, anon, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: userData, error: userErr } = await userClient.auth.getUser()
    if (userErr || !userData.user) return json({ error: 'Unauthorized' }, 401)

    const admin = createClient(supabaseUrl, service)
    const { data: key, error: keyErr } = await admin
      .from('question_answer_keys')
      .select('correct_option_ids, explanation')
      .eq('question_id', questionId)
      .maybeSingle()

    if (keyErr || !key) return json({ error: 'Answer key unavailable' }, 404)

    const selected = [...selectedIds].sort()
    const expected = [...(key.correct_option_ids as string[])].sort()
    const correct =
      selected.length === expected.length && selected.every((id, i) => id === expected[i])

    await admin.from('question_attempts').insert({
      user_id: userData.user.id,
      session_id: sessionId,
      question_id: questionId,
      selected_ids: selectedIds,
      is_correct: correct,
      confidence,
      latency_ms: latencyMs,
    })

    // Lightweight SM-2 update
    const quality = confidence == null ? (correct ? 4 : 2) : Math.max(0, Math.min(5, Math.round(confidence)))
    const { data: existing } = await admin
      .from('review_schedules')
      .select('*')
      .eq('user_id', userData.user.id)
      .eq('question_id', questionId)
      .maybeSingle()

    let ease = Number(existing?.ease_factor ?? 2.5)
    let interval = Number(existing?.interval_days ?? 0)
    let reps = Number(existing?.repetitions ?? 0)
    if (quality < 3) {
      reps = 0
      interval = 1
    } else {
      if (reps === 0) interval = 1
      else if (reps === 1) interval = 6
      else interval = Math.round(interval * ease)
      reps += 1
    }
    ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
    const dueAt = new Date(Date.now() + interval * 86_400_000).toISOString()

    await admin.from('review_schedules').upsert({
      user_id: userData.user.id,
      question_id: questionId,
      ease_factor: ease,
      interval_days: interval,
      repetitions: reps,
      due_at: dueAt,
      last_confidence: confidence,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,question_id' })

    return json({
      correct,
      correct_option_ids: key.correct_option_ids,
      explanation: key.explanation,
      selected_ids: selectedIds,
    })
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500)
  }
})

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}
