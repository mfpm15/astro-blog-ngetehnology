import type { SakuraConfig } from "../types/config";

export const sakuraConfig: SakuraConfig = {
  enable: false, // Secara default, efek bunga sakura dinonaktifkan
  sakuraNum: 21, // Jumlah bunga sakura
  limitTimes: -1, // Batas berapa kali bunga sakura melewati batas, -1 untuk tak terbatas
  size: {
    min: 0.5, // Ukuran minimum kelipatan bunga sakura
    max: 1.1, // Ukuran maksimum kelipatan bunga sakura
  },
  opacity: {
    min: 0.3, // Opasitas minimum bunga sakura
    max: 0.9, // Opasitas maksimum bunga sakura
  },
  speed: {
    horizontal: {
      min: -1.7, // Kecepatan gerakan horizontal minimum
      max: -1.2, // Kecepatan gerakan horizontal maksimum
    },
    vertical: {
      min: 1.5, // Kecepatan gerakan vertikal minimum
      max: 2.2, // Kecepatan gerakan vertikal maksimum
    },
    rotation: 0.03, // Kecepatan rotasi
    fadeSpeed: 0.03, // Kecepatan menghilang, tidak boleh lebih besar dari opasitas minimum
  },
  zIndex: 100, // z-index, pastikan bunga sakura pada lapisan yang sesuai
};