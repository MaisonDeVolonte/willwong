# AGENT PLAN: Operation Local Churn

## Context
- Churn showed `+69,875 / -20,507` — not a formatting problem, a data-source problem: GitHub's `/stats/contributors` has zero path-level filtering, so it counted every line ever touched in `content/`/`AGENTS/`/`.claude/`/`.grok/`/`webflow/` — everything the `exclusions.mjs` widening (see `2026-07-19-operation-cloc.md`) just taught Files/Languages/Lines to ignore
- confirmed live: prototyped the real fix before committing to it — excluded-path volume was `+56,825/-11,786` vs. included `+7,295/-2,966`, the noise was ~8x the real signal
- will chose to migrate both Churn and Commits off GitHub's API to local git history, mirroring `version.mjs`/`loc.mjs`'s existing build-time pattern instead of a third data source
- caught before building: will flagged that `version.mjs`'s `COMMIT_COUNT` resets after every git tag (commits-since-last-tag, for the version badge's patch number) — currently `0` tags exist so it coincidentally equals the true total today, but would silently break the footer's Commits stat the moment a release tag lands. needed `version.mjs` to expose an unconditional total alongside the existing tag-relative count, not just reuse `COMMIT_COUNT` as-is
- prerequisite confirmed, not assumed: needs full git history, not a shallow clone. `deploy.yml`'s checkout already sets `fetch-depth: 0` (added originally for `version.mjs`), so production is covered. `ci.yml` does a shallow checkout, so this stat undercounts there — the same already-accepted asymmetry `version.mjs`'s commit count has today

## Goal
- fix Churn's data source: replace GitHub's unfiltered whole-history API with a local-git count that respects the shared exclusion filter

## Solution
- migrate Churn and Commits off GitHub's `/stats/contributors` API onto local `git log`/`git rev-list`, mirroring the existing `version.mjs`/`loc.mjs` build-time pattern, filtered through the shared `exclusions.mjs`

## Checklist
- [x] `update` `scripts/version.mjs` — added `TOTAL_COMMIT_COUNT` (`git rev-list --count HEAD`, unconditional), kept `COMMIT_COUNT` (tag-relative) unchanged for the version badge
- [x] `build` `scripts/churn.mjs` — `git log -M --numstat --format=` over full history, `-M` for rename detection so a pure rename isn't double-counted as delete+add, filters every touched path through the shared `exclusions.mjs`, sums additions/deletions for what's left, writes `src/modules/stats/churn.generated.ts`
- [x] `wire` `npm run generate` to run it (`version.mjs` → `content.mjs` → `loc.mjs` → `churn.mjs`); added to `.gitignore`
- [x] `wire` `aggregate.ts`'s `getCodeStats()`: `churn`/`commits` now read `ADDITIONS`/`DELETIONS` (`churn.generated.ts`) and `TOTAL_COMMIT_COUNT` (`version.generated.ts`) directly — no fetch, no fail-soft needed, same treatment as `lines`
- [x] `delete` `src/modules/stats/apis/githubContributors.ts` and `src/modules/stats/contributors.ts` — nothing else referenced them, confirmed via grep before deleting
- [x] `document` removed "GitHub Statistics" from README's APIs table (no longer used at all); added `churn.mjs` to Structure's `scripts/` listing; noted `TOTAL_COMMIT_COUNT` in Version Tracking
- [x] `verify` `tsc`/lint/`test:unit:coverage`/full `next build` clean
- [x] `sanity check` real numbers: 88 files (unchanged, shared filter already applied there), 2,770 code lines, `+7,295/-2,966` churn (down from the GitHub-API `+69,875/-20,507`), 185 total commits

## Future Work
- add `fetch-depth: 0` to `ci.yml` if the CI/deploy asymmetry is ever worth the slower checkout

## Risks & Gotchas
- `ci vs. deploy asymmetry` `ci.yml`'s shallow checkout means Churn/Commits will look wrong/near-zero during CI verification runs specifically — cosmetic only, CI doesn't assert on the actual value, and this matches `version.mjs`'s existing accepted behavior
- `rename parsing` `git log -M`'s compact rename syntax (`prefix/{old => new}/suffix`) is parsed with a regex, not git's own machinery — handles the real cases seen in this repo's history correctly (verified against actual output), but is hand-rolled and could mis-parse an unusual rename shape in the future. low risk given the repo's small size and mostly-simple rename history so far
- `binary files` numstat shows `-\t-\t<path>` for binary files (no line counts) — skipped, confirmed this repo has exactly 4 such lines (`favicon.ico`, moved once)
- `@see` direct follow-up to `2026-07-19-operation-cloc.md`'s exclusion widening and `2026-07-17-operation-stats-module.md`'s original Churn/Commits build

## Notes
- a real simplification, not just a data fix — Churn/Commits no longer share GitHub's rate limit, no longer need the cold-`202` fail-soft handling `githubContributors.ts` had. Coverage (Codecov) and Age/Size/Files/Languages (GitHub) are the only remaining live network dependencies in this widget
- one false alarm during verification: a fresh build reported "Unable to read" for the two just-deleted files — traced to stale `.next/cache` (incremental build cache still referencing them), not a real problem; confirmed clean after `rm -rf .next`
