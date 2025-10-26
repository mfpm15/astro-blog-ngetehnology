# NgetehNology Blog

Ini adalah repositori untuk blog NgetehNology, sebuah blog yang didedikasikan untuk keamanan siber dan teknologi. Proyek ini menggunakan template [Firefly](https://github.com/CuteLeaf/Firefly) sebagai dasarnya.

---

## ✨ Fitur Utama (dari Template Asli)

⚡ **Pembuatan Situs Statis**: Dibangun dengan [Astro](https://astro.build/) untuk kecepatan muat super cepat dan SEO yang optimal.

🎨 **Desain Modern**: Antarmuka yang bersih dan indah dengan dukungan kustomisasi warna tema.

📱 **Ramah Seluler**: Pengalaman responsif yang sempurna, dengan optimisasi khusus untuk perangkat seluler.

🔧 **Sangat Dapat Dikonfigurasi**: Sebagian besar modul fungsional dapat disesuaikan melalui file konfigurasi di `src/config/`.

## 🚀 Memulai Proyek Secara Lokal

### Prasyarat

- Node.js versi 22 atau lebih rendah
- pnpm versi 9 atau lebih rendah

### Menjalankan di Komputer Lokal

1.  **Clone Repositori (jika memulai dari awal):**
    ```bash
    git clone https://github.com/mfpm15/astro-blog-ngetehnology.git
    cd astro-blog-ngetehnology
    ```

2.  **Instal Dependensi:**
    ```bash
    # Jika pnpm belum terinstal, instal terlebih dahulu
    npm install -g pnpm
    
    # Instal dependensi proyek
    pnpm install
    ```

3.  **Jalankan Server Pengembangan:**
    ```bash
    pnpm dev
    ```
    Blog akan tersedia di `http://localhost:4321`.

### Mengelola Konten

- **Secara Lokal**: Buat file Markdown baru di dalam direktori `src/content/posts/`.
- **Menggunakan Dashboard**: Akses dashboard admin di `http://localhost:4321/admin/` untuk membuat dan mengedit postingan (memerlukan konfigurasi Netlify Identity saat di-deploy).

## 🧞 Perintah yang Tersedia

| Perintah | Aksi |
|:---------------------------|:---------------------------------------------------|
| `pnpm install` | Menginstal dependensi proyek |
| `pnpm dev` | Menjalankan server pengembangan lokal di `localhost:4321` |
| `pnpm build` | Mem-build situs untuk produksi ke direktori `./dist/` |
| `pnpm preview` | Menjalankan pratinjau lokal dari situs yang sudah di-build |
| `pnpm new-post <filename>` | Membuat file postingan baru (secara lokal) |

## 📄 Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file [LICENSE](../LICENSE) untuk detailnya.