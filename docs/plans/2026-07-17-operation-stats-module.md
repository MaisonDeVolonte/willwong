# AGENT PLAN: Operation Stats Module

## Context
- `structure` `apis/` holds raw GitHub fetchers (`githubTree.ts`, `githubMeta.ts`, `githubContributors.ts`); `languages.ts`/`files.ts`/`contributors.ts` derive from them; `aggregate.ts` formats + caches + fails soft per field; `Stats.tsx` composes all three menu sections into `Footer`'s `statsSlot`
- `pattern` mirrors `src/cms/source.ts` — shared `GITHUB_TOKEN` resolution (`githubToken.ts`) and shared repo identity (`githubRepo.ts`, also de-duped out of `source.ts`), `unstable_cache`, cache tag, webhook revalidate
- `api map` `GET /repos/{owner}/{repo}` → Age+Size (one call, `githubMeta.ts`); shared Git Trees walk (`githubTree.ts`) → Files for free + language bytes; `GET .../stats/contributors` → Commits (all-time `.total`) + Churn (`weeks[].a`/`.d`, only the trailing ~52 weeks GitHub returns — cold cache returns empty `202`, handled as `null`, not thrown)
- `no api equivalent` Lines has no GitHub API, so it's a build-time script (`scripts/loc.mjs`) instead of a runtime source — done. Coverage has zero existing infra (no `--coverage`, no Codecov) — dropped from this plan's scope entirely, see the follow-up plan once one exists

## Goal
- add "Project" (Age, Size, Files) and "Code" (Lines, Churn, Commits — Coverage dropped) footer sections above the shipped Languages bars, reusing the `src/modules/stats/` aggregate pattern

## Solution
- extract a shared GitHub fetch tier (`apis/`) mirroring `source.ts`'s caching discipline, derive Project/Code/Languages stats from it, and compose all three into `Stats.tsx`

## Checklist
- [x] `ship` `Footer.statsSlot`/`MenuSection`/`Language`/`Stat` built + DevLink-exported
- [x] `scaffold` `src/modules/stats/` (`types.ts`, `languages.ts`, `aggregate.ts`, `Stats.tsx`)
- [x] `build` `languages.ts` — extension-based byte counts, rebased onto the shared `apis/githubTree.ts` walk
- [x] `build` `aggregate.ts` — `getLanguageStats()`/`getProjectStats()`/`getCodeStats()`, cached + tagged, each field fails soft independently
- [x] `wire` `Stats.tsx` (renamed from `Languages.tsx`) w/ icons, composes Project+Code+Languages, mounted in `layout.tsx` via `statsSlot`
- [x] `webflow` `Stat.tsx` added, `languageSlot` → `statsSlot` collapsed
- [x] `fix` `layout.tsx`'s stale `languageSlot` prop → `statsSlot={<Stats />}`
- [x] `build` `apis/githubMeta.ts` — Age + Size
- [x] `extract` `apis/githubTree.ts` (shared cached walk), rebase `languages.ts`, add `files.ts`
- [x] `build` `apis/githubContributors.ts` + `contributors.ts` — Commits + Churn (cold `202` → `null`)
- [x] `extract` `src/utilities/githubRepo.ts` — shared `REPO_OWNER`/`REPO_NAME`/`BRANCH`
- [x] `drop` `StatsSection.tsx` wrapper — `Stats.tsx` uses a small local `statRows()` helper instead, two call sites didn't justify a new component
- [x] `wire` `getProjectStats()`/`getCodeStats()` into `aggregate.ts`, composed into `statsSlot`
- [ ] `extend` `route.ts` to bust `STATS_TAG` on push
- [x] `build` `scripts/loc.mjs` — counts LOC off `git ls-files` at build time (same exclusions as `githubTree.ts`), writes `src/modules/stats/loc.generated.ts`, wired into `npm run generate`
- [x] `wire` `LINES_OF_CODE` into `getCodeStats()`, `Lines` row live in the Code section
- [ ] `confirm` Churn's trailing-window vs. Commits' all-time total is an acceptable mismatch (see Risks) or needs reconciling
- [x] `decide` Coverage data source — decided: dropped from this plan's scope, not building it here

## Future Work
- bust `STATS_TAG` on push in `route.ts`
- reconcile (or document) the Churn/Commits time-horizon mismatch
- Coverage stat — see `2026-07-19-operation-coverage.md`

## Risks & Gotchas
- `rate limit` same discipline as `source.ts` — cache always, never fetch per-request; more sources now share the budget
- `staleness` LOC only refreshes on deploy, not live (it's a build-time constant, not a fetch)
- `devlink icons` Code-Embed isn't bindable for dynamic SVG — `icon`/`fill` Custom-Attributes spread is the only working pattern, and it's untyped (`Record<string, unknown>`)
- `stale cache` `unstable_cache`'s `.next/cache` survives dev-server restarts — clear it before re-testing aggregation changes
- `202 handling` cold `stats/contributors` fails soft as `null` ("not ready"), not thrown — confirmed live against this repo
- `churn/commits mismatch` Commits is a true all-time total; Churn only covers the trailing window GitHub's API returns — same call, two different time horizons, not called out anywhere in the UI

## Notes
- none
