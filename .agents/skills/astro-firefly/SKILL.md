---
name: astro-firefly
description: >
  Astro + Firefly patterns for the NgetehNology blog. Trigger when editing
  `.astro` files, layouts, sidebar behavior, wallpaper/hero rendering, or
  content readers under `src/`.
---

# Astro Firefly Skill

Use this skill for repo-specific Astro work.

## Architecture

- Main public shell logic lives in `src/layouts/Layout.astro` and `src/layouts/MainGridLayout.astro`.
- Hero and wallpaper behavior is driven by `src/data/wallpaper.json`.
- Sidebar widget enablement and order is driven by `src/data/sidebar-layout.json`.
- Navbar data is read from `src/data/navbar-links.json` via `src/config/navBarConfig.ts`.
- Friend links are read from `src/data/friends.json` via `src/config/friendsConfig.ts`.

## Rules

- Keep the sidebar on the left by default.
- Calendar and `site-stats` are sidebar widgets; do not hardcode them into page content.
- Preserve the distinction between homepage hero and inner-page hero.
- Do not turn the wallpaper system into a generic page background unless explicitly requested.
- Prefer `.astro` and server-rendered markup over hydrated islands.

## Validation

- Run `pnpm build` after layout or routing changes.
- Smoke-check `/`, `/admin/`, and at least one content route after major shell edits.
