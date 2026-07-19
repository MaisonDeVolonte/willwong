/**
 * ==========================================================
 * @file types.ts - shared shapes for aggregated github stats
 * ==========================================================
 * @see /src/modules/stats/aggregate.ts/
 */

export type LanguageStat = {
  ext: string;
  bytes: number;
  percent: number;
};
