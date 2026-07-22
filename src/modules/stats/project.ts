/**
 * ====================================
 * @file project.ts - repo age and size
 * ====================================
 * @description
 * - derives age and size from githubRepos.ts repo record
 * - fails soft (null) rather than throwing
 * @see /src/apis/githubRepos.ts/, /src/modules/stats/Stats.tsx/
 */

import { unstable_cache } from "next/cache";
import { getGithubRepo } from "@/apis/githubRepos";
import { CACHE_STATS_TAG, CACHE_STATS_REVALIDATE } from "@/utilities/githubRepo";

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

export type ProjectInfo = { age: string; size: string };

export const getProjectStats = unstable_cache(
  async (): Promise<ProjectInfo | null> => {
    try {
      const { createdAt, sizeKb } = await getGithubRepo();
      const years = (Date.now() - new Date(createdAt).getTime()) / MS_PER_YEAR;
      return { age: `${years.toFixed(1)} yrs`, size: `${(sizeKb / 1024).toFixed(1)} mb` };
    } catch { return null; }
  },
  // cache key, tag, and revalidate timer
  ["project"],
  { tags: [CACHE_STATS_TAG], revalidate: CACHE_STATS_REVALIDATE },
);
