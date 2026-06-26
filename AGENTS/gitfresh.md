**@gitfresh:** Run ONLY on explicit `@gitfresh` command
- typically ran when local workspace is broken, conflicted, or severely desynced
- backs up all tracked modifications (staged/unstaged) and untracked files into an emergency stash
- aborts active operations, purges untracked files, and hard-resets trunk to upstream
- drops all local branches and forces a perfectly pristine matching layout with origin

1. run the native shell command exactly as specified
  ```bash
  AGENTS/gitaudit.sh
  ```
  - fail (exit code > 0) → abort and report: "<raw terminal error>"
  - success (exit code = 0):
    ```text
    - @gitaudit telemetry data
    
    - @gitfresh will:
      - BACKUP then DISCARD [SUM staged_files + unstaged_files + untracked_files] uncommitted/untracked changes
      - RESET [default_branch] to exactly match origin
      - DELETE the following local branches:
          - [local_branches]

    - to continue, type exactly: `Yes, nuke everything and start fresh!`
    ```
    - fail → "not exact match – @gitfresh aborted — nothing changed"
    - success → continue to next step

2. run the native shell command exactly as specified
  ```bash
  AGENTS/gitfresh.sh --confirmed
  ```
  - fail (exit code > 0) → abort and report: "<raw terminal error>"
  - success (exit code = 0) → continue and report: "@gitfresh telemetry"
