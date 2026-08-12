# Article Review Checklist

This is the canonical criteria list for `article-reviewer`.

## Correctness

- [ ] Every material technical claim is accurate.
- [ ] Conditions, actors, mechanisms, and exceptions are explicit.
- [ ] Examples demonstrate only what the prose claims.
- [ ] Standards are not confused with one implementation.
- [ ] Security threat models and failure boundaries are stated.

## Completeness

- [ ] The article answers its main question.
- [ ] Specialized terms and acronyms are defined at first use.
- [ ] No section relies on an undefined term from a distant page or toggle.
- [ ] Important alternatives and edge cases are included or deliberately scoped out.
- [ ] Main and companion articles have distinct ownership without harmful duplication.

## Evidence

- [ ] Material claims map to primary or authoritative sources.
- [ ] Sources actually support the nearby claim.
- [ ] Time-sensitive behavior is qualified and current enough.
- [ ] Repository-specific claims have `path:line` evidence where practical.
- [ ] Unverified company-specific behavior is not presented as fact.

## Readability and structure

- [ ] The first screen uses a concrete problem or scenario to explain why the reader should care.
- [ ] The scenario and actors remain consistent.
- [ ] Specialized terms appear in dependency order before later sections rely on them.
- [ ] The complete causal chain is traceable from actors and inputs through mechanisms or checks to observable results, or its absence is justified.
- [ ] For browser-security flows, request sending, credential attachment, response readability, and server acceptance are separated where applicable.
- [ ] Main headings answer reader questions rather than merely label topics.
- [ ] Code, diagrams, tables, Toggles, and Callouts support rather than replace explanation.
- [ ] Each recommended defense maps to the failure condition it mitigates and states its limits.
- [ ] A concise causal conclusion follows the explanation.
- [ ] Sources and deeper reading do not interrupt the top-level narrative.
- [ ] Companion pages may be short but remain locally understandable and do not outsource essential definitions.
- [ ] Heading hierarchy forms a narrative and contains no duplicate manual TOC.

Classify readability and structure findings by reader impact: use `major` when the target reader cannot follow the main question or mechanism, `minor` for localized clarity or flow defects, and `nit` for optional style preferences.

## Notion and publishing hygiene

- [ ] Required metadata is complete and the slug is unique.
- [ ] Status matches the current workflow gate.
- [ ] Rich blocks are supported by Notion MCP and this NotionNext renderer.
- [ ] Existing renderer-only blocks were preserved rather than recreated through unsupported MCP syntax.
- [ ] Images and diagrams have useful captions or nearby explanations.
- [ ] Companion and canonical links use `https://ximouzhao.com/article/<slug>`.
- [ ] No bare Notion UUID, temporary signed asset URL, or `blog.ximouzhao.com` link remains.
- [ ] Cover source and attached Cover agree when a Cover is required.
- [ ] No confidential material is presented as protected by Draft, Invisible, or an article password.

## Decision

- **Ready for next gate**: zero blocker and zero major findings.
- **Request changes**: any blocker or major remains.
- Always report minor and nit findings for the user's decision.
