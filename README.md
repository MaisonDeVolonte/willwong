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
src/                  # Application codebase
 ├── app/             # Structural skeleton and page routing
 │    ├── [...slug]   # Route entry points (dynamic slug)
 │    ├── custom.css  # Custom styles and overrides
 │    ├── layout.tsx  # Imports styles and mounts features
 │    └── page.tsx    # Route entry points
 ├── content/         # Raw content files (never imported as modules)
 │    ├── folder/     # Content folder 
 │    ├── page.md     # Page content
 │    └── home.md     # Home content
 ├── features/        # Behavior-only components 
 │    ├── feature.tsx # Behavior layers
 │    └── feature.css # Feature-specific styles
 ├── utilities/       # Utility functions and helpers
 └── types.d.ts       # TypeScript type definitions

webflow/              # Devlink components
 ├── components/      # Presentational UI components
 ├── css/             # Layout and utility styles
 └── webflow_modules  # Devlink internal integration files
```

## Patterns

**Visuals (HTML/CSS)** — Managed in `design.webflow.com` and exported via DevLink to the `@webflow/` path alias.

**Behavior (JS/TS)** — Managed in `src/features/` and attaches logic via vanilla JS, `useEffect` hooks, and DOM event delegation.

**Webflow IX3 (GSAP)** — Temporarily managed in `src/features/` until Webflow Devlink supports interactions.

**Active States** — Managed in `src/features/active.tsx` and declaratively controls all nav/ui active states.

**Content Routing** — Managed in `src/content/` and `src/utilities/navigation.ts` auto-detects file extensions to parse and serve them as pages (folders = routes, files = tabs).
