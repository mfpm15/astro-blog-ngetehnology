---
name: netlify-deploy
description: >
  Netlify deployment guardrails for this Astro repo. Trigger when editing build
  config, package scripts, adapters, or anything that can break GitHub-driven
  Netlify deploys.
---

# Netlify Deploy Skill

Use this skill when a change can affect CI or production deploys.

## Current Constraints

- Netlify builds this Astro app from GitHub.
- Node must stay on version `>=22.12.0`.
- The production build must remain `pnpm install --frozen-lockfile --prod=false && pnpm run build`.
- Astro integrations such as `astro-compress` and `astro-robots-txt` are required during build.

## Rules

- Do not add install hooks that require local-only tools or interactive setup.
- Avoid build steps that depend on the retired `/studio` file server.
- Keep `package.json`, `pnpm-lock.yaml`, `.nvmrc`, and `netlify.toml` aligned.
- If you add optional tooling like AgentSync, keep it manual and off the critical install/build path.

## Validation

- Run `pnpm build`.
- If build config changes, inspect `netlify.toml` and `astro.config.mjs` together.
