import navbarLinksData from "../data/navbar-links.json";
import type { NavBarConfig, NavBarLink } from "../types/config";
import { siteConfig } from "./siteConfig";

const pageAvailability = {
  "/anime/": siteConfig.pages.anime,
  "/projects/": siteConfig.pages.projects,
  "/skills/": siteConfig.pages.skills,
  "/timeline/": siteConfig.pages.timeline,
} as const;

function isEnabledUrl(url: string) {
  return pageAvailability[url as keyof typeof pageAvailability] ?? true;
}

function normalizeLinks(links: NavBarLink[]): NavBarLink[] {
  return links
    .filter((link) => isEnabledUrl(link.url))
    .map((link) => ({
      ...link,
      children: link.children
        ? normalizeLinks(link.children as NavBarLink[])
        : undefined,
    }));
}

const normalizedLinks = normalizeLinks((navbarLinksData.links ?? []) as NavBarLink[]);

export const navBarConfig: NavBarConfig = {
  links: normalizedLinks,
};
