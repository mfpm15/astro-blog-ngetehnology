import { createServer } from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

const PORT = Number(process.env.STUDIO_FILE_SERVER_PORT || 4323);
const HOST = process.env.STUDIO_FILE_SERVER_HOST || "127.0.0.1";
const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");
const TAXONOMY_PATH = path.join(process.cwd(), "src", "data", "post-taxonomy.json");

function json(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function escapeYamlString(value) {
  return JSON.stringify(value);
}

function parseBoolean(value) {
  return value === "true" || value === "on" || value === "1";
}

function parseTags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeUniqueStrings(values) {
  return Array.from(
    new Set(
      values
        .map((value) => String(value || "").trim())
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b));
}

function generateDescriptionFromContent(content) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^#+\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_>~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.slice(0, 180).trim();
}

function buildFrontmatter(data) {
  const lines = [
    "---",
    `title: ${escapeYamlString(data.title)}`,
    `published: ${data.published}`,
    `description: ${escapeYamlString(data.description)}`,
  ];

  if (data.updated) lines.push(`updated: ${data.updated}`);
  if (data.image) lines.push(`image: ${escapeYamlString(data.image)}`);
  lines.push(`tags: [${data.tags.map((tag) => escapeYamlString(tag)).join(", ")}]`);
  lines.push(`category: ${escapeYamlString(data.category)}`);
  lines.push(`draft: ${data.draft}`);
  lines.push(`lang: ${escapeYamlString(data.lang)}`);
  lines.push(`pinned: ${data.pinned}`);
  if (data.author) lines.push(`author: ${escapeYamlString(data.author)}`);
  if (data.series) lines.push(`series: ${escapeYamlString(data.series)}`);
  if (data.sourceLink) lines.push(`sourceLink: ${escapeYamlString(data.sourceLink)}`);
  if (data.licenseName) lines.push(`licenseName: ${escapeYamlString(data.licenseName)}`);
  if (data.licenseUrl) lines.push(`licenseUrl: ${escapeYamlString(data.licenseUrl)}`);
  if (data.password) {
    lines.push("encrypted: true");
    lines.push(`password: ${escapeYamlString(data.password)}`);
  }
  lines.push("---", "");
  return lines.join("\n");
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return stripQuotes(trimmed);
    }
  }
  return trimmed;
}

function parseArray(value) {
  const inner = value.trim().slice(1, -1).trim();
  if (!inner) return [];

  return inner
    .split(",")
    .map((item) => parseScalar(item))
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function parseFrontmatter(raw) {
  if (!raw.startsWith("---\n") && !raw.startsWith("---\r\n")) {
    return { data: {}, content: raw };
  }

  const normalized = raw.replace(/\r\n/g, "\n");
  const endIndex = normalized.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatter = normalized.slice(4, endIndex).split("\n");
  const content = normalized.slice(endIndex + 5);
  const data = {};

  for (const line of frontmatter) {
    if (!line.trim() || !line.includes(":")) continue;
    const separatorIndex = line.indexOf(":");
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = parseArray(value);
      continue;
    }

    data[key] = parseScalar(value);
  }

  return { data, content };
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function readBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readTaxonomy() {
  if (!(await pathExists(TAXONOMY_PATH))) {
    return { categories: [], tags: [] };
  }

  const raw = await fs.readFile(TAXONOMY_PATH, "utf8");
  const parsed = JSON.parse(raw);
  return {
    categories: Array.isArray(parsed.categories) ? parsed.categories.map(String) : [],
    tags: Array.isArray(parsed.tags) ? parsed.tags.map(String) : [],
  };
}

async function saveTaxonomy(data) {
  const normalized = {
    categories: normalizeUniqueStrings(data.categories || []),
    tags: normalizeUniqueStrings(data.tags || []),
  };
  await fs.writeFile(TAXONOMY_PATH, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}

async function syncTaxonomyFromPost(postData) {
  const taxonomy = await readTaxonomy();
  if (postData.category) {
    taxonomy.categories.push(postData.category);
  }
  taxonomy.tags.push(...postData.tags);
  return saveTaxonomy(taxonomy);
}

async function listPostEntries() {
  const entries = await fs.readdir(POSTS_DIR, { withFileTypes: true });
  const posts = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const indexPath = path.join(POSTS_DIR, entry.name, "index.md");
      if (await pathExists(indexPath)) {
        posts.push({
          slug: entry.name,
          storageType: "directory",
          path: indexPath,
          directory: path.join(POSTS_DIR, entry.name),
        });
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      const slug = entry.name.replace(/\.md$/i, "");
      posts.push({
        slug,
        storageType: "file",
        path: path.join(POSTS_DIR, entry.name),
        directory: POSTS_DIR,
      });
    }
  }

  return posts.sort((a, b) => a.slug.localeCompare(b.slug));
}

async function findPostEntry(slug) {
  const normalizedSlug = slugify(slug);
  if (!normalizedSlug) return null;

  const directoryPath = path.join(POSTS_DIR, normalizedSlug, "index.md");
  if (await pathExists(directoryPath)) {
    return {
      slug: normalizedSlug,
      storageType: "directory",
      path: directoryPath,
      directory: path.join(POSTS_DIR, normalizedSlug),
    };
  }

  const filePath = path.join(POSTS_DIR, `${normalizedSlug}.md`);
  if (await pathExists(filePath)) {
    return {
      slug: normalizedSlug,
      storageType: "file",
      path: filePath,
      directory: POSTS_DIR,
    };
  }

  return null;
}

async function readPostBySlug(slug) {
  const entry = await findPostEntry(slug);
  if (!entry) return null;

  const raw = await fs.readFile(entry.path, "utf8");
  const parsed = parseFrontmatter(raw);
  const data = parsed.data || {};

  return {
    slug: entry.slug,
    storageType: entry.storageType,
    path: entry.path,
    relativePath: path.relative(process.cwd(), entry.path).replace(/\\/g, "/"),
    title: String(data.title || entry.slug),
    description: String(data.description || ""),
    published: String(data.published || ""),
    updated: String(data.updated || ""),
    image: String(data.image || ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: String(data.category || ""),
    draft: Boolean(data.draft),
    lang: String(data.lang || "id"),
    pinned: Boolean(data.pinned),
    author: String(data.author || ""),
    series: String(data.series || ""),
    sourceLink: String(data.sourceLink || ""),
    licenseName: String(data.licenseName || ""),
    licenseUrl: String(data.licenseUrl || ""),
    password: String(data.password || ""),
    content: parsed.content.trim(),
  };
}

async function listPosts() {
  const entries = await listPostEntries();
  const posts = [];

  for (const entry of entries) {
    const raw = await fs.readFile(entry.path, "utf8");
    const parsed = parseFrontmatter(raw);
    posts.push({
      slug: entry.slug,
      storageType: entry.storageType,
      title: String(parsed.data.title || entry.slug),
      published: String(parsed.data.published || ""),
      updated: String(parsed.data.updated || ""),
      draft: Boolean(parsed.data.draft),
      lang: String(parsed.data.lang || "id"),
      category: String(parsed.data.category || ""),
      relativePath: path.relative(process.cwd(), entry.path).replace(/\\/g, "/"),
    });
  }

  posts.sort((a, b) => {
    const aDate = a.published || "";
    const bDate = b.published || "";
    return bDate.localeCompare(aDate) || a.slug.localeCompare(b.slug);
  });

  return posts;
}

function getTargetPaths(slug) {
  const normalizedSlug = slugify(slug);
  const targetDir = path.join(POSTS_DIR, normalizedSlug);
  return {
    slug: normalizedSlug,
    directory: targetDir,
    filePath: path.join(targetDir, "index.md"),
  };
}

async function parsePostPayload(request) {
  const body = await readBody(request);
  const formRequest = new Request(`http://${HOST}:${PORT}${request.url}`, {
    method: request.method,
    headers: request.headers,
    body,
    duplex: "half",
  });
  const formData = await formRequest.formData();

  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const published = String(formData.get("published") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const slug = slugify(rawSlug || title);
  const originalSlug = slugify(String(formData.get("originalSlug") || "").trim());

  return {
    formData,
    data: {
      title,
      description:
        String(formData.get("description") || "").trim() ||
        generateDescriptionFromContent(content),
      content,
      published,
      updated: "",
      slug,
      originalSlug,
      image: String(formData.get("image") || "").trim(),
      tags: parseTags(String(formData.get("tags") || "")),
      category: String(formData.get("category") || "").trim(),
      draft: parseBoolean(formData.get("draft")),
      lang: "id",
      pinned: parseBoolean(formData.get("pinned")),
      author: "NgetehNology",
      series: "",
      sourceLink: "",
      licenseName: "",
      licenseUrl: "",
      password: "",
    },
  };
}

async function maybeWriteCoverFile(formData, targetDirectory) {
  const coverFile = formData.get("coverFile");
  if (!(coverFile instanceof File) || coverFile.size <= 0) {
    return "";
  }

  const safeName = path.basename(coverFile.name).replace(/\s+/g, "-");
  const coverPath = path.join(targetDirectory, safeName);
  const buffer = Buffer.from(await coverFile.arrayBuffer());
  await fs.writeFile(coverPath, buffer);
  return `./${safeName}`;
}

function buildMarkdown(post) {
  return `${buildFrontmatter(post)}${post.content}\n`;
}

async function handleCreatePost(request, response) {
  const { formData, data } = await parsePostPayload(request);

  if (!data.title) {
    return json(response, 400, { error: "Judul wajib diisi." });
  }
  if (!data.content) {
    return json(response, 400, { error: "Isi artikel wajib diisi." });
  }
  if (!data.published) {
    return json(response, 400, { error: "Tanggal publish wajib diisi." });
  }
  if (!data.slug) {
    return json(response, 400, {
      error: "Slug tidak valid. Gunakan huruf, angka, dan tanda hubung.",
    });
  }

  if (await findPostEntry(data.slug)) {
    return json(response, 409, { error: `Slug "${data.slug}" sudah dipakai.` });
  }

  const target = getTargetPaths(data.slug);
  await fs.mkdir(target.directory, { recursive: true });

  const uploadedImage = await maybeWriteCoverFile(formData, target.directory);
  if (uploadedImage) {
    data.image = uploadedImage;
  }

  await fs.writeFile(target.filePath, buildMarkdown(data), "utf8");
  await syncTaxonomyFromPost(data);

  return json(response, 200, {
    ok: true,
    mode: "create",
    slug: data.slug,
    path: path.relative(process.cwd(), target.filePath).replace(/\\/g, "/"),
  });
}

async function handleUpdatePost(request, response) {
  const { formData, data } = await parsePostPayload(request);
  const currentSlug = data.originalSlug || data.slug;

  if (!currentSlug) {
    return json(response, 400, { error: "Slug post lama tidak ditemukan." });
  }

  const existing = await findPostEntry(currentSlug);
  if (!existing) {
    return json(response, 404, { error: `Post "${currentSlug}" tidak ditemukan.` });
  }

  if (!data.title) {
    return json(response, 400, { error: "Judul wajib diisi." });
  }
  if (!data.content) {
    return json(response, 400, { error: "Isi artikel wajib diisi." });
  }
  if (!data.published) {
    return json(response, 400, { error: "Tanggal publish wajib diisi." });
  }
  if (!data.slug) {
    return json(response, 400, { error: "Slug baru tidak valid." });
  }

  if (data.slug !== currentSlug) {
    const conflicting = await findPostEntry(data.slug);
    if (conflicting) {
      return json(response, 409, { error: `Slug "${data.slug}" sudah dipakai.` });
    }
  }

  const nextTarget = getTargetPaths(data.slug);
  await fs.mkdir(nextTarget.directory, { recursive: true });

  const uploadedImage = await maybeWriteCoverFile(formData, nextTarget.directory);
  if (uploadedImage) {
    data.image = uploadedImage;
  }

  await fs.writeFile(nextTarget.filePath, buildMarkdown(data), "utf8");
  await syncTaxonomyFromPost(data);

  if (existing.path !== nextTarget.filePath) {
    if (existing.storageType === "directory") {
      await fs.rm(existing.directory, { recursive: true, force: true });
    } else {
      await fs.rm(existing.path, { force: true });
    }
  }

  return json(response, 200, {
    ok: true,
    mode: "update",
    slug: data.slug,
    path: path.relative(process.cwd(), nextTarget.filePath).replace(/\\/g, "/"),
  });
}

async function handleDeletePost(request, response, url) {
  let slug = url.searchParams.get("slug") || "";

  if (!slug && request.headers["content-type"]?.includes("application/json")) {
    const body = JSON.parse((await readBody(request)).toString("utf8"));
    slug = String(body.slug || "");
  }

  const existing = await findPostEntry(slug);
  if (!existing) {
    return json(response, 404, { error: `Post "${slug}" tidak ditemukan.` });
  }

  if (existing.storageType === "directory") {
    await fs.rm(existing.directory, { recursive: true, force: true });
  } else {
    await fs.rm(existing.path, { force: true });
  }

  return json(response, 200, { ok: true, slug: existing.slug });
}

const sectionMap = {
  site: path.join(process.cwd(), "src", "data", "site-metadata.json"),
  siteSettings: path.join(process.cwd(), "src", "data", "site-settings.json"),
  wallpaper: path.join(process.cwd(), "src", "data", "wallpaper.json"),
  fontConfig: path.join(process.cwd(), "src", "data", "font-config.json"),
  expressiveCode: path.join(process.cwd(), "src", "data", "expressive-code.json"),
  sakura: path.join(process.cwd(), "src", "data", "sakura.json"),
  profile: path.join(process.cwd(), "src", "data", "profile.json"),
  announcement: path.join(process.cwd(), "src", "data", "announcement.json"),
  comment: path.join(process.cwd(), "src", "data", "comment.json"),
  license: path.join(process.cwd(), "src", "data", "license.json"),
  footer: path.join(process.cwd(), "src", "data", "footer.json"),
  musicPlayer: path.join(process.cwd(), "src", "data", "music-player.json"),
  friends: path.join(process.cwd(), "src", "data", "friends.json"),
  postTaxonomy: TAXONOMY_PATH,
  navbarLinks: path.join(process.cwd(), "src", "data", "navbar-links.json"),
  sidebarLayout: path.join(process.cwd(), "src", "data", "sidebar-layout.json"),
  aboutPage: path.join(process.cwd(), "src", "content", "spec", "about.md"),
  friendsPage: path.join(process.cwd(), "src", "content", "spec", "friends.md"),
};

function validateConfigPayload(section, value) {
  if (section === "aboutPage" || section === "friendsPage") {
    if (typeof value !== "string") {
      throw new Error(`Format ${section} harus string markdown.`);
    }
    return;
  }

  if (section === "friends" || section === "navbarLinks") {
    if (!Array.isArray(value)) {
      throw new Error(`Format ${section} harus array.`);
    }
    return;
  }

  if (section === "postTaxonomy") {
    if (!isRecord(value)) {
      throw new Error("Format postTaxonomy harus object.");
    }
    if (!Array.isArray(value.categories) || !Array.isArray(value.tags)) {
      throw new Error("postTaxonomy harus memiliki array categories dan tags.");
    }
    return;
  }

  if (!isRecord(value)) {
    throw new Error(`Format ${section} harus object.`);
  }
}

async function handleSaveConfig(request, response) {
  const bodyBuffer = await readBody(request);
  const rawBody = bodyBuffer.toString("utf8");
  const body = JSON.parse(rawBody);
  const section = body.section;
  const value = body.value;

  if (!(section in sectionMap)) {
    return json(response, 400, { error: "Section tidak dikenal." });
  }

  validateConfigPayload(section, value);

  if (section === "aboutPage" || section === "friendsPage") {
    await fs.writeFile(sectionMap[section], `${value.trim()}\n`, "utf8");
  } else {
    await fs.writeFile(sectionMap[section], `${JSON.stringify(value, null, 2)}\n`, "utf8");
  }

  return json(response, 200, { ok: true, section });
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`);

    if (request.method === "GET" && url.pathname === "/api/studio/health/") {
      return json(response, 200, { ok: true, service: "studio-file-server" });
    }

    if (request.method === "GET" && (url.pathname === "/api/studio/posts/" || url.pathname === "/api/studio/posts")) {
      return json(response, 200, { ok: true, items: await listPosts() });
    }

    if (request.method === "GET" && (url.pathname === "/api/studio/post/" || url.pathname === "/api/studio/post")) {
      const slug = String(url.searchParams.get("slug") || "").trim();
      const post = await readPostBySlug(slug);
      if (!post) {
        return json(response, 404, { error: `Post "${slug}" tidak ditemukan.` });
      }
      return json(response, 200, { ok: true, item: post });
    }

    if (request.method === "POST" && (url.pathname === "/api/studio/post/" || url.pathname === "/api/studio/post")) {
      return await handleCreatePost(request, response);
    }

    if (request.method === "POST" && (url.pathname === "/api/studio/post/update/" || url.pathname === "/api/studio/post/update")) {
      return await handleUpdatePost(request, response);
    }

    if ((request.method === "DELETE" || request.method === "POST") && (url.pathname === "/api/studio/post/delete/" || url.pathname === "/api/studio/post/delete")) {
      return await handleDeletePost(request, response, url);
    }

    if (request.method === "POST" && (url.pathname === "/api/studio/config/" || url.pathname === "/api/studio/config")) {
      return await handleSaveConfig(request, response);
    }

    return json(response, 404, { error: "Route tidak ditemukan." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Studio server error.";
    return json(response, 500, { error: message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[studio-file-server] running at http://${HOST}:${PORT}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
