import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";

export const prerender = false;

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function escapeYamlString(value: string) {
  return JSON.stringify(value);
}

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "true" || value === "on" || value === "1";
}

function parseTags(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function buildFrontmatter(data: {
  title: string;
  published: string;
  updated: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  draft: boolean;
  lang: string;
  pinned: boolean;
  author: string;
  series: string;
  sourceLink: string;
  licenseName: string;
  licenseUrl: string;
  password: string;
}) {
  const lines = [
    "---",
    `title: ${escapeYamlString(data.title)}`,
    `published: ${data.published}`,
    `description: ${escapeYamlString(data.description)}`,
  ];

  if (data.updated) lines.push(`updated: ${data.updated}`);
  if (data.image) lines.push(`image: ${escapeYamlString(data.image)}`);
  lines.push(
    `tags: [${data.tags.map((tag) => escapeYamlString(tag)).join(", ")}]`
  );
  lines.push(`category: ${escapeYamlString(data.category)}`);
  lines.push(`draft: ${data.draft}`);
  lines.push(`lang: ${escapeYamlString(data.lang)}`);
  lines.push(`pinned: ${data.pinned}`);
  if (data.author) lines.push(`author: ${escapeYamlString(data.author)}`);
  if (data.series) lines.push(`series: ${escapeYamlString(data.series)}`);
  if (data.sourceLink) {
    lines.push(`sourceLink: ${escapeYamlString(data.sourceLink)}`);
  }
  if (data.licenseName) {
    lines.push(`licenseName: ${escapeYamlString(data.licenseName)}`);
  }
  if (data.licenseUrl) {
    lines.push(`licenseUrl: ${escapeYamlString(data.licenseUrl)}`);
  }
  if (data.password) {
    lines.push("encrypted: true");
    lines.push(`password: ${escapeYamlString(data.password)}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) {
    return new Response(
      JSON.stringify({
        error: "Studio tulis-file hanya aktif saat development lokal.",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const formData = await request.formData();
    const title = String(formData.get("title") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const content = String(formData.get("content") || "").trim();

    if (!title) {
      return new Response(JSON.stringify({ error: "Judul wajib diisi." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!content) {
      return new Response(JSON.stringify({ error: "Isi artikel wajib diisi." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const rawSlug = String(formData.get("slug") || "").trim();
    const slug = slugify(rawSlug || title);

    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Slug tidak valid. Gunakan huruf, angka, dan tanda hubung." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const postsDir = path.join(process.cwd(), "src", "content", "posts");
    const postDir = path.join(postsDir, slug);
    const postPath = path.join(postDir, "index.md");

    try {
      await fs.access(postPath);
      return new Response(
        JSON.stringify({ error: `Slug "${slug}" sudah dipakai.` }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    } catch {
      // file belum ada, lanjut
    }

    await fs.mkdir(postDir, { recursive: true });

    let image = String(formData.get("image") || "").trim();
    const coverFile = formData.get("coverFile");

    if (coverFile instanceof File && coverFile.size > 0) {
      const safeName = path.basename(coverFile.name).replace(/\s+/g, "-");
      const coverPath = path.join(postDir, safeName);
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      await fs.writeFile(coverPath, buffer);
      image = `./${safeName}`;
    }

    const markdown = `${buildFrontmatter({
      title,
      published: String(formData.get("published") || "").trim(),
      updated: String(formData.get("updated") || "").trim(),
      description,
      image,
      tags: parseTags(String(formData.get("tags") || "")),
      category: String(formData.get("category") || "").trim(),
      draft: parseBoolean(formData.get("draft")),
      lang: String(formData.get("lang") || "id").trim() || "id",
      pinned: parseBoolean(formData.get("pinned")),
      author: String(formData.get("author") || "").trim(),
      series: String(formData.get("series") || "").trim(),
      sourceLink: String(formData.get("sourceLink") || "").trim(),
      licenseName: String(formData.get("licenseName") || "").trim(),
      licenseUrl: String(formData.get("licenseUrl") || "").trim(),
      password: String(formData.get("password") || "").trim(),
    })}${content}\n`;

    await fs.writeFile(postPath, markdown, "utf8");

    return new Response(
      JSON.stringify({
        ok: true,
        slug,
        path: `src/content/posts/${slug}/index.md`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal membuat post.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
