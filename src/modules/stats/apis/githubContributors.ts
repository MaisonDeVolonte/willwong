/**
 * ======================================================================
 * @file githubContributors.ts - cached contributor commit/churn stats
 * ======================================================================
 * @description
 * - one call covers both Commits (`.total` per contributor) and Churn (`weeks[].a`/`.d`)
 * - GitHub computes these stats async server-side; a cold cache returns `202` with an
 *   empty body — treated as "not ready yet" (`null`), not a fetch error
 * @see /src/modules/stats/aggregate.ts/
 */

import { unstable_cache } from "next/cache";
import { getGithubToken } from "@/utilities/githubToken";
import { REPO_OWNER, REPO_NAME } from "@/utilities/githubRepo";

export const GITHUB_CONTRIBUTORS_TAG = "github-stats-contributors";
const REVALIDATE_SECONDS = 3600;

export type ContributorWeek = { w: number; a: number; d: number; c: number };
export type ContributorStat = { total: number; weeks: ContributorWeek[] };

export const getGithubContributors = unstable_cache(
  async (): Promise<ContributorStat[] | null> => {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/stats/contributors`;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": `${REPO_NAME}-stats`,
    };
    const token = await getGithubToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(url, { headers });
    if (response.status === 202) return null;
    if (!response.ok) throw new Error(`GitHub contributors fetch failed: ${response.status} ${response.statusText}`);

    return (await response.json()) as ContributorStat[];
  },
  ["github-contributors"],
  { tags: [GITHUB_CONTRIBUTORS_TAG], revalidate: REVALIDATE_SECONDS },
);
