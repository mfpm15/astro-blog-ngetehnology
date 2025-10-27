# 📦 Daftar Lengkap Astro Integrations

Dokumentasi lengkap semua integration yang terinstall di blog NgetehNology.

---

## 🎯 Integration yang Aktif

### 1. @astrojs/tailwind (v6.0.2)
**Status:** ✅ AKTIF
**Fungsi:** CSS Framework utility-first
**Dipakai:** Ya - untuk styling seluruh website

**Konfigurasi:**
```javascript
tailwind({
    nesting: true,
})
```

**Manfaat:**
- Styling cepat dengan utility classes
- Responsive design mudah
- CSS nesting support
- Tree-shaking otomatis (hanya CSS yang dipakai)

---

### 2. @astrojs/svelte (v7.2.0)
**Status:** ✅ AKTIF
**Fungsi:** Framework untuk komponen interaktif
**Dipakai:** Ya - untuk UI components seperti navbar, search, buttons

**Komponen yang Pakai Svelte:**
- `LightDarkSwitch.svelte` - Toggle dark mode
- `Search.svelte` - Search functionality
- `MusicPlayer.svelte` - Music player widget
- `DisplaySettings.svelte` - Display configuration
- `ArchivePanel.svelte` - Archive display
- dll.

**Manfaat:**
- Komponen interaktif yang reaktif
- Lebih ringan dari React/Vue
- No virtual DOM overhead
- Bundle size kecil

---

### 3. @astrojs/sitemap (v3.6.0)
**Status:** ✅ AKTIF
**Fungsi:** Generate sitemap.xml untuk SEO
**Dipakai:** Ya - otomatis generate sitemap

**Konfigurasi:**
```javascript
sitemap({
    filter: (page) => {
        // Filter pages berdasarkan config
        const url = new URL(page);
        const pathname = url.pathname;

        if (pathname === '/anime/' && !siteConfig.pages.anime) {
            return false;
        }
        // ... dst
        return true;
    },
})
```

**Output:** `dist/sitemap-index.xml`

**Manfaat:**
- SEO optimization
- Google Search Console integration
- Auto-discover new pages
- Filter pages yang tidak perlu di-index

---

### 4. @astrojs/partytown (v2.1.4)
**Status:** ✅ AKTIF
**Fungsi:** Run third-party scripts in Web Worker
**Dipakai:** Ya - untuk Microsoft Clarity analytics

**Konfigurasi:**
```javascript
partytown({
    config: {
        forward: ["clarity"],
    },
})
```

**Manfaat:**
- Third-party scripts tidak block main thread
- Website lebih cepat
- Better performance scores
- Analytics tanpa slow down page load

---

### 5. @astrojs/netlify (v6.6.0)
**Status:** ✅ AKTIF
**Fungsi:** Adapter untuk deploy ke Netlify
**Dipakai:** Ya - deployment adapter

**Konfigurasi:**
```javascript
adapter: netlify({
    imageCDN: false,
})
```

**Manfaat:**
- Server-side rendering support
- Edge functions
- Automatic deployments
- Preview deployments untuk PR

---

### 6. @swup/astro (v1.7.0)
**Status:** ✅ AKTIF
**Fungsi:** Page transitions & SPA-like navigation
**Dipakai:** Ya - untuk smooth transitions antar halaman

**Konfigurasi:**
```javascript
swup({
    theme: false,
    animationClass: "transition-swup-",
    containers: ["main"],
    smoothScrolling: false,
    cache: true,
    preload: false,
    accessibility: true,
    updateHead: true,
    updateBodyClass: false,
    globalInstance: true,
    animateHistoryBrowsing: false,
})
```

**Manfaat:**
- Transisi halaman smooth seperti SPA
- No full page reload
- Better UX
- Cache untuk faster navigation

---

### 7. astro-icon (v1.1.5)
**Status:** ✅ AKTIF
**Fungsi:** Icon system dengan Iconify
**Dipakai:** Ya - semua icons di website

**Icon Sets yang Aktif:**
- `fa6-brands` - Font Awesome brands icons
- `fa6-regular` - Font Awesome regular icons
- `fa6-solid` - Font Awesome solid icons
- `mdi` - Material Design Icons

**Contoh Penggunaan:**
```astro
<Icon name="fa6-solid:home" />
<Icon name="mdi:github" />
```

**Manfaat:**
- 100,000+ icons tersedia
- SVG otomatis (bukan font)
- Tree-shaking (hanya icon yang dipakai)
- Customizable size & color

---

### 8. astro-expressive-code (v0.41.3)
**Status:** ✅ AKTIF
**Fungsi:** Advanced code block rendering
**Dipakai:** Ya - semua code blocks di artikel

**Plugins Aktif:**
- `plugin-collapsible-sections` - Collapse lines
- `plugin-line-numbers` - Show line numbers
- `plugin-language-badge` - Show language badge (custom)
- `plugin-custom-copy-button` - Custom copy button (custom)

**Features:**
- Syntax highlighting
- Line numbers
- Line highlighting `{1,3-5}`
- Insert markers `ins={2-4}`
- Delete markers `del={5}`
- Collapsible sections `collapse={1-10}`
- File titles
- Word wrap
- Custom themes

**Contoh:**
````markdown
```python title="exploit.py" showLineNumbers {3,5} ins={2}
# Beautiful code blocks!
```
````

**Manfaat:**
- Code blocks yang indah
- Educational features (ins/del markers)
- Better readability
- Professional look

---

### 9. astro-compress (v2.3.8)
**Status:** ✅ AKTIF (baru ditambahkan)
**Fungsi:** Minify HTML, CSS, JS, SVG
**Dipakai:** Ya - otomatis saat build

**Konfigurasi:**
```javascript
compress({
    CSS: true,
    HTML: {
        removeAttributeQuotes: false,
    },
    Image: false,  // Tidak compress images
    JavaScript: true,
    SVG: true,
})
```

**Manfaat:**
- File size lebih kecil (30-50% reduction)
- Faster page load
- Better Lighthouse scores
- Bandwidth saving

**Sebelum:**
- `404.html` → 200KB

**Sesudah:**
- `404.html` → 133KB (~33% reduction)

---

### 10. astro-robots-txt (v1.0.0)
**Status:** ✅ AKTIF (baru ditambahkan)
**Fungsi:** Auto-generate robots.txt
**Dipakai:** Ya - otomatis saat build

**Konfigurasi:**
```javascript
robotsTxt({
    sitemap: true,
})
```

**Output** (`dist/robots.txt`):
```
User-agent: *
Disallow: /_astro/

Sitemap: https://astro-blog-ngetehnology.netlify.app/sitemap-index.xml
```

**Manfaat:**
- SEO compliance
- Crawling optimization
- Auto-reference sitemap
- Block internal /_astro/ directory

---

### 11. Built-in Prefetch
**Status:** ✅ AKTIF (baru ditambahkan)
**Fungsi:** Prefetch links untuk faster navigation
**Dipakai:** Ya - semua links

**Konfigurasi:**
```javascript
prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
}
```

**Manfaat:**
- Instant navigation
- Prefetch on hover
- Better UX
- Feels like SPA

---

## 🛠️ Dependencies Penting (Bukan Integration)

### 1. pagefind (v1.4.0)
**Fungsi:** Static search index
**Dipakai:** Ya - search functionality

**Command:** `pnpm run build` akan auto run `pagefind --site dist`

**Manfaat:**
- Full-text search tanpa backend
- Fast & accurate
- Privacy-friendly (no external service)
- Auto-index semua content

---

### 2. sharp (v0.34.3)
**Fungsi:** Image processing library
**Dipakai:** Ya - untuk optimize images

**Konfigurasi:**
```javascript
image: {
    service: {
        entrypoint: "astro/assets/services/sharp",
    },
}
```

**Manfaat:**
- Auto-optimize images
- Format conversion (webp)
- Responsive images
- Lazy loading

---

### 3. Markdown & Rehype Plugins

**Remark Plugins (Markdown processing):**
- `remark-math` - LaTeX math support
- `remark-reading-time` - Calculate reading time
- `remark-excerpt` - Generate excerpt
- `remark-directive` - Custom directives (:::note, ::github)
- `remark-sectionize` - Wrap sections
- `remark-mermaid` - Mermaid diagrams

**Rehype Plugins (HTML processing):**
- `rehype-katex` - Render math equations
- `rehype-slug` - Add IDs to headings
- `rehype-autolink-headings` - Add anchor links
- `rehype-components` - Custom components

**Manfaat:**
- Rich markdown features
- Math equations support
- Auto table of contents
- Custom components dalam markdown

---

## 📊 Integration yang TIDAK Dipakai

### astro-seo (v0.8.4)
**Status:** ⚠️ INSTALLED tapi TIDAK AKTIF
**Location:** `devDependencies`
**Fungsi:** SEO meta tags helper
**Kenapa tidak aktif:** SEO sudah di-handle manual di Layout.astro

**Cara Aktifkan (Opsional):**
```astro
---
import { SEO } from "astro-seo";
---
<SEO
  title="Page Title"
  description="Page description"
  openGraph={{
    basic: {
      title: "Title",
      type: "website",
      image: "https://...",
    }
  }}
/>
```

---

### astro-font (v1.1.0)
**Status:** ⚠️ INSTALLED tapi TIDAK AKTIF
**Location:** `devDependencies`
**Fungsi:** Font optimization
**Kenapa tidak aktif:** Font sudah loaded via @fontsource

**Cara Aktifkan (Opsional):**
```javascript
import AstroFont from "astro-font";

export default defineConfig({
  integrations: [
    AstroFont({
      config: [{
        name: "Roboto",
        src: [{
          style: 'normal',
          weight: '400',
          path: './public/fonts/roboto.woff2'
        }]
      }]
    })
  ]
})
```

---

## 📈 Statistik Integration

### Aktif & Berfungsi
- ✅ 11 integration/fitur aktif
- ✅ Performance optimization: 3 (compress, prefetch, partytown)
- ✅ SEO: 2 (sitemap, robots.txt)
- ✅ UI Framework: 2 (Tailwind, Svelte)
- ✅ Developer Experience: 4 (expressive-code, icon, swup, netlify)

### Installed tapi Tidak Aktif
- ⚠️ 2 integration (astro-seo, astro-font)

### Total Dependencies
- **Dependencies:** 73 packages
- **DevDependencies:** 9 packages
- **Total:** 82 packages

---

## 🎨 Cara Pakai Integration

### Tambah Integration Baru

```bash
# Install integration
pnpm add @astrojs/integration-name

# Update astro.config.mjs
import integration from "@astrojs/integration-name";

export default defineConfig({
  integrations: [
    integration({
      // config
    })
  ]
})
```

### Hapus Integration

```bash
# Remove dari astro.config.mjs dulu
# Lalu uninstall
pnpm remove @astrojs/integration-name
```

---

## 🔍 Integration yang Mungkin Berguna (Rekomendasi)

### 1. @astrojs/mdx
**Fungsi:** MDX support (JSX di Markdown)
**Kapan Pakai:** Jika ingin komponen interaktif di dalam markdown
**Install:**
```bash
pnpm add @astrojs/mdx
```

### 2. @astrojs/react atau @astrojs/vue
**Fungsi:** Framework alternatif
**Kapan Pakai:** Jika tim lebih familiar dengan React/Vue
**Note:** Sudah pakai Svelte, tidak perlu tambah framework lain

### 3. @astrojs/image
**Status:** Deprecated, pakai built-in `astro:assets` aja
**Already Using:** ✅ Sharp service

### 4. astro-imagetools
**Fungsi:** Advanced image optimization
**Kapan Pakai:** Jika perlu image manipulation advanced
**Note:** Sharp sudah cukup untuk most cases

---

## 💡 Tips Optimasi Integration

### 1. Jangan Over-Install
- Hanya install yang benar-benar dipakai
- Lebih banyak integration = lebih lambat build
- Current setup sudah optimal!

### 2. Check Update Berkala
```bash
# Check outdated packages
pnpm outdated

# Update
pnpm update
```

### 3. Tree-Shaking
Most integration sudah support tree-shaking:
- Tailwind: hanya CSS yang dipakai
- Icons: hanya icon yang dipakai
- Code: hanya bahasa yang dipakai

### 4. Monitor Build Time
```bash
# Build dengan timer
time pnpm run build
```

Current build time: ~15-20 seconds (bagus!)

---

## 📚 Resources

**Official Astro Integrations:**
- https://astro.build/integrations/

**Integration Directory:**
- https://astro.new/

**Dokumentasi:**
- https://docs.astro.build/en/guides/integrations-guide/

---

## 🔄 Update Log

- **2025-10-27**: Initial documentation
- **2025-10-27**: Added compress, robots-txt, built-in prefetch
- **[Future]**: Update when adding new integrations

---

**📝 Maintained by: NgetehNology Team**
