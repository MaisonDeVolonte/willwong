**@gitcontinue:** Run ONLY on explicit `@gitcontinue` command
- run to safely pause work, sync the trunk, and resume where you left off
- strictly enforces trunk-based development: always drops you back onto the trunk (`main`), never a feature branch
- gracefully handles stashing, fetching, fast-forwarding, and stash popping

1. run the native shell command exactly as specified:
  ```bash
  AGENTS/gitcontinue.sh
  ```
  - fail (exit code > 1) → abort and report: "<raw terminal error>"
  - conflict (exit code = 1) → report "@gitcontinue telemetry" and tell user to resolve conflicts in editor
  - success (exit code = 0) → continue and report: "@gitcontinue telemetry"
