**@gitempty:** Run ONLY on explicit `@gitempty` command
- typically ran post-merge but safe to run anytime
- stashes work, prunes dead remotes, fast-forwards trunk, and returns you to starting branch
- preserves unmerged branches and identifies merged branches eligible for deletion (local, remote, ghost, and zombie)

1. run the native shell command exactly as specified
  ```bash
  AGENTS/gitempty.sh
  ```
  - fail (exit code > 0) → abort and report: "<raw terminal error>"
  - success (exit code = 0) → continue and report: "@gitempty telemetry"

2. run the native shell command exactly as specified
  ```bash
  AGENTS/gitaudit.sh
  ```
  - fail (exit code > 0) → abort and report: "<raw terminal error>"
  - success (exit code = 0): ask the user to confirm any branch cleanup actions:

    ```text
    - ignored: you are safely on `current_branch`
  
    - skipped: unmerged branches that are not eligible for deletion
      - `branch_name`
  
    - local only deletions: merged = yes, reachable = yes, and remote = no
      - `branch_name` → `git branch -d branch_name`

    - local & remote deletions: merged = yes, reachable = yes, and remote = yes
      - `branch_name` → `git push origin --delete branch_name && git branch -d branch_name`
  
    - ghost deletions: merged = yes (squash/rebase), reachable = no, and remote = no
      - `branch_name` → `git branch -D branch_name`

    - zombie deletions: merged = yes (squash/rebase), reachable = no, and remote = yes (still on GitHub)
      - `branch_name` → `git push origin --delete branch_name && git branch -D branch_name`
    ```
