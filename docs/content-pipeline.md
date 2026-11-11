# Content pipeline

## Rules

- Knowledge base Markdown is the only narrative source of truth.
- Practice items for the app must be original JSON under `aws-dea-c01/content/questions/`.
- Third-party banks inform concepts only — never paste substantial verbatim collections.

## Promote a question

1. Draft concept in domain/service Markdown if needed.
2. Author JSON matching `content/schemas/question.schema.json`.
3. Set `status` to `reviewed` then `published`.
4. Run `npm run validate:questions`.
5. Rebuild seed SQL and apply to Supabase when ready.
