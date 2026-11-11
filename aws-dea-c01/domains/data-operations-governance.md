# Data Operations, Security & Governance (Domains 3 & 4)

## Domain 3 — Operations & Support

### Skill checklist

- Automate with MWAA/Step Functions/EventBridge/Lambda/Glue/EMR/Athena
- Analyze with Athena, Redshift SQL, QuickSight, notebooks
- Monitor: CloudWatch, CloudTrail, OpenSearch for log search at scale
- Data quality: DataBrew rules, Glue DQ, skew handling (AQE)

### Concept cards

#### Event-driven Glue failure handling
- **Why:** EventBridge on Glue state changes → Lambda; avoid polling GetJobRuns.
- **Status:** verified

#### DataBrew multi-column rules
- **Why:** Apply one check across many columns in a ruleset.
- **Status:** verified

#### Athena Spark vs always-on EMR for exploration
- **Why:** Burst exploration favors serverless notebooks to avoid idle cluster cost.
- **Status:** verified

## Domain 4 — Security & Governance

### Skill checklist

- AuthN: IAM roles, VPC SGs, Secrets Manager rotation
- AuthZ: least privilege, Lake Formation, ABAC (tag-based)
- Encryption/masking: KMS, TLS in transit, grants for temporary access
- Audit: CloudTrail, CloudWatch Logs, Config for configuration history
- Privacy: Macie + Lake Formation patterns, sovereignty controls

### Concept cards

#### Secrets Manager rotation
- **Why:** Runtime secret retrieval enables rotation without redeploying hard-coded passwords.
- **Status:** verified

#### ABAC with project tags
- **Why:** Principal tags + resource tag conditions scale better than rewriting identity policies per project.
- **Status:** verified

#### KMS grants for short Glue jobs
- **Why:** Temporary decrypt permission without permanent key/role policy edits.
- **Status:** verified

#### CloudTrail + Athena for API forensics
- **Why:** Query existing org trail in S3 for DeleteBucket-type investigations with little new infra.
- **Compare-with:** AWS Config for configuration timeline (“what changed on this resource”).
- **Status:** verified
