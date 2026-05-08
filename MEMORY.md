# MEMORY.md — HỆ THỐNG BỘ NHỚ DỰ ÁN HOA TƯƠI THANH NGỌC

> **Mục đích:** Lưu trữ lịch sử công việc, quyết định thiết kế, kết quả đạt được và bước tiếp theo cho cả hai agent Claude và Anger.
> **Quy tắc:** Mọi task hoàn thành PHẢI được ghi vào đây. Đọc file này ĐẦU MỖI SESSION mới.

---

## TRẠNG THÁI DỰ ÁN HIỆN TẠI

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Website core | ✅ Live | Cloudflare Workers |
| Chatbot Ngọc (Web) | ✅ Live | TanStack server function → Lovable AI |
| Chatbot Zalo OA | ✅ Live | n8n workflow |
| SEO cơ bản | 🔄 Đang tối ưu | Schema, meta tags |
| Blog content | 🔄 Đang xây dựng | Cần thêm bài |
| Google Search Console | ❓ Cần xác nhận | Chưa rõ trạng thái |
| Google Analytics 4 | ❓ Cần xác nhận | Chưa rõ trạng thái |

---

## LỊCH SỬ CÔNG VIỆC

### [2026-05-08 17:30] — Anger — Khởi tạo hệ thống Agent

- **Trạng thái:** ✅ Hoàn thành
- **Việc đã làm:**
  - Tạo file `anger.md` — cấu hình agent SEO/Design cho dự án
  - Tạo file `MEMORY.md` — hệ thống bộ nhớ chung cho Claude & Anger
  - Cập nhật `C:\Users\phong\.claude\CLAUDE.md` — gộp nguyên tắc làm việc + thông tin dự án
- **Kết quả:** Hệ thống 2-agent (Claude + Anger) được thiết lập, sẵn sàng hoạt động
- **Issues phát sinh:** Chưa có
- **Bước tiếp theo:**
  - [ ] Anger: Thực hiện SEO audit toàn site
  - [ ] Anger: Kiểm tra trạng thái Google Search Console & GA4
  - [ ] Claude: Cập nhật `CLAUDE.md` project với tham chiếu đến `anger.md`

---

### [2026-05-08 18:13] — Claude — Bảo mật & Cấu hình (Environment Variables)

- **Trạng thái:** ✅ Hoàn thành
- **Việc đã làm:**
  - Tạo file `.env` tại thư mục gốc để quản lý tập trung các Key (Groq, Zalo, Admin).
  - Chuyển toàn bộ Key cứng từ `zalo-bot/src/index.js` sang biến môi trường.
  - Xác nhận `src/server/chat.functions.ts` (Web Bot) đã dùng biến môi trường đúng cách.
- **Kết quả:** Code sạch hơn, bảo mật hơn, sẵn sàng để commit mà không lo lộ Key.
- **Bước tiếp theo:** User cần điền Key Groq thật vào file `.env`.

---

### [2026-05-08 17:38] — Anger — Full Project Audit (Lần đầu)

- **Trạng thái:** ✅ Hoàn thành
- **Việc đã làm:** Quét toàn bộ codebase — routes, data, components, sitemap, robots.txt, schema, blog, dependencies
- **Kết quả:** Xem báo cáo chi tiết bên dưới (section AUDIT REPORT)
- **Issues phát sinh:** 7 vấn đề phát hiện (3 P0, 2 P1, 2 P2)
- **Bước tiếp theo:** Claude xử lý P0 trước, sau đó P1

---

### [2026-05-08 09:xx] — Claude — Phát triển Website (Session trước)

- **Trạng thái:** ✅ Hoàn thành (theo conversation history)
- **Việc đã làm:** Cấu hình và troubleshoot Zalo OA + Web chatbot
- **Kết quả:** Cả 2 chatbot hoạt động ổn định
- **Issues phát sinh:** 403 Forbidden (đã fix), Zalo webhook timeout 408 (đã fix)
- **Bước tiếp theo:** Tối ưu SEO, tiếp tục phát triển tính năng

---

## QUYẾT ĐỊNH KIẾN TRÚC & THIẾT KẾ

| Ngày | Quyết định | Lý do |
|---|---|---|
| 2026-05-08 | Dùng TanStack Start + Vite | Framework của Lovable, đã được cấu hình sẵn |
| 2026-05-08 | Tailwind CSS v4 `@theme inline` | Consistency với `@lovable.dev/vite-tanstack-config` |
| 2026-05-08 | Static data (no DB) | Đơn giản, deploy nhanh, phù hợp quy mô hiện tại |
| 2026-05-08 | Cloudflare Workers deploy | Edge computing, CDN toàn cầu, phù hợp với Vite config |
| 2026-05-08 | Bot persona "Ngọc" | Tạo cảm giác gần gũi, chuyên nghiệp với khách hàng |

---

## BACKLOG — VIỆC CẦN LÀM

### 🔴 P0 — Khẩn cấp

- [ ] Xác nhận Google Search Console đã submit sitemap chưa
- [ ] Kiểm tra GA4 tracking có hoạt động không

### 🟡 P1 — Quan trọng

- [ ] **SEO Audit toàn site** — Anger thực hiện
  - [ ] Kiểm tra meta title/description tất cả trang
  - [ ] Kiểm tra schema markup (LocalBusiness, Product, FAQ)
  - [ ] Kiểm tra Core Web Vitals
  - [ ] Kiểm tra internal linking
- [ ] **Duplicate slug** trong `products.ts` (đã phát hiện, chưa fix)
- [ ] Thêm Google Maps embed vào trang `/lien-he`
- [ ] Tối ưu alt text cho ảnh sản phẩm

### 🟢 P2 — Cải tiến dài hạn

- [ ] Viết thêm 5–10 bài blog SEO (long-tail keywords)
- [ ] Thêm review/rating section cho sản phẩm
- [ ] Tích hợp Zalo share button
- [ ] Trang landing đặc biệt cho mùa lễ (8/3, Valentine, Tết)
- [ ] Schema markup BreadcrumbList cho tất cả trang

---

## KPI & METRICS THEO DÕI

| Metric | Baseline | Mục tiêu 1 tháng | Mục tiêu 3 tháng |
|---|---|---|---|
| Organic traffic | Chưa đo | +20% | +100% |
| Keyword top 10 | Chưa đo | 5 từ khóa | 20 từ khóa |
| LCP | Chưa đo | < 2.5s | < 2s |
| Chatbot sessions/tuần | Chưa đo | > 20 | > 50 |
| Bounce rate | Chưa đo | < 65% | < 55% |

---

## GHI CHÚ KỸ THUẬT QUAN TRỌNG

```
# Biến môi trường cần thiết
LOVABLE_API_KEY=***  ← Không commit, lưu tại C:\Workspace\.secrets\

# CDN ảnh sản phẩm
https://hoatuoithanhngoc.com/image/responsive/{slug}-{400|800}.webp

# Deploy command
npx wrangler deploy

# Dev server
npm run dev  → http://localhost:8080
```

---

## FORMAT GHI BỘ NHỚ (TEMPLATE)

Khi hoàn thành task, Claude hoặc Anger dùng format sau để append vào section LỊCH SỬ CÔNG VIỆC:

```markdown
### [YYYY-MM-DD HH:MM] — [Anger/Claude] — [Tên task]
- **Trạng thái:** ✅ Hoàn thành | 🔄 Đang làm | ❌ Blocked
- **Việc đã làm:** ...
- **Kết quả / Impact:** ...
- **Issues phát sinh:** ...
- **Bước tiếp theo:** ...
```

---

*File này được cập nhật tự động sau mỗi task. Đọc trước khi bắt đầu session mới.*
