# Data Transformation (Domain 1 · Tasks 1.2 & 1.4)

## Skill checklist

- Choose transform compute: Glue, EMR, Lambda, Redshift SQL/ELT
- Format conversion (CSV → Parquet), multi-source integration, JDBC/ODBC
- Cost optimization (Glue FLEX, right-sizing, partition pruning)
- Containers (ECS/EKS) when needed; LLM-assisted processing (Bedrock) where appropriate
- Programming practices: IaC (CloudFormation/CDK/SAM), CI/CD, Lambda concurrency, logging

## Concept cards

### Glue vs EMR
- **Compare-with:** Glue (serverless/managed Spark jobs) vs EMR (cluster control, custom frameworks)
- **Why Glue:** Daily ETL with minimal ops when features fit.
- **Why EMR:** Long-lived clusters, deep customization, multi-framework control.
- **Distractors:** Using EMR for tiny ad-hoc SQL; using Glue when OS-level bootstrap is mandatory.
- **Status:** verified

### Custom JDBC drivers on Glue
- **Services:** Glue, S3
- **Why:** Upload vendor JAR to S3 and reference in the Glue connection.
- **Distractors:** Lambda layers, support-case host installs, Firehose as JDBC.
- **Status:** verified

### Glue FLEX execution class
- **Why:** Lower cost for non-time-sensitive jobs.
- **Status:** verified

### Bedrock in pipelines
- **Why:** Classification/summarization via API from Lambda; not a metastore or Spark worker type.
- **Status:** verified

### IaC for pipelines
- **Services:** CloudFormation, CDK, SAM
- **Why:** Repeatable multi-account deploys with git history; still requires testing beyond syntax validation.
- **Status:** verified
