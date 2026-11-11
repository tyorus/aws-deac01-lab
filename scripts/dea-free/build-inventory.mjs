#!/usr/bin/env node
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

function normalizeChoices(choices) {
  if (!Array.isArray(choices)) return [];
  return choices.flatMap((c) =>
    String(c)
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean)
  );
}

function toCanonical(partial) {
  const question_text = partial.question_text || partial.stem || partial.header || "";
  const answer_options = normalizeChoices(
    partial.answer_options || partial.choices || partial.questions || []
  );
  const examtopics_answer =
    partial.examtopics_answer || partial.source_answer || partial.answer || "";
  const examtopics_explanation = partial.examtopics_explanation || "";
  const hasStem = question_text.length > 20;
  const hasChoices = answer_options.length >= 2;
  const hasAnswer = String(examtopics_answer).trim().length > 0;

  let extraction_status = "inaccessible";
  if (partial.extraction_status) extraction_status = partial.extraction_status;
  else if (hasStem && hasChoices && hasAnswer) extraction_status = "complete";
  else if (hasStem && (hasChoices || hasAnswer)) extraction_status = "partial";
  else if (hasStem && partial.provenance?.includes("cache"))
    extraction_status = "cached_unnumbered";
  else if (hasStem) extraction_status = "partial";

  return {
    question_number: partial.question_number ?? null,
    source_url: partial.source_url || partial.question_link || "",
    question_text,
    answer_options,
    examtopics_answer: String(examtopics_answer).trim(),
    examtopics_explanation,
    extraction_status,
    verification_status: "source_as_extracted",
    access_limitation: partial.access_limitation || "none",
    provenance: partial.provenance || "unknown",
    stem_hash: stemHash(question_text),
  };
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

function discussionUrl(q, id) {
  return `https://www.examtopics.com/discussions/amazon/view/${id}-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-${q}-discussion/`;
}

const idMap = loadIdMap();
const discussions = readJsonl(path.join(RAW, "discussions.jsonl"));
const discByNum = new Map();
for (const d of discussions) {
  if (d.question_number != null) discByNum.set(d.question_number, d);
}

const livePath = path.join(WORK, "dea-c01-live-partial.json");
const live = fs.existsSync(livePath)
  ? JSON.parse(fs.readFileSync(livePath, "utf8"))
  : [];
const liveByNum = new Map();
for (const d of live) {
  if (d.question_number != null) liveByNum.set(d.question_number, d);
}

const inventory = [];
for (let n = 1; n <= 366; n++) {
  const stub = {
    question_number: n,
    source_url: idMap.has(n) ? discussionUrl(n, idMap.get(n)) : "",
    question_text: "",
    answer_options: [],
    examtopics_answer: "",
    examtopics_explanation: "",
    extraction_status: "inaccessible",
    verification_status: "source_as_extracted",
    access_limitation: idMap.has(n) ? "none" : "url_unknown",
    provenance: "none",
    stem_hash: "",
  };

  const d = discByNum.get(n);
  const l = liveByNum.get(n);
  const best = d || l;
  if (best) {
    const canon = toCanonical({
      ...best,
      question_number: n,
      provenance: d
        ? "examtopics-discussion-public"
        : "examtopics-discussion-live-partial",
      access_limitation: "none",
      source_url:
        best.source_url ||
        best.question_link ||
        (idMap.has(n) ? discussionUrl(n, idMap.get(n)) : ""),
    });
    inventory.push(canon);
  } else if (n >= 1 && n <= 30) {
    // Free preview range — may be accessible with session; mark specifically
    stub.access_limitation = idMap.has(n)
      ? "none"
      : "free_preview_or_url_unknown";
    inventory.push(stub);
  } else if (idMap.has(n)) {
    stub.access_limitation = "fetch_pending_or_partial";
    inventory.push(stub);
  } else {
    // Likely behind contributor for exam-view; discussion URL unknown
    stub.access_limitation =
      n > 30 ? "contributor_paywall_or_url_unknown" : "url_unknown";
    inventory.push(stub);
  }
}

// Unnumbered cache items
let cacheItems = [];
const cachePath = path.join(RAW, "cache-items.json");
if (fs.existsSync(cachePath)) {
  cacheItems = JSON.parse(fs.readFileSync(cachePath, "utf8")).items || [];
} else {
  const legacy = path.join(WORK, "dea-c01.json");
  if (fs.existsSync(legacy)) {
    cacheItems = JSON.parse(fs.readFileSync(legacy, "utf8")).map((d) => ({
      stem: d.header,
      choices: d.questions,
      source_answer: d.answer,
      source_url: d.question_link,
      provenance: "examtopics-data-github-cache",
    }));
  }
}

const numberedHashes = new Set(
  inventory.filter((x) => x.stem_hash).map((x) => x.stem_hash)
);

const unnumbered = [];
for (const c of cacheItems) {
  const canon = toCanonical({
    ...c,
    question_number: null,
    provenance: c.provenance || "examtopics-data-github-cache",
    access_limitation: "none",
    extraction_status: "cached_unnumbered",
  });
  // try recover number from URL
  const um = String(canon.source_url).match(/question-(\d+)/i);
  if (um) {
    const num = Number(um[1]);
    canon.question_number = num;
    canon.extraction_status =
      canon.answer_options.length >= 2 && canon.examtopics_answer
        ? "complete"
        : "partial";
    // merge into inventory slot if empty/incomplete
    const slot = inventory[num - 1];
    if (
      slot &&
      (slot.extraction_status === "inaccessible" ||
        slot.extraction_status === "partial")
    ) {
      inventory[num - 1] = { ...canon, question_number: num };
    }
  } else {
    if (!numberedHashes.has(canon.stem_hash)) unnumbered.push(canon);
  }
}

writeJson(path.join(NORMALIZED, "inventory-366.json"), inventory);
writeJson(path.join(REPORTS, "unnumbered-cache.json"), {
  count: unnumbered.length,
  items: unnumbered,
});

const filled = inventory.filter((x) =>
  ["complete", "partial", "cached_unnumbered"].includes(x.extraction_status)
);
console.log(
  JSON.stringify(
    {
      inventory_slots: inventory.length,
      filled_slots: filled.length,
      complete: inventory.filter((x) => x.extraction_status === "complete")
        .length,
      partial: inventory.filter((x) => x.extraction_status === "partial")
        .length,
      inaccessible: inventory.filter(
        (x) => x.extraction_status === "inaccessible"
      ).length,
      unnumbered_cache: unnumbered.length,
    },
    null,
    2
  )
);
