# willwong.me

Next.js app deployed to Webflow Cloud via Cloudflare Workers.

## Commands

| | |
|---|---|
| `npm run dev` | Dev server at `localhost:3001` |
| `npm run build` | Production build |
| `npm run deploy` | Deploy to Webflow Cloud |
| `npm run preview` | Cloudflare Worker preview build |
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
| [Wrangler](https://developers.cloudflare.com/workers/wrangler) | Cloudflare CLI |

## Structure

```
content/                             # Static CMS, powered by Refractor
 ├── [folder]/
 └── [page].ext

src/
 ├── app/                             # Routing and page definitions
 │    ├── [...slug]
 │    ├── custom.css
 │    ├── layout.tsx
 │    └── page.tsx
 ├── assets/                          # Raw static files
 ├── core/
 │    ├── controllers/                # Behavior-only controller components
 │    │    ├── [ControllerName].tsx
 │    │    └── [ControllerName].css
 │    └── services/                   # Data providers and system helpers
 │         └── [serviceName].ts
 ├── modules/
 │    ├── navigation/                 # Primary navigation components
 │    │    ├── [ComponentName].tsx
 │    │    └── [ComponentName].css
 │    └── stage/                      # Presentational UI stage components
 │         ├── [ComponentName].tsx
 │         └── [ComponentName].css
 └── utilities/                       # Utility functions and helpers
      └── utilityName.ts

webflow/                              # [DO NOT EDIT - OVERWRITTEN ON EXPORT]
 ├── [components]/                    # Presentational UI components
 ├── css/                             # Layout and utility styles
 └── webflow_modules                  # Devlink internal integration files
```

## Patterns

**Visuals (HTML/CSS)** — Managed in `design.webflow.com` and exported via DevLink to the `@webflow/` path alias.

**Behavior (JS/TS)** — Managed in `src/core/controllers/` and attaches logic via vanilla JS, `useEffect` hooks, and DOM event delegation.

**Webflow IX3 (GSAP)** — Temporarily managed in `src/core/controllers/` until Webflow Devlink supports interactions.

**Content Management** — Managed in `content/` and `src/modules/stage/Refractor.tsx` automatically parses code files as html.

**Content Routing** — Managed in `src/core/services/content.ts` (data fetching) and `src/modules/navigation/` (UI nav tree) to automatically walk `content/` to build page routes and construct the nav tree.

**Active States** — Managed in `src/modules/navigation/activeStates.tsx` and declaratively controls all nav/ui active states.

**Code Formatting** — Managed in `.zed/settings.json` and uses the built-in language server formatter, disabled on save.

## Notes to self

- **Webflow DevLink only exports component styles.** CSS classes applied exclusively to page-level elements (not inside a DevLink component) are silently omitted from the export. If styles are missing from `webflow/css/` after a sync, check whether the class is used on a component or only on a page. Fix: apply the class to an element inside a component, or use a dedicated style-carrier component.
