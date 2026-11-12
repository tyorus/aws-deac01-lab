#!/usr/bin/env python3
"""Compile all locally available DEA-C01 questions into one Markdown + research quiz JSON.

Outputs (never writes into content/questions/):
- aws-dea-c01/_work/compiled/all-available-questions.md
- aws-dea-c01/_work/compiled/research-questions.json
- aws-dea-c01/practice/compiled-question-bank.md  (Knowledge ingest)
"""
from __future__ import annotations

import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "docs"
ET = ROOT / "aws-dea-c01" / "_work" / "examtopics"
MS = ROOT / "aws-dea-c01" / "_work" / "multi-source"
OUT = ROOT / "aws-dea-c01" / "_work" / "compiled"
PRACTICE = ROOT / "aws-dea-c01" / "practice"

DOMAIN_KW = {
    "D1": ["glue", "kinesis", "firehose", "dms", "lambda", "etl", "ingest", "stream", "emr", "spark", "mwaa", "airflow"],
    "D2": ["s3", "redshift", "dynamodb", "rds", "aurora", "lifecycle", "partition", "spectrum", "lake formation", "opensearch"],
    "D3": ["cloudwatch", "alarm", "orchestration", "workflow", "crawler", "bookmark", "cost", "monitor"],
    "D4": ["iam", "kms", "encryption", "pii", "governance", "cloudtrail", "macie", "security", "permission"],
}


def norm(text: str) -> str:
    t = re.sub(r"[^a-z0-9]+", " ", (text or "").lower())
    return re.sub(r"\s+", " ", t).strip()


def stem_hash(text: str) -> str:
    return hashlib.sha1(norm(text).encode()).hexdigest()[:16]


def guess_domain(text: str) -> str:
    t = (text or "").lower()
    scores = {d: sum(1 for k in kws if k in t) for d, kws in DOMAIN_KW.items()}
    best = max(scores, key=scores.get)
    return best if scores[best] else "D1"


def guess_services(text: str) -> list[str]:
    t = (text or "").lower()
    services = []
    for s in [
        "glue", "s3", "redshift", "lambda", "kinesis", "athena", "lake formation",
        "dynamodb", "emr", "dms", "iam", "kms", "cloudwatch", "step functions", "mwaa",
    ]:
        if s in t:
            services.append(s.replace(" ", "-"))
    return services[:6] or ["aws"]


def clean_pdf_text(text: str) -> str:
    # Collapse duplicated side-by-side OCR lines roughly
    text = text.replace("\ufb01", "fi").replace("\ufb02", "fl")
    text = text.replace("\u0000", "")
    # Remove form-feed page numbers alone
    text = re.sub(r"\n\s*\d+\s*\n", "\n", text)
    return text


def parse_numbered_mcq(text: str, source: str) -> list[dict]:
    text = clean_pdf_text(text)
    # Normalize fancy quotes/ligatures leftovers
    text = text.replace("ﬁ", "fi").replace("ﬂ", "fl")
    items = []
    # Split on "N. " or "N) " at line starts / after newlines
    parts = re.split(r"(?:^|\n)\s*(\d{1,3})[\.\)]\s+", text)
    # parts: preamble, num, body, num, body...
    for i in range(1, len(parts), 2):
        try:
            num = int(parts[i])
        except ValueError:
            continue
        body = parts[i + 1] if i + 1 < len(parts) else ""
        body = re.split(r"(?:^|\n)\s*\d{1,3}[\.\)]\s+", body)[0]
        # Stem until first option A.
        om = re.search(r"(?:^|\n)\s*A[\.\)]\s+", body)
        if not om:
            # inline A.
            om = re.search(r"\sA[\.\)]\s+", body)
        if not om:
            continue
        stem = re.sub(r"\s+", " ", body[: om.start()]).strip()
        # Deduplicate doubled OCR in stem (same sentence twice)
        half = len(stem) // 2
        if half > 40 and stem[:half].strip() == stem[half:].strip():
            stem = stem[:half].strip()
        opt_blob = body[om.start() :]
        options = []
        for letter in "ABCDEF":
            nxt = chr(ord(letter) + 1) if letter != "F" else None
            if nxt:
                pat = rf"{letter}[\.\)]\s*(.+?)(?=\s*{nxt}[\.\)]\s*|\Z)"
            else:
                pat = rf"{letter}[\.\)]\s*(.+?)\Z"
            m = re.search(pat, opt_blob, re.S | re.I)
            if not m:
                continue
            ob = re.sub(r"\s+", " ", m.group(1)).strip()
            # Strip trailing answer keys if embedded
            ob = re.split(r"\bCorrect Answer\b|\bAnswer\s*:", ob, maxsplit=1)[0].strip()
            if len(ob) > 5:
                options.append({"letter": letter, "body": ob})
        if len(stem) < 25 or len(options) < 2:
            continue
        # Answer if present after options
        ans = ""
        am = re.search(
            r"(?:Correct Answer|Answer)\s*[:\-]?\s*([A-F](?:\s*[,&]\s*[A-F])*)",
            body,
            re.I,
        )
        if am:
            ans = re.sub(r"[^A-F]", "", am.group(1).upper())
        items.append(
            {
                "source": source,
                "source_question_number": num,
                "question_text": stem,
                "answer_options": [f"{o['letter']}. {o['body']}" for o in options],
                "source_answer": ans,
                "source_explanation": "",
                "stem_hash": stem_hash(stem),
            }
        )
    return items


def load_json(path: Path):
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def load_scraped() -> list[dict]:
    out = []
    # Prefer multi-source usable records
    allq = load_json(MS / "all-questions.json") or {}
    for r in allq.get("records") or []:
        stem = (r.get("question_text") or "").strip()
        if len(stem) < 25:
            continue
        if r.get("extraction_status") == "inaccessible":
            continue
        opts = r.get("answer_options") or []
        if len(opts) < 2 and not r.get("source_answer"):
            # certqna titles etc — skip for quiz bank; keep for md? skip thin titles
            if len(opts) < 2:
                continue
        out.append(
            {
                "source": r.get("source") or "scraped",
                "source_question_number": r.get("source_question_number"),
                "question_text": stem,
                "answer_options": opts,
                "source_answer": r.get("source_answer") or "",
                "source_explanation": r.get("source_explanation") or "",
                "stem_hash": r.get("stem_hash") or stem_hash(stem),
                "source_url": r.get("source_url") or "",
            }
        )

    # Examtopics normalized backup
    nq = load_json(ET / "normalized" / "questions.json") or []
    for r in nq:
        stem = (r.get("question_text") or "").strip()
        if len(stem) < 25:
            continue
        opts = r.get("answer_options") or []
        if len(opts) < 2:
            continue
        out.append(
            {
                "source": "examtopics_normalized",
                "source_question_number": r.get("question_number"),
                "question_text": stem,
                "answer_options": opts,
                "source_answer": r.get("examtopics_answer") or "",
                "source_explanation": r.get("examtopics_explanation") or "",
                "stem_hash": r.get("stem_hash") or stem_hash(stem),
                "source_url": r.get("source_url") or "",
            }
        )
    return out


def load_pdf_retry_items() -> list[dict]:
    """Include OCR/repaired dumps + slide scenarios used for the 392 unique-stem bank."""
    out: list[dict] = []
    retry = OUT / "pdf-retry"
    mapping = [
        ("dumps-items.json", "pdf_exam_dumps"),
        ("slide-items.json", "pdf_slide_deck"),
    ]
    for name, src in mapping:
        path = retry / name
        if not path.exists():
            continue
        for it in json.loads(path.read_text(encoding="utf-8")):
            stem = (it.get("question_text") or "").strip()
            if len(stem) < 25:
                continue
            row = dict(it)
            row["source"] = row.get("source") or src
            row["stem_hash"] = row.get("stem_hash") or stem_hash(stem)
            row["answer_options"] = row.get("answer_options") or []
            row["source_answer"] = row.get("source_answer") or ""
            row["source_explanation"] = row.get("source_explanation") or ""
            out.append(row)
    return out


def load_pdfs() -> list[dict]:
    items = []
    mapping = [
        (
            "pdf-p-classtruncatedtext-module-lineclamped-85ulhh-style-max-lines580-mock-questions-aws-certified-data-engineer-associate-p_compress.pdf",
            "pdf_80_mock",
        ),
        (
            "pdf-p-classtruncatedtext-module-lineclamped-85ulhh-style-max-lines5aws-certified-data-engineer-exam-dumps-p_compress.pdf",
            "pdf_exam_dumps",
        ),
    ]
    notes = []
    for fname, src in mapping:
        path = DOCS / fname
        if not path.exists():
            notes.append(f"missing {fname}")
            continue
        reader = PdfReader(str(path))
        text = "\n".join((p.extract_text() or "") for p in reader.pages)
        parsed = parse_numbered_mcq(text, src)
        items.extend(parsed)
        notes.append(f"{src}: pages={len(reader.pages)} parsed={len(parsed)} chars={len(text)}")

    retry_items = load_pdf_retry_items()
    items.extend(retry_items)
    notes.append(f"pdf_retry_json: {len(retry_items)}")

    slide = DOCS / "DEA-C01-complete-slide-deck.pdf"
    if slide.exists():
        reader = PdfReader(str(slide))
        sample = "".join((reader.pages[i].extract_text() or "") for i in range(min(20, len(reader.pages))))
        notes.append(
            f"slide_deck: pages={len(reader.pages)} extractable_chars_sample={len(sample)} "
            f"(OCR scenarios come from pdf-retry/slide-items.json)"
        )
    (OUT / "pdf-parse-notes.json").write_text(
        json.dumps({"notes": notes}, indent=2) + "\n", encoding="utf-8"
    )
    return items


def prefer(a: dict, b: dict) -> dict:
    def score(x: dict) -> int:
        s = 0
        if x.get("source_answer"):
            s += 3
        if len(x.get("answer_options") or []) >= 2:
            s += 2
        if x.get("source_explanation"):
            s += 2
        if x.get("source_question_number") is not None:
            s += 1
        # Prefer cleaner mock PDF / examice explanations
        if x.get("source") in ("pdf_80_mock", "examice", "examtopics"):
            s += 1
        return s

    return a if score(a) >= score(b) else b


def to_quiz(item: dict, idx: int) -> dict | None:
    """Convert any unique stem into a web quiz/study item (including no answer key)."""
    stem = (item.get("question_text") or "").strip()
    if len(stem) < 25:
        return None
    raw_opts = item.get("answer_options") or []
    options = []
    for i, o in enumerate(raw_opts):
        o = str(o).strip()
        m = re.match(r"^([A-F])[\.\)]\s*(.*)$", o, re.S)
        if m:
            letter, body = m.group(1).upper(), m.group(2).strip()
        else:
            letter, body = chr(65 + i), o
        if not body:
            continue
        # Keep option bodies usable in UI (OCR noise still better than dropping the stem)
        if len(body) > 1200:
            body = body[:1197] + "..."
        options.append(
            {
                "id": f"opt-{letter.lower()}",
                "label": letter,
                "body": body,
                "correct": False,
            }
        )
    if len(options) < 2:
        options = [
            {
                "id": "opt-a",
                "label": "A",
                "body": "Opsi tidak terekstrak lengkap dari sumber — pelajari stem / Knowledge.",
                "correct": False,
            },
            {
                "id": "opt-b",
                "label": "B",
                "body": "Lanjut ke pembahasan / dokumentasi AWS terkait layanan di stem.",
                "correct": False,
            },
        ]

    ans = re.sub(r"[^A-F]", "", (item.get("source_answer") or "").upper())
    if ans:
        for o in options:
            if o["label"] in ans:
                o["correct"] = True

    correct_n = sum(1 for o in options if o["correct"])
    has_answer_key = correct_n >= 1
    choose_m = re.search(r"\(\s*Choose\s+(two|three|four|five)\.?\s*\)", stem, re.I)
    choose_n = {"two": 2, "three": 3, "four": 4, "five": 5}.get(
        (choose_m.group(1).lower() if choose_m else ""), 0
    )
    qtype = "multi" if correct_n > 1 or choose_n > 1 else "single"
    # Incomplete Choose-N keys: keep in pool but flag as study/uncertain for grading.
    if choose_n and correct_n and correct_n != choose_n:
        has_answer_key = False

    expl = (item.get("source_explanation") or "").strip()
    if len(expl) < 80 or expl.startswith("Answer key from local source"):
        # Build a real study explanation from stem/options/key (not a one-line stub).
        from enrich_pembahasan import generate_pembahasan

        expl = generate_pembahasan(
            {
                "stem": stem,
                "options": options,
            }
        )

    return {
        "id": f"LOC-{idx:03d}",
        "domain": guess_domain(stem),
        "topics": ["local-compiled-bank"],
        "services": guess_services(stem),
        "difficulty": "medium",
        "type": qtype,
        "stem": stem,
        "options": options,
        "explanation": expl[:4000],
        "provenance": f"local-compile:{item.get('source')}",
        "verification_status": "community" if has_answer_key else "uncertain",
        "status": "published",
        "has_answer_key": has_answer_key,
        "reviewed_at": datetime.now(timezone.utc).date().isoformat(),
        "source_meta": {
            "source": item.get("source"),
            "source_question_number": item.get("source_question_number"),
            "source_url": item.get("source_url") or "",
            "stem_hash": item.get("stem_hash"),
        },
    }


def to_markdown(items: list[dict], quiz: list[dict]) -> str:
    keyed = sum(1 for q in quiz if q.get("has_answer_key"))
    study = len(quiz) - keyed
    lines = [
        "# DEA-C01 Compiled Local Question Bank",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "Third-party / scraped / PDF-extracted study material. Not official AWS exam content.",
        "Original lab items remain under content/questions (DEA-001...).",
        "",
        f"- Unique stems compiled: **{len(items)}**",
        f"- Web items (all stems): **{len(quiz)}**",
        f"- With answer key: **{keyed}**",
        f"- Study-only (no reliable key): **{study}**",
        "",
        "---",
        "",
    ]
    quiz_by_hash = {q["source_meta"]["stem_hash"]: q for q in quiz}
    for i, it in enumerate(items, 1):
        q = quiz_by_hash.get(it["stem_hash"])
        lines.append(f"## Q{i}. [{it.get('source')}]" + (
            f" #{it['source_question_number']}" if it.get("source_question_number") is not None else ""
        ))
        if q:
            lines.append(f"*App id: `{q['id']}`*")
        lines.append("")
        lines.append(it["question_text"])
        lines.append("")
        for o in it.get("answer_options") or []:
            lines.append(f"- {o}")
        lines.append("")
        if it.get("source_answer"):
            lines.append(f"**Answer:** {it['source_answer']}")
            lines.append("")
        if it.get("source_explanation"):
            lines.append("**Explanation:**")
            lines.append("")
            lines.append(it["source_explanation"])
            lines.append("")
        if it.get("source_url"):
            lines.append(f"Source URL: {it['source_url']}")
            lines.append("")
        lines.append("---")
        lines.append("")
    return "\n".join(lines)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    PRACTICE.mkdir(parents=True, exist_ok=True)

    scraped = load_scraped()
    pdfs = load_pdfs()
    pool = scraped + pdfs

    by_hash: dict[str, dict] = {}
    for it in pool:
        h = it["stem_hash"]
        if h not in by_hash:
            by_hash[h] = it
        else:
            by_hash[h] = prefer(by_hash[h], it)

    items = sorted(
        by_hash.values(),
        key=lambda x: (
            x.get("source_question_number") is None,
            x.get("source_question_number") or 9999,
            x["question_text"][:40],
        ),
    )

    # Preserve existing LOC ids by stem_hash when recompiling into practice bank.
    existing_path = PRACTICE / "research-questions.json"
    existing_by_hash: dict[str, str] = {}
    if existing_path.exists():
        prev = json.loads(existing_path.read_text(encoding="utf-8"))
        prev_list = prev if isinstance(prev, list) else prev.get("questions") or []
        for pq in prev_list:
            h = (pq.get("source_meta") or {}).get("stem_hash")
            if h and pq.get("id"):
                existing_by_hash[h] = pq["id"]

    quiz = []
    used_ids: set[str] = set()
    next_idx = 1

    max_existing = 0
    for pid in existing_by_hash.values():
        m = re.match(r"LOC-(\d+)$", pid)
        if m:
            max_existing = max(max_existing, int(m.group(1)))
    next_idx = max(max_existing + 1, 1)

    def alloc_id(stem_h: str | None) -> str:
        nonlocal next_idx
        if stem_h and stem_h in existing_by_hash:
            cand = existing_by_hash[stem_h]
            if cand not in used_ids:
                used_ids.add(cand)
                return cand
        while True:
            cand = f"LOC-{next_idx:03d}"
            next_idx += 1
            if cand not in used_ids:
                used_ids.add(cand)
                return cand

    for it in items:
        q = to_quiz(it, 0)
        if not q:
            continue
        q["id"] = alloc_id(it.get("stem_hash") or "")
        quiz.append(q)

    # Stable order by LOC number for the web bank
    quiz.sort(key=lambda q: int(re.search(r"\d+", q["id"]).group()))

    md = to_markdown(items, quiz)
    md_path = OUT / "all-available-questions.md"
    practice_path = PRACTICE / "compiled-question-bank.md"
    md_path.write_text(md, encoding="utf-8")
    practice_path.write_text(md, encoding="utf-8")

    quiz_path = OUT / "research-questions.json"
    quiz_doc = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(quiz),
        "with_answer_key": sum(1 for q in quiz if q.get("has_answer_key")),
        "study_only": sum(1 for q in quiz if not q.get("has_answer_key")),
        "note": "All unique compiled stems for web drill/study. Not official AWS content.",
        "questions": quiz,
    }
    quiz_path.write_text(
        json.dumps(quiz_doc, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    # Committed source of truth for the app
    existing_path.write_text(
        json.dumps(quiz, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    summary = {
        "unique_stems": len(items),
        "web_items": len(quiz),
        "quiz_ready": sum(1 for q in quiz if q.get("has_answer_key")),
        "study_only": sum(1 for q in quiz if not q.get("has_answer_key")),
        "scraped_in": len(scraped),
        "pdf_in": len(pdfs),
        "markdown": str(md_path),
        "practice_markdown": str(practice_path),
        "research_json": str(quiz_path),
        "practice_research_json": str(existing_path),
        "by_source": {},
    }
    for it in items:
        summary["by_source"][it["source"]] = summary["by_source"].get(it["source"], 0) + 1
    (OUT / "compile-summary.json").write_text(
        json.dumps(summary, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
