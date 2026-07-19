/**
 * ========================================================================================
 * @file loc.mjs - build-time script that counts lines of code
 * ========================================================================================
 * @description
 * - github's api has no LOC endpoint, so this counts locally against `git ls-files`
 *   (respects .gitignore) using the same exclusions as the runtime github-stats sources
 * @see /src/modules/stats/apis/githubTree.ts/, /src/modules/stats/aggregate.ts/
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

// Mirrors apis/githubTree.ts's `isExcluded` — same rules so Lines lines up with Files/Languages
const EXCLUDED_PATHS = ["package-lock.json", "webflow/"];

function isExcluded(relPath, basename) {
  const matchesDenylist = EXCLUDED_PATHS.some((pattern) =>
    pattern.endsWith("/") ? relPath.startsWith(pattern) : basename === pattern,
  );
  if (matchesDenylist) return true;

  // excludes dotfiles and extensionless files
  return basename.lastIndexOf(".") <= 0;
}

// Binary files (git itself uses this heuristic): a NUL byte in the first few KB
function isBinary(buffer) {
  return buffer.subarray(0, 8000).includes(0);
}

const files = execSync("git ls-files", { cwd: ROOT }).toString().trim().split("\n").filter(Boolean);

let lines = 0;
let scanned = 0;
for (const relPath of files) {
  const basename = path.basename(relPath);
  if (isExcluded(relPath, basename)) continue;

  let buffer;
  try {
    buffer = readFileSync(path.join(ROOT, relPath));
  } catch {
    continue;
  }
  if (isBinary(buffer)) continue;

  const text = buffer.toString("utf-8");
  lines += text === "" ? 0 : text.split("\n").length;
  scanned++;
}

writeFileSync(
  path.join(ROOT, "src/modules/stats/loc.generated.ts"),
  `// generated at build by scripts/loc.mjs — do not edit, do not commit\n` +
    `export const LINES_OF_CODE = ${lines};\n`,
);

console.log(`loc.generated.ts -> lines=${lines} (${scanned} files scanned)`);
