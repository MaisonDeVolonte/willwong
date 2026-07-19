```javascript
/**
 * ===============================================
 * @file hooks.md - grok hook events documentation
 * ===============================================
 * @description
 * - hooks are command or http handlers
 * - the harness runs hooks deterministically
 * - hooks receive json on stdin; pretooluse may return json on stdout
 * - only PreToolUse can block; every other event is passive
 * - rarity: common, situational, rare
 * - full docs: ~/.grok/docs/user-guide/10-hooks.md
 * @see AGENTS.md, /AGENTS/hooks/, .grok/config.toml, .grok/hooks/
 */
```

# Grok Hook Events Documentation

## Currently Implemented Hooks

### `"SessionStart": [],`
- rarity: common
- trigger: session begins
- blocking: no — stdout ignored; use for disk/env side effects
- use: create today's log; Claude's `additionalContext` injection is **not** applied here
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/sessionstart.sh", "timeout": 10 }]
```

### `"Stop": [],`
- rarity: common
- trigger: agent turn ends (completed, cancelled, or error)
- blocking: no — stdout ignored; Claude `decision:"block"` does **not** re-engage the turn
- use: ticker side effects (touch log/prompts files); note/synth must be requested in-band or via manual `@log*` triggers
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/stop.sh", "timeout": 10 }]
```

### `"PostToolUse": [],`
- rarity: common
- trigger: after a tool succeeds; filter with `matcher` (tool name or `Tool1|Tool2`)
- blocking: no
- use: run formatters after edits — `eslint --fix` on js/ts via shared script
```json
"matcher": "Write|Edit", "hooks": [{ "type": "command", "command": "AGENTS/hooks/posttooluse.sh", "timeout": 30 }]
```

---

## Unused Grok Hooks

### Session lifecycle

#### `"SessionEnd": [],`
- rarity: situational
- trigger: session terminates, right before process exit
- blocking: no
- use: kill lingering servers, clean worktrees — not for writing model-facing summaries
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/sessionend.sh" }]
```

### Turns

#### `"UserPromptSubmit": [],`
- rarity: common
- trigger: every prompt you submit, before the model sees it
- blocking: no (passive in Grok)
- use: logging / telemetry only unless Grok later expands context injection
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/userpromptsubmit.sh" }]
```

#### `"StopFailure": [],`
- rarity: rare
- trigger: turn ends due to an api error (rate limit, overload, auth, etc.)
- blocking: no
- use: side-effect logging of failure type
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/stopfailure.sh" }]
```

#### `"Notification": [],`
- rarity: situational
- trigger: agent/system notification events
- matcher: notification type (optional)
- use: custom alerting when stepping away mid-session
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/notification.sh" }]
```

### Tools

#### `"PreToolUse": [],`
- rarity: common
- trigger: before any tool executes; filter with `matcher`
- blocking: **yes** — only blocking event
- use: deny via stdout `{"decision":"deny","reason":"..."}` or exit `2`
```json
"matcher": "Bash", "hooks": [{ "type": "command", "command": "AGENTS/hooks/pretooluse.sh" }]
```

#### `"PostToolUseFailure": [],`
- rarity: situational
- trigger: a tool call errors instead of succeeding
- blocking: no
- use: capture failure context
```json
"matcher": "Bash", "hooks": [{ "type": "command", "command": "AGENTS/hooks/posttoolusefailure.sh" }]
```

#### `"PermissionDenied": [],`
- rarity: rare
- trigger: permission system denies a tool call
- blocking: no
- use: notice when deny rules fire more than expected
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/permissiondenied.sh" }]
```

### Subagents

#### `"SubagentStart": [],`
- rarity: situational
- trigger: a subagent begins
- blocking: no
- use: log agent type / isolation independent of main session
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/subagentstart.sh" }]
```

#### `"SubagentStop": [],`
- rarity: situational
- trigger: a subagent finishes (`SubagentEnd` accepted as alias)
- blocking: no
- use: per-subagent cleanup or notes
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/subagentstop.sh" }]
```

### Context

#### `"PreCompact": [],`
- rarity: situational
- trigger: before conversation compaction
- blocking: no
- use: last look at full context before it is condensed
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/precompact.sh" }]
```

#### `"PostCompact": [],`
- rarity: situational
- trigger: after compaction completes
- blocking: no
- use: append summary to today's log so compaction is not invisible
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/postcompact.sh" }]
```

---
