# AGENT PLAN: Operation First Test

## Context
- only `tests/app.test.ts` exists (Playwright e2e); zero unit coverage on `slugs.ts`/`directives.ts`/`pages.ts`/`folders.ts`/`source.ts`, no unit runner installed

## Goal
- stand up a minimal Vitest suite, write a first test on pure zero-mock logic — learn arrange-act-assert, not chase coverage

## Solution
- install Vitest scoped so it never collides with Playwright, then pivot the first target from `slugify` to `directives.ts` since `directives.ts` only imports inert generated data while `slugify` drags in `next/cache`

## Checklist
- [x] `install` Vitest — same `describe/test/expect` API as the existing Playwright spec
- [x] `scope` `vitest.config.ts` to `src/**/*.test.ts` + `@/`/`@webflow/` aliases — never collides with Playwright's `tests/`
- [x] `add` `test:unit` / `test:unit:watch` scripts
- [x] `pivot` target from `slugify` to `directives.ts` — `slugify` actually drags `next/cache` in via `slugs.ts → pages.ts → source.ts`; `directives.ts` only imports inert generated data
- [x] `write` `src/cms/directives.test.ts` — 10 passing tests (`parseMetadata`, `processExternal`, `processMirror`)
- [x] `verify` 10/10 green, `tsc`/`eslint` clean
- [ ] `test` `slugify` — needs `next/cache` stubbed first
- [ ] `test` `source.ts` fetch-with-R2-fallback — needs mocked `fetch`
- [ ] `wire` `test:unit` into `ci.yml` (optional)

## Future Work
- stub `next/cache` so `slugify` becomes testable
- mock `fetch` to cover `source.ts`'s R2 fallback path
- wire `test:unit` into `ci.yml`

## Risks & Gotchas
- `runner collision` an unscoped Vitest `include` would try to run Playwright's spec and crash
- `path alias` Vitest doesn't resolve `@/` by default — already aliased in config, but new source files need it too
- `edge case` once tested: `slugify("notes.md.md")` → `"notes-md"` (lowercase-checks, slices original, strips one trailing `.md`)
- `scope creep` this is a learning beachhead, not an infra project — one runner, one config, one file first

## Notes
- none
