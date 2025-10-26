import type { SiteConfig } from "../types/config";
import { fontConfig } from "./fontConfig";

// Tentukan bahasa situs
const SITE_LANG = "id"; // Kode bahasa, misalnya: 'en', 'id', 'ja', dll.

export const siteConfig: SiteConfig = {
  title: "NgetehNology",
  subtitle: "Panduan Keamanan Siber untuk Pemula",
  description:
    "NgetehNology adalah sebuah blog yang membahas tentang keamanan siber, teknologi, dan tutorial untuk pemula.",
  keywords: [
    "NgetehNology",
    "Keamanan Siber",
    "Teknologi",
    "Tutorial",
    "Blog",
  ],

  lang: SITE_LANG,

  themeColor: {
    hue: 250, // Rona default warna tema, rentang dari 0 hingga 360. Misalnya: merah: 0, sian: 200, biru-hijau: 250, pink: 345
    fixed: false, // Sembunyikan pemilih warna tema untuk pengunjung
    defaultMode: "system", // Mode default: "light" terang, "dark" gelap, "system" mengikuti sistem
  },

  favicon: [
    // Biarkan kosong untuk menggunakan favicon default
    {
      src: "/assets/images/favicon.ico", // Path file ikon
      theme: "light", // Opsional, tentukan tema 'light' | 'dark'
      sizes: "32x32", // Opsional, ukuran ikon
    },
  ],

  // Logo Situs
  // logoIcon mendukung tiga jenis: pustaka ikon Astro, gambar lokal, gambar jaringan
  // { type: "icon", value: "material-symbols:home-pin-outline" }
  // { type: "image", value: "/assets/images/logo.webp", alt: "Logo Firefly" }
  // { type: "image", value: "https://example.com/logo.png", alt: "Logo Firefly" }
  logoIcon: {
    type: "image",
    value: "/assets/images/LiuYingPure3.svg",
    alt: "🍀",
  },

  // Konfigurasi Bangumi (pelacakan anime)
  bangumi: {
    userId: "1163581", // Atur ID Pengguna Bangumi Anda di sini
  },

  // Saklar kartu "Terakhir Diedit" di bagian bawah halaman artikel
  showLastModified: true,

  // Fitur gambar OpenGraph, perhatikan bahwa rendering akan memakan waktu lama setelah diaktifkan, tidak disarankan untuk mengaktifkannya saat debugging lokal
  generateOgImages: false,

  // Konfigurasi sakelar halaman - mengontrol akses ke halaman tertentu
  pages: {
    anime: true, // Sakelar halaman anime, jika false, mengakses /anime/ akan mengembalikan 404
    projects: true, // Sakelar halaman proyek, jika false, mengakses /projects/ akan mengembalikan 404
    timeline: true, // Sakelar halaman linimasa, jika false, mengakses /timeline/ akan mengembalikan 404
    skills: true, // Sakelar halaman keahlian, jika false, mengakses /skills/ akan mengembalikan 404
  },

  // Konfigurasi tata letak daftar postingan
  postListLayout: {
    // Mode tata letak default: "list" mode daftar (tata letak satu kolom), "grid" mode petak (tata letak dua kolom)
    defaultMode: "list",
    // Apakah mengizinkan pengguna untuk beralih tata letak
    allowSwitch: true,
  },

  // Konfigurasi paginasi
  pagination: {
    // Jumlah postingan yang ditampilkan per halaman
    postsPerPage: 8,
  },

  backgroundWallpaper: {
    // Apakah akan mengaktifkan fitur wallpaper latar belakang
    enable: true,
    // Mode wallpaper: "banner" mode wallpaper Banner, "overlay" mode lapisan transparan layar penuh
    mode: "banner",

    // Konfigurasi gambar latar belakang
    src: {
      // Gambar latar belakang desktop
      desktop: "/assets/images/d1.webp",
      // Gambar latar belakang seluler
      mobile: "/assets/images/m1.webp",
    },

    // Posisi gambar
    // Mendukung semua nilai CSS object-position, seperti: 'top', 'center', 'bottom', 'left top', 'right bottom', '25% 75%', '10px 20px'..
    // Jika Anda tidak tahu cara mengkonfigurasi persentase, dll., disarankan untuk langsung menggunakan: 'center' tengah, 'top' tengah atas, 'bottom' tengah bawah, 'left' tengah kiri, 'right' tengah kanan
    position: "0% 20%",

    // Konfigurasi khusus mode Banner
    banner: {
      homeText: {
        // Tampilkan teks kustom di beranda (sakelar global)
        enable: true,
        // Judul utama spanduk beranda
        title: "NgetehNology",
        // Subjudul spanduk beranda
        subtitle: [
          "Belajar Keamanan Siber Sambil Ngeteh",
          "Dari Pemula Hingga Mahir",
        ],
        typewriter: {
          enable: true, // Aktifkan efek mesin tik subjudul
          speed: 100, // Kecepatan mengetik (ms)
          deleteSpeed: 50, // Kecepatan menghapus (ms)
          pauseTime: 2000, // Waktu jeda setelah ditampilkan sepenuhnya (ms)
        },
      },
      credit: {
        enable: {
          desktop: true, // Tampilkan teks sumber gambar spanduk di desktop
          mobile: false, // Tampilkan teks sumber gambar spanduk di seluler
        },
        text: {
          desktop: "Source", // Teks sumber yang akan ditampilkan di desktop
          mobile: "Mobile Credit", // Teks sumber yang akan ditampilkan di seluler
        },
        url: {
          desktop: "#", // URL tautan ke karya seni asli atau halaman artis di desktop
          mobile: "", // URL tautan ke karya seni asli atau halaman artis di seluler
        },
      },
      navbar: {
        transparentMode: "semifull", // Mode transparan bilah navigasi: "semi" semi-transparan dengan sudut membulat, "full" sepenuhnya transparan, "semifull" transparan dinamis
      },
      waves: {
        enable: {
          desktop: true, // Aktifkan efek animasi gelombang di desktop
          mobile: true, // Aktifkan efek animasi gelombang di seluler
        },
      },
    },

    // Konfigurasi khusus mode lapisan transparan layar penuh
    overlay: {
      zIndex: -1, // z-index, pastikan wallpaper berada di lapisan latar belakang
      opacity: 0.8, // Opasitas wallpaper
      blur: 1, // Tingkat keburaman latar belakang
    },
  },

  // Fitur Daftar Isi
  toc: {
    // Saklar fitur daftar isi
    enable: true,
    // Kedalaman daftar isi, 1-3, 1 berarti hanya menampilkan judul h1, 2 berarti menampilkan judul h1 dan h2, dan seterusnya
    // depth sudah usang di versi baru
    depth: 3,
  },

  // Konfigurasi font
  // Konfigurasikan font spesifik di src/config/fontConfig.ts
  font: fontConfig,
};