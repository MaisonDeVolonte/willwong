/**
 * ============================================================
 * @file Languages.tsx - list of code languages sorted by usage
 * ============================================================
 * @description
 * - server component
 * - fetches aggregated language stats
 * - sorted by most-used first
 * - wraps webflow's MenuSection.tsx and Language.tsx
 * @see /src/modules/stats/aggregate.ts/, /webflow/elements/Language.tsx/, /webflow/elements/MenuSection.tsx/
 */

import { readIcon } from "@/utilities/icons";
import { getLanguageStats } from "@/modules/stats/aggregate";
import { MenuSection } from "@webflow/elements/MenuSection";
import { Language } from "@webflow/elements/Language";

export default async function Languages() {
  const stats = await getLanguageStats();
  if (stats.length === 0) return null;

  // extensions match src/assets/icons/*.svg; falls back to readIcon's "fallback" icon
  const rows = await Promise.all(
    stats.map(async (stat) => {
      const svg = await readIcon(stat.ext);
      return (
        <Language
          key={stat.ext}
          label={stat.ext.toUpperCase()}
          value={stat.percent.toFixed(1)}
          icon={{ content: svg }}
          fill={{ style: { width: `${stat.percent}%` } }}
        />
      );
    }),
  );

  return <MenuSection label="Languages" slot={rows} />;
}
