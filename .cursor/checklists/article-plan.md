# Article Plan Checklist

The plan is not ready for approval until every applicable item is answered.

## Objective and reader

- [ ] One target reader is named.
- [ ] One main reader question is explicit.
- [ ] The intended reader outcome is observable.
- [ ] In-scope and out-of-scope topics are listed.
- [ ] A concrete scenario and stable actors are defined.
- [ ] Length budget is `short`, `standard`, or justified `long`.

## Investigation and evidence hard gate

- [ ] `article-researcher` (or equivalent Claim Matrix) was produced; research was not skipped.
- [ ] The destination data source schema was fetched.
- [ ] Related Notion articles and possible companion pages were inspected.
- [ ] Repository behavior was inspected where implementation-specific claims are planned.
- [ ] Every material claim has a Claim Matrix row with URL or `path:line`.
- [ ] Confidence and `Allowed in main conclusion` are set; `low` / Unknown cannot drive the main conclusion.
- [ ] `Evidence as of` is recorded; time-sensitive topics list pre-Draft re-fetch URLs.
- [ ] Conditions, exceptions, and unresolved questions are recorded.
- [ ] Generic standards are separated from company- or project-specific behavior.

## Structure

- [ ] Concepts appear in dependency order.
- [ ] The end-to-end causal chain identifies actors, actions or inputs, mechanisms or checks, and results.
- [ ] The outline answers one reader question per section instead of using topic labels alone.
- [ ] Scope / “本文不写什么” text earns its space for the target reader (or is cut); no leftover framing from a cancelled dual-track or companion that no longer helps.
- [ ] When defenses or mitigations are recommended, each maps to the failure condition it addresses, with conditions and limits.
- [ ] The main article owns a bounded question.
- [ ] Optional depth is assigned to Toggles or companion posts without outsourcing definitions essential to the main article.
- [ ] Intentionally short companion pages remain locally understandable and define the terms they use.
- [ ] Narrative H2 count matches the length budget (prefer Toggles over extra H2s).
- [ ] A concise causal conclusion is planned before sources or deeper reading.
- [ ] Sources are outside the top-level narrative.
- [ ] The outline does not include a manual table of contents.
- [ ] The outline follows the golden-sample narrative pattern without copying unrelated security framing.

## Notion and delivery

- [ ] Relationships, mechanisms, comparisons, rankings, and multi-step evolutions budget a visual (or the plan explicitly justifies prose-only).
- [ ] Every proposed rich block has an explanatory purpose; diagram type is chosen for clarity, not by a fixed mapping.
- [ ] Multi-model or multi-price comparisons budget a chart/ranked visual (Mermaid `xychart-beta` or tracked image); if skipped, the plan justifies a short one-number-per-cell table.
- [ ] No planned table cell packs multiple models or multiple scores into one unreadably long string.
- [ ] All proposed blocks exist in `.cursor/skills/notion-technical-writing/notionnext-capabilities.md` (unconfirmed Mermaid types need public-route verification or a fallback).
- [ ] Title, slug, summary, date, category, tags, Cover concept, and intended status are proposed.
- [ ] Canonical and companion links use `/article/<slug>`.
- [ ] Content review, Invisible preview, and publication checks are defined.
- [ ] Approval status is `draft` or `ready-for-review`, not self-approved.
