from __future__ import annotations

import json
import re
from pathlib import Path

from paths import RAW
from schema import infer_question_type, make_record, normalize_text


def _clean(t: str) -> str:
    return re.sub(r"\s+", " ", t or "").strip()


def load_cloudpass_samples() -> list[dict]:
    path = RAW / "other" / "cloudpass-dea-c01.html"
    if not path.exists():
        return []
    html = path.read_text(encoding="utf-8")
    records = []
    # Landing page sample from prior recon: DataBrew NEST_TO_MAP style item
    # Try to find a practice question block
    m = re.search(
        r"(An online marketplace[\s\S]{50,1200}?LEAST coding effort\?)",
        html,
        re.I,
    )
    stem = _clean(m.group(1)) if m else ""
    options = []
    for letter, body in re.findall(
        r"([A-D])\s+(Use AWS Glue DataBrew[\s\S]{10,200}?\.|Create an AWS Lambda[\s\S]{10,200}?\.)",
        html,
    ):
        options.append(f"{letter}. {_clean(body)}")
    # Dedup options
    seen = set()
    opts = []
    for o in options:
        if o in seen:
            continue
        seen.add(o)
        opts.append(o)
    answer = ""
    if re.search(r"NEST_TO_MAP creates", html, re.I):
        answer = "B"
    if stem and opts:
        records.append(
            make_record(
                source="cloudpass",
                question_text=stem,
                answer_options=opts[:4],
                source_answer=answer,
                source_explanation="",
                source_question_number=None,
                source_url="https://www.cloudpass.pro/en/exams/aws/aws-dea-c01",
                question_type=infer_question_type(opts[:4], answer),
                extraction_status="complete" if answer and len(opts) >= 2 else "partial",
                authenticity_bucket="E",
                provenance_detail="cloudpass_landing_sample",
            )
        )
    return records


def load_certqna_titles() -> list[dict]:
    summary = RAW / "other" / "certqna-summary.json"
    if not summary.exists():
        return []
    data = json.loads(summary.read_text(encoding="utf-8"))
    records = []
    for i, link in enumerate(data.get("sample_links") or [], start=1):
        title = _clean(link.get("title") or "")
        if len(title) < 25:
            continue
        # Titles alone are not full questions — mark partial/stem_only
        records.append(
            make_record(
                source="certqna",
                question_text=title,
                answer_options=[],
                source_answer="",
                source_question_number=i,
                source_url="https://certqna.com" + (link.get("path") or ""),
                extraction_status="partial",
                authenticity_bucket="E",
                access_limitation="listing_title_only",
                provenance_detail="certqna_listing_title",
            )
        )
    return records


def load_other() -> list[dict]:
    return load_cloudpass_samples() + load_certqna_titles()
