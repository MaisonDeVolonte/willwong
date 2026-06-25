**@gitempty:** Run ONLY on explicit `@gitempty` command
- run this command to restore order to your local git repository
- typically post-merge but safe to run anytime
- prunes dead remote tracking references
- automatically stashes and restores uncommitted local changes
- fast-forwards default branch to latest upstream
- preserves local branches with unmerged commits
- destroys merged branches whose upstreams are gone (regular and rebase)
- puts you back on your starting branch or a freshly synced default (if deleted)

1. `git rev-parse --is-inside-work-tree`
  - fail → abort and report: "not a git repository"
2. run the native shell command exactly as specified
  ```bash
  AGENTS/gitempty.sh
  ```
3. IF SUCCESS (exit code 0): parse the `stdout` of the shell command and output the results:
  ```text
  - shell command status: succeeded
  - initiated script on: $STARTING_BRANCH
  - total changes stashed: $STASHED_CHANGES
  - total fast-forwarded commits: $FAST_FORWARDED
  - total branches deleted: $DELETED_BRANCHES_COUNT
  - deleted branch names: ${DELETED_BRANCHES:-none}
  - total branches preserved: $PRESERVED_BRANCHES_COUNT
  - preserved branch names: ${PRESERVED_BRANCHES:-none}
  - starting branch status: $STARTING_BRANCH_STATUS
  - stash restored status: $STASH_RESTORED_STATUS

  > generate a 1-sentence summary of what happened and any potential tasks i should consider
  ```
4. IF FAILURE: parse the raw terminal error message and output the results:
  ```text
  - shell command status: failed

  > generate a 1-sentence summary of what went wrong and any potential fixes i should consider
  ```
