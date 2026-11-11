from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from typing import Any

import httpx

from paths import RAW

USER_AGENT = (
    "Mozilla/5.0 (compatible; dea-multi-recon/0.1; +local-study-research)"
)

SEED_SOURCES = [
    {
        "name": "ExamTopics DEA-C01",
        "url": "https://www.examtopics.com/exams/amazon/aws-certified-data-engineer-associate-dea-c01/",
        "claimed_count": 366,
        "access_model": "mixed_public_and_paid",
        "notes": "Free preview ~Q1-30 when logged in; contributor for view/4+. Public discussions + GitHub cache used locally.",
    },
    {
        "name": "Examice DEA-C01",
        "url": "https://examice.com/exams/amazon/dea-c01",
        "claimed_count": 366,
        "access_model": "paid_after_preview",
        "notes": "Public free preview Q1-5; remainder locked behind purchase.",
    },
    {
        "name": "GitHub examtopics-data cache",
        "url": "https://github.com/thatonecodes/examtopics-data",
        "claimed_count": None,
        "access_model": "github",
        "notes": "Public cache previously harvested into _work/examtopics (207 DEA-C01 items).",
    },
    {
        "name": "CertQnA DEA-C01",
        "url": "https://certqna.com/questions/dea-c01",
        "claimed_count": None,
        "access_model": "unknown",
        "notes": "Public listing pages; may be login-gated for full stems.",
    },
    {
        "name": "CloudPass DEA-C01",
        "url": "https://www.cloudpass.pro/en/exams/aws/aws-dea-c01",
        "claimed_count": None,
        "access_model": "unknown",
        "notes": "Practice portal; sample questions may be public.",
    },
    {
        "name": "AWS Skill Builder Official Practice Question Set DEA-C01",
        "url": "https://skillbuilder.aws/learn/2JS5H1Z9KP/official-practice-question-set-aws-certified-data-engineer--associate-deac01--english/VX268Y5VBA",
        "claimed_count": 20,
        "access_model": "login",
        "notes": "Official AWS sample set (bucket D). Not ExamTopics/Examice dump.",
    },
]


def _probe(url: str, client: httpx.Client) -> dict[str, Any]:
    try:
        r = client.get(url, follow_redirects=True, timeout=30.0)
        text = r.text
        return {
            "status_code": r.status_code,
            "final_url": str(r.url),
            "bytes": len(text),
            "login_markers": bool(
                re.search(r"log\s*in|sign\s*in|subscribe|unlock|paywall", text, re.I)
            ),
            "question_markers": len(
                re.findall(r"Question\s+#?\d+|question\s+\d+\s+of", text, re.I)
            ),
            "dea_c01_mention": bool(re.search(r"DEA-C01|Data Engineer", text, re.I)),
        }
    except Exception as e:  # noqa: BLE001
        return {"error": str(e)}


def search_github_hints(client: httpx.Client) -> list[dict[str, Any]]:
    """Use GitHub HTML search pages (no API token) for public repo hints."""
    queries = [
        "DEA-C01 examtopics",
        "DEA-C01 questions json",
        "aws-certified-data-engineer-associate dump",
        "examice dea-c01",
    ]
    hits: list[dict[str, Any]] = []
    for q in queries:
        url = f"https://github.com/search?q={httpx.QueryParams({'q': q})['q']}&type=repositories"
        # simpler encoding
        url = "https://github.com/search?q=" + q.replace(" ", "+") + "&type=repositories"
        try:
            r = client.get(url, timeout=30.0)
            # Extract repo hrefs
            repos = sorted(
                set(
                    re.findall(
                        r'href="/(?P<repo>[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+)"',
                        r.text,
                    )
                )
            )
            # Filter noise
            repos = [
                x
                for x in repos
                if not x.startswith("topics/")
                and "search" not in x
                and x.count("/") == 1
            ][:15]
            hits.append({"query": q, "status": r.status_code, "repos": repos})
        except Exception as e:  # noqa: BLE001
            hits.append({"query": q, "error": str(e)})
    return hits


def try_extract_certqna(client: httpx.Client) -> dict[str, Any]:
    url = "https://certqna.com/questions/dea-c01"
    path = RAW / "other" / "certqna-dea-c01.html"
    try:
        r = client.get(url, timeout=30.0)
        path.write_text(r.text, encoding="utf-8")
        # Look for question titles / links
        titles = re.findall(
            r"<a[^>]+href=\"(/questions/[^\"]+)\"[^>]*>([^<]{20,200})</a>",
            r.text,
            re.I,
        )
        return {
            "url": url,
            "status": r.status_code,
            "bytes": len(r.text),
            "sample_links": [
                {"path": p, "title": t.strip()} for p, t in titles[:30]
            ],
            "accessible_full_stems": False,  # listing only unless pages fetched
            "note": "Listing/titles captured; full stems may require per-page fetch or login.",
        }
    except Exception as e:  # noqa: BLE001
        return {"url": url, "error": str(e)}


def try_extract_cloudpass(client: httpx.Client) -> dict[str, Any]:
    url = "https://www.cloudpass.pro/en/exams/aws/aws-dea-c01"
    path = RAW / "other" / "cloudpass-dea-c01.html"
    try:
        r = client.get(url, timeout=30.0)
        path.write_text(r.text, encoding="utf-8")
        has_sample = bool(
            re.search(r"Practice Questions|Which solution|NEST_TO_MAP", r.text, re.I)
        )
        return {
            "url": url,
            "status": r.status_code,
            "bytes": len(r.text),
            "sample_question_visible": has_sample,
            "note": "Sample practice content may appear on landing page; full bank likely gated.",
        }
    except Exception as e:  # noqa: BLE001
        return {"url": url, "error": str(e)}


def discover_sources() -> dict[str, Any]:
    RAW.mkdir(parents=True, exist_ok=True)
    (RAW / "other").mkdir(parents=True, exist_ok=True)
    (RAW / "github").mkdir(parents=True, exist_ok=True)

    sources = []
    with httpx.Client(
        headers={"User-Agent": USER_AGENT, "Accept": "text/html"},
        follow_redirects=True,
    ) as client:
        for seed in SEED_SOURCES:
            entry = dict(seed)
            entry["probed_at"] = datetime.now(timezone.utc).isoformat()
            entry["probe"] = _probe(seed["url"], client)
            # status summary
            if entry["probe"].get("error"):
                entry["status"] = "probe_error"
            elif entry["probe"].get("status_code", 0) >= 400:
                entry["status"] = "http_error"
            elif seed["access_model"] in ("paid_after_preview", "mixed_public_and_paid"):
                entry["status"] = "partially_accessible"
            elif seed["access_model"] == "login":
                entry["status"] = "login_required"
            else:
                entry["status"] = "reachable"
            sources.append(entry)

        github_hits = search_github_hints(client)
        (RAW / "github" / "search-hits.json").write_text(
            json.dumps(github_hits, indent=2) + "\n", encoding="utf-8"
        )
        certqna = try_extract_certqna(client)
        cloudpass = try_extract_cloudpass(client)
        (RAW / "other" / "certqna-summary.json").write_text(
            json.dumps(certqna, indent=2) + "\n", encoding="utf-8"
        )
        (RAW / "other" / "cloudpass-summary.json").write_text(
            json.dumps(cloudpass, indent=2) + "\n", encoding="utf-8"
        )

    # Append discovered github repos as source candidates
    seen_repos = set()
    for hit in github_hits:
        for repo in hit.get("repos") or []:
            if repo in seen_repos:
                continue
            seen_repos.add(repo)
            if not re.search(
                r"exam|dea|aws|cert|question|dump|topic", repo, re.I
            ):
                continue
            sources.append(
                {
                    "name": f"GitHub search hit: {repo}",
                    "url": f"https://github.com/{repo}",
                    "claimed_count": None,
                    "access_model": "github",
                    "status": "discovered_unverified",
                    "notes": f"From GitHub HTML search query: {hit.get('query')}",
                    "probed_at": datetime.now(timezone.utc).isoformat(),
                }
            )

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "sources": sources,
        "side_extractions": {
            "certqna": certqna,
            "cloudpass": cloudpass,
            "github_search": github_hits,
        },
    }
