import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      ok: false,
      readOnly: true,
      mode: "readonly",
      message: "Studio deployment publik bersifat read-only. Jalankan pnpm dev untuk menyimpan perubahan.",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};
