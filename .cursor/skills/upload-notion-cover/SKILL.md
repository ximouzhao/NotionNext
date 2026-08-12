---
name: upload-notion-cover
description: Uploads a tracked article Cover from public/images/covers to Notion-managed storage and attaches it as a page Cover through the official Notion File Upload API. Use only when the user requests a Cover upload or the approved article plan requires one.
disable-model-invocation: true
---

# Upload Notion Cover

Use the repository script; do not improvise with temporary URLs or body-image promotion.

## Preconditions

1. The user requested the Cover or approved a plan that requires it.
2. The final file is `public/images/covers/cover-<slug>.png` or another supported image in that directory.
3. The image is a reviewed 3:1 deliverable, normally `2400×800`.
4. The target page ID and intended slug are known.
5. Fetch the target page through the Notion MCP and confirm its title, exact `slug` property, and current Cover.
6. If any Cover already exists, obtain explicit authorization to replace it; never infer replacement approval from approval to create a new asset.
7. The official Notion CLI, `ntn`, is installed and authenticated for the target workspace.
8. The authenticated member can read and update the target page.

The script delegates authentication and API calls to `ntn`. It never reads Keychain credentials or creates, reads, or updates `.env` files.

## One-time authorization

Install the official CLI. The standalone installer is preferred in this repository because the npm package requires Node.js 22+:

```bash
curl -fsSL https://ntn.dev | bash
ntn --version
```

Authenticate interactively:

```bash
ntn login
ntn doctor
```

`ntn login` opens Notion in the browser and stores the workspace-scoped credential in the operating system's Keychain. It requires full workspace membership; guests and restricted members cannot use this login flow.

For unattended CI only, `ntn` can use `NOTION_API_TOKEN`. Store it in the CI secret manager and never paste it into chat, commit it, or put it in a tracked `.env` file.

## Validate first

Run:

```bash
node scripts/notion/upload-page-cover.mjs \
  --page-id "<notion-page-id-or-url>" \
  --expected-slug "<slug>" \
  --file "public/images/covers/cover-<slug>.png" \
  --dry-run
```

Dry run must confirm:

- the resolved file stays inside `public/images/covers/`;
- extension, MIME signature, 900-byte filename limit, and the confirmed workspace size limit are supported;
- the page ID has valid UUID syntax;
- the intended slug is explicit;
- no network request or CLI authentication is needed, so target identity and existing Cover are not checked in this phase.

The default workspace limit is 5 MiB. Pass `--workspace-limit-mb <value>` only when the workspace's higher limit is known; the single-part API maximum remains 20 MiB.

## Remote preflight

Before any related canonical-page mutation, run the same command with `--preflight-only` instead of `--dry-run`. This uses the authenticated `ntn` session, fetches the target page, checks the exact slug and existing Cover policy, and performs no mutation. Include `--replace-existing-cover` only after replacement approval.

## Upload

After dry run succeeds and mutation is authorized:

```bash
node scripts/notion/upload-page-cover.mjs \
  --page-id "<notion-page-id-or-url>" \
  --expected-slug "<slug>" \
  --file "public/images/covers/cover-<slug>.png"
```

The script:

1. fetches the target page through `ntn api` and rejects a slug mismatch;
2. rejects an existing Cover unless `--replace-existing-cover` was explicitly supplied after approval;
3. creates and sends a Notion File Upload through `ntn files create`;
4. confirms upload status;
5. repeats the slug and existing-Cover preflight immediately before attachment;
6. attaches the upload ID as the page Cover through `ntn api`.

For an approved replacement, append `--replace-existing-cover`. For a confirmed paid workspace limit, append `--workspace-limit-mb <value>` to both validation and upload commands.

The script uses Notion API version `2026-03-11`, defaults to the free-workspace 5 MiB limit, and rejects single-part files over 20 MiB.

## Verify

1. Fetch the page through the Notion MCP.
2. Confirm it has a Notion-hosted/custom file Cover rather than an external or temporary signed URL.
3. Verify the `Invisible` or `Published` NotionNext page uses the Cover after cache propagation.
4. Record both:
   - tracked source path;
   - Notion attachment result.

If upload succeeds but attachment fails, report the failed stage and retry only after diagnosing it. Never use the upload response's one-hour download URL as `notion-update-page.cover`.
