import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, "../..");
export const WORK = path.join(ROOT, "aws-dea-c01", "_work", "examtopics");
export const RAW = path.join(WORK, "raw");
export const NORMALIZED = path.join(WORK, "normalized");
export const REPORTS = path.join(WORK, "reports");

export function ensureDirs() {
  fs.mkdirSync(RAW, { recursive: true });
  fs.mkdirSync(WORK, { recursive: true });
  fs.mkdirSync(NORMALIZED, { recursive: true });
  fs.mkdirSync(REPORTS, { recursive: true });
}

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function stemHash(stem) {
  const norm = String(stem || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
  return crypto.createHash("sha1").update(norm).digest("hex").slice(0, 16);
}

export function backupIfExists(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const bak = `${filePath}.${ts}.bak`;
  fs.copyFileSync(filePath, bak);
  return bak;
}

export function writeJson(filePath, data) {
  backupIfExists(filePath);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

export function appendJsonl(filePath, obj) {
  fs.appendFileSync(filePath, JSON.stringify(obj) + "\n", "utf8");
}

export function readJsonl(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export async function fetchText(url, { timeoutMs = 25000, retries = 4 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), timeoutMs);
      const res = await fetch(url, {
        signal: ctrl.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; dea-free-harvester/1.0; +local-study)",
          Accept: "text/html,application/json,*/*",
        },
      });
      clearTimeout(t);
      if (res.status === 429 || res.status === 503) {
        await sleep(1000 * Math.pow(2, attempt));
        continue;
      }
      const text = await res.text();
      return { ok: res.ok, status: res.status, text };
    } catch (e) {
      lastErr = e;
      await sleep(500 * Math.pow(2, attempt));
    }
  }
  return { ok: false, status: 0, text: "", error: String(lastErr) };
}

export function stripHtml(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function parseDiscussionHtml(html, url, qnumHint = null) {
  const plain = stripHtml(html);
  let question_number = qnumHint;
  const qm = plain.match(/question\s+(\d+)\s+discussion/i) || plain.match(/Question\s*#(\d+)/i);
  if (qm) question_number = parseInt(qm[1], 10);

  let stem = "";
  const stemMatch =
    plain.match(
      /Actual exam question from[\s\S]*?DEA-C01\s+(.+?)\s+A\.\s+/i
    ) || plain.match(/DEA-C01\s+(.+?)\s+A\.\s+/i);
  if (stemMatch) stem = stemMatch[1].trim();

  const choices = [];
  for (const letter of ["A", "B", "C", "D", "E", "F"]) {
    const next =
      letter === "F"
        ? "(?:Suggested|Show|Selected|Correct|Community|Most|Discussion|by\\s)"
        : String.fromCharCode(letter.charCodeAt(0) + 1) + "\\.";
    const re = new RegExp(`${letter}\\.\\s+(.+?)\\s+(?:${next})`, "i");
    const m = plain.match(re);
    if (m) choices.push(`${letter}. ${m[1].trim()}`);
  }

  let source_answer = "";
  for (const pat of [
    /Selected Answer:\s*([A-F](?:\s*,\s*[A-F])*)/i,
    /Correct Answer:\s*([A-F](?:\s*,\s*[A-F])*)/i,
    /Suggested Answer:\s*([A-F](?:\s*,\s*[A-F])*)/i,
    /supports Answer\s*([A-F]+)/i,
  ]) {
    const m = plain.match(pat);
    if (m) {
      source_answer = m[1].replace(/\s+/g, "").replace(/,/g, "");
      // collapse duplicated letters like AA -> A when single-choice noise
      if (/^([A-F])\1+$/.test(source_answer)) source_answer = source_answer[0];
      break;
    }
  }

  return {
    question_number,
    stem,
    choices,
    source_answer,
    source_url: url,
    provenance: "examtopics-discussion-public",
    extracted_at: new Date().toISOString(),
  };
}

export const DOMAIN_KEYWORDS = {
  D1: [
    "glue",
    "kinesis",
    "firehose",
    "dms",
    "lambda",
    "etl",
    "ingest",
    "stream",
    "emr",
    "spark",
    "transform",
    "athena federated",
    "step functions",
    "mwaa",
    "airflow",
  ],
  D2: [
    "s3",
    "redshift",
    "dynamodb",
    "rds",
    "aurora",
    "storage class",
    "lifecycle",
    "partition",
    "spectrum",
    "lake formation",
    "data catalog",
    "opensearch",
  ],
  D3: [
    "monitor",
    "cloudwatch",
    "alarm",
    "orchestration",
    "workflow",
    "ops",
    "performance",
    "cost",
    "crawler",
    "job bookmark",
    "flex execution",
  ],
  D4: [
    "iam",
    "kms",
    "encryption",
    "lake formation",
    "row-level",
    "pii",
    "governance",
    "cloudtrail",
    "macie",
    "security",
    "audit",
    "permission",
  ],
};

export function guessDomain(text) {
  const t = String(text || "").toLowerCase();
  const scores = { D1: 0, D2: 0, D3: 0, D4: 0 };
  for (const [dom, kws] of Object.entries(DOMAIN_KEYWORDS)) {
    for (const kw of kws) {
      if (t.includes(kw)) scores[dom] += 1;
    }
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (!best || best[1] === 0) return "unmapped";
  return best[0];
}
