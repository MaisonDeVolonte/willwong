/**
 * ===========================================================
 * @file githubRepo.ts - shared repo identity and cache config
 * ===========================================================
 * @description
 * - single source of truth for which repo/branch every GitHub API call targets
 * - holds every cache tag/revalidate window
 * @see src/apis/, src/modules/stats/, src/cms/source.ts
 */

export const REPO_OWNER = "MaisonDeVolonte";
export const REPO_NAME = "willwong";
export const REPO_BRANCH = "main";

// agent scaffold lives in its own repo; mirrored into content/AGENTS/ at request time
export const OPERATOR_OWNER = "MaisonDeVolonte";
export const OPERATOR_NAME = "operator";
export const OPERATOR_BRANCH = "main";

export const CACHE_CONTENT_TAG = "content-tag";
export const CACHE_CONTENT_REVALIDATE = 60;

export const CACHE_MIRROR_TAG = "mirror-tag";
export const CACHE_MIRROR_REVALIDATE = 60;

export const CACHE_STATS_TAG = "stats-tag";
export const CACHE_STATS_REVALIDATE = 3600;
