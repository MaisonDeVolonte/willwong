/**
 * ========================================================================================
 * @file publish.mjs - one-command content publish (git-as-CMS)
 * ========================================================================================
 * @description
 * - stages only content/, commits it to main, and pushes — no production deploy needed
 * - the site serves content from main at runtime, so this is the whole "publish" step
 * @see /src/cms/source.ts/, /src/app/api/revalidate/route.ts/
 * @usage npm run publish -- "optional commit message"
 */

import { execFileSync } from "node:child_process";

const capture = (args) => execFileSync("git", args, { encoding: "utf-8" }).trim();
const io = (args) => execFileSync("git", args, { stdio: "inherit" });

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

// Content is served from main; publishing from any other branch wouldn't go live.
const branch = capture(["rev-parse", "--abbrev-ref", "HEAD"]);
if (branch !== "main") {
  fail(`publish must run on main — content is served from the main branch (you're on "${branch}").`);
}

// Stage only content/, leaving any other staged/unstaged work untouched.
io(["add", "content"]);
const staged = capture(["diff", "--cached", "--name-only", "--", "content"]);
if (!staged) fail("nothing to publish — no changes under content/.");

const message = process.argv.slice(2).join(" ") || "content: publish";
io(["commit", "-m", message, "--", "content"]);
io(["push", "origin", "main"]);

const count = staged.split("\n").filter(Boolean).length;
console.log(
  `✓ published ${count} content file(s) to main. ` +
    `Live within ~60s (instant once the revalidate webhook is set).`,
);
