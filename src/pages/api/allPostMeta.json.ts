import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getPostSlug } from "../../utils/url-utils";

export const prerender = true;

function toIsoDate(value: unknown) {
  if (!value) return undefined;

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

function toOptionalString(value: unknown) {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function toOptionalStringArray(value: unknown) {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  return items.length > 0 ? items : undefined;
}

export const GET: APIRoute = async () => {
  const posts = await getCollection("posts", ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true,
  );

  const payload = posts
    .map((post) => {
      const slug = getPostSlug(post);
      const published = toIsoDate(post.data.published) ?? new Date(0).toISOString();
      const updated = toIsoDate(post.data.updated);
      const description = toOptionalString(post.data.description);
      const category = toOptionalString(post.data.category);
      const tags = toOptionalStringArray(post.data.tags);

      return {
        id: post.id,
        slug,
        title: post.data.title,
        published,
        url: `/posts/${slug}/`,
        ...(description ? { description } : {}),
        ...(category ? { category } : {}),
        ...(tags ? { tags } : {}),
        ...(typeof post.data.pinned === "boolean" ? { pinned: post.data.pinned } : {}),
        ...(updated ? { updated } : {}),
      };
    })
    .sort((left, right) => {
      const leftTime = Date.parse(left.published);
      const rightTime = Date.parse(right.published);
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
