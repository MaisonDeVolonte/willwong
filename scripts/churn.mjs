/**
 * ========================================================================================
 * @file churn.mjs - build-time script that sums added/deleted lines across git history
 * ========================================================================================
 * @description
 * - github's `/stats/contributors` endpoint has no path-level filtering, so it counted
 *   every line ever touched in content/, AGENTS/, .claude/, .grok/, webflow/ — everything
 *   Files/Languages/Lines already exclude. this walks local git history instead and
 *   applies the same shared filter, so Churn finally agrees with the rest of the widget
 * - needs full git history, not a shallow clone — deploy.yml already fetches full history
 *   for version.mjs's commit count, so production is covered; ci.yml's shallow checkout
 *   means this undercounts there, the same already-accepted asymmetry version.mjs has
 * - `-M` enables rename detection so a pure rename isn't double-counted as a full
 *   delete+add; the destination path (post-rename) is what gets filtered
 * @see /src/modules/stats/exclusions.mjs/, /scripts/version.mjs/, /scripts/loc.mjs/
 */

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { isExcluded } from "../src/modules/stats/exclusions.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// Resolves a numstat rename field ("old => new" or "prefix{old => new}suffix") to [old, new]
function resolveRename(field) {
  const braced = field.match(/^(.*)\{(.*) => (.*)\}(.*)$/);
  if (braced) {
    const [, prefix, oldPart, newPart, suffix] = braced;
    return [prefix + oldPart + suffix, prefix + newPart + suffix];
  }
  const plain = field.match(/^(.*) => (.*)$/);
  return plain ? [plain[1], plain[2]] : [field, field];
}

const output = execSync("git log -M --numstat --format=", {
  cwd: ROOT,
  maxBuffer: 1024 * 1024 * 64,
}).toString();

let additions = 0;
let deletions = 0;

for (const line of output.split("\n")) {
  if (!line.trim()) continue;

  const [addStr, delStr, pathField] = line.split("\t");
  if (addStr === "-" || delStr === "-") continue; // binary file, no line counts

  const [, newPath] = resolveRename(pathField);
  const basename = newPath.split("/").pop() ?? "";
  if (isExcluded(newPath, basename)) continue;

  additions += Number(addStr);
  deletions += Number(delStr);
}

writeFileSync(
  new URL("../src/modules/stats/churn.generated.ts", import.meta.url),
  `// generated at build by scripts/churn.mjs — do not edit, do not commit\n` +
    `export const ADDITIONS = ${additions};\n` +
    `export const DELETIONS = ${deletions};\n`,
);

console.log(`churn.generated.ts -> +${additions}/-${deletions}`);
