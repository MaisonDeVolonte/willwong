#!/bin/bash
# ==============================================
# @file posttooluse.sh - posttooluse hook script
# ==============================================
# @description
# - runs after Write|Edit succeeds
# - extracts the touched file path from tool_input/tool_response
# - runs `eslint --fix` if it's a js/jsx/ts/tsx file
# - silent on non-fixable issues, never blocks the turn
# @see AGENTS.md, .claude/settings.json

FILE=$(jq -r '.tool_response.filePath // .tool_input.file_path')

case "$FILE" in
  *.js|*.jsx|*.ts|*.tsx) npx eslint --fix "$FILE" 2>/dev/null ;;
esac

exit 0
