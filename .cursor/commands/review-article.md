# Review Article

Use this command to review an existing Notion article without changing it unless the user separately requests fixes.

## Required reading

1. `@.cursor/workflows/article-workflow.md` — review-only path
2. `@.cursor/skills/notion-technical-writing/SKILL.md`
3. `@.cursor/checklists/article-review.md`
4. `@.cursor/agents/article-reviewer.md`

## Required behavior

1. Treat `$ARGUMENTS` as a Notion page URL, page ID, slug, or review objective.
2. Fetch the page, its data source schema, and relevant companion or comparison articles.
3. Load the approved plan Claim Matrix when available; otherwise reconstruct material claims and require primary sources before clearing evidence findings.
4. Spot-check important technical claims against primary or authoritative sources (open the sources; do not trust citation text alone).
5. Review the actual Notion content and metadata, not a stale copied draft.
6. Evaluate readability and structure independently from technical correctness: opening scenario, actors, terminology order, causal chain, question-driven headings, defense-to-failure mapping where applicable, rich-block support, conclusion, source placement, length budget, and companion definition boundaries.
7. Classify readability and structure findings by reader impact, not stylistic preference. Treat missing matrix coverage, unsupported claims, `low`/`Unknown` in the main conclusion, and stale time-sensitive facts as `major` or worse.
8. Return severity-tagged findings anchored to page properties or section headings.
9. Optional: after editorial review, run `@.cursor/skills/verify-notion-article/SKILL.md` only for mechanical publishing hygiene if the user asked for a full gate check. Do not duplicate narrative review inside verify.
10. Do not edit the page, upload assets, or change status during review-only work.

An article is ready for the next gate only when it has no blocker or major findings. Minor and nit findings remain visible for the user to accept or schedule.
