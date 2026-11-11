from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from paths import EXAMTOPICS_WORK
from schema import infer_question_type, make_record


def _read_json(path: Path) -> Any:
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def _read_jsonl(path: Path) -> list[dict]:
    if not path.exists():
        return []
    out = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            out.append(json.loads(line))
        except json.JSONDecodeError:
            continue
    return out


def _options_from(item: dict) -> list[str]:
    for key in ("answer_options", "choices", "questions"):
        val = item.get(key)
        if isinstance(val, list) and val:
            flat: list[str] = []
            for c in val:
                for part in str(c).split("\n"):
                    p = part.strip()
                    if p:
                        flat.append(p)
            return flat
    return []


def _stem_from(item: dict) -> str:
    return (
        item.get("question_text")
        or item.get("stem")
        or item.get("header")
        or ""
    ).strip()


def _answer_from(item: dict) -> str:
    return str(
        item.get("examtopics_answer")
        or item.get("source_answer")
        or item.get("answer")
        or ""
    ).strip()


def _status(stem: str, options: list[str], answer: str) -> str:
    if len(stem) > 20 and len(options) >= 2 and answer:
        return "complete"
    if len(stem) > 20 and (len(options) >= 2 or answer):
        return "partial"
    if len(stem) > 20:
        return "partial"
    return "inaccessible"


def load_examtopics() -> list[dict]:
    records: list[dict] = []
    seen: set[str] = set()

    def add(rec: dict) -> None:
        key = f"{rec['source']}:{rec['stem_hash']}:{rec.get('source_question_number')}"
        if key in seen:
            return
        seen.add(key)
        records.append(rec)

    # Prefer normalized questions (already deduped across ET sources)
    normalized = _read_json(EXAMTOPICS_WORK / "normalized" / "questions.json") or []
    for item in normalized:
        stem = _stem_from(item)
        options = _options_from(item)
        answer = _answer_from(item)
        prov = item.get("provenance") or "examtopics"
        if "cache" in prov:
            source = "github_examtopics_cache"
            bucket = "A"
            detail = "github_cache_via_normalized"
        elif "preview" in prov:
            source = "examtopics"
            bucket = "A"
            detail = "free_preview"
        else:
            source = "examtopics"
            bucket = "A"
            detail = prov
        add(
            make_record(
                source=source,
                question_text=stem,
                answer_options=options,
                source_answer=answer,
                source_explanation=item.get("examtopics_explanation") or "",
                source_question_number=item.get("question_number"),
                source_url=item.get("source_url") or "",
                question_type=infer_question_type(options, answer),
                extraction_status=item.get("extraction_status")
                or _status(stem, options, answer),
                authenticity_bucket=bucket,
                access_limitation=item.get("access_limitation") or "none",
                provenance_detail=detail,
            )
        )

    # Ensure raw cache items are represented even if normalize missed some
    cache = _read_json(EXAMTOPICS_WORK / "raw" / "cache-items.json")
    items = (cache or {}).get("items") if isinstance(cache, dict) else None
    if not items:
        legacy = _read_json(EXAMTOPICS_WORK / "dea-c01.json") or []
        items = [
            {
                "stem": d.get("header"),
                "choices": d.get("questions"),
                "source_answer": d.get("answer"),
                "source_url": d.get("question_link"),
            }
            for d in legacy
        ]
    for item in items or []:
        stem = _stem_from(item)
        if len(stem) < 20:
            continue
        options = _options_from(item)
        answer = _answer_from(item)
        add(
            make_record(
                source="github_examtopics_cache",
                question_text=stem,
                answer_options=options,
                source_answer=answer,
                source_question_number=None,
                source_url=item.get("source_url") or item.get("question_link") or "",
                question_type=infer_question_type(options, answer),
                extraction_status=_status(stem, options, answer),
                authenticity_bucket="A",
                provenance_detail="raw_cache_items",
            )
        )

    # Discussions (may add numbered variants)
    for item in _read_jsonl(EXAMTOPICS_WORK / "raw" / "discussions.jsonl"):
        stem = _stem_from(item)
        if len(stem) < 20:
            continue
        options = _options_from(item)
        answer = _answer_from(item)
        add(
            make_record(
                source="examtopics",
                question_text=stem,
                answer_options=options,
                source_answer=answer,
                source_question_number=item.get("question_number"),
                source_url=item.get("source_url") or "",
                question_type=infer_question_type(options, answer),
                extraction_status=_status(stem, options, answer),
                authenticity_bucket="A",
                provenance_detail="discussion_public",
            )
        )

    # Preview
    for item in _read_jsonl(EXAMTOPICS_WORK / "raw" / "preview-items.jsonl"):
        stem = _stem_from(item)
        if len(stem) < 20:
            continue
        options = _options_from(item)
        answer = _answer_from(item)
        add(
            make_record(
                source="examtopics",
                question_text=stem,
                answer_options=options,
                source_answer=answer,
                source_question_number=item.get("question_number"),
                source_url=item.get("source_url") or "",
                question_type=infer_question_type(options, answer),
                extraction_status=_status(stem, options, answer),
                authenticity_bucket="A",
                provenance_detail="free_preview_html",
            )
        )

    return records
