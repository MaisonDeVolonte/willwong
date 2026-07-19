/**
 * ===================================================================
 * @file languageBytes.ts - byte counts per file extension across the repo
 * ===================================================================
 * @description
 * - reuses the Git Trees API
 * - walks the full tree
 * - blob `size` fields included
 * @see /src/cms/source.ts/, /src/modules/stats/aggregate.ts/
 */

import { unstable_cache } from "next/cache";
import { getGithubToken } from "@/utilities/githubToken";

const REPO_OWNER = "MaisonDeVolonte";
const REPO_NAME = "willwong";
const BRANCH = "main";

export const EXTENSION_BYTES_TAG = "github-stats-extensions";
const REVALIDATE_SECONDS = 3600;

export type ExtensionBytes = Record<string, number>;

// excludes by filename or folder/
const EXCLUDED_PATHS = ["package-lock.json", "webflow/"];

function isExcluded(path: string, basename: string): boolean {
  const matchesDenylist = EXCLUDED_PATHS.some((pattern) =>
    pattern.endsWith("/") ? path.startsWith(pattern) : basename === pattern,
  );
  if (matchesDenylist) return true;

  // excludes dotfiles and extensionless files
  return basename.lastIndexOf(".") <= 0;
}

export const getExtensionBytes = unstable_cache(
  async (): Promise<ExtensionBytes> => {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": `${REPO_NAME}-stats`,
    };
    const token = await getGithubToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub tree fetch failed: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as { tree?: { path: string; type: string; size?: number }[] };
    const bytes: ExtensionBytes = {};

    for (const node of data.tree ?? []) {
      if (node.type !== "blob" || !node.size) continue;

      const basename = node.path.split("/").pop() ?? "";
      if (isExcluded(node.path, basename)) continue;

      const dot = basename.lastIndexOf(".");
      const ext = basename.slice(dot + 1).toLowerCase();
      bytes[ext] = (bytes[ext] ?? 0) + node.size;
    }

    return bytes;
  },
  ["github-extension-bytes"],
  { tags: [EXTENSION_BYTES_TAG], revalidate: REVALIDATE_SECONDS },
);
