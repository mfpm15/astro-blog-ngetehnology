# NgetehNology Blog

Repo ini adalah blog NgetehNology berbasis Firefly dan Astro. Fokus pengembangan saat ini adalah fondasi yang rapi: konfigurasi yang makin data-driven, authoring berbasis headless CMS di `/admin/`, dan build yang stabil di Astro 6.

## Stack

- Astro 6
- Firefly theme base
- Tailwind CSS
- Svelte components
- Astro Content Collections

## Prasyarat

- Node.js 22 atau lebih baru
- pnpm 9

## Menjalankan Secara Lokal

```bash
pnpm install
pnpm dev
```

Server pengembangan akan tersedia di `http://127.0.0.1:4321`.

## Build

```bash
pnpm build
```

## Workflow Konten

Pembuatan post dan pengelolaan konfigurasi sekarang dipusatkan di `/admin/`.

Jalankan:

```bash
pnpm dev
```

Lalu buka CMS:

```text
http://127.0.0.1:4321/admin/
```

CMS saat ini menangani:

- pembuatan post baru langsung ke `src/content/posts/<slug>/index.md`
- metadata situs
- wallpaper
- profile
- announcement
- friend links
- sidebar layout
- halaman `about`
- halaman `friends`

## AI Agent Sync

Repo ini sekarang punya source-of-truth AI instructions di `.agents/`.

Workflow ini sengaja dibuat manual agar tidak mengganggu Netlify build atau setup lokal:

```bash
pnpm run agents:check
pnpm run agents:check:symlinks
pnpm run agents:apply
pnpm run agents:export
```

Catatan:

- setup ini sengaja tidak mengelola `.claude/` karena folder itu dianggap milik tooling lokal pengguna
- target utama yang aman untuk disinkronkan adalah `AGENTS.md`, `.codex/`, `.github/copilot-instructions.md`, dan `GEMINI.md`
- pada Windows, pembuatan symlink bisa membutuhkan Developer Mode atau shell dengan izin yang sesuai
- jika symlink Windows tidak tersedia, gunakan `pnpm run agents:export` untuk menghasilkan file copy-based yang setara
- `pnpm run agents:check` menerima dua mode: symlink AgentSync atau fallback copy export
- `pnpm run agents:check:symlinks` khusus untuk mengecek status symlink AgentSync murni

## Lokasi Konten Penting

- post blog: `src/content/posts/`
- halaman about: `src/content/spec/about.md`
- halaman friends: `src/content/spec/friends.md`
- metadata situs: `src/data/site-metadata.json`
- wallpaper: `src/data/wallpaper.json`
- profile: `src/data/profile.json`
- announcement: `src/data/announcement.json`
- friend links: `src/data/friends.json`
- sidebar layout: `src/data/sidebar-layout.json`

## Perintah Yang Tersedia

| Perintah | Aksi |
| --- | --- |
| `pnpm dev` | Menjalankan server pengembangan |
| `pnpm build` | Build produksi + index search |
| `pnpm preview` | Menjalankan hasil build secara lokal |
| `pnpm check` | Validasi Astro / TypeScript |
| `pnpm run new-post` | Menampilkan pengarah ke `/admin/` |

## Referensi

- Firefly docs: https://docs-firefly.cuteleaf.cn/en/guide/getting-started.html
- Astro: https://astro.build/
- Upgrade guide Astro 6: https://docs.astro.build/en/guides/upgrade-to/v6/
