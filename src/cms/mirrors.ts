/**
 * ========================================================================================
 * @file mirrors.ts - resolves @mirror targets from the bundle or the operator repo
 * ========================================================================================
 * @description
 * - in-repo targets resolve from the build-time bundle, so the site shows the code it runs
 * - operator targets live in another repo, so they resolve at request time via git-as-CMS
 * - operator fetches are lazy and per-target, cached under CACHE_MIRROR_TAG
 * - dev/CI read operator targets from disk (the local symlink) to stay hermetic and offline
 * @see src/cms/directives.ts, src/cms/source.ts, src/utilities/githubRepo.ts
 */

import { unstable_cache } from "next/cache";
import { githubFetch } from "@/apis/githubFetch";
import { parseMirrorTarget, processMirror } from "@/cms/directives";
import {
  OPERATOR_OWNER,
  OPERATOR_NAME,
  OPERATOR_BRANCH,
  CACHE_MIRROR_TAG,
  CACHE_MIRROR_REVALIDATE,
} from "@/utilities/githubRepo";

// The agent scaffold is the one mirror source that lives outside this repo.
export function isOperatorTarget(target: string): boolean {
  return target === "AGENTS.md" || target.startsWith("AGENTS/");
}

// Same override contract as src/cms/source.ts: CI pins "local" so builds stay hermetic.
function chooseSource(): "local" | "github" {
  const override = process.env.CONTENT_SOURCE;
  if (override === "local" || override === "github") return override;
  return process.env.NODE_ENV === "production" ? "github" : "local";
}

// Kept identical to the build-time miss text, so a placeholder reads the same either way.
function notFound(target: string): string {
  return `// @mirror target not found: ${target}`;
}

// Dev only: the local AGENTS symlink points at the operator checkout on disk.
async function readOperatorLocal(target: string): Promise<string> {
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  return readFile(join(process.cwd(), target), "utf-8");
}

async function fetchOperatorRaw(target: string): Promise<string> {
  const encoded = target.split("/").map(encodeURIComponent).join("/");
  const url = `https://raw.githubusercontent.com/${OPERATOR_OWNER}/${OPERATOR_NAME}/${OPERATOR_BRANCH}/${encoded}`;
  const res = await githubFetch(url, {});
  if (!res.ok) throw new Error(`operator mirror fetch failed (${res.status}): ${target}`);
  return res.text();
}

// Cached per target, so visiting one page fetches one file instead of all 28.
function getCachedOperatorFile(target: string): Promise<string> {
  return unstable_cache(() => fetchOperatorRaw(target), ["operator-mirror", target], {
    tags: [CACHE_MIRROR_TAG],
    revalidate: CACHE_MIRROR_REVALIDATE,
  })();
}

// A miss degrades to a placeholder rather than throwing: the page still renders, and the
// next revalidate self-heals it. A build-time bundle could not recover the same way.
async function resolveOperatorTarget(target: string): Promise<string> {
  try {
    return chooseSource() === "local"
      ? await readOperatorLocal(target)
      : await getCachedOperatorFile(target);
  } catch {
    return notFound(target);
  }
}

/** Resolves an @mirror directive, from the bundle or from operator. */
export async function resolveMirror(content: string): Promise<string> {
  const target = parseMirrorTarget(content);
  if (target === undefined) return content;
  if (isOperatorTarget(target)) return resolveOperatorTarget(target);
  return processMirror(content);
}
