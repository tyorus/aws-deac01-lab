# Audit Bank Soal DEA-C01

Dibuat: 2026-11-12T14:51:43.084Z  
Objek: `aws-dea-c01/practice/compiled-question-bank.md` (452 entri, nomor Q# = urutan entri, LOC-### = id di `research-questions.json`).  
Status: **hanya laporan + patch usulan**; bank soal asli TIDAK diubah.

## 1. Ringkasan

| Ukuran | Jumlah |
|---|---|
| Total entri | 452 |
| Soal unik (setelah dedupe stem) | 369 |
| Entri dalam grup duplikat | 155 (72 grup) |
| Grup duplikat dengan kunci berbeda antar salinan | 41 |

**Status per entri (452)**

| Status | Jumlah | Arti |
|---|---|---|
| OK | 221 | kunci benar menurut dokumentasi AWS dan struktur bersih |
| KUNCI_BENAR_CONF_RENDAH | 2 | kunci benar tetapi reviewer kurang yakin / soal ambigu |
| KUNCI_BENAR_STRUKTUR_KACAU | 89 | kunci benar tetapi susunan stem/opsi rusak |
| KUNCI_SALAH | 77 | kunci di bank TIDAK sesuai dokumentasi AWS (terkonfirmasi dua reviewer independen) |
| KUNCI_DIDUGA_SALAH | 4 | kunci kemungkinan salah (kedua reviewer sepakat, tetapi keyakinan rendah) |
| OPSI_HILANG | 38 | opsi yang benar tidak ada di bank (hasil scrape terpotong); kunci apa pun yang tampil tidak valid |
| SOAL_CACAT_AMBIGU | 6 | soal cacat/ambigu, tidak ada jawaban pasti dari opsi yang ada |
| AMBIGU_PERLU_REVIEW | 15 | dua reviewer berbeda pendapat; perlu keputusan manual |

Hanya **221 dari 452** entri yang lolos penuh. Kunci jawaban salah atau diduga salah pada **81** entri (77 terkonfirmasi, 4 diduga), dan **38** entri tidak dapat dipakai sebagai soal berkunci karena opsi benarnya hilang.

## 2. Temuan sistemik (akar masalah)

1. **Kunci dari sumber PDF tidak dapat dipercaya.** Sumber `pdf_exam_dumps` tidak punya kunci jawaban sama sekali di file mentah (`dumps-items.json`: 0 kunci); kunci di bank berasal dari penyalinan antar-sibling atau tebakan heuristik (`fill_study_only_keys.py`), dan hampir semuanya `A`/`AB`. Contoh: Q299 (LOC-299, kunci A "buat tabel per negara") padahal jawaban benar B (Lake Formation row-level security). `pdf_slide_deck` (LOC-385..392) seluruhnya dikunci `A`.
2. **Opsi terpotong dari scrape ExamTopics.** Halaman publik hanya menyertakan 3 dari 4-5 opsi (mis. Q369, Q380). File mentah menyimpan kunci seperti `D` untuk soal yang hanya punya opsi A-C , tetapi bank menandai opsi yang terlihat (mis. A) sebagai benar. Total 107 entri berflag `options_lt4`.
3. **Kunci placeholder `ABCD`/`ABCDE`** dari ExamTopics "live-partial" diubah menjadi multi-select dengan semua opsi dianggap benar (mis. Q82, Q83, Q84, Q85, Q86, Q90, Q91) - tidak masuk akal secara teknis.
4. **Kunci komunitas (ExamTopics/GitHub) sering salah**, terutama pada soal multi-select dan soal yang jawabannya berubah setelah diskusi komunitas.
5. **Konflik antar salinan**: dari 72 grup duplikat, 41 grup punya kunci berbeda antar salinan; hampir selalu salinan PDF yang salah.
6. **Pembahasan di bank adalah template otomatis** (`generated_explanatory_v3`) yang membenarkan kunci apa pun yang tertulis; jika kunci salah, pembahasannya ikut salah. Semua entri berstatus KUNCI_SALAH perlu pembahasan digenerate ulang.
7. **Header scrape** `Question #: N Topic #: 1 [All AWS Certified ...]` masih menempel di 103 stem (kosmetik, patch global tersedia).

Rasio kunci salah per sumber:

| Sumber | Entri | Kunci salah/diduga salah |
|---|---|---|
| github_examtopics_cache | 196 | 4 |
| examtopics | 114 | 14 |
| pdf_slide_practice_exam | 60 | 18 |
| pdf_exam_dumps | 51 | 37 |
| pdf_80_mock | 18 | 8 |
| pdf_slide_deck | 8 | 0 |
| examice | 5 | 0 |

## 3. Kunci jawaban SALAH

Kunci yang tertulis di bank berbeda dari jawaban menurut dokumentasi AWS. "Kunci AWS" = hasil kesepakatan dua reviewer independen (ronde 1 dan ronde 2). Untuk salinan duplikat, kunci yang salah juga dicantumkan.

| Q# | ID | Sumber | Kunci bank | Kunci AWS | Yakin | Alasan ringkas | Dok. AWS |
|---|---|---|---|---|---|---|---|
| Q24 | LOC-024 (grup G024, salinan) | examtopics | B | **A** | medium | Data sudah diindeks di OpenSearch Service, dan OpenSearch Dashboards terintegrasi native sehingga tidak ada langkah query tambahan seperti Athena pada objek Avro di S3 (latensi lebih tinggi karena batch dan scan S3). Opsi C salah  | [dashboards](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/dashboards.html) |
| Q30 | LOC-030 (grup G030, salinan) | examtopics | B | **A** | medium | Dokumentasi Kinesis menyatakan throttling pada shard tertentu diatasi dengan memilih partition key yang mendistribusikan put secara merata. Menambah shard (B) tidak menyelesaikan hot shard bila key tetap terkonsentrasi; C dan D ha | [troubleshooting-producers](https://docs.aws.amazon.com/streams/latest/dev/troubleshooting-producers.html) [kinesis-using-sdk-java-resha](https://docs.aws.amazon.com/streams/latest/dev/kinesis-using-sdk-java-resharding.html) |
| Q34 | LOC-034 | examtopics | AB | **BD** | medium | Error 'No space left on device' di Spark terjadi saat shuffle melebihi kapasitas disk lokal executor; dokumentasi Glue menyarankan menyimpan shuffle data di S3 lewat --write-shuffle-files-to-s3 sebagai solusi berbiaya rendah dan e | [monitor-spark-shuffle-manage](https://docs.aws.amazon.com/glue/latest/dg/monitor-spark-shuffle-manager.html) [optimize-shuffles](https://docs.aws.amazon.com/prescriptive-guidance/latest/tuning-aws-glue-for-apache-spark/optimize-shuffles.html) |
| Q51 | LOC-051 | examtopics | ABC | **A** | high | Dokumentasi DynamoDB: TTL adalah cara hemat biaya untuk menghapus item yang tidak relevan, item dihapus otomatis biasanya dalam beberapa hari setelah kedaluwarsa tanpa memakai WCU. Perlu mengubah aplikasi untuk mengisi atribut TTL | [TTL](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html) |
| Q53 | LOC-053 | examtopics | ABC | **A** | medium | Dokumentasi crawler Glue: crawler mencari file/partisi baru atau berubah saat dijalankan dan memperbarui Data Catalog; bila tidak dijalankan, partisi baru tidak terdaftar sehingga query hanya melihat data lama atau sebagian. IAM r | [add-crawler](https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html) [partitions](https://docs.aws.amazon.com/athena/latest/ug/partitions.html) |
| Q64 | LOC-064 | examtopics | AB | **BC** | high | Dokumentasi Aurora zero-ETL: integration adalah pipeline terkelola yang mereplikasi data transaksional ke Redshift hampir real-time tanpa membangun pipeline ETL sehingga mengurangi beban operasional. Langkah yang diperlukan adalah | [zero-etl](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/zero-etl.html) [zero-etl.filtering](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/zero-etl.filtering.html) |
| Q76 | LOC-076 | examtopics | C | **B** | medium | Dokumentasi IAM global condition keys mencantumkan aws:CurrentTime sebagai kunci untuk membatasi akses berdasarkan waktu dengan operator tanggal. Pembatasan prefix objek S3 dilakukan lewat ARN di Resource element; $util.time (A) b | [reference_policies_condition](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html) [amazon-s3-policy-keys](https://docs.aws.amazon.com/AmazonS3/latest/userguide/amazon-s3-policy-keys.html) |
| Q80 | LOC-080 | examtopics | C | **B** | high | Dokumentasi Bedrock Knowledge Bases: layanan terkelola untuk RAG yang dapat menyertakan sitasi pada respons sehingga sumber asli bisa dirujuk. Ini memberi referensi langsung ke bagian materi dengan overhead terendah, sementara ops | [knowledge-base](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) [kb-test-retrieve-generate](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve-generate.html) |
| Q84 | LOC-084 | examtopics | ABC | **B** | medium | Dokumentasi Firehose: CloudWatch Logs events dikirim ke Firehose menggunakan subscription filter. Lambda transformation yang dipanggil Firehose menangani konversi format secara andal tanpa trigger S3 tambahan. Opsi C keliru karena | [writing-with-cloudwatch-logs](https://docs.aws.amazon.com/firehose/latest/dev/writing-with-cloudwatch-logs.html) [SubscriptionFilters](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html) |
| Q85 | LOC-085 | examtopics | ABC | **A** | low (diduga) | Dokumentasi Kinesis Data Streams: put-to-get delay umumnya kurang dari 1 detik, data durable dan elastis sehingga tidak hilang sebelum retention habis, cocok untuk clickstream real-time dengan jutaan event. Opsi B (Glue per 10 men | [introduction](https://docs.aws.amazon.com/streams/latest/dev/introduction.html) [what-is-this-service](https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html) |
| Q86 | LOC-086 | examtopics | ABC | **C** | high | Dokumentasi Athena: saat query dijalankan ulang, Athena dapat memakai hasil terakhir yang tersimpan, sehingga meningkatkan performa dan mengurangi byte yang dipindai; maksimum umur hasil dapat diatur hingga 7 hari. Mengubah datase | [reusing-query-results](https://docs.aws.amazon.com/athena/latest/ug/reusing-query-results.html) |
| Q90 | LOC-090 | examtopics | ABC | **A** | low (diduga) | Dokumentasi Step Functions menunjukkan integrasi Glue StartJobRun dengan pola Run a Job (.sync) sehingga state berikutnya (Lambda) berjalan hanya setelah job selesai sukses. Step Functions serverless dan menampilkan seluruh alur p | [connect-glue](https://docs.aws.amazon.com/step-functions/latest/dg/connect-glue.html) [concepts-view-execution-deta](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-view-execution-details.html) |
| Q91 | LOC-091 | examtopics | ABC | **C** | low (diduga) | Panduan AWS Iceberg dan Iceberg docs: merge-on-read mengoptimalkan kecepatan tulis (cocok untuk streaming) dengan konsekuensi baca lebih lambat yang dipulihkan lewat compaction rutin. Dokumentasi Glue menyatakan managed compaction | [compaction-management](https://docs.aws.amazon.com/glue/latest/dg/compaction-management.html) [https://iceberg.apache.org/d](https://iceberg.apache.org/docs/latest/configuration/) |
| Q176 | LOC-176 | github_examtopics_cache | BE | **BC** | medium | Dokumentasi Redshift: compound sort key lebih efisien ketika predikat query memakai prefix, yaitu subset kolom sort key secara berurutan. Query B dan C sama-sama memfilter Region ID dan Department ID (urutan di klausa WHERE tidak  | [t_Sorting_data](https://docs.aws.amazon.com/redshift/latest/dg/t_Sorting_data.html) |
| Q210 | LOC-210 | github_examtopics_cache | AC | **AB** | medium | Dokumentasi Glue: 'The Amazon S3 event crawl runs by consuming Amazon S3 events from the SQS queue based on the crawler schedule', dan setelah crawl pertama crawler dapat dijalankan manual atau dengan jadwal; hanya objek dari even | [crawler-s3-event-notificatio](https://docs.aws.amazon.com/glue/latest/dg/crawler-s3-event-notifications.html) |
| Q279 | LOC-279 | github_examtopics_cache | AB | **AC** | high | Dokumentasi: federated query dapat bekerja dengan Amazon Aurora PostgreSQL dan menggabungkan data live dengan query Redshift dan S3. Redshift Spectrum membaca file di S3 tanpa memuatnya ke tabel, dan UNLOAD menulis hasil query ke  | [federated-overview](https://docs.aws.amazon.com/redshift/latest/dg/federated-overview.html) [c-using-spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html) |
| Q281 | LOC-281 | github_examtopics_cache | A | **C** | low (diduga) | Athena serverless dan dapat menjalankan Apache Spark tanpa perencanaan/pengelolaan sumber daya (dokumentasi Athena Spark), sehingga tidak ada biaya klaster/data warehouse dan tidak perlu ETL. Opsi A dan D mengingest data ke Redshi | [notebooks-spark](https://docs.aws.amazon.com/athena/latest/ug/notebooks-spark.html) [data-sources-glue](https://docs.aws.amazon.com/athena/latest/ug/data-sources-glue.html) |
| Q299 | LOC-299 (grup G002, salinan) | pdf_exam_dumps | A | **B** | high | Lake Formation mendukung data filtering (row-level, column-level, cell-level) pada tabel Glue Data Catalog yang lokasinya terdaftar, sehingga akses per negara dapat diatur terpusat dengan usaha operasional minimal. Opsi A (tabel t | [data-filtering](https://docs.aws.amazon.com/lake-formation/latest/dg/data-filtering.html) |
| Q303 | LOC-303 (grup G005, salinan) | pdf_exam_dumps | AB | **BE** | medium | Pola data mesh AWS memakai S3 sebagai data lake, Glue Data Catalog sebagai katalog, Lake Formation untuk governance dan cross-account sharing terpusat, serta Athena untuk analisis. Glue DataBrew (C) adalah alat data preparation, b | [https://aws.amazon.com/blogs](https://aws.amazon.com/blogs/big-data/design-a-data-mesh-architecture-using-aws-lake-formation-and-aws-glue/) [what-is-lake-formation](https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html) |
| Q305 | LOC-305 (grup G009, salinan) | pdf_exam_dumps | A | **B** | high | Glue workflow dapat memicu crawler (SQL Server via JDBC) lalu ETL job ke S3 dan tidak ada biaya tambahan untuk workflow itu sendiri, sehingga paling hemat. Step Functions dan MWAA menambah biaya (per transisi / environment per jam | [workflows_overview](https://docs.aws.amazon.com/glue/latest/dg/workflows_overview.html) |
| Q306 | LOC-306 | pdf_exam_dumps | A | **B** | high | Dokumentasi Data API: 'doesn't require a persistent connection', menyediakan secure HTTP endpoint dan integrasi dengan AWS SDK sehingga dapat menjalankan SQL tanpa mengelola koneksi. Ini memberi overhead operasional paling kecil d | [data-api](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api.html) |
| Q309 | LOC-309 | pdf_exam_dumps | A | **C** | high | Dokumentasi Athena menyatakan Parquet/ORC memakai kompresi per kolom, predicate pushdown, dan splitting yang meningkatkan paralelisme sehingga hanya blok/kolom yang dibutuhkan yang dibaca. Kompresi saja (Snappy/gzip pada CSV) atau | [columnar-storage](https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html) [performance-tuning](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html) |
| Q312 | LOC-312 (grup G146, salinan) | pdf_exam_dumps | A | **B** | high | Redshift Data API mengirim event status statement (FINISHED/FAILED/ABORTED) ke EventBridge jika WithEvent=true, lalu rule EventBridge memanggil Lambda untuk menulis status ke DynamoDB. Data API tidak mempublikasikan pesan langsung | [data-api-monitoring-events](https://docs.aws.amazon.com/redshift/latest/mgmt/data-api-monitoring-events.html) |
| Q314 | LOC-314 | pdf_exam_dumps | A | **B** | high | Dokumentasi DMS: dapat melakukan migrasi sekali jalan atau mereplikasi perubahan berkelanjutan untuk menjaga sumber dan target tetap sinkron, memakai model pay-as-you-go, dan mengelola infrastruktur replikasi otomatis. Lambda buka | [Welcome](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html) [chap-manageddatabases.sqlser](https://docs.aws.amazon.com/dms/latest/sbs/chap-manageddatabases.sqlserver2rdssqlserver.html) |
| Q315 | LOC-315 (grup G202, salinan) | pdf_80_mock | A | **B** | high | AWS DMS mendukung migrasi homogen SQL Server ke RDS for SQL Server dengan replikasi berkelanjutan (CDC) sehingga cutover singkat dan downtime minimal. Lambda, Direct Connect (hanya konektivitas jaringan), dan DataSync (transfer fi | [Welcome](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html) [CHAP_Source.SQLServer](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Source.SQLServer.html) |
| Q316 | LOC-316 (grup G218, salinan) | pdf_exam_dumps | AB | **AD** | medium | Glue triggers (scheduled) menjalankan job tiap jam secara native tanpa komponen tambahan, dan Glue connections (JDBC/MongoDB/Redshift) menyediakan konektivitas ke semua sumber dan target. DataBrew (B) tidak diperlukan karena trans | [about-triggers](https://docs.aws.amazon.com/glue/latest/dg/about-triggers.html) [console-connections](https://docs.aws.amazon.com/glue/latest/dg/console-connections.html) |
| Q317 | LOC-317 (grup G200, salinan) | pdf_exam_dumps | A | **B** | high | Dokumentasi Redshift menyatakan query dirutekan ke concurrency-scaling cluster dengan mengaktifkan concurrency scaling pada antrean WLM (Concurrency Scaling mode = auto); fitur ini mendukung read dan write (COPY/INSERT/CTAS dll.)  | [concurrency-scaling](https://docs.aws.amazon.com/redshift/latest/dg/concurrency-scaling.html) |
| Q319 | LOC-319 (grup G140, salinan) | pdf_exam_dumps | A | **B** | high | Hanya Amazon EMR yang mendukung semua aplikasi tersebut (Pig, Oozie, Spark, HBase, Flink) dengan performa setara untuk data skala petabyte. AWS Glue tidak menjalankan Pig/Oozie/HBase, Lambda tidak cocok untuk beban ini, dan Redshi | [emr-release-components](https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-release-components.html) |
| Q320 | LOC-320 | pdf_exam_dumps | A | **B** | medium | Dokumentasi Glue: transform Detect PII dapat mendeteksi, menyamarkan (redact, partial redact) atau melakukan SHA-256 hash pada entitas PII, sehingga tidak perlu fungsi kustom. Glue Data Quality (opsi C/E) adalah untuk aturan valid | [detect-PII](https://docs.aws.amazon.com/glue/latest/dg/detect-PII.html) [data-quality-gs-studio](https://docs.aws.amazon.com/glue/latest/dg/data-quality-gs-studio.html) |
| Q321 | LOC-321 (grup G149, salinan) | pdf_exam_dumps | A | **B** | high | Glue workflows hanya mengorkestrasi crawler dan job Glue sehingga tidak mencakup EMR. Step Functions memiliki integrasi service untuk Glue dan EMR dan bersifat serverless (overhead rendah), sedangkan MWAA membutuhkan pengelolaan e | [workflows_overview](https://docs.aws.amazon.com/glue/latest/dg/workflows_overview.html) [connect-emr](https://docs.aws.amazon.com/step-functions/latest/dg/connect-emr.html) |
| Q322 | LOC-322 (grup G105, salinan) | pdf_exam_dumps | A | **C** | high | One Zone-IA menyimpan data di satu AZ sehingga tidak memenuhi persyaratan high availability (A dan D salah). Untuk data yang diakses hanya 1-2 kali setahun, Glacier Deep Archive lebih murah daripada Glacier Flexible Retrieval. Sal | [storage-class-intro](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html) [lifecycle-transition-general](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html) |
| Q325 | LOC-325 (grup G240, salinan) | pdf_exam_dumps | A | **C** | high | Athena Federated Query memakai data source connector (Lambda) untuk DynamoDB, RDS, Redshift, dan S3 sehingga JOIN lintas sumber bisa dilakukan secara serverless dan bayar per query. EMR provisioned (A) dan menyalin semua data ke S | [federated-queries](https://docs.aws.amazon.com/athena/latest/ug/federated-queries.html) [connectors-available](https://docs.aws.amazon.com/athena/latest/ug/connectors-available.html) |
| Q327 | LOC-327 (grup G143, salinan) | pdf_exam_dumps | AB | **BD** | high | S3 sebagai penyimpanan persisten memisahkan storage dari compute dan meningkatkan keandalan, sedangkan instance Graviton memberi price-performance lebih baik daripada x86 untuk Spark. HDFS (A) bersifat sementara di cluster, dan Sp | [emr-plan-instances-guideline](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-instances-guidelines.html) [emr-plan-storage](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-storage.html) |
| Q328 | LOC-328 (grup G204, baseline) | pdf_exam_dumps | A | **C** | high | Dokumentasi Redshift menyatakan streaming ingestion membaca langsung dari Kinesis Data Streams ke materialized view tanpa landing area sementara seperti S3, dan satu refresh dapat mengingest ratusan MB per detik. AUTO REFRESH dapa | [materialized-view-streaming-](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-streaming-ingestion.html) [materialized-view-streaming-](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-streaming-ingestion-getting-started.html) |
| Q330 | LOC-330 | pdf_exam_dumps | A | **C** | high | Dokumentasi Step Functions: state Map menjalankan sekumpulan langkah untuk setiap item dalam dataset dan iterasinya berjalan paralel; mode Distributed mendukung hingga 10.000 eksekusi child paralel dan dapat membaca daftar objek S | [state-map](https://docs.aws.amazon.com/step-functions/latest/dg/state-map.html) [state-map-distributed](https://docs.aws.amazon.com/step-functions/latest/dg/state-map-distributed.html) |
| Q331 | LOC-331 (grup G138, salinan) | pdf_exam_dumps | A | **B** | medium | Glue serverless dengan transform FindMatches adalah solusi terkelola untuk deduplikasi tanpa mengelola infrastruktur atau pustaka kustom. Opsi A dan C memakai ETL Python kustom yang butuh runtime/skala dikelola sendiri, sedangkan  | [machine-learning](https://docs.aws.amazon.com/glue/latest/dg/machine-learning.html) |
| Q332 | LOC-332 (grup G133, salinan) | pdf_exam_dumps | AB | **BC** | high | Dokumentasi performa Redshift Spectrum merekomendasikan format kolumnar (Parquet), partisi berdasarkan predikat query paling umum, dan file berukuran lebih dari 64 MB dengan ukuran seragam. Gzip pada file individual (A) tidak spli | [c-spectrum-external-performa](https://docs.aws.amazon.com/redshift/latest/dg/c-spectrum-external-performance.html) |
| Q333 | LOC-333 (grup G188, salinan) | pdf_exam_dumps | AB | **CD** | medium | Lambda default berjalan di luar VPC; agar terhubung privat ke RDS di private subnet, Lambda harus dikonfigurasi dengan VPC (subnet yang sama) dan security group; security group yang sama dengan aturan self-referencing pada port da | [configuration-vpc](https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html) [services-rds-tutorial](https://docs.aws.amazon.com/lambda/latest/dg/services-rds-tutorial.html) |
| Q334 | LOC-334 (grup G116, salinan) | pdf_exam_dumps | A | **B** | medium | Script jarang dipanggil dan perlu mengembalikan hasil ke API Gateway sehingga Lambda (serverless) memiliki overhead operasional terendah dibanding ECS (A) atau EKS (C). Opsi D (warming dengan EventBridge) menambah komponen, sedang | [provisioned-concurrency](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html) [getting-started-with-lambda-](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-with-lambda-integration.html) |
| Q336 | LOC-336 (grup G118, salinan) | pdf_exam_dumps | A | **D** | high | Pada pola cross-account log subscription ke Kinesis, data stream dan destination berada di akun penerima (security), role memberi CloudWatch Logs izin put ke stream, dan subscription filter dibuat di akun pengirim (production) yan | [Subscriptions](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Subscriptions.html) [SubscriptionFilters](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html) |
| Q337 | LOC-337 (grup G194, salinan) | pdf_exam_dumps | A | **C** | medium | Format tabel terbuka mendukung MERGE/upsert langsung di data lake S3 untuk snapshot penuh harian dan skala puluhan TB, tanpa memuat ke RDS/Aurora + DMS (mahal) atau Lambda (terbatas waktu/memori 15 menit, tidak cocok untuk file pu | [aws-glue-programming-etl-for](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-iceberg.html) [introduction](https://docs.aws.amazon.com/prescriptive-guidance/latest/apache-iceberg-on-aws/introduction.html) |
| Q338 | LOC-338 (grup G248, salinan) | pdf_exam_dumps | AB | **AC** | high | Partition indexes mempercepat GetPartitions di Glue Data Catalog, dan partition projection menghitung lokasi partisi dari konfigurasi sehingga tidak memanggil metadata store. Bucketing, konversi ke Parquet, dan penggabungan file k | [glue-best-practices](https://docs.aws.amazon.com/athena/latest/ug/glue-best-practices.html) [partition-projection](https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html) |
| Q339 | LOC-339 (grup G229, salinan) | pdf_exam_dumps | A | **D** | high | Managed Service for Apache Flink mendukung agregasi window (tumbling/sliding/session) dengan state dan checkpointing yang fault tolerant. Lambda tumbling window pada Kinesis dibatasi maksimum 15 menit (900 detik) dengan state 1 MB | [what-is](https://docs.aws.amazon.com/managed-flink/latest/java/what-is.html) [services-kinesis-windows](https://docs.aws.amazon.com/lambda/latest/dg/services-kinesis-windows.html) |
| Q340 | LOC-340 (grup G142, salinan) | pdf_exam_dumps | A | **C** | high | Elastic Volumes memungkinkan mengubah tipe volume, ukuran, IOPS, dan throughput saat volume terpasang dan digunakan tanpa downtime, sehingga overhead paling kecil. Opsi A, B, D membuat volume baru dan memigrasikan data secara manu | [requesting-ebs-volume-modifi](https://docs.aws.amazon.com/ebs/latest/userguide/requesting-ebs-volume-modifications.html) |
| Q342 | LOC-342 (grup G255, salinan) | pdf_exam_dumps | A | **B** | high | Dokumentasi Redshift menyatakan STL_ALERT_EVENT_LOG mencatat alert saat optimizer menemukan kondisi yang berpotensi menimbulkan masalah performa. STL_USAGE_CONTROL untuk limit penggunaan, STL_QUERY_METRICS untuk metrik query, STL_ | [r_STL_ALERT_EVENT_LOG](https://docs.aws.amazon.com/redshift/latest/dg/r_STL_ALERT_EVENT_LOG.html) |
| Q343 | LOC-343 (grup G228, salinan) | pdf_exam_dumps | E | **D** | high | Athena menagih per data yang dipindai; format kolumnar seperti Parquet memungkinkan membaca hanya 1-2 dari 15 kolom dan terkompresi, sehingga paling hemat. CSV dan JSON adalah row-based, Avro juga row-based. Salinan LOC-343 (kunci | [columnar-storage](https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html) [performance-tuning](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html) |
| Q344 | LOC-344 (grup G123, salinan) | pdf_exam_dumps | AB | **BD** | high | Lake Formation memungkinkan lokasi S3 didaftarkan (B) lalu memberi izin row-level lewat data filter per Region (D) kepada IAM role tiap departemen HR, sehingga overhead operasional minimal. Opsi A salah karena data filter tidak di | [data-filtering](https://docs.aws.amazon.com/lake-formation/latest/dg/data-filtering.html) [register-location](https://docs.aws.amazon.com/lake-formation/latest/dg/register-location.html) |
| Q346 | LOC-346 (grup G137, salinan) | pdf_exam_dumps | A | **C** | medium | Volume EBS tambahan (non-root) secara default memiliki DeleteOnTermination=false sehingga data bertahan setelah instance dihentikan, sedangkan root volume EBS default dihapus saat terminasi (B salah) dan instance store bersifat se | [terminating-instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/terminating-instances.html) [InstanceStorage](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html) |
| Q347 | LOC-347 (grup G184, salinan) | pdf_exam_dumps | A | **B** | high | Dokumentasi Athena: untuk memakai Apache Spark, buat workgroup Athena yang menggunakan engine Spark, lalu buka notebook editor. Query settings, data source, dan query editor tidak mengaktifkan Spark (query editor hanya untuk workg | [notebooks-spark-getting-star](https://docs.aws.amazon.com/athena/latest/ug/notebooks-spark-getting-started.html) |
| Q348 | LOC-348 (grup G153, salinan) | pdf_80_mock | A | **C** | medium | Memanggil create_partition saat data ditulis memperbarui Data Catalog seketika sehingga latensi paling rendah. Crawler terjadwal pagi hari (A) dan pemanggilan manual dua kali sehari (B) menyebabkan jeda panjang, dan MSCK REPAIR TA | [API_CreatePartition](https://docs.aws.amazon.com/glue/latest/webapi/API_CreatePartition.html) |
| Q349 | LOC-349 (grup G153, salinan) | pdf_exam_dumps | A | **C** | medium | Memanggil create_partition saat data ditulis memperbarui Data Catalog seketika sehingga latensi paling rendah. Crawler terjadwal pagi hari (A) dan pemanggilan manual dua kali sehari (B) menyebabkan jeda panjang, dan MSCK REPAIR TA | [API_CreatePartition](https://docs.aws.amazon.com/glue/latest/webapi/API_CreatePartition.html) |
| Q350 | LOC-350 | pdf_exam_dumps | A | **B** | high | Dokumentasi AppFlow: layanan integrasi terkelola penuh untuk bertukar data antara aplikasi SaaS (misalnya Salesforce, Zendesk) dan layanan AWS seperti S3 dan Redshift, dapat dijadwalkan atau on-demand tanpa menulis kode. MSK dan K | [what-is-appflow](https://docs.aws.amazon.com/appflow/latest/userguide/what-is-appflow.html) |
| Q352 | LOC-352 (grup G215, salinan) | pdf_exam_dumps | A | **B** | medium | S3 Select mendukung objek Parquet dan memfilter kolom di sisi S3 tanpa infrastruktur, sehingga overhead terendah untuk tugas satu kali; opsi A (Lambda+pandas), C (DataBrew), dan D (crawler+Athena) lebih banyak komponen. Dokumentas | [selecting-content-from-objec](https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html) |
| Q353 | LOC-353 | pdf_exam_dumps | A | **C** | medium | Dokumentasi query editor v2: scheduled queries menjalankan pernyataan SQL otomatis pada waktu/interval tertentu, termasuk untuk menyegarkan dashboard dan rutinitas data, sehingga REFRESH MATERIALIZED VIEW dapat dijadwalkan tanpa i | [query-editor-v2-schedule-que](https://docs.aws.amazon.com/redshift/latest/mgmt/query-editor-v2-schedule-query.html) [materialized-view-refresh](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-refresh.html) |
| Q354 | LOC-354 (grup G191, salinan) | pdf_80_mock | A | **C** | medium | Query editor v2 mendukung scheduled query (via EventBridge) yang menjalankan REFRESH MATERIALIZED VIEW tanpa infrastruktur tambahan sehingga usaha paling kecil di antara opsi. Airflow dan Glue workflow memerlukan orkestrator terpi | [materialized-view-refresh](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-refresh.html) [query-editor-v2-schedule-que](https://docs.aws.amazon.com/redshift/latest/mgmt/query-editor-v2-schedule-query.html) |
| Q355 | LOC-355 (grup G155, salinan) | pdf_exam_dumps | A | **B** | high | Glue crawlers dapat terhubung ke RDS, Redshift (JDBC), dan S3, menginfer skema JSON/XML, dan memperbarui Data Catalog sesuai jadwal sehingga mendeteksi perubahan metadata dengan overhead minimal. Opsi A dan C membangun katalog kus | [add-crawler](https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html) |
| Q356 | LOC-356 (grup G172, salinan) | pdf_exam_dumps | A | **C** | high | Untuk beban yang dapat diprediksi pada jadwal tetap, scheduled scaling pada Application Auto Scaling (provisioned mode) paling hemat dan konsisten. Provision kapasitas puncak terus-menerus (A) boros, membagi tabel (B) tidak menyel | [AutoScaling](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html) [application-auto-scaling-sch](https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-scheduled-scaling.html) |
| Q357 | LOC-357 (grup G285, salinan) | pdf_80_mock | AB | **CE** | medium | Panduan performance tuning Athena menyarankan format kolumnar seperti Parquet (hanya membaca blok/kolom yang dibutuhkan predikat) dan menempatkan bucket di Region yang sama dengan query untuk menghindari latensi/biaya lintas Regio | [performance-tuning](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html) [optimizing-performance](https://docs.aws.amazon.com/AmazonS3/latest/userguide/optimizing-performance.html) |
| Q358 | LOC-358 (grup G187, salinan) | pdf_80_mock | AB | **AD** | medium | Performance Insights mengidentifikasi query yang membebani CPU sehingga dapat dioptimalkan, dan instance lebih besar menambah kapasitas CPU. Beban mayoritas tulis sehingga caching (E) tidak banyak membantu, tambahan tabel/indeks ( | [USER_PerfInsights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html) [Concepts.DBInstanceClass](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html) |
| Q359 | LOC-359 (grup G127, salinan) | pdf_80_mock | A | **C** | high | Dokumentasi VACUUM: REINDEX 'analyzes the distribution of the values in interleaved sort key columns, then performs a full VACUUM'. VACUUM FULL tidak melakukan reindex untuk tabel interleaved, DELETE ONLY tidak mengurutkan, SORT O | [r_VACUUM_command](https://docs.aws.amazon.com/redshift/latest/dg/r_VACUUM_command.html) |
| Q363 | LOC-363 (grup G179, salinan) | pdf_80_mock | C | **D** | high | Dokumentasi: tier otomatis (Frequent, Infrequent, Archive Instant Access) memiliki latensi milidetik, sedangkan Archive Access dan Deep Archive Access (opsional) memerlukan RestoreObject (menit-jam). Karena semua data harus dapat  | [intelligent-tiering-overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering-overview.html) |
| Q365 | LOC-365 (grup G246, salinan) | pdf_80_mock | AB | **CD** | medium | Dokumentasi QuickSight menyebut error 'insufficient permissions' pada dataset Athena biasanya akibat QuickSight belum diberi akses ke bucket S3 yang mendasari tabel Athena (dan kunci KMS bila terenkripsi). Opsi A dan B bukan masal | [troubleshoot-athena-insuffic](https://docs.aws.amazon.com/quicksight/latest/user/troubleshoot-athena-insufficient-permissions.html) [security-resource-access](https://docs.aws.amazon.com/quicksight/latest/user/security-resource-access.html) |
| Q372 | LOC-372 | examtopics | A | **B** | high | Dokumentasi CloudWatch Logs: log group data protection policy dapat mengaudit dan menyamarkan data sensitif pada event log yang di-ingest, dengan managed data identifier termasuk PII; data disamarkan di semua titik egress, dan han | [mask-sensitive-log-data](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html) [console-security-configurati](https://docs.aws.amazon.com/glue/latest/dg/console-security-configurations.html) |
| Q393 | LOC-393 | pdf_slide_practice_exam | A | **C** | medium | MSK Serverless ditujukan untuk kapasitas on-demand yang naik-turun otomatis, mewajibkan IAM access control (ACL Kafka tidak didukung) dan memiliki kuota throughput, sehingga kurang cocok untuk beban tinggi, stabil, dan terprediksi | [serverless](https://docs.aws.amazon.com/msk/latest/developerguide/serverless.html) [msk-replicator](https://docs.aws.amazon.com/msk/latest/developerguide/msk-replicator.html) |
| Q395 | LOC-395 | pdf_slide_practice_exam | A | **D** | medium | Dokumentasi Step Functions untuk Glue menyatakan integrasi teroptimasi mendukung pola Run a Job (.sync) (arn:aws:states:::glue:startJobRun.sync) yang menunggu job selesai. Tanpa .sync (pola default request-response), state berikut | [connect-glue](https://docs.aws.amazon.com/step-functions/latest/dg/connect-glue.html) |
| Q400 | LOC-400 | pdf_slide_practice_exam | A | **B** | medium | S3 Tables mengaktifkan compaction (gabung file kecil, target 512 MB default) dan snapshot management (MaximumSnapshotAge default 120 jam) secara default untuk semua tabel. Ini menjawab file kecil dari Firehose yang memperlambat qu | [s3-tables-maintenance](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-tables-maintenance.html) [s3-tables-maintenance-overvi](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-tables-maintenance-overview.html) |
| Q402 | LOC-402 | pdf_slide_practice_exam | B | **A** | high | Dokumentasi DynamoDB menyatakan LSI harus memakai partition key yang sama dengan tabel dasar dan hanya dapat dibuat saat tabel dibuat, sehingga tidak mungkin pada tabel 200 juta item dengan order ID sebagai partition key. GSI dapa | [SecondaryIndexes](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html) [LSI](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/LSI.html) |
| Q403 | LOC-403 | pdf_slide_practice_exam | B | **C** | high | Dokumentasi Glue menjelaskan enableUpdateCatalog memungkinkan job ETL menambahkan partisi baru ke Data Catalog tanpa menjalankan ulang crawler. Partition projection hanya dipakai saat tabel di-query lewat Athena; Redshift Spectrum | [update-from-job](https://docs.aws.amazon.com/glue/latest/dg/update-from-job.html) [partition-projection](https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html) |
| Q404 | LOC-404 | pdf_slide_practice_exam | A | **D** | medium | Alarm kegagalan hanya aktif bila ada run yang gagal; jika EventBridge rule dinonaktifkan, job tidak berjalan sama sekali sehingga tidak ada metrik gagal. Dokumentasi CloudWatch menyebut alarm dapat diatur bagaimana memperlakukan d | [AlarmThatSendsEmail](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html) [monitoring-awsglue-with-clou](https://docs.aws.amazon.com/glue/latest/dg/monitoring-awsglue-with-cloudwatch-metrics.html) |
| Q408 | LOC-408 | pdf_slide_practice_exam | A | **B** | medium | Dokumentasi Lake Formation menjelaskan data filtering menyediakan column-level security: pengguna hanya melihat kolom yang diizinkan, sehingga kolom PII dapat dikecualikan dari hasil query Athena. IAM policy bekerja pada level res | [data-filtering](https://docs.aws.amazon.com/lake-formation/latest/dg/data-filtering.html) [granting-table-permissions](https://docs.aws.amazon.com/lake-formation/latest/dg/granting-table-permissions.html) |
| Q414 | LOC-414 | pdf_slide_practice_exam | A | **D** | high | Dokumentasi Lambda menyatakan timeout maksimum 900 detik (15 menit), sehingga file yang butuh 8-40 menit gagal dan menaikkan timeout/memori (opsi A+C) tidak bisa melewati batas tersebut. AWS Batch menjalankan kontainer tanpa batas | [configuration-timeout](https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html) [what-is-batch](https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html) |
| Q415 | LOC-415 | pdf_slide_practice_exam | B | **A** | high | Dokumentasi AppFlow menyebut layanan terkelola untuk transfer data antara aplikasi SaaS seperti Salesforce dan S3 tanpa menulis kode, dapat dijalankan sesuai jadwal. Pagination, OAuth refresh, dan retry ditangani layanan, serta ma | [what-is-appflow](https://docs.aws.amazon.com/appflow/latest/userguide/what-is-appflow.html) [salesforce](https://docs.aws.amazon.com/appflow/latest/userguide/salesforce.html) |
| Q422 | LOC-422 | pdf_slide_practice_exam | A | **C** | high | Dokumentasi Athena menyatakan jika tabel berpartisi di-query dengan partisi dalam klausa WHERE, Athena hanya memindai partisi tersebut. Predikat yang memakai fungsi atas kolom lain tidak merujuk kolom partisi sehingga seluruh lima | [partitions](https://docs.aws.amazon.com/athena/latest/ug/partitions.html) [performance-tuning](https://docs.aws.amazon.com/athena/latest/ug/performance-tuning.html) |
| Q430 | LOC-430 | pdf_slide_practice_exam | B | **D** | medium | Dokumentasi Glue menyatakan tagihan berdasarkan jumlah DPU yang dipakai dikali durasi, dan G.1X (1 DPU per worker) cukup untuk sebagian besar job. Job default 10 worker untuk 8 GB dengan utilisasi sangat rendah terlalu besar, sehi | [add-job](https://docs.aws.amazon.com/glue/latest/dg/add-job.html) [monitor-debug-capacity](https://docs.aws.amazon.com/glue/latest/dg/monitor-debug-capacity.html) |
| Q433 | LOC-433 | pdf_slide_practice_exam | B | **A** | high | Dokumentasi Transfer Family menyebut layanan terkelola tanpa server yang harus dijalankan, mendukung SFTP langsung ke/dari S3, mempertahankan konfigurasi klien yang ada, dan umum dipakai untuk unggahan dari vendor/mitra ke data la | [what-is-aws-transfer-family](https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html) |
| Q439 | LOC-439 | pdf_slide_practice_exam | A | **B** | high | Dokumentasi Glue menjelaskan tanpa indeks, GetPartitions memuat semua partisi lalu memfilter, sehingga lambat pada ratusan ribu partisi; dengan indeks hanya subset yang diambil. Untuk Athena perlu menambahkan properti tabel partit | [partition-indexes](https://docs.aws.amazon.com/glue/latest/dg/partition-indexes.html) [partition-projection](https://docs.aws.amazon.com/athena/latest/ug/partition-projection.html) |
| Q442 | LOC-442 | pdf_slide_practice_exam | A | **C** | high | Dokumentasi Athena menjelaskan kontrol per-query menetapkan total data yang dipindai per query (10 MB hingga 7 EB) dan query yang melewatinya dibatalkan. AWS Budgets alert dan workgroup alert hanya memberi notifikasi, sedangkan me | [workgroups-setting-control-l](https://docs.aws.amazon.com/athena/latest/ug/workgroups-setting-control-limits-cloudwatch.html) |
| Q445 | LOC-445 | pdf_slide_practice_exam | A | **D** | high | Dokumentasi S3 menyatakan Bucket Keys mengurangi biaya request KMS hingga 99% dengan membuat bucket-level key berumur pendek, dan KMS tetap mencatat akses di CloudTrail. Beralih ke SSE-S3 melanggar syarat customer managed key, men | [bucket-key](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-key.html) |
| Q446 | LOC-446 | pdf_slide_practice_exam | A | **B** | medium | Dokumentasi DataZone menyebut layanan ini memungkinkan menyetujui subscription data lewat governed workflow, memberi transparansi penggunaan asset dan usage auditing, serta pemberian akses ke tabel Glue yang dikelola Lake Formatio | [what-is-datazone](https://docs.aws.amazon.com/datazone/latest/userguide/what-is-datazone.html) |
| Q448 | LOC-448 | pdf_slide_practice_exam | AD | **AB** | high | Dokumentasi Athena menyatakan format kolumnar seperti Parquet hanya membaca kolom yang diminta, sehingga menghindari SELECT * dari 90 kolom menurunkan byte yang dipindai. Query result reuse menghindari eksekusi ulang query identik | [reusing-query-results](https://docs.aws.amazon.com/athena/latest/ug/reusing-query-results.html) [columnar-storage](https://docs.aws.amazon.com/athena/latest/ug/columnar-storage.html) |
| Q449 | LOC-449 | pdf_slide_practice_exam | AB | **AD** | medium | Dokumentasi Step Functions menjelaskan state Task, Parallel, dan Map dapat memiliki field Retry dan Catch (fallback states) untuk menangani error; integrasi Glue .sync menunggu job selesai sebelum state berikutnya, sehingga job ti | [concepts-error-handling](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html) [connect-glue](https://docs.aws.amazon.com/step-functions/latest/dg/connect-glue.html) |

## 4. Opsi hilang / soal cacat / ambigu (kunci tidak dapat dipastikan)

Entri ini sebaiknya dikeluarkan dari mode berkunci (jadikan `study_only`) sampai opsi lengkap dipulihkan dari sumber lain atau soal diputuskan secara manual.

| Q# | ID | Status | Kunci bank | Solusi benar menurut AWS | Yakin | Catatan |
|---|---|---|---|---|---|---|
| Q23 | LOC-023 | SOAL_CACAT_AMBIGU | AC | Memperpanjang message retention period (maks 14 hari) agar pesan tidak kedaluwarsa selama downtime konsumen; DLQ hanya menampung pesan yang gagal diproses melebihi maxReceiveCount, bukan pesan yang ke | medium | Soal 'choose two' tetapi hanya A yang sepenuhnya valid. Kunci yang paling mungkin dimaksud soal adalah AC (DLQ dianggap pengaman tambahan),  |
| Q37 | LOC-037 | AMBIGU_PERLU_REVIEW | A | Kelompokkan tabel dan view tiap departemen ke schema terpisah dalam satu database Redshift dan kelola permission di level schema; query lintas schema tetap bisa dalam satu query. | low | ronde 1: B; ronde 2: A / Hanya 3 opsi terlihat (kemungkinan ada opsi D yang hilang), tetapi A jelas memenuhi LEAST operational overhead. |
| Q46 | LOC-046 | AMBIGU_PERLU_REVIEW | A | Kode perbaikan data kolom postal code perlu memakai DynamicFrame dengan skema/tipe terdefinisi (mis. resolveChoice/apply_mapping) plus transformasi pembersihan nilai; dari opsi yang terlihat, hanya A  | low | ronde 1: -; ronde 2: A / Stem tidak punya kata kunci (LEAST overhead, dll.) dan hanya 3 opsi terlihat; kemungkinan opsi benar (mis. job Glue |
| Q65 | LOC-065 | AMBIGU_PERLU_REVIEW | B | Gunakan EventBridge schedule (tiap jam) untuk memulai Step Functions yang mengorkestrasi Lambda pengecek data dan langkah pemrosesan dengan retry/catch bawaan per state. | low | ronde 1: -; ronde 2: A / Raw source menyebut B, tetapi menurut dokumentasi A lebih sesuai untuk robust error handling. Kata 'deploy an AWS L |
| Q82 | LOC-082 | OPSI_HILANG | ABC | Gunakan format kolumnar (Parquet) dan partisi menurut kolom yang paling sering difilter query (sensor category) agar partition pruning membatasi data yang dipindai; urutkan dalam file menurut tanggal. | low | ronde 2 menemukan kandidat pada opsi terlihat, tetapi ronde 1 menilai opsi benar tidak terlihat / Hanya 3 opsi terlihat; opsi D kemungkinan  |
| Q83 | LOC-083 | OPSI_HILANG | ABC | Muat data staging ke Redshift lalu jalankan MERGE (atau DELETE...USING staging diikuti INSERT) pada tabel orders dalam satu transaksi; opsi ini tidak ada di opsi yang terlihat (kemungkinan opsi D). | medium |  |
| Q87 | LOC-087 | AMBIGU_PERLU_REVIEW | C | Gunakan AWS Glue (serverless Spark) untuk job PySpark terjadwal dengan library kustom disediakan lewat parameter Glue, lalu tulis ke Redshift; ini overhead operasional terendah dan sangat scalable. | low | ronde 1: -; ronde 2: A / Raw source menyebut C (EMR), tetapi menurut kata kunci LEAST operational overhead dan serverless, Glue (A) lebih te |
| Q100 | LOC-100 | KUNCI_BENAR_STRUKTUR_KACAU | B | Gunakan CloudFormation StackSets dengan service-managed permissions (AWS Organizations) untuk deploy template terpusat ke banyak akun; pemicu dari commit Git biasanya ditambah pipeline yang memperbaru | low | Auto-deployment StackSets hanya terpicu saat akun ditambah/dipindah/dihapus di OU, bukan oleh commit Git; syarat update otomatis dari Git ti |
| Q101 | LOC-101 | AMBIGU_PERLU_REVIEW | C | Buat tabel Athena (CREATE EXTERNAL TABLE) yang menunjuk lokasi S3 dengan nama kolom yang sudah ditentukan, pakai di Athena dan Quick Suite, dan perbarui skema tabel saat kolom baru ditambahkan. | low | ronde 1: -; ronde 2: A / Raw source menyebut C (built-in classifier + crawler); namun C tidak menjamin nama kolom yang sudah ditentukan. Soa |
| Q108 | LOC-108 | AMBIGU_PERLU_REVIEW | D | Gunakan EFS Replication dari setiap file system regional ke Region tim data science, lalu mount file system replika dari Lambda di Region tersebut; replikasi bersifat terkelola dan otomatis sehingga u | low | ronde 1: -; ronde 2: B / Raw source menyebut D (DataSync), yang juga valid secara fungsional namun butuh lebih banyak konfigurasi. Detail re |
| Q147 | LOC-147 | AMBIGU_PERLU_REVIEW | A | Gunakan koneksi JDBC AWS Glue ke Oracle dengan job bookmark pada kolom yang bertambah monoton untuk hanya mengambil data baru, dijadwalkan setelah refresh data warehouse (setelah 2 AM, sebelum 10 AM). | low | ronde 1: -; ronde 2: B / Raw source menyebut A. Ambigu: karena tabel <50 GB, full reload harian (D) juga layak dan tanpa logika custom, teta |
| Q159 | LOC-159 | AMBIGU_PERLU_REVIEW | B | Gunakan AWS Glue DataBrew dengan transformasi NEST_TO_MAP untuk menggabungkan kolom Door_No, Street_Name, City, dan Zip_Code menjadi satu kolom berisi pasangan key-value (nama kolom : nilai). | low | ronde 1: -; ronde 2: B / Format target ('//IMG//') berupa gambar yang hilang dari scrape, sehingga pilihan antara NEST_TO_MAP vs NEST_TO_ARR |
| Q193 | LOC-193 | SOAL_CACAT_AMBIGU | AB | Akses lintas akun QuickSight ke S3 terenkripsi KMS memerlukan: bucket policy (dan izin S3 pada service role QuickSight) serta izin KMS (decrypt) pada key policy akun Hub dan IAM policy di service role | medium | ronde 1: BE / Opsi D dan E redundan; kunci kemungkinan BD atau BE (raw source hanya 'E'). Opsi A (enkripsi koneksi) dan C (AWS RAM tidak men |
| Q211 | LOC-211 | SOAL_CACAT_AMBIGU | A | Query yang benar seharusnya memfilter errorcode IS NOT NULL dan eventtime >= '2024-01-01T00:00:00Z' lalu ORDER BY eventtime DESC LIMIT 10 untuk mendapat 10 error paling baru. | low | Opsi terdekat dengan maksud soal dan kunci sumber adalah A (satu-satunya yang memfilter errorcode IS NOT NULL dan eventtime sekaligus dengan |
| Q223 | LOC-223 | AMBIGU_PERLU_REVIEW | B | Filter tahun harus diterapkan dengan benar terhadap kolom tanggal/waktu (extract(year FROM <kolom tanggal>) = 2023) alih-alih membandingkan kolom 'year' yang tidak sesuai dengan data/partisi. | low | ronde 1: -; ronde 2: B / Soal cacat sebagian: opsi B menulis extract(year FROM sales_data) padahal sales_data adalah nama tabel (seharusnya  |
| Q257 | LOC-257 | KUNCI_BENAR_CONF_RENDAH | AC | Tempatkan cluster Redshift di private subnet dengan akses privat (interface VPC endpoint/NAT untuk S3) dan aktifkan enhanced VPC routing serta konektivitas privat (Direct Connect) dari tiap penyedia d | low | Soal hasil rancangan ujian dengan opsi yang kurang rapi (A memakai NAT gateway untuk S3 padahal gateway endpoint lebih lazim). Kombinasi AC  |
| Q263 | LOC-263 | KUNCI_BENAR_CONF_RENDAH | C | Pakai Kinesis Data Streams dengan consumer kustom (KCL) yang menulis ke S3 dengan buffer ~5 detik, sehingga data mendarat jauh lebih cepat daripada buffer default Firehose (300 detik). | low | Ambigu antara C dan D karena sama-sama buffer 5 detik; C dipilih karena tidak ada hop Flink tambahan dan sesuai kunci sumber. Firehose kini  |
| Q286 | LOC-286 | SOAL_CACAT_AMBIGU | AC | Memperpanjang message retention period (maks 14 hari) agar pesan tidak kedaluwarsa selama downtime konsumen; DLQ hanya menampung pesan yang gagal diproses melebihi maxReceiveCount, bukan pesan yang ke | medium | Soal 'choose two' tetapi hanya A yang sepenuhnya valid. Kunci yang paling mungkin dimaksud soal adalah AC (DLQ dianggap pengaman tambahan),  |
| Q289 | LOC-289 | AMBIGU_PERLU_REVIEW | B | Untuk data gzip yang jarang di-query (audit), simpan di S3 Glacier Instant Retrieval (biaya penyimpanan rendah, akses milidetik) dan query dengan Athena; hindari Glacier Select/S3 Select yang sudah te | low | ronde 1: B; ronde 2: D / Ambigu (C vs D vs B sumber). S3 Select dan S3 Glacier Select deprecated/tertutup untuk pelanggan baru. Pilihan D di |
| Q351 | LOC-351 | AMBIGU_PERLU_REVIEW | A | Filter tahun harus diterapkan dengan benar terhadap kolom tanggal/waktu (extract(year FROM <kolom tanggal>) = 2023) alih-alih membandingkan kolom 'year' yang tidak sesuai dengan data/partisi. | low | ronde 1: -; ronde 2: B / Soal cacat sebagian: opsi B menulis extract(year FROM sales_data) padahal sales_data adalah nama tabel (seharusnya  |
| Q362 | LOC-362 | AMBIGU_PERLU_REVIEW | A | Gunakan AWS Glue DataBrew dengan transformasi NEST_TO_MAP untuk menggabungkan kolom Door_No, Street_Name, City, dan Zip_Code menjadi satu kolom berisi pasangan key-value (nama kolom : nilai). | low | ronde 1: -; ronde 2: B / Format target ('//IMG//') berupa gambar yang hilang dari scrape, sehingga pilihan antara NEST_TO_MAP vs NEST_TO_ARR |
| Q369 | LOC-369 | OPSI_HILANG | A | Gunakan tabel format terbuka transaksional (misalnya Apache Iceberg) di S3 dengan job AWS Glue Apache Spark yang melakukan MERGE (upsert) hanya untuk perubahan harian, bukan menulis ulang seluruh tabe | low | Hanya 3 dari 4 opsi tampak; kunci sumber 'D' hilang. Isi D tidak diketahui sehingga tidak ditebak. Halaman Glue-Iceberg menyatakan 'Update i |
| Q370 | LOC-370 | KUNCI_BENAR_STRUKTUR_KACAU | A | Use the Spark UI (enabled for the Glue job) to view job, stage, and task details; CloudWatch job metrics are not per-stage. | low | sumber mentah menunjuk opsi D yang hilang; jawaban A benar secara teknis tetapi belum tentu yang dimaksud soal |
| Q371 | LOC-371 | OPSI_HILANG | A | Untuk partisi year/month/day yang teratur, partition projection di Athena menghitung partisi dari properti tabel Glue sehingga tidak perlu membuat partisi manual setiap hari; alternatifnya crawler Glu | low | Opsi D hilang (options_lt4); teks opsi A tercemar stem. C (partition projection) adalah alternatif valid secara teknis dan mungkin jawaban j |
| Q373 | LOC-373 | OPSI_HILANG | A | Gunakan Amazon DynamoDB (mode on-demand atau provisioned dengan auto scaling) sebagai tabel log, yang menyediakan akses berbasis API ke item tertentu dengan latensi milidetik satu digit pada throughpu | low | Hanya 3 dari 4 opsi tampak; kunci sumber 'D' hilang. Jawaban DynamoDB adalah inferensi dari kebutuhan, bukan teks opsi yang terlihat. |
| Q374 | LOC-374 | OPSI_HILANG | A | Use Amazon Aurora zero-ETL integration with Amazon Redshift (Serverless), which replicates changes from multiple Aurora MySQL clusters in near real time with no pipeline to manage; this option is not  | medium |  |
| Q375 | LOC-375 | OPSI_HILANG | A | Buat IAM role dengan izin menulis ke bucket S3 dan kaitkan ke cluster Amazon Redshift agar Redshift dapat menulis (UNLOAD) data ke S3. | low | ronde 2 menemukan kandidat pada opsi terlihat, tetapi ronde 1 menilai opsi benar tidak terlihat / Kunci sumber 'D' menunjuk opsi yang tidak  |
| Q376 | LOC-376 | OPSI_HILANG | A | Use domain units in SageMaker Unified Studio (delegated ownership, authorization policies, publish/subscribe with approval for sharing) with IAM Identity Center for centralized authentication; the mat | medium |  |
| Q377 | LOC-377 | OPSI_HILANG | A | The correct statement is SELECT * EXCLUDE (companyId, unique_system_id) FROM orders.complete_orders_history; the visible options are placeholders. | high |  |
| Q378 | LOC-378 | OPSI_HILANG | A | Enable the MariaDB Audit Plugin (MARIADB_AUDIT_PLUGIN option group) on RDS for MySQL and publish the audit logs to CloudWatch Logs, plus AWS CloudTrail for instance-level changes; the matching option  | medium |  |
| Q379 | LOC-379 | OPSI_HILANG | A | Use Amazon Athena Federated Query (data source connectors) to join DynamoDB, RDS, Redshift, and S3 in place without moving data; this option is not visible. | medium |  |
| Q380 | LOC-380 | OPSI_HILANG | A | Store the semi-structured transactional data in Amazon DynamoDB (serverless, on-demand/auto scaling, single-digit millisecond reads); this option is the hidden option D, not one of the visible options | high |  |
| Q381 | LOC-381 | OPSI_HILANG | A | Gunakan isolasi SNAPSHOT di Redshift (default pada cluster/workgroup baru) agar query baca tidak saling memblokir dengan ETL yang menulis ke tabel dimensi, sehingga mengurangi lock, timeout, dan deadl | low | Hanya 3 opsi terlihat (options_lt4), kunci sumber kosong; isi opsi D tidak diketahui. Kemungkinan jawaban yang dimaksud berkaitan dengan iso |
| Q382 | LOC-382 | OPSI_HILANG | A | Use Redshift row-level security policies per department combined with dynamic data masking for PII (no dataset copies); this combination is likely in the hidden option D. | medium |  |
| Q384 | LOC-384 | OPSI_HILANG | A | Use S3 event notifications/EventBridge to trigger an AWS Glue job (or Lambda) that uses the Glue 'Detect PII' transform to detect and mask sensitive data, writing the result to a curated S3 location;  | medium |  |
| Q385 | LOC-385 | OPSI_HILANG | A | Set a 30-day retention on the CloudWatch log groups, export older logs to S3 with a lifecycle policy to Glacier, and query archives with Athena (Logs Insights for the recent 30 days). | medium |  |
| Q386 | LOC-386 | OPSI_HILANG | A | Enable S3 Bucket Keys on the SSE-KMS bucket (with the same customer managed key) to cut KMS request costs by up to 99% while keeping the CMK and audit trail. | high |  |
| Q387 | LOC-387 | OPSI_HILANG | A | Configure an Athena workgroup per-query data usage (data scanned) limit so any query scanning more than the limit is cancelled. | high |  |
| Q388 | LOC-388 | OPSI_HILANG | A | Use a data catalog with subscription/approval workflow (Amazon DataZone / SageMaker Catalog) so data owners approve access requests and each decision is recorded for audit. | medium |  |
| Q389 | LOC-389 | OPSI_HILANG | A | Tidak dapat ditentukan: stem hanya 'What should the data engineer implement?' tanpa konteks, dan opsi berisi noise OCR dari halaman ujian latihan (bukan opsi nyata). | low | Tidak ada dokumentasi yang dibuka karena soal tidak dapat dipakai (stem terlalu pendek, opsi OCR noise); tidak ada halaman yang relevan untu |
| Q390 | LOC-390 | SOAL_CACAT_AMBIGU | A | Dari sisa petunjuk (pencarian kecocokan makna ketika redaksi berbeda, tanpa kebutuhan latensi mikrodetik, di sistem yang sudah dijalankan tim) solusi yang dimaksud kemungkinan vector/semantic search p | low | Soal hasil scrape dari materi berbayar (footer 'D2ST0RE', 'admin@...'); stem dan opsi hilang total. |
| Q391 | LOC-391 | OPSI_HILANG | A | Use S3 Intelligent-Tiering, which automatically moves objects between access tiers with no retrieval charges (objects of 4 MB exceed the 128 KB monitoring threshold). | high |  |
| Q392 | LOC-392 | SOAL_CACAT_AMBIGU | A | Tidak dapat ditentukan: stem tidak memuat skenario. Catatan penjelasan yang tersisa ('streaming was overkill' pada skenario 1, 'analytical store is underpowered' di sini) mengisyaratkan pengganti beru | low | Stem terpotong dan opsi berupa noise OCR; tidak ada opsi benar yang terlihat. |
| Q394 | LOC-394 | OPSI_HILANG | A | Handle schema drift in the Glue job: use DynamicFrame ResolveChoice for the mixed-type column, handle the nested field (e.g. relationalize/unnest), and add Glue Data Quality checks/quarantine so bad r | medium |  |
| Q396 | LOC-396 | AMBIGU_PERLU_REVIEW | A | Jalankan job batch malam yang tidak mendesak dengan Glue Flex execution class (kapasitas spare, tarif DPU lebih murah) untuk menurunkan biaya tanpa migrasi. | low | ronde 1: -; ronde 2: B / Stem terpotong (jam mulai dan batas waktu hilang); jawaban mengasumsikan job tidak berbatas waktu ketat. Kunci sumb |
| Q397 | LOC-397 | OPSI_HILANG | A | Convert to Parquet with Firehose format conversion plus dynamic partitioning to cut Athena scan costs, and put Kinesis Data Streams in front so Firehose and the fraud team consume the same events inde | medium |  |
| Q399 | LOC-399 | OPSI_HILANG | B | The problem is object size and transition rules: 30 KB objects are below the 128 KB lifecycle/billing minimum for Standard-IA (not transitioned by default, per-object transition costs), so aggregate s | medium |  |
| Q401 | LOC-401 | AMBIGU_PERLU_REVIEW | C | Distribusikan tabel events dengan KEY pada campaign ID, tabel campaigns kecil dengan ALL, dan gunakan sort key pada tanggal event agar join ter-collocate tanpa redistribusi dan filter rentang tanggal  | low | ronde 1: -; ronde 2: D / Kedua opsi C dan D terpotong sehingga ambiguitas tersisa: bila C sebenarnya memuat sort key juga, KEY/KEY tetap ter |
| Q405 | LOC-405 | OPSI_HILANG | A | An inner join to the merchant reference table silently drops records with new merchant codes absent from the reference data; detect it with a referential-integrity/data quality check or by reconciling | medium |  |
| Q410 | LOC-410 | OPSI_HILANG | C | Stop the cross-Region copies: disable Redshift cross-Region snapshot copy (keep snapshots in-country), move the Athena query results location to a bucket in the permitted Region, and enforce with an S | medium |  |
| Q413 | LOC-413 | OPSI_HILANG | A | Run the existing Hive scripts on transient EMR clusters (or EMR Serverless, which supports Hive) that start nightly, use S3/EMRFS instead of HDFS for intermediate data, and terminate after the job; th | medium |  |
| Q418 | LOC-418 | OPSI_HILANG | A | Offload the older data (rarely queried) to Amazon S3 (e.g., UNLOAD to Parquet) and query it with Redshift Spectrum so a single query can join it with the recent data in the cluster; opsi ini tidak ter | medium |  |
| Q419 | LOC-419 | OPSI_HILANG | B | Amazon DocumentDB (with MongoDB compatibility), yang mendukung MongoDB driver dan aggregation pipeline dan fully managed (replica set/backup dikelola AWS); opsi ini tidak terlihat. | high |  |
| Q420 | LOC-420 | OPSI_HILANG | B | Selisih ~50 TB kemungkinan berasal dari versi noncurrent (versioning), delete marker, dan incomplete multipart uploads yang ikut ditagih di Storage Lens; atasi dengan S3 Lifecycle: NoncurrentVersionEx | low | Stem terpotong (awal skenario hilang) dan opsi terpecah (A+C Intelligent-Tiering; B+D CRR). Soal 'which combination' tampaknya multi-jawaban |
| Q425 | LOC-425 | OPSI_HILANG | A | Create an Amazon S3 gateway VPC endpoint with an endpoint policy allowing only the three buckets (and remove the NAT route to S3); opsi ini tidak terlihat. | high |  |
| Q428 | LOC-428 | OPSI_HILANG | A | Publish the datasets as products on AWS Data Exchange, which handles subscriptions, automatic revision delivery, entitlement end on subscription expiry, and billing; opsi ini tidak terlihat. | high |  |
| Q431 | LOC-431 | OPSI_HILANG | B | Use Amazon RDS Proxy to pool and multiplex Lambda connections to RDS PostgreSQL (optionally with reserved concurrency); opsi RDS Proxy tidak terlihat. | medium |  |
| Q432 | LOC-432 | OPSI_HILANG | A | Use AWS Step Functions Distributed Map (S3 object list as the item source, Lambda child workflows) or S3 Batch Operations invoking Lambda, which provide fan-out and per-object success/failure tracking | medium |  |
| Q436 | LOC-436 | OPSI_HILANG | B | Redshift primary key bersifat informational dan tidak di-enforce; gunakan pola upsert idempoten (staging table + MERGE / DELETE-INSERT) atau dedup pada load; opsi benar tidak terlihat. | high |  |
| Q438 | LOC-438 | AMBIGU_PERLU_REVIEW | A | Buat view yang memberi alias nama kolom lama ke nama baru (file tidak diubah); mengganti nama kolom di katalog akan memutus pemetaan ke file Parquet historis. | low | ronde 1: -; ronde 2: B / Opsi terpecah: A+C = 'Rename the column in the Glue Data Catalog and leave the files unchanged'; B+D = 'Create a vi |
| Q443 | LOC-443 | OPSI_HILANG | A | Use AWS IAM Identity Center (federated with the corporate IdP, with offboarding via the IdP) for temporary credentials across all accounts, and remove IAM users; opsi ini tidak terlihat. | high |  |
| Q444 | LOC-444 | OPSI_HILANG | B | Use Amazon Redshift row-level security (RLS) policies for regional filtering and dynamic data masking (DDM) policies for the national identifier, attached to roles (fraud vs support vs regional); opsi | high |  |
| Q447 | LOC-447 | OPSI_HILANG | AB | Run AWS DMS full load plus CDC for <15 min cutover (with appropriate LOB mode), and use AWS SCT to convert the schema/stored procedures; hanya opsi DMS full load + CDC yang terlihat benar, opsi lain h | medium |  |

## 5. Susunan soal/opsi kacau (kunci benar atau tidak dapat dinilai)

Termasuk entri yang kuncinya benar tetapi stem/opsi rusak, sehingga tidak layak dipakai apa adanya.

| Q# | ID | Status | Masalah struktur | Usulan perbaikan |
|---|---|---|---|---|
| Q4 | LOC-004 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); awalan huruf ganda di teks opsi | hapus (duplikat LOC-003) |
| Q6 | LOC-006 | KUNCI_BENAR_STRUKTUR_KACAU | tipe multi tanpa "Choose N" di stem | hapus (duplikat LOC-005) |
| Q10 | LOC-010 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-009) |
| Q12 | LOC-012 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-011) |
| Q14 | LOC-014 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-013) |
| Q17 | LOC-017 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-016) |
| Q18 | LOC-018 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-233) |
| Q19 | LOC-019 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-264) |
| Q20 | LOC-020 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-213) |
| Q21 | LOC-021 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-196) |
| Q22 | LOC-022 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-247) |
| Q24 | LOC-024 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi terlalu panjang (kontaminasi stem/opsi lain); opsi berisi salinan teks stem | hapus (duplikat LOC-135) |
| Q25 | LOC-025 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-216) |
| Q26 | LOC-026 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-163) |
| Q27 | LOC-027 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-110) |
| Q29 | LOC-029 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-117) |
| Q30 | LOC-030 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | hapus (duplikat LOC-250) |
| Q31 | LOC-031 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); awalan huruf ganda di teks opsi | hapus (duplikat LOC-120) |
| Q32 | LOC-032 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q33 | LOC-033 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); options_merged; stem_header_scrape; options_missing | ada usulan opsi/stem bersih di patches.json |
| Q35 | LOC-035 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi terlalu panjang (kontaminasi stem/opsi lain); options_merged; stem_header_scrape; options_missing | ada usulan opsi/stem bersih di patches.json |
| Q36 | LOC-036 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q37 | LOC-037 | AMBIGU_PERLU_REVIEW | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; stem tidak berakhir normal (terpotong); stem_truncated; options_merged; key_not_in_options; stem_header_scrape; options_missing | ada usulan opsi/stem bersih di patches.json |
| Q38 | LOC-038 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); opsi berisi salinan teks stem; options_merged; stem_header_scrape; options_missing | ada usulan opsi/stem bersih di patches.json |
| Q39 | LOC-039 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q40 | LOC-040 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q41 | LOC-041 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q42 | LOC-042 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q43 | LOC-043 | KUNCI_BENAR_STRUKTUR_KACAU | urutan label opsi rusak; beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); opsi berisi salinan teks stem; options_merged; option_letter_duplicate; stem_header_scrape; options_missing; ocr_noise | ada usulan opsi/stem bersih di patches.json |
| Q44 | LOC-044 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q45 | LOC-045 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q46 | LOC-046 | AMBIGU_PERLU_REVIEW | opsi terpotong (<4 opsi, opsi benar mungkin hilang); stem_truncated; options_lt4 | perlu perbaikan manual (lihat patches.json) |
| Q47 | LOC-047 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); options_merged; ocr_noise | ada usulan opsi/stem bersih di patches.json |
| Q48 | LOC-048 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); awalan huruf ganda di teks opsi; beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); options_merged; option_letter_duplicate | ada usulan opsi/stem bersih di patches.json |
| Q49 | LOC-049 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); stem_header_scrape; option_contains_stem_text | ada usulan opsi/stem bersih di patches.json |
| Q50 | LOC-050 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi terlalu panjang (kontaminasi stem/opsi lain); stem tidak berakhir normal (terpotong); stem_truncated; options_merged; ocr_noise | ada usulan opsi/stem bersih di patches.json |
| Q51 | LOC-051 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; multi_without_choose_n; key_all_options; source_placeholder_key; options_lt4 | ada usulan opsi/stem bersih di patches.json |
| Q52 | LOC-052 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); stem_header_scrape; option_contains_stem_text | ada usulan opsi/stem bersih di patches.json |
| Q53 | LOC-053 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; multi_without_choose_n; key_all_options; source_placeholder_key; options_lt4 | ada usulan opsi/stem bersih di patches.json |
| Q54 | LOC-054 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); options_merged; option_letter_duplicate; stem_header_scrape | ada usulan opsi/stem bersih di patches.json |
| Q55 | LOC-055 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); options_merged; option_letter_duplicate; stem_header_scrape | ada usulan opsi/stem bersih di patches.json |
| Q56 | LOC-056 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q57 | LOC-057 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q58 | LOC-058 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q59 | LOC-059 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi terlalu panjang (kontaminasi stem/opsi lain); opsi berisi salinan teks stem; stem_header_scrape; option_contains_stem_text | ada usulan opsi/stem bersih di patches.json |
| Q60 | LOC-060 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); stem_header_scrape; option_contains_stem_text | ada usulan opsi/stem bersih di patches.json |
| Q61 | LOC-061 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q62 | LOC-062 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); stem_typo | perlu perbaikan manual (lihat patches.json) |
| Q63 | LOC-063 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi berisi salinan teks stem; stem_header_scrape; option_contains_stem_text | ada usulan opsi/stem bersih di patches.json |
| Q65 | LOC-065 | AMBIGU_PERLU_REVIEW | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_lt4 | perlu perbaikan manual (lihat patches.json) |
| Q66 | LOC-066 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); stem_header_scrape; option_contains_stem_text | ada usulan opsi/stem bersih di patches.json |
| Q67 | LOC-067 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q68 | LOC-068 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q69 | LOC-069 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); stem_header_scrape; option_contains_stem_text | ada usulan opsi/stem bersih di patches.json |
| Q70 | LOC-070 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q71 | LOC-071 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q72 | LOC-072 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q73 | LOC-073 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q74 | LOC-074 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q75 | LOC-075 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); ocr_noise | perlu perbaikan manual (lihat patches.json) |
| Q76 | LOC-076 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_lt4 | perlu perbaikan manual (lihat patches.json) |
| Q77 | LOC-077 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q79 | LOC-079 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q80 | LOC-080 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); ocr_noise | perlu perbaikan manual (lihat patches.json) |
| Q81 | LOC-081 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang) | perlu perbaikan manual (lihat patches.json) |
| Q82 | LOC-082 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; options_missing; multi_without_choose_n; key_not_in_options; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q83 | LOC-083 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; options_missing; multi_without_choose_n; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q84 | LOC-084 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; options_missing; multi_without_choose_n; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q85 | LOC-085 | KUNCI_DIDUGA_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; options_missing; multi_without_choose_n; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q86 | LOC-086 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; options_missing; multi_without_choose_n; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q87 | LOC-087 | AMBIGU_PERLU_REVIEW | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q88 | LOC-088 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q89 | LOC-089 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; ocr_noise | perlu perbaikan manual (lihat patches.json) |
| Q90 | LOC-090 | KUNCI_DIDUGA_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; options_missing; multi_without_choose_n; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q91 | LOC-091 | KUNCI_DIDUGA_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); tipe multi tanpa "Choose N" di stem; options_missing; multi_without_choose_n; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q92 | LOC-092 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q93 | LOC-093 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi terlalu panjang (kontaminasi stem/opsi lain); opsi berisi salinan teks stem; options_missing; option_contains_stem_text; option_letter_duplicate; option_very_long | ada usulan opsi/stem bersih di patches.json |
| Q94 | LOC-094 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; option_contains_stem_text; option_letter_duplicate | ada usulan opsi/stem bersih di patches.json |
| Q95 | LOC-095 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q96 | LOC-096 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q97 | LOC-097 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q98 | LOC-098 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q99 | LOC-099 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi berisi salinan teks stem; options_missing; option_contains_stem_text; option_letter_duplicate | ada usulan opsi/stem bersih di patches.json |
| Q100 | LOC-100 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q101 | LOC-101 | AMBIGU_PERLU_REVIEW | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q115 | LOC-115 | KUNCI_BENAR_STRUKTUR_KACAU | teks opsi duplikat; ocr_noise | perlu perbaikan manual (lihat patches.json) |
| Q136 | LOC-136 | KUNCI_BENAR_STRUKTUR_KACAU | opsi sangat pendek | perlu perbaikan manual (lihat patches.json) |
| Q182 | LOC-182 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terlalu panjang (kontaminasi stem/opsi lain); option_very_long | perlu perbaikan manual (lihat patches.json) |
| Q212 | LOC-212 | KUNCI_BENAR_STRUKTUR_KACAU | opsi >5 (label kacau); urutan label opsi rusak; options_merged; option_letter_duplicate; label_sequence_broken; options_gt5; sql_options_fragmented; ocr_noise_smart_quotes | ada usulan opsi/stem bersih di patches.json |
| Q226 | LOC-226 | KUNCI_BENAR_STRUKTUR_KACAU | urutan label opsi rusak; option_letter_duplicate; label_sequence_broken; ocr_noise | ada usulan opsi/stem bersih di patches.json |
| Q227 | LOC-227 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terlalu panjang (kontaminasi stem/opsi lain); option_very_long | perlu perbaikan manual (lihat patches.json) |
| Q238 | LOC-238 | KUNCI_BENAR_STRUKTUR_KACAU | opsi >5 (label kacau); urutan label opsi rusak; teks opsi duplikat; tipe multi tanpa "Choose N" di stem; label kunci ganda (mis. BB); options_merged; sql_options_fragmented; option_letter_duplicate; label_sequence_broken; options_gt5; multi_without_choose_n; k | ada usulan opsi/stem bersih di patches.json |
| Q245 | LOC-245 | KUNCI_BENAR_STRUKTUR_KACAU | opsi sangat pendek | perlu perbaikan manual (lihat patches.json) |
| Q260 | LOC-260 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terlalu panjang (kontaminasi stem/opsi lain) | perlu perbaikan manual (lihat patches.json) |
| Q297 | LOC-297 | KUNCI_BENAR_STRUKTUR_KACAU | urutan label opsi rusak; option_letter_duplicate; label_sequence_broken | perlu perbaikan manual (lihat patches.json) |
| Q298 | LOC-298 | KUNCI_BENAR_STRUKTUR_KACAU | awalan huruf ganda di teks opsi; option_letter_duplicate; ocr_noise; stem_header_scrape | ada usulan opsi/stem bersih di patches.json |
| Q299 | LOC-299 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-002) |
| Q300 | LOC-300 | KUNCI_BENAR_STRUKTUR_KACAU | awalan huruf ganda di teks opsi; beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-003) |
| Q301 | LOC-301 | KUNCI_BENAR_STRUKTUR_KACAU | awalan huruf ganda di teks opsi; beberapa opsi menyatu dalam satu teks; options_merged; option_letter_duplicate; ocr_noise; stem_header_scrape | ada usulan opsi/stem bersih di patches.json |
| Q302 | LOC-302 | KUNCI_BENAR_STRUKTUR_KACAU | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-005) |
| Q303 | LOC-303 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-005) |
| Q310 | LOC-310 | KUNCI_BENAR_STRUKTUR_KACAU | beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain) | hapus (duplikat LOC-264) |
| Q311 | LOC-311 | KUNCI_BENAR_STRUKTUR_KACAU | beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain) | hapus (duplikat LOC-171) |
| Q312 | LOC-312 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-146) |
| Q320 | LOC-320 | KUNCI_SALAH | awalan huruf ganda di teks opsi; beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); options_merged; option_letter_duplicate; ocr_noise; stem_header_scrape; option_truncated; key_wrong_default_A | ada usulan opsi/stem bersih di patches.json |
| Q326 | LOC-326 | KUNCI_BENAR_STRUKTUR_KACAU | awalan huruf ganda di teks opsi; beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-143) |
| Q327 | LOC-327 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-143) |
| Q329 | LOC-329 | KUNCI_BENAR_STRUKTUR_KACAU | awalan huruf ganda di teks opsi; beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-199) |
| Q331 | LOC-331 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain) | hapus (duplikat LOC-138) |
| Q333 | LOC-333 | KUNCI_SALAH | awalan huruf ganda di teks opsi; beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain) | hapus (duplikat LOC-188) |
| Q337 | LOC-337 | KUNCI_SALAH | awalan huruf ganda di teks opsi; beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain) | hapus (duplikat LOC-194) |
| Q343 | LOC-343 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-228) |
| Q345 | LOC-345 | KUNCI_BENAR_STRUKTUR_KACAU | beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain) | hapus (duplikat LOC-183) |
| Q346 | LOC-346 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-137) |
| Q351 | LOC-351 | AMBIGU_PERLU_REVIEW | awalan huruf ganda di teks opsi; stem_header_scrape; stem_duplicated_text; option_letter_duplicate; options_merged; duplicate_copy_key_conflict; ocr_noise; stem_option_mismatch | perlu perbaikan manual (lihat patches.json) |
| Q352 | LOC-352 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain) | hapus (duplikat LOC-215) |
| Q353 | LOC-353 | KUNCI_SALAH | urutan label opsi rusak; beberapa opsi menyatu dalam satu teks; options_merged; label_sequence_broken; ocr_noise; stem_truncated; key_wrong_default_A | ada usulan opsi/stem bersih di patches.json |
| Q354 | LOC-354 | KUNCI_SALAH | urutan label opsi rusak; beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-191) |
| Q356 | LOC-356 | KUNCI_SALAH | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-172) |
| Q358 | LOC-358 | KUNCI_SALAH | awalan huruf ganda di teks opsi | hapus (duplikat LOC-187) |
| Q364 | LOC-364 | KUNCI_BENAR_STRUKTUR_KACAU | beberapa opsi menyatu dalam satu teks | hapus (duplikat LOC-262) |
| Q365 | LOC-365 | KUNCI_SALAH | awalan huruf ganda di teks opsi | hapus (duplikat LOC-246) |
| Q369 | LOC-369 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; key_not_in_options; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q370 | LOC-370 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; options_missing; options_merged; stem_header_scrape; key_not_in_options; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q371 | LOC-371 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; key_not_in_options; stem_header_scrape; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q372 | LOC-372 | KUNCI_SALAH | opsi terpotong (<4 opsi, opsi benar mungkin hilang); awalan huruf ganda di teks opsi; options_missing; option_letter_duplicate; key_wrong_default_A | perlu perbaikan manual (lihat patches.json) |
| Q373 | LOC-373 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; key_not_in_options; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q374 | LOC-374 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; key_not_in_options; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q375 | LOC-375 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi terlalu panjang (kontaminasi stem/opsi lain); opsi berisi salinan teks stem; options_missing; key_not_in_options; stem_header_scrape; option_contains_stem_text; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q376 | LOC-376 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); opsi terlalu panjang (kontaminasi stem/opsi lain); options_missing; key_not_in_options; stem_header_scrape; option_contains_stem_text; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q377 | LOC-377 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; placeholder_options; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q378 | LOC-378 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; key_not_in_options; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q379 | LOC-379 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; opsi terlalu panjang (kontaminasi stem/opsi lain); options_missing; options_merged; key_not_in_options; stem_header_scrape; duplicate_copy_key_conflict | perlu perbaikan manual (lihat patches.json) |
| Q380 | LOC-380 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q381 | LOC-381 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing | perlu perbaikan manual (lihat patches.json) |
| Q382 | LOC-382 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q383 | LOC-383 | KUNCI_BENAR_STRUKTUR_KACAU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); options_missing; options_merged; stem_header_scrape | ada usulan opsi/stem bersih di patches.json |
| Q384 | LOC-384 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); beberapa opsi menyatu dalam satu teks; options_missing; options_merged; key_not_in_options | perlu perbaikan manual (lihat patches.json) |
| Q385 | LOC-385 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); urutan label opsi rusak; opsi terlalu panjang (kontaminasi stem/opsi lain); sampah OCR di opsi/stem; stem terlalu pendek/terpotong; ocr_noise; options_merged; stem_truncated; stem_header_scrape; option_lette | perlu perbaikan manual (lihat patches.json) |
| Q386 | LOC-386 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); urutan label opsi rusak; opsi terlalu panjang (kontaminasi stem/opsi lain); sampah OCR di opsi/stem; stem terlalu pendek/terpotong; ocr_noise; options_merged; stem_truncated; option_letter_duplicate; options | perlu perbaikan manual (lihat patches.json) |
| Q387 | LOC-387 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); urutan label opsi rusak; opsi terlalu panjang (kontaminasi stem/opsi lain); sampah OCR di opsi/stem; stem terlalu pendek/terpotong; ocr_noise; options_merged; stem_truncated; option_letter_duplicate; options | perlu perbaikan manual (lihat patches.json) |
| Q388 | LOC-388 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); urutan label opsi rusak; opsi terlalu panjang (kontaminasi stem/opsi lain); sampah OCR di opsi/stem; stem terlalu pendek/terpotong; ocr_noise; options_merged; stem_truncated; option_letter_duplicate; options | perlu perbaikan manual (lihat patches.json) |
| Q389 | LOC-389 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); urutan label opsi rusak; opsi terlalu panjang (kontaminasi stem/opsi lain); sampah OCR di opsi/stem; stem terlalu pendek/terpotong; ocr_noise; options_merged; stem_truncated; option_letter_duplicate; options | perlu perbaikan manual (lihat patches.json) |
| Q390 | LOC-390 | SOAL_CACAT_AMBIGU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); urutan label opsi rusak; opsi terlalu panjang (kontaminasi stem/opsi lain); sampah OCR di opsi/stem; stem terlalu pendek/terpotong; ocr_noise; stem_truncated; stem_too_short; options_missing; option_letter_d | perlu perbaikan manual (lihat patches.json) |
| Q391 | LOC-391 | OPSI_HILANG | opsi terpotong (<4 opsi, opsi benar mungkin hilang); urutan label opsi rusak; opsi terlalu panjang (kontaminasi stem/opsi lain); sampah OCR di opsi/stem; stem terlalu pendek/terpotong; ocr_noise; options_merged; stem_truncated; option_letter_duplicate; options | perlu perbaikan manual (lihat patches.json) |
| Q392 | LOC-392 | SOAL_CACAT_AMBIGU | opsi terpotong (<4 opsi, opsi benar mungkin hilang); urutan label opsi rusak; sampah OCR di opsi/stem; stem terlalu pendek/terpotong; ocr_noise; stem_truncated; stem_too_short; options_missing; option_letter_duplicate; key_not_in_options | perlu perbaikan manual (lihat patches.json) |

## 6. Duplikat

| Grup | Anggota (ID: sumber, kunci) | Kunci berbeda? | Pertahankan |
|---|---|---|---|
| G011 | LOC-011: examtopics, B ; LOC-012: examtopics, B | tidak | LOC-011 |
| G013 | LOC-013: examtopics, B ; LOC-014: examtopics, B | tidak | LOC-013 |
| G027 | LOC-027: examtopics, B ; LOC-110: github_examtopics_cache, B | tidak | LOC-110 |
| G029 | LOC-029: examtopics, C ; LOC-117: github_examtopics_cache, C | tidak | LOC-117 |
| G031 | LOC-031: examtopics, C ; LOC-120: github_examtopics_cache, C | tidak | LOC-120 |
| G028 | LOC-028: examtopics, AD ; LOC-121: github_examtopics_cache, AD | tidak | LOC-028 |
| G024 | LOC-024: examtopics, B ; LOC-135: github_examtopics_cache, A | ya | LOC-135 |
| G026 | LOC-026: examtopics, B ; LOC-163: github_examtopics_cache, B | tidak | LOC-163 |
| G021 | LOC-021: examtopics, B ; LOC-196: github_examtopics_cache, B | tidak | LOC-196 |
| G020 | LOC-020: examtopics, B ; LOC-213: github_examtopics_cache, B | tidak | LOC-213 |
| G025 | LOC-025: examtopics, B ; LOC-216: github_examtopics_cache, B | tidak | LOC-216 |
| G018 | LOC-018: examtopics, C ; LOC-233: github_examtopics_cache, C | tidak | LOC-233 |
| G022 | LOC-022: examtopics, B ; LOC-247: github_examtopics_cache, B | tidak | LOC-247 |
| G030 | LOC-030: examtopics, B ; LOC-250: github_examtopics_cache, A | ya | LOC-250 |
| G023 | LOC-023: examtopics, AC ; LOC-286: github_examtopics_cache, AC | tidak | LOC-023 |
| G001 | LOC-001: examice, D ; LOC-298: pdf_exam_dumps, D | tidak | LOC-298 |
| G002 | LOC-002: examice, B ; LOC-299: pdf_exam_dumps, A | ya | LOC-002 |
| G003 | LOC-003: examice, A ; LOC-004: examtopics, A ; LOC-300: pdf_80_mock, A | tidak | LOC-003 |
| G005 | LOC-005: examtopics, BE ; LOC-006: examice, BE ; LOC-007: examtopics, BE ; LOC-302: pdf_80_mock, BE ; LOC-303: pdf_exam_dumps, AB | ya | LOC-005 |
| G008 | LOC-008: examice, B ; LOC-304: pdf_exam_dumps, B | tidak | LOC-008 |
| G009 | LOC-009: examtopics, B ; LOC-010: examtopics, B ; LOC-305: pdf_exam_dumps, A | ya | LOC-009 |
| G016 | LOC-016: examtopics, A ; LOC-017: examtopics, A ; LOC-308: pdf_exam_dumps, A | tidak | LOC-016 |
| G019 | LOC-019: examtopics, A ; LOC-264: github_examtopics_cache, A ; LOC-310: pdf_exam_dumps, A | tidak | LOC-264 |
| G171 | LOC-171: github_examtopics_cache, B ; LOC-311: pdf_exam_dumps, B | tidak | LOC-171 |
| G146 | LOC-146: github_examtopics_cache, B ; LOC-312: pdf_exam_dumps, A | ya | LOC-146 |
| G243 | LOC-243: github_examtopics_cache, A ; LOC-313: pdf_exam_dumps, A | tidak | LOC-243 |
| G202 | LOC-202: github_examtopics_cache, B ; LOC-315: pdf_80_mock, A | ya | LOC-202 |
| G218 | LOC-218: github_examtopics_cache, AD ; LOC-316: pdf_exam_dumps, AB | ya | LOC-218 |
| G200 | LOC-200: github_examtopics_cache, B ; LOC-317: pdf_exam_dumps, A | ya | LOC-200 |
| G231 | LOC-231: github_examtopics_cache, AB ; LOC-318: pdf_exam_dumps, AB | tidak | LOC-231 |
| G140 | LOC-140: github_examtopics_cache, B ; LOC-319: pdf_exam_dumps, A | ya | LOC-140 |
| G149 | LOC-149: github_examtopics_cache, B ; LOC-321: pdf_exam_dumps, A | ya | LOC-149 |
| G105 | LOC-105: github_examtopics_cache, C ; LOC-322: pdf_exam_dumps, A | ya | LOC-105 |
| G148 | LOC-148: github_examtopics_cache, A ; LOC-323: pdf_exam_dumps, A ; LOC-324: pdf_80_mock, A | tidak | LOC-148 |
| G240 | LOC-240: github_examtopics_cache, C ; LOC-325: pdf_exam_dumps, A | ya | LOC-240 |
| G143 | LOC-143: github_examtopics_cache, BD ; LOC-326: pdf_80_mock, BD ; LOC-327: pdf_exam_dumps, AB | ya | LOC-143 |
| G204 | LOC-204: github_examtopics_cache, C ; LOC-328: pdf_exam_dumps, A | ya | LOC-328 |
| G199 | LOC-199: github_examtopics_cache, AB ; LOC-329: pdf_exam_dumps, AB | tidak | LOC-199 |
| G138 | LOC-138: github_examtopics_cache, B ; LOC-331: pdf_exam_dumps, A | ya | LOC-138 |
| G133 | LOC-133: github_examtopics_cache, BC ; LOC-332: pdf_exam_dumps, AB | ya | LOC-133 |
| G188 | LOC-188: github_examtopics_cache, CD ; LOC-333: pdf_exam_dumps, AB | ya | LOC-188 |
| G116 | LOC-116: github_examtopics_cache, B ; LOC-334: pdf_exam_dumps, A | ya | LOC-116 |
| G118 | LOC-118: github_examtopics_cache, D ; LOC-335: pdf_80_mock, D ; LOC-336: pdf_exam_dumps, A | ya | LOC-118 |
| G194 | LOC-194: github_examtopics_cache, C ; LOC-337: pdf_exam_dumps, A | ya | LOC-194 |
| G248 | LOC-248: github_examtopics_cache, AC ; LOC-338: pdf_exam_dumps, AB | ya | LOC-248 |
| G229 | LOC-229: github_examtopics_cache, D ; LOC-339: pdf_exam_dumps, A | ya | LOC-229 |
| G142 | LOC-142: github_examtopics_cache, C ; LOC-340: pdf_exam_dumps, A | ya | LOC-142 |
| G139 | LOC-139: github_examtopics_cache, A ; LOC-341: pdf_exam_dumps, A | tidak | LOC-139 |
| G255 | LOC-255: github_examtopics_cache, B ; LOC-342: pdf_exam_dumps, A | ya | LOC-255 |
| G228 | LOC-228: github_examtopics_cache, D ; LOC-343: pdf_exam_dumps, E | ya | LOC-228 |
| G123 | LOC-123: github_examtopics_cache, BD ; LOC-344: pdf_exam_dumps, AB | ya | LOC-123 |
| G183 | LOC-183: github_examtopics_cache, BD ; LOC-345: pdf_exam_dumps, BD | tidak | LOC-183 |
| G137 | LOC-137: github_examtopics_cache, C ; LOC-346: pdf_exam_dumps, A | ya | LOC-137 |
| G184 | LOC-184: github_examtopics_cache, B ; LOC-347: pdf_exam_dumps, A | ya | LOC-184 |
| G153 | LOC-153: github_examtopics_cache, C ; LOC-348: pdf_80_mock, A ; LOC-349: pdf_exam_dumps, A | ya | LOC-153 |
| G223 | LOC-223: github_examtopics_cache, B ; LOC-351: pdf_exam_dumps, A | ya | LOC-351 |
| G215 | LOC-215: github_examtopics_cache, B ; LOC-352: pdf_exam_dumps, A | ya | LOC-215 |
| G191 | LOC-191: github_examtopics_cache, C ; LOC-354: pdf_80_mock, A | ya | LOC-191 |
| G155 | LOC-155: github_examtopics_cache, B ; LOC-355: pdf_exam_dumps, A | ya | LOC-155 |
| G172 | LOC-172: github_examtopics_cache, C ; LOC-356: pdf_exam_dumps, A | ya | LOC-172 |
| G285 | LOC-285: github_examtopics_cache, CE ; LOC-357: pdf_80_mock, AB | ya | LOC-285 |
| G187 | LOC-187: github_examtopics_cache, AD ; LOC-358: pdf_80_mock, AB | ya | LOC-187 |
| G127 | LOC-127: github_examtopics_cache, C ; LOC-359: pdf_80_mock, A | ya | LOC-127 |
| G259 | LOC-259: github_examtopics_cache, B ; LOC-360: pdf_80_mock, B | tidak | LOC-259 |
| G209 | LOC-209: github_examtopics_cache, C ; LOC-361: pdf_80_mock, C | tidak | LOC-209 |
| G159 | LOC-159: github_examtopics_cache, B ; LOC-362: pdf_80_mock, A | ya | LOC-159 |
| G179 | LOC-179: github_examtopics_cache, D ; LOC-363: pdf_80_mock, C | ya | LOC-179 |
| G262 | LOC-262: github_examtopics_cache, B ; LOC-364: pdf_80_mock, B | tidak | LOC-262 |
| G246 | LOC-246: github_examtopics_cache, CD ; LOC-365: pdf_80_mock, AB | ya | LOC-246 |
| G125 | LOC-125: github_examtopics_cache, B ; LOC-366: pdf_80_mock, B | tidak | LOC-125 |
| G249 | LOC-249: github_examtopics_cache, D ; LOC-367: examtopics, D | tidak | LOC-249 |
| G113 | LOC-113: github_examtopics_cache, D ; LOC-368: examtopics, D | tidak | LOC-113 |

## 7. Keterbatasan audit (harap dibaca)

- Verifikasi dilakukan dua ronde oleh reviewer AI yang memakai WebSearch/WebFetch ke dokumentasi AWS. Ronde 1 mencakup semua 369 soal unik; sebagian jawaban untuk soal sederhana didasarkan pengetahuan reviewer dan tidak semua URL dokumentasi dibuka langsung. Ronde 2 (independen, tanpa melihat kunci lama, wajib membuka dokumentasi) dilakukan untuk 72 soal berisiko: semua yang ronde 1 nilai salah/ambigu/tidak dapat diverifikasi.
- Soal berstatus `KEY_BENAR` yang tidak masuk ronde 2 hanya diverifikasi satu reviewer; sebagian berkeyakinan medium. Soal exam asli sering ambigu; "benar" di sini berarti paling sesuai dokumentasi AWS dan kata kunci stem (cost, latency, operational overhead).
- Beberapa fitur kini deprecated/tertutup untuk pelanggan baru (S3 Select, S3 Object Lambda, Glacier Select); kunci tetap dinilai menurut maksud soal.
- Untuk soal yang opsinya terpotong, jawaban benar hanya dapat dinyatakan sebagai ringkasan solusi, bukan huruf. Teks opsi yang hilang tidak dikarang.
- Entri yang jatuh pada `AMBIGU_PERLU_REVIEW` dan `KUNCI_DIDUGA_SALAH` butuh keputusan manusia.

## 8. Lampiran: status seluruh 452 entri

| Q# | ID | Status | Kunci bank | Kunci AWS | Grup |
|---|---|---|---|---|---|
| Q1 | LOC-001 | OK | D | D | G001 (salinan) |
| Q2 | LOC-002 | OK | B | B | G002 (baseline) |
| Q3 | LOC-003 | OK | A | A | G003 (baseline) |
| Q4 | LOC-004 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G003 (salinan) |
| Q5 | LOC-005 | OK | BE | BE | G005 (baseline) |
| Q6 | LOC-006 | KUNCI_BENAR_STRUKTUR_KACAU | BE | BE | G005 (salinan) |
| Q7 | LOC-007 | OK | BE | BE | G005 (salinan) |
| Q8 | LOC-008 | OK | B | B | G008 (baseline) |
| Q9 | LOC-009 | OK | B | B | G009 (baseline) |
| Q10 | LOC-010 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G009 (salinan) |
| Q11 | LOC-011 | OK | B | B | G011 (baseline) |
| Q12 | LOC-012 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G011 (salinan) |
| Q13 | LOC-013 | OK | B | B | G013 (baseline) |
| Q14 | LOC-014 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G013 (salinan) |
| Q15 | LOC-015 | OK | A | A | G015 |
| Q16 | LOC-016 | OK | A | A | G016 (baseline) |
| Q17 | LOC-017 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G016 (salinan) |
| Q18 | LOC-018 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G018 (salinan) |
| Q19 | LOC-019 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G019 (salinan) |
| Q20 | LOC-020 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G020 (salinan) |
| Q21 | LOC-021 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G021 (salinan) |
| Q22 | LOC-022 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G022 (salinan) |
| Q23 | LOC-023 | SOAL_CACAT_AMBIGU | AC | - | G023 (baseline) |
| Q24 | LOC-024 | KUNCI_SALAH | B | A | G024 (salinan) |
| Q25 | LOC-025 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G025 (salinan) |
| Q26 | LOC-026 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G026 (salinan) |
| Q27 | LOC-027 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G027 (salinan) |
| Q28 | LOC-028 | OK | AD | AD | G028 (baseline) |
| Q29 | LOC-029 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G029 (salinan) |
| Q30 | LOC-030 | KUNCI_SALAH | B | A | G030 (salinan) |
| Q31 | LOC-031 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G031 (salinan) |
| Q32 | LOC-032 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G032 |
| Q33 | LOC-033 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G033 |
| Q34 | LOC-034 | KUNCI_SALAH | AB | BD | G034 |
| Q35 | LOC-035 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G035 |
| Q36 | LOC-036 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G036 |
| Q37 | LOC-037 | AMBIGU_PERLU_REVIEW | A | A | G037 |
| Q38 | LOC-038 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G038 |
| Q39 | LOC-039 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G039 |
| Q40 | LOC-040 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G040 |
| Q41 | LOC-041 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G041 |
| Q42 | LOC-042 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G042 |
| Q43 | LOC-043 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G043 |
| Q44 | LOC-044 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G044 |
| Q45 | LOC-045 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G045 |
| Q46 | LOC-046 | AMBIGU_PERLU_REVIEW | A | A | G046 |
| Q47 | LOC-047 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G047 |
| Q48 | LOC-048 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G048 |
| Q49 | LOC-049 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G049 |
| Q50 | LOC-050 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G050 |
| Q51 | LOC-051 | KUNCI_SALAH | ABC | A | G051 |
| Q52 | LOC-052 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G052 |
| Q53 | LOC-053 | KUNCI_SALAH | ABC | A | G053 |
| Q54 | LOC-054 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G054 |
| Q55 | LOC-055 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G055 |
| Q56 | LOC-056 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G056 |
| Q57 | LOC-057 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G057 |
| Q58 | LOC-058 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G058 |
| Q59 | LOC-059 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G059 |
| Q60 | LOC-060 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G060 |
| Q61 | LOC-061 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G061 |
| Q62 | LOC-062 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G062 |
| Q63 | LOC-063 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G063 |
| Q64 | LOC-064 | KUNCI_SALAH | AB | BC | G064 |
| Q65 | LOC-065 | AMBIGU_PERLU_REVIEW | B | A | G065 |
| Q66 | LOC-066 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G066 |
| Q67 | LOC-067 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G067 |
| Q68 | LOC-068 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G068 |
| Q69 | LOC-069 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G069 |
| Q70 | LOC-070 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G070 |
| Q71 | LOC-071 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G071 |
| Q72 | LOC-072 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G072 |
| Q73 | LOC-073 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G073 |
| Q74 | LOC-074 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G074 |
| Q75 | LOC-075 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G075 |
| Q76 | LOC-076 | KUNCI_SALAH | C | B | G076 |
| Q77 | LOC-077 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G077 |
| Q78 | LOC-078 | OK | AB | AB | G078 |
| Q79 | LOC-079 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G079 |
| Q80 | LOC-080 | KUNCI_SALAH | C | B | G080 |
| Q81 | LOC-081 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G081 |
| Q82 | LOC-082 | OPSI_HILANG | ABC | C | G082 |
| Q83 | LOC-083 | OPSI_HILANG | ABC | - | G083 |
| Q84 | LOC-084 | KUNCI_SALAH | ABC | B | G084 |
| Q85 | LOC-085 | KUNCI_DIDUGA_SALAH | ABC | A | G085 |
| Q86 | LOC-086 | KUNCI_SALAH | ABC | C | G086 |
| Q87 | LOC-087 | AMBIGU_PERLU_REVIEW | C | A | G087 |
| Q88 | LOC-088 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G088 |
| Q89 | LOC-089 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G089 |
| Q90 | LOC-090 | KUNCI_DIDUGA_SALAH | ABC | A | G090 |
| Q91 | LOC-091 | KUNCI_DIDUGA_SALAH | ABC | C | G091 |
| Q92 | LOC-092 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G092 |
| Q93 | LOC-093 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G093 |
| Q94 | LOC-094 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G094 |
| Q95 | LOC-095 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G095 |
| Q96 | LOC-096 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G096 |
| Q97 | LOC-097 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G097 |
| Q98 | LOC-098 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G098 |
| Q99 | LOC-099 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G099 |
| Q100 | LOC-100 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G100 |
| Q101 | LOC-101 | AMBIGU_PERLU_REVIEW | C | A | G101 |
| Q102 | LOC-102 | OK | A | A | G102 |
| Q103 | LOC-103 | OK | D | D | G103 |
| Q104 | LOC-104 | OK | B | B | G104 |
| Q105 | LOC-105 | OK | C | C | G105 (baseline) |
| Q106 | LOC-106 | OK | C | C | G106 |
| Q107 | LOC-107 | OK | B | B | G107 |
| Q108 | LOC-108 | AMBIGU_PERLU_REVIEW | D | B | G108 |
| Q109 | LOC-109 | OK | B | B | G109 |
| Q110 | LOC-110 | OK | B | B | G027 (baseline) |
| Q111 | LOC-111 | OK | AC | AC | G111 |
| Q112 | LOC-112 | OK | A | A | G112 |
| Q113 | LOC-113 | OK | D | D | G113 (baseline) |
| Q114 | LOC-114 | OK | A | A | G114 |
| Q115 | LOC-115 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G115 |
| Q116 | LOC-116 | OK | B | B | G116 (baseline) |
| Q117 | LOC-117 | OK | C | C | G029 (baseline) |
| Q118 | LOC-118 | OK | D | D | G118 (baseline) |
| Q119 | LOC-119 | OK | A | A | G119 |
| Q120 | LOC-120 | OK | C | C | G031 (baseline) |
| Q121 | LOC-121 | OK | AD | AD | G028 (salinan) |
| Q122 | LOC-122 | OK | B | B | G122 |
| Q123 | LOC-123 | OK | BD | BD | G123 (baseline) |
| Q124 | LOC-124 | OK | B | B | G124 |
| Q125 | LOC-125 | OK | B | B | G125 (baseline) |
| Q126 | LOC-126 | OK | B | B | G126 |
| Q127 | LOC-127 | OK | C | C | G127 (baseline) |
| Q128 | LOC-128 | OK | B | B | G128 |
| Q129 | LOC-129 | OK | BD | BD | G129 |
| Q130 | LOC-130 | OK | D | D | G130 |
| Q131 | LOC-131 | OK | C | C | G131 |
| Q132 | LOC-132 | OK | B | B | G132 |
| Q133 | LOC-133 | OK | BC | BC | G133 (baseline) |
| Q134 | LOC-134 | OK | AC | AC | G134 |
| Q135 | LOC-135 | OK | A | A | G024 (baseline) |
| Q136 | LOC-136 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G136 |
| Q137 | LOC-137 | OK | C | C | G137 (baseline) |
| Q138 | LOC-138 | OK | B | B | G138 (baseline) |
| Q139 | LOC-139 | OK | A | A | G139 (baseline) |
| Q140 | LOC-140 | OK | B | B | G140 (baseline) |
| Q141 | LOC-141 | OK | B | B | G141 |
| Q142 | LOC-142 | OK | C | C | G142 (baseline) |
| Q143 | LOC-143 | OK | BD | BD | G143 (baseline) |
| Q144 | LOC-144 | OK | D | D | G144 |
| Q145 | LOC-145 | OK | C | C | G145 |
| Q146 | LOC-146 | OK | B | B | G146 (baseline) |
| Q147 | LOC-147 | AMBIGU_PERLU_REVIEW | A | B | G147 |
| Q148 | LOC-148 | OK | A | A | G148 (baseline) |
| Q149 | LOC-149 | OK | B | B | G149 (baseline) |
| Q150 | LOC-150 | OK | A | A | G150 |
| Q151 | LOC-151 | OK | D | D | G151 |
| Q152 | LOC-152 | OK | A | A | G152 |
| Q153 | LOC-153 | OK | C | C | G153 (baseline) |
| Q154 | LOC-154 | OK | D | D | G154 |
| Q155 | LOC-155 | OK | B | B | G155 (baseline) |
| Q156 | LOC-156 | OK | B | B | G156 |
| Q157 | LOC-157 | OK | D | D | G157 |
| Q158 | LOC-158 | OK | B | B | G158 |
| Q159 | LOC-159 | AMBIGU_PERLU_REVIEW | B | B | G159 (baseline) |
| Q160 | LOC-160 | OK | D | D | G160 |
| Q161 | LOC-161 | OK | B | B | G161 |
| Q162 | LOC-162 | OK | C | C | G162 |
| Q163 | LOC-163 | OK | B | B | G026 (baseline) |
| Q164 | LOC-164 | OK | AD | AD | G164 |
| Q165 | LOC-165 | OK | C | C | G165 |
| Q166 | LOC-166 | OK | D | D | G166 |
| Q167 | LOC-167 | OK | B | B | G167 |
| Q168 | LOC-168 | OK | A | A | G168 |
| Q169 | LOC-169 | OK | C | C | G169 |
| Q170 | LOC-170 | OK | B | B | G170 |
| Q171 | LOC-171 | OK | B | B | G171 (baseline) |
| Q172 | LOC-172 | OK | C | C | G172 (baseline) |
| Q173 | LOC-173 | OK | A | A | G173 |
| Q174 | LOC-174 | OK | A | A | G174 |
| Q175 | LOC-175 | OK | D | D | G175 |
| Q176 | LOC-176 | KUNCI_SALAH | BE | BC | G176 |
| Q177 | LOC-177 | OK | C | C | G177 |
| Q178 | LOC-178 | OK | B | B | G178 |
| Q179 | LOC-179 | OK | D | D | G179 (baseline) |
| Q180 | LOC-180 | OK | A | A | G180 |
| Q181 | LOC-181 | OK | A | A | G181 |
| Q182 | LOC-182 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G182 |
| Q183 | LOC-183 | OK | BD | BD | G183 (baseline) |
| Q184 | LOC-184 | OK | B | B | G184 (baseline) |
| Q185 | LOC-185 | OK | C | C | G185 |
| Q186 | LOC-186 | OK | C | C | G186 |
| Q187 | LOC-187 | OK | AD | AD | G187 (baseline) |
| Q188 | LOC-188 | OK | CD | CD | G188 (baseline) |
| Q189 | LOC-189 | OK | B | B | G189 |
| Q190 | LOC-190 | OK | C | C | G190 |
| Q191 | LOC-191 | OK | C | C | G191 (baseline) |
| Q192 | LOC-192 | OK | D | D | G192 |
| Q193 | LOC-193 | SOAL_CACAT_AMBIGU | AB | - | G193 |
| Q194 | LOC-194 | OK | C | C | G194 (baseline) |
| Q195 | LOC-195 | OK | C | C | G195 |
| Q196 | LOC-196 | OK | B | B | G021 (baseline) |
| Q197 | LOC-197 | OK | A | A | G197 |
| Q198 | LOC-198 | OK | B | B | G198 |
| Q199 | LOC-199 | OK | AB | AB | G199 (baseline) |
| Q200 | LOC-200 | OK | B | B | G200 (baseline) |
| Q201 | LOC-201 | OK | B | B | G201 |
| Q202 | LOC-202 | OK | B | B | G202 (baseline) |
| Q203 | LOC-203 | OK | C | C | G203 |
| Q204 | LOC-204 | OK | C | C | G204 (salinan) |
| Q205 | LOC-205 | OK | B | B | G205 |
| Q206 | LOC-206 | OK | D | D | G206 |
| Q207 | LOC-207 | OK | A | A | G207 |
| Q208 | LOC-208 | OK | AD | AD | G208 |
| Q209 | LOC-209 | OK | C | C | G209 (baseline) |
| Q210 | LOC-210 | KUNCI_SALAH | AC | AB | G210 |
| Q211 | LOC-211 | SOAL_CACAT_AMBIGU | A | - | G211 |
| Q212 | LOC-212 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G212 |
| Q213 | LOC-213 | OK | B | B | G020 (baseline) |
| Q214 | LOC-214 | OK | C | C | G214 |
| Q215 | LOC-215 | OK | B | B | G215 (baseline) |
| Q216 | LOC-216 | OK | B | B | G025 (baseline) |
| Q217 | LOC-217 | OK | C | C | G217 |
| Q218 | LOC-218 | OK | AD | AD | G218 (baseline) |
| Q219 | LOC-219 | OK | C | C | G219 |
| Q220 | LOC-220 | OK | B | B | G220 |
| Q221 | LOC-221 | OK | C | C | G221 |
| Q222 | LOC-222 | OK | B | B | G222 |
| Q223 | LOC-223 | AMBIGU_PERLU_REVIEW | B | B | G223 (salinan) |
| Q224 | LOC-224 | OK | C | C | G224 |
| Q225 | LOC-225 | OK | C | C | G225 |
| Q226 | LOC-226 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G226 |
| Q227 | LOC-227 | KUNCI_BENAR_STRUKTUR_KACAU | BD | BD | G227 |
| Q228 | LOC-228 | OK | D | D | G228 (baseline) |
| Q229 | LOC-229 | OK | D | D | G229 (baseline) |
| Q230 | LOC-230 | OK | A | A | G230 |
| Q231 | LOC-231 | OK | AB | AB | G231 (baseline) |
| Q232 | LOC-232 | OK | B | B | G232 |
| Q233 | LOC-233 | OK | C | C | G018 (baseline) |
| Q234 | LOC-234 | OK | B | B | G234 |
| Q235 | LOC-235 | OK | D | D | G235 |
| Q236 | LOC-236 | OK | D | D | G236 |
| Q237 | LOC-237 | OK | A | A | G237 |
| Q238 | LOC-238 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G238 |
| Q239 | LOC-239 | OK | D | D | G239 |
| Q240 | LOC-240 | OK | C | C | G240 (baseline) |
| Q241 | LOC-241 | OK | C | C | G241 |
| Q242 | LOC-242 | OK | B | B | G242 |
| Q243 | LOC-243 | OK | A | A | G243 (baseline) |
| Q244 | LOC-244 | OK | C | C | G244 |
| Q245 | LOC-245 | KUNCI_BENAR_STRUKTUR_KACAU | AD | AD | G245 |
| Q246 | LOC-246 | OK | CD | CD | G246 (baseline) |
| Q247 | LOC-247 | OK | B | B | G022 (baseline) |
| Q248 | LOC-248 | OK | AC | AC | G248 (baseline) |
| Q249 | LOC-249 | OK | D | D | G249 (baseline) |
| Q250 | LOC-250 | OK | A | A | G030 (baseline) |
| Q251 | LOC-251 | OK | D | D | G251 |
| Q252 | LOC-252 | OK | B | B | G252 |
| Q253 | LOC-253 | OK | C | C | G253 |
| Q254 | LOC-254 | OK | A | A | G254 |
| Q255 | LOC-255 | OK | B | B | G255 (baseline) |
| Q256 | LOC-256 | OK | AD | AD | G256 |
| Q257 | LOC-257 | KUNCI_BENAR_CONF_RENDAH | AC | AC | G257 |
| Q258 | LOC-258 | OK | A | A | G258 |
| Q259 | LOC-259 | OK | B | B | G259 (baseline) |
| Q260 | LOC-260 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G260 |
| Q261 | LOC-261 | OK | C | C | G261 |
| Q262 | LOC-262 | OK | B | B | G262 (baseline) |
| Q263 | LOC-263 | KUNCI_BENAR_CONF_RENDAH | C | C | G263 |
| Q264 | LOC-264 | OK | A | A | G019 (baseline) |
| Q265 | LOC-265 | OK | A | A | G265 |
| Q266 | LOC-266 | OK | C | C | G266 |
| Q267 | LOC-267 | OK | BE | BE | G267 |
| Q268 | LOC-268 | OK | C | C | G268 |
| Q269 | LOC-269 | OK | C | C | G269 |
| Q270 | LOC-270 | OK | B | B | G270 |
| Q271 | LOC-271 | OK | A | A | G271 |
| Q272 | LOC-272 | OK | A | A | G272 |
| Q273 | LOC-273 | OK | A | A | G273 |
| Q274 | LOC-274 | OK | AB | AB | G274 |
| Q275 | LOC-275 | OK | A | A | G275 |
| Q276 | LOC-276 | OK | B | B | G276 |
| Q277 | LOC-277 | OK | A | A | G277 |
| Q278 | LOC-278 | OK | B | B | G278 |
| Q279 | LOC-279 | KUNCI_SALAH | AB | AC | G279 |
| Q280 | LOC-280 | OK | AC | AC | G280 |
| Q281 | LOC-281 | KUNCI_DIDUGA_SALAH | A | C | G281 |
| Q282 | LOC-282 | OK | D | D | G282 |
| Q283 | LOC-283 | OK | B | B | G283 |
| Q284 | LOC-284 | OK | B | B | G284 |
| Q285 | LOC-285 | OK | CE | CE | G285 (baseline) |
| Q286 | LOC-286 | SOAL_CACAT_AMBIGU | AC | - | G023 (salinan) |
| Q287 | LOC-287 | OK | A | A | G287 |
| Q288 | LOC-288 | OK | B | B | G288 |
| Q289 | LOC-289 | AMBIGU_PERLU_REVIEW | B | D | G289 |
| Q290 | LOC-290 | OK | A | A | G290 |
| Q291 | LOC-291 | OK | D | D | G291 |
| Q292 | LOC-292 | OK | B | B | G292 |
| Q293 | LOC-293 | OK | C | C | G293 |
| Q294 | LOC-294 | OK | DE | DE | G294 |
| Q295 | LOC-295 | OK | D | D | G295 |
| Q296 | LOC-296 | OK | A | A | G296 |
| Q297 | LOC-297 | KUNCI_BENAR_STRUKTUR_KACAU | C | C | G297 |
| Q298 | LOC-298 | KUNCI_BENAR_STRUKTUR_KACAU | D | D | G001 (baseline) |
| Q299 | LOC-299 | KUNCI_SALAH | A | B | G002 (salinan) |
| Q300 | LOC-300 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G003 (salinan) |
| Q301 | LOC-301 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G301 |
| Q302 | LOC-302 | KUNCI_BENAR_STRUKTUR_KACAU | BE | BE | G005 (salinan) |
| Q303 | LOC-303 | KUNCI_SALAH | AB | BE | G005 (salinan) |
| Q304 | LOC-304 | OK | B | B | G008 (salinan) |
| Q305 | LOC-305 | KUNCI_SALAH | A | B | G009 (salinan) |
| Q306 | LOC-306 | KUNCI_SALAH | A | B | G306 |
| Q307 | LOC-307 | OK | A | A | G307 |
| Q308 | LOC-308 | OK | A | A | G016 (salinan) |
| Q309 | LOC-309 | KUNCI_SALAH | A | C | G309 |
| Q310 | LOC-310 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G019 (salinan) |
| Q311 | LOC-311 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G171 (salinan) |
| Q312 | LOC-312 | KUNCI_SALAH | A | B | G146 (salinan) |
| Q313 | LOC-313 | OK | A | A | G243 (salinan) |
| Q314 | LOC-314 | KUNCI_SALAH | A | B | G314 |
| Q315 | LOC-315 | KUNCI_SALAH | A | B | G202 (salinan) |
| Q316 | LOC-316 | KUNCI_SALAH | AB | AD | G218 (salinan) |
| Q317 | LOC-317 | KUNCI_SALAH | A | B | G200 (salinan) |
| Q318 | LOC-318 | OK | AB | AB | G231 (salinan) |
| Q319 | LOC-319 | KUNCI_SALAH | A | B | G140 (salinan) |
| Q320 | LOC-320 | KUNCI_SALAH | A | B | G320 |
| Q321 | LOC-321 | KUNCI_SALAH | A | B | G149 (salinan) |
| Q322 | LOC-322 | KUNCI_SALAH | A | C | G105 (salinan) |
| Q323 | LOC-323 | OK | A | A | G148 (salinan) |
| Q324 | LOC-324 | OK | A | A | G148 (salinan) |
| Q325 | LOC-325 | KUNCI_SALAH | A | C | G240 (salinan) |
| Q326 | LOC-326 | KUNCI_BENAR_STRUKTUR_KACAU | BD | BD | G143 (salinan) |
| Q327 | LOC-327 | KUNCI_SALAH | AB | BD | G143 (salinan) |
| Q328 | LOC-328 | KUNCI_SALAH | A | C | G204 (baseline) |
| Q329 | LOC-329 | KUNCI_BENAR_STRUKTUR_KACAU | AB | AB | G199 (salinan) |
| Q330 | LOC-330 | KUNCI_SALAH | A | C | G330 |
| Q331 | LOC-331 | KUNCI_SALAH | A | B | G138 (salinan) |
| Q332 | LOC-332 | KUNCI_SALAH | AB | BC | G133 (salinan) |
| Q333 | LOC-333 | KUNCI_SALAH | AB | CD | G188 (salinan) |
| Q334 | LOC-334 | KUNCI_SALAH | A | B | G116 (salinan) |
| Q335 | LOC-335 | OK | D | D | G118 (salinan) |
| Q336 | LOC-336 | KUNCI_SALAH | A | D | G118 (salinan) |
| Q337 | LOC-337 | KUNCI_SALAH | A | C | G194 (salinan) |
| Q338 | LOC-338 | KUNCI_SALAH | AB | AC | G248 (salinan) |
| Q339 | LOC-339 | KUNCI_SALAH | A | D | G229 (salinan) |
| Q340 | LOC-340 | KUNCI_SALAH | A | C | G142 (salinan) |
| Q341 | LOC-341 | OK | A | A | G139 (salinan) |
| Q342 | LOC-342 | KUNCI_SALAH | A | B | G255 (salinan) |
| Q343 | LOC-343 | KUNCI_SALAH | E | D | G228 (salinan) |
| Q344 | LOC-344 | KUNCI_SALAH | AB | BD | G123 (salinan) |
| Q345 | LOC-345 | KUNCI_BENAR_STRUKTUR_KACAU | BD | BD | G183 (salinan) |
| Q346 | LOC-346 | KUNCI_SALAH | A | C | G137 (salinan) |
| Q347 | LOC-347 | KUNCI_SALAH | A | B | G184 (salinan) |
| Q348 | LOC-348 | KUNCI_SALAH | A | C | G153 (salinan) |
| Q349 | LOC-349 | KUNCI_SALAH | A | C | G153 (salinan) |
| Q350 | LOC-350 | KUNCI_SALAH | A | B | G350 |
| Q351 | LOC-351 | AMBIGU_PERLU_REVIEW | A | B | G223 (baseline) |
| Q352 | LOC-352 | KUNCI_SALAH | A | B | G215 (salinan) |
| Q353 | LOC-353 | KUNCI_SALAH | A | C | G353 |
| Q354 | LOC-354 | KUNCI_SALAH | A | C | G191 (salinan) |
| Q355 | LOC-355 | KUNCI_SALAH | A | B | G155 (salinan) |
| Q356 | LOC-356 | KUNCI_SALAH | A | C | G172 (salinan) |
| Q357 | LOC-357 | KUNCI_SALAH | AB | CE | G285 (salinan) |
| Q358 | LOC-358 | KUNCI_SALAH | AB | AD | G187 (salinan) |
| Q359 | LOC-359 | KUNCI_SALAH | A | C | G127 (salinan) |
| Q360 | LOC-360 | OK | B | B | G259 (salinan) |
| Q361 | LOC-361 | OK | C | C | G209 (salinan) |
| Q362 | LOC-362 | AMBIGU_PERLU_REVIEW | A | B | G159 (salinan) |
| Q363 | LOC-363 | KUNCI_SALAH | C | D | G179 (salinan) |
| Q364 | LOC-364 | KUNCI_BENAR_STRUKTUR_KACAU | B | B | G262 (salinan) |
| Q365 | LOC-365 | KUNCI_SALAH | AB | CD | G246 (salinan) |
| Q366 | LOC-366 | OK | B | B | G125 (salinan) |
| Q367 | LOC-367 | OK | D | D | G249 (salinan) |
| Q368 | LOC-368 | OK | D | D | G113 (salinan) |
| Q369 | LOC-369 | OPSI_HILANG | A | - | G369 |
| Q370 | LOC-370 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G370 |
| Q371 | LOC-371 | OPSI_HILANG | A | - | G371 |
| Q372 | LOC-372 | KUNCI_SALAH | A | B | G372 |
| Q373 | LOC-373 | OPSI_HILANG | A | - | G373 |
| Q374 | LOC-374 | OPSI_HILANG | A | - | G374 |
| Q375 | LOC-375 | OPSI_HILANG | A | A | G375 |
| Q376 | LOC-376 | OPSI_HILANG | A | - | G376 |
| Q377 | LOC-377 | OPSI_HILANG | A | - | G377 |
| Q378 | LOC-378 | OPSI_HILANG | A | - | G378 |
| Q379 | LOC-379 | OPSI_HILANG | A | - | G379 |
| Q380 | LOC-380 | OPSI_HILANG | A | - | G380 |
| Q381 | LOC-381 | OPSI_HILANG | A | - | G381 |
| Q382 | LOC-382 | OPSI_HILANG | A | - | G382 |
| Q383 | LOC-383 | KUNCI_BENAR_STRUKTUR_KACAU | A | A | G383 |
| Q384 | LOC-384 | OPSI_HILANG | A | - | G384 |
| Q385 | LOC-385 | OPSI_HILANG | A | - | G385 |
| Q386 | LOC-386 | OPSI_HILANG | A | - | G386 |
| Q387 | LOC-387 | OPSI_HILANG | A | - | G387 |
| Q388 | LOC-388 | OPSI_HILANG | A | - | G388 |
| Q389 | LOC-389 | OPSI_HILANG | A | - | G389 |
| Q390 | LOC-390 | SOAL_CACAT_AMBIGU | A | - | G390 |
| Q391 | LOC-391 | OPSI_HILANG | A | - | G391 |
| Q392 | LOC-392 | SOAL_CACAT_AMBIGU | A | - | G392 |
| Q393 | LOC-393 | KUNCI_SALAH | A | C | G393 |
| Q394 | LOC-394 | OPSI_HILANG | A | - | G394 |
| Q395 | LOC-395 | KUNCI_SALAH | A | D | G395 |
| Q396 | LOC-396 | AMBIGU_PERLU_REVIEW | A | B | G396 |
| Q397 | LOC-397 | OPSI_HILANG | A | - | G397 |
| Q398 | LOC-398 | OK | A | A | G398 |
| Q399 | LOC-399 | OPSI_HILANG | B | - | G399 |
| Q400 | LOC-400 | KUNCI_SALAH | A | B | G400 |
| Q401 | LOC-401 | AMBIGU_PERLU_REVIEW | C | D | G401 |
| Q402 | LOC-402 | KUNCI_SALAH | B | A | G402 |
| Q403 | LOC-403 | KUNCI_SALAH | B | C | G403 |
| Q404 | LOC-404 | KUNCI_SALAH | A | D | G404 |
| Q405 | LOC-405 | OPSI_HILANG | A | - | G405 |
| Q406 | LOC-406 | OK | A | A | G406 |
| Q407 | LOC-407 | OK | A | A | G407 |
| Q408 | LOC-408 | KUNCI_SALAH | A | B | G408 |
| Q409 | LOC-409 | OK | B | B | G409 |
| Q410 | LOC-410 | OPSI_HILANG | C | - | G410 |
| Q411 | LOC-411 | OK | A | A | G411 |
| Q412 | LOC-412 | OK | B | B | G412 |
| Q413 | LOC-413 | OPSI_HILANG | A | - | G413 |
| Q414 | LOC-414 | KUNCI_SALAH | A | D | G414 |
| Q415 | LOC-415 | KUNCI_SALAH | B | A | G415 |
| Q416 | LOC-416 | OK | C | C | G416 |
| Q417 | LOC-417 | OK | A | A | G417 |
| Q418 | LOC-418 | OPSI_HILANG | A | - | G418 |
| Q419 | LOC-419 | OPSI_HILANG | B | - | G419 |
| Q420 | LOC-420 | OPSI_HILANG | B | - | G420 |
| Q421 | LOC-421 | OK | B | B | G421 |
| Q422 | LOC-422 | KUNCI_SALAH | A | C | G422 |
| Q423 | LOC-423 | OK | B | B | G423 |
| Q424 | LOC-424 | OK | A | A | G424 |
| Q425 | LOC-425 | OPSI_HILANG | A | - | G425 |
| Q426 | LOC-426 | OK | B | B | G426 |
| Q427 | LOC-427 | OK | A | A | G427 |
| Q428 | LOC-428 | OPSI_HILANG | A | - | G428 |
| Q429 | LOC-429 | OK | B | B | G429 |
| Q430 | LOC-430 | KUNCI_SALAH | B | D | G430 |
| Q431 | LOC-431 | OPSI_HILANG | B | - | G431 |
| Q432 | LOC-432 | OPSI_HILANG | A | - | G432 |
| Q433 | LOC-433 | KUNCI_SALAH | B | A | G433 |
| Q434 | LOC-434 | OK | A | A | G434 |
| Q435 | LOC-435 | OK | B | B | G435 |
| Q436 | LOC-436 | OPSI_HILANG | B | - | G436 |
| Q437 | LOC-437 | OK | D | D | G437 |
| Q438 | LOC-438 | AMBIGU_PERLU_REVIEW | A | B | G438 |
| Q439 | LOC-439 | KUNCI_SALAH | A | B | G439 |
| Q440 | LOC-440 | OK | A | A | G440 |
| Q441 | LOC-441 | OK | A | A | G441 |
| Q442 | LOC-442 | KUNCI_SALAH | A | C | G442 |
| Q443 | LOC-443 | OPSI_HILANG | A | - | G443 |
| Q444 | LOC-444 | OPSI_HILANG | B | - | G444 |
| Q445 | LOC-445 | KUNCI_SALAH | A | D | G445 |
| Q446 | LOC-446 | KUNCI_SALAH | A | B | G446 |
| Q447 | LOC-447 | OPSI_HILANG | AB | - | G447 |
| Q448 | LOC-448 | KUNCI_SALAH | AD | AB | G448 |
| Q449 | LOC-449 | KUNCI_SALAH | AB | AD | G449 |
| Q450 | LOC-450 | OK | AB | AB | G450 |
| Q451 | LOC-451 | OK | AB | AB | G451 |
| Q452 | LOC-452 | OK | AB | AB | G452 |
