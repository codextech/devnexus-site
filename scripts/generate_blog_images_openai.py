#!/usr/bin/env python3
from __future__ import annotations

import base64
import json
import os
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOG_DIR = ROOT / "src/content/blog"
IMG_DIR = ROOT / "public/images/blog"

STYLE = (
    "Dark modern tech editorial illustration, cinematic lighting, clean composition, "
    "deep navy background (#0a1628), electric blue accents (#02A9F7), "
    "professional SaaS brand style, no logos, no watermarks, no readable text."
)

TOPIC_HINTS = {
    "next-js-vs-remix-2025": "Split screen concept comparing two web frameworks: performance dashboard, route trees, server rendering symbols, fast developer workflow.",
    "jira-forge-vs-connect-2025": "Split screen concept of serverless cloud functions vs self-hosted servers and webhook flows.",
    "how-to-build-agentic-ai-workflows": "Multi-agent orchestration diagram style with planner node, tool nodes, memory layer, evaluation loop.",
    "ai-agents-replacing-web-dev-workflows-2026": "AI agents collaborating to ship web products: design, code, tests, deployment pipeline visualized as autonomous workflow.",
}


def extract_frontmatter(text: str) -> dict[str, str]:
    fm = {}
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if not m:
        return fm
    block = m.group(1)
    for line in block.splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        fm[k.strip()] = v.strip().strip('"')
    return fm


def openai_generate(prompt: str, api_key: str) -> bytes:
    payload = {
        "model": "gpt-image-1",
        "prompt": prompt,
        "size": "1536x1024",
        "quality": "high",
        "background": "opaque",
        "output_format": "png",
    }
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=180) as resp:
            raw = resp.read()
    except Exception as e:
        print(f"ERROR calling OpenAI Images API: {e}")
        raise

    data = json.loads(raw)
    item = (data.get("data") or [{}])[0]
    b64 = item.get("b64_json")
    if not b64:
        raise RuntimeError(f"No image returned from API: {data}")
    return base64.b64decode(b64)


def main() -> int:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("OPENAI_API_KEY is missing. Add it to your environment (or .env loaded into shell).")
        return 1

    IMG_DIR.mkdir(parents=True, exist_ok=True)
    posts = sorted(BLOG_DIR.glob("*.mdx"))
    if not posts:
        print("No blog posts found.")
        return 1

    for post in posts:
        fm = extract_frontmatter(post.read_text())
        title = fm.get("title", post.stem)
        image_path = fm.get("image", f"/images/blog/{post.stem}.png")
        out = ROOT / "public" / image_path.lstrip("/")
        out.parent.mkdir(parents=True, exist_ok=True)

        hint = TOPIC_HINTS.get(post.stem, "Technology blog hero image with abstract architecture visuals.")
        prompt = (
            f"Create a blog hero image for the article titled: '{title}'. "
            f"Concept: {hint} {STYLE} "
            "Landscape 3:2 composition suitable for website blog headers."
        )

        print(f"Generating: {post.name} -> {out.relative_to(ROOT)}")
        img = openai_generate(prompt, api_key)
        out.write_bytes(img)
        print(f"  Saved: {out}")

    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
