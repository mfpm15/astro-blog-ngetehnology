/**
 * Fungsi utilitas navigasi
 * Menyediakan fungsionalitas navigasi halaman terpadu, mendukung navigasi tanpa refresh dengan Swup
 */

/**
 * Navigasi ke halaman yang ditentukan
 * @param url URL halaman tujuan
 * @param options Opsi navigasi
 */
export function navigateToPage(
	url: string,
	options?: {
		replace?: boolean;
		force?: boolean;
	},
): void {
	// Periksa apakah URL valid
	if (!url || typeof url !== "string") {
		console.warn("navigateToPage: URL yang diberikan tidak valid");
		return;
	}

	// Jika ini adalah tautan eksternal, buka di tab baru
	if (
		url.startsWith("http://") ||
		url.startsWith("https://") ||
		url.startsWith("//")
	) {
		window.open(url, "_blank");
		return;
	}

	// Jika ini adalah tautan jangkar, gulir ke elemen yang sesuai
	if (url.startsWith("#")) {
		const element = document.getElementById(url.slice(1));
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
		return;
	}

	// Periksa apakah Swup tersedia
	if (typeof window !== "undefined" && (window as any).swup) {
		try {
			// Gunakan Swup untuk navigasi tanpa refresh
			if (options?.replace) {
				(window as any).swup.navigate(url, { history: false });
			} else {
				(window as any).swup.navigate(url);
			}
		} catch (error) {
			console.error("Navigasi Swup gagal:", error);
			// Fallback ke navigasi normal
			fallbackNavigation(url, options);
		}
	} else {
		// Penanganan fallback saat Swup tidak tersedia
		fallbackNavigation(url, options);
	}
}

/**
 * Fungsi navigasi fallback
 * Gunakan navigasi halaman normal saat Swup tidak tersedia
 */
function fallbackNavigation(
	url: string,
	options?: {
		replace?: boolean;
		force?: boolean;
	},
): void {
	if (options?.replace) {
		window.location.replace(url);
	} else {
		window.location.href = url;
	}
}

/**
 * Periksa apakah Swup sudah siap
 */
export function isSwupReady(): boolean {
	return typeof window !== "undefined" && !!(window as any).swup;
}

/**
 * Tunggu hingga Swup siap
 * @param timeout Waktu habis (ms)
 */
export function waitForSwup(timeout: number = 5000): Promise<boolean> {
	return new Promise((resolve) => {
		if (isSwupReady()) {
			resolve(true);
			return;
		}

		let timeoutId: NodeJS.Timeout;

		const checkSwup = () => {
			if (isSwupReady()) {
				clearTimeout(timeoutId);
				document.removeEventListener("swup:enable", checkSwup);
				resolve(true);
			}
		};

		// Dengarkan event enable Swup
		document.addEventListener("swup:enable", checkSwup);

		// Atur waktu habis
		timeoutId = setTimeout(() => {
			document.removeEventListener("swup:enable", checkSwup);
			resolve(false);
		}, timeout);
	});
}

/**
 * Pramuat halaman
 * @param url URL halaman yang akan dimuat sebelumnya
 */
export function preloadPage(url: string): void {
	if (!url || typeof url !== "string") {
		return;
	}

	// Jika Swup tersedia, gunakan fungsionalitas pramuatnya
	if (isSwupReady() && (window as any).swup.preload) {
		try {
			(window as any).swup.preload(url);
		} catch (error) {
			console.warn("Gagal memuat halaman sebelumnya:", error);
		}
	}
}

/**
 * Dapatkan path halaman saat ini
 */
export function getCurrentPath(): string {
	return typeof window !== "undefined" ? window.location.pathname : "";
}

/**
 * Periksa apakah ini halaman beranda
 */
export function isHomePage(): boolean {
	const path = getCurrentPath();
	return path === "/" || path === "";
}

/**
 * Periksa apakah ini halaman postingan
 */
export function isPostPage(): boolean {
	const path = getCurrentPath();
	return path.startsWith("/posts/");
}

/**
 * Periksa apakah dua path sama
 */
export function pathsEqual(path1: string, path2: string): boolean {
	// Normalisasi path (hapus garis miring di akhir)
	const normalize = (path: string) => {
		return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
	};

	return normalize(path1) === normalize(path2);
}