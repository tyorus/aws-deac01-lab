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
    r"Kunci jawaban belum tersedia",
    re.I,
)

# Keep richer hand/source/slide narratives unless they also contain the weak template.
KEEP_ORIGINS = {"source", "slide_worked", "existing"}


def main() -> None:
    bank = json.loads(PRACTICE.read_text(encoding="utf-8"))
    if isinstance(bank, dict):
        bank = bank.get("questions") or []

    regenerated = 0
    kept = 0
    for q in bank:
        expl = q.get("explanation") or ""
        origin = q.get("explanation_origin") or ""
        weak = bool(WEAK_RE.search(expl))
        if not weak and origin in KEEP_ORIGINS:
            kept += 1
            continue
        if not weak and len(expl) > 600 and "**Yang diminta soal**" in expl:
            kept += 1
            continue
        # Regenerate weak templates and short/generic notes
        if weak or origin in {
            "generated_study_notes",
            "generated_heuristic_key",
            "recovered_sibling",
            "",
        }:
            # Preserve slide worked narrative body if present after a stub header
            q["explanation"] = generate_pembahasan(q)
            q["explanation_origin"] = "generated_explanatory_v2"
            regenerated += 1
        else:
            kept += 1

    PRACTICE.write_text(json.dumps(bank, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(
        json.dumps(
            {"regenerated": regenerated, "kept": kept, "total": len(bank)},
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
