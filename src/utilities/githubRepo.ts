/**
 * ===========================================================
 * @file githubRepo.ts - shared repo identity and cache config
 * ===========================================================
 * @description
 * - single source of truth for which repo/branch every GitHub API call targets
 * - holds every cache tag/revalidate window
 * @see /src/apis/, /src/modules/stats/, /src/cms/source.ts/
 */

export const REPO_OWNER = "MaisonDeVolonte";
export const REPO_NAME = "willwong";
export const REPO_BRANCH = "main";

export const CACHE_CONTENT_TAG = "content-tag";
export const CACHE_CONTENT_REVALIDATE = 60;

export const CACHE_STATS_TAG = "stats-tag";
export const CACHE_STATS_REVALIDATE = 3600;
