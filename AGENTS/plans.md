```javascript
/**
 * ==============================
 * @file plans.md - plan template
 * ==============================
 * @description
 * - one file per plan, `AGENTS/plans/`
 * - gitignored, local-only, never committed
 * - written before complex or architectural work
 * - covers overview, context, fixes, risks, checklist
 * - plans are written in maximally clear, concise, action-oriented language
 * @see AGENTS.md, /AGENTS/plans/
 */
```

# AGENT PLAN: Short Title
runs before executing complex tasks or architecture changes

## Overview
What is the core objective of this plan?

*example:*
> We need to improve the runtime CMS page load speeds. The warm TTFB is ~3s and cold is ~15s due to un-cached data fetching and API throttling at build time.

## Context
Describe the current state of the repo, inherited problems, constraints, and why this plan is necessary.

*example:*
> The root layout uses `force-dynamic`, preventing caching. `readGithubContent` makes 106 separate fetches, which throttles the GitHub API without a token and has significant KV Data Cache overhead.

## Proposed Fixes
List the concrete changes and actions required to resolve the issue.

*example:*
> 1. Consolidate `readGithubContent` fetches into one via `unstable_cache`.
> 2. Pass `GITHUB_TOKEN` in `deploy.yml` to raise rate limits and prevent 503s at build time.
> 3. Replace `force-dynamic` with a long `revalidate` for ISR.
> 4. Add a cache prime curl script post-deploy in `deploy.yml`.

## Risks & Gotchas
Identify potential breaking changes, race conditions, or edge cases.

*example:*
> - Guarding the build fetch with `NEXT_PHASE` risks caching an empty shell for the homepage.
> - OpenNext KV starts empty on a fresh deploy, meaning a cache-prime is strictly necessary.

## Checklist
A concrete list of atomic steps to implement the plan.

*example:*
> - [ ] Update `src/cms/source.ts` with `unstable_cache`.
> - [ ] Update `src/app/layout.tsx` to remove `force-dynamic`.
> - [ ] Update `.github/workflows/deploy.yml` with `GITHUB_TOKEN` and curl warm-up.
