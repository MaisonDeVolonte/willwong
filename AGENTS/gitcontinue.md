**@gitcontinue:** Run ONLY on explicit `@gitcontinue` command
1. `git rev-parse --is-inside-work-tree`
   - fail → abort and report: "not a git repository"
2. `git remote set-head origin --auto || true`
   - set the remote head to the default branch
3. run the native shell command exactly as specified:
```bash
DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@')
BRANCH_LIST=$(git for-each-ref \
    --sort=-committerdate refs/heads/ \
    --format='%(refname:short)'
)
for branch in $BRANCH_LIST; do
    if [ "$branch" = "$DEFAULT_BRANCH" ]; then continue; fi
    LAST=$(git log -1 --format='%cr' "$branch")
    SUBJECT=$(git log -1 --format='%s' "$branch")
    AHEAD=$(git rev-list --count "$DEFAULT_BRANCH..$branch" 2>/dev/null || echo "?")
    TRACK=$(git for-each-ref --format='%(upstream:track,nobracket)' "refs/heads/$branch")
    echo "branch: $branch | last: $LAST | ahead: $AHEAD | upstream: ${TRACK:-none} | last_commit: $SUBJECT"
done
```
3. For EACH branch, SYNTHESIZE a one-line "what & why" from the branch name + last commit 
   - If upstream is "gone", flag it: "(looks merged — a @gitempty candidate, not ideal to continue)"
   - If there are no branches, report "no other branches — you're on <defaultBranch>" and STOP
4. ask: "which branch do you want to continue on? (number or name)"
   - on selection → git switch <selected>
   - fail → abort: "uncommitted changes conflict with <selected> — stash first"
   - success → report "on <selected> — godspeed good sir!"
