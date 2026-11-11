from __future__ import annotations

from collections import defaultdict
from typing import Any

from rapidfuzz import fuzz

from schema import normalize_text


def _option_letters(options: list[str]) -> list[str]:
    out = []
    for o in options:
        o = o.strip()
        if len(o) >= 2 and o[0].upper() in "ABCDEF" and o[1] in ".)":
            out.append(o[0].upper())
        else:
            out.append(normalize_text(o)[:40])
    return out


def _norm_answer(ans: str) -> str:
    return "".join(sorted(ch for ch in (ans or "").upper() if ch in "ABCDEF"))


def similarity(a: str, b: str) -> float:
    na, nb = normalize_text(a), normalize_text(b)
    if not na or not nb:
        return 0.0
    if na == nb:
        return 100.0
    return float(
        max(
            fuzz.token_set_ratio(na, nb),
            fuzz.token_sort_ratio(na, nb),
            fuzz.partial_ratio(na, nb) * 0.98,
        )
    )


def match_records(records: list[dict]) -> dict[str, Any]:
    # Only match non-empty stems
    usable = [r for r in records if (r.get("question_text") or "").strip()]
    n = len(usable)

    # Group by exact stem_hash first
    by_hash: dict[str, list[dict]] = defaultdict(list)
    for r in usable:
        by_hash[r["stem_hash"]].append(r)

    matches: list[dict] = []
    matched_pairs: set[tuple[str, str]] = set()

    # Exact / normalized groups
    for h, group in by_hash.items():
        sources = sorted({g["source"] for g in group})
        if len(group) < 2:
            continue
        ids = [g["record_id"] for g in group]
        for g in group:
            g["matching_question_ids"] = sorted(
                set(g.get("matching_question_ids") or []) | set(ids) - {g["record_id"]}
            )
            g["similarity_score"] = 100.0
            # unify canonical_id already same via stem hash
        answers = {_norm_answer(g.get("source_answer", "")) for g in group if g.get("source_answer")}
        matches.append(
            {
                "match_type": "exact_stem_hash",
                "similarity_score": 100.0,
                "canonical_id": group[0]["canonical_id"],
                "record_ids": ids,
                "sources": sources,
                "source_question_numbers": [
                    g.get("source_question_number") for g in group
                ],
                "answers": {g["record_id"]: g.get("source_answer") for g in group},
                "answer_conflict": len(answers) > 1,
                "option_letter_sequences": {
                    g["record_id"]: _option_letters(g.get("answer_options") or [])
                    for g in group
                },
            }
        )
        for i in range(len(ids)):
            for j in range(i + 1, len(ids)):
                matched_pairs.add(tuple(sorted((ids[i], ids[j]))))

    # Fuzzy across different hashes (cap comparisons: by source pairs of interest)
    # Index by source
    by_source: dict[str, list[dict]] = defaultdict(list)
    for r in usable:
        by_source[r["source"]].append(r)

    pairs_to_compare = [
        ("examtopics", "examice"),
        ("github_examtopics_cache", "examice"),
        ("examtopics", "github_examtopics_cache"),
    ]

    high = []
    likely = []
    for sa, sb in pairs_to_compare:
        la, lb = by_source.get(sa, []), by_source.get(sb, [])
        for a in la:
            best = None
            for b in lb:
                if a["stem_hash"] == b["stem_hash"]:
                    continue
                key = tuple(sorted((a["record_id"], b["record_id"])))
                if key in matched_pairs:
                    continue
                score = similarity(a["question_text"], b["question_text"])
                if best is None or score > best[0]:
                    best = (score, b)
            if not best:
                continue
            score, b = best
            if score < 85:
                continue
            key = tuple(sorted((a["record_id"], b["record_id"])))
            if key in matched_pairs:
                continue
            matched_pairs.add(key)
            a["matching_question_ids"] = sorted(
                set(a.get("matching_question_ids") or []) | {b["record_id"]}
            )
            b["matching_question_ids"] = sorted(
                set(b.get("matching_question_ids") or []) | {a["record_id"]}
            )
            a["similarity_score"] = max(a.get("similarity_score") or 0, score)
            b["similarity_score"] = max(b.get("similarity_score") or 0, score)
            # Align canonical to higher score partner's if fuzzy high
            if score >= 95:
                b["canonical_id"] = a["canonical_id"]
            entry = {
                "match_type": "high_similarity" if score >= 95 else "likely_similarity",
                "similarity_score": round(score, 2),
                "canonical_id": a["canonical_id"],
                "record_ids": [a["record_id"], b["record_id"]],
                "sources": [a["source"], b["source"]],
                "source_question_numbers": [
                    a.get("source_question_number"),
                    b.get("source_question_number"),
                ],
                "answers": {
                    a["record_id"]: a.get("source_answer"),
                    b["record_id"]: b.get("source_answer"),
                },
                "answer_conflict": bool(
                    a.get("source_answer")
                    and b.get("source_answer")
                    and _norm_answer(a["source_answer"])
                    != _norm_answer(b["source_answer"])
                ),
                "stems_preview": [
                    (a["question_text"] or "")[:160],
                    (b["question_text"] or "")[:160],
                ],
            }
            if score >= 95:
                high.append(entry)
            else:
                likely.append(entry)
            matches.append(entry)

    # Conflicts
    conflicts = []
    by_cid: dict[str, list[dict]] = defaultdict(list)
    for r in usable:
        if r.get("canonical_id"):
            by_cid[r["canonical_id"]].append(r)
    for cid, group in by_cid.items():
        ans_map = {}
        for g in group:
            na = _norm_answer(g.get("source_answer", ""))
            if not na:
                continue
            ans_map.setdefault(na, []).append(g)
        if len(ans_map) > 1:
            conflicts.append(
                {
                    "canonical_id": cid,
                    "answers": {
                        k: [
                            {
                                "record_id": g["record_id"],
                                "source": g["source"],
                                "source_question_number": g.get(
                                    "source_question_number"
                                ),
                                "source_answer": g.get("source_answer"),
                                "source_url": g.get("source_url"),
                            }
                            for g in v
                        ]
                        for k, v in ans_map.items()
                    },
                    "stem_preview": (group[0].get("question_text") or "")[:200],
                }
            )

    # Unique: canonicals that appear in only one source family
    def family(src: str) -> str:
        if src in ("examtopics", "github_examtopics_cache"):
            return "examtopics_family"
        return src

    unique = []
    for cid, group in by_cid.items():
        fams = {family(g["source"]) for g in group}
        if len(fams) == 1:
            unique.append(
                {
                    "canonical_id": cid,
                    "source_family": next(iter(fams)),
                    "sources": sorted({g["source"] for g in group}),
                    "record_ids": [g["record_id"] for g in group],
                    "source_question_numbers": [
                        g.get("source_question_number") for g in group
                    ],
                    "stem_preview": (group[0].get("question_text") or "")[:200],
                }
            )

    # Stats for ExamTopics vs Examice intersection
    et_cids = {
        r["canonical_id"]
        for r in usable
        if r["source"] in ("examtopics", "github_examtopics_cache")
        and r["canonical_id"]
    }
    ei_cids = {
        r["canonical_id"]
        for r in usable
        if r["source"] == "examice" and r["canonical_id"]
    }
    shared = et_cids & ei_cids

    # Also count high fuzzy matches between families even if cid not yet unified
    fuzzy_shared_pairs = [
        m
        for m in matches
        if m["match_type"] in ("high_similarity", "likely_similarity")
        and set(m["sources"]) & {"examice"}
        and (
            set(m["sources"]) & {"examtopics", "github_examtopics_cache"}
        )
    ]

    return {
        "matches": matches,
        "exact_groups": sum(1 for m in matches if m["match_type"] == "exact_stem_hash"),
        "high_similarity": high,
        "likely_similarity": likely,
        "conflicts": conflicts,
        "unique": unique,
        "stats": {
            "usable_records": n,
            "unique_canonical_ids": len(by_cid),
            "examtopics_family_canonicals": len(et_cids),
            "examice_canonicals": len(ei_cids),
            "shared_canonicals_exact_or_unified": len(shared),
            "fuzzy_examtopics_examice_pairs": len(fuzzy_shared_pairs),
            "conflict_count": len(conflicts),
            "unique_to_one_family": len(unique),
        },
    }
