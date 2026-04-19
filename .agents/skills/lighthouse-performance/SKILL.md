---
name: lighthouse-performance
description: >
  Repo-specific performance guidance for Lighthouse and Core Web Vitals.
  Trigger when optimizing payload, LCP, CLS, hydration, sidebar widgets, or the
  homepage hero.
---

# Lighthouse Performance Skill

This project is sensitive to hero image size, unnecessary hydration, and third-party scripts.

## Focus Areas

- Hero wallpaper payload and rendering path
- Client-hydrated widgets and media players
- Third-party scripts loaded globally
- Sidebar content that shifts layout
- Render-blocking CSS or JS

## Rules

- Fix payload and hydration first; cosmetic script work comes later.
- Prefer local optimized images over remote hero assets.
- Keep layout stable between server render and hydration to reduce CLS.
- Avoid moving critical widgets around unless the design requirement is explicit.
- Keep the wallpaper visible as a hero, not a flat body background.

## Validation

- Run `pnpm build`.
- Re-check homepage markup and asset references after performance-related refactors.
