import type { NavBarConfig, NavBarLink } from "../types/config";
import { LinkPreset } from "../types/config";
import { siteConfig } from "./siteConfig";

// Hasilkan konfigurasi bilah navigasi secara dinamis berdasarkan sakelar halaman
const getDynamicNavBarConfig = (): NavBarConfig => {
  const links: (NavBarLink | LinkPreset)[] = [
    LinkPreset.Home,
    LinkPreset.Archive,
  ];

  // Tentukan apakah akan menambahkan halaman anime berdasarkan konfigurasi
  if (siteConfig.pages.anime) {
    links.push(LinkPreset.Anime);
  }

  // Mendukung tautan bilah navigasi kustom dan menu multi-level
  links.push({
    name: "Tautan",
    url: "/links/",
    icon: "material-symbols:link",
    children: [
      {
        name: "GitHub",
        url: "https://github.com/mfpm15/astro-blog-ngetehnology",
        external: true,
        icon: "fa6-brands:github",
      },
    ],
  });

  links.push(LinkPreset.Friends);

  // Hasilkan item menu Proyek, Keahlian, Pengalaman secara dinamis berdasarkan sakelar halaman di config
  const otherChildren: NavBarLink[] = [];

  if (siteConfig.pages.projects) {
    otherChildren.push({
      name: "Proyek Saya",
      url: "/projects/",
      icon: "material-symbols:work",
    });
  }

  if (siteConfig.pages.skills) {
    otherChildren.push({
      name: "Keahlian Saya",
      url: "/skills/",
      icon: "material-symbols:psychology",
    });
  }

  if (siteConfig.pages.timeline) {
    otherChildren.push({
      name: "Pengalaman Saya",
      url: "/timeline/",
      icon: "material-symbols:timeline",
    });
  }

  links.push({
    name: "Tentang",
    url: "/content/",
    icon: "material-symbols:info",
    children: [LinkPreset.About, ...otherChildren],
  });
  return { links };
};

export const navBarConfig: NavBarConfig = getDynamicNavBarConfig();