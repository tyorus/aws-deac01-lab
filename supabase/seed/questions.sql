-- Auto-generated seed from content/questions. Do not edit by hand.
begin;
insert into public.aws_services (id, slug, name, category) values ('lambda', 'lambda', 'lambda', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('cloudwatch', 'cloudwatch', 'cloudwatch', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('cloudformation', 'cloudformation', 'cloudformation', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('cdk', 'cdk', 'cdk', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('glue', 'glue', 'glue', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('s3', 's3', 's3', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('eventbridge', 'eventbridge', 'eventbridge', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('kinesis', 'kinesis', 'kinesis', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('step-functions', 'step-functions', 'step-functions', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('mwaa', 'mwaa', 'mwaa', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('bedrock', 'bedrock', 'bedrock', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('emr', 'emr', 'emr', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('firehose', 'firehose', 'firehose', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('msk', 'msk', 'msk', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('transfer-family', 'transfer-family', 'transfer-family', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('redshift', 'redshift', 'redshift', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('quicksight', 'quicksight', 'quicksight', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('athena', 'athena', 'athena', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('dynamodb', 'dynamodb', 'dynamodb', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('sagemaker', 'sagemaker', 'sagemaker', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('lake-formation', 'lake-formation', 'lake-formation', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('opensearch', 'opensearch', 'opensearch', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('databrew', 'databrew', 'databrew', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('ec2', 'ec2', 'ec2', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('rds', 'rds', 'rds', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('secrets-manager', 'secrets-manager', 'secrets-manager', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('iam', 'iam', 'iam', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('kms', 'kms', 'kms', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('cloudtrail', 'cloudtrail', 'cloudtrail', 'general') on conflict (id) do nothing;
insert into public.aws_services (id, slug, name, category) values ('config', 'config', 'config', 'general') on conflict (id) do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-001', 'A scheduled Lambda ingestion job completes successfully but sometimes writes far fewer records than expected. Engineers only receive alerts when the function throws. Which approach best detects silent under-production?', 'single', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-001', 'DEA-001', 'A', 'Emit a custom CloudWatch metric for records written per run and alarm when it falls below a baseline', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-001', 'DEA-001', 'B', 'Increase Lambda memory so the function is less likely to time out', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-001', 'DEA-001', 'C', 'Wrap business logic in a broad try/except that returns success after logging', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-001', 'DEA-001', 'D', 'Set reserved concurrency to 1 for the function', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-001', array['opt-a-DEA-001']::text[], 'Successful runs with unexpectedly low volume do not raise errors. A throughput metric with a low-threshold alarm detects silent under-production. Memory, swallowed exceptions, and concurrency limits do not measure output volume.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-001', 'monitoring') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-001', 'ingestion') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-001', 'lambda') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-001', 'cloudwatch') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-002', 'A team will redeploy the same serverless data pipeline across three accounts using infrastructure as code. Which two statements are accurate?', 'multi', 'easy', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-002', 'DEA-002', 'A', 'Version-controlled templates tie each deployment change to a commit and author', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-002', 'DEA-002', 'B', 'A declarative template can be applied repeatably across accounts without manual console recreation', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-002', 'DEA-002', 'C', 'IaC requires creating every resource in the console before automation can manage it', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-002', 'DEA-002', 'D', 'Templated updates always guarantee zero downtime for every resource type', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-002', 'DEA-002', 'E', 'Passing template syntax validation removes the need to test deployed behavior', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-002', array['opt-a-DEA-002','opt-b-DEA-002']::text[], 'IaC provides traceability and repeatable multi-account deployment. It does not require console-first creation, does not guarantee zero downtime for all updates, and syntax checks are not a substitute for testing.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-002', 'iac') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-002', 'programming') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-002', 'cloudformation') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-002', 'cdk') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-003', 'An AWS Glue ETL job must connect to a legacy database whose engine is not in Glue’s built-in JDBC list. The vendor provided a JDBC driver JAR. How should the driver be supplied?', 'single', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-003', 'DEA-003', 'A', 'Upload the JAR to Amazon S3 and reference that path in the Glue connection so the job loads it at runtime', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-003', 'DEA-003', 'B', 'Open a support case asking AWS to install the JAR onto Glue’s managed hosts', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-003', 'DEA-003', 'C', 'Package the JAR as a Lambda layer and attach it to the Glue job', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-003', 'DEA-003', 'D', 'Replace JDBC with Amazon Data Firehose because Firehose can speak any database protocol', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-003', array['opt-a-DEA-003']::text[], 'Glue supports custom JDBC drivers stored in S3 and referenced by the connection. Glue does not use Lambda layers, and Firehose is not a generic JDBC client.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-003', 'glue') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-003', 'jdbc') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-003', 'glue') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-003', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-004', 'Pipeline A must catalog new S3 partitions once every hour regardless of activity. Pipeline B must start within seconds whenever a new object lands. Which two trigger choices match these needs?', 'multi', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-004', 'DEA-004', 'A', 'Use a time-based schedule (cron) for pipeline A’s crawler/job', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-004', 'DEA-004', 'B', 'Use S3 Event Notifications or EventBridge object-created rules for pipeline B', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-004', 'DEA-004', 'C', 'Use only object-created events for pipeline A so it never runs on quiet hours', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-004', 'DEA-004', 'D', 'Use a fixed hourly schedule for pipeline B to poll for new files', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-004', 'DEA-004', 'E', 'Require manual console starts for both pipelines', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-004', array['opt-a-DEA-004','opt-b-DEA-004']::text[], 'Fixed schedules guarantee hourly runs. Event-driven object notifications meet near-real-time needs. The reverse choices break each requirement.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-004', 'triggers') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-004', 'scheduling') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-004', 'glue') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-004', 'eventbridge') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-004', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-005', 'A Lambda function is mapped to a Kinesis data stream with default event source mapping settings. What is the default read behavior?', 'single', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-005', 'DEA-005', 'A', 'Lambda polls each shard as a standard iterator consumer sharing shard throughput with other consumers', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-005', 'DEA-005', 'B', 'Lambda always registers enhanced fan-out with dedicated throughput per shard by default', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-005', 'DEA-005', 'C', 'Lambda invokes once per individual record and never batches', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-005', 'DEA-005', 'D', 'The stream must be deleted and recreated as a Lambda-only stream type first', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-005', array['opt-a-DEA-005']::text[], 'By default Lambda uses shared throughput polling. Enhanced fan-out is optional. Batching is the normal behavior, and no special stream type is required.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-005', 'streaming') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-005', 'lambda') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-005', 'kinesis') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-005', 'lambda') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-006', 'A team wants orchestration with no server patching or capacity planning, supporting long-running branching workflows that coordinate Glue, Lambda, and a manual approval. Which option best fits?', 'single', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-006', 'DEA-006', 'A', 'AWS Step Functions Standard workflows', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-006', 'DEA-006', 'B', 'Self-managed Airflow on a single EC2 instance', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-006', 'DEA-006', 'C', 'Only Amazon EventBridge Scheduler cron rules with no state machine', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-006', 'DEA-006', 'D', 'Amazon EMR cluster steps without an orchestration layer', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-006', array['opt-a-DEA-006']::text[], 'Step Functions Standard is fully managed/serverless and supports long-running branching and wait-for-callback/approval patterns. Self-managed Airflow adds ops burden; cron alone lacks rich branching state.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-006', 'orchestration') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-006', 'step-functions') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-006', 'mwaa') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-006', 'glue') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-007', 'Three AWS accounts each run Amazon MWAA. A DAG in account A should trigger a DAG in account B when upstream datasets are ready, without tightly coupling schedules. Which MWAA capability directly supports this pattern?', 'single', 'hard', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-007', 'DEA-007', 'A', 'Dataset-driven scheduling / data-aware scheduling across DAG dependencies', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-007', 'DEA-007', 'B', 'Replacing all DAGs with a single shared cron expression in every account', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-007', 'DEA-007', 'C', 'Hard-coding EC2 public IPs of each MWAA webserver into DAG files', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-007', 'DEA-007', 'D', 'Disabling concurrency so only one DAG in the organization can run at a time', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-007', array['opt-a-DEA-007']::text[], 'Data-aware / dataset scheduling lets DAGs react to asset readiness rather than only wall-clock schedules, which fits loosely coupled cross-team pipelines.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-007', 'orchestration') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-007', 'mwaa') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-007', 'mwaa') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-008', 'A Step Functions task uses a callback (.waitForTaskToken) pattern. The external worker crashes and never calls SendTaskSuccess or SendTaskFailure. What prevents an indefinite wait?', 'single', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-008', 'DEA-008', 'A', 'Configure a TimeoutSeconds (or HeartbeatSeconds) on the task state', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-008', 'DEA-008', 'B', 'Disable logging on the state machine', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-008', 'DEA-008', 'C', 'Switch the state machine type from Standard to Express only', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-008', 'DEA-008', 'D', 'Remove IAM permissions for SendTaskFailure so failures cannot be reported', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-008', array['opt-a-DEA-008']::text[], 'Task-level timeouts/heartbeats bound how long Step Functions waits for a callback. Express vs Standard is about duration/execution model, not a substitute for timeouts.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-008', 'orchestration') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-008', 'step-functions') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-008', 'step-functions') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-009', 'CSV files uploaded to an S3 prefix must be converted to Parquet by Lambda only when the object key ends with .csv. Which notification design is correct?', 'single', 'easy', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-009', 'DEA-009', 'A', 's3:ObjectCreated:* with a suffix filter of .csv targeting the Lambda ARN', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-009', 'DEA-009', 'B', 's3:ObjectTagging:* filtered on a tag value of csv', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-009', 'DEA-009', 'C', 's3:* with no suffix filter', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-009', 'DEA-009', 'D', 'ObjectCreated events that only publish to SNS with no Lambda destination and no subscription', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-009', array['opt-a-DEA-009']::text[], 'ObjectCreated with a suffix filter ensures Lambda runs only for .csv uploads. Tagging events and unfiltered wildcards do not meet the requirement cleanly.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-009', 'transformation') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-009', 'formats') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-009', 'lambda') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-009', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-010', 'Nightly Glue jobs are flexible on finish time and should minimize cost. Which job execution class is most appropriate?', 'single', 'easy', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-010', 'DEA-010', 'A', 'FLEX', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-010', 'DEA-010', 'B', 'STANDARD only, because FLEX cannot run Glue ETL', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-010', 'DEA-010', 'C', 'Spot Instance type field in Glue job properties (as if Glue were EC2 Spot bidding UI)', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-010', 'DEA-010', 'D', 'Setting GlueVersion alone without changing execution class', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-010', array['opt-a-DEA-010']::text[], 'Glue FLEX execution class is designed for non-urgent workloads at lower cost. STANDARD is for time-sensitive jobs.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-010', 'glue') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-010', 'cost') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-010', 'glue') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-011', 'Which two patterns correctly use Amazon Bedrock in a data engineering pipeline?', 'multi', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-011', 'DEA-011', 'A', 'Invoke a Bedrock model from Lambda after a crawler run to generate table descriptions for the Glue Data Catalog', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-011', 'DEA-011', 'B', 'Call Bedrock from an existing Lambda transform to classify free-text support tickets before writing downstream', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-011', 'DEA-011', 'C', 'Replace Glue crawlers entirely with Bedrock writing catalog schemas directly as a metastore', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-011', 'DEA-011', 'D', 'Configure Bedrock as a native Glue Spark worker/DPU executor type', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-011', 'DEA-011', 'E', 'Use Bedrock as the only way to count rows grouped by date', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-011', array['opt-a-DEA-011','opt-b-DEA-011']::text[], 'Bedrock is an API for generative tasks such as descriptions and classification. It is not a catalog replacement, Spark worker type, or required for simple aggregations.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-011', 'bedrock') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-011', 'llm') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-011', 'bedrock') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-011', 'lambda') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-011', 'glue') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-012', 'A team needs serverless Spark ETL with minimal cluster management for daily batch jobs that fit Glue’s feature set. When is AWS Glue generally preferable to Amazon EMR?', 'single', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-012', 'DEA-012', 'A', 'When you want a fully managed, serverless Spark job model without sizing and patching clusters', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-012', 'DEA-012', 'B', 'When you must run arbitrary long-lived multi-tenant YARN applications with custom bootstrap deep OS tuning', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-012', 'DEA-012', 'C', 'When you need only sub-millisecond key/value lookups', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-012', 'DEA-012', 'D', 'When you need a relational warehouse with concurrency scaling for BI', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-012', array['opt-a-DEA-012']::text[], 'Glue shines for managed/serverless ETL. EMR is better for custom/long-lived cluster control. Key/value and warehouse needs point to other services.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-012', 'glue-vs-emr') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-012', 'glue') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-012', 'emr') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-013', 'An application must retain stream data for custom consumers with shard-level processing and optional enhanced fan-out. Which service fits best?', 'single', 'medium', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-013', 'DEA-013', 'A', 'Amazon Kinesis Data Streams', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-013', 'DEA-013', 'B', 'Amazon Data Firehose alone as the system of record for consumer fan-out', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-013', 'DEA-013', 'C', 'Amazon Athena', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-013', 'DEA-013', 'D', 'Amazon S3 Inventory', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-013', array['opt-a-DEA-013']::text[], 'Kinesis Data Streams is built for durable streaming with consumer applications. Firehose is primarily a delivery stream to destinations, not a general consumer fan-out system of record.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-013', 'streaming-compare') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-013', 'kinesis') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-013', 'firehose') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-013', 'msk') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-014', 'Telemetry must be ingested continuously and landed into S3 as near-real-time buffered objects with optional format conversion, without managing consumers. Which service is the most direct fit?', 'single', 'easy', 'D1', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-014', 'DEA-014', 'A', 'Amazon Data Firehose', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-014', 'DEA-014', 'B', 'Amazon Redshift Spectrum', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-014', 'DEA-014', 'C', 'AWS Glue DataBrew', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-014', 'DEA-014', 'D', 'AWS Certificate Manager', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-014', array['opt-a-DEA-014']::text[], 'Firehose is managed delivery into destinations such as S3 with buffering and optional conversion.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-014', 'streaming-compare') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-014', 'firehose') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-014', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-015', 'A healthcare partner requires digitally signed, encrypted file exchange with integrity checks and receipts for B2B claims files. Which AWS Transfer Family protocol is the best fit?', 'single', 'medium', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-015', 'DEA-015', 'A', 'AS2', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-015', 'DEA-015', 'B', 'Anonymous FTP without TLS', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-015', 'DEA-015', 'C', 'SMTP email drop boxes', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-015', 'DEA-015', 'D', 'Public S3 website hosting', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-015', array['opt-a-DEA-015']::text[], 'AS2 is commonly used for B2B signed/encrypted document exchange with MDNs/receipts. The other options lack that compliance-oriented exchange model.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-015', 'transfer') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-015', 'lifecycle') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-015', 'transfer-family') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-016', 'QuickSight dashboards repeatedly run the same expensive multi-join aggregate against Redshift while underlying data changes only a few times per day. Which Redshift feature best improves dashboard load time?', 'single', 'medium', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-016', 'DEA-016', 'A', 'Materialized views refreshed on the data change cadence', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-016', 'DEA-016', 'B', 'Disabling result caching permanently', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-016', 'DEA-016', 'C', 'Converting all facts to SUPER JSON without modeling', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-016', 'DEA-016', 'D', 'Moving the cluster to a single-node type only', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-016', array['opt-a-DEA-016']::text[], 'Materialized views precompute expensive aggregates for repeated queries when data freshness needs are modest.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-016', 'redshift') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-016', 'performance') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-016', 'redshift') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-016', 'quicksight') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-017', 'A Glue ETL job writes DynamicFrames to S3 with partitionKeys but analysts cannot query new partitions in Athena until a separate crawler runs. How can the job register partitions during the write?', 'single', 'medium', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-017', 'DEA-017', 'A', 'Enable partition projection or use a sink option / catalog update pattern such as enabling updateBehavior/partition updates so partitions are registered as data is written', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-017', 'DEA-017', 'B', 'Delete the Glue Data Catalog and rely on listing S3 keys in the Athena UI only', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-017', 'DEA-017', 'C', 'Store Parquet in Glacier Instant Retrieval only', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-017', 'DEA-017', 'D', 'Switch from Athena to AWS CloudTrail Lake for table reads', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-017', array['opt-a-DEA-017']::text[], 'Glue can update the Data Catalog with new partitions as part of the write path, avoiding a delayed crawler-only workflow.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-017', 'glue-catalog') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-017', 'partitions') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-017', 'glue') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-017', 'athena') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-017', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-018', 'A Glue crawler will catalog a DynamoDB table. Which configuration detail is specific to DynamoDB versus an S3 data store?', 'single', 'medium', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-018', 'DEA-018', 'A', 'Sampling configuration / scan rate considerations for reading table items to infer schema', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-018', 'DEA-018', 'B', 'Choosing an S3 path depth for partition discovery', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-018', 'DEA-018', 'C', 'Setting an Amazon S3 inventory manifest as the crawler target', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-018', 'DEA-018', 'D', 'Enabling S3 dual-layer server-side encryption on the crawler itself', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-018', array['opt-a-DEA-018']::text[], 'DynamoDB crawlers sample/scan table items and expose scan-rate related settings. S3 path depth and inventory manifests apply to object stores.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-018', 'crawler') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-018', 'dynamodb') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-018', 'glue') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-018', 'dynamodb') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-019', 'An S3 Lifecycle rule transitions objects tagged project=archive after 60 days. Operators remove the tag from objects that must be retained. Which two statements are accurate operationally?', 'multi', 'hard', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-019', 'DEA-019', 'A', 'Lifecycle evaluates object tags; removing the tag can exclude the object from that tag-filtered rule on subsequent evaluations', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-019', 'DEA-019', 'B', 'Use S3 Inventory or Storage Lens / listings plus rule understanding to verify expected transitions rather than assuming instant UI certainty alone', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-019', 'DEA-019', 'C', 'Lifecycle rules permanently ignore tag changes after the object is created', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-019', 'DEA-019', 'D', 'Tag removal always restores objects already in Glacier Instantaneously to Standard without a restore', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-019', 'DEA-019', 'E', 'Lifecycle only works on buckets without versioning and cannot coexist with tags', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-019', array['opt-a-DEA-019','opt-b-DEA-019']::text[], 'Tag-based lifecycle rules re-evaluate eligibility; removing tags can prevent future transitions. Already transitioned objects are not magically restored by untagging.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-019', 's3-lifecycle') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-019', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-020', 'A rule intends Standard → Standard-IA at 30 days → Glacier Flexible Retrieval at 45 days. Which statement reflects S3 transition constraints?', 'single', 'medium', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-020', 'DEA-020', 'A', 'Transition timelines must respect minimum days and supported transition paths between storage classes', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-020', 'DEA-020', 'B', 'Any storage class can transition to any other class after one day with no restrictions', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-020', 'DEA-020', 'C', 'Lifecycle transitions require AWS Glue crawlers to rewrite objects', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-020', 'DEA-020', 'D', 'Objects smaller than 128 KB always transition faster than larger objects by rule', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-020', array['opt-a-DEA-020']::text[], 'S3 enforces minimum ages and valid transition graphs between classes. Not every hop is unrestricted.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-020', 's3-lifecycle') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-020', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-021', 'A 40-row region_lookup dimension is joined to large KEY-distributed facts. Which distribution style keeps the join local on every node without redistributing the dimension?', 'single', 'medium', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-021', 'DEA-021', 'A', 'ALL distribution for region_lookup', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-021', 'DEA-021', 'B', 'EVEN for region_lookup and KEY on a low-cardinality column for facts', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-021', 'DEA-021', 'C', 'AUTO only with no further thought when the table is tiny and joined everywhere', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-021', 'DEA-021', 'D', 'Disabling compression encodings', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-021', array['opt-a-DEA-021']::text[], 'ALL copies small dimensions to every node so joins to large facts avoid redistributing the dimension.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-021', 'redshift-dist') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-021', 'redshift') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-022', 'Auditors need to know which training dataset and preprocessing job produced a model on a SageMaker endpoint. Which capability is purpose-built for this traceability?', 'single', 'easy', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-022', 'DEA-022', 'A', 'Amazon SageMaker ML Lineage Tracking (and related catalog/lineage features)', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-022', 'DEA-022', 'B', 'Amazon SQS dead-letter queues', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-022', 'DEA-022', 'C', 'Amazon Route 53 health checks', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-022', 'DEA-022', 'D', 'AWS Snowball Edge device manifests alone', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-022', array['opt-a-DEA-022']::text[], 'SageMaker lineage tracking records relationships among data, jobs, and models.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-022', 'lineage') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-022', 'sagemaker') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-023', 'Analysts need infrequent ad-hoc SQL over CSV/JSON in S3 with minimal ongoing cost and no cluster to manage. Which approach is most cost-effective?', 'single', 'medium', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-023', 'DEA-023', 'A', 'Catalog with Glue crawler and query via Athena (optionally with workgroup limits)', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-023', 'DEA-023', 'B', 'Always load into a provisioned Redshift cluster first for every ad-hoc question', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-023', 'DEA-023', 'C', 'Duplicate all files into Amazon RDS MySQL daily', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-023', 'DEA-023', 'D', 'Use only QuickSight SPICE with no SQL access', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-023', array['opt-a-DEA-023']::text[], 'Athena is serverless SQL on S3 and fits sporadic ad-hoc analysis. Provisioned warehouses add steady cost.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-023', 'athena-vs-redshift') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-023', 'athena') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-023', 'redshift') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-023', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-024', 'Multiple departments share an S3 data lake and need least-privilege access to different subsets with low operational overhead. Which design fits best?', 'single', 'medium', 'D2', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-024', 'DEA-024', 'A', 'AWS Lake Formation with LF-Tags / tag-based access control on Data Catalog resources', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-024', 'DEA-024', 'B', 'A single shared IAM user access key distributed to every analyst', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-024', 'DEA-024', 'C', 'Public bucket ACLs for convenience', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-024', 'DEA-024', 'D', 'Copying the entire lake into per-analyst laptops nightly', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-024', array['opt-a-DEA-024']::text[], 'Lake Formation TBAC is purpose-built for fine-grained lake permissions with less policy sprawl than path-only IAM at scale.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-024', 'lake-formation') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-024', 'lake-formation') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-024', 's3') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-024', 'glue') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-025', 'Hundreds of customer-specific Glue jobs must start at 2 AM in each customer’s time zone with varying payloads as customers are added. Which approach scales best?', 'single', 'medium', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-025', 'DEA-025', 'A', 'Manage per-customer EventBridge Scheduler schedules (or equivalent schedule resources) driven by customer config data', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-025', 'DEA-025', 'B', 'One global cron that ignores time zones', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-025', 'DEA-025', 'C', 'Manual starts by an on-call engineer for each customer', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-025', 'DEA-025', 'D', 'Embedding wall-clock sleeps inside Glue Spark drivers for each customer', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-025', array['opt-a-DEA-025']::text[], 'EventBridge Scheduler scales to many one-off schedules with timezone support better than manual or single global cron approaches.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-025', 'scheduling') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-025', 'eventbridge') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-025', 'glue') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-026', 'A Lambda must run when any Glue job in the account enters FAILED, without polling. Which two elements are part of a sound design?', 'multi', 'medium', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-026', 'DEA-026', 'A', 'Capture Glue job state-change events via EventBridge', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-026', 'DEA-026', 'B', 'Set the Lambda as the EventBridge rule target filtered to FAILED', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-026', 'DEA-026', 'C', 'Run a Lambda every second calling GetJobRuns for all jobs', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-026', 'DEA-026', 'D', 'Disable CloudWatch metrics for Glue to reduce noise', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-026', 'DEA-026', 'E', 'Require SSH into Glue’s underlying hosts', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-026', array['opt-a-DEA-026','opt-b-DEA-026']::text[], 'EventBridge can route Glue job state changes to Lambda. Polling and host access are unnecessary and fragile.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-026', 'monitoring') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-026', 'glue') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-026', 'eventbridge') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-026', 'lambda') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-027', 'An engineer needs a one-hour ad-hoc distinct-count query on Parquet in S3 without provisioning clusters. Which service fits best?', 'single', 'easy', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-027', 'DEA-027', 'A', 'Amazon Athena', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-027', 'DEA-027', 'B', 'Amazon Redshift provisioned cluster created for one query then deleted mid-hour without automation', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-027', 'DEA-027', 'C', 'Amazon EC2 with a manual Hadoop install for a single COUNT DISTINCT', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-027', 'DEA-027', 'D', 'AWS Budgets', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-027', array['opt-a-DEA-027']::text[], 'Athena provides serverless SQL on S3 for ad-hoc analysis.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-027', 'athena') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-027', 'analysis') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-027', 'athena') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-027', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-028', 'Exploratory Spark analysis is bursty a few hours per week. Which factor most favors Athena Spark notebooks over a long-running EMR cluster?', 'single', 'medium', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-028', 'DEA-028', 'A', 'Serverless on-demand compute that avoids paying for idle cluster capacity', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-028', 'DEA-028', 'B', 'Need for persistent HDFS with custom bootstrap AMI deep customization', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-028', 'DEA-028', 'C', 'Requirement to pin exact EC2 instance families for years', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-028', 'DEA-028', 'D', 'Need for OS-level SSH into every executor host daily', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-028', array['opt-a-DEA-028']::text[], 'Athena Spark notebooks suit intermittent exploration without idle cluster cost.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-028', 'athena-spark') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-028', 'emr') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-028', 'athena') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-028', 'emr') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-029', 'Terabytes of microservice logs need full-text search, dashboards, and cost-effective long-term retention. Which approach is most appropriate?', 'single', 'medium', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-029', 'DEA-029', 'A', 'Hot searchable store such as OpenSearch for recent/queryable logs plus durable cheap storage (for example S3) for long-term retention tiers', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-029', 'DEA-029', 'B', 'Only print logs to application stdout with no aggregation', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-029', 'DEA-029', 'C', 'Store all logs exclusively in DynamoDB strongly consistent items forever', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-029', 'DEA-029', 'D', 'Email each log line via SES', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-029', array['opt-a-DEA-029']::text[], 'Search engines handle interactive full-text needs; object storage tiers handle cheap long retention.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-029', 'logging') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-029', 'search') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-029', 'opensearch') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-029', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-030', 'A CloudWatch Logs Insights query must count errors by service field in 5-minute bins, sort descending, and limit to top 20. Which components belong in the query pipeline?', 'multi', 'medium', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-030', 'DEA-030', 'A', 'stats count() by service, bin(5m)', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-030', 'DEA-030', 'B', 'sort count desc | limit 20 (or equivalent sort/limit clauses)', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-030', 'DEA-030', 'C', 'DELETE FROM log group', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-030', 'DEA-030', 'D', 'VACUUM FULL on the log group', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-030', 'DEA-030', 'E', 'CREATE INDEX CONCURRENTLY', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-030', array['opt-a-DEA-030','opt-b-DEA-030']::text[], 'Logs Insights uses stats/bin aggregations with sort and limit. Relational DDL/maintenance statements do not apply.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-030', 'cloudwatch-logs') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-030', 'cloudwatch') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-031', 'Five numeric DataBrew columns must each be ≤ 100. How can one rule cover all five columns?', 'single', 'easy', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-031', 'DEA-031', 'A', 'Define a column-level check once and apply it to multiple columns in the ruleset', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-031', 'DEA-031', 'B', 'Create five separate Glue workflows that each drop the table', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-031', 'DEA-031', 'C', 'Use Route 53 latency-based routing', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-031', 'DEA-031', 'D', 'Enable S3 Transfer Acceleration on the DataBrew project', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-031', array['opt-a-DEA-031']::text[], 'DataBrew rulesets support applying the same check across multiple columns.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-031', 'data-quality') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-031', 'databrew') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-032', 'Glue Spark jobs sometimes suffer shuffle skew. The team wants Spark to detect and correct skewed partitions at runtime. Which statements are correct about adaptive execution-style capabilities?', 'multi', 'hard', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-032', 'DEA-032', 'A', 'Adaptive Query Execution can coalesce/optimize skewed shuffle partitions based on runtime stats', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-032', 'DEA-032', 'B', 'Enabling AQE-related settings can reduce manual salting for many skew cases', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-032', 'DEA-032', 'C', 'AQE requires disabling the Glue Data Catalog permanently', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-032', 'DEA-032', 'D', 'Skew is impossible on Parquet inputs', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-032', 'DEA-032', 'E', 'The only fix is always converting to CSV', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-032', array['opt-a-DEA-032','opt-b-DEA-032']::text[], 'AQE uses runtime statistics to mitigate skew; it does not require abandoning the catalog or changing to CSV.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-032', 'spark-skew') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-032', 'glue') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-033', 'Training data in S3 needs data quality rules with minimal operational overhead before ML use. Which approach fits best?', 'single', 'medium', 'D3', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-033', 'DEA-033', 'A', 'Glue DataBrew profile jobs with rulesets, optionally triggered via EventBridge on new data', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-033', 'DEA-033', 'B', 'A perpetual EMR cluster running custom code for every object with no managed rules', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-033', 'DEA-033', 'C', 'Neptune ML Gremlin scripts as the primary DQ engine for tabular training sets', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-033', 'DEA-033', 'D', 'DynamoDB global tables to deduplicate S3 objects', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-033', array['opt-a-DEA-033']::text[], 'DataBrew provides managed profiling and rules with low ops overhead for tabular quality checks.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-033', 'data-quality') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-033', 'databrew') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-033', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-034', 'An S3 Access Point should accept requests only from a specific VPC. Which statements are correct?', 'multi', 'medium', 'D4', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-034', 'DEA-034', 'A', 'You can restrict an access point policy to a VPC source VPC condition', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-034', 'DEA-034', 'B', 'Network origin controls on the access point help ensure requests come from the designated VPC', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-034', 'DEA-034', 'C', 'Access points replace the need for any IAM authorization always', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-034', 'DEA-034', 'D', 'VPC-only access points automatically make the bucket world-readable', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-034', 'DEA-034', 'E', 'Access points can only be used with Glacier Deep Archive listings', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-034', array['opt-a-DEA-034','opt-b-DEA-034']::text[], 'Access points support VPC-restricted policies/network origins while IAM still authorizes actions.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-034', 's3-access-points') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-034', 's3') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-035', 'Which option is best described as unmanaged relative to a managed database service, where the customer patches OS and database engine?', 'single', 'easy', 'D4', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-035', 'DEA-035', 'A', 'Running a database on Amazon EC2', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-035', 'DEA-035', 'B', 'Amazon RDS', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-035', 'DEA-035', 'C', 'Amazon Aurora fully managed clusters', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-035', 'DEA-035', 'D', 'Amazon DynamoDB', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-035', array['opt-a-DEA-035']::text[], 'EC2-hosted databases shift OS/engine patching to the customer versus RDS/Aurora/DynamoDB managed models.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-035', 'managed-vs-unmanaged') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-035', 'ec2') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-035', 'rds') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-036', 'An EC2 ETL job hard-codes an RDS password. Security requires removing the hard-coded secret and rotating credentials without redeploying the app each rotation. Which two actions help?', 'multi', 'medium', 'D4', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-036', 'DEA-036', 'A', 'Store credentials in AWS Secrets Manager', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-036', 'DEA-036', 'B', 'Enable rotation and have the application retrieve the secret at runtime', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-036', 'DEA-036', 'C', 'Commit the password to a public GitHub gist for centralized access', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-036', 'DEA-036', 'D', 'Disable SSL on RDS to simplify clients', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-036', 'DEA-036', 'E', 'Share one IAM access key in Slack', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-036', array['opt-a-DEA-036','opt-b-DEA-036']::text[], 'Secrets Manager plus runtime retrieval enables rotation without baking passwords into builds.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-036', 'secrets') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-036', 'secrets-manager') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-036', 'rds') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-037', 'Engineers should gain access to S3/Glue resources tagged with the same project tag they are assigned, without rewriting policies for each project change. Which two elements implement ABAC?', 'multi', 'hard', 'D4', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-037', 'DEA-037', 'A', 'Tag principals (users/roles) with a project tag', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-037', 'DEA-037', 'B', 'Write policies that compare resource tags to principal tags (aws:PrincipalTag / aws:ResourceTag)', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-037', 'DEA-037', 'C', 'Disable all tagging on resources', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-037', 'DEA-037', 'D', 'Use only inline wildcard Allow * on * for everyone', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-037', 'DEA-037', 'E', 'Store passwords in object metadata instead of IAM', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-037', array['opt-a-DEA-037','opt-b-DEA-037']::text[], 'ABAC matches principal tags to resource tags in IAM conditions.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-037', 'abac') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-037', 'iam') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-037', 's3') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-037', 'glue') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-038', 'On-premises ETL connects to Redshift over the internet. Auditors require encryption in transit and rejection of unencrypted attempts. What should be configured?', 'single', 'medium', 'D4', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-038', 'DEA-038', 'A', 'Require TLS for connections (for example require_ssl / equivalent cluster parameter) so non-TLS clients fail', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-038', 'DEA-038', 'B', 'Disable encryption to improve speed for auditors', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-038', 'DEA-038', 'C', 'Use only HTTP cleartext JDBC', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-038', 'DEA-038', 'D', 'Expose the cluster with a wide-open 0.0.0.0/0 security group and no TLS', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-038', array['opt-a-DEA-038']::text[], 'Requiring SSL/TLS on the Redshift cluster rejects unencrypted clients.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-038', 'encryption') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-038', 'redshift') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-039', 'A short-lived Glue job must decrypt objects under a customer managed KMS key for one run without permanently widening key or role policies. Which approach fits?', 'multi', 'hard', 'D4', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-039', 'DEA-039', 'A', 'Use a KMS grant for temporary permission', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-039', 'DEA-039', 'B', 'Rely on grant constraints/retirement so access is narrowly scoped and temporary', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-039', 'DEA-039', 'C', 'Make the CMK publicly usable by anonymous principals', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-039', 'DEA-039', 'D', 'Disable CloudTrail for the account during the job', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-e-DEA-039', 'DEA-039', 'E', 'Embed the raw KMS key material in the Glue script', 4)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-039', array['opt-a-DEA-039','opt-b-DEA-039']::text[], 'KMS grants provide temporary, retiring permissions without permanent policy edits.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-039', 'kms') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-039', 'kms') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-039', 'glue') on conflict do nothing;
insert into public.questions (id, stem, type, difficulty, domain_id, status, provenance, verification_status, reviewed_at)
values ('DEA-040', 'Organization CloudTrail already delivers logs to a centralized S3 bucket. Auditors need one-off SQL for DeleteBucket calls this quarter with minimal new infrastructure. What is the leanest approach?', 'single', 'medium', 'D4', 'published', 'original-authored-for-dea-c01-lab', 'original', '2026-11-11')
on conflict (id) do update set stem = excluded.stem, type = excluded.type, difficulty = excluded.difficulty, domain_id = excluded.domain_id, status = excluded.status, updated_at = now();
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-a-DEA-040', 'DEA-040', 'A', 'Query the existing CloudTrail S3 logs with Athena (and Glue catalog/partitions as needed)', 0)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-b-DEA-040', 'DEA-040', 'B', 'Rebuild a new streaming pipeline into a dedicated Redshift cluster solely for this quarter’s question', 1)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-c-DEA-040', 'DEA-040', 'C', 'Turn off CloudTrail and rely on memory of console clicks', 2)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_options (id, question_id, label, body, sort_order)
values ('opt-d-DEA-040', 'DEA-040', 'D', 'Use Amazon Polly to read log files aloud', 3)
on conflict (id) do update set body = excluded.body, label = excluded.label;
insert into public.question_answer_keys (question_id, correct_option_ids, explanation)
values ('DEA-040', array['opt-a-DEA-040']::text[], 'Athena on existing CloudTrail S3 data answers ad-hoc audit SQL with little new infrastructure. AWS Config is better for configuration timeline questions; here the need is API call search.')
on conflict (question_id) do update set correct_option_ids = excluded.correct_option_ids, explanation = excluded.explanation;
insert into public.question_tags (question_id, tag) values ('DEA-040', 'audit') on conflict do nothing;
insert into public.question_tags (question_id, tag) values ('DEA-040', 'cloudtrail') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-040', 'cloudtrail') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-040', 'athena') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-040', 's3') on conflict do nothing;
insert into public.question_services (question_id, service_id) values ('DEA-040', 'config') on conflict do nothing;
commit;
