/**
 * ====================================================
 * @file lines.mjs - counts lines of code at build time
 * ====================================================
 * @description
 * - github's api has no LOC endpoint, so this counts locally instead
 * - `cloc` does the counting (code only, comments/blanks excluded)
 * @see /src/modules/stats/exclusions.mjs/, /src/modules/stats/Stats.tsx/
 */

import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import path from "node:path";

import { isExcluded } from "../src/modules/stats/exclusions.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const CLOC_BIN = path.join(ROOT, "node_modules/.bin/cloc");

const files = execSync("git ls-files", { cwd: ROOT }).toString().trim().split("\n").filter(Boolean);
const included = files.filter((relPath) => !isExcluded(relPath, path.basename(relPath)));

const tmpDir = mkdtempSync(path.join(tmpdir(), "loc-"));
const listFile = path.join(tmpDir, "files.txt");
writeFileSync(listFile, included.join("\n"));

let lines = 0;

try {
  const output = execSync(`"${CLOC_BIN}" --json --list-file="${listFile}"`, { cwd: ROOT }).toString();
  lines = JSON.parse(output).SUM?.code ?? 0;
}
finally { rmSync(tmpDir, { recursive: true, force: true }); }

writeFileSync(
  path.join(ROOT, "src/modules/stats/lines.generated.ts"),
  `// generated at build by scripts/lines.mjs — do not edit, do not commit\n` +
    `export const LINES_STAT = ${lines};\n`,
);

console.log(`lines.generated.ts -> lines=${lines} (${included.length} files scanned)`);
