#!/usr/bin/env node
/**
 * Overlay rekonstruksi emas soal slide (OCR 2-kolom) ke bank.
 * Huruf "B" di halaman soal adalah penanda kolom kanan, BUKAN kunci.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bankPath = path.join(root, 'aws-dea-c01/practice/research-questions.json')
const qs = JSON.parse(fs.readFileSync(bankPath, 'utf8'))
const byId = new Map(qs.map((q) => [q.id, q]))

function expl(letter, why, others, signal, docs = []) {
  const docsBlock = docs.length
    ? `\n\n**Referensi:**\n${docs.map((d) => `- ${d}`).join('\n')}`
    : ''
  const wrong = Object.entries(others)
    .map(([k, v]) => `- **${k}**: ${v}`)
    .join('\n')
  return `**Pembahasan:** Jawaban yang tepat adalah **${letter}**.

**Mengapa ${letter} benar**
${why}

**THE SIGNAL:** ${signal}

**Mengapa opsi lain salah**
${wrong}${docsBlock}

_Rekonstruksi dari halaman WORKED materi slide + dokumentasi AWS._`
}

function applyGold(id, { options, correct, why, others, signal, docs, type = 'single' }) {
  const q = byId.get(id)
  if (!q) return { id, ok: false, reason: 'missing' }
  const letters = correct.replace(/[^A-F]/g, '').split('')
  q.options = options.map((body, i) => {
    const label = String.fromCharCode(65 + i)
    return {
      id: `opt-${label.toLowerCase()}`,
      label,
      body,
      correct: letters.includes(label),
    }
  })
  q.type = letters.length > 1 ? 'multi' : type
  if (letters.length > 1 && !/\(Choose /i.test(q.stem)) {
    const word = { 2: 'two', 3: 'three' }[letters.length]
    if (word) q.stem = `${q.stem.replace(/\s*$/, '')} (Choose ${word}.)`
  }
  q.has_answer_key = true
  q.verification_status = 'community'
  q.explanation = expl(correct, why, others, signal, docs)
  q.explanation_origin = 'slide_gold_v1'
  q.reviewed_at = new Date().toISOString().slice(0, 10)
  q.audit_patch = { ...(q.audit_patch || {}), rebuilt_from_ocr: true, new_key: correct, gold: true }
  return { id, ok: true, key: correct }
}

const GOLD = {
  'LOC-433': {
    options: [
      'AWS Transfer Family with an SFTP endpoint backed by Amazon S3',
      'AWS DataSync agents at each supplier site',
      'Amazon AppFlow with an SFTP connector',
      'AWS Snowball Edge devices shipped to each supplier',
    ],
    correct: 'A',
    signal: '"Cannot change how it transmits" plus SFTP names Transfer Family. The protocol is the requirement.',
    why: 'Transfer Family menyediakan endpoint SFTP terkelola yang menulis langsung ke S3. Enam puluh pemasok tetap memakai SFTP dan kredensial masing-masing; server SFTP di EC2 bisa dimatikan. Tidak ada agen yang harus dipasang di jaringan pihak ketiga.',
    others: {
      B: 'DataSync membutuhkan agen di jaringan tiap pemasok dan mengubah cara mereka mengirim file — bertentangan dengan "cannot change how it transmits".',
      C: 'AppFlow menghubungkan aplikasi SaaS (Salesforce, dll.), bukan server SFTP penerima unggahan pemasok.',
      D: 'Snowball Edge untuk transfer offline volume besar; file harian kecil, dan Snowball tertutup untuk pelanggan baru.',
    },
    docs: ['https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html'],
  },
  'LOC-393': {
    options: [
      'Amazon MSK Serverless',
      'Amazon Kinesis Data Streams in on-demand mode',
      'Amazon MSK Provisioned, migrating the existing topics',
      'Amazon Data Firehose delivering to Amazon S3',
    ],
    correct: 'C',
    signal: "Two Kafka-compatible options. The word 'steady' separates them.",
    why: 'Throughput tinggi, stabil, dan terprediksi plus klien Kafka yang tidak boleh diubah → MSK Provisioned. Migrasi topic yang ada, IAM/ACL Kafka tetap, tidak perlu tulis ulang microservice.',
    others: {
      A: 'MSK Serverless mewajibkan IAM access control (bukan SASL/ACL Kafka) sehingga klien harus diubah; juga kurang cocok untuk throughput tinggi yang sudah terprediksi.',
      B: 'Kinesis bukan Kafka-compatible; 40 microservice harus ditulis ulang.',
      D: 'Firehose adalah jalur ke S3, bukan broker Kafka yang bisa di-produce/consume klien yang ada.',
    },
    docs: ['https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html'],
  },
  'LOC-402': {
    options: [
      'A global secondary index partitioned by customer ID and sorted by order date',
      'A local secondary index with customer ID as the sort key',
      'A Scan with a filter expression on customer ID',
      'Export the table to Amazon S3 and query it with Amazon Athena',
    ],
    correct: 'A',
    signal: 'An existing table plus a new access pattern is always a GSI. LSIs cannot be added after creation.',
    why: 'Tabel sudah ada (200 juta item) dengan partition key order ID. Pola baru (semua order per customer, urut tanggal) butuh partition key berbeda. GSI bisa ditambah kapan saja; eventual consistency diterima stem.',
    others: {
      B: 'LSI harus dibuat saat tabel dibuat dan memakai partition key yang sama (order ID), bukan customer ID.',
      C: 'Scan 200 juta item tidak scalable.',
      D: 'Export + Athena menambah pipeline dan latency, bukan akses item DynamoDB.',
    },
    docs: ['https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GSI.html'],
  },
  'LOC-414': {
    options: [
      "Increase the Lambda function's timeout and memory allocation",
      'An Amazon EMR cluster with a step per file',
      'AWS Batch, running each file as a containerised job',
      'An AWS Glue Spark job triggered per file',
    ],
    correct: 'C',
    signal: "Forty minutes crosses Lambda's hard fifteen minute ceiling.",
    why: 'Tiap file 8–40 menit. Batas timeout Lambda 15 menit (900 detik) tidak bisa dilewati. AWS Batch menjalankan kontainer tanpa batas waktu itu, satu job per file.',
    others: {
      A: 'Menaikkan timeout/memori Lambda tidak bisa melewati 15 menit.',
      B: 'EMR per file adalah klaster berlebih untuk pekerjaan single-thread per file.',
      D: 'Glue Spark per file membayar startup engine terdistribusi untuk pekerjaan yang tidak paralel di dalam file.',
    },
    docs: [
      'https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html',
      'https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html',
    ],
  },
  'LOC-415': {
    options: [
      'Amazon AppFlow, with a scheduled flow performing the mapping and filtering',
      'Build the Lambda function as proposed, with EventBridge Scheduler triggering it daily',
      'AWS DMS with Salesforce as a source endpoint',
      'AWS DataSync to transfer the Salesforce data',
    ],
    correct: 'A',
    signal: 'The proposal lists four things AppFlow does for you (pagination, OAuth, retries, mapping).',
    why: 'AppFlow adalah konektor Salesforce terkelola: flow terjadwal, mapping/filter, OAuth, pagination, retry — tanpa kode kustom.',
    others: {
      B: 'Itu justru pekerjaan yang ingin diminimalkan (kode custom).',
      C: 'DMS tidak punya source endpoint Salesforce.',
      D: 'DataSync menyalin file/NFS/S3, bukan objek Salesforce via REST API.',
    },
    docs: ['https://docs.aws.amazon.com/appflow/latest/userguide/salesforce.html'],
  },
  'LOC-419': {
    options: [
      'Amazon Keyspaces, which is designed for flexible schemas',
      'Amazon DynamoDB, which is fully managed and handles document workloads',
      'Amazon Aurora PostgreSQL using JSONB columns',
      'Amazon DocumentDB, which is MongoDB compatible',
    ],
    correct: 'D',
    signal: 'Eighty services using MongoDB drivers is a compatibility requirement. Aggregation pipelines make it stricter still.',
    why: 'DocumentDB kompatibel dengan API MongoDB sehingga driver dan aggregation pipeline 80 service tetap jalan, sementara AWS mengoperasikan cluster (backup, replica).',
    others: {
      A: 'Keyspaces = Cassandra, bukan MongoDB.',
      B: 'DynamoDB model/API berbeda; 80 service harus ditulis ulang.',
      C: 'JSONB di Aurora tetap SQL; semua klien MongoDB harus diubah.',
    },
    docs: ['https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html'],
  },
  'LOC-385': {
    options: [
      'Keep everything in CloudWatch Logs indefinitely and query with Logs Insights',
      'Set a 30-day retention on the log groups, export older logs to Amazon S3 with a lifecycle policy to Glacier, and query archives with Athena',
      'Stream all logs to Amazon OpenSearch Service and retain seven years of indices',
      'Reduce retention to thirty days and accept the loss of older logs',
    ],
    correct: 'B',
    signal: 'Two access patterns, thirty days and seven years, need two storage tiers.',
    why: 'Log 30 hari terakhir harus interaktif (Logs Insights); arsip 7 tahun jarang di-query (S3 + lifecycle Glacier + Athena). Dua pola akses = dua tier.',
    others: {
      A: 'Menyimpan 7 tahun di CloudWatch Logs adalah biaya yang dikeluhkan.',
      C: 'OpenSearch 7 tahun untuk 2 query/tahun adalah opsi termahal.',
      D: 'Menghapus log setelah 30 hari melanggar retensi regulasi 7 tahun.',
    },
    docs: ['https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/WhatIsCloudWatchLogs.html'],
  },
  'LOC-396': {
    options: [
      'Migrate the job to Amazon EMR on EC2 with Spot Instances',
      'Run the job on Glue Flex execution',
      'Switch to memory-optimised R workers',
      'Reduce the worker count to five and accept a longer runtime',
    ],
    correct: 'B',
    signal: 'Six hours of slack before the deadline is the planted detail. Flex trades start-time certainty for a discount.',
    why: 'Glue Flex hingga ~34% lebih murah untuk job tanpa deadline ketat. Ada slack 6 jam sebelum jam 2 — kondisi Flex.',
    others: {
      A: 'EMR Spot memang murah tetapi menambah klaster yang harus dioperasikan untuk job yang sudah jalan di Glue.',
      C: 'Worker R lebih mahal; utilisasi merata jadi memory bukan bottleneck.',
      D: 'Lebih sedikit worker, runtime lebih lama; Glue menagih DPU-jam sehingga total biaya hampir sama.',
    },
    docs: ['https://docs.aws.amazon.com/glue/latest/dg/add-job.html'],
  },
  'LOC-432': {
    options: [
      'An AWS Glue Spark job listing the prefix and processing every object',
      'A single Lambda function iterating over the objects in a loop',
      'A Step Functions inline Map state over a list of four million keys',
      'A Step Functions Distributed Map state invoking a Lambda function per object',
    ],
    correct: 'D',
    signal: 'Millions of independent objects, no custom fan-out, per-item tracking. That combination names Distributed Map.',
    why: 'Distributed Map membaca daftar objek dari S3, fan-out ribuan child paralel, dan mencatat sukses/gagal per item. Tidak perlu fan-out kustom.',
    others: {
      A: 'Spark pada 4 juta objek kecil menghabiskan waktu listing/open file.',
      B: 'Satu Lambda serial 4 juta objek melewati batas 15 menit.',
      C: 'Inline Map punya batas payload dan concurrency; 4 juta item melebihinya.',
    },
    docs: ['https://docs.aws.amazon.com/step-functions/latest/dg/state-map-distributed.html'],
  },
  'LOC-425': {
    options: [
      'Add an S3 gateway endpoint with an endpoint policy naming the two buckets, and remove the NAT route for S3',
      'Keep the NAT gateway and add a bucket policy on each of the two buckets',
      'Add an interface endpoint for Amazon S3 and rely on the Glue role IAM policy',
      'Move the Glue jobs to public subnets so the routing is simpler',
    ],
    correct: 'A',
    signal: 'Two requirements: private path, and a restricted set of destinations. Only an endpoint policy delivers the second.',
    why: 'S3 gateway VPC endpoint memindahkan lalu lintas dari internet/NAT. Endpoint policy membatasi hanya dua bucket yang bisa dicapai lewat path itu.',
    others: {
      B: 'Bucket policy tidak mencegah akses ke bucket orang lain; lalu lintas tetap lewat internet.',
      C: 'Interface endpoint + IAM menjaga path privat tetapi tidak membatasi destinasi di tingkat jaringan.',
      D: 'Subnet publik memindahkan job ke internet — kebalikan dari syarat.',
    },
    docs: ['https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html'],
  },
  'LOC-395': {
    options: [
      'The Lambda function is timing out before the summary is written',
      'The crawler needs a longer schedule interval',
      'The Glue job is being invoked with the default request-response pattern, so the state machine does not wait for it to finish',
      'The state machine should be an Express workflow rather than Standard',
    ],
    correct: 'C',
    signal: 'Every step succeeds and the output is wrong. That combination points at ordering rather than failure.',
    why: 'Tanpa pola .sync, StartJobRun kembali segera. State machine lanjut ke crawler sementara job Glue masih menulis, jadi katalog hanya melihat sebagian data. Semua step tetap "sukses".',
    others: {
      A: 'Timeout akan menggagalkan state; skenario bilang setiap malam sukses.',
      B: 'Crawler dipicu state machine, bukan jadwal independen.',
      D: 'Express mengubah batas durasi/harga, bukan apakah step menunggu job selesai.',
    },
    docs: ['https://docs.aws.amazon.com/step-functions/latest/dg/connect-glue.html'],
  },
}

const applied = []
for (const [id, g] of Object.entries(GOLD)) applied.push(applyGold(id, g))

// Soal slide lain yang opsinya masih terpecah: jangan dinilai sampai direkonstruksi
const FRAG = /^(backed by|and |which is|compatible|columns|mode$|topics$|job$|files |memory |policy to|primary copies|accessed data|flexible schemas)/i
let forcedStudy = 0
for (const q of qs) {
  if (GOLD[q.id]) continue
  const src = String(q.provenance || '')
  if (!/pdf_slide/.test(src)) continue
  const bodies = (q.options || []).map((o) => o.body)
  const broken =
    bodies.some((b) => b.length < 28) ||
    bodies.some((b) => FRAG.test(b)) ||
    bodies.some((b) => /--- page \d+ ---|PAUSE AND DECIDE|THE SIGNAL/i.test(b))
  if (!broken) continue
  q.has_answer_key = false
  q.verification_status = 'uncertain'
  for (const o of q.options || []) o.correct = false
  if (!String(q.explanation || '').includes('study-only')) {
    q.explanation = `**Pembahasan (study-only):** Opsi hasil OCR slide terpecah dua kolom, jadi kunci huruf tidak dinilai.\n\n${q.explanation || ''}`
  }
  q.explanation_origin = 'slide_study_until_rebuilt'
  forcedStudy++
}

fs.writeFileSync(bankPath, `${JSON.stringify(qs, null, 2)}\n`)
console.log(
  JSON.stringify(
    {
      gold: applied.filter((x) => x.ok).length,
      gold_fail: applied.filter((x) => !x.ok),
      forced_study: forcedStudy,
      loc433: qs.find((q) => q.id === 'LOC-433').options.map((o) => `${o.correct ? '*' : ' '}${o.label}. ${o.body}`),
    },
    null,
    2,
  ),
)
