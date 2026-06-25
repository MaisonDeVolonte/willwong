**@gitaudit:** Run ONLY on explicit `@gitaudit` command
1. run the native shell command exactly as specified
  ```bash
  AGENTS/gitaudit.sh
  ```

2. IF SUCCESS (exit code 0):
  ```text
  - output the raw telemetry inside a markdown code block
  ```

3. IF FAILURE:
  ```text
  - output the raw terminal error inside a markdown code block
  ```
4. evaluate the telemetry against these exact operational rules:
  - IF a branch has `upstream: gone`: Explicitly label it a "Ghost Branch"
  - IF a branch has `merged: yes` and `upstream: none`: Explicitly label it "Local Clutter"
  - IF `conflict_risk_files` > 0: Immediately issue a high-alert warning naming the branch
  - IF there are `unstaged_files` or `untracked_files` on the default branch: help the user clear the working directory

5. generate a detailed/analytical summary and any specific tasks/fixes i should consider
