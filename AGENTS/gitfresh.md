**@gitfresh:** Run ONLY on explicit `@gitfresh` command
- run this command if your repo is hopelessly desynchronized or corrupted by failed merges
- destroys all uncommitted local changes and untracked files permanently
- destroys all local branches except for the default branch
- hard-resets local default branch to exactly match upstream
- re-initializes clean remote tracking structures
- leaves you on a pristine, 100% up-to-date default trunk

1. `git rev-parse --is-inside-work-tree`
   - fail → abort and report: "not a git repository"
2. READ-ONLY: show blast radius and request confirmation
   - `git branch --show-current`
   - `git status --porcelain | wc -l | tr -d ' '`
   - `git for-each-ref --format='%(refname:short)' refs/heads/`
   Present plainly: 
3. CONFIRM: "@gitfresh will:
     • BACKUP and DISCARD <X> uncommitted/untracked changes
     • RESET <defaultBranch> to exactly match origin
     • DELETE the following local branches: <localBranches>
     • to continue, type exactly: `Yes, nuke everything and start fresh!`"
   - fail → abort and report: "@gitfresh aborted — nothing changed"
4. IF CONFIRMED, run the native shell command exactly as specified
  ```bash
  AGENTS/gitfresh.sh --confirmed
  ```
5. IF SUCCESS (exit code 0): parse the `stdout` of the shell command and output the results:
  ```text
  - shell command status: succeeded
  - initiated script on: $STARTING_BRANCH
  - default branch: $DEFAULT_BRANCH
  - backup stash name: $STASH_NAME
  - untracked files backed up: $UNTRACKED_COUNT
  - modifications backed up: $MODIFIED_COUNT
  - total branches deleted: $DELETED_BRANCHES_COUNT
  - deleted branches names: ${DELETED_BRANCHES_NAMES:-none}
  - default branch status: $DEFAULT_BRANCH_STATUS
  
  > generate a 1-sentence summary of what happened and any potential tasks i should consider
  ```
6. IF FAILURE: parse the raw terminal error message and output the results:
  ```text
  - shell command status: failed

  > generate a 1-sentence summary of what went wrong and any potential fixes i should consider
  ```
