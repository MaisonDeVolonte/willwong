# AGENT PLAN: Operation Grok Parity

## Context
- Grok's native hook discovery is `.grok/hooks/*.json` — a Claude-shaped `settings.json` under `.grok/` is not a documented loader for hooks/permissions
- `event gap` Grok supports a different event set (blocking only on `PreToolUse`), no `TaskCreated`/`TaskCompleted` — log-note automation on those won't port
- `behavior gap` `stop.sh`'s `decision:"block"` is ignored (Stop is passive under Grok); `sessionstart.sh`'s `additionalContext` is ignored too (SessionStart stdout is ignored per docs)

## Goal
- stand up project-level `.grok/` config mirroring `.claude/`, pointing Grok at the same `AGENTS/hooks/*.sh` scripts, plus a `.grok/hooks.md` event catalog

## Solution
- mirror `.claude/settings.json`'s permissions and hook wiring into Grok's native `.grok/hooks/*.json` loader, document the event-set gaps, and disable Grok's Claude-compat hook scan so nothing double-fires

## Checklist
- [x] `write` `.grok/config.toml` — permissions mirror of `.claude/settings.json`
- [x] `write` `.grok/hooks/project.json` — native loader: `SessionStart`/`Stop`/`PostToolUse` (matcher `Write|Edit`) → same `AGENTS/hooks/*.sh` scripts
- [x] `write` `.grok/hooks.md` — Claude-shaped event catalog
- [x] `disable` Claude-compat hook scan in user `~/.grok/config.toml` (`[compat.claude] hooks = false`) so nothing double-fires
- [x] `extract` dual-payload path handling in `AGENTS/hooks/posttooluse.sh`
- [x] `correct` removed redundant Claude-shaped `.grok/settings.json`/`.grok/settings.local.json` — Grok doesn't load those for hooks/permissions
- [ ] `verify` user runs `/hooks-trust` + `/hooks` reload

## Future Work
- find a different mechanism for log/prompt-flush behavior once Grok's Stop semantics matter

## Risks & Gotchas
- `double execution` if both `.claude/settings.json` and `.grok/hooks/project.json` load under default Claude compat — mitigated by disabling compat in user config
- `no automation` `TaskCreated`/`TaskCompleted` never fire on Grok
- `stop semantics` Grok won't re-engage on `decision:"block"` the way Claude does — log/prompt-flush needs a different mechanism later
- `personal allows` stay in `.claude/settings.local.json` — Grok's documented personal path, no `config.local.toml` needed
- `paths` hook script paths are CWD-relative, same assumption as Claude

## Notes
- none
