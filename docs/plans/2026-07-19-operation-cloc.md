# AGENT PLAN: Operation Cloc

## Context
- will asked whether Lines could distinguish code from comments; the current count treats every line the same (comments, blanks, `README.md`, `.css`, `.yml` all count as "code")
- confirmed live: `npx cloc@2.6.0-cloc` runs clean in this environment (macOS + presumably ubuntu-latest CI, both ship system Perl by default) — a real JSON pass against this repo finished in ~0.6s: `{blank: 1040, comment: 1349, code: 19550, nFiles: 204}` (uncurated)
- design decision: don't let `cloc` pick files — feed it an explicit `--list-file` built from the exact same `EXCLUDED_PATHS`/`isExcluded()` filter `loc.mjs` already has (same one `apis/githubTree.ts` uses). cloc's own `--exclude-dir`/`--vcs` flags have different matching semantics and would create a second, slightly-divergent definition of "which files count" against Files/Languages
- will chose code-only — "Lines" keeps its existing meaning/name, just backed by a real count instead of a naive one. no new UI, no new stat. richer Comments/Blank rows deferred, not ruled out, if ever wanted later
- follow-up: 5,529 lines still felt too large to will. broke it down by top-level dir and by language (`cloc --by-file`) to find real exclusion candidates rather than guessing: `content/` (924 lines) is display-only "raw strings" per this repo's own README Content section — never imported/executed, not real code. `AGENTS/`+`.claude/`+`.grok/`+`AGENTS.md` (1,780 lines) are agent-workflow docs and git-automation scripts, not the Next.js app itself
- will confirmed both tiers, and asked the exclusion filter apply "as much as possible" across every stat, not just Lines — extracted the filter into a shared `src/modules/stats/exclusions.mjs` (plain JS so both `apis/githubTree.ts` and `scripts/loc.mjs` import the same list instead of two copies), expanded `EXCLUDED_PATHS` to add `content/`, `AGENTS/`, `AGENTS.md`, `.claude/`, `.grok/`
- structural limit: Age/Size (`githubMeta.ts`, whole-repo metadata) and Churn/Commits (`githubContributors.ts`, whole-history commit stats) have zero path-level filtering available from GitHub's API — "as much as possible" tops out at the three tree-walk-based stats (Files/Languages/Lines). documented this limit directly in both files' headers rather than leaving it as a silent gap

## Goal
- swap `loc.mjs`'s raw `text.split("\n").length` count for real code/comment/blank separation, using `cloc`

## Solution
- shell out to `cloc` against an explicit file list built from the shared exclusion filter, keep "Lines" as code-only, and extract the exclusion filter into a shared module so every stat applies it consistently

## Checklist
- [x] `decide` redefine "Lines" as code-only, no new rows
- [x] `deps` added `cloc` devDependency, pinned `2.6.0-cloc`
- [x] `rewrite` `scripts/loc.mjs`: kept the existing `git ls-files` + `isExcluded()` filter as the sole file-selection logic (dropped the old manual binary-detection + line-counting loop entirely — cloc handles both); filtered list written to a temp file via `mkdtempSync`, shelled out to `cloc --json --list-file=<tmp>`, parsed `SUM.code`
- [x] `invoke via` `node_modules/.bin/cloc` (resolved explicitly via `path.join(ROOT, ...)`), not bare `cloc` on `PATH`
- [x] `update` `loc.generated.ts` — no shape change needed; `LINES_OF_CODE` stayed the same export, just a different (correct) number
- [x] `wire` — no change needed in `aggregate.ts`/`Stats.tsx`; they consume `LINES_OF_CODE` by name and didn't need to know the number's source changed
- [x] `verify` `tsc`/lint/`test:unit:coverage`/full `next build` all clean; fresh `node scripts/loc.mjs` run confirmed real numbers
- [x] `document` added `cloc` to README's Stack table
- [x] `extract` shared `src/modules/stats/exclusions.mjs` (`EXCLUDED_PATHS` + `isExcluded()`), imported by both `apis/githubTree.ts` (re-exported for its existing consumers) and `scripts/loc.mjs` — single source of truth instead of two copies
- [x] `expand` `EXCLUDED_PATHS`: added `content/`, `AGENTS/`, `AGENTS.md`, `.claude/`, `.grok/` alongside the existing `package-lock.json`/`webflow/`
- [x] `document` added a one-line "cannot apply here" note to `githubMeta.ts` and `githubContributors.ts` explaining why the exclusion filter is structurally impossible for Age/Size/Churn/Commits
- [x] `verify` `tsc`/lint/`test:unit:coverage`/full `next build` all clean again after the expansion; confirmed Files/Languages and Lines now agree exactly (88 files each) since they share one filter

## Future Work
- richer Comments/Blank rows, if ever wanted

## Risks & Gotchas
- `perl dependency` `cloc` is fundamentally a Perl script; the npm package just distributes it. Present by default on `ubuntu-latest` and macOS (confirmed locally) — not guaranteed universally, but this project's actual CI/dev environments both have it, so low real risk
- `prose files have no "comment"` cloc has no prose category — `README.md`, `.css`, `.yml`, etc. get `comment: 0` and every line counts as `code` for those file types. the code/comment split is only meaningful for actual programming-language files; don't over-interpret the aggregate `comment` total as "comments across the whole repo"
- `performance` non-issue — ~0.6s for this repo size, well within the existing `npm run generate` step
- `@see` this is a follow-up to `2026-07-17-operation-stats-module.md`'s Lines stat, not a fresh effort; direct predecessor to `2026-07-19-operation-local-churn.md`

## Notes
- file-count drift, resolved: once wired to the explicit `--list-file` (dropping cloc's own `--vcs=git` walk entirely), file count matched `loc.mjs`'s existing filter exactly — 223 files, same as before. code-only count came out to 5,529 vs. the old raw-line count of 8,135 — comments/blanks were ~32% of the old total
- scope narrowed further after the exclusion expansion: 88 files, 2,812 code lines — down from 223 files / 5,529 lines. Files/Languages report smaller numbers too now, since they share the same filter
