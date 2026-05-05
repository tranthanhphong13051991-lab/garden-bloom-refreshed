# System Patterns

## Kiến trúc tổng quan
```
src/
├── routes/          # File-based routing (TanStack Router)
├── components/
│   ├── site/        # Layout components (Header, Footer, CartDrawer, ChatBot, ...)
│   └── ui/          # Radix UI primitives (shadcn/ui)
├── data/            # Static data (products, blog, tags, site info)
├── server/          # TanStack server functions (chat AI, admin analyze)
├── store/           # Zustand state (cart)
└── styles.css       # Tailwind v4 với custom tokens
```

## Routing
- File-based routing qua TanStack Router
- `routeTree.gen.ts` — auto-generated, KHÔNG sửa tay
- Mỗi route file export `Route = createFileRoute(path)({...})` và component

| Route | URL |
|---|---|
| `__root.tsx` | Shell + global `<head>` (SEO, JSON-LD LocalBusiness) |
| `index.tsx` | `/` Homepage |
| `san-pham.tsx` + `san-pham.index.tsx` | `/san-pham` Danh sách sản phẩm |
| `san-pham.$slug.tsx` | `/san-pham/:slug` Chi tiết sản phẩm |
| `blog.index.tsx` + `blog.$slug.tsx` | `/blog` và `/blog/:slug` |
| `the.index.tsx` + `the.$tag.tsx` | `/the` và `/the/:tag` |
| `admin.tsx` | `/admin` Tool thêm sản phẩm |
| `gioi-thieu.tsx` | `/gioi-thieu` |
| `lien-he.tsx` | `/lien-he` |
| `chinh-sach-*.tsx` | Các trang chính sách |

## Data Pattern — Thêm sản phẩm mới
1. Thêm entry vào mảng `raw[]` trong `src/data/products.ts`
2. Chỉ cần điền các field tối thiểu: `slug`, `name`, `category`, `_img`, `short`, `description`, `keywords`
3. Hàm `map()` tự hydrate: `faqs`, `meaning`, `colors`, `sizes`, `occasions`, `careTips`, `materials`, `gallery`
4. Ảnh đặt tại `public/images/images/` — format: `ten-slug.webp` hoặc `.jpg`
5. Gallery ảnh: thêm vào `galleryImgs[]` với tên file (không cần đường dẫn đầy đủ)

```ts
// Ví dụ thêm sản phẩm mới tối giản:
{
  slug: "bo-hoa-vi-du",
  name: "Bó Hoa Ví Dụ",
  category: "bo-hoa",
  badge: "Bán chạy",        // optional: "Bán chạy" | "Nổi bật" | bỏ qua
  _img: "ten-file-anh.webp",
  short: "Bó hoa ví dụ từ Thanh Ngọc — mô tả ngắn.",
  description: "Mô tả chi tiết 2–3 câu. Câu cuối: Giao 2 giờ tại TP.HCM.",
  keywords: ["từ khóa seo", "có từ tphcm"],
  galleryImgs: ["ten-anh-goc-2.webp"],
}
```

## AI Chatbot Pattern
- File: `src/server/chat.functions.ts`
- Server function POST → Groq API (`llama-3.3-70b-versatile`)
- Trả về `{ reply: string, products?: ProductCard[] }` — frontend hiển thị card sản phẩm liên quan
- Bot "Ngọc": xưng "mình", KHÔNG báo giá, hướng khách Zalo/gọi điện

## Admin Analyze Pattern
- File: `src/server/adminAnalyze.functions.ts`
- Upload ảnh base64 → Claude Anthropic vision → JSON sản phẩm
- `src/routes/admin.tsx`: form upload ảnh, preview, copy code, hỗ trợ gallery 4 góc

## State Management
- **Cart:** Zustand store `src/store/cart.ts`, persist to `localStorage` key `thanh-ngoc-cart`
- Không có global state khác — mọi data lấy từ import static

## Layout
Mọi trang dùng `<SiteLayout>` = `Header` + `Footer` + `CartDrawer` + `FloatingActions` + `ChatBot`

## Styling Rules
- Tailwind v4, custom tokens trong `src/styles.css` (`--color-cream`, `--color-gold`, `--color-rose`, v.v.)
- Fonts: **Cormorant Garamond** (serif, headings) + **Inter** (body)
- Path alias `@/` → `src/`
- **KHÔNG** thêm plugins Vite thủ công — `@lovable.dev/vite-tanstack-config` đã bao gồm
