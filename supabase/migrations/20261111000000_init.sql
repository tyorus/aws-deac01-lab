-- DEA-C01 Lab initial schema + RLS
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exam_domains (
  id text primary key,
  code text not null unique,
  name text not null,
  weight_pct numeric not null,
  sort_order int not null default 0
);

create table if not exists public.topics (
  id text primary key,
  domain_id text not null references public.exam_domains (id) on delete cascade,
  slug text not null,
  name text not null,
  unique (domain_id, slug)
);

create table if not exists public.aws_services (
  id text primary key,
  slug text not null unique,
  name text not null,
  category text not null
);

create table if not exists public.questions (
  id text primary key,
  stem text not null,
  type text not null check (type in ('single', 'multi')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  domain_id text not null references public.exam_domains (id),
  status text not null check (status in ('draft', 'reviewed', 'published')),
  provenance text not null default 'original',
  verification_status text not null default 'original',
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_options (
  id text primary key,
  question_id text not null references public.questions (id) on delete cascade,
  label text not null,
  body text not null,
  sort_order int not null default 0
);

-- Deny-all to clients via RLS; Edge Functions use service role
create table if not exists public.question_answer_keys (
  question_id text primary key references public.questions (id) on delete cascade,
  correct_option_ids text[] not null,
  explanation text not null
);

create table if not exists public.question_tags (
  question_id text not null references public.questions (id) on delete cascade,
  tag text not null,
  primary key (question_id, tag)
);

create table if not exists public.question_services (
  question_id text not null references public.questions (id) on delete cascade,
  service_id text not null references public.aws_services (id) on delete cascade,
  primary key (question_id, service_id)
);

create table if not exists public.quiz_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  mode text not null check (mode in ('drill', 'exam')),
  status text not null check (status in ('active', 'submitted', 'abandoned')),
  config jsonb not null default '{}'::jsonb,
  question_ids text[] not null default '{}',
  answers jsonb not null default '{}'::jsonb,
  marked_review text[] not null default '{}',
  current_index int not null default 0,
  started_at timestamptz not null default now(),
  ends_at timestamptz,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id uuid references public.quiz_sessions (id) on delete set null,
  question_id text not null references public.questions (id) on delete cascade,
  selected_ids text[] not null default '{}',
  is_correct boolean not null,
  confidence int check (confidence between 1 and 5),
  latency_ms int,
  created_at timestamptz not null default now()
);

create table if not exists public.bookmarks (
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id text not null references public.questions (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, question_id)
);

create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id text references public.questions (id) on delete cascade,
  front text not null,
  back text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.review_schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  question_id text not null references public.questions (id) on delete cascade,
  ease_factor numeric not null default 2.5,
  interval_days int not null default 0,
  repetitions int not null default 0,
  due_at timestamptz not null default now(),
  last_confidence int,
  updated_at timestamptz not null default now(),
  unique (user_id, question_id)
);

create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id uuid references public.quiz_sessions (id) on delete set null,
  score_pct numeric not null,
  correct_count int not null,
  total_count int not null,
  duration_seconds int not null default 0,
  domain_breakdown jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_questions_status on public.questions (status);
create index if not exists idx_question_options_qid on public.question_options (question_id);
create index if not exists idx_attempts_user on public.question_attempts (user_id, created_at desc);
create index if not exists idx_sessions_user on public.quiz_sessions (user_id, status);
create index if not exists idx_review_due on public.review_schedules (user_id, due_at);
create index if not exists idx_exam_results_user on public.exam_results (user_id, created_at desc);

-- Profile auto-create
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Seed domains
insert into public.exam_domains (id, code, name, weight_pct, sort_order) values
  ('D1', 'D1', 'Data Ingestion and Transformation', 34, 1),
  ('D2', 'D2', 'Data Store Management', 26, 2),
  ('D3', 'D3', 'Data Operations and Support', 22, 3),
  ('D4', 'D4', 'Data Security and Governance', 18, 4)
on conflict (id) do update set name = excluded.name, weight_pct = excluded.weight_pct;

-- RLS
alter table public.profiles enable row level security;
alter table public.exam_domains enable row level security;
alter table public.topics enable row level security;
alter table public.aws_services enable row level security;
alter table public.questions enable row level security;
alter table public.question_options enable row level security;
alter table public.question_answer_keys enable row level security;
alter table public.question_tags enable row level security;
alter table public.question_services enable row level security;
alter table public.quiz_sessions enable row level security;
alter table public.question_attempts enable row level security;
alter table public.bookmarks enable row level security;
alter table public.flashcards enable row level security;
alter table public.review_schedules enable row level security;
alter table public.exam_results enable row level security;

-- Reference data readable by authenticated users
create policy profiles_select_own on public.profiles for select using (auth.uid() = id);
create policy profiles_update_own on public.profiles for update using (auth.uid() = id);

create policy domains_read on public.exam_domains for select to authenticated using (true);
create policy topics_read on public.topics for select to authenticated using (true);
create policy services_read on public.aws_services for select to authenticated using (true);

create policy questions_read_published on public.questions
  for select to authenticated using (status = 'published');

create policy options_read on public.question_options
  for select to authenticated
  using (exists (
    select 1 from public.questions q
    where q.id = question_id and q.status = 'published'
  ));

create policy tags_read on public.question_tags
  for select to authenticated
  using (exists (
    select 1 from public.questions q where q.id = question_id and q.status = 'published'
  ));

create policy qservices_read on public.question_services
  for select to authenticated
  using (exists (
    select 1 from public.questions q where q.id = question_id and q.status = 'published'
  ));

-- Intentionally NO select/insert/update/delete policies on question_answer_keys for authenticated/anon

create policy sessions_own on public.quiz_sessions
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy attempts_own on public.question_attempts
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy bookmarks_own on public.bookmarks
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy flashcards_own on public.flashcards
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy review_own on public.review_schedules
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy exam_results_own on public.exam_results
  for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
