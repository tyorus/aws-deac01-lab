#!/usr/bin/env node
/**
 * Exhaustive accessible ExamTopics fetch only.
 * - Expand discussion ID map via neighbor probes
 * - Harvest missing public discussion pages (checkpointed)
 * - Probe free preview pages 1–3 only; document paywall for view/4+
 * Never bypass Contributor paywall / CAPTCHA.
 */
import fs from "node:fs";
import path from "node:path";
import {
  ensureDirs,
  RAW,
  WORK,
  REPORTS,
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
const extractLog = path.join(REPORTS, "extraction-log.jsonl");
const previewDir = path.join(RAW, "preview");
fs.mkdirSync(previewDir, { recursive: true });

function loadMap() {
  const map = new Map();
  if (!fs.existsSync(mapPath)) return map;
  for (const line of fs.readFileSync(mapPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^(\d+)=(\d+)$/);
    if (m) map.set(parseInt(m[1], 10), parseInt(m[2], 10));
  }
  return map;
}

function saveMap(map) {
  const lines = [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([q, id]) => `${q}=${id}`);
  fs.writeFileSync(mapPath, lines.join("\n") + "\n", "utf8");
}

function discussionUrl(q, id) {
  return `https://www.examtopics.com/discussions/amazon/view/${id}-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-${q}-discussion/`;
}

function examViewUrl(page) {
  return `https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/view/${page}/`;
}

function logEvent(obj) {
  appendJsonl(extractLog, { at: new Date().toISOString(), ...obj });
}

const map = loadMap();
const expandStats = { probed: 0, added: 0, failed_probe: 0 };

// Wider neighbor expansion around every known seed for gaps 1–366
const seeds = [...map.entries()].map(([q, id]) => ({ q, id }));
for (const s of seeds) {
  for (let dq = -8; dq <= 12; dq++) {
    const q = s.q + dq;
    const id = s.id + dq;
    if (q < 1 || q > 366) continue;
    if (map.has(q)) continue;
    expandStats.probed++;
    await sleep(180);
    const url = discussionUrl(q, id);
    const { ok, status, text } = await fetchText(url, {
      timeoutMs: 15000,
      retries: 2,
    });
    const hit =
      ok &&
      status === 200 &&
      text.length > 12000 &&
      /DEA-C01|Data Engineer/i.test(text);
    if (hit) {
      map.set(q, id);
      expandStats.added++;
      logEvent({ event: "map_hit", q, id, url });
      console.log(`map-hit q=${q} id=${id}`);
    } else {
      expandStats.failed_probe++;
      if (status === 429) {
        await sleep(3000);
      }
    }
  }
}
saveMap(map);

// Also try linear interpolation across large gaps using flanking seeds
const sortedQs = [...map.keys()].sort((a, b) => a - b);
for (let i = 0; i < sortedQs.length - 1; i++) {
  const qA = sortedQs[i];
  const qB = sortedQs[i + 1];
  const idA = map.get(qA);
  const idB = map.get(qB);
  if (qB - qA <= 1) continue;
  if (idB - idA !== qB - qA) continue; // only when IDs track 1:1
  for (let q = qA + 1; q < qB; q++) {
    if (map.has(q)) continue;
    const id = idA + (q - qA);
    expandStats.probed++;
    await sleep(180);
    const url = discussionUrl(q, id);
    const { ok, status, text } = await fetchText(url, {
      timeoutMs: 15000,
      retries: 2,
    });
    const hit =
      ok &&
      status === 200 &&
      text.length > 12000 &&
      /DEA-C01|Data Engineer/i.test(text);
    if (hit) {
      map.set(q, id);
      expandStats.added++;
      logEvent({ event: "interp_hit", q, id, url });
      console.log(`interp-hit q=${q} id=${id}`);
    } else {
      expandStats.failed_probe++;
    }
  }
}
saveMap(map);

// Harvest missing discussion pages
const existing = readJsonl(checkpointPath);
const doneByQ = new Map();
for (const row of existing) {
  if (row.question_number != null) doneByQ.set(row.question_number, row);
}

let fetched = 0;
let skipped = 0;
let failed = 0;
let withAnswer = 0;

for (const [q, id] of [...map.entries()].sort((a, b) => a[0] - b[0])) {
  const url = discussionUrl(q, id);
  const prev = doneByQ.get(q);
  if (prev && prev.stem && prev.stem.length > 20) {
    skipped++;
    continue;
  }
  await sleep(550);
  const { ok, status, text, error } = await fetchText(url);
  if (!ok || status !== 200) {
    failed++;
    const limitation =
      status === 404
        ? "http_404"
        : status === 429
          ? "rate_limited"
          : status === 403
            ? "http_403"
            : "http_error";
    appendJsonl(failPath, {
      q,
      id,
      url,
      status,
      error: error || null,
      access_limitation: limitation,
    });
    logEvent({ event: "fetch_fail", q, id, url, status, limitation });
    continue;
  }
  // Detect soft paywall / login walls on discussion pages
  if (
    /contribute to unlock|become a contributor|subscribers only|login to view/i.test(
      text
    ) &&
    text.length < 20000
  ) {
    failed++;
    appendJsonl(failPath, {
      q,
      id,
      url,
      status,
      access_limitation: "contributor_paywall",
    });
    logEvent({
      event: "paywall",
      q,
      id,
      url,
      limitation: "contributor_paywall",
    });
    continue;
  }

  const parsed = parseDiscussionHtml(text, url, q);
  parsed.stem_hash = stemHash(parsed.stem);
  parsed.access_limitation = "none";
  if (parsed.source_answer) withAnswer++;
  appendJsonl(checkpointPath, parsed);
  doneByQ.set(q, parsed);
  fetched++;
  logEvent({
    event: "fetched",
    q,
    stem_len: (parsed.stem || "").length,
    answer: parsed.source_answer || null,
    choices: parsed.choices.length,
  });
  console.log(
    `ok q=${q} stem=${(parsed.stem || "").length} ans=${parsed.source_answer || "-"} choices=${parsed.choices.length}`
  );
}

// Free preview: exam view pages 1–3 only (Q1–30). Document paywall for 4+.
const previewStats = { pages: {}, paywall_confirmed: [] };
for (let page = 1; page <= 5; page++) {
  const url = examViewUrl(page);
  await sleep(800);
  const { ok, status, text } = await fetchText(url, {
    timeoutMs: 20000,
    retries: 3,
  });
  const outHtml = path.join(previewDir, `view-${page}.html`);
  if (ok && text) fs.writeFileSync(outHtml, text, "utf8");

  const paywalled =
    /30 of 366|contributor|get full access|unlock the remaining/i.test(
      text || ""
    ) ||
    (page >= 4 && (!ok || (text || "").length < 5000));
  const qCount = ((text || "").match(/question-discussion|Question\s+#\d+/gi) ||
    []).length;

  previewStats.pages[page] = {
    url,
    status,
    ok,
    bytes: (text || "").length,
    paywalled: Boolean(paywalled && page >= 4),
    approx_question_markers: qCount,
    saved: ok ? outHtml : null,
  };
  logEvent({
    event: "preview_probe",
    page,
    status,
    paywalled: previewStats.pages[page].paywalled,
    bytes: previewStats.pages[page].bytes,
  });

  if (page >= 4 && previewStats.pages[page].paywalled) {
    previewStats.paywall_confirmed.push(page);
  }

  // For pages 1–3, try light parse of any visible discussion links / stems
  if (page <= 3 && ok && text) {
    const linkRe =
      /href="(\/discussions\/amazon\/view\/\d+-exam-aws-certified-data-engineer-associate-dea-c01-topic-1-question-(\d+)-discussion\/?)"/gi;
    let m;
    while ((m = linkRe.exec(text))) {
      const q = parseInt(m[2], 10);
      const idMatch = m[1].match(/view\/(\d+)-/);
      if (idMatch && !map.has(q)) {
        map.set(q, parseInt(idMatch[1], 10));
        expandStats.added++;
        logEvent({ event: "preview_map_hit", q, id: map.get(q) });
      }
    }
  }
}
saveMap(map);

const stats = {
  generated_at: new Date().toISOString(),
  map_size: map.size,
  expand: expandStats,
  harvest: { fetched, skipped, failed, with_answer_this_run: withAnswer },
  preview: previewStats,
  checkpoint: checkpointPath,
  failures: failPath,
  extraction_log: extractLog,
};
writeJson(path.join(WORK, "extract-accessible-stats.json"), stats);
console.log(JSON.stringify(stats, null, 2));
