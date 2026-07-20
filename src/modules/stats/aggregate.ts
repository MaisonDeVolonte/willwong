/**
 * ======================================================================
 * @file aggregate.ts - merges raw stats sources into widget-ready shapes
 * ======================================================================
 * @description
 * - single cache tag (`STATS_TAG`) across every source, so
 * - `route.ts` only needs one `revalidateTag` call regardless of sources
 * - each getter fails soft (empty result) rather than throwing
 * @see /src/modules/stats/apis/, /src/modules/stats/Stats.tsx/
 */

import { unstable_cache } from "next/cache";
import { getExtensionBytes } from "@/modules/stats/languages";
import { getFileCount } from "@/modules/stats/files";
import { getGithubMeta } from "@/modules/stats/apis/githubMeta";
import { getCodecovCoverage } from "@/modules/stats/apis/codecov";
import { LINES_OF_CODE } from "@/modules/stats/loc.generated";
import { ADDITIONS, DELETIONS } from "@/modules/stats/churn.generated";
import { TOTAL_COMMIT_COUNT } from "@/meta/config/version.generated";
import type { LanguageStat, ProjectStats, CodeStats } from "@/modules/stats/types";

export const STATS_TAG = "github-stats";
const REVALIDATE_SECONDS = 3600;
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

// 7,295 -> "7.3k"; below 1,000 stays as-is (e.g. "850")
function compact(n: number): string {
  return Math.abs(n) < 1000 ? n.toLocaleString() : `${(n / 1000).toFixed(1)}k`;
}

export const getLanguageStats = unstable_cache(
  async (): Promise<LanguageStat[]> => {
    let bytes: Record<string, number>;
    try {
      bytes = await getExtensionBytes();
    } catch {
      return [];
    }

    const total = Object.values(bytes).reduce((sum, n) => sum + n, 0);
    if (total === 0) return [];

    return Object.entries(bytes)
      .map(([ext, extBytes]): LanguageStat => ({
        ext,
        bytes: extBytes,
        percent: Math.round((extBytes / total) * 1000) / 10,
      }))
      // Drop anything under 1% — long-tail entries dilute the list without adding much
      .filter((stat) => stat.percent >= 1)
      .sort((a, b) => b.bytes - a.bytes);
  },
  ["github-stats-extensions-aggregate"],
  { tags: [STATS_TAG], revalidate: REVALIDATE_SECONDS },
);

export const getProjectStats = unstable_cache(
  async (): Promise<ProjectStats> => {
    const stats: ProjectStats = {};

    try {
      const { createdAt, sizeKb } = await getGithubMeta();
      const years = (Date.now() - new Date(createdAt).getTime()) / MS_PER_YEAR;
      stats.age = `${years.toFixed(1)} yrs`;
      stats.size = `${(sizeKb / 1024).toFixed(1)} mb`;
    } catch {
      // leave age/size unset
    }

    try {
      stats.files = (await getFileCount()).toLocaleString();
    } catch {
      // leave files unset
    }

    return stats;
  },
  ["github-stats-project-aggregate"],
  { tags: [STATS_TAG], revalidate: REVALIDATE_SECONDS },
);

export const getCodeStats = unstable_cache(
  async (): Promise<CodeStats> => {
    const stats: CodeStats = {
      lines: LINES_OF_CODE.toLocaleString(),
      churn: `+${compact(ADDITIONS)} / -${compact(DELETIONS)}`,
      commits: TOTAL_COMMIT_COUNT.toLocaleString(),
    };

    try {
      const coverage = await getCodecovCoverage();
      if (coverage !== null) stats.coverage = `${coverage.toFixed(1)}%`;
    } catch {
      // leave coverage unset
    }

    return stats;
  },
  ["github-stats-code-aggregate"],
  { tags: [STATS_TAG], revalidate: REVALIDATE_SECONDS },
);
