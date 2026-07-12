```javascript
/**
 * ==============================================
 * @file AGENTS.md - wayfinding header guidelines
 * ==============================================
 * @description
 * - add this exact jsdoc comment block to all executable files not ignored by eslint.config.mjs
 * - update the @description and @see tags to accurately reflect the file's contents, purpose, and dependencies
 * - read this block to understand the file's context and boundaries before modifying it
 * - write in maximally concise, shorthand, lowercase english, favoring legibility over completeness
 * @see /AGENTS/, /.claude/, /eslint.config.mjs
 */
```

# Agent Rules
- DEFAULT posture is strictly READ-ONLY e.g. chat, brainstorm, evaluate, plan, etc
- DO NOT write code, edit files, or run commands without the explicit `@letsdoit` trigger
- EXCEPTIONS: context gathering, writing to agent logs, @customtrigger automations, etc

## Agent Logs & Plans
- BEGIN every interaction by reading the most recent log file in `AGENTS/logs/`
- BEFORE starting complex architectural tasks, read or write a plan in `AGENTS/plans/`
- AFTER reading, learning, or completing anything meaningful, autonomously:
  - APPEND your notes to the bottom of the current day's existing memory log OR
  - CREATE a new log file for the current day named `YYYY-MM-DD.md`
- FORMAT logs using the shape defined in `AGENTS/_logs.md`
- FORMAT plans using the shape defined in `AGENTS/_plans.md`
  
## Triggers
follow the usage guidelines in each agent's documentation page below:
- [@agentlog](AGENTS/_logs.md): SAFE; create or append to current day's memory log file
- [@gitaudit](AGENTS/gitaudit.md): READ-ONLY; diagnostics, triage, report, summary, and tasks
- [@gitbrutal](AGENTS/gitbrutal.md): READ-ONLY; adversarial reality check, effort vs output, and docs vs codebase
- [@gitcontinue](AGENTS/gitcontinue.md): SAFE; stash, sync, and pop
- [@gitdeliver](AGENTS/gitdeliver.md): GATED; atomically stage, commit, branch, push, pr, build, and check
- [@gitempty](AGENTS/gitempty.md): DESTRUCTIVE; prune, stash, fast-forward, restore, and gated branch deletion
- [@gitfresh](AGENTS/gitfresh.md): DESTRUCTIVE; stash, hard reset, purges local changes, and syncs fresh main
- [@gitgud](AGENTS/gitgud.md): SAFE; query branch delta, merge remote main into it, and run fresh CI
- [@githappy](AGENTS/githappy.md): RELEASE; bumps version, adds tag, merges to production, and github release notes
- [@gitinsights](AGENTS/gitinsights.md): READ-ONLY; scans agent logs and codebase for opportunities to improve

## Automations
@gitautomations adhere to the following shapes:
- @gitautomate.md: description, flags, run sidecar, instructions, report
- @gitautomate.sh: preflight, execution, telemetry 

## Code
- write code for humans, specifically jr-engineers who do everything the long, extremely boring way
- favor flat, beginner-level simplicity over advanced, deeply nested, or overly efficient abstractions
- if a file or function does more than one thing, consider splitting it
- structure logic from top to bottom in order of state, definitions, guards, then execution
- name things using clear, concise, intuitively understood language
- single line statements are a vibe, nesting for no valid justification is not a vibe
- use empty lines sparingly, primarily to visually separate distinct conceptual blocks
- at the end of the day, just stick to coding first-principles such as DRY, SoC, POLA, etc

*example:*
```typescript
export function writeCode(requirements: Context, request: string) {
  // 1. hoisted state
  const isAgent = true;
  const isClever = false;
  let finalSolution = "";

  // 2. defined helpers
  function keepItSimple(rawCode: string, logic: string) {
    if (isClever) return false;
    if (rawCode.includes("?")) {
      const ternaryCount = (rawCode.match(/\?/g) || []).length;
      if (ternaryCount > 1) throw new Error("use an if-statement");
    }
    if (rawCode.includes(".reduce(")) {throw new Error("use a for/forEach loop");}
    if (rawCode.includes("\n\n\n")) {throw new Error("use empty lines sparingly");}
    if (logic.nestingDepth > 2) throw new Error("are you building a pyramid?");

    return true;
  }

  function respectFirstPrinciples(code: string) {
    if (code.isDuplicated) throw new Error("extract to a helper");
    if (code.doesMultipleThings) throw new Error("split to separate function");
    if (code.isSurprising) throw new Error("make it boring and obvious");
  }

  function punishAgent(behavior: string, variables: string[]) {
    if (["e", "idx", "el", "cb"].includes(behavior)) {
      throw new Error("i get it, just spell it out please");
    }

    // variable names should be helpful, intuitive, and highly legible
    variables.forEach(variableName => {
      const variableChars = variableName.length;
      const variableWords = variableName.split(/(?=[A-Z])/).length;
      if (variableChars > 25 || variableWords > 4) {
        throw new Error(`'${variableName}' is not very helpful`);
      }
    });
  }

  // 3. main logic & execution
  if (!request) return finalSolution;

  requirements.forEach(requirement => {
    punishAgent(requirement.badHabits);
    respectFirstPrinciples(requirement.architecture);

    if (keepItSimple(requirement.logic)) { finalSolution += requirement.lines; }
  });

  return finalSolution;
}
```

## Comments
- write comments sparingly and with intention, focusing on `why` code exists vs `how` it works
- refactoring code to be more intuitively legible is favorable over superfluous commenting
- use primarily inline comments written in maximally concise, clear, shorthand lowercase english
- including type hints at the end of `// comments — boolean` is helpful
- if a file is really long, consider adding header comments to break it up into sections:
  `// SECTION TITLE `

## Webflow
Everything under `webflow/` is generated by Webflow DevLink and must **never** be manually edited — including `webflow/css/`. All files here are overwritten on every DevLink sync. To change anything in this directory, make the change upstream in Webflow and re-sync.

**DevLink only exports component styles.** CSS classes applied exclusively to page-level elements are silently omitted from the export — they will not appear in `webflow/css/` no matter how many times DevLink is re-run. If styles are missing after a sync, check whether the class is used inside a component or only on a page. This is a known DevLink limitation, not a code or config issue.

## Content
Files in /content/ are raw content ingested as plain text strings — never executed or treated as modules. Do not import them as modules, refactor them, or modify them unless explicitly asked. Any file type is valid here.

- **Duplication & Mirroring:** Do not duplicate code files into `content/src/`. Always use a `@mirror` comment referencing the source file (e.g., `// @mirror src/app/layout.tsx`).
- **Mirroring Exception:** `content/src/app/slug/page.tsx` is an exception that is intentionally copy-pasted and not mirrored due to dynamic routing conflicts. Do not duplicate this pattern elsewhere.

## Imports
- Always use the `@/` alias, even for same-folder files (e.g. `import "@/modules/nav/Link"`). Never use `./`.
- Group imports logically by **functional domain and intent** rather than package origin alone:
  1. **Data Loaders & File Handlers**: Node built-ins (like `fs`, `path`) co-located with corresponding custom loader/utility modules (like `@/cms/pages`).
  2. **Configurations & Schema Definitions**: Centralized configurations, metadata, and schemas (like `@/meta/...`).
  3. **UI Presenters**: React rendering components (like `@/modules/stage/Canvas` or `@webflow/*`). UI components and core layout modules should always go last.
- Within each functional group, value imports go before type imports.
- CSS side-effect imports go last, after all JS/TS imports, in cascade order (order is semantically meaningful for specificity).

## CSS
- **Always use `em` units.** Never use `px`, `rem`, `vw`, `vh`, etc.
- **Exception — `%`:** permitted where layout logic requires it (e.g. panel widths driven by the JS resizing logic in `panels.tsx`).
- General layout uses `flex`; proportional sizing uses `em`; `%` is a last resort tied to a specific technical constraint.
- **No CSS transitions or animations** unless explicitly requested. This is not that type of project.
- **Never duplicate styles from `webflow/css/` anywhere else in the codebase.** If a style is missing or was accidentally deleted from a Webflow CSS file, restore it there — do not recreate it in `custom.css` or elsewhere.

## Naming Conventions
- **React Components / Files:** Always use **PascalCase** for UI-rendering components (e.g., `Panel.tsx`, `Folder.tsx`, `Link.tsx`, `Canvas.tsx`, `Refractor.tsx`).
- **Behavior-Only / Controller Components:** Always use **camelCase** for files and components that bind logic/behavior to the view but render no DOM/UI themselves (e.g., `activeStates.tsx`, `folderStates.tsx`, `panels.tsx`).
- **Utility / Helper Files:** Always use **camelCase** for utility files and modules (e.g., `localStorage.ts`, `content.ts`, `routes.ts`, `tree.ts`).
- **Global CSS Files:** Always use **kebab-case** for global style sheets (e.g., `custom.css`, `active-states.css`).
- **Co-located CSS Files:** CSS files mirroring their component/logic counterparts must use the **exact same casing** as the counterpart file (e.g., `panels.tsx` matches with `panels.css`, `Canvas.tsx` matches with `Canvas.css`, `Refractor.tsx` matches with `Refractor.css`, and `activeStates.tsx` matches with `activeStates.css`).
