```javascript
/**
 * ==========================================
 * @file hooks.md - ai hook events reference
 * ==========================================
 * @description
 * - hooks are commands, prompts, agents, or http calls
 * - the ai *harness* runs hooks *deterministically*
 * - hooks receive json on stdin and can return json on stdout
 * - entries include rarity, uses, and examples
 * - rarity:
 *   - `common`: you'll likely reach for this one
 *   - `situational`: useful for a specific workflow
 *   - `rare`: plumbing you probably won't touch directly
 * - `update-config` skill contains full schema
 * @see AGENTS.md, /AGENTS/, .claude/settings.json
 */
```

# Ai Hook Events Reference

## Session lifecycle

### `"SessionStart": [],`
- rarity: common
- trigger: session begins, resumes, or continues after `/clear` (works on unarchive)
- runs: before you've typed anything
- use: proactively seed state rather than scrambling to backfill it later
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/sessionstart.sh" }]
```

### `"SessionEnd": [],`
- rarity: situational
- trigger: session actually terminates — after the final turn, right before process exit; 
- matchers: `prompt_input_exit`, `clear`, `logout`, `bypass_permissions_disabled`, `resume`, `other` 
- runs: with no live turn, ever — stdout goes to system logs, not back to the model
- use: killing a lingering `dev`/`preview` server, removing an orphaned `EnterWorktree` worktree. 
- not: for writing summaries/logs — there's no reasoning available (see `AGENTS/logs/2026-07-15.md`)
- example:
```json
"matcher": "prompt_input_exit", "hooks": [{ "type": "command", "command": "AGENTS/hooks/sessionend.sh" }]
```

### `"Setup": [],`
- rarity: rare
- trigger: first-run/provisioning, not a per-session event
- use: verify required tooling (`jq`, `gh`) is on `PATH` before anything else runs
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/setup.sh" }]
```

---

## Turn / conversation lifecycle

### `"UserPromptSubmit": [],`
- rarity: common
- trigger: every prompt you submit, before the model sees it
- use: inject `additionalContext` (e.g. current git branch) or block the prompt outright
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/userpromptsubmit.sh" }]
```

### `"UserPromptExpansion": [],`
- rarity: rare
- trigger: a typed shortcut (slash command or `@trigger`) expands into full prompt text
- use: audit which trigger actually fired
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/userpromptexpansion.sh" }]
```

### `"Stop": [],`
- rarity: common
- trigger: the agent tries to end its turn
- use: block via `decision: "block"` + `reason`, fed back to the model instead of ending the turn
- live example — the one hook in this doc that's actually wired up and tested:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/stop.sh", "timeout": 10 }]
```

### `"StopFailure": [],`
- rarity: rare
- trigger: a `Stop` hook itself throws or times out
- use: alert when your enforcement hook silently breaks
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/stopfailure.sh" }]
```

### `"Notification": [],`
- rarity: situational
- trigger: os-level notification events (e.g. a permission prompt is waiting on you)
- use: custom alerting if you step away mid-session
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/notification.sh" }]
```

### `"MessageDisplay": [],`
- rarity: rare
- trigger: an assistant message is about to render in the ui
- use: observational logging, not something you block on — least documented of the turn events
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/messagedisplay.sh" }]
```

---

## Tool execution — the highest-leverage group after `Stop`

### `"PermissionRequest": [],`
- rarity: situational
- trigger: before the permission prompt shows, per tool call
- use: pre-decide `allow`/`deny`/`ask` via `permissionDecision`, skipping the prompt for cases you trust
- example:
```json
"matcher": "Bash", "hooks": [{ "type": "command", "command": "AGENTS/hooks/permissionrequest.sh" }]
```

### `"PermissionDenied": [],`
- rarity: rare
- trigger: a permission request was denied, by you or a rule
- use: notice when your `permissions.deny` rules fire more than expected
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/permissiondenied.sh" }]
```

### `"PreToolUse": [],`
- rarity: common
- trigger: before any tool executes; filter with `matcher` (tool name or `Tool1|Tool2`)
- use: block via `permissionDecision: "deny"`, or rewrite the call via `updatedInput`
- example:
```json
"matcher": "Bash", "hooks": [{ "type": "command", "command": "AGENTS/hooks/pretooluse.sh" }]
```

### `"PostToolUse": [],`
- rarity: common
- trigger: after a tool succeeds; same `matcher` filtering as `PreToolUse`
- use: the standard "run a formatter after every edit" hook lives here
- example:
```json
"matcher": "Write|Edit", "hooks": [{ "type": "command", "command": "AGENTS/hooks/posttooluse.sh" }]
```

### `"PostToolUseFailure": [],`
- rarity: situational
- trigger: a tool call errors instead of succeeding
- use: capture failure context you'd otherwise have to scroll back for
- example:
```json
"matcher": "Bash", "hooks": [{ "type": "command", "command": "AGENTS/hooks/posttoolusefailure.sh" }]
```

### `"PostToolBatch": [],`
- rarity: rare
- trigger: a batch of parallel tool calls finishes, rather than per-call
- use: avoid running an expensive check (e.g. a full lint) once per file in a multi-edit batch
- example:
```json
"matcher": "Edit", "hooks": [{ "type": "command", "command": "AGENTS/hooks/posttoolbatch.sh" }]
```

---

## Subagent lifecycle

### `"SubagentStart": [],`
- rarity: situational
- trigger: a `Task`-spawned subagent begins
- use: log which agent type ran and why, independent of the main session's log
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/subagentstart.sh" }]
```

### `"SubagentStop": [],`
- rarity: situational
- trigger: a subagent finishes — the subagent-scoped analog of `Stop`
- use: enforce the same "leave a note before you're done" pattern per-subagent
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/subagentstop.sh" }]
```

---

## Context management

### `"PreCompact": [],`
- rarity: situational
- trigger: before context gets summarized (`matcher`: `"manual"` or `"auto"`)
- use: last guaranteed look at full context before it's condensed
- example:
```json
"matcher": "auto", "hooks": [{ "type": "command", "command": "AGENTS/hooks/precompact.sh" }]
```

### `"PostCompact": [],`
- rarity: situational
- trigger: after compaction completes; receives the generated summary
- use: auto-append the summary to today's log so compaction isn't invisible in your history
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/postcompact.sh" }]
```

---

## Task tracking

### `"TaskCreated": [],`
- rarity: rare
- trigger: a `TaskCreate` call registers a new task in-session
- use: mirror new tasks into your own tracker
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/taskcreated.sh" }]
```

### `"TaskCompleted": [],`
- rarity: situational
- trigger: a task is marked done
- use: auto-append completed tasks to today's log instead of relying on the end-of-session summary
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/taskcompleted.sh" }]
```

---

## Elicitation & multi-agent (only relevant if you use MCP servers or teammates)

### `"Elicitation": [],`
- rarity: rare
- trigger: a connected mcp server asks the user for input mid-call
- use: only relevant if you're actively using mcp servers that elicit
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/elicitation.sh" }]
```

### `"ElicitationResult": [],`
- rarity: rare
- trigger: you respond to an elicitation request
- use: pairs with `Elicitation` for an audit trail
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/elicitationresult.sh" }]
```

### `"TeammateIdle": [],`
- rarity: rare
- trigger: a spawned teammate (multi-agent feature) goes idle waiting on you
- use: push a notification so a background teammate doesn't stall unnoticed
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/teammateidle.sh" }]
```

---

## Environment & misc

### `"ConfigChange": [],`
- rarity: situational
- trigger: `settings.json`/config changes are detected and applied
- use: lightweight audit trail of who changed what, when
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/configchange.sh" }]
```

### `"WorktreeCreate": [],`
- rarity: rare
- trigger: a new git worktree is created (`--worktree`, `EnterWorktree`, or agent isolation)
- use: only relevant once you start using worktrees for parallel agent work
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/worktreecreate.sh" }]
```

### `"WorktreeRemove": [],`
- rarity: rare
- trigger: a worktree is torn down
- use: pairs with `WorktreeCreate` for cleanup
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/worktreeremove.sh" }]
```

### `"InstructionsLoaded": [],`
- rarity: situational
- trigger: `AGENTS.md`/`CLAUDE.md`-style instruction files are loaded into context
- use: debug "why isn't my `AGENTS.md` rule being followed" — confirms the file was actually read
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/instructionsloaded.sh" }]
```

### `"CwdChanged": [],`
- rarity: rare
- trigger: the working directory changes mid-session
- use: re-validate you're still inside the expected project root
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/cwdchanged.sh" }]
```

### `"FileChanged": [],`
- rarity: situational
- trigger: a watched file changes on disk outside of Claude's own `Write`/`Edit`
- use: catch drift between what Claude thinks a file says and what's actually on disk
- example:
```json
"hooks": [{ "type": "command", "command": "AGENTS/hooks/filechanged.sh" }]
```

---

## Practical starting point
For "make the model reliably do X," the 90% case is three events: **`SessionStart`** (enforce
something at the beginning), **`PreToolUse`/`PostToolUse`** (enforce something around a specific
action), and **`Stop`** (enforce something before ending). Everything past that is available when
a specific workflow calls for it.
