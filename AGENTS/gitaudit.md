**@gitaudit:** Run ONLY on explicit `@gitaudit` command
run the following commands and record each output as a variable:
  0. `git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'`
    - <defaultBranch> (use to replace `<defaultBranch>` placeholders)
  1. `git branch --show-current`
     - <currentBranch: default | branch | detached | null>
  2. `git log -1 --format="%cd" --date=relative`
     - <lastActivity: X | null>
  3. `git status --porcelain`
     - "empty" -> clean; "characters in col 1" -> staged; "characters in col 2 or ??" -> unstaged; "characters in both" -> both
     - <branchChanges: clean | staged | unstaged | both | null>
  4. `git stash list`
     - <hiddenStashes: X | null>
  5. `git fetch --all --prune && git rev-list --left-right --count <defaultBranch>...origin/<defaultBranch> 2>/dev/null`
     - "0 0" -> synced; "0 N" -> behind; "N 0" -> ahead; "N N" -> diverged
     - <mainStatus: synced | behind | ahead | diverged | null>
  6. `git rev-parse --abbrev-ref @{u} >/dev/null 2>&1 && git log @{u}..HEAD --oneline | wc -l | tr -d ' ' || echo "null"`
     - <unpushedCommits: X | null>
  7. `git rev-parse --abbrev-ref @{u} >/dev/null 2>&1 && git log HEAD..@{u} --oneline | wc -l | tr -d ' ' || echo "null"`
     - <teamChanges: X | null>
  8. `git diff --name-only origin/<defaultBranch>..HEAD -- package.json pnpm-lock.yaml bun.lockb yarn.lock package-lock.json | wc -l | tr -d ' '`
     - <dependencyChanges: X | null>
  9. `gh run list --branch "$(git branch --show-current)" --limit 1 --json status,conclusion -q '.[0] | "\(.status) (\(.conclusion))"'`
     - <lastBuild: completed (success) | completed (failure) | completed (cancelled) | in_progress () | queued () | null>
  10. `gh pr list --author "@me" | wc -l | tr -d ' '`
     - <activePrs: X | null>
  11. `gh pr list --search "review-requested:@me"| wc -l | tr -d ' '`
     - <reviewPrs: X | null>
  12. `gh issue list --assignee "@me" | wc -l | tr -d ' '`
     - <assignedIssues: X | null>

output the following report text inside a single markdown code block, injecting the variables recorded above:
```text
- local
   1. you are on the `<currentBranch>` branch
   2. you made a change to this branch `<lastActivity>`
   3. you have `<branchChanges>` changes
   4. you have `<hiddenStashes>` hidden stashes
- origin
   5. main is `<mainStatus>`
   6. you have `<unpushedCommits>` unpushed local commits
   7. you have `<teamChanges>` incoming changes
   8. you have `<dependencyChanges>` dependency changes
- team
   9. your last build `<lastBuild>`
  10. you have `<activePrs>` active PRs
  11. you have `<reviewPrs>` PRs awaiting your review
  12. you have `<assignedIssues>` assigned issues
```

pass the generated report through the following priority matrix:
  - Broken: failed build, diverged main, dependency changes
  - Blocking: prs waiting to be merged, prs awaiting review
  - Building: unpushed commits, incoming commits, work in progress
  - Backlog: assigned issues, icebox items, housekeeping

output: a 1-sentence analytical summary and 3 potential tasks to work on next, favoring `Agent Triggers` when applicable
