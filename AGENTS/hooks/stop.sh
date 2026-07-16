#!/bin/bash
# ============================================
# @file stop.sh - agent stop hook instructions
# ============================================
# @description
# - creates a new log file for today if none exists yet
# - blocks session end unless today's log file has been touched recently
# - appends a note to a thread every 15 minutes
# - synthesizes notes into a new thread every 60 minutes
# @see AGENTS.md, AGENTS/hooks.md, AGENTS/logs.md, AGENTS/hooks/sessionstart.sh

TODAYS_LOG="AGENTS/logs/$(date +%Y-%m-%d).md"
UPDATE_INTERVAL=900
SYNTHESIZE_INTERVAL=4
TICKER_FILE="AGENTS/logs/.ticker"
NOW=$(date +%s)
LAST_MODIFIED=$(stat -f %m "$TODAYS_LOG" 2>/dev/null || stat -c %Y "$TODAYS_LOG" 2>/dev/null || echo 0)

# check if today's log exists already
if [ ! -f "$TODAYS_LOG" ];
then mkdir -p AGENTS/logs; echo "# $TODAYS_LOG" > "$TODAYS_LOG"; fi

# check if today's log was updated recently
ELAPSED_TIME=$((NOW - LAST_MODIFIED))
if [ "$ELAPSED_TIME" -gt "$UPDATE_INTERVAL" ]; then

  # this script runs fresh on every Stop hook, so the tick count has to be persisted to disk
  TICKER_COUNT=$(cat "$TICKER_FILE" 2>/dev/null || echo 0)
  case "$TICKER_COUNT" in ''|*[!0-9]*) TICKER_COUNT=0 ;; esac
  TICKER_COUNT=$((TICKER_COUNT + 1))

  # asks for a full consolidation every nth synthesize interval
  if [ "$((TICKER_COUNT % SYNTHESIZE_INTERVAL))" -eq 0 ]; then
    echo 0 > "$TICKER_FILE"
    jq -n --arg reason "Synthesize last three notes of $TODAYS_LOG into a new thread (see AGENTS/logs.md)" \
    '{decision:"block", reason:$reason}'
  else
    # asks for a note to be appended to the log every update interval
    echo "$TICKER_COUNT" > "$TICKER_FILE"
    jq -n --arg reason "Append a note to the end of $TODAYS_LOG (see AGENTS/logs.md)" \
    '{decision:"block", reason:$reason}'
  fi
  exit 0
fi

exit 0
