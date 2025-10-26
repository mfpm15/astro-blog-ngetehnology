import { sidebarLayoutConfig } from "../config";
import type {
  SidebarLayoutConfig,
  WidgetComponentConfig,
  WidgetComponentType,
} from "../types/config";

/**
 * Peta Komponen Widget - Memetakan jenis komponen ke path komponen aktual
 */
export const WIDGET_COMPONENT_MAP = {
  profile: "../components/widget/Profile.astro",
  announcement: "../components/widget/Announcement.astro",
  categories: "../components/widget/Categories.astro",
  tags: "../components/widget/Tags.astro",
  toc: "../components/widget/TOC.astro",
  advertisement: "../components/widget/Advertisement.astro",
  "music-player": "../components/widget/MusicPlayer.svelte",
  custom: null, // Komponen kustom perlu menentukan path dalam konfigurasi
} as const;

/**
 * Kelas Manajer Widget
 * Bertanggung jawab untuk mengelola pemuatan dinamis, pengurutan, dan rendering komponen sidebar
 */
export class WidgetManager {
  private config: SidebarLayoutConfig;
  private enabledComponents: WidgetComponentConfig[];

  constructor(config: SidebarLayoutConfig = sidebarLayoutConfig) {
    this.config = config;
    this.enabledComponents = this.getEnabledComponents();
  }

  /**
   * Dapatkan konfigurasi
   */
  getConfig(): SidebarLayoutConfig {
    return this.config;
  }

  /**
   * Dapatkan daftar komponen yang diaktifkan
   */
  private getEnabledComponents(): WidgetComponentConfig[] {
    return this.config.components
      .filter((component) => component.enable)
      .sort((a, b) => a.order - b.order);
  }

  /**
   * Dapatkan daftar komponen berdasarkan posisi
   * @param position Posisi komponen: 'top' | 'sticky'
   */
  getComponentsByPosition(position: "top" | "sticky"): WidgetComponentConfig[] {
    return this.enabledComponents.filter(
      (component) => component.position === position
    );
  }

  /**
   * Dapatkan waktu tunda animasi komponen
   * @param component Konfigurasi komponen
   * @param index Indeks komponen dalam daftar
   */
  getAnimationDelay(component: WidgetComponentConfig, index: number): number {
    if (component.animationDelay !== undefined) {
      return component.animationDelay;
    }

    if (this.config.defaultAnimation.enable) {
      return (
        this.config.defaultAnimation.baseDelay +
        index * this.config.defaultAnimation.increment
      );
    }

    return 0;
  }

  /**
   * Dapatkan nama kelas CSS komponen
   * @param component Konfigurasi komponen
   * @param index Indeks komponen dalam daftar
   */
  getComponentClass(component: WidgetComponentConfig, _index: number): string {
    const classes: string[] = [];

    // Tambahkan nama kelas dasar
    if (component.class) {
      classes.push(component.class);
    }

    // Tambahkan nama kelas sembunyi responsif
    if (component.responsive?.hidden) {
      component.responsive.hidden.forEach((device) => {
        switch (device) {
          case "mobile":
            classes.push("hidden", "md:block");
            break;
          case "tablet":
            classes.push("md:hidden", "lg:block");
            break;
          case "desktop":
            classes.push("lg:hidden");
            break;
        }
      });
    }

    return classes.join(" ");
  }

  /**
   * Dapatkan gaya inline komponen
   * @param component Konfigurasi komponen
   * @param index Indeks komponen dalam daftar
   */
  getComponentStyle(component: WidgetComponentConfig, index: number): string {
    const styles: string[] = [];

    // Tambahkan gaya kustom
    if (component.style) {
      styles.push(component.style);
    }

    // Tambahkan gaya tunda animasi
    const animationDelay = this.getAnimationDelay(component, index);
    if (animationDelay > 0) {
      styles.push(`animation-delay: ${animationDelay}ms`);
    }

    return styles.join("; ");
  }

  /**
   * Periksa apakah komponen harus dilipat
   * @param component Konfigurasi komponen
   * @param itemCount Jumlah item konten komponen
   */
  isCollapsed(component: WidgetComponentConfig, itemCount: number): boolean {
    if (!component.responsive?.collapseThreshold) {
      return false;
    }
    return itemCount >= component.responsive.collapseThreshold;
  }

  /**
   * Dapatkan path komponen
   * @param componentType Jenis komponen
   */
  getComponentPath(componentType: WidgetComponentType): string | null {
    return WIDGET_COMPONENT_MAP[componentType];
  }

  /**
   * Periksa apakah perangkat saat ini harus menampilkan sidebar
   * @param deviceType Jenis perangkat
   */
  shouldShowSidebar(deviceType: "mobile" | "tablet" | "desktop"): boolean {
    if (!this.config.enable) {
      return false;
    }

    const layoutMode = this.config.responsive.layout[deviceType];
    return layoutMode === "sidebar";
  }

  /**
   * Dapatkan konfigurasi breakpoint perangkat
   */
  getBreakpoints() {
    return this.config.responsive.breakpoints;
  }

  /**
   * Perbarui konfigurasi komponen
   * @param newConfig Konfigurasi baru
   */
  updateConfig(newConfig: Partial<SidebarLayoutConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.enabledComponents = this.getEnabledComponents();
  }

  /**
   * Tambah komponen baru
   * @param component Konfigurasi komponen
   */
  addComponent(component: WidgetComponentConfig): void {
    this.config.components.push(component);
    this.enabledComponents = this.getEnabledComponents();
  }

  /**
   * Hapus komponen
   * @param componentType Jenis komponen
   */
  removeComponent(componentType: WidgetComponentType): void {
    this.config.components = this.config.components.filter(
      (component) => component.type !== componentType
    );
    this.enabledComponents = this.getEnabledComponents();
  }

  /**
   * Aktifkan/Nonaktifkan komponen
   * @param componentType Jenis komponen
   * @param enable Apakah akan diaktifkan
   */
  toggleComponent(componentType: WidgetComponentType, enable: boolean): void {
    const component = this.config.components.find(
      (c) => c.type === componentType
    );
    if (component) {
      component.enable = enable;
      this.enabledComponents = this.getEnabledComponents();
    }
  }

  /**
   * Urutkan ulang komponen
   * @param componentType Jenis komponen
   * @param newOrder Urutan baru
   */
  reorderComponent(componentType: WidgetComponentType, newOrder: number): void {
    const component = this.config.components.find(
      (c) => c.type === componentType
    );
    if (component) {
      component.order = newOrder;
      this.enabledComponents = this.getEnabledComponents();
    }
  }

  /**
   * Periksa apakah komponen harus dirender di sidebar
   * @param componentType Jenis komponen
   */
  isSidebarComponent(componentType: WidgetComponentType): boolean {
    // Filter komponen
    return true;
  }
}

/**
 * Instance manajer komponen default
 */
export const widgetManager = new WidgetManager();

/**
 * Fungsi utilitas: Dapatkan konfigurasi komponen berdasarkan jenis komponen
 * @param componentType Jenis komponen
 */
export function getComponentConfig(
  componentType: WidgetComponentType
): WidgetComponentConfig | undefined {
  return widgetManager
    .getConfig()
    .components.find((c) => c.type === componentType);
}

/**
 * Fungsi utilitas: Periksa apakah komponen diaktifkan
 * @param componentType Jenis komponen
 */
export function isComponentEnabled(
  componentType: WidgetComponentType
): boolean {
  const config = getComponentConfig(componentType);
  return config?.enable ?? false;
}

/**
 * Fungsi utilitas: Dapatkan semua jenis komponen yang diaktifkan
 */
export function getEnabledComponentTypes(): WidgetComponentType[] {
  const enabledComponents = widgetManager
    .getComponentsByPosition("top")
    .concat(widgetManager.getComponentsByPosition("sticky"));
  return enabledComponents.map((c) => c.type);
}