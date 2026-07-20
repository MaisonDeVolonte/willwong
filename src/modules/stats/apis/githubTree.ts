/**
 * =================================================================
 * @file githubTree.ts - requests repo's file tree via Git Trees API
 * =================================================================
 * @description
 * - single source for anything derived from the file tree (language bytes, file count)
 * - normalizes github's raw tree json into a flat TreeNode[] ({ path, type, size? })
 * - result is cached and revalidated every hour; subsequent callers get cached result
 * @see /src/modules/stats/languages.ts/, /src/modules/stats/files.ts/, /src/modules/stats/exclusions.mjs/
 */

import { unstable_cache } from "next/cache";
import { getGithubToken } from "@/utilities/githubToken";
import { REPO_OWNER, REPO_NAME, REPO_BRANCH } from "@/utilities/githubRepo";

export { isExcluded } from "@/modules/stats/exclusions.mjs";

const REVALIDATE_SECONDS = 3600;
export const GITHUB_TREE_TAG = "github-stats-tree";
export type TreeNode = { path: string; type: string; size?: number };

export const getGithubTree = unstable_cache(
  async (): Promise<TreeNode[]> => {
    // recursive=1 walks the whole tree in one call
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${REPO_BRANCH}?recursive=1`;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      // github rejects requests with no user-agent
      "User-Agent": `${REPO_NAME}-stats`,
    };
    // github token is optional, unauthenticated works with lower rate limit
    const token = await getGithubToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub tree fetch failed: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as { tree?: TreeNode[] };
    return data.tree ?? [];
  },
  ["github-tree"],
  { tags: [GITHUB_TREE_TAG], revalidate: REVALIDATE_SECONDS },
);
