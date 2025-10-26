// Kelas utilitas pemuat ikon
// Menyediakan solusi pemuatan ikon Iconify yang andal

interface IconifyLoadOptions {
	timeout?: number;
	retryCount?: number;
	retryDelay?: number;
}

class IconLoader {
	private static instance: IconLoader;
	private isLoaded = false;
	private isLoading = false;
	private loadPromise: Promise<void> | null = null;
	private observers: Set<() => void> = new Set();

	private constructor() {}

	static getInstance(): IconLoader {
		if (!IconLoader.instance) {
			IconLoader.instance = new IconLoader();
		}
		return IconLoader.instance;
	}

	/**
	 * Muat pustaka ikon Iconify
	 */
	async loadIconify(options: IconifyLoadOptions = {}): Promise<void> {
		const { timeout = 10000, retryCount = 3, retryDelay = 1000 } = options;

		// Jika sudah dimuat, langsung kembali
		if (this.isLoaded) {
			return Promise.resolve();
		}

		// Jika sedang memuat, kembalikan Promise yang ada
		if (this.isLoading && this.loadPromise) {
			return this.loadPromise;
		}

		this.isLoading = true;
		this.loadPromise = this.loadWithRetry(timeout, retryCount, retryDelay);

		try {
			await this.loadPromise;
			this.isLoaded = true;
			this.notifyObservers();
		} catch (error) {
			console.error("Gagal memuat Iconify setelah semua percobaan ulang:", error);
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	/**
	 * Muat dengan mekanisme coba lagi
	 */
	private async loadWithRetry(
		timeout: number,
		retryCount: number,
		retryDelay: number,
	): Promise<void> {
		for (let attempt = 1; attempt <= retryCount; attempt++) {
			try {
				await this.loadScript(timeout);
				return;
			} catch (error) {
				console.warn(`Percobaan memuat Iconify ${attempt} gagal:`, error);

				if (attempt === retryCount) {
					throw new Error(
						`Gagal memuat Iconify setelah ${retryCount} percobaan`,
					);
				}

				// Tunggu sebelum mencoba lagi
				await new Promise((resolve) => setTimeout(resolve, retryDelay));
			}
		}
	}

	/**
	 * Muat skrip
	 */
	private loadScript(timeout: number): Promise<void> {
		return new Promise((resolve, reject) => {
			// Periksa apakah skrip sudah ada
			const existingScript = document.querySelector(
				'script[src*="iconify-icon"]',
			);
			if (existingScript) {
				// Periksa apakah Iconify sudah tersedia
				if (this.isIconifyReady()) {
					resolve();
					return;
				}
			}

			const script = document.createElement("script");
			script.src =
				"https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js";
			script.async = true;
			script.defer = true;

			const timeoutId = setTimeout(() => {
				script.remove();
				reject(new Error("Waktu muat skrip Iconify habis"));
			}, timeout);

			script.onload = () => {
				clearTimeout(timeoutId);
				// Tunggu hingga Iconify sepenuhnya siap
				this.waitForIconifyReady().then(resolve).catch(reject);
			};

			script.onerror = () => {
				clearTimeout(timeoutId);
				script.remove();
				reject(new Error("Gagal memuat skrip Iconify"));
			};

			document.head.appendChild(script);
		});
	}

	/**
	 * Tunggu hingga Iconify sepenuhnya siap
	 */
	private waitForIconifyReady(maxWait = 5000): Promise<void> {
		return new Promise((resolve, reject) => {
			const startTime = Date.now();

			const checkReady = () => {
				if (this.isIconifyReady()) {
					resolve();
					return;
				}

				if (Date.now() - startTime > maxWait) {
					reject(new Error("Waktu inisialisasi Iconify habis"));
					return;
				}

				setTimeout(checkReady, 100);
			};

			checkReady();
		});
	}

	/**
	 * Periksa apakah Iconify sudah siap
	 */
	private isIconifyReady(): boolean {
		return (
			typeof window !== "undefined" &&
			"customElements" in window &&
			customElements.get("iconify-icon") !== undefined
		);
	}

	/**
	 * Tambahkan pengamat selesai memuat
	 */
	onLoad(callback: () => void): void {
		if (this.isLoaded) {
			callback();
		} else {
			this.observers.add(callback);
		}
	}

	/**
	 * Hapus pengamat
	 */
	offLoad(callback: () => void): void {
		this.observers.delete(callback);
	}

	/**
	 * Beri tahu semua pengamat
	 */
	private notifyObservers(): void {
		this.observers.forEach((callback) => {
			try {
				callback();
			} catch (error) {
				console.error("Kesalahan pada pengamat muat ikon:", error);
			}
		});
		this.observers.clear();
	}

	/**
	 * Dapatkan status pemuatan
	 */
	getLoadState(): { isLoaded: boolean; isLoading: boolean } {
		return {
			isLoaded: this.isLoaded,
			isLoading: this.isLoading,
		};
	}

	/**
	 * Pramuat ikon yang ditentukan
	 */
	async preloadIcons(icons: string[]): Promise<void> {
		if (!this.isLoaded) {
			await this.loadIconify();
		}

		// Tunggu ikon dimuat
		return new Promise((resolve) => {
			let loadedCount = 0;
			const totalIcons = icons.length;

			if (totalIcons === 0) {
				resolve();
				return;
			}

			const checkComplete = () => {
				loadedCount++;
				if (loadedCount >= totalIcons) {
					resolve();
				}
			};

			// Buat elemen ikon sementara untuk memicu pemuatan
			icons.forEach((icon) => {
				const tempIcon = document.createElement("iconify-icon");
				tempIcon.setAttribute("icon", icon);
				tempIcon.style.display = "none";
				tempIcon.onload = checkComplete;
				tempIcon.onerror = checkComplete; // Lanjutkan meskipun gagal memuat
				document.body.appendChild(tempIcon);

				// Bersihkan elemen sementara
				setTimeout(() => {
					if (tempIcon.parentNode) {
						tempIcon.parentNode.removeChild(tempIcon);
					}
				}, 1000);
			});

			// Atur waktu habis
			setTimeout(() => {
				resolve();
			}, 5000);
		});
	}
}

// Ekspor instance tunggal
export const iconLoader = IconLoader.getInstance();

// Ekspor fungsi praktis
export const loadIconify = (options?: IconifyLoadOptions) =>
	iconLoader.loadIconify(options);
export const preloadIcons = (icons: string[]) => iconLoader.preloadIcons(icons);
export const onIconsReady = (callback: () => void) =>
	iconLoader.onLoad(callback);