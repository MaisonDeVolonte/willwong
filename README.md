# WillWong.me
- portfolio site built as a mock IDE that renders its own source code
- next.js app router deployed to webflow cloud via opennext on cloudflare workers

[github project](https://github.com/users/MaisonDeVolonte/projects/1)

## Workflow
- strict, atomic, continuously integrated, trunk-based development with release management
- fast review, trivial reverts, clean bisect, near-zero conflicts, always releasable trunk
- inspired by Paul Hammant, Martin Fowler, Dan Lines, Gergely Orosz, et al

```text
[atomic prs → ci checks → trunk merge] --> [production release → deploy → willwong.me]
```

**Summary**
- `main` is the long-lived integration trunk; continuously synced and always releasable
- `branches` are short-lived, rarely stacked, and cut from a conflict-free trunk
- `wip` are integrated via runtime feature flags, not long-lived branches
- `staging` aims for a ~50-100 line soft-ceiling, always favoring logical cohesion
- `commits` are structured as 'type(scope): title' with '- hyphen-delimited, multiline descriptions'
- `prs` are autonomously staged, branched, and shipped via [@gitdeliver](AGENTS/git/gitdeliver.md)
- `ci` checks typescript, linting, building, and behavior before merging
- `merges` are automatic and ghost branches are pruned via [@gitempty](AGENTS/git/gitempty.md)
- `production` is a decoupled release branch used to manage live deployments
- `deploys` are triggered by pushing main to production and executed via 'github actions'
- `willwong.me` is served from the edge via cloudflare workers and webflow cloud

## CI/CD
- `pr` triggers the `ci.yml` workflow to protect the integration trunk
- `push` to 'production' triggers the `deploy.yml` workflow to release the app

```text
[pr] → [ubuntu] → [tsc] → [eslint] → [vitest] → [codecov] → [next] → [playwright] → [main] → [production]
```

**CI Gates:**
- `environment` uses `ubuntu-latest` to catch case-sensitive errors macOS hides
- `gate 1: tsc --noEmit` enforces strict type safety
- `gate 2: eslint . --max-warnings 0` enforces strict code style
- `gate 3: npm run test:unit:coverage` verifies core logic and reports coverage
- `gate 4: next build` verifies static generation and asset optimization
- `gate 5: npm run test:e2e` verifies end-to-end functionality

**Version Tracking:**
- `package.json` uses a prebuild hook (`npm run generate`)
- `scripts/version.mjs` checks .git history, counts commits since last tag, and grabs commit hash
- `src/meta/config/version.generated.ts` stores the version information (`COMMIT_HASH`, tag-relative `COMMIT_COUNT`)
- `scripts/commits.mjs` counts the repo's true total commits (never resets, unlike `COMMIT_COUNT`) for the footer's Commits stat, stored in `src/modules/stats/commits.generated.ts`
- `next build` bakes the version information into the static html/js bundle

**Coverage:**
- `npm run test:unit:coverage` runs vitest with the v8 provider (`vitest.config.ts`)
- `codecov/codecov-action` uploads `coverage/lcov.info` on every ci run, keyed off `CODECOV_API_TOKEN`
- `codecov.io` exposes the latest total via a public read api, no auth required at runtime
- `src/apis/codecov.ts` fetches it for the footer's Coverage stat

**Configuration:**
- `wrangler.json`: `NEXT_INC_CACHE_R2_BUCKET` (isr page cache) and `NEXT_TAG_CACHE_KV` (cache tagging)
- `webflow.json`: `cloud.app_id`
- `deploy.yml`: `WEBFLOW_API_TOKEN` and `WEBFLOW_SITE_ID`
- `ci.yml`: `CODECOV_API_TOKEN` (coverage upload)
- `webflow cloud`: `GITHUB_TOKEN` (rate limits) and `GITHUB_WEBHOOK_SECRET` (cache busting)

## CMS
- `workerd` has no runtime filesystem (`fs`) so content is split into two pipelines
- `cms/source.ts` fetches content files from git (`main`) at runtime
- `cms/content.generated.ts` bundles source code files (`@mirror`) at build-time; requires deployment
- `r2 isr cache` stores HTML on the edge for 30 days; falls back to github api on cache miss 
- `next.js router cache` aggressively prefetches and caches HTML in browser memory for 0ms navigation
- `dynamicParams` renders routes on-demand by walking the content map in `src/cms/`

```text
   [/content/]                            [@mirror]
        |                                     |
 npm run publish                        npm run build
        ↓                                     ↓
   [source.ts]      [r2 isr cache]   [content.generated.ts]
        |                 ↑                   |
  runtime fetch          html          build-time bundle
        |                 ↓                   |
        └   →   [  cloudflare worker  ]   ←   ┘
                  |                 |
                 html            prefetch
                  ↓                 ↓
              [browser]  ←  → [router cache]         
```

**Notes:**
- `npm run dev` and `ci` fetches content files from local `fs` at runtime (`CONTENT_SOURCE=local`)
- `npm run publish` commits `content/` and pushes to `main`
- `github push webhook` hits `api/webhooks/github/` to bust the content cache tag; falls back to 60s timer

## Stack

| | |
|---|---|
| [Node.js 22](https://nodejs.org/) | local build runtime |
| [Next.js 15](https://nextjs.org/docs) | app router framework |
| [React 19](https://react.dev) | ui library |
| [TypeScript 5](https://www.typescriptlang.org/docs) | static typing |
| [Tailwind 4](https://tailwindcss.com/docs) | utility CSS |
| [PostCSS 8](https://postcss.org/) | css transformation |
| [Webflow CLI 2](https://developers.webflow.com/docs/webflow-cli) | webflow cli |
| [Webflow DevLink](https://developers.webflow.com/devlink/docs) | design system export |
| [Webflow Cloud](https://developers.webflow.com/webflow-cloud/docs) | production hosting |
| [Webflow MCP](https://developers.webflow.com/docs/models-context-protocol) | ai context protocol |
| [Cloudflare OpenNext](https://opennext.js.org/cloudflare) | cloudflare adapter |
| [Cloudflare Workerd](https://github.com/cloudflare/workerd) | edge runtime |
| [Cloudflare R2](https://developers.cloudflare.com/r2) | incremental cache |
| [Cloudflare Wrangler 4](https://developers.cloudflare.com/workers/wrangler) | cloudflare cli|
| [GitHub CLI 2](https://cli.github.com/) | workflow automation |
| [GitHub Actions](https://docs.github.com/en/actions) | ci/cd pipelines |
| [ESLint 9](https://eslint.org/) | strict code linter |
| [Vitest 4](https://vitest.dev/) | unit testing |
| [Codecov Action 4](https://github.com/codecov/codecov-action) | coverage reporting |
| [cloc 2](https://github.com/AlDanial/cloc) | lines-of-code counter |
| [Playwright 1](https://playwright.dev/) | behavior testing |
| [Prettier 3](https://prettier.io/) | code formatter |
| [Refractor 5](https://github.com/wooorm/refractor) | syntax highlighting |
| [Zed](https://zed.dev/) | ai-native editor environment |
| [Claude 3.5](https://anthropic.com/claude) | primary agent model |
| [Grok 4.5](https://x.ai/cli) | secondary agent model |
| [Gemini 1.5](https://deepmind.google/technologies/gemini/) | secondary agent model |

## APIs

| | |
|---|---|
| [Webflow API](https://developers.webflow.com/data/reference) | deploy |
| [GitHub Raw Content](https://raw.githubusercontent.com) | git-as-cms |
| [GitHub Webhooks](https://docs.github.com/en/webhooks) | cache busting |
| [GitHub Repos](https://docs.github.com/en/rest/repos/repos) | project metadata |
| [GitHub Git Trees](https://docs.github.com/en/rest/git/trees) | nav tree and stats |
| [Codecov API](https://docs.codecov.com/reference/overview) | coverage stat |

## Commands

| | |
|---|---|
| `npm run dev` | local dev server on `:3001` |
| `npm run lint` | static code analysis (`eslint`) |
| `npm run publish` | commits `/content/` to `main` (no deploy) |
| `npm run generate` | compiles build-time bundle |
| `npm run build` | production compiler |
| `npm run preview` | cloudflare worker preview (`workerd`) |
| `npm run deploy` | manual push to webflow cloud |

## Structure

```
AGENTS/                       # agent automations and workflows
 ├── git/
 │    ├── [@trigger].md
 │    └── [@trigger].sh
 ├── guides/
 ├── hooks/
 ├── logs/
 ├── plans/
 ├── prompts/
 └── [docs].md

content/                      # git-as-cms content source
 ├── [folder]/
 └── [page].ext

scripts/                      # node.js scripts (generated files are gitignored)
 ├── churn.mjs                # sums added/deleted lines (src/modules/stats/churn.generated.ts)
 ├── commits.mjs              # counts total commits (src/modules/stats/commits.generated.ts)
 ├── content.mjs              # bundles @mirrors and icons (src/cms/content.generated.ts)
 ├── lines.mjs                # counts lines of code (src/modules/stats/lines.generated.ts)
 ├── publish.mjs              # commits /content/ and pushes to main (npm run publish)
 └── version.mjs              # injects build data (src/meta/config/version.generated.ts)

src/
 ├── apis/                    # external api fetchers — the network call itself, cached by the caller
 │    ├── [apiName].ts
 │    └── [apiHelper].ts
 │
 ├── app/                     # routing and page definitions
 │    ├── [...slug]/
 │    ├── api/webhooks/       # webhook endpoints (github push, etc)
 │    ├── custom.css
 │    ├── layout.tsx
 │    └── page.tsx
 │
 ├── assets/                  # raw static files
 │    └── icons/
 │
 ├── cms/                     # content engine (runtime source + routing)
 │    ├── directives.ts
 │    ├── folders.ts
 │    ├── pages.ts
 │    ├── slugs.ts
 │    └── source.ts           # runtime content (prod: github; dev: fs)
 │
 ├── core/                    # behavior, state, and event handling
 │    └── controllers/
 │
 ├── meta/                    # build-time meta/structured data
 │    ├── config/
 │    └── schema/
 │
 ├── modules/                 # concrete, feature-scoped components
 │    ├── nav/
 │    ├── stage/
 │    └── stats/
 │
 └── utilities/               # generic helpers/config — inputs to a call, never the call itself
      └── [utilityName].ts

webflow/                      # [DO NOT EDIT - OVERWRITTEN ON EXPORT]
 ├── [components]/
 ├── css/
 └── webflow_modules
```

## Design
- `1vw` defines the base unit for fluid/scalable design
- `100dvh` defines the viewport height dynamically
- `0.1rem` defines the hook for browser zoom access
- `em` is the default unit of measure for ALL properties
- `%` is the fallback unit of measure when em is not practical

## Webflow
- `webflow/` is strictly read-only, overwritten by devlink, and maintained in webflow
- `webflow/css/` does not export page-level styles - ONLY component styles
- `Code` properties on `HtmlEmbed` elements do not pass through devlink - use custom attributes instead
- `DropdownToggle.tsx` reads `isOpen` but never applies `w--open` - use `:has(~ .menu__pane.w--open)`

## Content
- `/content/` files are raw strings – never import, execute, or refactor

## Notes
- `behavior` lives in `src/core/controllers/` using vanilla js, `useEffect`, and event delegation
- `active states` are declaratively controlled by `src/modules/nav/states.tsx`
- `formatting` uses the zed language server, disabled on save in `.zed/settings.json`
