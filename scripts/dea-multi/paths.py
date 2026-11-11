from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EXAMTOPICS_WORK = ROOT / "aws-dea-c01" / "_work" / "examtopics"
OUT = ROOT / "aws-dea-c01" / "_work" / "multi-source"
RAW = OUT / "raw"


def ensure_dirs() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    (RAW / "examice").mkdir(parents=True, exist_ok=True)
    (RAW / "other").mkdir(parents=True, exist_ok=True)
    (RAW / "github").mkdir(parents=True, exist_ok=True)
