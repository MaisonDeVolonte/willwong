/**
 * ======================================================================
 * @file contributors.ts - commit/churn totals summed across contributors
 * ======================================================================
 * @description
 * - sums `apis/githubContributors.ts`'s per-contributor weekly stats into repo-wide totals
 * - `null` (contributors stats not ready yet) passes through untouched
 * @see /src/modules/stats/apis/githubContributors.ts/, /src/modules/stats/aggregate.ts/
 */

import { getGithubContributors } from "@/modules/stats/apis/githubContributors";

export type ContributorTotals = { commits: number; additions: number; deletions: number };

export async function getContributorTotals(): Promise<ContributorTotals | null> {
  const contributors = await getGithubContributors();
  if (!contributors) return null;

  return contributors.reduce(
    (totals, contributor) => {
      totals.commits += contributor.total;
      for (const week of contributor.weeks) {
        totals.additions += week.a;
        totals.deletions += week.d;
      }
      return totals;
    },
    { commits: 0, additions: 0, deletions: 0 },
  );
}
