#!/usr/bin/env node
/**
 * Parse saved exam-view preview HTML (free pages only) into raw/preview-items.jsonl
 * and merge discussion IDs into discovered-id-map.txt. Does not fetch paywalled pages.
 */
import fs from "node:fs";
import path from "node:path";
import {
  ensureDirs,
  RAW,
  WORK,
  REPORTS,
  writeJson,
  appendJsonl,
  readJsonl,
  stripHtml,
  stemHash,
} from "./lib.mjs";

ensureDirs();

const previewDir = path.join(RAW, "preview");
const outPath = path.join(RAW, "preview-items.jsonl");
const mapPath = path.join(WORK, "discovered-id-map.txt");
const checkpointPath = path.join(RAW, "discussions.jsonl");

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

function isLoginWall(html) {
  return (
    /login-wrapper|login__form|act" value="login"/i.test(html) &&
    !/Question\s*#\d+/i.test(html)
  );
}

function parseExamViewHtml(html, page, sourceUrl) {
  if (isLoginWall(html)) {
    return {
      page,
      access_limitation: page >= 4 ? "contributor_paywall_or_login" : "login_required",
      items: [],
    };
  }

  const items = [];
  // Split by Question #N headers
  const parts = html.split(/<strong>\s*Question\s*#(\d+)\s*<\/strong>/i);
  // parts: [preamble, num1, body1, num2, body2, ...]
  for (let i = 1; i < parts.length; i += 2) {
    const qnum = parseInt(parts[i], 10);
    const body = parts[i + 1] || "";
    const stemMatch = body.match(
      /<p class="card-text">\s*([\s\S]*?)<\/p>/i
    );
    let stem = stemMatch ? stripHtml(stemMatch[1]) : "";

    const choices = [];
    const liRe =
      /<li[^>]*class="[^"]*multi-choice-item[^"]*"[^>]*>([\s\S]*?)<\/li>/gi;
    let lm;
    let idx = 0;
    const letters = ["A", "B", "C", "D", "E", "F"];
    while ((lm = liRe.exec(body)) && idx < letters.length) {
      const text = stripHtml(lm[1]).replace(/Most Voted/i, "").trim();
      if (text) choices.push(`${letters[idx]}. ${text.replace(/^[A-F]\.\s*/, "")}`);
      idx++;
    }
    // Fallback: A. B. C. in plain
    if (choices.length < 2) {
      const plain = stripHtml(body);
      for (const letter of letters) {
        const next =
          letter === "F"
            ? "(?:Correct|Suggested|Show|Discussion|Most)"
            : String.fromCharCode(letter.charCodeAt(0) + 1) + "\\.";
        const re = new RegExp(`${letter}\\.\\s+(.+?)\\s+(?:${next})`, "i");
        const m = plain.match(re);
        if (m) choices.push(`${letter}. ${m[1].trim()}`);
      }
    }

    let answer = "";
    const ansMatch =
      body.match(
        /Correct Answer:\s*<\/strong>\s*<strong[^>]*>\s*([A-F]+)\s*<\/strong>/i
      ) ||
      body.match(/Correct Answer:\s*<\/strong>\s*<br\s*\/?>\s*([A-F]+)/i) ||
      body.match(/Community vote currently supports\s*<span>\s*Answer\s*([A-F]+)/i) ||
      body.match(/Correct Answer:<\/strong>\s*([A-F]+)/i) ||
      body.match(/Correct Answer:\s*([A-F]+)/i);
    if (ansMatch) answer = ansMatch[1].trim();

    // openDiscussionModal IDs are content IDs, NOT public discussion view slugs
    let contentId = null;
    const idMatch =
      body.match(/openDiscussionModal\('(\d+)'/i) ||
      body.match(/data-id="(\d+)"/i) ||
      body.match(/mostVoted(\d+)/i);
    if (idMatch) contentId = parseInt(idMatch[1], 10);

    items.push({
      question_number: qnum,
      stem,
      choices,
      source_answer: answer,
      source_url: `${sourceUrl}#question-${qnum}`,
      content_id: contentId,
      provenance: "examtopics-free-preview",
      access_limitation: "none",
      stem_hash: stemHash(stem),
      preview_page: page,
      extracted_at: new Date().toISOString(),
    });
  }

  return { page, access_limitation: "none", items };
}

const map = loadMap();
const files = fs.existsSync(previewDir)
  ? fs.readdirSync(previewDir).filter((f) => /^view-\d+\.html$/i.test(f))
  : [];

// Clear previous preview-items for this run
if (fs.existsSync(outPath)) fs.unlinkSync(outPath);

const pageStats = {};
let extracted = 0;

for (const f of files.sort()) {
  const page = parseInt(f.match(/(\d+)/)[1], 10);
  const html = fs.readFileSync(path.join(previewDir, f), "utf8");
  const url = `https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/view/${page}/`;
  const parsed = parseExamViewHtml(html, page, url);
  pageStats[page] = {
    file: f,
    access_limitation: parsed.access_limitation,
    item_count: parsed.items.length,
    bytes: html.length,
  };
  for (const item of parsed.items) {
    appendJsonl(outPath, item);
    extracted++;
  }
}

// Rebuild map only from known-good discussion checkpoint URLs (never from content IDs)
const rebuilt = new Map();
for (const row of readJsonl(checkpointPath)) {
  const m = String(row.source_url || "").match(
    /view\/(\d+)-.*question-(\d+)/i
  );
  if (m) rebuilt.set(Number(m[2]), Number(m[1]));
}
saveMap(rebuilt);

const stats = {
  generated_at: new Date().toISOString(),
  pages: pageStats,
  preview_items_extracted: extracted,
  map_size: map.size,
  preview_items_path: outPath,
  note: "Preview content IDs are not discussion view slugs; map rebuilt from discussions.jsonl only.",
};
writeJson(path.join(WORK, "parse-preview-stats.json"), stats);
appendJsonl(path.join(REPORTS, "extraction-log.jsonl"), {
  at: new Date().toISOString(),
  event: "parse_preview_done",
  ...stats,
});
console.log(JSON.stringify(stats, null, 2));
