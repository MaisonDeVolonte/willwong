```javascript
/**
 * =============================
 * @file AGENTS.md - agent rules
 * =============================
 * @description
 * - primary rulebook for all ai interactions within this project
 * - read entirely before taking any action or writing any code
 * - defines default read-only posture, explicit triggers, and automations
 * - establishes rules for file naming, wayfinding, imports, comments, code, etc
 * - dictates a boring, highly-legible, first-principles coding philosophy
 * - sets hard boundaries for read-only directories, etc
 * @see /AGENTS/, /.claude/, /.grok/
 */
```

# Agent Rules

## Operations

### Posture
- DEFAULT posture is strictly READ-ONLY e.g. chat, brainstorm, evaluate, plan, etc
- DO NOT write code, edit files, or run commands without the explicit `@letsdoit` trigger
- EXCEPTIONS: context gathering, writing to agent logs/plans, @customtrigger automations, etc

### Automations
- `<trigger>.md`: description, flags, sidecar, instructions, report
- `<trigger>.sh`: preflight, execution, telemetry 

### Git (see `AGENTS/git.md`)
- [@gitaudit](AGENTS/git/gitaudit.md): READ-ONLY; diagnostics, triage, report, summary, and tasks
- [@gitbrutal](AGENTS/git/gitbrutal.md): READ-ONLY; brutally honest code review and progress report
- [@gitcontinue](AGENTS/git/gitcontinue.md): SAFE; stash, sync, and pop
- [@gitdeliver](AGENTS/git/gitdeliver.md): GATED; atomically stage, commit, branch, push, pr, build, and check
- [@gitempty](AGENTS/git/gitempty.md): DESTRUCTIVE; prune, stash, fast-forward, restore, and gated branch deletion
- [@gitfresh](AGENTS/git/gitfresh.md): DESTRUCTIVE; stash, hard reset, purges local changes, and syncs fresh main
- [@gitgud](AGENTS/git/gitgud.md): SAFE; query branch delta, merge remote main into it, and run fresh CI
- [@githappy](AGENTS/git/githappy.md): RELEASE; bumps version, adds tag, merges to production, and release notes
- [@gitinsights](AGENTS/git/gitinsights.md): READ-ONLY; scans agent logs and codebase for opportunities to improve

### Plans (see `AGENTS/plans.md`)
- BEGIN complex tasks by writing a detailed plan in `AGENTS/plans/` (see `AGENTS/plans.md`)
- BEFORE sending final summary messages or upon seeing the `@movingon` trigger, autonomously:
  1. APPEND your notes to the bottom of the day's corresponding log file, if none exists - create one
  2. APPEND a summary to the bottom of the task's corresponding plan file, if none exists - ignore

### Logs (see `AGENTS/logs.md`)
- `AGENTS/hooks/sessionstart.sh` creates a new empty log file in `AGENTS/logs/` 
- `AGENTS/hooks/taskcreated.sh` nudges a new thread when a new task is unrelated to the most recent one
- `AGENTS/hooks/taskcompleted.sh` appends a note to the bottom of the day's log
- `AGENTS/hooks/stop.sh` synthesizes and deletes notes at the bottom of the day's log every hour
- manual triggers (yes, i manually save games that have autosave, i'm that guy)
  - `@logthread` instructs the agent to `add a thread` to the bottom of the day's log
  - `@lognote` instructs the agent to `append a note` to the bottom of the day's log
  - `@logsynth` instructs the agent to `synthesize notes` at the bottom of the day's log

### Prompts (see `AGENTS/prompts.md`)
- `AGENTS/hooks/stop.sh` also flushes any uncaptured prompts to `AGENTS/prompts/` on the same tick as its log-note pass

### Guides (see `AGENTS/guides.md`)
- on request, write a study guide to `AGENTS/guides/` listing files touched by a shipped feature in ideal-build order, not touched-order — for building a mental model, not for reference docs
- no hook creates these automatically; manual only

## Architecture

### Files
- `PascalCase.tsx` — ui-rendering components
- `camelCase.tsx` — logic and behavior components
- `camelCase.ts` — utilities and helpers
- `MatchCase.css` — co-located css matches their counterpart
- `kebab-case.css` — general/global css

### Wayfinding
```javascript
/**
 * ====================================================
 * @file AGENTS.md - jsdoc wayfinding header guidelines
 * ====================================================
 * @description
 * - add this comment block to executable files (js, ts, tsx, jsx) not ignored by eslint.config.mjs
 * - update @description and @see tags to reflect the file's contents, purpose, and dependencies
 * - read this block to understand the file's context and boundaries before modifying it
 * - write maximally concise, shorthand, lowercase english, favoring legibility over completeness
 * @see /AGENTS/, /.claude/, /.grok/, /eslint.config.mjs
 */
```

### Imports
- `alias` always use `@/`, never `./`
- `values` imported before `types`
- import order:
  1. `data/files` ordered alphabetically
  2. `config/schemas` ordered alphabetically
  3. `ui/components` ordered alphabetically
  4. `css` ordered by cascade specificity

### Comments
- write comments sparingly and with intention, focusing on `why` code exists vs `how` it works
- refactoring code to be more intuitively legible is favorable over superfluous commenting
- use primarily inline comments written in maximally concise, clear, shorthand lowercase english
- including type hints at the end of `// comments — boolean` is helpful
- if a file is really long, consider adding header comments to break it up into sections:
  `// SECTION TITLE `

### Code
- `@retardify` applies the rules in this section to one target file or function:
  - automatically apply mechanical rewrites (e.g. ternaries → named-boolean guards)
  - gate renames or logic changes that would trade away real information
  - verify live before/after
  - stop once further changes are diminishing returns
  - update wayfinding and comments to reflect changes
- `retard-maxx` like a jr-engineer who does everything the long, extremely boring way
- `simplify` logic over advanced, deeply nested, or overly efficient abstractions
- `separate` files or functions that do more than one thing, where practical
- `sequence` logic from top to bottom in order of state, definitions, guards, then execution
- `name` things using clear, concise, intuitively understood language
- `linebreaks` are to separate distinct conceptual blocks, not for single-line statements
- `first principles` such as DRY, SoC, POLA, etc are a vibe; RDD, WTF, WET, etc is not a vibe

*example:*
```typescript

// 1. global constants
const IS_AGENT = true;

type Requirement = {
  rawCode: string;
  badHabits: string[];
  nestingDepth: number;
  isDuplicated: boolean;
  isSurprising: boolean;
};

export function writeCode(requirements: Requirement[], request: string) {
  // 2. hoisted state
  const maxNesting = 2;
  let finalSolution = "";

  // 3. defined helpers
  function keepItSimple(req: Requirement) {
    if (req.rawCode.includes("?")) {
      const ternaryCount = (req.rawCode.match(/\?/g) || []).length;
      if (ternaryCount > 1) throw new Error("use an if-statement");
    }
    if (req.rawCode.includes(".reduce(")) throw new Error("use a for/forEach loop");
    if (req.rawCode.includes("\n\n\n")) throw new Error("use empty lines sparingly");
    if (req.nestingDepth > maxNesting) throw new Error("are you building a pyramid?");

    return true;
  }

  function respectFirstPrinciples(req: Requirement) {
    if (req.isDuplicated) throw new Error("extract to a helper");
    if (req.isSurprising) throw new Error("make it boring and obvious");
  }

  function punishAgent(variables: string[]) {
    if (!IS_AGENT) return;

    variables.forEach(variableName => {
      if (["e", "idx", "el", "cb"].includes(variableName)) {
        throw new Error("i get it, just spell it out please");
      }
      const charCount = variableName.length;
      const wordCount = variableName.split(/(?=[A-Z])/).length;
      if (charCount > 25 || wordCount > 4) {
        throw new Error(`'${variableName}' is not very helpful`);
      }
    });
  }

  // 4. main logic & execution
  if (!request) return finalSolution;

  requirements.forEach(req => {
    punishAgent(req.badHabits);
    respectFirstPrinciples(req);

    if (keepItSimple(req)) {finalSolution += req.rawCode;}
  });

  return finalSolution;
}
```
