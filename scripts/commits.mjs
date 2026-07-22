/**
 * ======================================================
 * @file commits.mjs - counts total commits at build time
 * ======================================================
 * @description
 * - production is covered by deploy.yml which fetches full git history
 * - local and ci.yml undercounts due to shallow checkout
 * - fails soft to 0 rather than throwing
 * @see /src/modules/stats/Stats.tsx/
 */

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const commits = (() => {
  try { return execSync("git rev-list --count HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); }
  catch { return "0"; }
})();

writeFileSync(
  new URL("../src/modules/stats/commits.generated.ts", import.meta.url),
  `// generated at build by scripts/commits.mjs — do not edit, do not commit\n` +
    `export const COMMITS_STAT = ${commits};\n`,
);

console.log(`commits.generated.ts -> COMMITS_STAT=${commits}`);
