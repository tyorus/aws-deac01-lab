# Analytics services

## Quick map

| Service | Best for | Watch-outs |
| --- | --- | --- |
| Athena | Ad-hoc SQL on S3 | Control scanned bytes; use partitions/Parquet; workgroups |
| Redshift | Warehouse BI, concurrency, materialized views | Cluster/serverless cost; dist/sort design |
| Glue | ETL, catalog, crawlers, DataBrew DQ prep | DPU cost; connector limits |
| EMR | Custom/long-lived big data stacks | Ops overhead vs Glue |
| QuickSight | Dashboards / SPICE | Not a general SQL lake engine |
| OpenSearch | Full-text log/search analytics | Hot/warm sizing + retention tiering |

## Comparisons

### Athena vs Redshift
- Choose **Athena** for infrequent SQL on data already in S3.
- Choose **Redshift** for repeated governed BI with tuning levers (dist, sort, MV, Spectrum).

### Glue vs EMR
- Choose **Glue** for managed Spark ETL jobs.
- Choose **EMR** when you need cluster-level control or frameworks beyond Glue’s sweet spot.
