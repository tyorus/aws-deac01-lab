#!/usr/bin/env python3
"""Regenerate pembahasan for questions touched by audit patches.

Uses generate_pembahasan() then prepends/enriches with audit findings
(correct_solution_summary + docs) when available on q['audit_patch'].
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))

from enrich_pembahasan import generate_pembahasan  # noqa: E402

PRACTICE = ROOT / "aws-dea-c01" / "practice" / "research-questions.json"
APPLY = ROOT / "aws-dea-c01" / "practice" / "audit" / "apply-report.json"
PATCHES = ROOT / "aws-dea-c01" / "practice" / "audit" / "patches.json"


def enrich(q: dict) -> str:
    ap = q.get("audit_patch") or {}
    study = bool(ap.get("study_only") or q.get("has_answer_key") is False)
    if study:
        bits: list[str] = [
            "**Pembahasan (study-only):** Kunci jawaban belum dipastikan — soal ini tidak dinilai."
        ]
        summary = (ap.get("summary") or "").strip()
        if summary:
            bits.append(f"**Solusi yang dimaksud menurut dokumentasi AWS:** {summary}")
        cand = ap.get("candidate")
        if cand:
            bits.append(f"**Kandidat kunci (belum diaktifkan untuk grading):** **{cand}**.")
        docs = [d for d in (ap.get("docs") or []) if isinstance(d, str) and d.startswith("http")]
        if docs:
            bits.append("**Referensi dokumentasi:**\n" + "\n".join(f"- {d}" for d in docs[:4]))
        bits.append(
            "_Perbaiki opsi/stem yang hilang atau cacat, lalu aktifkan kembali kunci setelah review._"
        )
        return "\n\n".join(bits)

    base = generate_pembahasan(q)
    bits = []
    summary = (ap.get("summary") or "").strip()
    if summary:
        bits.append(f"**Temuan audit (dokumen AWS):** {summary}")
    docs = [d for d in (ap.get("docs") or []) if isinstance(d, str) and d.startswith("http")]
    if docs:
        bits.append("**Referensi dokumentasi:**\n" + "\n".join(f"- {d}" for d in docs[:4]))
    conf = ap.get("confidence")
    if conf:
        bits.append(f"_Keyakinan audit: {conf}_")
    if not bits:
        return base
    parts = base.split("\n\n", 1)
    if len(parts) == 2:
        return parts[0] + "\n\n" + "\n\n".join(bits) + "\n\n" + parts[1]
    return base + "\n\n" + "\n\n".join(bits)


def main() -> None:
    bank = json.loads(PRACTICE.read_text(encoding="utf-8"))
    if isinstance(bank, dict):
        qs = bank.get("questions") or []
        wrap = bank
    else:
        qs = bank
        wrap = None

    regen_ids: set[str] = set()
    if APPLY.exists():
        rep = json.loads(APPLY.read_text(encoding="utf-8"))
        regen_ids.update(rep.get("unique_regen") or [])
    # Juga regen semua yang punya audit_patch
    for q in qs:
        if q.get("audit_patch"):
            regen_ids.add(q["id"])

    # Study-only dari patches tanpa audit_patch (safety)
    if PATCHES.exists():
        for p in json.loads(PATCHES.read_text(encoding="utf-8")).get("patches") or []:
            acts = p.get("action")
            acts = acts if isinstance(acts, list) else [acts]
            if "fix_key" in acts or "set_study_only_until_reviewed" in acts or "fix_structure" in acts:
                regen_ids.add(p["id"])

    n = 0
    for q in qs:
        if q["id"] not in regen_ids:
            continue
        # Skip removed (sudah tidak ada)
        q["explanation"] = enrich(q)
        q["explanation_origin"] = "generated_explanatory_audit_v1"
        n += 1

    out = wrap if wrap is not None else qs
    if wrap is not None:
        wrap["questions"] = qs
        out = wrap
    PRACTICE.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"regenerated": n, "total": len(qs), "targeted": len(regen_ids)}, indent=2))


if __name__ == "__main__":
    main()
