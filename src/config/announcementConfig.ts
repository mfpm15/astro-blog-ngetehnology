import type { AnnouncementConfig } from "../types/config";

export const announcementConfig: AnnouncementConfig = {
  title: "Pengumuman", // Judul pengumuman
  content: "Selamat datang di blog saya! Ini adalah contoh pengumuman.", // Isi pengumuman
  closable: true, // Izinkan pengguna untuk menutup pengumuman
  link: {
    enable: true, // Aktifkan tautan
    text: "Pelajari Lebih Lanjut", // Teks tautan
    url: "/about/", // URL tautan
    external: false, // Tautan internal
  },
};