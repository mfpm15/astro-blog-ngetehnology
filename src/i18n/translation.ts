import { siteConfig } from "../config";
import type I18nKey from "./i18nKey";
import { en } from "./languages/en";
import { id } from "./languages/id";

export type Translation = {
  [K in I18nKey]: string;
};

const defaultTranslation = id;

const map: { [key: string]: Translation } = {
  en: en,
  en_us: en,
  en_gb: en,
  en_au: en,
  id: id,
};

export function getTranslation(lang: string): Translation {
  return map[lang.toLowerCase()] || defaultTranslation;
}

export function i18n(key: I18nKey): string {
  const lang = siteConfig.lang || "id";
  return getTranslation(lang)[key];
}
