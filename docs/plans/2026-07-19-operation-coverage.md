# AGENT PLAN: Operation Coverage

## Context
- `why not github actions artifacts` zip download + extraction, no native unzip on the cloudflare workers edge runtime this app runs on — meaningfully harder than a JSON fetch
- `why not commit to main` would inject bot commits into a trunk optimized for atomic history/clean bisect; `main` is PR-only (no existing direct-push path); would self-trigger the `/api/revalidate` webhook on every push
- `why not a dedicated branch` mechanically sound (mirrors the same raw-file-fetch pattern `source.ts` already uses for `content/`) but requires giving CI push/write permissions it doesn't currently have — a bigger permission-surface change than one read-only 3rd-party call
- decision: Codecov — free for public repos, no runtime auth needed (its read API is public), upload token is CI-side only, zero new GitHub write permissions required
- api shape confirmed live: `GET https://api.codecov.io/api/v2/github/{owner}/repos/{repo}/` returns `totals.coverage` as a plain percentage once a repo has an active report — verified against several real public Codecov repos before writing `codecovCoverage.ts`. `totals` is `null` until the first report lands, which is exactly the cold-start case below

## Goal
- add the last remaining stat — Coverage — to `Stats.tsx`'s Code section, closing out `2026-07-17-operation-stats-module.md`

## Solution
- fetch Codecov's public read API (upload token stays CI-side only) and wire Coverage into `getCodeStats()` with the same per-field fail-soft pattern as Churn/Commits

## Checklist
- [x] `account` will connected Codecov to `MaisonDeVolonte/willwong`, generated an upload token
- [x] `secret` added to the repo's GitHub secrets as `CODECOV_API_TOKEN` (not `CODECOV_TOKEN` — `ci.yml` references the actual name)
- [x] `deps` added `@vitest/coverage-v8` devDependency
- [x] `config` enabled coverage in `vitest.config.ts` (v8 provider, lcov + text reporters, `all: true` so untested files count against the total honestly)
- [x] `ci` added `test:unit:coverage` script (`vitest run --coverage`), swapped it into `ci.yml`, added `codecov/codecov-action@v4` right after wired to `secrets.CODECOV_API_TOKEN`
- [x] `types` added `coverage?: string` to `CodeStats`
- [x] `build` `src/modules/stats/apis/codecovCoverage.ts` — cached fetch against Codecov's public read API
- [x] `wire` `coverage` field into `aggregate.ts`'s `getCodeStats()`, same per-field fail-soft pattern as churn/commits
- [x] `wire` `Coverage` row into `Stats.tsx`'s Code section, ordered Lines/Churn/Coverage/Commits to match the original screenshot
- [x] `verify` `tsc`/lint/`test:unit:coverage`/full `next build` all clean — Codecov fetch fails soft at build time as expected (no report exists yet)
- [ ] `confirm` first push to `main` after this merges actually populates Codecov's `totals` (currently `null` — no report has been uploaded yet)

## Future Work
- none noted

## Risks & Gotchas
- `cold start` confirmed: Codecov's `totals` is `null` until `ci.yml` runs at least once with the new coverage step — Coverage row won't render until then, same class of gotcha as the `stats/contributors` cold-`202` case
- `secret name mismatch` will's actual GitHub secret is `CODECOV_API_TOKEN`; double-check any future doc/reference uses that name, not the generic `CODECOV_TOKEN` used in earlier planning notes
- `vendor dependency` adds an external service + a new devDependency; if Codecov changes their public API shape, this source breaks silently (fails soft, but silently) until noticed
- `rate limit` Codecov's public read API is unauthenticated at runtime — same "cache always, never fetch per-request" discipline as every other `apis/` source
- `@see` this plan is a direct follow-up to `2026-07-17-operation-stats-module.md`, not a fresh effort — same `src/modules/stats/` architecture, same conventions

## Notes
- local coverage number running `npm run test:unit:coverage` locally currently reports ~2.3% (one test file against the whole `src/` tree via `all: true`) — expected and honest, not a bug
