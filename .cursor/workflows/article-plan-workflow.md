# Article Plan Workflow

This workflow produces a reviewable article plan and stops before any Notion mutation.

## Completion condition

Planning is complete when:

1. the audience, reader question, scope, length budget, and intended outcome are explicit;
2. the destination data source and related articles have been inspected;
3. every material claim has a Claim Matrix row with evidence and stated boundaries;
4. time-sensitive topics list `Evidence as of` and pre-Draft re-fetch URLs;
5. the narrative outline and Notion block design are reviewable;
6. `.tmp/article-plans/<timestamp>-<slug>.md` has been presented to the user.

## Phase 1 — Intake and classification

Classify the request:

- **Localized edit**: typo, wording correction, or one broken link. A full plan is optional, but any changed material fact still needs a Claim Matrix row.
- **Standard article (default)**: one main question and a bounded subject. Use **parent-led** planning with `article-researcher`. Do not start `article-planner` unless the work upgrades to complex.
- **Complex article**: security-sensitive claims, unfamiliar subject, multi-article series, competing technical interpretations, or significant codebase investigation. Use `article-planner`, which must obtain focused research evidence.

Record the target reader, what they should understand or do afterward, out of scope, and length budget (`short` | `standard` | `long`).

## Phase 2 — Investigation

Before outlining:

1. Fetch the destination Notion data source schema and confirm exact property names and options.
2. Inspect related pages for terminology, overlap, canonical links, and companion-page opportunities.
3. Inspect relevant repository behavior when the article describes this NotionNext deployment.
4. Prefer standards, official documentation, maintained project documentation, peer-reviewed work, or authoritative security guidance.
5. Build a Claim Matrix containing:
   - claim;
   - source (URL or `path:line`);
   - conditions and exceptions;
   - confidence (`high` / `medium` / `low`);
   - whether it may enter the main conclusion;
   - whether the claim belongs in the main flow, a toggle, or a companion article.
6. Set `Evidence as of: YYYY-MM-DD`. For pricing, model IDs, live API behavior, and benchmarks, list URLs that must be re-fetched immediately before Draft.

Mark unresolved questions; do not fill gaps with plausible-sounding details. `low` / `Unknown` items cannot drive the planned main conclusion.

## Phase 3 — Narrative and block design

Design in dependency order, using the skill's golden-sample narrative pattern:

1. concrete scenario or reader problem;
2. actors and normal behavior;
3. an end-to-end causal chain, with one reader question per section;
4. minimal example after the behavior is understandable;
5. where applicable, defenses mapped to the failure conditions they mitigate;
6. conditions, exceptions, and threat-model boundaries;
7. practical checklist and concise causal conclusion;
8. sources and deeper reading outside the top-level narrative.

Stay inside the length budget. Prefer Toggles over extra H2s. Companion pages may be intentionally short, but every page must define the terms it uses. Keep definitions essential to the main question in the main article.

Choose Notion blocks deliberately. The plan must state where Callouts, Mermaid, code, tables, Toggles, equations, images, captions, quotes, columns, or checklists improve comprehension. Use only capabilities listed in `.cursor/skills/notion-technical-writing/notionnext-capabilities.md`. When the article compares ≥3 models, prices, or latencies of the same kind, the plan must budget a chart or ranked visual (Mermaid `xychart-beta` or tracked image) instead of packing scores into one table cell.

## Phase 4 — Plan artifact and hard stop

The parent writes the plan from `.cursor/templates/article-plan.md` to:

`.tmp/article-plans/<timestamp>-<slug>.md`

Set approval status to `draft` or `ready-for-review`, never `approved` on the user's behalf. Present the path and a short summary, ask for explicit approval, and stop.

Do not create or update a Notion page, upload a Cover, set `Invisible`, or publish during this workflow.
