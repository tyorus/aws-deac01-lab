#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import {
  ensureDirs,
  WORK,
  RAW,
  REPORTS,
  readJsonl,
  writeJson,
  stemHash,
} from "./lib.mjs";

ensureDirs();

function classify(item) {
  const stem = item.stem || item.header || item.question_text || "";
  const choices = item.choices || item.answer_options || item.questions || [];
  const flatChoices = Array.isArray(choices)
    ? choices.flatMap((c) =>
        String(c)
          .split(/\n+/)
          .map((s) => s.trim())
          .filter(Boolean)
      )
    : [];
  const answer = item.source_answer || item.examtopics_answer || item.answer || "";
  const hasStem = String(stem).length > 20;
  const hasChoices = flatChoices.length >= 2;
  const hasAnswer = String(answer).trim().length > 0;
  let completeness = "empty";
  if (hasStem && hasChoices && hasAnswer) completeness = "complete";
  else if (hasStem && (hasChoices || hasAnswer)) completeness = "partial";
  else if (hasStem) completeness = "stem_only";
  return {
    hasStem,
    hasChoices,
    hasAnswer,
    completeness,
    stem_hash: stemHash(stem),
    question_number: item.question_number ?? null,
  };
}

function loadCache() {
  const p = path.join(RAW, "cache-items.json");
  if (fs.existsSync(p)) {
    const j = JSON.parse(fs.readFileSync(p, "utf8"));
    return (j.items || []).map((x) => ({ ...x, _src: "cache" }));
  }
  const legacy = path.join(WORK, "dea-c01.json");
  if (!fs.existsSync(legacy)) return [];
  return JSON.parse(fs.readFileSync(legacy, "utf8")).map((d) => ({
    stem: d.header,
    choices: d.questions,
    source_answer: d.answer,
    source_url: d.question_link,
    question_number: null,
    _src: "cache_legacy",
  }));
}

function loadDiscussions() {
  return readJsonl(path.join(RAW, "discussions.jsonl")).map((x) => ({
    ...x,
    _src: "discussion",
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
    _src: "live_partial",
  }));
}

function loadIdMap() {
  const p = path.join(WORK, "discovered-id-map.txt");
  const map = {};
  if (!fs.existsSync(p)) return map;
  for (const line of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
    const m = line.match(/^(\d+)=(\d+)$/);
    if (m) map[m[1]] = Number(m[2]);
  }
  return map;
}

const cache = loadCache();
const discussions = loadDiscussions();
const live = loadLivePartial();
const idMap = loadIdMap();

const buckets = {
  cache: cache.map(classify),
  discussion: discussions.map(classify),
  live_partial: live.map(classify),
};

function summarize(rows) {
  const by = { complete: 0, partial: 0, stem_only: 0, empty: 0 };
  const hashes = new Map();
  let numbered = 0;
  for (const r of rows) {
    by[r.completeness]++;
    if (r.question_number != null) numbered++;
    if (!hashes.has(r.stem_hash)) hashes.set(r.stem_hash, 0);
    hashes.set(r.stem_hash, hashes.get(r.stem_hash) + 1);
  }
  const duplicate_hashes = [...hashes.entries()].filter(([, n]) => n > 1).length;
  return {
    count: rows.length,
    ...by,
    numbered,
    unique_stem_hashes: hashes.size,
    duplicate_hashes,
  };
}

const numberedFromDiscussions = new Set(
  discussions.map((d) => d.question_number).filter((n) => n != null)
);

const audit = {
  generated_at: new Date().toISOString(),
  sources: {
    cache: summarize(buckets.cache),
    discussion: summarize(buckets.discussion),
    live_partial: summarize(buckets.live_partial),
    id_map_size: Object.keys(idMap).length,
  },
  numbered_discussion_set: [...numberedFromDiscussions].sort((a, b) => a - b),
  numbered_count: numberedFromDiscussions.size,
  notes: [
    "Cache items are typically unnumbered (no question-N in URL).",
    "Free preview is Q1-30 when session allows; view/4+ is contributor paywall.",
  ],
};

writeJson(path.join(REPORTS, "pre-audit.json"), audit);
console.log(JSON.stringify(audit, null, 2));
