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
[pr] → [ubuntu] → [tsc] → [eslint] → [vitest] → [next build] → [playwright] → [main] → [production]
```

**CI Gates:**
- `environment` uses `ubuntu-latest` to catch case-sensitive errors macOS hides
- `gate 1: tsc --noEmit` enforces strict type safety
- `gate 2: eslint . --max-warnings 0` enforces strict code style
- `gate 3: npm run test:unit` verifies core logic
- `gate 4: next build` verifies static generation and asset optimization
- `gate 5: npm run test:e2e` verifies end-to-end functionality

**Version Tracking:**
- `package.json` uses a prebuild hook (`npm run generate`)
- `scripts/version.mjs` checks .git history, counts commits since last tag, and grabs commit hash
- `src/meta/config/version.generated.ts` stores the version information
- `next build` bakes the version information into the static html/js bundle

**Configuration:**
- `wrangler.json`: `NEXT_INC_CACHE_R2_BUCKET` (isr page cache) and `NEXT_TAG_CACHE_KV` (cache tagging)
- `webflow.json`: `cloud.app_id`
- `deploy.yml`: `WEBFLOW_API_TOKEN` and `WEBFLOW_SITE_ID`
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
- `npm run dev` and `ci` fetche content files from local `fs` at runtime (`CONTENT_SOURCE=local`)
- `npm run publish` commits `content/` and pushes to `main`
- `github push webhook` hits `api/revalidate/` to bust cache tags; falls back to 60s timer

## Stack

| | |
|---|---|
| [Node.js 22](https://nodejs.org/) | Local build runtime |
| [Next.js 15](https://nextjs.org/docs) | App Router framework |
| [React 19](https://react.dev) | UI library |
| [TypeScript 5](https://www.typescriptlang.org/docs) | Static typing |
| [Tailwind 4](https://tailwindcss.com/docs) | Utility CSS |
| [PostCSS 8](https://postcss.org/) | CSS transformation |
| [Webflow CLI 2](https://developers.webflow.com/docs/webflow-cli) | Webflow CLI |
| [Webflow DevLink](https://developers.webflow.com/devlink/docs) | Design system export |
| [Webflow Cloud](https://developers.webflow.com/webflow-cloud/docs) | Production hosting |
| [Webflow MCP](https://developers.webflow.com/docs/models-context-protocol) | AI context protocol |
| [Cloudflare OpenNext](https://opennext.js.org/cloudflare) | Cloudflare adapter |
| [Cloudflare Workerd](https://github.com/cloudflare/workerd) | Edge runtime |
| [Cloudflare R2](https://developers.cloudflare.com/r2) | Incremental cache |
| [Cloudflare Wrangler 4](https://developers.cloudflare.com/workers/wrangler) | Cloudflare CLI |
| [GitHub CLI 2](https://cli.github.com/) | Workflow automation |
| [GitHub Actions](https://docs.github.com/en/actions) | CI/CD pipelines |
| [ESLint 9](https://eslint.org/) | Strict code linter |
| [Vitest 4](https://vitest.dev/) | Unit testing |
| [Playwright 1](https://playwright.dev/) | Behavior testing |
| [Prettier 3](https://prettier.io/) | Code formatter |
| [Refractor 5](https://github.com/wooorm/refractor) | Syntax highlighting |
| [Zed](https://zed.dev/) | AI-native editor environment |
| [Claude 3.5](https://anthropic.com/claude) | Primary agent model |
| [Gemini 1.5](https://deepmind.google/technologies/gemini/) | Secondary agent model |

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
AGENTS/                              # agent automations and workflows
 ├── logs/
 ├── plans/
 ├── [@trigger].md
 └── [@trigger].sh

content/                             # git-as-cms content source
 ├── [folder]/
 └── [page].ext

scripts/                             # node.js scripts (generated files are gitignored)
 ├── content.mjs                     # bundles @mirrors and icons (src/cms/content.generated.ts)
 ├── publish.mjs                     # commits /content/ and pushes to main (npm run publish)
 └── version.mjs                     # injects build data (src/meta/config/version.generated.ts)

src/
 ├── app/                            # routing and page definitions
 │    ├── [...slug]/
 │    ├── api/revalidate/            # github push webhook (cache busting)
 │    ├── custom.css
 │    ├── layout.tsx
 │    └── page.tsx
 │
 ├── assets/                         # raw static files
 │    └── icons/
 │
 ├── cms/                            # content engine (runtime source + routing)
 │    ├── directives.ts
 │    ├── folders.ts
 │    ├── pages.ts
 │    ├── slugs.ts
 │    └── source.ts                  # runtime content (prod: github; dev: fs)
 │
 ├── core/                           # behavior, state, and event handling
 │    └── controllers/
 │
 ├── meta/                           # build-time meta/structured data
 │    ├── config/
 │    └── schema/
 │
 ├── modules/                        # concrete, feature-scoped components
 │    ├── nav/
 │    └── stage/
 │
 └── utilities/                      # utility functions and helpers
      └── [utilityName].ts

webflow/                             # [DO NOT EDIT - OVERWRITTEN ON EXPORT]
 ├── [components]/
 ├── css/
 └── webflow_modules
```

## Design (see src/app/custom.css)
- `1vw` defines the base unit for fluid/scalable design
- `100dvh` defines the viewport height dynamically
- `0.1rem` defines the hook for browser zoom access
- `em` is the default unit of measure for ALL properties
- `%` is the fallback unit of measure when em is not practical

## Webflow
- `webflow/` is strictly read-only, overwritten by devlink, and maintained in webflow
- `webflow/css/` does not export page-level styles - ONLY component styles

## Content
- `/content/` files are raw strings – never import, execute, or refactor

## Notes
- `behavior` lives in `src/core/controllers/` using vanilla js, `useEffect`, and event delegation
- `active states` are declaratively controlled by `src/modules/nav/states.tsx`
- `formatting` uses the zed language server, disabled on save in `.zed/settings.json`
