/**
 * ========================================================
 * @file churn.mjs - sums added/deleted lines at build time
 * ========================================================
 * @description
 * - github's `/stats/contributors` endpoint has no path-level filtering
 * - this walks local git history instead of counting every line ever touched
 * - production is covered by deploy.yml which fetches full git history
 * - local and ci.yml undercounts due to shallow checkout
 * @see /src/modules/stats/exclusions.mjs/, /scripts/commits.mjs/, /scripts/lines.mjs/
 */

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { isExcluded } from "../src/modules/stats/exclusions.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// resolve renames helper:
// "prefix{oldPath => newPath}suffix"
// "oldPath => newPath"
function resolveRename(pathField) {
  const braceMatch = pathField.match(/^(.*)\{(.*) => (.*)\}(.*)$/);
  if (braceMatch) {
    const prefix  = braceMatch[1];
    const suffix  = braceMatch[4];
    const oldPath = prefix + braceMatch[2] + suffix;
    const newPath = prefix + braceMatch[3] + suffix;

    return [oldPath, newPath];
  }

  const plainMatch = pathField.match(/^(.*) => (.*)$/);
  if (plainMatch) {
    const oldPath = plainMatch[1];
    const newPath = plainMatch[2];

    return [oldPath, newPath];
  }

  return [pathField, pathField];
}

// git log processing:
// `-M` enables rename detection; used to prevent double counting
const numStatsLog = execSync("git log -M --numstat --format=", { cwd: ROOT, maxBuffer: 1024 * 1024 * 64, }).toString();
const numStatsLines = numStatsLog.split("\n");
let totalAdditions = 0;
let totalDeletions = 0;

// parses numstat lines, resolves renamed paths, and skips excluded files
for (const line of numStatsLines) {
  if (!line.trim()) continue;
  const [addField, delField, pathField] = line.split("\t");
  if (addField === "-" || delField === "-") continue;

  const [, newPath] = resolveRename(pathField);

  const fileName = newPath.split("/").pop() ?? "";
  if (isExcluded(newPath, fileName)) continue;

  totalAdditions += Number(addField);
  totalDeletions += Number(delField);
}

writeFileSync(
  new URL("../src/modules/stats/churn.generated.ts", import.meta.url),
  `// generated at build by scripts/churn.mjs — do not edit, do not commit\n` +
    `export const ADDITIONS_STAT = ${totalAdditions};\n` +
    `export const DELETIONS_STAT = ${totalDeletions};\n`,
);

console.log(`churn.generated.ts -> +${totalAdditions}/-${totalDeletions}`);
