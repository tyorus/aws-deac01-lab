#!/usr/bin/env python3
"""Regenerate weak template pembahasan with the improved explanatory generator."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))

from enrich_pembahasan import generate_pembahasan  # noqa: E402

PRACTICE = ROOT / "aws-dea-c01" / "practice" / "research-questions.json"

WEAK_RE = re.compile(
    r"Opsi [A-F] paling sesuai karena:|"
    r"tidak memenuhi constraint utama soal|"
    r"Ini soal pilihan ganda majemuk; kombinasi berikut|"
    r"Answer key from local source|"
    r"Kunci jawaban belum tersedia|"
    r"hanya menutup sebagian gejala|"
    r"memakai pola yang tidak selaras dengan constraint utama stem|"
    r"fokus pada requirement inti stem:",
    re.I,
)

# Keep richer hand/source/slide narratives unless they also contain the weak template.
KEEP_ORIGINS = {"source", "slide_worked"}


def main() -> None:
    bank = json.loads(PRACTICE.read_text(encoding="utf-8"))
    doc = None
    if isinstance(bank, dict):
        doc = bank
        bank = bank.get("questions") or []

    regenerated = 0
    kept = 0
    for q in bank:
        expl = q.get("explanation") or ""
        origin = q.get("explanation_origin") or ""
        weak = bool(WEAK_RE.search(expl))
        # Always refresh vague wrong-option / framing templates
        if weak or origin in {
            "generated_study_notes",
            "generated_heuristic_key",
            "recovered_sibling",
            "generated_explanatory_v2",
            "existing",
            "",
        }:
            if not weak and origin in KEEP_ORIGINS:
                kept += 1
                continue
            q["explanation"] = generate_pembahasan(q)
            q["explanation_origin"] = "generated_explanatory_v3"
            regenerated += 1
        elif origin in KEEP_ORIGINS and not weak:
            kept += 1
        else:
            # Non-source but previously skipped long notes: still refresh if generic
            q["explanation"] = generate_pembahasan(q)
            q["explanation_origin"] = "generated_explanatory_v3"
            regenerated += 1

    out = doc if doc is not None else bank
    if doc is not None:
        doc["questions"] = bank
        out = doc
    PRACTICE.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {"regenerated": regenerated, "kept": kept, "total": len(bank)},
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
