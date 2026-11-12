#!/usr/bin/env python3
"""Replace stub compiler explanations with full generated pembahasan."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))

from enrich_pembahasan import generate_pembahasan, is_placeholder  # noqa: E402

PRACTICE = ROOT / "aws-dea-c01" / "practice" / "research-questions.json"

STUB_RE = re.compile(
    r"Answer key from local source|Kunci jawaban belum tersedia|"
    r"third-party keys are not official|Verify against AWS docs",
    re.I,
)


def is_stub(expl: str) -> bool:
    e = (expl or "").strip()
    if len(e) < 80:
        return True
    if STUB_RE.search(e):
        return True
    if is_placeholder(e):
        return True
    return False


def main() -> None:
    bank = json.loads(PRACTICE.read_text(encoding="utf-8"))
    if isinstance(bank, dict):
        bank = bank.get("questions") or []

    replaced = 0
    kept = 0
    for q in bank:
        expl = q.get("explanation") or ""
        if not is_stub(expl):
            kept += 1
            continue
        q["explanation"] = generate_pembahasan(q)
        q["explanation_origin"] = "generated_study_notes"
        replaced += 1

    PRACTICE.write_text(json.dumps(bank, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"replaced": replaced, "kept": kept, "total": len(bank)}, indent=2))


if __name__ == "__main__":
    main()
