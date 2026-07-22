/**
 * =========================================
 * @file languages.ts - total language bytes
 * =========================================
 * @description
 * - getExtBytes
 *   - walks the git-tree to count bytes per file extension
 *   - skips non-files, empty files, and excluded files
 * - getLanguageStats
 *   - fails softly, rounds to 1 decimal, drops anything under 1%, and sorts descending
 *   - outputs a plain array (ext, bytes, and percent)
 * @see /src/apis/githubGitTrees.ts/, /src/modules/stats/Stats.tsx/
 */

import { unstable_cache } from "next/cache";
import { getGithubTree } from "@/apis/githubGitTrees";
import { isExcluded } from "@/modules/stats/exclusions.mjs";
import { CACHE_STATS_TAG, CACHE_STATS_REVALIDATE } from "@/utilities/githubRepo";

export type ExtBytesMap = Record<string, number>;
export type LanguageStat = { ext: string; bytes: number; percent: number; };

export async function getExtBytes(): Promise<ExtBytesMap> {
  const githubTree = await getGithubTree();
  const extBytesMap: ExtBytesMap = {};

  for (const node of githubTree) {
    if (node.type !== "blob" || !node.size) continue;

    const filename = node.path.split("/").pop() ?? "";
    if (isExcluded(node.path, filename)) continue;

    const dot = filename.lastIndexOf(".");
    const ext = filename.slice(dot + 1).toLowerCase();
    extBytesMap[ext] = (extBytesMap[ext] ?? 0) + node.size;
  }
  return extBytesMap;
}

export const getLanguageStats = unstable_cache(
  async (): Promise<LanguageStat[]> => {
    let map: ExtBytesMap;

    try { map = await getExtBytes(); }
    catch { return []; }

    let total = 0;
    for (const bytes of Object.values(map)) { total += bytes; }
    if (total === 0) return [];

    const stats: LanguageStat[] = [];
    for (const [ext, bytes] of Object.entries(map)) {
      const percent = Math.round((bytes / total) * 1000) / 10;
      if (percent >= 1) stats.push({ ext, bytes, percent });
    }

    stats.sort((a, b) => b.bytes - a.bytes);
    return stats;
  },
  // cache key, tag, and revalidate timer
  ["languages"],
  { tags: [CACHE_STATS_TAG], revalidate: CACHE_STATS_REVALIDATE },
);
