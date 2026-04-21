const MARKDOWN_IMAGE_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
const MARKDOWN_LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const HTML_TAG_RE = /<[^>]+>/g;
const CODE_FENCE_RE = /```[\s\S]*?```/g;
const INLINE_CODE_RE = /`([^`]+)`/g;
const TABLE_RULE_RE = /^\|?[\s:-]+\|[\s|:-]*$/gm;
const HEADING_RE = /^#{1,6}\s+/gm;
const BLOCKQUOTE_RE = /^>\s?/gm;
const SPOILER_RE = /:spoiler\[(.*?)\]/g;
const GITHUB_CARD_RE = /::github\{[^}]*repo=["']([^"']+)["'][^}]*\}/g;
const WHITESPACE_RE = /\s+/g;

function stripMarkdown(source: string): string {
  return source
    .replace(CODE_FENCE_RE, " ")
    .replace(MARKDOWN_IMAGE_RE, "$1")
    .replace(MARKDOWN_LINK_RE, "$1")
    .replace(GITHUB_CARD_RE, "$1")
    .replace(SPOILER_RE, "$1")
    .replace(INLINE_CODE_RE, "$1")
    .replace(HEADING_RE, "")
    .replace(BLOCKQUOTE_RE, "")
    .replace(TABLE_RULE_RE, " ")
    .replace(/[*_~#>|[\]()`]/g, " ")
    .replace(HTML_TAG_RE, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'")
    .replace(WHITESPACE_RE, " ")
    .trim();
}

function clampText(source: string, maxLength: number): string {
  if (source.length <= maxLength) {
    return source;
  }

  const sliced = source.slice(0, maxLength + 1);
  const safeBreak = sliced.lastIndexOf(" ");
  const endIndex = safeBreak > Math.floor(maxLength * 0.6) ? safeBreak : maxLength;

  return `${sliced.slice(0, endIndex).trim()}…`;
}

export function getSafePostDescription(
  description?: string | null,
  fallback?: string | null,
  maxLength: number = 180,
): string {
  const preferred = stripMarkdown(description || "");
  if (preferred.length > 0) {
    return clampText(preferred, maxLength);
  }

  const fallbackText = stripMarkdown(fallback || "");
  if (fallbackText.length > 0) {
    return clampText(fallbackText, maxLength);
  }

  return "";
}
