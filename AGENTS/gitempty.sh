#!/bin/bash
# exit if any command fails, including unset variables and pipeline errors
set -euo pipefail
# use remote default branch as local default branch
git remote set-head origin --auto >/dev/null || true

# initialize variables
DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@')
STARTING_BRANCH=$(git branch --show-current)
STASHED_CHANGES=$(git status --porcelain | wc -l | tr -d ' ')
STASH_RESTORED_STATUS="none"
DELETED_BRANCHES_COUNT=0
PRESERVED_BRANCHES_COUNT=0
DELETED_BRANCHES=""
PRESERVED_BRANCHES=""

# drop tracking refs for branches deleted on remote and mark their local upstream 'gone'
git fetch --prune >/dev/null
# check that the local default branch is an ancestor of the remote default branch
git merge-base --is-ancestor "$DEFAULT_BRANCH" "origin/$DEFAULT_BRANCH" \
  || { echo "can't run @gitempty with diverged $DEFAULT_BRANCH"; exit 1; }

# if uncommitted changes, create a temporary stash
if [ "$STASHED_CHANGES" -gt 0 ]; then git stash push -u -m "gitempty" >/dev/null; fi

# count how many commits local default branch is ahead of remote default branch
FAST_FORWARDED=$(git rev-list --count "$DEFAULT_BRANCH..origin/$DEFAULT_BRANCH")
# switch to the default branch and fast-forward it
git switch "$DEFAULT_BRANCH" >/dev/null
git merge --ff-only "origin/$DEFAULT_BRANCH" >/dev/null

# get list of local branches that are no longer upstream and delete the merged ones
GONE_BRANCHES=$(git branch -vv | grep ': gone]' | awk '{print $1}' | grep -v '^\*' | grep -vx "$DEFAULT_BRANCH" || true)
for branch in $GONE_BRANCHES; do
  # `-` = commit already merged; `+` = commit not merged
  # `0` = branch has unmerged commits (keep); `1` = branch fully merged (delete)
  if git cherry "$DEFAULT_BRANCH" "$branch" | grep -q '^+'; then
    PRESERVED_BRANCHES_COUNT=$((PRESERVED_BRANCHES_COUNT + 1))
    PRESERVED_BRANCHES="${PRESERVED_BRANCHES:+$PRESERVED_BRANCHES, }$branch"
  else
    git branch -D "$branch" >/dev/null
    DELETED_BRANCHES_COUNT=$((DELETED_BRANCHES_COUNT + 1))
    DELETED_BRANCHES="${DELETED_BRANCHES:+$DELETED_BRANCHES, }$branch"
  fi
done

# if original branch is gone, switch to default branch
(git switch "$STARTING_BRANCH" || git switch "$DEFAULT_BRANCH") >/dev/null

# check if original branch survived deletion
ENDING_BRANCH=$(git branch --show-current)
STARTING_BRANCH_STATUS=$([ "$STARTING_BRANCH" = "$ENDING_BRANCH" ] && echo "preserved" || echo "deleted")

# if there was a stash, pop it
if git stash list | grep -q "gitempty"; then
  # If stash pop fails due to a conflict, we catch it instead of letting set -e crash us
  if git stash pop >/dev/null; then STASH_RESTORED_STATUS="successfully restored"
  else STASH_RESTORED_STATUS="failed to restore"; fi
fi

# telemetry
echo "--- @gitempty telemetry ---"
echo "shell command status: succeeded"
echo "initiated script on: $STARTING_BRANCH"
echo "total changes stashed: $STASHED_CHANGES"
echo "total fast-forwarded commits: $FAST_FORWARDED"
echo "total branches deleted: $DELETED_BRANCHES_COUNT"
echo "deleted branch names: ${DELETED_BRANCHES:-none}"
echo "total branches preserved: $PRESERVED_BRANCHES_COUNT"
echo "preserved branch names: ${PRESERVED_BRANCHES:-none}"
echo "starting branch status: $STARTING_BRANCH_STATUS"
echo "stash restored status: $STASH_RESTORED_STATUS"
echo "---------------------------"
