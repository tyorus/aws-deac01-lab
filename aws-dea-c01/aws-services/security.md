# Security, identity & governance services

| Service | Role in DEA-C01 |
| --- | --- |
| IAM | Roles for Glue/Lambda/Redshift; least privilege; ABAC tag conditions |
| Lake Formation | Lake permissions, LF-Tags, integrating Athena/Redshift/EMR access |
| KMS | CMKs, grants for temporary decrypt |
| Secrets Manager | DB creds + rotation vs hard-coded configs |
| CloudTrail | API audit; query via Athena or CloudTrail Lake |
| AWS Config | Configuration change history / compliance timeline |
| Macie | Sensitive data discovery (often with lake governance) |

## Secrets Manager vs SSM Parameter Store

- **Secrets Manager:** secrets with rotation workflows (DB credentials)
- **Parameter Store:** config and optionally SecureString; rotation story differs—prefer Secrets Manager for rotating DB passwords on the exam’s typical framing
