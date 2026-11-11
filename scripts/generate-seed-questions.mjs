import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'aws-dea-c01', 'content', 'questions')
mkdirSync(outDir, { recursive: true })

const reviewedAt = '2026-11-11'

function q(partial) {
  return {
    provenance: 'original-authored-for-dea-c01-lab',
    verification_status: 'original',
    status: 'published',
    reviewed_at: reviewedAt,
    ...partial,
  }
}

function opts(correctLabels, bodies) {
  const labels = ['A', 'B', 'C', 'D', 'E']
  return bodies.map((body, i) => ({
    id: `opt-${labels[i].toLowerCase()}`,
    label: labels[i],
    body,
    correct: correctLabels.includes(labels[i]),
  }))
}

const questions = [
  q({
    id: 'DEA-001', domain: 'D1', topics: ['monitoring', 'ingestion'], services: ['lambda', 'cloudwatch'],
    difficulty: 'medium', type: 'single',
    stem: 'A scheduled Lambda ingestion job completes successfully but sometimes writes far fewer records than expected. Engineers only receive alerts when the function throws. Which approach best detects silent under-production?',
    options: opts(['A'], [
      'Emit a custom CloudWatch metric for records written per run and alarm when it falls below a baseline',
      'Increase Lambda memory so the function is less likely to time out',
      'Wrap business logic in a broad try/except that returns success after logging',
      'Set reserved concurrency to 1 for the function',
    ]),
    explanation: 'Successful runs with unexpectedly low volume do not raise errors. A throughput metric with a low-threshold alarm detects silent under-production. Memory, swallowed exceptions, and concurrency limits do not measure output volume.',
  }),
  q({
    id: 'DEA-002', domain: 'D1', topics: ['iac', 'programming'], services: ['cloudformation', 'cdk'],
    difficulty: 'easy', type: 'multi',
    stem: 'A team will redeploy the same serverless data pipeline across three accounts using infrastructure as code. Which two statements are accurate?',
    options: opts(['A', 'B'], [
      'Version-controlled templates tie each deployment change to a commit and author',
      'A declarative template can be applied repeatably across accounts without manual console recreation',
      'IaC requires creating every resource in the console before automation can manage it',
      'Templated updates always guarantee zero downtime for every resource type',
      'Passing template syntax validation removes the need to test deployed behavior',
    ]),
    explanation: 'IaC provides traceability and repeatable multi-account deployment. It does not require console-first creation, does not guarantee zero downtime for all updates, and syntax checks are not a substitute for testing.',
  }),
  q({
    id: 'DEA-003', domain: 'D1', topics: ['glue', 'jdbc'], services: ['glue', 's3'],
    difficulty: 'medium', type: 'single',
    stem: 'An AWS Glue ETL job must connect to a legacy database whose engine is not in Glue’s built-in JDBC list. The vendor provided a JDBC driver JAR. How should the driver be supplied?',
    options: opts(['A'], [
      'Upload the JAR to Amazon S3 and reference that path in the Glue connection so the job loads it at runtime',
      'Open a support case asking AWS to install the JAR onto Glue’s managed hosts',
      'Package the JAR as a Lambda layer and attach it to the Glue job',
      'Replace JDBC with Amazon Data Firehose because Firehose can speak any database protocol',
    ]),
    explanation: 'Glue supports custom JDBC drivers stored in S3 and referenced by the connection. Glue does not use Lambda layers, and Firehose is not a generic JDBC client.',
  }),
  q({
    id: 'DEA-004', domain: 'D1', topics: ['triggers', 'scheduling'], services: ['glue', 'eventbridge', 's3'],
    difficulty: 'medium', type: 'multi',
    stem: 'Pipeline A must catalog new S3 partitions once every hour regardless of activity. Pipeline B must start within seconds whenever a new object lands. Which two trigger choices match these needs?',
    options: opts(['A', 'B'], [
      'Use a time-based schedule (cron) for pipeline A’s crawler/job',
      'Use S3 Event Notifications or EventBridge object-created rules for pipeline B',
      'Use only object-created events for pipeline A so it never runs on quiet hours',
      'Use a fixed hourly schedule for pipeline B to poll for new files',
      'Require manual console starts for both pipelines',
    ]),
    explanation: 'Fixed schedules guarantee hourly runs. Event-driven object notifications meet near-real-time needs. The reverse choices break each requirement.',
  }),
  q({
    id: 'DEA-005', domain: 'D1', topics: ['streaming', 'lambda'], services: ['kinesis', 'lambda'],
    difficulty: 'medium', type: 'single',
    stem: 'A Lambda function is mapped to a Kinesis data stream with default event source mapping settings. What is the default read behavior?',
    options: opts(['A'], [
      'Lambda polls each shard as a standard iterator consumer sharing shard throughput with other consumers',
      'Lambda always registers enhanced fan-out with dedicated throughput per shard by default',
      'Lambda invokes once per individual record and never batches',
      'The stream must be deleted and recreated as a Lambda-only stream type first',
    ]),
    explanation: 'By default Lambda uses shared throughput polling. Enhanced fan-out is optional. Batching is the normal behavior, and no special stream type is required.',
  }),
  q({
    id: 'DEA-006', domain: 'D1', topics: ['orchestration'], services: ['step-functions', 'mwaa', 'glue'],
    difficulty: 'medium', type: 'single',
    stem: 'A team wants orchestration with no server patching or capacity planning, supporting long-running branching workflows that coordinate Glue, Lambda, and a manual approval. Which option best fits?',
    options: opts(['A'], [
      'AWS Step Functions Standard workflows',
      'Self-managed Airflow on a single EC2 instance',
      'Only Amazon EventBridge Scheduler cron rules with no state machine',
      'Amazon EMR cluster steps without an orchestration layer',
    ]),
    explanation: 'Step Functions Standard is fully managed/serverless and supports long-running branching and wait-for-callback/approval patterns. Self-managed Airflow adds ops burden; cron alone lacks rich branching state.',
  }),
  q({
    id: 'DEA-007', domain: 'D1', topics: ['orchestration', 'mwaa'], services: ['mwaa'],
    difficulty: 'hard', type: 'single',
    stem: 'Three AWS accounts each run Amazon MWAA. A DAG in account A should trigger a DAG in account B when upstream datasets are ready, without tightly coupling schedules. Which MWAA capability directly supports this pattern?',
    options: opts(['A'], [
      'Dataset-driven scheduling / data-aware scheduling across DAG dependencies',
      'Replacing all DAGs with a single shared cron expression in every account',
      'Hard-coding EC2 public IPs of each MWAA webserver into DAG files',
      'Disabling concurrency so only one DAG in the organization can run at a time',
    ]),
    explanation: 'Data-aware / dataset scheduling lets DAGs react to asset readiness rather than only wall-clock schedules, which fits loosely coupled cross-team pipelines.',
  }),
  q({
    id: 'DEA-008', domain: 'D1', topics: ['orchestration', 'step-functions'], services: ['step-functions'],
    difficulty: 'medium', type: 'single',
    stem: 'A Step Functions task uses a callback (.waitForTaskToken) pattern. The external worker crashes and never calls SendTaskSuccess or SendTaskFailure. What prevents an indefinite wait?',
    options: opts(['A'], [
      'Configure a TimeoutSeconds (or HeartbeatSeconds) on the task state',
      'Disable logging on the state machine',
      'Switch the state machine type from Standard to Express only',
      'Remove IAM permissions for SendTaskFailure so failures cannot be reported',
    ]),
    explanation: 'Task-level timeouts/heartbeats bound how long Step Functions waits for a callback. Express vs Standard is about duration/execution model, not a substitute for timeouts.',
  }),
  q({
    id: 'DEA-009', domain: 'D1', topics: ['transformation', 'formats'], services: ['lambda', 's3'],
    difficulty: 'easy', type: 'single',
    stem: 'CSV files uploaded to an S3 prefix must be converted to Parquet by Lambda only when the object key ends with .csv. Which notification design is correct?',
    options: opts(['A'], [
      's3:ObjectCreated:* with a suffix filter of .csv targeting the Lambda ARN',
      's3:ObjectTagging:* filtered on a tag value of csv',
      's3:* with no suffix filter',
      'ObjectCreated events that only publish to SNS with no Lambda destination and no subscription',
    ]),
    explanation: 'ObjectCreated with a suffix filter ensures Lambda runs only for .csv uploads. Tagging events and unfiltered wildcards do not meet the requirement cleanly.',
  }),
  q({
    id: 'DEA-010', domain: 'D1', topics: ['glue', 'cost'], services: ['glue'],
    difficulty: 'easy', type: 'single',
    stem: 'Nightly Glue jobs are flexible on finish time and should minimize cost. Which job execution class is most appropriate?',
    options: opts(['A'], [
      'FLEX',
      'STANDARD only, because FLEX cannot run Glue ETL',
      'Spot Instance type field in Glue job properties (as if Glue were EC2 Spot bidding UI)',
      'Setting GlueVersion alone without changing execution class',
    ]),
    explanation: 'Glue FLEX execution class is designed for non-urgent workloads at lower cost. STANDARD is for time-sensitive jobs.',
  }),
  q({
    id: 'DEA-011', domain: 'D1', topics: ['bedrock', 'llm'], services: ['bedrock', 'lambda', 'glue'],
    difficulty: 'medium', type: 'multi',
    stem: 'Which two patterns correctly use Amazon Bedrock in a data engineering pipeline?',
    options: opts(['A', 'B'], [
      'Invoke a Bedrock model from Lambda after a crawler run to generate table descriptions for the Glue Data Catalog',
      'Call Bedrock from an existing Lambda transform to classify free-text support tickets before writing downstream',
      'Replace Glue crawlers entirely with Bedrock writing catalog schemas directly as a metastore',
      'Configure Bedrock as a native Glue Spark worker/DPU executor type',
      'Use Bedrock as the only way to count rows grouped by date',
    ]),
    explanation: 'Bedrock is an API for generative tasks such as descriptions and classification. It is not a catalog replacement, Spark worker type, or required for simple aggregations.',
  }),
  q({
    id: 'DEA-012', domain: 'D1', topics: ['glue-vs-emr'], services: ['glue', 'emr'],
    difficulty: 'medium', type: 'single',
    stem: 'A team needs serverless Spark ETL with minimal cluster management for daily batch jobs that fit Glue’s feature set. When is AWS Glue generally preferable to Amazon EMR?',
    options: opts(['A'], [
      'When you want a fully managed, serverless Spark job model without sizing and patching clusters',
      'When you must run arbitrary long-lived multi-tenant YARN applications with custom bootstrap deep OS tuning',
      'When you need only sub-millisecond key/value lookups',
      'When you need a relational warehouse with concurrency scaling for BI',
    ]),
    explanation: 'Glue shines for managed/serverless ETL. EMR is better for custom/long-lived cluster control. Key/value and warehouse needs point to other services.',
  }),
  q({
    id: 'DEA-013', domain: 'D1', topics: ['streaming-compare'], services: ['kinesis', 'firehose', 'msk'],
    difficulty: 'medium', type: 'single',
    stem: 'An application must retain stream data for custom consumers with shard-level processing and optional enhanced fan-out. Which service fits best?',
    options: opts(['A'], [
      'Amazon Kinesis Data Streams',
      'Amazon Data Firehose alone as the system of record for consumer fan-out',
      'Amazon Athena',
      'Amazon S3 Inventory',
    ]),
    explanation: 'Kinesis Data Streams is built for durable streaming with consumer applications. Firehose is primarily a delivery stream to destinations, not a general consumer fan-out system of record.',
  }),
  q({
    id: 'DEA-014', domain: 'D1', topics: ['streaming-compare'], services: ['firehose', 's3'],
    difficulty: 'easy', type: 'single',
    stem: 'Telemetry must be ingested continuously and landed into S3 as near-real-time buffered objects with optional format conversion, without managing consumers. Which service is the most direct fit?',
    options: opts(['A'], [
      'Amazon Data Firehose',
      'Amazon Redshift Spectrum',
      'AWS Glue DataBrew',
      'AWS Certificate Manager',
    ]),
    explanation: 'Firehose is managed delivery into destinations such as S3 with buffering and optional conversion.',
  }),
  // D2
  q({
    id: 'DEA-015', domain: 'D2', topics: ['transfer', 'lifecycle'], services: ['transfer-family'],
    difficulty: 'medium', type: 'single',
    stem: 'A healthcare partner requires digitally signed, encrypted file exchange with integrity checks and receipts for B2B claims files. Which AWS Transfer Family protocol is the best fit?',
    options: opts(['A'], [
      'AS2',
      'Anonymous FTP without TLS',
      'SMTP email drop boxes',
      'Public S3 website hosting',
    ]),
    explanation: 'AS2 is commonly used for B2B signed/encrypted document exchange with MDNs/receipts. The other options lack that compliance-oriented exchange model.',
  }),
  q({
    id: 'DEA-016', domain: 'D2', topics: ['redshift', 'performance'], services: ['redshift', 'quicksight'],
    difficulty: 'medium', type: 'single',
    stem: 'QuickSight dashboards repeatedly run the same expensive multi-join aggregate against Redshift while underlying data changes only a few times per day. Which Redshift feature best improves dashboard load time?',
    options: opts(['A'], [
      'Materialized views refreshed on the data change cadence',
      'Disabling result caching permanently',
      'Converting all facts to SUPER JSON without modeling',
      'Moving the cluster to a single-node type only',
    ]),
    explanation: 'Materialized views precompute expensive aggregates for repeated queries when data freshness needs are modest.',
  }),
  q({
    id: 'DEA-017', domain: 'D2', topics: ['glue-catalog', 'partitions'], services: ['glue', 'athena', 's3'],
    difficulty: 'medium', type: 'single',
    stem: 'A Glue ETL job writes DynamicFrames to S3 with partitionKeys but analysts cannot query new partitions in Athena until a separate crawler runs. How can the job register partitions during the write?',
    options: opts(['A'], [
      'Enable partition projection or use a sink option / catalog update pattern such as enabling updateBehavior/partition updates so partitions are registered as data is written',
      'Delete the Glue Data Catalog and rely on listing S3 keys in the Athena UI only',
      'Store Parquet in Glacier Instant Retrieval only',
      'Switch from Athena to AWS CloudTrail Lake for table reads',
    ]),
    explanation: 'Glue can update the Data Catalog with new partitions as part of the write path, avoiding a delayed crawler-only workflow.',
  }),
  q({
    id: 'DEA-018', domain: 'D2', topics: ['crawler', 'dynamodb'], services: ['glue', 'dynamodb'],
    difficulty: 'medium', type: 'single',
    stem: 'A Glue crawler will catalog a DynamoDB table. Which configuration detail is specific to DynamoDB versus an S3 data store?',
    options: opts(['A'], [
      'Sampling configuration / scan rate considerations for reading table items to infer schema',
      'Choosing an S3 path depth for partition discovery',
      'Setting an Amazon S3 inventory manifest as the crawler target',
      'Enabling S3 dual-layer server-side encryption on the crawler itself',
    ]),
    explanation: 'DynamoDB crawlers sample/scan table items and expose scan-rate related settings. S3 path depth and inventory manifests apply to object stores.',
  }),
  q({
    id: 'DEA-019', domain: 'D2', topics: ['s3-lifecycle'], services: ['s3'],
    difficulty: 'hard', type: 'multi',
    stem: 'An S3 Lifecycle rule transitions objects tagged project=archive after 60 days. Operators remove the tag from objects that must be retained. Which two statements are accurate operationally?',
    options: opts(['A', 'B'], [
      'Lifecycle evaluates object tags; removing the tag can exclude the object from that tag-filtered rule on subsequent evaluations',
      'Use S3 Inventory or Storage Lens / listings plus rule understanding to verify expected transitions rather than assuming instant UI certainty alone',
      'Lifecycle rules permanently ignore tag changes after the object is created',
      'Tag removal always restores objects already in Glacier Instantaneously to Standard without a restore',
      'Lifecycle only works on buckets without versioning and cannot coexist with tags',
    ]),
    explanation: 'Tag-based lifecycle rules re-evaluate eligibility; removing tags can prevent future transitions. Already transitioned objects are not magically restored by untagging.',
  }),
  q({
    id: 'DEA-020', domain: 'D2', topics: ['s3-lifecycle'], services: ['s3'],
    difficulty: 'medium', type: 'single',
    stem: 'A rule intends Standard → Standard-IA at 30 days → Glacier Flexible Retrieval at 45 days. Which statement reflects S3 transition constraints?',
    options: opts(['A'], [
      'Transition timelines must respect minimum days and supported transition paths between storage classes',
      'Any storage class can transition to any other class after one day with no restrictions',
      'Lifecycle transitions require AWS Glue crawlers to rewrite objects',
      'Objects smaller than 128 KB always transition faster than larger objects by rule',
    ]),
    explanation: 'S3 enforces minimum ages and valid transition graphs between classes. Not every hop is unrestricted.',
  }),
  q({
    id: 'DEA-021', domain: 'D2', topics: ['redshift-dist'], services: ['redshift'],
    difficulty: 'medium', type: 'single',
    stem: 'A 40-row region_lookup dimension is joined to large KEY-distributed facts. Which distribution style keeps the join local on every node without redistributing the dimension?',
    options: opts(['A'], [
      'ALL distribution for region_lookup',
      'EVEN for region_lookup and KEY on a low-cardinality column for facts',
      'AUTO only with no further thought when the table is tiny and joined everywhere',
      'Disabling compression encodings',
    ]),
    explanation: 'ALL copies small dimensions to every node so joins to large facts avoid redistributing the dimension.',
  }),
  q({
    id: 'DEA-022', domain: 'D2', topics: ['lineage'], services: ['sagemaker'],
    difficulty: 'easy', type: 'single',
    stem: 'Auditors need to know which training dataset and preprocessing job produced a model on a SageMaker endpoint. Which capability is purpose-built for this traceability?',
    options: opts(['A'], [
      'Amazon SageMaker ML Lineage Tracking (and related catalog/lineage features)',
      'Amazon SQS dead-letter queues',
      'Amazon Route 53 health checks',
      'AWS Snowball Edge device manifests alone',
    ]),
    explanation: 'SageMaker lineage tracking records relationships among data, jobs, and models.',
  }),
  q({
    id: 'DEA-023', domain: 'D2', topics: ['athena-vs-redshift'], services: ['athena', 'redshift', 's3'],
    difficulty: 'medium', type: 'single',
    stem: 'Analysts need infrequent ad-hoc SQL over CSV/JSON in S3 with minimal ongoing cost and no cluster to manage. Which approach is most cost-effective?',
    options: opts(['A'], [
      'Catalog with Glue crawler and query via Athena (optionally with workgroup limits)',
      'Always load into a provisioned Redshift cluster first for every ad-hoc question',
      'Duplicate all files into Amazon RDS MySQL daily',
      'Use only QuickSight SPICE with no SQL access',
    ]),
    explanation: 'Athena is serverless SQL on S3 and fits sporadic ad-hoc analysis. Provisioned warehouses add steady cost.',
  }),
  q({
    id: 'DEA-024', domain: 'D2', topics: ['lake-formation'], services: ['lake-formation', 's3', 'glue'],
    difficulty: 'medium', type: 'single',
    stem: 'Multiple departments share an S3 data lake and need least-privilege access to different subsets with low operational overhead. Which design fits best?',
    options: opts(['A'], [
      'AWS Lake Formation with LF-Tags / tag-based access control on Data Catalog resources',
      'A single shared IAM user access key distributed to every analyst',
      'Public bucket ACLs for convenience',
      'Copying the entire lake into per-analyst laptops nightly',
    ]),
    explanation: 'Lake Formation TBAC is purpose-built for fine-grained lake permissions with less policy sprawl than path-only IAM at scale.',
  }),
  // D3
  q({
    id: 'DEA-025', domain: 'D3', topics: ['scheduling'], services: ['eventbridge', 'glue'],
    difficulty: 'medium', type: 'single',
    stem: 'Hundreds of customer-specific Glue jobs must start at 2 AM in each customer’s time zone with varying payloads as customers are added. Which approach scales best?',
    options: opts(['A'], [
      'Manage per-customer EventBridge Scheduler schedules (or equivalent schedule resources) driven by customer config data',
      'One global cron that ignores time zones',
      'Manual starts by an on-call engineer for each customer',
      'Embedding wall-clock sleeps inside Glue Spark drivers for each customer',
    ]),
    explanation: 'EventBridge Scheduler scales to many one-off schedules with timezone support better than manual or single global cron approaches.',
  }),
  q({
    id: 'DEA-026', domain: 'D3', topics: ['monitoring'], services: ['glue', 'eventbridge', 'lambda'],
    difficulty: 'medium', type: 'multi',
    stem: 'A Lambda must run when any Glue job in the account enters FAILED, without polling. Which two elements are part of a sound design?',
    options: opts(['A', 'B'], [
      'Capture Glue job state-change events via EventBridge',
      'Set the Lambda as the EventBridge rule target filtered to FAILED',
      'Run a Lambda every second calling GetJobRuns for all jobs',
      'Disable CloudWatch metrics for Glue to reduce noise',
      'Require SSH into Glue’s underlying hosts',
    ]),
    explanation: 'EventBridge can route Glue job state changes to Lambda. Polling and host access are unnecessary and fragile.',
  }),
  q({
    id: 'DEA-027', domain: 'D3', topics: ['athena', 'analysis'], services: ['athena', 's3'],
    difficulty: 'easy', type: 'single',
    stem: 'An engineer needs a one-hour ad-hoc distinct-count query on Parquet in S3 without provisioning clusters. Which service fits best?',
    options: opts(['A'], [
      'Amazon Athena',
      'Amazon Redshift provisioned cluster created for one query then deleted mid-hour without automation',
      'Amazon EC2 with a manual Hadoop install for a single COUNT DISTINCT',
      'AWS Budgets',
    ]),
    explanation: 'Athena provides serverless SQL on S3 for ad-hoc analysis.',
  }),
  q({
    id: 'DEA-028', domain: 'D3', topics: ['athena-spark', 'emr'], services: ['athena', 'emr'],
    difficulty: 'medium', type: 'single',
    stem: 'Exploratory Spark analysis is bursty a few hours per week. Which factor most favors Athena Spark notebooks over a long-running EMR cluster?',
    options: opts(['A'], [
      'Serverless on-demand compute that avoids paying for idle cluster capacity',
      'Need for persistent HDFS with custom bootstrap AMI deep customization',
      'Requirement to pin exact EC2 instance families for years',
      'Need for OS-level SSH into every executor host daily',
    ]),
    explanation: 'Athena Spark notebooks suit intermittent exploration without idle cluster cost.',
  }),
  q({
    id: 'DEA-029', domain: 'D3', topics: ['logging', 'search'], services: ['opensearch', 's3'],
    difficulty: 'medium', type: 'single',
    stem: 'Terabytes of microservice logs need full-text search, dashboards, and cost-effective long-term retention. Which approach is most appropriate?',
    options: opts(['A'], [
      'Hot searchable store such as OpenSearch for recent/queryable logs plus durable cheap storage (for example S3) for long-term retention tiers',
      'Only print logs to application stdout with no aggregation',
      'Store all logs exclusively in DynamoDB strongly consistent items forever',
      'Email each log line via SES',
    ]),
    explanation: 'Search engines handle interactive full-text needs; object storage tiers handle cheap long retention.',
  }),
  q({
    id: 'DEA-030', domain: 'D3', topics: ['cloudwatch-logs'], services: ['cloudwatch'],
    difficulty: 'medium', type: 'multi',
    stem: 'A CloudWatch Logs Insights query must count errors by service field in 5-minute bins, sort descending, and limit to top 20. Which components belong in the query pipeline?',
    options: opts(['A', 'B'], [
      'stats count() by service, bin(5m)',
      'sort count desc | limit 20 (or equivalent sort/limit clauses)',
      'DELETE FROM log group',
      'VACUUM FULL on the log group',
      'CREATE INDEX CONCURRENTLY',
    ]),
    explanation: 'Logs Insights uses stats/bin aggregations with sort and limit. Relational DDL/maintenance statements do not apply.',
  }),
  q({
    id: 'DEA-031', domain: 'D3', topics: ['data-quality'], services: ['databrew'],
    difficulty: 'easy', type: 'single',
    stem: 'Five numeric DataBrew columns must each be ≤ 100. How can one rule cover all five columns?',
    options: opts(['A'], [
      'Define a column-level check once and apply it to multiple columns in the ruleset',
      'Create five separate Glue workflows that each drop the table',
      'Use Route 53 latency-based routing',
      'Enable S3 Transfer Acceleration on the DataBrew project',
    ]),
    explanation: 'DataBrew rulesets support applying the same check across multiple columns.',
  }),
  q({
    id: 'DEA-032', domain: 'D3', topics: ['spark-skew'], services: ['glue'],
    difficulty: 'hard', type: 'multi',
    stem: 'Glue Spark jobs sometimes suffer shuffle skew. The team wants Spark to detect and correct skewed partitions at runtime. Which statements are correct about adaptive execution-style capabilities?',
    options: opts(['A', 'B'], [
      'Adaptive Query Execution can coalesce/optimize skewed shuffle partitions based on runtime stats',
      'Enabling AQE-related settings can reduce manual salting for many skew cases',
      'AQE requires disabling the Glue Data Catalog permanently',
      'Skew is impossible on Parquet inputs',
      'The only fix is always converting to CSV',
    ]),
    explanation: 'AQE uses runtime statistics to mitigate skew; it does not require abandoning the catalog or changing to CSV.',
  }),
  q({
    id: 'DEA-033', domain: 'D3', topics: ['data-quality'], services: ['databrew', 's3'],
    difficulty: 'medium', type: 'single',
    stem: 'Training data in S3 needs data quality rules with minimal operational overhead before ML use. Which approach fits best?',
    options: opts(['A'], [
      'Glue DataBrew profile jobs with rulesets, optionally triggered via EventBridge on new data',
      'A perpetual EMR cluster running custom code for every object with no managed rules',
      'Neptune ML Gremlin scripts as the primary DQ engine for tabular training sets',
      'DynamoDB global tables to deduplicate S3 objects',
    ]),
    explanation: 'DataBrew provides managed profiling and rules with low ops overhead for tabular quality checks.',
  }),
  // D4
  q({
    id: 'DEA-034', domain: 'D4', topics: ['s3-access-points'], services: ['s3'],
    difficulty: 'medium', type: 'multi',
    stem: 'An S3 Access Point should accept requests only from a specific VPC. Which statements are correct?',
    options: opts(['A', 'B'], [
      'You can restrict an access point policy to a VPC source VPC condition',
      'Network origin controls on the access point help ensure requests come from the designated VPC',
      'Access points replace the need for any IAM authorization always',
      'VPC-only access points automatically make the bucket world-readable',
      'Access points can only be used with Glacier Deep Archive listings',
    ]),
    explanation: 'Access points support VPC-restricted policies/network origins while IAM still authorizes actions.',
  }),
  q({
    id: 'DEA-035', domain: 'D4', topics: ['managed-vs-unmanaged'], services: ['ec2', 'rds'],
    difficulty: 'easy', type: 'single',
    stem: 'Which option is best described as unmanaged relative to a managed database service, where the customer patches OS and database engine?',
    options: opts(['A'], [
      'Running a database on Amazon EC2',
      'Amazon RDS',
      'Amazon Aurora fully managed clusters',
      'Amazon DynamoDB',
    ]),
    explanation: 'EC2-hosted databases shift OS/engine patching to the customer versus RDS/Aurora/DynamoDB managed models.',
  }),
  q({
    id: 'DEA-036', domain: 'D4', topics: ['secrets'], services: ['secrets-manager', 'rds'],
    difficulty: 'medium', type: 'multi',
    stem: 'An EC2 ETL job hard-codes an RDS password. Security requires removing the hard-coded secret and rotating credentials without redeploying the app each rotation. Which two actions help?',
    options: opts(['A', 'B'], [
      'Store credentials in AWS Secrets Manager',
      'Enable rotation and have the application retrieve the secret at runtime',
      'Commit the password to a public GitHub gist for centralized access',
      'Disable SSL on RDS to simplify clients',
      'Share one IAM access key in Slack',
    ]),
    explanation: 'Secrets Manager plus runtime retrieval enables rotation without baking passwords into builds.',
  }),
  q({
    id: 'DEA-037', domain: 'D4', topics: ['abac'], services: ['iam', 's3', 'glue'],
    difficulty: 'hard', type: 'multi',
    stem: 'Engineers should gain access to S3/Glue resources tagged with the same project tag they are assigned, without rewriting policies for each project change. Which two elements implement ABAC?',
    options: opts(['A', 'B'], [
      'Tag principals (users/roles) with a project tag',
      'Write policies that compare resource tags to principal tags (aws:PrincipalTag / aws:ResourceTag)',
      'Disable all tagging on resources',
      'Use only inline wildcard Allow * on * for everyone',
      'Store passwords in object metadata instead of IAM',
    ]),
    explanation: 'ABAC matches principal tags to resource tags in IAM conditions.',
  }),
  q({
    id: 'DEA-038', domain: 'D4', topics: ['encryption'], services: ['redshift'],
    difficulty: 'medium', type: 'single',
    stem: 'On-premises ETL connects to Redshift over the internet. Auditors require encryption in transit and rejection of unencrypted attempts. What should be configured?',
    options: opts(['A'], [
      'Require TLS for connections (for example require_ssl / equivalent cluster parameter) so non-TLS clients fail',
      'Disable encryption to improve speed for auditors',
      'Use only HTTP cleartext JDBC',
      'Expose the cluster with a wide-open 0.0.0.0/0 security group and no TLS',
    ]),
    explanation: 'Requiring SSL/TLS on the Redshift cluster rejects unencrypted clients.',
  }),
  q({
    id: 'DEA-039', domain: 'D4', topics: ['kms'], services: ['kms', 'glue'],
    difficulty: 'hard', type: 'multi',
    stem: 'A short-lived Glue job must decrypt objects under a customer managed KMS key for one run without permanently widening key or role policies. Which approach fits?',
    options: opts(['A', 'B'], [
      'Use a KMS grant for temporary permission',
      'Rely on grant constraints/retirement so access is narrowly scoped and temporary',
      'Make the CMK publicly usable by anonymous principals',
      'Disable CloudTrail for the account during the job',
      'Embed the raw KMS key material in the Glue script',
    ]),
    explanation: 'KMS grants provide temporary, retiring permissions without permanent policy edits.',
  }),
  q({
    id: 'DEA-040', domain: 'D4', topics: ['audit', 'cloudtrail'], services: ['cloudtrail', 'athena', 's3', 'config'],
    difficulty: 'medium', type: 'single',
    stem: 'Organization CloudTrail already delivers logs to a centralized S3 bucket. Auditors need one-off SQL for DeleteBucket calls this quarter with minimal new infrastructure. What is the leanest approach?',
    options: opts(['A'], [
      'Query the existing CloudTrail S3 logs with Athena (and Glue catalog/partitions as needed)',
      'Rebuild a new streaming pipeline into a dedicated Redshift cluster solely for this quarter’s question',
      'Turn off CloudTrail and rely on memory of console clicks',
      'Use Amazon Polly to read log files aloud',
    ]),
    explanation: 'Athena on existing CloudTrail S3 data answers ad-hoc audit SQL with little new infrastructure. AWS Config is better for configuration timeline questions; here the need is API call search.',
  }),
]

for (const item of questions) {
  const correctCount = item.options.filter((o) => o.correct).length
  if (item.type === 'single' && correctCount !== 1) throw new Error(`${item.id} single needs 1 correct`)
  if (item.type === 'multi' && correctCount < 2) throw new Error(`${item.id} multi needs >=2 correct`)
  writeFileSync(join(outDir, `${item.id}.json`), JSON.stringify(item, null, 2) + '\n')
}

console.log(`Wrote ${questions.length} questions to ${outDir}`)
