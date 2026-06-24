**@gitbegin:** Run ONLY on explicit `@gitbegin` command — get onto `temp/branch`, ready for @gitdeliver.
- If already on a branch other than `main` (and not detached)
    → report "on `<branch>`, ready for @gitdeliver" and stop.
- Otherwise (on `main` or detached HEAD), move onto `temp/branch`, carrying any uncommitted changes:
    - `temp/branch` exists → `git switch temp/branch`
    - else                  → `git switch -c temp/branch`
- Report "on `temp/branch` — ready for @gitdeliver".
