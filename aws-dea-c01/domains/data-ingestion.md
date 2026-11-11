# Data Ingestion (Domain 1 · Task 1.1)

## Skill checklist

- Streaming sources: Kinesis, MSK, DynamoDB Streams, DMS, Glue, Redshift streaming patterns
- Batch sources: S3, Glue, EMR, DMS, Redshift, Lambda, AppFlow
- Schedulers: EventBridge, Airflow/MWAA, Glue schedules
- Event triggers: S3 notifications, EventBridge
- Lambda ↔ Kinesis integration, throttling, fan-in/fan-out, replayability
- Stateful vs stateless ingestion transactions

## Concept cards

### Silent under-production monitoring
- **Services:** Lambda, CloudWatch
- **Why:** Successful invocations can still write too few records; custom metrics + low-threshold alarms catch this.
- **Distractors:** Raising memory, swallowing exceptions, lowering concurrency.
- **Status:** verified (CloudWatch custom metrics pattern)

### Schedule vs event triggers
- **Services:** Glue, EventBridge, S3
- **Why:** Cron guarantees cadence; object-created events minimize latency for unpredictable arrivals.
- **Status:** verified

### Lambda default Kinesis consumption
- **Services:** Lambda, Kinesis Data Streams
- **Why:** Default mapping uses shared shard throughput; enhanced fan-out is opt-in.
- **Status:** verified

### Firehose vs Streams
- **Compare-with:** Kinesis Data Streams vs Data Firehose
- **Why:** Streams for custom consumers/replay; Firehose for managed delivery to S3/Redshift/OpenSearch/HTTP with buffering.
- **Status:** verified
