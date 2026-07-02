**@gitgud:** Run ONLY on explicit `@gitgud` command
- run on a stale branch pr that needs CI to re-run against the current default branch
- typically ran after @gitdeliver fails to atomicize prs correctly

**FLAGS:**
- `--watch`: use to wait for the fresh ci run to complete before exiting

1. run the native shell command exactly as specified
  ```bash
  AGENTS/gitgud.sh
  ```
  - fail (exit code > 0) → abort and report: "<raw terminal error>"
  - success (exit code = 0) → continue and report: "@gitgud telemetry"
