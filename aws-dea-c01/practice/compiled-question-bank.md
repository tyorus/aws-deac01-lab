# DEA-C01 Compiled Local Question Bank

Generated: 2026-11-11T15:46:23.321309+00:00

Bank soal lokal (scrape + PDF) lengkap dengan **pembahasan**.
Bukan materi resmi AWS. Item original lab tetap di `content/questions/` (DEA-001…).

- Total entri: **356**
- Dengan pembahasan: **356**

---

## Q1. [examice] #1
*App id: `LOC-001`*

A data engineer is configuring an AWS Glue job to read data from an Amazon S3 bucket. The data engineer has set up the necessary AWS Glue connection details and an associated IAM role. However, when the data engineer attempts to run the AWS Glue job, the data engineer receives an error message that indicates that there are problems with the Amazon S3 VPC gateway endpoint. The data engineer must resolve the error and connect the AWS Glue job to the S3 bucket. Which solution will meet this requirement?

- A. Update the AWS Glue security group to allow inbound traffic from the Amazon S3 VPC gateway endpoint.
- B. Configure an S3 bucket policy to explicitly grant the AWS Glue job permissions to access the S3 bucket.
- C. Review the AWS Glue job code to ensure that the AWS Glue connection details include a fully qualified domain name.
- D. Verify that the VPC's route table includes inbound and outbound routes for the Amazon S3 VPC gateway endpoint.

**Answer:** D

**Explanation / Pembahasan:**

When dealing with VPC gateway endpoints for Amazon S3, it is crucial to verify that the VPC's route table includes the necessary routes for the gateway endpoint. This ensures that traffic intended for the S3 bucket is properly routed through the VPC endpoint instead of going out to the internet. Therefore, verifying and potentially updating the VPC's route table to include routes for the Amazon S3 VPC gateway endpoint is the correct solution to resolve the connection issue faced by the AWS Glue job.

Source URL: https://examice.com/exams/amazon/dea-c01#question-1

---

## Q2. [examice] #2
*App id: `LOC-002`*

A retail company has a customer data hub in an Amazon S3 bucket. Employees from many countries use the data hub to support company-wide analytics. A governance team must ensure that the company's data analysts can access data only for customers who are within the same country as the analysts. Which solution will meet these requirements with the LEAST operational effort?

- A. Create a separate table for each country's customer data. Provide access to each analyst based on the country that the analyst serves.
- B. Register the S3 bucket as a data lake location in AWS Lake Formation. Use the Lake Formation row-level security features to enforce the company's access policies.
- C. Move the data to AWS Regions that are close to the countries where the customers are. Provide access to each analyst based on the country that the analyst serves.
- D. Load the data into Amazon Redshift. Create a view for each country. Create separate IAM roles for each country to provide access to data from each country. Assign the appropriate roles to the analysts.

**Answer:** B

**Explanation / Pembahasan:**

The best solution for ensuring that data analysts can access data only for customers within the same country with the least operational effort is to register the S3 bucket as a data lake location in AWS Lake Formation. This service provides powerful data governance and fine-grained access control capabilities, including row-level security. By using Lake Formation’s row-level security features, you can easily define and enforce policies that restrict access to data based on specific conditions such as the country of the customer. This approach avoids the need for creating separate tables, views, or managing regional data migrations, thereby reducing operational overhead and complexity.

Source URL: https://examice.com/exams/amazon/dea-c01#question-2

---

## Q3. [examice] #3
*App id: `LOC-003`*

A media company wants to improve a system that recommends media content to customer based on user behavior and preferences. To improve the recommendation system, the company needs to incorporate insights from third-party datasets into the company's existing analytics platform. The company wants to minimize the effort and time required to incorporate third-party datasets. Which solution will meet these requirements with the LEAST operational overhead?

- A. Use API calls to access and integrate third-party datasets from AWS Data Exchange.
- B. Use API calls to access and integrate third-party datasets from AWS DataSync.
- C. Use Amazon Kinesis Data Streams to access and integrate third-party datasets from AWS CodeCommit repositories.
- D. Use Amazon Kinesis Data Streams to access and integrate third-party datasets from Amazon Elastic Container Registry (Amazon ECR).

**Answer:** A

**Explanation / Pembahasan:**

To minimize effort and time required to incorporate third-party datasets into an existing analytics platform, it is best to use API calls to access and integrate these datasets. AWS Data Exchange is designed specifically for discovering and subscribing to third-party datasets, providing direct and easy integration. This service effectively reduces operational overhead because it directly supports these types of integrations without the need for complex configurations or additional infrastructure. AWS DataSync, on the other hand, is primarily intended for data transfer between on-premises storage and AWS storage services, not for directly accessing third-party datasets through APIs.

Source URL: https://examice.com/exams/amazon/dea-c01#question-3

---

## Q4. [examtopics] #3
*App id: `LOC-004`*

Question #: 3 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A media company wants to improve a system that recommends media content to customer based on user behavior and preferences. To improve the recommendation system, the company needs to incorporate insights from third-party datasets into the company's existing analytics platform. The company wants to minimize the effort and time required to incorporate third-party datasets. Which solution will meet these requirements with the LEAST operational overhead?

- A. Use API calls to access and integrate third-party datasets from AWS Data Exchange.
- B. Use API calls to access and integrate third-party datasets from AWS DataSync.
- C. C. Use Amazon Kinesis Data Streams to access and integrate third-party datasets from AWS CodeCommit repositories.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use API calls to access and integrate third-party datasets from AWS Data Exchange..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use API calls to access and integrate third-party datasets from AWS DataSync.
- **C**: tidak memenuhi constraint utama soal — C. Use Amazon Kinesis Data Streams to access and integrate third-party datasets from AWS CodeCommit repositories.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131706-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-3-discussion/

---

## Q5. [examtopics] #4
*App id: `LOC-005`*

A financial company wants to implement a data mesh. The data mesh must support centralized data governance, data analysis, and data access control. The company has decided to use AWS Glue for data catalogs and extract, transform, and load (ETL) operations. Which combination of AWS services will implement a data mesh? (Choose two.)

- A. Use Amazon Aurora for data storage. Use an Amazon Redshift provisioned cluster for data analysis.
- B. Use Amazon S3 for data storage. Use Amazon Athena for data analysis.
- C. Use AWS Glue DataBrew for centralized data governance and access control.
- D. Use Amazon RDS for data storage. Use Amazon EMR for data analysis.
- E. Use AWS Lake Formation for centralized data governance and access control.

**Answer:** BE

**Pembahasan:** Jawaban yang tepat adalah **BE**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Use Amazon S3 for data storage. Use Amazon Athena for data analysis.
- **E**: Use AWS Lake Formation for centralized data governance and access control.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Aurora for data storage. Use an Amazon Redshift provisioned cluster for data analysis.
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue DataBrew for centralized data governance and access control.
- **D**: tidak memenuhi constraint utama soal — Use Amazon RDS for data storage. Use Amazon EMR for data analysis.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/view/1/#question-4

---

## Q6. [examice] #4
*App id: `LOC-006`*

A financial company wants to implement a data mesh. The data mesh must support centralized data governance, data analysis, and data access control. The company has decided to use AWS Glue for data catalogs and extract, transform, and load (ETL) operations. Which combination of AWS services will implement a data mesh?

- A. Use Amazon Aurora for data storage. Use an Amazon Redshift provisioned cluster for data analysis.
- B. Use Amazon S3 for data storage. Use Amazon Athena for data analysis.
- C. Use AWS Glue DataBrew for centralized data governance and access control.
- D. Use Amazon RDS for data storage. Use Amazon EMR for data analysis.
- E. Use AWS Lake Formation for centralized data governance and access control.

**Answer:** BE

**Explanation / Pembahasan:**

To implement a data mesh that supports centralized data governance, data analysis, and data access control, the most appropriate combination of AWS services would be Amazon S3 for data storage and Amazon Athena for data analysis, along with AWS Lake Formation for centralized data governance and access control. Amazon S3 provides a scalable and cost-effective storage solution that is well-suited for large datasets, while Amazon Athena allows for serverless querying of data stored in S3 using SQL, facilitating data exploration and analysis without the need for managing infrastructure. AWS Lake Formation enhances governance by allowing the establishment of fine-grained access controls and ensuring data quality and compliance, aligning with the need for centralized governance in a data mesh.

Source URL: https://examice.com/exams/amazon/dea-c01#question-4

---

## Q7. [examtopics] #4
*App id: `LOC-007`*

Question #: 4 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A financial company wants to implement a data mesh. The data mesh must support centralized data governance, data analysis, and data access control. The company has decided to use AWS Glue for data catalogs and extract, transform, and load (ETL) operations. Which combination of AWS services will implement a data mesh? (Choose two.)

- A. Use Amazon Aurora for data storage. Use an Amazon Redshift provisioned cluster for data analysis.
- B. Use Amazon S3 for data storage. Use Amazon Athena for data analysis.
- C. Use AWS Glue DataBrew for centralized data governance and access control.
- D. Use Amazon RDS for data storage. Use Amazon EMR for data analysis.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use Amazon S3 for data storage. Use Amazon Athena for data analysis..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Aurora for data storage. Use an Amazon Redshift provisioned cluster for data analysis.
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue DataBrew for centralized data governance and access control.
- **D**: tidak memenuhi constraint utama soal — Use Amazon RDS for data storage. Use Amazon EMR for data analysis.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131467-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-4-discussion/

---

## Q8. [examice] #5
*App id: `LOC-008`*

A data engineer maintains custom Python scripts that perform a data formatting process that many AWS Lambda functions use. When the data engineer needs to modify the Python scripts, the data engineer must manually update all the Lambda functions. The data engineer requires a less manual way to update the Lambda functions. Which solution will meet this requirement?

- A. Store a pointer to the custom Python scripts in the execution context object in a shared Amazon S3 bucket.
- B. Package the custom Python scripts into Lambda layers. Apply the Lambda layers to the Lambda functions.
- C. Store a pointer to the custom Python scripts in environment variables in a shared Amazon S3 bucket.
- D. Assign the same alias to each Lambda function. Call reach Lambda function by specifying the function's alias.

**Answer:** B

**Explanation / Pembahasan:**

Package the custom Python scripts into Lambda layers and apply these layers to the Lambda functions. Lambda layers allow for centralized management of shared code across multiple functions. Once the layer is updated with the new scripts, all the Lambda functions that use that layer will automatically inherit the updates, thus reducing manual efforts and ensuring consistency.

Source URL: https://examice.com/exams/amazon/dea-c01#question-5

---

## Q9. [examtopics] #6
*App id: `LOC-009`*

A company created an extract, transform, and load (ETL) data pipeline in AWS Glue. A data engineer must crawl a table that is in Microsoft SQL Server. The data engineer needs to extract, transform, and load the output of the crawl to an Amazon S3 bucket. The data engineer also must orchestrate the data pipeline. Which AWS service or feature will meet these requirements MOST cost-effectively?

- A. AWS Step Functions
- B. AWS Glue workflows
- C. AWS Glue Studio
- D. Amazon Managed Workflows for Apache Airflow (Amazon MWAA)

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: AWS Glue workflows.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — AWS Step Functions
- **C**: tidak memenuhi constraint utama soal — AWS Glue Studio
- **D**: tidak memenuhi constraint utama soal — Amazon Managed Workflows for Apache Airflow (Amazon MWAA)
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/view/1/#question-6

---

## Q10. [examtopics] #6
*App id: `LOC-010`*

Question #: 6 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company created an extract, transform, and load (ETL) data pipeline in AWS Glue. A data engineer must crawl a table that is in Microsoft SQL Server. The data engineer needs to extract, transform, and load the output of the crawl to an Amazon S3 bucket. The data engineer also must orchestrate the data pipeline. Which AWS service or feature will meet these requirements MOST cost-effectively?

- A. AWS Step Functions
- B. AWS Glue workflows
- C. AWS Glue Studio

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: AWS Glue workflows.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — AWS Step Functions
- **C**: tidak memenuhi constraint utama soal — AWS Glue Studio
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131469-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-6-discussion/

---

## Q11. [examtopics] #7
*App id: `LOC-011`*

A financial services company stores financial data in Amazon Redshift. A data engineer wants to run real-time queries on the financial data to support a web-based trading application. The data engineer wants to run the queries from within the trading application. Which solution will meet these requirements with the LEAST operational overhead?

- A. Establish WebSocket connections to Amazon Redshift.
- B. Use the Amazon Redshift Data API.
- C. Set up Java Database Connectivity (JDBC) connections to Amazon Redshift.
- D. Store frequently accessed data in Amazon S3. Use Amazon S3 Select to run the queries.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the Amazon Redshift Data API..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Establish WebSocket connections to Amazon Redshift.
- **C**: tidak memenuhi constraint utama soal — Set up Java Database Connectivity (JDBC) connections to Amazon Redshift.
- **D**: tidak memenuhi constraint utama soal — Store frequently accessed data in Amazon S3. Use Amazon S3 Select to run the queries.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/view/1/#question-7

---

## Q12. [examtopics] #7
*App id: `LOC-012`*

Question #: 7 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A financial services company stores financial data in Amazon Redshift. A data engineer wants to run real-time queries on the financial data to support a web-based trading application. The data engineer wants to run the queries from within the trading application. Which solution will meet these requirements with the LEAST operational overhead?

- A. Establish WebSocket connections to Amazon Redshift.
- B. Use the Amazon Redshift Data API.
- C. Set up Java Database Connectivity (JDBC) connections to Amazon Redshift.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the Amazon Redshift Data API..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Establish WebSocket connections to Amazon Redshift.
- **C**: tidak memenuhi constraint utama soal — Set up Java Database Connectivity (JDBC) connections to Amazon Redshift.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131470-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-7-discussion/

---

## Q13. [examtopics] #8
*App id: `LOC-013`*

A company uses Amazon Athena for one-time queries against data that is in Amazon S3. The company has several use cases. The company must implement permission controls to separate query processes and access to query history among users, teams, and applications that are in the same AWS account. Which solution will meet these requirements?

- A. Create an S3 bucket for each use case. Create an S3 bucket policy that grants permissions to appropriate individual IAM users. Apply the S3 bucket policy to the S3 bucket.
- B. Create an Athena workgroup for each use case. Apply tags to the workgroup. Create an IAM policy that uses the tags to apply appropriate permissions to the workgroup.
- C. Create an IAM role for each use case. Assign appropriate permissions to the role for each use case. Associate the role with Athena.
- D. Create an AWS Glue Data Catalog resource policy that grants permissions to appropriate individual IAM users for each use case. Apply the resource policy to the specific tables that Athena uses.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an Athena workgroup for each use case. Apply tags to the workgroup. Create an IAM policy that uses the tags to apply appropriate permissions to the workgroup..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an S3 bucket for each use case. Create an S3 bucket policy that grants permissions to appropriate individual IAM users. Apply the S3 bucket policy to ...
- **C**: tidak memenuhi constraint utama soal — Create an IAM role for each use case. Assign appropriate permissions to the role for each use case. Associate the role with Athena.
- **D**: tidak memenuhi constraint utama soal — Create an AWS Glue Data Catalog resource policy that grants permissions to appropriate individual IAM users for each use case. Apply the resource policy to t...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/view/1/#question-8

---

## Q14. [examtopics] #8
*App id: `LOC-014`*

Question #: 8 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses Amazon Athena for one-time queries against data that is in Amazon S3. The company has several use cases. The company must implement permission controls to separate query processes and access to query history among users, teams, and applications that are in the same AWS account. Which solution will meet these requirements?

- A. Create an S3 bucket for each use case. Create an S3 bucket policy that grants permissions to appropriate individual IAM users. Apply the S3 bucket policy to the S3 bucket.
- B. Create an Athena workgroup for each use case. Apply tags to the workgroup. Create an IAM policy that uses the tags to apply appropriate permissions to the workgroup.
- C. Create an IAM role for each use case. Assign appropriate permissions to the role for each use case. Associate the role with Athena.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an Athena workgroup for each use case. Apply tags to the workgroup. Create an IAM policy that uses the tags to apply appropriate permissions to the workgroup..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an S3 bucket for each use case. Create an S3 bucket policy that grants permissions to appropriate individual IAM users. Apply the S3 bucket policy to ...
- **C**: tidak memenuhi constraint utama soal — Create an IAM role for each use case. Assign appropriate permissions to the role for each use case. Associate the role with Athena.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131471-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-8-discussion/

---

## Q15. [examtopics] #9
*App id: `LOC-015`*

A data engineer needs to schedule a workflow that runs a set of AWS Glue jobs every day. The data engineer does not require the Glue jobs to run or finish at a specific time. Which solution will run the Glue jobs in the MOST cost-effective way?

- A. Choose the FLEX execution class in the Glue job properties.
- B. Use the Spot Instance type in Glue job properties.
- C. Choose the STANDARD execution class in the Glue job properties.
- D. Choose the latest version in the GlueVersion field in the Glue job properties.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Choose the FLEX execution class in the Glue job properties..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use the Spot Instance type in Glue job properties.
- **C**: tidak memenuhi constraint utama soal — Choose the STANDARD execution class in the Glue job properties.
- **D**: tidak memenuhi constraint utama soal — Choose the latest version in the GlueVersion field in the Glue job properties.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/view/1/#question-9

---

## Q16. [examtopics] #10
*App id: `LOC-016`*

A data engineer needs to create an AWS Lambda function that converts the format of data from .csv to Apache Parquet. The Lambda function must run only if a user uploads a .csv file to an Amazon S3 bucket. Which solution will meet these requirements with the LEAST operational overhead?

- A. Create an S3 event notification that has an event type of s3:ObjectCreated:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notification.
- B. Create an S3 event notification that has an event type of s3:ObjectTagging:* for objects that have a tag set to .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notification.
- C. Create an S3 event notification that has an event type of s3:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notification.
- D. Create an S3 event notification that has an event type of s3:ObjectCreated:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set an Amazon Simple Notification Service (Amazon SNS) topic as the destination for the event notification. Subscribe the Lambda function to the SNS topic.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create an S3 event notification that has an event type of s3:ObjectCreated:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notification..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create an S3 event notification that has an event type of s3:ObjectTagging:* for objects that have a tag set to .csv. Set the Amazon Resource Name (ARN) of t...
- **C**: tidak memenuhi constraint utama soal — Create an S3 event notification that has an event type of s3:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set the Amazo...
- **D**: tidak memenuhi constraint utama soal — Create an S3 event notification that has an event type of s3:ObjectCreated:*. Use a filter rule to generate notifications only when the suffix includes .csv....
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/view/1/#question-10

---

## Q17. [examtopics] #10
*App id: `LOC-017`*

Question #: 10 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs to create an AWS Lambda function that converts the format of data from .csv to Apache Parquet. The Lambda function must run only if a user uploads a .csv file to an Amazon S3 bucket. Which solution will meet these requirements with the LEAST operational overhead?

- A. Create an S3 event notification that has an event type of s3:ObjectCreated:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notification.
- B. Create an S3 event notification that has an event type of s3:ObjectTagging:* for objects that have a tag set to .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notification.
- C. Create an S3 event notification that has an event type of s3:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notification.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create an S3 event notification that has an event type of s3:ObjectCreated:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notification..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create an S3 event notification that has an event type of s3:ObjectTagging:* for objects that have a tag set to .csv. Set the Amazon Resource Name (ARN) of t...
- **C**: tidak memenuhi constraint utama soal — Create an S3 event notification that has an event type of s3:*. Use a filter rule to generate notifications only when the suffix includes .csv. Set the Amazo...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131472-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-10-discussion/

---

## Q18. [examtopics] #11
*App id: `LOC-018`*

Question #: 11 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs Amazon Athena queries to finish faster. The data engineer notices that all the files the Athena queries use are currently stored in uncompressed .csv format. The data engineer also notices that users perform most queries by selecting a specific column. Which solution will MOST speed up the Athena query performance?

- A. Change the data format from .csv to JSON format. Apply Snappy compression.
- B. Compress the .csv files by using Snappy compression.
- C. Change the data format from .csv to Apache Parquet. Apply Snappy compression.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Change the data format from .csv to Apache Parquet. Apply Snappy compression..
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Change the data format from .csv to JSON format. Apply Snappy compression.
- **B**: tidak memenuhi constraint utama soal — Compress the .csv files by using Snappy compression.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131473-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-11-discussion/

---

## Q19. [examtopics] #12
*App id: `LOC-019`*

Question #: 12 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A manufacturing company collects sensor data from its factory floor to monitor and enhance operational efficiency. The company uses Amazon Kinesis Data Streams to publish the data that the sensors collect to a data stream. Then Amazon Kinesis Data Firehose writes the data to an Amazon S3 bucket. The company needs to display a real-time view of operational efficiency on a large screen in the manufacturing facility. Which solution will meet these requirements with the LOWEST latency?

- A. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to process the sensor data. Use a connector for Apache Flink to write data to an Amazon Timestream database. Use the Timestream database as a source to create a Grafana dashboard.
- B. Configure the S3 bucket to send a notification to an AWS Lambda function when any new object is created. Use the Lambda function to publish the data to Amazon Aurora. Use Aurora as a source to create an Amazon QuickSight dashboard.
- C. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to process the sensor data. Create a new Data Firehose delivery stream to publish data directly to an Amazon Timestream database. Use the Timestream database as a source to create an Amazon QuickSight dashboard.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to process the sensor data. Use a connector for Apache Flink to write data to an Amazon Timestream database. Use the Timestream database as a source to create a Grafana dashboard..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Configure the S3 bucket to send a notification to an AWS Lambda function when any new object is created. Use the Lambda function to publish the data to Amazo...
- **C**: tidak memenuhi constraint utama soal — Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to process the sensor data. Create a new Data Firehose delive...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131474-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-12-discussion/

---

## Q20. [examtopics] #105
*App id: `LOC-020`*

Question #: 105 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer creates an AWS Lambda function that an Amazon EventBridge event will invoke. When the data engineer tries to invoke the Lambda function by using an EventBridge event, an AccessDeniedException message appears. How should the data engineer resolve the exception?

- A. Ensure that the trust policy of the Lambda function execution role allows EventBridge to assume the execution role.
- B. Ensure that both the IAM role that EventBridge uses and the Lambda function's resource-based policy have the necessary permissions.
- C. Ensure that the subnet where the Lambda function is deployed is configured to be a private subnet.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Ensure that both the IAM role that EventBridge uses and the Lambda function's resource-based policy have the necessary permissions..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Ensure that the trust policy of the Lambda function execution role allows EventBridge to assume the execution role.
- **C**: tidak memenuhi constraint utama soal — Ensure that the subnet where the Lambda function is deployed is configured to be a private subnet.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142578-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-105-discussion/

---

## Q21. [examtopics] #106
*App id: `LOC-021`*

Question #: 106 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses a data lake that is based on an Amazon S3 bucket. To comply with regulations, the company must apply two layers of server-side encryption to files that are uploaded to the S3 bucket. The company wants to use an AWS Lambda function to apply the necessary encryption. Which solution will meet these requirements?

- A. Use both server-side encryption with AWS KMS keys (SSE-KMS) and the Amazon S3 Encryption Client.
- B. Use dual-layer server-side encryption with AWS KMS keys (DSSE-KMS).
- C. Use server-side encryption with customer-provided keys (SSE-C) before files are uploaded.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use dual-layer server-side encryption with AWS KMS keys (DSSE-KMS)..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- KMS mengelola kunci enkripsi; pastikan grant/policy sesuai akses layanan.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use both server-side encryption with AWS KMS keys (SSE-KMS) and the Amazon S3 Encryption Client.
- **C**: tidak memenuhi constraint utama soal — Use server-side encryption with customer-provided keys (SSE-C) before files are uploaded.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142579-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-106-discussion/

---

## Q22. [examtopics] #107
*App id: `LOC-022`*

Question #: 107 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer notices that Amazon Athena queries are held in a queue before the queries run. How can the data engineer prevent the queries from queueing?

- A. Increase the query result limit.
- B. Configure provisioned capacity for an existing workgroup.
- C. Use federated queries.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Configure provisioned capacity for an existing workgroup..
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Increase the query result limit.
- **C**: tidak memenuhi constraint utama soal — Use federated queries.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142580-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-107-discussion/

---

## Q23. [examtopics] #125
*App id: `LOC-023`*

Question #: 125 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] An application consumes messages from an Amazon Simple Queue Service (Amazon SQS) queue. The application experiences occasional downtime. As a result of the downtime, messages within the queue expire and are deleted after 1 day. The message deletions cause data loss for the application. Which solutions will minimize data loss for the application? (Choose two.)

- A. Increase the message retention period
- B. Increase the visibility timeout.
- C. Attach a dead-letter queue (DLQ) to the SQS queue.
- D. Use a delay queue to delay message delivery

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Increase the message retention period.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Increase the visibility timeout.
- **C**: tidak memenuhi constraint utama soal — Attach a dead-letter queue (DLQ) to the SQS queue.
- **D**: tidak memenuhi constraint utama soal — Use a delay queue to delay message delivery
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145713-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-125-discussion/

---

## Q24. [examtopics] #126
*App id: `LOC-024`*

Question #: 126 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company is creating near real-time dashboards to visualize time series data. The company ingests data into Amazon Managed Streaming for Apache Kafka (Amazon MSK). A customized data pipeline consumes the data. The pipeline then writes data to Amazon Keyspaces (for Apache Cassandra), Amazon OpenSearch Service, and Apache Avro objects in Amazon S3. Which solution will make the data available for the data visualizations with the LEAST latency?

- A. The company ingests data into Amazon Managed Streaming for Apache Kafka (Amazon MSK). A customized data pipeline consumes the data. The pipeline then writes data to Amazon Keyspaces (for Apache Cassandra), Amazon OpenSearch Service, and Apache Avro objects in Amazon S3. Which solution will make the data available for the data visualizations with the LEAST latency? A. Create OpenSearch Dashboards by using the data from OpenSearch Service.
- B. Use Amazon Athena with an Apache Hive metastore to query the Avro objects in Amazon S3. Use Amazon Managed Grafana to connect to Athena and to create the dashboards.
- C. Use Amazon Athena to query the data from the Avro objects in Amazon S3. Configure Amazon Keyspaces as the data catalog. Connect Amazon QuickSight to Athena to create the dashboards.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use Amazon Athena with an Apache Hive metastore to query the Avro objects in Amazon S3. Use Amazon Managed Grafana to connect to Athena and to create the dashboards..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The company ingests data into Amazon Managed Streaming for Apache Kafka (Amazon MSK). A customized data pipeline consumes the data. The pipeline then writes ...
- **C**: tidak memenuhi constraint utama soal — Use Amazon Athena to query the data from the Avro objects in Amazon S3. Configure Amazon Keyspaces as the data catalog. Connect Amazon QuickSight to Athena t...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145714-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-126-discussion/

---

## Q25. [examtopics] #137
*App id: `LOC-025`*

Question #: 137 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer has implemented data quality rules in 1,000 AWS Glue Data Catalog tables. Because of a recent change in business requirements, the data engineer must edit the data quality rules. How should the data engineer meet this requirement with the LEAST operational overhead?

- A. Create a pipeline in AWS Glue ETL to edit the rules for each of the 1,000 Data Catalog tables. Use an AWS Lambda function to call the corresponding AWS Glue job for each Data Catalog table.
- B. Create an AWS Lambda function that makes an API call to AWS Glue Data Quality to make the edits.
- C. Create an Amazon EMR cluster. Run a pipeline on Amazon EMR that edits the rules for each Data Catalog table. Use an AWS Lambda function to run the EMR pipeline.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an AWS Lambda function that makes an API call to AWS Glue Data Quality to make the edits..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a pipeline in AWS Glue ETL to edit the rules for each of the 1,000 Data Catalog tables. Use an AWS Lambda function to call the corresponding AWS Glue ...
- **C**: tidak memenuhi constraint utama soal — Create an Amazon EMR cluster. Run a pipeline on Amazon EMR that edits the rules for each Data Catalog table. Use an AWS Lambda function to run the EMR pipeline.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145726-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-137-discussion/

---

## Q26. [examtopics] #140
*App id: `LOC-026`*

Question #: 140 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company receives test results from testing facilities that are located around the world. The company stores the test results in millions of 1 KB JSON files in an Amazon S3 bucket. A data engineer needs to process the files, convert them into Apache Parquet format, and load them into Amazon Redshift tables. The data engineer uses AWS Glue to process the files, AWS Step Functions to orchestrate the processes, and Amazon EventBridge to schedule jobs. The company recently added more testing facilities. The time required to process files is increasing. The data engineer must reduce the data processing time. Which solution will MOST reduce the data processing time?

- A. Use AWS Lambda to group the raw input files into larger files. Write the larger files back to Amazon S3. Use AWS Glue to process the files. Load the files into the Amazon Redshift tables.
- B. Use the AWS Glue dynamic frame file-grouping option to ingest the raw input files. Process the files. Load the files into the Amazon Redshift tables.
- C. Use the Amazon Redshift COPY command to move the raw input files from Amazon S3 directly into the Amazon Redshift tables. Process the files in Amazon Redshift.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the AWS Glue dynamic frame file-grouping option to ingest the raw input files. Process the files. Load the files into the Amazon Redshift tables..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Lambda to group the raw input files into larger files. Write the larger files back to Amazon S3. Use AWS Glue to process the files. Load the files in...
- **C**: tidak memenuhi constraint utama soal — Use the Amazon Redshift COPY command to move the raw input files from Amazon S3 directly into the Amazon Redshift tables. Process the files in Amazon Redshift.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145729-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-140-discussion/

---

## Q27. [examtopics] #158
*App id: `LOC-027`*

Question #: 158 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company has a data lake in Amazon S3. The company uses AWS Glue to catalog data and AWS Glue Studio to implement data extract, transform, and load (ETL) pipelines. The company needs to ensure that data quality issues are checked every time the pipelines run. A data engineer must enhance the existing pipelines to evaluate data quality rules based on predefined thresholds. Which solution will meet these requirements with the LEAST implementation effort?

- A. Add a new transform that is defined by a SQL query to each Glue ETL job. Use the SQL query to implement a ruleset that includes the data quality rules that need to be evaluated.
- B. Use the SQL query to implement a ruleset that includes the data quality rules that need to be evaluated. B. Add a new Evaluate Data Quality transform to each Glue ETL job. Use Data Quality Definition Language (DQDL) to implement a ruleset that includes the data quality rules that need to be evaluated.
- C. Add a new custom transform to each Glue ETL job. Use the PyDeequ library to implement a ruleset that includes the data quality rules that need to be evaluated.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the SQL query to implement a ruleset that includes the data quality rules that need to be evaluated. B. Add a new Evaluate Data Quality transform to each Glue ETL job. Use Data Quality Definition Language (DQDL) to implement a ruleset that includes the data quality rules that need to be evaluated..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Add a new transform that is defined by a SQL query to each Glue ETL job. Use the SQL query to implement a ruleset that includes the data quality rules that n...
- **C**: tidak memenuhi constraint utama soal — Add a new custom transform to each Glue ETL job. Use the PyDeequ library to implement a ruleset that includes the data quality rules that need to be evaluated.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151925-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-158-discussion/

---

## Q28. [examtopics] #159
*App id: `LOC-028`*

Question #: 159 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company has an application that uses a microservice architecture. The company hosts the application on an Amazon Elastic Kubernetes Services (Amazon EKS) cluster. The company wants to set up a robust monitoring system for the application. The company needs to analyze the logs from the EKS cluster and the application. The company needs to correlate the cluster's logs with the application's traces to identify points of failure in the whole application request flow. Which combination of steps will meet these requirements with the LEAST development effort? (Choose two.)

- A. Use FluentBit to collect logs. Use OpenTelemetry to collect traces.
- B. Use Amazon CloudWatch to collect logs. Use Amazon Kinesis to collect traces.
- C. Use Amazon CloudWatch to collect logs. Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to collect traces.
- D. Use Amazon OpenSearch to correlate the logs and traces.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use FluentBit to collect logs. Use OpenTelemetry to collect traces..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use Amazon CloudWatch to collect logs. Use Amazon Kinesis to collect traces.
- **C**: tidak memenuhi constraint utama soal — Use Amazon CloudWatch to collect logs. Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to collect traces.
- **D**: tidak memenuhi constraint utama soal — Use Amazon OpenSearch to correlate the logs and traces.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151926-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-159-discussion/

---

## Q29. [examtopics] #160
*App id: `LOC-029`*

Question #: 160 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company has a gaming application that stores data in Amazon DynamoDB tables. A data engineer needs to ingest the game data into an Amazon OpenSearch Service cluster. Data updates must occur in near real time. Which solution will meet these requirements?

- A. Use AWS Step Functions to periodically export data from the Amazon DynamoDB tables to an Amazon S3 bucket. Use an AWS Lambda function to load the data into Amazon OpenSearch Service.
- B. Configure an AWS Glue job to have a source of Amazon DynamoDB and a destination of Amazon OpenSearch Service to transfer data in near real time.
- C. Use Amazon DynamoDB Streams to capture table changes. Use an AWS Lambda function to process and update the data in Amazon OpenSearch Service.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon DynamoDB Streams to capture table changes. Use an AWS Lambda function to process and update the data in Amazon OpenSearch Service..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Step Functions to periodically export data from the Amazon DynamoDB tables to an Amazon S3 bucket. Use an AWS Lambda function to load the data into A...
- **B**: tidak memenuhi constraint utama soal — Configure an AWS Glue job to have a source of Amazon DynamoDB and a destination of Amazon OpenSearch Service to transfer data in near real time.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151927-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-160-discussion/

---

## Q30. [examtopics] #205
*App id: `LOC-030`*

Question #: 205 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer uses Amazon Kinesis Data Streams to ingest and process records that contain user behavior data from an application every day. The data engineer notices that the data stream is experiencing throttling because hot shards receive much more data than other shards in the data stream. How should the data engineer resolve the throttling issue?

- A. Use a random partition key to distribute the ingested records.
- B. Increase the number of shards in the data stream. Distribute the records across the shards.
- C. Limit the number of records that are sent each second by the producer to match the capacity of the stream.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Increase the number of shards in the data stream. Distribute the records across the shards..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use a random partition key to distribute the ingested records.
- **C**: tidak memenuhi constraint utama soal — Limit the number of records that are sent each second by the producer to match the capacity of the stream.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/156778-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-205-discussion/

---

## Q31. [examtopics] #207
*App id: `LOC-031`*

Question #: 207 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company has an application that uses an Amazon API Gateway REST API and an AWS Lambda function to retrieve data from an Amazon DynamoDB instance. Users recently reported intermittent high latency in the application's response times. A data engineer finds that the Lambda function experiences frequent throttling when the company's other Lambda functions experience increased invocations. The company wants to ensure the API's Lambda function operate without being affected by other Lambda functions. Which solution will meet this requirement MOST cost-effectively?

- A. Increase the number of read capacity unit (RCU) in DynamoDB.
- B. B. Configure provisioned concurrency for the Lambda function.
- C. Configure reserved concurrency for the Lambda function.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Configure reserved concurrency for the Lambda function..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Increase the number of read capacity unit (RCU) in DynamoDB.
- **B**: tidak memenuhi constraint utama soal — B. Configure provisioned concurrency for the Lambda function.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/156780-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-207-discussion/

---

## Q32. [examtopics] #211
*App id: `LOC-032`*

Question #: 211 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs to optimize the performance of a data pipeline that handles retail orders. Data about the orders is ingested daily into an Amazon S3 bucket. The data engineer runs queries once each week to extract metrics from the orders data based the order date for multiple date ranges. The data engineer needs an optimization solution that ensures the query performance will not degrade when the volume of data increases. Which solution will meet this requirement MOST cost-effectively?

- A. Partition the data based on order date. Use Amazon Athena to query the data.
- B. Partition the data based on order date. Use Amazon Redshift to query the data.
- C. Partition the data based on load date. Use Amazon EMR to query the data.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Partition the data based on order date. Use Amazon Athena to query the data..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Partition the data based on order date. Use Amazon Redshift to query the data.
- **C**: tidak memenuhi constraint utama soal — Partition the data based on load date. Use Amazon EMR to query the data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305563-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-211-discussion/

---

## Q33. [examtopics] #221
*App id: `LOC-033`*

Question #: 221 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company receives marketing campaign data from a vendor. The company ingests the data into an Amazon S3 bucket every 40 to 60 minutes. The data is in CSV format. File sizes are between 100 KB and 300 KB. A data engineer needs to set-up an extract, transform, and load (ETL) pipeline to upload the content of each file to Amazon Redshift. Which solution will meet these requirements with the LEAST operational overhead?

- A. Create an AWS Lambda function that connects to Amazon Redshift and runs a COPY command. Use Amazon EventBridge to invoke the Lambda function based on an Amazon S3 upload trigger.
- B. A data engineer needs to set-up an extract, transform, and load (ETL) pipeline to upload the content of each file to Amazon Redshift. Which solution will meet these requirements with the LEAST operational overhead? A. Create an AWS Lambda function that connects to Amazon Redshift and runs a COPY command. Use Amazon EventBridge to invoke the Lambda function based on an Amazon S3 upload trigger. B. Create an Amazon Data Firehose stream. Configure the stream to use an AWS Lambda function as a source to pull data from the S3 bucket. Set Amazon Redshift as the destination.
- C. Use Amazon Redshift Spectrum to query the S3 bucket. Configure an AWS Glue Crawler for the S3 bucket to update metadata in an AWS Glue Data Catalog.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create an AWS Lambda function that connects to Amazon Redshift and runs a COPY command. Use Amazon EventBridge to invoke the Lambda function based on an Amazon S3 upload trigger..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — A data engineer needs to set-up an extract, transform, and load (ETL) pipeline to upload the content of each file to Amazon Redshift. Which solution will mee...
- **C**: tidak memenuhi constraint utama soal — Use Amazon Redshift Spectrum to query the S3 bucket. Configure an AWS Glue Crawler for the S3 bucket to update metadata in an AWS Glue Data Catalog.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305568-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-221-discussion/

---

## Q34. [examtopics] #223
*App id: `LOC-034`*

Question #: 223 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer develops an AWS Glue Apache Spark ETL job to perform transformations on a dataset. When the data engineer runs the job, the job returns an error that reads, “No space left on device.” The data engineer needs to identify the source of the error and provide a solution. Which combinations of steps will meet this requirement MOST cost-effectively? (Choose two.)

- A. Scale out the workers vertically to address data skewness.
- B. Use the Spark UI and AWS Glue metrics to monitor data skew in the Spark executors.
- C. Scale out the number of workers horizontally to address data skewness.
- D. Enable the --write-shuffie-files-to-s3 job parameter. Use the salting technique.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the Spark UI and AWS Glue metrics to monitor data skew in the Spark executors..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Scale out the workers vertically to address data skewness.
- **C**: tidak memenuhi constraint utama soal — Scale out the number of workers horizontally to address data skewness.
- **D**: tidak memenuhi constraint utama soal — Enable the --write-shuffie-files-to-s3 job parameter. Use the salting technique.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305570-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-223-discussion/

---

## Q35. [examtopics] #226
*App id: `LOC-035`*

Question #: 226 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company is setting up a data pipeline in AWS. The pipeline extracts client data from Amazon S3 buckets, performs quality checks, and transforms the data. The pipeline stores the processed data in a relational database. The company will use the processed data for future queries. Which solution will meet these requirements MOST cost-effectively?

- A. The pipeline stores the processed data in a relational database. The company will use the processed data for future queries. Which solution will meet these requirements MOST cost-effectively? A. Use AWS Glue ETL to extract the data from the S3 buckets and perform the transformations. Use AWS Glue Data Quality to enforce suggested quality rules. Load the data and the quality check results into an Amazon RDS for MySQL instance.
- B. Use AWS Glue Studio to extract the data from the S3 buckets. Use AWS Glue DataBrew to perform the transformations and quality checks. Load the processed data into an Amazon RDS for MySQL instance. Load the quality check results into a new S3 bucket.
- C. Use AWS Glue ETL to extract the data from the S3 buckets and perform the transformations. Use AWS Glue DataBrew to perform quality checks. Load the processed data and the quality check results into a new S3 bucket.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: The pipeline stores the processed data in a relational database. The company will use the processed data for future queries. Which solution will meet these requirements MOST cost-effectively? A. Use AWS Glue ETL to extract the data from the S3 buckets and perform the transformations. Use AWS Glue Data Quality to enforce suggested quality rules. Load the data and the quality check results into an Amazon RDS for MySQL instance..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue Studio to extract the data from the S3 buckets. Use AWS Glue DataBrew to perform the transformations and quality checks. Load the processed data...
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue ETL to extract the data from the S3 buckets and perform the transformations. Use AWS Glue DataBrew to perform quality checks. Load the processed...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305571-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-226-discussion/

---

## Q36. [examtopics] #227
*App id: `LOC-036`*

Question #: 227 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses Amazon Redshift as a data warehouse solution. One of the datasets that the company stores in Amazon Redshift contains data for a vendor. Recently, the vendor asked the company to transfer the vendor’s data into the vendor’s Amazon S3 bucket once each week. Which solution will meet this requirement?

- A. Create an AWS Lambda function to connect to the Redshift data warehouse. Configure the Lambda function to use the Redshift COPY command to copy the required data to the vendor’s S3 bucket on a schedule.
- B. Create an AWS Glue job to connect to the Redshift data warehouse. Configure the AWS Glue job to use the Redshift UNLOAD command to load the required data to the vendor’s S3 bucket on a schedule.
- C. Use the Amazon Redshift data sharing feature. Set the vendor’s S3 bucket as the destination. Configure the source to be as a custom SQL query that selects the required data.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an AWS Glue job to connect to the Redshift data warehouse. Configure the AWS Glue job to use the Redshift UNLOAD command to load the required data to the vendor’s S3 bucket on a schedule..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an AWS Lambda function to connect to the Redshift data warehouse. Configure the Lambda function to use the Redshift COPY command to copy the required ...
- **C**: tidak memenuhi constraint utama soal — Use the Amazon Redshift data sharing feature. Set the vendor’s S3 bucket as the destination. Configure the source to be as a custom SQL query that selects th...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305573-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-227-discussion/

---

## Q37. [examtopics] #228
*App id: `LOC-037`*

Question #: 228 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses an Amazon Redshift cluster as a data warehouse that is shared across two departments. To comply with a security policy, each department must have unique access permissions. Department A must have access to tables and views for Department

- A. Department B must have access to tables and views for Department
- B. The company often runs SQL queries that use objects from both departments in one query. Which solution will meet these requirements with the LEAST operational overhead? A. Group tables and views for each department into dedicated schemas. Manage permissions at the schema level. B. Group tables and views for each department into dedicated databases. Manage permissions at the database level.
- C. Update the names of the tables and views to follow a naming convention that contains the department names. Manage permissions based on the new naming convention.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Department B must have access to tables and views for Department.
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — The company often runs SQL queries that use objects from both departments in one query. Which solution will meet these requirements with the LEAST operationa...
- **C**: tidak memenuhi constraint utama soal — Update the names of the tables and views to follow a naming convention that contains the department names. Manage permissions based on the new naming convent...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305574-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-228-discussion/

---

## Q38. [examtopics] #230
*App id: `LOC-038`*

Question #: 230 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A sales company uses AWS Glue ETL to collect, process, and ingest data into an Amazon S3 bucket. The AWS Glue pipeline creates a new file in the S3 bucket every hour. File sizes vary from 200 KB to 300 KB. The company wants to build a sales prediction model by using data from the previous 5 years. The historic data includes 44,000 files. The company builds a second AWS Glue ETL pipeline by using the smallest worker type. The second pipeline retrieves the historic files from the S3 bucket and processes the files for downstream analysis. The company notices significant performance issues with the second ETL pipeline. The company needs to improve the performance of the second pipeline. Which solution will meet this requirement MOST cost-effectively?

- A. Use a larger worker type.
- B. The company wants to build a sales prediction model by using data from the previous 5 years. The historic data includes 44,000 files. The company builds a second AWS Glue ETL pipeline by using the smallest worker type. The second pipeline retrieves the historic files from the S3 bucket and processes the files for downstream analysis. The company notices significant performance issues with the second ETL pipeline. The company needs to improve the performance of the second pipeline. Which solution will meet this requirement MOST cost-effectively? A. Use a larger worker type. B. Increase the number of workers in the AWS Glue ETL jobs.
- C. Use the AWS Glue DynamicFrame grouping option.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use the AWS Glue DynamicFrame grouping option..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use a larger worker type.
- **B**: tidak memenuhi constraint utama soal — The company wants to build a sales prediction model by using data from the previous 5 years. The historic data includes 44,000 files. The company builds a se...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305575-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-230-discussion/

---

## Q39. [examtopics] #231
*App id: `LOC-039`*

Question #: 231 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company wants to combine data from multiple software as a service (SaaS) applications for analysis. A data engineering team needs to use Amazon QuickSight to perform the analysis and build dashboards. A data engineer needs to extract the data from the SaaS applications and make the data available for QuickSight queries. Which solution will meet these requirements in the MOST operationally efficient way?

- A. Create AWS Lambda functions that call the required APIs to extract the data from the applications. Store the data in an Amazon S3 bucket. Use AWS Glue to catalog the data in the S3 bucket. Create a data source and a dataset in QuickSight.
- B. Use AWS Lambda functions as Amazon Athena data source connectors to run federated queries against the SaaS applications. Create an Athena data source and a dataset in QuickSight.
- C. Use Amazon AppFlow to create a flow for each SaaS application. Set an Amazon S3 bucket as the destination. Schedule the flows to extract the data to the bucket. Use AWS Glue to catalog the data in the S3 bucket. Create a data source and a dataset in QuickSight.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon AppFlow to create a flow for each SaaS application. Set an Amazon S3 bucket as the destination. Schedule the flows to extract the data to the bucket. Use AWS Glue to catalog the data in the S3 bucket. Create a data source and a dataset in QuickSight..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create AWS Lambda functions that call the required APIs to extract the data from the applications. Store the data in an Amazon S3 bucket. Use AWS Glue to cat...
- **B**: tidak memenuhi constraint utama soal — Use AWS Lambda functions as Amazon Athena data source connectors to run federated queries against the SaaS applications. Create an Athena data source and a d...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305576-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-231-discussion/

---

## Q40. [examtopics] #232
*App id: `LOC-040`*

Question #: 232 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company runs multiple applications on AWS. The company configured each application to output logs. The company wants to query and visualize the application logs in near real time. Which solution will meet these requirements?

- A. Configure the applications to output logs to Amazon CloudWatch Logs log groups. Create an Amazon S3 bucket. Create an AWS Lambda function that runs on a schedule to export the required log groups to the S3 bucket. Use Amazon Athena to query the log data in the S3 bucket.
- B. Create an Amazon OpenSearch Service domain. Configure the applications to output logs to Amazon CloudWatch Logs log groups. Create an OpenSearch Service subscription filter for each log group to stream the data to OpenSearch. Create the required queries and dashboards in OpenSearch Service to analyze and visualize the data.
- C. Configure the applications to output logs to Amazon CloudWatch Logs log groups. Use CloudWatch log anomaly detection to query and visualize the log data.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an Amazon OpenSearch Service domain. Configure the applications to output logs to Amazon CloudWatch Logs log groups. Create an OpenSearch Service subscription filter for each log group to stream the data to OpenSearch. Create the required queries and dashboards in OpenSearch Service to analyze and visualize the data..
Konteks layanan terkait:
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Configure the applications to output logs to Amazon CloudWatch Logs log groups. Create an Amazon S3 bucket. Create an AWS Lambda function that runs on a sche...
- **C**: tidak memenuhi constraint utama soal — Configure the applications to output logs to Amazon CloudWatch Logs log groups. Use CloudWatch log anomaly detection to query and visualize the log data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305577-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-232-discussion/

---

## Q41. [examtopics] #233
*App id: `LOC-041`*

Question #: 233 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] An ecommerce company processes millions of orders each day. The company uses AWS Glue ETL to collect data from multiple sources, clean the data, and store the data in an Amazon S3 bucket in CSV format by using the S3 Standard storage class. The company uses the stored data to conduct daily analysis. The company wants to optimize costs for data storage and retrieval. Which solution will meet this requirement?

- A. Transition the data to Amazon S3 Glacier Flexible Retrieval.
- B. Transition the data from Amazon S3 to an Amazon Aurora cluster.
- C. Configure AWS Glue ETL to transform the incoming data to Apache Parquet format.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Configure AWS Glue ETL to transform the incoming data to Apache Parquet format..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Transition the data to Amazon S3 Glacier Flexible Retrieval.
- **B**: tidak memenuhi constraint utama soal — Transition the data from Amazon S3 to an Amazon Aurora cluster.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305578-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-233-discussion/

---

## Q42. [examtopics] #234
*App id: `LOC-042`*

Question #: 234 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer is optimizing query performance in Amazon Athena notebooks that use Apache Spark to analyze large datasets that are stored in Amazon S3. The data is partitioned. An AWS Glue crawler updates the partitions. The data engineer wants to minimize the amount of data that is scanned to improve efficiency of Athena queries. Which solution will meet these requirements?

- A. Apply partition filters in the queries.
- B. Increase the frequency of AWS Glue crawler invocations to update the data catalog more often.
- C. Organize the data that is in Amazon S3 by using a nested directory structure.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Apply partition filters in the queries..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Increase the frequency of AWS Glue crawler invocations to update the data catalog more often.
- **C**: tidak memenuhi constraint utama soal — Organize the data that is in Amazon S3 by using a nested directory structure.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305579-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-234-discussion/

---

## Q43. [examtopics] #235
*App id: `LOC-043`*

Question #: 235 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company manages an Amazon Redshift data warehouse. The data warehouse is in a public subnet inside a custom VPC. A security group allows only traffic from within itself. An ACL is open to all traffic. The company wants to generate several visualizations in Amazon QuickSight for an upcoming sales event. The company will run QuickSight Enterprise edition in a second AWS account inside a public subnet within a second custom VPC. The new public subnet has a security group that allows outbound traffic to the existing Redshift cluster. A data engineer needs to establish connections between Amazon Redshift and QuickSight. QuickSight must refresh dashboards by querying the Redshift cluster. Which solution will meet these requirements?

- A. Configure the Redshift security group to allow inbound traffic on the Redshift port from the QuickSight security group.
- B. Assign Elastic IP addresses to the QuickSight visualizations. Configure the QuickSight security group to allow inbound traffic on the Redshift port from the Elastic IP addresses.
- C. A security group allows only traffic from within itself. An ACL is open to all traffic. The company wants to generate several visualizations in Amazon QuickSight for an upcoming sales event. The company will run QuickSight Enterprise edition in a second AWS account inside a public subnet within a second custom VPC. The new public subnet has a security group that allows outbound traffic to the existing Redshift cluster. A data engineer needs to establish connections between Amazon Redshift and QuickSight. QuickSight must refresh dashboards by querying the Redshift cluster. Which solution will meet these requirements? A. Configure the Redshift security group to allow inbound traffic on the Redshift port from the QuickSight security group. B. Assign Elastic IP addresses to the QuickSight visualizations. Configure the QuickSight security group to allow inbound traffic on the Redshift port from the Elastic IP addresses. C. Confirm that the CIDR ranges of the Redshift VPC and the QuickSight VPC are the same. If CIDR ranges are different, reconfigure one CIDR range to match the other. Establish network peering between the VPCs.
- F. An ACL is open to all traffic. The company wants to generate several visualizations in Amazon QuickSight for an upcoming sales event. The company will run QuickSight Enterprise edition in a second AWS account inside a public subnet within a second custom VPC. The new public subnet has a security group that allows outbound traffic to the existing Redshift cluster. A data engineer needs to establish connections between Amazon Redshift and QuickSight. QuickSight must refresh dashboards

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Configure the Redshift security group to allow inbound traffic on the Redshift port from the QuickSight security group..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Assign Elastic IP addresses to the QuickSight visualizations. Configure the QuickSight security group to allow inbound traffic on the Redshift port from the ...
- **C**: tidak memenuhi constraint utama soal — A security group allows only traffic from within itself. An ACL is open to all traffic. The company wants to generate several visualizations in Amazon QuickS...
- **F**: tidak memenuhi constraint utama soal — An ACL is open to all traffic. The company wants to generate several visualizations in Amazon QuickSight for an upcoming sales event. The company will run Qu...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305580-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-235-discussion/

---

## Q44. [examtopics] #236
*App id: `LOC-044`*

Question #: 236 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer is building a data pipeline. A large data file is uploaded to an Amazon S3 bucket once each day at unpredictable times. An AWS Glue workflow uses hundreds of workers to process the file and load the data into Amazon Redshift. The company wants to process the file as quickly as possible. Which solution will meet these requirements?

- A. Create an on-demand AWS Glue trigger to start the workflow. Create an AWS Lambda function that runs every 15 minutes to check the S3 bucket for the daily file. Configure the function to start the AWS Glue workflow if the file is present.
- B. Create an event-based AWS Glue trigger to start the workflow. Configure Amazon S3 to log events to AWS CloudTrail. Create a rule in Amazon EventBridge to forward PutObject events to the AWS Glue trigger.
- C. Create a scheduled AWS Glue trigger to start the workflow. Create a cron job that runs the AWS Glue job every 15 minutes. Set up the AWS Glue job to check the S3 bucket for the daily file. Configure the job to stop if the file is not present.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an event-based AWS Glue trigger to start the workflow. Configure Amazon S3 to log events to AWS CloudTrail. Create a rule in Amazon EventBridge to forward PutObject events to the AWS Glue trigger..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an on-demand AWS Glue trigger to start the workflow. Create an AWS Lambda function that runs every 15 minutes to check the S3 bucket for the daily fil...
- **C**: tidak memenuhi constraint utama soal — Create a scheduled AWS Glue trigger to start the workflow. Create a cron job that runs the AWS Glue job every 15 minutes. Set up the AWS Glue job to check th...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305582-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-236-discussion/

---

## Q45. [examtopics] #237
*App id: `LOC-045`*

Question #: 237 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs to run a data transformation job whenever a user adds a file to an Amazon S3 bucket. The job will run for less than 1 minute. The job must send the output through an email message to the data engineer. The data engineer expects users to add one file every hour of the day. Which solution will meet these requirements in the MOST operationally efficient way?

- A. Create a small Amazon EC2 instance that polls the S3 bucket for new files. Run transformation code on a schedule to generate the output. Use operating system commands to send email messages.
- B. Run an Amazon Elastic Container Service (Amazon ECS) task to poll the S3 bucket for new files. Run transformation code on a schedule to generate the output. Use operating system commands to send email messages.
- C. Create an AWS Lambda function to transform the data. Use Amazon S3 Event Notifications to invoke the Lambda function when a new object is created. Publish the output to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the data engineer’s email account to the topic.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create an AWS Lambda function to transform the data. Use Amazon S3 Event Notifications to invoke the Lambda function when a new object is created. Publish the output to an Amazon Simple Notification Service (Amazon SNS) topic. Subscribe the data engineer’s email account to the topic..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a small Amazon EC2 instance that polls the S3 bucket for new files. Run transformation code on a schedule to generate the output. Use operating system...
- **B**: tidak memenuhi constraint utama soal — Run an Amazon Elastic Container Service (Amazon ECS) task to poll the S3 bucket for new files. Run transformation code on a schedule to generate the output. ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305583-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-237-discussion/

---

## Q46. [examtopics] #238
*App id: `LOC-046`*

Question #: 238 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses Amazon S3 and AWS Glue Data Catalog to manage a data lake that contains contact information for customers. The company uses PySpark and AWS Glue jobs with a DynamicFrame to run a workflow that processes data within the data lake. A data engineer notices that the workflow is generating errors as a result of how customer postal codes are stored in the data lake. Some postal codes include unnecessary numbers or invalid characters. The data engineer needs a solution to address the errors and correct the postal codes in the data lake.

- A. Create a schema definition for PySpark that matches the format the processing workflow requires for postal codes. Pass the schema to the DynamicFrame during processing.
- B. Use AWS Glue workflow properties to allow job state sharing. Configure the AWS Glue jobs to read values from the postal code column by using the properties from a previously successful run of the jobs.
- C. Configure the column.push_down_predicate setting and the catalogPartitionPredicate settings for the postal code column in the DynamicFrame.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create a schema definition for PySpark that matches the format the processing workflow requires for postal codes. Pass the schema to the DynamicFrame during processing..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue workflow properties to allow job state sharing. Configure the AWS Glue jobs to read values from the postal code column by using the properties f...
- **C**: tidak memenuhi constraint utama soal — Configure the column.push_down_predicate setting and the catalogPartitionPredicate settings for the postal code column in the DynamicFrame.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305584-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-238-discussion/

---

## Q47. [examtopics] #239
*App id: `LOC-047`*

Question #: 239 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer is troubleshooting an AWS Glue workflow that occasionally fails. The engineer determines that the failures are a result of data quality issues. A business reporting team needs to receive an email notification any time the workflow fails in the future. Which solution will meet this requirement?

- A. Create an Amazon Simple Notification Service (Amazon SNS) FIFO topic. Subscribe the team’s email account to the SNS topic. Create an AWS Lambda function that initiates when the AWS Glue job state changes to FAILED. Set the SNS topic as the target.
- B. Create an Amazon Simple Notification Service (Amazon SNS) standard topic. Subscribe the team’s email account to the SNS topic. Create an Amazon EventBridge rule that triggers when the AWS Glue job state changes to FAILED. Set the SNS topic as the target.
- C. Subscribe the team’s email account to the SNS topic. Create an AWS Lambda function that initiates when the AWS Glue job state changes to FAILED. Set the SNS topic as the target. B. Create an Amazon Simple Notification Service (Amazon SNS) standard topic. Subscribe the team’s email account to the SNS topic. Create an Amazon EventBridge rule that triggers when the AWS Glue job state changes to FAILED. Set the SNS topic as the target. C. Create an Amazon Simple Queue Service (Amazon SQS) FIFO queue. Subscribe the team’s email account to the SQS queue. Create an AWS Config rule that triggers when the AWS Glue job state changes to FAILED. Set the SQS queue as the target.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an Amazon Simple Notification Service (Amazon SNS) standard topic. Subscribe the team’s email account to the SNS topic. Create an Amazon EventBridge rule that triggers when the AWS Glue job state changes to FAILED. Set the SNS topic as the target..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an Amazon Simple Notification Service (Amazon SNS) FIFO topic. Subscribe the team’s email account to the SNS topic. Create an AWS Lambda function that...
- **C**: tidak memenuhi constraint utama soal — Subscribe the team’s email account to the SNS topic. Create an AWS Lambda function that initiates when the AWS Glue job state changes to FAILED. Set the SNS ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305585-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-239-discussion/

---

## Q48. [examtopics] #240
*App id: `LOC-048`*

Question #: 240 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses AWS Glue jobs to implement several data pipelines. The pipelines are critical to the company. The company needs to implement a monitoring mechanism that will alert stakeholders if the pipelines fail. Which solution will meet these requirements with the LEAST operational overhead?

- A. Create an Amazon EventBridge rule to match AWS Glue job failure events. Configure the rule to target an AWS Lambda function to process events. Configure the function to send notifications to an Amazon Simple Notification Service (Amazon SNS) topic.
- B. Configure an Amazon CloudWatch Logs log group for the AWS Glue jobs. Create an Amazon EventBridge rule to match new log creation events in the log group. Configure the rule to target an AWS Lambda function that reads the logs and sends notifications to an Amazon Simple Notification Service (Amazon SNS) topic if AWS Glue job failure logs are present.
- C. B. Configure an Amazon CloudWatch Logs log group for the AWS Glue jobs. Create an Amazon EventBridge rule to match new log creation events in the log group. Configure the rule to target an AWS Lambda function that reads the logs and sends notifications to an Amazon Simple Notification Service (Amazon SNS) topic if AWS Glue job failure logs are present. C. Create an Amazon EventBridge rule to match AWS Glue job failure events. Define an Amazon CloudWatch metric based on the EventBridge rule. Set up a CloudWatch alarm based on the metric to send notifications to an Amazon Simple Notification Service (Amazon SNS) topic.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: B. Configure an Amazon CloudWatch Logs log group for the AWS Glue jobs. Create an Amazon EventBridge rule to match new log creation events in the log group. Configure the rule to target an AWS Lambda function that reads the logs and sends notifications to an Amazon Simple Notification Service (Amazon SNS) topic if AWS Glue job failure logs are present. C. Create an Amazon EventBridge rule to match AWS Glue job failure events. Define an Amazon CloudWatch metric based on the EventBridge rule. Set up a CloudWatch alarm based on the metric to send notifications to an Amazon Simple Notification Service (Amazon SNS) topic..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an Amazon EventBridge rule to match AWS Glue job failure events. Configure the rule to target an AWS Lambda function to process events. Configure the ...
- **B**: tidak memenuhi constraint utama soal — Configure an Amazon CloudWatch Logs log group for the AWS Glue jobs. Create an Amazon EventBridge rule to match new log creation events in the log group. Con...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305586-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-240-discussion/

---

## Q49. [examtopics] #242
*App id: `LOC-049`*

Question #: 242 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer notices slow query performance on a highly partitioned table that is in Amazon Athena. The table contains daily data for the previous 5 years, partitioned by date. The data engineer wants to improve query performance and to automate partition management. Which solution will meet these requirements?

- A. The table contains daily data for the previous 5 years, partitioned by date. The data engineer wants to improve query performance and to automate partition management. Which solution will meet these requirements? A. Use an AWS Lambda function that runs daily. Configure the function to manually create new partitions in AWS Glue for each day’s data.
- B. Use partition projection in Athena. Configure the table properties by using a date range from 5 years ago to the present.
- C. Reduce the number of partitions by changing the partitioning schema from daily to monthly granularity.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use partition projection in Athena. Configure the table properties by using a date range from 5 years ago to the present..
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The table contains daily data for the previous 5 years, partitioned by date. The data engineer wants to improve query performance and to automate partition m...
- **C**: tidak memenuhi constraint utama soal — Reduce the number of partitions by changing the partitioning schema from daily to monthly granularity.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/305588-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-242-discussion/

---

## Q50. [examtopics] #249
*App id: `LOC-050`*

Question #: 249 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses an organization in AWS Organizations to manage multiple AWS accounts. The company uses an enhanced fanout data stream in Amazon Kinesis Data Streams to receive streaming data from multiple producers. The company runs the data stream in an account named Account

- A. The company wants to use an AWS Lambda function in an account named Account В to process the data from the data stream. The company creates a Lambda execution role in Account В that has permissions to access data from the data stream in Account A. What additional step must the company take to meet this requirement? A. Create a service control policy (SCP) to grant the data stream read access to the cross-account Lambda execution role. Attach the SCP to Account A.
- B. Add a resource-based policy to the data stream to allow read access for the cross-account Lambda execution role.
- C. Create a service control policy (SCP) to grant the data stream read access to the cross-account Lambda execution role. Attach the SCP to Account B.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Add a resource-based policy to the data stream to allow read access for the cross-account Lambda execution role..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The company wants to use an AWS Lambda function in an account named Account В to process the data from the data stream. The company creates a Lambda executio...
- **C**: tidak memenuhi constraint utama soal — Create a service control policy (SCP) to grant the data stream read access to the cross-account Lambda execution role. Attach the SCP to Account B.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/315500-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-249-discussion/

---

## Q51. [examtopics] #256
*App id: `LOC-051`*

Question #: 256 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer is building a new data pipeline that stores metadata in an Amazon DynamoDB table. The data engineer must ensure that all items that are older than a specified age are removed from the DynamoDB table daily. Which solution will meet this requirement with the LEAST configuration effort?

- A. **A:** Enable DynamoDB TTL on the DynamoDB table. Adjust the application source code to set the TTL attribute appropriately.
- B. **B:** Create an Amazon EventBridge rule that uses a daily cron expression to trigger an AWS Lambda function to delete items that are older than the specified age.
- C. **C:** Add a lifecycle configuration to the DynamoDB table that deletes items that are older than the specified age.

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Enable DynamoDB TTL on the DynamoDB table. Adjust the application source code to set the TTL attribute appropriately.
- **B**: **B:** Create an Amazon EventBridge rule that uses a daily cron expression to trigger an AWS Lambda function to delete items that are older than the specified age.
- **C**: **C:** Add a lifecycle configuration to the DynamoDB table that deletes items that are older than the specified age.
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/315507-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-256-discussion/

---

## Q52. [examtopics] #266
*App id: `LOC-052`*

Question #: 266 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company is developing machine learning (ML) models. A data engineer needs to apply data quality rules to training data. The company stores the training data in an Amazon S3 bucket. Which solution will meet these requirements with the LEAST operational overhead?

- A. The company stores the training data in an Amazon S3 bucket. Which solution will meet these requirements with the LEAST operational overhead? A. Create an AWS Lambda function to check data quality and to raise exceptions in the code. Run the function when data is added to the S3 bucket. Create an Amazon CloudWatch alarm for exceptions in the code.
- B. Create an AWS Glue DataBrew project for the data in the S3 bucket. Create a ruleset for the data quality rules. Create a profile job to run the data quality rules. Use Amazon EventBridge to run the profile job when data is added to the S3 bucket.
- C. Create an Amazon EMR provisioned cluster. Add a Python open source data quality package to the EMR cluster. Use the Python package to write code for data quality rules and to copy the data from the S3 bucket to the EMR cluster. Copy the data from the S3 bucket to the EMR cluster. Run the data quality rules.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an AWS Glue DataBrew project for the data in the S3 bucket. Create a ruleset for the data quality rules. Create a profile job to run the data quality rules. Use Amazon EventBridge to run the profile job when data is added to the S3 bucket..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The company stores the training data in an Amazon S3 bucket. Which solution will meet these requirements with the LEAST operational overhead? A. Create an AW...
- **C**: tidak memenuhi constraint utama soal — Create an Amazon EMR provisioned cluster. Add a Python open source data quality package to the EMR cluster. Use the Python package to write code for data qua...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/382571-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-266-discussion/

---

## Q53. [examtopics] #267
*App id: `LOC-053`*

Question #: 267 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs to analyze time-sensitive sales data. The company stores the data in an Amazon S3 bucket. The data engineer uses AWS Glue Data Catalog to access the data. When the data engineer performs the analysis, the data engineer notices that some records are missing or out of date. What is the likely cause of these issues?

- A. **A:** AWS Glue Data Catalog is not up to date with the latest S3 partition changes.
- B. **B:** Incorrect IAM roles are assigned to the AWS Glue jobs.
- C. **C:** Versioning is not enabled on the S3 bucket.

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** AWS Glue Data Catalog is not up to date with the latest S3 partition changes.
- **B**: **B:** Incorrect IAM roles are assigned to the AWS Glue jobs.
- **C**: **C:** Versioning is not enabled on the S3 bucket.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/382572-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-267-discussion/

---

## Q54. [examtopics] #279
*App id: `LOC-054`*

Question #: 279 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company needs to optimize storage costs for an Amazon S3 bucket. The S3 bucket receives 10 million objects every day. The objects range in size from 2 KB to 5 MB. The objects need to be immediately accessible for the first 60 days. Users access objects infrequently from 61 to 180 days. The objects must be accessible within an hour from 181 to 365 days. The company can delete the objects after 365 days. Which solution will meet these requirements?

- A. Use S3 Intelligent-Tiering to automatically transition objects. Select the Archive Access tier for Intelligent-Tiering. Configure an S3 bucket policy to expire objects that are older than 365 days.
- B. The objects need to be immediately accessible for the first 60 days. Users access objects infrequently from 61 to 180 days. The objects must be accessible within an hour from 181 to 365 days. The company can delete the objects after 365 days. Which solution will meet these requirements? A. Use S3 Intelligent-Tiering to automatically transition objects. Select the Archive Access tier for Intelligent-Tiering. Configure an S3 bucket policy to expire objects that are older than 365 days. B. Create an S3 Lifecycle policy to move objects. Configure the policy to move objects from S3 Standard to S3 Standard-Infrequent Access (S3 Standard-IA) after 60 days. Move the objects to S3 Glacier Flexible Retrieval after 180 days. Expire objects after 365 days.
- C. Enable S3 Inventory. Use a daily inventory report to configure an S3 Batch Operations job that moves objects from S3 Standard to S3 Standard-Infrequent Access (S3 Standard-IA) after 60 days. Move objects to S3 Glacier Flexible Retrieval after 180 days. Expire objects after 365 days.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: The objects need to be immediately accessible for the first 60 days. Users access objects infrequently from 61 to 180 days. The objects must be accessible within an hour from 181 to 365 days. The company can delete the objects after 365 days. Which solution will meet these requirements? A. Use S3 Intelligent-Tiering to automatically transition objects. Select the Archive Access tier for Intelligent-Tiering. Configure an S3 bucket policy to expire objects that are older than 365 days. B. Create an S3 Lifecycle policy to move objects. Configure the policy to move objects from S3 Standard to S3 Standard-Infrequent Access (S3 Standard-IA) after 60 days. Move the objects to S3 Glacier Flexible Retrieval after 180 days. Expire objects after 365 days..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use S3 Intelligent-Tiering to automatically transition objects. Select the Archive Access tier for Intelligent-Tiering. Configure an S3 bucket policy to expi...
- **C**: tidak memenuhi constraint utama soal — Enable S3 Inventory. Use a daily inventory report to configure an S3 Batch Operations job that moves objects from S3 Standard to S3 Standard-Infrequent Acces...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/382564-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-279-discussion/

---

## Q55. [examtopics] #297
*App id: `LOC-055`*

Question #: 297 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A manufacturing company uses AWS Glue jobs to process IoT sensor data to generate predictive maintenance models. A data engineer needs to implement automated data quality checks to identify temperature readings that are outside the expected range of -50°C to 150°C. The data quality checks must also identify records that are missing timestamp values. The data engineer needs a solution that requires minimal coding and can automatically flag the specified issues. Which solution will meet these requirements?

- A. Create an AWS Glue DataBrew project to profile the sensor data Define completeness rules for timestamps. Set up numeric range validation for temperature values.
- B. Use AWS Glue’s Data Quality rules and machine learning (ML)-based anomaly detection to identify missing timestamps and to detect temperature anomalies.
- C. The data quality checks must also identify records that are missing timestamp values. The data engineer needs a solution that requires minimal coding and can automatically flag the specified issues. Which solution will meet these requirements? A. Create an AWS Glue DataBrew project to profile the sensor data Define completeness rules for timestamps. Set up numeric range validation for temperature values. B. Use AWS Glue’s Data Quality rules and machine learning (ML)-based anomaly detection to identify missing timestamps and to detect temperature anomalies. C. Create an AWS Lambda function to scan the sensor data files to validate temperature ranges. Use AWS Glue Data Catalog tables to check timestamp completeness.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create an AWS Glue DataBrew project to profile the sensor data Define completeness rules for timestamps. Set up numeric range validation for temperature values..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue’s Data Quality rules and machine learning (ML)-based anomaly detection to identify missing timestamps and to detect temperature anomalies.
- **C**: tidak memenuhi constraint utama soal — The data quality checks must also identify records that are missing timestamp values. The data engineer needs a solution that requires minimal coding and can...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/389729-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-297-discussion/

---

## Q56. [examtopics] #299
*App id: `LOC-056`*

Question #: 299 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company generates yearly financial statements for customers and stores the statements in an Amazon S3 bucket. Customers rarely access the documents after 1 week. The company must retain the statements for 7 years. The statements must remain readily accessible for customers. Which solution will meet these requirements in the MOST cost-effective way?

- A. Create an S3 Lifecycle rule to transition objects to S3 Glacier Deep Archive after 7 days. Expire the objects after 7 years.
- B. Set the S3 bucket to use S3 Intelligent-Tiering when new objects are uploaded. Set objects to expire after 7 years.
- C. Create an S3 Lifecycle rule to transition objects to S3 Glacier Instant Retrieval after 7 days. Expire the objects after 7 years.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create an S3 Lifecycle rule to transition objects to S3 Glacier Instant Retrieval after 7 days. Expire the objects after 7 years..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an S3 Lifecycle rule to transition objects to S3 Glacier Deep Archive after 7 days. Expire the objects after 7 years.
- **B**: tidak memenuhi constraint utama soal — Set the S3 bucket to use S3 Intelligent-Tiering when new objects are uploaded. Set objects to expire after 7 years.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401526-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-299-discussion/

---

## Q57. [examtopics] #301
*App id: `LOC-057`*

Question #: 301 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company creates a new non-production application that runs on an Amazon EC2 instance. The application needs to communicate with an Amazon RDS database instance using Java Database Connectivity (JDBC). The EC2 instances and the RDS database instance are in the same subnet. Which solution will meet this requirement?

- A. Modify the IAM role that is assigned to the database instance to allow connections from the EC2 instances.
- B. Modify the ec2_authorized_hosts parameter in the RDS parameter group to include the EC2 instances. Restart the database instance.
- C. Update the database security group to allow connections from the EC2 instances.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Update the database security group to allow connections from the EC2 instances..
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Modify the IAM role that is assigned to the database instance to allow connections from the EC2 instances.
- **B**: tidak memenuhi constraint utama soal — Modify the ec2_authorized_hosts parameter in the RDS parameter group to include the EC2 instances. Restart the database instance.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401528-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-301-discussion/

---

## Q58. [examtopics] #302
*App id: `LOC-058`*

Question #: 302 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A retail company wants to implement real-time analytics for an ecommerce platform. The company needs to collect clickstream data from the company's website and mobile apps. The company needs to store the data for analytics. Which solution will meet these requirements with the LEAST ongoing maintenance?

- A. Use Amazon Data Firehose to ingest the streaming data. Deliver the processed data directly to a provisioned Amazon Redshift cluster.
- B. Deploy agents on Amazon EC2 instances to collect the streaming data. Use the AWS CLI to periodically batch upload the data to an Amazon S3 bucket.
- C. Use Amazon Kinesis Data Streams to collect the streaming data. Use Amazon Data Firehose to deliver the data to an Amazon S3 bucket.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon Kinesis Data Streams to collect the streaming data. Use Amazon Data Firehose to deliver the data to an Amazon S3 bucket..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Data Firehose to ingest the streaming data. Deliver the processed data directly to a provisioned Amazon Redshift cluster.
- **B**: tidak memenuhi constraint utama soal — Deploy agents on Amazon EC2 instances to collect the streaming data. Use the AWS CLI to periodically batch upload the data to an Amazon S3 bucket.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401529-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-302-discussion/

---

## Q59. [examtopics] #303
*App id: `LOC-059`*

Question #: 303 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses AWS Glue ETL pipelines to process data. The company uses Amazon Athena to analyze data in an Amazon S3 bucket. To better understand shipping timelines, the company decides to collect and store shipping and delivery dates in addition to order data. The company adds a data quality check to ensure that shipping date is greater than order date and that delivery date is greater than shipping date. Orders that fail the quality check must be stored in a second S3 bucket. Which solution will meet these requirements MOST cost-effectively?

- A. The company uses Amazon Athena to analyze data in an Amazon S3 bucket. To better understand shipping timelines, the company decides to collect and store shipping and delivery dates in addition to order data. The company adds a data quality check to ensure that shipping date is greater than order date and that delivery date is greater than shipping date. Orders that fail the quality check must be stored in a second S3 bucket. Which solution will meet these requirements MOST cost-effectively? A. Use the AWS Glue DataBrew DATEDIFF function to create two additional columns. Check the new columns.
- B. Use Athena to query all three date columns, and compare the columns.
- C. Use AWS Glue Data Quality to create a custom rule that uses the three date columns.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use AWS Glue Data Quality to create a custom rule that uses the three date columns..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The company uses Amazon Athena to analyze data in an Amazon S3 bucket. To better understand shipping timelines, the company decides to collect and store ship...
- **B**: tidak memenuhi constraint utama soal — Use Athena to query all three date columns, and compare the columns.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401530-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-303-discussion/

---

## Q60. [examtopics] #305
*App id: `LOC-060`*

Question #: 305 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company needs to store and analyze a large amount of IoT sensor data. The company needs to retain the data indefinitely. The company analyzes the data in an Amazon Redshift cluster. Which solution will meet these requirements MOST cost-effectively?

- A. The company needs to retain the data indefinitely. The company analyzes the data in an Amazon Redshift cluster. Which solution will meet these requirements MOST cost-effectively? A. Store the data in an Amazon S3 bucket in JSON format. Configure auto-copy data ingestion from the S3 bucket to the Redshift cluster.
- B. Store the data in an Amazon S3 bucket in Apache Parquet format. Configure query access through Amazon Redshift Spectrum.
- C. Store the data in an Amazon S3 bucket in JSON format. Configure query access through Amazon Redshift Spectrum.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Store the data in an Amazon S3 bucket in Apache Parquet format. Configure query access through Amazon Redshift Spectrum..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The company needs to retain the data indefinitely. The company analyzes the data in an Amazon Redshift cluster. Which solution will meet these requirements M...
- **C**: tidak memenuhi constraint utama soal — Store the data in an Amazon S3 bucket in JSON format. Configure query access through Amazon Redshift Spectrum.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401532-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-305-discussion/

---

## Q61. [examtopics] #306
*App id: `LOC-061`*

Question #: 306 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company has an Amazon S3 based data lake. The data lake contains datasets that belong to multiple departments. The data lake ingests millions of customer records each day. A data engineer needs to design an access and storage solution that allows departments to access only the subset of the company's dataset that each department requires. The solution must follow the principle of least privilege. Which solution will meet these requirements with the LEAST operational effort?

- A. Define IAM policies and IAM roles for each department. Specify the S3 access paths from the data lake that each team can access.
- B. Set up Amazon Redshift and Amazon Redshift Spectrum as the primary entry points for the data lake. Define an IAM role that Amazon Redshift can assume. Configure the IAM role to grant access to the data that is in Amazon S3.
- C. Set up AWS Lake Formation. Assign LF-Tags to AWS Glue Data Catalog resources. Enable Lake Formation tag-based access control (LF-TBAC).

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Set up AWS Lake Formation. Assign LF-Tags to AWS Glue Data Catalog resources. Enable Lake Formation tag-based access control (LF-TBAC)..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Define IAM policies and IAM roles for each department. Specify the S3 access paths from the data lake that each team can access.
- **B**: tidak memenuhi constraint utama soal — Set up Amazon Redshift and Amazon Redshift Spectrum as the primary entry points for the data lake. Define an IAM role that Amazon Redshift can assume. Config...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401533-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-306-discussion/

---

## Q62. [examtopics] #307
*App id: `LOC-062`*

Question #: 307 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A healthcare company stores patient records in an on-premises MySQL database. The company creates an application to access the MySQL database. The company must enforce security protocols to protect the patient records. The company currently rotates database credentials every 30 days to minimize the risk of unauthorized access. The company wants a solution that does require the company to modify the application code for each credential rotation. Which solution will meet this requirement with the LEAST operational overhead?

- A. Assign an IAM role access permissions to the database. Configure the application to obtain temporary credentials through the IAM role.
- B. Use AWS Key Management Service (AWS KMS) to generate encryption keys. Configure automatic key rotation. Store the encrypted credentials in an Amazon DynamoDB table.
- C. Use AWS Secrets Manager to automatically rotate credentials. Allow the application to retrieve the credentials by using API calls.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use AWS Secrets Manager to automatically rotate credentials. Allow the application to retrieve the credentials by using API calls..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Assign an IAM role access permissions to the database. Configure the application to obtain temporary credentials through the IAM role.
- **B**: tidak memenuhi constraint utama soal — Use AWS Key Management Service (AWS KMS) to generate encryption keys. Configure automatic key rotation. Store the encrypted credentials in an Amazon DynamoDB...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401534-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-307-discussion/

---

## Q63. [examtopics] #309
*App id: `LOC-063`*

Question #: 309 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer is writing a query to join two tables in Amazon Athena. The data engineer needs to choose the correct join order for the tables to optimize query performance. Which solution will meet these requirements?

- A. The data engineer needs to choose the correct join order for the tables to optimize query performance. Which solution will meet these requirements? A. Specify the smaller table on the left side of the join and the larger table on the right side of the join.
- B. Specify the larger table on the left side of the join and the smaller table on the right side of the join.
- C. Use AWS Glue to pre-process the tables before performing the join.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Specify the larger table on the left side of the join and the smaller table on the right side of the join..
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The data engineer needs to choose the correct join order for the tables to optimize query performance. Which solution will meet these requirements? A. Specif...
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue to pre-process the tables before performing the join.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401536-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-309-discussion/

---

## Q64. [examtopics] #310
*App id: `LOC-064`*

Question #: 310 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company generates reports from 30 tables in an Amazon Redshift data warehouse. The data source is an operational Amazon Aurora MySQL database that contains 100 tables. Currently, the company refreshes all data from Aurora to Amazon Redshift every hour, which causes delays in report generation. Which combination of steps will meet these requirements with the LEAST operational overhead? (Choose two.)

- A. **A:** Use AWS Database Migration Service (AWS DMS) to create a replication task. Select only the required tables.
- B. **B:** Create a database in Amazon Redshift that uses the integration.
- C. **C:** Create a zero-ETL integration in Amazon Aurora. Select only the required tables.
- D. **D:** Use query editor v2 in Amazon Redshift to access the data in Aurora.

**Answer:** ABCD

**Pembahasan:** Jawaban yang tepat adalah **ABCD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Use AWS Database Migration Service (AWS DMS) to create a replication task. Select only the required tables.
- **B**: **B:** Create a database in Amazon Redshift that uses the integration.
- **C**: **C:** Create a zero-ETL integration in Amazon Aurora. Select only the required tables.
- **D**: **D:** Use query editor v2 in Amazon Redshift to access the data in Aurora.
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401537-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-310-discussion/

---

## Q65. [examtopics] #311
*App id: `LOC-065`*

Question #: 311 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs a fully automated solution to check for new data in multiple databases and process data that the solution finds. The solution must run every hour. The solution must be compatible with Amazon RDS, Amazon DynamoDB, and Amazon OpenSearch Service. The solution must be able to process up to 10 MB of data at one time. The solution must be optimized for costs and operational overhead. The solution must have robust error handling capabilities. Which solution will meet these requirements?

- A. Use Amazon EventBridge to invoke AWS Step Functions every hour to deploy an AWS Lambda function to check for data. Configure Step Functions steps to process data that the Lambda function finds. Implement error handling in each state.
- B. Use Amazon EventBridge to invoke an AWS Lambda function every hour to check for data. Configure the function to send a message to an Amazon Simple Queue Service (Amazon SQS) queue when the function finds new data. Use a second Lambda function to read the queue and perform the processing.
- C. Configure an Apache Spark application to run on Amazon EMR to check for data. Implement error handling in the application. Use Amazon EventBridge to invoke the application every hour.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use Amazon EventBridge to invoke an AWS Lambda function every hour to check for data. Configure the function to send a message to an Amazon Simple Queue Service (Amazon SQS) queue when the function finds new data. Use a second Lambda function to read the queue and perform the processing..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon EventBridge to invoke AWS Step Functions every hour to deploy an AWS Lambda function to check for data. Configure Step Functions steps to process ...
- **C**: tidak memenuhi constraint utama soal — Configure an Apache Spark application to run on Amazon EMR to check for data. Implement error handling in the application. Use Amazon EventBridge to invoke t...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401538-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-311-discussion/

---

## Q66. [examtopics] #313
*App id: `LOC-066`*

Question #: 313 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company stores a 100 MB dataset in an Amazon S3 bucket as an Apache Parquet file. A data engineer needs to profile the data before performing data preparation steps on the data. Which solution will meet this requirement in the MOST operationally efficient way?

- A. Which solution will meet this requirement in the MOST operationally efficient way? A. Create a profile job on the dataset in AWS Glue DataBrew. Review the profile job results.
- B. Stream the data into Amazon Managed Service for Apache Flink for SQL queries. Use the Apache Flink dashboard to profile the data.
- C. Ingest the data into Amazon Redshift Spectrum. Use SQL queries to profile the data.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Which solution will meet this requirement in the MOST operationally efficient way? A. Create a profile job on the dataset in AWS Glue DataBrew. Review the profile job results..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Stream the data into Amazon Managed Service for Apache Flink for SQL queries. Use the Apache Flink dashboard to profile the data.
- **C**: tidak memenuhi constraint utama soal — Ingest the data into Amazon Redshift Spectrum. Use SQL queries to profile the data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401540-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-313-discussion/

---

## Q67. [examtopics] #314
*App id: `LOC-067`*

Question #: 314 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company needs to implement real-time analytics for a retail shopping platform. The company wants to capture clickstream data, process the data, and load the data into Amazon Redshift for analysis. The solution must handle hundreds of megabytes of data every second. Which solution will meet these requirements with the LEAST query latency for analytics?

- A. Use Amazon Data Firehose to capture the data. Store the data in an Amazon S3 bucket. Use the COPY command to load data into Amazon Redshift.
- B. Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to capture the data. Use Amazon EMR to process the data. Use federated queries to access data in Amazon Redshift.
- C. Use Amazon Kinesis Data Streams to capture the data. Use Amazon Redshift streaming ingestion to load data directly into materialized views.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon Kinesis Data Streams to capture the data. Use Amazon Redshift streaming ingestion to load data directly into materialized views..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Data Firehose to capture the data. Store the data in an Amazon S3 bucket. Use the COPY command to load data into Amazon Redshift.
- **B**: tidak memenuhi constraint utama soal — Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to capture the data. Use Amazon EMR to process the data. Use federated queries to access data in A...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401541-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-314-discussion/

---

## Q68. [examtopics] #315
*App id: `LOC-068`*

Question #: 315 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company has a data pipeline that processes transaction data in real time. The company needs a notification system that alerts different teams based on the type of processing error without any delay. For security-related errors, the system must immediately notify the security team. For data validation errors, the system must notify the data quality team. For system errors, the system must notify the operations team. Which solution will meet these requirements with the LEAST operational overhead?

- A. Create an Amazon Simple Notification Service (Amazon SNS) topic with an AWS Lambda function subscriber that evaluates the error type and forwards the error to the appropriate email addresses.
- B. Configure Amazon EventBridge rules with distinct event patterns for each error type. Route each error type to a dedicated Amazon Simple Notification Service (Amazon SNS) topic for team-specific alerts.
- C. Use Amazon Simple Queue Service (Amazon SQS) with message attributes to categorize errors. Allow each team to poll their respective SQS queue for relevant errors.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Configure Amazon EventBridge rules with distinct event patterns for each error type. Route each error type to a dedicated Amazon Simple Notification Service (Amazon SNS) topic for team-specific alerts..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an Amazon Simple Notification Service (Amazon SNS) topic with an AWS Lambda function subscriber that evaluates the error type and forwards the error t...
- **C**: tidak memenuhi constraint utama soal — Use Amazon Simple Queue Service (Amazon SQS) with message attributes to categorize errors. Allow each team to poll their respective SQS queue for relevant er...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401542-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-315-discussion/

---

## Q69. [examtopics] #316
*App id: `LOC-069`*

Question #: 316 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A global ecommerce company processes customer transactions, inventory updates, and user activity logs across multiple AWS services. The company needs a scalable, fully managed, and event-driven orchestration solution to coordinate complex extract, transform, and load (ETL) workflows. The solution must use AWS Glue and Amazon EMR to process data. The data will be stored in Amazon Redshift and Amazon S3. The solution must support dependency management, automated retries, and data pipeline monitoring. Which solution will meet these requirements?

- A. The data will be stored in Amazon Redshift and Amazon S3. The solution must support dependency management, automated retries, and data pipeline monitoring. Which solution will meet these requirements? A. Use AWS Step Functions to define an express workflow that invokes the data transformation and loading tasks across Amazon EMR and AWS Glue.
- B. Create AWS Lambda functions for each step of the workflow Configure Amazon EventBridge to invoke AWS Glue jobs. Configure the Lambda functions to process and move data through the pipeline.
- C. Use Apache Airflow on Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to create Directed Acyclic Graphs (DAGs) to manage ETL workflows.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Apache Airflow on Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to create Directed Acyclic Graphs (DAGs) to manage ETL workflows..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The data will be stored in Amazon Redshift and Amazon S3. The solution must support dependency management, automated retries, and data pipeline monitoring. W...
- **B**: tidak memenuhi constraint utama soal — Create AWS Lambda functions for each step of the workflow Configure Amazon EventBridge to invoke AWS Glue jobs. Configure the Lambda functions to process and...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401543-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-316-discussion/

---

## Q70. [examtopics] #317
*App id: `LOC-070`*

Question #: 317 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A global company currently uses Amazon Redshift to store data and Amazon Quick Suite (previously known as Amazon QuickSight) to generate reports. A team of business analysts have varying levels of technical expertise. Some analysts lack SQL knowledge. All the analysts need to create new reports frequently. The company wants to use natural program language queries to create dashboards and reports more efficiently. Which solution will meet these requirements with the LEAST operational effort?

- A. Use Quick Suite dashboards that have zero-ETL access to Amazon Redshift.
- B. Enable Amazon Q in Quick Suite. Generate Quick Suite dashboards and reports.
- C. Integrate Tableau with Amazon Redshift to give Tableau direct access to the data.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Enable Amazon Q in Quick Suite. Generate Quick Suite dashboards and reports..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Quick Suite dashboards that have zero-ETL access to Amazon Redshift.
- **C**: tidak memenuhi constraint utama soal — Integrate Tableau with Amazon Redshift to give Tableau direct access to the data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401544-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-317-discussion/

---

## Q71. [examtopics] #319
*App id: `LOC-071`*

Question #: 319 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer at a large company needs to create centralized datasets that are optimized for Amazon Redshift performance. The company has multiple downstream teams that use their own AWS accounts and dedicated Amazon Redshift clusters with RA3 nodes. All downstream teams need access to the centralized datasets. Which solution will provide immediate access to the datasets and maintain the current Amazon Redshift performance?

- A. Copy the datasets to an Amazon S3 bucket by using the UNLOAD command. Register the table definitions in a dedicated AWS Glue Data Catalog schema. Share the schema with the other AWS accounts by using AWS Lake Formation. Use Amazon Redshift Spectrum to access the data.
- B. Create a daily extract, transform, and load (ETL) job to unload the data to an Amazon S3 staging area. Instruct the teams to copy the data into their Amazon Redshift clusters.
- C. Set up Amazon Redshift data sharing between the Amazon Redshift producer clusters and the consumer clusters to provide access to the centralized datasets.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Set up Amazon Redshift data sharing between the Amazon Redshift producer clusters and the consumer clusters to provide access to the centralized datasets..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Copy the datasets to an Amazon S3 bucket by using the UNLOAD command. Register the table definitions in a dedicated AWS Glue Data Catalog schema. Share the s...
- **B**: tidak memenuhi constraint utama soal — Create a daily extract, transform, and load (ETL) job to unload the data to an Amazon S3 staging area. Instruct the teams to copy the data into their Amazon ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401546-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-319-discussion/

---

## Q72. [examtopics] #320
*App id: `LOC-072`*

Question #: 320 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A global finance company needs to implement near real-time cross-Region synchronization of trading data between trading centers in the us-east-1 Region, the eu-west-2 Region, and the ap-northeast-1 Region. The company must ensure that data is encrypted in transit. The solution must ensure data ordering and consistency and must support cross-Region disaster recovery. The solution must provide data latency of less than 500 milliseconds. Which solution will meet these requirements with the LEAST operational effort?

- A. Deploy Apache Kafka Connect in each AWS Region. Use custom-developed connectors to set up cross-Region data replication. Configure the SSL security protocol.
- B. Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) Replicator to establish fully interconnected replication relationships between MSK clusters in the three AWS Regions. Enable TLS encryption and IAM authentication. Set up cross-Region backup configurations.
- C. Deploy Apache Kafka Mirror Maker 2.0 in each AWS Region. Set up custom replication policies to handle cross-Region data synchronization. Configure the SSL security protocol.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) Replicator to establish fully interconnected replication relationships between MSK clusters in the three AWS Regions. Enable TLS encryption and IAM authentication. Set up cross-Region backup configurations..
Konteks layanan terkait:
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Deploy Apache Kafka Connect in each AWS Region. Use custom-developed connectors to set up cross-Region data replication. Configure the SSL security protocol.
- **C**: tidak memenuhi constraint utama soal — Deploy Apache Kafka Mirror Maker 2.0 in each AWS Region. Set up custom replication policies to handle cross-Region data synchronization. Configure the SSL se...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401547-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-320-discussion/

---

## Q73. [examtopics] #321
*App id: `LOC-073`*

Question #: 321 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company’s application needs to search and analyze data in near real time. The application must handle up to 1,000 requests each second with low query latency. The company wants a solution that individual data teams can own and configure to meet each team's cost and performance optimization requirements. Which solution will meet these requirements?

- A. Use Amazon S3 buckets to store the data. Use Amazon Athena to query and analyze the data. Assign each data team a separate S3 bucket prefix to optimize queries.
- B. Use streams in Amazon Kinesis Data Streams and Amazon Managed Service for Apache Flink to query and analyze the data. Assign each data team a separate stream to manage and consume.
- C. Use Amazon OpenSearch Service clusters with indexing to query the data. Assign each data team a separate cluster to configure for storage and queries.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon OpenSearch Service clusters with indexing to query the data. Assign each data team a separate cluster to configure for storage and queries..
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon S3 buckets to store the data. Use Amazon Athena to query and analyze the data. Assign each data team a separate S3 bucket prefix to optimize queries.
- **B**: tidak memenuhi constraint utama soal — Use streams in Amazon Kinesis Data Streams and Amazon Managed Service for Apache Flink to query and analyze the data. Assign each data team a separate stream...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401548-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-321-discussion/

---

## Q74. [examtopics] #323
*App id: `LOC-074`*

Question #: 323 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company stores sensitive transaction data in an Amazon S3 bucket. A data engineer must implement controls to prevent accidental deletions. Which solution will meet this requirement?

- A. Enable versioning on the S3 bucket and configure MFA delete.
- B. Configure an S3 bucket policy rule that denies the creation of S3 delete markers.
- C. Create an S3 Lifecycle rule that moves deleted files to S3 Glacier Deep Archive.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Enable versioning on the S3 bucket and configure MFA delete..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Configure an S3 bucket policy rule that denies the creation of S3 delete markers.
- **C**: tidak memenuhi constraint utama soal — Create an S3 Lifecycle rule that moves deleted files to S3 Glacier Deep Archive.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401550-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-323-discussion/

---

## Q75. [examtopics] #324
*App id: `LOC-075`*

Question #: 324 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company stores historical customer data in an Amazon Redshift table. A column named Email contains null entries and values that are not email addresses. The quality of the Email column is critical for multiple downstream processes. A data engineer must create an AWS Glue Data Quality rule that fails when the percentage of valid email addresses in the Email column is less than 90%. Which component of an AWS Glue Data Quality rule will meet these requirements?

- A. Uniqueness "Email" matches "[%@%.%]" with a threshold set to > 0.9
- B. ColumnValues "Email” matches "[%@%.%]" with a threshold set to > 0.1
- C. ColumnValues "Email" matches "[%@%.%]" with a threshold set to > 0.9

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: ColumnValues "Email" matches "[%@%.%]" with a threshold set to > 0.9.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Uniqueness "Email" matches "[%@%.%]" with a threshold set to > 0.9
- **B**: tidak memenuhi constraint utama soal — ColumnValues "Email” matches "[%@%.%]" with a threshold set to > 0.1
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401551-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-324-discussion/

---

## Q76. [examtopics] #325
*App id: `LOC-076`*

Question #: 325 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company is building data processing pipelines by using AWS Glue. The pipelines access data stored in Amazon S3. The company has organized the data into folders with prefixes that represent different classification levels. The company needs to restrict AWS Glue jobs to access only specific prefixes based on the data classification. The company must also restrict access to business hours (9 AM to 5 PM). Which elements must the company include in a custom IAM policy to meet these requirements?

- A. A Resource element with S3 object Amazon Resource Name (ARN) patterns that use wildcards for each prefix and a Condition element that uses the $util.time variable with TimeGreaterThan and TimeLessThan operators
- B. A Resource element with S3 object Amazon Resource Name (ARN) patterns that use wildcards for each prefix and a Condition element that uses the aws:CurrentTime condition key with DateGreaterThan and DateLessThan operators
- C. A Condition element that uses the s3:prefix condition key to restrict folder access and aws:CurrentTime with DateGreaterThanEquals and DateLessThanEquals to restrict hours of operation

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: A Condition element that uses the s3:prefix condition key to restrict folder access and aws:CurrentTime with DateGreaterThanEquals and DateLessThanEquals to restrict hours of operation.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — A Resource element with S3 object Amazon Resource Name (ARN) patterns that use wildcards for each prefix and a Condition element that uses the $util.time var...
- **B**: tidak memenuhi constraint utama soal — A Resource element with S3 object Amazon Resource Name (ARN) patterns that use wildcards for each prefix and a Condition element that uses the aws:CurrentTim...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401552-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-325-discussion/

---

## Q77. [examtopics] #327
*App id: `LOC-077`*

Question #: 327 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company processes a CSV file that contains millions of transaction records every day. The file is stored in Amazon S3. Each transaction must be validated before updating a database. The company needs a solution that will process the data in parallel. The solution must use error handling that stops the entire process if more than 15% of the records fail validation. Which solution will meet these requirements with the LEAST operational overhead?

- A. Create an AWS Batch job that processes chunks of the file in parallel with a custom error tracking mechanism.
- B. Use AWS Step Functions Distributed Map state with the ToleratedFailurePercentage field set to 15%.
- C. Deploy an Amazon EMR cluster with Spark to process the file Configure a custom failure threshold to 15%.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use AWS Step Functions Distributed Map state with the ToleratedFailurePercentage field set to 15%..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an AWS Batch job that processes chunks of the file in parallel with a custom error tracking mechanism.
- **C**: tidak memenuhi constraint utama soal — Deploy an Amazon EMR cluster with Spark to process the file Configure a custom failure threshold to 15%.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401554-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-327-discussion/

---

## Q78. [examtopics] #329
*App id: `LOC-078`*

Question #: 329 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer is building a serverless. multi-step extract, transform, and load (ETL) pipeline. The pipeline extracts data from an Amazon S3 data lake and transforms the data by using AWS Glue ETL jobs. The pipeline then loads the results into an Amazon Redshift database. The data engineer needs to orchestrate the serverless ETL workflow. Which solutions will meet these requirements? (Choose two.)

- A. Implement the workflow by using AWS Step Functions. Configure Step Functions to coordinate the AWS Glue ETL jobs and handle error conditions with automatic retries.
- B. Use AWS Glue workflows to create a graph of the ETL tasks that visually represents the dependencies between jobs and the job triggers.
- C. Provision an always on Amazon EC2 instance. Create a cron job that invokes the AWS Glue ETL jobs in sequence based on a predefined scheduleю
- D. Use Amazon EventBridge rules to invoke the AWS Glue ETL jobs based on S3 object creation events. Configure the rules to chain the AWS Glue ETL jobs in sequence and handle complex job dependencies.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Implement the workflow by using AWS Step Functions. Configure Step Functions to coordinate the AWS Glue ETL jobs and handle error conditions with automatic retries..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue workflows to create a graph of the ETL tasks that visually represents the dependencies between jobs and the job triggers.
- **C**: tidak memenuhi constraint utama soal — Provision an always on Amazon EC2 instance. Create a cron job that invokes the AWS Glue ETL jobs in sequence based on a predefined scheduleю
- **D**: tidak memenuhi constraint utama soal — Use Amazon EventBridge rules to invoke the AWS Glue ETL jobs based on S3 object creation events. Configure the rules to chain the AWS Glue ETL jobs in sequen...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401556-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-329-discussion/

---

## Q79. [examtopics] #330
*App id: `LOC-079`*

Question #: 330 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A media company uploads large video files to Amazon S3 for processing. After processing, the company needs to keep the original files for 90 days in case the files require reprocessing. After 90 days, the company can delete the files to reduce storage costs. The company stores the processed videos in a different S3 bucket. Which S3 Lifecycle configuration will meet these requirements for the original files MOST cost-effectively?

- A. Store the files in S3 Standard for 90 days. Transition the files to S3 Glacier Flexible Retrieval for long-term storage. Then expire the files.
- B. Store the files in S3 Standard for 90 days. Enable versioning. Enable Object Lock on the files for 90 days. Then expire the files.
- C. Store the files in S3 Standard for 90 days. Implement S3 Lifecycle management to expire the files.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Store the files in S3 Standard for 90 days. Implement S3 Lifecycle management to expire the files..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Store the files in S3 Standard for 90 days. Transition the files to S3 Glacier Flexible Retrieval for long-term storage. Then expire the files.
- **B**: tidak memenuhi constraint utama soal — Store the files in S3 Standard for 90 days. Enable versioning. Enable Object Lock on the files for 90 days. Then expire the files.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401557-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-330-discussion/

---

## Q80. [examtopics] #331
*App id: `LOC-080`*

Question #: 331 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A university is developing an educational application that analyzes student essays. The application provides personalized feedback with accurate citations to the university's textbooks. The application needs to process essays in multiple languages. Application responses must include direct references to specific sections in the course materials and must be in the student’s selected language. Which solution will meet these requirements with the LEAST operational overhead?

- A. Build a custom vector database by using Amazon OpenSearch Serverless. Store textbook content as multilingual embeddings. Create an AWS Lambda function that queues the database when generating responses with Amazon Bedrock.
- B. Create a knowledge base in Amazon Bedrock Knowledge Bases with the university’s textbooks. Configure a multilingual model to generate responses with source citations.
- C. Use Amazon Comprehend to detect the language and key topics in the essays. Use Amazon Kendra to search for relevant textbook passages. Create an AWS Lambda function that formats the textbook passages into feedback.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon Comprehend to detect the language and key topics in the essays. Use Amazon Kendra to search for relevant textbook passages. Create an AWS Lambda function that formats the textbook passages into feedback..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Build a custom vector database by using Amazon OpenSearch Serverless. Store textbook content as multilingual embeddings. Create an AWS Lambda function that q...
- **B**: tidak memenuhi constraint utama soal — Create a knowledge base in Amazon Bedrock Knowledge Bases with the university’s textbooks. Configure a multilingual model to generate responses with source c...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401558-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-331-discussion/

---

## Q81. [examtopics] #332
*App id: `LOC-081`*

Question #: 332 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company needs a solution that restricts access to Amazon S3 data and encrypts the data by using AWS managed keys. The solution must manage database credentials that an AWS Lambda function uses and must rotate the credentials automatically. Which solution will meet these requirements?

- A. Use S3 bucket policies to control access. Use server-side encryption with Amazon S3 managed keys (SSE-S3) to encrypt the data. Store the database credentials as Lambda environment variables.
- B. Use IAM policies to control access. Use server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the data. Configure AWS Secrets Manager to store and automatically rotate the credentials by using a Lambda function.
- C. Use S3 ACLs to control access. Use server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the data. Store the credentials in AWS Systems Manager Parameter Store and automatically rotate the credentials by using a Lambda function.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use IAM policies to control access. Use server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the data. Configure AWS Secrets Manager to store and automatically rotate the credentials by using a Lambda function..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use S3 bucket policies to control access. Use server-side encryption with Amazon S3 managed keys (SSE-S3) to encrypt the data. Store the database credentials...
- **C**: tidak memenuhi constraint utama soal — Use S3 ACLs to control access. Use server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the data. Store the credentials in AWS Systems Manager Param...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401559-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-332-discussion/

---

## Q82. [examtopics] #335
*App id: `LOC-082`*

Question #: 335 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company aggregates high-frequency sensor telemetry into an Amazon S3 data lake. Each sensor stream emits structured records every hour. The records include metadata such as sensor category, unit ID, operational state, event timestamp, and site location. The data scales up to millions of records each day. The company runs complex queries each day to uncover performance insights specific to sensor categories. Which solution will meet these requirements with the FASTEST query execution time?

- A. **A:** Persist the data in Apache ORC format. Partition the data by date. Sort the data by sensor category.
- B. **B:** Persist the data in CSV format. Partition the data by date. Sort the data by operational status.
- C. **C:** Persist the data in Parquet format. Partition the data by sensor category. Sort the data by date

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Persist the data in Apache ORC format. Partition the data by date. Sort the data by sensor category.
- **B**: **B:** Persist the data in CSV format. Partition the data by date. Sort the data by operational status.
- **C**: **C:** Persist the data in Parquet format. Partition the data by sensor category. Sort the data by date
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401562-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-335-discussion/

---

## Q83. [examtopics] #336
*App id: `LOC-083`*

Question #: 336 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses Amazon Redshift to store order transactions from the current day. The company has an orders table that contains the previous order data. The company also has a staging table that contains new or updated order records. The company needs to remove stale records from the orders table and insert the most recent data in the orders table from the staging table. Several downstream applications need the orders table to display up-to-date information. Which solution will meet these requirements?

- A. **A:** Use Amazon Redshift Spectrum to delete stale records from the orders table and insert records from the staging table into the orders table.
- B. **B:** Unload the orders table and the staging table to Amazon S3. Delete stale orders table data and insert new staging table data in Amazon S3 by using Amazon Athena. Copy the orders S3 table to the orders Amazon Redshift table.
- C. **C:** Use Amazon Athena federated queries to read stale records from the orders table. Delete the stale records and insert the records from the staging table into the orders table.

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Use Amazon Redshift Spectrum to delete stale records from the orders table and insert records from the staging table into the orders table.
- **B**: **B:** Unload the orders table and the staging table to Amazon S3. Delete stale orders table data and insert new staging table data in Amazon S3 by using Amazon Athena. Copy the orders S3 table to the orders Amazon Redshift table.
- **C**: **C:** Use Amazon Athena federated queries to read stale records from the orders table. Delete the stale records and insert the records from the staging table into the orders table.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401563-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-336-discussion/

---

## Q84. [examtopics] #337
*App id: `LOC-084`*

Question #: 337 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company is developing a log streaming pipeline that uses Amazon Data Firehose. The pipeline streams Amazon CloudWatch Logs data to an Amazon S3 bucket. The company's analytics team needs to use the data in audits. The pipeline must deliver only the relevant logs to the S3 bucket in a compatible format for the team's analysis. Which solution will meet these requirements and maintain reliable performance?

- A. **A:** Set the S3 bucket rules to allow logs from only specific timestamp ranges. Create an AWS Lambda function that converts the log files to the desired format. Use an S3 trigger to invoke the Lambda function.
- B. **B:** Create a subscription filter in the CloudWatch Logs log group that uses the Firehose delivery stream as the destination. Create an AWS Lambda function that converts the log files to the desired format. Configure Firehose to invoke the Lambda function.
- C. **C:** Create a subscription filter in the CloudWatch Logs log group. Configure the filter to monitor the Firehose stream. Create an AWS Lambda function to convert the log files to the desired format. Configure Firehose to invoke the Lambda function.

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Set the S3 bucket rules to allow logs from only specific timestamp ranges. Create an AWS Lambda function that converts the log files to the desired format. Use an S3 trigger to invoke the Lambda function.
- **B**: **B:** Create a subscription filter in the CloudWatch Logs log group that uses the Firehose delivery stream as the destination. Create an AWS Lambda function that converts the log files to the desired format. Configure Firehose to invoke the Lambda function.
- **C**: **C:** Create a subscription filter in the CloudWatch Logs log group. Configure the filter to monitor the Firehose stream. Create an AWS Lambda function to convert the log files to the desired format. Configure Firehose to invoke the Lambda function.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401564-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-337-discussion/

---

## Q85. [examtopics] #338
*App id: `LOC-085`*

Question #: 338 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A media company wants to build a real-time analytics pipeline to process customer activity events across the company's website and mobile app. The company wants to build a solution to ingest millions of events with minimum latency. The solution must be scalable and durable enough so that no data is lost. Which solution will meet these requirements in the MOST cost-effective way?

- A. **A:** Set up an Amazon Kinesis Data Streams pipeline to ingest data, process the data by using AWS Lambda functions, and store the results in Amazon Redshift for analytics.
- B. **B:** Schedule an AWS Glue job to fetch user interaction logs every 10 minutes from Amazon S3. Configure the AWS Glue job to transform and store the data in Amazon Redshift for analytics.
- C. **C:** Configure Amazon S3 Event Notifications to invoke an AWS Lambda function to process every new interaction log file. Store the result in Amazon Redshift for analytics.

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Set up an Amazon Kinesis Data Streams pipeline to ingest data, process the data by using AWS Lambda functions, and store the results in Amazon Redshift for analytics.
- **B**: **B:** Schedule an AWS Glue job to fetch user interaction logs every 10 minutes from Amazon S3. Configure the AWS Glue job to transform and store the data in Amazon Redshift for analytics.
- **C**: **C:** Configure Amazon S3 Event Notifications to invoke an AWS Lambda function to process every new interaction log file. Store the result in Amazon Redshift for analytics.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401565-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-338-discussion/

---

## Q86. [examtopics] #339
*App id: `LOC-086`*

Question #: 339 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company stores a large dataset in an Amazon S3 bucket. A data engineer frequently runs complex queries on the dataset by using Amazon Athena. The data engineer needs to optimize query performance and optimize costs for queries that are run multiple times with the same parameters. Which solution will meet these requirements?

- A. **A:** Convert the dataset to JSON format before running Athena queries.
- B. **B:** Use Amazon EMR to pre-process the data before running Athena queries.
- C. **C:** Configure query result reuse settings in the Athena workgroup.

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Convert the dataset to JSON format before running Athena queries.
- **B**: **B:** Use Amazon EMR to pre-process the data before running Athena queries.
- **C**: **C:** Configure query result reuse settings in the Athena workgroup.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401566-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-339-discussion/

---

## Q87. [examtopics] #340
*App id: `LOC-087`*

Question #: 340 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company stores raw clickstream data in an Amazon S3 bucket. The company needs a solution to process the data every day by using complex PySpark transformations that rely on custom internal libraries. After the data is transformed, the company must store the data in Amazon Redshift for analytics. The solution must be highly scalable to handle large data workloads. Which solution will meet these requirements with the LEAST operational overhead?

- A. Use AWS Glue Studio to build and schedule PySpark jobs. Configure an AWS Glue data connection that includes the custom libraries.
- B. Use Amazon EC2 Auto Scaling groups with a custom AMI that contains the custom libraries to run a PySpark application.
- C. Use Amazon EMR to run PySpark jobs. Use bootstrap actions to install the custom libraries

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon EMR to run PySpark jobs. Use bootstrap actions to install the custom libraries.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Glue Studio to build and schedule PySpark jobs. Configure an AWS Glue data connection that includes the custom libraries.
- **B**: tidak memenuhi constraint utama soal — Use Amazon EC2 Auto Scaling groups with a custom AMI that contains the custom libraries to run a PySpark application.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401567-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-340-discussion/

---

## Q88. [examtopics] #341
*App id: `LOC-088`*

Question #: 341 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] An application uses an AWS Lambda function that is configured with managed runtimes. The Lambda function successfully writes logs to the default Amazon CloudWatch Logs log group. A data engineer wants to modify the logging behavior to show only ERROR level logs for application logs and WARN level logs for system logs. Which solution will meet these requirements?

- A. Add additional permissions to the Lambda execution role.
- B. Set the log level to ERROR in the Lambda function code.
- C. Configure the Lambda function to use the JSON log format.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Configure the Lambda function to use the JSON log format..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Add additional permissions to the Lambda execution role.
- **B**: tidak memenuhi constraint utama soal — Set the log level to ERROR in the Lambda function code.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/401568-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-341-discussion/

---

## Q89. [examtopics] #342
*App id: `LOC-089`*

Question #: 342 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses AWS Step Functions to orchestrate a data pipeline. The company has configured the Step Functions logs to push to Amazon CloudWatch Logs when the log level is FATAL The company has enabled logs for all AWS services in the pipeline. A state named "preprocessing" invokes an AWS Lambda function named "preprocessing." The Lambda function preprocesses data before proceeding to the next state. The company needs to find error details if an error occurs during the data preprocessing. Which CloudWatch Logs log group should the company check to find the error details?

- A. The Step Functions TaskFailed event in the /aws/vendedlogs/states log group
- B. The AWS CloudTrail logs SendTaskFailure event in the CloudTrail/logs/preprocessing log group
- C. The Lambda logs in the laws/lambda/preprocessing log group

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: The Lambda logs in the laws/lambda/preprocessing log group.
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The Step Functions TaskFailed event in the /aws/vendedlogs/states log group
- **B**: tidak memenuhi constraint utama soal — The AWS CloudTrail logs SendTaskFailure event in the CloudTrail/logs/preprocessing log group
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406573-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-342-discussion/

---

## Q90. [examtopics] #345
*App id: `LOC-090`*

Question #: 345 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs to design a data pipeline that invokes an AWS Glue job. After the AWS Glue job finishes successfully, the pipeline needs to invoke three AWS Lambda functions. The pipeline must be serverless. The data engineer wants to see the entire pipeline lineage in a single interface. Which solution will meet these requirements?

- A. **A:** Configure a workflow in AWS Step Functions that invokes the AWS Glue job and the Lambda functions. View the lineage in Step Functions Workflow Studio.
- B. **B:** Deploy an Apache Airflow workflow that invokes the AWS Glue job and the Lambda functions. View the lineage in the Airflow UI.
- C. **C:** Build the pipeline in the AWS Glue job. Invoke the Lambda functions after the AWS Glue job runs. Use Amazon CloudWatch Logs Insights to view the lineage.

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Configure a workflow in AWS Step Functions that invokes the AWS Glue job and the Lambda functions. View the lineage in Step Functions Workflow Studio.
- **B**: **B:** Deploy an Apache Airflow workflow that invokes the AWS Glue job and the Lambda functions. View the lineage in the Airflow UI.
- **C**: **C:** Build the pipeline in the AWS Glue job. Invoke the Lambda functions after the AWS Glue job runs. Use Amazon CloudWatch Logs Insights to view the lineage.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406576-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-345-discussion/

---

## Q91. [examtopics] #346
*App id: `LOC-091`*

Question #: 346 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A manufacturing company is setting up an IoT monitoring system that generates large, complex data streams. The company wants to store the data in an Amazon S3 data lake for real-time and historical analysis. The company needs a solution that can process data quickly, provide short query times, and use resources efficiently without slowing down data ingestion. The solution must use a Spark streaming extract, transform, and load (ETL) job on Amazon EMR that is configured to write data to an Iceberg table. Which solution will meet these requirements?

- A. **A:** Use Amazon Kinesis Data Streams to ingest the data. Configure the Iceberg table with copy on write (CoW) mode. Enable the AWS Glue Data Catalog compaction optimizer.
- B. **B:** Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to ingest the data. Configure the Iceberg table with copy on write (CoW) mode. Schedule an AWS Glue job for compaction to optimize the Iceberg table.
- C. **C:** Use Amazon Kinesis Data Streams to ingest the data. Configure the Iceberg table with merge on read (MoR) mode. Enable the AWS Glue Data Catalog compaction optimizer.

**Answer:** ABC

**Pembahasan:** Jawaban yang tepat adalah **ABC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: **A:** Use Amazon Kinesis Data Streams to ingest the data. Configure the Iceberg table with copy on write (CoW) mode. Enable the AWS Glue Data Catalog compaction optimizer.
- **B**: **B:** Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to ingest the data. Configure the Iceberg table with copy on write (CoW) mode. Schedule an AWS Glue job for compaction to optimize the Iceberg table.
- **C**: **C:** Use Amazon Kinesis Data Streams to ingest the data. Configure the Iceberg table with merge on read (MoR) mode. Enable the AWS Glue Data Catalog compaction optimizer.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406577-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-346-discussion/

---

## Q92. [examtopics] #347
*App id: `LOC-092`*

Question #: 347 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A media streaming company is moving its application to AWS. The company wants to avoid data quality issues in user engagement analytics. The company needs to be able to reprocess several days of historical data without duplicates and without interrupting current real-time processing. Which solution will meet these requirements?

- A. Configure Amazon Kinesis Data Streams with extended retention. Implement idempotent consumers with Amazon DynamoDB checkpointing. Use separate processing paths for replay data and real-time data.
- B. Configure Amazon Kinesis Data Streams with standard retention. Implement idempotent consumers with Amazon RDS checkpointing. Use separate processing paths with conditional logic for replay data and real-time data.
- C. Configure Amazon Kinesis Data Streams with standard retention. Implement idempotent consumers with Amazon DynamoDB checkpointing. Use shared processing paths with conditional logic for replay data and real-time data.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Configure Amazon Kinesis Data Streams with extended retention. Implement idempotent consumers with Amazon DynamoDB checkpointing. Use separate processing paths for replay data and real-time data..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Configure Amazon Kinesis Data Streams with standard retention. Implement idempotent consumers with Amazon RDS checkpointing. Use separate processing paths wi...
- **C**: tidak memenuhi constraint utama soal — Configure Amazon Kinesis Data Streams with standard retention. Implement idempotent consumers with Amazon DynamoDB checkpointing. Use shared processing paths...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406578-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-347-discussion/

---

## Q93. [examtopics] #349
*App id: `LOC-093`*

Question #: 349 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company uses Amazon SageMaker AI for its machine learning (ML) workflows. The company is organized into several project groups that use sensitive data. The company needs to give the project groups the ability to discover available datasets across different AWS accounts. The solution must maintain access controls and track all data access for compliance purposes. Which solution will meet these requirements with the LEAST operational overhead?

- A. The company needs to give the project groups the ability to discover available datasets across different AWS accounts. The solution must maintain access controls and track all data access for compliance purposes. Which solution will meet these requirements with the LEAST operational overhead? A. Use Amazon SageMaker Assets to publish, discover, and request access to datasets through the asset catalog with approval workflows that track data access.
- B. Set up Amazon SageMaker Feature Store with cross-account access policies to automatically share data between AWS accounts without requiring approval workflows.
- C. Set up IAM roles for each project group with permissions to access all datasets across all AWS accounts. Use AWS CloudTrail to record data access activity.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: The company needs to give the project groups the ability to discover available datasets across different AWS accounts. The solution must maintain access controls and track all data access for compliance purposes. Which solution will meet these requirements with the LEAST operational overhead? A. Use Amazon SageMaker Assets to publish, discover, and request access to datasets through the asset catalog with approval workflows that track data access..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Set up Amazon SageMaker Feature Store with cross-account access policies to automatically share data between AWS accounts without requiring approval workflows.
- **C**: tidak memenuhi constraint utama soal — Set up IAM roles for each project group with permissions to access all datasets across all AWS accounts. Use AWS CloudTrail to record data access activity.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406580-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-349-discussion/

---

## Q94. [examtopics] #350
*App id: `LOC-094`*

Question #: 350 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company has an application that is deployed on AWS. The application uses Amazon Simple Notification Service (Amazon SNS) with multiple topics. The company's security team needs to be able to audit all Publish and PublishBatch API actions for all the SNS topics. The company's application team and security team must also be able to query the audit data. The company has already established an event data store in AWS CloudTrail Lake to collect all events. Which solution will meet these requirements with the LEAST operational overhead?

- A. The company has already established an event data store in AWS CloudTrail Lake to collect all events. Which solution will meet these requirements with the LEAST operational overhead? A. Enable management events for the SNS topics. Create a table in AWS Glue Data Catalog. Query the data by using Amazon Athena.
- B. Enable management events for the SNS topics. Use CloudTrail Lake to query the audit data.
- C. Enable data events for the SNS topics. Use CloudTrail Lake to query the audit data.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Enable data events for the SNS topics. Use CloudTrail Lake to query the audit data..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The company has already established an event data store in AWS CloudTrail Lake to collect all events. Which solution will meet these requirements with the LE...
- **B**: tidak memenuhi constraint utama soal — Enable management events for the SNS topics. Use CloudTrail Lake to query the audit data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406581-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-350-discussion/

---

## Q95. [examtopics] #351
*App id: `LOC-095`*

Question #: 351 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs to validate the quality of files that are uploaded to an Amazon S3 bucket every day. The files are in CSV and JSON formats and schema variations exist. The data engineer needs a repeatable process to monitor data quality metrics such as null values, format inconsistencies, and outliers. The process must provide reusable rule-based profiling and scale across multiple datasets with minimal manual effort or custom code. Which solution will meet these requirements?

- A. Use AWS Glue Studio to create a daily extract, transform, and load (ETL) pipeline that merges datasets and applies validation logic by using PySpark transformations.
- B. Use AWS Glue extract, transform, and load (ETL) jobs with dynamic frames and the ResolveChoice class to align schemas and detect structural differences between files.
- C. Use AWS Glue DataBrew to configure profiling jobs and reusable recipe actions. Schedule the profiling jobs and reusable recipe actions to run against each dataset in Amazon S3.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use AWS Glue DataBrew to configure profiling jobs and reusable recipe actions. Schedule the profiling jobs and reusable recipe actions to run against each dataset in Amazon S3..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Glue Studio to create a daily extract, transform, and load (ETL) pipeline that merges datasets and applies validation logic by using PySpark transfor...
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue extract, transform, and load (ETL) jobs with dynamic frames and the ResolveChoice class to align schemas and detect structural differences betwe...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406582-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-351-discussion/

---

## Q96. [examtopics] #352
*App id: `LOC-096`*

Question #: 352 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company needs a solution to process streaming data by using Apache Spark in a Kubernetes environment. The solution must support event-driven scaling and optimize resource utilization. The company needs to integrate the solution with existing Kubernetes infrastructure deployed on Amazon Elastic Kubernetes Service (Amazon EKS). Which solution will meet these requirements with the LEAST operational overhead?

- A. Deploy self-managed Apache Spark on Amazon EKS by using custom auto-scaling policies based on Kubernetes Event-Driven Autoscaling (KEDA) operators.
- B. Use Amazon EMR on Amazon EKS with Kubernetes Event-Driven Autoscaling (KEDA) for event-driven scaling of Spark applications.
- C. Use Amazon EMR on Amazon EKS with the Kubernetes Cluster Autoscaler to scale Spark applications based on metrics events generated by the Kubernetes Metrics Server.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use Amazon EMR on Amazon EKS with Kubernetes Event-Driven Autoscaling (KEDA) for event-driven scaling of Spark applications..
Konteks layanan terkait:
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Deploy self-managed Apache Spark on Amazon EKS by using custom auto-scaling policies based on Kubernetes Event-Driven Autoscaling (KEDA) operators.
- **C**: tidak memenuhi constraint utama soal — Use Amazon EMR on Amazon EKS with the Kubernetes Cluster Autoscaler to scale Spark applications based on metrics events generated by the Kubernetes Metrics S...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406583-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-352-discussion/

---

## Q97. [examtopics] #353
*App id: `LOC-097`*

Question #: 353 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A legal company is building a data pipeline to power an application that will handle peak traffic during business hours. The application will provide information about relevant laws and available lawyers. The legal document database will be updated one time each day. The application must display up-to-date lawyer availability from a calendar database and provide complex full-text search of legal documents. The company wants to use AWS Glue for extract, transform, and load (ETL) processes. Lawyer availability information must be current within 5 minutes of any schedule changes. Which solution will meet these requirements with the LEAST operational overhead?

- A. Use AWS Step Functions to orchestrate AWS Glue jobs with time-based triggers and event-based triggers. Store processed data in Amazon S3. Use Amazon RDS for the search functionality.
- B. Use AWS Step Functions to orchestrate AWS Glue jobs with time-based triggers and event-based triggers. Store processed data in Amazon S3. Use Amazon OpenSearch Service for full-text search capabilities.
- C. Use AWS Glue workflows with time-based triggers and event-based triggers. Store processed data in Amazon DynamoDB. Create a custom search solution by using AWS Lambda functions.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use AWS Step Functions to orchestrate AWS Glue jobs with time-based triggers and event-based triggers. Store processed data in Amazon S3. Use Amazon OpenSearch Service for full-text search capabilities..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Step Functions to orchestrate AWS Glue jobs with time-based triggers and event-based triggers. Store processed data in Amazon S3. Use Amazon RDS for ...
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue workflows with time-based triggers and event-based triggers. Store processed data in Amazon DynamoDB. Create a custom search solution by using A...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406584-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-353-discussion/

---

## Q98. [examtopics] #354
*App id: `LOC-098`*

Question #: 354 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineer needs to deploy a serverless data pipeline. In the pipeline, CSV files are uploaded to an Amazon S3 bucket, which invokes an AWS Lambda function. The Lambda function transforms the CSV files to JSON format and stores the results in a second S3 bucket. The data engineer has created an AWS Serverless Application Model (AWS SAM) template that includes the Lambda function. The data engineer wants to use AWS SAM for the pipeline deployment. Which solution will package and deploy this serverless data pipeline?

- A. Add the first S3 bucket and the S3 event source for the Lambda function to the SAM template. Run the sam build command to prepare the deployment package. Run the sam deploy --guided command to deploy the pipeline.
- B. Run the sam deploy command directly with the --s3-bucket parameter to deploy the Lambda function code. Manually configure the S3 event trigger in the AWS Management Console.
- C. Add the first S3 bucket to the SAM template. Run the sam package template to upload the Lambda function code to Amazon S3. Create an AWS CloudFormation stack from the packaged template. Configure event notifications manually.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Add the first S3 bucket and the S3 event source for the Lambda function to the SAM template. Run the sam build command to prepare the deployment package. Run the sam deploy --guided command to deploy the pipeline..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Run the sam deploy command directly with the --s3-bucket parameter to deploy the Lambda function code. Manually configure the S3 event trigger in the AWS Man...
- **C**: tidak memenuhi constraint utama soal — Add the first S3 bucket to the SAM template. Run the sam package template to upload the Lambda function code to Amazon S3. Create an AWS CloudFormation stack...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406489-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-354-discussion/

---

## Q99. [examtopics] #355
*App id: `LOC-099`*

Question #: 355 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company stores objects in an Amazon S3 bucket. The company crawls the objects so that Amazon Athena can query the data. A data engineer manually moved all objects from the partition with a path prefix of status=01 to the prefix status=02. The status=01 partition location is now empty. However, the status=01 partition location still appears in the AWS Glue Data Catalog metadata. Which Athena command should the data engineer run to resolve the metadata discrepancy?

- A. A data engineer manually moved all objects from the partition with a path prefix of status=01 to the prefix status=02. The status=01 partition location is now empty. However, the status=01 partition location still appears in the AWS Glue Data Catalog metadata. Which Athena command should the data engineer run to resolve the metadata discrepancy? A. MSCK REPAIR TABLE
- B. ALTER TABLE DROP PARTITION
- C. ALTER TABLE SET TBLPROPERTIES

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: ALTER TABLE DROP PARTITION.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — A data engineer manually moved all objects from the partition with a path prefix of status=01 to the prefix status=02. The status=01 partition location is no...
- **C**: tidak memenuhi constraint utama soal — ALTER TABLE SET TBLPROPERTIES
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/406490-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-355-discussion/

---

## Q100. [examtopics] #358
*App id: `LOC-100`*

Question #: 358 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A data engineering team needs to deploy an AWS CloudFormation template for its data pipeline across development, testing, and production AWS accounts. The team requires a solution that automatically updates deployments when changes are committed to the team’s Git repository. The solution must also provide centralized management across all accounts. Which solution will meet these requirements with the LEAST operational overhead?

- A. Create individual CloudFormation stacks in each account with self-managed permissions. Use AWS CodePipeline with webhooks to detect Git commits and update stacks.
- B. Use CloudFormation StackSets with service-managed permissions. Enable automatic deployments to target accounts by using an AWS Organizations integration.
- C. Set up an AWS Lambda function that is invoked by Git commits. Configure the Lambda function to use the CloudFormation API to update stacks in each account.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use CloudFormation StackSets with service-managed permissions. Enable automatic deployments to target accounts by using an AWS Organizations integration..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create individual CloudFormation stacks in each account with self-managed permissions. Use AWS CodePipeline with webhooks to detect Git commits and update st...
- **C**: tidak memenuhi constraint utama soal — Set up an AWS Lambda function that is invoked by Git commits. Configure the Lambda function to use the CloudFormation API to update stacks in each account.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/417368-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-358-discussion/

---

## Q101. [examtopics] #362
*App id: `LOC-101`*

Question #: 362 Topic #: 1 [All AWS Certified Data Engineer - Associate DEA-C01 Questions] A company has text files that are stored in an Amazon S3 bucket. The structure of the files can change over time as the company adds new columns to the files. The company wants to give users the ability to query the data by using Amazon Athena and Amazon Quick Suite (previously known as Amazon QuickSight). The company wants to use predefined column names for the data in the text files. Which solution will meet these requirements with the LEAST operational overhead?

- A. Create a table in Athena that points to the S3 location and uses the predefined column names. Use the table in Athena and Quick Suite. Update the table when the company adds new columns.
- B. Write a custom grok classifier to match the predefined column names and schema. Create an AWS Glue crawler that uses the grok classifier and creates a table. Use the table in Athena and Quick Suite. Run the crawler when the company adds new columns.
- C. Use the built-in classifier in AWS Glue. Create an AWS Glue crawler that creates a table. Use the table in Athena and Quick Suite. Run the crawler when the company adds new columns.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use the built-in classifier in AWS Glue. Create an AWS Glue crawler that creates a table. Use the table in Athena and Quick Suite. Run the crawler when the company adds new columns..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a table in Athena that points to the S3 location and uses the predefined column names. Use the table in Athena and Quick Suite. Update the table when ...
- **B**: tidak memenuhi constraint utama soal — Write a custom grok classifier to match the predefined column names and schema. Create an AWS Glue crawler that uses the grok classifier and creates a table....
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/417381-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-362-discussion/

---

## Q102. [github_examtopics_cache]
*App id: `LOC-102`*

A banking company uses an application to collect large volumes of transactional data. The company uses Amazon Kinesis Data Streams for real-time analytics. The company’s application uses the PutRecord action to send data to Kinesis Data Streams.

A data engineer has observed network outages during certain times of day. The data engineer wants to configure exactly-once delivery for the entire processing pipeline.

Which solution will meet this requirement?

- A. Design the application so it can remove duplicates during processing by embedding a unique ID in each record at the source.
- B. Update the checkpoint configuration of the Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) data collection application to avoid duplicate processing of events.
- C. Design the data source so events are not ingested into Kinesis Data Streams multiple times.
- D. Stop using Kinesis Data Streams. Use Amazon EMR instead. Use Apache Flink and Apache Spark Streaming in Amazon EMR.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Design the application so it can remove duplicates during processing by embedding a unique ID in each record at the source..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Update the checkpoint configuration of the Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) data collection applic...
- **C**: tidak memenuhi constraint utama soal — Design the data source so events are not ingested into Kinesis Data Streams multiple times.
- **D**: tidak memenuhi constraint utama soal — Stop using Kinesis Data Streams. Use Amazon EMR instead. Use Apache Flink and Apache Spark Streaming in Amazon EMR.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143062-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q103. [github_examtopics_cache]
*App id: `LOC-103`*

A car sales company maintains data about cars that are listed for sale in an area. The company receives data about new car listings from vendors who upload the data daily as compressed files into Amazon S3. The compressed files are up to 5 KB in size. The company wants to see the most up-to-date listings as soon as the data is uploaded to Amazon S3.

A data engineer must automate and orchestrate the data processing workflow of the listings to feed a dashboard. The data engineer must also provide the ability to perform one-time queries and analytical reporting. The query solution must be scalable.

Which solution will meet these requirements MOST cost-effectively?

- A. Use an Amazon EMR cluster to process incoming data. Use AWS Step Functions to orchestrate workflows. Use Apache Hive for one-time queries and analytical reporting. Use Amazon OpenSearch Service to bulk ingest the data into compute optimized instances. Use OpenSearch Dashboards in OpenSearch Service for the dashboard.
- B. Use a provisioned Amazon EMR cluster to process incoming data. Use AWS Step Functions to orchestrate workflows. Use Amazon Athena for one-time queries and analytical reporting. Use Amazon QuickSight for the dashboard.
- C. Use AWS Glue to process incoming data. Use AWS Step Functions to orchestrate workflows. Use Amazon Redshift Spectrum for one-time queries and analytical reporting. Use OpenSearch Dashboards in Amazon OpenSearch Service for the dashboard.
- D. Use AWS Glue to process incoming data. Use AWS Lambda and S3 Event Notifications to orchestrate workflows. Use Amazon Athena for one-time queries and analytical reporting. Use Amazon QuickSight for the dashboard.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use AWS Glue to process incoming data. Use AWS Lambda and S3 Event Notifications to orchestrate workflows. Use Amazon Athena for one-time queries and analytical reporting. Use Amazon QuickSight for the dashboard..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use an Amazon EMR cluster to process incoming data. Use AWS Step Functions to orchestrate workflows. Use Apache Hive for one-time queries and analytical repo...
- **B**: tidak memenuhi constraint utama soal — Use a provisioned Amazon EMR cluster to process incoming data. Use AWS Step Functions to orchestrate workflows. Use Amazon Athena for one-time queries and an...
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue to process incoming data. Use AWS Step Functions to orchestrate workflows. Use Amazon Redshift Spectrum for one-time queries and analytical repo...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151942-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q104. [github_examtopics_cache]
*App id: `LOC-104`*

A company analyzes data in a data lake every quarter to perform inventory assessments. A data engineer uses AWS Glue DataBrew to detect any personally identifiable formation (PII) about customers within the data. The company's privacy policy considers some custom categories of information to be PII. However, the categories are not included in standard DataBrew data quality rules.

The data engineer needs to modify the current process to scan for the custom PII categories across multiple datasets within the data lake.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Manually review the data for custom PII categories.
- B. Implement custom data quality rules in DataBrew. Apply the custom rules across datasets.
- C. Develop custom Python scripts to detect the custom PII categories. Call the scripts from DataBrew.
- D. Implement regex patterns to extract PII information from fields during extract transform, and load (ETL) operations into the data lake.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Implement custom data quality rules in DataBrew. Apply the custom rules across datasets..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Manually review the data for custom PII categories.
- **C**: tidak memenuhi constraint utama soal — Develop custom Python scripts to detect the custom PII categories. Call the scripts from DataBrew.
- **D**: tidak memenuhi constraint utama soal — Implement regex patterns to extract PII information from fields during extract transform, and load (ETL) operations into the data lake.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151939-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q105. [github_examtopics_cache]
*App id: `LOC-105`*

A company currently stores all of its data in Amazon S3 by using the S3 Standard storage class.
A data engineer examined data access patterns to identify trends. During the first 6 months, most data files are accessed several times each day. Between 6 months and 2 years, most data files are accessed once or twice each month. After 2 years, data files are accessed only once or twice each year.
The data engineer needs to use an S3 Lifecycle policy to develop new data storage rules. The new storage solution must continue to provide high availability.
Which solution will meet these requirements in the MOST cost-effective way?

- A. Transition objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 6 months. Transfer objects to S3 Glacier Flexible Retrieval after 2 years.
- B. Transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 6 months. Transfer objects to S3 Glacier Flexible Retrieval after 2 years.
- C. Transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 6 months. Transfer objects to S3 Glacier Deep Archive after 2 years.
- D. Transition objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 6 months. Transfer objects to S3 Glacier Deep Archive after 2 years.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 6 months. Transfer objects to S3 Glacier Deep Archive after 2 years..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Transition objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 6 months. Transfer objects to S3 Glacier Flexible Retrieval after 2 years.
- **B**: tidak memenuhi constraint utama soal — Transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 6 months. Transfer objects to S3 Glacier Flexible Retrieval after 2 years.
- **D**: tidak memenuhi constraint utama soal — Transition objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) after 6 months. Transfer objects to S3 Glacier Deep Archive after 2 years.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132654-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q106. [github_examtopics_cache]
*App id: `LOC-106`*

A company currently uses a provisioned Amazon EMR cluster that includes general purpose Amazon EC2 instances. The EMR cluster uses EMR managed scaling between one to five task nodes for the company’s long-running Apache Spark extract, transform, and load (ETL) job. The company runs the ETL job every day.

When the company runs the ETL job, the EMR cluster quickly scales up to five nodes. The EMR cluster often reaches maximum CPU usage, but the memory usage remains under 30%.

The company wants to modify the EMR cluster configuration to reduce the EMR costs to run the daily ETL job.

Which solution will meet these requirements MOST cost-effectively?

- A. Increase the maximum number of task nodes for EMR managed scaling to 10.
- B. Change the task node type from general purpose EC2 instances to memory optimized EC2 instances.
- C. Switch the task node type from general purpose Re instances to compute optimized EC2 instances.
- D. Reduce the scaling cooldown period for the provisioned EMR cluster.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Switch the task node type from general purpose Re instances to compute optimized EC2 instances..
Konteks layanan terkait:
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Increase the maximum number of task nodes for EMR managed scaling to 10.
- **B**: tidak memenuhi constraint utama soal — Change the task node type from general purpose EC2 instances to memory optimized EC2 instances.
- **D**: tidak memenuhi constraint utama soal — Reduce the scaling cooldown period for the provisioned EMR cluster.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145106-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q107. [github_examtopics_cache]
*App id: `LOC-107`*

A company extracts approximately 1 TB of data every day from data sources such as SAP HANA, Microsoft SQL Server, MongoDB, Apache Kafka, and Amazon DynamoDB. Some of the data sources have undefined data schemas or data schemas that change.
A data engineer must implement a solution that can detect the schema for these data sources. The solution must extract, transform, and load the data to an Amazon S3 bucket. The company has a service level agreement (SLA) to load the data into the S3 bucket within 15 minutes of data creation.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use Amazon EMR to detect the schema and to extract, transform, and load the data into the S3 bucket. Create a pipeline in Apache Spark.
- B. Use AWS Glue to detect the schema and to extract, transform, and load the data into the S3 bucket. Create a pipeline in Apache Spark.
- C. Create a PySpark program in AWS Lambda to extract, transform, and load the data into the S3 bucket.
- D. Create a stored procedure in Amazon Redshift to detect the schema and to extract, transform, and load the data into a Redshift Spectrum table. Access the table from Amazon S3.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use AWS Glue to detect the schema and to extract, transform, and load the data into the S3 bucket. Create a pipeline in Apache Spark..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon EMR to detect the schema and to extract, transform, and load the data into the S3 bucket. Create a pipeline in Apache Spark.
- **C**: tidak memenuhi constraint utama soal — Create a PySpark program in AWS Lambda to extract, transform, and load the data into the S3 bucket.
- **D**: tidak memenuhi constraint utama soal — Create a stored procedure in Amazon Redshift to detect the schema and to extract, transform, and load the data into a Redshift Spectrum table. Access the tab...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132706-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q108. [github_examtopics_cache]
*App id: `LOC-108`*

A company has AWS resources in multiple AWS Regions. The company has an Amazon EFS file system in each Region where the company operates. The company’s data science team operates within only a single Region. The data that the data science team works with must remain within the team's Region.

A data engineer needs to create a single dataset by processing files that are in each of the company's Regional EFS file systems. The data engineer wants to use an AWS Step Functions state machine to orchestrate AWS Lambda functions to process the data.

Which solution will meet these requirements with the LEAST effort?

- A. Peer the VPCs that host the EFS file systems in each Region with the VPC that is in the data science team’s Region. Enable EFS file locking. Configure the Lambda functions in the data science team's Region to mount each of the Region specific file systems. Use the Lambda functions to process the data.
- B. Configure each of the Regional EFS file systems to replicate data to the data science team's Region. In the data science team’s Region, configure the Lambda functions to mount the replica file systems. Use the Lambda functions to process the data.
- C. Deploy the Lambda functions to each Region. Mount the Regional EFS file systems to the Lambda functions. Use the Lambda functions to process the data. Store the output in an Amazon S3 bucket in the data science team’s Region.
- D. Use AWS DataSync to transfer files from each of the Regional EFS files systems to the file system that is in the data science team's Region. Configure the Lambda functions in the data science team's Region to mount the file system that is in the same Region. Use the Lambda functions to process the data.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use AWS DataSync to transfer files from each of the Regional EFS files systems to the file system that is in the data science team's Region. Configure the Lambda functions in the data science team's Region to mount the file system that is in the same Region. Use the Lambda functions to process the data..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Peer the VPCs that host the EFS file systems in each Region with the VPC that is in the data science team’s Region. Enable EFS file locking. Configure the La...
- **B**: tidak memenuhi constraint utama soal — Configure each of the Regional EFS file systems to replicate data to the data science team's Region. In the data science team’s Region, configure the Lambda ...
- **C**: tidak memenuhi constraint utama soal — Deploy the Lambda functions to each Region. Mount the Regional EFS file systems to the Lambda functions. Use the Lambda functions to process the data. Store ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/152459-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q109. [github_examtopics_cache]
*App id: `LOC-109`*

A company has a business intelligence platform on AWS. The company uses an AWS Storage Gateway Amazon S3 File Gateway to transfer files from the company's on-premises environment to an Amazon S3 bucket.

A data engineer needs to setup a process that will automatically launch an AWS Glue workflow to run a series of AWS Glue jobs when each file transfer finishes successfully.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Determine when the file transfers usually finish based on previous successful file transfers. Set up an Amazon EventBridge scheduled event to initiate the AWS Glue jobs at that time of day.
- B. Set up an Amazon EventBridge event that initiates the AWS Glue workflow after every successful S3 File Gateway file transfer event.
- C. Set up an on-demand AWS Glue workflow so that the data engineer can start the AWS Glue workflow when each file transfer is complete.
- D. Set up an AWS Lambda function that will invoke the AWS Glue Workflow. Set up an event for the creation of an S3 object as a trigger for the Lambda function.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Set up an Amazon EventBridge event that initiates the AWS Glue workflow after every successful S3 File Gateway file transfer event..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Determine when the file transfers usually finish based on previous successful file transfers. Set up an Amazon EventBridge scheduled event to initiate the AW...
- **C**: tidak memenuhi constraint utama soal — Set up an on-demand AWS Glue workflow so that the data engineer can start the AWS Glue workflow when each file transfer is complete.
- **D**: tidak memenuhi constraint utama soal — Set up an AWS Lambda function that will invoke the AWS Glue Workflow. Set up an event for the creation of an S3 object as a trigger for the Lambda function.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142560-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q110. [github_examtopics_cache]
*App id: `LOC-110`*

A company has a data lake in Amazon S3. The company uses AWS Glue to catalog data and AWS Glue Studio to implement data extract, transform, and load (ETL) pipelines.

The company needs to ensure that data quality issues are checked every time the pipelines run. A data engineer must enhance the existing pipelines to evaluate data quality rules based on predefined thresholds.

Which solution will meet these requirements with the LEAST implementation effort?

- A. Add a new transform that is defined by a SQL query to each Glue ETL job. Use the SQL query to implement a ruleset that includes the data quality rules that need to be evaluated.
- B. Add a new Evaluate Data Quality transform to each Glue ETL job. Use Data Quality Definition Language (DQDL) to implement a ruleset that includes the data quality rules that need to be evaluated.
- C. Add a new custom transform to each Glue ETL job. Use the PyDeequ library to implement a ruleset that includes the data quality rules that need to be evaluated.
- D. Add a new custom transform to each Glue ETL job. Use the Great Expectations library to implement a ruleset that includes the data quality rules that need to be evaluated.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Add a new Evaluate Data Quality transform to each Glue ETL job. Use Data Quality Definition Language (DQDL) to implement a ruleset that includes the data quality rules that need to be evaluated..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Add a new transform that is defined by a SQL query to each Glue ETL job. Use the SQL query to implement a ruleset that includes the data quality rules that n...
- **C**: tidak memenuhi constraint utama soal — Add a new custom transform to each Glue ETL job. Use the PyDeequ library to implement a ruleset that includes the data quality rules that need to be evaluated.
- **D**: tidak memenuhi constraint utama soal — Add a new custom transform to each Glue ETL job. Use the Great Expectations library to implement a ruleset that includes the data quality rules that need to ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151925-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q111. [github_examtopics_cache]
*App id: `LOC-111`*

A company has a data lake in Amazon S3. The company collects AWS CloudTrail logs for multiple applications. The company stores the logs in the data lake, catalogs the logs in AWS Glue, and partitions the logs based on the year. The company uses Amazon Athena to analyze the logs.

Recently, customers reported that a query on one of the Athena tables did not return any data. A data engineer must resolve the issue.

Which combination of troubleshooting steps should the data engineer take? (Choose two.)

- A. Confirm that Athena is pointing to the correct Amazon S3 location.
- B. Increase the query timeout duration.
- C. Use the MSCK REPAIR TABLE command.
- D. Restart Athena.
- E. Delete and recreate the problematic Athena table.

**Answer:** AC

**Pembahasan:** Jawaban yang tepat adalah **AC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Confirm that Athena is pointing to the correct Amazon S3 location.
- **C**: Use the MSCK REPAIR TABLE command.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Increase the query timeout duration.
- **D**: tidak memenuhi constraint utama soal — Restart Athena.
- **E**: tidak memenuhi constraint utama soal — Delete and recreate the problematic Athena table.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150586-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q112. [github_examtopics_cache]
*App id: `LOC-112`*

A company has a data lake on AWS. The data lake ingests sources of data from business units. The company uses Amazon Athena for queries. The storage layer is Amazon S3 with an AWS Glue Data Catalog as a metadata repository.

The company wants to make the data available to data scientists and business analysts. However, the company first needs to manage fine-grained, column-level data access for Athena based on the user roles and responsibilities.

Which solution will meet these requirements?

- A. Set up AWS Lake Formation. Define security policy-based rules for the users and applications by IAM role in Lake Formation.
- B. Define an IAM resource-based policy for AWS Glue tables. Attach the same policy to IAM user groups.
- C. Define an IAM identity-based policy for AWS Glue tables. Attach the same policy to IAM roles. Associate the IAM roles with IAM groups that contain the users.
- D. Create a resource share in AWS Resource Access Manager (AWS RAM) to grant access to IAM users.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Set up AWS Lake Formation. Define security policy-based rules for the users and applications by IAM role in Lake Formation..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Define an IAM resource-based policy for AWS Glue tables. Attach the same policy to IAM user groups.
- **C**: tidak memenuhi constraint utama soal — Define an IAM identity-based policy for AWS Glue tables. Attach the same policy to IAM roles. Associate the IAM roles with IAM groups that contain the users.
- **D**: tidak memenuhi constraint utama soal — Create a resource share in AWS Resource Access Manager (AWS RAM) to grant access to IAM users.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142565-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q113. [github_examtopics_cache]
*App id: `LOC-113`*

A company has a data processing pipeline that includes several dozen steps. The data processing pipeline needs to send alerts in real time when a step fails or succeeds. The data processing pipeline uses a combination of Amazon S3 buckets, AWS Lambda functions, and AWS Step Functions state machines.

A data engineer needs to create a solution to monitor the entire pipeline.

Which solution will meet these requirements?

- A. Configure the Step Functions state machines to store notifications in an Amazon S3 bucket when the state machines finish running. Enable S3 event notifications on the S3 bucket.
- B. Configure the AWS Lambda functions to store notifications in an Amazon S3 bucket when the state machines finish running. Enable S3 event notifications on the S3 bucket.
- C. Use AWS CloudTrail to send a message to an Amazon Simple Notification Service (Amazon SNS) topic that sends notifications when a state machine fails to run or succeeds to run.
- D. Configure an Amazon EventBridge rule to react when the execution status of a state machine changes. Configure the rule to send a message to an Amazon Simple Notification Service (Amazon SNS) topic that sends notifications.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Configure an Amazon EventBridge rule to react when the execution status of a state machine changes. Configure the rule to send a message to an Amazon Simple Notification Service (Amazon SNS) topic that sends notifications..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Configure the Step Functions state machines to store notifications in an Amazon S3 bucket when the state machines finish running. Enable S3 event notificatio...
- **B**: tidak memenuhi constraint utama soal — Configure the AWS Lambda functions to store notifications in an Amazon S3 bucket when the state machines finish running. Enable S3 event notifications on the...
- **C**: tidak memenuhi constraint utama soal — Use AWS CloudTrail to send a message to an Amazon Simple Notification Service (Amazon SNS) topic that sends notifications when a state machine fails to run o...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/156779-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q114. [github_examtopics_cache]
*App id: `LOC-114`*

A company has a data warehouse in Amazon Redshift. To comply with security regulations, the company needs to log and store all user activities and connection activities for the data warehouse.

Which solution will meet these requirements?

- A. Create an Amazon S3 bucket. Enable logging for the Amazon Redshift cluster. Specify the S3 bucket in the logging configuration to store the logs.
- B. Create an Amazon Elastic File System (Amazon EFS) file system. Enable logging for the Amazon Redshift cluster. Write logs to the EFS file system.
- C. Create an Amazon Aurora MySQL database. Enable logging for the Amazon Redshift cluster. Write the logs to a table in the Aurora MySQL database.
- D. Create an Amazon Elastic Block Store (Amazon EBS) volume. Enable logging for the Amazon Redshift cluster. Write the logs to the EBS volume.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create an Amazon S3 bucket. Enable logging for the Amazon Redshift cluster. Specify the S3 bucket in the logging configuration to store the logs..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create an Amazon Elastic File System (Amazon EFS) file system. Enable logging for the Amazon Redshift cluster. Write logs to the EFS file system.
- **C**: tidak memenuhi constraint utama soal — Create an Amazon Aurora MySQL database. Enable logging for the Amazon Redshift cluster. Write the logs to a table in the Aurora MySQL database.
- **D**: tidak memenuhi constraint utama soal — Create an Amazon Elastic Block Store (Amazon EBS) volume. Enable logging for the Amazon Redshift cluster. Write the logs to the EBS volume.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153155-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q115. [github_examtopics_cache]
*App id: `LOC-115`*

A company has a data warehouse that contains a table that is named Sales. The company stores the table in Amazon Redshift. The table includes a column that is named city_name. The company wants to query the table to find all rows that have a city_name that starts with "San" or "El".

Which SQL query will meet this requirement?

- A. Select * from Sales where city_name ~ ‘$(San|El)*’;
- B. Select * from Sales where city_name ~ ‘^(San|El)*’;
- C. Select * from Sales where city_name ~’$(San&El)*’;
- D. Select * from Sales where city_name ~ ‘^(San&El)*’;

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Select * from Sales where city_name ~ ‘^(San|El)*’;.
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Select * from Sales where city_name ~ ‘$(San|El)*’;
- **C**: tidak memenuhi constraint utama soal — Select * from Sales where city_name ~’$(San&El)*’;
- **D**: tidak memenuhi constraint utama soal — Select * from Sales where city_name ~ ‘^(San&El)*’;
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142569-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q116. [github_examtopics_cache]
*App id: `LOC-116`*

A company has a frontend ReactJS website that uses Amazon API Gateway to invoke REST APIs. The APIs perform the functionality of the website. A data engineer needs to write a Python script that can be occasionally invoked through API Gateway. The code must return results to API Gateway.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Deploy a custom Python script on an Amazon Elastic Container Service (Amazon ECS) cluster.
- B. Create an AWS Lambda Python function with provisioned concurrency.
- C. Deploy a custom Python script that can integrate with API Gateway on Amazon Elastic Kubernetes Service (Amazon EKS).
- D. Create an AWS Lambda function. Ensure that the function is warm by scheduling an Amazon EventBridge rule to invoke the Lambda function every 5 minutes by using mock events.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an AWS Lambda Python function with provisioned concurrency..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Deploy a custom Python script on an Amazon Elastic Container Service (Amazon ECS) cluster.
- **C**: tidak memenuhi constraint utama soal — Deploy a custom Python script that can integrate with API Gateway on Amazon Elastic Kubernetes Service (Amazon EKS).
- **D**: tidak memenuhi constraint utama soal — Create an AWS Lambda function. Ensure that the function is warm by scheduling an Amazon EventBridge rule to invoke the Lambda function every 5 minutes by usi...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132630-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q117. [github_examtopics_cache]
*App id: `LOC-117`*

A company has a gaming application that stores data in Amazon DynamoDB tables. A data engineer needs to ingest the game data into an Amazon OpenSearch Service cluster. Data updates must occur in near real time.

Which solution will meet these requirements?

- A. Use AWS Step Functions to periodically export data from the Amazon DynamoDB tables to an Amazon S3 bucket. Use an AWS Lambda function to load the data into Amazon OpenSearch Service.
- B. Configure an AWS Glue job to have a source of Amazon DynamoDB and a destination of Amazon OpenSearch Service to transfer data in near real time.
- C. Use Amazon DynamoDB Streams to capture table changes. Use an AWS Lambda function to process and update the data in Amazon OpenSearch Service.
- D. Use a custom OpenSearch plugin to sync data from the Amazon DynamoDB tables.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon DynamoDB Streams to capture table changes. Use an AWS Lambda function to process and update the data in Amazon OpenSearch Service..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Step Functions to periodically export data from the Amazon DynamoDB tables to an Amazon S3 bucket. Use an AWS Lambda function to load the data into A...
- **B**: tidak memenuhi constraint utama soal — Configure an AWS Glue job to have a source of Amazon DynamoDB and a destination of Amazon OpenSearch Service to transfer data in near real time.
- **D**: tidak memenuhi constraint utama soal — Use a custom OpenSearch plugin to sync data from the Amazon DynamoDB tables.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151927-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q118. [github_examtopics_cache]
*App id: `LOC-118`*

A company has a production AWS account that runs company workloads. The company's security team created a security AWS account to store and analyze security logs from the production AWS account. The security logs in the production AWS account are stored in Amazon CloudWatch Logs.
The company needs to use Amazon Kinesis Data Streams to deliver the security logs to the security AWS account.
Which solution will meet these requirements?

- A. Create a destination data stream in the production AWS account. In the security AWS account, create an IAM role that has cross-account permissions to Kinesis Data Streams in the production AWS account.
- B. Create a destination data stream in the security AWS account. Create an IAM role and a trust policy to grant CloudWatch Logs the permission to put data into the stream. Create a subscription filter in the security AWS account.
- C. Create a destination data stream in the production AWS account. In the production AWS account, create an IAM role that has cross-account permissions to Kinesis Data Streams in the security AWS account.
- D. Create a destination data stream in the security AWS account. Create an IAM role and a trust policy to grant CloudWatch Logs the permission to put data into the stream. Create a subscription filter in the production AWS account.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Create a destination data stream in the security AWS account. Create an IAM role and a trust policy to grant CloudWatch Logs the permission to put data into the stream. Create a subscription filter in the production AWS account..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a destination data stream in the production AWS account. In the security AWS account, create an IAM role that has cross-account permissions to Kinesis...
- **B**: tidak memenuhi constraint utama soal — Create a destination data stream in the security AWS account. Create an IAM role and a trust policy to grant CloudWatch Logs the permission to put data into ...
- **C**: tidak memenuhi constraint utama soal — Create a destination data stream in the production AWS account. In the production AWS account, create an IAM role that has cross-account permissions to Kines...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/133056-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q119. [github_examtopics_cache]
*App id: `LOC-119`*

A company has an Amazon Redshift data warehouse that users access by using a variety of IAM roles. More than 100 users access the data warehouse every day.

The company wants to control user access to the objects based on each user's job role, permissions, and how sensitive the data is.

Which solution will meet these requirements?

- A. Use the role-based access control (RBAC) feature of Amazon Redshift.
- B. Use the row-level security (RLS) feature of Amazon Redshift.
- C. Use the column-level security (CLS) feature of Amazon Redshift.
- D. Use dynamic data masking policies in Amazon Redshift.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use the role-based access control (RBAC) feature of Amazon Redshift..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use the row-level security (RLS) feature of Amazon Redshift.
- **C**: tidak memenuhi constraint utama soal — Use the column-level security (CLS) feature of Amazon Redshift.
- **D**: tidak memenuhi constraint utama soal — Use dynamic data masking policies in Amazon Redshift.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153158-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q120. [github_examtopics_cache]
*App id: `LOC-120`*

A company has an application that uses an Amazon API Gateway REST API and an AWS Lambda function to retrieve data from an Amazon DynamoDB instance. Users recently reported intermittent high latency in the application's response times. A data engineer finds that the Lambda function experiences frequent throttling when the company's other Lambda functions experience increased invocations.

The company wants to ensure the API's Lambda function operate without being affected by other Lambda functions.

Which solution will meet this requirement MOST cost-effectively?

- A. Increase the number of read capacity unit (RCU) in DynamoDB.
- B. Configure provisioned concurrency for the Lambda function.
- C. Configure reserved concurrency for the Lambda function.
- D. Increase the Lambda function timeout and allocated memory.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Configure reserved concurrency for the Lambda function..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Increase the number of read capacity unit (RCU) in DynamoDB.
- **B**: tidak memenuhi constraint utama soal — Configure provisioned concurrency for the Lambda function.
- **D**: tidak memenuhi constraint utama soal — Increase the Lambda function timeout and allocated memory.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/156780-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q121. [github_examtopics_cache]
*App id: `LOC-121`*

A company has an application that uses a microservice architecture. The company hosts the application on an Amazon Elastic Kubernetes Services (Amazon EKS) cluster.

The company wants to set up a robust monitoring system for the application. The company needs to analyze the logs from the EKS cluster and the application. The company needs to correlate the cluster's logs with the application's traces to identify points of failure in the whole application request flow.

Which combination of steps will meet these requirements with the LEAST development effort? (Choose two.)

- A. Use FluentBit to collect logs. Use OpenTelemetry to collect traces.
- B. Use Amazon CloudWatch to collect logs. Use Amazon Kinesis to collect traces.
- C. Use Amazon CloudWatch to collect logs. Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to collect traces.
- D. Use Amazon OpenSearch to correlate the logs and traces.
- E. Use AWS Glue to correlate the logs and traces.

**Answer:** AD

**Pembahasan:** Jawaban yang tepat adalah **AD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Use FluentBit to collect logs. Use OpenTelemetry to collect traces.
- **D**: Use Amazon OpenSearch to correlate the logs and traces.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use Amazon CloudWatch to collect logs. Use Amazon Kinesis to collect traces.
- **C**: tidak memenuhi constraint utama soal — Use Amazon CloudWatch to collect logs. Use Amazon Managed Streaming for Apache Kafka (Amazon MSK) to collect traces.
- **E**: tidak memenuhi constraint utama soal — Use AWS Glue to correlate the logs and traces.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151926-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q122. [github_examtopics_cache]
*App id: `LOC-122`*

A company has developed several AWS Glue extract, transform, and load (ETL) jobs to validate and transform data from Amazon S3. The ETL jobs load the data into Amazon RDS for MySQL in batches once every day. The ETL jobs use a DynamicFrame to read the S3 data.

The ETL jobs currently process all the data that is in the S3 bucket. However, the company wants the jobs to process only the daily incremental data.

Which solution will meet this requirement with the LEAST coding effort?

- A. Create an ETL job that reads the S3 file status and logs the status in Amazon DynamoDB.
- B. Enable job bookmarks for the ETL jobs to update the state after a run to keep track of previously processed data.
- C. Enable job metrics for the ETL jobs to help keep track of processed objects in Amazon CloudWatch.
- D. Configure the ETL jobs to delete processed objects from Amazon S3 after each run.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Enable job bookmarks for the ETL jobs to update the state after a run to keep track of previously processed data..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an ETL job that reads the S3 file status and logs the status in Amazon DynamoDB.
- **C**: tidak memenuhi constraint utama soal — Enable job metrics for the ETL jobs to help keep track of processed objects in Amazon CloudWatch.
- **D**: tidak memenuhi constraint utama soal — Configure the ETL jobs to delete processed objects from Amazon S3 after each run.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142566-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q123. [github_examtopics_cache]
*App id: `LOC-123`*

A company has five offices in different AWS Regions. Each office has its own human resources (HR) department that uses a unique IAM role. The company stores employee records in a data lake that is based on Amazon S3 storage.
A data engineering team needs to limit access to the records. Each HR department should be able to access records for only employees who are within the HR department's Region.
Which combination of steps should the data engineering team take to meet this requirement with the LEAST operational overhead? (Choose two.)

- A. Use data filters for each Region to register the S3 paths as data locations.
- B. Register the S3 path as an AWS Lake Formation location.
- C. Modify the IAM roles of the HR departments to add a data filter for each department's Region.
- D. Enable fine-grained access control in AWS Lake Formation. Add a data filter for each Region.
- E. Create a separate S3 bucket for each Region. Configure an IAM policy to allow S3 access. Restrict access based on Region.

**Answer:** BD

**Pembahasan:** Jawaban yang tepat adalah **BD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Register the S3 path as an AWS Lake Formation location.
- **D**: Enable fine-grained access control in AWS Lake Formation. Add a data filter for each Region.
Konteks layanan terkait:
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use data filters for each Region to register the S3 paths as data locations.
- **C**: tidak memenuhi constraint utama soal — Modify the IAM roles of the HR departments to add a data filter for each department's Region.
- **E**: tidak memenuhi constraint utama soal — Create a separate S3 bucket for each Region. Configure an IAM policy to allow S3 access. Restrict access based on Region.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132348-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q124. [github_examtopics_cache]
*App id: `LOC-124`*

A company has implemented a lake house architecture in Amazon Redshift. The company needs to give users the ability to authenticate into Redshift query editor by using a third-party identity provider (IdP).

A data engineer must set up the authentication mechanism.

What is the first step the data engineer should take to meet this requirement?

- A. Register the third-party IdP as an identity provider in the configuration settings of the Redshift cluster.
- B. Register the third-party IdP as an identity provider from within Amazon Redshift.
- C. Register the third-party IdP as an identity provider for AVS Secrets Manager. Configure Amazon Redshift to use Secrets Manager to manage user credentials.
- D. Register the third-party IdP as an identity provider for AWS Certificate Manager (ACM). Configure Amazon Redshift to use ACM to manage user credentials.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Register the third-party IdP as an identity provider from within Amazon Redshift..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Register the third-party IdP as an identity provider in the configuration settings of the Redshift cluster.
- **C**: tidak memenuhi constraint utama soal — Register the third-party IdP as an identity provider for AVS Secrets Manager. Configure Amazon Redshift to use Secrets Manager to manage user credentials.
- **D**: tidak memenuhi constraint utama soal — Register the third-party IdP as an identity provider for AWS Certificate Manager (ACM). Configure Amazon Redshift to use ACM to manage user credentials.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145294-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q125. [github_examtopics_cache]
*App id: `LOC-125`*

A company has multiple applications that use datasets that are stored in an Amazon S3 bucket. The company has an ecommerce application that generates a dataset that contains personally identifiable information (PII). The company has an internal analytics application that does not require access to the PII.
To comply with regulations, the company must not share PII unnecessarily. A data engineer needs to implement a solution that with redact PII dynamically, based on the needs of each application that accesses the dataset.
Which solution will meet the requirements with the LEAST operational overhead?

- A. Create an S3 bucket policy to limit the access each application has. Create multiple copies of the dataset. Give each dataset copy the appropriate level of redaction for the needs of the application that accesses the copy.
- B. Create an S3 Object Lambda endpoint. Use the S3 Object Lambda endpoint to read data from the S3 bucket. Implement redaction logic within an S3 Object Lambda function to dynamically redact PII based on the needs of each application that accesses the data.
- C. Use AWS Glue to transform the data for each application. Create multiple copies of the dataset. Give each dataset copy the appropriate level of redaction for the needs of the application that accesses the copy.
- D. Create an API Gateway endpoint that has custom authorizers. Use the API Gateway endpoint to read data from the S3 bucket. Initiate a REST API call to dynamically redact PII based on the needs of each application that accesses the data.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an S3 Object Lambda endpoint. Use the S3 Object Lambda endpoint to read data from the S3 bucket. Implement redaction logic within an S3 Object Lambda function to dynamically redact PII based on the needs of each application that accesses the data..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an S3 bucket policy to limit the access each application has. Create multiple copies of the dataset. Give each dataset copy the appropriate level of r...
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue to transform the data for each application. Create multiple copies of the dataset. Give each dataset copy the appropriate level of redaction for...
- **D**: tidak memenuhi constraint utama soal — Create an API Gateway endpoint that has custom authorizers. Use the API Gateway endpoint to read data from the S3 bucket. Initiate a REST API call to dynamic...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132707-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q126. [github_examtopics_cache]
*App id: `LOC-126`*

A company has three subsidiaries. Each subsidiary uses a different data warehousing solution. The first subsidiary hosts its data warehouse in Amazon Redshift. The second subsidiary uses Teradata Vantage on AWS. The third subsidiary uses Google BigQuery.

The company wants to aggregate all the data into a central Amazon S3 data lake. The company wants to use Apache Iceberg as the table format.

A data engineer needs to build a new pipeline to connect to all the data sources, run transformations by using each source engine, join the data, and write the data to Iceberg.

Which solution will meet these requirements with the LEAST operational effort?

- A. Use native Amazon Redshift, Teradata, and BigQuery connectors to build the pipeline in AWS Glue. Use native AWS Glue transforms to join the data. Run a Merge operation on the data lake Iceberg table.
- B. Use the Amazon Athena federated query connectors for Amazon Redshift, Teradata, and BigQuery to build the pipeline in Athena. Write a SQL query to read from all the data sources, join the data, and run a Merge operation on the data lake Iceberg table.
- C. Use the native Amazon Redshift connector, the Java Database Connectivity (JDBC) connector for Teradata, and the open source Apache Spark BigQuery connector to build the pipeline in Amazon EMR. Write code in PySpark to join the data. Run a Merge operation on the data lake Iceberg table.
- D. Use the native Amazon Redshift, Teradata, and BigQuery connectors in Amazon Appflow to write data to Amazon S3 and AWS Glue Data Catalog. Use Amazon Athena to join the data. Run a Merge operation on the data lake Iceberg table.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the Amazon Athena federated query connectors for Amazon Redshift, Teradata, and BigQuery to build the pipeline in Athena. Write a SQL query to read from all the data sources, join the data, and run a Merge operation on the data lake Iceberg table..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use native Amazon Redshift, Teradata, and BigQuery connectors to build the pipeline in AWS Glue. Use native AWS Glue transforms to join the data. Run a Merge...
- **C**: tidak memenuhi constraint utama soal — Use the native Amazon Redshift connector, the Java Database Connectivity (JDBC) connector for Teradata, and the open source Apache Spark BigQuery connector t...
- **D**: tidak memenuhi constraint utama soal — Use the native Amazon Redshift, Teradata, and BigQuery connectors in Amazon Appflow to write data to Amazon S3 and AWS Glue Data Catalog. Use Amazon Athena t...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150342-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q127. [github_examtopics_cache]
*App id: `LOC-127`*

A company has used an Amazon Redshift table that is named Orders for 6 months. The company performs weekly updates and deletes on the table. The table has an interleaved sort key on a column that contains AWS Regions.
The company wants to reclaim disk space so that the company will not run out of storage space. The company also wants to analyze the sort key column.
Which Amazon Redshift command will meet these requirements?

- A. VACUUM FULL Orders
- B. VACUUM DELETE ONLY Orders
- C. VACUUM REINDEX Orders
- D. VACUUM SORT ONLY Orders

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: VACUUM REINDEX Orders.
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — VACUUM FULL Orders
- **B**: tidak memenuhi constraint utama soal — VACUUM DELETE ONLY Orders
- **D**: tidak memenuhi constraint utama soal — VACUUM SORT ONLY Orders
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/135091-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q128. [github_examtopics_cache]
*App id: `LOC-128`*

A company hosts its applications on Amazon EC2 instances. The company must use SSL/TLS connections that encrypt data in transit to communicate securely with AWS infrastructure that is managed by a customer.

A data engineer needs to implement a solution to simplify the generation, distribution, and rotation of digital certificates. The solution must automatically renew and deploy SSL/TLS certificates.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Store self-managed certificates on the EC2 instances.
- B. Use AWS Certificate Manager (ACM).
- C. Implement custom automation scripts in AWS Secrets Manager.
- D. Use Amazon Elastic Container Service (Amazon ECS) Service Connect.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use AWS Certificate Manager (ACM)..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Store self-managed certificates on the EC2 instances.
- **C**: tidak memenuhi constraint utama soal — Implement custom automation scripts in AWS Secrets Manager.
- **D**: tidak memenuhi constraint utama soal — Use Amazon Elastic Container Service (Amazon ECS) Service Connect.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151944-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q129. [github_examtopics_cache]
*App id: `LOC-129`*

A company implements a data mesh that has a central governance account. The company needs to catalog all data in the governance account. The governance account uses AWS Lake Formation to centrally share data and grant access permissions.

The company has created a new data product that includes a group of Amazon Redshift Serverless tables. A data engineer needs to share the data product with a marketing team. The marketing team must have access to only a subset of columns. The data engineer needs to share the same data product with a compliance team. The compliance team must have access to a different subset of columns than the marketing team needs access to.

Which combination of steps should the data engineer take to meet these requirements? (Choose two.)

- A. Create views of the tables that need to be shared. Include only the required columns.
- B. Create an Amazon Redshift data share that includes the tables that need to be shared.
- C. Create an Amazon Redshift managed VPC endpoint in the marketing team’s account. Grant the marketing team access to the views.
- D. Share the Amazon Redshift data share to the Lake Formation catalog in the governance account.
- E. Share the Amazon Redshift data share to the Amazon Redshift Serverless workgroup in the marketing team's account.

**Answer:** BD

**Pembahasan:** Jawaban yang tepat adalah **BD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Create an Amazon Redshift data share that includes the tables that need to be shared.
- **D**: Share the Amazon Redshift data share to the Lake Formation catalog in the governance account.
Konteks layanan terkait:
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create views of the tables that need to be shared. Include only the required columns.
- **C**: tidak memenuhi constraint utama soal — Create an Amazon Redshift managed VPC endpoint in the marketing team’s account. Grant the marketing team access to the views.
- **E**: tidak memenuhi constraint utama soal — Share the Amazon Redshift data share to the Amazon Redshift Serverless workgroup in the marketing team's account.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150341-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q130. [github_examtopics_cache]
*App id: `LOC-130`*

A company ingests data from multiple data sources and stores the data in an Amazon S3 bucket. An AWS Glue extract, transform, and load (ETL) job transforms the data and writes the transformed data to an Amazon S3 based data lake. The company uses Amazon Athena to query the data that is in the data lake.

The company needs to identify matching records even when the records do not have a common unique identifier.

Which solution will meet this requirement?

- A. Use Amazon Macie pattern matching as part of the ETL job.
- B. Train and use the AWS Glue PySpark Filter class in the ETL job.
- C. Partition tables and use the ETL job to partition the data on a unique identifier.
- D. Train and use the AWS Lake Formation FindMatches transform in the ETL job.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Train and use the AWS Lake Formation FindMatches transform in the ETL job..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Macie pattern matching as part of the ETL job.
- **B**: tidak memenuhi constraint utama soal — Train and use the AWS Glue PySpark Filter class in the ETL job.
- **C**: tidak memenuhi constraint utama soal — Partition tables and use the ETL job to partition the data on a unique identifier.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145116-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q131. [github_examtopics_cache]
*App id: `LOC-131`*

A company is building a data lake for a new analytics team. The company is using Amazon S3 for storage and Amazon Athena for query analysis. All data that is in Amazon S3 is in Apache Parquet format.

The company is running a new Oracle database as a source system in the company’s data center. The company has 70 tables in the Oracle database. All the tables have primary keys. Data can occasionally change in the source system. The company wants to ingest the tables every day into the data lake.

Which solution will meet this requirement with the LEAST effort?

- A. Create an Apache Sqoop job in Amazon EMR to read the data from the Oracle database. Configure the Sqoop job to write the data to Amazon S3 in Parquet format.
- B. Create an AWS Glue connection to the Oracle database. Create an AWS Glue bookmark job to ingest the data incrementally and to write the data to Amazon S3 in Parquet format.
- C. Create an AWS Database Migration Service (AWS DMS) task for ongoing replication. Set the Oracle database as the source. Set Amazon S3 as the target. Configure the task to write the data in Parquet format.
- D. Create an Oracle database in Amazon RDS. Use AWS Database Migration Service (AWS DMS) to migrate the on-premises Oracle database to Amazon RDS. Configure triggers on the tables to invoke AWS Lambda functions to write changed records to Amazon S3 in Parquet format.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create an AWS Database Migration Service (AWS DMS) task for ongoing replication. Set the Oracle database as the source. Set Amazon S3 as the target. Configure the task to write the data in Parquet format..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
- DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an Apache Sqoop job in Amazon EMR to read the data from the Oracle database. Configure the Sqoop job to write the data to Amazon S3 in Parquet format.
- **B**: tidak memenuhi constraint utama soal — Create an AWS Glue connection to the Oracle database. Create an AWS Glue bookmark job to ingest the data incrementally and to write the data to Amazon S3 in ...
- **D**: tidak memenuhi constraint utama soal — Create an Oracle database in Amazon RDS. Use AWS Database Migration Service (AWS DMS) to migrate the on-premises Oracle database to Amazon RDS. Configure tri...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/146993-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q132. [github_examtopics_cache]
*App id: `LOC-132`*

A company is building a data stream processing application. The application runs in an Amazon Elastic Kubernetes Service (Amazon EKS) cluster. The application stores processed data in an Amazon DynamoDB table.

The company needs the application containers in the EKS cluster to have secure access to the DynamoDB table. The company does not want to embed AWS credentials in the containers.

Which solution will meet these requirements?

- A. Store the AWS credentials in an Amazon S3 bucket. Grant the EKS containers access to the S3 bucket to retrieve the credentials.
- B. Attach an IAM role to the EKS worker nodes, Grant the IAM role access to DynamoDUse the IAM role to set up IAM roles service accounts (IRSA) functionality.
- C. Create an IAM user that has an access key to access the DynamoDB table. Use environment variables in the EKS containers to store the IAM user access key data.
- D. Create an IAM user that has an access key to access the DynamoDB table. Use Kubernetes secrets that are mounted in a volume of the EKS duster nodes to store the user access key data.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Attach an IAM role to the EKS worker nodes, Grant the IAM role access to DynamoDUse the IAM role to set up IAM roles service accounts (IRSA) functionality..
Konteks layanan terkait:
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Store the AWS credentials in an Amazon S3 bucket. Grant the EKS containers access to the S3 bucket to retrieve the credentials.
- **C**: tidak memenuhi constraint utama soal — Create an IAM user that has an access key to access the DynamoDB table. Use environment variables in the EKS containers to store the IAM user access key data.
- **D**: tidak memenuhi constraint utama soal — Create an IAM user that has an access key to access the DynamoDB table. Use Kubernetes secrets that are mounted in a volume of the EKS duster nodes to store ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151854-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q133. [github_examtopics_cache]
*App id: `LOC-133`*

A company is building an analytics solution. The solution uses Amazon S3 for data lake storage and Amazon Redshift for a data warehouse. The company wants to use Amazon Redshift Spectrum to query the data that is in Amazon S3.
Which actions will provide the FASTEST queries? (Choose two.)

- A. Use gzip compression to compress individual files to sizes that are between 1 GB and 5 GB.
- B. Use a columnar storage file format.
- C. Partition the data based on the most common query predicates.
- D. Split the data into files that are less than 10 KB.
- E. Use file formats that are not splittable.

**Answer:** BC

**Pembahasan:** Jawaban yang tepat adalah **BC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Use a columnar storage file format.
- **C**: Partition the data based on the most common query predicates.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use gzip compression to compress individual files to sizes that are between 1 GB and 5 GB.
- **D**: tidak memenuhi constraint utama soal — Split the data into files that are less than 10 KB.
- **E**: tidak memenuhi constraint utama soal — Use file formats that are not splittable.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132737-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q134. [github_examtopics_cache]
*App id: `LOC-134`*

A company is building an inventory management system and an inventory reordering system to automatically reorder products. Both systems use Amazon Kinesis Data Streams. The inventory management system uses the Amazon Kinesis Producer Library (KPL) to publish data to a stream. The inventory reordering system uses the Amazon Kinesis Client Library (KCL) to consume data from the stream. The company configures the stream to scale up and down as needed.

Before the company deploys the systems to production, the company discovers that the inventory reordering system received duplicated data.

Which factors could have caused the reordering system to receive duplicated data? (Choose two.)

- A. The producer experienced network-related timeouts.
- B. The stream’s value for the IteratorAgeMilliseconds metric was too high.
- C. There was a change in the number of shards, record processors, or both.
- D. The AggregationEnabled configuration property was set to true.
- E. The max_records configuration property was set to a number that was too high.

**Answer:** AC

**Pembahasan:** Jawaban yang tepat adalah **AC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: The producer experienced network-related timeouts.
- **C**: There was a change in the number of shards, record processors, or both.
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — The stream’s value for the IteratorAgeMilliseconds metric was too high.
- **D**: tidak memenuhi constraint utama soal — The AggregationEnabled configuration property was set to true.
- **E**: tidak memenuhi constraint utama soal — The max_records configuration property was set to a number that was too high.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150357-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q135. [github_examtopics_cache]
*App id: `LOC-135`*

A company is creating near real-time dashboards to visualize time series data. The company ingests data into Amazon Managed Streaming for Apache Kafka (Amazon MSK). A customized data pipeline consumes the data. The pipeline then writes data to Amazon Keyspaces (for Apache Cassandra), Amazon OpenSearch Service, and Apache Avro objects in Amazon S3.

Which solution will make the data available for the data visualizations with the LEAST latency?

- A. Create OpenSearch Dashboards by using the data from OpenSearch Service.
- B. Use Amazon Athena with an Apache Hive metastore to query the Avro objects in Amazon S3. Use Amazon Managed Grafana to connect to Athena and to create the dashboards.
- C. Use Amazon Athena to query the data from the Avro objects in Amazon S3. Configure Amazon Keyspaces as the data catalog. Connect Amazon QuickSight to Athena to create the dashboards.
- D. Use AWS Glue to catalog the data. Use S3 Select to query the Avro objects in Amazon S3. Connect Amazon QuickSight to the S3 bucket to create the dashboards.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create OpenSearch Dashboards by using the data from OpenSearch Service..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use Amazon Athena with an Apache Hive metastore to query the Avro objects in Amazon S3. Use Amazon Managed Grafana to connect to Athena and to create the das...
- **C**: tidak memenuhi constraint utama soal — Use Amazon Athena to query the data from the Avro objects in Amazon S3. Configure Amazon Keyspaces as the data catalog. Connect Amazon QuickSight to Athena t...
- **D**: tidak memenuhi constraint utama soal — Use AWS Glue to catalog the data. Use S3 Select to query the Avro objects in Amazon S3. Connect Amazon QuickSight to the S3 bucket to create the dashboards.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145714-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q136. [github_examtopics_cache]
*App id: `LOC-136`*

A company is designing a serverless data processing workflow in AWS Step Functions that involves multiple steps. The processing workflow ingests data from an external API, transforms the data by using multiple AWS Lambda functions, and loads the transformed data into Amazon DynamoDB.

The company needs the workflow to perform specific steps based on the content of the incoming data.

Which Step Functions state type should the company use to meet this requirement?

- A. Parallel
- B. Choice
- C. Task
- D. Map

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Choice.
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Parallel
- **C**: tidak memenuhi constraint utama soal — Task
- **D**: tidak memenuhi constraint utama soal — Map
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153367-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q137. [github_examtopics_cache]
*App id: `LOC-137`*

A company is developing an application that runs on Amazon EC2 instances. Currently, the data that the application generates is temporary. However, the company needs to persist the data, even if the EC2 instances are terminated.
A data engineer must launch new EC2 instances from an Amazon Machine Image (AMI) and configure the instances to preserve the data.
Which solution will meet this requirement?

- A. Launch new EC2 instances by using an AMI that is backed by an EC2 instance store volume that contains the application data. Apply the default settings to the EC2 instances.
- B. Launch new EC2 instances by using an AMI that is backed by a root Amazon Elastic Block Store (Amazon EBS) volume that contains the application data. Apply the default settings to the EC2 instances.
- C. Launch new EC2 instances by using an AMI that is backed by an EC2 instance store volume. Attach an Amazon Elastic Block Store (Amazon EBS) volume to contain the application data. Apply the default settings to the EC2 instances.
- D. Launch new EC2 instances by using an AMI that is backed by an Amazon Elastic Block Store (Amazon EBS) volume. Attach an additional EC2 instance store volume to contain the application data. Apply the default settings to the EC2 instances.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Launch new EC2 instances by using an AMI that is backed by an EC2 instance store volume. Attach an Amazon Elastic Block Store (Amazon EBS) volume to contain the application data. Apply the default settings to the EC2 instances..
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Launch new EC2 instances by using an AMI that is backed by an EC2 instance store volume that contains the application data. Apply the default settings to the...
- **B**: tidak memenuhi constraint utama soal — Launch new EC2 instances by using an AMI that is backed by a root Amazon Elastic Block Store (Amazon EBS) volume that contains the application data. Apply th...
- **D**: tidak memenuhi constraint utama soal — Launch new EC2 instances by using an AMI that is backed by an Amazon Elastic Block Store (Amazon EBS) volume. Attach an additional EC2 instance store volume ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132354-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q138. [github_examtopics_cache]
*App id: `LOC-138`*

A company is migrating a legacy application to an Amazon S3 based data lake. A data engineer reviewed data that is associated with the legacy application. The data engineer found that the legacy data contained some duplicate information.
The data engineer must identify and remove duplicate information from the legacy application data.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Write a custom extract, transform, and load (ETL) job in Python. Use the DataFrame.drop_duplicates() function by importing the Pandas library to perform data deduplication.
- B. Write an AWS Glue extract, transform, and load (ETL) job. Use the FindMatches machine learning (ML) transform to transform the data to perform data deduplication.
- C. Write a custom extract, transform, and load (ETL) job in Python. Import the Python dedupe library. Use the dedupe library to perform data deduplication.
- D. Write an AWS Glue extract, transform, and load (ETL) job. Import the Python dedupe library. Use the dedupe library to perform data deduplication.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Write an AWS Glue extract, transform, and load (ETL) job. Use the FindMatches machine learning (ML) transform to transform the data to perform data deduplication..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Write a custom extract, transform, and load (ETL) job in Python. Use the DataFrame.drop_duplicates() function by importing the Pandas library to perform data...
- **C**: tidak memenuhi constraint utama soal — Write a custom extract, transform, and load (ETL) job in Python. Import the Python dedupe library. Use the dedupe library to perform data deduplication.
- **D**: tidak memenuhi constraint utama soal — Write an AWS Glue extract, transform, and load (ETL) job. Import the Python dedupe library. Use the dedupe library to perform data deduplication.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132774-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q139. [github_examtopics_cache]
*App id: `LOC-139`*

A company is migrating its database servers from Amazon EC2 instances that run Microsoft SQL Server to Amazon RDS for Microsoft SQL Server DB instances. The company's analytics team must export large data elements every day until the migration is complete. The data elements are the result of SQL joins across multiple tables. The data must be in Apache Parquet format. The analytics team must store the data in Amazon S3.
Which solution will meet these requirements in the MOST operationally efficient way?

- A. Create a view in the EC2 instance-based SQL Server databases that contains the required data elements. Create an AWS Glue job that selects the data directly from the view and transfers the data in Parquet format to an S3 bucket. Schedule the AWS Glue job to run every day.
- B. Schedule SQL Server Agent to run a daily SQL query that selects the desired data elements from the EC2 instance-based SQL Server databases. Configure the query to direct the output .csv objects to an S3 bucket. Create an S3 event that invokes an AWS Lambda function to transform the output format from .csv to Parquet.
- C. Use a SQL query to create a view in the EC2 instance-based SQL Server databases that contains the required data elements. Create and run an AWS Glue crawler to read the view. Create an AWS Glue job that retrieves the data and transfers the data in Parquet format to an S3 bucket. Schedule the AWS Glue job to run every day.
- D. Create an AWS Lambda function that queries the EC2 instance-based databases by using Java Database Connectivity (JDBC). Configure the Lambda function to retrieve the required data, transform the data into Parquet format, and transfer the data into an S3 bucket. Use Amazon EventBridge to schedule the Lambda function to run every day.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create a view in the EC2 instance-based SQL Server databases that contains the required data elements. Create an AWS Glue job that selects the data directly from the view and transfers the data in Parquet format to an S3 bucket. Schedule the AWS Glue job to run every day..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Schedule SQL Server Agent to run a daily SQL query that selects the desired data elements from the EC2 instance-based SQL Server databases. Configure the que...
- **C**: tidak memenuhi constraint utama soal — Use a SQL query to create a view in the EC2 instance-based SQL Server databases that contains the required data elements. Create and run an AWS Glue crawler ...
- **D**: tidak memenuhi constraint utama soal — Create an AWS Lambda function that queries the EC2 instance-based databases by using Java Database Connectivity (JDBC). Configure the Lambda function to retr...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132742-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q140. [github_examtopics_cache]
*App id: `LOC-140`*

A company is migrating on-premises workloads to AWS. The company wants to reduce overall operational overhead. The company also wants to explore serverless options.
The company's current workloads use Apache Pig, Apache Oozie, Apache Spark, Apache Hbase, and Apache Flink. The on-premises workloads process petabytes of data in seconds. The company must maintain similar or better performance after the migration to AWS.
Which extract, transform, and load (ETL) service will meet these requirements?

- A. AWS Glue
- B. Amazon EMR
- C. AWS Lambda
- D. Amazon Redshift

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Amazon EMR.
Konteks layanan terkait:
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — AWS Glue
- **C**: tidak memenuhi constraint utama soal — AWS Lambda
- **D**: tidak memenuhi constraint utama soal — Amazon Redshift
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131684-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q141. [github_examtopics_cache]
*App id: `LOC-141`*

A company is planning to migrate on-premises Apache Hadoop clusters to Amazon EMR. The company also needs to migrate a data catalog into a persistent storage solution.
The company currently stores the data catalog in an on-premises Apache Hive metastore on the Hadoop clusters. The company requires a serverless solution to migrate the data catalog.
Which solution will meet these requirements MOST cost-effectively?

- A. Use AWS Database Migration Service (AWS DMS) to migrate the Hive metastore into Amazon S3. Configure AWS Glue Data Catalog to scan Amazon S3 to produce the data catalog.
- B. Configure a Hive metastore in Amazon EMR. Migrate the existing on-premises Hive metastore into Amazon EMR. Use AWS Glue Data Catalog to store the company's data catalog as an external data catalog.
- C. Configure an external Hive metastore in Amazon EMR. Migrate the existing on-premises Hive metastore into Amazon EMR. Use Amazon Aurora MySQL to store the company's data catalog.
- D. Configure a new Hive metastore in Amazon EMR. Migrate the existing on-premises Hive metastore into Amazon EMR. Use the new metastore as the company's data catalog.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Configure a Hive metastore in Amazon EMR. Migrate the existing on-premises Hive metastore into Amazon EMR. Use AWS Glue Data Catalog to store the company's data catalog as an external data catalog..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Database Migration Service (AWS DMS) to migrate the Hive metastore into Amazon S3. Configure AWS Glue Data Catalog to scan Amazon S3 to produce the d...
- **C**: tidak memenuhi constraint utama soal — Configure an external Hive metastore in Amazon EMR. Migrate the existing on-premises Hive metastore into Amazon EMR. Use Amazon Aurora MySQL to store the com...
- **D**: tidak memenuhi constraint utama soal — Configure a new Hive metastore in Amazon EMR. Migrate the existing on-premises Hive metastore into Amazon EMR. Use the new metastore as the company's data ca...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132680-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q142. [github_examtopics_cache]
*App id: `LOC-142`*

A company is planning to upgrade its Amazon Elastic Block Store (Amazon EBS) General Purpose SSD storage from gp2 to gp3. The company wants to prevent any interruptions in its Amazon EC2 instances that will cause data loss during the migration to the upgraded storage.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Create snapshots of the gp2 volumes. Create new gp3 volumes from the snapshots. Attach the new gp3 volumes to the EC2 instances.
- B. Create new gp3 volumes. Gradually transfer the data to the new gp3 volumes. When the transfer is complete, mount the new gp3 volumes to the EC2 instances to replace the gp2 volumes.
- C. Change the volume type of the existing gp2 volumes to gp3. Enter new values for volume size, IOPS, and throughput.
- D. Use AWS DataSync to create new gp3 volumes. Transfer the data from the original gp2 volumes to the new gp3 volumes.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Change the volume type of the existing gp2 volumes to gp3. Enter new values for volume size, IOPS, and throughput..
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create snapshots of the gp2 volumes. Create new gp3 volumes from the snapshots. Attach the new gp3 volumes to the EC2 instances.
- **B**: tidak memenuhi constraint utama soal — Create new gp3 volumes. Gradually transfer the data to the new gp3 volumes. When the transfer is complete, mount the new gp3 volumes to the EC2 instances to ...
- **D**: tidak memenuhi constraint utama soal — Use AWS DataSync to create new gp3 volumes. Transfer the data from the original gp2 volumes to the new gp3 volumes.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132762-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q143. [github_examtopics_cache]
*App id: `LOC-143`*

A company is planning to use a provisioned Amazon EMR cluster that runs Apache Spark jobs to perform big data analysis. The company requires high reliability. A big data team must follow best practices for running cost-optimized and long-running workloads on Amazon EMR. The team must find a solution that will maintain the company's current level of performance.
Which combination of resources will meet these requirements MOST cost-effectively? (Choose two.)

- A. Use Hadoop Distributed File System (HDFS) as a persistent data store.
- B. Use Amazon S3 as a persistent data store.
- C. Use x86-based instances for core nodes and task nodes.
- D. Use Graviton instances for core nodes and task nodes.
- E. Use Spot Instances for all primary nodes.

**Answer:** BD

**Pembahasan:** Jawaban yang tepat adalah **BD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Use Amazon S3 as a persistent data store.
- **D**: Use Graviton instances for core nodes and task nodes.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Hadoop Distributed File System (HDFS) as a persistent data store.
- **C**: tidak memenuhi constraint utama soal — Use x86-based instances for core nodes and task nodes.
- **E**: tidak memenuhi constraint utama soal — Use Spot Instances for all primary nodes.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131713-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q144. [github_examtopics_cache]
*App id: `LOC-144`*

A company is using Amazon Redshift to build a data warehouse solution. The company is loading hundreds of files into a fact table that is in a Redshift cluster.

The company wants the data warehouse solution to achieve the greatest possible throughput. The solution must use cluster resources optimally when the company loads data into the fact table.

Which solution will meet these requirements?

- A. Use multiple COPY commands to load the data into the Redshift cluster.
- B. Use S3DistCp to load multiple files into Hadoop Distributed File System (HDFS). Use an HDFS connector to ingest the data into the Redshift cluster.
- C. Use a number of INSERT statements equal to the number of Redshift cluster nodes. Load the data in parallel into each node.
- D. Use a single COPY command to load the data into the Redshift cluster.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use a single COPY command to load the data into the Redshift cluster..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use multiple COPY commands to load the data into the Redshift cluster.
- **B**: tidak memenuhi constraint utama soal — Use S3DistCp to load multiple files into Hadoop Distributed File System (HDFS). Use an HDFS connector to ingest the data into the Redshift cluster.
- **C**: tidak memenuhi constraint utama soal — Use a number of INSERT statements equal to the number of Redshift cluster nodes. Load the data in parallel into each node.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145007-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q145. [github_examtopics_cache]
*App id: `LOC-145`*

A company is using an AWS Transfer Family server to migrate data from an on-premises environment to AWS. Company policy mandates the use of TLS 1.2 or above to encrypt the data in transit.

Which solution will meet these requirements?

- A. Generate new SSH keys for the Transfer Family server. Make the old keys and the new keys available for use.
- B. Update the security group rules for the on-premises network to allow only connections that use TLS 1.2 or above.
- C. Update the security policy of the Transfer Family server to specify a minimum protocol version of TLS 1.2
- D. Install an SSL certificate on the Transfer Family server to encrypt data transfers by using TLS 1.2.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Update the security policy of the Transfer Family server to specify a minimum protocol version of TLS 1.2.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Generate new SSH keys for the Transfer Family server. Make the old keys and the new keys available for use.
- **B**: tidak memenuhi constraint utama soal — Update the security group rules for the on-premises network to allow only connections that use TLS 1.2 or above.
- **D**: tidak memenuhi constraint utama soal — Install an SSL certificate on the Transfer Family server to encrypt data transfers by using TLS 1.2.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143058-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q146. [github_examtopics_cache]
*App id: `LOC-146`*

A company loads transaction data for each day into Amazon Redshift tables at the end of each day. The company wants to have the ability to track which tables have been loaded and which tables still need to be loaded.
A data engineer wants to store the load statuses of Redshift tables in an Amazon DynamoDB table. The data engineer creates an AWS Lambda function to publish the details of the load statuses to DynamoDB.
How should the data engineer invoke the Lambda function to write load statuses to the DynamoDB table?

- A. Use a second Lambda function to invoke the first Lambda function based on Amazon CloudWatch events.
- B. Use the Amazon Redshift Data API to publish an event to Amazon EventBridge. Configure an EventBridge rule to invoke the Lambda function.
- C. Use the Amazon Redshift Data API to publish a message to an Amazon Simple Queue Service (Amazon SQS) queue. Configure the SQS queue to invoke the Lambda function.
- D. Use a second Lambda function to invoke the first Lambda function based on AWS CloudTrail events.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the Amazon Redshift Data API to publish an event to Amazon EventBridge. Configure an EventBridge rule to invoke the Lambda function..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use a second Lambda function to invoke the first Lambda function based on Amazon CloudWatch events.
- **C**: tidak memenuhi constraint utama soal — Use the Amazon Redshift Data API to publish a message to an Amazon Simple Queue Service (Amazon SQS) queue. Configure the SQS queue to invoke the Lambda func...
- **D**: tidak memenuhi constraint utama soal — Use a second Lambda function to invoke the first Lambda function based on AWS CloudTrail events.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131675-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q147. [github_examtopics_cache]
*App id: `LOC-147`*

A company maintains a data warehouse in an on-premises Oracle database. The company wants to build a data lake on AWS. The company wants to load data warehouse tables into Amazon S3 and synchronize the tables with incremental data that arrives from the data warehouse every day.

Each table has a column that contains monotonically increasing values. The size of each table is less than 50 GB. The data warehouse tables are refreshed every night between 1 AM and 2 AM. A business intelligence team queries the tables between 10 AM and 8 PM every day.

Which solution will meet these requirements in the MOST operationally efficient way?

- A. Use an AWS Database Migration Service (AWS DMS) full load plus CDC job to load tables that contain monotonically increasing data columns from the on-premises data warehouse to Amazon S3. Use custom logic in AWS Glue to append the daily incremental data to a full-load copy that is in Amazon S3.
- B. Use an AWS Glue Java Database Connectivity (JDBC) connection. Configure a job bookmark for a column that contains monotonically increasing values. Write custom logic to append the daily incremental data to a full-load copy that is in Amazon S3.
- C. Use an AWS Database Migration Service (AWS DMS) full load migration to load the data warehouse tables into Amazon S3 every day. Overwrite the previous day's full-load copy every day.
- D. Use AWS Glue to load a full copy of the data warehouse tables into Amazon S3 every day. Overwrite the previous day's full-load copy every day.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use an AWS Database Migration Service (AWS DMS) full load plus CDC job to load tables that contain monotonically increasing data columns from the on-premises data warehouse to Amazon S3. Use custom logic in AWS Glue to append the daily incremental data to a full-load copy that is in Amazon S3..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use an AWS Glue Java Database Connectivity (JDBC) connection. Configure a job bookmark for a column that contains monotonically increasing values. Write cust...
- **C**: tidak memenuhi constraint utama soal — Use an AWS Database Migration Service (AWS DMS) full load migration to load the data warehouse tables into Amazon S3 every day. Overwrite the previous day's ...
- **D**: tidak memenuhi constraint utama soal — Use AWS Glue to load a full copy of the data warehouse tables into Amazon S3 every day. Overwrite the previous day's full-load copy every day.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/147821-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q148. [github_examtopics_cache]
*App id: `LOC-148`*

A company maintains an Amazon Redshift provisioned cluster that the company uses for extract, transform, and load (ETL) operations to support critical analysis tasks. A sales team within the company maintains a Redshift cluster that the sales team uses for business intelligence (BI) tasks.
The sales team recently requested access to the data that is in the ETL Redshift cluster so the team can perform weekly summary analysis tasks. The sales team needs to join data from the ETL cluster with data that is in the sales team's BI cluster.
The company needs a solution that will share the ETL cluster data with the sales team without interrupting the critical analysis tasks. The solution must minimize usage of the computing resources of the ETL cluster.
Which solution will meet these requirements?

- A. Set up the sales team BI cluster as a consumer of the ETL cluster by using Redshift data sharing.
- B. Create materialized views based on the sales team's requirements. Grant the sales team direct access to the ETL cluster.
- C. Create database views based on the sales team's requirements. Grant the sales team direct access to the ETL cluster.
- D. Unload a copy of the data from the ETL cluster to an Amazon S3 bucket every week. Create an Amazon Redshift Spectrum table based on the content of the ETL cluster.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Set up the sales team BI cluster as a consumer of the ETL cluster by using Redshift data sharing..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create materialized views based on the sales team's requirements. Grant the sales team direct access to the ETL cluster.
- **C**: tidak memenuhi constraint utama soal — Create database views based on the sales team's requirements. Grant the sales team direct access to the ETL cluster.
- **D**: tidak memenuhi constraint utama soal — Unload a copy of the data from the ETL cluster to an Amazon S3 bucket every week. Create an Amazon Redshift Spectrum table based on the content of the ETL cl...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131711-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q149. [github_examtopics_cache]
*App id: `LOC-149`*

A company maintains multiple extract, transform, and load (ETL) workflows that ingest data from the company's operational databases into an Amazon S3 based data lake. The ETL workflows use AWS Glue and Amazon EMR to process data.
The company wants to improve the existing architecture to provide automated orchestration and to require minimal manual effort.
Which solution will meet these requirements with the LEAST operational overhead?

- A. AWS Glue workflows
- B. AWS Step Functions tasks
- C. AWS Lambda functions
- D. Amazon Managed Workflows for Apache Airflow (Amazon MWAA) workflows

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: AWS Step Functions tasks.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — AWS Glue workflows
- **C**: tidak memenuhi constraint utama soal — AWS Lambda functions
- **D**: tidak memenuhi constraint utama soal — Amazon Managed Workflows for Apache Airflow (Amazon MWAA) workflows
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131710-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q150. [github_examtopics_cache]
*App id: `LOC-150`*

A company needs a solution to manage costs for an existing Amazon DynamoDB table. The company also needs to control the size of the table. The solution must not disrupt any ongoing read or write operations. The company wants to use a solution that automatically deletes data from the table after 1 month.

Which solution will meet these requirements with the LEAST ongoing maintenance?

- A. Use the DynamoDB TTL feature to automatically expire data based on timestamps.
- B. Configure a scheduled Amazon EventBridge rule to invoke an AWS Lambda function to check for data that is older than 1 month. Configure the Lambda function to delete old data.
- C. Configure a stream on the DynamoDB table to invoke an AWS Lambda function. Configure the Lambda function to delete data in the table that is older than 1 month.
- D. Use an AWS Lambda function to periodically scan the DynamoDB table for data that is older than 1 month. Configure the Lambda function to delete old data.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use the DynamoDB TTL feature to automatically expire data based on timestamps..
Konteks layanan terkait:
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Configure a scheduled Amazon EventBridge rule to invoke an AWS Lambda function to check for data that is older than 1 month. Configure the Lambda function to...
- **C**: tidak memenuhi constraint utama soal — Configure a stream on the DynamoDB table to invoke an AWS Lambda function. Configure the Lambda function to delete data in the table that is older than 1 month.
- **D**: tidak memenuhi constraint utama soal — Use an AWS Lambda function to periodically scan the DynamoDB table for data that is older than 1 month. Configure the Lambda function to delete old data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151941-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q151. [github_examtopics_cache]
*App id: `LOC-151`*

A company needs to build a data lake in AWS. The company must provide row-level data access and column-level data access to specific teams. The teams will access the data by using Amazon Athena, Amazon Redshift Spectrum, and Apache Hive from Amazon EMR.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use Amazon S3 for data lake storage. Use S3 access policies to restrict data access by rows and columns. Provide data access through Amazon S3.
- B. Use Amazon S3 for data lake storage. Use Apache Ranger through Amazon EMR to restrict data access by rows and columns. Provide data access by using Apache Pig.
- C. Use Amazon Redshift for data lake storage. Use Redshift security policies to restrict data access by rows and columns. Provide data access by using Apache Spark and Amazon Athena federated queries.
- D. Use Amazon S3 for data lake storage. Use AWS Lake Formation to restrict data access by rows and columns. Provide data access through AWS Lake Formation.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use Amazon S3 for data lake storage. Use AWS Lake Formation to restrict data access by rows and columns. Provide data access through AWS Lake Formation..
Konteks layanan terkait:
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon S3 for data lake storage. Use S3 access policies to restrict data access by rows and columns. Provide data access through Amazon S3.
- **B**: tidak memenuhi constraint utama soal — Use Amazon S3 for data lake storage. Use Apache Ranger through Amazon EMR to restrict data access by rows and columns. Provide data access by using Apache Pig.
- **C**: tidak memenuhi constraint utama soal — Use Amazon Redshift for data lake storage. Use Redshift security policies to restrict data access by rows and columns. Provide data access by using Apache Sp...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132686-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q152. [github_examtopics_cache]
*App id: `LOC-152`*

A company needs to load customer data that comes from a third party into an Amazon Redshift data warehouse. The company stores order data and product data in the same data warehouse. The company wants to use the combined dataset to identify potential new customers.

A data engineer notices that one of the fields in the source data includes values that are in JSON format.

How should the data engineer load the JSON data into the data warehouse with the LEAST effort?

- A. Use the SUPER data type to store the data in the Amazon Redshift table.
- B. Use AWS Glue to flatten the JSON data and ingest it into the Amazon Redshift table.
- C. Use Amazon S3 to store the JSON data. Use Amazon Athena to query the data.
- D. Use an AWS Lambda function to flatten the JSON data. Store the data in Amazon S3.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use the SUPER data type to store the data in the Amazon Redshift table..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue to flatten the JSON data and ingest it into the Amazon Redshift table.
- **C**: tidak memenuhi constraint utama soal — Use Amazon S3 to store the JSON data. Use Amazon Athena to query the data.
- **D**: tidak memenuhi constraint utama soal — Use an AWS Lambda function to flatten the JSON data. Store the data in Amazon S3.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150740-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q153. [github_examtopics_cache]
*App id: `LOC-153`*

A company needs to partition the Amazon S3 storage that the company uses for a data lake. The partitioning will use a path of the S3 object keys in the following format: s3://bucket/prefix/year=2023/month=01/day=01.
A data engineer must ensure that the AWS Glue Data Catalog synchronizes with the S3 storage when the company adds new partitions to the bucket.
Which solution will meet these requirements with the LEAST latency?

- A. Schedule an AWS Glue crawler to run every morning.
- B. Manually run the AWS Glue CreatePartition API twice each day.
- C. Use code that writes data to Amazon S3 to invoke the Boto3 AWS Glue create_partition API call.
- D. Run the MSCK REPAIR TABLE command from the AWS Glue console.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use code that writes data to Amazon S3 to invoke the Boto3 AWS Glue create_partition API call..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Schedule an AWS Glue crawler to run every morning.
- **B**: tidak memenuhi constraint utama soal — Manually run the AWS Glue CreatePartition API twice each day.
- **D**: tidak memenuhi constraint utama soal — Run the MSCK REPAIR TABLE command from the AWS Glue console.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132364-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q154. [github_examtopics_cache]
*App id: `LOC-154`*

A company needs to send customer call data from its on-premises PostgreSQL database to AWS to generate near real-time insights. The solution must capture and load updates from operational data stores that run in the PostgreSQL database. The data changes continuously.

A data engineer configures an AWS Database Migration Service (AWS DMS) ongoing replication task. The task reads changes in near real time from the PostgreSQL source database transaction logs for each table. The task then sends the data to an Amazon Redshift cluster for processing.

The data engineer discovers latency issues during the change data capture (CDC) of the task. The data engineer thinks that the PostgreSQL source database is causing the high latency.

Which solution will confirm that the PostgreSQL database is the source of the high latency?

- A. Use Amazon CloudWatch to monitor the DMS task. Examine the CDCIncomingChanges metric to identify delays in the CDC from the source database.
- B. Verify that logical replication of the source database is configured in the postgresql.conf configuration file.
- C. Enable Amazon CloudWatch Logs for the DMS endpoint of the source database. Check for error messages.
- D. Use Amazon CloudWatch to monitor the DMS task. Examine the CDCLatencySource metric to identify delays in the CDC from the source database.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use Amazon CloudWatch to monitor the DMS task. Examine the CDCLatencySource metric to identify delays in the CDC from the source database..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
- DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon CloudWatch to monitor the DMS task. Examine the CDCIncomingChanges metric to identify delays in the CDC from the source database.
- **B**: tidak memenuhi constraint utama soal — Verify that logical replication of the source database is configured in the postgresql.conf configuration file.
- **C**: tidak memenuhi constraint utama soal — Enable Amazon CloudWatch Logs for the DMS endpoint of the source database. Check for error messages.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142571-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q155. [github_examtopics_cache]
*App id: `LOC-155`*

A company needs to set up a data catalog and metadata management for data sources that run in the AWS Cloud. The company will use the data catalog to maintain the metadata of all the objects that are in a set of data stores. The data stores include structured sources such as Amazon RDS and Amazon Redshift. The data stores also include semistructured sources such as JSON files and .xml files that are stored in Amazon S3.
The company needs a solution that will update the data catalog on a regular basis. The solution also must detect changes to the source metadata.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use Amazon Aurora as the data catalog. Create AWS Lambda functions that will connect to the data catalog. Configure the Lambda functions to gather the metadata information from multiple sources and to update the Aurora data catalog. Schedule the Lambda functions to run periodically.
- B. Use the AWS Glue Data Catalog as the central metadata repository. Use AWS Glue crawlers to connect to multiple data stores and to update the Data Catalog with metadata changes. Schedule the crawlers to run periodically to update the metadata catalog.
- C. Use Amazon DynamoDB as the data catalog. Create AWS Lambda functions that will connect to the data catalog. Configure the Lambda functions to gather the metadata information from multiple sources and to update the DynamoDB data catalog. Schedule the Lambda functions to run periodically.
- D. Use the AWS Glue Data Catalog as the central metadata repository. Extract the schema for Amazon RDS and Amazon Redshift sources, and build the Data Catalog. Use AWS Glue crawlers for data that is in Amazon S3 to infer the schema and to automatically update the Data Catalog.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the AWS Glue Data Catalog as the central metadata repository. Use AWS Glue crawlers to connect to multiple data stores and to update the Data Catalog with metadata changes. Schedule the crawlers to run periodically to update the metadata catalog..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Aurora as the data catalog. Create AWS Lambda functions that will connect to the data catalog. Configure the Lambda functions to gather the metada...
- **C**: tidak memenuhi constraint utama soal — Use Amazon DynamoDB as the data catalog. Create AWS Lambda functions that will connect to the data catalog. Configure the Lambda functions to gather the meta...
- **D**: tidak memenuhi constraint utama soal — Use the AWS Glue Data Catalog as the central metadata repository. Extract the schema for Amazon RDS and Amazon Redshift sources, and build the Data Catalog. ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132677-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q156. [github_examtopics_cache]
*App id: `LOC-156`*

A company plans to provision a log delivery stream within a VPC. The company configured the VPC flow logs to publish to Amazon CloudWatch Logs. The company needs to send the flow logs to Splunk in near real time for further analysis.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Configure an Amazon Kinesis Data Streams data stream to use Splunk as the destination. Create a CloudWatch Logs subscription filter to send log events to the data stream.
- B. Create an Amazon Kinesis Data Firehose delivery stream to use Splunk as the destination. Create a CloudWatch Logs subscription filter to send log events to the delivery stream.
- C. Create an Amazon Kinesis Data Firehose delivery stream to use Splunk as the destination. Create an AWS Lambda function to send the flow logs from CloudWatch Logs to the delivery stream.
- D. Configure an Amazon Kinesis Data Streams data stream to use Splunk as the destination. Create an AWS Lambda function to send the flow logs from CloudWatch Logs to the data stream.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an Amazon Kinesis Data Firehose delivery stream to use Splunk as the destination. Create a CloudWatch Logs subscription filter to send log events to the delivery stream..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Configure an Amazon Kinesis Data Streams data stream to use Splunk as the destination. Create a CloudWatch Logs subscription filter to send log events to the...
- **C**: tidak memenuhi constraint utama soal — Create an Amazon Kinesis Data Firehose delivery stream to use Splunk as the destination. Create an AWS Lambda function to send the flow logs from CloudWatch ...
- **D**: tidak memenuhi constraint utama soal — Configure an Amazon Kinesis Data Streams data stream to use Splunk as the destination. Create an AWS Lambda function to send the flow logs from CloudWatch Lo...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142564-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q157. [github_examtopics_cache]
*App id: `LOC-157`*

A company plans to use Amazon Kinesis Data Firehose to store data in Amazon S3. The source data consists of 2 MB .csv files. The company must convert the .csv files to JSON format. The company must store the files in Apache Parquet format.

Which solution will meet these requirements with the LEAST development effort?

- A. Use Kinesis Data Firehose to convert the .csv files to JSON. Use an AWS Lambda function to store the files in Parquet format.
- B. Use Kinesis Data Firehose to convert the .csv files to JSON and to store the files in Parquet format.
- C. Use Kinesis Data Firehose to invoke an AWS Lambda function that transforms the .csv files to JSON and stores the files in Parquet format.
- D. Use Kinesis Data Firehose to invoke an AWS Lambda function that transforms the .csv files to JSON. Use Kinesis Data Firehose to store the files in Parquet format.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use Kinesis Data Firehose to invoke an AWS Lambda function that transforms the .csv files to JSON. Use Kinesis Data Firehose to store the files in Parquet format..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Kinesis Data Firehose to convert the .csv files to JSON. Use an AWS Lambda function to store the files in Parquet format.
- **B**: tidak memenuhi constraint utama soal — Use Kinesis Data Firehose to convert the .csv files to JSON and to store the files in Parquet format.
- **C**: tidak memenuhi constraint utama soal — Use Kinesis Data Firehose to invoke an AWS Lambda function that transforms the .csv files to JSON and stores the files in Parquet format.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143057-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q158. [github_examtopics_cache]
*App id: `LOC-158`*

A company reads data from customer databases that run on Amazon RDS. The databases contain many inconsistent fields. For example, a customer record field that iPnamed place_id in one database is named location_id in another database. The company needs to link customer records across different databases, even when customer record fields do not match.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Create a provisioned Amazon EMR cluster to process and analyze data in the databases. Connect to the Apache Zeppelin notebook. Use the FindMatches transform to find duplicate records in the data.
- B. Create an AWS Glue crawler to craw the databases. Use the FindMatches transform to find duplicate records in the data. Evaluate and tune the transform by evaluating the performance and results.
- C. Create an AWS Glue crawler to craw the databases. Use Amazon SageMaker to construct Apache Spark ML pipelines to find duplicate records in the data.
- D. Create a provisioned Amazon EMR cluster to process and analyze data in the databases. Connect to the Apache Zeppelin notebook. Use an Apache Spark ML model to find duplicate records in the data. Evaluate and tune the model by evaluating the performance and results.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an AWS Glue crawler to craw the databases. Use the FindMatches transform to find duplicate records in the data. Evaluate and tune the transform by evaluating the performance and results..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a provisioned Amazon EMR cluster to process and analyze data in the databases. Connect to the Apache Zeppelin notebook. Use the FindMatches transform ...
- **C**: tidak memenuhi constraint utama soal — Create an AWS Glue crawler to craw the databases. Use Amazon SageMaker to construct Apache Spark ML pipelines to find duplicate records in the data.
- **D**: tidak memenuhi constraint utama soal — Create a provisioned Amazon EMR cluster to process and analyze data in the databases. Connect to the Apache Zeppelin notebook. Use an Apache Spark ML model t...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145289-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q159. [github_examtopics_cache]
*App id: `LOC-159`*

A company receives .csv files that contain physical address data. The data is in columns that have the following names: Door_No, Street_Name, City, and Zip_Code. The company wants to create a single column to store these values in the following format:
//IMG//

Which solution will meet this requirement with the LEAST coding effort?

- A. Use AWS Glue DataBrew to read the files. Use the NEST_TO_ARRAY transformation to create the new column.
- B. Use AWS Glue DataBrew to read the files. Use the NEST_TO_MAP transformation to create the new column.
- C. Use AWS Glue DataBrew to read the files. Use the PIVOT transformation to create the new column.
- D. Write a Lambda function in Python to read the files. Use the Python data dictionary type to create the new column.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use AWS Glue DataBrew to read the files. Use the NEST_TO_MAP transformation to create the new column..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Glue DataBrew to read the files. Use the NEST_TO_ARRAY transformation to create the new column.
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue DataBrew to read the files. Use the PIVOT transformation to create the new column.
- **D**: tidak memenuhi constraint utama soal — Write a Lambda function in Python to read the files. Use the Python data dictionary type to create the new column.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/135424-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q160. [github_examtopics_cache]
*App id: `LOC-160`*

A company receives a daily file that contains customer data in .xls format. The company stores the file in Amazon S3. The daily file is approximately 2 GB in size.
A data engineer concatenates the column in the file that contains customer first names and the column that contains customer last names. The data engineer needs to determine the number of distinct customers in the file.
Which solution will meet this requirement with the LEAST operational effort?

- A. Create and run an Apache Spark job in an AWS Glue notebook. Configure the job to read the S3 file and calculate the number of distinct customers.
- B. Create an AWS Glue crawler to create an AWS Glue Data Catalog of the S3 file. Run SQL queries from Amazon Athena to calculate the number of distinct customers.
- C. Create and run an Apache Spark job in Amazon EMR Serverless to calculate the number of distinct customers.
- D. Use AWS Glue DataBrew to create a recipe that uses the COUNT_DISTINCT aggregate function to calculate the number of distinct customers.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use AWS Glue DataBrew to create a recipe that uses the COUNT_DISTINCT aggregate function to calculate the number of distinct customers..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create and run an Apache Spark job in an AWS Glue notebook. Configure the job to read the S3 file and calculate the number of distinct customers.
- **B**: tidak memenuhi constraint utama soal — Create an AWS Glue crawler to create an AWS Glue Data Catalog of the S3 file. Run SQL queries from Amazon Athena to calculate the number of distinct customers.
- **C**: tidak memenuhi constraint utama soal — Create and run an Apache Spark job in Amazon EMR Serverless to calculate the number of distinct customers.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132700-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q161. [github_examtopics_cache]
*App id: `LOC-161`*

A company receives a data file from a partner each day in an Amazon S3 bucket. The company uses a daily AWS Glue extract, transform, and load (ETL) pipeline to clean and transform each data file. The output of the ETL pipeline is written to a CSV file named Daily.csv in a second S3 bucket.

Occasionally, the daily data file is empty or is missing values for required fields. When the file is missing data, the company can use the previous day’s CSV file.

A data engineer needs to ensure that the previous day's data file is overwritten only if the new daily file is complete and valid.

Which solution will meet these requirements with the LEAST effort?

- A. Invoke an AWS Lambda function to check the file for missing data and to fill in missing values in required fields.
- B. Configure the AWS Glue ETL pipeline to use AWS Glue Data Quality rules. Develop rules in Data Quality Definition Language (DQDL) to check for missing values in required fields and empty files.
- C. Use AWS Glue Studio to change the code in the ETL pipeline to fill in any missing values in the required fields with the most common values for each field.
- D. Run a SQL query in Amazon Athena to read the CSV file and drop missing rows. Copy the corrected CSV file to the second S3 bucket.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Configure the AWS Glue ETL pipeline to use AWS Glue Data Quality rules. Develop rules in Data Quality Definition Language (DQDL) to check for missing values in required fields and empty files..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Invoke an AWS Lambda function to check the file for missing data and to fill in missing values in required fields.
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue Studio to change the code in the ETL pipeline to fill in any missing values in the required fields with the most common values for each field.
- **D**: tidak memenuhi constraint utama soal — Run a SQL query in Amazon Athena to read the CSV file and drop missing rows. Copy the corrected CSV file to the second S3 bucket.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151940-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q162. [github_examtopics_cache]
*App id: `LOC-162`*

A company receives call logs as Amazon S3 objects that contain sensitive customer information. The company must protect the S3 objects by using encryption. The company must also use encryption keys that only specific employees can access.
Which solution will meet these requirements with the LEAST effort?

- A. Use an AWS CloudHSM cluster to store the encryption keys. Configure the process that writes to Amazon S3 to make calls to CloudHSM to encrypt and decrypt the objects. Deploy an IAM policy that restricts access to the CloudHSM cluster.
- B. Use server-side encryption with customer-provided keys (SSE-C) to encrypt the objects that contain customer information. Restrict access to the keys that encrypt the objects.
- C. Use server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the objects that contain customer information. Configure an IAM policy that restricts access to the KMS keys that encrypt the objects.
- D. Use server-side encryption with Amazon S3 managed keys (SSE-S3) to encrypt the objects that contain customer information. Configure an IAM policy that restricts access to the Amazon S3 managed keys that encrypt the objects.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the objects that contain customer information. Configure an IAM policy that restricts access to the KMS keys that encrypt the objects..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
- KMS mengelola kunci enkripsi; pastikan grant/policy sesuai akses layanan.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use an AWS CloudHSM cluster to store the encryption keys. Configure the process that writes to Amazon S3 to make calls to CloudHSM to encrypt and decrypt the...
- **B**: tidak memenuhi constraint utama soal — Use server-side encryption with customer-provided keys (SSE-C) to encrypt the objects that contain customer information. Restrict access to the keys that enc...
- **D**: tidak memenuhi constraint utama soal — Use server-side encryption with Amazon S3 managed keys (SSE-S3) to encrypt the objects that contain customer information. Configure an IAM policy that restri...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132696-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q163. [github_examtopics_cache]
*App id: `LOC-163`*

A company receives test results from testing facilities that are located around the world. The company stores the test results in millions of 1 KB JSON files in an Amazon S3 bucket. A data engineer needs to process the files, convert them into Apache Parquet format, and load them into Amazon Redshift tables. The data engineer uses AWS Glue to process the files, AWS Step Functions to orchestrate the processes, and Amazon EventBridge to schedule jobs.

The company recently added more testing facilities. The time required to process files is increasing. The data engineer must reduce the data processing time.

Which solution will MOST reduce the data processing time?

- A. Use AWS Lambda to group the raw input files into larger files. Write the larger files back to Amazon S3. Use AWS Glue to process the files. Load the files into the Amazon Redshift tables.
- B. Use the AWS Glue dynamic frame file-grouping option to ingest the raw input files. Process the files. Load the files into the Amazon Redshift tables.
- C. Use the Amazon Redshift COPY command to move the raw input files from Amazon S3 directly into the Amazon Redshift tables. Process the files in Amazon Redshift.
- D. Use Amazon EMR instead of AWS Glue to group the raw input files. Process the files in Amazon EMR. Load the files into the Amazon Redshift tables.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the AWS Glue dynamic frame file-grouping option to ingest the raw input files. Process the files. Load the files into the Amazon Redshift tables..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Lambda to group the raw input files into larger files. Write the larger files back to Amazon S3. Use AWS Glue to process the files. Load the files in...
- **C**: tidak memenuhi constraint utama soal — Use the Amazon Redshift COPY command to move the raw input files from Amazon S3 directly into the Amazon Redshift tables. Process the files in Amazon Redshift.
- **D**: tidak memenuhi constraint utama soal — Use Amazon EMR instead of AWS Glue to group the raw input files. Process the files in Amazon EMR. Load the files into the Amazon Redshift tables.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145729-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q164. [github_examtopics_cache]
*App id: `LOC-164`*

A company saves customer data to an Amazon S3 bucket. The company uses server-side encryption with AWS KMS keys (SSE-KMS) to encrypt the bucket. The dataset includes personally identifiable information (PII) such as social security numbers and account details.

Data that is tagged as PII must be masked before the company uses customer data for analysis. Some users must have secure access to the PII data during the pre-processing phase. The company needs a low-maintenance solution to mask and secure the PII data throughout the entire engineering pipeline.

Which combination of solutions will meet these requirements? (Choose two.)

- A. Use AWS Glue DataBrew to perform extract, transform, and load (ETL) tasks that mask the PII data before analysis.
- B. Use Amazon GuardDuty to monitor access patterns for the PII data that is used in the engineering pipeline.
- C. Configure an Amazon Macie discovery job for the S3 bucket.
- D. Use AWS Identity and Access Management (IAM) to manage permissions and to control access to the PII data.
- E. Write custom scripts in an application to mask the PII data and to control access.

**Answer:** AD

**Pembahasan:** Jawaban yang tepat adalah **AD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Use AWS Glue DataBrew to perform extract, transform, and load (ETL) tasks that mask the PII data before analysis.
- **D**: Use AWS Identity and Access Management (IAM) to manage permissions and to control access to the PII data.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use Amazon GuardDuty to monitor access patterns for the PII data that is used in the engineering pipeline.
- **C**: tidak memenuhi constraint utama soal — Configure an Amazon Macie discovery job for the S3 bucket.
- **E**: tidak memenuhi constraint utama soal — Write custom scripts in an application to mask the PII data and to control access.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151945-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q165. [github_examtopics_cache]
*App id: `LOC-165`*

A company stores 10 to 15 TB of uncompressed .csv files in Amazon S3. The company is evaluating Amazon Athena as a one-time query engine.

The company wants to transform the data to optimize query runtime and storage costs.

Which file format and compression solution will meet these requirements for Athena queries?

- A. .csv format compressed with zip
- B. JSON format compressed with bzip2
- C. Apache Parquet format compressed with Snappy
- D. Apache Avro format compressed with LZO

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Apache Parquet format compressed with Snappy.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — .csv format compressed with zip
- **B**: tidak memenuhi constraint utama soal — JSON format compressed with bzip2
- **D**: tidak memenuhi constraint utama soal — Apache Avro format compressed with LZO
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142529-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q166. [github_examtopics_cache]
*App id: `LOC-166`*

A company stores CSV files in an Amazon S3 bucket. A data engineer needs to process the data in the CSV files and store the processed data in a new S3 bucket.

The process needs to rename a column, remove specific columns, ignore the second row of each file, create a new column based on the values of the first row of the data, and filter the results by a numeric value of a column.

Which solution will meet these requirements with the LEAST development effort?

- A. Use AWS Glue Python jobs to read and transform the CSV files.
- B. Use an AWS Glue custom crawler to read and transform the CSV files.
- C. Use an AWS Glue workflow to build a set of jobs to crawl and transform the CSV files.
- D. Use AWS Glue DataBrew recipes to read and transform the CSV files.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use AWS Glue DataBrew recipes to read and transform the CSV files..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Glue Python jobs to read and transform the CSV files.
- **B**: tidak memenuhi constraint utama soal — Use an AWS Glue custom crawler to read and transform the CSV files.
- **C**: tidak memenuhi constraint utama soal — Use an AWS Glue workflow to build a set of jobs to crawl and transform the CSV files.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/152017-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q167. [github_examtopics_cache]
*App id: `LOC-167`*

A company stores customer data in an Amazon S3 bucket. Multiple teams in the company want to use the customer data for downstream analysis. The company needs to ensure that the teams do not have access to personally identifiable information (PII) about the customers.

Which solution will meet this requirement with LEAST operational overhead?

- A. Use Amazon Macie to create and run a sensitive data discovery job to detect and remove PII.
- B. Use S3 Object Lambda to access the data, and use Amazon Comprehend to detect and remove PII.
- C. Use Amazon Data Firehose and Amazon Comprehend to detect and remove PII.
- D. Use an AWS Glue DataBrew job to store the PII data in a second S3 bucket. Perform analysis on the data that remains in the original S3 bucket.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use S3 Object Lambda to access the data, and use Amazon Comprehend to detect and remove PII..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Macie to create and run a sensitive data discovery job to detect and remove PII.
- **C**: tidak memenuhi constraint utama soal — Use Amazon Data Firehose and Amazon Comprehend to detect and remove PII.
- **D**: tidak memenuhi constraint utama soal — Use an AWS Glue DataBrew job to store the PII data in a second S3 bucket. Perform analysis on the data that remains in the original S3 bucket.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150743-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q168. [github_examtopics_cache]
*App id: `LOC-168`*

A company stores customer data tables that include customer addresses in an AWS Lake Formation data lake. To comply with new regulations, the company must ensure that users cannot access data for customers who are in Canada.

The company needs a solution that will prevent user access to rows for customers who are in Canada.

Which solution will meet this requirement with the LEAST operational effort?

- A. Set a row-level filter to prevent user access to a row where the country is Canada.
- B. Create an IAM role that restricts user access to an address where the country is Canada.
- C. Set a column-level filter to prevent user access to a row where the country is Canada.
- D. Apply a tag to all rows where Canada is the country. Prevent user access where the tag is equal to “Canada”.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Set a row-level filter to prevent user access to a row where the country is Canada..
Konteks layanan terkait:
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create an IAM role that restricts user access to an address where the country is Canada.
- **C**: tidak memenuhi constraint utama soal — Set a column-level filter to prevent user access to a row where the country is Canada.
- **D**: tidak memenuhi constraint utama soal — Apply a tag to all rows where Canada is the country. Prevent user access where the tag is equal to “Canada”.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145293-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q169. [github_examtopics_cache]
*App id: `LOC-169`*

A company stores customer data that contains personally identifiable information (PII) in an Amazon Redshift cluster. The company's marketing, claims, and analytics teams need to be able to access the customer data.

The marketing team should have access to obfuscated claim information but should have full access to customer contact information. The claims team should have access to customer information for each claim that the team processes. The analytics team should have access only to obfuscated PII data.

Which solution will enforce these data access requirements with the LEAST administrative overhead?

- A. Create a separate Redshift cluster for each team. Load only the required data for each team. Restrict access to clusters based on the teams.
- B. Create views that include required fields for each of the data requirements. Grant the teams access only to the view that each team requires.
- C. Create a separate Amazon Redshift database role for each team. Define masking policies that apply for each team separately. Attach appropriate masking policies to each team role.
- D. Move the customer data to an Amazon S3 bucket. Use AWS Lake Formation to create a data lake. Use fine-grained security capabilities to grant each team appropriate permissions to access the data.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create a separate Amazon Redshift database role for each team. Define masking policies that apply for each team separately. Attach appropriate masking policies to each team role..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a separate Redshift cluster for each team. Load only the required data for each team. Restrict access to clusters based on the teams.
- **B**: tidak memenuhi constraint utama soal — Create views that include required fields for each of the data requirements. Grant the teams access only to the view that each team requires.
- **D**: tidak memenuhi constraint utama soal — Move the customer data to an Amazon S3 bucket. Use AWS Lake Formation to create a data lake. Use fine-grained security capabilities to grant each team approp...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150885-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q170. [github_examtopics_cache]
*App id: `LOC-170`*

A company stores customer records in Amazon S3. The company must not delete or modify the customer record data for 7 years after each record is created. The root user also must not have the ability to delete or modify the data.

A data engineer wants to use S3 Object Lock to secure the data.

Which solution will meet these requirements?

- A. Enable governance mode on the S3 bucket. Use a default retention period of 7 years.
- B. Enable compliance mode on the S3 bucket. Use a default retention period of 7 years.
- C. Place a legal hold on individual objects in the S3 bucket. Set the retention period to 7 years.
- D. Set the retention period for individual objects in the S3 bucket to 7 years.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Enable compliance mode on the S3 bucket. Use a default retention period of 7 years..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Enable governance mode on the S3 bucket. Use a default retention period of 7 years.
- **C**: tidak memenuhi constraint utama soal — Place a legal hold on individual objects in the S3 bucket. Set the retention period to 7 years.
- **D**: tidak memenuhi constraint utama soal — Set the retention period for individual objects in the S3 bucket to 7 years.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151919-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q171. [github_examtopics_cache]
*App id: `LOC-171`*

A company stores daily records of the financial performance of investment portfolios in .csv format in an Amazon S3 bucket. A data engineer uses AWS Glue crawlers to crawl the S3 data.
The data engineer must make the S3 data accessible daily in the AWS Glue Data Catalog.
Which solution will meet these requirements?

- A. Create an IAM role that includes the AmazonS3FullAccess policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Create a daily schedule to run the crawler. Configure the output destination to a new path in the existing S3 bucket.
- B. Create an IAM role that includes the AWSGlueServiceRole policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Create a daily schedule to run the crawler. Specify a database name for the output.
- C. Create an IAM role that includes the AmazonS3FullAccess policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Allocate data processing units (DPUs) to run the crawler every day. Specify a database name for the output.
- D. Create an IAM role that includes the AWSGlueServiceRole policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Allocate data processing units (DPUs) to run the crawler every day. Configure the output destination to a new path in the existing S3 bucket.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an IAM role that includes the AWSGlueServiceRole policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Create a daily schedule to run the crawler. Specify a database name for the output..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an IAM role that includes the AmazonS3FullAccess policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the cra...
- **C**: tidak memenuhi constraint utama soal — Create an IAM role that includes the AmazonS3FullAccess policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the cra...
- **D**: tidak memenuhi constraint utama soal — Create an IAM role that includes the AWSGlueServiceRole policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the cra...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131709-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q172. [github_examtopics_cache]
*App id: `LOC-172`*

A company stores data from an application in an Amazon DynamoDB table that operates in provisioned capacity mode. The workloads of the application have predictable throughput load on a regular schedule. Every Monday, there is an immediate increase in activity early in the morning. The application has very low usage during weekends.
The company must ensure that the application performs consistently during peak usage times.
Which solution will meet these requirements in the MOST cost-effective way?

- A. Increase the provisioned capacity to the maximum capacity that is currently present during peak load times.
- B. Divide the table into two tables. Provision each table with half of the provisioned capacity of the original table. Spread queries evenly across both tables.
- C. Use AWS Application Auto Scaling to schedule higher provisioned capacity for peak usage times. Schedule lower capacity during off-peak times.
- D. Change the capacity mode from provisioned to on-demand. Configure the table to scale up and scale down based on the load on the table.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use AWS Application Auto Scaling to schedule higher provisioned capacity for peak usage times. Schedule lower capacity during off-peak times..
Konteks layanan terkait:
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Increase the provisioned capacity to the maximum capacity that is currently present during peak load times.
- **B**: tidak memenuhi constraint utama soal — Divide the table into two tables. Provision each table with half of the provisioned capacity of the original table. Spread queries evenly across both tables.
- **D**: tidak memenuhi constraint utama soal — Change the capacity mode from provisioned to on-demand. Configure the table to scale up and scale down based on the load on the table.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132678-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q173. [github_examtopics_cache]
*App id: `LOC-173`*

A company stores data in a data lake that is in Amazon S3. Some data that the company stores in the data lake contains personally identifiable information (PII). Multiple user groups need to access the raw data. The company must ensure that user groups can access only the PII that they require.
Which solution will meet these requirements with the LEAST effort?

- A. Use Amazon Athena to query the data. Set up AWS Lake Formation and create data filters to establish levels of access for the company's IAM roles. Assign each user to the IAM role that matches the user's PII access requirements.
- B. Use Amazon QuickSight to access the data. Use column-level security features in QuickSight to limit the PII that users can retrieve from Amazon S3 by using Amazon Athena. Define QuickSight access levels based on the PII access requirements of the users.
- C. Build a custom query builder UI that will run Athena queries in the background to access the data. Create user groups in Amazon Cognito. Assign access levels to the user groups based on the PII access requirements of the users.
- D. Create IAM roles that have different levels of granular access. Assign the IAM roles to IAM user groups. Use an identity-based policy to assign access levels to user groups at the column level.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use Amazon Athena to query the data. Set up AWS Lake Formation and create data filters to establish levels of access for the company's IAM roles. Assign each user to the IAM role that matches the user's PII access requirements..
Konteks layanan terkait:
- Lake Formation dipakai untuk tata kelola data lake, termasuk izin kolom/baris.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use Amazon QuickSight to access the data. Use column-level security features in QuickSight to limit the PII that users can retrieve from Amazon S3 by using A...
- **C**: tidak memenuhi constraint utama soal — Build a custom query builder UI that will run Athena queries in the background to access the data. Create user groups in Amazon Cognito. Assign access levels...
- **D**: tidak memenuhi constraint utama soal — Create IAM roles that have different levels of granular access. Assign the IAM roles to IAM user groups. Use an identity-based policy to assign access levels...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132689-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q174. [github_examtopics_cache]
*App id: `LOC-174`*

A company stores datasets in JSON format and .csv format in an Amazon S3 bucket. The company has Amazon RDS for Microsoft SQL Server databases, Amazon DynamoDB tables that are in provisioned capacity mode, and an Amazon Redshift cluster. A data engineering team must develop a solution that will give data scientists the ability to query all data sources by using syntax similar to SQL.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use AWS Glue to crawl the data sources. Store metadata in the AWS Glue Data Catalog. Use Amazon Athena to query the data. Use SQL for structured data sources. Use PartiQL for data that is stored in JSON format.
- B. Use AWS Glue to crawl the data sources. Store metadata in the AWS Glue Data Catalog. Use Redshift Spectrum to query the data. Use SQL for structured data sources. Use PartiQL for data that is stored in JSON format.
- C. Use AWS Glue to crawl the data sources. Store metadata in the AWS Glue Data Catalog. Use AWS Glue jobs to transform data that is in JSON format to Apache Parquet or .csv format. Store the transformed data in an S3 bucket. Use Amazon Athena to query the original and transformed data from the S3 bucket.
- D. Use AWS Lake Formation to create a data lake. Use Lake Formation jobs to transform the data from all data sources to Apache Parquet format. Store the transformed data in an S3 bucket. Use Amazon Athena or Redshift Spectrum to query the data.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use AWS Glue to crawl the data sources. Store metadata in the AWS Glue Data Catalog. Use Amazon Athena to query the data. Use SQL for structured data sources. Use PartiQL for data that is stored in JSON format..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue to crawl the data sources. Store metadata in the AWS Glue Data Catalog. Use Redshift Spectrum to query the data. Use SQL for structured data sou...
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue to crawl the data sources. Store metadata in the AWS Glue Data Catalog. Use AWS Glue jobs to transform data that is in JSON format to Apache Par...
- **D**: tidak memenuhi constraint utama soal — Use AWS Lake Formation to create a data lake. Use Lake Formation jobs to transform the data from all data sources to Apache Parquet format. Store the transfo...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132702-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q175. [github_examtopics_cache]
*App id: `LOC-175`*

A company stores details about transactions in an Amazon S3 bucket. The company wants to log all writes to the S3 bucket into another S3 bucket that is in the same AWS Region.
Which solution will meet this requirement with the LEAST operational effort?

- A. Configure an S3 Event Notifications rule for all activities on the transactions S3 bucket to invoke an AWS Lambda function. Program the Lambda function to write the event to Amazon Kinesis Data Firehose. Configure Kinesis Data Firehose to write the event to the logs S3 bucket.
- B. Create a trail of management events in AWS CloudTraiL. Configure the trail to receive data from the transactions S3 bucket. Specify an empty prefix and write-only events. Specify the logs S3 bucket as the destination bucket.
- C. Configure an S3 Event Notifications rule for all activities on the transactions S3 bucket to invoke an AWS Lambda function. Program the Lambda function to write the events to the logs S3 bucket.
- D. Create a trail of data events in AWS CloudTraiL. Configure the trail to receive data from the transactions S3 bucket. Specify an empty prefix and write-only events. Specify the logs S3 bucket as the destination bucket.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Create a trail of data events in AWS CloudTraiL. Configure the trail to receive data from the transactions S3 bucket. Specify an empty prefix and write-only events. Specify the logs S3 bucket as the destination bucket..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Configure an S3 Event Notifications rule for all activities on the transactions S3 bucket to invoke an AWS Lambda function. Program the Lambda function to wr...
- **B**: tidak memenuhi constraint utama soal — Create a trail of management events in AWS CloudTraiL. Configure the trail to receive data from the transactions S3 bucket. Specify an empty prefix and write...
- **C**: tidak memenuhi constraint utama soal — Configure an S3 Event Notifications rule for all activities on the transactions S3 bucket to invoke an AWS Lambda function. Program the Lambda function to wr...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132684-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q176. [github_examtopics_cache]
*App id: `LOC-176`*

A company stores employee data in Amazon Resdshift. A table names Employee uses columns named Region ID, Department ID, and Role ID as a compound sort key.

Which queries will MOST increase the speed of query by using a compound sort key of the table? (Choose two.)

- A. Select *from Employee where Region ID=’North America’;
- B. Select *from Employee where Region ID=’North America’ and Department ID=20;
- C. Select *from Employee where Department ID=20 and Region ID=’North America’;
- D. Select *from Employee where Role ID=50;
- E. Select *from Employee where Region ID=’North America’ and Role ID=50;

**Answer:** BE

**Pembahasan:** Jawaban yang tepat adalah **BE**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Select *from Employee where Region ID=’North America’ and Department ID=20;
- **E**: Select *from Employee where Region ID=’North America’ and Role ID=50;
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Select *from Employee where Region ID=’North America’;
- **C**: tidak memenuhi constraint utama soal — Select *from Employee where Department ID=20 and Region ID=’North America’;
- **D**: tidak memenuhi constraint utama soal — Select *from Employee where Role ID=50;
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145119-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q177. [github_examtopics_cache]
*App id: `LOC-177`*

A company stores its processed data in an S3 bucket. The company has a strict data access policy. The company uses IAM roles to grant teams within the company different levels of access to the S3 bucket.

The company wants to receive notifications when a user violates the data access policy. Each notification must include the username of the user who violated the policy.

Which solution will meet these requirements?

- A. Use AWS Config rules to detect violations of the data access policy. Set up compliance alarms.
- B. Use Amazon CloudWatch metrics to gather object-level metrics. Set up CloudWatch alarms.
- C. Use AWS CloudTrail to track object-level events for the S3 bucket. Forward events to Amazon CloudWatch to set up CloudWatch alarms.
- D. Use Amazon S3 server access logs to monitor access to the bucket. Forward the access logs to an Amazon CloudWatch log group. Use metric filters on the log group to set up CloudWatch alarms.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use AWS CloudTrail to track object-level events for the S3 bucket. Forward events to Amazon CloudWatch to set up CloudWatch alarms..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Config rules to detect violations of the data access policy. Set up compliance alarms.
- **B**: tidak memenuhi constraint utama soal — Use Amazon CloudWatch metrics to gather object-level metrics. Set up CloudWatch alarms.
- **D**: tidak memenuhi constraint utama soal — Use Amazon S3 server access logs to monitor access to the bucket. Forward the access logs to an Amazon CloudWatch log group. Use metric filters on the log gr...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150741-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q178. [github_examtopics_cache]
*App id: `LOC-178`*

A company stores logs in an Amazon S3 bucket. When a data engineer attempts to access several log files, the data engineer discovers that some files have been unintentionally deleted.

The data engineer needs a solution that will prevent unintentional file deletion in the future.

Which solution will meet this requirement with the LEAST operational overhead?

- A. Manually back up the S3 bucket on a regular basis.
- B. Enable S3 Versioning for the S3 bucket.
- C. Configure replication for the S3 bucket.
- D. Use an Amazon S3 Glacier storage class to archive the data that is in the S3 bucket.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Enable S3 Versioning for the S3 bucket..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Manually back up the S3 bucket on a regular basis.
- **C**: tidak memenuhi constraint utama soal — Configure replication for the S3 bucket.
- **D**: tidak memenuhi constraint utama soal — Use an Amazon S3 Glacier storage class to archive the data that is in the S3 bucket.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143120-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q179. [github_examtopics_cache]
*App id: `LOC-179`*

A company stores petabytes of data in thousands of Amazon S3 buckets in the S3 Standard storage class. The data supports analytics workloads that have unpredictable and variable data access patterns.
The company does not access some data for months. However, the company must be able to retrieve all data within milliseconds. The company needs to optimize S3 storage costs.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use S3 Storage Lens standard metrics to determine when to move objects to more cost-optimized storage classes. Create S3 Lifecycle policies for the S3 buckets to move objects to cost-optimized storage classes. Continue to refine the S3 Lifecycle policies in the future to optimize storage costs.
- B. Use S3 Storage Lens activity metrics to identify S3 buckets that the company accesses infrequently. Configure S3 Lifecycle rules to move objects from S3 Standard to the S3 Standard-Infrequent Access (S3 Standard-IA) and S3 Glacier storage classes based on the age of the data.
- C. Use S3 Intelligent-Tiering. Activate the Deep Archive Access tier.
- D. Use S3 Intelligent-Tiering. Use the default access tier.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use S3 Intelligent-Tiering. Use the default access tier..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use S3 Storage Lens standard metrics to determine when to move objects to more cost-optimized storage classes. Create S3 Lifecycle policies for the S3 bucket...
- **B**: tidak memenuhi constraint utama soal — Use S3 Storage Lens activity metrics to identify S3 buckets that the company accesses infrequently. Configure S3 Lifecycle rules to move objects from S3 Stan...
- **C**: tidak memenuhi constraint utama soal — Use S3 Intelligent-Tiering. Activate the Deep Archive Access tier.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132697-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q180. [github_examtopics_cache]
*App id: `LOC-180`*

A company stores server logs in an Amazon S3 bucket. The company needs to keep the logs for 1 year. The logs are not required after 1 year.

A data engineer needs a solution to automatically delete logs that are older than 1 year.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Define an S3 Lifecycle configuration to delete the logs after 1 year.
- B. Create an AWS Lambda function to delete the logs after 1 year.
- C. Schedule a cron job on an Amazon EC2 instance to delete the logs after 1 year.
- D. Configure an AWS Step Functions state machine to delete the logs after 1 year.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Define an S3 Lifecycle configuration to delete the logs after 1 year..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create an AWS Lambda function to delete the logs after 1 year.
- **C**: tidak memenuhi constraint utama soal — Schedule a cron job on an Amazon EC2 instance to delete the logs after 1 year.
- **D**: tidak memenuhi constraint utama soal — Configure an AWS Step Functions state machine to delete the logs after 1 year.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153366-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q181. [github_examtopics_cache]
*App id: `LOC-181`*

A company uploads .csv files to an Amazon S3 bucket. The company’s data platform team has set up an AWS Glue crawler to perform data discovery and to create the tables and schemas.

An AWS Glue job writes processed data from the tables to an Amazon Redshift database. The AWS Glue job handles column mapping and creates the Amazon Redshift tables in the Redshift database appropriately.

If the company reruns the AWS Glue job for any reason, duplicate records are introduced into the Amazon Redshift tables. The company needs a solution that will update the Redshift tables without duplicates.

Which solution will meet these requirements?

- A. Modify the AWS Glue job to copy the rows into a staging Redshift table. Add SQL commands to update the existing rows with new values from the staging Redshift table.
- B. Modify the AWS Glue job to load the previously inserted data into a MySQL database. Perform an upsert operation in the MySQL database. Copy the results to the Amazon Redshift tables.
- C. Use Apache Spark’s DataFrame dropDuplicates() API to eliminate duplicates. Write the data to the Redshift tables.
- D. Use the AWS Glue ResolveChoice built-in transform to select the value of the column from the most recent record.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Modify the AWS Glue job to copy the rows into a staging Redshift table. Add SQL commands to update the existing rows with new values from the staging Redshift table..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Modify the AWS Glue job to load the previously inserted data into a MySQL database. Perform an upsert operation in the MySQL database. Copy the results to th...
- **C**: tidak memenuhi constraint utama soal — Use Apache Spark’s DataFrame dropDuplicates() API to eliminate duplicates. Write the data to the Redshift tables.
- **D**: tidak memenuhi constraint utama soal — Use the AWS Glue ResolveChoice built-in transform to select the value of the column from the most recent record.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145107-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q182. [github_examtopics_cache]
*App id: `LOC-182`*

A company uses AWS Glue Data Catalog to index data that is uploaded to an Amazon S3 bucket every day. The company uses a daily batch processes in an extract, transform, and load (ETL) pipeline to upload data from external sources into the S3 bucket.

The company runs a daily report on the S3 data. Some days, the company runs the report before all the daily data has been uploaded to the S3 bucket. A data engineer must be able to send a message that identifies any incomplete data to an existing Amazon Simple Notification Service (Amazon SNS) topic.

Which solution will meet this requirement with the LEAST operational overhead?

- A. Create data quality checks for the source datasets that the daily reports use. Create a new AWS managed Apache Airflow cluster. Run the data quality checks by using Airflow tasks that run data quality queries on the columns data type and the presence of null values. Configure Airflow Directed Acyclic Graphs (DAGs) to send an email notification that informs the data engineer about the incomplete datasets to the SNS topic.
- B. Create data quality checks on the source datasets that the daily reports use. Create a new Amazon EMR cluster. Use Apache Spark SQL to create Apache Spark jobs in the EMR cluster that run data quality queries on the columns data type and the presence of null values. Orchestrate the ETL pipeline by using an AWS Step Functions workflow. Configure the workflow to send an email notification that informs the data engineer about the incomplete datasets to the SNS topic.
- C. Create data quality checks on the source datasets that the daily reports use. Create data quality actions by using AWS Glue workflows to confirm the completeness and consistency of the datasets. Configure the data quality actions to create an event in Amazon EventBridge if a dataset is incomplete. Configure EventBridge to send the event that informs the data engineer about the incomplete datasets to the Amazon SNS topic.
- D. Create AWS Lambda functions that run data quality queries on the columns data type and the presence of null values. Orchestrate the ETL pipeline by using an AWS Step Functions workflow that runs the Lambda functions. Configure the Step Functions workflow to send an email notification that informs the data engineer about the incomplete datasets to the SNS topic.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create data quality checks on the source datasets that the daily reports use. Create data quality actions by using AWS Glue workflows to confirm the completeness and consistency of the datasets. Configure the data quality actions to create an event in Amazon EventBridge if a dataset is incomplete. Configure EventBridge to send the event that informs the data engineer about the incomplete datasets to the Amazon SNS topic..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create data quality checks for the source datasets that the daily reports use. Create a new AWS managed Apache Airflow cluster. Run the data quality checks b...
- **B**: tidak memenuhi constraint utama soal — Create data quality checks on the source datasets that the daily reports use. Create a new Amazon EMR cluster. Use Apache Spark SQL to create Apache Spark jo...
- **D**: tidak memenuhi constraint utama soal — Create AWS Lambda functions that run data quality queries on the columns data type and the presence of null values. Orchestrate the ETL pipeline by using an ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151935-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q183. [github_examtopics_cache]
*App id: `LOC-183`*

A company uses AWS Step Functions to orchestrate a data pipeline. The pipeline consists of Amazon EMR jobs that ingest data from data sources and store the data in an Amazon S3 bucket. The pipeline also includes EMR jobs that load the data to Amazon Redshift.
The company's cloud infrastructure team manually built a Step Functions state machine. The cloud infrastructure team launched an EMR cluster into a VPC to support the EMR jobs. However, the deployed Step Functions state machine is not able to run the EMR jobs.
Which combination of steps should the company take to identify the reason the Step Functions state machine is not able to run the EMR jobs? (Choose two.)

- A. Use AWS CloudFormation to automate the Step Functions state machine deployment. Create a step to pause the state machine during the EMR jobs that fail. Configure the step to wait for a human user to send approval through an email message. Include details of the EMR task in the email message for further analysis.
- B. Verify that the Step Functions state machine code has all IAM permissions that are necessary to create and run the EMR jobs. Verify that the Step Functions state machine code also includes IAM permissions to access the Amazon S3 buckets that the EMR jobs use. Use Access Analyzer for S3 to check the S3 access properties.
- C. Check for entries in Amazon CloudWatch for the newly created EMR cluster. Change the AWS Step Functions state machine code to use Amazon EMR on EKS. Change the IAM access policies and the security group configuration for the Step Functions state machine code to reflect inclusion of Amazon Elastic Kubernetes Service (Amazon EKS).
- D. Query the flow logs for the VPC. Determine whether the traffic that originates from the EMR cluster can successfully reach the data providers. Determine whether any security group that might be attached to the Amazon EMR cluster allows connections to the data source servers on the informed ports.
- E. Check the retry scenarios that the company configured for the EMR jobs. Increase the number of seconds in the interval between each EMR task. Validate that each fallback state has the appropriate catch for each decision state. Configure an Amazon Simple Notification Service (Amazon SNS) topic to store the error messages.

**Answer:** BD

**Pembahasan:** Jawaban yang tepat adalah **BD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Verify that the Step Functions state machine code has all IAM permissions that are necessary to create and run the EMR jobs. Verify that the Step Functions state machine code also includes IAM permissions to access the Amazon S3 buckets that the EMR jobs use. Use Access Analyzer for S3 to check the S3 access properties.
- **D**: Query the flow logs for the VPC. Determine whether the traffic that originates from the EMR cluster can successfully reach the data providers. Determine whether any security group that might be attached to the Amazon EMR cluster allows connections to the data source servers on the informed ports.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS CloudFormation to automate the Step Functions state machine deployment. Create a step to pause the state machine during the EMR jobs that fail. Confi...
- **C**: tidak memenuhi constraint utama soal — Check for entries in Amazon CloudWatch for the newly created EMR cluster. Change the AWS Step Functions state machine code to use Amazon EMR on EKS. Change t...
- **E**: tidak memenuhi constraint utama soal — Check the retry scenarios that the company configured for the EMR jobs. Increase the number of seconds in the interval between each EMR task. Validate that e...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132353-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q184. [github_examtopics_cache]
*App id: `LOC-184`*

A company uses Amazon Athena to run SQL queries for extract, transform, and load (ETL) tasks by using Create Table As Select (CTAS). The company must use Apache Spark instead of SQL to generate analytics.
Which solution will give the company the ability to use Spark to access Athena?

- A. Athena query settings
- B. Athena workgroup
- C. Athena data source
- D. Athena query editor

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Athena workgroup.
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Athena query settings
- **C**: tidak memenuhi constraint utama soal — Athena data source
- **D**: tidak memenuhi constraint utama soal — Athena query editor
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132667-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q185. [github_examtopics_cache]
*App id: `LOC-185`*

A company uses Amazon DataZone as a data governance and business catalog solution. The company stores data in an Amazon S3 data lake. The company uses AWS Glue with an AWS Glue Data Catalog.

A data engineer needs to publish AWS Glue Data Quality scores to the Amazon DataZone portal.

Which solution will meet this requirement?

- A. Create a data quality ruleset with Data Quality Definition language (DQDL) rules that apply to a specific AWS Glue table. Schedule the ruleset to run daily. Configure the Amazon DataZone project to have an Amazon Redshift data source. Enable the data quality configuration for the data source.
- B. Configure AWS Glue ETL jobs to use an Evaluate Data Quality transform. Define a data quality ruleset inside the jobs. Configure the Amazon DataZone project to have an AWS Glue data source. Enable the data quality configuration for the data source.
- C. Create a data quality ruleset with Data Quality Definition language (DQDL) rules that apply to a specific AWS Glue table. Schedule the ruleset to run daily. Configure the Amazon DataZone project to have an AWS Glue data source. Enable the data quality configuration for the data source.
- D. Configure AWS Glue ETL jobs to use an Evaluate Data Quality transform. Define a data quality ruleset inside the jobs. Configure the Amazon DataZone project to have an Amazon Redshift data source. Enable the data quality configuration for the data source.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create a data quality ruleset with Data Quality Definition language (DQDL) rules that apply to a specific AWS Glue table. Schedule the ruleset to run daily. Configure the Amazon DataZone project to have an AWS Glue data source. Enable the data quality configuration for the data source..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a data quality ruleset with Data Quality Definition language (DQDL) rules that apply to a specific AWS Glue table. Schedule the ruleset to run daily. ...
- **B**: tidak memenuhi constraint utama soal — Configure AWS Glue ETL jobs to use an Evaluate Data Quality transform. Define a data quality ruleset inside the jobs. Configure the Amazon DataZone project t...
- **D**: tidak memenuhi constraint utama soal — Configure AWS Glue ETL jobs to use an Evaluate Data Quality transform. Define a data quality ruleset inside the jobs. Configure the Amazon DataZone project t...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153156-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q186. [github_examtopics_cache]
*App id: `LOC-186`*

A company uses Amazon EMR as an extract, transform, and load (ETL) pipeline to transform data that comes from multiple sources. A data engineer must orchestrate the pipeline to maximize performance.

Which AWS service will meet this requirement MOST cost effectively?

- A. Amazon EventBridge
- B. Amazon Managed Workflows for Apache Airflow (Amazon MWAA)
- C. AWS Step Functions
- D. AWS Glue Workflows

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: AWS Step Functions.
Konteks layanan terkait:
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Amazon EventBridge
- **B**: tidak memenuhi constraint utama soal — Amazon Managed Workflows for Apache Airflow (Amazon MWAA)
- **D**: tidak memenuhi constraint utama soal — AWS Glue Workflows
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142535-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q187. [github_examtopics_cache]
*App id: `LOC-187`*

A company uses Amazon RDS for MySQL as the database for a critical application. The database workload is mostly writes, with a small number of reads.
A data engineer notices that the CPU utilization of the DB instance is very high. The high CPU utilization is slowing down the application. The data engineer must reduce the CPU utilization of the DB Instance.
Which actions should the data engineer take to meet this requirement? (Choose two.)

- A. Use the Performance Insights feature of Amazon RDS to identify queries that have high CPU utilization. Optimize the problematic queries.
- B. Modify the database schema to include additional tables and indexes.
- C. Reboot the RDS DB instance once each week.
- D. Upgrade to a larger instance size.
- E. Implement caching to reduce the database query load.

**Answer:** AD

**Pembahasan:** Jawaban yang tepat adalah **AD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Use the Performance Insights feature of Amazon RDS to identify queries that have high CPU utilization. Optimize the problematic queries.
- **D**: Upgrade to a larger instance size.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Modify the database schema to include additional tables and indexes.
- **C**: tidak memenuhi constraint utama soal — Reboot the RDS DB instance once each week.
- **E**: tidak memenuhi constraint utama soal — Implement caching to reduce the database query load.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/135451-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q188. [github_examtopics_cache]
*App id: `LOC-188`*

A company uses Amazon RDS to store transactional data. The company runs an RDS DB instance in a private subnet. A developer wrote an AWS Lambda function with default settings to insert, update, or delete data in the DB instance.
The developer needs to give the Lambda function the ability to connect to the DB instance privately without using the public internet.
Which combination of steps will meet this requirement with the LEAST operational overhead? (Choose two.)

- A. Turn on the public access setting for the DB instance.
- B. Update the security group of the DB instance to allow only Lambda function invocations on the database port.
- C. Configure the Lambda function to run in the same subnet that the DB instance uses.
- D. Attach the same security group to the Lambda function and the DB instance. Include a self-referencing rule that allows access through the database port.
- E. Update the network ACL of the private subnet to include a self-referencing rule that allows access through the database port.

**Answer:** CD

**Pembahasan:** Jawaban yang tepat adalah **CD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **C**: Configure the Lambda function to run in the same subnet that the DB instance uses.
- **D**: Attach the same security group to the Lambda function and the DB instance. Include a self-referencing rule that allows access through the database port.
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Turn on the public access setting for the DB instance.
- **B**: tidak memenuhi constraint utama soal — Update the security group of the DB instance to allow only Lambda function invocations on the database port.
- **E**: tidak memenuhi constraint utama soal — Update the network ACL of the private subnet to include a self-referencing rule that allows access through the database port.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132738-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q189. [github_examtopics_cache]
*App id: `LOC-189`*

A company uses Amazon Redshift as its data warehouse. Data encoding is applied to the existing tables of the data warehouse. A data engineer discovers that the compression encoding applied to some of the tables is not the best fit for the data.

The data engineer needs to improve the data encoding for the tables that have sub-optimal encoding.

Which solution will meet this requirement?

- A. Run the ANALYZE command against the identified tables. Manually update the compression encoding of columns based on the output of the command.
- B. Run the ANALYZE COMPRESSION command against the identified tables. Manually update the compression encoding of columns based on the output of the command.
- C. Run the VACUUM REINDEX command against the identified tables.
- D. Run the VACUUM RECLUSTER command against the identified tables.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Run the ANALYZE COMPRESSION command against the identified tables. Manually update the compression encoding of columns based on the output of the command..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Run the ANALYZE command against the identified tables. Manually update the compression encoding of columns based on the output of the command.
- **C**: tidak memenuhi constraint utama soal — Run the VACUUM REINDEX command against the identified tables.
- **D**: tidak memenuhi constraint utama soal — Run the VACUUM RECLUSTER command against the identified tables.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150749-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q190. [github_examtopics_cache]
*App id: `LOC-190`*

A company uses Amazon Redshift as its data warehouse service. A data engineer needs to design a physical data model.

The data engineer encounters a de-normalized table that is growing in size. The table does not have a suitable column to use as the distribution key.

Which distribution style should the data engineer use to meet these requirements with the LEAST maintenance overhead?

- A. ALL distribution
- B. EVEN distribution
- C. AUTO distribution
- D. KEY distribution

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: AUTO distribution.
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — ALL distribution
- **B**: tidak memenuhi constraint utama soal — EVEN distribution
- **D**: tidak memenuhi constraint utama soal — KEY distribution
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151853-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q191. [github_examtopics_cache]
*App id: `LOC-191`*

A company uses Amazon Redshift for its data warehouse. The company must automate refresh schedules for Amazon Redshift materialized views.
Which solution will meet this requirement with the LEAST effort?

- A. Use Apache Airflow to refresh the materialized views.
- B. Use an AWS Lambda user-defined function (UDF) within Amazon Redshift to refresh the materialized views.
- C. Use the query editor v2 in Amazon Redshift to refresh the materialized views.
- D. Use an AWS Glue workflow to refresh the materialized views.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use the query editor v2 in Amazon Redshift to refresh the materialized views..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Apache Airflow to refresh the materialized views.
- **B**: tidak memenuhi constraint utama soal — Use an AWS Lambda user-defined function (UDF) within Amazon Redshift to refresh the materialized views.
- **D**: tidak memenuhi constraint utama soal — Use an AWS Glue workflow to refresh the materialized views.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132674-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q192. [github_examtopics_cache]
*App id: `LOC-192`*

A company uses Amazon S3 as a data lake. The company sets up a data warehouse by using a multi-node Amazon Redshift cluster. The company organizes the data files in the data lake based on the data source of each data file.

The company loads all the data files into one table in the Redshift cluster by using a separate COPY command for each data file location. This approach takes a long time to load all the data files into the table. The company must increase the speed of the data ingestion. The company does not want to increase the cost of the process.

Which solution will meet these requirements?

- A. Use a provisioned Amazon EMR cluster to copy all the data files into one folder. Use a COPY command to load the data into Amazon Redshift.
- B. Load all the data files in parallel into Amazon Aurora. Run an AWS Glue job to load the data into Amazon Redshift.
- C. Use an AWS Give job to copy all the data files into one folder. Use a COPY command to load the data into Amazon Redshift.
- D. Create a manifest file that contains the data file locations. Use a COPY command to load the data into Amazon Redshift.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Create a manifest file that contains the data file locations. Use a COPY command to load the data into Amazon Redshift..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use a provisioned Amazon EMR cluster to copy all the data files into one folder. Use a COPY command to load the data into Amazon Redshift.
- **B**: tidak memenuhi constraint utama soal — Load all the data files in parallel into Amazon Aurora. Run an AWS Glue job to load the data into Amazon Redshift.
- **C**: tidak memenuhi constraint utama soal — Use an AWS Give job to copy all the data files into one folder. Use a COPY command to load the data into Amazon Redshift.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143056-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q193. [github_examtopics_cache]
*App id: `LOC-193`*

A company uses Amazon S3 to store data and Amazon QuickSight to create visualizations,

The company has an S3 bucket in an AWS account named Hub-Account. The S3 bucket is encrypted by an AWS Key Management Service (AWS KMS) key. The company's QuickSight instance is in a separate account named BI-Account.

The company updates the S3 bucket policy to grant access to the QuickSight service role. The company wants to enable cross-account access to allow QuickSight to interact with the S3 bucket.

Which combination of steps will meet this requirement? (Choose two.)

- A. Use the existing AWS KMS key to encrypt connections from QuickSight to the S3 bucket.
- B. Add the S3 bucket as a resource that the QuickSight service role can access.
- C. Use AWS Resource Access Manager (AWS RAM) to share the S3 bucket with the BI-Account account.
- D. Add an IAM policy to the QuickSight service role to give QuickSight access to the KMS key that encrypts the S3 bucket.
- E. Add the KMS key as a resource that the QuickSight service role can access.

**Answer:** E

**Pembahasan:** Jawaban yang tepat adalah **E**.
Opsi E paling sesuai karena: Add the KMS key as a resource that the QuickSight service role can access..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- KMS mengelola kunci enkripsi; pastikan grant/policy sesuai akses layanan.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use the existing AWS KMS key to encrypt connections from QuickSight to the S3 bucket.
- **B**: tidak memenuhi constraint utama soal — Add the S3 bucket as a resource that the QuickSight service role can access.
- **C**: tidak memenuhi constraint utama soal — Use AWS Resource Access Manager (AWS RAM) to share the S3 bucket with the BI-Account account.
- **D**: tidak memenuhi constraint utama soal — Add an IAM policy to the QuickSight service role to give QuickSight access to the KMS key that encrypts the S3 bucket.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150344-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q194. [github_examtopics_cache]
*App id: `LOC-194`*

A company uses Amazon S3 to store semi-structured data in a transactional data lake. Some of the data files are small, but other data files are tens of terabytes.
A data engineer must perform a change data capture (CDC) operation to identify changed data from the data source. The data source sends a full snapshot as a JSON file every day and ingests the changed data into the data lake.
Which solution will capture the changed data MOST cost-effectively?

- A. Create an AWS Lambda function to identify the changes between the previous data and the current data. Configure the Lambda function to ingest the changes into the data lake.
- B. Ingest the data into Amazon RDS for MySQL. Use AWS Database Migration Service (AWS DMS) to write the changed data to the data lake.
- C. Use an open source data lake format to merge the data source with the S3 data lake to insert the new data and update the existing data.
- D. Ingest the data into an Amazon Aurora MySQL DB instance that runs Aurora Serverless. Use AWS Database Migration Service (AWS DMS) to write the changed data to the data lake.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use an open source data lake format to merge the data source with the S3 data lake to insert the new data and update the existing data..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an AWS Lambda function to identify the changes between the previous data and the current data. Configure the Lambda function to ingest the changes int...
- **B**: tidak memenuhi constraint utama soal — Ingest the data into Amazon RDS for MySQL. Use AWS Database Migration Service (AWS DMS) to write the changed data to the data lake.
- **D**: tidak memenuhi constraint utama soal — Ingest the data into an Amazon Aurora MySQL DB instance that runs Aurora Serverless. Use AWS Database Migration Service (AWS DMS) to write the changed data t...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131705-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q195. [github_examtopics_cache]
*App id: `LOC-195`*

A company uses Apache Airflow to orchestrate the company's current on-premises data pipelines. The company runs SQL data quality check tasks as part of the pipelines. The company wants to migrate the pipelines to AWS and to use AWS managed services.

Which solution will meet these requirements with the LEAST amount of refactoring?

- A. Setup AWS Outposts in the AWS Region that is nearest to the location where the company uses Airflow. Migrate the servers into Outposts hosted Amazon EC2 instances. Update the pipelines to interact with the Outposts hosted EC2 instances instead of the on-premises pipelines.
- B. Create a custom Amazon Machine Image (AMI) that contains the Airflow application and the code that the company needs to migrate. Use the custom AMI to deploy Amazon EC2 instances. Update the network connections to interact with the newly deployed EC2 instances.
- C. Migrate the existing Airflow orchestration configuration into Amazon Managed Workflows for Apache Airflow (Amazon MWAA). Create the data quality checks during the ingestion to validate the data quality by using SQL tasks in Airflow.
- D. Convert the pipelines to AWS Step Functions workflows. Recreate the data quality checks in SQL as Python based AWS Lambda functions.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Migrate the existing Airflow orchestration configuration into Amazon Managed Workflows for Apache Airflow (Amazon MWAA). Create the data quality checks during the ingestion to validate the data quality by using SQL tasks in Airflow..
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Setup AWS Outposts in the AWS Region that is nearest to the location where the company uses Airflow. Migrate the servers into Outposts hosted Amazon EC2 inst...
- **B**: tidak memenuhi constraint utama soal — Create a custom Amazon Machine Image (AMI) that contains the Airflow application and the code that the company needs to migrate. Use the custom AMI to deploy...
- **D**: tidak memenuhi constraint utama soal — Convert the pipelines to AWS Step Functions workflows. Recreate the data quality checks in SQL as Python based AWS Lambda functions.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142558-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q196. [github_examtopics_cache]
*App id: `LOC-196`*

A company uses a data lake that is based on an Amazon S3 bucket. To comply with regulations, the company must apply two layers of server-side encryption to files that are uploaded to the S3 bucket. The company wants to use an AWS Lambda function to apply the necessary encryption.

Which solution will meet these requirements?

- A. Use both server-side encryption with AWS KMS keys (SSE-KMS) and the Amazon S3 Encryption Client.
- B. Use dual-layer server-side encryption with AWS KMS keys (DSSE-KMS).
- C. Use server-side encryption with customer-provided keys (SSE-C) before files are uploaded.
- D. Use server-side encryption with AWS KMS keys (SSE-KMS).

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use dual-layer server-side encryption with AWS KMS keys (DSSE-KMS)..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- KMS mengelola kunci enkripsi; pastikan grant/policy sesuai akses layanan.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use both server-side encryption with AWS KMS keys (SSE-KMS) and the Amazon S3 Encryption Client.
- **C**: tidak memenuhi constraint utama soal — Use server-side encryption with customer-provided keys (SSE-C) before files are uploaded.
- **D**: tidak memenuhi constraint utama soal — Use server-side encryption with AWS KMS keys (SSE-KMS).
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142579-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q197. [github_examtopics_cache]
*App id: `LOC-197`*

A company uses a variety of AWS and third-party data stores. The company wants to consolidate all the data into a central data warehouse to perform analytics. Users need fast response times for analytics queries.

The company uses Amazon QuickSight in direct query mode to visualize the data. Users normally run queries during a few hours each day with unpredictable spikes.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Use Amazon Redshift Serverless to load all the data into Amazon Redshift managed storage (RMS).
- B. Use Amazon Athena to load all the data into Amazon S3 in Apache Parquet format.
- C. Use Amazon Redshift provisioned clusters to load all the data into Amazon Redshift managed storage (RMS).
- D. Use Amazon Aurora PostgreSQL to load all the data into Aurora.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use Amazon Redshift Serverless to load all the data into Amazon Redshift managed storage (RMS)..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use Amazon Athena to load all the data into Amazon S3 in Apache Parquet format.
- **C**: tidak memenuhi constraint utama soal — Use Amazon Redshift provisioned clusters to load all the data into Amazon Redshift managed storage (RMS).
- **D**: tidak memenuhi constraint utama soal — Use Amazon Aurora PostgreSQL to load all the data into Aurora.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/152992-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q198. [github_examtopics_cache]
*App id: `LOC-198`*

A company uses an AWS Lambda function to transfer files from a legacy SFTP environment to Amazon S3 buckets. The Lambda function is VPC enabled to ensure that all communications between the Lambda function and other AVS services that are in the same VPC environment will occur over a secure network.

The Lambda function is able to connect to the SFTP environment successfully. However, when the Lambda function attempts to upload files to the S3 buckets, the Lambda function returns timeout errors. A data engineer must resolve the timeout issues in a secure way.

Which solution will meet these requirements in the MOST cost-effective way?

- A. Create a NAT gateway in the public subnet of the VPC. Route network traffic to the NAT gateway.
- B. Create a VPC gateway endpoint for Amazon S3. Route network traffic to the VPC gateway endpoint.
- C. Create a VPC interface endpoint for Amazon S3. Route network traffic to the VPC interface endpoint.
- D. Use a VPC internet gateway to connect to the internet. Route network traffic to the VPC internet gateway.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create a VPC gateway endpoint for Amazon S3. Route network traffic to the VPC gateway endpoint..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a NAT gateway in the public subnet of the VPC. Route network traffic to the NAT gateway.
- **C**: tidak memenuhi constraint utama soal — Create a VPC interface endpoint for Amazon S3. Route network traffic to the VPC interface endpoint.
- **D**: tidak memenuhi constraint utama soal — Use a VPC internet gateway to connect to the internet. Route network traffic to the VPC internet gateway.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145187-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q199. [github_examtopics_cache]
*App id: `LOC-199`*

A company uses an Amazon QuickSight dashboard to monitor usage of one of the company's applications. The company uses AWS Glue jobs to process data for the dashboard. The company stores the data in a single Amazon S3 bucket. The company adds new data every day.
A data engineer discovers that dashboard queries are becoming slower over time. The data engineer determines that the root cause of the slowing queries is long-running AWS Glue jobs.
Which actions should the data engineer take to improve the performance of the AWS Glue jobs? (Choose two.)

- A. Partition the data that is in the S3 bucket. Organize the data by year, month, and day.
- B. Increase the AWS Glue instance size by scaling up the worker type.
- C. Convert the AWS Glue schema to the DynamicFrame schema class.
- D. Adjust AWS Glue job scheduling frequency so the jobs run half as many times each day.
- E. Modify the IAM role that grants access to AWS glue to grant access to all S3 features.

**Answer:** AB

**Pembahasan:** Jawaban yang tepat adalah **AB**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Partition the data that is in the S3 bucket. Organize the data by year, month, and day.
- **B**: Increase the AWS Glue instance size by scaling up the worker type.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **C**: tidak memenuhi constraint utama soal — Convert the AWS Glue schema to the DynamicFrame schema class.
- **D**: tidak memenuhi constraint utama soal — Adjust AWS Glue job scheduling frequency so the jobs run half as many times each day.
- **E**: tidak memenuhi constraint utama soal — Modify the IAM role that grants access to AWS glue to grant access to all S3 features.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132734-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q200. [github_examtopics_cache]
*App id: `LOC-200`*

A company uses an Amazon Redshift cluster that runs on RA3 nodes. The company wants to scale read and write capacity to meet demand. A data engineer needs to identify a solution that will turn on concurrency scaling.
Which solution will meet this requirement?

- A. Turn on concurrency scaling in workload management (WLM) for Redshift Serverless workgroups.
- B. Turn on concurrency scaling at the workload management (WLM) queue level in the Redshift cluster.
- C. Turn on concurrency scaling in the settings during the creation of any new Redshift cluster.
- D. Turn on concurrency scaling for the daily usage quota for the Redshift cluster.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Turn on concurrency scaling at the workload management (WLM) queue level in the Redshift cluster..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Turn on concurrency scaling in workload management (WLM) for Redshift Serverless workgroups.
- **C**: tidak memenuhi constraint utama soal — Turn on concurrency scaling in the settings during the creation of any new Redshift cluster.
- **D**: tidak memenuhi constraint utama soal — Turn on concurrency scaling for the daily usage quota for the Redshift cluster.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131680-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q201. [github_examtopics_cache]
*App id: `LOC-201`*

A company uses an Amazon Redshift provisioned cluster as its database. The Redshift cluster has five reserved ra3.4xlarge nodes and uses key distribution.
A data engineer notices that one of the nodes frequently has a CPU load over 90%. SQL Queries that run on the node are queued. The other four nodes usually have a CPU load under 15% during daily operations.
The data engineer wants to maintain the current number of compute nodes. The data engineer also wants to balance the load more evenly across all five compute nodes.
Which solution will meet these requirements?

- A. Change the sort key to be the data column that is most often used in a WHERE clause of the SQL SELECT statement.
- B. Change the distribution key to the table column that has the largest dimension.
- C. Upgrade the reserved node from ra3.4xlarge to ra3.16xlarge.
- D. Change the primary key to be the data column that is most often used in a WHERE clause of the SQL SELECT statement.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Change the distribution key to the table column that has the largest dimension..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Change the sort key to be the data column that is most often used in a WHERE clause of the SQL SELECT statement.
- **C**: tidak memenuhi constraint utama soal — Upgrade the reserved node from ra3.4xlarge to ra3.16xlarge.
- **D**: tidak memenuhi constraint utama soal — Change the primary key to be the data column that is most often used in a WHERE clause of the SQL SELECT statement.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132681-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q202. [github_examtopics_cache]
*App id: `LOC-202`*

A company uses an on-premises Microsoft SQL Server database to store financial transaction data. The company migrates the transaction data from the on-premises database to AWS at the end of each month. The company has noticed that the cost to migrate data from the on-premises database to an Amazon RDS for SQL Server database has increased recently.
The company requires a cost-effective solution to migrate the data to AWS. The solution must cause minimal downtown for the applications that access the database.
Which AWS service should the company use to meet these requirements?

- A. AWS Lambda
- B. AWS Database Migration Service (AWS DMS)
- C. AWS Direct Connect
- D. AWS DataSync

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: AWS Database Migration Service (AWS DMS).
Konteks layanan terkait:
- DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — AWS Lambda
- **C**: tidak memenuhi constraint utama soal — AWS Direct Connect
- **D**: tidak memenuhi constraint utama soal — AWS DataSync
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131677-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q203. [github_examtopics_cache]
*App id: `LOC-203`*

A company wants to analyze sales records that the company stores in a MySQL database. The company wants to correlate the records with sales opportunities identified by Salesforce.

The company receives 2 GB of sales records every day. The company has 100 GB of identified sales opportunities. A data engineer needs to develop a process that will analyze and correlate sales records and sales opportunities. The process must run once each night.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Use Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to fetch both datasets. Use AWS Lambda functions to correlate the datasets. Use AWS Step Functions to orchestrate the process.
- B. Use Amazon AppFlow to fetch sales opportunities from Salesforce. Use AWS Glue to fetch sales records from the MySQL database. Correlate the sales records with the sales opportunities. Use Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to orchestrate the process.
- C. Use Amazon AppFlow to fetch sales opportunities from Salesforce. Use AWS Glue to fetch sales records from the MySQL database. Correlate the sales records with sales opportunities. Use AWS Step Functions to orchestrate the process.
- D. Use Amazon AppFlow to fetch sales opportunities from Salesforce. Use Amazon Kinesis Data Streams to fetch sales records from the MySQL database. Use Amazon Managed Service for Apache Flink to correlate the datasets. Use AWS Step Functions to orchestrate the process.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon AppFlow to fetch sales opportunities from Salesforce. Use AWS Glue to fetch sales records from the MySQL database. Correlate the sales records with sales opportunities. Use AWS Step Functions to orchestrate the process..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to fetch both datasets. Use AWS Lambda functions to correlate the datasets. Use AWS Step Functi...
- **B**: tidak memenuhi constraint utama soal — Use Amazon AppFlow to fetch sales opportunities from Salesforce. Use AWS Glue to fetch sales records from the MySQL database. Correlate the sales records wit...
- **D**: tidak memenuhi constraint utama soal — Use Amazon AppFlow to fetch sales opportunities from Salesforce. Use Amazon Kinesis Data Streams to fetch sales records from the MySQL database. Use Amazon M...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153160-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q204. [github_examtopics_cache]
*App id: `LOC-204`*

A company wants to implement real-time analytics capabilities. The company wants to use Amazon Kinesis Data Streams and Amazon Redshift to ingest and process streaming data at the rate of several gigabytes per second. The company wants to derive near real-time insights by using existing business intelligence (BI) and analytics tools.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use Kinesis Data Streams to stage data in Amazon S3. Use the COPY command to load data from Amazon S3 directly into Amazon Redshift to make the data immediately available for real-time analysis.
- B. Access the data from Kinesis Data Streams by using SQL queries. Create materialized views directly on top of the stream. Refresh the materialized views regularly to query the most recent stream data.
- C. Create an external schema in Amazon Redshift to map the data from Kinesis Data Streams to an Amazon Redshift object. Create a materialized view to read data from the stream. Set the materialized view to auto refresh.
- D. Connect Kinesis Data Streams to Amazon Kinesis Data Firehose. Use Kinesis Data Firehose to stage the data in Amazon S3. Use the COPY command to load the data from Amazon S3 to a table in Amazon Redshift.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create an external schema in Amazon Redshift to map the data from Kinesis Data Streams to an Amazon Redshift object. Create a materialized view to read data from the stream. Set the materialized view to auto refresh..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Kinesis Data Streams to stage data in Amazon S3. Use the COPY command to load data from Amazon S3 directly into Amazon Redshift to make the data immediat...
- **B**: tidak memenuhi constraint utama soal — Access the data from Kinesis Data Streams by using SQL queries. Create materialized views directly on top of the stream. Refresh the materialized views regul...
- **D**: tidak memenuhi constraint utama soal — Connect Kinesis Data Streams to Amazon Kinesis Data Firehose. Use Kinesis Data Firehose to stage the data in Amazon S3. Use the COPY command to load the data...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/133048-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q205. [github_examtopics_cache]
*App id: `LOC-205`*

A company wants to migrate a data warehouse from Teradata to Amazon Redshift.

Which solution will meet this requirement with the LEAST operational effort?

- A. Use AWS Database Migration Service (AWS DMS) Schema Conversion to migrate the schema. Use AWS DMS to migrate the data.
- B. Use the AWS Schema Conversion Tool (AWS SCT) to migrate the schema. Use AWS Database Migration Service (AWS DMS) to migrate the data.
- C. Use AWS Database Migration Service (AWS DMS) to migrate the data. Use automatic schema conversion.
- D. Manually export the schema definition from Teradata. Apply the schema to the Amazon Redshift database. Use AWS Database Migration Service (AWS DMS) to migrate the data.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the AWS Schema Conversion Tool (AWS SCT) to migrate the schema. Use AWS Database Migration Service (AWS DMS) to migrate the data..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Database Migration Service (AWS DMS) Schema Conversion to migrate the schema. Use AWS DMS to migrate the data.
- **C**: tidak memenuhi constraint utama soal — Use AWS Database Migration Service (AWS DMS) to migrate the data. Use automatic schema conversion.
- **D**: tidak memenuhi constraint utama soal — Manually export the schema definition from Teradata. Apply the schema to the Amazon Redshift database. Use AWS Database Migration Service (AWS DMS) to migrat...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153154-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q206. [github_examtopics_cache]
*App id: `LOC-206`*

A company wants to migrate an application and an on-premises Apache Kafka server to AWS. The application processes incremental updates that an on-premises Oracle database sends to the Kafka server. The company wants to use the replatform migration strategy instead of the refactor strategy.

Which solution will meet these requirements with the LEAST management overhead?

- A. Amazon Kinesis Data Streams
- B. Amazon Managed Streaming for Apache Kafka (Amazon MSK) provisioned cluster
- C. Amazon Kinesis Data Firehose
- D. Amazon Managed Streaming for Apache Kafka (Amazon MSK) Serverless

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Amazon Managed Streaming for Apache Kafka (Amazon MSK) Serverless.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Amazon Kinesis Data Streams
- **B**: tidak memenuhi constraint utama soal — Amazon Managed Streaming for Apache Kafka (Amazon MSK) provisioned cluster
- **C**: tidak memenuhi constraint utama soal — Amazon Kinesis Data Firehose
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143060-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q207. [github_examtopics_cache]
*App id: `LOC-207`*

A company wants to migrate data from an Amazon RDS for PostgreSQL DB instance in the eu-east-1 Region of an AWS account named Account_A. The company will migrate the data to an Amazon Redshift cluster in the eu-west-1 Region of an AWS account named Account_B.

Which solution will give AWS Database Migration Service (AWS DMS) the ability to replicate data between two data stores?

- A. Set up an AWS DMS replication instance in Account_B in eu-west-1.
- B. Set up an AWS DMS replication instance in Account_B in eu-east-1.
- C. Set up an AWS DMS replication instance in a new AWS account in eu-west-1.
- D. Set up an AWS DMS replication instance in Account_A in eu-east-1.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Set up an AWS DMS replication instance in Account_B in eu-west-1..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Set up an AWS DMS replication instance in Account_B in eu-east-1.
- **C**: tidak memenuhi constraint utama soal — Set up an AWS DMS replication instance in a new AWS account in eu-west-1.
- **D**: tidak memenuhi constraint utama soal — Set up an AWS DMS replication instance in Account_A in eu-east-1.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143054-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q208. [github_examtopics_cache]
*App id: `LOC-208`*

A company wants to use machine learning (ML) to perform analytics on data that is in an Amazon S3 data lake. The company has two data transformation requirements that will give consumers within the company the ability to create reports.

The company must perform daily transformations on 300 GB of data that is in a variety format that must arrive in Amazon S3 at a scheduled time. The company must perform one-time transformations of terabytes of archived data that is in the S3 data lake. The company uses Amazon Managed Workflows for Apache Airflow (Amazon MWAA) Directed Acyclic Graphs (DAGs) to orchestrate processing.

Which combination of tasks should the company schedule in the Amazon MWAA DAGs to meet these requirements MOST cost-effectively? (Choose two.)

- A. For daily incoming data, use AWS Glue crawlers to scan and identify the schema.
- B. For daily incoming data, use Amazon Athena to scan and identify the schema.
- C. For daily incoming data, use Amazon Redshift to perform transformations.
- D. For daily and archived data, use Amazon EMR to perform data transformations.
- E. For archived data, use Amazon SageMaker to perform data transformations.

**Answer:** AD

**Pembahasan:** Jawaban yang tepat adalah **AD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: For daily incoming data, use AWS Glue crawlers to scan and identify the schema.
- **D**: For daily and archived data, use Amazon EMR to perform data transformations.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — For daily incoming data, use Amazon Athena to scan and identify the schema.
- **C**: tidak memenuhi constraint utama soal — For daily incoming data, use Amazon Redshift to perform transformations.
- **E**: tidak memenuhi constraint utama soal — For archived data, use Amazon SageMaker to perform data transformations.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142573-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q209. [github_examtopics_cache]
*App id: `LOC-209`*

A company's data engineer needs to optimize the performance of table SQL queries. The company stores data in an Amazon Redshift cluster. The data engineer cannot increase the size of the cluster because of budget constraints.
The company stores the data in multiple tables and loads the data by using the EVEN distribution style. Some tables are hundreds of gigabytes in size. Other tables are less than 10 MB in size.
Which solution will meet these requirements?

- A. Keep using the EVEN distribution style for all tables. Specify primary and foreign keys for all tables.
- B. Use the ALL distribution style for large tables. Specify primary and foreign keys for all tables.
- C. Use the ALL distribution style for rarely updated small tables. Specify primary and foreign keys for all tables.
- D. Specify a combination of distribution, sort, and partition keys for all tables.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use the ALL distribution style for rarely updated small tables. Specify primary and foreign keys for all tables..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Keep using the EVEN distribution style for all tables. Specify primary and foreign keys for all tables.
- **B**: tidak memenuhi constraint utama soal — Use the ALL distribution style for large tables. Specify primary and foreign keys for all tables.
- **D**: tidak memenuhi constraint utama soal — Specify a combination of distribution, sort, and partition keys for all tables.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132695-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q210. [github_examtopics_cache]
*App id: `LOC-210`*

A data engineer configured an AWS Glue Data Catalog for data that is stored in Amazon S3 buckets. The data engineer needs to configure the Data Catalog to receive incremental updates.

The data engineer sets up event notifications for the S3 bucket and creates an Amazon Simple Queue Service (Amazon SQS) queue to receive the S3 events.

Which combination of steps should the data engineer take to meet these requirements with LEAST operational overhead? (Choose two.)

- A. Create an S3 event-based AWS Glue crawler to consume events from the SQS queue.
- B. Define a time-based schedule to run the AWS Glue crawler, and perform incremental updates to the Data Catalog.
- C. Use an AWS Lambda function to directly update the Data Catalog based on S3 events that the SQS queue receives.
- D. Manually initiate the AWS Glue crawler to perform updates to the Data Catalog when there is a change in the S3 bucket.
- E. Use AWS Step Functions to orchestrate the process of updating the Data Catalog based on S3 events that the SQS queue receives.

**Answer:** AC

**Pembahasan:** Jawaban yang tepat adalah **AC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Create an S3 event-based AWS Glue crawler to consume events from the SQS queue.
- **C**: Use an AWS Lambda function to directly update the Data Catalog based on S3 events that the SQS queue receives.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Define a time-based schedule to run the AWS Glue crawler, and perform incremental updates to the Data Catalog.
- **D**: tidak memenuhi constraint utama soal — Manually initiate the AWS Glue crawler to perform updates to the Data Catalog when there is a change in the S3 bucket.
- **E**: tidak memenuhi constraint utama soal — Use AWS Step Functions to orchestrate the process of updating the Data Catalog based on S3 events that the SQS queue receives.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150401-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q211. [github_examtopics_cache]
*App id: `LOC-211`*

A data engineer created a table named cloudtrail_logs in Amazon Athena to query AWS CloudTrail logs and prepare data for audits. The data engineer needs to write a query to display errors with error codes that have occurred since the beginning of 2024. The query must return the 10 most recent errors.

Which query will meet these requirements?

- A. select count (*) as TotalEvents, eventname, errorcode, errormessage from cloudtrail_logswhere errorcode is not nulland eventtime >= '2024-01-01T00:00:00Z' group by eventname, errorcode, errormessageorder by TotalEvents desclimit 10;
- B. select count (*) as TotalEvents, eventname, errorcode, errormessage from cloudtrail_logs where eventtime >= '2024-01-01T00:00:00Z' group by eventname, errorcode, errormessage order by TotalEvents desc limit 10;
- C. select count (*) as TotalEvents, eventname, errorcode, errormessage from cloudtrail_logswhere eventtime >= '2024-01-01T00:00:00Z' group by eventname, errorcode, errormessageorder by eventname asc limit 10;
- D. select count (*) as TotalEvents, eventname, errorcode, errormessage from cloudtrail_logs where errorcode is not nulland eventtime >= '2024-01-01T00:00:00Z' group by eventname, errorcode, errormessagelimit 10;

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: select count (*) as TotalEvents, eventname, errorcode, errormessage from cloudtrail_logswhere errorcode is not nulland eventtime >= '2024-01-01T00:00:00Z' group by eventname, errorcode, errormessageorder by TotalEvents desclimit 10;.
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — select count (*) as TotalEvents, eventname, errorcode, errormessage from cloudtrail_logs where eventtime >= '2024-01-01T00:00:00Z' group by eventname, errorc...
- **C**: tidak memenuhi constraint utama soal — select count (*) as TotalEvents, eventname, errorcode, errormessage from cloudtrail_logswhere eventtime >= '2024-01-01T00:00:00Z' group by eventname, errorco...
- **D**: tidak memenuhi constraint utama soal — select count (*) as TotalEvents, eventname, errorcode, errormessage from cloudtrail_logs where errorcode is not nulland eventtime >= '2024-01-01T00:00:00Z' g...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153159-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q212. [github_examtopics_cache]
*App id: `LOC-212`*

A data engineer creates an AWS Glue Data Catalog table by using an AWS Glue crawler that is named Orders. The data engineer wants to add the following new partitions:

s3://transactions/orders/order_date=2023-01-01
s3://transactions/orders/order_date=2023-01-02

The data engineer must edit the metadata to include the new partitions in the table without scanning all the folders and files in the location of the table.

Which data definition language (DDL) statement should the data engineer use in Amazon Athena?

- A. ALTER TABLE Orders ADD PARTITION(order_date=’2023-01-01’) LOCATION ‘s3://transactions/orders/order_date=2023-01-01’;
- B. ALTER TABLE Orders ADD PARTITION(order_date=’2023-01-02’) LOCATION ‘s3://transactions/orders/order_date=2023-01-02’;
- B. MSCK REPAIR TABLE Orders;
- C. REPAIR TABLE Orders;
- D. ALTER TABLE Orders MODIFY PARTITION(order_date=’2023-01-01’) LOCATION ‘s3://transactions/orders/2023-01-01’;
- F. ALTER TABLE Orders MODIFY PARTITION(order_date=’2023-01-02’) LOCATION ‘s3://transactions/orders/2023-01-02’;

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: ALTER TABLE Orders ADD PARTITION(order_date=’2023-01-01’) LOCATION ‘s3://transactions/orders/order_date=2023-01-01’;.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — ALTER TABLE Orders ADD PARTITION(order_date=’2023-01-02’) LOCATION ‘s3://transactions/orders/order_date=2023-01-02’;
- **B**: tidak memenuhi constraint utama soal — MSCK REPAIR TABLE Orders;
- **C**: tidak memenuhi constraint utama soal — REPAIR TABLE Orders;
- **D**: tidak memenuhi constraint utama soal — ALTER TABLE Orders MODIFY PARTITION(order_date=’2023-01-01’) LOCATION ‘s3://transactions/orders/2023-01-01’;
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142527-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q213. [github_examtopics_cache]
*App id: `LOC-213`*

A data engineer creates an AWS Lambda function that an Amazon EventBridge event will invoke. When the data engineer tries to invoke the Lambda function by using an EventBridge event, an AccessDeniedException message appears.

How should the data engineer resolve the exception?

- A. Ensure that the trust policy of the Lambda function execution role allows EventBridge to assume the execution role.
- B. Ensure that both the IAM role that EventBridge uses and the Lambda function's resource-based policy have the necessary permissions.
- C. Ensure that the subnet where the Lambda function is deployed is configured to be a private subnet.
- D. Ensure that EventBridge schemas are valid and that the event mapping configuration is correct.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Ensure that both the IAM role that EventBridge uses and the Lambda function's resource-based policy have the necessary permissions..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Ensure that the trust policy of the Lambda function execution role allows EventBridge to assume the execution role.
- **C**: tidak memenuhi constraint utama soal — Ensure that the subnet where the Lambda function is deployed is configured to be a private subnet.
- **D**: tidak memenuhi constraint utama soal — Ensure that EventBridge schemas are valid and that the event mapping configuration is correct.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142578-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q214. [github_examtopics_cache]
*App id: `LOC-214`*

A data engineer finished testing an Amazon Redshift stored procedure that processes and inserts data into a table that is not mission critical. The engineer wants to automatically run the stored procedure on a daily basis.

Which solution will meet this requirement in the MOST cost-effective way?

- A. Create an AWS Lambda function to schedule a cron job to run the stored procedure.
- B. Schedule and run the stored procedure by using the Amazon Redshift Data API in an Amazon EC2 Spot Instance.
- C. Use query editor v2 to run the stored procedure on a schedule.
- D. Schedule an AWS Glue Python shell job to run the stored procedure.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use query editor v2 to run the stored procedure on a schedule..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an AWS Lambda function to schedule a cron job to run the stored procedure.
- **B**: tidak memenuhi constraint utama soal — Schedule and run the stored procedure by using the Amazon Redshift Data API in an Amazon EC2 Spot Instance.
- **D**: tidak memenuhi constraint utama soal — Schedule an AWS Glue Python shell job to run the stored procedure.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142543-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q215. [github_examtopics_cache]
*App id: `LOC-215`*

A data engineer has a one-time task to read data from objects that are in Apache Parquet format in an Amazon S3 bucket. The data engineer needs to query only one column of the data.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Configure an AWS Lambda function to load data from the S3 bucket into a pandas dataframe. Write a SQL SELECT statement on the dataframe to query the required column.
- B. Use S3 Select to write a SQL SELECT statement to retrieve the required column from the S3 objects.
- C. Prepare an AWS Glue DataBrew project to consume the S3 objects and to query the required column.
- D. Run an AWS Glue crawler on the S3 objects. Use a SQL SELECT statement in Amazon Athena to query the required column.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use S3 Select to write a SQL SELECT statement to retrieve the required column from the S3 objects..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Configure an AWS Lambda function to load data from the S3 bucket into a pandas dataframe. Write a SQL SELECT statement on the dataframe to query the required...
- **C**: tidak memenuhi constraint utama soal — Prepare an AWS Glue DataBrew project to consume the S3 objects and to query the required column.
- **D**: tidak memenuhi constraint utama soal — Run an AWS Glue crawler on the S3 objects. Use a SQL SELECT statement in Amazon Athena to query the required column.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132673-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q216. [github_examtopics_cache]
*App id: `LOC-216`*

A data engineer has implemented data quality rules in 1,000 AWS Glue Data Catalog tables. Because of a recent change in business requirements, the data engineer must edit the data quality rules.

How should the data engineer meet this requirement with the LEAST operational overhead?

- A. Create a pipeline in AWS Glue ETL to edit the rules for each of the 1,000 Data Catalog tables. Use an AWS Lambda function to call the corresponding AWS Glue job for each Data Catalog table.
- B. Create an AWS Lambda function that makes an API call to AWS Glue Data Quality to make the edits.
- C. Create an Amazon EMR cluster. Run a pipeline on Amazon EMR that edits the rules for each Data Catalog table. Use an AWS Lambda function to run the EMR pipeline.
- D. Use the AWS Management Console to edit the rules within the Data Catalog.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an AWS Lambda function that makes an API call to AWS Glue Data Quality to make the edits..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a pipeline in AWS Glue ETL to edit the rules for each of the 1,000 Data Catalog tables. Use an AWS Lambda function to call the corresponding AWS Glue ...
- **C**: tidak memenuhi constraint utama soal — Create an Amazon EMR cluster. Run a pipeline on Amazon EMR that edits the rules for each Data Catalog table. Use an AWS Lambda function to run the EMR pipeline.
- **D**: tidak memenuhi constraint utama soal — Use the AWS Management Console to edit the rules within the Data Catalog.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145726-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q217. [github_examtopics_cache]
*App id: `LOC-217`*

A data engineer is building a data orchestration workflow. The data engineer plans to use a hybrid model that includes some on-premises resources and some resources that are in the cloud. The data engineer wants to prioritize portability and open source resources.

Which service should the data engineer use in both the on-premises environment and the cloud-based environment?

- A. AWS Data Exchange
- B. Amazon Simple Workflow Service (Amazon SWF)
- C. Amazon Managed Workflows for Apache Airflow (Amazon MWAA)
- D. AWS Glue

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Amazon Managed Workflows for Apache Airflow (Amazon MWAA).
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — AWS Data Exchange
- **B**: tidak memenuhi constraint utama soal — Amazon Simple Workflow Service (Amazon SWF)
- **D**: tidak memenuhi constraint utama soal — AWS Glue
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142577-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q218. [github_examtopics_cache]
*App id: `LOC-218`*

A data engineer is building a data pipeline on AWS by using AWS Glue extract, transform, and load (ETL) jobs. The data engineer needs to process data from Amazon RDS and MongoDB, perform transformations, and load the transformed data into Amazon Redshift for analytics. The data updates must occur every hour.
Which combination of tasks will meet these requirements with the LEAST operational overhead? (Choose two.)

- A. Configure AWS Glue triggers to run the ETL jobs every hour.
- B. Use AWS Glue DataBrew to clean and prepare the data for analytics.
- C. Use AWS Lambda functions to schedule and run the ETL jobs every hour.
- D. Use AWS Glue connections to establish connectivity between the data sources and Amazon Redshift.
- E. Use the Redshift Data API to load transformed data into Amazon Redshift.

**Answer:** AD

**Pembahasan:** Jawaban yang tepat adalah **AD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Configure AWS Glue triggers to run the ETL jobs every hour.
- **D**: Use AWS Glue connections to establish connectivity between the data sources and Amazon Redshift.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue DataBrew to clean and prepare the data for analytics.
- **C**: tidak memenuhi constraint utama soal — Use AWS Lambda functions to schedule and run the ETL jobs every hour.
- **E**: tidak memenuhi constraint utama soal — Use the Redshift Data API to load transformed data into Amazon Redshift.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131679-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q219. [github_examtopics_cache]
*App id: `LOC-219`*

A data engineer is building an automated extract, transform, and load (ETL) ingestion pipeline by using AWS Glue. The pipeline ingests compressed files that are in an Amazon S3 bucket. The ingestion pipeline must support incremental data processing.

Which AWS Glue feature should the data engineer use to meet this requirement?

- A. Workflows
- B. Triggers
- C. Job bookmarks
- D. Classifiers

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Job bookmarks.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Workflows
- **B**: tidak memenuhi constraint utama soal — Triggers
- **D**: tidak memenuhi constraint utama soal — Classifiers
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143061-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q220. [github_examtopics_cache]
*App id: `LOC-220`*

A data engineer is configuring Amazon SageMaker Studio to use AWS Glue interactive sessions to prepare data for machine learning (ML) models.
The data engineer receives an access denied error when the data engineer tries to prepare the data by using SageMaker Studio.
Which change should the engineer make to gain access to SageMaker Studio?

- A. Add the AWSGlueServiceRole managed policy to the data engineer's IAM user.
- B. Add a policy to the data engineer's IAM user that includes the sts:AssumeRole action for the AWS Glue and SageMaker service principals in the trust policy.
- C. Add the AmazonSageMakerFullAccess managed policy to the data engineer's IAM user.
- D. Add a policy to the data engineer's IAM user that allows the sts:AddAssociation action for the AWS Glue and SageMaker service principals in the trust policy.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Add a policy to the data engineer's IAM user that includes the sts:AssumeRole action for the AWS Glue and SageMaker service principals in the trust policy..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Add the AWSGlueServiceRole managed policy to the data engineer's IAM user.
- **C**: tidak memenuhi constraint utama soal — Add the AmazonSageMakerFullAccess managed policy to the data engineer's IAM user.
- **D**: tidak memenuhi constraint utama soal — Add a policy to the data engineer's IAM user that allows the sts:AddAssociation action for the AWS Glue and SageMaker service principals in the trust policy.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132703-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q221. [github_examtopics_cache]
*App id: `LOC-221`*

A data engineer is launching an Amazon EMR cluster. The data that the data engineer needs to load into the new cluster is currently in an Amazon S3 bucket. The data engineer needs to ensure that data is encrypted both at rest and in transit.

The data that is in the S3 bucket is encrypted by an AWS Key Management Service (AWS KMS) key. The data engineer has an Amazon S3 path that has a Privacy Enhanced Mail (PEM) file.

Which solution will meet these requirements?

- A. Create an Amazon EMR security configuration. Specify the appropriate AWS KMS key for at-rest encryption for the S3 bucket. Create a second security configuration. Specify the Amazon S3 path of the PEM file for in-transit encryption. Create the EMR cluster, and attach both security configurations to the cluster.
- B. Create an Amazon EMR security configuration. Specify the appropriate AWS KMS key for local disk encryption for the S3 bucket. Specify the Amazon S3 path of the PEM file for in-transit encryption. Use the security configuration during EMR cluster creation.
- C. Create an Amazon EMR security configuration. Specify the appropriate AWS KMS key for at-rest encryption for the S3 bucket. Specify the Amazon S3 path of the PEM file for in-transit encryption. Use the security configuration during EMR cluster creation.
- D. Create an Amazon EMR security configuration. Specify the appropriate AWS KMS key for at-rest encryption for the S3 bucket. Specify the Amazon S3 path of the PEM file for in-transit encryption. Create the EMR cluster, and attach the security configuration to the cluster.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create an Amazon EMR security configuration. Specify the appropriate AWS KMS key for at-rest encryption for the S3 bucket. Specify the Amazon S3 path of the PEM file for in-transit encryption. Use the security configuration during EMR cluster creation..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- KMS mengelola kunci enkripsi; pastikan grant/policy sesuai akses layanan.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an Amazon EMR security configuration. Specify the appropriate AWS KMS key for at-rest encryption for the S3 bucket. Create a second security configura...
- **B**: tidak memenuhi constraint utama soal — Create an Amazon EMR security configuration. Specify the appropriate AWS KMS key for local disk encryption for the S3 bucket. Specify the Amazon S3 path of t...
- **D**: tidak memenuhi constraint utama soal — Create an Amazon EMR security configuration. Specify the appropriate AWS KMS key for at-rest encryption for the S3 bucket. Specify the Amazon S3 path of the ...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151948-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q222. [github_examtopics_cache]
*App id: `LOC-222`*

A data engineer is processing and analyzing multiple terabytes of raw data that is in Amazon S3. The data engineer needs to clean and prepare the data. Then the data engineer needs to load the data into Amazon Redshift for analytics.

The data engineer needs a solution that will give data analysts the ability to perform complex queries. The solution must eliminate the need to perform complex extract, transform, and load (ETL) processes or to manage infrastructure.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Use Amazon EMR to prepare the data. Use AWS Step Functions to load the data into Amazon Redshift. Use Amazon QuickSight to run queries.
- B. Use AWS Glue DataBrew to prepare the data. Use AWS Glue to load the data into Amazon Redshift. Use Amazon Redshift to run queries.
- C. Use AWS Lambda to prepare the data. Use Amazon Kinesis Data Firehose to load the data into Amazon Redshift. Use Amazon Athena to run queries.
- D. Use AWS Glue to prepare the data. Use AWS Database Migration Service (AVVS DMS) to load the data into Amazon Redshift. Use Amazon Redshift Spectrum to run queries.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use AWS Glue DataBrew to prepare the data. Use AWS Glue to load the data into Amazon Redshift. Use Amazon Redshift to run queries..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon EMR to prepare the data. Use AWS Step Functions to load the data into Amazon Redshift. Use Amazon QuickSight to run queries.
- **C**: tidak memenuhi constraint utama soal — Use AWS Lambda to prepare the data. Use Amazon Kinesis Data Firehose to load the data into Amazon Redshift. Use Amazon Athena to run queries.
- **D**: tidak memenuhi constraint utama soal — Use AWS Glue to prepare the data. Use AWS Database Migration Service (AVVS DMS) to load the data into Amazon Redshift. Use Amazon Redshift Spectrum to run qu...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145188-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q223. [github_examtopics_cache]
*App id: `LOC-223`*

A data engineer is using Amazon Athena to analyze sales data that is in Amazon S3. The data engineer writes a query to retrieve sales amounts for 2023 for several products from a table named sales_data. However, the query does not return results for all of the products that are in the sales_data table. The data engineer needs to troubleshoot the query to resolve the issue.
The data engineer's original query is as follows:
SELECT product_name, sum(sales_amount)

FROM sales_data -

WHERE year = 2023 -

GROUP BY product_name -
How should the data engineer modify the Athena query to meet these requirements?

- A. Replace sum(sales_amount) with count(*) for the aggregation.
- B. Change WHERE year = 2023 to WHERE extract(year FROM sales_data) = 2023.
- C. Add HAVING sum(sales_amount) > 0 after the GROUP BY clause.
- D. Remove the GROUP BY clause.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Change WHERE year = 2023 to WHERE extract(year FROM sales_data) = 2023..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Replace sum(sales_amount) with count(*) for the aggregation.
- **C**: tidak memenuhi constraint utama soal — Add HAVING sum(sales_amount) > 0 after the GROUP BY clause.
- **D**: tidak memenuhi constraint utama soal — Remove the GROUP BY clause.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132672-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q224. [github_examtopics_cache]
*App id: `LOC-224`*

A data engineer is using Amazon QuickSight to build a dashboard to report a company’s revenue in multiple AWS Regions. The data engineer wants the dashboard to display the total revenue for a Region, regardless of the drill-down levels shown in the visual.

Which solution will meet these requirements?

- A. Create a table calculation.
- B. Create a simple calculated field.
- C. Create a level-aware calculation - aggregate (LAC-A) function.
- D. Create a level-aware calculation - window (LAC-W) function.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Create a level-aware calculation - aggregate (LAC-A) function..
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create a table calculation.
- **B**: tidak memenuhi constraint utama soal — Create a simple calculated field.
- **D**: tidak memenuhi constraint utama soal — Create a level-aware calculation - window (LAC-W) function.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/152019-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q225. [github_examtopics_cache]
*App id: `LOC-225`*

A data engineer is using an AWS Glue crawler to catalog data that is in an Amazon S3 bucket. The S3 bucket contains both .csv and json files. The data engineer configured the crawler to exclude the .json files from the catalog.

When the data engineer runs queries in Amazon Athena, the queries also process the excluded .json files. The data engineer wants to resolve this issue. The data engineer needs a solution that will not affect access requirements for the .csv files in the source S3 bucket.

Which solution will meet this requirement with the SHORTEST query times?

- A. Adjust the AWS Glue crawler settings to ensure that the AWS Glue crawler also excludes .json files.
- B. Use the Athena console to ensure the Athena queries also exclude the .json files.
- C. Relocate the .json files to a different path within the S3 bucket.
- D. Use S3 bucket policies to block access to the .json files.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Relocate the .json files to a different path within the S3 bucket..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Adjust the AWS Glue crawler settings to ensure that the AWS Glue crawler also excludes .json files.
- **B**: tidak memenuhi constraint utama soal — Use the Athena console to ensure the Athena queries also exclude the .json files.
- **D**: tidak memenuhi constraint utama soal — Use S3 bucket policies to block access to the .json files.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145607-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q226. [github_examtopics_cache]
*App id: `LOC-226`*

A data engineer maintains a materialized view that is based on an Amazon Redshift database. The view has a column named load_date that stores the date when each row was loaded.

The data engineer needs to reclaim database storage space by deleting all the rows from the materialized view.

Which command will reclaim the MOST database storage space?

- A. DELETE FROM materialized_view_name where 1=1
- B. TRUNCATE materialized_view_name
- C. VACUUM table_name where load_date<=current_date
- D. materializedview
- D. DELETE FROM materialized_view_name where load_date<=current_date

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: TRUNCATE materialized_view_name.
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — DELETE FROM materialized_view_name where 1=1
- **C**: tidak memenuhi constraint utama soal — VACUUM table_name where load_date<=current_date
- **D**: tidak memenuhi constraint utama soal — materializedview
- **D**: tidak memenuhi constraint utama soal — DELETE FROM materialized_view_name where load_date<=current_date
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150336-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q227. [github_examtopics_cache]
*App id: `LOC-227`*

A data engineer must build an extract, transform, and load (ETL) pipeline to process and load data from 10 source systems into 10 tables that are in an Amazon Redshift database. All the source systems generate .csv, JSON, or Apache Parquet files every 15 minutes. The source systems all deliver files into one Amazon S3 bucket. The file sizes range from 10 MB to 20 GB. The ETL pipeline must function correctly despite changes to the data schema.
Which data pipeline solutions will meet these requirements? (Choose two.)

- A. Use an Amazon EventBridge rule to run an AWS Glue job every 15 minutes. Configure the AWS Glue job to process and load the data into the Amazon Redshift tables.
- B. Use an Amazon EventBridge rule to invoke an AWS Glue workflow job every 15 minutes. Configure the AWS Glue workflow to have an on-demand trigger that runs an AWS Glue crawler and then runs an AWS Glue job when the crawler finishes running successfully. Configure the AWS Glue job to process and load the data into the Amazon Redshift tables.
- C. Configure an AWS Lambda function to invoke an AWS Glue crawler when a file is loaded into the S3 bucket. Configure an AWS Glue job to process and load the data into the Amazon Redshift tables. Create a second Lambda function to run the AWS Glue job. Create an Amazon EventBridge rule to invoke the second Lambda function when the AWS Glue crawler finishes running successfully.
- D. Configure an AWS Lambda function to invoke an AWS Glue workflow when a file is loaded into the S3 bucket. Configure the AWS Glue workflow to have an on-demand trigger that runs an AWS Glue crawler and then runs an AWS Glue job when the crawler finishes running successfully. Configure the AWS Glue job to process and load the data into the Amazon Redshift tables.
- E. Configure an AWS Lambda function to invoke an AWS Glue job when a file is loaded into the S3 bucket. Configure the AWS Glue job to read the files from the S3 bucket into an Apache Spark DataFrame. Configure the AWS Glue job to also put smaller partitions of the DataFrame into an Amazon Kinesis Data Firehose delivery stream. Configure the delivery stream to load data into the Amazon Redshift tables.

**Answer:** BD

**Pembahasan:** Jawaban yang tepat adalah **BD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Use an Amazon EventBridge rule to invoke an AWS Glue workflow job every 15 minutes. Configure the AWS Glue workflow to have an on-demand trigger that runs an AWS Glue crawler and then runs an AWS Glue job when the crawler finishes running successfully. Configure the AWS Glue job to process and load the data into the Amazon Redshift tables.
- **D**: Configure an AWS Lambda function to invoke an AWS Glue workflow when a file is loaded into the S3 bucket. Configure the AWS Glue workflow to have an on-demand trigger that runs an AWS Glue crawler and then runs an AWS Glue job when the crawler finishes running successfully. Configure the AWS Glue job to process and load the data into the Amazon Redshift tables.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use an Amazon EventBridge rule to run an AWS Glue job every 15 minutes. Configure the AWS Glue job to process and load the data into the Amazon Redshift tables.
- **C**: tidak memenuhi constraint utama soal — Configure an AWS Lambda function to invoke an AWS Glue crawler when a file is loaded into the S3 bucket. Configure an AWS Glue job to process and load the da...
- **E**: tidak memenuhi constraint utama soal — Configure an AWS Lambda function to invoke an AWS Glue job when a file is loaded into the S3 bucket. Configure the AWS Glue job to read the files from the S3...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132744-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q228. [github_examtopics_cache]
*App id: `LOC-228`*

A data engineer must ingest a source of structured data that is in .csv format into an Amazon S3 data lake. The .csv files contain 15 columns. Data analysts need to run Amazon Athena queries on one or two columns of the dataset. The data analysts rarely query the entire file.
Which solution will meet these requirements MOST cost-effectively?

- A. Use an AWS Glue PySpark job to ingest the source data into the data lake in .csv format.
- B. Create an AWS Glue extract, transform, and load (ETL) job to read from the .csv structured data source. Configure the job to ingest the data into the data lake in JSON format.
- C. Use an AWS Glue PySpark job to ingest the source data into the data lake in Apache Avro format.
- D. Create an AWS Glue extract, transform, and load (ETL) job to read from the .csv structured data source. Configure the job to write the data into the data lake in Apache Parquet format.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Create an AWS Glue extract, transform, and load (ETL) job to read from the .csv structured data source. Configure the job to write the data into the data lake in Apache Parquet format..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use an AWS Glue PySpark job to ingest the source data into the data lake in .csv format.
- **B**: tidak memenuhi constraint utama soal — Create an AWS Glue extract, transform, and load (ETL) job to read from the .csv structured data source. Configure the job to ingest the data into the data la...
- **C**: tidak memenuhi constraint utama soal — Use an AWS Glue PySpark job to ingest the source data into the data lake in Apache Avro format.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132349-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q229. [github_examtopics_cache]
*App id: `LOC-229`*

A data engineer must manage the ingestion of real-time streaming data into AWS. The data engineer wants to perform real-time analytics on the incoming streaming data by using time-based aggregations over a window of up to 30 minutes. The data engineer needs a solution that is highly fault tolerant.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use an AWS Lambda function that includes both the business and the analytics logic to perform time-based aggregations over a window of up to 30 minutes for the data in Amazon Kinesis Data Streams.
- B. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to analyze the data that might occasionally contain duplicates by using multiple types of aggregations.
- C. Use an AWS Lambda function that includes both the business and the analytics logic to perform aggregations for a tumbling window of up to 30 minutes, based on the event timestamp.
- D. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to analyze the data by using multiple types of aggregations to perform time-based analytics over a window of up to 30 minutes.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to analyze the data by using multiple types of aggregations to perform time-based analytics over a window of up to 30 minutes..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use an AWS Lambda function that includes both the business and the analytics logic to perform time-based aggregations over a window of up to 30 minutes for t...
- **B**: tidak memenuhi constraint utama soal — Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to analyze the data that might occasionally contain duplicate...
- **C**: tidak memenuhi constraint utama soal — Use an AWS Lambda function that includes both the business and the analytics logic to perform aggregations for a tumbling window of up to 30 minutes, based o...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132739-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q230. [github_examtopics_cache]
*App id: `LOC-230`*

A data engineer must orchestrate a data pipeline that consists of one AWS Lambda function and one AWS Glue job. The solution must integrate with AWS services.
Which solution will meet these requirements with the LEAST management overhead?

- A. Use an AWS Step Functions workflow that includes a state machine. Configure the state machine to run the Lambda function and then the AWS Glue job.
- B. Use an Apache Airflow workflow that is deployed on an Amazon EC2 instance. Define a directed acyclic graph (DAG) in which the first task is to call the Lambda function and the second task is to call the AWS Glue job.
- C. Use an AWS Glue workflow to run the Lambda function and then the AWS Glue job.
- D. Use an Apache Airflow workflow that is deployed on Amazon Elastic Kubernetes Service (Amazon EKS). Define a directed acyclic graph (DAG) in which the first task is to call the Lambda function and the second task is to call the AWS Glue job.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use an AWS Step Functions workflow that includes a state machine. Configure the state machine to run the Lambda function and then the AWS Glue job..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use an Apache Airflow workflow that is deployed on an Amazon EC2 instance. Define a directed acyclic graph (DAG) in which the first task is to call the Lambd...
- **C**: tidak memenuhi constraint utama soal — Use an AWS Glue workflow to run the Lambda function and then the AWS Glue job.
- **D**: tidak memenuhi constraint utama soal — Use an Apache Airflow workflow that is deployed on Amazon Elastic Kubernetes Service (Amazon EKS). Define a directed acyclic graph (DAG) in which the first t...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132676-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q231. [github_examtopics_cache]
*App id: `LOC-231`*

A data engineer must orchestrate a series of Amazon Athena queries that will run every day. Each query can run for more than 15 minutes.
Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)

- A. Use an AWS Lambda function and the Athena Boto3 client start_query_execution API call to invoke the Athena queries programmatically.
- B. Create an AWS Step Functions workflow and add two states. Add the first state before the Lambda function. Configure the second state as a Wait state to periodically check whether the Athena query has finished using the Athena Boto3 get_query_execution API call. Configure the workflow to invoke the next query when the current query has finished running.
- C. Use an AWS Glue Python shell job and the Athena Boto3 client start_query_execution API call to invoke the Athena queries programmatically.
- D. Use an AWS Glue Python shell script to run a sleep timer that checks every 5 minutes to determine whether the current Athena query has finished running successfully. Configure the Python shell script to invoke the next query when the current query has finished running.
- E. Use Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to orchestrate the Athena queries in AWS Batch.

**Answer:** AB

**Pembahasan:** Jawaban yang tepat adalah **AB**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Use an AWS Lambda function and the Athena Boto3 client start_query_execution API call to invoke the Athena queries programmatically.
- **B**: Create an AWS Step Functions workflow and add two states. Add the first state before the Lambda function. Configure the second state as a Wait state to periodically check whether the Athena query has finished using the Athena Boto3 get_query_execution API call. Configure the workflow to invoke the next query when the current query has finished running.
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **C**: tidak memenuhi constraint utama soal — Use an AWS Glue Python shell job and the Athena Boto3 client start_query_execution API call to invoke the Athena queries programmatically.
- **D**: tidak memenuhi constraint utama soal — Use an AWS Glue Python shell script to run a sleep timer that checks every 5 minutes to determine whether the current Athena query has finished running succe...
- **E**: tidak memenuhi constraint utama soal — Use Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to orchestrate the Athena queries in AWS Batch.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131683-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q232. [github_examtopics_cache]
*App id: `LOC-232`*

A data engineer must use AWS services to ingest a dataset into an Amazon S3 data lake. The data engineer profiles the dataset and discovers that the dataset contains personally identifiable information (PII). The data engineer must implement a solution to profile the dataset and obfuscate the PII.
Which solution will meet this requirement with the LEAST operational effort?

- A. Use an Amazon Kinesis Data Firehose delivery stream to process the dataset. Create an AWS Lambda transform function to identify the PII. Use an AWS SDK to obfuscate the PII. Set the S3 data lake as the target for the delivery stream.
- B. Use the Detect PII transform in AWS Glue Studio to identify the PII. Obfuscate the PII. Use an AWS Step Functions state machine to orchestrate a data pipeline to ingest the data into the S3 data lake.
- C. Use the Detect PII transform in AWS Glue Studio to identify the PII. Create a rule in AWS Glue Data Quality to obfuscate the PII. Use an AWS Step Functions state machine to orchestrate a data pipeline to ingest the data into the S3 data lake.
- D. Ingest the dataset into Amazon DynamoDB. Create an AWS Lambda function to identify and obfuscate the PII in the DynamoDB table and to transform the data. Use the same Lambda function to ingest the data into the S3 data lake.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the Detect PII transform in AWS Glue Studio to identify the PII. Obfuscate the PII. Use an AWS Step Functions state machine to orchestrate a data pipeline to ingest the data into the S3 data lake..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use an Amazon Kinesis Data Firehose delivery stream to process the dataset. Create an AWS Lambda transform function to identify the PII. Use an AWS SDK to ob...
- **C**: tidak memenuhi constraint utama soal — Use the Detect PII transform in AWS Glue Studio to identify the PII. Create a rule in AWS Glue Data Quality to obfuscate the PII. Use an AWS Step Functions s...
- **D**: tidak memenuhi constraint utama soal — Ingest the dataset into Amazon DynamoDB. Create an AWS Lambda function to identify and obfuscate the PII in the DynamoDB table and to transform the data. Use...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132653-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q233. [github_examtopics_cache]
*App id: `LOC-233`*

A data engineer needs Amazon Athena queries to finish faster. The data engineer notices that all the files the Athena queries use are currently stored in uncompressed .csv format. The data engineer also notices that users perform most queries by selecting a specific column.
Which solution will MOST speed up the Athena query performance?

- A. Change the data format from .csv to JSON format. Apply Snappy compression.
- B. Compress the .csv files by using Snappy compression.
- C. Change the data format from .csv to Apache Parquet. Apply Snappy compression.
- D. Compress the .csv files by using gzip compression.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Change the data format from .csv to Apache Parquet. Apply Snappy compression..
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Change the data format from .csv to JSON format. Apply Snappy compression.
- **B**: tidak memenuhi constraint utama soal — Compress the .csv files by using Snappy compression.
- **D**: tidak memenuhi constraint utama soal — Compress the .csv files by using gzip compression.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131473-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q234. [github_examtopics_cache]
*App id: `LOC-234`*

A data engineer needs to build an enterprise data catalog based on the company's Amazon S3 buckets and Amazon RDS databases. The data catalog must include storage format metadata for the data in the catalog.

Which solution will meet these requirements with the LEAST effort?

- A. Use an AWS Glue crawler to scan the S3 buckets and RDS databases and build a data catalog. Use data stewards to inspect the data and update the data catalog with the data format.
- B. Use an AWS Glue crawler to build a data catalog. Use AWS Glue crawler classifiers to recognize the format of data and store the format in the catalog.
- C. Use Amazon Macie to build a data catalog and to identify sensitive data elements. Collect the data format information from Macie.
- D. Use scripts to scan data elements and to assign data classifications based on the format of the data.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use an AWS Glue crawler to build a data catalog. Use AWS Glue crawler classifiers to recognize the format of data and store the format in the catalog..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use an AWS Glue crawler to scan the S3 buckets and RDS databases and build a data catalog. Use data stewards to inspect the data and update the data catalog ...
- **C**: tidak memenuhi constraint utama soal — Use Amazon Macie to build a data catalog and to identify sensitive data elements. Collect the data format information from Macie.
- **D**: tidak memenuhi constraint utama soal — Use scripts to scan data elements and to assign data classifications based on the format of the data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151938-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q235. [github_examtopics_cache]
*App id: `LOC-235`*

A data engineer needs to build an extract, transform, and load (ETL) job. The ETL job will process daily incoming .csv files that users upload to an Amazon S3 bucket. The size of each S3 object is less than 100 MB.
Which solution will meet these requirements MOST cost-effectively?

- A. Write a custom Python application. Host the application on an Amazon Elastic Kubernetes Service (Amazon EKS) cluster.
- B. Write a PySpark ETL script. Host the script on an Amazon EMR cluster.
- C. Write an AWS Glue PySpark job. Use Apache Spark to transform the data.
- D. Write an AWS Glue Python shell job. Use pandas to transform the data.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Write an AWS Glue Python shell job. Use pandas to transform the data..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Write a custom Python application. Host the application on an Amazon Elastic Kubernetes Service (Amazon EKS) cluster.
- **B**: tidak memenuhi constraint utama soal — Write a PySpark ETL script. Host the script on an Amazon EMR cluster.
- **C**: tidak memenuhi constraint utama soal — Write an AWS Glue PySpark job. Use Apache Spark to transform the data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132708-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q236. [github_examtopics_cache]
*App id: `LOC-236`*

A data engineer needs to create a new empty table in Amazon Athena that has the same schema as an existing table named old_table.

Which SQL statement should the data engineer use to meet this requirement?

- A. CREATE TABLE new_table AS SELECT * FROM old_tables;
- B. INSERT INTO new_table SELECT * FROM old_table;
- C. CREATE TABLE new_table (LIKE old_table);
- D. CREATE TABLE new_table AS (SELECT * FROM old_table) WITH NO DATA;

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: CREATE TABLE new_table AS (SELECT * FROM old_table) WITH NO DATA;.
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — CREATE TABLE new_table AS SELECT * FROM old_tables;
- **B**: tidak memenuhi constraint utama soal — INSERT INTO new_table SELECT * FROM old_table;
- **C**: tidak memenuhi constraint utama soal — CREATE TABLE new_table (LIKE old_table);
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150339-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q237. [github_examtopics_cache]
*App id: `LOC-237`*

A data engineer needs to create an Amazon Athena table based on a subset of data from an existing Athena table named cities_world. The cities_world table contains cities that are located around the world. The data engineer must create a new table named cities_us to contain only the cities from cities_world that are located in the US.

Which SQL statement should the data engineer use to meet this requirement?

- A. INSERT INTO cities_usa (city,state) SELECT city, state FROM cities_world WHERE country=’usa’;
- B. MOVE city, state FROM cities_world TO cities_usa WHERE country=’usa’;
- C. INSERT INTO cities_usa SELECT city, state FROM cities_world WHERE country=’usa’;
- D. UPDATE cities_usa SET (city, state) = (SELECT city, state FROM cities_world WHERE country=’usa’);

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: INSERT INTO cities_usa (city,state) SELECT city, state FROM cities_world WHERE country=’usa’;.
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — MOVE city, state FROM cities_world TO cities_usa WHERE country=’usa’;
- **C**: tidak memenuhi constraint utama soal — INSERT INTO cities_usa SELECT city, state FROM cities_world WHERE country=’usa’;
- **D**: tidak memenuhi constraint utama soal — UPDATE cities_usa SET (city, state) = (SELECT city, state FROM cities_world WHERE country=’usa’);
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150340-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q238. [github_examtopics_cache]
*App id: `LOC-238`*

A data engineer needs to create an empty copy of an existing table in Amazon Athena to perform data processing tasks. The existing table in Athena contains 1,000 rows.

Which query will meet this requirement?

- A. CREATE TABLE new_table -
- B. LIKE old_table;
- B. CREATE TABLE new_table -
- D. AS SELECT *
- E. FROM old_table -
- F. WITH NO DATA;
- C. CREATE TABLE new_table -
- H. AS SELECT *
- I. FROM old_table;
- D. CREATE TABLE new_table -
- K. as SELECT *
- L. FROM old_cable -
- M. WHERE 1=1;

**Answer:** BB

**Pembahasan:** Jawaban yang tepat adalah **BB**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: LIKE old_table;
- **B**: CREATE TABLE new_table -
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — CREATE TABLE new_table -
- **D**: tidak memenuhi constraint utama soal — AS SELECT *
- **E**: tidak memenuhi constraint utama soal — FROM old_table -
- **F**: tidak memenuhi constraint utama soal — WITH NO DATA;
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150345-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q239. [github_examtopics_cache]
*App id: `LOC-239`*

A data engineer needs to debug an AWS Glue job that reads from Amazon S3 and writes to Amazon Redshift. The data engineer enabled the bookmark feature for the AWS Glue job.
The data engineer has set the maximum concurrency for the AWS Glue job to 1.

The AWS Glue job is successfully writing the output to Amazon Redshift. However, the Amazon S3 files that were loaded during previous runs of the AWS Glue job are being reprocessed by subsequent runs.

What is the likely reason the AWS Glue job is reprocessing the files?

- A. The AWS Glue job does not have the s3:GetObjectAcl permission that is required for bookmarks to work correctly.
- B. The maximum concurrency for the AWS Glue job is set to 1.
- C. The data engineer incorrectly specified an older version of AWS Glue for the Glue job.
- D. The AWS Glue job does not have a required commit statement.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: The AWS Glue job does not have a required commit statement..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The AWS Glue job does not have the s3:GetObjectAcl permission that is required for bookmarks to work correctly.
- **B**: tidak memenuhi constraint utama soal — The maximum concurrency for the AWS Glue job is set to 1.
- **C**: tidak memenuhi constraint utama soal — The data engineer incorrectly specified an older version of AWS Glue for the Glue job.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143046-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q240. [github_examtopics_cache]
*App id: `LOC-240`*

A data engineer needs to join data from multiple sources to perform a one-time analysis job. The data is stored in Amazon DynamoDB, Amazon RDS, Amazon Redshift, and Amazon S3.
Which solution will meet this requirement MOST cost-effectively?

- A. Use an Amazon EMR provisioned cluster to read from all sources. Use Apache Spark to join the data and perform the analysis.
- B. Copy the data from DynamoDB, Amazon RDS, and Amazon Redshift into Amazon S3. Run Amazon Athena queries directly on the S3 files.
- C. Use Amazon Athena Federated Query to join the data from all data sources.
- D. Use Redshift Spectrum to query data from DynamoDB, Amazon RDS, and Amazon S3 directly from Redshift.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon Athena Federated Query to join the data from all data sources..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use an Amazon EMR provisioned cluster to read from all sources. Use Apache Spark to join the data and perform the analysis.
- **B**: tidak memenuhi constraint utama soal — Copy the data from DynamoDB, Amazon RDS, and Amazon Redshift into Amazon S3. Run Amazon Athena queries directly on the S3 files.
- **D**: tidak memenuhi constraint utama soal — Use Redshift Spectrum to query data from DynamoDB, Amazon RDS, and Amazon S3 directly from Redshift.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131712-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q241. [github_examtopics_cache]
*App id: `LOC-241`*

A data engineer needs to maintain a central metadata repository that users access through Amazon EMR and Amazon Athena queries. The repository needs to provide the schema and properties of many tables. Some of the metadata is stored in Apache Hive. The data engineer needs to import the metadata from Hive into the central metadata repository.
Which solution will meet these requirements with the LEAST development effort?

- A. Use Amazon EMR and Apache Ranger.
- B. Use a Hive metastore on an EMR cluster.
- C. Use the AWS Glue Data Catalog.
- D. Use a metastore on an Amazon RDS for MySQL DB instance.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use the AWS Glue Data Catalog..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon EMR and Apache Ranger.
- **B**: tidak memenuhi constraint utama soal — Use a Hive metastore on an EMR cluster.
- **D**: tidak memenuhi constraint utama soal — Use a metastore on an Amazon RDS for MySQL DB instance.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132685-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q242. [github_examtopics_cache]
*App id: `LOC-242`*

A data engineer needs to onboard a new data producer into AWS. The data producer needs to migrate data products to AWS.

The data producer maintains many data pipelines that support a business application. Each pipeline must have service accounts and their corresponding credentials. The data engineer must establish a secure connection from the data producer's on-premises data center to AWS. The data engineer must not use the public internet to transfer data from an on-premises data center to AWS.

Which solution will meet these requirements?

- A. Instruct the new data producer to create Amazon Machine Images (AMIs) on Amazon Elastic Container Service (Amazon ECS) to store the code base of the application. Create security groups in a public subnet that allow connections only to the on-premises data center.
- B. Create an AWS Direct Connect connection to the on-premises data center. Store the service account credentials in AWS Secrets manager.
- C. Create a security group in a public subnet. Configure the security group to allow only connections from the CIDR blocks that correspond to the data producer. Create Amazon S3 buckets than contain presigned URLS that have one-day expiration dates.
- D. Create an AWS Direct Connect connection to the on-premises data center. Store the application keys in AWS Secrets Manager. Create Amazon S3 buckets that contain presigned URLS that have one-day expiration dates.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an AWS Direct Connect connection to the on-premises data center. Store the service account credentials in AWS Secrets manager..
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Instruct the new data producer to create Amazon Machine Images (AMIs) on Amazon Elastic Container Service (Amazon ECS) to store the code base of the applicat...
- **C**: tidak memenuhi constraint utama soal — Create a security group in a public subnet. Configure the security group to allow only connections from the CIDR blocks that correspond to the data producer....
- **D**: tidak memenuhi constraint utama soal — Create an AWS Direct Connect connection to the on-premises data center. Store the application keys in AWS Secrets Manager. Create Amazon S3 buckets that cont...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151933-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q243. [github_examtopics_cache]
*App id: `LOC-243`*

A data engineer needs to securely transfer 5 TB of data from an on-premises data center to an Amazon S3 bucket. Approximately 5% of the data changes every day. Updates to the data need to be regularly proliferated to the S3 bucket. The data includes files that are in multiple formats. The data engineer needs to automate the transfer process and must schedule the process to run periodically.
Which AWS service should the data engineer use to transfer the data in the MOST operationally efficient way?

- A. AWS DataSync
- B. AWS Glue
- C. AWS Direct Connect
- D. Amazon S3 Transfer Acceleration

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: AWS DataSync.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — AWS Glue
- **C**: tidak memenuhi constraint utama soal — AWS Direct Connect
- **D**: tidak memenuhi constraint utama soal — Amazon S3 Transfer Acceleration
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131676-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q244. [github_examtopics_cache]
*App id: `LOC-244`*

A data engineer needs to use AWS Step Functions to design an orchestration workflow. The workflow must parallel process a large collection of data files and apply a specific transformation to each file.
Which Step Functions state should the data engineer use to meet these requirements?

- A. Parallel state
- B. Choice state
- C. Map state
- D. Wait state

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Map state.
Konteks layanan terkait:
- Step Functions mengorkestrasi alur multi-langkah dengan retry/branching.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Parallel state
- **B**: tidak memenuhi constraint utama soal — Choice state
- **D**: tidak memenuhi constraint utama soal — Wait state
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132773-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q245. [github_examtopics_cache]
*App id: `LOC-245`*

A data engineer needs to use Amazon Neptune to develop graph applications.

Which programming languages should the engineer use to develop the graph applications? (Choose two.)

- A. Gremlin
- B. SQL
- C. ANSI SQL
- D. SPARQL
- E. Spark SQL

**Answer:** AD

**Pembahasan:** Jawaban yang tepat adalah **AD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Gremlin
- **D**: SPARQL
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — SQL
- **C**: tidak memenuhi constraint utama soal — ANSI SQL
- **E**: tidak memenuhi constraint utama soal — Spark SQL
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151917-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q246. [github_examtopics_cache]
*App id: `LOC-246`*

A data engineer needs to use an Amazon QuickSight dashboard that is based on Amazon Athena queries on data that is stored in an Amazon S3 bucket. When the data engineer connects to the QuickSight dashboard, the data engineer receives an error message that indicates insufficient permissions.
Which factors could cause to the permissions-related errors? (Choose two.)

- A. There is no connection between QuickSight and Athena.
- B. The Athena tables are not cataloged.
- C. QuickSight does not have access to the S3 bucket.
- D. QuickSight does not have access to decrypt S3 data.
- E. There is no IAM role assigned to QuickSight.

**Answer:** CD

**Pembahasan:** Jawaban yang tepat adalah **CD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **C**: QuickSight does not have access to the S3 bucket.
- **D**: QuickSight does not have access to decrypt S3 data.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — There is no connection between QuickSight and Athena.
- **B**: tidak memenuhi constraint utama soal — The Athena tables are not cataloged.
- **E**: tidak memenuhi constraint utama soal — There is no IAM role assigned to QuickSight.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132701-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q247. [github_examtopics_cache]
*App id: `LOC-247`*

A data engineer notices that Amazon Athena queries are held in a queue before the queries run.

How can the data engineer prevent the queries from queueing?

- A. Increase the query result limit.
- B. Configure provisioned capacity for an existing workgroup.
- C. Use federated queries.
- D. Allow users who run the Athena queries to an existing workgroup.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Configure provisioned capacity for an existing workgroup..
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Increase the query result limit.
- **C**: tidak memenuhi constraint utama soal — Use federated queries.
- **D**: tidak memenuhi constraint utama soal — Allow users who run the Athena queries to an existing workgroup.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142580-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q248. [github_examtopics_cache]
*App id: `LOC-248`*

A data engineer runs Amazon Athena queries on data that is in an Amazon S3 bucket. The Athena queries use AWS Glue Data Catalog as a metadata table.
The data engineer notices that the Athena query plans are experiencing a performance bottleneck. The data engineer determines that the cause of the performance bottleneck is the large number of partitions that are in the S3 bucket. The data engineer must resolve the performance bottleneck and reduce Athena query planning time.
Which solutions will meet these requirements? (Choose two.)

- A. Create an AWS Glue partition index. Enable partition filtering.
- B. Bucket the data based on a column that the data have in common in a WHERE clause of the user query.
- C. Use Athena partition projection based on the S3 bucket prefix.
- D. Transform the data that is in the S3 bucket to Apache Parquet format.
- E. Use the Amazon EMR S3DistCP utility to combine smaller objects in the S3 bucket into larger objects.

**Answer:** AC

**Pembahasan:** Jawaban yang tepat adalah **AC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Create an AWS Glue partition index. Enable partition filtering.
- **C**: Use Athena partition projection based on the S3 bucket prefix.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Bucket the data based on a column that the data have in common in a WHERE clause of the user query.
- **D**: tidak memenuhi constraint utama soal — Transform the data that is in the S3 bucket to Apache Parquet format.
- **E**: tidak memenuhi constraint utama soal — Use the Amazon EMR S3DistCP utility to combine smaller objects in the S3 bucket into larger objects.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131708-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q249. [github_examtopics_cache]
*App id: `LOC-249`*

A data engineer set up an AWS Lambda function to read an object that is stored in an Amazon S3 bucket. The object is encrypted by an AWS KMS key.

The data engineer configured the Lambda function’s execution role to access the S3 bucket. However, the Lambda function encountered an error and failed to retrieve the content of the object.

What is the likely cause of the error?

- A. The data engineer misconfigured the permissions of the S3 bucket. The Lambda function could not access the object.
- B. The Lambda function is using an outdated SDK version, which caused the read failure.
- C. The S3 bucket is located in a different AWS Region than the Region where the data engineer works. Latency issues caused the Lambda function to encounter an error.
- D. The Lambda function’s execution role does not have the necessary permissions to access the KMS key that can decrypt the S3 object.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: The Lambda function’s execution role does not have the necessary permissions to access the KMS key that can decrypt the S3 object..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- KMS mengelola kunci enkripsi; pastikan grant/policy sesuai akses layanan.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — The data engineer misconfigured the permissions of the S3 bucket. The Lambda function could not access the object.
- **B**: tidak memenuhi constraint utama soal — The Lambda function is using an outdated SDK version, which caused the read failure.
- **C**: tidak memenuhi constraint utama soal — The S3 bucket is located in a different AWS Region than the Region where the data engineer works. Latency issues caused the Lambda function to encounter an e...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145725-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q250. [github_examtopics_cache]
*App id: `LOC-250`*

A data engineer uses Amazon Kinesis Data Streams to ingest and process records that contain user behavior data from an application every day.

The data engineer notices that the data stream is experiencing throttling because hot shards receive much more data than other shards in the data stream.

How should the data engineer resolve the throttling issue?

- A. Use a random partition key to distribute the ingested records.
- B. Increase the number of shards in the data stream. Distribute the records across the shards.
- C. Limit the number of records that are sent each second by the producer to match the capacity of the stream.
- D. Decrease the size of the records that the producer sends to match the capacity of the stream.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use a random partition key to distribute the ingested records..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Increase the number of shards in the data stream. Distribute the records across the shards.
- **C**: tidak memenuhi constraint utama soal — Limit the number of records that are sent each second by the producer to match the capacity of the stream.
- **D**: tidak memenuhi constraint utama soal — Decrease the size of the records that the producer sends to match the capacity of the stream.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/156778-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q251. [github_examtopics_cache]
*App id: `LOC-251`*

A data engineer uses Amazon Managed Workflows for Apache Airflow (Amazon MWAA) to run data pipelines in an AWS account.

A workflow recently failed to run. The data engineer needs to use Apache Airflow logs to diagnose the failure of the workflow.

Which log type should the data engineer use to diagnose the cause of the failure?

- A. YourEnvironmentName-WebServer
- B. YourEnvironmentName-Scheduler
- C. YourEnvironmentName-DAGProcessing
- D. YourEnvironmentName-Task

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: YourEnvironmentName-Task.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — YourEnvironmentName-WebServer
- **B**: tidak memenuhi constraint utama soal — YourEnvironmentName-Scheduler
- **C**: tidak memenuhi constraint utama soal — YourEnvironmentName-DAGProcessing
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145096-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q252. [github_examtopics_cache]
*App id: `LOC-252`*

A data engineer uses Amazon Redshift to run resource-intensive analytics processes once every month. Every month, the data engineer creates a new Redshift provisioned cluster. The data engineer deletes the Redshift provisioned cluster after the analytics processes are complete every month. Before the data engineer deletes the cluster each month, the data engineer unloads backup data from the cluster to an Amazon S3 bucket.
The data engineer needs a solution to run the monthly analytics processes that does not require the data engineer to manage the infrastructure manually.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use Amazon Step Functions to pause the Redshift cluster when the analytics processes are complete and to resume the cluster to run new processes every month.
- B. Use Amazon Redshift Serverless to automatically process the analytics workload.
- C. Use the AWS CLI to automatically process the analytics workload.
- D. Use AWS CloudFormation templates to automatically process the analytics workload.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use Amazon Redshift Serverless to automatically process the analytics workload..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Step Functions to pause the Redshift cluster when the analytics processes are complete and to resume the cluster to run new processes every month.
- **C**: tidak memenuhi constraint utama soal — Use the AWS CLI to automatically process the analytics workload.
- **D**: tidak memenuhi constraint utama soal — Use AWS CloudFormation templates to automatically process the analytics workload.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132699-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q253. [github_examtopics_cache]
*App id: `LOC-253`*

A data engineer wants to improve the performance of SQL queries in Amazon Athena that run against a sales data table.

The data engineer wants to understand the execution plan of a specific SQL statement. The data engineer also wants to see the computational cost of each operation in a SQL query.

Which statement does the data engineer need to run to meet these requirements?

- A. EXPLAIN SELECT * FROM sales;
- B. EXPLAIN ANALYZE FROM sales;
- C. EXPLAIN ANALYZE SELECT * FROM sales;
- D. EXPLAIN FROM sales;

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: EXPLAIN ANALYZE SELECT * FROM sales;.
Konteks layanan terkait:
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — EXPLAIN SELECT * FROM sales;
- **B**: tidak memenuhi constraint utama soal — EXPLAIN ANALYZE FROM sales;
- **D**: tidak memenuhi constraint utama soal — EXPLAIN FROM sales;
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142563-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q254. [github_examtopics_cache]
*App id: `LOC-254`*

A data engineer wants to orchestrate a set of extract, transform, and load (ETL) jobs that run on AWS. The ETL jobs contain tasks that must run Apache Spark jobs on Amazon EMR, make API calls to Salesforce, and load data into Amazon Redshift.

The ETL jobs need to handle failures and retries automatically. The data engineer needs to use Python to orchestrate the jobs.

Which service will meet these requirements?

- A. Amazon Managed Workflows for Apache Airflow (Amazon MWAA)
- B. AWS Step Functions
- C. AWS Glue
- D. Amazon EventBridge

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Amazon Managed Workflows for Apache Airflow (Amazon MWAA).
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- EMR untuk pemrosesan big data (Spark/Hadoop) saat kebutuhan compute berat.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — AWS Step Functions
- **C**: tidak memenuhi constraint utama soal — AWS Glue
- **D**: tidak memenuhi constraint utama soal — Amazon EventBridge
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150746-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q255. [github_examtopics_cache]
*App id: `LOC-255`*

A data engineering team is using an Amazon Redshift data warehouse for operational reporting. The team wants to prevent performance issues that might result from long- running queries. A data engineer must choose a system table in Amazon Redshift to record anomalies when a query optimizer identifies conditions that might indicate performance issues.
Which table views should the data engineer use to meet this requirement?

- A. STL_USAGE_CONTROL
- B. STL_ALERT_EVENT_LOG
- C. STL_QUERY_METRICS
- D. STL_PLAN_INFO

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: STL_ALERT_EVENT_LOG.
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — STL_USAGE_CONTROL
- **C**: tidak memenuhi constraint utama soal — STL_QUERY_METRICS
- **D**: tidak memenuhi constraint utama soal — STL_PLAN_INFO
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132660-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q256. [github_examtopics_cache]
*App id: `LOC-256`*

A finance company receives data from third-party data providers and stores the data as objects in an Amazon S3 bucket.

The company ran an AWS Glue crawler on the objects to create a data catalog. The AWS Glue crawler created multiple tables. However, the company expected that the crawler would create only one table.

The company needs a solution that will ensure the AVS Glue crawler creates only one table.

Which combination of solutions will meet this requirement? (Choose two.)

- A. Ensure that the object format, compression type, and schema are the same for each object.
- B. Ensure that the object format and schema are the same for each object. Do not enforce consistency for the compression type of each object.
- C. Ensure that the schema is the same for each object. Do not enforce consistency for the file format and compression type of each object.
- D. Ensure that the structure of the prefix for each S3 object name is consistent.
- E. Ensure that all S3 object names follow a similar pattern.

**Answer:** AD

**Pembahasan:** Jawaban yang tepat adalah **AD**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Ensure that the object format, compression type, and schema are the same for each object.
- **D**: Ensure that the structure of the prefix for each S3 object name is consistent.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Ensure that the object format and schema are the same for each object. Do not enforce consistency for the compression type of each object.
- **C**: tidak memenuhi constraint utama soal — Ensure that the schema is the same for each object. Do not enforce consistency for the file format and compression type of each object.
- **E**: tidak memenuhi constraint utama soal — Ensure that all S3 object names follow a similar pattern.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145291-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q257. [github_examtopics_cache]
*App id: `LOC-257`*

A finance company uses Amazon Redshift as a data warehouse. The company stores the data in a shared Amazon S3 bucket. The company uses Amazon Redshift Spectrum to access the data that is stored in the S3 bucket. The data comes from certified third-party data providers. Each third-party data provider has unique connection details.

To comply with regulations, the company must ensure that none of the data is accessible from outside the company's AWS environment.

Which combination of steps should the company take to meet these requirements? (Choose two.)

- A. Replace the existing Redshift cluster with a new Redshift cluster that is in a private subnet. Use an interface VPC endpoint to connect to the Redshift cluster. Use a NAT gateway to give Redshift access to the S3 bucket.
- B. Create an AWS CloudHSM hardware security module (HSM) for each data provider. Encrypt each data provider's data by using the corresponding HSM for each data provider.
- C. Turn on enhanced VPC routing for the Amazon Redshift cluster. Set up an AWS Direct Connect connection and configure a connection between each data provider and the finance company’s VPC.
- D. Define table constraints for the primary keys and the foreign keys.
- E. Use federated queries to access the data from each data provider. Do not upload the data to the S3 bucket. Perform the federated queries through a gateway VPC endpoint.

**Answer:** AC

**Pembahasan:** Jawaban yang tepat adalah **AC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Replace the existing Redshift cluster with a new Redshift cluster that is in a private subnet. Use an interface VPC endpoint to connect to the Redshift cluster. Use a NAT gateway to give Redshift access to the S3 bucket.
- **C**: Turn on enhanced VPC routing for the Amazon Redshift cluster. Set up an AWS Direct Connect connection and configure a connection between each data provider and the finance company’s VPC.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create an AWS CloudHSM hardware security module (HSM) for each data provider. Encrypt each data provider's data by using the corresponding HSM for each data ...
- **D**: tidak memenuhi constraint utama soal — Define table constraints for the primary keys and the foreign keys.
- **E**: tidak memenuhi constraint utama soal — Use federated queries to access the data from each data provider. Do not upload the data to the S3 bucket. Perform the federated queries through a gateway VP...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/147826-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q258. [github_examtopics_cache]
*App id: `LOC-258`*

A financial company recently added more features to its mobile app. The new features required the company to create a new topic in an existing Amazon Managed Streaming for Apache Kafka (Amazon MSK) cluster.

A few days after the company added the new topic, Amazon CloudWatch raised an alarm on the RootDiskUsed metric for the MSK cluster.

How should the company address the CloudWatch alarm?

- A. Expand the storage of the MSK broker. Configure the MSK cluster storage to expand automatically.
- B. Expand the storage of the Apache ZooKeeper nodes.
- C. Update the MSK broker instance to a larger instance type. Restart the MSK cluster.
- D. Specify the Target Volume-in-GiB parameter for the existing topic.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Expand the storage of the MSK broker. Configure the MSK cluster storage to expand automatically..
Konteks layanan terkait:
- CloudWatch untuk metrik, log, dan alarm operasional pipeline.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Expand the storage of the Apache ZooKeeper nodes.
- **C**: tidak memenuhi constraint utama soal — Update the MSK broker instance to a larger instance type. Restart the MSK cluster.
- **D**: tidak memenuhi constraint utama soal — Specify the Target Volume-in-GiB parameter for the existing topic.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151937-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q259. [github_examtopics_cache]
*App id: `LOC-259`*

A financial company wants to use Amazon Athena to run on-demand SQL queries on a petabyte-scale dataset to support a business intelligence (BI) application. An AWS Glue job that runs during non-business hours updates the dataset once every day. The BI application has a standard data refresh frequency of 1 hour to comply with company policies.
A data engineer wants to cost optimize the company's use of Amazon Athena without adding any additional infrastructure costs.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Configure an Amazon S3 Lifecycle policy to move data to the S3 Glacier Deep Archive storage class after 1 day.
- B. Use the query result reuse feature of Amazon Athena for the SQL queries.
- C. Add an Amazon ElastiCache cluster between the BI application and Athena.
- D. Change the format of the files that are in the dataset to Apache Parquet.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the query result reuse feature of Amazon Athena for the SQL queries..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Configure an Amazon S3 Lifecycle policy to move data to the S3 Glacier Deep Archive storage class after 1 day.
- **C**: tidak memenuhi constraint utama soal — Add an Amazon ElastiCache cluster between the BI application and Athena.
- **D**: tidak memenuhi constraint utama soal — Change the format of the files that are in the dataset to Apache Parquet.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132694-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q260. [github_examtopics_cache]
*App id: `LOC-260`*

A gaming company uses Amazon Kinesis Data Streams to collect clickstream data. The company uses Amazon Data Firehose delivery streams to store the data in JSON format in Amazon S3. Data scientists at the company use Amazon Athena to query the most recent data to obtain business insights.

The company wants to reduce Athena costs but does not want to recreate the data pipeline.

Which solution will meet these requirements with the LEAST management effort?

- A. Change the Firehose output format to Apache Parquet. Provide a custom S3 object YYYYMMDD prefix expression and specify a large buffer size. For the existing data, create an AWS Glue extract, transform, and load (ETL) job. Configure the ETL job to combine small JSON files, convert the JSON files to large Parquet files, and add the YYYYMMDD prefix. Use the ALTER TABLE ADD PARTITION statement to reflect the partition on the existing Athena table.
- B. Create an Apache Spark job that combines JSON files and converts the JSON files to Apache Parquet files. Launch an Amazon EMR ephemeral cluster every day to run the Spark job to create new Parquet files in a different S3 location. Use the ALTER TABLE SET LOCATION statement to reflect the new S3 location on the existing Athena table.
- C. Create a Kinesis data stream as a delivery destination for Firehose. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to run Apache Flink on the Kinesis data stream. Use Flink to aggregate the data and save the data to Amazon S3 in Apache Parquet format with a custom S3 object YYYYMMDD prefix. Use the ALTER TABLE ADD PARTITION statement to reflect the partition on the existing Athena table.
- D. Integrate an AWS Lambda function with Firehose to convert source records to Apache Parquet and write them to Amazon S3. In parallel, run an AWS Glue extract, transform, and load (ETL) job to combine the JSON files and convert the JSON files to large Parquet files. Create a custom S3 object YYYYMMDD prefix. Use the ALTER TABLE ADD PARTITION statement to reflect the partition on the existing Athena table.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Change the Firehose output format to Apache Parquet. Provide a custom S3 object YYYYMMDD prefix expression and specify a large buffer size. For the existing data, create an AWS Glue extract, transform, and load (ETL) job. Configure the ETL job to combine small JSON files, convert the JSON files to large Parquet files, and add the YYYYMMDD prefix. Use the ALTER TABLE ADD PARTITION statement to reflect the partition on the existing Athena table..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create an Apache Spark job that combines JSON files and converts the JSON files to Apache Parquet files. Launch an Amazon EMR ephemeral cluster every day to ...
- **C**: tidak memenuhi constraint utama soal — Create a Kinesis data stream as a delivery destination for Firehose. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Ana...
- **D**: tidak memenuhi constraint utama soal — Integrate an AWS Lambda function with Firehose to convert source records to Apache Parquet and write them to Amazon S3. In parallel, run an AWS Glue extract,...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150779-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q261. [github_examtopics_cache]
*App id: `LOC-261`*

A gaming company uses a NoSQL database to store customer information. The company is planning to migrate to AWS.

The company needs a fully managed AWS solution that will handle high online transaction processing (OLTP) workload, provide single-digit millisecond performance, and provide high availability around the world.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Amazon Keyspaces (for Apache Cassandra)
- B. Amazon DocumentDB (with MongoDB compatibility)
- C. Amazon DynamoDB
- D. Amazon Timestream

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Amazon DynamoDB.
Konteks layanan terkait:
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Amazon Keyspaces (for Apache Cassandra)
- **B**: tidak memenuhi constraint utama soal — Amazon DocumentDB (with MongoDB compatibility)
- **D**: tidak memenuhi constraint utama soal — Amazon Timestream
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142542-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q262. [github_examtopics_cache]
*App id: `LOC-262`*

A healthcare company uses Amazon Kinesis Data Streams to stream real-time health data from wearable devices, hospital equipment, and patient records.
A data engineer needs to find a solution to process the streaming data. The data engineer needs to store the data in an Amazon Redshift Serverless warehouse. The solution must support near real-time analytics of the streaming data and the previous day's data.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Load data into Amazon Kinesis Data Firehose. Load the data into Amazon Redshift.
- B. Use the streaming ingestion feature of Amazon Redshift.
- C. Load the data into Amazon S3. Use the COPY command to load the data into Amazon Redshift.
- D. Use the Amazon Aurora zero-ETL integration with Amazon Redshift.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Use the streaming ingestion feature of Amazon Redshift..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Load data into Amazon Kinesis Data Firehose. Load the data into Amazon Redshift.
- **C**: tidak memenuhi constraint utama soal — Load the data into Amazon S3. Use the COPY command to load the data into Amazon Redshift.
- **D**: tidak memenuhi constraint utama soal — Use the Amazon Aurora zero-ETL integration with Amazon Redshift.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132765-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q263. [github_examtopics_cache]
*App id: `LOC-263`*

A lab uses IoT sensors to monitor humidity, temperature, and pressure for a project. The sensors send 100 KB of data every 10 seconds. A downstream process will read the data from an Amazon S3 bucket every 30 seconds.

Which solution will deliver the data to the S3 bucket with the LEAST latency?

- A. Use Amazon Kinesis Data Streams and Amazon Kinesis Data Firehose to deliver the data to the S3 bucket. Use the default buffer interval for Kinesis Data Firehose.
- B. Use Amazon Kinesis Data Streams to deliver the data to the S3 bucket. Configure the stream to use 5 provisioned shards.
- C. Use Amazon Kinesis Data Streams and call the Kinesis Client Library to deliver the data to the S3 bucket. Use a 5 second buffer interval from an application.
- D. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) and Amazon Kinesis Data Firehose to deliver the data to the S3 bucket. Use a 5 second buffer interval for Kinesis Data Firehose.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon Kinesis Data Streams and call the Kinesis Client Library to deliver the data to the S3 bucket. Use a 5 second buffer interval from an application..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Kinesis Data Streams and Amazon Kinesis Data Firehose to deliver the data to the S3 bucket. Use the default buffer interval for Kinesis Data Fireh...
- **B**: tidak memenuhi constraint utama soal — Use Amazon Kinesis Data Streams to deliver the data to the S3 bucket. Configure the stream to use 5 provisioned shards.
- **D**: tidak memenuhi constraint utama soal — Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) and Amazon Kinesis Data Firehose to deliver the data to the S...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142561-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q264. [github_examtopics_cache]
*App id: `LOC-264`*

A manufacturing company collects sensor data from its factory floor to monitor and enhance operational efficiency. The company uses Amazon Kinesis Data Streams to publish the data that the sensors collect to a data stream. Then Amazon Kinesis Data Firehose writes the data to an Amazon S3 bucket.
The company needs to display a real-time view of operational efficiency on a large screen in the manufacturing facility.
Which solution will meet these requirements with the LOWEST latency?

- A. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to process the sensor data. Use a connector for Apache Flink to write data to an Amazon Timestream database. Use the Timestream database as a source to create a Grafana dashboard.
- B. Configure the S3 bucket to send a notification to an AWS Lambda function when any new object is created. Use the Lambda function to publish the data to Amazon Aurora. Use Aurora as a source to create an Amazon QuickSight dashboard.
- C. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to process the sensor data. Create a new Data Firehose delivery stream to publish data directly to an Amazon Timestream database. Use the Timestream database as a source to create an Amazon QuickSight dashboard.
- D. Use AWS Glue bookmarks to read sensor data from the S3 bucket in real time. Publish the data to an Amazon Timestream database. Use the Timestream database as a source to create a Grafana dashboard.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to process the sensor data. Use a connector for Apache Flink to write data to an Amazon Timestream database. Use the Timestream database as a source to create a Grafana dashboard..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Configure the S3 bucket to send a notification to an AWS Lambda function when any new object is created. Use the Lambda function to publish the data to Amazo...
- **C**: tidak memenuhi constraint utama soal — Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to process the sensor data. Create a new Data Firehose delive...
- **D**: tidak memenuhi constraint utama soal — Use AWS Glue bookmarks to read sensor data from the S3 bucket in real time. Publish the data to an Amazon Timestream database. Use the Timestream database as...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/131474-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q265. [github_examtopics_cache]
*App id: `LOC-265`*

A manufacturing company has many IoT devices in facilities around the world. The company uses Amazon Kinesis Data Streams to collect data from the devices. The data includes device ID, capture date, measurement type, measurement value, and facility ID. The company uses facility ID as the partition key.

The company's operations team recently observed many WriteThroughputExceeded exceptions. The operations team found that some shards were heavily used but other shards were generally idle.

How should the company resolve the issues that the operations team observed?

- A. Change the partition key from facility ID to a randomly generated key.
- B. Increase the number of shards.
- C. Archive the data on the producer's side.
- D. Change the partition key from facility ID to capture date.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Change the partition key from facility ID to a randomly generated key..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Increase the number of shards.
- **C**: tidak memenuhi constraint utama soal — Archive the data on the producer's side.
- **D**: tidak memenuhi constraint utama soal — Change the partition key from facility ID to capture date.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142562-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q266. [github_examtopics_cache]
*App id: `LOC-266`*

A manufacturing company wants to collect data from sensors. A data engineer needs to implement a solution that ingests sensor data in near real time.
The solution must store the data to a persistent data store. The solution must store the data in nested JSON format. The company must have the ability to query from the data store with a latency of less than 10 milliseconds.
Which solution will meet these requirements with the LEAST operational overhead?

- A. Use a self-hosted Apache Kafka cluster to capture the sensor data. Store the data in Amazon S3 for querying.
- B. Use AWS Lambda to process the sensor data. Store the data in Amazon S3 for querying.
- C. Use Amazon Kinesis Data Streams to capture the sensor data. Store the data in Amazon DynamoDB for querying.
- D. Use Amazon Simple Queue Service (Amazon SQS) to buffer incoming sensor data. Use AWS Glue to store the data in Amazon RDS for querying.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use Amazon Kinesis Data Streams to capture the sensor data. Store the data in Amazon DynamoDB for querying..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
- DynamoDB untuk key-value/NoSQL latensi rendah; bukan pengganti warehouse analitik.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use a self-hosted Apache Kafka cluster to capture the sensor data. Store the data in Amazon S3 for querying.
- **B**: tidak memenuhi constraint utama soal — Use AWS Lambda to process the sensor data. Store the data in Amazon S3 for querying.
- **D**: tidak memenuhi constraint utama soal — Use Amazon Simple Queue Service (Amazon SQS) to buffer incoming sensor data. Use AWS Glue to store the data in Amazon RDS for querying.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132688-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q267. [github_examtopics_cache]
*App id: `LOC-267`*

A marketing company collects clickstream data. The company sends the clickstream data to Amazon Kinesis Data Firehose and stores the clickstream data in Amazon S3. The company wants to build a series of dashboards that hundreds of users from multiple departments will use.

The company will use Amazon QuickSight to develop the dashboards. The company wants a solution that can scale and provide daily updates about clickstream activity.

Which combination of steps will meet these requirements MOST cost-effectively? (Choose two.)

- A. Use Amazon Redshift to store and query the clickstream data.
- B. Use Amazon Athena to query the clickstream data
- C. Use Amazon S3 analytics to query the clickstream data.
- D. Access the query data through a QuickSight direct SQL query.
- E. Access the query data through QuickSight SPICE (Super-fast, Parallel, In-memory Calculation Engine). Configure a daily refresh for the dataset.

**Answer:** BE

**Pembahasan:** Jawaban yang tepat adalah **BE**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **B**: Use Amazon Athena to query the clickstream data
- **E**: Access the query data through QuickSight SPICE (Super-fast, Parallel, In-memory Calculation Engine). Configure a daily refresh for the dataset.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use Amazon Redshift to store and query the clickstream data.
- **C**: tidak memenuhi constraint utama soal — Use Amazon S3 analytics to query the clickstream data.
- **D**: tidak memenuhi constraint utama soal — Access the query data through a QuickSight direct SQL query.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142576-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q268. [github_examtopics_cache]
*App id: `LOC-268`*

A marketing company uses Amazon S3 to store marketing data. The company uses versioning in some buckets. The company runs several jobs to read and load data into the buckets.

To help cost-optimize its storage, the company wants to gather information about incomplete multipart uploads and outdated versions that are present in the S3 buckets.

Which solution will meet these requirements with the LEAST operational effort?

- A. Use AWS CLI to gather the information.
- B. Use Amazon S3 Inventory configurations reports to gather the information.
- C. Use the Amazon S3 Storage Lens dashboard to gather the information.
- D. Use AWS usage reports for Amazon S3 to gather the information.

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Use the Amazon S3 Storage Lens dashboard to gather the information..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS CLI to gather the information.
- **B**: tidak memenuhi constraint utama soal — Use Amazon S3 Inventory configurations reports to gather the information.
- **D**: tidak memenuhi constraint utama soal — Use AWS usage reports for Amazon S3 to gather the information.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150343-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q269. [github_examtopics_cache]
*App id: `LOC-269`*

A marketing company uses Amazon S3 to store clickstream data. The company queries the data at the end of each day by using a SQL JOIN clause on S3 objects that are stored in separate buckets.

The company creates key performance indicators (KPIs) based on the objects. The company needs a serverless solution that will give users the ability to query data by partitioning the data. The solution must maintain the atomicity, consistency, isolation, and durability (ACID) properties of the data.

Which solution will meet these requirements MOST cost-effectively?

- A. Amazon S3 Select
- B. Amazon Redshift Spectrum
- C. Amazon Athena
- D. Amazon EMR

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Amazon Athena.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Amazon S3 Select
- **B**: tidak memenuhi constraint utama soal — Amazon Redshift Spectrum
- **D**: tidak memenuhi constraint utama soal — Amazon EMR
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143053-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q270. [github_examtopics_cache]
*App id: `LOC-270`*

A media company uses software as a service (SaaS) applications to gather data by using third-party tools. The company needs to store the data in an Amazon S3 bucket. The company will use Amazon Redshift to perform analytics based on the data.
Which AWS service or feature will meet these requirements with the LEAST operational overhead?

- A. Amazon Managed Streaming for Apache Kafka (Amazon MSK)
- B. Amazon AppFlow
- C. AWS Glue Data Catalog
- D. Amazon Kinesis

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Amazon AppFlow.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Amazon Managed Streaming for Apache Kafka (Amazon MSK)
- **C**: tidak memenuhi constraint utama soal — AWS Glue Data Catalog
- **D**: tidak memenuhi constraint utama soal — Amazon Kinesis
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132669-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q271. [github_examtopics_cache]
*App id: `LOC-271`*

A media company wants to use Amazon OpenSearch Service to analyze rea-time data about popular musical artists and songs. The company expects to ingest millions of new data events every day. The new data events will arrive through an Amazon Kinesis data stream. The company must transform the data and then ingest the data into the OpenSearch Service domain.

Which method should the company use to ingest the data with the LEAST operational overhead?

- A. Use Amazon Kinesis Data Firehose and an AWS Lambda function to transform the data and deliver the transformed data to OpenSearch Service.
- B. Use a Logstash pipeline that has prebuilt filters to transform the data and deliver the transformed data to OpenSearch Service.
- C. Use an AWS Lambda function to call the Amazon Kinesis Agent to transform the data and deliver the transformed data OpenSearch Service.
- D. Use the Kinesis Client Library (KCL) to transform the data and deliver the transformed data to OpenSearch Service.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use Amazon Kinesis Data Firehose and an AWS Lambda function to transform the data and deliver the transformed data to OpenSearch Service..
Konteks layanan terkait:
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use a Logstash pipeline that has prebuilt filters to transform the data and deliver the transformed data to OpenSearch Service.
- **C**: tidak memenuhi constraint utama soal — Use an AWS Lambda function to call the Amazon Kinesis Agent to transform the data and deliver the transformed data OpenSearch Service.
- **D**: tidak memenuhi constraint utama soal — Use the Kinesis Client Library (KCL) to transform the data and deliver the transformed data to OpenSearch Service.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145715-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q272. [github_examtopics_cache]
*App id: `LOC-272`*

A mobile gaming company wants to capture data from its gaming app. The company wants to make the data available to three internal consumers of the data. The data records are approximately 20 KB in size.

The company wants to achieve optimal throughput from each device that runs the gaming app. Additionally, the company wants to develop an application to process data streams. The stream-processing application must have dedicated throughput for each internal consumer.

Which solution will meet these requirements?

- A. Configure the mobile app to call the PutRecords API operation to send data to Amazon Kinesis Data Streams. Use the enhanced fan-out feature with a stream for each internal consumer.
- B. Configure the mobile app to call the PutRecordBatch API operation to send data to Amazon Kinesis Data Firehose. Submit an AWS Support case to turn on dedicated throughput for the company’s AWS account. Allow each internal consumer to access the stream.
- C. Configure the mobile app to use the Amazon Kinesis Producer Library (KPL) to send data to Amazon Kinesis Data Firehose. Use the enhanced fan-out feature with a stream for each internal consumer.
- D. Configure the mobile app to call the PutRecords API operation to send data to Amazon Kinesis Data Streams. Host the stream-processing application for each internal consumer on Amazon EC2 instances. Configure auto scaling for the EC2 instances.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Configure the mobile app to call the PutRecords API operation to send data to Amazon Kinesis Data Streams. Use the enhanced fan-out feature with a stream for each internal consumer..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Configure the mobile app to call the PutRecordBatch API operation to send data to Amazon Kinesis Data Firehose. Submit an AWS Support case to turn on dedicat...
- **C**: tidak memenuhi constraint utama soal — Configure the mobile app to use the Amazon Kinesis Producer Library (KPL) to send data to Amazon Kinesis Data Firehose. Use the enhanced fan-out feature with...
- **D**: tidak memenuhi constraint utama soal — Configure the mobile app to call the PutRecords API operation to send data to Amazon Kinesis Data Streams. Host the stream-processing application for each in...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/147824-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q273. [github_examtopics_cache]
*App id: `LOC-273`*

A retail company is expanding its operations globally. The company needs to use Amazon QuickSight to accurately calculate currency exchange rates for financial reports. The company has an existing dashboard that includes a visual that is based on an analysis of a dataset that contains global currency values and exchange rates.

A data engineer needs to ensure that exchange rates are calculated with a precision of four decimal places. The calculations must be precomputed. The data engineer must materialize results in QuickSight super-fast, parallel, in-memory calculation engine (SPICE).

Which solution will meet these requirements?

- A. Define and create the calculated field in the dataset.
- B. Define and create the calculated field in the analysis.
- C. Define and create the calculated field in the visual.
- D. Define and create the calculated field in the dashboard.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Define and create the calculated field in the dataset..
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Define and create the calculated field in the analysis.
- **C**: tidak memenuhi constraint utama soal — Define and create the calculated field in the visual.
- **D**: tidak memenuhi constraint utama soal — Define and create the calculated field in the dashboard.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151931-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q274. [github_examtopics_cache]
*App id: `LOC-274`*

A retail company is using an Amazon Redshift cluster to support real-time inventory management. The company has deployed an ML model on a real-time endpoint in Amazon SageMaker.

The company wants to make real-time inventory recommendations. The company also wants to make predictions about future inventory needs.

Which solutions will meet these requirements? (Choose two.)

- A. Use Amazon Redshift ML to generate inventory recommendations.
- B. Use SQL to invoke a remote SageMaker endpoint for prediction.
- C. Use Amazon Redshift ML to schedule regular data exports for offline model training.
- D. Use SageMaker Autopilot to create inventory management dashboards in Amazon Redshift.
- E. Use Amazon Redshift as a file storage system to archive old inventory management reports.

**Answer:** AB

**Pembahasan:** Jawaban yang tepat adalah **AB**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Use Amazon Redshift ML to generate inventory recommendations.
- **B**: Use SQL to invoke a remote SageMaker endpoint for prediction.
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **C**: tidak memenuhi constraint utama soal — Use Amazon Redshift ML to schedule regular data exports for offline model training.
- **D**: tidak memenuhi constraint utama soal — Use SageMaker Autopilot to create inventory management dashboards in Amazon Redshift.
- **E**: tidak memenuhi constraint utama soal — Use Amazon Redshift as a file storage system to archive old inventory management reports.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151958-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q275. [github_examtopics_cache]
*App id: `LOC-275`*

A retail company stores customer data in an Amazon S3 bucket. Some of the customer data contains personally identifiable information (PII) about customers. The company must not share PII data with business partners.

A data engineer must determine whether a dataset contains PII before making objects in the dataset available to business partners.

Which solution will meet this requirement with the LEAST manual intervention?

- A. Configure the S3 bucket and S3 objects to allow access to Amazon Macie. Use automated sensitive data discovery in Macie.
- B. Configure AWS CloudTrail to monitor S3 PUT operations. Inspect the CloudTrail trails to identify operations that save PII.
- C. Create an AWS Lambda function to identify PII in S3 objects. Schedule the function to run periodically.
- D. Create a table in AWS Glue Data Catalog. Write custom SQL queries to identify PII in the table. Use Amazon Athena to run the queries.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Configure the S3 bucket and S3 objects to allow access to Amazon Macie. Use automated sensitive data discovery in Macie..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Configure AWS CloudTrail to monitor S3 PUT operations. Inspect the CloudTrail trails to identify operations that save PII.
- **C**: tidak memenuhi constraint utama soal — Create an AWS Lambda function to identify PII in S3 objects. Schedule the function to run periodically.
- **D**: tidak memenuhi constraint utama soal — Create a table in AWS Glue Data Catalog. Write custom SQL queries to identify PII in the table. Use Amazon Athena to run the queries.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/150748-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q276. [github_examtopics_cache]
*App id: `LOC-276`*

A retail company stores data from a product lifecycle management (PLM) application in an on-premises MySQL database. The PLM application frequently updates the database when transactions occur.

The company wants to gather insights from the PLM application in near real time. The company wants to integrate the insights with other business datasets and to analyze the combined dataset by using an Amazon Redshift data warehouse.

The company has already established an AWS Direct Connect connection between the on-premises infrastructure and AWS.

Which solution will meet these requirements with the LEAST development effort?

- A. Run a scheduled AWS Glue extract, transform, and load (ETL) job to get the MySQL database updates by using a Java Database Connectivity (JDBC) connection. Set Amazon Redshift as the destination for the ETL job.
- B. Run a full load plus CDC task in AWS Database Migration Service (AWS DMS) to continuously replicate the MySQL database changes. Set Amazon Redshift as the destination for the task.
- C. Use the Amazon AppFlow SDK to build a custom connector for the MySQL database to continuously replicate the database changes. Set Amazon Redshift as the destination for the connector.
- D. Run scheduled AWS DataSync tasks to synchronize data from the MySQL database. Set Amazon Redshift as the destination for the tasks.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Run a full load plus CDC task in AWS Database Migration Service (AWS DMS) to continuously replicate the MySQL database changes. Set Amazon Redshift as the destination for the task..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- DMS memindahkan/mereplikasi data antar store dengan beban operasional lebih rendah dari ETL custom.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Run a scheduled AWS Glue extract, transform, and load (ETL) job to get the MySQL database updates by using a Java Database Connectivity (JDBC) connection. Se...
- **C**: tidak memenuhi constraint utama soal — Use the Amazon AppFlow SDK to build a custom connector for the MySQL database to continuously replicate the database changes. Set Amazon Redshift as the dest...
- **D**: tidak memenuhi constraint utama soal — Run scheduled AWS DataSync tasks to synchronize data from the MySQL database. Set Amazon Redshift as the destination for the tasks.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143051-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q277. [github_examtopics_cache]
*App id: `LOC-277`*

A retail company stores transactions, store locations, and customer information tables in four reserved ra3.4xlarge Amazon Redshift cluster nodes. All three tables use even table distribution.

The company updates the store location table only once or twice every few years.

A data engineer notices that Redshift queues are slowing down because the whole store location table is constantly being broadcast to all four compute nodes for most queries. The data engineer wants to speed up the query performance by minimizing the broadcasting of the store location table.

Which solution will meet these requirements in the MOST cost-effective way?

- A. Change the distribution style of the store location table from EVEN distribution to ALL distribution.
- B. Change the distribution style of the store location table to KEY distribution based on the column that has the highest dimension.
- C. Add a join column named store_id into the sort key for all the tables.
- D. Upgrade the Redshift reserved node to a larger instance size in the same instance family.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Change the distribution style of the store location table from EVEN distribution to ALL distribution..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Change the distribution style of the store location table to KEY distribution based on the column that has the highest dimension.
- **C**: tidak memenuhi constraint utama soal — Add a join column named store_id into the sort key for all the tables.
- **D**: tidak memenuhi constraint utama soal — Upgrade the Redshift reserved node to a larger instance size in the same instance family.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142568-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q278. [github_examtopics_cache]
*App id: `LOC-278`*

A retail company uses AWS Glue for extract, transform, and load (ETL) operations on a dataset that contains information about customer orders. The company wants to implement specific validation rules to ensure data accuracy and consistency.

Which solution will meet these requirements?

- A. Use AWS Glue job bookmarks to track the data for accuracy and consistency.
- B. Create custom AWS Glue Data Quality rulesets to define specific data quality checks.
- C. Use the built-in AWS Glue Data Quality transforms for standard data quality validations.
- D. Use AWS Glue Data Catalog to maintain a centralized data schema and metadata repository.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create custom AWS Glue Data Quality rulesets to define specific data quality checks..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use AWS Glue job bookmarks to track the data for accuracy and consistency.
- **C**: tidak memenuhi constraint utama soal — Use the built-in AWS Glue Data Quality transforms for standard data quality validations.
- **D**: tidak memenuhi constraint utama soal — Use AWS Glue Data Catalog to maintain a centralized data schema and metadata repository.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142574-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q279. [github_examtopics_cache]
*App id: `LOC-279`*

A retail company uses Amazon Aurora PostgreSQL to process and store live transactional data. The company uses an Amazon Redshift cluster for a data warehouse.

An extract, transform, and load (ETL) job runs every morning to update the Redshift cluster with new data from the PostgreSQL database. The company has grown rapidly and needs to cost optimize the Redshift cluster.

A data engineer needs to create a solution to archive historical data. The data engineer must be able to run analytics queries that effectively combine data from live transactional data in PostgreSQL, current data in Redshift, and archived historical data. The solution must keep only the most recent 15 months of data in Amazon Redshift to reduce costs.

Which combination of steps will meet these requirements? (Choose two.)

- A. Configure the Amazon Redshift Federated Query feature to query live transactional data that is in the PostgreSQL database.
- B. Configure Amazon Redshift Spectrum to query live transactional data that is in the PostgreSQL database.
- C. Schedule a monthly job to copy data that is older than 15 months to Amazon S3 by using the UNLOAD command. Delete the old data from the Redshift cluster. Configure Amazon Redshift Spectrum to access historical data in Amazon S3.
- D. Schedule a monthly job to copy data that is older than 15 months to Amazon S3 Glacier Flexible Retrieval by using the UNLOAD command. Delete the old data from the Redshift cluster. Configure Redshift Spectrum to access historical data from S3 Glacier Flexible Retrieval.
- E. Create a materialized view in Amazon Redshift that combines live, current, and historical data from different sources.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Configure the Amazon Redshift Federated Query feature to query live transactional data that is in the PostgreSQL database..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Configure Amazon Redshift Spectrum to query live transactional data that is in the PostgreSQL database.
- **C**: tidak memenuhi constraint utama soal — Schedule a monthly job to copy data that is older than 15 months to Amazon S3 by using the UNLOAD command. Delete the old data from the Redshift cluster. Con...
- **D**: tidak memenuhi constraint utama soal — Schedule a monthly job to copy data that is older than 15 months to Amazon S3 Glacier Flexible Retrieval by using the UNLOAD command. Delete the old data fro...
- **E**: tidak memenuhi constraint utama soal — Create a materialized view in Amazon Redshift that combines live, current, and historical data from different sources.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142537-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q280. [github_examtopics_cache]
*App id: `LOC-280`*

A retail company uses an Amazon Redshift data warehouse and an Amazon S3 bucket. The company ingests retail order data into the S3 bucket every day.

The company stores all order data at a single path within the S3 bucket. The data has more than 100 columns. The company ingests the order data from a third-party application that generates more than 30 files in CSV format every day. Each CSV file is between 50 and 70 MB in size.

The company uses Amazon Redshift Spectrum to run queries that select sets of columns. Users aggregate metrics based on daily orders. Recently, users have reported that the performance of the queries has degraded. A data engineer must resolve the performance issues for the queries.

Which combination of steps will meet this requirement with LEAST developmental effort? (Choose two.)

- A. Configure the third-party application to create the files in a columnar format.
- B. Develop an AWS Glue ETL job to convert the multiple daily CSV files to one file for each day.
- C. Partition the order data in the S3 bucket based on order date.
- D. Configure the third-party application to create the files in JSON format.
- E. Load the JSON data into the Amazon Redshift table in a SUPER type column.

**Answer:** AC

**Pembahasan:** Jawaban yang tepat adalah **AC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Configure the third-party application to create the files in a columnar format.
- **C**: Partition the order data in the S3 bucket based on order date.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kontrol akses fine-grained di data lake umumnya diselesaikan dengan Lake Formation, bukan hanya IAM kasar di bucket.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Develop an AWS Glue ETL job to convert the multiple daily CSV files to one file for each day.
- **D**: tidak memenuhi constraint utama soal — Configure the third-party application to create the files in JSON format.
- **E**: tidak memenuhi constraint utama soal — Load the JSON data into the Amazon Redshift table in a SUPER type column.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151918-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q281. [github_examtopics_cache]
*App id: `LOC-281`*

A security company stores IoT data that is in JSON format in an Amazon S3 bucket. The data structure can change when the company upgrades the IoT devices. The company wants to create a data catalog that includes the IoT data. The company's analytics department will use the data catalog to index the data.
Which solution will meet these requirements MOST cost-effectively?

- A. Create an AWS Glue Data Catalog. Configure an AWS Glue Schema Registry. Create a new AWS Glue workload to orchestrate the ingestion of the data that the analytics department will use into Amazon Redshift Serverless.
- B. Create an Amazon Redshift provisioned cluster. Create an Amazon Redshift Spectrum database for the analytics department to explore the data that is in Amazon S3. Create Redshift stored procedures to load the data into Amazon Redshift.
- C. Create an Amazon Athena workgroup. Explore the data that is in Amazon S3 by using Apache Spark through Athena. Provide the Athena workgroup schema and tables to the analytics department.
- D. Create an AWS Glue Data Catalog. Configure an AWS Glue Schema Registry. Create AWS Lambda user defined functions (UDFs) by using the Amazon Redshift Data API. Create an AWS Step Functions job to orchestrate the ingestion of the data that the analytics department will use into Amazon Redshift Serverless.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Create an AWS Glue Data Catalog. Configure an AWS Glue Schema Registry. Create a new AWS Glue workload to orchestrate the ingestion of the data that the analytics department will use into Amazon Redshift Serverless..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Create an Amazon Redshift provisioned cluster. Create an Amazon Redshift Spectrum database for the analytics department to explore the data that is in Amazon...
- **C**: tidak memenuhi constraint utama soal — Create an Amazon Athena workgroup. Explore the data that is in Amazon S3 by using Apache Spark through Athena. Provide the Athena workgroup schema and tables...
- **D**: tidak memenuhi constraint utama soal — Create an AWS Glue Data Catalog. Configure an AWS Glue Schema Registry. Create AWS Lambda user defined functions (UDFs) by using the Amazon Redshift Data API...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132683-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q282. [github_examtopics_cache]
*App id: `LOC-282`*

A technology company currently uses Amazon Kinesis Data Streams to collect log data in real time. The company wants to use Amazon Redshift for downstream real-time queries and to enrich the log data.

Which solution will ingest data into Amazon Redshift with the LEAST operational overhead?

- A. Set up an Amazon Kinesis Data Firehose delivery stream to send data to a Redshift provisioned cluster table.
- B. Set up an Amazon Kinesis Data Firehose delivery stream to send data to Amazon S3. Configure a Redshift provisioned cluster to load data every minute.
- C. Configure Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to send data directly to a Redshift provisioned cluster table.
- D. Use Amazon Redshift streaming ingestion from Kinesis Data Streams and to present data as a materialized view.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use Amazon Redshift streaming ingestion from Kinesis Data Streams and to present data as a materialized view..
Konteks layanan terkait:
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Set up an Amazon Kinesis Data Firehose delivery stream to send data to a Redshift provisioned cluster table.
- **B**: tidak memenuhi constraint utama soal — Set up an Amazon Kinesis Data Firehose delivery stream to send data to Amazon S3. Configure a Redshift provisioned cluster to load data every minute.
- **C**: tidak memenuhi constraint utama soal — Configure Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to send data directly to a Redshift provisioned cluster...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/146967-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q283. [github_examtopics_cache]
*App id: `LOC-283`*

A telecommunications company collects network usage data throughout each day at a rate of several thousand data points each second. The company runs an application to process the usage data in real time. The company aggregates and stores the data in an Amazon Aurora DB instance.

Sudden drops in network usage usually indicate a network outage. The company must be able to identify sudden drops in network usage so the company can take immediate remedial actions.

Which solution will meet this requirement with the LEAST latency?

- A. Create an AWS Lambda function to query Aurora for drops in network usage. Use Amazon EventBridge to automatically invoke the Lambda function every minute.
- B. Modify the processing application to publish the data to an Amazon Kinesis data stream. Create an Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) application to detect drops in network usage.
- C. Replace the Aurora database with an Amazon DynamoDB table. Create an AWS Lambda function to query the DynamoDB table for drops in network usage every minute. Use DynamoDB Accelerator (DAX) between the processing application and DynamoDB table.
- D. Create an AWS Lambda function within the Database Activity Streams feature of Aurora to detect drops in network usage.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Modify the processing application to publish the data to an Amazon Kinesis data stream. Create an Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) application to detect drops in network usage..
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an AWS Lambda function to query Aurora for drops in network usage. Use Amazon EventBridge to automatically invoke the Lambda function every minute.
- **C**: tidak memenuhi constraint utama soal — Replace the Aurora database with an Amazon DynamoDB table. Create an AWS Lambda function to query the DynamoDB table for drops in network usage every minute....
- **D**: tidak memenuhi constraint utama soal — Create an AWS Lambda function within the Database Activity Streams feature of Aurora to detect drops in network usage.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143122-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q284. [github_examtopics_cache]
*App id: `LOC-284`*

A transportation company wants to track vehicle movements by capturing geolocation records. The records are 10 bytes in size. The company receives up to 10.000 records every second. Data transmission delays of a few minutes are acceptable because of unreliable network conditions.

The transportation company wants to use Amazon Kinesis Data Streams to ingest the geolocation data. The company needs a reliable mechanism to send data to Kinesis Data Streams. The company needs to maximize the throughput efficiency of the Kinesis shards.

Which solution will meet these requirements in the MOST operationally efficient way?

- A. Kinesis Agent
- B. Kinesis Producer Library (KPL)
- C. Amazon Kinesis Data Firehose
- D. Kinesis SDK

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Kinesis Producer Library (KPL).
Konteks layanan terkait:
- Kinesis Data Streams/Firehose untuk ingest streaming; pilih sesuai buffering vs real-time.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Kinesis Agent
- **C**: tidak memenuhi constraint utama soal — Amazon Kinesis Data Firehose
- **D**: tidak memenuhi constraint utama soal — Kinesis SDK
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/147168-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q285. [github_examtopics_cache]
*App id: `LOC-285`*

An airline company is collecting metrics about flight activities for analytics. The company is conducting a proof of concept (POC) test to show how analytics can provide insights that the company can use to increase on-time departures.
The POC test uses objects in Amazon S3 that contain the metrics in .csv format. The POC test uses Amazon Athena to query the data. The data is partitioned in the S3 bucket by date.
As the amount of data increases, the company wants to optimize the storage solution to improve query performance.
Which combination of solutions will meet these requirements? (Choose two.)

- A. Add a randomized string to the beginning of the keys in Amazon S3 to get more throughput across partitions.
- B. Use an S3 bucket that is in the same account that uses Athena to query the data.
- C. Use an S3 bucket that is in the same AWS Region where the company runs Athena queries.
- D. Preprocess the .csv data to JSON format by fetching only the document keys that the query requires.
- E. Preprocess the .csv data to Apache Parquet format by fetching only the data blocks that are needed for predicates.

**Answer:** CE

**Pembahasan:** Jawaban yang tepat adalah **CE**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **C**: Use an S3 bucket that is in the same AWS Region where the company runs Athena queries.
- **E**: Preprocess the .csv data to Apache Parquet format by fetching only the data blocks that are needed for predicates.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Add a randomized string to the beginning of the keys in Amazon S3 to get more throughput across partitions.
- **B**: tidak memenuhi constraint utama soal — Use an S3 bucket that is in the same account that uses Athena to query the data.
- **D**: tidak memenuhi constraint utama soal — Preprocess the .csv data to JSON format by fetching only the document keys that the query requires.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132687-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q286. [github_examtopics_cache]
*App id: `LOC-286`*

An application consumes messages from an Amazon Simple Queue Service (Amazon SQS) queue. The application experiences occasional downtime. As a result of the downtime, messages within the queue expire and are deleted after 1 day. The message deletions cause data loss for the application.

Which solutions will minimize data loss for the application? (Choose two.)

- A. Increase the message retention period
- B. Increase the visibility timeout.
- C. Attach a dead-letter queue (DLQ) to the SQS queue.
- D. Use a delay queue to delay message delivery
- E. Reduce message processing time.

**Answer:** AC

**Pembahasan:** Jawaban yang tepat adalah **AC**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **A**: Increase the message retention period
- **C**: Attach a dead-letter queue (DLQ) to the SQS queue.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Increase the visibility timeout.
- **D**: tidak memenuhi constraint utama soal — Use a delay queue to delay message delivery
- **E**: tidak memenuhi constraint utama soal — Reduce message processing time.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145713-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q287. [github_examtopics_cache]
*App id: `LOC-287`*

An ecommerce company operates a complex order fulfilment process that spans several operational systems hosted in AWS. Each of the operational systems has a Java Database
Connectivity (JDBC)-compliant relational database where the latest processing state is captured.

The company needs to give an operations team the ability to track orders on an hourly basis across the entire fulfillment process.

Which solution will meet these requirements with the LEAST development overhead?

- A. Use AWS Glue to build ingestion pipelines from the operational systems into Amazon Redshift Build dashboards in Amazon QuickSight that track the orders.
- B. Use AWS Glue to build ingestion pipelines from the operational systems into Amazon DynamoDBuild dashboards in Amazon QuickSight that track the orders.
- C. Use AWS Database Migration Service (AWS DMS) to capture changed records in the operational systems. Publish the changes to an Amazon DynamoDB table in a different AWS region from the source database. Build Grafana dashboards that track the orders.
- D. Use AWS Database Migration Service (AWS DMS) to capture changed records in the operational systems. Publish the changes to an Amazon DynamoDB table in a different AWS region from the source database. Build Amazon QuickSight dashboards that track the orders.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use AWS Glue to build ingestion pipelines from the operational systems into Amazon Redshift Build dashboards in Amazon QuickSight that track the orders..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use AWS Glue to build ingestion pipelines from the operational systems into Amazon DynamoDBuild dashboards in Amazon QuickSight that track the orders.
- **C**: tidak memenuhi constraint utama soal — Use AWS Database Migration Service (AWS DMS) to capture changed records in the operational systems. Publish the changes to an Amazon DynamoDB table in a diff...
- **D**: tidak memenuhi constraint utama soal — Use AWS Database Migration Service (AWS DMS) to capture changed records in the operational systems. Publish the changes to an Amazon DynamoDB table in a diff...
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/151928-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q288. [github_examtopics_cache]
*App id: `LOC-288`*

An ecommerce company wants to use AWS to migrate data pipelines from an on-premises environment into the AWS Cloud. The company currently uses a third-party tool in the on-premises environment to orchestrate data ingestion processes.

The company wants a migration solution that does not require the company to manage servers. The solution must be able to orchestrate Python and Bash scripts. The solution must not require the company to refactor any code.

Which solution will meet these requirements with the LEAST operational overhead?

- A. AWS Lambda
- B. Amazon Managed Workflows for Apache Airflow (Amazon MVVAA)
- C. AWS Step Functions
- D. AWS Glue

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Amazon Managed Workflows for Apache Airflow (Amazon MVVAA).
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — AWS Lambda
- **C**: tidak memenuhi constraint utama soal — AWS Step Functions
- **D**: tidak memenuhi constraint utama soal — AWS Glue
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/143047-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q289. [github_examtopics_cache]
*App id: `LOC-289`*

An insurance company stores transaction data that the company compressed with gzip.

The company needs to query the transaction data for occasional audits.

Which solution will meet this requirement in the MOST cost-effective way?

- A. Store the data in Amazon Glacier Flexible Retrieval. Use Amazon S3 Glacier Select to query the data.
- B. Store the data in Amazon S3. Use Amazon S3 Select to query the data.
- C. Store the data in Amazon S3. Use Amazon Athena to query the data.
- D. Store the data in Amazon Glacier Instant Retrieval. Use Amazon Athena to query the data.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Store the data in Amazon S3. Use Amazon S3 Select to query the data..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Store the data in Amazon Glacier Flexible Retrieval. Use Amazon S3 Glacier Select to query the data.
- **C**: tidak memenuhi constraint utama soal — Store the data in Amazon S3. Use Amazon Athena to query the data.
- **D**: tidak memenuhi constraint utama soal — Store the data in Amazon Glacier Instant Retrieval. Use Amazon Athena to query the data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142575-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q290. [github_examtopics_cache]
*App id: `LOC-290`*

An investment company needs to manage and extract insights from a volume of semi-structured data that grows continuously.

A data engineer needs to deduplicate the semi-structured data, remove records that are duplicates, and remove common misspellings of duplicates.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Use the FindMatches feature of AWS Glue to remove duplicate records.
- B. Use non-Windows functions in Amazon Athena to remove duplicate records.
- C. Use Amazon Neptune ML and an Apache Gremlin script to remove duplicate records.
- D. Use the global tables feature of Amazon DynamoDB to prevent duplicate data.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Use the FindMatches feature of AWS Glue to remove duplicate records..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Kebutuhan real-time/streaming biasanya mengarah ke Kinesis/MSK/Lambda, bukan batch periodik semata.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use non-Windows functions in Amazon Athena to remove duplicate records.
- **C**: tidak memenuhi constraint utama soal — Use Amazon Neptune ML and an Apache Gremlin script to remove duplicate records.
- **D**: tidak memenuhi constraint utama soal — Use the global tables feature of Amazon DynamoDB to prevent duplicate data.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/147823-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q291. [github_examtopics_cache]
*App id: `LOC-291`*

An online retail company has an application that runs on Amazon EC2 instances that are in a VPC. The company wants to collect flow logs for the VPC and analyze network traffic.

Which solution will meet these requirements MOST cost-effectively?

- A. Publish flow logs to Amazon CloudWatch Logs. Use Amazon Athena for analytics.
- B. Publish flow logs to Amazon CloudWatch Logs. Use an Amazon OpenSearch Service cluster for analytics.
- C. Publish flow logs to Amazon S3 in text format. Use Amazon Athena for analytics.
- D. Publish flow logs to Amazon S3 in Apache Parquet format. Use Amazon Athena for analytics.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Publish flow logs to Amazon S3 in Apache Parquet format. Use Amazon Athena for analytics..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Publish flow logs to Amazon CloudWatch Logs. Use Amazon Athena for analytics.
- **B**: tidak memenuhi constraint utama soal — Publish flow logs to Amazon CloudWatch Logs. Use an Amazon OpenSearch Service cluster for analytics.
- **C**: tidak memenuhi constraint utama soal — Publish flow logs to Amazon S3 in text format. Use Amazon Athena for analytics.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142567-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q292. [github_examtopics_cache]
*App id: `LOC-292`*

An online retail company stores Application Load Balancer (ALB) access logs in an Amazon S3 bucket. The company wants to use Amazon Athena to query the logs to analyze traffic patterns.

A data engineer creates an unpartitioned table in Athena. As the amount of the data gradually increases, the response time for queries also increases. The data engineer wants to improve the query performance in Athena.

Which solution will meet these requirements with the LEAST operational effort?

- A. Create an AWS Glue job that determines the schema of all ALB access logs and writes the partition metadata to AWS Glue Data Catalog.
- B. Create an AWS Glue crawler that includes a classifier that determines the schema of all ALB access logs and writes the partition metadata to AWS Glue Data Catalog.
- C. Create an AWS Lambda function to transform all ALB access logs. Save the results to Amazon S3 in Apache Parquet format. Partition the metadata. Use Athena to query the transformed data.
- D. Use Apache Hive to create bucketed tables. Use an AWS Lambda function to transform all ALB access logs.

**Answer:** B

**Pembahasan:** Jawaban yang tepat adalah **B**.
Opsi B paling sesuai karena: Create an AWS Glue crawler that includes a classifier that determines the schema of all ALB access logs and writes the partition metadata to AWS Glue Data Catalog..
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Athena men-query data di S3 dengan SQL serverless; format/partisi memengaruhi biaya & performa.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Create an AWS Glue job that determines the schema of all ALB access logs and writes the partition metadata to AWS Glue Data Catalog.
- **C**: tidak memenuhi constraint utama soal — Create an AWS Lambda function to transform all ALB access logs. Save the results to Amazon S3 in Apache Parquet format. Partition the metadata. Use Athena to...
- **D**: tidak memenuhi constraint utama soal — Use Apache Hive to create bucketed tables. Use an AWS Lambda function to transform all ALB access logs.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/142559-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q293. [github_examtopics_cache]
*App id: `LOC-293`*

An online retailer uses multiple delivery partners to deliver products to customers. The delivery partners send order summaries to the retailer. The retailer stores the order summaries in Amazon S3.

Some of the order summaries contain personally identifiable information (PII) about customers. A data engineer needs to detect PII in the order summaries so the company can redact the PII.

Which solution will meet these requirements with the LEAST operational overhead?

- A. Amazon Textract
- B. Amazon S3 Storage Lens
- C. Amazon Macie
- D. Amazon SageMaker Data Wrangler

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: Amazon Macie.
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Soal menekankan *least operational effort/overhead*: prioritaskan layanan managed yang mengurangi perawatan custom.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Amazon Textract
- **B**: tidak memenuhi constraint utama soal — Amazon S3 Storage Lens
- **D**: tidak memenuhi constraint utama soal — Amazon SageMaker Data Wrangler
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/153157-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q294. [github_examtopics_cache]
*App id: `LOC-294`*

During a security review, a company identified a vulnerability in an AWS Glue job. The company discovered that credentials to access an Amazon Redshift cluster were hard coded in the job script.
A data engineer must remediate the security vulnerability in the AWS Glue job. The solution must securely store the credentials.
Which combination of steps should the data engineer take to meet these requirements? (Choose two.)

- A. Store the credentials in the AWS Glue job parameters.
- B. Store the credentials in a configuration file that is in an Amazon S3 bucket.
- C. Access the credentials from a configuration file that is in an Amazon S3 bucket by using the AWS Glue job.
- D. Store the credentials in AWS Secrets Manager.
- E. Grant the AWS Glue job IAM role access to the stored credentials.

**Answer:** DE

**Pembahasan:** Jawaban yang tepat adalah **DE**.
Ini soal pilihan ganda majemuk; kombinasi berikut memenuhi seluruh requirement:
- **D**: Store the credentials in AWS Secrets Manager.
- **E**: Grant the AWS Glue job IAM role access to the stored credentials.
Konteks layanan terkait:
- AWS Glue cocok untuk ETL serverless, crawler/katalog, dan orkestrasi job/workflow.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- IAM mengatur autentikasi/otorisasi; prinsip least privilege dan role terpisah penting.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Store the credentials in the AWS Glue job parameters.
- **B**: tidak memenuhi constraint utama soal — Store the credentials in a configuration file that is in an Amazon S3 bucket.
- **C**: tidak memenuhi constraint utama soal — Access the credentials from a configuration file that is in an Amazon S3 bucket by using the AWS Glue job.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/132698-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q295. [github_examtopics_cache]
*App id: `LOC-295`*

Files from multiple data sources arrive in an Amazon S3 bucket on a regular basis. A data engineer wants to ingest new files into Amazon Redshift in near real time when the new files arrive in the S3 bucket.

Which solution will meet these requirements?

- A. Use the query editor v2 to schedule a COPY command to load new files into Amazon Redshift.
- B. Use the zero-ETL integration between Amazon Aurora and Amazon Redshift to load new files into Amazon Redshift.
- C. Use AWS Glue job bookmarks to extract, transform, and load (ETL) load new files into Amazon Redshift.
- D. Use S3 Event Notifications to invoke an AWS Lambda function that loads new files into Amazon Redshift.

**Answer:** D

**Pembahasan:** Jawaban yang tepat adalah **D**.
Opsi D paling sesuai karena: Use S3 Event Notifications to invoke an AWS Lambda function that loads new files into Amazon Redshift..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
- Amazon Redshift untuk gudang data analitik; data sharing/spectrum relevan untuk akses silang.
- AWS Lambda untuk compute event-driven; layer membantu berbagi dependency antar fungsi.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — Use the query editor v2 to schedule a COPY command to load new files into Amazon Redshift.
- **B**: tidak memenuhi constraint utama soal — Use the zero-ETL integration between Amazon Aurora and Amazon Redshift to load new files into Amazon Redshift.
- **C**: tidak memenuhi constraint utama soal — Use AWS Glue job bookmarks to extract, transform, and load (ETL) load new files into Amazon Redshift.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/146986-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q296. [github_examtopics_cache]
*App id: `LOC-296`*

The company stores a large volume of customer records in Amazon S3. To comply with regulations, the company must be able to access new customer records immediately for the first 30 days after the records are created. The company accesses records that are older than 30 days infrequently.

The company needs to cost-optimize its Amazon S3 storage.

Which solution will meet these requirements MOST cost-effectively?

- A. Apply a lifecycle policy to transition records to S3 Standard Infrequent-Access (S3 Standard-IA) storage after 30 days.
- B. Use S3 Intelligent-Tiering storage.
- C. Transition records to S3 Glacier Deep Archive storage after 30 days.
- D. Use S3 Standard-Infrequent Access (S3 Standard-IA) storage for all customer records.

**Answer:** A

**Pembahasan:** Jawaban yang tepat adalah **A**.
Opsi A paling sesuai karena: Apply a lifecycle policy to transition records to S3 Standard Infrequent-Access (S3 Standard-IA) storage after 30 days..
Konteks layanan terkait:
- Amazon S3 adalah object storage inti data lake; perhatikan lifecycle, partisi, dan endpoint VPC.
Perhatikan kata kunci optimasi (biaya/keamanan/skala) di stem; opsi benar biasanya menyeimbangkan requirement tanpa over-engineering.
Mengapa opsi lain kurang tepat:
- **B**: tidak memenuhi constraint utama soal — Use S3 Intelligent-Tiering storage.
- **C**: tidak memenuhi constraint utama soal — Transition records to S3 Glacier Deep Archive storage after 30 days.
- **D**: tidak memenuhi constraint utama soal — Use S3 Standard-Infrequent Access (S3 Standard-IA) storage for all customer records.
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/152018-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q297. [github_examtopics_cache]
*App id: `LOC-297`*

Two developers are working on separate application releases. The developers have created feature branches named Branch A and Branch B by using a GitHub repository’s master branch as the source.

The developer for Branch A deployed code to the production system. The code for Branch B will merge into a master branch in the following week’s scheduled application release.

Which command should the developer for Branch B run before the developer raises a pull request to the master branch?

- A. git diff branchB master
- B. git commit -m
- B. git pull master
- C. git rebase master
- D. git fetch -b master

**Answer:** C

**Pembahasan:** Jawaban yang tepat adalah **C**.
Opsi C paling sesuai karena: git rebase master.
Mengapa opsi lain kurang tepat:
- **A**: tidak memenuhi constraint utama soal — git diff branchB master
- **B**: tidak memenuhi constraint utama soal — git commit -m
- **B**: tidak memenuhi constraint utama soal — git pull master
- **D**: tidak memenuhi constraint utama soal — git fetch -b master
_Catatan: pembahasan disusun untuk belajar lokal dari kunci sumber; verifikasi ulang ke dokumentasi AWS resmi._

Source URL: https://www.examtopics.com/discussions/amazon/view/145728-exam-aws-certified-data-engineer-associate-dea-c01-topic-1/

---

## Q298. [pdf_exam_dumps] #1

A data engineer is confguring an AWS Glue job to read data from an Amazon S3 bucket. The data engineer has set up the necessary AWS Glue connection details and an associated IAM role. However, when the data engineer aflempts to run the AWS Glue job, Glue job, the data engineer receives an error message that indicates that there are problems with the Amazon S3 VPC gateway endpoint. The data engineer must resolve the error and connect the AWS Glue job to the S3 bucket. Which solution will meet this requirement?

- A. Update the AWS Glue security group to allow inbound traffic from the Amazon S3 VPC gateway endpoint. gateway endpoint.
- B. Confgure an S3 bucket policy to explicitly grant the AWS Glue job permissions to access the S3 bucket.
- C. Review the AWS Glue job code to ensure that the AWS Glue connection details include a fully qualifed domain name.
- D. Verify that the VPC's route table includes inbound and outbound routes for the Amazon S3 VPC gateway endpoint.
- E. D. Verify that the VPC's route table includes inbound and outbound routes for the Amazon S3 VPC gateway endpoint.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q299. [pdf_exam_dumps] #2

A retail company has a customer data hub in an Amazon S3 bucket. Employees from many countries use the data hub to support company-wide analytics A governance team must ensure that the company's data analysts can access data only for customers who are within the same country as the analysts. Which solution will meet these requirements with the LEAST operafonal etiort?

- A. Create a separate table for each country's customer data. Provide access to each analyst each analyst based on the country that the analyst serves. analyst serves.
- B. Register the S3 bucket as a data lake locafon in AWS Lake Formafon. Use the Lake Formafon row-level security features to enforce the company's access policies.
- C. Move the data to AWS Regions that are close to the countries where the customers are. Provide access to each analyst based on the country that the analyst serves.
- D. Load the data into Amazon Redshiffl. Create a view for each country. Create separate IAM roles for each country to provide access to data from each country. Assign the appropriate roles to the analysts.
- E. Provide access to each analyst based on the country that the analyst serves. D. Load the data into Amazon Redshiffl. Create a view for each country. Create separate IAM roles for each country to provide access to data from each country. Assign the appropriate roles to the analysts.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q300. [pdf_exam_dumps] #3

A media company wants to improve a system that recommends media content to customer based on user behaviour and preferences. To improve the recommendation system, the company needs to incorporate insights from third-party datasets into the company's existing analytics plaftorm. The The company wants to minimize the estort and time required to incorporate third-party datasets. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Use API calls to access and integrate third-party datasets from AWS Data Exchange.
- B. Use API calls to access and integrate third-party datasets from AWS DataSyn
- C. C. Use Amazon Kinesis Data Streams to access and integrate third-party datasets from AWS CodeCommit repositories.
- D. Use Amazon Kinesis Data Streams to access and integrate third-party datasets from Amazon Elastic Container Registry (Amazon ECR).
- E. B. Use API calls to access and integrate third-party datasets from AWS DataSync. C. Use Amazon Kinesis Data Streams to access and integrate third-party datasets from AWS CodeCommit repositories. D. Use Amazon Kinesis Data Streams to access and integrate third-party datasets from Amazon Elastic Container Registry (Amazon ECR).

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q301. [pdf_exam_dumps] #4

A fnancial ) A fnancial company wants to implement a data mesh. The data mesh must support centralized data governance, data analysis, and data access control. The company has decided to use AWS Glue Glue for data catalogs and extract, transform, and load (ETL) operations. Which combination of AWS services will implement a data mesh? (Choose two.)

- A. Use Amazon Aurora for data storage. Use an Amazon Redshiffl provisioned cluster for data analysis. analysis.
- B. Use Amazon S3 for data storage. Use Amazon Athena for data analysis.
- C. Use AWS Glue Data Brew for centralized data governance and access control.
- D. Use Amazon RDS for data storag
- E. Use an Amazon Redshiffl provisioned cluster for data analysis. analysis. B. Use Amazon S3 for data storage. Use Amazon Athena for data analysis. C. Use AWS Glue Data Brew for centralized data governance and access control. D. Use Amazon RDS for data storage. Use Amazon EMR for data analysis. E. Use AWS Lake Formafon for centralized data governance and access control.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q302. [pdf_exam_dumps] #5

A data engineer maintains custom Python scripts that perform a data formaffng process that that many AWS Lambda functions use. When the data engineer needs to modify the Python scripts, the data engineer must manually update all the Lambda functions. The data engineer requires a less manual way to update the Lambda functions. Which solution will meet this requirement?

- A. Store a pointer to the custom Python scripts in the execution context object in a shared Amazon S3 bucket.
- B. Package the custom Python scripts into Lambda layers. Apply the Lambda layers to the Lambda funcfons. Lambda funcfons.
- C. Store a pointer to the custom Python scripts in environment variables in a shared Amazon S3 bucket. S3 bucket.
- D. Assign the same alias to each Lambda function. Call reach Lambda function by specifying the function's alias.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q303. [pdf_exam_dumps] #6

A company created an extract, transform, and load (ETL) data pipeline in AWS Glue. A data engineer must crawl a table that is in Microsoffl SQL Server. The data engineer needs to extract, transform, and load the output of the crawl to an Amazon S3 bucket. The data engineer also must orchestrate the data pipeline. Which AWS service or feature will meet these requirements MOST cost-etiecfvely?

- A. AWS Step Functions
- B. AWS Glue workflows
- C. AWS Glue Studio
- D. Amazon Managed Workfiows for Apache Airfiow (Amazon MWAA)

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q304. [pdf_exam_dumps] #7

A fnancial services company stores fnancial data in Amazon Redshiffl. A data engineer wants to run real-time queries on the fnancial data to support a web-based trading application. The data engineer wants to run the queries from within the trading application. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Establish WebSocket connections to Amazon Redshiffl.
- B. Use the Amazon Redshiffi Data API.
- C. Set up Java Database Connectivity (JDBC) connections to Amazon Redshiffl.
- D. Store frequently accessed data in Amazon S3. Use Amazon S3 Select to run the queries.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q305. [pdf_exam_dumps] #9

A data engineer needs to schedule a workfiow that runs a set of AWS Glue jobs every day. The data engineer does not require the Glue jobs to run or fnish at a specifc time. Which solution will run the Glue jobs in the MOST cost-etiecfve way?

- A. Choose the FLEX execufon class in the Glue job properfes
- B. Use the Spot Instance type in Glue job properties.
- C. Choose the STANDARD execution class in the Glue job properties.
- D. Choose the latest version in the GlueVersion feld in the Glue job properties. properties.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q306. [pdf_exam_dumps] #10

data engineer needs to create an AWS Lambda function that converts the format of data data from .csv to Apache Parquet. The Lambda function must run only if a user uploads a .csv fle to an Amazon S3 bucket. Which solution will meet these requirements with the LEAST operafonal LEAST operafonal overhead? overhead?

- A. Create an S3 event noffflcafon that has an event type of s3:ObjectCreated:*. Use a ffllter rule to generate noffflcafons only when the suftx includes .csv. Set the Amazon Resource Name (ARN) of the Lambda funcfon as the desfnafon for the event noffflcafon.
- B. Create an $3 event notifcation that has an event type of s3:ObjectTagging:* for objects for objects that have a tag set to .csv. Set the Amazon Resource Name (ARN) of the Lambda function as the destination for the event notifcation.
- C. Create an S3 event notifcation that has an event type of s3:*. Use a flter rule to generate generate notifcations only when the suffix includes .csv. Set the Amazon Resource Name (ARN) of the the Lambda function as the destination for the event notifcation.
- D. Create an S3 event notifcation that has an event type of s3:ObjectCreated:*. Use a flter flter rule to generate notifcations only when the suffix includes .csv. Set an Amazon Simple Notifcation Service (Amazon SNS) topic as the destination for the event notifcation. Subscribe the Lambda function to the SNS topic.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q307. [pdf_exam_dumps] #11

A data engineer needs Amazon Athena queries to fnish faster. The data engineer notices that all the fles the Athena queries use are currently stored in uncompressed .csv format. The data engineer also notices that users perform most queries by selecting a specifc column. Which solution will MOST speed up the Athena query performance?

- A. Change the data format from .csv to JSON format. Apply Snappy compression.
- B. Compress the .csv fles by using Snappy compression.
- C. Change the data format from .csv to Apache Parquet. Apply Snappy compression.
- D. Compress the .csv fles by using gzip compression.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q308. [pdf_exam_dumps] #12

A manufacturing company collects sensor data from its factory fioor to monitor and enhance enhance operational efficiency. The company uses Amazon Kinesis Data Streams to publish the data that the sensors collect to a data stream. Then Amazon Kinesis Data Firehose writes the data to an Amazon S3 bucket. S3 bucket. The company needs to display a real-time view of operational efficiency on a large screen in the manufacturing facility. Which solution will meet these requirements with the LOWEST latency LOWEST latency?

- A. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analyfcs) to process the sensor data. Use a connector for Apache Flink to write data to an Amazon Timestream database. Use the Timestream database as a source to create a Grafana dashboard. Grafana dashboard.
- B. Confgure the S3 bucket to send a notifcation to an AWS Lambda function when any new object is created. Use the Lambda function to publish the data to Amazon Aurora. Use Aurora. Use Aurora as a source to create an Amazon QuickSight dashboard.
- C. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Kinesis Data Analytics) to process the sensor data. Create a new Data Firehose delivery stream to publish data directly to an Amazon Timestream database. Use the Timestream database as a source to create an Amazon QuickSight dashboar
- D. Grafana dashboard. B. Confgure the S3 bucket to send a notifcation to an AWS Lambda function when any new object is created. Use the Lambda function to publish the data to Amazon Aurora. Use Aurora. Use Aurora as a source to create an Amazon QuickSight dashboard. C. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Kinesis Data Analytics) to process the sensor data. Create a new Data Firehose delivery stream to publish data directly to an Amazon Timestream databas
- E. Use the Timestream database as a source to create a Grafana dashboard. Grafana dashboard. B. Confgure the S3 bucket to send a notifcation to an AWS Lambda function when any new object is created. Use the Lambda function to publish the data to Amazon Aurora. Use Aurora. Use Aurora as a source to create an Amazon QuickSight dashboard. C. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Kinesis Data Analytics) to process the sensor data. Create a new Data Firehose delivery stream to publish data directly to an Amazon Timestream database. Use the Timestream database as a source to create an Amazon QuickSight dashboard. D. Use AWS Glue bookmarks to read sensor data from the S3 bucket in real time. Publish the data to an Amazon Timestream database. Use the Timestream database as a source to create a Grafana dashboard.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q309. [pdf_exam_dumps] #13

A company stores daily records of the fnancial performance of investment porftolios in .csv .csv format in an Amazon S3 bucket. A data engineer uses AWS Glue crawlers to crawl the S3 data. The data engineer must make the S3 data accessible daily in the AWS Glue Data Catalog. Which solution will meet these requirements?

- A. Create an IAM role that includes the Amazon S3 Full Access policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Create a daily schedule to run the crawler. Confgure the output destination to a new path in the existing S3 bucket.
- B. Create an IAM role that includes the AWSGlueServiceRole policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Create a daily schedule to run the crawler. Specify a database name for the output.
- C. Create an IAM role that includes the AmazonS3FullAccess policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Allocate data processing units (DPUs) to run the crawler every day. Specify a database name for the output.
- D. Create an IAM role that includes the AWSGlueServiceRole policy. Associate the role with the crawler. Specify the 53 bucket path of the source data as the crawler's data stor
- E. Create a daily schedule to run the crawler. Confgure the output destination to a new path in the existing S3 bucket. B. Create an IAM role that includes the AWSGlueServiceRole policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Create a daily schedule to run the crawler. Specify a database name for the output. C. Create an IAM role that includes the AmazonS3FullAccess policy. Associate the role with the crawler. Specify the S3 bucket path of the source data as the crawler's data store. Allocate data processing units (DPUs) to run the crawler every day. Specify a database name for the output. D. Create an IAM role that includes the AWSGlueServiceRole policy. Associate the role with the crawler. Specify the 53 bucket path of the source data as the crawler's data store. Allocate data processing units (DPUs) to run the crawler every day. Confgure the output destination to a new path in the existing S3 bucket.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q310. [pdf_exam_dumps] #14

A company loads transaction data for each day into Amazon Redshiffl tables at the end of each day. The company wants to have the ability to track which tables have been loaded and which tables still need to be loaded. A data engineer wants to store the load statuses of Redshiffl tables in an Amazon DynamoDB table. The data engineer creates an AWS Lambda function to publish the details of the load statuses to DynamoDB. DynamoDB. How should the data engineer invoke the Lambda function to write load statuses to the DynamoDB table? table?

- A. Use a second Lambda function to invoke the frst Lambda function based on Amazon Amazon CloudWatch events. CloudWatch events.
- B. Use the Amazon Redshiffi Data API to publish an event to Amazon EventBridge. Confflgure an EventBridge rule to invoke the Lambda funcfon.
- C. Use the Amazon Redshiffl Data API to publish a message to an Amazon Simple Queue Service (Amazon SQS) queue. Confgure the SQS queue to invoke the Lambda function. function.
- D. Use a second Lambda function to invoke the frst Lambda function based on AWS AWS CloudTrail events. CloudTrail events.
- E. Confflgure an EventBridge rule to invoke the Lambda funcfon. C. Use the Amazon Redshiffl Data API to publish a message to an Amazon Simple Queue Service (Amazon SQS) queue. Confgure the SQS queue to invoke the Lambda function. function. D. Use a second Lambda function to invoke the frst Lambda function based on AWS AWS CloudTrail events. CloudTrail events.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q311. [pdf_exam_dumps] #15

A data engineer needs to securely transfer 5 TB of data from an on-premises data center to an Amazon S3 bucket. Approximately 5% of the data changes every day. Updates to the data need to be regularly proliferated to the S3 bucket. The data includes fles that are in multiple formats. The data engineer needs to automate the transfer process and must schedule the process to run periodically. run periodically. Which AWS service should the data engineer use to transfer the data in the MOST operationally MOST operationally efficient way? efficient way?

- A. AWS DataSync
- B. AWS Glue
- C. AWS Direct Connect
- D. Amazon S3 Transfer Acceleration

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q312. [pdf_exam_dumps] #16

A company uses an on-premises Microsoffl SQL Server database to store fnancial transaction data. The company migrates the transaction data from the on-premises database to AWS at the end of each month. The company has noticed that the cost to migrate data from the on-premises database to an Amazon RDS for SQL Server database has increased recently. The company requires a cost-estective solution to migrate the data to AWS. The solufon must cause minimal downtown for the applicafons that access the database. Which AWS service should the company use to meet these requirements?

- A. AWS Lambda
- B. AWS Database Migrafon Service (AWS DMS)
- C. AWS Direct Connect
- D. AWS DataSync

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q313. [pdf_exam_dumps] #17

A data engineer is building a data pipeline on AWS by using AWS Glue extract, transform, and load (ETL) jobs. The data engineer needs to process data from Amazon RDS and MongoDB, perform transformations, and load the transformed data into Amazon Redshiffl for analytics. The data updates must occur every hour. Which combination of tasks will meet these requirements with the LEAST operafonal overhead? (Choose two.) (Choose two.)

- A. Confflgure AWS Glue triggers to run the ETL jobs every hour.
- B. Use AWS Glue DataBrew to clean and prepare the data for analytics.
- C. Use AWS Lambda functions to schedule and run the ETL jobs every hour.
- D. Use AWS Glue connecfons to establish connecfvity between the data sources and Amazon Redshiffi. Amazon Redshiffi.
- E. Use the Redshiffl Data API to load transformed data into Amazon Redshiffl.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q314. [pdf_exam_dumps] #18

A company uses an Amazon Redshiffl cluster that runs on RA3 nodes. The company wants to scale read and write capacity to meet demand. A data engineer needs to identify a solution that will will turn on turn on concurrency scaling. Which solution will meet this requirement? requirement?

- A. Turn on concurrency scaling in workload management (WLM) for Redshiffl Serverless Serverless workgroups. workgroups.
- B. Turn on concurrency scaling at the workload management (WLM) queue level in the Redshiffi cluster. Redshiffi cluster.
- C. Turn on concurrency scaling in the seffngs during the creation of any new Redshiffl cluster. cluster.
- D. Turn on concurrency scaling for the daily usage quota for the Redshiffl cluster.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q315. [pdf_exam_dumps] #19

A data A data engineer must orchestrate a series of Amazon Athena queries that will run every day. Each query can run for more than 15 minutes. Which combination of steps will meet these requirements MOST cost-etiecfvely? (Choose two.) (Choose two.)

- A. Use an AWS Lambda funcfon and the Athena Boto3 client start_query_execufon API call to invoke the Athena queries programmafcally.
- B. Create an AWS Step Funcfons workflow and add two states. Add the fflrst state before the Lambda funcfon. Confflgure the second state as a Wait state to periodically check whether the Athena query has fflnished using the Athena Boto3 get_query_execufon API call. Confflgure the workflow to invoke the next query when the current query has fflnished running. running.
- C. Use an AWS Glue Python shell job and the Athena Boto3 client start_query_execution API call to invoke the A call to invoke the Athena queries programmatically.
- D. Use an AWS Glue Python shell script to run a sleep timer that checks every 5 minutes to determine whether the current Athena query has fnished running successfully. Confgure the Python shell script to invoke the next query when the current query has fnished fnished running. running.
- E. Use Amazon Managed Workfiows for Apache Airfiow (Amazon MWAA) to orchestrate the Athena queries in AWS Batch.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q316. [pdf_exam_dumps] #20

A company is migrating on-premises workloads to AWS. The company wants to reduce overall reduce overall operational overhead. The company also wants to explore serverless options. The company's current workloads use Apache Pig, Apache Oozie, Apache Spark, Apache Hbase, and Hbase, and Apache Flink Apache Flink. The on-premises workloads process petabytes of data in seconds. The c . The on-premises workloads process petabytes of data in seconds. The company must ompany must maintain similar or befler performance affler the migration to AWS. AWS. Which extract, transform, and load (ETL) service will meet these requirements?

- A. AWS Glue
- B. Amazon EMR
- C. AWS Lambda
- D. Amazon Redshiffl

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q317. [pdf_exam_dumps] #21

A data engineer must use AWS services to ingest a dataset into an Amazon S3 data lake. The data engineer profles the dataset and discovers that the dataset contains personally identifable information (PII). The data engineer must implement a solution to profle the dataset and obfuscate the PII. the PII. Which solution will meet this requirement with the LEAST operafonal etiort?

- A. Use an Amazon Kinesis Data Firehose delivery stream to process the dataset. Create an AWS Lambda transform function to identify the PII. Use an AWS SDK to obfuscate the PII. Set the S3 data lake as the target for the delivery stream.
- B. Use the Detect PII transform in AWS Glue Studio to identify the PII. Obfuscate the PII. Use Use an AWS Step Functions state machine to orchestrate a data pipeline to ingest the data into the S3 data lake.
- C. Use the Detect PII transform in AWS Glue Studio to idenffy the PII. Create a rule in AWS Glue Data Quality to obfuscate the PII. Use an AWS Step Funcfons state machine to orchestrate a data pipeline to ingest the data into the S3 data lake.
- D. Ingest the dataset into Amazon DynamoDB. Create an AWS Lambda function to identify and obfuscate the PII in the DynamoDB table and to transform the data. Use the same Lambda function to ingest the data into the S3 data lak
- E. C. Use the Detect PII transform in AWS Glue Studio to idenffy the PII. Create a rule in AWS Glue Data Quality to obfuscate the PII. Use an AWS Step Funcfons state machine to orchestrate a data pipeline to ingest the data into the S3 data lake. D. Ingest the dataset into Amazon DynamoDB. Create an AWS Lambda function to identify and obfuscate the PII in the DynamoDB table and to transform the data. Use the same Lambda function to ingest the data into the S3 data lake.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q318. [pdf_exam_dumps] #22

A company maintains multiple extract, transform, and load (ETL) workfiows that ingest data from from the company's operational databases into an Amazon S3 based data lake. The ETL workfiows use AWS Glue and Amazon EMR to process data. The company wants to improve the existing architecture to provide automated orchestration and to require minimal manual estort. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. AWS Glue workflows
- B. AWS Step Functions tasks
- C. AWS Lambda functions
- D. Amazon Managed Workfiows for Apache Airfiow (Amazon MWAA) workfiows

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q319. [pdf_exam_dumps] #23

A company currently stores all of its data in Amazon S3 by using the S3 Standard storage class. A data engineer examined data access paflerns to identify trends. During the frst 6 months, most data fles are accessed several times each day. Between 6 months and 2 years, most data fles are are accessed once or twice each month. Affler 2 years, data fles are accessed only once or twice each year. year. The data engineer needs to use an S3 Lifecycle policy to develop new data storage rules. The new storage solution must continue to provide high availability. Which solution will meet these requirements in the MOST cost-etiecfve way?

- A. Transition objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) affler 6 months. 6 months. Transfer objects to S3 Glacier Flexible Retrieval affler 2 years.
- B. Transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) affler 6 months. Transfer objects to S3 Glacier Flexible Retrieval affler 2 years.
- C. Transifon objects to S3 Standard-Infrequent Access (S3 Standard-IA) affier 6 months. Transfer objects to S3 Glacier Deep Archive affier 2 years.
- D. Transition objects to S3 One Zone-Infrequent Access (S3 One Zone-IA) affler 6 months. months. Transfer objects to S3 Glacier Deep Archive affler 2 years.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q320. [pdf_exam_dumps] #24

A company maintains an Amazon Redshiffl provisioned cluster that the company uses for extract, extract, transform, and load (ETL) operations to support critical analysis tasks. A sales team within the company maintains a Redshiffl cluster that the sales team uses for business intelligence (BI) tasks. The sales team recently requested access to the data that is in the ETL Redshiffl cluster so the team can perform weekly summary analysis tasks. The sales team needs to join data from the ETL cluster with data that is in the sales team's Bl cluster. The company needs a solution that will share the ETL cluster data with the sales team without team without interrupting the critical analysis tasks. The solution must minimize usage of the computing resources of the ETL cluster. Which solution will meet these requirements?

- A. Set up the sales team BI cluster as a consumer of the ETL cluster by using Redshiffi data sharing. sharing.
- B. Create materialized views based on the sales team's requirements. Grant the sales team direct access to the ETL cluster.
- C. Create database views based on the sales team's requirements. Grant the sales team direct access to the ETL cluster.
- D. Unload a copy of the data from the ETL cluster to an Amazon S3 bucket every week. Create an Amazon Redshiffl Spectrum table based on the content of the ETL cluster.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q321. [pdf_exam_dumps] #25

A data engineer needs to join data from multiple sources to perform a one-time analysis job. The data is stored in Amazon DynamoDB, Amazon RDS, Amazon Redshiffl, and Amazon S3. Which solution will meet this requirement MOST cost-etiecfvely?

- A. Use an Amazon EMR provisioned cluster to read from all sources. Use Apache Spark to join the data and perform the analysis.
- B. Copy the data from DynamoDB, Amazon RDS, and Amazon Redshiffl into Amazon S3. Run Amazon Athena queries directly on the S3 fles.
- C. Use Amazon Athena Federated Query to join the data from all data sources.
- D. Use Redshiffl Spectrum to query data from DynamoDB, Amazon RDS, and Amazon S3 directly from Redshiffl.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q322. [pdf_exam_dumps] #26

A company is planning to use a provisioned Amazon EMR cluster that runs Apache Spark jobs to perform big data analysis. The company requires high reliability. A big data team must follow best practices for running cost-optimized and long-running workloads on Amazon EMR. The team must fnd a solution that will maintain the company's current level of performance. Which combination of resources will meet these requirements MOST cost-etiecfvely? (Choose two.) (Choose two.)

- A. Use Hadoop Distributed File System (HDFS) as a persistent data store. store.
- B. Use Amazon S3 as a persistent data store.
- C. Use x86-based instances for core nodes and task nodes. task nodes.
- D. Use Graviton instances for core nodes and task nodes.
- E. store. B. Use Amazon S3 as a persistent data store. C. Use x86-based instances for core nodes and task nodes. task nodes. D. Use Graviton instances for core nodes and task nodes. E. Use Spot Instances for all primary nodes. primary nodes.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q323. [pdf_exam_dumps] #27

A company wants to implement real-time analytics capabilities. The company wants to use Amazon Kinesis Data Streams and Amazon Redshiffl to ingest and process streaming data at the rate of several gigabytes per second. The company wants to derive near real-time insights by using existing business intelligence (BI) and analytics tools. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Use Kinesis Data Streams to stage data in Amazon S3. Use the COPY command to load data from Amazon S3 directly into Amazon Redshiffl to make the data immediately available for real-time analysis.
- B. Access the data from Kinesis Data Streams by using SQL queries. Create materialized views directly on top of the stream. Refresh the materialized views regularly to query the most recent stream data.
- C. Create an external schema in Amazon Redshiffi to map the data from Kinesis Data Streams to an Amazon Redshiffi object. Create a materialized view to read data from the stream. Set the materialized view to auto refresh.
- D. Connect Kinesis Data Streams to Amazon Kinesis Data Firehos
- E. Use Kinesis Data Firehose Firehose to stage the data in Amazon S3. Use the COPY command to load the data from Amazon S3 to a table in Amazon Redshiffl.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q324. [pdf_exam_dumps] #28

A company uses an Amazon QuickSight dashboard to monitor usage of one of the company's applications. The company uses AWS Glue jobs to process data for the dashboard. The company stores the data in a single Amazon S3 bucket. The company adds new data every day. A data engineer discovers that dashboard queries are becoming slower over time. The data engineer determines that the root cause of the slowing queries is long-running AWS Glue jobs. Which actions should the data engineer take to improve the performance of the AWS Glue jobs? (Choose two.) (Choose two.)

- A. Parffon the data that is in the S3 bucket. Organize the data by year, month, and day.
- B. Increase the AWS Glue instance size by scaling up the worker type.
- C. Convert the AWS Glue schema to the DynamicFrame schema class.
- D. Adjust AWS Glue job scheduling frequency so the jobs run half as many times each day.
- E. C. Convert the AWS Glue schema to the DynamicFrame schema class. D. Adjust AWS Glue job scheduling frequency so the jobs run half as many times each day. E. Modify the IAM role that grants access to AWS glue to grant access to all S3 features.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q325. [pdf_exam_dumps] #29

A data engineer needs to use AWS Step Functions to design an orchestration workfiow. The workfiow must parallel process a large collection of data fles and apply a specifc transformation to each fle. Which Step Functions state should the data engineer use to meet these requirements?

- A. Parallel state
- B. Choice state
- C. Map state
- D. Wait state

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q326. [pdf_exam_dumps] #30

A company is migrating a legacy application to an Amazon S3 based data lake. A data engineer reviewed data that is associated with the legacy application. The data engineer found that the legacy data contained some duplicate information. The data engineer must identify and remove duplicate information from the legacy application data. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Write a custom extract, transform, and load (ETL) job in Python. Use the DataFrame.drop_duplicates() function by importing the Pandas library to perform data deduplication. deduplication.
- B. Write an AWS Glue extract, transform, and load (ETL) job. Use the FindMatches machine learning (ML) transform to transform the data to perform data deduplication.
- C. Write a custom extract, transform, and load (ETL) job in Python. Import the Python dedupe library. Use the dedupe library to perform data deduplication. deduplication.
- D. Write an AWS Glue extract, transform, and load (ETL) job. Import the Python dedupe library. Use the dedupe library to perform data deduplicafon.
- E. drop_duplicates() function by importing the Pandas library to perform data deduplication. deduplication. B. Write an AWS Glue extract, transform, and load (ETL) job. Use the FindMatches machine learning (ML) transform to transform the data to perform data deduplication. C. Write a custom extract, transform, and load (ETL) job in Python. Import the Python dedupe library. Use the dedupe library to perform data deduplication. deduplication. D. Write an AWS Glue extract, transform, and load (ETL) job. Import the Python dedupe library. Use the dedupe library to perform data deduplicafon.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q327. [pdf_exam_dumps] #31

A company is building an analytics solution. The solution uses Amazon S3 for data lake storage and Amazon Redshiffl for a data warehouse. The company wants to use Amazon Redshiffl Spectrum Spectrum to query the data that is in Amazon S3. Which actions will provide the FASTEST queries? (Choose two.)

- A. Use gzip compression to compress individual fles to sizes that are between 1 GB and 5 G
- B. GB. B. Use a columnar storage fflle format.
- C. Parffon the data based on the most common query predicates.
- D. Split the data into fles that are less than 10 KB.
- E. Use fle formats that are not spliflable. not spliflable.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q328. [pdf_exam_dumps] #32

A company uses Amazon RDS to store transactional data. The company runs an RDS DB instance in a private subnet. A developer wrote an AWS Lambda function with default seffngs to insert, update, or delete data in the DB instance. instance. The developer needs to give the Lambda function the ability to connect to the DB instance privately instance privately without using the public internet. Which combination of steps will meet this requirement with the LEAST operafonal overhead? (Choose two.) (Choose two.)

- A. Turn on the public access seffng for the DB instance.
- B. Update the security group of the DB instance to allow only Lambda funcfon invocafons on the database port. database port.
- C. Confflgure the Lambda funcfon to run in the same subnet that the DB instance uses.
- D. Aflach the same security group to the Lambda function and the DB instanc
- E. B. Update the security group of the DB instance to allow only Lambda funcfon invocafons on the database port. database port. C. Confflgure the Lambda funcfon to run in the same subnet that the DB instance uses. D. Aflach the same security group to the Lambda function and the DB instance. Include a self- referencing rule that allows access through the database port. E. Update the network ACL of the private subnet to include a self-referencing rule that allows access through the database port.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q329. [pdf_exam_dumps] #33

A company has a frontend ReactJS website that uses Amazon API Gateway to invoke REST APIs. The APIs perform the functionality of the website. A data engineer needs to write a Python script that can be occasionally invoked through API Gateway. The code must return results to API Gateway. API Gateway. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Deploy a custom Python script on an Amazon Elastic Container Service (Amazon ECS) cluster. cluster.
- B. Create an AWS Lambda Python funcfon with provisioned concurrency.
- C. Deploy a custom Python script that can integrate with API Gateway on Amazon Elastic Kubernetes Service (Amazon EKS).
- D. Create an AWS Lambda function. Ensure that the function is warm by scheduling an scheduling an Amazon EventBridge rule to invoke the Lambda function every 5 minutes by using mock events. events.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q330. [pdf_exam_dumps] #34

A company has a production AWS account that runs company workloads. The company's security team created a security AWS account to store and analyze security logs from the production AWS account. The security logs in the production AWS account are stored in Amazon CloudWatch Logs. The company needs to use Amazon Kinesis Data Streams to deliver the security logs to the security the security AWS account. AWS account. Which solution will meet these requirements?

- A. Create a desfnafon data stream in the producfon AWS account. In the security AWS account, create an IAM role that has cross-account permissions to Kinesis Data Streams in the producfon AWS account.
- B. Create a destination data stream in the security AWS account. Create an IAM role and a trust policy to grant CloudWatch Logs the permission to put data into the stream. Create a subscription flter in the security AWS account.
- C. Create a desfnafon data stream in the producfon AWS account. In the producfon AWS account, create an IAM role that has cross-account permissions to Kinesis Data Streams in the security AWS account.
- D. Create a destination data stream in the security AWS account. Create an IAM role and a trust policy to grant CloudWatch Logs the permission to put data into the stream. Create a subscription flter in the production AWS account.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q331. [pdf_exam_dumps] #35

A company uses Amazon S3 to store semi-structured data in a transactional data lake. Some of the data fles are small, but other data fles are tens of terabytes. terabytes. A data engineer must perform a change data capture (CDC) operation to identify changed data from from the data source. The data source sends a full snapshot as a JSON fle every day and ingests the changed data into the data lake. Which solution will capture the changed data MOST cost-etiecfvely?

- A. Create an AWS Lambda function to identify the changes between the previous data and the current data. Confgure the Lambda function to ingest the changes into the data lake.
- B. Ingest the data into Amazon RDS for MySQL. Use AWS Database Migration Service (AWS DMS) to write the changed data to the data lake.
- C. Use an open source data lake format to merge the data source with the S3 data lake to insert the new data and update the exisfng data.
- D. Ingest the data into an Amazon Aurora MySQL DB instance that runs Aurora Serverless. Use AWS Database Migration Service (AWS DMS) to write the changed data to the data lak
- E. B. Ingest the data into Amazon RDS for MySQL. Use AWS Database Migration Service (AWS DMS) to write the changed data to the data lake. C. Use an open source data lake format to merge the data source with the S3 data lake to insert the new data and update the exisfng data. D. Ingest the data into an Amazon Aurora MySQL DB instance that runs Aurora Serverless. Use AWS Database Migration Service (AWS DMS) to write the changed data to the data lake.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q332. [pdf_exam_dumps] #36

A data engineer runs Amazon Athena queries on data that is in an Amazon S3 bucket. The Athena queries use AWS Glue Data Catalog as a metadata table. The data engineer notices that the Athena query plans are experiencing a performance boflleneck. The data engineer determines that the cause of the performance boflleneck is the large number of partitions that are in the S3 bucket. The data engineer must resolve the performance boflleneck and reduce Athena query planning time. Which solutions will meet these requirements? (Choose two.)

- A. Create an AWS Glue parffon index. Enable parffon fflltering.
- B. Bucket the data based on a column that the data have in common in a WHERE clause of the user query.
- C. Use Athena parffon projecfon based on the S3 bucket prefflx.
- D. Transform the data that is in the S3 bucket to Apache Parquet format.
- E. Use the Amazon EMR S3DistCP utility to combine smaller objects in the 53 bucket into larger objects. larger objects.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q333. [pdf_exam_dumps] #37

A data A data engineer must manage the ingestion of real-time streaming data into AWS. The data The data engineer wants to perform real-time analytics on the incoming streaming data by using time-based aggregations over a window of up to 30 minutes. The data engineer needs a solution that is highly is highly fault tolerant. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Use an AWS Lambda function that includes both the business and the analytics logic to ic to perform time-based aggregations over a window of up to 30 minutes for the data in Amazon Amazon Kinesis Data Streams.
- B. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analytics) to analyze the data that might occasionally contain duplicates by using multiple multiple types of aggregations.
- C. Use an AWS Lambda function that includes both the business and the analytics logic to logic to perform aggregations for a tumbling window of up to 30 minutes, based on the event the event timestamp. timestamp.
- D. Use Amazon Managed Service for Apache Flink (previously known as Amazon Kinesis Data Analyfcs) to analyze the data by using mulfple types of aggregafons to perform fme-based analyfcs over a window of up to 30 minutes.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q334. [pdf_exam_dumps] #38

A company is planning to upgrade its Amazon Elastic Block Store (Amazon EBS) General Purpose SSD storage from gp2 to gp3. The company wants to prevent any interruptions in its Amazon EC2 instances that will cause data loss during the migration to the upgraded storage. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Create snapshots of the gp2 volumes. Create new gp3 volumes from the snapshots. Aflach the new gp3 volumes to the EC2 instances.
- B. Create new gp3 volumes. Gradually transfer the data to the new gp3 volumes. When the transfer is complete, mount the new gp3 volumes to the EC2 instances to replace the gp2 volumes. volumes.
- C. Change the volume type of the exisfng gp2 volumes to gp3. Enter new values for volume size, IOPS, and throughput.
- D. Use AWS DataSync to create new gp3 volumes. Transfer the data from the original gp2 volumes to the new gp3 volumes.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q335. [pdf_exam_dumps] #39

A company is migrating its database servers from Amazon EC2 instances that run Microsoffl SQL Server to Amazon RDS for Microsoffl SQL Server DB instances. The company's analytics team must export large data elements every day until the migration is complete. The data elements are the result of SQL joins across multiple tables. The data must be in Apache Parquet format. The analytics team must store the data in Amazon S3. Which solution will meet these requirements in the MOST operafonally eftcient way?

- A. Create a view in the EC2 instance-based SQL Server databases that contains the required data elements. Create an AWS Glue job that selects the data directly from the view and view and transfers the data in Parquet format to an S3 bucket. Schedule the AWS Glue job to run every day. every day.
- B. Schedule SQL Server Agent to run a daily SQL query that selects the desired data elements from the EC2 instance-based SQL Server databases. Confgure the query to direct the direct the output .csv objects to an S3 bucket. Create an S3 event that invokes an AWS Lambda function to transform the output format from .csv to Parquet. to Parquet.
- C. Use a SQL query to create a view in the EC2 instance-based SQL Server databases that contains the required data elements. Create and run an AWS Glue crawler to read the view. Create an AWS Glue job that retrieves the data and transfers the data in Parquet format to an S3 bucket. Schedule the AWS Glue job to run every day.
- D. Create an AWS Lambda function that queries the EC2 instance-based databases by using Java Database Connectivity (JDBC). Confgure the Lambda function to retrieve the required data, transform the data into Parquet format, and transfer the data into an S3 bucket. Use bucket. Use Amazon EventBridge to schedule the Lambda function to run every day.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q336. [pdf_exam_dumps] #40

A data engineering team is using an Amazon Redshiffl data warehouse for operational reporting. The team wants to prevent performance issues that might result from long-running queries. A data data engineer must choose a system table in Amazon Redshiffl to edshiffl to record anomalies when a query optimizer identifes conditions that might indicate performance issues. Which table views should the data engineer use to meet this requirement?

- A. STL_USAGE_CONTROL
- B. STL_ALERT_EVENT_LOG
- C. STL_QUERY_METRICS
- D. STL_PLAN_INFO

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q337. [pdf_exam_dumps] #41

A data engineer must ingest a source of structured data that is in .csv format into an Amazon S3 data lake. The .csv fles contain 15 columns. Data analysts need to run Amazon Athena queries on one or two columns of the dataset. The data analysts rarely query the entire fle. Which solution will meet these requirements MOST cost-etiecfvely?

- A. Use an AWS Glue PySpark job to ingest the source data into the data lake in .csv format.
- B. Create an AWS Glue extract, transform, and load (ETL) job to read from the .csv structured data source. Confgure the job to ingest the data into the data lake in JSON format.
- C. Use an AWS Glue PySpark job to ingest the source data into the data lake in Apache Avro format. format.
- D. Create an AWS Glue extract, transform, and load (ETL) job to read from the .csv structured data sourc
- E. Confgure the job to ingest the data into the data lake in JSON format. C. Use an AWS Glue PySpark job to ingest the source data into the data lake in Apache Avro format. format. D. Create an AWS Glue extract, transform, and load (ETL) job to read from the .csv structured data source. Confflgure the job to write the data into the data lake in Apache Parquet format. Parquet format.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q338. [pdf_exam_dumps] #42

A company has fve offices in disterent AWS Regions. Each office has its own human resources (HR) department that uses a unique IAM role. The company stores employee records in a data lake lake that is based on Amazon S3 storage. A data engineering team needs to limit access to the records. Each HR department should be able to access records for only employees who are within the HR department's Region. Which combination of steps should the data engineering team take to meet this requirement with the the LEAST operafonal overhead? (Choose two.) ? (Choose two.)

- A. Use data flters for each Region to register the S3 paths as data locations.
- B. Register the S3 path as an AWS Lake Formafon locafon.
- C. Modify the IAM roles of the HR departments to add a data flter for each department's department's Region. Region.
- D. Enable fflne-grained access control in AWS Lake Formafon. Add a data ffllter for each Region. Region.
- E. Create a separate S3 bucket for each Region. Confgure an IAM policy to allow $3 access. Restrict access based on Region.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q339. [pdf_exam_dumps] #43

A company uses AWS Step Functions to orchestrate a data pipeline. The pipeline consists of Amazon EMR jobs that ingest data from data sources and store the data in an Amazon S3 bucket. The pipeline also includes EMR jobs that load the data to A load the data to Amazon Redshiffl. mazon Redshiffl. The company's cloud infrastructure team manually built a Step Functions state machine. The cloud infrastructure team launched an EMR cluster into a VPC to support the EMR jobs. However, the deployed Step Functions state machine is not able to run the EMR jobs. Which combination of steps should the company take to identify the reason the Step Functions state machine is not able to run the EMR jobs? (Choose two.)

- A. Use AWS CloudFormation to automate the Step Functions state machine deployment. Create a step to pause the state machine during the EMR jobs that fail. Confgure the step to wait for a human user to send approval through an email message. Include details of the EMR task in the email message for further analysis.
- B. Verify that the Step Funcfons state machine code has all IAM permissions that are necessary to create and run the EMR jobs. Verify that the Step Funcfons state machine code also includes IAM permissions to access the Amazon S3 buckets that the EMR jobs use. Use Access Analyzer for S3 to check the S3 access properfes.
- C. Check for entries in Amazon CloudWatch for the newly created EMR cluster. Change the Change the AWS Step Functions state machine code to use Amazon EMR on EKS. Change the IAM access policies and the security group confguration for the Step Functions state machine code to refiect inclusion of Amazon Elastic Kubernetes Service (Amazon ĔKS). ĔKS).
- D. Query the flow logs for the VPC. Determine whether the traftc that originates from the EMR cluster can successfully reach the data providers. Determine whether any security group that might be astached to the Amazon EMR cluster allows connecfons to the data source servers on the informed ports.
- E. Include details of the EMR task in the email message for further analysis. B. Verify that the Step Funcfons state machine code has all IAM permissions that are necessary to create and run the EMR jobs. Verify that the Step Funcfons state machine code also includes IAM permissions to access the Amazon S3 buckets that the EMR jobs use. Use Access Analyzer for S3 to check the S3 access properfes. C. Check for entries in Amazon CloudWatch for the newly created EMR cluster. Change the Change the AWS Step Functions state machine code to use Amazon EMR on EKS. Change the IAM access policies and the security group confguration for the Step Functions state machine code to refiect inclusion of Amazon Elastic Kubernetes Service (Amazon ĔKS). ĔKS). D. Query the flow logs for the VPC. Determine whether the traftc that originates from the EMR cluster can successfully reach the data providers. Determine whether any security group that might be astached to the Amazon EMR cluster allows connecfons to the data source servers on the informed ports. E. Check the retry scenarios that the company confgured for the EMR jobs. Increase the Increase the number of seconds in the interval between each EMR task. Validate that each fallback state has the appropriate catch for each decision state. Confgure an Amazon Simple Notifcation Service (Amazon SNS) topic to store the error messages.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q340. [pdf_exam_dumps] #44

A company is developing an application that runs on Amazon EC2 instances. Currently, the data that the application generates is temporary. However, the company needs to persist the data, even , even if the EC2 instances are terminated. A data engineer must launch new EC2 instances from an Amazon Machine Image (AMI) and MI) and confgure the instances to preserve the data. Which solution will meet this requirement?

- A. Launch new EC2 instances by using an AMI that is backed by an EC2 instance store volume that contains the application data. Apply the default seffngs to the EC2 instances.
- B. Launch new EC2 instances by using an AMI that is backed by a root Amazon Elasfc Block Store (Amazon EBS) volume that contains the applicafon data. Apply the default seffngs to the EC2 instances.
- C. Launch new EC2 instances by using an AMI that is backed by an EC2 instance store volume. Aflach an Amazon Elastic Block Store (Amazon EBS) volume to contain the application data. Apply the default seffngs to the EC2 instances.
- D. Launch new EC2 instances by using an AMI that is backed by an Amazon Elastic Block Store (Amazon EBS) volum
- E. Aflach an Amazon Elastic Block Store (Amazon EBS) volume to contain the application data. Apply the default seffngs to the EC2 instances. D. Launch new EC2 instances by using an AMI that is backed by an Amazon Elastic Block Store (Amazon EBS) volume. Aflach an additional EC2 instance store volume to contain the application data. Apply the default seffngs to the EC2 instances.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q341. [pdf_exam_dumps] #45

A company uses Amazon Athena to run SQL queries for extract, transform, and load (ETL) tasks by using Create Table As Select (CTAS). The company must use Apache Spark instead of SQL to SQL to generate analytics. Which solution will give the company the ability to use Spark to access Athena?

- A. Athena query seffngs
- B. Athena workgroup
- C. Athena data source
- D. Athena query editor

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q342. [pdf_exam_dumps] #46

A company needs to partition the Amazon S3 storage that the company uses for a data lake. The partitioning will use a path of the S3 object keys in the following format: s3://bucket/prefx/year=2023/month=01/day=01. A data engineer must ensure that the AWS Glue Data Catalog synchronizes with the S3 storage when storage when the company adds new partitions to the bucket. Which solution will meet these requirements with the LEAST latency LEAST latency?

- A. Schedule an AWS Glue crawler to run every morning.
- B. Manually run the AWS Glue CreatePartition API twice each day.
- C. Use code that writes data to Amazon S3 to invoke the Boto3 AWS Glue create_parffon API call. API call.
- D. Run the MSCK REPAIR TABLE command from the AWS Glue consol

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q343. [pdf_exam_dumps] #47

A media company uses sofflware as a service (SaaS) applications to gather data by using third- party tools. The company needs to store the data in an Amazon S3 bucket. The company will use Amazon Redshiffl to perform analytics based on the data. data. Which AWS service or feature will meet these requirements with the LEAST operafonal overhead?

- A. Amazon Managed Streaming for Apache Kaa (Amazon MSK)
- B. Amazon AppFlow
- C. AWS Glue Data Catalog
- D. Amazon Kinesis

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q344. [pdf_exam_dumps] #48

A data engineer is using Amazon Athena to analyze sales data that is in Amazon S3. The data engineer writes a query to retrieve sales amounts for 2023 for several products from a table named sales_data. However, the query does not return results for all of the products that are in the the sales_data table. The data engineer needs to troubleshoot the query to resolve the issue. issue. The data engineer's original query is as follows: follows: SELECT product_name, sum(sales_amount) FROM sales_data- FROM sales_data- WHERE year = 2023 - GROUP BY product_name - How should the data engineer modify the Athena query to meet these requirements?

- A. Replace sum(sales_amount) with count(*) for the aggregation. gregation.
- B. Change WHERE year = 2023 to WHERE extract(year FROM sales_data) = 2023.
- C. Add HAVING sum(sales_amount) > 0 affier the GROUP BY clause.
- D. Remove the GROUP BY claus
- E. D. Remove the GROUP BY clause.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q345. [pdf_exam_dumps] #49

A data A data engineer has a one-time task to read data from objects that are in Apache Parquet format Parquet format in an Amazon S3 bucket. The data engineer needs to query only one column of the data. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Confgure an AWS Lambda function to load data from the S3 bucket into a pandas dataframe. Write a SQL SELECT statement on the dataframe to query the required column.
- B. Use S3 Select to write a SQL SELECT statement to retrieve the required column from the S3 objects. S3 objects.
- C. Prepare an AWS Glue DataBrew project to consume the S3 objects and to query the required column. required column.
- D. Run an AWS Glue crawler on the S3 objects. Use a SQL SELECT statement in Amazon Athena to query the required column.
- E. Write a SQL SELECT statement on the dataframe to query the required column. B. Use S3 Select to write a SQL SELECT statement to retrieve the required column from the S3 objects. S3 objects. C. Prepare an AWS Glue DataBrew project to consume the S3 objects and to query the required column. required column. D. Run an AWS Glue crawler on the S3 objects. Use a SQL SELECT statement in Amazon Athena to query the required column.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q346. [pdf_exam_dumps] #50

A company uses Amazon Redshiffl for its data warehouse. The company must automate refresh schedules for Amazon Redshiffl materialized views. Which solution will meet this requirement with the LEAST estort? estort?

- A. Use Apache Airfiow to refresh the materialized views.
- B. Use an AWS Lambda user-defned function (UDF) within Amazon Redshiffl to refresh the materialized views.
- C. Use the query editor v2 in Amazon Redshiffi to refresh the materialized views.
- D. Use an AWS Glue workfiow to refresh the materialized views.
- F. within Amazon Redshiffl to refresh the materialized views. C. Use the query editor v2 in Amazon Redshiffi to refresh the materialized views. D. Use an AWS Glue workfiow to refresh the materialized views.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q347. [pdf_exam_dumps] #52

A company needs to set up a data catalog and metadata management for data sources that run in the AWS Cloud. The company will use the data catalog to maintain the metadata of all the objects that are in a set of data stores. The data stores include structured sources such as Amazon RDS and Amazon Redshiffl. The data stores also include semistructured sources such as JSON fles and .xml fles that are stored in Amazon S3. The company needs a solution that will update the data catalog on a regular basis. The solution also must detect changes to the source metadata. Which solution will meet these requirements with the LEAST operafonal overhead?

- A. Use Amazon Aurora as the data catalog. Create AWS Lambda functions that will connect to the data catalog. Confgure the Lambda functions to gather the metadata information fro from m mul multipl tiple e sou source rces s and and to to upd update ate the Aurora data cat catalo alog. g. Sch Schedu edule le the the Lam Lambda bda functions to run periodically.
- B. Use the AWS Glue Data Catalog as the central metadata repository. Use AWS Glue crawlers to connect to mulfple data stores and to update the Data Catalog with metadata changes. Schedule the crawlers to run periodically to update the metadata catalog.
- C. Use Amazon DynamoDB as the data catalog. Create AWS Lambda functions that will connect to the data catalog. Confgure the Lambda functions to gather the metadata information from multiple sources and to update the DynamoDB data catalog. Schedule the Lambda functions to run periodically.
- D. Use the AWS Glue Data Catalog as the central metadata repository. Extract the schema for Amazon RDS and Amazon Redshiffl sources, and build the Data Catalog. Use AWS Glue crawlers for data that is in Amazon S3 to infer the schema and to automatically update the Data Catalog Data Catalog

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q348. [pdf_exam_dumps] #53

A company stores data from an application in an Amazon DynamoDB table that operates in provisioned capacity mode. The workloads of the application have predictable throughput load on a regular schedule. Every Monday, there is an immediate increase in activity early in the morning. The application has very low usage during weekends. The company must ensure that the application performs consistently during peak usage times. Which solution will meet these requirements in the MOST cost-etiecfve way?

- A. Increase the provisioned capacity to the maximum capacity that is currently present during peak load times.
- B. Divide the table into two tables. Provision each table with half of the provisioned capacity of the original table. Spread queries evenly across both tables.
- C. Use AWS Applicafon Auto Scaling to schedule higher provisioned capacity for peak usage fmes. Schedule lower capacity during oti-peak fmes.
- D. Change the capacity mode from provisioned to on-demand. Confgure the table to scale up and scale down based on the load on the tabl
- E. Spread queries evenly across both tables. C. Use AWS Applicafon Auto Scaling to schedule higher provisioned capacity for peak usage fmes. Schedule lower capacity during oti-peak fmes. D. Change the capacity mode from provisioned to on-demand. Confgure the table to scale up and scale down based on the load on the table.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q349. [pdf_slide_deck]

What should the data engineer recommend?

- A. com 31/43 --- page 466 --- D2ST0RE
- E. Here it means a one query in one system the team already runs. second system to run and the filter columns living elsewhere. MemoryDB Athena over document text Lowest latency, at in-memory prices for two million vectors, Keyword matching over files.The whole requirement is and nothing here requires microseconds. finding matches where the wording differs. THE SIGNAL CHOOSING A DATA STORE admin@sthithapragna.com 31/43 --- page 466 --- D2ST0RE

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q350. [pdf_slide_deck]

Why did the first attempt fail, and what should replace it?

- A. com 22 / 24 --- page 183 --- D1INGEST
- D. Matches the access pattern. reads. Faster than Athena, still the wrong shap
- E. THE SIGNAL Compare with scenario 1. There, streaming was overkill. Here, an analytical store is underpowered. Same question, opposite direction. THE MENTAL MODEL admin@sthithapragna.com 22 / 24 --- page 183 --- D1INGEST

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q351. [pdf_slide_deck]

What should the data engineer change?

- A. com 11/ 35 --- page 575 --- D30PS WORKEDSCENARI02 0F4 query them perhaps twice a year during audits. Logs currently go to CloudWatch Logs with no retention policy set, and the Cloudwatch bill has grown steadily. The security team also needs to run occasional forensic searches over the last thirty days, interactively. Which approach best meets both needs? Keep everything in CloudWatch Logs indefinitely Set a thirty day retention on the log groups, and and query with Logs Insights export older logs to Amazon S3 with a lifecycle policy to Glacier, queried with Athena Stream all logs toAmazonOpenSearchService Reduce retention to thirty days and accept the and retain seven years of indices loss of older logs PAUSE AND DECIDE MONITORING AND TROUBLESHOOTING admin@sthithapragna.com 21/46 --- page 576 --- D30PS WORKED SCENARI0 2 0F 4-WORKED Which approach best meets both needs? Everything in Cloudwatch forever Thirty day retention, export to S3, lifecycle to Meetsbothrequirements atCloudWatchLogsstorage Glacier, query with Athena pricesfor seven years.That is the bill they complained Recent logs stay interactive; archives move to storage about. priced for the access pattern and stay queryable. Seven years of OpenSearch indices Thirty days only Keepssevenyears of data on a clustersized forsearch,for Solves the cost problem by breaking the regulatory two queries a year. The most expensive option here. requirement. Never theanswer. THE SIGNAL Two access patterns, thirty days and seven years, need two storage tiers. This is module eight's lifecycle argument applied to logs. MONITORING AND TROUBLESHOOTING admin@sthithapragna.com 22/46 --- page 699 --- D4SEC WORKEDSCENARI03 0F 4 A financial services company runs Glue jobs in private subnets. A compliance requirement states that no data may traverse the public internet, and that jobs must be able to reach only two named s3 buckets, not any bucket in Aws. The subnets currently route outbound traffic through a NAT gateway, and the jobs reach Amazon S3 over the public endpoint.
- E. Seven years of OpenSearch indices Thirty days only Keepssevenyears of data on a clustersized forsearch,for Solves the cost problem by breaking the regulatory two queries a year. The most expensive option here. requirement. Never theanswer. THE SIGNAL Two access patterns, thirty days and seven years, need two storage tiers. This is module eight's lifecycle argument applied to logs. MONITORING AND TROUBLESHOOTING admin@sthithapragna.com 22/46 --- page 699 --- D4SEC WORKEDSCENARI03 0F 4 A financial services company runs Glue jobs in private subnets. A compliance requirement states that no data may traverse the public internet, and that jobs must be able to reach only two named s3 buckets, not any bucket in Aws. The subnets currently route outbound traffic through a NAT gateway, and the jobs reach Amazon S3 over the public endpoint.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q352. [pdf_slide_deck]

What should the data engineer implement?

- A. com 43/50 --- page 1063 --- ALLDOMAINS TWENTYSEVENMODULES You have covered every task statement in the exam guide, and about a hundred
- D. More engineers Access to everything, audited afterwards Scales the bottleneck.The approvers still lack the context to Abandons access control and substitutes detection.It is decide, which was the stated problem. the opposite of what therequirement describes. THE SIGNAL Two requirements: the owner decides, and the decision is recorded. The subscription workflow does both. PRACTICE EXAM 3 admin@sthｉthapragna.com 43/50 --- page 1063 --- ALLDOMAINS TWENTYSEVENMODULES You have covered every task statement in the exam guide, and about a hundred

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q353. [pdf_slide_deck]

What should the data engineer do?

- A. com 41/50 --- page 1056 --- ALL DOMAINS QUESTI0N 20 0F 20·D0MAIN 4 requests are handled by a central platform team, who receive around forty a week and take several days each. The team approving requests often does not know whether the requester should have the data. The organisation wants requests decided by whoever owns the data, with each decision recorded for audit.
- D. which compliance requires. It solves costbybreaking the requirement. A quota increase Enable S3 Bucket Keys Raises the request ceiling. It does nothing about being A bucket-level key derives per-object keys locally, cutting billed for every oneof those requests. KMS requests by up to ninety nine percent with the same key and encryption. THE SIGNAL decryption signatur
- E. The Removes the customer managedkey and its audit trail, KMS request volume is unaffected. which compliance requires. It solves costbybreaking the requirement. A quota increase Enable S3 Bucket Keys Raises the request ceiling. It does nothing about being A bucket-level key derives per-object keys locally, cutting billed for every oneof those requests. KMS requests by up to ninety nine percent with the same key and encryption. THE SIGNAL decryption signature. PRACTICE EXAM 3 admin@sthithapragna.com 41/50 --- page 1056 --- ALL DOMAINS QUESTI0N 20 0F 20·D0MAIN 4 requests are handled by a central platform team, who receive around forty a week and take several days each. The team approving requests often does not know whether the requester should have the data. The organisation wants requests decided by whoever owns the data, with each decision recorded for audit.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q354. [pdf_slide_deck]

What should the data engineer use?

- A. com 17 /50 --- page 1032 --- ALL DOMAINS QUESTION80F 20·D0MAIN2 A company is launching a new product and will store its telemetry in Amazon S3. Nobody can predict how often the data will be read, and access patterns are expected to change as the product matures. Objects average four megabytes. The team wants to minimise storage cost without risking retrieval charges from a wrong guess.
- D. hour. A Glue Python shell job EMR Serverless Genuinely close, and cheaper than Spark. It still carries Glue A Spark runtime for a two megabyte fil
- E. Heavier than the startup time and a oneminuteminimum,twentyfour times option it would replace. a day. THE SIGNAL Two megabytes and three trivial transformations. Nothing here needs a distributed engine at all. PRACTICE EXAM 3 admin@sthithapragna.com 17 /50 --- page 1032 --- ALL DOMAINS QUESTION80F 20·D0MAIN2 A company is launching a new product and will store its telemetry in Amazon S3. Nobody can predict how often the data will be read, and access patterns are expected to change as the product matures. Objects average four megabytes. The team wants to minimise storage cost without risking retrieval charges from a wrong guess.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q355. [pdf_slide_deck]

What should the data engineer configure?

- A. com 19/50 --- page 1048 --- ALL DOMAINS QUESTI0N 16 0F 20·D0MAIN3 An analyst accidentally ran a SELECT star query against a forty terabyte unpartitioned table wants to prevent a recurrence. The underlying data is scheduled to be converted to partitioned Parquet next quarter.
- D. only copy in a single Availability Zon
- E. THE SIGNAL "Nobody can predict" and "expected to change" is the Intelligent-Tiering signal, almost word for word. PRACTICE EXAM 3 admin@sthithapragna.com 19/50 --- page 1048 --- ALL DOMAINS QUESTI0N 16 0F 20·D0MAIN3 An analyst accidentally ran a SELECT star query against a forty terabyte unpartitioned table wants to prevent a recurrence. The underlying data is scheduled to be converted to partitioned Parquet next quarter.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---

## Q356. [pdf_slide_deck]

What should the data engineer configure now?

- A. com 35/50 --- page 1054 --- ALL DOMAINS QUESTI0N 19 0F 20·D0MAIN 4 A data lake of around fifty million Parquet objects is encrypted with SSE-KMS using a customer managed key. Compliance requires a customer managed key with an audit trail so the encryption cannot be changed. Finance has flagged that the Aws KMs bill scales with query volume rather than with the amount of data stored.
- D. Finance has flagged that the Aws KMs bill scales with query volume rather than with the amount of data stored.
- E. The does nothing about anybody else. damage from one query is already done. A per-query data scan limit A longer timeout Cancels any query that would read more than a set Allows expensive queries to run for longer. It is the opposite volume, so a single accidental query cannot run up a large of a guardrail. bill. THE SIGNAL Prevent or detect? A scan limit refuses the query. A budget alert reports the bill afterwards. PRACTICE EXAM 3 admin@sthithapragna.com 35/50 --- page 1054 --- ALL DOMAINS QUESTI0N 19 0F 20·D0MAIN 4 A data lake of around fifty million Parquet objects is encrypted with SSE-KMS using a customer managed key. Compliance requires a customer managed key with an audit trail so the encryption cannot be changed. Finance has flagged that the Aws KMs bill scales with query volume rather than with the amount of data stored.

**Pembahasan:** Soal ini diekstrak tanpa kunci jawaban yang andal (PDF dumps/OCR slide). Pelajari opsi berdasarkan dokumentasi AWS untuk layanan yang disebut di stem; lengkapi kunci setelah verifikasi.

---
