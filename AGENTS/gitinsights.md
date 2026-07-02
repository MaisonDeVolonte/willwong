**@gitinsights:** Run ONLY on explicit `@gitinsights` command
- generates a report of work opportunities based on the 5 most recent agent memory log files
- includes tasks or projects covering strategic opportunities, unfinished tasks, recurring friction, technical debt, etc
- categorizes opportunities using an urgent/important matrix

1. read the contents of the 5 most recent agent memory log files in `/AGENTS/logs/`
2. extract observations, pain points, unfinished tasks, recurring bugs, or architectural ideas
3. evaluate items against the urgent/important matrix:
  - **Q1 (urgent and important):** blockers, critical bugs, high-friction dev issues
  - **Q2 (urgent but not important):** minor annoyances, quick configuration fixes, trivial tool warnings
  - **Q3 (not urgent but important):** refactoring, tech debt, architectural hygiene, core feature work
  - **Q4 (not urgent or important):** overly ambitious refactors, nice-to-haves, out-of-scope ideas

4. generate the final report:
  ```markdown
  # @gitinsights report
  *synthesized from the last 5 agent memory logs (YYYY-MM-DD to YYYY-MM-DD)*
  
  ## observations
  - hyphen-delimited list of bullets

  ## opportunities
  **urgent and important:**
  - hyphen-delimited list of bullets

  **urgent but not important:**
  - hyphen-delimited list of bullets

  **not urgent but important:**
  - hyphen-delimited list of bullets

  **not urgent or important:**
  - hyphen-delimited list of bullets
  ```
