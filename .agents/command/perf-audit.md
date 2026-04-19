# Performance Audit

Use this workflow when improving Lighthouse, Core Web Vitals, or heavy pages.

1. Check hero images, wallpaper behavior, and sidebar widgets first.
2. Prefer reducing payload and hydration before adding new client-side tricks.
3. Keep homepage hero as a hero section, not a full-page background image.
4. Avoid introducing blocking third-party scripts on critical routes.
5. End with a production build verification using `pnpm build`.
