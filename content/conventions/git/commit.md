=================================================================
commit.md: my programmatic, truly atomic commit generation system
=================================================================
- adapt: convention to what the project uses, but the default:
- [@gitdance](/agents/gitdance.md): because agentic, obviously
  - stage: only the files belonging to the current atomic group
  - diff: review line-by-line to verify correctness
  - commit: names follow `type(scope): description`
  - types (derived from the following, in order):
    - `new:` first-time features, functions
    - `improve:` existing features, functions
    - `fix:` defects, bugs, broken code
    - `update:` content, text, properties, comments
    - `test:` test suites, assertions, verification checks
    - `debug:` logs, profiling scripts, temp instrumentation
  - scopes (derived from the following, in order):
    - single file: `file's name`
    - span multiple files: parent `folder's name`
    - span multiple folders: most `logical domain name`
    - span multiple domains: most `dominant domain name`
    - span multiple unrelated domains: `misc`
  - description: whatever the agent thinks is good
  - message: whatever the agent thinks is good
-edit: one word from description and/or message to feel better
