from __future__ import annotations

import hashlib
import re
from typing import Any


def normalize_text(text: str) -> str:
    t = (text or "").lower()
    t = re.sub(r"[^a-z0-9]+", " ", t)
    return re.sub(r"\s+", " ", t).strip()


def stem_hash(text: str) -> str:
    return hashlib.sha1(normalize_text(text).encode("utf-8")).hexdigest()[:16]


def canonical_id(question_text: str) -> str:
    return f"cid_{stem_hash(question_text)}"


def record_id(source: str, question_text: str, number: int | None = None) -> str:
    base = f"{source}:{number if number is not None else 'x'}:{stem_hash(question_text)}"
    return hashlib.sha1(base.encode("utf-8")).hexdigest()[:20]


def make_record(
    *,
    source: str,
    question_text: str,
    answer_options: list[str] | None = None,
    source_answer: str = "",
    source_explanation: str = "",
    source_question_number: int | None = None,
    source_url: str = "",
    question_type: str = "multiple_choice",
    extraction_status: str = "complete",
    authenticity_bucket: str = "E",
    access_limitation: str = "none",
    provenance_detail: str = "",
    extra: dict[str, Any] | None = None,
) -> dict[str, Any]:
    options = answer_options or []
    rid = record_id(source, question_text, source_question_number)
    cid = canonical_id(question_text) if question_text else ""
    rec: dict[str, Any] = {
        "record_id": rid,
        "canonical_id": cid,
        "source": source,
        "source_question_number": source_question_number,
        "source_url": source_url,
        "question_text": question_text,
        "question_type": question_type,
        "answer_options": options,
        "source_answer": (source_answer or "").strip(),
        "source_explanation": source_explanation or "",
        "matching_question_ids": [],
        "similarity_score": None,
        "extraction_status": extraction_status,
        "verification_status": "source_as_extracted",
        "authenticity_bucket": authenticity_bucket,
        "access_limitation": access_limitation,
        "provenance_detail": provenance_detail,
        "stem_hash": stem_hash(question_text) if question_text else "",
    }
    if extra:
        rec.update(extra)
    return rec


def infer_question_type(options: list[str], answer: str) -> str:
    if len(answer.replace(",", "").replace(" ", "")) >= 2:
        return "multiple_response"
    if len(options) >= 5 and len(answer) >= 2:
        return "multiple_response"
    return "multiple_choice"
