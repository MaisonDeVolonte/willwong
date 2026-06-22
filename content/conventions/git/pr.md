=========================================================
pr.md: my touchless, over-optimistic pull request process
=========================================================
- adapt: convention to what the project uses, but the default:
- [@gitdance](/agents/gitdance.md): because agentic, obviously
  - push: working branch `git push -u origin HEAD`
  - create: merge request `gh pr create --base main --fill`
  - watch: build checks `gh pr checks --watch`
- wait: for a human to approve the code
