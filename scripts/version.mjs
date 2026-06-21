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
const count = git("git rev-list --count HEAD") || "0";

writeFileSync(
  new URL("../src/meta/config/version.generated.ts", import.meta.url),
  `// generated at build by scripts/version.mjs — do not edit, do not commit\n` +
    `export const COMMIT_HASH = "${hash}";\n` +
    `export const COMMIT_COUNT = ${count};\n`,
);

console.log(`version.generated.ts -> hash=${hash} count=${count}`);
