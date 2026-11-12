#!/usr/bin/env python3
"""OCR + parse the 3x20 practice exams near the end of DEA-C01-complete-slide-deck.pdf.

Outputs:
- aws-dea-c01/_work/compiled/pdf-retry/slide-practice-exams.json
- merges into practice/research-questions.json (deduped) and syncs web via compile fields
"""
from __future__ import annotations

import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import pymupdf
from rapidocr_onnxruntime import RapidOCR

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))

from compile_local_bank import (  # noqa: E402
    guess_domain,
    guess_services,
    prefer,
    stem_hash,
    to_quiz,
)

SLIDE = ROOT / "docs" / "DEA-C01-complete-slide-deck.pdf"
RETRY = ROOT / "aws-dea-c01" / "_work" / "compiled" / "pdf-retry"
CKPT = RETRY / "slide-ocr.jsonl"
OUT_JSON = RETRY / "slide-practice-exams.json"
PRACTICE = ROOT / "aws-dea-c01" / "practice"

# User: practice exams start ~page 922 (1-based) → index 921
START_PAGE = 910  # a little earlier for titles
END_PAGE_EXCLUSIVE = None  # until end of PDF


def load_ckpt() -> dict[int, dict]:
    done: dict[int, dict] = {}
    if CKPT.exists():
        for line in CKPT.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            try:
                row = json.loads(line)
                done[int(row["page"])] = row
            except (json.JSONDecodeError, KeyError, ValueError):
                continue
    return done


def ocr_page(doc, ocr, done: dict[int, dict], i: int, scale: float = 2.0) -> dict:
    if i in done and (done[i].get("text") or "").strip():
        return done[i]
    page = doc[i]
    pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
    img_path = RETRY / f"slide-exam-{i:04d}.png"
    pix.save(str(img_path))
    result, _ = ocr(str(img_path))
    text = "\n".join(row[1] for row in result if len(row) > 1) if result else ""
    row = {"page": i, "chars": len(text), "text": text, "scale": scale}
    with CKPT.open("a", encoding="utf-8") as f:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")
    done[i] = row
    try:
        img_path.unlink(missing_ok=True)
    except OSError:
        pass
    return row


def clean(t: str) -> str:
    t = t.replace("ﬁ", "fi").replace("ﬂ", "fl")
    t = t.replace("·", "·").replace("•", "·")
    # common OCR digit/letter swaps in headers
    t = re.sub(r"QUESTI0N", "QUESTION", t, flags=re.I)
    t = re.sub(r"D0MAIN", "DOMAIN", t, flags=re.I)
    t = re.sub(r"W0RKED", "WORKED", t, flags=re.I)
    return t


def page_kind(text: str) -> str:
    t = clean(text)
    if re.search(r"QUESTION\s*\d+\s*[·\-]?\s*WORKED", t, re.I):
        return "worked"
    if re.search(r"QUESTION\s*\d+\s*OF\s*20", t, re.I):
        return "question"
    if re.search(r"PRACTICE\s*EXAM\s*[123]|EXAM\s*[123]\s*OF\s*3", t, re.I):
        return "exam_title"
    return "other"


def parse_qnum(text: str) -> int | None:
    t = clean(text)
    m = re.search(r"QUESTION\s*(\d+)\s*(?:OF\s*20|[·\-]\s*WORKED|WORKED)", t, re.I)
    if m:
        return int(m.group(1))
    m = re.search(r"QUESTION\s*(\d+)", t, re.I)
    return int(m.group(1)) if m else None


def parse_domain(text: str) -> str | None:
    t = clean(text)
    m = re.search(r"DOMAIN\s*([1-4])", t, re.I)
    if m:
        return f"D{m.group(1)}"
    return None


def extract_options(after: str) -> list[dict]:
    """Pull A-E option bodies from OCR text after the stem."""
    options: list[dict] = []
    # Prefer labeled A. B. C.
    labeled = []
    for letter in "ABCDE":
        nxt = chr(ord(letter) + 1) if letter != "E" else None
        if nxt:
            pat = rf"(?:^|\n)\s*{letter}[\.\)]\s*(.+?)(?=(?:^|\n)\s*{nxt}[\.\)]\s*|\Z)"
        else:
            pat = rf"(?:^|\n)\s*{letter}[\.\)]\s*(.+?)\Z"
        m = re.search(pat, after, re.S | re.I)
        if m:
            body = re.sub(r"\s+", " ", m.group(1)).strip()
            body = re.split(r"\bTHE SIGNAL\b|\bWhy the others\b|\bCORRECT\b", body, flags=re.I)[0].strip()
            if len(body) > 8:
                labeled.append({"letter": letter, "body": body[:800]})
    if len(labeled) >= 2:
        return labeled

    # Unlabeled short lines (common on these slides)
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in after.splitlines()]
    cands = []
    for ln in lines:
        if not (15 <= len(ln) <= 220):
            continue
        if re.search(
            r"ALL DOMAINS|QUESTION|DOMAIN|admin@|MODULE|PRACTICE EXAM|page \d+|OF 20",
            ln,
            re.I,
        ):
            continue
        cands.append(ln)
    seen = set()
    for ln in cands:
        key = ln.lower()
        if key in seen:
            continue
        seen.add(key)
        letter = chr(65 + len(options))
        options.append({"letter": letter, "body": ln[:800]})
        if len(options) >= 5:
            break
    return options


def parse_question_page(text: str, page: int) -> dict | None:
    t = clean(text)
    qn = parse_qnum(t)
    if not qn:
        return None
    # Stem: strip header then take until options
    body = re.sub(
        r"^[\s\S]*?QUESTION\s*\d+\s*OF\s*20[^\n]*",
        "",
        t,
        count=1,
        flags=re.I,
    ).strip()
    # Remove trailing footer noise
    body = re.split(r"admin@|sthithapragna|ALL DOMAINS\s*$", body, flags=re.I)[0].strip()

    # Find start of options: first line that looks like an option after a question mark
    qm = re.search(r"\?", body)
    if qm:
        stem = re.sub(r"\s+", " ", body[: qm.end()]).strip()
        after = body[qm.end() :]
    else:
        # fallback: first 400 chars stem
        stem = re.sub(r"\s+", " ", body[:450]).strip()
        after = body[450:]

    # Trim stem boilerplate
    stem = re.sub(r"^DOMAIN\s*[1-4]\s*", "", stem, flags=re.I).strip()
    if len(stem) < 40:
        return None
    options = extract_options(after)
    if len(options) < 2:
        return None
    return {
        "page": page,
        "question_number": qn,
        "domain": parse_domain(t),
        "stem": stem[:2500],
        "options": options,
        "raw": t,
    }


def parse_worked_page(text: str, page: int) -> dict | None:
    t = clean(text)
    qn = parse_qnum(t)
    if not qn:
        return None
    # Correct option often marked with wording like "Fixes", "Works", or first strong option.
    # These slides typically show options with short verdicts; look for explicit markers.
    correct = ""
    # Pattern: option line then "Correct" / checkmark-ish words nearby
    m = re.search(
        r"(?:CORRECT(?:\s*ANSWER)?|The correct (?:answer|option)|Answer\s*[:=])\s*([A-E])\b",
        t,
        re.I,
    )
    if m:
        correct = m.group(1).upper()

    # Heuristic: lines that contain strong positive cues and look like chosen answers
    # Keep full text as explanation
    expl = re.sub(
        r"^[\s\S]*?QUESTION\s*\d+\s*[·\-]?\s*WORKED\s*",
        "",
        t,
        count=1,
        flags=re.I,
    ).strip()
    expl = re.split(r"admin@|sthithapragna", expl, flags=re.I)[0].strip()
    expl = re.sub(r"\s+", " ", expl)
    if len(expl) < 30:
        return None

    # Try to find chosen option letter from "THE SIGNAL" blocks or first option with positive cue
    if not correct:
        # Look for patterns like "A. ... Works" vs "B. ... Wrong"
        for letter in "ABCDE":
            if re.search(
                rf"(?:^|\n)\s*{letter}[\.\)]\s*.{{0,200}}?\b(?:Works|Correct|Best|Choose this|This is (?:the )?right)\b",
                t,
                re.I | re.S,
            ):
                correct = letter
                break

    return {
        "page": page,
        "question_number": qn,
        "source_answer": correct,
        "source_explanation": expl[:4000],
        "raw": t,
    }


def assign_exam_ids(questions: list[dict]) -> list[dict]:
    """Split into exams whenever question_number resets to 1."""
    exams: list[list[dict]] = []
    cur: list[dict] = []
    last_n = 0
    for q in questions:
        n = q["question_number"]
        if cur and n == 1 and last_n >= 10:
            exams.append(cur)
            cur = []
        cur.append(q)
        last_n = n
    if cur:
        exams.append(cur)

    out = []
    for ei, exam in enumerate(exams, 1):
        for q in exam:
            q = dict(q)
            q["exam_number"] = ei
            q["source_question_number"] = (ei - 1) * 20 + q["question_number"]
            out.append(q)
    return out


def to_bank_item(q: dict) -> dict:
    opts = [f"{o['letter']}. {o['body']}" for o in q["options"]]
    ans = q.get("source_answer") or ""
    expl = q.get("source_explanation") or ""
    stem = q["stem"]
    item = {
        "source": "pdf_slide_practice_exam",
        "source_question_number": q.get("source_question_number") or q["question_number"],
        "question_text": stem,
        "answer_options": opts,
        "source_answer": ans,
        "source_explanation": expl,
        "stem_hash": stem_hash(stem),
        "source_url": "",
        "exam_number": q.get("exam_number"),
        "page": q.get("page"),
        "domain_hint": q.get("domain"),
    }
    return item


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

    added = 0
    upgraded = 0
    dup_skipped = 0
    for it in new_items:
        h = it["stem_hash"]
        quiz = to_quiz(it, 0)
        if not quiz:
            continue
        if it.get("domain_hint") in {"D1", "D2", "D3", "D4"}:
            quiz["domain"] = it["domain_hint"]
        if h in by_hash:
            prev = by_hash[h]
            prev_keyed = prev.get("has_answer_key") is not False and any(
                o.get("correct") for o in prev.get("options") or []
            )
            new_keyed = quiz.get("has_answer_key") is not False and any(
                o.get("correct") for o in quiz.get("options") or []
            )
            # Prefer new if it adds a key or richer explanation
            if (new_keyed and not prev_keyed) or len(quiz.get("explanation") or "") > len(
                prev.get("explanation") or ""
            ) + 80:
                quiz["id"] = prev["id"]
                by_hash[h] = quiz
                upgraded += 1
            else:
                dup_skipped += 1
            continue
        max_id += 1
        quiz["id"] = f"LOC-{max_id:03d}"
        by_hash[h] = quiz
        added += 1

    merged = sorted(by_hash.values(), key=lambda q: int(re.search(r"\d+", q["id"]).group()))
    path.write_text(json.dumps(merged, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return {
        "added": added,
        "upgraded": upgraded,
        "dup_skipped": dup_skipped,
        "total": len(merged),
        "new_exam_items": len(new_items),
    }


def main() -> None:
    RETRY.mkdir(parents=True, exist_ok=True)
    ocr = RapidOCR()
    doc = pymupdf.open(str(SLIDE))
    n = doc.page_count
    end = n if END_PAGE_EXCLUSIVE is None else min(END_PAGE_EXCLUSIVE, n)
    done = load_ckpt()

    targets = [i for i in range(START_PAGE, end) if i not in done or not (done[i].get("text") or "").strip()]
    print(f"OCR missing in [{START_PAGE},{end}): {len(targets)} (have {len(done)} total ckpt)")
    for k, i in enumerate(targets):
        ocr_page(doc, ocr, done, i, scale=2.0)
        if (k + 1) % 10 == 0 or k == len(targets) - 1:
            print(f"  OCR {k+1}/{len(targets)} page_idx={i}")

    # Collect pages in range
    q_pages: list[dict] = []
    w_by_num_exam: dict[tuple[int, int], dict] = {}
    # Track exam breaks via titles / Q1 resets later
    for i in range(START_PAGE, end):
        row = done.get(i) or {}
        text = row.get("text") or ""
        if not text.strip():
            continue
        kind = page_kind(text)
        if kind == "question":
            parsed = parse_question_page(text, i)
            if parsed:
                q_pages.append(parsed)
        elif kind == "worked":
            parsed = parse_worked_page(text, i)
            if parsed:
                # temporary key by page order; remapped after exam assign
                w_by_num_exam[(i, parsed["question_number"])] = parsed

    q_pages.sort(key=lambda x: x["page"])
    questions = assign_exam_ids(q_pages)

    # Attach nearest subsequent worked page with same question_number within exam window
    worked_list = []
    for i in range(START_PAGE, end):
        row = done.get(i) or {}
        text = row.get("text") or ""
        if page_kind(text) != "worked":
            continue
        parsed = parse_worked_page(text, i)
        if parsed:
            worked_list.append(parsed)
    worked_list.sort(key=lambda x: x["page"])

    for q in questions:
        # find worked with same qnum and page > q.page, before next question page of same exam
        cand = [
            w
            for w in worked_list
            if w["question_number"] == q["question_number"] and w["page"] > q["page"]
        ]
        if not cand:
            continue
        # closest after question
        w = min(cand, key=lambda x: x["page"] - q["page"])
        if w["page"] - q["page"] > 6:
            continue
        q["source_answer"] = w.get("source_answer") or ""
        q["source_explanation"] = w.get("source_explanation") or ""
        q["worked_page"] = w["page"]

        # If still no letter, try match option body fragment inside explanation
        if not q["source_answer"] and q.get("options"):
            expl = (q["source_explanation"] or "").lower()
            best = None
            best_score = 0
            for o in q["options"]:
                frag = o["body"][:48].lower()
                if len(frag) >= 20 and frag in expl:
                    score = len(frag)
                    if score > best_score:
                        best_score = score
                        best = o["letter"]
            if best:
                q["source_answer"] = best

    items = [to_bank_item(q) for q in questions]
    OUT_JSON.write_text(
        json.dumps(
            {
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "start_page_index": START_PAGE,
                "questions_parsed": len(items),
                "with_answer": sum(1 for it in items if it.get("source_answer")),
                "by_exam": {
                    str(e): sum(1 for it in items if it.get("exam_number") == e) for e in (1, 2, 3, 4)
                },
                "items": items,
                "raw_questions": questions,
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )
    print(
        json.dumps(
            {
                "parsed": len(items),
                "with_answer": sum(1 for it in items if it.get("source_answer")),
                "by_exam": {
                    str(e): sum(1 for it in items if it.get("exam_number") == e) for e in (1, 2, 3, 4)
                },
                "out": str(OUT_JSON),
            },
            indent=2,
        )
    )

    stats = merge_into_practice(items)
    print("merge", json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
