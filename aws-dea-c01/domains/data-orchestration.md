# Data Orchestration (Domain 1 · Task 1.3)

## Skill checklist

- Orchestrators: Step Functions, MWAA, Glue workflows, EventBridge, Lambda
- Build for resiliency, retries, notifications (SNS/SQS)
- Serverless workflow patterns and timeouts/callbacks

## Concept cards

### Step Functions vs MWAA vs Glue workflows
- **Step Functions:** Serverless state machines; excellent for AWS service integration, approvals, waitForTaskToken; Standard for long runs.
- **MWAA:** Managed Airflow for complex DAG ecosystems, Python operators, multi-team data-aware scheduling.
- **Glue workflows:** Lightweight orchestration when the graph is mostly Glue crawlers/jobs.
- **Distractors:** Self-managed single EC2 Airflow “for simplicity”; cron-only for branching multi-hour graphs.
- **Status:** verified

### Callback timeouts
- **Why:** `TimeoutSeconds` / `HeartbeatSeconds` bound waitForTaskToken waits when workers crash.
- **Status:** verified

### Cross-account DAG triggering
- **Why:** Prefer dataset/data-aware scheduling over hard-coupled wall clocks across accounts.
- **Status:** community → verify against current MWAA docs when studying
