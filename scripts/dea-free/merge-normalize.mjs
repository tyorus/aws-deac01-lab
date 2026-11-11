#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  ensureDirs,
  RAW,
  WORK,
  readJsonl,
  writeJson,
  stemHash,
} from "./lib.mjs";

ensureDirs();

function loadCache() {
  const p = path.join(RAW, "cache-items.json");
  if (!fs.existsSync(p)) {
    // fallback to existing dea-c01.json dump
    const legacy = path.join(WORK, "dea-c01.json");
    if (!fs.existsSync(legacy)) return [];
    const arr = JSON.parse(fs.readFileSync(legacy, "utf8"));
    return arr.map((d) => ({
      question_number: null,
      stem: d.header || "",
      choices: Array.isArray(d.questions)
        ? d.questions.flatMap((q) =>
            String(q)
              .split(/\n+/)
              .map((s) => s.trim())
              .filter(Boolean)
          )
        : [],
      source_answer: d.answer || "",
      source_url: d.question_link || "",
      provenance: "examtopics-data-github-cache",
      stem_hash: stemHash(d.header || ""),
    }));
  }
  return JSON.parse(fs.readFileSync(p, "utf8")).items || [];
}

function loadDiscussions() {
  return readJsonl(path.join(RAW, "discussions.jsonl"));
}

function loadLivePartial() {
  const p = path.join(WORK, "dea-c01-live-partial.json");
  if (!fs.existsSync(p)) return [];
  const arr = JSON.parse(fs.readFileSync(p, "utf8"));
  return arr.map((d) => ({
    question_number: d.question_number ?? null,
    stem: d.header || "",
    choices: Array.isArray(d.questions)
      ? d.questions.flatMap((q) =>
          String(q)
            .split(/\n+/)
            .map((s) => s.trim())
            .filter(Boolean)
        )
      : [],
    source_answer: d.answer || "",
    source_url: d.question_link || "",
    provenance: "examtopics-discussion-live-partial",
    stem_hash: stemHash(d.header || ""),
  }));
}

const pools = [...loadCache(), ...loadDiscussions(), ...loadLivePartial()];
const byHash = new Map();
const byNum = new Map();
let duplicates = 0;

for (const item of pools) {
  if (!item.stem || item.stem.length < 20) continue;
  const hash = item.stem_hash || stemHash(item.stem);
  item.stem_hash = hash;
  const complete =
    item.choices?.length >= 2 && String(item.source_answer || "").length > 0;

  if (item.question_number != null) {
    const prev = byNum.get(item.question_number);
    if (!prev) byNum.set(item.question_number, item);
    else {
      duplicates++;
      const prevComplete =
        prev.choices?.length >= 2 && String(prev.source_answer || "").length > 0;
      if (complete && !prevComplete) byNum.set(item.question_number, item);
    }
  }

  const prevH = byHash.get(hash);
  if (!prevH) byHash.set(hash, item);
  else {
    duplicates++;
    const prevComplete =
      prevH.choices?.length >= 2 && String(prevH.source_answer || "").length > 0;
    if (complete && !prevComplete) byHash.set(hash, item);
    // prefer numbered
    else if (
      item.question_number != null &&
      prevH.question_number == null &&
      complete === prevComplete
    ) {
      byHash.set(hash, item);
    }
  }
}

// Prefer numbered entries when both exist with same hash already handled;
// build final list from byHash, overlay byNum for richer numbered items
const mergedMap = new Map(byHash);
for (const [num, item] of byNum) {
  const h = item.stem_hash;
  const existing = mergedMap.get(h);
  if (!existing || existing.question_number == null) mergedMap.set(h, item);
  else if (existing.question_number === num) mergedMap.set(h, item);
}

const merged = [...mergedMap.values()].sort((a, b) => {
  const an = a.question_number ?? 1e9;
  const bn = b.question_number ?? 1e9;
  if (an !== bn) return an - bn;
  return String(a.stem).localeCompare(String(b.stem));
});

const stats = {
  generated_at: new Date().toISOString(),
  input_pool: pools.length,
  unique_merged: merged.length,
  duplicates_seen: duplicates,
  with_stem: merged.filter((x) => x.stem?.length > 20).length,
  with_choices: merged.filter((x) => (x.choices || []).length >= 2).length,
  with_answer: merged.filter((x) => String(x.source_answer || "").trim()).length,
  with_question_number: merged.filter((x) => x.question_number != null).length,
  by_provenance: merged.reduce((acc, x) => {
    acc[x.provenance] = (acc[x.provenance] || 0) + 1;
    return acc;
  }, {}),
};

writeJson(path.join(WORK, "merged.json"), merged);
writeJson(path.join(WORK, "stats.json"), stats);

let md = `# DEA-C01 Free Merged Bank\n\nCount: ${merged.length}\n\n`;
let i = 0;
for (const q of merged) {
  i++;
  md += "----------------------------------------\n\n";
  md += `## ${q.question_number != null ? `Question #${q.question_number}` : `Item ${i}`}\n\n`;
  md += `${q.stem}\n\n`;
  for (const c of q.choices || []) md += `${c}\n\n`;
  md += `**Source answer: ${q.source_answer || ""}**\n\n`;
  md += `Provenance: ${q.provenance}\n\n`;
  if (q.source_url) md += `[Source](${q.source_url})\n\n`;
}
fs.writeFileSync(path.join(WORK, "merged.md"), md, "utf8");

console.log(JSON.stringify(stats, null, 2));
