import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return json({ error: 'Missing Authorization' }, 401)

    const body = await req.json()
    const sessionId = String(body.session_id || '')
    const answers = (body.answers || {}) as Record<string, string[]>
    if (!sessionId) return json({ error: 'session_id required' }, 400)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const userClient = createClient(supabaseUrl, anon, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: userData, error: userErr } = await userClient.auth.getUser()
    if (userErr || !userData.user) return json({ error: 'Unauthorized' }, 401)

    const admin = createClient(supabaseUrl, service)
    const { data: session, error: sessErr } = await admin
      .from('quiz_sessions')
      .select('*')
      .eq('id', sessionId)
      .eq('user_id', userData.user.id)
      .maybeSingle()

    if (sessErr || !session) return json({ error: 'Session not found' }, 404)

    const questionIds: string[] = session.question_ids || []
    const { data: keys } = await admin
      .from('question_answer_keys')
      .select('question_id, correct_option_ids, explanation')
      .in('question_id', questionIds)

    const { data: questions } = await admin
      .from('questions')
      .select('id, domain_id, stem')
      .in('id', questionIds)

    const keyMap = new Map((keys || []).map((k) => [k.question_id, k]))
    const domainMap = new Map<string, { correct: number; total: number }>()
    let correctCount = 0

    for (const qid of questionIds) {
      const key = keyMap.get(qid)
      const selected = [...(answers[qid] || [])].sort()
      const expected = [...((key?.correct_option_ids as string[]) || [])].sort()
      const ok =
        !!key &&
        selected.length === expected.length &&
        selected.every((id, i) => id === expected[i])
      if (ok) correctCount += 1

      const domain = questions?.find((q) => q.id === qid)?.domain_id || 'unknown'
      const row = domainMap.get(domain) || { correct: 0, total: 0 }
      row.total += 1
      if (ok) row.correct += 1
      domainMap.set(domain, row)

      await admin.from('question_attempts').insert({
        user_id: userData.user.id,
        session_id: sessionId,
        question_id: qid,
        selected_ids: answers[qid] || [],
        is_correct: ok,
      })
    }

    const started = new Date(session.started_at).getTime()
    const ended = Date.now()
    const total = questionIds.length || 1
    const scorePct = Math.round((correctCount / total) * 1000) / 10
    const domain_breakdown = [...domainMap.entries()].map(([domain, v]) => ({
      domain,
      correct: v.correct,
      total: v.total,
      accuracy: v.total ? Math.round((v.correct / v.total) * 1000) / 10 : 0,
    }))

    const { data: result, error: resErr } = await admin
      .from('exam_results')
      .insert({
        user_id: userData.user.id,
        session_id: sessionId,
        score_pct: scorePct,
        correct_count: correctCount,
        total_count: questionIds.length,
        duration_seconds: Math.max(0, Math.round((ended - started) / 1000)),
        domain_breakdown,
      })
      .select('*')
      .single()

    if (resErr) return json({ error: resErr.message }, 500)

    await admin
      .from('quiz_sessions')
      .update({
        status: 'submitted',
        answers,
        submitted_at: new Date().toISOString(),
      })
      .eq('id', sessionId)

    return json({
      result,
      review: questionIds.map((qid) => ({
        question_id: qid,
        selected_ids: answers[qid] || [],
        correct_option_ids: keyMap.get(qid)?.correct_option_ids || [],
        explanation: keyMap.get(qid)?.explanation || '',
        correct: (() => {
          const selected = [...(answers[qid] || [])].sort()
          const expected = [...((keyMap.get(qid)?.correct_option_ids as string[]) || [])].sort()
          return (
            selected.length === expected.length &&
            selected.every((id, i) => id === expected[i])
          )
        })(),
      })),
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
