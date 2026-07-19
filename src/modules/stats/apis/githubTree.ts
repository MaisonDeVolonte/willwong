/**
 * ================================================================
 * @file githubTree.ts - cached recursive tree walk (Git Trees API)
 * ================================================================
 * @description
 * - single source for anything derived from the full file tree (language bytes, file count)
 * - one cached call feeds every tree-shaped stat instead of one Trees API call per stat
 * @see /src/modules/stats/languages.ts/, /src/modules/stats/files.ts/
 */

import { unstable_cache } from "next/cache";
import { getGithubToken } from "@/utilities/githubToken";
import { REPO_OWNER, REPO_NAME, BRANCH } from "@/utilities/githubRepo";

export const GITHUB_TREE_TAG = "github-stats-tree";
const REVALIDATE_SECONDS = 3600;

export type TreeNode = { path: string; type: string; size?: number };

// excludes by filename or folder/
const EXCLUDED_PATHS = ["package-lock.json", "webflow/"];

export function isExcluded(path: string, basename: string): boolean {
  const matchesDenylist = EXCLUDED_PATHS.some((pattern) =>
    pattern.endsWith("/") ? path.startsWith(pattern) : basename === pattern,
  );
  if (matchesDenylist) return true;

  // excludes dotfiles and extensionless files
  return basename.lastIndexOf(".") <= 0;
}

export const getGithubTree = unstable_cache(
  async (): Promise<TreeNode[]> => {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": `${REPO_NAME}-stats`,
    };
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
