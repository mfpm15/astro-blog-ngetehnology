/**
 * Dapatkan nama tampilan bahasa
 * @param langCode Kode bahasa (format file konfigurasi atau format layanan terjemahan)
 * @returns Nama tampilan bahasa
 */
export function getLanguageDisplayName(langCode: string): string {
	const languageNames: Record<string, string> = {
		en: "English",
		id: "Bahasa Indonesia",
		// Format layanan terjemahan
		english: "English",
		indonesian: "Bahasa Indonesia",
	};

	return languageNames[langCode] || langCode;
}