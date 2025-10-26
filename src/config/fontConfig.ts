// Konfigurasi Font
export const fontConfig = {
  enable: true, // Aktifkan fitur font kustom
  preload: true, // Pramuat file font untuk meningkatkan kinerja
  selected: ["system"], // Font yang saat ini dipilih, mendukung beberapa kombinasi font
  fonts: {
    // Font Sistem
    system: {
      id: "system",
      name: "Font Sistem",
      src: "", // Font sistem tidak memerlukan src
      family:
        "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
    },
    // Google Fonts - Zen Maru Gothic
    "zen-maru-gothic": {
      id: "zen-maru-gothic",
      name: "Zen Maru Gothic",
      src: "https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@300;400;500;700;900&display=swap",
      family: "Zen Maru Gothic",
      display: "swap" as const,
    },
    // Google Fonts - Inter
    inter: {
      id: "inter",
      name: "Inter",
      src: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      family: "Inter",
      display: "swap" as const,
    },
    // Font Xiaomi - MiSans Normal
    "misans-normal": {
      id: "misans-normal",
      name: "MiSans Normal",
      src: "https://unpkg.com/misans@4.1.0/lib/Normal/MiSans-Normal.min.css",
      family: "MiSans",
      weight: 400,
      display: "swap" as const,
    },
    // Font Xiaomi - MiSans Semibold
    "misans-semibold": {
      id: "misans-semibold",
      name: "MiSans Semibold",
      src: "https://unpkg.com/misans@4.1.0/lib/Normal/MiSans-Semibold.min.css",
      family: "MiSans",
      weight: 600,
      display: "swap" as const,
    },
  },
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ], // Cadangan font global
};