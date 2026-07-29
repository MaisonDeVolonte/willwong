# AGENT PLAN: Operation AI Chat

## Context
- `webflow/panels/Chat.tsx` is DevLink-generated (hardcoded Q&A, dead form) — markup/class source, never edited directly
- `src/modules/stage/Chat.tsx` is the reserved placeholder; `layout.tsx:121` currently mounts the DevLink version
- `getContentMap()` already returns all of `content/` cached — but too big to stuff whole (~95k tokens vs. Gemini free-tier TPM caps), so: compact system prompt (site map + core pages) + on-demand `readPage` tool
- runtime is OpenNext/workerd — secrets via `getCloudflareContext().env` w/ `process.env` fallback; `useChat` must POST to `${basePath}/api/chat`

## Goal
- replace the static DevLink chat mock with a real streaming AI chat — one model, one route, one client component, one tool, end-to-end (AI SDK v5 + `@ai-sdk/google`, `/api/chat` on workerd, `useChat()`), same "Agent-Negotiator" persona

## Solution
- fork the DevLink chat markup onto owned primitives, wire it to a workerd-hosted `/api/chat` route running Gemini via AI SDK v5, with a compact system prompt plus an on-demand `readPage` tool instead of stuffing the whole content map

## Checklist
- [ ] `install` `ai @ai-sdk/google @ai-sdk/react zod streamdown`; model `gemini-2.5-flash-lite` (best free RPD)
- [ ] `set` `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local` (gitignored) + `NEXT_PUBLIC_BASE_PATH` passthrough in `next.config.ts`
- [ ] `build` `src/app/api/chat/route.ts` — system prompt (persona + site map + core pages) + `readPage` tool + `streamText({stopWhen: stepCountIs(3)})` → `toUIMessageStreamResponse()`; guard 503 w/o key, cap message size, truncate history
- [ ] `build` `src/modules/stage/Chat.tsx` — fork DevLink markup onto owned primitives (same classes/data-attrs), `useChat` + `DefaultChatTransport`, plain `<form>` (not `FormForm`), Enter-to-send, seed w/ mock Q&A
- [ ] `render` responses via `streamdown` (fallback: `pre-wrap` plain text), auto-scroll + thinking indicator on `status`
- [ ] `swap` `layout.tsx` mount to `@/modules/stage/Chat`
- [ ] `test` in `next dev`, then `npm run preview` (workerd streaming)
- [ ] `deploy` set prod secret, verify POST hits the basePath-prefixed route live

## Future Work
- per-IP rate limit
- quota-exhausted message
- context-dropdown scoping
- persona switcher

## Risks & Gotchas
- `quota not latency` free-tier RPD/TPM is the real constraint — history truncation + input/output caps are the MVP guard, per-IP limiting is a fast follow
- `key exposure` API key server-only, never `NEXT_PUBLIC_`
- `devlink drift` forking the panel breaks auto-sync — future Webflow design changes need manual diffing in
- `v5 api` differs from most tutorials — `sendMessage`, `DefaultChatTransport`, `stopWhen`, message `.parts` not `.content`; trust official v5 docs only
- `form submit` reusing `FormForm` risks DevLink swallowing it — plain `<form>` sidesteps it
- `basepath 404` only shows up in prod, not dev — verify the network tab post-deploy
- `streaming` must be verified under `npm run preview` (workerd), not just `next dev` (node)

## Notes
- none
