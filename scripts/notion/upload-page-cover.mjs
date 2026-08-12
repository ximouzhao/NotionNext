#!/usr/bin/env node

import { spawn } from 'node:child_process'
import { readFile, realpath, stat } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const API_VERSION = '2026-03-11'
const SINGLE_PART_MAX_FILE_SIZE = 20 * 1024 * 1024
const DEFAULT_WORKSPACE_MAX_FILE_SIZE = 5 * 1024 * 1024
const MAX_FILENAME_BYTES = 900
const SCRIPT_DIRECTORY = path.dirname(path.resolve(process.argv[1]))
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, '../..')
const COVER_ROOT = path.join(REPOSITORY_ROOT, 'public/images/covers')
const MIME_BY_EXTENSION = new Map([
  ['.gif', 'image/gif'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.webp', 'image/webp']
])

const usage = `Upload a tracked image and set it as a Notion page Cover.

Usage:
  node scripts/notion/upload-page-cover.mjs --page-id <id-or-url> --expected-slug <slug> --file <path> [--dry-run | --preflight-only]

Options:
  --page-id                  Notion page UUID or URL
  --expected-slug            Exact value expected in the page's slug property
  --file                     Image inside public/images/covers/
  --workspace-limit-mb       Confirmed workspace upload limit (default: 5, maximum: 20)
  --replace-existing-cover   Explicitly allow replacement when the page already has a Cover
  --preflight-only           Validate locally and fetch the target page without mutation
  --dry-run                  Validate local inputs only; page preflight is not run
  --help                     Show this help

Environment:
  Authenticate once with "ntn login". The official CLI stores credentials in
  the OS keychain. NOTION_API_TOKEN remains an optional ntn override for CI.
`

/**
 * @typedef {object} CliOptions
 * @property {boolean} dryRun
 * @property {boolean} help
 * @property {boolean} preflightOnly
 * @property {boolean} replaceExistingCover
 * @property {number} workspaceLimitMb
 * @property {string} [expectedSlug]
 * @property {string} [pageId]
 * @property {string} [file]
 */

/**
 * @typedef {object} ValidatedCover
 * @property {string} absolutePath
 * @property {Buffer} bytes
 * @property {string} contentType
 * @property {string} filename
 * @property {string} relativePath
 * @property {number} size
 */

/**
 * @param {string[]} argv
 * @returns {CliOptions}
 */
function parseArgs(argv) {
  /** @type {CliOptions} */
  const options = {
    dryRun: false,
    help: false,
    preflightOnly: false,
    replaceExistingCover: false,
    workspaceLimitMb: DEFAULT_WORKSPACE_MAX_FILE_SIZE / 1024 / 1024
  }

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === '--dry-run') {
      options.dryRun = true
    } else if (argument === '--preflight-only') {
      options.preflightOnly = true
    } else if (argument === '--replace-existing-cover') {
      options.replaceExistingCover = true
    } else if (argument === '--help' || argument === '-h') {
      options.help = true
    } else if (argument === '--page-id') {
      options.pageId = argv[++index]
    } else if (argument === '--expected-slug') {
      options.expectedSlug = argv[++index]
    } else if (argument === '--file') {
      options.file = argv[++index]
    } else if (argument === '--workspace-limit-mb') {
      options.workspaceLimitMb = Number(argv[++index])
    } else {
      throw new Error(`Unknown argument: ${argument}`)
    }
  }

  if (
    !Number.isFinite(options.workspaceLimitMb) ||
    options.workspaceLimitMb <= 0 ||
    options.workspaceLimitMb > 20
  ) {
    throw new Error('--workspace-limit-mb must be greater than 0 and at most 20')
  }
  if (options.dryRun && options.preflightOnly) {
    throw new Error('--dry-run and --preflight-only cannot be combined')
  }

  return options
}

/**
 * @param {string | undefined} value
 * @returns {string}
 */
function requireExpectedSlug(value) {
  const slug = value?.trim()
  if (!slug) {
    throw new Error('Missing --expected-slug')
  }
  return slug
}

/**
 * @param {string | undefined} value
 * @returns {string}
 */
function normalizePageId(value) {
  if (!value) {
    throw new Error('Missing --page-id')
  }

  const matches = value.match(
    /[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}/g
  )
  const match = matches?.[matches.length - 1]
  if (!match) {
    throw new Error('Invalid Notion page ID or URL')
  }

  const compact = match.replace(/-/g, '').toLowerCase()
  return [
    compact.slice(0, 8),
    compact.slice(8, 12),
    compact.slice(12, 16),
    compact.slice(16, 20),
    compact.slice(20)
  ].join('-')
}

/**
 * @param {Buffer} buffer
 * @param {string} extension
 * @returns {boolean}
 */
function hasExpectedSignature(buffer, extension) {
  if (extension === '.png') {
    return buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    )
  }
  if (extension === '.jpg' || extension === '.jpeg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  }
  if (extension === '.gif') {
    const signature = buffer.subarray(0, 6).toString('ascii')
    return signature === 'GIF87a' || signature === 'GIF89a'
  }
  if (extension === '.webp') {
    return (
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP'
    )
  }
  return false
}

/**
 * @param {string | undefined} fileArgument
 * @param {number} workspaceMaxFileSize
 * @returns {Promise<ValidatedCover>}
 */
async function validateCover(fileArgument, workspaceMaxFileSize) {
  if (!fileArgument) {
    throw new Error('Missing --file')
  }

  const root = await realpath(COVER_ROOT)
  const requested = path.resolve(REPOSITORY_ROOT, fileArgument)
  const file = await realpath(requested)
  const relative = path.relative(root, file)

  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('Cover file must be a file inside public/images/covers/')
  }

  const fileStat = await stat(file)
  if (!fileStat.isFile()) {
    throw new Error('Cover path is not a regular file')
  }
  if (fileStat.size === 0) {
    throw new Error('Cover file is empty')
  }
  if (fileStat.size > SINGLE_PART_MAX_FILE_SIZE) {
    throw new Error('Cover exceeds the 20MB single-part upload limit')
  }
  if (fileStat.size > workspaceMaxFileSize) {
    throw new Error(
      `Cover exceeds the confirmed workspace limit of ${workspaceMaxFileSize} bytes`
    )
  }

  const extension = path.extname(file).toLowerCase()
  const contentType = MIME_BY_EXTENSION.get(extension)
  if (!contentType) {
    throw new Error('Cover must be PNG, JPEG, WebP, or GIF')
  }

  const bytes = await readFile(file)
  if (!hasExpectedSignature(bytes, extension)) {
    throw new Error(`File content does not match the ${extension} extension`)
  }
  const filename = path.basename(file)
  if (Buffer.byteLength(filename, 'utf8') > MAX_FILENAME_BYTES) {
    throw new Error('Cover filename exceeds the Notion limit of 900 UTF-8 bytes')
  }

  return {
    absolutePath: file,
    bytes,
    contentType,
    filename,
    relativePath: path.relative(REPOSITORY_ROOT, file),
    size: fileStat.size
  }
}

/**
 * @param {any} property
 * @returns {string}
 */
function getPropertyText(property) {
  if (!property || typeof property !== 'object') {
    return ''
  }

  const value = property[property.type]
  if (Array.isArray(value)) {
    return value.map(item => item?.plain_text || '').join('')
  }
  return typeof value === 'string' ? value : ''
}

/**
 * @param {string[]} args
 * @param {{input?: Buffer | string, stage: string}} options
 * @returns {Promise<string>}
 */
function runNtn(args, { input, stage }) {
  return new Promise((resolve, reject) => {
    const child = spawn('ntn', args, {
      cwd: REPOSITORY_ROOT,
      stdio: ['pipe', 'pipe', 'pipe']
    })
    let settled = false
    /** @type {Error | undefined} */
    let stdinError
    /** @type {Buffer[]} */
    const stdout = []
    /** @type {Buffer[]} */
    const stderr = []

    child.stdout.on('data', chunk => stdout.push(Buffer.from(chunk)))
    child.stderr.on('data', chunk => stderr.push(Buffer.from(chunk)))
    child.stdin.on('error', error => {
      stdinError = error
    })
    child.on('error', error => {
      if (settled) {
        return
      }
      settled = true
      const errorCode = /** @type {{code?: string}} */ (error).code
      if (errorCode === 'ENOENT') {
        reject(
          new Error(
            `${stage} failed: official Notion CLI "ntn" is not installed`
          )
        )
        return
      }
      reject(new Error(`${stage} failed: ${error.message}`))
    })
    child.on('close', code => {
      if (settled) {
        return
      }
      settled = true
      const output = Buffer.concat(stdout).toString('utf8').trim()
      const errorOutput = Buffer.concat(stderr).toString('utf8').trim()
      if (code !== 0) {
        reject(
          new Error(
            `${stage} failed: ${errorOutput || output || `ntn exited with code ${code}`}`
          )
        )
        return
      }
      if (stdinError) {
        reject(
          new Error(`${stage} failed while sending input: ${stdinError.message}`)
        )
        return
      }
      resolve(output)
    })

    child.stdin.end(input)
  })
}

/**
 * @param {string[]} args
 * @param {{input?: Buffer | string, stage: string}} options
 * @returns {Promise<any>}
 */
async function runNtnJson(args, options) {
  const output = await runNtn(args, options)
  try {
    return output ? JSON.parse(output) : {}
  } catch {
    throw new Error(`${options.stage} failed: ntn returned non-JSON output`)
  }
}

/**
 * @param {{expectedSlug: string, pageId: string, replaceExistingCover: boolean}} input
 * @returns {Promise<{actualSlug: string, replacedExistingCover: boolean}>}
 */
async function preflightPage({
  expectedSlug,
  pageId,
  replaceExistingCover
}) {
  const page = await runNtnJson(
    ['api', `v1/pages/${pageId}`, '--notion-version', API_VERSION],
    { stage: 'Fetch target page' }
  )
  const slugEntry = Object.entries(page.properties || {}).find(
    ([name]) => name.toLowerCase() === 'slug'
  )
  const actualSlug = getPropertyText(slugEntry?.[1])

  if (!actualSlug) {
    throw new Error('Target page has no readable slug property')
  }
  if (actualSlug !== expectedSlug) {
    throw new Error(
      `Target page slug mismatch: expected "${expectedSlug}", received "${actualSlug}"`
    )
  }

  const replacedExistingCover = Boolean(page.cover)
  if (replacedExistingCover && !replaceExistingCover) {
    throw new Error(
      'Target page already has a Cover; rerun with --replace-existing-cover only after explicit approval'
    )
  }

  return { actualSlug, replacedExistingCover }
}

/**
 * @param {{cover: ValidatedCover, expectedSlug: string, pageId: string, replaceExistingCover: boolean}} input
 * @returns {Promise<{attachmentPreflight: {actualSlug: string, replacedExistingCover: boolean}, uploadId: string}>}
 */
async function uploadCover({
  cover,
  expectedSlug,
  pageId,
  replaceExistingCover
}) {
  const upload = await runNtnJson(
    [
      'files',
      'create',
      '--json',
      '--filename',
      cover.filename,
      '--content-type',
      cover.contentType,
      '--notion-version',
      API_VERSION
    ],
    {
      input: cover.bytes,
      stage: 'Create and send file upload'
    }
  )

  if (!upload.id || upload.status !== 'uploaded') {
    throw new Error(
      `Create and send file upload failed: expected uploaded status, received ${upload.status || 'unknown'}`
    )
  }

  const attachmentPreflight = await preflightPage({
    expectedSlug,
    pageId,
    replaceExistingCover
  })

  await runNtnJson(
    [
      'api',
      `v1/pages/${pageId}`,
      '-X',
      'PATCH',
      '--notion-version',
      API_VERSION,
      '--data',
      JSON.stringify({
        cover: {
          type: 'file_upload',
          file_upload: { id: upload.id }
        }
      })
    ],
    { stage: 'Attach page Cover' }
  )

  return { attachmentPreflight, uploadId: upload.id }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    process.stdout.write(usage)
    return
  }

  const pageId = normalizePageId(options.pageId)
  const expectedSlug = requireExpectedSlug(options.expectedSlug)
  const workspaceMaxFileSize = Math.floor(
    options.workspaceLimitMb * 1024 * 1024
  )
  const cover = await validateCover(options.file, workspaceMaxFileSize)
  const validation = {
    pageId,
    expectedSlug,
    file: cover.relativePath,
    contentType: cover.contentType,
    bytes: cover.size,
    filenameBytes: Buffer.byteLength(cover.filename, 'utf8'),
    workspaceLimitBytes: workspaceMaxFileSize
  }

  if (options.dryRun) {
    process.stdout.write(
      `${JSON.stringify(
        {
          status: 'valid',
          dryRun: true,
          pagePreflight: 'not-run',
          ...validation
        },
        null,
        2
      )}\n`
    )
    return
  }

  const initialPagePreflight = await preflightPage({
    expectedSlug,
    pageId,
    replaceExistingCover: options.replaceExistingCover
  })
  if (options.preflightOnly) {
    process.stdout.write(
      `${JSON.stringify(
        {
          status: 'valid',
          dryRun: false,
          preflightOnly: true,
          ...validation,
          initialPagePreflight
        },
        null,
        2
      )}\n`
    )
    return
  }

  const { attachmentPreflight, uploadId } = await uploadCover({
    cover,
    expectedSlug,
    pageId,
    replaceExistingCover: options.replaceExistingCover
  })
  process.stdout.write(
    `${JSON.stringify(
      {
        status: 'attached',
        ...validation,
        initialPagePreflight,
        attachmentPreflight,
        uploadId,
        coverType: 'file_upload'
      },
      null,
      2
    )}\n`
  )
}

main().catch(error => {
  process.stderr.write(`Cover upload error: ${error.message}\n`)
  process.exitCode = 1
})
