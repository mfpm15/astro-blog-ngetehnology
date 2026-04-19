# Panduan Menulis Postingan NgetehNology

Dokumen ini menggantikan alur lama yang terlalu manual. Sekarang alur utama penulisan post menggunakan headless CMS di browser lewat `/admin/`, tetap file-based, dan tetap mengikuti struktur konten Firefly di `src/content/posts/`.

## Alur Kerja Yang Dipakai

1. Jalankan dev server:
   ```bash
   pnpm dev
   ```
2. Buka CMS lokal:
   ```text
   http://127.0.0.1:4321/admin/
   ```
3. Isi form post baru langsung di browser.
4. CMS akan membuat folder post:
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

Contoh hasil CMS:

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

Kalau gambar lokal sudah ada di komputer, upload langsung dari form CMS agar file disalin otomatis.

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

## Pengelolaan Konten dan Settings Melalui `/admin`

CMS saat ini menangani:

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

- `/studio` sudah dipensiunkan dan dialihkan ke `/admin/`.
- Konten tetap tersimpan sebagai file di repo agar mudah di-review, di-versioning, dan stabil saat build.
- Untuk deploy Netlify, aktifkan Netlify Identity + Git Gateway agar CMS bisa menulis ke GitHub.
- Setelah mengubah settings atau membuat post baru, biasakan jalankan `pnpm build`.
