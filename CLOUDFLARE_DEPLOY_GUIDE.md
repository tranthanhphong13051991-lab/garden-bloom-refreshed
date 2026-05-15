# Hướng Dẫn Deploy Lên Cloudflare Workers & Trỏ DNS từ iNET

## QUAN TRỌNG: DNS giữ ở iNET – Không chuyển nameserver

Bạn **KHÔNG cần** chuyển nameserver sang Cloudflare. DNS vẫn quản lý ở **iNET**, chỉ cần thêm bản ghi CNAME trỏ về Cloudflare Workers.

---

## 1. Build dự án (đã chạy xong)

```bash
npm install
npm run build
```

---

## 2. Đăng nhập Cloudflare & Deploy Worker

Mở Terminal tại thư mục dự án (`d:\garden-bloom-renewed-main`):

```bash
# Bước 1: Đăng nhập Cloudflare (sẽ mở trình duyệt)
npx wrangler login
# → Trình duyệt mở ra → Đăng nhập tài khoản Cloudflare của bạn → Allow

# Bước 2: Deploy Worker lên Cloudflare
npx wrangler deploy
```

Sau khi chạy xong, bạn sẽ thấy kết quả như:
```
https://tanstack-start-ts.<tên-account>.workers.dev
```

> **📝 Ghi lại URL này**, ví dụ: `https://tanstack-start-ts.ten-account.workers.dev`

---

## 3. Trỏ DNS từ iNET về Cloudflare Workers

Vào trang quản lý domain của **iNET** → **DNS / Bản ghi DNS**, thêm các bản ghi sau:

### Bản ghi chính (hoatuoithanhngoc.com)

| Loại  | Tên (Host) | Giá trị (Points to)                          |
|-------|------------|----------------------------------------------|
| CNAME | @          | `tanstack-start-ts.<tên-account>.workers.dev` |
| CNAME | www        | `tanstack-start-ts.<tên-account>.workers.dev` |

> **Giải thích:**
> - `@` là chính domain (hoatuoithanhngoc.com)
> - `www` là www.hoatuoithanhngoc.com
> - Thay `<tên-account>` bằng account Cloudflare thực tế của bạn

### Hướng dẫn từng bước trên giao diện iNET:

1. Đăng nhập [iNET](https://inet.vn)
2. Vào **Quản lý domain** → Chọn `hoatuoithanhngoc.com`
3. Chọn **DNS / Bản ghi DNS**
4. Click **Thêm bản ghi**:
   - Loại: **CNAME**
   - Host: để trống hoặc `@`
   - Giá trị: `tanstack-start-ts.<tên-account>.workers.dev`
   - TTL: 300 hoặc để mặc định
   - Lưu
5. Thêm bản ghi thứ hai:
   - Loại: **CNAME**
   - Host: `www`
   - Giá trị: `tanstack-start-ts.<tên-account>.workers.dev`
   - Lưu

### Nếu iNET yêu cầu A record cho domain chính (@)

Một số nhà cung cấp không cho CNAME ở root (domain chính). Nếu vậy, làm thay thế:

| Loại | Tên | Giá trị |
|------|-----|---------|
| A | @ | `192.0.2.1` |
| CNAME | www | `tanstack-start-ts.<tên-account>.workers.dev` |

Hoặc tốt nhất: liên hệ iNET hỗ trợ CNAME flatten/ANAME cho root domain.

---

## 4. Cấu hình Cloudflare cho phép domain ngoài

Sau khi deploy worker, vào **Cloudflare Dashboard**:

1. Dashboard → **Workers & Pages**
2. Click vào worker `tanstack-start-ts`
3. Tab **Triggers**
4. Mục **Routes** → **Add Route**
5. Nhập: `hoatuoithanhngoc.com/*`
   (Dấu `/*` ở cuối là bắt buộc)
6. **Add route**

---

## 5. Auto-deploy từ GitHub (CI/CD) – Khuyến nghị

Vào **Cloudflare Dashboard**:

1. **Workers & Pages** → **Create** → **Pages** tab
2. **Connect to Git** → Chọn `garden-bloom-refreshed`
3. **Build settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. **Save and Deploy**

Sau đó mỗi lần push code lên GitHub, Cloudflare tự động build và deploy lại.

---

## 6. Kiểm tra

Sau khi DNS propagate (thường 5-30 phút, có thể lâu hơn):

1. Mở trình duyệt: `https://hoatuoithanhngoc.com`
2. Mở: `https://www.hoatuoithanhngoc.com`
3. Nếu chưa thấy → đợi thêm hoặc dùng: https://dnschecker.org

---

## Tóm tắt nhanh

```bash
cd d:\garden-bloom-renewed-main
npx wrangler login          # 1. Đăng nhập Cloudflare
npx wrangler deploy         # 2. Deploy worker → lấy URL
```

Sau đó:
- **iNET**: Thêm 2 CNAME record (@ và www) trỏ đến worker URL
- **Cloudflare Dashboard**: Worker → Triggers → Routes → thêm `hoatuoithanhngoc.com/*`

✅ Xong! Không cần chuyển nameserver.