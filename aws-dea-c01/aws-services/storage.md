# Storage & lake services

## S3 vs Lake Formation

| Concern | S3 alone | Lake Formation |
| --- | --- | --- |
| Object durability & lifecycle | Core strength | Uses S3 locations |
| Fine-grained multi-team access | IAM/path policies get complex | LF permissions / LF-Tags (TBAC) |
| Catalog integration | Via Glue Catalog | Governed catalog permissions |

## Lifecycle reminders

- Valid transition paths and minimum days matter
- Tag-based rules re-evaluate; untagging can prevent future transitions
- Restoring from archival classes is a separate operation
