# Data Store Management (Domain 2)

## Skill checklist

- Choose stores: Redshift, S3/Lake Formation, RDS, DynamoDB, streaming stores, EMR storage patterns
- Catalogs: Glue Data Catalog, Hive metastore, crawlers, partition sync
- Lifecycle: S3 tiers/expiry, versioning, DynamoDB TTL, load/unload
- Models: Redshift dist/sort, Iceberg/open table formats, schema evolution, lineage

## Concept cards

### Athena vs Redshift
- **Athena:** Serverless SQL on S3; great for ad-hoc/infrequent queries; pay per data scanned.
- **Redshift:** Managed warehouse for repeated, concurrent BI with tuning (dist styles, materialized views, Spectrum/federated).
- **Status:** verified

### Lake Formation vs raw S3 IAM
- **Why Lake Formation:** Central governance, LF-Tags/TBAC, fine-grained access with less path policy sprawl.
- **S3 alone:** Fine for simple buckets; becomes brittle for multi-department lakes.
- **Status:** verified

### Redshift ALL distribution
- **Why:** Small dimensions joined broadly stay local on every node.
- **Distractors:** KEY on low-cardinality join keys causing skew.
- **Status:** verified

### Materialized views
- **Why:** Precompute expensive aggregates when freshness needs are modest (dashboards).
- **Status:** verified

### Partition registration
- **Why:** Prefer writing partitions into the Glue Catalog during ETL vs delayed crawler-only discovery.
- **Status:** verified

### S3 Lifecycle
- **Why:** Respect minimum days and valid class transition graphs; tag filters re-evaluate eligibility.
- **Status:** verified
