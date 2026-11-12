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


def extract_requirements(stem: str) -> list[str]:
    """Pull exam-style constraints from the stem for explanatory framing."""
    s = stem or ""
    reqs: list[str] = []
    low = s.lower()

    if re.search(r"LEAST operational|least development|overhead|minimal(?:\s+\w+)?\s+effort", s, re.I):
        reqs.append(
            "prioritas *least operational/development effort* — pilih layanan managed, hindari custom ops berat"
        )
    if re.search(r"MOST cost|cost-effective|LEAST cost|reduce (?:the )?cost|bill", s, re.I):
        reqs.append("optimasi biaya (format, partisi, capacity, atau pola akses) harus ikut terpenuhi")
    if re.search(r"MOST secure|least privilege|encrypt|KMS|compliance", s, re.I):
        reqs.append("constraint keamanan/compliance tidak boleh dilanggar")
    if re.search(r"real-?time|within seconds|low latency|continuously|stream", s, re.I):
        reqs.append("butuh jalur near/real-time atau streaming, bukan batch yang terlambat")
    if re.search(r"Region|cross-region|another Region|same Region", s, re.I):
        reqs.append("perhatikan batasan lintas Region (latensi, mounting, replikasi, data transfer)")
    if re.search(r"must remain available|zero downtime|cutover|under \w+ minutes", s, re.I):
        reqs.append("ketersediaan sumber / cutover singkat adalah hard requirement")
    if re.search(r"row-?level|column(?:-level)?|governance|fine-?grained", s, re.I):
        reqs.append("butuh kontrol akses fine-grained di data lake, biasanya Lake Formation")
    if re.search(r"exactly-once|no duplicates|idempoten", s, re.I):
        reqs.append("semantik pengiriman/pemrosesan (exactly-once / anti-duplikat) penting")
    if re.search(r"Select\s*Two|Choose\s+two", s, re.I):
        reqs.append("jawaban majemuk: biasanya dua mekanisme terpisah untuk dua requirement")

    # Fallback: first sentence as problem framing
    if not reqs:
        first = re.split(r"(?<=\.)\s+", norm(s), maxsplit=1)[0]
        if len(first) > 40:
            reqs.append(f"fokus pada requirement inti stem: {first[:220].rstrip('.')}")
    return reqs[:5]


def summarize_option(body: str, max_len: int = 110) -> str:
    b = norm(body)
    if len(b) <= max_len:
        return b.rstrip(".")
    # Prefer cutting at clause boundary
    cut = b[: max_len - 1]
    sp = cut.rfind(" ")
    if sp > 60:
        cut = cut[:sp]
    return cut.rstrip(",.;:") + "…"


def explain_correct(opt: dict, stem: str, reqs: list[str]) -> str:
    label = opt.get("label") or "?"
    body = norm(opt.get("body") or "")
    low = body.lower()
    stem_l = stem.lower()
    bits: list[str] = []

    bits.append(
        f"**{label} — skenario benar:** {summarize_option(body, 140)}."
    )

    why: list[str] = []
    if "datasync" in low and ("efs" in low or "efs" in stem_l):
        why.append(
            "DataSync memindahkan/mereplikasi file antar Region sebagai managed transfer, "
            "sehingga compute (mis. Lambda) cukup mount EFS lokal di Region tujuan — "
            "menghindari akses EFS lintas Region yang lambat/rapuh."
        )
    if "lake formation" in low:
        why.append(
            "Lake Formation menangani governance/izin fine-grained di data lake tanpa membangun ACL custom."
        )
    if "step functions" in low:
        why.append(
            "Step Functions memberi orkestrasi dependency-driven + branching/error handling tanpa cron rapuh."
        )
    if "kinesis" in low or "data stream" in low:
        why.append(
            "pola stream memisahkan producer/consumer dan mendukung fan-out atau processing paralel."
        )
    if "parquet" in low or "partition" in low:
        why.append(
            "kolumnar + partisi menekan data di-scan Athena/warehouse → biaya & latensi query turun."
        )
    if "glue data quality" in low or "data quality" in low:
        why.append(
            "aturan Data Quality menangkap kelengkapan/validitas di pipeline tanpa kode validasi custom."
        )
    if re.search(r"memory|cpu-bound|cpu bound", low) and "lambda" in stem_l:
        why.append(
            "pada Lambda yang CPU-bound, menaikkan memory menaikkan CPU proporsional — "
            "ukur duration×price untuk titik biaya terendah."
        )
    if "coalesce" in low or "repartition" in low:
        why.append(
            "mengurangi small files memangkas overhead listing/planning query di Athena/Spark."
        )

    if not why:
        # Generic but still explanatory
        if any("least operational" in r.lower() or "effort" in r.lower() for r in reqs):
            why.append(
                "opsi ini memakai kapabilitas managed yang paling langsung menutup requirement "
                "tanpa menambah lapisan operasional yang tidak perlu."
            )
        else:
            why.append(
                "opsi ini menutup requirement inti di stem dengan mekanisme layanan yang tepat, "
                "bukan workaround yang hanya menyelesaikan sebagian masalah."
            )

    bits.append(" ".join(why))
    return "\n".join(bits)


def classify_wrong(opt: dict, stem: str, correct: list[dict]) -> str:
    """Explain *why* an option fails — not by pasting the option text."""
    label = opt.get("label") or "?"
    body = norm(opt.get("body") or "")
    low = body.lower()
    stem_l = stem.lower()
    reasons: list[str] = []

    # Cross-region / EFS / Lambda patterns
    if "peer the vpc" in low or ("vpc" in low and "efs" in low and "lock" in low):
        reasons.append(
            "peering + mount EFS lintas Region tetap membawa latensi/ketergantungan lintas Region; "
            "file locking tidak menyelesaikan lokasi data vs compute"
        )
    if "replicate" in low and "efs" in low and "lambda" in low:
        reasons.append(
            "replikasi EFS native/managed ke Region lain bukan pola yang tepat/tersedia seperti digambarkan; "
            "operasionalnya lebih berat daripada transfer terkelola ke satu filesystem lokal"
        )
    if re.search(r"deploy (?:the )?lambda functions to each region", low) or (
        "each region" in low and "lambda" in low and "mount" in low
    ):
        reasons.append(
            "menyebarkan pemrosesan ke setiap Region menambah permukaan operasi & orkestrasi, "
            "bertentangan dengan konsolidasi di Region tim data science / least effort"
        )

    # Streaming / cost / hot shard
    if "increase the shard" in low or ("shard count again" in low):
        reasons.append(
            "menambah shard tidak memperbaiki hot partition bila partition key tetap timpang"
        )
    if "on-demand capacity" in low and "throttl" in stem_l:
        reasons.append(
            "mode kapasitas tidak mengubah mapping hot key → shard; throttling write tetap mungkin"
        )
    if "enhanced fan-out" in low and ("throttl" in stem_l or "producer" in stem_l):
        reasons.append(
            "enhanced fan-out memperbaiki throughput baca consumer, bukan throttling di sisi producer/write"
        )
    if "query the s3" in low and ("within seconds" in stem_l or "fraud" in stem_l):
        reasons.append(
            "membaca objek S3 setelah buffering Firehose tidak memenuhi requirement latensi detik"
        )
    if "athena capacity" in low or "capacity reservation" in low:
        reasons.append(
            "reservasi kapasitas menstabilkan tagihan tetapi tidak memperbaiki akar (format/partisi/scan); "
            "biasanya dikerjakan setelah fondasi data benar"
        )
    if "select star" in stem_l and "name only" not in low and "column" not in low:
        pass  # not this option

    # Orchestration / cron
    if "widen" in low and ("cron" in low or "gap" in low):
        reasons.append(
            "memperlebar jarak cron hanya menebak timing; race/overrun tetap bisa terjadi tanpa dependency graph"
        )
    if "max concurrent" in low:
        reasons.append(
            "membatasi concurrency satu job tidak menjamin urutan antar-job yang berbeda"
        )

    # Governance / security distractors
    if "bucket policy" in low and "row" in stem_l:
        reasons.append(
            "bucket policy terlalu kasar untuk kontrol baris/kolom per identitas analis"
        )
    if "glue databrew" in low and "governance" in stem_l:
        reasons.append(
            "DataBrew fokusokus preparasi/visual cleansing, bukan tata kelola akses terpusat data mesh/lake"
        )

    # Generic operational / cost mismatches
    if not reasons:
        if any(x in low for x in ("ec2", "always on", "manual", "custom")) and re.search(
            r"LEAST operational|overhead|effort", stem, re.I
        ):
            reasons.append(
                "menambah komponen yang harus dioperasikan sendiri, berlawanan dengan least operational effort"
            )
        elif re.search(r"cost|bill|Athena", stem, re.I) and not any(
            k in low for k in ("parquet", "partition", "compress", "column", "lifecycle", "intelligent")
        ):
            reasons.append(
                "tidak menyentuh penyebab utama biaya/kinerja yang disebut di stem (scan, format, atau pola akses)"
            )
        elif correct:
            # Contrast with correct approach at high level
            cbody = " ".join(norm(c.get("body") or "") for c in correct).lower()
            if "datasync" in cbody and "datasync" not in low:
                reasons.append(
                    "tidak memindahkan data ke lokasi compute yang sama; masih menyisakan akses jarak jauh atau duplikasi proses"
                )
            elif "lake formation" in cbody and "lake formation" not in low:
                reasons.append(
                    "tidak memakai kontrol governance fine-grained yang diminta requirement akses"
                )
            else:
                reasons.append(
                    "hanya menutup sebagian gejala atau memakai pola yang tidak selaras dengan constraint utama stem"
                )
        else:
            reasons.append(
                "tidak memenuhi seluruh constraint yang ditanyakan (kelengkapan solusi / trade-off yang diminta)"
            )

    tip = summarize_option(body, 90)
    return f"- **{label}**: {reasons[0]}. *(ringkas opsi: {tip})*"


def generate_pembahasan(q: dict) -> str:
    stem = norm(q.get("stem") or "")
    opts = q.get("options") or []
    correct = [o for o in opts if o.get("correct")]
    wrong = [o for o in opts if not o.get("correct")]
    letters = "".join(o.get("label", "") for o in correct) or "?"
    reqs = extract_requirements(stem)

    blocks: list[str] = []
    blocks.append(f"**Pembahasan:** Jawaban yang tepat adalah **{letters}**.")

    # Problem framing
    frame = ["**Yang diminta soal**"]
    if reqs:
        frame.extend(f"- {r}" for r in reqs)
    else:
        frame.append("- pilih arsitektur yang paling pas dengan constraint di stem")
    blocks.append("\n".join(frame))

    # Correct scenario(s)
    if correct:
        correct_blocks = ["**Mengapa jawaban itu benar**"]
        for c in correct:
            correct_blocks.append(explain_correct(c, stem, reqs))
        blocks.append("\n\n".join(correct_blocks))

    # Wrong options — analytical
    if wrong:
        wrong_lines = ["**Mengapa opsi lain salah**"]
        for w in wrong:
            wrong_lines.append(classify_wrong(w, stem, correct))
        blocks.append("\n".join(wrong_lines))

    # Compact service context (only if relevant)
    blurbs = pick_blurbs(stem + " " + " ".join(o.get("body", "") for o in correct))
    if blurbs:
        blocks.append(
            "**Konteks layanan singkat**\n" + "\n".join(f"- {b}" for b in blurbs)
        )

    blocks.append(
        "_Pembahasan disusun untuk belajar dari kunci bank lokal; validasi ulang ke dokumentasi AWS bila ragu._"
    )
    return "\n\n".join(blocks)


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
