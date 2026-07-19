/**
 * =======================================================
 * @file languages.ts - byte counts per file extension
 * =======================================================
 * @description
 * - derives extension byte totals from the shared tree walk (`apis/githubTree.ts`)
 * @see /src/modules/stats/apis/githubTree.ts/, /src/modules/stats/aggregate.ts/
 */

import { getGithubTree, isExcluded } from "@/modules/stats/apis/githubTree";

export type ExtensionBytes = Record<string, number>;

export async function getExtensionBytes(): Promise<ExtensionBytes> {
  const tree = await getGithubTree();
  const bytes: ExtensionBytes = {};

  for (const node of tree) {
    if (node.type !== "blob" || !node.size) continue;

    const basename = node.path.split("/").pop() ?? "";
    if (isExcluded(node.path, basename)) continue;

    const dot = basename.lastIndexOf(".");
    const ext = basename.slice(dot + 1).toLowerCase();
    bytes[ext] = (bytes[ext] ?? 0) + node.size;
  }

  return bytes;
}
