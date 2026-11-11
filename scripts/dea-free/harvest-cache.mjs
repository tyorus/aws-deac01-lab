#!/usr/bin/env node
/**
 * Re-pull public GitHub examtopics-data cache for DEA-C01.
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
  stemHash,
} from "./lib.mjs";

const BASE =
  "https://raw.githubusercontent.com/thatonecodes/examtopics-data/main/Amazon/AWS-Certified-Data-Engineer---Associate-DEA-C01_";

ensureDirs();
const outItems = [];
const meta = { pages_ok: 0, pages_miss: 0, questions: 0, errors: [] };

for (let i = 1; i <= 50; i++) {
  const url = `${BASE}${i}.json`;
  const { ok, status, text } = await fetchText(url);
  if (!ok || status === 404) {
    meta.pages_miss++;
    if (status !== 404) meta.errors.push({ page: i, status });
    // stop after a few consecutive misses after page 40
    if (i > 42 && status === 404) break;
    continue;
  }
  let j;
  try {
    j = JSON.parse(text);
  } catch (e) {
    meta.errors.push({ page: i, err: String(e) });
    continue;
  }
  const qs = j?.pageProps?.questions || [];
  meta.pages_ok++;
  for (const q of qs) {
    const choices = [];
    const c = q.choices || {};
    for (const k of Object.keys(c).sort()) {
      choices.push(`${k}. ${c[k]}`);
    }
    outItems.push({
      question_number: null,
      stem: q.question_text || "",
      choices,
      source_answer: q.answer || q.answer_ET || "",
      source_url: q.url || "",
      provenance: "examtopics-data-github-cache",
      cache_page: i,
      stem_hash: stemHash(q.question_text || ""),
      extracted_at: new Date().toISOString(),
    });
    meta.questions++;
  }
  await sleep(80);
}

const checkpoint = path.join(RAW, "cache-items.json");
writeJson(checkpoint, { meta, items: outItems });
writeJson(path.join(WORK, "harvest-cache-stats.json"), meta);
console.log(
  JSON.stringify(
    { checkpoint, pages_ok: meta.pages_ok, questions: meta.questions },
    null,
    2
  )
);
