from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def write_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def build_extraction_report(
    *,
    out: Path,
    sources_doc: dict,
    examtopics: list[dict],
    examice_preview: list[dict],
    examice_inaccessible: list[dict],
    all_questions: list[dict],
    match_result: dict,
    examice_meta: dict,
) -> str:
    et_complete = [
        r
        for r in examtopics
        if r.get("extraction_status") in ("complete", "cached_unnumbered", "partial")
        and (r.get("question_text") or "")
    ]
    et_with_answer = [
        r
        for r in et_complete
        if r.get("source_answer") and len(r.get("answer_options") or []) >= 2
    ]
    et_numbered = [r for r in examtopics if r.get("source_question_number") is not None]
    ei_preview = examice_preview
    ei_locked = examice_inaccessible

    stats = match_result["stats"]
    inaccessible_pages = []
    for s in sources_doc.get("sources") or []:
        probe = s.get("probe") or {}
        if s.get("status") in ("login_required", "probe_error", "http_error") or (
            s.get("access_model") in ("paid_after_preview", "mixed_public_and_paid")
        ):
            inaccessible_pages.append(
                {
                    "name": s.get("name"),
                    "url": s.get("url"),
                    "status": s.get("status"),
                    "access_model": s.get("access_model"),
                    "probe": {
                        k: probe.get(k)
                        for k in ("status_code", "login_markers", "error")
                        if k in probe
                    },
                }
            )

    shared = stats["shared_canonicals_exact_or_unified"]
    fuzzy_pairs = stats["fuzzy_examtopics_examice_pairs"]

    md = f"""# Extraction Report — Multi-Source DEA-C01 Recon

Generated: {datetime.now(timezone.utc).isoformat()}

## Definition-of-done answers

### 1. How many actual questions were found on ExamTopics?

- Source records loaded (ExamTopics + GitHub ExamTopics cache family): **{len(examtopics)}**
- With stem + options + answer: **{len(et_with_answer)}**
- With any usable stem: **{len(et_complete)}**
- Numbered source records: **{len(et_numbered)}**

These come from prior accessible harvest (public discussions, free preview, GitHub `examtopics-data` cache). ExamTopics exam-view pages beyond free preview remain contributor-locked.

### 2. How many actual questions were found on Examice?

- Free preview extracted: **{len(ei_preview)}** (expected Q1–5)
- Claimed bank size: **{examice_meta.get('claimed_count')}**
- Locked beyond preview (stubs only, not fabricated): **{len(ei_locked)}**
- Locked marker on page: **{examice_meta.get('locked')}** (locked_count={examice_meta.get('locked_count')})

### 3. How many questions are shared between both?

- Shared canonical IDs (exact/unified stem hash): **{shared}**
- Additional ExamTopics↔Examice fuzzy pairs (≥85): **{fuzzy_pairs}**

See `cross-source-matches.json`.

### 4. How many unique questions exist across all sources?

- Unique canonical IDs among usable stems: **{stats['unique_canonical_ids']}**
- Usable source records: **{stats['usable_records']}**
- Total rows in `all-questions.json` (includes inaccessible stubs): **{len(all_questions)}**
- Unique-to-one-family count: **{stats['unique_to_one_family']}** (`unique-questions.json`)

### 5. Which additional sources contain matching questions?

Catalogued in `sources.json`. Side probes:

- CertQnA / CloudPass landing pages probed (see `raw/other/`).
- GitHub HTML search hits saved under `raw/github/search-hits.json`.
- AWS Skill Builder official set noted as login-gated official samples (authenticity bucket D) — not scraped here.

### 6. What evidence suggests the sources share a common dataset?

- Both claim **366** DEA-C01 items.
- Examice free Q1–5 text/answers align with ExamTopics free-preview Q1–5 (same scenarios).
- Matching metrics above; details in `source-comparison.md`.
- **Not** evidence that items are official AWS exam questions.

### 7. Which questions have conflicting answers?

- Conflict groups: **{stats['conflict_count']}** → `conflicting-answers.json`

### 8. Which source pages remain inaccessible?

- Examice Q6–366: `paid_preview_cap`
- ExamTopics exam view beyond free/public discussion access: contributor/login
- Skill Builder official set: login
- Other banks: see probe statuses below

| Source | Status | Access model |
|--------|--------|--------------|
"""
    for s in sources_doc.get("sources") or []:
        md += f"| {s.get('name')} | {s.get('status')} | {s.get('access_model')} |\n"

    md += f"""

## Artifact paths

- `{out / 'sources.json'}`
- `{out / 'examtopics.json'}`
- `{out / 'examice.json'}`
- `{out / 'all-questions.json'}`
- `{out / 'cross-source-matches.json'}`
- `{out / 'unique-questions.json'}`
- `{out / 'conflicting-answers.json'}`
- `{out / 'extraction-report.md'}`
- `{out / 'source-comparison.md'}`

## Honesty bar

This run does **not** claim a complete 366/366 extraction from ExamTopics or Examice. Counts above reflect **accessible** actual questions only.
"""
    (out / "extraction-report.md").write_text(md, encoding="utf-8")
    return md


def build_source_comparison(
    *,
    out: Path,
    match_result: dict,
    examice_preview: list[dict],
    examtopics: list[dict],
) -> str:
    # Compare Examice Q1-5 to ExamTopics numbered / hash matches
    lines = [
        "# Source Comparison — ExamTopics vs Examice (and family)",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "## Summary metrics",
        "",
        f"- Exact stem-hash groups: **{match_result['exact_groups']}**",
        f"- High-similarity pairs (≥95): **{len(match_result['high_similarity'])}**",
        f"- Likely-similarity pairs (85–95): **{len(match_result['likely_similarity'])}**",
        f"- Shared canonicals (ET family ∩ Examice): **{match_result['stats']['shared_canonicals_exact_or_unified']}**",
        f"- Answer conflict groups: **{match_result['stats']['conflict_count']}**",
        "",
        "## Ordering and fingerprint notes",
        "",
        "- Both sites advertise a **366**-question DEA-C01 bank.",
        "- Examice free preview exposes **Q1–5** in the same topical order observed on ExamTopics free preview (Glue VPC endpoint, Lake Formation RLS, Data Exchange, data mesh multi-select, Lambda layers).",
        "- Explanations: Examice free preview includes narrative explanations; ExamTopics discussion/preview harvest often has answer letters with little or no explanation field in our parsers.",
        "- Option ordering: compare `option_letter_sequences` inside `cross-source-matches.json` for exact groups.",
        "- Common-dataset evidence is **circumstantial** (shared count, overlapping early items, similar wording). It does **not** prove AWS-official origin.",
        "",
        "## Examice preview vs ExamTopics family (per question)",
        "",
    ]

    et_by_hash = {r["stem_hash"]: r for r in examtopics if r.get("stem_hash")}
    et_by_num = {
        r["source_question_number"]: r
        for r in examtopics
        if r.get("source_question_number") is not None
        and r.get("source") in ("examtopics", "github_examtopics_cache")
    }

    for ei in examice_preview:
        qn = ei.get("source_question_number")
        h = ei.get("stem_hash")
        et = et_by_hash.get(h) or et_by_num.get(qn)
        if et:
            from match import similarity, _norm_answer

            sim = similarity(ei.get("question_text") or "", et.get("question_text") or "")
            same_ans = _norm_answer(ei.get("source_answer") or "") == _norm_answer(
                et.get("source_answer") or ""
            )
            lines.append(
                f"### Examice Q{qn}"
            )
            lines.append(
                f"- Match: ExamTopics-family record `{et.get('record_id')}` "
                f"(source={et.get('source')}, num={et.get('source_question_number')})"
            )
            lines.append(f"- Similarity: **{sim:.1f}**")
            lines.append(
                f"- Answers: Examice `{ei.get('source_answer')}` vs ET `{et.get('source_answer')}` "
                f"({'same' if same_ans else 'CONFLICT'})"
            )
            lines.append(
                f"- Examice has explanation: {'yes' if ei.get('source_explanation') else 'no'}; "
                f"ET explanation: {'yes' if et.get('source_explanation') else 'no/empty'}"
            )
            lines.append("")
        else:
            lines.append(f"### Examice Q{qn}")
            lines.append("- No ExamTopics-family match found in loaded corpus.")
            lines.append("")

    lines.extend(
        [
            "## Authenticity buckets used",
            "",
            "- A: Found on ExamTopics (including GitHub ExamTopics cache provenance)",
            "- B: Found on Examice",
            "- C: Applied when a canonical appears on multiple independent sources after matching",
            "- D: Reserved for public AWS sample materials (Skill Builder) — not extracted in this run",
            "- E: Origin unknown",
            "",
            "Records that match across ExamTopics-family and Examice should be interpreted as bucket **C** evidence in analysis even if individual rows retain A/B labels.",
            "",
        ]
    )

    md = "\n".join(lines)
    (out / "source-comparison.md").write_text(md, encoding="utf-8")
    return md
