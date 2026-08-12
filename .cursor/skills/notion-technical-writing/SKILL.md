---
name: notion-technical-writing
description: Writes and revises clear, rigorous technical blog posts and Notion drafts for this NotionNext project. Use when the user asks to write, edit, review, structure, or publish a tutorial, technical article, blog post, Notion draft, or article cover image.
---

# Notion Technical Writing

Write for readers who are curious but do not already know the terminology. Keep the main article easy to follow without weakening technical claims; put depth in well-scoped sections, toggles, or linked companion posts.

## Workflow entrypoints

- Planning only: `.cursor/workflows/article-plan-workflow.md`
- Full Draft → review → Invisible preview → publication flow: `.cursor/workflows/article-workflow.md`
- Supported Notion blocks: `.cursor/skills/notion-technical-writing/notionnext-capabilities.md`
- Saved-page and public-render verification: `../verify-notion-article/SKILL.md`
- Cover upload: `../upload-notion-cover/SKILL.md`

New or substantially revised articles require an approved plan before a Notion write. New pages start as `Draft`; substantial revisions of live articles use a staging copy. Preview, revision deployment, and publication are separate user approval gates.

## Core rules

1. Start with one concrete scenario, question, or failure case. Carry the same actors through the article.
2. Introduce concepts in dependency order: observable behavior → plain-language explanation → formal name → exact mechanism and boundaries.
3. On first use, write the Chinese name, English full name, abbreviation, and a one-sentence explanation.
   - Example: `CSRF（Cross-Site Request Forgery，跨站请求伪造）`
   - Example: `同源策略（Same-Origin Policy，SOP）`
4. Never rely on a definition from a distant section. A toggle, table row, or companion post must define the terms it uses.
5. Replace vague claims with conditions. State who acts, what the browser or server checks, and when the behavior does or does not happen.
6. Distinguish generic web standards from a specific company's implementation. Do not claim knowledge of non-public APIs, fields, or security controls.

## Recommended main-article structure

Use this sequence unless the subject needs a materially different one:

1. A concrete problem the reader can recognize
2. The actors and the normal flow
3. One question per main section, answered with a causal explanation
4. A minimal, clearly labelled technical example after the reader understands the behavior
5. Exact conditions, exceptions, and threat-model boundaries
6. A practical checklist and short causal summary
7. Sources and deeper reading

Keep the heading outline narrative (NotionNext builds the site TOC from these headings):

- Use no more than 6–8 top-level headings.
- Use level-2 headings only for detail under the immediately preceding main question.
- Do not make “References”, a code sample, or a minor aside a top-level section.
- Treat CORS, browser edge cases, and advanced variants as extensions unless they are the main question.
- Do not place a Notion TOC block or outline image at the top; the site generates progress navigation automatically.

## Terminology and rigor

- Define `Origin` as `scheme + host + port`; say that paths are not part of an Origin.
- Do not conflate **same-origin** with **same-site**, or either with Cookie matching.
- When discussing Cookies, name the relevant attributes: `Domain`/host-only matching, `Path`, `Secure`, `HttpOnly`, and `SameSite`.
- Explain `SameSite` as a Cookie attribute set through `Set-Cookie`. Define `Strict`, `Lax`, and `None; Secure` before relying on them.
- When describing browser security, separate:
  - whether a cross-site request can be sent;
  - whether credentials can be attached;
  - whether the initiating script can read the response.
- When discussing CSRF, make clear that it commonly borrows automatic credentials; it does not require stealing the Cookie value.
- Explain that CORS primarily controls browser-script access to cross-origin responses and Fetch/XHR permission paths; it is not general CSRF protection.
- State important boundaries, such as XSS defeating a Token that a same-origin script can read.

## Examples, figures, and sources

- Use reserved example domains such as `pay.example.com` and `evil.example`; never include real payment endpoints or claim a real provider uses a specific hidden field.
- Explain each line of code that matters. Label examples as demonstrations, not proof that every site is vulnerable.
- Prefer simple diagrams that preserve one scenario and one action per step.
- Use exact, reviewable SVG or Mermaid diagrams for labelled security flows; do not use text-heavy generative images.
- Cite primary or authoritative sources (MDN, OWASP, standards) for browser behavior and security guidance.

## NotionNext publishing workflow

1. Inspect the destination database schema before writing.
2. Read the current `notion://docs/enhanced-markdown-spec` MCP resource and intersect it with `.cursor/skills/notion-technical-writing/notionnext-capabilities.md`.
3. Create new articles as `Post` with `status=Draft` unless the user explicitly requests publication.
4. Stage substantial revisions of a `Published` page in a separate Draft copy; deploy the approved body, properties, and any approved Cover change to the original canonical page only after explicit approval and target revalidation.
5. Use Notion callouts, headings, short tables, toggles, code blocks, and diagrams to support—not replace—the narrative.
6. **Do not insert a manual table of contents at the top of the article.** NotionNext already generates the in-page progress catalog / TOC from headings. Never add:
   - a Notion `<table_of_contents/>` block
   - a pasted screenshot or image of the outline
   - a hand-written bullet list that only restates upcoming headings
   Start the body with the opening scenario / callout, then the first real section heading.
7. For companion pages, create separate database `Post` rows with a stable `slug` and `status=Invisible`.
8. Link companion pages with the public site route `https://ximouzhao.com/article/<slug>` (for example `https://ximouzhao.com/article/cors-and-csrf`). Never use `https://blog.ximouzhao.com/...` (origin-only host), bare `https://ximouzhao.com/<slug>`, Notion page URLs, or omit the `/article/` prefix. Do not use native Notion child pages as the site hierarchy.
9. After writing, fetch the page and run `verify-notion-article`; Notion UI correctness does not prove NotionNext rendering.
10. Treat `Draft`, `Invisible`, and the site's article password as workflow/UI controls, not confidentiality boundaries. Never store confidential material in this site database.
11. Use `Invisible` only after explicit approval for public-site preview.
12. Set a main article to `Published` only after a separate explicit publication approval.

## Article cover images

Generate per-article Notion covers when the user asks. Fetch the target page and inspect its slug and current Cover first. Replacing any existing Cover—including a stock gallery Cover—requires explicit approval and the script's replacement flag.

### Capability limits

- The Hosted Notion MCP cannot attach its uploaded file as a page Cover because its `cover` field accepts only external URLs.
- Notion's official API does support `file_upload` Covers; use the official `ntn` CLI through `../upload-notion-cover/SKILL.md` and `scripts/notion/upload-page-cover.mjs`.
- Do **not** insert a temporary image into the page body and promote it to Cover.
- Do **not** use a one-hour signed Notion download URL as an external Cover.

### Visual style

- Flat vector editorial / technical illustration; one clear left-to-right story matching the article topic.
- Palette: deep slate navy background (`#0F172A`), teal accents for the “safe / trusted” side, restrained red for threat when needed, optional amber highlight for a key token or focus mark.

### Aspect ratio and composition (validated)

Notion covers are wide banners. Do not ship raw tall 16:9 crops that look cut off.

1. Generate at `16:9`, but compose as a **wide banner story**.
2. Keep the illustration fairly large and centered: leave modest empty navy padding on top and bottom so browser chrome, form tops/bottoms, and panel edges stay fully visible. Do **not** shrink the scene too small; padding is for completeness, not for making a tiny graphic in a sea of empty space.
3. Lay the narrative **left → right** in one horizontal strip. Do not stack important elements vertically.
4. Post-process onto a **3:1** canvas (e.g. `2400×800`): fit the full artwork inside the banner with light padding; do **not** hard-crop through UI frames. Prefer filling most of the banner height (about 88–92% of canvas height) while still showing full panel edges.
5. Approved reference approach: a wide dark canvas with a clearly readable centered scene—not edge-to-edge clipping, and not an over-shrunk miniature.

### Output directory

- Save final deliverable Covers under `public/images/covers/` so they are version-controlled and reusable by the site.
- Filename: `cover-<slug-or-short-id>.png` (prefer article `slug` when present).
- Keep intermediate generation files outside the tracked Cover directory; only the padded **3:1** deliverable belongs in `public/images/covers/`.

### Workflow checklist

- [ ] Confirm target page title, exact slug, and existing Cover state.
- [ ] Obtain explicit approval before replacing any existing Cover.
- [ ] Match cover metaphor to the article’s concrete scenario.
- [ ] Verify browser/panel frames are fully visible after the 3:1 fit (no clipped tops/bottoms), without over-shrinking the scene.
- [ ] Place the final file in `public/images/covers/cover-<slug>.png`.
- [ ] Run the Cover uploader dry run, upload only after authorization, and fetch the page to verify the attached Notion-hosted Cover.

## Pre-publication review

- [ ] The first screen explains why the reader should care.
- [ ] Every acronym and specialized term is defined where it first appears.
- [ ] The article answers one question at a time and preserves the scenario.
- [ ] Each security claim has its conditions and limits.
- [ ] Website-specific claims are either sourced or explicitly framed as a generic pattern.
- [ ] Heading hierarchy reads like a story, not an unstructured outline; NotionNext will derive the site TOC from it.
- [ ] The page does not begin with `<table_of_contents/>`, a TOC screenshot, or a duplicate outline list.
- [ ] Main article and companion links use `https://ximouzhao.com/article/<slug>` and the intended NotionNext status.
- [ ] Independent review has no blocker or major findings.
- [ ] Invisible preview and Published status changes have the required separate user approvals.
