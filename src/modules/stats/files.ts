/**
 * ==================================
 * @file files.ts - total files count
 * ==================================
 * @description
 * - walks the git-tree and counts total files
 * - skips non-files, empty files, and excluded files
 * - cached under the shared CACHE_STATS_TAG, fails soft (undefined) rather than throwing
 * @see /src/apis/githubGitTrees.ts/, /src/modules/stats/Stats.tsx/
 */

import { unstable_cache } from "next/cache";
import { getGithubTree } from "@/apis/githubGitTrees";
import { isExcluded } from "@/modules/stats/exclusions.mjs";
import { CACHE_STATS_TAG, CACHE_STATS_REVALIDATE } from "@/utilities/githubRepo";

export const getFileStats = unstable_cache(
  async (): Promise<number | undefined> => {
    try {
      const githubTree = await getGithubTree();

      return githubTree.filter((node) => {
        if (node.type !== "blob" || !node.size) return false;

        const filename = node.path.split("/").pop() ?? "";
        return !isExcluded(node.path, filename);
      }).length;
    } catch {
      return undefined;
    }
  },
  // cache key, tag, and revalidate timer
  ["files"],
  { tags: [CACHE_STATS_TAG], revalidate: CACHE_STATS_REVALIDATE },
);
