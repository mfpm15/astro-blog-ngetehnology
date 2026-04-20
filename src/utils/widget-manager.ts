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
  sidebarToc: "../components/widget/TOC.astro",
  advertisement: "../components/widget/Advertisement.astro",
  calendar: "../components/widget/Calendar.astro",
  stats: "../components/widget/SiteStats.astro",
  "site-stats": "../components/widget/SiteStats.astro",
  music: "../components/widget/MusicPlayer.svelte",
  "music-player": "../components/widget/MusicPlayer.svelte",
  custom: null, // Komponen kustom perlu menentukan path dalam konfigurasi
} as const;

/**
 * Kelas Manajer Widget
 * Bertanggung jawab untuk mengelola pemuatan dinamis, pengurutan, dan rendering komponen sidebar
 */
export class WidgetManager {
  private config: SidebarLayoutConfig;

  constructor(config: SidebarLayoutConfig = sidebarLayoutConfig) {
    this.config = config;
  }

  /**
   * Dapatkan konfigurasi
   */
  getConfig(): SidebarLayoutConfig {
    return this.config;
  }

  getAllConfiguredComponents(): WidgetComponentConfig[] {
    return [
      ...(this.config.components ?? []),
      ...(this.config.leftComponents ?? []),
      ...(this.config.rightComponents ?? []),
      ...(this.config.mobileBottomComponents ?? []),
    ];
  }

  /**
   * Dapatkan daftar komponen yang diaktifkan
   */
  private getRawComponents(side: "left" | "right"): WidgetComponentConfig[] {
    const hasNewShape =
      Array.isArray(this.config.leftComponents) ||
      Array.isArray(this.config.rightComponents) ||
      Array.isArray(this.config.mobileBottomComponents);

    if (hasNewShape) {
      return side === "left"
        ? this.config.leftComponents ?? []
        : this.config.rightComponents ?? [];
    }

    // Legacy single-list shape: map to the configured position side.
    const legacy = this.config.components ?? [];
    const legacySide = this.config.position === "right" ? "right" : "left";
    return legacySide === side ? legacy : [];
  }

  private getEnabledComponents(
    side: "left" | "right",
    isPostPage: boolean
  ): WidgetComponentConfig[] {
    return this.getRawComponents(side)
      .filter((component) => component.enable)
      .filter((component) => {
        if (isPostPage) return component.showOnPostPage ?? true;
        return component.showOnNonPostPage ?? true;
      })
      .map((component, index) => ({ component, index }))
      .sort((a, b) => (a.component.order ?? a.index) - (b.component.order ?? b.index))
      .map(({ component }) => component);
  }

  /**
   * Dapatkan daftar komponen berdasarkan posisi
   * @param position Posisi komponen: 'top' | 'sticky'
   */
  getComponentsByPosition(
    position: "top" | "sticky",
    side: "left" | "right" = "left",
    isPostPage = false
  ): WidgetComponentConfig[] {
    const enabled = this.getEnabledComponents(side, isPostPage);
    return enabled.filter((component) => (component.position ?? "top") === position);
  }

  getMobileBottomComponents(isPostPage = false): WidgetComponentConfig[] {
    return (this.config.mobileBottomComponents ?? [])
      .filter((component) => component.enable)
      .filter((component) => {
        if (isPostPage) return component.showOnPostPage ?? true;
        return component.showOnNonPostPage ?? true;
      })
      .map((component, index) => ({ component, index }))
      .sort((a, b) => (a.component.order ?? a.index) - (b.component.order ?? b.index))
      .map(({ component }) => ({
        ...component,
        position: component.position ?? "top",
      }));
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
            classes.push("md:hidden", "xl:block");
            break;
          case "desktop":
            classes.push("xl:hidden");
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
   * Periksa apakah sebuah sisi sidebar harus tampil pada breakpoint tertentu.
   */
  shouldShowSidebarSide(
    deviceType: "mobile" | "tablet" | "desktop",
    side: "left" | "right",
    isPostPage: boolean
  ): boolean {
    if (!this.shouldShowSidebar(deviceType)) return false;

    if (isPostPage && this.config.showBothSidebarsOnPostPage) {
      return true;
    }

    if (this.config.position === "both") {
      if (deviceType === "tablet") {
        const tabletSide = this.config.tabletSidebar ?? "left";
        return tabletSide === side;
      }
      return true;
    }

    return this.config.position === side;
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
  }

  /**
   * Tambah komponen baru
   * @param component Konfigurasi komponen
   */
  addComponent(component: WidgetComponentConfig): void {
    // Default to left side for legacy API usage.
    if (!this.config.leftComponents && !this.config.components) {
      this.config.leftComponents = [];
    }
    (this.config.leftComponents ?? this.config.components ?? []).push(component);
  }

  /**
   * Hapus komponen
   * @param componentType Jenis komponen
   */
  removeComponent(componentType: WidgetComponentType): void {
    const removeFrom = (list?: WidgetComponentConfig[]) =>
      list ? list.filter((component) => component.type !== componentType) : list;

    this.config.components = removeFrom(this.config.components);
    this.config.leftComponents = removeFrom(this.config.leftComponents);
    this.config.rightComponents = removeFrom(this.config.rightComponents);
    this.config.mobileBottomComponents = removeFrom(this.config.mobileBottomComponents);
  }

  /**
   * Aktifkan/Nonaktifkan komponen
   * @param componentType Jenis komponen
   * @param enable Apakah akan diaktifkan
   */
  toggleComponent(componentType: WidgetComponentType, enable: boolean): void {
    const lists: Array<WidgetComponentConfig[] | undefined> = [
      this.config.components,
      this.config.leftComponents,
      this.config.rightComponents,
      this.config.mobileBottomComponents,
    ];

    for (const list of lists) {
      const component = list?.find((c) => c.type === componentType);
      if (component) {
        component.enable = enable;
      }
    }
  }

  /**
   * Urutkan ulang komponen
   * @param componentType Jenis komponen
   * @param newOrder Urutan baru
   */
  reorderComponent(componentType: WidgetComponentType, newOrder: number): void {
    const lists: Array<WidgetComponentConfig[] | undefined> = [
      this.config.components,
      this.config.leftComponents,
      this.config.rightComponents,
      this.config.mobileBottomComponents,
    ];

    for (const list of lists) {
      const component = list?.find((c) => c.type === componentType);
      if (component) {
        component.order = newOrder;
      }
    }
  }

  /**
   * Periksa apakah komponen harus dirender di sidebar
   * @param componentType Jenis komponen
   */
  isSidebarComponent(componentType: WidgetComponentType): boolean {
    return this.getComponentPath(componentType) !== null;
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
    .getAllConfiguredComponents()
    .find((component) => component.type === componentType);
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
  const enabled = [
    ...widgetManager.getComponentsByPosition("top", "left"),
    ...widgetManager.getComponentsByPosition("sticky", "left"),
    ...widgetManager.getComponentsByPosition("top", "right"),
    ...widgetManager.getComponentsByPosition("sticky", "right"),
    ...widgetManager.getMobileBottomComponents(),
  ];
  return enabled.map((c) => c.type);
}
