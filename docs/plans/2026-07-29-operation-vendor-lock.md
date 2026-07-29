# AGENT PLAN: Operation Vendor Lock

## Context
`AGENTS/` and `AGENTS.md` are symlinks into the `operator` repo (commit 7769c6c). Git doesn't
follow symlinks, it stores the literal target path, so on any machine other than this Mac -
including every CI runner - the files don't exist. `scripts/content.mjs` resolves ~29 `@mirror`
pointers by reading these files from disk at build time, and silently swaps in a
`// @mirror target not found` placeholder on failure. Production hasn't shown this yet only
because the last deploy (17fe0ea) predates the symlink migration. The next deploy ships ~29
broken pages with a green CI run.

Separately, PR #170 gitignored all of `docs/{audits,brutal,insights,logs,plans,prompts,study}/`
wholesale. Only `logs.md` and `prompts.md` templates say "gitignored, local-only, never
committed" - the other five (plans, audits, insights, brutal, study) explicitly say
"tracked in git". That's a bug already merged to `origin/main`.

Underlying goal: manage agent workflows (`AGENTS/`) centrally in `operator`, pull them into any
project, and per-project choose to track/commit (as project lead, to enforce shared rules) or
gitignore (as a guest contributor, personal-only). Whichever is chosen, a tracked copy must never
develop an unreconcilable diff against its source.

Success = `AGENTS/` resolves as real files everywhere (local, CI, any clone), the `docs/`
gitignore rules match what each template actually declares, and tracked `AGENTS/` copies are
provably identical to their operator source at all times, not just by convention.

## Solution
Replace the symlinks with vendored copies, synced by a script, protected by layered locks so a
tracked copy can't silently drift.

**pull.sh** - lives in `operator` (canonical, tracked there), also vendored into every project's
`AGENTS/operator.sh` after a pull. Clones/fetches operator into a temp dir first, then re-execs
that copy to do the actual sync - never rsyncs a running script over itself. Subcommands:
- `pull` - copy `operator/AGENTS/**` + `README.md` into the project, stamp `AGENTS/.operator-rev`
  with the operator commit hash
- `diff` - compare the project's `AGENTS/` against operator at the pinned rev
- `verify` - fetch operator at the pinned rev (via public GitHub, no auth) and fail if any file
  differs; this is what CI runs

**4 lock layers**, increasing enforcement, applied in lead-mode (tracked) projects:
1. banner in every operator source file: "MANAGED BY OPERATOR - DO NOT EDIT IN THIS REPO" -
   lives in operator's source so vendored copies stay byte-identical for diffing
2. `chmod a-w` on every pulled file - catches accidental edits at save time
3. `"Edit(AGENTS/**)", "Write(AGENTS/**)"` moved to `deny` in the project's `.claude/settings.json`
   (willwong currently has the opposite: an `allow` rule in `settings.local.json:9`)
4. CI gate - `AGENTS/operator.sh verify` as a build step, fails the trunk on any mismatch

Guest-mode (gitignored) projects get layers 1-3 only, and use `.git/info/exclude` for the ignore
rule instead of the tracked `.gitignore`, since a personal-only choice shouldn't show up as a
diff in someone else's repo.

For willwong specifically: lead mode. Delete the symlinks, `pull`, commit the ~32 real files,
flip the allow rule to deny, add the CI gate, fix the `docs/` gitignore to only cover
`logs/` and `prompts/`, fold all of it into the already-parked `fix/AGENTS/repoint-stale-mirror-targets`
branch (commit 5c6b291 - repoints the 5 stale mirror targets, throws instead of placeholdering
on an unresolved mirror), then `gitdeliver`.

## Risks
- `self-modifying script` - a bash script that overwrites itself mid-run can execute garbage
  mid-read; avoided by cloning operator to a temp dir before syncing, never syncing in place
- `stale vendored copy` - willwong's rendered mirrors are only as fresh as the last `pull`;
  treat this as pinning (like a lockfile), not silent drift - `diff` surfaces it on demand
- `locked out mid-session` - once `Edit(AGENTS/**)` is denied, a broken hook script can't be
  hot-fixed from inside a willwong session; the fix has to happen in an `operator` session, then
  get pulled - working as intended, but worth remembering when a hook misbehaves at 2am
- `CI network dependency` - `verify` fetches operator from GitHub at build time; operator is
  public so no auth is needed, but this is still a new external dependency in the build
- `docs/ gitignore regression` - fixing PR #170's bug touches the same lines the AGENTS fix
  touches; do both in the same bucket so there's one clean diff, not two colliding ones

## Checklist
- [ ] in `operator`: write `pull.sh` with `pull` / `diff` / `verify` subcommands
- [ ] in `operator`: add the "MANAGED BY OPERATOR" banner to every file under `AGENTS/`
- [ ] in `operator`: confirm `pull.sh` clones to a temp dir before syncing, never syncs in place
- [ ] in willwong: delete the `AGENTS` and `AGENTS.md` symlinks
- [ ] in willwong: run `pull.sh`, verify `AGENTS/.operator-rev` is written
- [ ] in willwong: fix `.gitignore` so only `docs/logs/` and `docs/prompts/` are ignored,
      un-ignore `docs/plans/`, `docs/audits/`, `docs/insights/`, `docs/brutal/`, `docs/study/`
- [ ] in willwong: `chmod a-w` the pulled `AGENTS/` tree
- [ ] in willwong `.claude/settings.json`: move `Edit(AGENTS/**)` / `Write(AGENTS/**)` to `deny`
- [ ] in willwong `.claude/settings.local.json`: remove the now-conflicting `allow` rule for
      `AGENTS/**` writes
- [ ] in willwong `ci.yml`: add `AGENTS/operator.sh verify` as a build step
- [ ] fold all of the above into `fix/AGENTS/repoint-stale-mirror-targets` (commit 5c6b291 already
      parked there) so it ships as one coherent branch
- [ ] re-run the CI-clone test (`git clone` + `node scripts/content.mjs`) to confirm all ~29
      mirrors resolve with real vendored files present
- [ ] `gitdeliver` the finished branch
- [ ] drop `stash@{0}` ("wip: un-gitignore AGENTS + AGENTS.md"), superseded by this plan

## Future Work
- [ ] extend `pull.sh` to a second consumer project once one exists, confirm guest mode
      (`.git/info/exclude`, no deny/CI gate) actually behaves as designed on a repo you don't lead
- [ ] consider a friendlier `diff` output (side-by-side or a TUI) instead of raw `diff -r`
- [ ] consider signing operator's `AGENTS/` payload so `verify` can't be fooled by a
      compromised fetch, probably overkill while operator is solo-authored and public

## Notes
1. discovered mid-session while investigating why the AGENTS mirrors would break on next deploy
2. the mirror-fix branch (`fix/AGENTS/repoint-stale-mirror-targets`) was parked mid CI-clone-test
   when the user paused to reconsider symlink vs tracked-copy entirely - don't lose that commit
3. PR #168 (deny list hardening) and PR #170 (docs/ gitignore) already merged before this plan
   existed; #170 is the one with the plans/audits/insights/brutal/study over-broad bug
4. willwong is operator's only consumer today (checked via `find` across `~/Developer/Projects`),
   which is why willwong goes lead-mode rather than guest-mode
5. the banner lives in operator's *source*, not injected during pull, specifically so a pulled
   copy is byte-identical to its source and `diff`/`verify` have nothing spurious to flag
6. this plan doesn't fix drift, it prevents *unreconciled* drift - staleness is allowed and
   expected, like a dependency pinned until `npm update`; only a hand-edit inside the vendored
   copy is what the lock layers are stopping
