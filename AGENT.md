# HIẾN PHÁP DÀNH CHO AI (AGENT.md)

Đây là tài liệu duy nhất cung cấp quy tắc và thông tin kiến trúc cho các AI Assistant (Claude, Cursor, Roo Code, v.v.) khi làm việc với dự án này. Không tạo thêm các file theo dõi lịch sử (như MEMORY.md, TODO.md) để tránh rác dự án.

## 1. THÔNG TIN DỰ ÁN
- **Tên:** Hoa Tươi Thanh Ngọc
- **Loại hình:** Website TMĐT tĩnh (không có Database) kết hợp AI Chatbot.
- **Tech Stack:** TanStack Start + Vite, Tailwind CSS v4, Cloudflare Workers.
- **Lệnh chạy:**
  - Dev: `npm run dev`
  - Deploy: `.\deploy.ps1` hoặc `npm run deploy` (tự động build & đẩy lên Cloudflare).

## 2. QUY TẮC LÀM VIỆC (DÀNH CHO AI)
1. **Chỉ làm đúng yêu cầu:** Không tự ý sửa đổi toàn bộ kiến trúc, không lan man sang file không liên quan.
2. **Không viết đè biến môi trường:** Mọi biến bảo mật nằm ở `.env`. Không hardcode API Key vào code.
3. **Chia nhỏ task:** Hoàn thành từng yêu cầu nhỏ, để user test, chạy tốt thì user sẽ commit Git.
4. **Không tạo file theo dõi rác:** Không tạo `.claude/`, `memory-bank/`, `anger.md` hay `MEMORY.md`. 

## 3. KIẾN TRÚC & DỮ LIỆU
- **Routing:** File-based ở `src/routes/`. (VD: `__root.tsx`, `index.tsx`, `san-pham.tsx`).
- **Data:** Toàn bộ dữ liệu nằm tĩnh ở `src/data/` (`products.ts`, `blog.ts`, `site.ts`). Muốn thêm sản phẩm thì thêm vào mảng `raw[]` trong `products.ts`.
- **State:** Zustand ở `src/store/cart.ts` có lưu vào localStorage.
- **Chatbot AI:** Nằm ở `src/server/ai.service.ts`. Model đang dùng: `llama-3.3-70b-versatile` của Groq. Key đọc từ biến môi trường. Persona là "Ngọc" - nhân viên tư vấn hoa tươi, KHÔNG báo giá trực tiếp.

## 4. UI/UX & SEO
- **Design Tokens:** `--color-cream`, `--color-gold`, `--color-rose`, `--gradient-hero`. (Khai báo inline trong Tailwind CSS v4).
- **Typography:** Font Heading là `Cormorant Garamond` (Sang trọng), Font Body là `Inter` (Hiện đại).
- **SEO Bắt Buộc:** Thẻ H1 duy nhất mỗi trang, meta description đầy đủ, có Alt text cho toàn bộ ảnh sản phẩm, URL slug tiếng Việt không dấu.
- **Mobile First:** Luôn tối ưu giao diện điện thoại trước tiên. Dùng Skeleton UI và Lazy loading.
