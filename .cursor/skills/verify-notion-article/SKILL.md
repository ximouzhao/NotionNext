---
name: verify-notion-article
description: Verifies Notion technical articles for metadata, content structure, supported blocks, links, Cover state, review gates, and NotionNext rendering. Use after writing or revising a Draft, before and after Invisible preview, and after publication.
---

# Verify Notion Article

Verify the saved page, not the writer's draft. Do not change content or status while running this skill.

## Inputs

- Notion page URL or ID;
- intended slug and workflow stage: `Draft`, `Invisible`, or `Published`;
- approved plan path when available;
- expected companion links and Cover requirement.

## Setup

1. Discover the current Notion MCP schemas before calling its tools.
2. Read the current `notion://docs/enhanced-markdown-spec` MCP resource.
3. Fetch the page and its parent data source.
4. Query the data source for duplicate slugs and related pages.
5. Read `.cursor/skills/notion-technical-writing/notionnext-capabilities.md`.

If authentication or permission is definitively denied, report it once and stop. Do not work around missing access with browser automation.

## Checks common to every stage

### Properties

- `type=Post`;
- status equals the requested stage;
- title and slug are non-empty;
- slug is stable, URL-safe, and unique;
- summary accurately describes the reader outcome;
- date, category, and tags use valid data-source options;
- any article password is treated only as a UI gate, not a confidentiality control;
- companion pages have stable slugs and the intended `Invisible` status.

Draft is a valid workflow value and is excluded from normal `allPages` discovery, but UUID fallback routes can bypass that listing filter. Draft content must not be confidential.

### Content

- first screen establishes a concrete problem or scenario, identifiable actors, and why it matters;
- specialized terms and acronyms are defined before first reliance, normally at first use;
- terms appear in dependency order before later sections rely on them;
- a complete causal chain is traceable from actors and inputs through mechanisms or checks to observable results, or its absence is justified;
- headings answer reader questions and form a causal narrative with no duplicate manual TOC;
- code, diagrams, tables, Toggles, Callouts, and checklists support rather than replace the explanation;
- recommended defenses map to named failure conditions and state their limits;
- material claims state conditions and limits;
- standards and implementation-specific claims are separated;
- a concise causal conclusion appears before sources or deeper reading;
- sources and deeper reading do not interrupt the top-level narrative;
- companion pages may be short but remain locally understandable, and the main article does not outsource essential definitions;
- sources are primary or authoritative and support the associated claims.

### Blocks

- block choices are listed as supported in `.cursor/skills/notion-technical-writing/notionnext-capabilities.md`;
- Mermaid language is lowercase `mermaid`;
- Toggle children are indented and locally understandable;
- tables contain short rich text and are not excessively wide;
- multi-item numeric comparisons do not pack multiple models/scores into one cell; charts or ranked visuals are present when ≥3 comparable numbers are the point;
- equations have plain-language explanations;
- images have captions or adjacent explanatory text;
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
- Review the Notion content, properties, evidence, and rich-block structure.
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
- Blocking issues:
- Warnings:

## Properties

- Check: Pass / Fail — evidence

## Content and Evidence

- Check: Pass / Fail — section anchor

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

`Pass` requires no unresolved blocker or major review finding and all checks applicable to the current stage. Keep warnings visible.
