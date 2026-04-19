---
name: decap-cms
description: >
  Decap CMS setup for this repository. Trigger when changing `/admin/`,
  `public/admin/config.yml`, content collections, or local CMS authoring flow.
---

# Decap CMS Skill

This repository uses Decap CMS instead of the retired `/studio` interface.

## Important Files

- CMS entry: `public/admin/index.html`
- CMS schema: `public/admin/config.yml`
- Local dev wrapper: `scripts/dev-with-cms.mjs`
- Studio redirect middleware: `src/middleware.ts`

## Rules

- The authoring surface is `/admin/`.
- Keep local authoring compatible with Decap local backend on `http://127.0.0.1:8081/api/v1`.
- Netlify production authoring relies on Netlify Identity + Git Gateway, not local file-write APIs.
- If a schema change touches JSON file structure, update the runtime consumers in `src/config/` or related components.

## Content Paths

- Posts: `src/content/posts/<slug>/index.md`
- Static pages: `src/content/spec/about.md`, `src/content/spec/friends.md`
- JSON settings: `src/data/*.json`

## Validation

- Build with `pnpm build`.
- When practical, run `pnpm dev` and confirm `/admin/` loads.
