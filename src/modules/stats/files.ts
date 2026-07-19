/**
 * ============================================================
 * @file files.ts - file count from the shared tree walk
 * ============================================================
 * @description
 * - derives a plain blob count from the same tree `apis/githubTree.ts` and `languages.ts` share
 * @see /src/modules/stats/apis/githubTree.ts/, /src/modules/stats/aggregate.ts/
 */

import { getGithubTree, isExcluded } from "@/modules/stats/apis/githubTree";

export async function getFileCount(): Promise<number> {
  const tree = await getGithubTree();

  return tree.filter((node) => {
    if (node.type !== "blob") return false;
    const basename = node.path.split("/").pop() ?? "";
    return !isExcluded(node.path, basename);
  }).length;
}
