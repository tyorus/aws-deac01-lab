#!/usr/bin/env node
/**
 * Expand discussion ID map and harvest public discussion pages (rate-limited).
 */
import fs from "node:fs";
import path from "node:path";
import {
  ensureDirs,
  RAW,
  WORK,
  fetchText,
  sleep,
  writeJson,
  appendJsonl,
  readJsonl,
  parseDiscussionHtml,
  stemHash,
} from "./lib.mjs";

ensureDirs();
const mapPath = path.join(WORK, "discovered-id-map.txt");
const checkpointPath = path.join(RAW, "discussions.jsonl");
const failPath = path.join(RAW, "discussions-failures.jsonl");

const map = new Map();
if (fs.existsSync(mapPath)) {
  for (const line of fs.readFileSync(mapPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^(\d+)=(\d+)$/);
    if (m) map.set(parseInt(m[1], 10), parseInt(m[2], 10));
  }
}

const seeds = [...map.entries()].map(([q, id]) => ({ q, id }));
// expand neighbors around existing seeds
async function probe(q, id) {
  const url = `https://www.examtopics.com/discussions/amazon/view/${id}-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-${q}-discussion/`;
  const { ok, status, text } = await fetchText(url, { timeoutMs: 15000, retries: 2 });
  if (!ok || status !== 200 || text.length < 12000) return false;
  if (!/DEA-C01|Data Engineer/i.test(text)) return false;
  return true;
}

const expandStats = { probed: 0, added: 0 };
for (const s of seeds.slice()) {
  for (let dq = -3; dq <= 5; dq++) {
    const q = s.q + dq;
    const id = s.id + dq;
    if (q < 1 || q > 366) continue;
    if (map.has(q)) continue;
    expandStats.probed++;
    await sleep(150);
    if (await probe(q, id)) {
      map.set(q, id);
      expandStats.added++;
      console.log(`map-hit q=${q} id=${id}`);
    }
  }
}

// persist map
const mapLines = [...map.entries()]
  .sort((a, b) => a[0] - b[0])
  .map(([q, id]) => `${q}=${id}`);
fs.writeFileSync(mapPath, mapLines.join("\n") + "\n", "utf8");

const doneUrls = new Set(
  readJsonl(checkpointPath)
    .filter((x) => x.source_url)
    .map((x) => x.source_url)
);

let fetched = 0;
let skipped = 0;
let failed = 0;
let withAnswer = 0;

for (const [q, id] of [...map.entries()].sort((a, b) => a[0] - b[0])) {
  const url = `https://www.examtopics.com/discussions/amazon/view/${id}-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-${q}-discussion/`;
  if (doneUrls.has(url)) {
    skipped++;
    continue;
  }
  await sleep(550);
  const { ok, status, text, error } = await fetchText(url);
  if (!ok || status !== 200) {
    failed++;
    appendJsonl(failPath, { q, id, url, status, error: error || null });
    continue;
  }
  const parsed = parseDiscussionHtml(text, url, q);
  parsed.stem_hash = stemHash(parsed.stem);
  if (parsed.source_answer) withAnswer++;
  appendJsonl(checkpointPath, parsed);
  doneUrls.add(url);
  fetched++;
  console.log(
    `ok q=${q} stem=${(parsed.stem || "").length} ans=${parsed.source_answer || "-"} choices=${parsed.choices.length}`
  );
}

const stats = {
  map_size: map.size,
  expand: expandStats,
  fetched,
  skipped,
  failed,
  with_answer_this_run: withAnswer,
  checkpoint: checkpointPath,
};
writeJson(path.join(WORK, "harvest-discussions-stats.json"), stats);
console.log(JSON.stringify(stats, null, 2));
