from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

import httpx
from bs4 import BeautifulSoup

from paths import RAW
from schema import infer_question_type, make_record

EXAMICE_URL = "https://examice.com/exams/amazon/dea-c01"
USER_AGENT = (
    "Mozilla/5.0 (compatible; dea-multi-recon/0.1; +local-study-research)"
)


def _clean(text: str) -> str:
    return re.sub(r"\s+", " ", (text or "")).strip()


def _split_labeled_options(blob: str) -> list[str]:
    """Parse Examice 'Answer choices A ... Incorrect B ...' blobs into A/B/C... lines."""
    text = _clean(blob)
    text = re.sub(r"^Answer choices\s*", "", text, flags=re.I)
    text = re.sub(r"\s*Show answer.*$", "", text, flags=re.I)
    text = re.sub(r"\s*Hide answer.*$", "", text, flags=re.I)
    # Split before standalone option letters followed by text
    parts = re.split(r"(?=\b([A-F])\s+(?=[A-Z0-9]))", text)
    # re.split with group can interleave; rebuild
    options: list[str] = []
    # Prefer finditer of letter-marked options ending at Incorrect/Correct/Most voted/next letter
    for m in re.finditer(
        r"\b([A-F])\s+(.+?)(?=(?:\s+[A-F]\s+(?=[A-Z0-9]))|\s*$)",
        text,
        re.S,
    ):
        letter = m.group(1)
        body = _clean(m.group(2))
        body = re.sub(
            r"\s*(?:Most voted\s*)?(?:Correct|Incorrect)\s*$",
            "",
            body,
            flags=re.I,
        ).strip()
        body = re.sub(r"^\(\s*Choose two\.\s*\)\s*", "", body, flags=re.I)
        if body:
            options.append(f"{letter}. {body}")
    # Deduplicate while preserving order
    seen = set()
    out = []
    for o in options:
        if o in seen:
            continue
        seen.add(o)
        out.append(o)
    return out


def parse_examice_html(html: str, source_url: str) -> dict[str, Any]:
    soup = BeautifulSoup(html, "lxml")
    text = soup.get_text("\n", strip=True)

    claimed = None
    m = re.search(r"(\d+)\s*questions", text, re.I)
    if m:
        claimed = int(m.group(1))

    locked = bool(
        re.search(r"(\d+)\s+questions?\s+still\s+locked", text, re.I)
        or re.search(r"still locked", text, re.I)
    )
    locked_count = None
    lm = re.search(r"(\d+)\s+questions?\s+still\s+locked", text, re.I)
    if lm:
        locked_count = int(lm.group(1))

    records: list[dict] = []
    # Prefer structured blocks: "Question N of 366"
    blocks = re.split(r"(?=Question\s+\d+\s+of\s+\d+)", text)
    for block in blocks:
        qm = re.match(r"Question\s+(\d+)\s+of\s+(\d+)", block)
        if not qm:
            continue
        qnum = int(qm.group(1))
        body = block[qm.end() :].strip()

        # Stop at next meta sections
        body = re.split(
            r"(?:Show answer|Hide answer|### Correct answer|Correct answer:|Community votes|Discussion|Choose your plan|\d+\s+questions?\s+still\s+locked)",
            body,
            maxsplit=1,
            flags=re.I,
        )[0].strip()

        # Options often appear as blank-line separated after stem ending with ?
        # Heuristic: stem until first option-like paragraph after question mark
        ans_letter = ""
        explanation = ""

        # Pull answer/explanation from original block (full)
        full = block
        am = re.search(
            r"Correct answers?:\s*([A-F](?:\s*,\s*[A-F])*)", full, re.I
        )
        if am:
            ans_letter = re.sub(r"[^A-F]", "", am.group(1).upper())
        exp_m = re.search(
            r"Correct answers?:[^\n]*\n(.+?)(?:\nCommunity votes|\nDiscussion|\nQuestion\s+\d+|\Z)",
            full,
            re.I | re.S,
        )
        if exp_m:
            explanation = _clean(exp_m.group(1))

        # Stem + options from HTML cards if present
        stem = ""
        options: list[str] = []

        # Fallback plain parse: take text before answer, split lines
        plain_parts = [
            _clean(p)
            for p in re.split(r"\n+", body)
            if _clean(p)
            and not re.match(r"^(Show|Hide) answer", p, re.I)
        ]
        if plain_parts:
            # Find stem: accumulate until we hit a line that looks like an option
            # Examice options often lack A/B/C prefixes in markdown export — treat
            # consecutive short-to-medium paragraphs after stem question as options.
            joined = " ".join(plain_parts)
            # Better: locate question mark end of stem
            qmark = joined.find("?")
            if qmark != -1:
                stem = joined[: qmark + 1].strip()
                rest = joined[qmark + 1 :].strip()
            else:
                stem = plain_parts[0]
                rest = " ".join(plain_parts[1:])

            # Try HTML for choice buttons/list near this question
            # Will fill options below from soup cards

        records.append(
            {
                "_qnum": qnum,
                "_stem_guess": stem,
                "_plain_parts": plain_parts,
                "_answer": ans_letter,
                "_explanation": explanation,
            }
        )

    # Richer parse from HTML structure
    html_records: list[dict] = []
    # Look for headings / strong "Question N"
    for tag in soup.find_all(["h2", "h3", "h4", "strong", "div", "section"]):
        label = _clean(tag.get_text(" ", strip=True))
        qm = re.match(r"Question\s+(\d+)\s+of\s+(\d+)$", label)
        if not qm:
            continue
        qnum = int(qm.group(1))
        # Walk next siblings for stem/options/answer
        stem_parts: list[str] = []
        options: list[str] = []
        answer = ""
        explanation = ""
        node = tag.parent if tag.name == "strong" else tag
        for sib in list(node.next_siblings)[:40]:
            if getattr(sib, "get_text", None) is None:
                continue
            st = _clean(sib.get_text(" ", strip=True))
            if not st:
                continue
            if re.match(r"Question\s+\d+\s+of\s+\d+", st):
                break
            if re.search(r"still locked|Choose your plan", st, re.I):
                break
            if st.lower().startswith("correct answer"):
                am = re.search(r"Correct answers?:\s*([A-F,\s]+)", st, re.I)
                if am:
                    answer = re.sub(r"[^A-F]", "", am.group(1).upper())
                # explanation may follow in same or next
                rest = re.sub(r"^Correct answers?:[A-F,\s]*", "", st, flags=re.I).strip()
                if rest and len(rest) > 40:
                    explanation = rest
                continue
            if st.lower().startswith("community votes"):
                break
            if st in ("Show answer", "Hide answer"):
                continue
            # Collect stem until we have a question mark, then options
            if not stem_parts or (
                stem_parts and "?" not in " ".join(stem_parts)
            ):
                stem_parts.append(st)
            else:
                # option candidates: not too long headers
                if len(st) > 15 and not st.lower().startswith("correct"):
                    options.append(st)
        stem = _clean(" ".join(stem_parts))
        # Trim options that are actually explanation bleed
        options = [o for o in options if not o.lower().startswith("when dealing")]
        html_records.append(
            {
                "qnum": qnum,
                "stem": stem,
                "options": options,
                "answer": answer,
                "explanation": explanation,
            }
        )

    # Merge: prefer HTML records; fall back to plain
    by_num: dict[int, dict] = {}
    for hr in html_records:
        by_num[hr["qnum"]] = hr
    for pr in records:
        qn = pr["_qnum"]
        if qn not in by_num or len(by_num[qn].get("stem", "")) < 40:
            by_num[qn] = {
                "qnum": qn,
                "stem": pr["_stem_guess"],
                "options": [],
                "answer": pr["_answer"],
                "explanation": pr["_explanation"],
            }
        else:
            if not by_num[qn].get("answer"):
                by_num[qn]["answer"] = pr["_answer"]
            if not by_num[qn].get("explanation"):
                by_num[qn]["explanation"] = pr["_explanation"]

    # Second pass: option extraction from text using answer section boundaries
    # For each question block in raw text, get paragraphs between ? and Correct answer
    for m in re.finditer(
        r"Question\s+(\d+)\s+of\s+(\d+)\s*(.*?)\s*Correct answers?:\s*([A-F](?:\s*,\s*[A-F])*)\s*(.*?)(?=Question\s+\d+\s+of\s+\d+|Community votes|\d+\s+questions?\s+still\s+locked|Choose your plan|\Z)",
        text,
        re.I | re.S,
    ):
        qnum = int(m.group(1))
        mid = _clean(m.group(3))
        answer = re.sub(r"[^A-F]", "", m.group(4).upper())
        explanation = _clean(m.group(5))
        explanation = re.split(
            r"Community votes|Discussion|Show answer", explanation, maxsplit=1
        )[0].strip()

        qmark = mid.find("?")
        if qmark != -1:
            stem = mid[: qmark + 1].strip()
            opt_blob = mid[qmark + 1 :].strip()
        else:
            stem = mid
            opt_blob = ""

        lettered = _split_labeled_options(opt_blob)
        if not lettered:
            # Fallback paragraph split
            opts = [
                _clean(x)
                for x in re.split(r"\s{2,}|\n+", opt_blob)
                if _clean(x)
                and not re.match(r"^(Show|Hide) answer", x, re.I)
            ]
            lettered = [
                o if re.match(r"^[A-F][\.\)]\s+", o) else f"{chr(65 + i)}. {o}"
                for i, o in enumerate(opts)
            ]

        cur = by_num.get(qnum, {"qnum": qnum})
        # Strip trailing "Answer choices..." from stem if present
        stem = re.sub(r"\s*Answer choices.*$", "", stem or "", flags=re.I).strip()
        stem = re.sub(r"\s*\(Choose two\.\)\s*$", "", stem, flags=re.I).strip()
        cur["stem"] = stem or cur.get("stem", "")
        if lettered and (
            not cur.get("options")
            or len(lettered) > len(cur.get("options") or [])
            or (
                len(cur.get("options") or []) == 1
                and "Answer choices" in (cur.get("options") or [""])[0]
            )
        ):
            cur["options"] = lettered
        cur["answer"] = answer or cur.get("answer", "")
        # Strip vote chrome from explanation
        explanation = re.sub(
            r"Community votes.*$", "", explanation or "", flags=re.I | re.S
        ).strip()
        cur["explanation"] = explanation or cur.get("explanation", "")
        by_num[qnum] = cur

    out_records: list[dict] = []
    for qnum in sorted(by_num):
        item = by_num[qnum]
        stem = item.get("stem") or ""
        options = item.get("options") or []
        answer = item.get("answer") or ""
        # Label options if unlabeled
        if options and not any(re.match(r"^[A-F][\.\)]\s+", o) for o in options):
            options = [f"{chr(65 + i)}. {o}" for i, o in enumerate(options)]
        status = (
            "complete"
            if len(stem) > 20 and len(options) >= 2 and answer
            else "partial"
            if len(stem) > 20
            else "inaccessible"
        )
        out_records.append(
            make_record(
                source="examice",
                question_text=stem,
                answer_options=options,
                source_answer=answer,
                source_explanation=item.get("explanation") or "",
                source_question_number=qnum,
                source_url=f"{source_url}#question-{qnum}",
                question_type=infer_question_type(options, answer),
                extraction_status=status,
                authenticity_bucket="B",
                access_limitation="none",
                provenance_detail="examice_free_preview",
            )
        )

    return {
        "claimed_count": claimed,
        "locked": locked,
        "locked_count": locked_count,
        "records": out_records,
        "preview_count": len(out_records),
    }


def extract_examice() -> dict[str, Any]:
    raw_dir = RAW / "examice"
    raw_dir.mkdir(parents=True, exist_ok=True)
    html_path = raw_dir / "dea-c01.html"
    meta_path = raw_dir / "fetch-meta.json"

    with httpx.Client(
        headers={"User-Agent": USER_AGENT, "Accept": "text/html"},
        follow_redirects=True,
        timeout=45.0,
    ) as client:
        resp = client.get(EXAMICE_URL)
        html = resp.text
        meta = {
            "url": EXAMICE_URL,
            "status_code": resp.status_code,
            "bytes": len(html),
            "final_url": str(resp.url),
        }
        html_path.write_text(html, encoding="utf-8")
        meta_path.write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")

        # Probe common pagination — expect paywall / same page
        probes = {}
        for page in (2, 3, 10):
            for url in (
                f"{EXAMICE_URL}?page={page}",
                f"{EXAMICE_URL}/page/{page}",
                f"{EXAMICE_URL}?q={page}",
            ):
                try:
                    r = client.get(url)
                    probes[url] = {
                        "status": r.status_code,
                        "bytes": len(r.text),
                        "has_question_20": bool(
                            re.search(r"Question\s+20\s+of", r.text, re.I)
                        ),
                        "locked_marker": bool(
                            re.search(r"still locked", r.text, re.I)
                        ),
                    }
                except Exception as e:  # noqa: BLE001
                    probes[url] = {"error": str(e)}

    parsed = parse_examice_html(html, EXAMICE_URL)
    parsed["fetch"] = meta
    parsed["pagination_probes"] = probes

    # Document inaccessible Q6–366 without inventing content
    inaccessible = []
    preview_nums = {
        r["source_question_number"] for r in parsed["records"] if r.get("source_question_number")
    }
    claimed = parsed.get("claimed_count") or 366
    for n in range(1, claimed + 1):
        if n in preview_nums:
            continue
        inaccessible.append(
            make_record(
                source="examice",
                question_text="",
                answer_options=[],
                source_answer="",
                source_question_number=n,
                source_url=EXAMICE_URL,
                extraction_status="inaccessible",
                authenticity_bucket="B",
                access_limitation="paid_preview_cap",
                provenance_detail="examice_locked_beyond_free_preview",
            )
        )

    parsed["inaccessible_stubs"] = inaccessible
    (raw_dir / "parse-summary.json").write_text(
        json.dumps(
            {
                "claimed_count": parsed.get("claimed_count"),
                "locked": parsed.get("locked"),
                "locked_count": parsed.get("locked_count"),
                "preview_count": parsed.get("preview_count"),
                "inaccessible_stub_count": len(inaccessible),
                "pagination_probes": probes,
            },
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )
    return parsed
