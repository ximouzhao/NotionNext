# Article Plan Workflow

This workflow produces a reviewable article plan and stops before any Notion mutation.

## Completion condition

Planning is complete when:

1. the audience, reader question, scope, and intended outcome are explicit;
2. the destination data source and related articles have been inspected;
3. important claims have evidence and stated boundaries;
4. the narrative outline and Notion block design are reviewable;
5. `.tmp/article-plans/<timestamp>-<slug>.md` has been presented to the user.

## Phase 1 — Intake and classification

Classify the request:

- **Localized edit**: typo, wording correction, or one broken link. A full plan is optional.
- **Standard article**: one main question and a bounded subject. Use parent-led planning with an `article-researcher`.
- **Complex article**: security-sensitive claims, unfamiliar subject, multi-article series, competing technical interpretations, or significant codebase investigation. Use `article-planner`, which must obtain focused research evidence.

Record the target reader, what they should understand or do afterward, and what is out of scope.

## Phase 2 — Investigation

Before outlining:

1. Fetch the destination Notion data source schema and confirm exact property names and options.
2. Inspect related pages for terminology, overlap, canonical links, and companion-page opportunities.
3. Inspect relevant repository behavior when the article describes this NotionNext deployment.
4. Prefer standards, official documentation, maintained project documentation, peer-reviewed work, or authoritative security guidance.
5. Build a claim matrix containing:
   - claim;
   - source;
   - conditions and exceptions;
   - confidence;
   - whether the claim belongs in the main flow, a toggle, or a companion article.

Mark unresolved questions; do not fill gaps with plausible-sounding details.

## Phase 3 — Narrative and block design

Design in dependency order:

1. concrete scenario or reader problem;
2. actors and normal behavior;
3. an end-to-end causal chain, with one reader question per section;
4. minimal example after the behavior is understandable;
5. where applicable, defenses mapped to the failure conditions they mitigate;
6. conditions, exceptions, and threat-model boundaries;
7. practical checklist and concise causal conclusion;
8. sources and deeper reading outside the top-level narrative.

For browser-security flows, the default causal chain separates whether a request can be sent, whether credentials may attach, whether the initiating script can read the response, and whether the server accepts or rejects the operation. Adapt the same actor → action/input → mechanism/check → result pattern for other mechanistic topics.

Companion pages may be intentionally short, but every page must define the terms it uses. Keep definitions essential to the main question in the main article rather than outsourcing them to a companion.

Choose Notion blocks deliberately. The plan must state where Callouts, Mermaid, code, tables, Toggles, equations, images, captions, quotes, columns, or checklists improve comprehension. Use only capabilities listed in `.cursor/skills/notion-technical-writing/notionnext-capabilities.md`.

## Phase 4 — Plan artifact and hard stop

The parent writes the plan from `.cursor/templates/article-plan.md` to:

`.tmp/article-plans/<timestamp>-<slug>.md`

Set approval status to `draft` or `ready-for-review`, never `approved` on the user's behalf. Present the path and a short summary, ask for explicit approval, and stop.

Do not create or update a Notion page, upload a Cover, set `Invisible`, or publish during this workflow.
