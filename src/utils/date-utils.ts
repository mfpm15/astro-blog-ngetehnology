import { siteConfig } from "../config";

export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().substring(0, 10);
}

// Fungsi pemformatan tanggal internasional
export function formatDateI18n(dateString: string): string {
  const date = new Date(dateString);
  const lang = siteConfig.lang || "en";

  // Atur format tanggal yang berbeda berdasarkan bahasa
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Pemetaan kode bahasa
  const localeMap: Record<string, string> = {
    en: "en-US",
    id: "id-ID",
  };

  const locale = localeMap[lang] || "en-US";
  return date.toLocaleDateString(locale, options);
}
