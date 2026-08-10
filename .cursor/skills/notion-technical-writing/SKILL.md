---
name: notion-technical-writing
description: Writes and revises clear, rigorous technical blog posts and Notion drafts for this NotionNext project. Use when the user asks to write, edit, review, structure, or publish a tutorial, technical article, blog post, or Notion draft.
---

# Notion Technical Writing

Write for readers who are curious but do not already know the terminology. Keep the main article easy to follow without weakening technical claims; put depth in well-scoped sections, toggles, or linked companion posts.

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

Keep the Notion table of contents narrative:

- Use no more than 6–8 top-level headings.
- Use level-2 headings only for detail under the immediately preceding main question.
- Do not make “References”, a code sample, or a minor aside a top-level section.
- Treat CORS, browser edge cases, and advanced variants as extensions unless they are the main question.

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
2. Create new articles as `Post` with `status=Draft` unless the user explicitly requests publication.
3. Use Notion callouts, headings, short tables, toggles, code blocks, and diagrams to support—not replace—the narrative.
4. For companion pages, create separate database `Post` rows with a stable `slug` and `status=Invisible`.
5. Link companion pages with the configured public site URL plus slug. Do not use native Notion child pages as the site hierarchy.
6. After writing, fetch the page to verify properties, heading hierarchy, links, images, and first-use definitions.

## Pre-publication review

- [ ] The first screen explains why the reader should care.
- [ ] Every acronym and specialized term is defined where it first appears.
- [ ] The article answers one question at a time and preserves the scenario.
- [ ] Each security claim has its conditions and limits.
- [ ] Website-specific claims are either sourced or explicitly framed as a generic pattern.
- [ ] The table of contents reads like a story, not an unstructured outline.
- [ ] Main article and companion links use the intended NotionNext route and status.
