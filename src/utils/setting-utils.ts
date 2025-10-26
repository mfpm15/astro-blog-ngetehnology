import {
  DARK_MODE,
  DEFAULT_THEME,
  LIGHT_MODE,
  SYSTEM_MODE,
} from "@constants/constants";
import { siteConfig } from "../config";
import type { LIGHT_DARK_MODE } from "@/types/config";

export function getDefaultHue(): number {
  const fallback = "250";
  const configCarrier = document.getElementById("config-carrier");
  return Number.parseInt(configCarrier?.dataset.hue || fallback);
}

export function getDefaultTheme(): LIGHT_DARK_MODE {
  return siteConfig.themeColor.defaultMode || DEFAULT_THEME;
}

export function getSystemPreference(): LIGHT_DARK_MODE {
  if (typeof window === "undefined") return LIGHT_MODE;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? DARK_MODE
    : LIGHT_MODE;
}

export function resolveTheme(theme: LIGHT_DARK_MODE): LIGHT_DARK_MODE {
  if (theme === SYSTEM_MODE) {
    return getSystemPreference();
  }
  return theme;
}

export function getHue(): number {
  const stored = localStorage.getItem("hue");
  return stored ? Number.parseInt(stored) : getDefaultHue();
}

export function setHue(hue: number): void {
  localStorage.setItem("hue", String(hue));
  const r = document.querySelector(":root") as HTMLElement;
  if (!r) {
    return;
  }
  r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
  // Uraikan tema, jika mode sistem, dapatkan preferensi sistem
  const resolvedTheme = resolveTheme(theme);

  // Dapatkan informasi status tema saat ini secara lengkap
  const currentIsDark = document.documentElement.classList.contains("dark");
  const currentTheme = document.documentElement.getAttribute("data-theme");

  // Hitung status tema target
  let targetIsDark: boolean = false; // Inisialisasi nilai default
  switch (resolvedTheme) {
    case LIGHT_MODE:
      targetIsDark = false;
      break;
    case DARK_MODE:
      targetIsDark = true;
      break;
    default:
      // Tangani kasus default, gunakan status tema saat ini
      targetIsDark = currentIsDark;
      break;
  }

  // Deteksi apakah pergantian tema benar-benar diperlukan:
  // 1. Apakah status kelas gelap berubah
  // 2. Apakah tema expressiveCode perlu diperbarui
  const needsThemeChange = currentIsDark !== targetIsDark;
  const expectedTheme = targetIsDark ? "github-dark" : "github-light";
  const needsCodeThemeUpdate = currentTheme !== expectedTheme;

  // Jika tidak perlu pergantian tema atau pembaruan tema kode, langsung kembali
  if (!needsThemeChange && !needsCodeThemeUpdate) {
    return;
  }

  // Hanya tambahkan perlindungan transisi saat pergantian tema diperlukan
  if (needsThemeChange) {
    document.documentElement.classList.add("is-theme-transitioning");
  }

  // Gunakan requestAnimationFrame untuk memastikan eksekusi pada frame berikutnya, menghindari kedipan
  requestAnimationFrame(() => {
    // Terapkan perubahan tema
    if (needsThemeChange) {
      if (targetIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // Atur tema untuk Expressive Code berdasarkan mode saat ini
    const expressiveTheme = targetIsDark ? "github-dark" : "github-light";
    document.documentElement.setAttribute("data-theme", expressiveTheme);

    // Paksa render ulang blok kode - mengatasi masalah rendering saat masuk ke halaman artikel dari beranda
    if (needsCodeThemeUpdate) {
      // Picu render ulang expressive code
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("theme-change"));
      }, 0);
    }

    // Hapus kelas perlindungan dengan cepat pada frame berikutnya, gunakan microtask untuk memastikan pembaruan DOM selesai
    if (needsThemeChange) {
      // Gunakan requestAnimationFrame untuk memastikan penghapusan kelas perlindungan transisi pada frame berikutnya
      requestAnimationFrame(() => {
        document.documentElement.classList.remove("is-theme-transitioning");
      });
    }
  });
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
  localStorage.setItem("theme", theme);
  applyThemeToDocument(theme);

  // Jika diatur ke mode sistem, dengarkan perubahan preferensi sistem
  if (theme === SYSTEM_MODE && typeof window !== "undefined") {
    setupSystemThemeListener();
  }
}

// Atur pendengar perubahan tema sistem
let systemThemeListener: ((e: MediaQueryListEvent) => void) | null = null;

export function setupSystemThemeListener(): void {
  if (typeof window === "undefined") return;

  // Hapus pendengar sebelumnya
  if (systemThemeListener) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeListener(systemThemeListener);
  }

  // Tambahkan pendengar baru
  systemThemeListener = (e: MediaQueryListEvent) => {
    const currentTheme = getStoredTheme();
    if (currentTheme === SYSTEM_MODE) {
      applyThemeToDocument(SYSTEM_MODE);
    }
  };

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addListener(systemThemeListener);
}

export function getStoredTheme(): LIGHT_DARK_MODE {
  return (
    (localStorage.getItem("theme") as LIGHT_DARK_MODE) || getDefaultTheme()
  );
}