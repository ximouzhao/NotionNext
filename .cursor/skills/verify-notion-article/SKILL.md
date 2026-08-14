---
name: verify-notion-article
description: Mechanically verifies a saved Notion article for properties, supported blocks, links, Cover state, workflow stage, and NotionNext public rendering. Use after writing or revising a Draft, before and after Invisible preview, and after publication. Editorial judgment belongs to article-reviewer, not this skill.
---

# Verify Notion Article

Verify the **saved** page, not the writer's draft. Do not change content or status while running this skill.

This skill is **mechanical QA**. It does not re-judge causal narrative, terminology pedagogy, evidence strength, or readability. Those gates belong to `article-reviewer` and `.cursor/checklists/article-review.md`. Before Invisible preview or publication, confirm that independent review has no open `blocker` or `major` findings; do not re-run that editorial checklist here.

## Inputs

- Notion page URL or ID;
- intended slug and workflow stage: `Draft`, `Invisible`, or `Published`;
- expected companion link slugs and Cover requirement;
- latest independent review decision when available (`Ready for next gate` or open findings).

## Setup

1. Discover the current Notion MCP schemas before calling its tools.
2. Read the current `notion://docs/enhanced-markdown-spec` MCP resource.
3. Fetch the page and its parent data source.
4. Query the data source for duplicate slugs and related pages.
5. Read `.cursor/skills/notion-technical-writing/notionnext-capabilities.md`.

If authentication or permission is definitively denied, report it once and stop. Do not work around missing access with browser automation.

## Checks common to every stage

### Review gate (pointer only)

- Record whether the latest independent review is `Ready for next gate` with no open `blocker`/`major`.
- If review is missing or still has `blocker`/`major`, Decision is `Fail` or `Blocked` for preview/publication stages. Do not invent editorial findings; cite the review result.

### Properties

- `type=Post`;
- status equals the requested stage;
- title and slug are non-empty;
- slug is stable, URL-safe, and unique;
- summary is non-empty and matches the intended reader outcome at a glance (empty or obviously wrong slug/title/summary is a mechanical fail; nuanced summary quality is reviewer work);
- date, category, and tags use valid data-source options;
- any article password is treated only as a UI gate, not a confidentiality control;
- companion pages have stable slugs and the intended `Invisible` status.

Draft is a valid workflow value and is excluded from normal `allPages` discovery, but UUID fallback routes can bypass that listing filter. Draft content must not be confidential.

### Blocks

- block choices are listed as supported in `.cursor/skills/notion-technical-writing/notionnext-capabilities.md`;
- Mermaid language is lowercase `mermaid`;
- Toggle children are indented;
- tables contain short rich text and are not excessively wide;
- multi-item numeric comparisons do not pack multiple models/scores into one cell; a chart or ranked visual exists when ≥3 comparable numbers are the point;
- equations, images, and embeds are present as intended without unknown block types;
- images have captions or adjacent text when the plan required them;
- no critical content depends on an unknown block, unshared synced block, or unsupported link preview;
- no manual `<table_of_contents/>` exists.

### Links and assets

- companion links use `https://ximouzhao.com/article/<slug>`;
- no `blog.ximouzhao.com` article link remains;
- no bare Notion page URL is used as a public companion link;
- no temporary signed asset URL is persisted;
- internal targets exist and slugs match;
- if a Cover is required, `public/images/covers/cover-<slug>.png` exists in the intended change scope and the fetched page has a Cover.

## Stage-specific checks

### Draft

- Confirm the canonical slug remains excluded from normal public discovery; a slug-route 404 is expected.
- Record that UUID access may still succeed and therefore Draft is not a privacy boundary.
- Confirm properties, blocks, and links against the checks above.
- Do not report missing public rendering as a defect.
- Do not change to `Invisible` without explicit approval.

### Invisible

- Warn that the page is unlisted, not private; article passwords do not provide server-side confidentiality.
- Fetch `https://ximouzhao.com/article/<slug>` after reasonable cache propagation.
- Confirm a successful direct route while the page remains absent from homepage, category, tag, RSS, and Sitemap aggregation.
- Verify desktop and narrow layouts, TOC, anchor links, Mermaid, equations, code, tables, Toggles, images, captions, embeds, and Cover.
- If UI inspection is unavailable, mark visual checks `Not run`; do not infer success from the Notion fetch.

### Published

- Confirm the direct route succeeds.
- Confirm expected homepage, category, tag, RSS, Sitemap, and SEO behavior when accessible.
- Check title, description, canonical route, and social image/Cover.
- Account for ISR or cache delay before declaring a publication failure.

## Result format

```markdown
## Verification Result

- Page:
- Stage:
- Decision: Pass | Fail | Blocked
- Independent review gate: Ready | Open blocker/major | Not run
- Blocking issues:
- Warnings:

## Properties

- Check: Pass / Fail — evidence

## Blocks and Links

- Check: Pass / Fail — block or link

## Cover

- Local tracked asset:
- Notion Cover:

## Public Rendering

- Direct route:
- Aggregation behavior:
- Visual checks:
- Cache notes:

## Required Actions

1. Action or `None`.
```

`Pass` requires the independent review gate to be clear for the current stage (or an explicit user waiver for localized edits), plus all mechanical checks applicable to that stage. Keep warnings visible. Do not expand this skill back into editorial review.
