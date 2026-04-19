import type {
  DARK_MODE,
  LIGHT_MODE,
  SYSTEM_MODE,
} from "../constants/constants";

export type SiteConfig = {
  title: string;
  subtitle: string;
  description?: string; // Site description for the meta description tag.
  keywords?: string[]; // Site keywords for the meta keywords tag.

  lang:
    | "en"
    | "id";

  themeColor: {
    hue: number;
    fixed: boolean;
    defaultMode?: "light" | "dark" | "system"; // Default color mode.
  };

  // Font configuration
  font: FontConfig;

  // Bangumi configuration
  bangumi?: {
    userId?: string; // Bangumi user ID.
  };

  backgroundWallpaper: BackgroundWallpaperConfig;
  toc: {
    enable: boolean;
    depth: 1 | 2 | 3;
  };
  generateOgImages: boolean;
  favicon: Array<{
    src: string;
    theme?: "light" | "dark";
    sizes?: string;
  }>;
  /** Homepage logo. Supports icon library entries, image URLs, or local images. */
  logoIcon?: {
    type: "icon" | "image";
    value: string; // Icon name or image URL.
    alt?: string; // Alt text for the image.
  };
  showLastModified: boolean; // Toggle the "last edited" card.

  // Page toggles
  pages: {
    anime: boolean; // Anime page toggle.
    projects: boolean; // Projects page toggle.
    timeline: boolean; // Timeline page toggle.
    skills: boolean; // Skills page toggle.
  };

  // Post list layout
  postListLayout: {
    defaultMode: "list" | "grid"; // Default mode: list or grid.
    allowSwitch: boolean; // Whether users can switch layout modes.
  };

  // Pagination
  pagination: {
    postsPerPage: number; // Number of posts shown per page.
  };
};

export type Favicon = {
  src: string;
  theme?: "light" | "dark";
  sizes?: string;
};

export enum LinkPreset {
  Home = 0,
  Archive = 1,
  About = 2,
  Friends = 3,
  Anime = 4,

  Projects = 7,
  Skills = 8,
  Timeline = 9,
}

export type NavBarLink = {
  name: string;
  url: string;
  external?: boolean;
  icon?: string; // Menu icon.
  children?: (NavBarLink | LinkPreset)[]; // Optional child menu items.
};

export type NavBarConfig = {
  links: (NavBarLink | LinkPreset)[];
};

export type ProfileConfig = {
  avatar?: string;
  name: string;
  bio?: string;
  links: {
    name: string;
    url: string;
    icon: string;
  }[];
};

export type LicenseConfig = {
  enable: boolean;
  name: string;
  url: string;
};
// Comment configuration

export type CommentConfig = {
  enable: boolean; // Enable comments.
  enableVisitorCount?: boolean; // Enable visitor count tracking.
  twikoo?: TwikooConfig;
};

type TwikooConfig = {
  envId: string;
  region?: string;
  lang?: string;
};

export type LIGHT_DARK_MODE =
  | typeof LIGHT_MODE
  | typeof DARK_MODE
  | typeof SYSTEM_MODE;

export type BlogPostData = {
  body: string;
  title: string;
  published: Date;
  description: string;
  tags: string[];
  draft?: boolean;
  image?: string;
  category?: string;
  pinned?: boolean;
  prevTitle?: string;
  prevSlug?: string;
  nextTitle?: string;
  nextSlug?: string;
};

export type ExpressiveCodeConfig = {
  theme: string;
};

export type AnnouncementConfig = {
  // Visibility is controlled by sidebarLayoutConfig.
  title?: string; // Announcement title.
  content: string; // Announcement content.
  icon?: string; // Announcement icon.
  type?: "info" | "warning" | "success" | "error"; // Announcement type.
  closable?: boolean; // Whether the announcement can be closed.
  link?: {
    enable: boolean; // Enable link output.
    text: string; // Link label.
    url: string; // Link target URL.
    external?: boolean; // Whether the link is external.
  };
};

// Single font definition
export type FontItem = {
  id: string; // Unique font identifier.
  name: string; // Display name of the font.
  src: string; // Font file path or URL.
  family: string; // CSS font-family value.
  weight?: string | number; // Font weight such as normal, bold, 400, 700.
  style?: "normal" | "italic" | "oblique"; // Font style.
  display?: "auto" | "block" | "swap" | "fallback" | "optional"; // font-display value.
  unicodeRange?: string; // Unicode range used for subsetting.
  format?:
    | "woff"
    | "woff2"
    | "truetype"
    | "opentype"
    | "embedded-opentype"
    | "svg"; // Font format, mainly needed for local files.
};

// Font configuration
export type FontConfig = {
  enable: boolean; // Enable custom fonts.
  selected: string | string[]; // Selected font ID or font stack IDs.
  fonts: Record<string, FontItem>; // Font registry keyed by ID.
  fallback?: string[]; // Global fallback font list.
  preload?: boolean; // Whether to preload font files.
};

export type FooterConfig = {
  enable: boolean; // Enable footer HTML injection.
  customHtml?: string; // Custom footer HTML content.
};

// Widget component types
export type WidgetComponentType =
  | "profile"
  | "announcement"
  | "categories"
  | "tags"
  | "toc"
  | "advertisement"
  | "calendar"
  | "site-stats"
  | "music-player"
  | "custom";

export type WidgetComponentConfig = {
  type: WidgetComponentType; // Widget type.
  enable: boolean; // Enable this widget.
  order: number; // Render order, lower values appear first.
  position: "top" | "sticky"; // Widget area placement.
  class?: string; // Custom CSS classes.
  style?: string; // Custom inline styles.
  animationDelay?: number; // Animation delay in milliseconds.
  configId?: string; // Optional config ID, for example for ads.
  responsive?: {
    hidden?: ("mobile" | "tablet" | "desktop")[]; // Hide on selected device sizes.
    collapseThreshold?: number; // Collapse threshold.
  };
  customProps?: Record<string, any>; // Extra custom properties.
};

export type SidebarLayoutConfig = {
  enable: boolean; // Enable sidebar.
  position: "left" | "right"; // Sidebar position.
  components: WidgetComponentConfig[]; // List of sidebar widgets.
  defaultAnimation: {
    enable: boolean; // Enable default widget animation.
    baseDelay: number; // Base delay in milliseconds.
    increment: number; // Delay increment per widget in milliseconds.
  };
  responsive: {
    breakpoints: {
      mobile: number; // Mobile breakpoint in px.
      tablet: number; // Tablet breakpoint in px.
      desktop: number; // Desktop breakpoint in px.
    };
    layout: {
      mobile: "hidden" | "bottom" | "drawer" | "sidebar"; // Mobile layout mode.
      tablet: "sidebar" | "bottom" | "drawer"; // Tablet layout mode.
      desktop: "sidebar"; // Desktop layout mode.
    };
  };
};

export type SakuraConfig = {
  enable: boolean; // Enable sakura effect.
  sakuraNum: number; // Number of sakura petals.
  limitTimes: number; // Out-of-bounds reset limit, -1 means infinite loop.
  size: {
    min: number; // Minimum petal size multiplier.
    max: number; // Maximum petal size multiplier.
  };
  opacity: {
    min: number; // Minimum opacity.
    max: number; // Maximum opacity.
  };
  speed: {
    horizontal: {
      min: number; // Minimum horizontal speed.
      max: number; // Maximum horizontal speed.
    };
    vertical: {
      min: number; // Minimum vertical speed.
      max: number; // Maximum vertical speed.
    };
    rotation: number; // Rotation speed.
    fadeSpeed: number; // Fade speed.
  };
  zIndex: number; // Layer order.
};

// Spine mascot configuration
export type SpineModelConfig = {
  enable: boolean; // Enable Spine mascot.
  model: {
    path: string; // Model file path (.json).
    scale?: number; // Model scale ratio.
    x?: number; // X offset.
    y?: number; // Y offset.
  };
  position: {
    corner: "bottom-left" | "bottom-right" | "top-left" | "top-right"; // Placement corner.
    offsetX?: number; // Horizontal offset.
    offsetY?: number; // Vertical offset.
  };
  size: {
    width?: number; // Container width.
    height?: number; // Container height.
  };
  interactive?: {
    enabled?: boolean; // Enable interaction.
    clickAnimations?: string[]; // Random click animations.
    clickMessages?: string[]; // Random click messages.
    messageDisplayTime?: number; // Message display duration in ms.
    idleAnimations?: string[]; // Idle animation list.
    idleInterval?: number; // Idle animation interval in ms.
  };
  responsive?: {
    hideOnMobile?: boolean; // Hide on mobile.
    mobileBreakpoint?: number; // Mobile breakpoint.
  };
  zIndex?: number; // Layer order.
  opacity?: number; // Opacity from 0 to 1.
};

// Live2D mascot configuration
export type Live2DModelConfig = {
  enable: boolean; // Enable Live2D mascot.
  model: {
    path: string; // Model folder path or model3.json path.
  };
  position?: {
    corner?: "bottom-left" | "bottom-right" | "top-left" | "top-right"; // Placement corner.
    offsetX?: number; // Horizontal offset.
    offsetY?: number; // Vertical offset.
  };
  size?: {
    width?: number; // Container width.
    height?: number; // Container height.
  };
  interactive?: {
    enabled?: boolean; // Enable interaction.
    // Motions and expressions are read automatically from the model JSON.
    clickMessages?: string[]; // Random click messages.
    messageDisplayTime?: number; // Message display duration in ms.
  };
  responsive?: {
    hideOnMobile?: boolean; // Hide on mobile.
    mobileBreakpoint?: number; // Mobile breakpoint.
  };
};

export type BackgroundWallpaperConfig = {
  enable: boolean; // Enable background wallpaper.
  mode: "banner" | "overlay"; // Wallpaper mode.
  src:
    | string
    | string[]
    | {
        desktop?: string | string[];
        mobile?: string | string[];
      }; // Supports single images, image arrays, or device-specific images.
  position?:
    | "top"
    | "center"
    | "bottom"
    | "top left"
    | "top center"
    | "top right"
    | "center left"
    | "center center"
    | "center right"
    | "bottom left"
    | "bottom center"
    | "bottom right"
    | "left top"
    | "left center"
    | "left bottom"
    | "right top"
    | "right center"
    | "right bottom"
    | string; // Wallpaper position, matching CSS object-position values.
  // Banner-specific settings
  banner?: {
    homeText?: {
      enable: boolean; // Show custom text on the homepage.
      title?: string; // Main title.
      subtitle?: string | string[]; // Subtitle, supports one or multiple strings.
      typewriter?: {
        enable: boolean; // Enable typewriter effect.
        speed: number; // Typing speed in ms.
        deleteSpeed: number; // Delete speed in ms.
        pauseTime: number; // Pause duration after full render in ms.
      };
    };
    credit?: {
      enable:
        | boolean
        | {
            desktop: boolean; // Show banner credit on desktop.
            mobile: boolean; // Show banner credit on mobile.
          }; // Banner credit visibility.
      text:
        | string
        | {
            desktop: string; // Credit text on desktop.
            mobile: string; // Credit text on mobile.
          }; // Banner credit text.
      url?:
        | string
        | {
            desktop: string; // Original artwork or artist URL on desktop.
            mobile: string; // Original artwork or artist URL on mobile.
          }; // Credit link URL.
    };
    navbar?: {
      transparentMode?: "semi" | "full" | "semifull"; // Navbar transparency mode.
    };
    waves?: {
      enable:
        | boolean
        | {
            desktop: boolean; // Enable waves on desktop.
            mobile: boolean; // Enable waves on mobile.
          }; // Wave animation toggle.
    };
  };
  // Overlay-specific settings
  overlay?: {
    zIndex?: number; // Layer order.
    opacity?: number; // Wallpaper opacity from 0 to 1.
    blur?: number; // Background blur in px.
  };
};

// Advertisement configuration
export type AdConfig = {
  title?: string; // Advertisement title.
  content?: string; // Advertisement text content.
  image?: {
    src: string; // Image source.
    alt?: string; // Image alt text.
    link?: string; // Click target URL.
    external?: boolean; // Whether the link is external.
  };
  link?: {
    text: string; // Link label.
    url: string; // Link URL.
    external?: boolean; // Whether the link is external.
  };
  padding?: {
    top?: string; // Top spacing.
    right?: string; // Right spacing.
    bottom?: string; // Bottom spacing.
    left?: string; // Left spacing.
    all?: string; // Global spacing override.
  };
  closable?: boolean; // Whether it can be dismissed.
  displayCount?: number; // Display limit, -1 means unlimited.
  expireDate?: string; // Expiration date in ISO 8601 format.
};

// Friend link configuration
export type FriendLink = {
  title: string; // Link title.
  imgurl: string; // Avatar image URL.
  desc: string; // Link description.
  siteurl: string; // Target site URL.
  tags?: string[]; // Tags.
  weight: number; // Sort weight, larger values rank first.
  enabled: boolean; // Enable this entry.
};

// Music player configuration
export type MusicPlayerConfig = {
  // Base toggle
  enable: boolean; // Enable music player.

  // Player mode
  mode?: "local" | "meting"; // "local" for local files, "meting" for remote playlists.

  // Meting API settings
  meting?: {
    // Meting API endpoint
    api?: string;

    // Playlist settings
    playlist?: {
      id?: string; // Playlist ID.
      server?: "netease" | "tencent" | "kugou" | "xiami" | "baidu"; // Music service.
      type?: "playlist" | "album" | "song"; // Playlist source type.
    };

    // Backup API endpoints
    fallbackApis?: string[];
  };

  // Local music settings
  local?: {
    // Local playlist. File paths are relative to `public`.
    playlist?: Array<{
      id: number;
      title: string;
      artist: string;
      cover: string;
      url: string;
      duration: number;
    }>;
  };

  // Player behavior
  behavior?: {
    // Autoplay
    autoplay?: boolean;

    // Default volume
    defaultVolume?: number;

    // Default playback modes
    defaultShuffle?: boolean;
    defaultRepeat?: 0 | 1 | 2; // 0 = off, 1 = repeat one, 2 = repeat all.

    // Player position
    position?: {
      bottom?: number;
      right?: number;
      left?: number | "auto";
    };
  };

  // UI settings
  ui?: {
    // Animation settings
    animation?: {
      coverRotation?: {
        enable?: boolean;
        speed?: number;
        pauseOnHover?: boolean;
      };
    };

    // Display settings
    display?: {
      showPlaylistButton?: boolean;
      showVolumeControl?: boolean;
      showShuffleButton?: boolean;
      showRepeatButton?: boolean;
      showSkipButtons?: boolean;
    };

    // Playlist panel settings
    playlist?: {
      maxHeight?: number;
      width?: number;
      showTrackNumbers?: boolean;
      showDuration?: boolean;
    };
  };

  // Responsive settings
  responsive?: {
    // Mobile settings
    mobile?: {
      position?: {
        bottom?: number;
        right?: number;
        left?: number;
      };
    };

    // Small screen settings
    smallScreen?: {};
  };

  // Error handling
  errorHandling?: {
    showErrorMessages?: boolean;
    errorDisplayDuration?: number;
    autoSkipOnError?: boolean;
  };
};
