// Config index: re-export public config modules from a single entrypoint.

// Core
export { siteConfig } from "./siteConfig";
export { profileConfig } from "./profileConfig";

// Features
export { commentConfig } from "./commentConfig";
export { announcementConfig } from "./announcementConfig";
export { licenseConfig } from "./licenseConfig";
export { footerConfig } from "./footerConfig";

// Styling
export { expressiveCodeConfig } from "./expressiveCodeConfig";
export { sakuraConfig } from "./sakuraConfig";
export { fontConfig } from "./fontConfig";

// Layout
export { sidebarLayoutConfig } from "./sidebarConfig";
export { navBarConfig } from "./navBarConfig";

// Components
export { musicPlayerConfig } from "./musicConfig";
export { spineModelConfig, live2dModelConfig } from "./pioConfig";
export { adConfig1, adConfig2 } from "./adConfig";
export { getEnabledFriends, getFriendExchangeConfig } from "./friendsConfig";

// Types
export type {
  SiteConfig,
  ProfileConfig,
  CommentConfig,
  AnnouncementConfig,
  LicenseConfig,
  FooterConfig,
  ExpressiveCodeConfig,
  SakuraConfig,
  MusicPlayerConfig,
  SidebarLayoutConfig,
  NavBarConfig,
  WidgetComponentConfig,
  WidgetComponentType,
  FriendExchangeConfig,
  FriendLink,
  FriendsDataConfig,
} from "../types/config";
