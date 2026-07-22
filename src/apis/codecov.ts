/**
 * =============================================================
 * @file codecov.ts - requests repo's coverage % via Codecov API
 * =============================================================
 * @description
 * - no auth needed for a public repo — one GET covers it
 * - `head_commit.totals` reflects the latest codecov report
 * - note: the repo-level `totals` field lags, use branch-level
 * @see /src/modules/stats/coverage.ts/
 */

import { unstable_cache } from "next/cache";
import {
  REPO_OWNER,
  REPO_NAME,
  REPO_BRANCH,
  CACHE_STATS_TAG,
  CACHE_STATS_REVALIDATE,
} from "@/utilities/githubRepo";

export const getCodecovCoverage = unstable_cache(
  async (): Promise<number | null> => {
    const url = `https://api.codecov.io/api/v2/github/${REPO_OWNER}/repos/${REPO_NAME}/branches/${REPO_BRANCH}/`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Codecov fetch failed: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as { head_commit: { totals: { coverage: number } | null } | null };
    return data.head_commit?.totals?.coverage ?? null;
  },
  // getCodecovCoverage takes no args, so this string is the only cache key
  ["codecov"],
  { tags: [CACHE_STATS_TAG], revalidate: CACHE_STATS_REVALIDATE },
);
