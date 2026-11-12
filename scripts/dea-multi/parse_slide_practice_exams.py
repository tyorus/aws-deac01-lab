#!/usr/bin/env python3
"""Parse already-OCR'd practice exam pages into bank items (no OCR)."""
from __future__ import annotations

import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))

from compile_local_bank import stem_hash, to_quiz  # noqa: E402

RETRY = ROOT / "aws-dea-c01" / "_work" / "compiled" / "pdf-retry"
CKPT = RETRY / "slide-ocr.jsonl"
OUT_JSON = RETRY / "slide-practice-exams.json"
PRACTICE = ROOT / "aws-dea-c01" / "practice"
START_PAGE = 910

WRONG_CUES = re.compile(
    r"\b(does nothing|invented|guessing|halves|wastes|wrong|not the|never |"
    r"already done|nothing is timing|says nothing|unimproved|still throttles|"
    r"cost rises|always behind|barely moves|may rise|continuous charge)\b",
    re.I,
)
RIGHT_CUES = re.compile(
    r"\b(fixes|fix the|gives the|spreads|removes the exchange|lets zone maps|"
    r"memory buys CPU|proportionally sooner|that is what|delivers the|"
    r"row-level|atomic|independent consumer|hot partition|KEY case|"
    r"Intelligent-Tiering signal|stated requirement)\b",
    re.I,
)


def load_pages() -> dict[int, str]:
    by: dict[int, str] = {}
    for line in CKPT.open(encoding="utf-8"):
        if not line.strip():
            continue
        row = json.loads(line)
        by[int(row["page"])] = row.get("text") or ""
    return by


def clean(t: str) -> str:
    t = t.replace("ﬁ", "fi").replace("ﬂ", "fl")
    t = re.sub(r"QUESTI0N", "QUESTION", t, flags=re.I)
    t = re.sub(r"D0MAIN", "DOMAIN", t, flags=re.I)
    t = re.sub(r"W0RKED", "WORKED", t, flags=re.I)
    # OCR often glues number into OF: "QUESTION 30F 20" / "60F 20"
    t = re.sub(r"(QUESTION\s*\d)\s*0F\s*20", r"\1 OF 20", t, flags=re.I)
    t = re.sub(r"(QUESTION\s*\d{1,2})\s*0F\s*20", r"\1 OF 20", t, flags=re.I)
    t = re.sub(r"(?<=\d)0F\s*20", " OF 20", t, flags=re.I)
    t = re.sub(r"0F\s*20", "OF 20", t, flags=re.I)
    return t


def page_kind(text: str) -> str:
    t = clean(text)
    if re.search(r"QUESTION\s*\d+\s*[·\-]?\s*WORKED", t, re.I):
        return "worked"
    if re.search(r"QUESTION\s*\d+\s*OF\s*20", t, re.I):
        return "question"
    return "other"


def parse_qnum(text: str) -> int | None:
    t = clean(text)
    m = re.search(r"QUESTION\s*(\d+)\s*(?:OF\s*20|[·\-]\s*WORKED)", t, re.I)
    if m:
        return int(m.group(1))
    m = re.search(r"QUESTION\s*(\d+)", t, re.I)
    return int(m.group(1)) if m else None


def parse_domain(text: str) -> str | None:
    m = re.search(r"DOMAIN\s*([1-4])", clean(text), re.I)
    return f"D{m.group(1)}" if m else None


def parse_exam_label(text: str) -> int | None:
    m = re.search(r"PRACTICE\s*EXAM\s*([123])", clean(text), re.I)
    return int(m.group(1)) if m else None


def extract_option_bodies(after: str) -> list[str]:
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in after.splitlines()]
    cands = []
    for ln in lines:
        if not (12 <= len(ln) <= 240):
            continue
        if re.search(
            r"ALL DOMAINS|QUESTION|DOMAIN|admin@|PAUSE|PRACTICE EXAM|OF 20|THE SIGNAL|"
            r"sthithapragna|WORKED|Select Two|Which combination|What should|What is",
            ln,
            re.I,
        ):
            continue
        cands.append(ln)
    # Dedup keep order
    out = []
    seen = set()
    for ln in cands:
        k = ln.lower()
        if k in seen:
            continue
        seen.add(k)
        out.append(ln)
        if len(out) >= 5:
            break
    return out


def parse_question_page(text: str, page: int) -> dict | None:
    t = clean(text)
    qn = parse_qnum(t)
    if not qn:
        return None
    body = re.sub(
        r"^[\s\S]*?QUESTION\s*\d+\s*OF\s*20[^\n]*\n?",
        "",
        t,
        count=1,
        flags=re.I,
    )
    body = re.split(r"PAUSE\s*AND\s*DECIDE|admin@|sthithapragna|PRACTICE EXAM", body, flags=re.I)[0]
    # Stem ends at '?' or at "Select Two..." prompt (multi questions often omit '?')
    cut = None
    qm = list(re.finditer(r"\?", body))
    if qm:
        cut = qm[-1].end()
    else:
        sm = re.search(
            r"Select\s*Two[^\n]*(?:take|make|change|implement|do|configure|use)?\.?",
            body,
            re.I,
        )
        if sm:
            cut = sm.end()
    if cut is None:
        return None
    stem = re.sub(r"\s+", " ", body[:cut]).strip()
    stem = re.sub(r"^DOMAIN\s*[1-4]\s*", "", stem, flags=re.I).strip()
    # Normalize multi prompt + choose-two cue for app multi-select
    if re.search(r"Select\s*Two", stem, re.I) and not re.search(
        r"\(\s*Choose\s+two\.?\s*\)", stem, re.I
    ):
        stem = stem.rstrip(".") + " (Choose two.)"
    after = body[cut:]
    # Drop stray OCR single-letter lines like lone "B"
    after_lines = []
    for ln in after.splitlines():
        s = ln.strip()
        if re.fullmatch(r"[A-E]", s):
            continue
        after_lines.append(ln)
    after = "\n".join(after_lines)
    opts = extract_option_bodies(after)
    if len(stem) < 50 or len(opts) < 2:
        return None
    # These practice-exam slides are always 4 options (2x2 grid).
    opts = opts[:4]
    if len(opts) < 2:
        return None
    options = [{"letter": chr(65 + i), "body": o[:900]} for i, o in enumerate(opts)]
    return {
        "page": page,
        "question_number": qn,
        "domain": parse_domain(t),
        "exam_label": parse_exam_label(t),
        "stem": stem[:2500],
        "options": options,
    }


def split_worked_blocks(text: str) -> list[tuple[str, str]]:
    """Return list of (option_title, verdict_text) from worked slide."""
    t = clean(text)
    body = re.sub(
        r"^[\s\S]*?QUESTION\s*\d+\s*[·\-]?\s*WORKED\s*",
        "",
        t,
        count=1,
        flags=re.I,
    )
    # Drop leading restated question line
    body = re.sub(
        r"^(What should|What is|Which combination|Select Two)[^\n]*\n?",
        "",
        body,
        count=1,
        flags=re.I,
    )
    body = re.split(r"THE SIGNAL|PRACTICE EXAM|admin@", body, flags=re.I)[0]
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in body.splitlines() if ln.strip()]
    # Pair: short title lines (~option) followed by longer verdict
    blocks: list[tuple[str, str]] = []
    i = 0
    while i < len(lines):
        title = lines[i]
        if len(title) > 90:
            i += 1
            continue
        verdict_parts = []
        j = i + 1
        while j < len(lines) and len(lines[j]) > 40:
            verdict_parts.append(lines[j])
            j += 1
            if len(verdict_parts) >= 2:
                break
        if verdict_parts:
            blocks.append((title, " ".join(verdict_parts)))
            i = j
        else:
            i += 1
        if len(blocks) >= 5:
            break
    return blocks


def pick_correct_letters(options: list[dict], worked_text: str, want: int = 1) -> str:
    blocks = split_worked_blocks(worked_text)
    if not blocks:
        return ""

    scores = []
    for bidx, (title, verdict) in enumerate(blocks):
        score = 0
        mapped = min(bidx, len(options) - 1)
        if RIGHT_CUES.search(verdict):
            score += 3
        if WRONG_CUES.search(verdict):
            score -= 3
        tl = title.lower()
        for oi, o in enumerate(options):
            ob = o["body"].lower()
            if tl[:20] and tl[:20] in ob:
                score += 2
                mapped = oi
                break
            if ob[:20] and ob[:20] in tl:
                score += 2
                mapped = oi
                break
        scores.append((score, mapped, title))

    scores.sort(key=lambda x: (-x[0], x[1]))
    picked = []
    seen = set()
    for score, idx, _ in scores:
        if score <= 0 and picked:
            continue
        letter = chr(65 + min(idx, len(options) - 1))
        if letter in seen:
            continue
        seen.add(letter)
        picked.append(letter)
        if len(picked) >= want:
            break
    return "".join(sorted(picked))


def parse_worked_page(text: str, page: int) -> dict | None:
    t = clean(text)
    qn = parse_qnum(t)
    if not qn:
        return None
    expl = re.sub(
        r"^[\s\S]*?QUESTION\s*\d+\s*[·\-]?\s*WORKED\s*",
        "",
        t,
        count=1,
        flags=re.I,
    ).strip()
    signal = ""
    sm = re.search(r"THE SIGNAL\s*(.+?)(?:PRACTICE EXAM|admin@|\Z)", t, re.I | re.S)
    if sm:
        signal = re.sub(r"\s+", " ", sm.group(1)).strip()
    expl = re.split(r"admin@|sthithapragna", expl, flags=re.I)[0].strip()
    expl = re.sub(r"\s+", " ", expl)
    if signal:
        expl = f"{expl}\n\n**THE SIGNAL:** {signal}"
    if len(expl) < 40:
        return None
    return {
        "page": page,
        "question_number": qn,
        "exam_label": parse_exam_label(t),
        "source_explanation": expl[:4500],
        "raw": t,
    }


def assign_exams(questions: list[dict]) -> list[dict]:
    questions = sorted(questions, key=lambda q: q["page"])
    # Prefer explicit PRACTICE EXAM N footer
    for q in questions:
        if q.get("exam_label"):
            q["exam_number"] = q["exam_label"]
    # Fill gaps by Q1 resets
    exam = questions[0].get("exam_number") or 1
    last_n = 0
    for q in questions:
        n = q["question_number"]
        if q.get("exam_number"):
            exam = q["exam_number"]
        elif n == 1 and last_n >= 10:
            exam += 1
            q["exam_number"] = exam
        else:
            q["exam_number"] = exam
        last_n = n
        q["source_question_number"] = (q["exam_number"] - 1) * 20 + n
    return questions


def to_item(q: dict) -> dict:
    opts = [f"{o['letter']}. {o['body']}" for o in q["options"]]
    ans = q.get("source_answer") or ""
    expl = q.get("source_explanation") or ""
    if expl and not expl.startswith("**Pembahasan"):
        if ans:
            expl = f"**Pembahasan:** Jawaban yang tepat adalah **{ans}**.\n\n{expl}"
        else:
            expl = f"**Pembahasan:**\n\n{expl}"
    return {
        "source": "pdf_slide_practice_exam",
        "source_question_number": q.get("source_question_number"),
        "question_text": q["stem"],
        "answer_options": opts,
        "source_answer": ans,
        "source_explanation": expl,
        "stem_hash": stem_hash(q["stem"]),
        "source_url": "",
        "exam_number": q.get("exam_number"),
        "page": q.get("page"),
        "domain_hint": q.get("domain"),
    }


def merge_into_practice(new_items: list[dict]) -> dict:
    path = PRACTICE / "research-questions.json"
    existing = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(existing, dict):
        existing = existing.get("questions") or []

    by_hash = {}
    for q in existing:
        h = (q.get("source_meta") or {}).get("stem_hash") or stem_hash(q.get("stem") or "")
        by_hash[h] = q

    max_id = 0
    for q in existing:
        m = re.match(r"LOC-(\d+)$", q.get("id") or "")
        if m:
            max_id = max(max_id, int(m.group(1)))

    added = upgraded = dup = 0
    for it in new_items:
        quiz = to_quiz(it, 0)
        if not quiz:
            continue
        if it.get("domain_hint") in {"D1", "D2", "D3", "D4"}:
            quiz["domain"] = it["domain_hint"]
        # Force published + key flags from to_quiz
        h = it["stem_hash"]
        if h in by_hash:
            prev = by_hash[h]
            prev_keyed = any(o.get("correct") for o in prev.get("options") or [])
            new_keyed = any(o.get("correct") for o in quiz.get("options") or [])
            if (new_keyed and not prev_keyed) or (
                len(quiz.get("explanation") or "") > len(prev.get("explanation") or "") + 60
            ):
                quiz["id"] = prev["id"]
                by_hash[h] = quiz
                upgraded += 1
            else:
                dup += 1
            continue
        max_id += 1
        quiz["id"] = f"LOC-{max_id:03d}"
        by_hash[h] = quiz
        added += 1

    merged = sorted(by_hash.values(), key=lambda q: int(re.search(r"\d+", q["id"]).group()))
    path.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return {"added": added, "upgraded": upgraded, "dup_skipped": dup, "total": len(merged)}


def main() -> None:
    pages = load_pages()
    end = max(pages) + 1 if pages else START_PAGE
    questions = []
    worked = []
    for i in range(START_PAGE, end):
        text = pages.get(i) or ""
        if not text.strip():
            continue
        kind = page_kind(text)
        if kind == "question":
            q = parse_question_page(text, i)
            if q:
                questions.append(q)
        elif kind == "worked":
            w = parse_worked_page(text, i)
            if w:
                worked.append(w)

    questions = assign_exams(questions)
    worked.sort(key=lambda w: w["page"])

    for q in questions:
        cands = [
            w
            for w in worked
            if w["question_number"] == q["question_number"]
            and w["page"] > q["page"]
            and w["page"] - q["page"] <= 5
        ]
        if not cands:
            continue
        w = min(cands, key=lambda x: x["page"] - q["page"])
        q["source_explanation"] = w["source_explanation"]
        q["worked_page"] = w["page"]
        want = 2 if re.search(r"Select\s*Two|Choose\s+two", q["stem"], re.I) else 1
        q["source_answer"] = pick_correct_letters(q["options"], w.get("raw") or "", want=want)

    items = [to_item(q) for q in questions]
    OUT_JSON.write_text(
        json.dumps(
            {
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "questions_parsed": len(items),
                "with_answer": sum(1 for it in items if it.get("source_answer")),
                "by_exam": {
                    str(e): sum(1 for it in items if it.get("exam_number") == e) for e in (1, 2, 3)
                },
                "items": items,
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )
    stats = merge_into_practice(items)
    print(
        json.dumps(
            {
                "parsed": len(items),
                "with_answer": sum(1 for it in items if it.get("source_answer")),
                "by_exam": {
                    str(e): sum(1 for it in items if it.get("exam_number") == e) for e in (1, 2, 3)
                },
                "merge": stats,
                "out": str(OUT_JSON),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
