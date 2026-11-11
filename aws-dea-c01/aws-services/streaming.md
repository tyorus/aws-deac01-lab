# Streaming services

## Kinesis Data Streams vs Data Firehose vs MSK

| Need | Prefer |
| --- | --- |
| Custom consumers, shard processing, replay, enhanced fan-out | **Kinesis Data Streams** |
| Managed delivery to S3/Redshift/OpenSearch/HTTP with buffering & conversion | **Data Firehose** |
| Kafka ecosystem / existing Kafka apps | **Amazon MSK** |

## Lambda + Kinesis

- Default: shared throughput polling per shard
- Enhanced fan-out: dedicated throughput when consumers compete
- Batch window / batch size affect cost and latency tradeoffs
