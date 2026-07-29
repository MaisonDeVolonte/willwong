# AGENT PLAN: Operation Vendor Lock

## Context
`AGENTS/` and `AGENTS.md` are symlinks into the `operator` repo (commit 7769c6c, 2026-07-23).
Git stores a symlink as its literal target path, so on any CI runner or clone the files do not
exist. `scripts/content.mjs:50` resolves `@mirror` targets by reading them from disk at build
time and `content.mjs:52` silently substitutes `// @mirror target not found` on failure. A fresh
clone of `main` produces 29 placeholder pages. Every CI build since 07-23 has produced them and
stayed green, because nothing asserts on mirror bodies. Production is unaffected only because it
still serves 17fe0ea, deployed 20 minutes before the symlink commit landed. The next deploy off
`main` ships those 29 broken pages.

73 unique mirror targets exist. 45 point at willwong's own source. 28 point into operator.
Those two groups want opposite things:

- the 45 in-repo targets are the code the deployed site is running; freezing them into the
  build bundle guarantees the site displays the source it is actually executing
- the 28 operator targets are not willwong's running code; freezing them buys nothing and is
  exactly what requires vendoring to work at all

So the mirror problem is not a vendoring problem. It is a sourcing problem, and git-as-CMS
already solves that shape of problem at `src/cms/source.ts`.

Separately, the underlying goal stands: manage agent workflows centrally in `operator`, pull
them into any project, and per-project choose to track (as project lead, enforcing shared rules)
or ignore (as a guest contributor). A tracked copy must never silently diverge from its source.

Success = zero placeholders in a fresh-clone build, `git push origin main:production` is safe,
and operator edits reach willwong.me without a willwong deploy.

## Solution
Two phases, deliberately decoupled. Phase 1 unblocks the deploy and is not blocked on Phase 2.

**Phase 1 — hybrid mirror resolution.** Keep build-time bundling for the 45 in-repo targets.
Resolve the 28 operator targets at request time through the existing git-as-CMS machinery.

- `directives.ts` keeps its pure parsers; extract `parseMirrorTarget` so the target string can be
  read without resolving it
- new `src/cms/mirrors.ts` owns resolution: in-repo targets hit the `MIRRORS` bundle, operator
  targets fetch `raw.githubusercontent.com/MaisonDeVolonte/operator/main/<target>`
- lazy and per-target, wrapped in `unstable_cache` with its own tag, so visiting one page fetches
  one file rather than eagerly pulling all 28
- `pages.ts:197` and `pages.ts:206` await the resolver; both call sites are already async
- dev/CI read operator targets from local disk (the symlink resolves on the dev machine) and fall
  back to a visible placeholder when absent, so `CONTENT_SOURCE=local` stays hermetic and offline
- add operator identity + cache constants to `src/utilities/githubRepo.ts`
- wire operator's repo to `/api/webhooks/github` so pushing an agent edit revalidates willwong.me

**Phase 2 — vendor lock (deferred, no longer blocks any deploy).** Only about enforcing agent
rules in repos where you are the lead. `pull.sh` lives canonically in `operator` and vendors a
copy into each project as `AGENTS/operator.sh`; it clones to a temp dir and re-execs before
syncing, so it never overwrites itself mid-run. Subcommands: `pull` (copy + stamp
`AGENTS/.operator-rev`), `diff` (compare against the pinned rev), `verify` (fetch the pinned rev
and fail on mismatch; this is what CI runs).

Four lock layers, applied in tracked/lead-mode projects: a `MANAGED BY OPERATOR` banner in
operator's source files (not injected at pull time, so copies stay byte-identical for diffing);
`chmod a-w` on pulled files; `Edit(AGENTS/**)`/`Write(AGENTS/**)` moved to `deny`; and a CI gate
running `verify`. Guest-mode projects get layers 1-3 and use `.git/info/exclude` rather than the
tracked `.gitignore`.

## Risks
- `runtime fetch failure` operator pages can now fail at request time where a bundle could not;
  mitigated by the existing retry/backoff in `githubFetch`, ISR caching, and a placeholder that
  self-heals on the next revalidate instead of baking into a deploy
- `invariant loss` moving the 45 in-repo targets to runtime would make the site display `main`
  while running `production` code; do not do it, that is why the split exists
- `cold cache cost` per-target lazy fetching keeps this off the critical path, but eager
  prefetching all 28 would push cold loads toward the ~100-request self-throttle noted in
  `source.ts:76`
- `CI hermeticity` `CONTENT_SOURCE=local` must keep working with no network; operator targets
  degrade to a placeholder in CI, which is acceptable only because no test asserts mirror bodies
- `self-modifying script` (Phase 2) a script that rsyncs over itself mid-run can execute garbage;
  avoided by cloning to a temp dir and re-execing before any sync
- `locked out mid-session` (Phase 2) once `Edit(AGENTS/**)` is denied, a broken hook cannot be
  hot-fixed from a willwong session; the fix has to happen in operator and be pulled

## Checklist
- [ ] add operator owner/name/branch and mirror cache tag + revalidate to `githubRepo.ts`
- [ ] extract `parseMirrorTarget` from `processMirror` in `directives.ts`, keeping parsers pure
- [ ] create `src/cms/mirrors.ts` with an async `resolveMirror`, in-repo via bundle
- [ ] add operator raw-URL fetching to `resolveMirror`, per-target and `unstable_cache` wrapped
- [ ] add the local-disk path for operator targets so dev and CI stay hermetic
- [ ] await `resolveMirror` at `pages.ts:197` and `pages.ts:206`
- [ ] update `directives.test.ts` for the extracted parser, add unit tests for `resolveMirror`
- [ ] confirm `content.mjs` no longer warns on operator targets, or stops resolving them entirely
- [ ] run the fresh-clone check and confirm zero placeholders
- [ ] gitdeliver Phase 1, then run `git push origin main:production`
- [ ] add operator to the `/api/webhooks/github` revalidate wiring
- [ ] Phase 2: write `pull.sh` in operator with `pull` / `diff` / `verify`
- [ ] Phase 2: add the `MANAGED BY OPERATOR` banner to every file under operator's `AGENTS/`
- [ ] Phase 2: convert willwong to lead mode, flip the allow rule to deny, add the CI verify gate

## Future Work
- [ ] reconsider the throw-on-unresolved guardrail for `content.mjs`, now scoped to in-repo
      targets only, where a miss is unambiguously a real bug
- [ ] fix `gitempty.sh:47`, `git stash list | grep -q` under `set -o pipefail` fails on SIGPIPE
      and silently skips the stash pop
- [ ] extend `pull.sh` to a second consumer project and confirm guest mode behaves as designed
- [ ] consider serving operator mirrors from a pinned rev rather than `main` for reproducibility

## Notes
1. rewritten 2026-07-29 after counting mirror targets: 73 total, 28 operator, 45 in-repo
2. the original plan treated the mirror breakage as a vendoring problem; it is a sourcing problem,
   and conflating them made Phase 2 a deploy blocker when it never needed to be
3. `source.ts:104` already makes one recursive tree call covering the whole repo, so in-repo
   enumeration is free if runtime resolution is ever wanted there; it is not wanted, see Risks
4. mirror targets are named explicitly in the pointer files, so operator needs no tree call at
   all, just direct raw fetches by path
5. operator is public, so no auth is needed for the raw fetches
6. willwong is operator's only consumer today, which is why Phase 2 is lead-mode and low-urgency
7. PRs #168-#175 landed earlier today; #171 fixed the docs gitignore bug, #172 repointed the 5
   stale mirror paths, both are prerequisites already merged
