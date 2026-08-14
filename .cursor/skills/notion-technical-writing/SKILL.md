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
- Browser-security terminology (topic appendix only): `./browser-security-terminology.md`
- Editorial review: `article-reviewer` + `.cursor/checklists/article-review.md`
- Mechanical verification (properties, blocks, links, Cover, public render): `../verify-notion-article/SKILL.md`
- Cover upload: `../upload-notion-cover/SKILL.md`

New or substantially revised articles require an approved plan before a Notion write. Default planning is parent-led with `article-researcher`; use `article-planner` only for complex work. Prefer `article-writer` for long drafts; short drafts may be parent-written. **Never skip research / Claim Matrix**—only writer/planner are optional. New pages start as `Draft`; substantial revisions of live articles use a staging copy. Preview, revision deployment, and publication are separate user approval gates.

## Style anchor (golden sample)

Primary **narrative** pattern to imitate (not the security topic):

- Public article: [https://ximouzhao.com/article/cors-and-csrf](https://ximouzhao.com/article/cors-and-csrf)
- What to copy: reader-first opening, stable actors, question-driven headings, end-to-end causal chain, explicit “does not do” boundaries, diagrams/tables that carry mechanism rather than decorate.
- What **not** to copy: CSRF/CORS metaphors, Cookie/SOP framing, attack–defense evolution borrowed from that page, or default “link cors-and-csrf” padding. For comparisons or framework pieces, keep the same narrative discipline with a shared workload and early scannable surface.

### CSRF / CORS mention hard rule

`cors-and-csrf` is a style sample. It is **not** a required related article, background, or default contrast for every draft.

| Topic | CSRF / CORS / SOP / SameSite in body or plan |
|---|---|
| Browser security, cookies, CORS, CSRF, clickjacking, or related web-platform controls | Allowed; follow `./browser-security-terminology.md` |
| Adjacent topic that must cut a boundary (e.g. leave-site confirm ≠ CSRF defense) | At most one short sentence + public `/article/<slug>` link; do not rewrite the CSRF/CORS article |
| Unrelated (NestJS, Redis, model selection, UA/download redirect, DDD, tooling, etc.) | **Forbidden** in prose, Callouts, defense tables, metaphors, and “related reading” unless the user explicitly asks |

Plans for unrelated topics must say `Style anchor: cors-and-csrf（叙事纪律 only）` and must **not** list CSRF companions as related pages by default.

## Evidence hard gate

Material claims are numbers, model IDs, prices, benchmarks, dates of effect, vendor-specific behavior, and mechanism assertions that a reader might act on.

1. Every material claim in the body must appear in the plan Claim Matrix with a URL or `path:line` and `high` / `medium` / `low` confidence.
2. No matrix row → do not write it into the body. Report the gap instead.
3. `low` confidence or `Unknown` items must not drive the main conclusion or decision recommendation. Omit them, or confine them to an explicitly unverified Toggle/aside.
4. Distinguish generic standards from one company's implementation. Do not claim knowledge of non-public APIs, fields, or controls.
5. Before Draft for time-sensitive topics (pricing, model IDs, live API behavior, benchmarks), re-fetch the listed primary URLs and record `Evidence rechecked: YYYY-MM-DD`. Stale matrix rows are not writable until refreshed.

## Length budget

Record one budget in the plan and keep the draft inside it:

| Budget | Narrative top-level H2 | Guidance |
|---|---|---|
| `short` | 3–5 | One bounded question; optional depth in one Toggle |
| `standard` | 6–8 | Default. Prefer Toggles over a 9th H2 |
| `long` | >8 only with justification | Requires companion split and/or heavy Toggles; main article still answers one question |

Do not grow the main article by stacking encyclopedia sections. Move optional depth out.

## Core rules

1. Start with one concrete scenario, question, or failure case. Carry the same actors through the article.
2. Introduce concepts in dependency order: observable behavior → plain-language explanation → formal name → exact mechanism and boundaries.
3. On first use, write the Chinese name, English full name, abbreviation, and a one-sentence explanation.
   - Example: `依赖注入（Dependency Injection，DI）`
   - Browser-security articles only: `CSRF（Cross-Site Request Forgery，跨站请求伪造）` — do not use CSRF as the default first-use example for unrelated topics.
4. Never rely on a definition from a distant section. A toggle, table row, or companion post must define the terms it uses.
5. Replace vague claims with conditions. State who acts, what is checked, and when the behavior does or does not happen.
6. Pass the evidence hard gate before any Notion write.

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

- Use no more than 6–8 top-level headings unless the plan explicitly budgets `long` and justifies companions/Toggles.
- Use level-2 headings only for detail under the immediately preceding main question.
- Do not make “References”, a code sample, or a minor aside a top-level section.
- Treat advanced variants as extensions unless they are the main question.
- Do not place a Notion TOC block or outline image at the top; the site generates progress navigation automatically.

## Causal narrative and defenses

- Make every main heading answer one reader question rather than merely name a topic.
- Keep an end-to-end causal chain visible: actor → action or input → mechanism/check → observable result. For browser-security flows, follow `./browser-security-terminology.md` (request / credentials / response readability / server acceptance).
- Introduce each term before a later step relies on it. Do not make readers decode jargon while also learning the mechanism.
- Map every recommended defense to the failure condition it prevents and state the conditions under which it works or fails.
- Let examples, diagrams, tables, and checklists support the prose explanation; never use a rich block as a substitute for the causal chain.
- End with a short causal recap after the mechanism and boundaries are clear, then place sources or deeper reading outside the top-level narrative.
- Companion pages may be intentionally short, but they must define the terms they use. Do not outsource a definition essential to understanding the main article.

## Terminology and rigor

- Keep definitions local and ordered; do not make readers decode jargon while learning the mechanism.
- Say what a mechanism does **not** do once the positive claim is clear.
- For browser-security articles only, also follow `./browser-security-terminology.md`. Do not apply that appendix's CSRF/CORS framing to unrelated subjects (see **CSRF / CORS mention hard rule** above).

## Examples, figures, and sources

- Prefer reserved example domains (`pay.example.com`, `evil.example`, `api.example.com`) over real customer endpoints.
- Explain each line of code that matters. Label examples as demonstrations when they are not universal proof.
- Prefer simple diagrams that preserve one scenario and one action per step.
- A new article that describes a process, a multi-actor interaction, or a decision chain should include at least one diagram by default—not as decoration, but as a planned carrier of the causal chain. Match the diagram type to the content shape: sequence diagram for multi-actor timelines, flowchart for branching decisions, table for parallel conditions. If a draft of such an article has no visual, the plan must justify why.
- For multi-system comparison articles, plan one shared-workload diagram or early comparison surface plus a small per-system mechanism visual. An external interactive companion may deepen exploration, but it does not replace in-article carriers.
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
| Security (when the topic is CSRF/CORS) | "CSRF 是跨站请求伪造……" | "你没授权，钱却扣了" |
| Performance | "本文介绍浏览器渲染优化……" | "页面白屏 3 秒，用户已经走了" |
| Refactoring | "今天讲如何拆分模块……" | "这段代码每次改动都牵出三个 bug" |
| Debugging | "GC 日志格式如下……" | "服务每隔一小时卡顿一次，日志里只有一行警告" |
| Comparison | "本报告对比三种并发模型……" | "同一个接口要扛 1 万并发下游调用，Go / Lua / Node 会在哪一步卡住？" |

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

This also applies to checklist rows, defense tables, and arrow slogans. Prefer plain actor + action wording over compact notation the reader must decode.

| Compressed | Expanded |
|---|---|
| "改成 ID→URL" | "改成只传 ID，由后台查表转成 URL" |
| "服务端 ID 映射" | "前端只传短标识，服务端用内部表查出完整地址再跳" |

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
| Callout | A sharp boundary or warning | Decsheets or ordinary emphasis |
| Table | "Which one" or "under what condition" with **short cells** | Explaining "why" or "how"; dumping multi-model score lists into one cell |
| Chart / ranked visual | Multi-item numeric comparison (scores, prices, latency) | Decorative screenshots that restate prose without a takeaway |
| Columns | Genuine side-by-side comparison | Shortening a long section |
| Divider | Separating major acts of the article | Between every H2 |
| Toggle | Precise conditions, exceptions, derivations | Hiding the main causal chain |

### 7a. Reader prose is not the editorial workflow

The published body is for the site reader. Do **not** leak writing-process or NotionNext workflow words into Callouts, Toggles, link parentheticals, or source blurbs.

Forbidden in reader-facing prose unless the article is explicitly about this site's publishing system:

- `Draft` / `Invisible` / `Published` as page-status jargon
- `companion` / `staging` / 「预览向」 / 「工作流闸门」
- notes like 「该文当前为 Invisible companion」

Link related articles with a public `/article/<slug>` URL and, if needed, one reader-useful distinction (e.g. 「讲的是应用内二次确认，不是出站离开页」). Keep status and companion ownership in the plan, review notes, or metadata—not in the article body.

### 7b. Callout / Toggle spacing and Notion rich-text pitfalls

- Inside `<callout>` and `<details>`, do **not** use a lone `<br>` (or `<br>` on its own indented line) to separate paragraphs. Notion often renders that as a large empty block. Prefer one continuous paragraph, or separate indented child paragraphs **without** `<br>`.
- Reserve `<br>` for true inline line breaks inside a single quote/callout line when the enhanced Markdown spec requires it—not as a paragraph spacer.
- Avoid wrapping inline code in bold in ways that nest markers (e.g. `**\`includes\`**` inside an already-bold phrase). Notion can emit broken `****` artifacts. Put the code outside the bold span, or bold the surrounding words only.
- Prefer code-fence languages the renderer knows. If a language such as `http` is remapped oddly, use `plain text` / `text` for raw HTTP transcripts.

### 8. Multi-system comparison: same workload, early surface

When the article's job is to compare ≥2 runtimes, languages, frameworks, or models, do not write three mini-essays and only then drop a summary table. That structure feels like a report even when the facts are correct.

**Required pattern:**

1. **One shared workload first.** Name the same request, failure, or job the reader will watch through every system (for example: “同一 API 打出 1 万个下游请求，中间夹着一段 CPU 计算”). Reuse those actors in every section.
2. **Put a scannable comparison surface early**—short table, ranked chart, or side-by-side columns—after the opening scenario and before deep mechanism sections. Readers who came to choose need a map before the tour.
3. **Per system: one causal beat + one diagram + one minimal same-workload snippet.** Do not open with encyclopedia headings like “核心概念 / 调度器 / 优势与场景”. Ask what that system does at the shared blocking or scheduling point.
4. **Keep the strongest teaching device near the front.** If a metaphor, kitchen analogy, or decision checklist is the thing readers will remember, do not bury it after three siloed model write-ups.
5. **Do not outsource the article's visual job to an external interactive page.** A link to `show.ximouzhao.com` or similar may be a companion, but the main article must still carry its own diagrams/tables for the causal chain. If the interactive page feels stronger, the blog is missing early compare, per-system mechanism visuals, or the shared workload—not merely “less polish”.
6. **Subjective scores and radar charts need labels.** If you show capability scores, say they are illustrative rankings for teaching, not measured benchmarks, and state the axes' meaning next to the visual.

**Hard fail pattern:** intro → System A deep dive → System B deep dive → System C deep dive → comparison table → metaphor → conclusion. That is a literature survey outline, not a comparison narrative.

### 9. Make quantitative comparisons scannable

Readers of model, price, benchmark, and latency articles arrive expecting a **visual ranking**, not a semicolon-separated score dump. Online comparisons commonly use bar charts, ranked strips, or one-number-per-cell matrices. Dense text inside a table cell fails the scan test.

**Hard fail pattern** — never ship a cell or sentence like:

> Claude Opus 5 max 63；GPT-5.6 Sol max 61；Grok 4.6 high 61；DeepSeek 0813 max 53

That packs four named models, effort levels, and scores into one unreadably long unit. A reader cannot rank them at a glance.

**Required treatment when comparing ≥3 numeric items of the same kind:**

1. Prefer a **chart or ranked visual** as the primary carrier: Mermaid `xychart-beta` bar chart when axes are simple; otherwise a tracked SVG/PNG under `public/images/` with a caption that states the takeaway and the exact version/effort/date.
2. Keep an adjacent **narrow exact-value table** only if needed: one model per row, one number per score cell, effort/version in its own short column or footnote.
3. Always show the **comparison conditions next to the visual**: benchmark name, model snapshot, reasoning effort, date, and what the score does **not** mean.
4. Price ladders follow the same rule: a visual order of magnitude first; exact unit prices in a short table second. Do not mix currencies in one visual without conversion labeling.
5. If the plan claims a multi-model or multi-price comparison and has no chart/ranked visual, the plan must explicitly justify why a short one-number-per-cell table is enough.

**Mobile rule:** a four-column table whose cells contain more than one model name or more than one number is almost always a major readability defect. Split it, chart it, or move the long text out of the cell.

### 10. Review triggers

If a reviewer says any of the following, apply the matching fix:

| Reviewer phrase | Likely problem | Fix |
|---|---|---|
| "太晦涩" / "看不懂" | Compressed abstraction or term stacking | Expand into actor + action + result |
| "为什么要关心攻击者" | Perspective drift to attacker | Reframe around reader's stake |
| "为什么要关心框架内部" | Perspective drift to mechanism | Show what breaks or slows down for the reader |
| "这里不要提 X" | Mixed metaphor or unnecessary jargon | Remove metaphor, use plain mechanism name |
| "为什么又提 CSRF" / "无关文串 CSRF" | Style-sample contamination from cors-and-csrf | Delete CSRF/CORS framing; keep narrative discipline only; boundary cut = one sentence + link max |
| "全是话" | Prose that should be a table or list | Extract conditions into a table, keep one sentence of lead-in |
| "谁能看清楚" / "网上不都是有很多图吗" | Multi-item numbers jammed into prose or one table cell | Replace with a bar/ranked chart plus a one-number-per-cell table; put version/effort beside the visual |
| "详见 xxx" | Cross-reference instead of local definition | Define locally or move detail to a toggle |
| "像规范摘要" / "像报告" / "本报告旨在" | Academic/report voice, missing scenario | Open with reader cost; cut report register; use question-driven headings |
| "还没有交互页/对照页的号" / "不如图解页直观" | Comparison siloed, visuals outsourced, compare surface too late | Same shared workload; early compare table/chart; per-system diagram in-article; do not rely on an external show page |
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
9. After writing, confirm the Claim Matrix still covers every material body claim, clear independent `article-reviewer` findings (including evidence spot-check), then run `verify-notion-article` for mechanical and public-render checks. Notion UI correctness does not prove NotionNext rendering; verify does not replace editorial review.
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

- [ ] The first screen explains why the reader should care and follows the golden-sample narrative pattern.
- [ ] Unrelated topics do not import CSRF/CORS/SOP framing, metaphors, or default cors-and-csrf “related reading”; boundary cuts stay one sentence + link.
- [ ] Claim Matrix covers every material body claim; evidence was spot-checked; `low`/`Unknown` items are out of the main conclusion.
- [ ] Time-sensitive facts show a current `Evidence as of` / recheck date.
- [ ] The draft stays inside the planned length budget.
- [ ] Every acronym and specialized term is defined before first reliance, normally where it first appears.
- [ ] The article answers one question at a time and preserves the scenario.
- [ ] The actors and complete causal chain remain traceable from the opening through the conclusion.
- [ ] Multi-system comparisons reuse one shared workload, place a scannable compare surface early, and keep mechanism diagrams in-article rather than only on an external page.
- [ ] Each recommended defense maps to a named failure condition and states its limits.
- [ ] Website-specific claims are either sourced or explicitly framed as a generic pattern.
- [ ] Heading hierarchy is question-driven and reads like a story, not an unstructured outline; NotionNext will derive the site TOC from it.
- [ ] A concise causal conclusion appears before sources or deeper reading, which are not top-level narrative sections.
- [ ] The page does not begin with `<table_of_contents/>`, a TOC screenshot, or a duplicate outline list.
- [ ] Reader-facing prose has no editorial workflow jargon (`Draft` / `Invisible` / `companion` / `staging` / 「预览向」).
- [ ] Callouts and Toggles have no lone `<br>` spacers that create large blank gaps.
- [ ] Checklist and defense rows use plain actor + action wording, not author-coined arrow slogans such as `ID→URL`.
- [ ] Main article and companion links use `https://ximouzhao.com/article/<slug>` and the intended NotionNext status.
- [ ] Independent review has no blocker or major findings.
- [ ] Invisible preview and Published status changes have the required separate user approvals.
