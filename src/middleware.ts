import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = (context, next) => {
  const { pathname } = context.url;

  if (pathname === "/admin" || pathname === "/admin/") {
    return context.redirect("/admin/index.html", 308);
  }

  if (pathname === "/studio" || pathname.startsWith("/studio/")) {
    return context.redirect("/admin/", 308);
  }

  return next();
};
