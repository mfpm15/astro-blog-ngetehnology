# NgetehNology Agent Instructions

These instructions are the canonical source of truth for AI assistants working in this repository.

## Project Scope

- Framework: Astro 6 with a Firefly-based blog structure.
- Deployment target: Netlify via GitHub auto-deploy.
- Content authoring: Decap CMS at `/admin/`.
- Legacy Studio: retired. Do not reintroduce `/studio` CRUD flows or sidecar file-writing APIs.

## Repository Rules

- Keep the public site fast. Default to Astro server-rendered output and add client hydration only when interaction actually needs it.
- Do not add automatic install hooks or local-only runtime dependencies that can break Netlify builds.
- Preserve the current content model unless the task explicitly requires schema changes.
- Treat `.claude/` as user-managed local tooling. This repo's AgentSync setup intentionally does not manage that directory.

## Content and CMS Rules

- Blog posts live in `src/content/posts/<slug>/index.md`.
- Static markdown pages live in `src/content/spec/`.
- Structured site data lives in `src/data/*.json`.
- Decap CMS configuration lives in `public/admin/config.yml`.
- If you add or rename CMS fields, update both the CMS schema and the runtime readers/components that consume the data.

## Current Data Shape Gotchas

- `src/data/navbar-links.json` is an object with a `links` array.
- `src/data/friends.json` is an object with an `items` array.
- `src/data/sidebar-layout.json` controls sidebar position and widget enablement.
- `src/data/wallpaper.json` drives hero/banner behavior. Treat it as hero configuration, not as a generic page background switch.

## UI and Performance Guardrails

- Keep the sidebar on the left unless the user explicitly asks for a different layout.
- Calendar and site stats belong to the sidebar widget system, not to the main content area.
- Homepage hero and inner-page hero must remain visually distinct. Avoid collapsing the wallpaper into a flat page background.
- Prefer optimized local images for logo, wallpaper, and post covers.
- Avoid new `client:load` islands on critical routes unless there is a strong reason.

## Validation

- Run `pnpm build` before closing substantial changes.
- If content model or routing changes, verify `/admin/`, `/`, and at least one post route still build cleanly.
- For CMS work, verify the local Decap backend flow with `pnpm dev` when practical.
