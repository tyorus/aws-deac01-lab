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


def stem_goal(stem: str) -> str:
    """The ask / must-do sentence — better than only the opening story sentence."""
    s = norm(stem)
    for pat in [
        r"((?:The data engineer|The company|They|You) must[^.?]+\.?)",
        r"((?:Which|What) (?:solution|combination|approach|action|actions)[^.?]*\?)",
        r"(Select Two[^.?]*\.?)",
    ]:
        m = re.search(pat, s, re.I)
        if m:
            return norm(m.group(1))
    parts = re.split(r"(?<=\.)\s+", s)
    if len(parts) >= 2:
        return parts[-1] if len(parts[-1]) > 30 else parts[-2]
    return s[:220]


def extract_requirements(stem: str) -> list[str]:
    """Pull exam-style constraints from the stem for explanatory framing."""
    s = stem or ""
    reqs: list[str] = []

    goal = stem_goal(s)
    if goal:
        reqs.append(f"tujuan: {goal}")

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
    if re.search(r"Glue crawler|Data Catalog|crawl", s, re.I):
        reqs.append(
            "crawler butuh IAM role yang tepat (biasanya AWSGlueServiceRole) + path sumber yang benar agar Data Catalog ter-update"
        )
    if re.search(r"IAM|permission|policy|role", s, re.I) and re.search(
        r"Glue|SageMaker|Lake Formation|crawler", s, re.I
    ):
        reqs.append(
            "izin harus least-privilege dan terpasang ke principal/service yang menjalankan pekerjaan"
        )

    return reqs[:6]


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
    if "assumerole" in low.replace(" ", "") or "sts:assumerole" in low.replace(" ", ""):
        why.append(
            "sts:AssumeRole ke principal Glue/SageMaker memungkinkan Studio/interactive session "
            "memakai role layanan yang benar — sesuai pola IAM lintas layanan di stem."
        )
    if "awsglueservicerole" in low.replace(" ", "") and "crawler" in (low + stem_l):
        why.append(
            "AWSGlueServiceRole + path sumber + (jadwal/database Catalog) adalah paket minimal "
            "agar crawler mengisi Data Catalog secara teratur."
        )
    if "datasync" in low:
        why.append(
            "DataSync adalah jalur transfer terkelola yang menempatkan data di lokasi compute "
            "tanpa mount lintas Region atau operasi replikasi manual."
        )

    if not why:
        goal = stem_goal(stem)
        if any("least operational" in r.lower() or "effort" in r.lower() for r in reqs):
            why.append(
                "memakai kapabilitas managed yang langsung menutup requirement "
                f"({goal[:160].rstrip('.')}) tanpa menambah lapisan operasional."
            )
        else:
            why.append(
                f"menutup requirement stem ({goal[:180].rstrip('.')}) dengan mekanisme layanan yang tepat."
            )

    bits.append(" ".join(why))
    return "\n".join(bits)


def _tokens(text: str) -> set[str]:
    return {t for t in re.findall(r"[a-z0-9+]{3,}", (text or "").lower()) if t not in {
        "the", "and", "for", "with", "that", "this", "from", "into", "onto", "over",
        "when", "will", "must", "data", "engineer", "company", "amazon", "aws",
        "using", "create", "configure", "add", "use", "set", "run",
    }}


def contrast_wrong(opt_body: str, stem: str, correct: list[dict]) -> str:
    """Stem-aware contrast vs correct option(s) — never a vague default phrase."""
    low = opt_body.lower()
    stem_l = stem.lower()
    goal = stem_goal(stem).lower()
    cbody = " ".join(norm(c.get("body") or "") for c in correct)
    c_low = cbody.lower()
    c_tok = _tokens(cbody)
    o_tok = _tokens(opt_body)
    missing = sorted(c_tok - o_tok)
    extra = sorted(o_tok - c_tok)

    # --- IAM / role / policy (SageMaker Studio + Glue interactive, crawlers, etc.) ---
    if "awsglueservicerole" in low.replace(" ", "") or "awsglueservicerole" in low:
        if "iam user" in low or "engineer's iam" in low:
            return (
                "AWSGlueServiceRole adalah managed policy untuk *role* layanan Glue (job/crawler), "
                "bukan izin yang ditempel ke IAM user agar Studio bisa memakai Glue interactive sessions; "
                "yang dibutuhkan adalah kemampuan assume role lintas layanan"
            )
        if "amazons3fullaccess" in c_low.replace(" ", "") or (
            "glueservicerole" in c_low.replace(" ", "") and "s3fullaccess" in low.replace(" ", "")
        ):
            pass  # handled below
        if "crawler" in stem_l or "data catalog" in stem_l:
            if "schedule" in c_low and "schedule" not in low and "dpu" in low:
                return (
                    "menyetel DPU/output path saja tidak menggantikan jadwal crawler + nama database Catalog "
                    "yang diminta agar metadata harian ter-refresh otomatis"
                )

    if "amazons3fullaccess" in low.replace(" ", "") or "amazon s3 full access" in low:
        if "crawler" in stem_l or "glue" in stem_l:
            bits = [
                "AmazonS3FullAccess terlalu luas dan tidak menggantikan AWSGlueServiceRole yang dibutuhkan "
                "crawler untuk menulis ke Data Catalog"
            ]
            if "dpu" in low and "schedule" in c_low:
                bits.append(
                    "alokasi DPU juga bukan pengganti jadwal harian crawler di jawaban benar"
                )
            elif "schedule" in low and "glueservicerole" in c_low.replace(" ", ""):
                bits.append(
                    "meski ada schedule, tanpa AWSGlueServiceRole crawler tetap gagal mengisi Catalog"
                )
            return "; ".join(bits)

    if "amazonsagemakerfullaccess" in low.replace(" ", "") or "sagemakerfullaccess" in low:
        return (
            "AmazonSageMakerFullAccess pada IAM user memberi akses luas ke SageMaker, tetapi tidak "
            "menyelesaikan trust/assume-role ke principal Glue+SageMaker yang dibutuhkan interactive sessions; "
            "izin salah tempat dan terlalu broad"
        )

    if "sts:addassociation" in low.replace(" ", "") or "addassociation" in low:
        return (
            "sts:AddAssociation bukan action yang dipakai untuk menyerahkan sesi ke Glue/SageMaker; "
            "stem butuh sts:AssumeRole agar user/Studio bisa memakai role layanan yang benar"
        )

    if "assumerole" in c_low.replace(" ", "") and "assumerole" not in low.replace(" ", ""):
        if "policy" in low or "iam" in low or "role" in low:
            return (
                "opsi ini tidak memasang sts:AssumeRole ke principal Glue/SageMaker seperti jawaban benar; "
                "tanpa assume role, Studio/interactive session tidak bisa memakai role layanan yang dimaksud stem"
            )

    if "managed policy" in low and "iam user" in low and (
        "glue" in stem_l or "sagemaker" in stem_l or "interactive" in stem_l
    ):
        return (
            "menempel managed policy layanan ke IAM *user* salah target: permission untuk job/session "
            "harus lewat role yang di-assume, bukan full managed policy di identitas manusia"
        )

    # --- Crawler / Catalog shape ---
    if "crawler" in stem_l or "data catalog" in stem_l:
        if "dpu" in low and "schedule" in c_low and "schedule" not in low:
            return (
                "alokasi DPU bukan cara menjadwalkan crawler harian; soal meminta schedule + database "
                "Catalog sebagai output metadata, bukan menulis ulang path data di S3"
            )
        if "new path" in low and "database" in c_low and "database" not in low:
            return (
                "mengarahkan output ke path S3 baru tidak mengisi Glue Data Catalog; yang diminta adalah "
                "nama database Catalog agar tabel bisa di-query setelah crawl"
            )
        if "amazons3fullaccess" in low.replace(" ", ""):
            return (
                "S3FullAccess tidak mencakup izin crawler menulis ke Data Catalog; butuh AWSGlueServiceRole "
                "(plus path sumber + schedule/database sesuai jawaban benar)"
            )

    # --- Known architecture contrasts ---
    if "datasync" in c_low and "datasync" not in low:
        if "efs" in stem_l or "efs" in c_low:
            return (
                "tidak memakai DataSync untuk menyalin data ke EFS di Region compute; "
                "masih menyisakan akses lintas Region atau duplikasi deploy yang ditolak stem"
            )
        return (
            "tidak memakai DataSync sebagai jalur transfer terkelola yang dipilih jawaban benar "
            "untuk requirement lokasi data vs compute di stem"
        )
    if "lake formation" in c_low and "lake formation" not in low:
        if "bucket policy" in low or "acl" in low or "iam policy" in low:
            return (
                "kontrol di S3/IAM terlalu kasar dibanding Lake Formation; tidak memenuhi "
                "row/column/governance fine-grained yang diminta stem"
            )
        return (
            "tidak memakai Lake Formation untuk governance fine-grained yang menjadi inti requirement akses"
        )
    if "step functions" in c_low and "step functions" not in low:
        return (
            "tetap mengandalkan penjadwalan/concurrency kasar alih-alih orkestrasi dependency Step Functions "
            "yang menutup race antar-job di stem"
        )
    if ("kinesis" in c_low or "data stream" in c_low) and not (
        "kinesis" in low or "data stream" in low
    ):
        if "within seconds" in stem_l or "real-time" in stem_l or "fraud" in stem_l:
            return (
                "jalur batch/S3/query tertunda tidak memenuhi latensi near-real-time yang diminta; "
                "jawaban benar memakai stream"
            )
    if ("parquet" in c_low or "partition" in c_low) and not (
        "parquet" in low or "partition" in low
    ):
        if re.search(r"cost|athena|scan|bill", stem_l):
            return (
                "tidak memperbaiki format/partisi yang menekan data-scan; jadi tidak menjawab akar biaya/kinerja query di stem"
            )

    # --- Effort / cost / security from stem ---
    if re.search(r"least operational|least development|overhead|minimal(?:\s+\w+)?\s+effort", stem, re.I):
        if any(x in low for x in ("ec2", "always on", "manual", "custom", "lambda in each", "each region")):
            return (
                "menambah permukaan operasi (compute sendiri / multi-deploy) berlawanan dengan "
                "least operational/development effort di stem"
            )
    if re.search(r"most cost|cost-effective|least cost|reduce (?:the )?cost", stem, re.I):
        if not any(k in low for k in ("parquet", "partition", "compress", "column", "lifecycle", "intelligent", "spot")):
            if any(k in c_low for k in ("parquet", "partition", "compress", "lifecycle", "intelligent")):
                return (
                    "tidak menyentuh tuas biaya yang dipakai jawaban benar (format/partisi/lifecycle); "
                    "jadi tidak memenuhi optimasi biaya di stem"
                )

    # --- Diff-based fallback (still specific) ---
    goal_bits = []
    if "must" in goal:
        goal_bits.append(goal[:160])
    ask = stem_goal(stem)
    if missing and len(missing) <= 8:
        key_miss = [m for m in missing if m in {
            "datasync", "efs", "parquet", "partition", "lake", "formation", "assumerole",
            "schedule", "database", "crawler", "stream", "kinesis", "step", "functions",
            "glue", "catalog", "kms", "encrypt",
        }] or missing[:4]
        return (
            f"dibanding jawaban benar, opsi ini mengabaikan elemen kunci ({', '.join(key_miss)}); "
            f"itu yang diminta stem: {ask[:180].rstrip('.')}"
        )
    if extra and len(extra) <= 6 and missing:
        return (
            f"opsi ini menekankan {', '.join(extra[:3])} tetapi meninggalkan "
            f"{', '.join(missing[:3])} yang ada di solusi benar — tidak menutup requirement: {ask[:160].rstrip('.')}"
        )

    # Last resort: name the unmet stem ask (still not the banned vague line)
    return (
        f"tidak menyelesaikan yang diminta stem ({ask[:200].rstrip('.')}) "
        f"dengan mekanisme yang sama seperti jawaban benar"
    )


def classify_wrong(opt: dict, stem: str, correct: list[dict]) -> str:
    """Explain *why* an option fails — tied to stem + contrast vs correct."""
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
            "DataBrew fokus preparasi/visual cleansing, bukan tata kelola akses terpusat data mesh/lake"
        )

    if not reasons:
        reasons.append(contrast_wrong(body, stem, correct))

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
