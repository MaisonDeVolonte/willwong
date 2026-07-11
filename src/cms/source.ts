/**
 * ========================================================================================
 * @file source.ts - runtime content source (git-as-CMS)
 * ========================================================================================
 * @description
 * - returns a flat path→body map of content/, the same shape pages.ts consumed from the bundle
 * - production (workerd) fetches content/ from the `main` branch via the GitHub API at runtime,
 *   so pushing to main publishes without a deploy; results are cached under the `content` tag
 * - dev/CI (node) reads the local content/ folder from disk for instant, hermetic previews
 * @see /src/cms/pages.ts/, /scripts/content.mjs/
 */

import { cache } from "react";

const REPO_OWNER = "MaisonDeVolonte";
const REPO_NAME = "willwong";
const BRANCH = "main";
const CONTENT_PREFIX = "content/";

// Content is tiny/all-text, so we fetch the whole tree and cache it until a publish
// invalidates the tag. `revalidateTag("content")` (or the timer) refreshes it.
export const CONTENT_TAG = "content";
const REVALIDATE_SECONDS = 60;

export type ContentMap = Record<string, string>;

// Prod (no fs) must use GitHub; dev uses fs for instant local preview. CONTENT_SOURCE
// overrides both — CI sets it to "local" so builds/e2e are hermetic (tested against the
// branch's own content, not whatever currently sits on main).
function chooseSource(): "local" | "github" {
  const override = process.env.CONTENT_SOURCE;
  if (override === "local" || override === "github") return override;
  return process.env.NODE_ENV === "production" ? "github" : "local";
}

// Memoized per request (React cache): getAllPages, populatePageContent, and getContent
// share a single fetch within one render.
export const getContentMap = cache(async (): Promise<ContentMap> => {
  return chooseSource() === "local" ? readLocalContent() : readGithubContent();
});

/* -------------------------------------------------------------------------- */
/* local source (dev / CI): read content/ from disk                            */
/* -------------------------------------------------------------------------- */

async function readLocalContent(): Promise<ContentMap> {
  // Dynamic import keeps node:fs out of the workerd bundle's evaluated path.
  const { readdir, readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const root = join(process.cwd(), "content");

  const out: ContentMap = {};
  async function walk(dir: string, base = ""): Promise<void> {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const rel = base ? `${base}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(join(dir, entry.name), rel);
      else if (entry.isFile()) out[rel] = await readFile(join(dir, entry.name), "utf-8");
    }
  }
  await walk(root);
  return out;
}

/* -------------------------------------------------------------------------- */
/* github source (production): fetch content/ from the main branch             */
/* -------------------------------------------------------------------------- */

async function readGithubContent(): Promise<ContentMap> {
  const paths = await listContentPaths();
  const entries = await Promise.all(
    paths.map(async (rel) => [rel, await fetchRawFile(rel)] as const),
  );
  return Object.fromEntries(entries);
}

// One recursive tree call lists every file under content/ (paths relative to content/).
async function listContentPaths(): Promise<string[]> {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;
  const res = await fetch(url, {
    headers: await githubHeaders(),
    next: { revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAG] },
  });
  if (!res.ok) throw new Error(`GitHub tree fetch failed: ${res.status} ${res.statusText}`);

  const data = (await res.json()) as { tree?: { path: string; type: string }[] };
  return (data.tree ?? [])
    .filter((node) => node.type === "blob" && node.path.startsWith(CONTENT_PREFIX))
    .map((node) => node.path.slice(CONTENT_PREFIX.length));
}

// Bodies come from raw.githubusercontent (public CDN, no auth needed, generous limits).
async function fetchRawFile(rel: string): Promise<string> {
  const encoded = rel.split("/").map(encodeURIComponent).join("/");
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${CONTENT_PREFIX}${encoded}`;
  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS, tags: [CONTENT_TAG] },
  });
  if (!res.ok) throw new Error(`GitHub raw fetch failed (${res.status}): ${rel}`);
  return res.text();
}

async function githubHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": `${REPO_NAME}-cms`,
  };
  const token = await githubToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

// Optional read-only token raises the tree API limit from 60/hr to 5000/hr. Injected as a
// Webflow Cloud runtime secret; absent at build (static prerender), where unauth is fine.
async function githubToken(): Promise<string | undefined> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const value = (getCloudflareContext().env as Record<string, unknown>).GITHUB_TOKEN;
    if (typeof value === "string" && value) return value;
  } catch {
    // No request context (e.g. build-time prerender) — fall through to process.env.
  }
  return process.env.GITHUB_TOKEN || undefined;
}
