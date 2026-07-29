# AGENT PLAN: Operation Warm Cache

## Context
- `force-dynamic` + 106 per-render file fetches in `source.ts` → cold ~15s, warm ~3-6s
- rejected a `NEXT_PHASE`-guarded fetch — risks serving an empty shell if the post-deploy prime fails

## Goal
- sub-10ms warm TTFB on the runtime CMS via tag-invalidated ISR instead of `force-dynamic`

## Solution
- bundle the 106 fetches behind `unstable_cache`, drop `force-dynamic` for 30-day ISR, and prime the cache post-deploy instead of guarding it out

## Checklist
- [x] `wrap` `readGithubContent` in `unstable_cache` (`src/cms/source.ts`) — bundles 106 fetches into one KV read
- [x] `add` `GITHUB_TOKEN` to `.github/workflows/deploy.yml`'s build step — avoids 503s during prerender
- [x] `drop` `force-dynamic` from `src/app/layout.tsx`, set 30-day `revalidate` (ISR)
- [x] `prime` post-deploy: `curl /about` to populate the empty KV cache
- [x] `result` `/` 15.6s → ~0.9s, warm dynamic routes ~3-6s → ~0.6s

## Future Work
- none noted

## Risks & Gotchas
- `empty shell` avoided by fetching real content at build time, not guarding it out entirely
- `secret` `deploy.yml` needs `GITHUB_TOKEN` present in the Actions environment
- `prime target` hits `/about`, not `/` (already static) — that's what populates `unstable_cache`

## Notes
- none
