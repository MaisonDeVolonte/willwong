**@gitdeliver:** Run ONLY on explicit `@gitdeliver` command
- run the following command and record the output as a variable:
   0. `git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'` 
      - save → `<defaultBranch>`
- pre-flight: run each command in order; 0 = pass, non-zero = fail
   1. `git branch --show-current | grep -q .` (fail → abort and report: "can't run @gitdeliver on `detached HEAD`")
   2. `git branch --show-current | grep -qvx <defaultBranch>` (fail → abort and report: "can't run @gitdeliver on `<defaultBranch>`")
   3. `git status --porcelain | grep -q .` (fail → abort and report: "can't run @gitdeliver without changes")
   4. `git diff --cached --quiet` (fail → run: `git restore --staged :/`; report: "clearing dirty index"; continue)
- commit loop:
   5. `git status` (group changes into `type(scope)` buckets)
      - types (derived from the following, in order):
          - `new:` first-time features, functions
          - `improve:` existing features, functions
          - `fix:` defects, bugs, broken code
          - `update:` content, text, properties, comments
          - `test:` test suites, assertions, verification checks
          - `debug:` logs, profiling scripts, temp instrumentation
      - scopes (derived from the following, in order): 
          - single file: file's Name.ext
          - multiple files: parent folder's name
          - multiple folders: most logical domain name
          - multiple domains: most dominant domain name
          - multiple unrelated domains: `misc`
          - exceptions: 
            - any work in `/content/` → `content`
   6. `git add <files>` (stage only files belonging to the current atomic group of changes)
   7. `git diff --staged` (review line-by-line to verify correctness)
   8. DRAFT `git commit`
      - Title: `-m "type(scope): short description"`
      - Body: `-m "- hyphen-delimited bullets \n as a single multiline string"`
   9. "continue with commit or make edits? (continue/edit)"
      - continue: execute the draft commit
      - edit: execute the exact user confirmed command
  10. repeat the loop until workspace is clean
- push & pull request:
  11. `git branch -m <type>/<scopes>` (rename branch using the most impactful changes)
  12. `git push -u origin HEAD` (push working branch)
  13. `gh pr view --json url -q .url 2>/dev/null || gh pr create --base <defaultBranch> --fill` (create the pr)
  14. `gh pr checks --watch` (pass → print the pr url; fail → abort and report)
  15. `@gitbegin`
