/**
 * ======================================================================
 * @file aggregate.ts - merges raw stats sources into widget-ready shapes
 * ======================================================================
 * @description
 * - single cache tag (`STATS_TAG`) across every source, so
 * - `route.ts` only needs one `revalidateTag` call regardless of sources
 * - each getter fails soft (empty result) rather than throwing
 * @see /src/modules/stats/languageBytes.ts/, /src/modules/stats/Languages.tsx/
 */

import { unstable_cache } from "next/cache";
import { getExtensionBytes } from "@/modules/stats/languageBytes";
import type { LanguageStat } from "@/modules/stats/types";

export const STATS_TAG = "github-stats";
const REVALIDATE_SECONDS = 3600;

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
