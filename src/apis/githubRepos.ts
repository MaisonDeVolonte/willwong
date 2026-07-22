/**
 * ====================================================================
 * @file githubRepos.ts - requests repo's metadata via GitHub Repos API
 * ====================================================================
 * @description
 * - single source for anything derived from the repo record (age, size)
 * - normalizes github's raw repo json into RepoMeta ({ createdAt, sizeKb })
 * - repo-wide data with no path-level filtering
 * - `exclusions.mjs` cannot apply here like it does for stats/languages.ts and stats/files.ts
 * @see /src/modules/stats/project.ts/, /src/apis/githubFetch.ts/
 */

import { unstable_cache } from "next/cache";
import { githubFetch, githubHeaders } from "@/apis/githubFetch";
import { REPO_OWNER, REPO_NAME, CACHE_STATS_TAG, CACHE_STATS_REVALIDATE } from "@/utilities/githubRepo";

export type RepoMeta = { createdAt: string; sizeKb: number };

export const getGithubRepo = unstable_cache(
  async (): Promise<RepoMeta> => {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
    const response = await githubFetch(url, { headers: await githubHeaders("repo") });
    if (!response.ok) throw new Error(`GitHub repo fetch failed: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as { created_at: string; size: number };
    return { createdAt: data.created_at, sizeKb: data.size };
  },
  // cache key, tag, and revalidate timer
  ["github-repo"],
  { tags: [CACHE_STATS_TAG], revalidate: CACHE_STATS_REVALIDATE },
);
