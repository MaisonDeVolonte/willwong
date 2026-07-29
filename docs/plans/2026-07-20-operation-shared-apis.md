# AGENT PLAN: Operation Shared APIs

## Context
- `cms/source.ts` and `stats/apis/githubGitTrees.ts` hit the identical Git Trees endpoint with duplicated fetch/header code
- their cache behavior is deliberately different and must not merge: content is 60s + webhook-busted, stats is 3600s
- `source.ts` has retry/backoff the stats fetchers lack; stats fetchers currently fail hard on one transient 429/5xx
- tier rule going forward: `utilities/` = inputs to a call (token, repo identity), `apis/` = the call itself

## Goal
- one raw-API tier at `src/apis/`, shared fetch plumbing, every caller keeps its own `unstable_cache` wrapper

## Solution
- lift retry/backoff and header-building into a shared `src/apis/githubFetch.ts`, move the stats fetchers onto it, and keep cache tags/keys/revalidate byte-identical per caller

## Checklist
- [x] `create` `src/apis/githubFetch.ts`:
  - `githubFetch(url, init)` — lift retry/backoff (3 attempts, linear, 429/5xx/network) verbatim from `source.ts`
  - `githubHeaders(agent: string)` — Accept + `User-Agent: ${REPO_NAME}-${agent}` + optional token, replaces 3 inline copies
- [x] `move` `githubGitTrees.ts`, `githubRepos.ts`, `codecov.ts` from `src/modules/stats/apis/` → `src/apis/` via `git mv`
- [x] `rewire` the moved files onto `githubFetch` + `githubHeaders("tree" | "repo")`; each keeps its own tag/key/revalidate
  - `codecov.ts` keeps its plain Accept header — `githubHeaders` is GitHub-specific, codecov needs no auth
- [x] `drop` the `isExcluded` re-export from `githubGitTrees.ts`; `languages.ts`/`files.ts` import `exclusions.mjs` directly
  - an apis-tier file must not depend on a stats-module file; exclusions stay in `stats/`
- [x] `rewire` `source.ts`: `listContentPaths()` uses shared `githubFetch` + `githubHeaders("cms")`; delete its local copies
  - `CONTENT_TAG`/60s wrapper, `mapLimit`, `fetchRawFile` stay untouched — they are cms-only machinery
- [x] `update` imports and wayfinder headers/@see: `aggregate.ts`, `languages.ts`, `files.ts`, `exclusions.mjs`, `githubToken.ts`, `githubRepo.ts`, stats study guide
- [x] `verify` tsc --noEmit, eslint, vitest, `npm run build`, then boot dev and confirm local content fallback renders
- [x] `git mv` `src/app/api/revalidate/route.ts` → `src/app/api/webhooks/github/route.ts` (side quest — route rename)
- [x] `update` refs: `open-next.config.ts` comment, `scripts/publish.mjs`'s `@see` + log line, README's two mentions (Structure tree + CMS > Notes)
- [x] `fix` two stale mirror pointers found along the way: `content/.system`'s IDE mirror had both a stale path and a stale `@mirror` pointer; a second broken mirror (`content/AGENTS/hooks.md` → target never existed) was replaced with per-file `content/AGENTS/hooks/*.sh` stubs
- [x] `add` `STATS_TAG` revalidation: any push to main busts stats (repo-wide, can change on any commit), `content` only busts when a commit actually touches `content/` — same fail-safe-on-parse-error behavior as before, extended to both
- [x] `bundle` webhook busts `STATS_TAG` plus every inner apis/ source's own tag together (`GITHUB_TREE_TAG`, `GITHUB_REPO_TAG`, `CODECOV_TAG`) as one `STATS_TAGS` array in `route.ts` — rejected busting `STATS_TAG` from inside the apis/ sources instead, since that would force apis/ to import from modules/stats, inverting the tier's import-direction rule
- [x] `verify` clean end to end, twice: tsc, eslint, vitest (19/19), `npm run build` (route shows live at the new path)
- [ ] **resume here** — once this ships and is deployed to production, PATCH the live GitHub webhook's Payload URL. Confirmed via `gh api` that hook id `651788609` is the only webhook on the repo, still pointing at the old `/api/revalidate` path:
  ```
  gh api -X PATCH repos/MaisonDeVolonte/willwong/hooks/651788609 \
    -f config[url]=https://willwong.me/api/webhooks/github \
    -f config[content_type]=json -f config[insecure_ssl]=0
  ```
  omit `config[secret]` — github preserves the existing secret when a PATCH leaves it out

## Future Work
- `codecov.ts` retry adoption — explicitly skipped per will's call
- consider delaying `CODECOV_TAG` revalidation so it doesn't race codecov's post-CI upload (no cheap way to do this today)

## Risks & Gotchas
- `live path` `source.ts` feeds production content publish; a botched rewire degrades publish from instant to 1hr-stale
- `behavior change` stats fetchers gain retry/backoff — intended upgrade, but new: transient 429s no longer blank a stat
- `import cycle` keep `apis/` importing only from `utilities/`; never from `modules/`
- `cache keys` tags/keys/revalidate values must move byte-identical; a typo silently forks a new cold cache entry
- `CI hermeticity` CI sets CONTENT_SOURCE=local, so the github path is untested there — manual dev/build check required
- `silent degradation` if the live webhook URL isn't updated in lockstep with the deploy, github 404s the old path and publish quietly falls back to the 60s timer — no error surfaces anywhere. this is exactly why the PATCH above is gated on deploy, not run yet
- `scope` don't build `webhooks/<provider>/` siblings preemptively — only github exists today
- `codecov timing` busting `CODECOV_TAG` at push time can race codecov's post-ci upload, so the refetch may grab the previous coverage number for up to an hour — acceptable, flagged by fable, not fixed

## Notes
- reviewed live by fable, approved; both findings closed (stale doc line fixed, `githubFetch.test.ts` added with a real retry-matrix plus a break-and-revert proof the suite has teeth)
- verified clean: tsc, eslint, vitest, `npm run build`, dev booted twice (local + `CONTENT_SOURCE=github`)
- the route rename (`api/revalidate/` → `api/webhooks/github/`) was a side quest: the old name ("revalidate", generic effect) always mismatched its implementation (github hmac verification, github-specific headers/payload), same class of bug as the `githubMeta.ts` naming fix, just never caught until now
- fable ran a pre-delivery review (plan vs tree + a fresh 5-gate rehearsal) and caught a real gap: `revalidateTag(STATS_TAG)` alone only busts the aggregate layer — every apis/ source caches independently underneath it, so the bust never reached the inner caches and the footer would've stayed stale for the full 3600s regardless of the webhook firing
- as of 2026-07-21 the route rename is coded, tested, and verified locally — **not yet deployed**; fable separately reproduced the codebase's one flaky e2e test (mobile `Footer > VersionInfo`) on a stashed clean `main`, confirming it predates and is unrelated to this work
