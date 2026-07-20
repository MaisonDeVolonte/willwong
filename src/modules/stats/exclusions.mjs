/**
 * ===================================================
 * @file exclusions.mjs - shared file-exclusion filter
 * ===================================================
 * @description
 * - single source of truth across file-tree-based stats
 * - used in `stats/files.ts`, `scripts/loc.mjs`, `scripts/churn.mjs`, and `stats/languages.ts`
 * - plain .mjs so `apis/githubTree.ts` (runtime) and `scripts/loc.mjs` (build-time) import the same list
 * - note: `githubMeta.ts` and `githubContributors.ts` have no path-level filtering: age, size, commits
 * @see /src/modules/stats/apis/githubTree.ts/, /scripts/loc.mjs/
 */

export const DENY_LIST = [
  "package-lock.json",
  "webflow/",
  "content/",
  "AGENTS/",
  "AGENTS.md",
  ".claude/",
  ".grok/",
];

// single file in, single boolean out
export function isExcluded(relativePath, filename) {
  const isDotfile = filename.startsWith(".");
  const isExtensionless = filename.lastIndexOf(".") === -1;

  const matchesDenylist = DENY_LIST.some((denyItem) => {
    const isFolder = denyItem.endsWith("/");
    if (isFolder) return relativePath.startsWith(denyItem);
    return filename === denyItem;
  });

  return matchesDenylist || isExtensionless || isDotfile;
}
