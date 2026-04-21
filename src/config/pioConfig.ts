import type { SpineModelConfig, Live2DModelConfig } from "../types/config";

// Konfigurasi Karakter Spine
export const spineModelConfig: SpineModelConfig = {
  enable: true, // Enabled for the desktop recommendation assistant
  model: {
    // Path file model Spine (.json)
    path: "/pio/models/spine/firefly/1310.json",
    scale: 1.0, // Skala model
    x: 0, // Ofset X
    y: 0, // Ofset Y
  },
  position: {
    // Posisi tampilan: bottom-left, bottom-right, top-left, top-right. Catatan: di kanan bawah dapat menutupi tombol kembali ke atas
    corner: "bottom-left",
    offsetX: 0, // Jarak dari tepi kanan 0px
    offsetY: 0, // Jarak dari bawah 0px
  },
  size: {
    width: 135, // Lebar kontainer
    height: 165, // Tinggi kontainer
  },
  interactive: {
    enabled: true, // Aktifkan fitur interaktif
    clickAnimations: [
      "emoji_0",
      "emoji_1",
      "emoji_2",
      "emoji_3",
      "emoji_4",
      "emoji_5",
      "emoji_6",
    ], // Daftar animasi yang diputar secara acak saat diklik
    clickMessages: [
      "Need a fresh read?",
      "I can point you to something new.",
      "Try another post when you have a minute.",
      "Want a different article suggestion?",
      "There is always one more post to explore.",
      "Let me recommend something fun to read.",
    ], // Pesan teks yang ditampilkan secara acak saat diklik
    messageDisplayTime: 3000, // Waktu tampilan pesan (ms)
    idleAnimations: ["idle", "emoji_0", "emoji_1", "emoji_3", "emoji_4"], // Daftar animasi idle
    idleInterval: 8000, // Interval pergantian animasi idle (8 detik)
  },
  responsive: {
    hideOnMobile: true, // Sembunyikan di perangkat seluler
    mobileBreakpoint: 768, // Breakpoint seluler
  },
  zIndex: 1000, // z-index
  opacity: 1.0, // Opasitas penuh
};

// Konfigurasi Karakter Live2D
export const live2dModelConfig: Live2DModelConfig = {
  enable: false, // Aktifkan Karakter Live2D
  model: {
    // Path file model Live2D atau file model3.json
    path: "/pio/models/live2d/snow_miku/model.json",
    // path: "/pio/models/live2d/illyasviel/illyasviel.model.json",
  },
  position: {
    // Posisi tampilan: bottom-left, bottom-right, top-left, top-right. Catatan: di kanan bawah dapat menutupi tombol kembali ke atas
    corner: "bottom-left", // Posisi tampilan
    offsetX: 0, // Jarak dari tepi 20px
    offsetY: 0, // Jarak dari bawah 20px
  },
  size: {
    width: 135, // Lebar kontainer
    height: 165, // Tinggi kontainer
  },
  interactive: {
    enabled: true, // Aktifkan fitur interaktif
    // Gerakan dan ekspresi akan dibaca secara otomatis dari file JSON model
    clickMessages: [
      "Halo! Saya Miku~",
      "Ada yang bisa saya bantu?",
      "Cuaca hari ini bagus sekali!",
      "Mau main game bareng?",
      "Jangan lupa istirahat ya!",
    ], // Pesan teks yang ditampilkan secara acak saat diklik
    messageDisplayTime: 3000, // Waktu tampilan pesan (ms)
  },
  responsive: {
    hideOnMobile: true, // Sembunyikan di perangkat seluler
    mobileBreakpoint: 768, // Breakpoint seluler
  },
};
