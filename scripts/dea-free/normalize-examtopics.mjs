#!/usr/bin/env node
/**
 * Normalize + dedupe ExamTopics-accessible items into:
 * - normalized/questions.json
 * - normalized/inventory-366.json
 * - normalized/by-number/NNN.json
 * - reports/duplicates.md, missing-questions.md, extraction-log summary
 */
import fs from "node:fs";
import path from "node:path";
import {
  ensureDirs,
  WORK,
  RAW,
  NORMALIZED,
  REPORTS,
  readJsonl,
  writeJson,
  stemHash,
} from "./lib.mjs";

ensureDirs();
const byNumDir = path.join(NORMALIZED, "by-number");
fs.mkdirSync(byNumDir, { recursive: true });

function normalizeChoices(choices) {
  if (!Array.isArray(choices)) return [];
  return choices.flatMap((c) =>
    String(c)
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean)
  );
}

function toCanonical(partial) {
  const question_text =
    partial.question_text || partial.stem || partial.header || "";
  const answer_options = normalizeChoices(
    partial.answer_options || partial.choices || partial.questions || []
  );
  const examtopics_answer = String(
    partial.examtopics_answer ||
      partial.source_answer ||
      partial.answer ||
      ""
  ).trim();
  const examtopics_explanation = String(
    partial.examtopics_explanation || ""
  );

  const hasStem = question_text.length > 20;
  const hasChoices = answer_options.length >= 2;
  const hasAnswer = examtopics_answer.length > 0;

  let extraction_status = partial.extraction_status || null;
  if (!extraction_status) {
    if (hasStem && hasChoices && hasAnswer) extraction_status = "complete";
    else if (hasStem && (hasChoices || hasAnswer)) extraction_status = "partial";
    else if (hasStem && partial.question_number == null)
      extraction_status = "cached_unnumbered";
    else if (hasStem) extraction_status = "partial";
    else extraction_status = "inaccessible";
  }

  return {
    question_number:
      partial.question_number != null ? Number(partial.question_number) : null,
    source_url: partial.source_url || partial.question_link || "",
    question_text,
    answer_options,
    examtopics_answer,
    examtopics_explanation,
    extraction_status,
    verification_status: "source_as_extracted",
    access_limitation: partial.access_limitation || "none",
    provenance: partial.provenance || "unknown",
    stem_hash: stemHash(question_text),
  };
}

function loadCache() {
  const p = path.join(RAW, "cache-items.json");
  if (fs.existsSync(p)) {
    return (JSON.parse(fs.readFileSync(p, "utf8")).items || []).map((x) => ({
      ...x,
      provenance: x.provenance || "examtopics-data-github-cache",
    }));
  }
  const legacy = path.join(WORK, "dea-c01.json");
  if (!fs.existsSync(legacy)) return [];
  return JSON.parse(fs.readFileSync(legacy, "utf8")).map((d) => ({
    stem: d.header,
    choices: d.questions,
    source_answer: d.answer,
    source_url: d.question_link,
    question_number: null,
    provenance: "examtopics-data-github-cache",
  }));
}

function loadDiscussions() {
  // Prefer last record per question_number
  const rows = readJsonl(path.join(RAW, "discussions.jsonl"));
  const byQ = new Map();
  for (const r of rows) {
    if (r.question_number == null) continue;
    byQ.set(r.question_number, r);
  }
  return [...byQ.values()].map((x) => ({
    ...x,
    provenance: x.provenance || "examtopics-discussion-public",
  }));
}

function loadLivePartial() {
  const p = path.join(WORK, "dea-c01-live-partial.json");
  if (!fs.existsSync(p)) return [];
  return JSON.parse(fs.readFileSync(p, "utf8")).map((d) => ({
    stem: d.header,
    choices: d.questions,
    source_answer: d.answer,
    source_url: d.question_link,
    question_number: d.question_number ?? null,
    provenance: "examtopics-discussion-live-partial",
  }));
}

function loadPreview() {
  return readJsonl(path.join(RAW, "preview-items.jsonl")).map((x) => ({
    ...x,
    provenance: x.provenance || "examtopics-free-preview",
  }));
}

function loadIdMap() {
  const p = path.join(WORK, "discovered-id-map.txt");
  const map = new Map();
  if (!fs.existsSync(p)) return map;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^(\d+)=(\d+)$/);
    if (m) map.set(Number(m[1]), Number(m[2]));
  }
  return map;
}

function loadFailures() {
  return readJsonl(path.join(RAW, "discussions-failures.jsonl"));
}

function score(c) {
  let s = 0;
  if (c.question_text.length > 20) s += 2;
  if (c.answer_options.length >= 2) s += 2;
  if (c.examtopics_answer) s += 3;
  if (c.question_number != null) s += 1;
  if (c.provenance.includes("discussion")) s += 1;
  return s;
}

function discussionUrl(q, id) {
  return `https://www.examtopics.com/discussions/amazon/view/${id}-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-${q}-discussion/`;
}

const idMap = loadIdMap();
const failures = loadFailures();
const failByQ = new Map();
for (const f of failures) {
  if (f.q != null) failByQ.set(f.q, f);
}

const pools = [
  ...loadCache().map(toCanonical),
  ...loadDiscussions().map(toCanonical),
  ...loadLivePartial().map(toCanonical),
  ...loadPreview().map(toCanonical),
];

// Recover numbers from URLs when possible
for (const item of pools) {
  if (item.question_number == null && item.source_url) {
    const um = String(item.source_url).match(/question-(\d+)/i);
    if (um) {
      item.question_number = Number(um[1]);
      if (item.extraction_status === "cached_unnumbered") {
        item.extraction_status =
          item.answer_options.length >= 2 && item.examtopics_answer
            ? "complete"
            : "partial";
      }
    }
  }
}

const byHash = new Map();
const conflictHashes = [];
for (const item of pools) {
  if (!item.question_text || item.question_text.length < 20) continue;
  const prev = byHash.get(item.stem_hash);
  if (!prev) {
    byHash.set(item.stem_hash, item);
  } else {
    if (
      prev.examtopics_answer &&
      item.examtopics_answer &&
      prev.examtopics_answer !== item.examtopics_answer
    ) {
      conflictHashes.push({
        stem_hash: item.stem_hash,
        a: prev,
        b: item,
      });
    }
    if (score(item) > score(prev)) byHash.set(item.stem_hash, item);
  }
}

const questions = [...byHash.values()].sort((a, b) => {
  const an = a.question_number ?? 9999;
  const bn = b.question_number ?? 9999;
  if (an !== bn) return an - bn;
  return a.stem_hash.localeCompare(b.stem_hash);
});

writeJson(path.join(NORMALIZED, "questions.json"), questions);

// Inventory 1–366
const byNumBest = new Map();
for (const q of questions) {
  if (q.question_number == null) continue;
  const prev = byNumBest.get(q.question_number);
  if (!prev || score(q) > score(prev)) byNumBest.set(q.question_number, q);
}

const inventory = [];
for (let n = 1; n <= 366; n++) {
  const known = byNumBest.get(n);
  if (known) {
    inventory.push({ ...known, question_number: n });
    continue;
  }
  const fail = failByQ.get(n);
  let access_limitation = "url_unknown";
  if (idMap.has(n)) {
    access_limitation = fail?.access_limitation || "fetch_failed_or_empty";
  } else if (n > 30) {
    access_limitation = "contributor_paywall_or_url_unknown";
  } else {
    access_limitation = "free_preview_range_but_url_unknown";
  }
  inventory.push({
    question_number: n,
    source_url: idMap.has(n)
      ? discussionUrl(n, idMap.get(n))
      : "",
    question_text: "",
    answer_options: [],
    examtopics_answer: "",
    examtopics_explanation: "",
    extraction_status: "inaccessible",
    verification_status: "source_as_extracted",
    access_limitation,
    provenance: "none",
    stem_hash: "",
  });
}

writeJson(path.join(NORMALIZED, "inventory-366.json"), inventory);

for (const slot of inventory) {
  const n = String(slot.question_number).padStart(3, "0");
  writeJson(path.join(byNumDir, `${n}.json`), slot);
}

const unnumbered = questions.filter((q) => q.question_number == null);
writeJson(path.join(REPORTS, "unnumbered-cache.json"), {
  count: unnumbered.length,
  items: unnumbered,
});

// Duplicates report
const hashGroups = new Map();
for (const item of pools) {
  if (!item.stem_hash) continue;
  if (!hashGroups.has(item.stem_hash)) hashGroups.set(item.stem_hash, []);
  hashGroups.get(item.stem_hash).push(item);
}
const dupGroups = [...hashGroups.entries()].filter(([, g]) => g.length > 1);

let dupMd = `# Duplicates\n\n`;
dupMd += `Pools scanned: ${pools.length}\n`;
dupMd += `Unique stem hashes: ${hashGroups.size}\n`;
dupMd += `Hashes with >1 source: ${dupGroups.length}\n`;
dupMd += `Answer conflicts: ${conflictHashes.length}\n\n`;

if (conflictHashes.length) {
  dupMd += `## Answer conflicts\n\n`;
  for (const c of conflictHashes) {
    dupMd += `- \`${c.stem_hash}\`: \`${c.a.examtopics_answer}\` (${c.a.provenance}) vs \`${c.b.examtopics_answer}\` (${c.b.provenance}) — Q# ${c.a.question_number ?? "?"} / ${c.b.question_number ?? "?"}\n`;
  }
  dupMd += `\n`;
}

dupMd += `## Multi-source stem hashes\n\n`;
for (const [h, g] of dupGroups.slice(0, 80)) {
  dupMd += `### ${h}\n`;
  for (const x of g) {
    dupMd += `- Q#${x.question_number ?? "null"} | ${x.provenance} | ans=${x.examtopics_answer || "-"} | ${x.source_url || "(no url)"}\n`;
  }
  dupMd += `\n`;
}
fs.writeFileSync(path.join(REPORTS, "duplicates.md"), dupMd, "utf8");

// Missing report
const missing = inventory.filter((x) => x.extraction_status === "inaccessible");
const byLim = {};
for (const m of missing) {
  byLim[m.access_limitation] = (byLim[m.access_limitation] || 0) + 1;
}
let missMd = `# Missing questions (inaccessible slots)\n\n`;
missMd += `Total inaccessible among 366: **${missing.length}**\n\n`;
missMd += `## Limitation breakdown\n\n`;
for (const [k, v] of Object.entries(byLim).sort((a, b) => b[1] - a[1])) {
  missMd += `- \`${k}\`: ${v}\n`;
}
missMd += `\n## Numbers\n\n`;
missMd += missing.map((m) => m.question_number).join(", ") + "\n\n";
missMd += `## Detail\n\n`;
for (const m of missing) {
  missMd += `- Q${m.question_number}: ${m.access_limitation}${m.source_url ? ` — ${m.source_url}` : ""}\n`;
}
fs.writeFileSync(path.join(REPORTS, "missing-questions.md"), missMd, "utf8");

const summary = {
  generated_at: new Date().toISOString(),
  questions_unique: questions.length,
  numbered_in_questions: questions.filter((q) => q.question_number != null)
    .length,
  unnumbered_in_questions: unnumbered.length,
  inventory_slots: inventory.length,
  complete: inventory.filter((x) => x.extraction_status === "complete").length,
  partial: inventory.filter((x) => x.extraction_status === "partial").length,
  inaccessible: missing.length,
  limitation_breakdown: byLim,
  duplicate_hash_groups: dupGroups.length,
  answer_conflicts: conflictHashes.length,
  id_map_size: idMap.size,
};
writeJson(path.join(REPORTS, "normalize-summary.json"), summary);
console.log(JSON.stringify(summary, null, 2));
