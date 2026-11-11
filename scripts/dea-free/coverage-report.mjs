#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { ensureDirs, WORK, ROOT, writeJson, guessDomain } from "./lib.mjs";

ensureDirs();

const mergedPath = path.join(WORK, "merged.json");
const merged = fs.existsSync(mergedPath)
  ? JSON.parse(fs.readFileSync(mergedPath, "utf8"))
  : [];

const qDir = path.join(ROOT, "aws-dea-c01", "content", "questions");
const originals = fs
  .readdirSync(qDir)
  .filter((f) => /^DEA-\d{3}\.json$/.test(f))
  .map((f) => JSON.parse(fs.readFileSync(path.join(qDir, f), "utf8")));

const examConfig = JSON.parse(
  fs.readFileSync(
    path.join(ROOT, "aws-dea-c01", "content", "schemas", "exam-config.json"),
    "utf8"
  )
);

const freeDomains = { D1: 0, D2: 0, D3: 0, D4: 0, unmapped: 0 };
for (const q of merged) {
  const d = guessDomain(`${q.stem} ${(q.choices || []).join(" ")}`);
  freeDomains[d] = (freeDomains[d] || 0) + 1;
}

const origDomains = { D1: 0, D2: 0, D3: 0, D4: 0 };
for (const q of originals) {
  origDomains[q.domain] = (origDomains[q.domain] || 0) + 1;
}

const weights = Object.fromEntries(
  examConfig.official.domain_weights.map((d) => [d.code, d.weight_pct])
);

// Gap objectives: domains under-represented in original bank vs weight * target 65
const targetTotal = 65;
const gaps = [];
for (const [code, pct] of Object.entries(weights)) {
  const ideal = Math.round((pct / 100) * targetTotal);
  const have = origDomains[code] || 0;
  const shortfall = Math.max(0, ideal - have);
  if (shortfall > 0 || have < ideal + 5) {
    gaps.push({
      domain: code,
      weight_pct: pct,
      original_count: have,
      ideal_for_full_mock: ideal,
      shortfall_vs_ideal: shortfall,
      suggested_focus:
        code === "D1"
          ? ["Glue ETL/crawlers", "Kinesis/Firehose ingestion", "DMS", "Spark/EMR transforms", "Step Functions orchestration"]
          : code === "D2"
            ? ["S3 storage classes/lifecycle", "Redshift design", "DynamoDB access patterns", "Lake Formation catalog", "partitioning"]
            : code === "D3"
              ? ["monitoring/alarms", "cost-aware job sizing", "workflow reliability", "Glue bookmarks/FLEX", "performance tuning"]
              : ["IAM least privilege", "KMS encryption", "Lake Formation RLS", "CloudTrail audit", "PII/Macie"],
    });
  }
}

const report = {
  generated_at: new Date().toISOString(),
  free_bank: {
    total: merged.length,
    with_answer: merged.filter((q) => q.source_answer).length,
    with_choices: merged.filter((q) => (q.choices || []).length >= 2).length,
    domain_histogram: freeDomains,
  },
  original_bank: {
    total: originals.length,
    domain_histogram: origDomains,
    published: originals.filter((q) => q.status === "published").length,
  },
  exam_guide: {
    official_questions: examConfig.official.total_questions,
    domain_weights: examConfig.official.domain_weights,
  },
  gap_objectives: gaps,
};

writeJson(path.join(WORK, "coverage-report.json"), report);

let md = `# DEA-C01 Coverage Report\n\n`;
md += `Generated: ${report.generated_at}\n\n`;
md += `## Free bank\n\n- Total: ${report.free_bank.total}\n- With answers: ${report.free_bank.with_answer}\n- Domain guess: ${JSON.stringify(freeDomains)}\n\n`;
md += `## Original bank\n\n- Total: ${report.original_bank.total}\n- Domains: ${JSON.stringify(origDomains)}\n\n`;
md += `## Gap objectives (for original authoring)\n\n`;
for (const g of gaps) {
  md += `### ${g.domain} (weight ${g.weight_pct}%)\n`;
  md += `- Original count: ${g.original_count}; ideal for 65-item mock: ${g.ideal_for_full_mock}\n`;
  md += `- Focus: ${g.suggested_focus.join("; ")}\n\n`;
}
fs.writeFileSync(path.join(WORK, "coverage-report.md"), md, "utf8");
console.log(JSON.stringify(report, null, 2));
