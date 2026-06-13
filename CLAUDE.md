# Agent Rules

## src/content/

Files here are raw content ingested as plain text strings — never executed or treated as modules. Do not import them as modules, refactor them, or modify them unless explicitly asked. Any file type is valid here.

## CSS

- **Always use `em` units.** Never use `px`, `rem`, `vw`, `vh`, etc.
- **Exception — `%`:** permitted where layout logic requires it (e.g. panel widths driven by the JS resizing logic in `panels.tsx`).
- General layout uses `flex`; proportional sizing uses `em`; `%` is a last resort tied to a specific technical constraint.
