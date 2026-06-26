#!/bin/bash
set -euo pipefail

# check if in git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "fatal: not a git repository" >&2; exit 1; fi

# check for in-progress git operations
if [ -d ".git/rebase-merge" ] || [ -d ".git/rebase-apply" ] || [ -f ".git/MERGE_HEAD" ] || [ -f ".git/CHERRY_PICK_HEAD" ]; then
  echo "fatal: merge, rebase, or cherry-pick in progress" >&2; exit 1; fi

# query remote to ensure origin/HEAD exists locally
git remote set-head origin --auto >/dev/null 2>&1 || true

DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo "")
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")
STARTING_BRANCH=$CURRENT_BRANCH

# validate branch state
if [ -z "$DEFAULT_BRANCH" ]; then
  echo "fatal: missing remote default branch" >&2; exit 1; fi

if [ -z "$CURRENT_BRANCH" ]; then
  echo "fatal: detached HEAD" >&2; exit 1; fi

# require a clean working tree before starting fresh (never discard work)
if git status --porcelain 2>/dev/null | grep -q .; then
  echo "fatal: uncommitted work present — run @gitdeliver to ship it, or stash first" >&2; exit 1; fi

# switch to default branch (clean tree, so the switch is safe)
if [ "$CURRENT_BRANCH" != "$DEFAULT_BRANCH" ]; then
  if ! git switch "$DEFAULT_BRANCH" >/dev/null 2>&1; then
  echo "fatal: git refused to switch to $DEFAULT_BRANCH" >&2; exit 1; fi
  CURRENT_BRANCH=$DEFAULT_BRANCH
fi

# sync default branch with remote
if ! git fetch origin "$DEFAULT_BRANCH" --quiet; then
  echo "fatal: could not fetch origin/$DEFAULT_BRANCH (network or remote error)" >&2; exit 1; fi

LOCAL_COMMIT=$(git rev-parse "$DEFAULT_BRANCH")
REMOTE_COMMIT=$(git rev-parse "origin/$DEFAULT_BRANCH")

# fast-forward only; divergence is a recovery case, not a merge to resolve here
if [ "$LOCAL_COMMIT" != "$REMOTE_COMMIT" ]; then
  if ! git merge --ff-only "origin/$DEFAULT_BRANCH" >/dev/null 2>&1; then
  echo "fatal: $DEFAULT_BRANCH diverged from origin — recover with @gitfresh" >&2; exit 1; fi
fi

# output telemetry
cat <<EOF

=== @gitbegin preflight status ===
CHECKS: validated env/state, asserted clean tree, resolved trunk, synced origin
DEFAULT BRANCH: $DEFAULT_BRANCH
STARTING BRANCH: $STARTING_BRANCH
READY TO WORK ON TRUNK
==================================
EOF
