# CMS Schema Update

Use this workflow when changing Decap CMS collections, fields, or file mappings.

1. Update `public/admin/config.yml`.
2. Update the matching runtime reader, config module, or component in `src/`.
3. Preserve existing file locations under `src/content/` and `src/data/` unless migration is part of the task.
4. Do not restore `/studio` APIs or UI as a fallback.
5. Verify `pnpm build` after the schema change.
