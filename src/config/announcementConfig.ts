import type { AnnouncementConfig } from "../types/config";
import announcementData from "../data/announcement.json";

export const announcementConfig: AnnouncementConfig = {
  title: announcementData.title,
  content: announcementData.content,
  closable: announcementData.closable,
  link: announcementData.link as AnnouncementConfig["link"],
};
