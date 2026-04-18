import type { SiteConfig } from "../types/config";
import siteMetadata from "../data/site-metadata.json";
import siteSettings from "../data/site-settings.json";
import wallpaperData from "../data/wallpaper.json";
import { fontConfig } from "./fontConfig";

export const siteConfig: SiteConfig = {
  title: siteMetadata.title,
  subtitle: siteMetadata.subtitle,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,

  lang: siteMetadata.lang as SiteConfig["lang"],

  themeColor: siteSettings.themeColor as SiteConfig["themeColor"],

  favicon: [
    {
      src: siteMetadata.favicon.src,
      sizes: siteMetadata.favicon.sizes,
    },
  ],

  logoIcon: {
    type: "image",
    value: siteMetadata.logo.src,
    alt: siteMetadata.logo.alt,
  },

  bangumi: siteSettings.bangumi,
  showLastModified: siteSettings.showLastModified,
  generateOgImages: siteSettings.generateOgImages,
  pages: siteSettings.pages as SiteConfig["pages"],
  postListLayout: siteSettings.postListLayout as SiteConfig["postListLayout"],
  pagination: siteSettings.pagination as SiteConfig["pagination"],

  backgroundWallpaper: wallpaperData as SiteConfig["backgroundWallpaper"],

  toc: siteSettings.toc as SiteConfig["toc"],

  font: fontConfig,
};
