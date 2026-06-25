**@gitbegin:** Run ONLY on explicit `@gitbegin` command
1. `git rev-parse --is-inside-work-tree`
   - fail → abort and report: "not a git repository"
2. `git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'` 
   - save → `<defaultBranch>`
3. `git switch <defaultBranch>`
   - fail → abort and report: "conflict with `<defaultBranch>`, stash first"
4. `git pull --ff-only`
   - fail → continue and report: "diverged from `origin/<defaultBranch>`, rebase first"
5. `git switch -m temp/branch 2>/dev/null || git switch -c temp/branch`
   - success → report: "moved to `<temp/branch>`, free to continue working"
