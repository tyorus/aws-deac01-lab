# Database services

| Service | Pattern | Exam cues |
| --- | --- | --- |
| Redshift | Columnar warehouse | Dist ALL/KEY/EVEN, MV, Spectrum, federated, require_ssl |
| RDS / Aurora | Managed relational | Prefer over EC2 self-managed DB for patching offload |
| DynamoDB | Serverless key-value | TTL, streams, access patterns; not a lake SQL engine |
| MemoryDB / ElastiCache | Ultra-low latency KV | When microsecond-ish cache/KV is the requirement |

## Redshift distribution cheat-sheet

- **ALL:** small dimensions joined often
- **KEY:** large facts/dims joined on high-cardinality key
- **EVEN:** when no clear join key / avoid skew from bad KEY
