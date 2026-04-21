import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPostSlug } from "../../utils/url-utils";

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );

  const payload = posts
    .map((post) => ({
      id: post.id,
      slug: getPostSlug(post),
      title: post.data.title,
      published: post.data.published.toISOString(),
    }))
    .sort((left, right) => {
      const leftTime = new Date(left.published).getTime();
      const rightTime = new Date(right.published).getTime();
      return rightTime - leftTime;
    });

  return new Response(JSON.stringify(payload), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Avoid stale empty payloads during local dev (especially after route swaps / restarts).
      "Cache-Control": import.meta.env.PROD ? "public, max-age=300" : "no-store",
    },
  });
};
