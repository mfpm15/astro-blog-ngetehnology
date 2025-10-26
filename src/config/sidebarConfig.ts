import type { SidebarLayoutConfig } from "../types/config";

/**
 * Konfigurasi Tata Letak Sidebar
 * Digunakan untuk mengontrol tampilan, urutan, animasi, dan perilaku responsif komponen sidebar
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
  // Apakah akan mengaktifkan fitur sidebar
  enable: true,

  // Posisi sidebar: kiri atau kanan
  position: "left",

  // Daftar konfigurasi komponen sidebar
  components: [
    {
      // Jenis komponen: komponen profil pengguna
      type: "profile",
      // Apakah akan mengaktifkan komponen ini
      enable: true,
      // Urutan tampilan komponen (angka lebih kecil akan lebih dulu)
      order: 1,
      // Posisi komponen: "top" berarti tetap di atas
      position: "top",
      // Nama kelas CSS untuk menerapkan gaya dan animasi
      class: "onload-animation",
      // Waktu tunda animasi (ms), untuk efek animasi berurutan
      animationDelay: 0,
    },
    {
      // Jenis komponen: komponen pengumuman
      type: "announcement",
      // Apakah akan mengaktifkan komponen ini (sekarang dikontrol oleh konfigurasi terpadu)
      enable: true,
      // Urutan tampilan
      order: 2,
      // Posisi komponen: "top" berarti tetap di atas
      position: "top",
      // Nama kelas CSS
      class: "onload-animation",
      // Waktu tunda animasi
      animationDelay: 50,
    },
    {
      // Jenis komponen: komponen kategori
      type: "categories",
      // Apakah akan mengaktifkan komponen ini
      enable: true,
      // Urutan tampilan
      order: 3,
      // Posisi komponen: "sticky" berarti posisi lengket, dapat digulir
      position: "sticky",
      // Nama kelas CSS
      class: "onload-animation",
      // Waktu tunda animasi
      animationDelay: 150,
      // Konfigurasi responsif
      responsive: {
        // Ambang batas lipat: otomatis melipat jika jumlah kategori melebihi 5
        collapseThreshold: 5,
      },
    },
    {
      // Jenis komponen: komponen tag
      type: "tags",
      // Apakah akan mengaktifkan komponen ini
      enable: true,
      // Urutan tampilan
      order: 5,
      // Posisi komponen: "sticky" berarti posisi lengket
      position: "sticky",
      // Nama kelas CSS
      class: "onload-animation",
      // Waktu tunda animasi
      animationDelay: 250,
      // Konfigurasi responsif
      responsive: {
        // Ambang batas lipat: otomatis melipat jika jumlah tag melebihi 20
        collapseThreshold: 20,
      },
    },
    {
      // Jenis komponen: komponen iklan 1
      type: "advertisement",
      // Apakah akan mengaktifkan komponen ini
      enable: false,
      // Urutan tampilan
      order: 6,
      // Posisi komponen: "sticky" berarti posisi lengket
      position: "sticky",
      // Nama kelas CSS
      class: "onload-animation",
      // Waktu tunda animasi
      animationDelay: 300,
      // ID Konfigurasi: gunakan konfigurasi iklan pertama
      configId: "ad1",
    },
    {
      // Jenis komponen: komponen iklan 2
      type: "advertisement",
      // Apakah akan mengaktifkan komponen ini
      enable: false,
      // Urutan tampilan
      order: 7,
      // Posisi komponen: "sticky" berarti posisi lengket
      position: "sticky",
      // Nama kelas CSS
      class: "onload-animation",
      // Waktu tunda animasi
      animationDelay: 350,
      // ID Konfigurasi: gunakan konfigurasi iklan kedua
      configId: "ad2",
    },
  ],

  // Konfigurasi animasi default
  defaultAnimation: {
    // Apakah akan mengaktifkan animasi default
    enable: true,
    // Waktu tunda dasar (ms)
    baseDelay: 0,
    // Waktu tunda tambahan (ms), penambahan tunda untuk setiap komponen secara berurutan
    increment: 50,
  },

  // Konfigurasi tata letak responsif
  responsive: {
    // Konfigurasi breakpoint (nilai piksel)
    breakpoints: {
      // Breakpoint seluler: lebar layar kurang dari 768px
      mobile: 768,
      // Breakpoint tablet: lebar layar kurang dari 1024px
      tablet: 1024,
      // Breakpoint desktop: lebar layar kurang dari 1280px
      desktop: 1280,
    },
    // Mode tata letak untuk perangkat yang berbeda
    // hidden: tidak menampilkan sidebar (desktop)   drawer: mode laci (tidak ditampilkan di seluler)   sidebar: menampilkan sidebar
    layout: {
      // Seluler: mode sidebar
      mobile: "sidebar",
      // Tablet: menampilkan sidebar
      tablet: "sidebar",
      // Desktop: menampilkan sidebar
      desktop: "sidebar",
    },
  },
};