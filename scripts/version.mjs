/**
 * ========================================================================================
 * @file version.mjs - build-time script that extracts git hash and commit history
 * ========================================================================================
 * @description
 * - grabs the latest git metadata (since webflow builder lacks `.git`)
 * - writes constants into a `.generated.ts` file so the app can render current versioning
 * - `COMMIT_COUNT` resets after every tag (patch version, commits-since-last-tag) — anything
 *   wanting the repo's true total (e.g. the footer's Commits stat) needs `TOTAL_COMMIT_COUNT`
 * @see /src/meta/config/version.ts/, /src/modules/stats/aggregate.ts/
 */

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const git = (cmd) => {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "";
  }
};

// Webflow's builder has no .git but injects COMMIT_HASH; local/CI have git but no COMMIT_HASH.
const hash = (process.env.COMMIT_HASH || git("git rev-parse HEAD") || "0000000").slice(0, 7);

const totalCount = git("git rev-list --count HEAD") || "0";

// Try to get commit count since last tag (resets on every tag), fallback to the total
const describe = git("git describe --tags --long") || "";
const count = describe ? describe.split("-").slice(-2, -1)[0] : totalCount;

writeFileSync(
  new URL("../src/meta/config/version.generated.ts", import.meta.url),
  `// generated at build by scripts/version.mjs — do not edit, do not commit\n` +
    `export const COMMIT_HASH = "${hash}";\n` +
    `export const COMMIT_COUNT = ${count};\n` +
    `export const TOTAL_COMMIT_COUNT = ${totalCount};\n`,
);

console.log(`version.generated.ts -> hash=${hash} count=${count} total=${totalCount}`);
