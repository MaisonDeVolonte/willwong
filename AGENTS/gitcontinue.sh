#!/bin/bash
set -euo pipefail

# check if in git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "fatal: not a git repository" >&2; exit 2; fi

# check for in-progress git operations
if [ -d ".git/rebase-merge" ] || [ -d ".git/rebase-apply" ] || [ -f ".git/MERGE_HEAD" ] || [ -f ".git/CHERRY_PICK_HEAD" ]; then
  echo "fatal: merge, rebase, or cherry-pick in progress" >&2; exit 2; fi

# query remote to ensure origin/HEAD exists locally
git remote set-head origin --auto >/dev/null 2>&1 || true

# initialize variables
DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo "")
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")
STARTING_BRANCH=$CURRENT_BRANCH

# validate branch state
if [ -z "$DEFAULT_BRANCH" ]; then
  echo "fatal: missing remote default branch" >&2; exit 2; fi

if [ -z "$CURRENT_BRANCH" ]; then
  echo "fatal: detached HEAD" >&2; exit 2; fi

# state capture & stash
DIRTY=0
if git status --porcelain 2>/dev/null | grep -q .; then
  DIRTY=1
  git stash push -u -m "auto-stash: @gitcontinue" >/dev/null 2>&1 || {
    echo "fatal: could not stash uncommitted changes" >&2; exit 2;
  }
fi

# trunk sync
if ! git fetch origin "$DEFAULT_BRANCH" --quiet; then
  echo "fatal: could not fetch origin/$DEFAULT_BRANCH (network or remote error)" >&2; exit 2; fi

# switch to default branch
if [ "$CURRENT_BRANCH" != "$DEFAULT_BRANCH" ]; then
  if ! git switch "$DEFAULT_BRANCH" >/dev/null 2>&1; then
  echo "fatal: git refused to switch to $DEFAULT_BRANCH" >&2; exit 2; fi
  CURRENT_BRANCH=$DEFAULT_BRANCH
fi

LOCAL_COMMIT=$(git rev-parse "$DEFAULT_BRANCH")
REMOTE_COMMIT=$(git rev-parse "origin/$DEFAULT_BRANCH")

# fast-forward only
if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
  if ! git merge --ff-only "origin/$DEFAULT_BRANCH" >/dev/null 2>&1; then
  echo "fatal: $DEFAULT_BRANCH diverged from origin — recover with @gitfresh" >&2; exit 2; fi
fi

# integration & replay
CONFLICT=0
if [ $DIRTY -eq 1 ]; then
  # We use || true so the script doesn't instantly exit (set -e) if there's a conflict
  if ! git stash pop >/dev/null 2>&1; then
    CONFLICT=1
  fi
fi

# output telemetry
cat <<EOF

=== @gitcontinue telemetry ===
CHECKS: validated env/state, stashed work, synced origin, fast-forwarded trunk, and restored state
DEFAULT BRANCH: $DEFAULT_BRANCH
STARTING BRANCH: $STARTING_BRANCH
EOF

if [ $CONFLICT -eq 1 ]; then
  cat <<EOF
STATUS: STASH POP CONFLICT DETECTED
ACTION: Trunk synced, but your uncommitted changes conflict. Resolve the conflicts in your editor to continue.
==============================
EOF
else
  cat <<EOF
STATUS: SUCCESS
ACTION: Trunk synced and you are ready to continue working on $DEFAULT_BRANCH.
==============================
EOF
fi

# exit with code 1 ONLY if we hit a conflict, signaling to the agent that user action is required
if [ $CONFLICT -eq 1 ]; then
  exit 1
fi
