/**
 * =======================================================================
 * @file githubGitTrees.ts - requests repo's file tree via GitHub Trees API
 * =======================================================================
 * @description
 * - single source for anything derived from the file tree (language bytes, file count)
 * - normalizes github's raw tree json into a flat TreeNode[] ({ path, type, size? })
 * - result is cached and revalidated every hour; subsequent callers get cached result
 * @see /src/modules/stats/languages.ts/, /src/modules/stats/files.ts/, /src/apis/githubFetch.ts/
 */

import { unstable_cache } from "next/cache";
import { githubFetch, githubHeaders } from "@/apis/githubFetch";
import {
  REPO_OWNER,
  REPO_NAME,
  REPO_BRANCH,
  CACHE_STATS_TAG,
  CACHE_STATS_REVALIDATE,
} from "@/utilities/githubRepo";

export type TreeNode = { path: string; type: string; size?: number };

export const getGithubTree = unstable_cache(
  async (): Promise<TreeNode[]> => {
    // recursive=1 walks the whole tree in one call
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${REPO_BRANCH}?recursive=1`;
    const response = await githubFetch(url, { headers: await githubHeaders("tree") });
    if (!response.ok) throw new Error(`GitHub tree fetch failed: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as { tree?: TreeNode[] };
    return data.tree ?? [];
  },
  // cache key, tag, and revalidate timer
  ["github-tree"],
  { tags: [CACHE_STATS_TAG], revalidate: CACHE_STATS_REVALIDATE },
);
