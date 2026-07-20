/**
 * ============================================================
 * @file codecov.ts - cached total coverage % (codecov)
 * ============================================================
 * @description
 * - the repo-level resource's `totals` field lags/never updates reliably (confirmed live:
 *   stayed `null` minutes after a fully-processed upload) — the branch resource's
 *   `head_commit.totals` reflects the latest report immediately, so that's the one to use
 * - no auth needed for a public repo — one GET covers it
 * @see /src/modules/stats/aggregate.ts/
 */

import { unstable_cache } from "next/cache";
import { REPO_OWNER, REPO_NAME, REPO_BRANCH } from "@/utilities/githubRepo";

export const CODECOV_TAG = "github-stats-codecov";
const REVALIDATE_SECONDS = 3600;

export const getCodecovCoverage = unstable_cache(
  async (): Promise<number | null> => {
    const url = `https://api.codecov.io/api/v2/github/${REPO_OWNER}/repos/${REPO_NAME}/branches/${REPO_BRANCH}/`;
    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Codecov fetch failed: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as { head_commit: { totals: { coverage: number } | null } | null };
    return data.head_commit?.totals?.coverage ?? null;
  },
  ["codecov-coverage"],
  { tags: [CODECOV_TAG], revalidate: REVALIDATE_SECONDS },
);
