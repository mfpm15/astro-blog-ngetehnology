---
title: Panduan Sederhana Firefly
published: 2025-10-11
pinned: true
description: "Cara menggunakan template blog Firefly."
image: "./cover.webp"
tags: ["Firefly", "Blog", "Markdown", "Panduan"]
category: Panduan Blog
draft: false
---



Template blog ini dibangun menggunakan [Astro](https://astro.build/). Untuk hal-hal yang tidak disebutkan dalam panduan ini, Anda dapat menemukan jawabannya di [dokumentasi Astro](https://docs.astro.build/).

## Front-matter Artikel

```yaml
---
title: Artikel Blog Pertama Saya
published: 2023-09-09
description: Ini adalah artikel pertama di blog Astro saya yang baru.
image: ./cover.jpg
tags: [Frontend, Development]
category: Pengembangan Frontend
draft: false
---
```




| Properti      | Deskripsi                                                                                                                                                                                 |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | Judul artikel.                                                                                                                                                                           |
| `published`   | Tanggal publikasi artikel.                                                                                                                                                               |
| `pinned`      | Apakah artikel ini disematkan di bagian atas daftar artikel.                                                                                                                            |
| `description` | Deskripsi singkat artikel. Ditampilkan di halaman beranda.                                                                                                                              |
| `image`       | Path gambar cover artikel.<br/>1. Dimulai dengan `http://` atau `https://`: Gunakan gambar dari web<br/>2. Dimulai dengan `/`: Gambar di direktori `public`<br/>3. Tanpa prefix: Path relatif terhadap file markdown |
| `tags`        | Tag artikel.                                                                                                                                                                             |
| `category`    | Kategori artikel.                                                                                                                                                                        |
| `licenseName` | Nama lisensi konten artikel.                                                                                                                                                             |
| `author`      | Penulis artikel.                                                                                                                                                                         |
| `sourceLink`  | Link sumber atau referensi konten artikel.                                                                                                                                               |
| `draft`       | Jika artikel masih draft, tidak akan ditampilkan.                                                                                                                                        |
| `slug`        | Kustomisasi path URL artikel. Jika tidak diatur, nama file akan digunakan sebagai URL.                                                                                                   |

## Lokasi File Artikel

File artikel Anda harus ditempatkan di direktori `src/content/posts/`. Anda juga dapat membuat subdirektori untuk mengorganisir artikel dan resource dengan lebih baik.

```
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```

## Kustomisasi URL Artikel (Slug)

### Apa itu Slug?

Slug adalah bagian kustom dari path URL artikel. Jika slug tidak diatur, sistem akan menggunakan nama file sebagai URL.

### Contoh Penggunaan Slug

#### Contoh 1: Menggunakan Nama File sebagai URL
```yaml
---
title: Artikel Blog Pertama Saya
published: 2023-09-09
---
```
File: `src/content/posts/my-first-blog-post.md`
URL: `/posts/my-first-blog-post`

#### Contoh 2: Slug Kustom
```yaml
---
title: Artikel Blog Pertama Saya
published: 2023-09-09
slug: hello-world
---
```
File: `src/content/posts/my-first-blog-post.md`
URL: `/posts/hello-world`

#### Contoh 3: Judul Bahasa Indonesia dengan Slug Bahasa Inggris
```yaml
---
title: Cara Menggunakan Tema Blog Firefly
published: 2023-09-09
slug: how-to-use-firefly-blog-theme
---
```
File: `src/content/posts/firefly-guide.md`
URL: `/posts/how-to-use-firefly-blog-theme`

### Rekomendasi Penggunaan Slug

1. **Gunakan bahasa Inggris dan tanda hubung**: `my-awesome-post` bukan `my awesome post`
2. **Tetap singkat**: Hindari slug yang terlalu panjang
3. **Deskriptif**: Buat URL yang mencerminkan konten artikel
4. **Hindari karakter khusus**: Hanya gunakan huruf, angka, dan tanda hubung
5. **Konsistensi**: Gunakan pola penamaan yang sama di seluruh blog

### Catatan Penting

- Setelah slug ditetapkan dan dipublikasikan, disarankan untuk tidak mengubahnya secara sembarangan, agar tidak mempengaruhi SEO dan link yang sudah ada
- Jika beberapa artikel menggunakan slug yang sama, artikel berikutnya akan menimpa yang sebelumnya
- Slug akan otomatis dikonversi ke huruf kecil
