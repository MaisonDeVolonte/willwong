# STUDY GUIDE: stats widget (footer Project/Code/Languages)
read these in order to build a mental model of how the whole footer stats widget works

## Files
- [x] `src/modules/stats/exclusions.mjs` — shared file filter; plain `.mjs` so both TS runtime and build scripts import the same list
- [x] `src/utilities/githubRepo.ts` — repo identity (`REPO_OWNER/NAME/BRANCH`, shared with `cms/source.ts`) + every cache tag/window; all stats caches share one `CACHE_STATS_TAG`, no per-source tags
- [x] `src/utilities/githubToken.ts` — shared auth resolution: Cloudflare runtime secret, falls back to `process.env`
- [x] `src/utilities/icons.ts` — shared icon lookup off the build-time content bundle; feeds `Stats.tsx`'s language rows
- [x] `src/apis/githubFetch.ts` — shared retry/backoff fetch + header builder; every GitHub caller (stats + cms) goes through this
- [x] `src/apis/githubGitTrees.ts` — raw cached Git Trees walk; one call feeds every tree-shaped stat
- [x] `src/apis/githubRepos.ts` — raw cached repo metadata (`created_at`, `size`); one call → both Age and Size
- [x] `src/apis/codecov.ts` — raw cached Codecov fetch, no auth (public repo); branch-level endpoint, not repo-level (repo-level `totals` lags)
- [x] `src/modules/stats/languages.ts` — `getExtBytes` walks the tree for byte totals; `getLanguageStats` shapes it (percent, 1%-filter, sort desc), fails soft to `[]`; owns its own `LanguageStat` type
- [x] `src/modules/stats/files.ts` — `getFileStats`: file count off the same tree walk, fails soft to `undefined`
- [x] `src/modules/stats/project.ts` — `getProjectStats`: age/size off `githubRepos.ts`, fails soft to `null`
- [x] `src/modules/stats/coverage.ts` — `getCoverageStats`: formats `codecov.ts`'s raw number into a display string, fails soft to `undefined`
- [x] `scripts/version.mjs` — build-time, no GitHub API: commit hash + tag-relative `COMMIT_COUNT` (resets per tag, semver patch number)
- [x] `scripts/commits.mjs` — total commit count (`COMMITS_STAT`), split from `version.mjs` for a different consumer; local/CI undercounts (shallow checkout) — `deploy.yml`'s full-history checkout covers production
- [x] `scripts/lines.mjs` — shells out to `cloc` (filtered via `exclusions.mjs`) for a real code-only line count (`LINES_STAT`)
- [x] `scripts/churn.mjs` — `git log -M --numstat` over full history (`-M` avoids double-counting renames), same filter, sums to `ADDITIONS_STAT`/`DELETIONS_STAT`; same shallow-checkout caveat as `commits.mjs`
- [x] `webflow/elements/{Stat,Language,MenuSection}.tsx`, `webflow/interface/Footer.tsx` — DevLink-exported, read-only UI primitives `Stats.tsx` composes; skim, don't edit
- [x] `src/modules/stats/Stats.tsx` — calls all four `get*Stats` getters + three `*_STAT` consts directly; `mapFieldsToStats` turns a label/value object into `Stat` rows (skips `undefined`), Languages built separately since each row needs an async `readIcon` call; no merged type — section grouping is a layout choice, lives here not in a shared aggregate
- [x] `src/app/layout.tsx` — wires `<Stats />` into `Footer`'s `statsSlot`; one line, easy to miss why it matters
- [x] `.github/workflows/ci.yml` + `codecov.yml` — the coverage pipeline: `vitest --coverage` → `codecov-action` upload → `informational` checks so it never blocks a PR
- [x] `package.json` (`generate` script) + `.gitignore` — wiring only: which scripts run at build time, which generated files never get committed

## Model
each `get*Stats` file is a self-contained chain: fetch (its own `apis/*` source or a `.generated` const) → shape → cache → fail soft. all caches share one `CACHE_STATS_TAG` (the webhook busts them in lockstep) — split it later only if per-source invalidation is ever needed. `Stats.tsx` decides section grouping itself, a layout choice, so no shared aggregate type exists. `lines.mjs`/`churn.mjs`/`commits.mjs` skip the GitHub API and compute locally at build time instead — same chain, different transport.

## Pattern
- 1. decide: live API or local build-time script? (path-level filtering → local; whole-repo/whole-history metric → either works)
- 2. build one `modules/stats/` file owning the whole chain: fetch (raw `apis/*`/`.generated` source) → shape → `unstable_cache` tagged `CACHE_STATS_TAG` → fail soft; name the getter `get<Thing>Stats` for parity with the rest
- 3. touches files? filter through `exclusions.mjs` — don't invent a second denylist
- 4. call it from `Stats.tsx`; feed it into `mapFieldsToStats` (or build the row by hand if it needs more than label/value)

## Quiz
20 questions, one answer each — graded against the code; answers + explanations folded in below each question
- generated: 2026-07-22 19:21
- graded: 2026-07-22 19:39 — score 19/20 (missed Q8)

**Q1 — why is `exclusions.mjs` plain `.mjs` instead of `.ts`?**
- [ ] A. `.mjs` loads faster than compiled `.ts` at runtime
- [x] B. build scripts run in plain node with no TS compile step, and TS runtime files can import `.mjs` — the one format both consumers share
- [ ] C. next.js config requires filter modules to be `.mjs`
- [ ] D. a `.ts` file would be caught by its own denylist

> ✓ B — `.mjs` is the one format both plain-node build scripts and the TS runtime can import without a compile step

**Q2 — every stats cache shares one `CACHE_STATS_TAG`. what tradeoff does that accept?**
- [ ] A. stats can never expire unless the webhook fires
- [ ] B. all stats share one cache entry, so the largest payload overwrites the rest
- [ ] C. tag collisions with `CACHE_CONTENT_TAG` on pages that use both
- [x] D. invalidation is all-or-nothing — busting the tag refreshes every stat even when only one source changed

> ✓ D — lockstep invalidation is the accepted cost; per-source tags are deferred until actually needed

**Q3 — why is there no shared aggregate type across the stats getters?**
- [x] A. section grouping is a layout decision, so it lives in `Stats.tsx` — the data layer shouldn't encode UI structure
- [ ] B. typescript can't compose types across module boundaries
- [ ] C. a shared type would force every getter to fail together instead of soft
- [ ] D. `unstable_cache` can't serialize a merged object shape

> ✓ A — grouping is presentation, so it lives where it's rendered, not in the data layer

**Q4 — what forces lines/churn to be local build-time scripts instead of GitHub API calls?**
- [ ] A. the github api can't count lines or diffs at all
- [ ] B. api rate limits make build-time calls unreliable
- [x] C. github's stats endpoints have no path-level filtering, so `exclusions.mjs` couldn't be applied
- [ ] D. build scripts avoid needing a token

> ✓ C — github's stats endpoints can't filter by path, so `exclusions.mjs` forces the local scripts

**Q5 — why does `layout.tsx` pass `<Stats />` into `Footer` through `statsSlot` instead of `Footer` importing it?**
- [ ] A. slots avoid a circular import between layout and footer
- [ ] B. next.js layouts can only hand components down via props
- [x] C. `Footer.tsx` is DevLink-exported and read-only — the slot is the extension point that survives regeneration
- [ ] D. importing Stats inside Footer would make the whole footer dynamic

> ✓ C — devlink regeneration would eat any hand edit to Footer; the slot is the edit point that survives

**Q6 — codecov is unreachable, so `getCoverageStats` returns `undefined`. what does the footer render for Coverage?**
- [ ] A. an "N/A" placeholder so the grid stays aligned
- [ ] B. "0.0%"
- [ ] C. an error boundary fallback around the Code section
- [x] D. nothing — `mapFieldsToStats` skips undefined, so the row is omitted entirely

> ✓ D — omitted entirely, never faked

**Q7 — why do `apis/*` files return raw unshaped data while `modules/stats/*` do the shaping?**
- [x] A. one cached raw call can feed several stats (tree → languages + files; repo → age + size) without a second fetch
- [ ] B. raw api responses can't be typed, so shaping is deferred
- [ ] C. `apis/` runs at build time and `modules/` at runtime
- [ ] D. shaping inside `apis/` would break the retry logic

> ✓ A — one cached raw call, many shapers

**Q8 — `githubFetch` gets a `404` response. what happens?**
- [x] A. retried 3 times with backoff, then throws
- [ ] B. throws immediately with the status text
- [ ] C. returned to the caller immediately — only 429/5xx/network failures retry; the caller decides what a 404 means
- [ ] D. returns `null` so getters fail soft

> ✗ picked A, answer C — the predicate `res.ok || (res.status < 500 && res.status !== 429)` returns a 404 to the
> caller untouched; only 429/5xx/network throws enter the retry loop. a 404 is deterministic (the resource isn't
> there, asking again won't materialize it) while 429/5xx are transient (waiting genuinely helps) — retrying
> deterministic failures wastes time and hammers a struggling api.

> 📚 study: transient vs deterministic failure + retry policy design — 4xx means "your request is wrong" (retry
> can't fix), 5xx/429 mean "try again later" (retry might); AWS's "exponential backoff and jitter" article is the
> canonical treatment, and explains why the `250 * attempt` backoff exists at all

**Q9 — the tree contains `Makefile` (extensionless, 2kb). what does `getExtBytes` do with it?**
- [ ] A. buckets it under ext `"makefile"` (whole filename lowercased)
- [ ] B. buckets it under `""` (empty extension)
- [ ] C. throws, since `lastIndexOf(".")` returns -1
- [x] D. never reaches extension parsing — `isExcluded` drops extensionless files first

> ✓ D — trick question dodged: guard order matters, `isExcluded` fires before extension parsing ever runs

**Q10 — how does `unstable_cache` build a full cache key (per the `["codecov"]` comment)?**
- [x] A. the key-parts array plus the serialized arguments of each call — a no-arg getter's string is the whole key
- [ ] B. the tags + revalidate window hashed together
- [ ] C. the fetch URL inside the wrapped function, hashed automatically
- [ ] D. the file path + export name

> ✓ A — key parts + serialized args form identity; tags are for invalidation, not lookup

**Q11 — `readIcon` uses react's `cache()`; the stats getters use `unstable_cache`. the difference?**
- [ ] A. none — they're interchangeable, `cache()` is just newer
- [x] B. `cache()` dedupes within one render pass; `unstable_cache` persists across requests with tags + revalidation
- [ ] C. `cache()` persists to disk, `unstable_cache` to memory
- [ ] D. `cache()` works in client components, `unstable_cache` doesn't

> ✓ B — request-scoped memoization vs persistent cross-request cache

**Q12 — replace the `Promise.all` in `Stats()` with four sequential awaits. what changes?**
- [ ] A. cache misses double, since entries can't dedupe in-flight
- [ ] B. nothing — `unstable_cache` already parallelizes calls
- [ ] C. a hydration mismatch between server and client
- [x] D. same UI, but cold-cache render time becomes the sum of the four fetches instead of the slowest one

> ✓ D — waterfall vs parallel; same output, sum-of-fetches latency

**Q13 — why is the Languages section built by hand instead of through `mapFieldsToStats`?**
- [x] A. each row needs an async `readIcon` call and a richer shape (icon, fill bar) than label/value
- [ ] B. language rows are client components
- [ ] C. `mapFieldsToStats` can't preserve sort order
- [ ] D. percent values aren't strings

> ✓ A — async `readIcon` per row plus the richer icon/bar shape

**Q14 — churn.mjs runs `git log -M --numstat`. what does `-M` prevent?**
- [ ] A. merge commits being counted from both parents
- [x] B. a renamed file's every line counting once as a deletion and again as an addition
- [ ] C. binary files inflating the totals
- [ ] D. commits from before the last tag being included

> ✓ B — without `-M`, every rename books its full line count twice

**Q15 — some numstat lines have `-` in both number columns. what are they, and what does the script do?**
- [ ] A. deleted files; counted as pure deletions
- [ ] B. renames; resolved via `resolveRename`
- [ ] C. submodules; counted once
- [x] D. binary files with no line counts; skipped entirely

> ✓ D — binary files carry no line counts; the script skips them

**Q16 — tags exist and `git describe --tags --long` prints `v0.4.0-12-gabc1234`. what is `COMMIT_COUNT`?**
- [x] A. 12 — commits since the last tag, used as the semver patch number
- [ ] B. the full `rev-list --count` total
- [ ] C. 4, parsed from the tag itself
- [ ] D. 1234 — the numeric tail of the hash field

> ✓ A — 12 commits since the last tag, doubling as the patch number

**Q17 — why does `getGithubToken` wrap `getCloudflareContext` in try/catch?**
- [ ] A. the dynamic import can fail when the package isn't installed
- [x] B. the cloudflare context only exists inside a live deployed worker request — at build/local it throws, and the fallback is `process.env`
- [ ] C. tokens can be expired, and the catch triggers a refresh
- [ ] D. `env` is typed `unknown` and the cast can throw

> ✓ B — the cloudflare context only exists inside a live worker request; everywhere else throws into the env fallback

**Q18 — why does production show a bigger `COMMITS_STAT` than local/CI builds?**
- [ ] A. production queries the github api, which sees every commit
- [ ] B. the revalidate webhook re-counts on each push to main
- [x] C. local/CI checkouts are shallow (truncated history); `deploy.yml` checks out full history before the scripts run
- [ ] D. cloudflare's build cache accumulates counts across deploys

> ✓ C — shallow checkout truncates history; `deploy.yml`'s full fetch is the fix

**Q19 — codecov's checks are `informational`. the effect?**
- [ ] A. coverage only uploads on pushes to main, not PRs
- [x] B. the status posts on PRs but can never fail or block a merge
- [ ] C. coverage runs in CI but skips the upload step
- [ ] D. codecov's PR comment is suppressed

> ✓ B — posts status, never blocks

**Q20 — why hit codecov's branch-level endpoint instead of repo-level?**
- [ ] A. repo-level needs an auth token even on public repos
- [ ] B. branch-level responses are smaller and faster
- [x] C. repo-level `totals` lag behind the newest report; branch-level `head_commit.totals` is current
- [ ] D. repo-level aggregates every branch, including stale ones

> ✓ C — repo-level `totals` lag; branch-level `head_commit.totals` is current

**The blind-spot map you asked for:** it's almost embarrassingly clean. Architecture, caching semantics, git plumbing, CI wiring — all solid, including both order-of-operations traps. The single miss isn't a stats-widget gap at all; it's a general-engineering concept (failure taxonomy / retry semantics) that happens to surface in `githubFetch`. That's a genuinely useful finding: you understand *your system* thoroughly — the frontier is now the transferable concepts underneath it. One focused read on retry design closes it.
