**@gitbegin:** Run ONLY on explicit `@gitbegin` command
- run at the start of a new atomic unit of work
- asserts a clean working tree; aborts (never discards) if you have uncommitted work
- switches to the trunk and fast-forwards it to origin; divergence defers to @gitfresh
- leaves you on a clean, synced trunk — your working surface, no feature branch

1. run the native shell command exactly as specified
  ```bash
  AGENTS/gitbegin.sh
  ```
  - fail (exit code > 0) → abort and report: "<raw terminal error>"
  - success (exit code = 0) → continue and report: "@gitbegin telemetry"
