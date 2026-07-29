# AGENT PLAN: Operation Nav Spinner

## Context
- background prefetching covers 99% of navigations at 0ms; the miss is a click landing before the prefetcher gets there

## Goal
- spinner feedback on a nav link when its route is still fetching (pre-prefetch or slow connection)

## Solution
- convert the nav link to a client component, hijack plain left-clicks into a transition, and render a spinner while it's pending

## Checklist
- [x] `convert` `src/modules/nav/Link.tsx` to a client component — `useTransition` + `useRouter`
- [x] `hijack` left-clicks: `preventDefault`, wrap `router.push(href)` in `startTransition`
- [x] `render` `.nav__spinner` SVG beside the link text while `isPending`
- [ ] `style` spinner keyframes in `src/app/custom.css`

## Future Work
- none noted

## Risks & Gotchas
- `modifier keys` ignore `ctrlKey`/`metaKey`/`shiftKey`/`altKey` so new-tab opens still work natively
- `external links` `http`/`mailto:` bypass the transition, use native navigation
- `fallback` keep the outer `<NextLink>` for its native hover-prefetch

## Notes
- none
