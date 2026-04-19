import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return context.redirect("/admin/", 308);
  }

  return next();
});
