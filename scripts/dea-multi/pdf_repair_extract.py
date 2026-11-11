#!/usr/bin/env python3
"""Re-extract the failed dumps PDF (undouble OCR) and OCR the image-only slide deck."""
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

import pymupdf
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[2]
DOCS = ROOT / "docs"
OUT = ROOT / "aws-dea-c01" / "_work" / "compiled" / "pdf-retry"
OUT.mkdir(parents=True, exist_ok=True)

DUMPS = DOCS / "pdf-p-classtruncatedtext-module-lineclamped-85ulhh-style-max-lines5aws-certified-data-engineer-exam-dumps-p_compress.pdf"
SLIDE = DOCS / "DEA-C01-complete-slide-deck.pdf"

PUA_MAP = {
    "\ue000": "f",
    "\ue001": "ti",
    "\ue002": "fl",
    "\ue003": "ffi",
    "\ue004": "ffl",
    "\ue005": "ft",
    "\ue006": "st",
    "\ue007": "ff",
    "\ue008": "fi",
    "\ufb00": "ff",
    "\ufb01": "fi",
    "\ufb02": "fl",
    "\ufb03": "ffi",
    "\ufb04": "ffl",
}


def fix_pua(text: str) -> str:
    for k, v in PUA_MAP.items():
        text = text.replace(k, v)
    # leftover private-use → approximate
    text = re.sub(r"[\ue000-\uf8ff]", "", text)
    return text


def collapse_consecutive_dupes(s: str, min_len: int = 12) -> str:
    """Remove immediately repeated chunks (PDF dumps double every phrase)."""
    if len(s) < min_len * 2:
        return s
    # Word-level first (faster / cleaner)
    words = s.split()
    out_w: list[str] = []
    i = 0
    while i < len(words):
        matched = False
        # try phrase lengths 20..3 words
        max_l = min(40, (len(words) - i) // 2)
        for L in range(max_l, 2, -1):
            a = words[i : i + L]
            b = words[i + L : i + 2 * L]
            if a and a == b:
                out_w.extend(a)
                i += 2 * L
                matched = True
                break
        if not matched:
            out_w.append(words[i])
            i += 1
    s2 = " ".join(out_w)
    # Char-level for glued duplicates without spaces (titles etc.)
    out = []
    i = 0
    n = len(s2)
    while i < n:
        matched = False
        max_l = min(120, (n - i) // 2)
        for L in range(max_l, min_len - 1, -1):
            if s2[i : i + L] == s2[i + L : i + 2 * L]:
                out.append(s2[i : i + L])
                i += 2 * L
                matched = True
                break
        if not matched:
            out.append(s2[i])
            i += 1
    return "".join(out)


def undouble_line(line: str) -> str:
    s = line.strip()
    if len(s) < 8:
        return s
    s = re.sub(r"^(\d{1,3}\)|\d{1,3}\.)\s*\1\s*", r"\1 ", s)
    mid = len(s) // 2
    if len(s) % 2 == 0 and s[:mid] == s[mid:]:
        return s[:mid].strip()
    for delta in range(0, 6):
        m = mid - delta
        if m > 10 and s[:m] == s[m : 2 * m]:
            return s[:m].strip()
    return collapse_consecutive_dupes(s)


def undouble_text(text: str) -> str:
    text = fix_pua(text)
    lines = [undouble_line(line) for line in text.splitlines()]
    joined = "\n".join(lines)
    joined = collapse_consecutive_dupes(joined, min_len=20)
    # Fix doubled option markers "A. ... A. ..."
    joined = re.sub(
        r"\b([A-F])\.\s+(.+?)\s+\1\.\s+\2",
        r"\1. \2",
        joined,
        flags=re.S,
    )
    return joined


def parse_mcq(text: str, source: str) -> list[dict]:
    from compile_local_bank import parse_numbered_mcq, stem_hash

    # Normalize "1) 1)" leftovers already handled; also "N)N)"
    text = re.sub(r"(\d{1,3}\))\s*\1", r"\1 ", text)
    text = re.sub(r"(\d{1,3}\.)\s*\1", r"\1 ", text)
    items = parse_numbered_mcq(text, source)
    # If numbered parser weak, try alternate "N)" only
    if len(items) < 10:
        alt = re.sub(r"(\d{1,3})\)", r"\1. ", text)
        items2 = parse_numbered_mcq(alt, source)
        if len(items2) > len(items):
            items = items2
    for it in items:
        it["stem_hash"] = stem_hash(it["question_text"])
    return items


def prep_dumps_raw(raw: str) -> str:
    """Preserve question numbers before collapsing doubled body text."""
    raw = fix_pua(raw)
    # "1) 1)" / "12)12)" / "1. 1." → single marker on its own line
    raw = re.sub(r"(\d{1,3}\))\s*\1", r"\n\1 ", raw)
    raw = re.sub(r"(\d{1,3}\.)\s*\1", r"\n\1 ", raw)
    # Common option doubling "A. ... A. ..." handled later
    return raw


def extract_dumps() -> dict:
    reader = PdfReader(str(DUMPS))
    raw_pages = [(pg.extract_text() or "") for pg in reader.pages]
    raw_all = "\n".join(raw_pages)
    (OUT / "dumps-raw.txt").write_text(raw_all, encoding="utf-8")

    prepared = prep_dumps_raw(raw_all)
    # Undouble per segment between question markers so numbers survive
    parts = re.split(r"(?=\n\d{1,3}[\.\)]\s)", prepared)
    fixed_parts = []
    for part in parts:
        m = re.match(r"(\n?\d{1,3}[\.\)])\s*([\s\S]*)", part)
        if m:
            marker, body = m.group(1), m.group(2)
            body = undouble_text(body)
            # Soft ligature fixes
            body = (
                body.replace("confgure", "configure")
                .replace("confguring", "configuring")
                .replace("aflempt", "attempt")
                .replace("operaonal", "operational")
                .replace("soluon", "solution")
                .replace("informaon", "information")
                .replace("Microsoffl", "Microsoft")
                .replace("Redshiffi", "Redshift")
                .replace("Redshi", "Redshift")
            )
            fixed_parts.append(f"{marker} {body}")
        else:
            fixed_parts.append(undouble_text(part))
    fixed_all = "\n".join(fixed_parts)
    # Ensure markers are "N. " for parser
    fixed_all = re.sub(r"(\d{1,3})\)\s+", r"\1. ", fixed_all)
    (OUT / "dumps-fixed.txt").write_text(fixed_all, encoding="utf-8")
    items = parse_mcq(fixed_all, "pdf_exam_dumps")

    # pymupdf path for comparison
    doc = pymupdf.open(DUMPS)
    pm_raw = "\n".join(p.get_text("text") for p in doc)
    pm_prep = prep_dumps_raw(pm_raw)
    pm_parts = re.split(r"(?=\n\d{1,3}[\.\)]\s)", pm_prep)
    pm_fixed_parts = []
    for part in pm_parts:
        m = re.match(r"(\n?\d{1,3}[\.\)])\s*([\s\S]*)", part)
        if m:
            pm_fixed_parts.append(f"{m.group(1)} {undouble_text(m.group(2))}")
        else:
            pm_fixed_parts.append(undouble_text(part))
    pm_all = re.sub(r"(\d{1,3})\)\s+", r"\1. ", "\n".join(pm_fixed_parts))
    (OUT / "dumps-pymupdf-fixed.txt").write_text(pm_all, encoding="utf-8")
    items_pm = parse_mcq(pm_all, "pdf_exam_dumps")
    best = items if len(items) >= len(items_pm) else items_pm
    return {
        "source": "pdf_exam_dumps",
        "pages": len(reader.pages),
        "raw_chars": len(raw_all),
        "fixed_chars": len(fixed_all),
        "parsed_pypdf": len(items),
        "parsed_pymupdf": len(items_pm),
        "items": best,
    }


def ocr_slide_sample_and_scan(max_pages: int | None = None) -> dict:
    """OCR slide deck. Uses RapidOCR. Can be slow for 1065 pages — checkpointed."""
    from rapidocr_onnxruntime import RapidOCR

    ocr = RapidOCR()
    doc = pymupdf.open(SLIDE)
    n = doc.page_count if max_pages is None else min(max_pages, doc.page_count)
    ckpt = OUT / "slide-ocr.jsonl"
    done = {}
    if ckpt.exists():
        for line in ckpt.read_text(encoding="utf-8").splitlines():
            if not line.strip():
                continue
            try:
                row = json.loads(line)
                done[row["page"]] = row
            except json.JSONDecodeError:
                pass

    # First pass: OCR a sparse sample to detect if Q-bank or lecture
    sample_idxs = sorted(
        set(
            [0, 1, 2, 3, 4, 5, 10, 20, 30, 50, 80, 100, 150, 200, 300, 400, 500, 700, 900, 1000]
            + list(range(0, min(40, n)))
        )
    )
    sample_idxs = [i for i in sample_idxs if i < n]

    def ocr_page(i: int) -> dict:
        if i in done and done[i].get("text") is not None:
            return done[i]
        page = doc[i]
        # render at moderate DPI
        pix = page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5), alpha=False)
        img_path = OUT / f"slide-page-{i:04d}.png"
        pix.save(str(img_path))
        result, _ = ocr(str(img_path))
        text = ""
        if result:
            text = "\n".join(row[1] for row in result if len(row) > 1)
        row = {"page": i, "chars": len(text), "text": text}
        with ckpt.open("a", encoding="utf-8") as f:
            f.write(json.dumps(row, ensure_ascii=False) + "\n")
        done[i] = row
        # keep disk lean: delete png after OCR
        try:
            img_path.unlink(missing_ok=True)
        except OSError:
            pass
        return row

    print(f"OCR sample pages: {len(sample_idxs)}")
    sample_texts = []
    for i in sample_idxs:
        row = ocr_page(i)
        sample_texts.append(row)
        print(f"  sample page {i}: chars={row['chars']}")

    joined_sample = "\n".join(r["text"] for r in sample_texts)
    (OUT / "slide-sample-ocr.txt").write_text(joined_sample, encoding="utf-8")

    looks_like_questions = bool(
        re.search(r"\bQuestion\s*\d+\b|\bQ\s*\d+\b|\bCorrect Answer\b|\bA\.\s+.+\bB\.\s+", joined_sample, re.I)
    ) or len(re.findall(r"(?:^|\n)\s*\d{1,3}[\.\)]\s+[A-Z]", joined_sample)) >= 3

    question_like_pages = []
    for r in sample_texts:
        t = r["text"]
        score = 0
        if re.search(r"\bCorrect Answer\b|Answer\s*:", t, re.I):
            score += 3
        if re.search(r"\bA[\.\)]\s+.+\bB[\.\)]\s+", t, re.I | re.S):
            score += 2
        if re.search(r"Which\s+(?:solution|approach|option|service)", t, re.I):
            score += 1
        if score >= 2:
            question_like_pages.append(r["page"])

    full_items: list[dict] = []
    ocr_mode = "sample_only"
    pages_ocrd = len(sample_idxs)

    # If sample suggests question bank, OCR all pages (checkpointed). Else OCR more densely around hits.
    if looks_like_questions or question_like_pages:
        ocr_mode = "full" if looks_like_questions else "targeted"
        targets = list(range(n)) if looks_like_questions else sorted(
            set(
                p
                for base in question_like_pages
                for p in range(max(0, base - 5), min(n, base + 15))
            )
        )
        print(f"OCR mode={ocr_mode} targets={len(targets)}")
        texts = []
        for i in targets:
            row = ocr_page(i)
            texts.append(row["text"])
            if i % 25 == 0:
                print(f"  ocr page {i}/{n} chars={row['chars']}")
        pages_ocrd = len(set(done))
        all_text = "\n".join(texts)
        (OUT / "slide-ocr-joined.txt").write_text(all_text, encoding="utf-8")
        full_items = parse_mcq(all_text, "pdf_slide_deck")
        # Also try Question # patterns from OCR
        if len(full_items) < 5:
            full_items = parse_question_hash(all_text, "pdf_slide_deck")
    else:
        # Still try parse sample in case lecture contains embedded Qs
        full_items = parse_mcq(joined_sample, "pdf_slide_deck")
        if not full_items:
            full_items = parse_question_hash(joined_sample, "pdf_slide_deck")

    return {
        "source": "pdf_slide_deck",
        "pages": doc.page_count,
        "ocr_mode": ocr_mode,
        "pages_ocrd": pages_ocrd,
        "looks_like_questions": looks_like_questions,
        "question_like_sample_pages": question_like_pages,
        "sample_chars": len(joined_sample),
        "parsed": len(full_items),
        "items": full_items,
        "sample_preview": joined_sample[:1500],
    }


def parse_question_hash(text: str, source: str) -> list[dict]:
    from compile_local_bank import stem_hash

    items = []
    parts = re.split(r"(?:Question\s*#?\s*|Q\s*)(\d+)\s*[:.\-]?\s*", text, flags=re.I)
    for i in range(1, len(parts), 2):
        try:
            num = int(parts[i])
        except ValueError:
            continue
        body = parts[i + 1] if i + 1 < len(parts) else ""
        om = re.search(r"\bA[\.\)]\s+", body)
        if not om:
            continue
        stem = re.sub(r"\s+", " ", body[: om.start()]).strip()
        opt_blob = body[om.start() :]
        options = []
        for letter in "ABCDEF":
            nxt = chr(ord(letter) + 1) if letter != "F" else None
            pat = (
                rf"{letter}[\.\)]\s*(.+?)(?=\s*{nxt}[\.\)]\s*|\Z)"
                if nxt
                else rf"{letter}[\.\)]\s*(.+?)\Z"
            )
            m = re.search(pat, opt_blob, re.S | re.I)
            if m:
                ob = re.sub(r"\s+", " ", m.group(1)).strip()
                ob = re.split(r"\bCorrect Answer\b", ob, maxsplit=1)[0].strip()
                if len(ob) > 5:
                    options.append(f"{letter}. {ob}")
        ans = ""
        am = re.search(r"Correct Answer\s*[:\-]?\s*([A-F, /]+)", body, re.I)
        if am:
            ans = re.sub(r"[^A-F]", "", am.group(1).upper())
        if len(stem) > 25 and len(options) >= 2:
            items.append(
                {
                    "source": source,
                    "source_question_number": num,
                    "question_text": stem,
                    "answer_options": options,
                    "source_answer": ans,
                    "source_explanation": "",
                    "stem_hash": stem_hash(stem),
                }
            )
    return items


def main() -> None:
    import sys

    sys.path.insert(0, str(Path(__file__).resolve().parent))

    print("== dumps PDF ==")
    dumps = extract_dumps()
    print(
        json.dumps(
            {k: dumps[k] for k in dumps if k != "items"},
            indent=2,
        )
    )
    (OUT / "dumps-items.json").write_text(
        json.dumps(dumps["items"], indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print("== slide deck OCR ==")
    # Start with sample; escalate inside function
    slide = ocr_slide_sample_and_scan(max_pages=None)
    print(
        json.dumps(
            {k: slide[k] for k in slide if k not in ("items", "sample_preview")},
            indent=2,
        )
    )
    print("sample_preview:\n", slide.get("sample_preview", "")[:800])
    (OUT / "slide-items.json").write_text(
        json.dumps(slide["items"], indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    summary = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "dumps_parsed": len(dumps["items"]),
        "slide_parsed": len(slide["items"]),
        "slide_ocr_mode": slide.get("ocr_mode"),
        "out": str(OUT),
    }
    (OUT / "retry-summary.json").write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
