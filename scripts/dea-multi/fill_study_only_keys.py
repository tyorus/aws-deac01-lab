#!/usr/bin/env python3
"""Fill missing answer keys + pembahasan for study-only bank items.

Priority:
1) sibling keyed question with same core stem
2) multi-source / examtopics answer match
3) slide practice WORKED-page heuristic
4) keyword heuristic key (marked uncertain) + generated pembahasan
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(Path(__file__).resolve().parent))

from enrich_pembahasan import generate_pembahasan, stem_hash  # noqa: E402
from parse_slide_practice_exams import (  # noqa: E402
    load_pages,
    page_kind,
    parse_worked_page,
    pick_correct_letters,
)

PRACTICE = ROOT / "aws-dea-c01" / "practice" / "research-questions.json"
MS = ROOT / "aws-dea-c01" / "_work" / "multi-source" / "all-questions.json"
ET = ROOT / "aws-dea-c01" / "_work" / "examtopics" / "normalized" / "questions.json"
EXAMS = ROOT / "aws-dea-c01" / "_work" / "compiled" / "pdf-retry" / "slide-practice-exams.json"


def norm_ws(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()


def core_stem(stem: str) -> str:
    s = stem or ""
    s = re.sub(r"^Question\s*#:\s*\d+[\s\S]*?Questions\]\s*", "", s, flags=re.I)
    s = re.sub(r"\(\s*Choose\s+(two|three|four|five)\.?\s*\)", "", s, flags=re.I)
    s = re.sub(r"[^a-z0-9]+", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()[-160:]


def choose_n(stem: str) -> int:
    m = re.search(r"\(\s*Choose\s+(two|three|four|five)\.?\s*\)", stem or "", re.I)
    if not m:
        if re.search(r"Select\s*Two", stem or "", re.I):
            return 2
        return 0
    return {"two": 2, "three": 3, "four": 4, "five": 5}[m.group(1).lower()]


def is_study(q: dict) -> bool:
    correct = [o for o in q.get("options") or [] if o.get("correct")]
    if q.get("has_answer_key") is False:
        return True
    return len(correct) == 0


def apply_letters(q: dict, letters: str) -> bool:
    letters = re.sub(r"[^A-F]", "", (letters or "").upper())
    if not letters:
        return False
    n = choose_n(q.get("stem") or "")
    if n and len(set(letters)) != n:
        # still apply if we have at least one; choose-n mismatch stays study unless exact
        if len(set(letters)) < 1:
            return False
    labels = {o.get("label") for o in q.get("options") or []}
    if not any(L in labels for L in letters):
        return False
    for o in q.get("options") or []:
        o["correct"] = o.get("label") in letters
    correct_n = sum(1 for o in q.get("options") or [] if o.get("correct"))
    if correct_n < 1:
        return False
    if n and correct_n != n:
        q["has_answer_key"] = False
        q["type"] = "multi" if n > 1 or correct_n > 1 else "single"
        return False
    q["has_answer_key"] = True
    q["type"] = "multi" if correct_n > 1 or n > 1 else "single"
    q["verification_status"] = q.get("verification_status") or "community"
    return True


def option_overlap(a: list[dict], b: list[dict]) -> float:
    ab = {norm_ws(o.get("body") or "").lower()[:60] for o in a}
    bb = {norm_ws(o.get("body") or "").lower()[:60] for o in b}
    if not ab or not bb:
        return 0.0
    return len(ab & bb) / max(len(ab), len(bb))


def recover_from_sibling(study: dict, keyed: list[dict]) -> str | None:
    c = core_stem(study.get("stem") or "")
    if len(c) < 40:
        return None
    best = None
    best_score = 0.0
    for k in keyed:
        if k.get("id") == study.get("id"):
            continue
        if core_stem(k.get("stem") or "") != c:
            continue
        score = option_overlap(study.get("options") or [], k.get("options") or [])
        # prefer more options / more corrects
        score += 0.05 * len(k.get("options") or [])
        if score > best_score:
            best_score = score
            best = k
    if not best:
        return None
    # If sibling has richer options, copy them
    if len(best.get("options") or []) > len(study.get("options") or []):
        study["options"] = [{**o} for o in best["options"]]
        study["stem"] = best.get("stem") or study.get("stem")
    letters = "".join(o["label"] for o in best.get("options") or [] if o.get("correct"))
    if apply_letters(study, letters):
        study["verification_status"] = "community"
        study["explanation_origin"] = "recovered_sibling"
        return letters
    return None


def load_source_answers() -> dict[str, str]:
    """stem_hash / core -> answer letters"""
    out: dict[str, str] = {}

    def add(stem: str, ans: str) -> None:
        ans = re.sub(r"[^A-F]", "", (ans or "").upper())
        if not stem or not ans:
            return
        out[stem_hash(stem)] = ans
        out[core_stem(stem)] = ans

    if MS.exists():
        doc = json.loads(MS.read_text(encoding="utf-8"))
        for r in doc.get("records") or []:
            add(r.get("question_text") or "", r.get("source_answer") or "")
    if ET.exists():
        for r in json.loads(ET.read_text(encoding="utf-8")):
            add(r.get("question_text") or "", r.get("examtopics_answer") or "")
    if EXAMS.exists():
        for it in json.loads(EXAMS.read_text(encoding="utf-8")).get("items") or []:
            add(it.get("question_text") or "", it.get("source_answer") or "")
    return out


def recover_from_sources(study: dict, source_ans: dict[str, str]) -> str | None:
    stem = study.get("stem") or ""
    ans = source_ans.get(stem_hash(stem)) or source_ans.get(core_stem(stem))
    if not ans:
        return None
    if apply_letters(study, ans):
        study["verification_status"] = "community"
        study["explanation_origin"] = "recovered_source"
        return ans
    return None


def recover_from_slide_worked(study: dict, worked_by_q: dict[tuple[int, int], dict]) -> str | None:
    meta = study.get("source_meta") or {}
    if meta.get("source") != "pdf_slide_practice_exam":
        return None
    # Find matching exam item page via stem hash in EXAMS file
    if not EXAMS.exists():
        return None
    items = json.loads(EXAMS.read_text(encoding="utf-8")).get("items") or []
    h = meta.get("stem_hash") or stem_hash(study.get("stem") or "")
    hit = next((it for it in items if it.get("stem_hash") == h), None)
    if not hit:
        return None
    page = hit.get("page")
    exam = hit.get("exam_number") or 1
    qn = ((hit.get("source_question_number") or 1) - 1) % 20 + 1
    # nearest worked
    for (e, n), w in worked_by_q.items():
        if n == qn and w["page"] > (page or 0) and w["page"] - (page or 0) <= 5:
            want = choose_n(study.get("stem") or "") or 1
            letters = pick_correct_letters(study.get("options") or [], w.get("raw") or "", want=want)
            expl = w.get("source_explanation") or ""
            if expl and len(expl) > 40:
                study["explanation"] = (
                    f"**Pembahasan:** Jawaban yang tepat adalah **{letters or '?'}**.\n\n{expl}"
                    if letters
                    else f"**Pembahasan:**\n\n{expl}"
                )
            if letters and apply_letters(study, letters):
                study["verification_status"] = "community"
                study["explanation_origin"] = "slide_worked"
                return letters
            break
    return None


def heuristic_pick(study: dict) -> str:
    """Best-effort key from stem/option keyword alignment for study use."""
    stem = (study.get("stem") or "").lower()
    opts = study.get("options") or []
    n = choose_n(study.get("stem") or "") or 1
    scores = []
    for o in opts:
        body = (o.get("body") or "").lower()
        score = 0
        # Positive alignments
        if "least operational" in stem or "least development" in stem:
            if any(k in body for k in ("managed", "serverless", "glue", "step functions", "lake formation")):
                score += 2
            if any(k in body for k in ("ec2", "always on", "manual", "custom code")):
                score -= 2
        if "real-time" in stem or "within seconds" in stem or "continuously" in stem:
            if any(k in body for k in ("kinesis", "stream", "msk", "kafka", "firehose")):
                score += 2
            if "athena" in body and "second" in stem:
                score -= 1
        if "cost" in stem or "bill" in stem:
            if any(k in body for k in ("parquet", "partition", "intelligent-tiering", "compression", "column")):
                score += 2
            if "select *" in body or "select star" in body:
                score -= 1
        if "governance" in stem or "access control" in stem or "row-level" in stem:
            if "lake formation" in body:
                score += 3
        if "hot" in stem or "throttl" in stem or "shard" in stem:
            if "random" in body or "composite" in body:
                score += 3
            if "increase the shard" in body:
                score -= 2
        if "cpu bound" in stem or "cpu-bound" in stem:
            if "increase the memory" in body or "measure" in body:
                score += 3
            if "reduce the memory" in body or "halve" in body:
                score -= 2
        if "small files" in stem or "many small" in stem or "forty thousand files" in stem:
            if "coalesce" in body or "repartition" in body:
                score += 3
        if "data quality" in stem or "missing" in stem and "currency" in stem:
            if "glue data quality" in body or "data quality" in body:
                score += 3
        # generic managed > DIY
        if "least" in stem and "emr" in body and "serverless" not in body:
            score -= 1
        scores.append((score, o.get("label") or ""))

    scores.sort(key=lambda x: (-x[0], x[1]))
    picked = [lab for sc, lab in scores if lab][:n]
    # ensure we always pick n options
    if len(picked) < n:
        for _, lab in scores:
            if lab not in picked:
                picked.append(lab)
            if len(picked) >= n:
                break
    return "".join(sorted(picked))


def build_worked_index():
    pages = load_pages()
    out = {}
    for i, text in pages.items():
        if i < 910:
            continue
        if page_kind(text) != "worked":
            continue
        w = parse_worked_page(text, i)
        if not w:
            continue
        # exam inferred later; key by question number + page for nearest search
        out[(0, w["question_number"], w["page"])] = w
    # simplify structure for lookup by qn list
    by_qn: dict[int, list[dict]] = {}
    for (_, qn, _), w in out.items():
        by_qn.setdefault(qn, []).append(w)
    for qn in by_qn:
        by_qn[qn].sort(key=lambda w: w["page"])
    return by_qn


def main() -> None:
    bank = json.loads(PRACTICE.read_text(encoding="utf-8"))
    if isinstance(bank, dict):
        bank = bank.get("questions") or []

    keyed = [q for q in bank if not is_study(q)]
    study_list = [q for q in bank if is_study(q)]
    source_ans = load_source_answers()
    worked_by_qn = build_worked_index()

    stats = {
        "study_before": len(study_list),
        "sibling": 0,
        "source": 0,
        "slide_worked": 0,
        "heuristic": 0,
        "still_study": 0,
    }

    by_id = {q["id"]: q for q in bank}

    for q in study_list:
        cur = by_id[q["id"]]
        letters = recover_from_sibling(cur, keyed)
        if letters:
            stats["sibling"] += 1
            cur["explanation"] = generate_pembahasan(cur)
            keyed.append(cur)
            continue

        letters = recover_from_sources(cur, source_ans)
        if letters:
            stats["source"] += 1
            if not cur.get("explanation") or "belum tersedia" in (cur.get("explanation") or "").lower():
                cur["explanation"] = generate_pembahasan(cur)
            keyed.append(cur)
            continue

        # slide worked nearest by question number from source_meta number
        meta = cur.get("source_meta") or {}
        if meta.get("source") == "pdf_slide_practice_exam":
            # try all worked with matching qn near unknown page — use EXAMS page
            letters = None
            if EXAMS.exists():
                items = json.loads(EXAMS.read_text(encoding="utf-8")).get("items") or []
                h = meta.get("stem_hash")
                hit = next((it for it in items if it.get("stem_hash") == h), None)
                if hit:
                    qn = ((hit.get("source_question_number") or 1) - 1) % 20 + 1
                    page = hit.get("page") or 0
                    for w in worked_by_qn.get(qn, []):
                        if w["page"] > page and w["page"] - page <= 5:
                            want = choose_n(cur.get("stem") or "") or 1
                            letters = pick_correct_letters(
                                cur.get("options") or [], w.get("raw") or "", want=want
                            )
                            expl = w.get("source_explanation") or ""
                            if letters and apply_letters(cur, letters):
                                cur["explanation"] = (
                                    f"**Pembahasan:** Jawaban yang tepat adalah **{letters}**.\n\n{expl}"
                                )
                                cur["explanation_origin"] = "slide_worked"
                                cur["verification_status"] = "community"
                                stats["slide_worked"] += 1
                                keyed.append(cur)
                                letters = "done"
                            break
            if letters == "done":
                continue

        # heuristic fallback — always produce a key for drill usability
        letters = heuristic_pick(cur)
        if apply_letters(cur, letters):
            cur["verification_status"] = "uncertain"
            cur["explanation_origin"] = "generated_heuristic_key"
            cur["explanation"] = generate_pembahasan(cur) + (
                "\n\n_Kunci diisi otomatis (heuristic) karena sumber tidak menyediakan answer key; "
                "verifikasi ulang ke dokumentasi AWS / materi resmi._"
            )
            stats["heuristic"] += 1
            keyed.append(cur)
        else:
            # force mark first N options if apply failed
            n = choose_n(cur.get("stem") or "") or 1
            for i, o in enumerate(cur.get("options") or []):
                o["correct"] = i < n
            cur["has_answer_key"] = True
            cur["type"] = "multi" if n > 1 else "single"
            cur["verification_status"] = "uncertain"
            cur["explanation_origin"] = "generated_heuristic_key"
            cur["explanation"] = generate_pembahasan(cur)
            stats["heuristic"] += 1

    # refresh study count
    stats["still_study"] = sum(1 for q in bank if is_study(q))
    stats["keyed_after"] = sum(1 for q in bank if not is_study(q))
    stats["total"] = len(bank)

    PRACTICE.write_text(json.dumps(bank, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
