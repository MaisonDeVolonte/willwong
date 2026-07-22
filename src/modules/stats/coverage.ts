/**
 * =============================================
 * @file coverage.ts - total coverage percentage
 * =============================================
 * @description
 * - formats codecov.ts raw coverage number into a display string
 * - fails soft (undefined) rather than throwing
 * @see src/apis/codecov.ts/, codecov.yml, src/modules/stats/Stats.tsx/
 */

import { unstable_cache } from "next/cache";
import { getCodecovCoverage } from "@/apis/codecov";
import { CACHE_STATS_TAG, CACHE_STATS_REVALIDATE } from "@/utilities/githubRepo";

export const getCoverageStats = unstable_cache(
  async (): Promise<string | undefined> => {
    try {
      const coverage = await getCodecovCoverage();
      return coverage !== null ? `${coverage.toFixed(1)}%` : undefined;
    } catch { return undefined; }
  },
  // cache key, tag, and revalidate timer
  ["coverage"],
  { tags: [CACHE_STATS_TAG], revalidate: CACHE_STATS_REVALIDATE },
);
