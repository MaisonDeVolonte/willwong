/**
 * ===============================================
 * @file types.ts - shared shapes for stats widget
 * ===============================================
 * @see /src/modules/stats/aggregate.ts/
 */

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

export type LanguageStat = {
  ext: string;
  bytes: number;
  percent: number;
};
