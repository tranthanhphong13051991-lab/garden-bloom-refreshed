# Tech Context

## Stack chính
| Công nghệ | Phiên bản | Vai trò |
|---|---|---|
| React | 19 | UI framework |
| TanStack Start | ~1.167 | Full-stack meta-framework |
| TanStack Router | ~1.168 | File-based routing |
| Vite | ~7.3 | Build tool |
| Tailwind CSS | v4 | Styling |
| Zustand | ~5.0 | Cart state |
| Cloudflare Workers | — | Deploy target |
| Wrangler | ~4.87 | CF deployment tool |
| TypeScript | ~5.8 | Language |

## AI / API
| Service | Dùng cho |
|---|---|
| Groq API (`llama-3.3-70b-versatile`) | Chatbot "Ngọc" realtime |
| Anthropic Claude (vision) | Admin: phân tích ảnh sản phẩm |

## Env vars (file `.dev.vars` — KHÔNG commit)
```
GROQ_API_KEY=...
ANTHROPIC_API_KEY=...
ADMIN_PASSWORD=...
```

## Cài đặt & chạy
```bash
# Node.js tại D:\04_Phan_Mem\Program Files\nodejs
npm install

npm run dev       # http://localhost:8080
npm run build     # Production build
npm run preview   # Preview build
npm run lint
npm run format
```

## Deploy
```bash
npm run deploy
# hoặc: vite build && wrangler deploy -c dist/server/wrangler.json
```

## Cấu hình build
- `@lovable.dev/vite-tanstack-config` wraps Vite — đã bao gồm: tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare
- **Không thêm** các plugins trên vào config thủ công
- `wrangler.jsonc` — target Cloudflare Workers runtime

## Lưu ý quan trọng
- `src/routeTree.gen.ts` — auto-generated bởi TanStack Router, KHÔNG sửa tay
- Ảnh sản phẩm để tại `public/images/images/` (2 cấp `images`)
- Logo tại `public/images/logo/`
- Background tại `public/images/bg/`
