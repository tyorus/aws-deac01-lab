#!/usr/bin/env python3
"""Attach pembahasan (explanations) to every compiled question, then rebuild MD + quiz JSON."""
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
COMPILED = ROOT / "aws-dea-c01" / "_work" / "compiled"
PRACTICE = ROOT / "aws-dea-c01" / "practice"
MS = ROOT / "aws-dea-c01" / "_work" / "multi-source"
ET = ROOT / "aws-dea-c01" / "_work" / "examtopics"

SERVICE_BLURBS = {
    "glue": "AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.",
    "lake formation": "Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.",
    "s3": "Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.",
    "redshift": "Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.",
    "athena": "Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.",
    "lambda": "AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.",
    "kinesis": "Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.",
    "iam": "IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.",
    "kms": "KMS mengelola kunci enkripsi; pastikan grant/policy sesuai akses layanan.",
    "cloudwatch": "CloudWatch untuk metrik, log, dan alarm operasional pipeline.",
    "step functions": "Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.",
    "dms": "DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.",
    "emr": "EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.",
    "dynamodb": "DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.",
}


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()


def stem_hash(text: str) -> str:
    import hashlib

    t = re.sub(r"[^a-z0-9]+", " ", (text or "").lower())
    t = re.sub(r"\s+", " ", t).strip()
    return hashlib.sha1(t.encode()).hexdigest()[:16]


def is_placeholder(expl: str) -> bool:
    e = (expl or "").strip()
    if len(e) < 40:
        return True
    return e.startswith("Answer key from local source") or e.startswith(
        "Jawaban kunci dari sumber lokal"
    )


def load_source_explanations() -> dict[str, str]:
    """Map stem_hash -> best human/source explanation."""
    best: dict[str, str] = {}

    def consider(stem: str, expl: str) -> None:
        expl = norm(expl)
        if len(expl) < 40:
            return
        h = stem_hash(stem)
        prev = best.get(h, "")
        if len(expl) > len(prev):
            best[h] = expl

    # Examice
    ei = MS / "examice.json"
    if ei.exists():
        doc = json.loads(ei.read_text(encoding="utf-8"))
        for r in doc.get("records") or []:
            consider(r.get("question_text") or "", r.get("source_explanation") or "")

    # multi-source all-questions
    aq = MS / "all-questions.json"
    if aq.exists():
        doc = json.loads(aq.read_text(encoding="utf-8"))
        for r in doc.get("records") or []:
            consider(r.get("question_text") or "", r.get("source_explanation") or "")

    # examtopics normalized
    nq = ET / "normalized" / "questions.json"
    if nq.exists():
        for r in json.loads(nq.read_text(encoding="utf-8")):
            consider(r.get("question_text") or "", r.get("examtopics_explanation") or "")

    return best


def pick_blurbs(text: str) -> list[str]:
    t = text.lower()
    out = []
    for k, v in SERVICE_BLURBS.items():
        if k in t:
            out.append(v)
    return out[:3]


def generate_pembahasan(q: dict) -> str:
    stem = norm(q.get("stem") or "")
    opts = q.get("options") or []
    correct = [o for o in opts if o.get("correct")]
    wrong = [o for o in opts if not o.get("correct")]
    letters = "".join(o.get("label", "") for o in correct) or "?"

    lines = []
    lines.append(f"**Pembahasan:** Jawaban yang tepat adalah **{letters}**.")

    if len(correct) == 1:
        c = correct[0]
        lines.append(
            f"Opsi {c['label']} paling sesuai karena: {norm(c.get('body') or '')}."
        )
    else:
        lines.append("Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:")
        for c in correct:
            lines.append(f"- **{c['label']}**: {norm(c.get('body') or '')}")

    blurbs = pick_blurbs(stem + " " + " ".join(o.get("body", "") for o in correct))
    if blurbs:
        lines.append("Konteks layanan terkait:")
        for b in blurbs:
            lines.append(f"- {b}")

    # Tie back to stem keywords
    if re.search(r"LEAST operational|least operational|overhead|effort", stem, re.I):
        lines.append(
            "Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom."
        )
    if re.search(r"MOST (?:cost|secure|scalable)|cost-effective|LEAST cost", stem, re.I):
        lines.append(
            "Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering."
        )
    if re.search(r"real-?time|continuously|stream", stem, re.I):
        lines.append(
            "Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata."
        )
    if re.search(r"row-?level|column|governance|Lake Formation", stem, re.I):
        lines.append(
            "Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket."
        )

    if wrong:
        lines.append("Mengapa opsi lain kurang tepat:")
        for w in wrong[:4]:
            body = norm(w.get("body") or "")
            if len(body) > 160:
                body = body[:157] + "..."
            lines.append(
                f"- **{w['label']}**: tidak memenuhi constraint utama soal — {body}"
            )

    lines.append(
        "_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._"
    )
    return "\n".join(lines)


def items_from_quiz(quiz: list[dict]) -> list[dict]:
    """Convert quiz records back to markdown item shape."""
    items = []
    for q in quiz:
        opts = []
        for o in q.get("options") or []:
            opts.append(f"{o['label']}. {o['body']}")
        ans = "".join(o["label"] for o in q.get("options") or [] if o.get("correct"))
        meta = q.get("source_meta") or {}
        items.append(
            {
                "source": meta.get("source") or "compiled",
                "source_question_number": meta.get("source_question_number"),
                "question_text": q.get("stem") or "",
                "answer_options": opts,
                "source_answer": ans,
                "source_explanation": q.get("explanation") or "",
                "stem_hash": meta.get("stem_hash") or stem_hash(q.get("stem") or ""),
                "source_url": meta.get("source_url") or "",
                "app_id": q.get("id"),
            }
        )
    return items


def load_md_only_extras(quiz_hashes: set[str]) -> list[dict]:
    """Keep non-quiz stems (e.g. dumps without answers, slide scenarios) from existing MD parse — optional skip."""
    # Load previous compile unique list if present via research + dumps/slide json
    extras = []
    for name in ("pdf-retry/dumps-items.json", "pdf-retry/slide-items.json"):
        p = COMPILED / name
        if not p.exists():
            continue
        for it in json.loads(p.read_text(encoding="utf-8")):
            h = it.get("stem_hash") or stem_hash(it.get("question_text") or "")
            if h in quiz_hashes:
                continue
            extras.append(it)
    return extras


def build_markdown(items: list[dict]) -> str:
    lines = [
        "# DEA-C01 Compiled Local Question Bank",
        "",
        f"Generated: {datetime.now(timezone.utc).isoformat()}",
        "",
        "Bank soal lokal (scrape + PDF) lengkap dengan **pembahasan**.",
        "Bukan materi resmi AWS. Item original lab tetap di `content/questions/` (DEA-001…).",
        "",
        f"- Total entri: **{len(items)}**",
        f"- Dengan pembahasan: **{sum(1 for i in items if not is_placeholder(i.get('source_explanation') or ''))}**",
        "",
        "---",
        "",
    ]
    for i, it in enumerate(items, 1):
        src = it.get("source") or "?"
        num = it.get("source_question_number")
        title = f"## Q{i}. [{src}]"
        if num is not None:
            title += f" #{num}"
        lines.append(title)
        if it.get("app_id"):
            lines.append(f"*App id: `{it['app_id']}`*")
        lines.append("")
        lines.append(it.get("question_text") or "")
        lines.append("")
        for o in it.get("answer_options") or []:
            lines.append(f"- {o}")
        lines.append("")
        if it.get("source_answer"):
            lines.append(f"**Answer:** {it['source_answer']}")
            lines.append("")
        expl = (it.get("source_explanation") or "").strip()
        if expl:
            if not expl.startswith("**Pembahasan:**") and "Pembahasan" not in expl[:40]:
                lines.append("**Explanation / Pembahasan:**")
                lines.append("")
            lines.append(expl)
            lines.append("")
        if it.get("source_url"):
            lines.append(f"Source URL: {it['source_url']}")
            lines.append("")
        lines.append("---")
        lines.append("")
    return "\n".join(lines)


def main() -> None:
    rq_path = COMPILED / "research-questions.json"
    doc = json.loads(rq_path.read_text(encoding="utf-8"))
    quiz = doc.get("questions") or []
    source_expl = load_source_explanations()

    enriched = 0
    kept = 0
    for q in quiz:
        stem = q.get("stem") or ""
        h = (q.get("source_meta") or {}).get("stem_hash") or stem_hash(stem)
        existing = q.get("explanation") or ""
        src = source_expl.get(h, "")

        if src and (is_placeholder(existing) or len(src) > len(existing)):
            # Keep source prose; prefix pembahasan label in ID
            q["explanation"] = (
                src
                if "Pembahasan" in src[:50] or "Correct" in src[:80]
                else f"**Pembahasan (sumber):** {src}"
            )
            q["explanation_origin"] = "source"
            kept += 1
        elif not is_placeholder(existing) and len(existing) >= 80:
            q["explanation_origin"] = "existing"
            kept += 1
        else:
            q["explanation"] = generate_pembahasan(q)
            q["explanation_origin"] = "generated_study_notes"
            enriched += 1

        # ensure grader min length
        if len(q.get("explanation") or "") < 20:
            q["explanation"] = generate_pembahasan(q)
            q["explanation_origin"] = "generated_study_notes"

    doc["generated_at"] = datetime.now(timezone.utc).isoformat()
    doc["explanations"] = {
        "source_or_kept": kept,
        "generated": enriched,
        "total": len(quiz),
    }
    rq_path.write_text(
        json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    items = items_from_quiz(quiz)
    quiz_hashes = {it["stem_hash"] for it in items}
    extras = load_md_only_extras(quiz_hashes)
    # Add pembahasan stub for extras without answers
    for it in extras:
        if is_placeholder(it.get("source_explanation") or ""):
            if it.get("source_answer"):
                # synthesize minimal quiz-like dict
                fake_opts = []
                for o in it.get("answer_options") or []:
                    m = re.match(r"^([A-F])[\.\)]\s*(.*)$", str(o), re.S)
                    if not m:
                        continue
                    letter, body = m.group(1), m.group(2)
                    fake_opts.append(
                        {
                            "label": letter,
                            "body": body,
                            "correct": letter in re.sub(
                                r"[^A-F]", "", it.get("source_answer") or ""
                            ),
                        }
                    )
                it["source_explanation"] = generate_pembahasan(
                    {"stem": it.get("question_text"), "options": fake_opts}
                )
            else:
                it["source_explanation"] = (
                    "**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal "
                    "(PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS "
                    "untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi."
                )
    all_items = items + extras

    md = build_markdown(all_items)
    (COMPILED / "all-available-questions.md").write_text(md, encoding="utf-8")
    PRACTICE.mkdir(parents=True, exist_ok=True)
    (PRACTICE / "compiled-question-bank.md").write_text(md, encoding="utf-8")

    summary = {
        "quiz_total": len(quiz),
        "explanations_from_source_or_kept": kept,
        "explanations_generated": enriched,
        "markdown_entries": len(all_items),
        "extras_without_quiz": len(extras),
    }
    (COMPILED / "pembahasan-summary.json").write_text(
        json.dumps(summary, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
