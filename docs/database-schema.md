# Database schema

See `supabase/migrations/20261111000000_init.sql`.

## Security highlights

- `question_answer_keys` has RLS enabled and **no** client policies (deny-all for anon/authenticated).
- User tables (`quiz_sessions`, `question_attempts`, `bookmarks`, `flashcards`, `review_schedules`, `exam_results`) are constrained to `auth.uid() = user_id`.
- Published questions/options are readable by authenticated users without correct flags.
- Edge Functions use the service role only inside Supabase Functions runtime.
