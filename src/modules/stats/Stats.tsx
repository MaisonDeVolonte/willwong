/**
 * =====================================
 * @file Stats.tsx - footer stats widget
 * =====================================
 * @description
 * - server component, awaits sources directly, no client fetch/loading state
 * - grouping under each header is a layout decision, not a shared data shape
 * - fetches every stat source directly and composes the individual stat sections
 *   - stats render as plain label/value rows (`Stat`);
 *   - languages render as icon/label/bar/value rows (`Language`)
 *   - empty sections or rows are omitted entirely rather than faked (e.g. cold-cache 202)
 * - outputs a single `Stats` component that Layout.tsx renders
 * @see /src/modules/stats/languages.ts/, /src/modules/stats/project.ts/, /src/modules/stats/coverage.ts/,
 *   /src/modules/stats/files.ts/, /src/modules/stats/lines.generated.ts/, /src/modules/stats/churn.generated.ts/,
 *   /src/modules/stats/commits.generated.ts/, /src/utilities/icons.ts/, /webflow/elements/Stat.tsx/,
 *   /webflow/elements/Language.tsx/, /webflow/elements/MenuSection.tsx/
 */

import { Stat } from "@webflow/elements/Stat";
import { Language } from "@webflow/elements/Language";
import { MenuSection } from "@webflow/elements/MenuSection";

import { getProjectStats } from "@/modules/stats/project";
import { getFileStats } from "@/modules/stats/files";
import { getCoverageStats } from "@/modules/stats/coverage";
import { getLanguageStats } from "@/modules/stats/languages";

import { LINES_STAT } from "@/modules/stats/lines.generated";
import { ADDITIONS_STAT, DELETIONS_STAT } from "@/modules/stats/churn.generated";
import { COMMITS_STAT } from "@/modules/stats/commits.generated";

import { readIcon } from "@/utilities/icons";

// round to nearest thousandth (e.g. 7,295 -> "7.3k"; below 1,000 stays as-is)
function compactNumber(value: number): string {
  return Math.abs(value) < 1000 ? value.toLocaleString() : `${(value / 1000).toFixed(1)}k`;
}

// inputs a set of fields and outputs a list of `Stat` components; skips undefined values
function mapFieldsToStats(fields: Record<string, string | undefined>): React.ReactNode[] {
  const statComponents: React.ReactNode[] = [];

  for (const [label, value] of Object.entries(fields)) {
    if (value === undefined) continue;
    statComponents.push(<Stat key={label} label={label} value={value} />);
  }

  return statComponents;
}

export default async function Stats() {
  const [projectStats, fileStats, coverageStats, languageStats] = await Promise.all([
    getProjectStats(),
    getFileStats(),
    getCoverageStats(),
    getLanguageStats(),
  ]);

  const projectSection = mapFieldsToStats({
    Age: projectStats?.age,
    Size: projectStats?.size,
    Files: fileStats?.toLocaleString(),
  });

  const codeSection = mapFieldsToStats({
    Lines: LINES_STAT.toLocaleString(),
    Churn: `+${compactNumber(ADDITIONS_STAT)} / -${compactNumber(DELETIONS_STAT)}`,
    Coverage: coverageStats,
    Commits: COMMITS_STAT.toLocaleString(),
  });

  // extensions match src/assets/icons/*.svg; falls back to readIcon's "fallback" icon
  const languageSection = await Promise.all(
    languageStats.map(async (stat) => {
      const svg = await readIcon(stat.ext);
      return (
        <Language
          key={stat.ext}
          label={stat.ext.toUpperCase()}
          value={`${stat.percent.toFixed(1)}%`}
          icon={{ content: svg }}
          fill={{ style: { width: `${stat.percent}%` } }}
        />
      );
    }),
  );

  if (projectSection.length === 0 && codeSection.length === 0 && languageSection.length === 0) return null;

  return (
    <>
      {projectSection.length > 0 && <MenuSection label="Project" slot={projectSection} />}
      {codeSection.length > 0 && <MenuSection label="Code" slot={codeSection} />}
      {languageSection.length > 0 && <MenuSection label="Languages" slot={languageSection} />}
    </>
  );
}
