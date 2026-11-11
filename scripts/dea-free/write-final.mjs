#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { WORK, REPORTS, RAW, NORMALIZED, readJsonl } from "./lib.mjs";

const abs = (p) => path.resolve(WORK, p);

const inv = JSON.parse(
  fs.readFileSync(path.join(NORMALIZED, "inventory-366.json"), "utf8")
);
const qs = JSON.parse(
  fs.readFileSync(path.join(NORMALIZED, "questions.json"), "utf8")
);
const audit = JSON.parse(
  fs.readFileSync(path.join(REPORTS, "pre-audit.json"), "utf8")
);
const norm = JSON.parse(
  fs.readFileSync(path.join(REPORTS, "normalize-summary.json"), "utf8")
);
const ext = JSON.parse(
  fs.readFileSync(path.join(WORK, "extract-accessible-stats.json"), "utf8")
);
const prev = JSON.parse(
  fs.readFileSync(path.join(WORK, "parse-preview-stats.json"), "utf8")
);
const mapLines = fs
  .readFileSync(path.join(WORK, "discovered-id-map.txt"), "utf8")
  .trim()
  .split(/\n/)
  .filter(Boolean);
const disc = readJsonl(path.join(RAW, "discussions.jsonl"));
const withAns = disc.filter((d) => d.source_answer).length;
const withExpl = inv.filter((x) => x.examtopics_explanation).length;
const complete = inv.filter((x) => x.extraction_status === "complete");
const partial = inv.filter((x) => x.extraction_status === "partial");
const inac = inv.filter((x) => x.extraction_status === "inaccessible");
const byLim = {};
for (const x of inac) {
  byLim[x.access_limitation] = (byLim[x.access_limitation] || 0) + 1;
}
const urlsKnown = inv.filter((x) => x.source_url).length;
const cacheItems = JSON.parse(
  fs.readFileSync(path.join(RAW, "cache-items.json"), "utf8")
);
const unnum = JSON.parse(
  fs.readFileSync(path.join(REPORTS, "unnumbered-cache.json"), "utf8")
);
const failPath = path.join(RAW, "discussions-failures.jsonl");
const fails = fs.existsSync(failPath)
  ? fs.readFileSync(failPath, "utf8").trim().split(/\n/).filter(Boolean).length
  : 0;
const logPath = path.join(REPORTS, "extraction-log.jsonl");
const logs = fs.existsSync(logPath)
  ? fs.readFileSync(logPath, "utf8").trim().split(/\n/).filter(Boolean).length
  : 0;

const limLines = Object.entries(byLim)
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `- \`${k}\`: ${v}`)
  .join("\n");

const md = `# FINAL — ExamTopics DEA-C01 Accessible Extraction Evidence

Generated: ${new Date().toISOString()}

## Verdict

Inventory covers **all 366** question numbers. This run does **not** claim a complete 366/366 extraction.

Of 366 slots:

- **complete**: ${complete.length}
- **partial**: ${partial.length}
- **inaccessible**: ${inac.length}

Unique ExamTopics items in normalized set (including unnumbered cache): **${qs.length}**
Unnumbered cache items retained (no invented numbers): **${unnum.count}**

## Source inventory (pre-audit)

| Source | Count | Complete | Partial | Numbered |
|--------|------:|---------:|--------:|---------:|
| GitHub cache | ${audit.sources.cache.count} | ${audit.sources.cache.complete} | ${audit.sources.cache.partial} | ${audit.sources.cache.numbered} |
| Public discussions | ${audit.sources.discussion.count} | ${audit.sources.discussion.complete} | ${audit.sources.discussion.partial} | ${audit.sources.discussion.numbered} |
| Live-partial dump | ${audit.sources.live_partial.count} | ${audit.sources.live_partial.complete} | ${audit.sources.live_partial.partial} | ${audit.sources.live_partial.numbered} |
| ID map (discussion URLs) | ${mapLines.length} | — | — | ${mapLines.length} |

## Accessible fetch results

### Discussion map expansion

- Probed neighbor IDs: **${ext.expand.probed}**
- New map hits this run: **${ext.expand.added}**
- Final discussion URL map size: **${mapLines.length}**
- Checkpoint harvest: fetched=${ext.harvest.fetched}, skipped(already)=${ext.harvest.skipped}, failed=${ext.harvest.failed}

### Free preview (exam view)

- Page 1: accessible, **${prev.pages["1"].item_count}** questions extracted (Q1–10)
- Pages 2–3: **login_required** (no anonymous session cookie in this environment)
- Pages 4–5: **contributor_paywall_or_login** (probed only; no bypass)

### Countable outcomes vs 366 slots

- Slots with \`source_url\`: ${urlsKnown}
- Slots \`complete\` (stem + options + answer): **${complete.length}**
- Slots \`partial\`: **${partial.length}**
- Slots with ExamTopics explanation text: ${withExpl}
- Discussion rows with answers (raw checkpoint): ${withAns} / ${disc.length}

## Inaccessible breakdown (${inac.length} of 366)

${limLines}

## Duplicates / conflicts

- Multi-source stem-hash groups: **${norm.duplicate_hash_groups}**
- Answer conflicts across sources: **${norm.answer_conflicts}**
- Details: \`${abs("reports/duplicates.md")}\`

## Failed attempts

- Discussion failure log lines: **${fails}** (\`${abs("raw/discussions-failures.jsonl")}\`)
- Extraction log events: **${logs}** (\`${abs("reports/extraction-log.jsonl")}\`)
- Neighbor probes with no hit: ${ext.expand.failed_probe}

## Absolute artifact paths

- Work root: \`${abs(".")}\`
- Pre-audit: \`${abs("reports/pre-audit.json")}\`
- Normalized questions: \`${abs("normalized/questions.json")}\`
- Inventory 1–366: \`${abs("normalized/inventory-366.json")}\`
- Per-number stubs: \`${abs("normalized/by-number/")}\`
- Unnumbered cache: \`${abs("reports/unnumbered-cache.json")}\`
- Missing list: \`${abs("reports/missing-questions.md")}\`
- Duplicates: \`${abs("reports/duplicates.md")}\`
- Cache items: \`${abs("raw/cache-items.json")}\` (${cacheItems.count || (cacheItems.items || []).length} items)
- Discussions checkpoint: \`${abs("raw/discussions.jsonl")}\`
- Preview HTML: \`${abs("raw/preview/")}\`
- Preview items: \`${abs("raw/preview-items.jsonl")}\`
- ID map: \`${abs("discovered-id-map.txt")}\`
- This report: \`${abs("reports/FINAL.md")}\`

## Explicit non-claim

**${complete.length} of 366 slots are \`complete\`.** The remaining **${inac.length + partial.length}** are partial or inaccessible under legitimate free/public access (unknown discussion URL, login wall for preview pages 2–3, and Contributor/PRO for exam view page 4+). No paywall bypass, CAPTCHA defeat, or substitute questions were used.
`;

fs.writeFileSync(path.join(REPORTS, "FINAL.md"), md);
console.log(
  JSON.stringify(
    {
      complete: complete.length,
      partial: partial.length,
      inaccessible: inac.length,
      unique: qs.length,
      unnumbered: unnum.count,
      final: path.join(REPORTS, "FINAL.md"),
    },
    null,
    2
  )
);
