import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      ok: false,
      readOnly: true,
      mode: "retired",
      adminUrl: "/admin/",
      message:
        "Studio sudah dipensiunkan. Gunakan /admin/ untuk authoring, termasuk local CRUD lewat Decap local backend saat pnpm dev.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};
