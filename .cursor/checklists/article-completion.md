# Article Completion Checklist

Do not declare the article workflow complete until every applicable item is satisfied or explicitly reported as blocked.

## Plan and scope

- [ ] Approved plan path is recorded, or localized direct-edit authorization is recorded.
- [ ] The final article stays within the approved scope.
- [ ] Research evidence and unresolved assumptions are recorded.

## Notion Draft

- [ ] The destination schema was fetched immediately before writing.
- [ ] The current Notion enhanced Markdown specification was read before generating content.
- [ ] Title, type, status, slug, summary, date, category, and tags are correct.
- [ ] The saved page was fetched after writing.
- [ ] Unrelated existing content and properties were preserved.
- [ ] A substantial revision of a Published page used an approved staging/deployment path.

## Review

- [ ] An independent article reviewer inspected the fetched page.
- [ ] No blocker or major findings remain.
- [ ] Review-driven changes were fetched and revalidated.
- [ ] Remaining minor and nit findings are recorded with the user's decision.
- [ ] Review completed within three rounds, or the user chose to continue.

## Narrative and structure

- [ ] The saved page preserves the approved scenario, actors, terminology order, and end-to-end causal chain.
- [ ] Main headings answer reader questions, and rich blocks support rather than replace the explanation.
- [ ] Recommended defenses map to named failure conditions and state their limits.
- [ ] A concise causal conclusion appears before sources or deeper reading.
- [ ] Companion pages remain locally understandable and do not outsource essential definitions.
- [ ] Independent review classified readability and structure findings by reader impact.

## Cover

- [ ] Cover is not required, or a 3:1 asset exists at `public/images/covers/cover-<slug>.png`.
- [ ] The tracked image was visually checked.
- [ ] Target page slug and existing Cover state were preflighted; any replacement was explicitly approved.
- [ ] Upload succeeded without exposing the Notion Token.
- [ ] A subsequent Notion fetch confirms the attached Cover.
- [ ] For a staged revision, the final canonical page preserved its Cover or received the separately approved Cover replacement.

## Preview and publication

- [ ] The user approved any change to `Invisible`.
- [ ] Invisible preview was checked on the canonical route.
- [ ] Core blocks, TOC, links, responsive layout, and theme behavior render correctly.
- [ ] A new article has explicit `Published` approval, a staged revision has explicit deployment approval, or the intended final status is `Invisible`.
- [ ] Final Notion properties and public route were rechecked after the last status change.
- [ ] Expected homepage/category/tag/SEO behavior was checked for Published articles.
- [ ] No confidential material relies on Draft, Invisible, or an article password for protection.

## Handoff

- [ ] `.tmp/article-reports/<timestamp>-<slug>.md` records facts, not assumed results.
- [ ] Repository Cover changes and unrelated pre-existing changes are distinguished.
- [ ] No secret or temporary signed URL appears in tracked files or the report.
- [ ] No commit was created unless the user explicitly requested one.
