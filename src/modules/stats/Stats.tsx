/**
 * ====================================================================
 * @file Stats.tsx - footer stats menu (Project, Code, Languages)
 * ====================================================================
 * @description
 * - server component
 * - fetches all three stat sections and composes them for the footer's `statsSlot`
 * - Project/Code render as plain label/value rows (`Stat`); Languages keeps its icon+bar rows (`Language`)
 * - a section (or an individual row within Project/Code) is omitted entirely rather than
 *   faked when its source has no data yet (e.g. codecov before its first report, or a cold-cache 202)
 * @see /src/modules/stats/aggregate.ts/, /webflow/elements/Stat.tsx/, /webflow/elements/Language.tsx/, /webflow/elements/MenuSection.tsx/
 */

import { readIcon } from "@/utilities/icons";
import { getLanguageStats, getProjectStats, getCodeStats } from "@/modules/stats/aggregate";
import { MenuSection } from "@webflow/elements/MenuSection";
import { Language } from "@webflow/elements/Language";
import { Stat } from "@webflow/elements/Stat";

function statRows(row: Record<string, string | undefined>) {
  return Object.entries(row)
    .filter((entry): entry is [string, string] => entry[1] !== undefined)
    .map(([label, value]) => <Stat key={label} label={label} value={value} />);
}

export default async function Stats() {
  const [languages, project, code] = await Promise.all([
    getLanguageStats(),
    getProjectStats(),
    getCodeStats(),
  ]);

  const projectRows = statRows({ Age: project.age, Size: project.size, Files: project.files });
  const codeRows = statRows({
    Lines: code.lines,
    Churn: code.churn,
    Coverage: code.coverage,
    Commits: code.commits,
  });

  // extensions match src/assets/icons/*.svg; falls back to readIcon's "fallback" icon
  const languageRows = await Promise.all(
    languages.map(async (stat) => {
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

  if (projectRows.length === 0 && codeRows.length === 0 && languageRows.length === 0) return null;

  return (
    <>
      {projectRows.length > 0 && <MenuSection label="Project" slot={projectRows} />}
      {codeRows.length > 0 && <MenuSection label="Code" slot={codeRows} />}
      {languageRows.length > 0 && <MenuSection label="Languages" slot={languageRows} />}
    </>
  );
}
