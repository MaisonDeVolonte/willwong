# AGENT PLAN: Operation Instant Nav

## Context
- App Router round-trips for the RSC payload on every nav
- site's 106 route payloads are tiny, so prefetching them all in the background removes the ~0.8s latency entirely

## Goal
- 0ms instant navigations across the mock IDE via background RSC prefetching, no client bundle growth

## Solution
- sequential prefetch queue, idle-triggered, feeding Next's Router Cache

## Checklist
- [x] `build` `src/modules/nav/Prefetcher.tsx` — sequential `router.prefetch(url)` queue
- [x] `queue idle` wait 3s after load, skip on `navigator.connection.saveData`, drain via `requestIdleCallback`
- [x] `mount` in `src/modules/nav/Panel.tsx` — collect all route hrefs while building the folder tree, pass to `<Prefetcher urls={allUrls} />`

## Future Work
- none noted

## Risks & Gotchas
- `network congestion` parallel prefetch would starve real requests (images) — queue must stay strictly sequential
- `data usage` abort prefetching on metered/slow connections via `saveData`
- `router cache` `router.prefetch` fills Next's in-memory Router Cache, so the next click resolves instantly

## Notes
- none
