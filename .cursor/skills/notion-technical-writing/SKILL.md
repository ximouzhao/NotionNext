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
6. Recommended defenses mapped to the failure conditions they address, where applicable
7. A practical checklist and concise causal summary
8. Sources and deeper reading outside the top-level narrative

Keep the heading outline narrative (NotionNext builds the site TOC from these headings):

- Use no more than 6–8 top-level headings.
- Use level-2 headings only for detail under the immediately preceding main question.
- Do not make “References”, a code sample, or a minor aside a top-level section.
- Treat CORS, browser edge cases, and advanced variants as extensions unless they are the main question.
- Do not place a Notion TOC block or outline image at the top; the site generates progress navigation automatically.

## Causal narrative and defenses

- Make every main heading answer one reader question rather than merely name a topic.
- Keep an end-to-end causal chain visible: actor → action or input → mechanism/check → observable result. For browser-security flows, explicitly separate whether the request can be sent, whether credentials can attach, whether the initiating script can read the response, and whether the server accepts the operation.
- Introduce each term before a later step relies on it. Do not make readers decode jargon while also learning the mechanism.
- Map every recommended defense to the failure condition it prevents and state the conditions under which it works or fails.
- Let examples, diagrams, tables, and checklists support the prose explanation; never use a rich block as a substitute for the causal chain.
- End with a short causal recap after the mechanism and boundaries are clear, then place sources or deeper reading outside the top-level narrative.
- Companion pages may be intentionally short, but they must define the terms they use. Do not outsource a definition essential to understanding the main article.

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
- A new article that describes a process, a multi-actor interaction, or a decision chain should include at least one diagram by default—not as decoration, but as a planned carrier of the causal chain. Match the diagram type to the content shape: sequence diagram for multi-actor timelines, flowchart for branching decisions, table for parallel conditions. If a draft of such an article has no visual, the plan must justify why.
- Use exact, reviewable SVG or Mermaid diagrams for labelled security flows; do not use text-heavy generative images.
- Cite primary or authoritative sources (MDN, OWASP, standards) for browser behavior and security guidance.
- When replacing or superseding an older article, audit its figures and diagrams as carefully as its prose. For each visual in the old article, decide explicitly: already covered by a better visual, deliberately dropped, or recreated in the new article.
- For a new article, audit the existing corpus instead: search for related and companion articles, decide what the new article owns versus links to, and reuse or refresh existing explanations and diagrams rather than creating a parallel version.
- Budget visuals at plan time, not as decoration after the draft is written. For each planned rich block (diagram, table, callout, columns), name the job it does—comparison, mechanism loop, boundary warning. A block without a job does not belong in the plan.
- Mechanisms with a generate → distribute → verify loop (Token flows, handshakes, challenge-response) are strong diagram candidates; a small Mermaid diagram can replace a dense prose paragraph.
- Never reference another page's Notion-hosted image by its signed URL; signed URLs expire. Recreate the diagram as Mermaid or a tracked asset under `public/images/` instead.
- A new diagram should replace dense prose, not stack on top of it. If the page already carries many rich blocks, adding one more means removing something.

## Style rules learned from iterative review

These rules come from reader feedback on real drafts. They are not specific to security articles. Apply them before asking for review.

### 1. Start from the reader's problem, not the topic

Every article answers a question the reader is already asking. Open with the moment the reader notices something is wrong, not with the definition of a term.

| Article type | Weak opening (topic-first) | Strong opening (reader-first) |
|---|---|---|
| Security | "CSRF 是跨站请求伪造……" | "你没授权，钱却扣了" |
| Performance | "本文介绍浏览器渲染优化……" | "页面白屏 3 秒，用户已经走了" |
| Refactoring | "今天讲如何拆分模块……" | "这段代码每次改动都牵出三个 bug" |
| Debugging | "GC 日志格式如下……" | "服务每隔一小时卡顿一次，日志里只有一行警告" |

The pattern is the same: **concrete cost or confusion first, mechanism second.**

### 2. Use scenario and evolution to carry the explanation

Abstract mechanisms are easier to accept when the reader watches them solve a concrete problem. Two patterns work across genres:

**Scenario story (all articles):** Place the reader inside a specific situation with named actors, a visible action, and a consequence. Do not describe the mechanism first and illustrate it later; let the mechanism emerge from the story.

- Security: "你登录了 pay.example.com，另一个标签页里的 evil.example 悄悄发出一笔付款"
- Performance: "用户点开列表页，接口返回 2MB JSON，前端渲染 4000 个节点，白屏 3 秒"
- Refactoring: "运营要加一个导出按钮，你发现这段 800 行的函数里已经塞了 6 个不相关的功能"

**Evolution / attack-defense progression (when the topic has history or opposition):** Show how the solution evolved under pressure. Each step should answer: what new requirement or attack appeared, why the old approach broke, and what the next iteration changed.

- Security: 攻击者找到新绕过方式 → 防线打补丁 → 攻击者再进化 → 防线再调整
- Architecture: 需求 A 导致实现 X → 需求 B 出现，X 撑不住 → 演进为 Y → 需求 C 又暴露 Y 的边界
- Tooling: 团队手动执行流程 → 出错率高 → 写脚本 → 脚本分散难维护 → 收拢为平台

The evolution pattern prevents the article from feeling like a static specification. It gives the reader a reason to care about each design decision, because they saw the failure that motivated it.

**Caution:** do not invent fake history or fake attacks. If the real evolution is unknown, frame it as "一个常见的演进路径是……" or "假设你先遇到 A，再遇到 B". Label speculation clearly.

### 3. Keep one protagonist

Pick who the article is about and stay with them.

- If it is the reader, use "你" or "你的系统" in headings, quotes, and the recap.
- If it is a team or a service, name them once and keep referring to them.
- Do not switch to the attacker, the framework, the spec, or the database halfway through unless the article is explicitly about their internals.

**Test:** read every pull quote and heading aloud. If the subject changes from "you" to "the attacker" or "the GC", the perspective has drifted.

### 4. Expand compressed abstractions

Do not write slogans that only make sense after the reader already understands the mechanism.

| Compressed | Expanded |
|---|---|
| "读不到 ≠ 做不到" | "浏览器拦住了脚本看到结果，却没拦住服务器执行付款" |
| "拦看不拦发" | "浏览器不阻止表单发出去，只阻止脚本读响应" |

The problem is not technical terms themselves—"最终一致性" and "无状态服务" are fine because they are established industry terms. The problem is **author-coined shorthand** that compresses a causal claim into a slogan. If you invented the phrase for this article, expand it into actor + action + result.

If a sentence needs more than two technical terms, split it or move the precise definition to a toggle.

### 5. Metaphors are scaffolding, not the building

A metaphor helps a reader enter a concept. It becomes a liability when it is stretched, mixed, or left standing after the real mechanism has been named.

- **Use a metaphor only when the reader has no existing mental hook.** If the reader already knows what a session token is, do not call it a "门禁卡".
- **One metaphor per concept, and do not mix metaphors in the same paragraph.** If Cookie is a "门禁卡", do not also call it "凭证" or "票据" nearby.
- **Drop the metaphor as soon as the formal name and mechanism are established.** Continuing to say "刷卡" after defining `SameSite` forces the reader to translate twice.
- **Do not extend the metaphor beyond its useful range.** "刷卡" is fine; "卡号被复制" starts to mislead because CSRF does not copy the Cookie value.
- **Prefer no metaphor over a strained one.** If the plain mechanism name is clearer than any analogy, skip the analogy.

The goal is not to eliminate metaphors, but to make sure each one earns its place and then gets out of the way.

### 6. Say what a mechanism does NOT do

Readers assume protections are broader than they are. State the boundary explicitly.

- SOP does not stop requests; it stops scripts from reading responses.
- CORS does not authenticate users; it lets servers declare which origins may read responses.
- `HttpOnly` does not stop the browser from sending the Cookie; it stops scripts from reading it.
- A cache does not guarantee freshness; it guarantees a faster answer within a TTL.
- When the topic is an attack, describe the attacker's full capability boundary—what they cannot read, cannot see, and cannot control—not just the slice one mechanism blocks. Otherwise readers infer the attacker's goal from the mechanism's scope (e.g., reading "SOP blocks response reading" as "the attacker was trying to read the response").

### 7. Match the block to the job

| Block | Use it for | Do not use it for |
|---|---|---|
| Pull quote | A causal contrast the reader cares about | Restating a paragraph in fancier words |
| Callout | A sharp boundary or warning | Decoration or ordinary emphasis |
| Table | "Which one" or "under what condition" | Explaining "why" or "how" |
| Columns | Genuine side-by-side comparison | Shortening a long section |
| Divider | Separating major acts of the article | Between every H2 |
| Toggle | Precise conditions, exceptions, derivations | Hiding the main causal chain |

### 8. Review triggers

If a reviewer says any of the following, apply the matching fix:

| Reviewer phrase | Likely problem | Fix |
|---|---|---|
| "太晦涩" / "看不懂" | Compressed abstraction or term stacking | Expand into actor + action + result |
| "为什么要关心攻击者" | Perspective drift to attacker | Reframe around reader's stake |
| "为什么要关心框架内部" | Perspective drift to mechanism | Show what breaks or slows down for the reader |
| "这里不要提 X" | Mixed metaphor or unnecessary jargon | Remove metaphor, use plain mechanism name |
| "全是话" | Prose that should be a table or list | Extract conditions into a table, keep one sentence of lead-in |
| "详见 xxx" | Cross-reference instead of local definition | Define locally or move detail to a toggle |
| "像规范摘要" | Missing scenario or evolution | Add a concrete story or show how the solution evolved under pressure |
| "旧文的图更多 / 更直观" | Visual audit skipped during revision | Compare the old article's figures one by one; absorb, recreate, or deliberately drop each |
| "这和已有那篇重复了" | Corpus overlap check skipped for a new article | Decide what the new article owns versus links to; refresh the existing article or narrow the new one's scope |

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
7. For companion pages, create separate database `Post` rows with a stable `slug` and `status=Invisible`. A companion may have narrow scope, but it must remain locally understandable and must not own a definition essential to the main article unless the main article already established it.
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
- [ ] Every acronym and specialized term is defined before first reliance, normally where it first appears.
- [ ] The article answers one question at a time and preserves the scenario.
- [ ] The actors and complete causal chain remain traceable from the opening through the conclusion.
- [ ] Each recommended defense maps to a named failure condition and states its limits.
- [ ] Each security claim has its conditions and limits.
- [ ] Website-specific claims are either sourced or explicitly framed as a generic pattern.
- [ ] Heading hierarchy is question-driven and reads like a story, not an unstructured outline; NotionNext will derive the site TOC from it.
- [ ] A concise causal conclusion appears before sources or deeper reading, which are not top-level narrative sections.
- [ ] The page does not begin with `<table_of_contents/>`, a TOC screenshot, or a duplicate outline list.
- [ ] Main article and companion links use `https://ximouzhao.com/article/<slug>` and the intended NotionNext status.
- [ ] Independent review has no blocker or major findings.
- [ ] Invisible preview and Published status changes have the required separate user approvals.
