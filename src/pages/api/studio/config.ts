import type { APIRoute } from "astro";
import fs from "node:fs/promises";
import path from "node:path";

export const prerender = false;

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
  postTaxonomy: path.join(process.cwd(), "src", "data", "post-taxonomy.json"),
  navbarLinks: path.join(process.cwd(), "src", "data", "navbar-links.json"),
  sidebarLayout: path.join(process.cwd(), "src", "data", "sidebar-layout.json"),
  aboutPage: path.join(process.cwd(), "src", "content", "spec", "about.md"),
  friendsPage: path.join(process.cwd(), "src", "content", "spec", "friends.md"),
} as const;

type Section = keyof typeof sectionMap;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validatePayload(section: Section, value: unknown) {
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

  if (
    section === "siteSettings" ||
    section === "wallpaper" ||
    section === "fontConfig" ||
    section === "expressiveCode" ||
    section === "sakura" ||
    section === "comment" ||
    section === "license" ||
    section === "footer" ||
    section === "musicPlayer" ||
    section === "sidebarLayout"
  ) {
    if (!isRecord(value)) {
      throw new Error(`Format ${section} harus object.`);
    }
    return;
  }

  if (!isRecord(value)) {
    throw new Error(`Format ${section} harus object.`);
  }
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
    const body = await request.json();
    const section = body.section as Section;
    const value = body.value;

    if (!(section in sectionMap)) {
      return new Response(JSON.stringify({ error: "Section tidak dikenal." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    validatePayload(section, value);
    if (section === "aboutPage" || section === "friendsPage") {
      await fs.writeFile(sectionMap[section], `${value.trim()}\n`, "utf8");
    } else {
      await fs.writeFile(sectionMap[section], `${JSON.stringify(value, null, 2)}\n`, "utf8");
    }

    return new Response(JSON.stringify({ ok: true, section }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal menyimpan konfigurasi.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
