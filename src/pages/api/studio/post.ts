import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  await request.text();

  return new Response(
    JSON.stringify({
      ok: false,
      retired: true,
      adminUrl: "/admin/",
      error: "Studio post API sudah dipensiunkan. Gunakan headless CMS di /admin/.",
    }),
    { status: 410, headers: { "Content-Type": "application/json" } },
  );
};
