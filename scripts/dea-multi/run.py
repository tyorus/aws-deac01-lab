from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
if str(HERE) not in sys.path:
    sys.path.insert(0, str(HERE))

from discover import discover_sources  # noqa: E402
from extract_examice import extract_examice  # noqa: E402
from load_examtopics import load_examtopics  # noqa: E402
from load_other import load_other  # noqa: E402
from match import match_records  # noqa: E402
from paths import OUT, ensure_dirs  # noqa: E402
from report import (  # noqa: E402
    build_extraction_report,
    build_source_comparison,
    write_json,
)


def main() -> None:
    ensure_dirs()
    print("== discover ==")
    sources_doc = discover_sources()
    write_json(OUT / "sources.json", sources_doc)
    print(f"sources: {len(sources_doc.get('sources') or [])}")

    print("== load examtopics ==")
    examtopics = load_examtopics()
    write_json(
        OUT / "examtopics.json",
        {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "count": len(examtopics),
            "records": examtopics,
        },
    )
    print(f"examtopics records: {len(examtopics)}")

    print("== extract examice ==")
    examice = extract_examice()
    preview = examice.get("records") or []
    stubs = examice.get("inaccessible_stubs") or []
    write_json(
        OUT / "examice.json",
        {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "url": "https://examice.com/exams/amazon/dea-c01",
            "claimed_count": examice.get("claimed_count"),
            "locked": examice.get("locked"),
            "locked_count": examice.get("locked_count"),
            "preview_count": len(preview),
            "inaccessible_stub_count": len(stubs),
            "fetch": examice.get("fetch"),
            "pagination_probes": examice.get("pagination_probes"),
            "records": preview,
            "inaccessible_stubs": stubs,
        },
    )
    print(
        f"examice preview={len(preview)} locked_stubs={len(stubs)} "
        f"claimed={examice.get('claimed_count')}"
    )

    print("== load other public samples ==")
    other = load_other()
    write_json(
        OUT / "other-sources.json",
        {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "count": len(other),
            "records": other,
        },
    )
    print(f"other records: {len(other)}")

    print("== unify + match ==")
    all_questions = list(examtopics) + list(preview) + list(stubs) + list(other)
    match_result = match_records([r for r in all_questions if r.get("question_text")])

    id_to_rec = {r["record_id"]: r for r in all_questions if r.get("record_id")}
    for m in match_result["matches"]:
        srcs = set(m.get("sources") or [])
        if "examice" in srcs and (
            "examtopics" in srcs or "github_examtopics_cache" in srcs
        ):
            for rid in m.get("record_ids") or []:
                rec = id_to_rec.get(rid)
                if rec:
                    rec["authenticity_bucket"] = "C"
                    rec["similarity_score"] = m.get("similarity_score")

    write_json(
        OUT / "all-questions.json",
        {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "count": len(all_questions),
            "records": all_questions,
        },
    )
    write_json(
        OUT / "cross-source-matches.json",
        {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "stats": match_result["stats"],
            "matches": match_result["matches"],
            "high_similarity": match_result["high_similarity"],
            "likely_similarity": match_result["likely_similarity"],
        },
    )
    write_json(
        OUT / "unique-questions.json",
        {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "count": len(match_result["unique"]),
            "items": match_result["unique"],
        },
    )
    write_json(
        OUT / "conflicting-answers.json",
        {
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "count": len(match_result["conflicts"]),
            "items": match_result["conflicts"],
        },
    )

    print("== reports ==")
    build_extraction_report(
        out=OUT,
        sources_doc=sources_doc,
        examtopics=examtopics,
        examice_preview=preview,
        examice_inaccessible=stubs,
        all_questions=all_questions,
        match_result=match_result,
        examice_meta=examice,
    )
    build_source_comparison(
        out=OUT,
        match_result=match_result,
        examice_preview=preview,
        examtopics=examtopics,
    )

    summary = {
        "examtopics_records": len(examtopics),
        "examice_preview": len(preview),
        "examice_locked_stubs": len(stubs),
        "all_questions": len(all_questions),
        "match_stats": match_result["stats"],
        "out": str(OUT),
    }
    write_json(OUT / "run-summary.json", summary)
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
