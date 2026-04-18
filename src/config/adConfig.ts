import type { AdConfig } from "../types/config";

// Konten iklan diatur di sini. Untuk menyalakan/mematikan widget,
// gunakan pengaturan komponen sidebar.

// Konfigurasi iklan 1 - banner gambar penuh tanpa padding
export const adConfig1: AdConfig = {
  image: {
    src: "/assets/images/d1.webp",
    alt: "Banner iklan",
    link: "#",
    external: true,
  },
  closable: true, // Bisa ditutup
  displayCount: -1,
  padding: {
    all: "0", // Tanpa padding agar gambar memenuhi komponen
    // all: "1rem", // Padding default
    // top: "0", // Tanpa padding bagian atas
    // right: "1rem", // Atur padding kanan
    // bottom: "1rem", // Atur padding bawah
    // left: "1rem", // Atur padding kiri
  },
};

// Konfigurasi iklan 2 - banner dukungan lengkap
export const adConfig2: AdConfig = {
  title: "Dukung Blog Ini",
  content:
    "Jika konten di situs ini membantu Anda, dukung pengembangannya. Dukungan Anda membantu kami terus menulis dan memperbarui konten.",
  image: {
    src: "/assets/images/d2.webp",
    alt: "Dukung blog ini",
    link: "about/",
    external: false,
  },
  link: {
    text: "Berikan Dukungan",
    url: "about/",
    external: false,
  },
  closable: true,
  displayCount: -1,
  padding: {
    // all: "1rem",
  },
};
