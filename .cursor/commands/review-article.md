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
3. Verify important technical claims against primary or authoritative sources.
4. Review the actual Notion content and metadata, not a stale copied draft.
5. Return severity-tagged findings anchored to page properties or section headings.
6. Do not edit the page, upload assets, or change status during review-only work.

An article is ready for the next gate only when it has no blocker or major findings. Minor and nit findings remain visible for the user to accept or schedule.
