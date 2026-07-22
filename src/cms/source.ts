/**
 * ========================================================================================
 * @file source.ts - runtime content source (git-as-CMS)
 * ========================================================================================
 * @description
 * - returns a flat path→body map of content/, the same shape pages.ts consumed from the bundle
 * - production (workerd) fetches content/ from the `main` branch via the GitHub API at runtime,
 *   so pushing to main publishes without a deploy; results are cached under CACHE_CONTENT_TAG
 * - dev/CI (node) reads the local content/ folder from disk for instant, hermetic previews
 * @see /src/cms/pages.ts/, /scripts/content.mjs/, /src/apis/githubFetch.ts/
 */

import { unstable_cache } from "next/cache";
import { githubFetch, githubHeaders } from "@/apis/githubFetch";
import {
  REPO_OWNER,
  REPO_NAME,
  REPO_BRANCH,
  CACHE_CONTENT_TAG,
  CACHE_CONTENT_REVALIDATE,
} from "@/utilities/githubRepo";

const CONTENT_PREFIX = "content/";

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
export const getContentMap = async (): Promise<ContentMap> => {
  return chooseSource() === "local" ? readLocalContent() : getCachedGithubContent();
};

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

      // finder artifact that gitignore can't filter on raw fs walk
      if (entry.name === ".DS_Store") continue;

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

const FETCH_CONCURRENCY = 12;

// Concurrency-limited map so a cold load doesn't burst ~100 requests at GitHub at once
// (which self-throttles into 503s).
async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker(): Promise<void> {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

const getCachedGithubContent = unstable_cache(
  async (): Promise<ContentMap> => {
    const paths = await listContentPaths();
    const entries = await mapLimit(
      paths,
      FETCH_CONCURRENCY,
      async (rel) => [rel, await fetchRawFile(rel)] as const,
    );
    return Object.fromEntries(entries);
  },
  ["content-map"],
  { tags: [CACHE_CONTENT_TAG], revalidate: CACHE_CONTENT_REVALIDATE }
);

// One recursive tree call lists every file under content/ (paths relative to content/).
async function listContentPaths(): Promise<string[]> {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${REPO_BRANCH}?recursive=1`;
  const res = await githubFetch(url, {
    headers: await githubHeaders("cms"),
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
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${CONTENT_PREFIX}${encoded}`;
  const res = await githubFetch(url, {});
  if (!res.ok) throw new Error(`GitHub raw fetch failed (${res.status}): ${rel}`);
  return res.text();
}
