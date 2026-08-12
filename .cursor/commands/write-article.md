# Write Article

Use this command to run the complete Notion technical-article workflow for a new article or substantial revision.

## Required reading

1. `@.cursor/rules/article-workflow-gates.mdc`
2. `@.cursor/workflows/article-workflow.md`
3. `@.cursor/skills/notion-technical-writing/SKILL.md`
4. `@.cursor/checklists/article-completion.md`

## Required behavior

1. Treat `$ARGUMENTS` as the article objective. If empty, use the current conversation.
2. Investigate and produce an article plan unless the request is a localized typo or single-link correction.
3. Wait for explicit plan approval before creating or substantially updating a Notion page.
4. Create new articles with `type=Post` and `status=Draft`.
5. For a substantial revision of a `Published` page, use a separate Draft staging copy; do not take the original offline or expose unreviewed changes.
6. Run independent article review and resolve all blocker and major findings.
7. If a Cover is requested, create the tracked asset and follow `@.cursor/skills/upload-notion-cover/SKILL.md`.
8. Ask before changing a staging page to `Invisible`, before deploying a revision—including any Cover replacement—to the canonical page, and before changing a new main article to `Published`.
9. Verify the final page with `@.cursor/skills/verify-notion-article/SKILL.md` and produce an execution report.

Never publish implicitly. Approval of an outline, Draft, review fix, or Cover is not approval to set `Published`.
