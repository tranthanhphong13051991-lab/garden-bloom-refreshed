# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚡ ĐỌC NGAY KHI BẮT ĐẦU SESSION

```
[project-root]/
├── CLAUDE.md   ← File này (stack, kiến trúc, quy tắc project)
├── anger.md    ← Agent SEO/Design: đánh giá, lên kế hoạch, audit
├── MEMORY.md   ← BỘ NHỚ CHUNG: lịch sử, kết quả, backlog — ĐỌC TRƯỚC KHI LÀM
└── TODO.md     ← Task list hiện tại (nếu có)
```

> **Quy tắc:** Claude thực thi code. Anger lên kế hoạch & audit SEO/UI. Sau mỗi task → ghi kết quả vào `MEMORY.md`.

## Commands

Node.js is installed at `D:\04_Phan_Mem\Program Files\nodejs`. Use full path or ensure it's in PATH when running commands.

```bash
# Install dependencies
npm install

# Dev server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Format
npm run format
```

There are no tests configured in this project.

## Architecture

**Hoa Tươi Thanh Ngọc** — a Vietnamese florist e-commerce website (Bình Thạnh, TP.HCM). Built with TanStack Start + Vite, configured via `@lovable.dev/vite-tanstack-config` (wraps Vite — do not add plugins manually that it already provides: tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare, etc.).

### Routing

File-based routing via TanStack Router. Route files live in `src/routes/`:

| Route file | URL |
|---|---|
| `__root.tsx` | Shell + global `<head>` (SEO, JSON-LD LocalBusiness schema) |
| `index.tsx` | `/` — Homepage |
| `san-pham.tsx` | `/san-pham` — Product listing with category filter |
| `san-pham.$slug.tsx` | `/san-pham/:slug` — Product detail with JSON-LD Product schema |
| `blog.index.tsx` | `/blog` — Blog listing |
| `blog.$slug.tsx` | `/blog/:slug` — Blog post |
| `the.index.tsx` / `the.$tag.tsx` | `/the` / `/the/:tag` — Tag pages |
| `gioi-thieu.tsx` | `/gioi-thieu` — About |
| `lien-he.tsx` | `/lien-he` — Contact |

`src/routeTree.gen.ts` is auto-generated — never edit it manually.

### Data layer

All data is static (no database). Sources in `src/data/`:

- **`products.ts`** — All products defined in `raw[]` array with minimal fields; a `map()` call hydrates defaults (FAQs, care tips, sizes, colors, occasions, materials, gallery) from per-category lookup tables. Add new products by appending to `raw[]`. Images are served from CDN `https://hoatuoithanhngoc.com/image/responsive/{slug}-{400|800}.webp`.
- **`blog.ts`** — Blog posts with inline Markdown-lite content (supports `## heading`, paragraphs, `- list`).
- **`tags.ts`** — Tag definitions and slug helpers.
- **`site.ts`** — Single `SITE` constant with all business info (address, phones, social links, geo). Import this everywhere instead of hardcoding.

### State management

`src/store/cart.ts` — Zustand store with `persist` middleware (localStorage key `thanh-ngoc-cart`). Manages cart items, open/close drawer state, and totals.

### Layout

Every page wraps content in `<SiteLayout>` which composes: `Header` + `Footer` + `CartDrawer` + `FloatingActions` + `ChatBot`.

### AI Chatbot

`src/server/chat.functions.ts` — TanStack server function that proxies to Lovable AI gateway (`https://ai.gateway.lovable.dev`). Requires env var `LOVABLE_API_KEY`. The bot persona is "Ngọc", a florist consultant.

### Styling

Tailwind CSS v4 via `@theme inline` in `src/styles.css`. Custom design tokens: `--color-cream`, `--color-gold`, `--color-rose`, `--gradient-hero`, `--shadow-soft`, `--shadow-elegant`. Fonts: **Cormorant Garamond** (serif, headings) + **Inter** (body). The `@` path alias maps to `src/`.

### Deployment

Configured for Cloudflare Workers via `wrangler.jsonc`. Build output targets the Workers runtime. Run `npx wrangler deploy` to deploy.
