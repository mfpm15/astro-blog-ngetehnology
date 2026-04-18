# Panduan Menulis Postingan NgetehNology

Dokumen ini menggantikan alur lama yang terlalu manual. Sekarang alur utama penulisan post menggunakan studio lokal di browser, tetap file-based, tanpa `/admin`, dan tetap mengikuti struktur konten Firefly di `src/content/posts/`.

## Alur Kerja Yang Dipakai

1. Jalankan dev server:
   ```bash
   pnpm dev
   ```
2. Buka studio lokal:
   ```text
   http://127.0.0.1:4321/studio/
   ```
3. Isi form post baru langsung di browser.
4. Studio akan membuat folder post:
   ```text
   src/content/posts/<slug>/index.md
   ```
5. Jika Anda upload cover lokal, file gambar akan disimpan ke folder post dan field `image` otomatis diisi.

## Struktur Post Yang Direkomendasikan

```text
src/content/posts/
└── nama-post/
    ├── index.md
    ├── cover.webp
    └── aset-lainnya
```

Pola folder ini lebih rapi untuk Firefly karena asset artikel bisa tinggal bersama post-nya.

## Frontmatter Yang Didukung Repo Ini

Field utama:

- `title`
- `published`
- `updated`
- `description`
- `image`
- `tags`
- `category`
- `draft`
- `lang`
- `pinned`
- `author`
- `series`
- `sourceLink`
- `licenseName`
- `licenseUrl`
- `password`

Contoh hasil studio:

```md
---
title: "Pengenalan SQL Injection"
published: 2026-04-18
description: "Memahami dasar SQL Injection untuk pemula."
image: "./cover.webp"
tags: ["Web Security", "Tutorial"]
category: "Keamanan Siber"
draft: false
lang: "id"
pinned: false
author: "NgetehNology"
---
```

## Menambahkan Gambar

Cara yang paling stabil:

- pakai gambar lokal di folder post, misalnya `./cover.webp`
- atau pakai URL publik bila memang tidak ingin menyimpan file di repo

Kalau gambar lokal sudah ada di komputer, upload langsung dari form studio agar file disalin otomatis.

## Menjalankan Preview

```bash
pnpm dev
```

Lalu buka `http://127.0.0.1:4321`.

## Verifikasi Sebelum Commit

```bash
pnpm build
```

Kalau build lolos, post siap di-commit.

## Pengelolaan Konten dan Settings Tanpa `/admin`

Studio lokal saat ini menangani:

- metadata situs
- wallpaper
- profile
- announcement
- friend links
- sidebar layout
- halaman `about`
- halaman `friends`

File yang dikelola:

- `src/data/site-metadata.json`
- `src/data/wallpaper.json`
- `src/data/profile.json`
- `src/data/announcement.json`
- `src/data/friends.json`
- `src/data/sidebar-layout.json`
- `src/content/spec/about.md`
- `src/content/spec/friends.md`

## Catatan Penting

- `/admin` tidak lagi menjadi alur kerja utama.
- Konten tetap tersimpan sebagai file di repo agar mudah di-review, di-versioning, dan stabil saat build.
- Endpoint tulis-file studio sengaja hanya aktif di mode development lokal.
- Setelah mengubah settings atau membuat post baru, biasakan jalankan `pnpm build`.
