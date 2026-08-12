# Plan Article

Use this command to investigate and design a technical article without creating or updating a Notion page.

## Required reading

1. `@.cursor/workflows/article-plan-workflow.md`
2. `@.cursor/skills/notion-technical-writing/SKILL.md`
3. `@.cursor/checklists/article-plan.md`
4. `@.cursor/templates/article-plan.md`

## Required behavior

1. Treat `$ARGUMENTS` as the topic or revision objective. If empty, use the current conversation.
2. Inspect the destination Notion data source schema and relevant existing articles.
3. Gather authoritative evidence with `article-researcher`; use `article-planner` for security-sensitive, unfamiliar, multi-page, or structurally complex work. The parent may plan a standard article directly from the evidence.
4. Require the plan to define a concrete scenario and actors, terminology order, end-to-end causal chain, question-driven headings, defense-to-failure mapping where applicable, a concise conclusion, non-narrative source placement, and companion-page definition boundaries.
5. Write `.tmp/article-plans/<timestamp>-<slug>.md`.
6. Present the plan for explicit user approval, then stop.

Planning approval is not permission to write to Notion. Do not create pages, alter page content or properties, upload a Cover, or change publication status in this command.
