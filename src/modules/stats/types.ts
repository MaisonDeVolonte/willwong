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

export type ProjectStats = {
  age?: string;
  size?: string;
  files?: string;
};

export type CodeStats = {
  lines?: string;
  churn?: string;
  coverage?: string;
  commits?: string;
};
