```javascript
/**
 * ================================
 * @file guides.md - study guide template
 * ================================
 * @description
 * - one file per feature/workflow, `AGENTS/guides/`
 * - gitignored, local-only, never committed
 * - written on request, after a feature ships, to build a mental model of how it works
 * - lists files in ideal-build order, not alphabetical or touched-order
 * - guides are written in maximally concise, roadmap-style language — a map, not a textbook
 * @see AGENTS.md, /AGENTS/guides/
 */
```

# STUDY GUIDE: Short Title
read these files in order to build a mental model of how {feature} works

## Order & Files
one line per file: what it is, why it's in this spot, one clause max

*example:*
> 1. `types.ts` — the shape everything downstream returns; read this first, always
> 2. `apis/source.ts` — raw fetch only, no formatting; the "one call, cache it" pattern
> 3. `aggregate.ts` — raw data becomes UI-ready strings here; the fail-soft pattern lives here
> 4. `Widget.tsx` — dumb consumer; if this file surprises you, the layer below did its job wrong

## Mental Model
the one idea to walk away with, 1-3 lines, no more

*example:*
> raw source → per-source derivation → aggregate (format + cache + fail-soft) → dumb UI.
> every new stat repeats this exact chain — nothing skips a layer, nothing shares a fetch.

## Repeat This Pattern
how to build the next similar thing, using this as the reference — checklist style

*example:*
> - [ ] add the shape to `types.ts`
> - [ ] build one raw source under `apis/`, one job, no formatting
> - [ ] derive + format + cache in `aggregate.ts`
> - [ ] wire the dumb UI row last
