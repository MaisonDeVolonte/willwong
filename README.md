# willwong.me

A portfolio/resume site built as a mock IDE that renders its own source code. 
Next.js (App Router) deployed to Webflow Cloud on Cloudflare Workers via OpenNext.

[GitHub Project Board](https://github.com/users/MaisonDeVolonte/projects/1)

## Workflow
Strict, atomic, continuously integrated, trunk-based development: fast review, trivial reverts, clean bisect, near-zero conflicts

```text
[@gitdeliver → atomic (branch/commit/pr) → checks (tsc/lint/next) → main (trunk)] ──➔ [release pr → production → deploy (GHA) → willwong.me]
```

- `main` is the long-lived integration trunk; constantly synced and releasable at all times
- `production` is the deploy branch; a release pointer that triggers production deployments
- Conflicts are resolved locally before `branching` and prs are protected by CI checks before `merging`
- Every change ships as an `atomic, single-concern pr` off a short-lived branch that's pruned right after merge
- Branches are 99% `independent`, 1% `stacked`; cross-cutting is minimized as much as possible
- `@gitdeliver` is the primary shipping mechanism that automates the atomic `group, branch, stage, commit, push, pr` pipeline
- `@gitempty` is the post-merge cleanup mechanism; uses patch-identity to prune ghost/zombie branches left by squash/rebase merges
- 'Continuous integration vs integration hell' in its purest form, at the end of the day
- Inspired by Paul Hammant, Martin Fowler, Dan Lines, Gergely Orosz, et al

**Conventions**
- Groups are based on `type(scope)` pairs
- Branches mirror group names via `type/scope/title`
- Staging aims for a ~50-100 line soft-ceiling, always favoring logical cohesion
- Commits are structured as `type(scope): title` with ` - hyphen-delimited, multiline descriptions`
- PRs are back-filled via their commit title and body descriptions

**Caveats**
- Unfinished features are integrated via runtime feature flags, not long-lived branches

## CI/CD

Ensures `main` is always deployable and the `production` edge environment remains stable

**Continuous Integration:** (`ci.yml`) *see @gitdeliver*
- Runs on every pr pushing to `main`
- Uses `ubuntu-latest` runner to catch case-sensitive errors macOS hides
- Gate 1: TypeScript `tsc --noEmit` enforces strict type safety
- Gate 2: ESLint `eslint . --max-warnings 0` enforces strict code style
- Gate 3: Next.js `next build` ensures static generation and asset optimization succeed before merging
- Gate 4: Playwright `npm run test:e2e` ensures end-to-end functionality is working

**Continuous Deployment:** (`deploy.yml`) *see @githappy*
- Runs on every push to `production`, decoupled from `main` for release management
- Bundles and deploys optimized app to Webflow Cloud / Cloudflare Workers

**Version Tracking:**
- `package.json` uses a prebuild hook (`npm run generate`)
- `scripts/version.mjs` checks .git history, counts commits since last tag, and grabs commit hash
- `src/meta/config/version.generated.ts` stores the version information
- `next build` bakes the version information into the static html/js bundle

**Configuration:**
- `wrangler.json` requires `NEXT_INC_CACHE_R2_BUCKET`
- `webflow.json` requires `cloud.app_id`
- `deploy.yml` requires `WEBFLOW_API_TOKEN` and `WEBFLOW_SITE_ID`

## Content

Because Cloudflare Workers (`workerd`) do not have a runtime filesystem (`fs`), the app uses a hybrid bundling and caching strategy to serve content at the edge:

```text
[content/*] → (build) → [content.generated.ts] → (prerender) → [.open-next/cache]
                                  ↓                                    ↓
                        (cache miss fallback)               (bulk upload on deploy)
                                  ↓                                    ↓
 [browser]  ← (serves) ← [cloudflare worker]  ←  (reads)  ←  [R2 incremental cache]
```

- **Build-Time Bundling:** `scripts/content.mjs` compiles all raw content into a single in-memory typescript object
- **Pre-rendering:** next.js uses the ts object to generate static html/json payloads during `next build`
- **Edge Caching:** `opennextjs-cloudflare` uploads these payloads to `willwong-cache` R2 bucket on deploy
- **Runtime Fallback:** the worker serves from R2 but on a cache miss, it renders using the `content.generated.ts` bundle, bypassing the need for `fs.readFile`

## Commands

| | |
|---|---|
| `npm run dev` | Dev server at `localhost:3001` |
| `npm run build` | Production build |
| `npm run generate` | Rebuild generated metadata (version + bundled content); runs automatically before `dev`/`build` |
| `npm run preview` | Cloudflare Worker (`workerd`) preview build |
| `npm run deploy` | Manual deploy to Webflow Cloud (automated deploys run in CI) |
| `npm run lint` | ESLint |

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
| [Playwright 1](https://playwright.dev/) | Behavior testing |
| [Prettier 3](https://prettier.io/) | Code formatter |
| [Refractor 5](https://github.com/wooorm/refractor) | Syntax highlighting |
| [Zed](https://zed.dev/) | AI-native editor environment |
| [Claude 3.5](https://anthropic.com/claude) | Primary agent model |
| [Gemini 1.5](https://deepmind.google/technologies/gemini/) | Secondary agent model |


## Structure

```
AGENTS/                              # Custom agent automations
 ├── logs/
 ├── [trigger].md
 └── [trigger].sh

content/                             # Build-time content source
 ├── [folder]/
 └── [page].ext

scripts/                             # Build-time generators (Node.js only, generated files are gitignored)
 ├── content.mjs                     # Compiles content json → src/cms/content.generated.ts
 └── version.mjs                     # Injects build data → src/meta/config/version.generated.ts

src/
 ├── app/                            # Routing and page definitions
 │    ├── [...slug]/
 │    ├── custom.css
 │    ├── layout.tsx
 │    └── page.tsx
 │
 ├── assets/                         # Raw static files
 │    └── icons/
 │
 ├── cms/                            # Runtime engine for static content
 │    ├── directives.ts
 │    ├── folders.ts
 │    ├── pages.ts
 │    └── slugs.ts
 │
 ├── core/                           # Behavior, state, and event handling
 │    └── controllers/
 │
 ├── meta/                           # Build-time meta and structured data
 │    ├── config/
 │    └── schema/
 │
 ├── modules/                        # Concrete, feature-scoped components
 │    ├── nav/
 │    └── stage/
 │
 └── utilities/                      # Utility functions and helpers
      └── [utilityName].ts

webflow/                             # [DO NOT EDIT - OVERWRITTEN ON EXPORT]
 ├── [components]/
 ├── css/
 └── webflow_modules
```

## Patterns

**Visuals (HTML/CSS)** — Managed in `design.webflow.com` and exported via DevLink to the `@webflow/` path alias. Configure generated components via **props** in `src/app/layout.tsx`; never edit files under `webflow/`.

**Behavior (JS/TS)** — Managed in `src/core/controllers/` and attaches logic via vanilla JS, `useEffect` hooks, and DOM event delegation.

**Content (`@mirror`)** — `content/` holds the CMS source; files mirror real source via `@mirror` comments. `scripts/content.mjs` resolves those (and icons) at build into `src/cms/content.generated.ts`, and `src/cms/` reads that bundle. `src/modules/stage/Refractor.tsx` renders code as highlighted HTML.

**Content Routing** — `src/cms/` walks the bundled content to build page routes and the `src/modules/nav/` tree.

**Build Metadata** — `scripts/version.mjs` bakes the app version (`package.json`) and commit hash (`git rev-parse`) into `src/meta/config/version.generated.ts`, surfaced in the header via `@/meta/config/version.ts`.

**Active States** — Managed in `src/modules/nav/states.tsx` and declaratively controls all nav/ui active states.

**Code Formatting** — Managed in `.zed/settings.json` and uses the built-in language server formatter, disabled on save.

## Notes to self

**Webflow DevLink only exports component styles.** CSS classes applied exclusively to page-level elements (not inside a DevLink component) are silently omitted from the export. If styles are missing from `webflow/css/` after a sync, check whether the class is used on a component or only on a page. Fix: apply the class to an element inside a component, or use a dedicated style-carrier component.

**No filesystem at runtime.** Cloudflare Workers (`workerd`) don't implement `fs.readFile`/`readdir` — they throw at request time. This is why content is bundled in-memory (see Architecture & Delivery).
