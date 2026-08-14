# Browser Security Terminology Appendix

Use this appendix **only** when the article is about browser security, cookies, CORS, CSRF, clickjacking, or related web-platform controls.

Do **not** open this appendix, copy its metaphors, or name CSRF/CORS/SOP/SameSite as contrast topics for unrelated work (NestJS, Redis, model selection, UA/download redirect, DDD, tooling, etc.). Adjacent articles that must cut a boundary may use one short sentence plus a public `/article/<slug>` link—nothing more.

The golden sample `cors-and-csrf` teaches narrative discipline for all articles; it does **not** authorize CSRF content in every article.

## Core distinctions

- Define `Origin` as `scheme + host + port`; paths are not part of an Origin.
- Do not conflate **same-origin** with **same-site**, or either with Cookie matching.
- When discussing Cookies, name the relevant attributes: `Domain`/host-only matching, `Path`, `Secure`, `HttpOnly`, and `SameSite`.
- Explain `SameSite` as a Cookie attribute set through `Set-Cookie`. Define `Strict`, `Lax`, and `None; Secure` before relying on them.

## Causal separations for browser security

Always separate:

1. whether a cross-site request can be sent;
2. whether credentials can be attached;
3. whether the initiating script can read the response;
4. whether the server accepts or rejects the operation.

## Mechanism boundaries

- CSRF commonly borrows automatic credentials; it does not require stealing the Cookie value.
- CORS primarily controls browser-script access to cross-origin responses and Fetch/XHR permission paths; it is not general CSRF protection.
- SOP does not stop all cross-origin requests; it stops scripts from reading cross-origin responses by default.
- `HttpOnly` does not stop the browser from sending the Cookie; it stops scripts from reading it.
- State important boundaries, such as XSS defeating a Token that a same-origin script can read.

## Example hygiene

- Use reserved example domains such as `pay.example.com` and `evil.example`.
- Never include real payment endpoints or claim a real provider uses a specific hidden field.
- Label attack examples as demonstrations, not proof that every site is vulnerable.
