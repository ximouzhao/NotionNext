# Notion Article Workflow

This is the end-to-end workflow for writing, substantially revising, previewing, and publishing technical articles in this repository's NotionNext site.

## Objective

Deliver a technically rigorous, readable, and structurally coherent Notion article whose scenario, actors, causal chain, conclusion, metadata, rich blocks, links, Cover, and public rendering have been verified. The workflow is not complete merely because a Notion page exists.

## Quick start

- New article or substantial rewrite: `/write-article <topic, audience, and desired outcome>`
- Plan without writing to Notion: `/plan-article <topic or question>`
- Review an existing page: `/review-article <Notion URL or slug>`

For ordinary chat, the same intent also triggers `notion-technical-writing`; the commands are preferred when the user wants an explicit workflow entrypoint.

## Phase 1 — Choose the path

- **New or substantial article**: run the full planning path.
- **Localized correction**: the user may authorize a direct edit; still fetch the current page first, preserve unrelated content, review the resulting scope, and verify it.
- **Review only**: fetch and report findings; make no mutations.

For the full path, follow `article-plan-workflow.md` and wait for explicit approval of the plan.

## Phase 2 — Research and plan

Use `article-researcher` for evidence gathering. Use `article-planner` for security-sensitive, unfamiliar, multi-page, or structurally complex work. The parent owns the artifact at `.tmp/article-plans/<timestamp>-<slug>.md`.

The approved plan must define:

- audience, main question, scenario, and scope;
- terminology dependency order;
- an end-to-end causal chain;
- question-driven heading narrative;
- defense-to-failure mapping where applicable;
- concise conclusion and non-narrative source placement;
- claims and authoritative sources;
- main versus companion-page ownership without outsourcing essential definitions;
- Notion block choices;
- metadata and intended final status;
- validation and Cover requirements.

## Phase 3 — Draft

1. Fetch the data source immediately before writing.
2. Read the current `notion://docs/enhanced-markdown-spec` MCP resource immediately before generating Notion content. Apply the stricter rule wherever it differs from the repository capability matrix.
3. Confirm the slug is stable and unique.
4. Ask `article-writer` for Notion-flavored Markdown based only on the approved plan and evidence, following the causal-narrative and readability rules in `.cursor/skills/notion-technical-writing/SKILL.md`.
5. The parent creates or updates the page through the Notion MCP.
6. New pages use:
   - `type=Post`;
   - `status=Draft`;
   - complete title, slug, summary, date, category, and tags.
7. Fetch the saved page and compare it with the intended structure.

For a substantial revision of an existing `Published` article:

1. Warn that editing the original page changes live content after cache propagation.
2. Create a separate `Draft` staging copy with a unique temporary slug.
3. Continue Phases 4–6 against the staging copy, including its Cover and `Invisible` public-render preview.
4. Do not deploy to the original page during the Draft phase.

A localized live edit may update the original page only after the user accepts immediate visibility. Temporarily changing the original away from `Published` is a downtime decision and requires explicit approval. Never overwrite unrelated content.

## Phase 4 — Independent review loop

Run `article-reviewer` in a fresh context against the fetched page, approved plan, claim evidence, data source schema, and relevant repository constraints.

Review categories:

- correctness;
- completeness;
- evidence;
- readability;
- structure;
- risk;
- publishing hygiene.

Severity controls the gate:

- `blocker` and `major`: must be fixed before preview or publication;
- `minor` and `nit`: remain visible and may be accepted by the user.

Apply severity by reader impact to readability and structure findings: a broken causal explanation or undefined essential concept can be `major`; a localized flow or heading issue is normally `minor`.

After each review-driven change, fetch the page and rerun verification before a new independent review. Stop after three rounds and ask the user whether to accept remaining non-blocking findings or continue. Never let the writer approve its own draft.

## Phase 5 — Cover

When the approved plan or user requests a Cover:

1. create a 3:1 deliverable at `public/images/covers/cover-<slug>.png`;
2. keep the composition compatible with Notion's wide crop;
3. visually inspect the final local image;
4. follow `.cursor/skills/upload-notion-cover/SKILL.md`;
5. fetch the page and verify a Notion-hosted Cover is attached.

The tracked file is the version-controlled source used by the site; the attached Notion file is the page Cover. Never use a temporary signed download URL as the Cover source.

## Phase 6 — Invisible preview

`Draft` pages are excluded from normal slug discovery by this NotionNext deployment, so real site rendering normally requires an `Invisible` preview. This workflow state is not an access-control boundary.

1. Explain that `Draft`, `Invisible`, and the site's article password are workflow/UI controls, not reliable confidentiality controls; UUID routes or client-delivered block data may expose content.
2. Obtain explicit approval to change `Draft` to `Invisible`.
3. Verify `https://ximouzhao.com/article/<slug>` after cache propagation.
4. Check desktop and narrow layouts, light and dark themes when practical, TOC, Mermaid, equations, code, tables, Toggles, images, captions, embeds, and internal links.
5. Resolve preview defects and repeat content verification.

Do not place confidential material in this site database. Use a genuinely access-controlled workspace or implement server-side authorization before storing content that requires confidentiality.

## Phase 7 — Publication

For a new main article, ask for a separate explicit decision before setting `Published`. Companion pages may intentionally remain `Invisible`.

For a staged revision of an existing `Published` article:

1. after Phases 4–6 pass, decide whether to preserve or replace the canonical Cover and obtain explicit deployment and replacement approval before any canonical mutation;
2. fetch and record the original body, properties, and Cover as a rollback snapshot; include authorization to restore body/properties if the deployment becomes partial;
3. if the Cover changes, run the Cover script's local dry run and authenticated `--preflight-only` check against the original page and canonical slug before changing its body;
4. copy the approved body and properties to the original page while preserving its canonical slug and `Published` status;
5. if approved, upload the tracked Cover to the original page; the actual upload repeats target preflight before upload and attachment;
6. if any step fails, fetch the canonical page to determine the exact state. Restore the captured body/properties when they changed but the Cover did not. Never restore a Cover from a temporary signed URL; if Cover state is uncertain, stop and ask with the observed state;
7. fetch and verify the original page, including its Cover, immediately after deployment;
8. keep, archive, or remove the staging copy only according to a separate user decision.

Notion body updates and Cover attachment are separate operations, not one transaction. Report this deployment window rather than claiming atomicity.

After publication:

1. fetch the Notion page;
2. verify the canonical route;
3. verify title, summary, category, tags, Cover, headings, links, and sources;
4. check expected homepage/category/tag visibility for `Published`;
5. account for ISR/cache delay rather than declaring failure immediately;
6. create `.tmp/article-reports/<timestamp>-<slug>.md` from `.cursor/templates/article-report.md`.

Do not create a Git commit unless the user explicitly requests one.
