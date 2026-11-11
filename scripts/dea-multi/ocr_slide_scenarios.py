#!/usr/bin/env python3
"""Denser OCR of slide deck for WORKED SCENARIO / practice prompts; merge dumps+slides into bank."""
from __future__ import annotations

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
    prefer,
    stem_hash,
    to_markdown,
    to_quiz,
    load_scraped,
    load_pdfs,
)
from pdf_repair_extract import extract_dumps, OUT as RETRY  # noqa: E402

SLIDE = ROOT / "docs" / "DEA-C01-complete-slide-deck.pdf"
COMPILED = ROOT / "aws-dea-c01" / "_work" / "compiled"
PRACTICE = ROOT / "aws-dea-c01" / "practice"
CKPT = RETRY / "slide-ocr.jsonl"


def load_ckpt() -> dict[int, dict]:
    done = {}
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


def ocr_page(doc, ocr, done: dict, i: int) -> dict:
    if i in done and done[i].get("text") is not None:
        return done[i]
    page = doc[i]
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1.4, 1.4), alpha=False)
    img_path = RETRY / f"slide-page-{i:04d}.png"
    pix.save(str(img_path))
    result, _ = ocr(str(img_path))
    text = "\n".join(row[1] for row in result if len(row) > 1) if result else ""
    row = {"page": i, "chars": len(text), "text": text}
    with CKPT.open("a", encoding="utf-8") as f:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")
    done[i] = row
    try:
        img_path.unlink(missing_ok=True)
    except OSError:
        pass
    return row


def is_interesting(text: str) -> bool:
    return bool(
        re.search(
            r"WORKED\s*SCENARIO|What should the data engineer|Which\s+(?:solution|approach|option)|Correct Answer|\bA\.\s+.+\bB\.",
            text,
            re.I | re.S,
        )
    )


def parse_scenarios(text: str, source: str = "pdf_slide_deck") -> list[dict]:
    items = []
    # Split on worked scenario headers or "What should"
    chunks = re.split(
        r"(?=WORKED\s*SCENARIO|\bWhat should the data engineer\b|\bWhy did the first attempt\b)",
        text,
        flags=re.I,
    )
    for chunk in chunks:
        chunk = chunk.strip()
        if len(chunk) < 80:
            continue
        # Stem: until first option-like short line or bullet
        # Options often OCR without A/B — lines after question
        q = None
        for pat in [
            r"(What should the data engineer[^\n?]+\?)",
            r"(Why did the first attempt[^\n?]+\?)",
            r"(Which\s+(?:solution|approach|option|service)[^\n?]+\?)",
        ]:
            m = re.search(pat, chunk, re.I)
            if m:
                q = m.group(1).strip()
                break
        if not q:
            continue
        # Scenario context before question
        pre = chunk[: chunk.find(q)].strip()
        pre = re.sub(r"\s+", " ", pre)
        pre = re.sub(r"^WORKED\s*SCENARIO[^\w]*", "", pre, flags=re.I).strip()
        stem = (pre + " " + q).strip() if pre and len(pre) > 40 else q
        stem = re.sub(r"\s+", " ", stem)
        # Options: lines after question that look like answers (short-ish)
        after = chunk[chunk.find(q) + len(q) :]
        # Try A. B. C. D.
        options = []
        for letter in "ABCDEF":
            nxt = chr(ord(letter) + 1) if letter != "F" else None
            pat = (
                rf"{letter}[\.\)]\s*(.+?)(?=\s*{nxt}[\.\)]\s*|\Z)"
                if nxt
                else rf"{letter}[\.\)]\s*(.+?)\Z"
            )
            m = re.search(pat, after, re.S | re.I)
            if m:
                body = re.sub(r"\s+", " ", m.group(1)).strip()
                body = re.split(r"\bCorrect\b|\bWorks\b|\bWould\b", body)[0].strip()
                if len(body) > 8:
                    options.append(f"{letter}. {body}")
        if len(options) < 2:
            # unlabeled bullets / short lines
            lines = [re.sub(r"\s+", " ", ln).strip() for ln in after.splitlines()]
            cands = [
                ln
                for ln in lines
                if 12 <= len(ln) <= 120
                and not re.search(r"admin@|MODULE|DOMAIN|WORKED|page", ln, re.I)
            ]
            # take first 4 distinct
            seen = set()
            for ln in cands:
                key = ln.lower()
                if key in seen:
                    continue
                seen.add(key)
                options.append(f"{chr(64 + len(options)+1)}. {ln}")
                if len(options) >= 4:
                    break
        if len(stem) > 30 and len(options) >= 2:
            items.append(
                {
                    "source": source,
                    "source_question_number": None,
                    "question_text": stem[:2000],
                    "answer_options": options,
                    "source_answer": "",  # teaching deck — key not always explicit
                    "source_explanation": "",
                    "stem_hash": stem_hash(stem),
                }
            )
    return items


def main() -> None:
    RETRY.mkdir(parents=True, exist_ok=True)
    ocr = RapidOCR()
    doc = pymupdf.open(SLIDE)
    n = doc.page_count
    done = load_ckpt()

    # Pass 1: every 8th page
    targets = set(range(0, n, 8))
    # Pass 2: expand around interesting already-known pages
    for i, row in list(done.items()):
        if is_interesting(row.get("text") or ""):
            for j in range(max(0, i - 3), min(n, i + 6)):
                targets.add(j)

    print(f"OCR targets planned: {len(targets)} (already have {len(done)})")
    interesting_pages = []
    for i in sorted(targets):
        row = ocr_page(doc, ocr, done, i)
        if is_interesting(row["text"]):
            interesting_pages.append(i)
            # expand neighborhood
            for j in range(max(0, i - 2), min(n, i + 4)):
                if j not in done:
                    ocr_page(doc, ocr, done, j)
        if i % 40 == 0:
            print(f"  progress page {i}/{n} interesting={len(interesting_pages)}")

    # Join all OCR text that looks relevant
    texts = []
    for i, row in sorted(done.items()):
        if is_interesting(row.get("text") or "") or i in interesting_pages:
            texts.append(f"\n\n--- page {i} ---\n{row['text']}")
    joined = "\n".join(texts)
    (RETRY / "slide-scenarios-joined.txt").write_text(joined, encoding="utf-8")
    scenarios = parse_scenarios(joined)
    # Dedup scenarios
    by_h = {}
    for it in scenarios:
        by_h[it["stem_hash"]] = it
    scenarios = list(by_h.values())
    (RETRY / "slide-items.json").write_text(
        json.dumps(scenarios, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"slide scenarios parsed: {len(scenarios)} from {len(done)} ocr pages")

    # dumps
    dumps = extract_dumps()
    (RETRY / "dumps-items.json").write_text(
        json.dumps(dumps["items"], indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(f"dumps items: {len(dumps['items'])}")

    # Merge into full compile (reuse logic)
    scraped = load_scraped()
    pdfs = load_pdfs()  # mock 80
    pool = scraped + pdfs + dumps["items"] + scenarios
    by_hash: dict[str, dict] = {}
    for it in pool:
        h = it["stem_hash"]
        by_hash[h] = it if h not in by_hash else prefer(by_hash[h], it)
    items = sorted(
        by_hash.values(),
        key=lambda x: (
            x.get("source_question_number") is None,
            x.get("source_question_number") or 9999,
            x["question_text"][:40],
        ),
    )
    quiz = []
    idx = 1
    for it in items:
        q = to_quiz(it, idx)
        if q:
            quiz.append(q)
            idx += 1

    # Also keep slide scenarios without answers as draft study entries in MD only
    md = to_markdown(items, quiz)
    # Append unanswered slide scenarios section
    unanswered = [it for it in scenarios if not it.get("source_answer")]
    if unanswered:
        md += "\n\n# Slide-deck worked scenarios (OCR, often no answer key)\n\n"
        for i, it in enumerate(unanswered, 1):
            md += f"## Slide S{i}\n\n{it['question_text']}\n\n"
            for o in it.get("answer_options") or []:
                md += f"- {o}\n"
            md += "\n---\n\n"

    COMPILED.mkdir(parents=True, exist_ok=True)
    (COMPILED / "all-available-questions.md").write_text(md, encoding="utf-8")
    PRACTICE.mkdir(parents=True, exist_ok=True)
    (PRACTICE / "compiled-question-bank.md").write_text(md, encoding="utf-8")
    (COMPILED / "research-questions.json").write_text(
        json.dumps(
            {
                "generated_at": datetime.now(timezone.utc).isoformat(),
                "count": len(quiz),
                "questions": quiz,
            },
            indent=2,
            ensure_ascii=False,
        )
        + "\n",
        encoding="utf-8",
    )

    by_source = {}
    for it in items:
        by_source[it["source"]] = by_source.get(it["source"], 0) + 1
    summary = {
        "unique_stems": len(items),
        "quiz_ready": len(quiz),
        "dumps_parsed": len(dumps["items"]),
        "slide_scenarios": len(scenarios),
        "slide_pages_ocrd": len(done),
        "by_source": by_source,
    }
    (COMPILED / "compile-summary.json").write_text(
        json.dumps(summary, indent=2) + "\n", encoding="utf-8"
    )
    (RETRY / "retry-summary.json").write_text(
        json.dumps(summary, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
