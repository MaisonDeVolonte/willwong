# willwong.me

A portfolio/resume site built as a mock IDE that renders its own source code. Next.js (App Router) deployed to Webflow Cloud on Cloudflare Workers via OpenNext.

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
| [Next.js 15](https://nextjs.org/docs) | Framework, App Router |
| [React 19](https://react.dev) | UI runtime |
| [TypeScript 5](https://www.typescriptlang.org/docs) | Types |
| [Tailwind 4](https://tailwindcss.com/docs) | Utility CSS |
| [Webflow Devlink](https://developers.webflow.com/devlink/docs) | Design system export (`webflow/`) |
| [Webflow Cloud](https://developers.webflow.com/webflow-cloud/docs) | Hosting + deploy target |
| [OpenNext Cloudflare](https://opennext.js.org/cloudflare) | Next.js → Cloudflare Workers adapter |
| [Cloudflare R2](https://developers.cloudflare.com/r2) | Incremental cache for prerendered pages |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler) | Cloudflare CLI |

## Structure

```
content/                             # Build-time content source
 ├── [folder]/
 └── [page].ext

scripts/                             # Build-time generators (Node.js; never bundled)
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

> Generated files (`*.generated.ts`) are gitignored and rebuilt by `scripts/` before every `dev`/`build`.

## Patterns

**Visuals (HTML/CSS)** — Managed in `design.webflow.com` and exported via DevLink to the `@webflow/` path alias. Configure generated components via **props** in `src/app/layout.tsx`; never edit files under `webflow/`.

**Behavior (JS/TS)** — Managed in `src/core/controllers/` and attaches logic via vanilla JS, `useEffect` hooks, and DOM event delegation.

**Webflow IX3 (GSAP)** — Temporarily managed in `src/core/controllers/` until Webflow Devlink supports interactions.

**Content (`@mirror`)** — `content/` holds the CMS source; files mirror real source via `@mirror` comments. `scripts/content.mjs` resolves those (and icons) at build into `src/cms/content.generated.ts`, and `src/cms/` reads that bundle — no runtime filesystem, since Cloudflare Workers have none. `src/modules/stage/Refractor.tsx` renders code as highlighted HTML.

**Content Routing** — `src/cms/` walks the bundled content to build page routes and the `src/modules/nav/` tree.

**Build Metadata** — `scripts/version.mjs` bakes the app version (`package.json`) and commit hash (`git rev-parse`) into `src/meta/config/version.generated.ts`, surfaced in the header via `@/meta/config/version.ts`.

**Active States** — Managed in `src/modules/nav/states.tsx` and declaratively controls all nav/ui active states.

**Code Formatting** — Managed in `.zed/settings.json` and uses the built-in language server formatter, disabled on save.

## Deployment

Deploys run in **GitHub Actions**, not Webflow's git auto-deploy (which is disconnected). CI is the sole deployer so the build runs where `git` is available — letting it bake the real commit hash into the app.

```
feature ──PR──▶ main          # integration; PR-gated by CI build check; no deploy
                  │
            Release PR ──▶ production
                              │
   GitHub Actions: build (commit hash baked) ──▶ webflow cloud deploy
                              │
                         willwong.me
```

- **`main`** — integration branch, protected by a ruleset (PR + passing `build` check required).
- **`production`** — deploy branch; a push triggers `.github/workflows/deploy.yml`.
- **Release** — open a PR `main` → `production`; merging it deploys.
- **CI build check** — `.github/workflows/ci.yml` runs `tsc` + `next build` on Linux (catches case-sensitivity bugs the macOS filesystem hides).
- **Config** — `WEBFLOW_API_TOKEN` (Actions secret), `WEBFLOW_SITE_ID` (Actions variable), `cloud.app_id` in `webflow.json`; R2 bucket `NEXT_INC_CACHE_R2_BUCKET` declared in `wrangler.json`.

## Notes to self

- **Webflow DevLink only exports component styles.** CSS classes applied exclusively to page-level elements (not inside a DevLink component) are silently omitted from the export. If styles are missing from `webflow/css/` after a sync, check whether the class is used on a component or only on a page. Fix: apply the class to an element inside a component, or use a dedicated style-carrier component.

- **No filesystem at runtime.** Cloudflare Workers (`workerd`) don't implement `fs.readFile`/`readdir` — they throw at request time. All content is bundled at build (`scripts/content.mjs`) and read from the bundle, never via `fs`.

- **Filenames are case-sensitive in production.** macOS is case-insensitive, so an import resolving to a differently-cased file works locally but fails the Linux build. Keep co-located CSS casing identical to its component, and let the CI build check catch drift.

- **R2 incremental cache isn't populated by Webflow's deploy.** Prerendered pages self-populate R2 on first successful render, so renders must work *without* the cache (another reason there's no runtime `fs`). Bucket declared in `wrangler.json`; enabled via `r2IncrementalCache` in `open-next.config.ts`.

- **The commit hash needs a CI deploy.** Webflow's build has no `.git` and exposes no commit env var, so the real hash only resolves when CI runs the build + deploy.
