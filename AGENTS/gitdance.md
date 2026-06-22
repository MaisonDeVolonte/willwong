**@gitdance:** Run ONLY on explicit `@gitdance` command
- Pre-flight:
  0. IF `git status --porcelain` is empty, abort; otherwise, `git branch`
  1. "Continue on current branch, create a temp branch, or switch to existing branch? (continue/create/switch)"
      - continue: if on `main`, abort; otherwise, move to next step
      - create: if `temp/gitdance` exists, abort; otherwise, `git switch -c temp/gitdance`
      - switch: `git switch <user/selection>`
  2. "Clear staged changes? (yes/no)"
      - yes: `git restore --staged :/`
      - no: move to next step
- Commit Loop:
  3. `git status` (group changes into `type(scope)` buckets)
      - Types (derived from the following, in order):
          - `new:` first-time features, functions
          - `improve:` existing features, functions
          - `fix:` defects, bugs, broken code
          - `update:` content, text, properties, comments
          - `test:` test suites, assertions, verification checks
          - `debug:` logs, profiling scripts, temp instrumentation
      - Scopes (derived from the following, in order): 
          - single file: file's name
          - multiple files: parent folder's name
          - multiple folders: most logical domain name
          - multiple domains: most dominant domain name
          - multiple unrelated domains: `misc`
  4. `git add <files>` (stage only files belonging to the current atomic group of changes)
  5. `git diff --staged` (review line-by-line to verify correctness)
  6. Draft `git commit`
      - Title: `-m "type(scope): short description"`
      - Body: `-m "- hyphen-delimited bullets \n as a single multiline string"`
  7. "Continue with commit or make edits? (continue/edit)"
      - continue: execute the draft commit
      - edit: execute the exact user confirmed command
  8. repeat the loop until workspace is clean
- Push & PR:
  9.  IF on `main`, abort and report
  10. IF on `temp/gitdance`, `git branch -m <type>/<scopes>` (rename to most impactful changes)
  11. `git push -u origin HEAD` (push working branch)
  12. `gh pr view --json url -q .url 2>/dev/null || gh pr create --base main --fill` (create the pr)
  13. `gh pr checks --watch` (if checks pass, print the pr url; if checks fail, abort and report)
