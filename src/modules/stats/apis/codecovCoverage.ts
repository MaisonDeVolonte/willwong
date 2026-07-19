/**
 * ============================================================
 * @file codecovCoverage.ts - cached total coverage % (codecov)
 * ============================================================
 * @description
 * - codecov's v2 API exposes the latest total coverage right on the repo resource,
 *   no auth needed for a public repo — one GET covers it
 * @see /src/modules/stats/aggregate.ts/
 */

import { unstable_cache } from "next/cache";
import { REPO_OWNER, REPO_NAME } from "@/utilities/githubRepo";

export const CODECOV_TAG = "github-stats-codecov";
const REVALIDATE_SECONDS = 3600;

export const getCodecovCoverage = unstable_cache(
  async (): Promise<number | null> => {
    const url = `https://api.codecov.io/api/v2/github/${REPO_OWNER}/repos/${REPO_NAME}/`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Codecov fetch failed: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as { totals: { coverage: number } | null };
    return data.totals?.coverage ?? null;
  },
  ["codecov-coverage"],
  { tags: [CODECOV_TAG], revalidate: REVALIDATE_SECONDS },
);
