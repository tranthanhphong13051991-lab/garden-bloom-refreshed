# Hướng Dẫn Deploy Lên Cloudflare Workers

## 1. Đăng nhập Cloudflare

Mở Terminal tại thư mục dự án:

```bash
npx wrangler login
```

Trình duyệt sẽ mở ra → Đăng nhập tài khoản Cloudflare của bạn → **Allow**.

## 2. Deploy Worker lên Cloudflare

```bash
npx wrangler deploy
```

Sau khi chạy xong, bạn sẽ thấy URL dạng:
```
https://tanstack-start-ts.<your-account>.workers.dev
```

> Lưu URL này lại (thay `<your-account>` bằng tên account Cloudflare của bạn)

---

## 3. Kết nối domain hoatuoithanhngoc.com

### Cách 1: Dùng Cloudflare làm DNS (khuyên dùng)

Nếu domain `hoatuoithanhngoc.com` chưa dùng Cloudflare DNS:

1. Vào [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Add a Site**
2. Nhập `hoatuoithanhngoc.com`
3. Chọn **Free** plan
4. Cloudflare sẽ cung cấp 2 nameserver (VD: `naveen.ns.cloudflare.com`)
5. Vào trang quản lý iNET → thay đổi nameserver của domain thành 2 nameserver đó
6. Đợi 1-24h DNS propagate

Sau đó:

1. Cloudflare Dashboard → **Workers & Pages** → Chọn worker `tanstack-start-ts`
2. Tab **Triggers** → **Custom Domains** → **Add Custom Domain**
3. Nhập: `hoatuoithanhngoc.com`
4. Cloudflare tự động cấp SSL + proxy DNS

### Cách 2: Trỏ CNAME từ iNET (không dùng Cloudflare DNS)

Vào trang quản lý DNS của **iNET**, thêm các bản ghi:

| Loại  | Tên  | Giá trị                                      |
|-------|------|----------------------------------------------|
| CNAME | @    | `tanstack-start-ts.<your-account>.workers.dev` |
| CNAME | www  | `tanstack-start-ts.<your-account>.workers.dev` |

---

## 4. Auto-deploy từ GitHub (CI/CD)

Để mỗi lần push code lên GitHub tự động deploy:

1. Cloudflare Dashboard → **Workers & Pages** → **Create**
2. Chọn **Pages** tab → **Connect to Git**
3. Chọn repository: `garden-bloom-refreshed`
4. **Build settings:**
   - Framework preset: `None`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: (để trống)
5. Deploy branch: `main`
6. Click **Save and Deploy**

Sau đó mỗi lần push code lên GitHub, Cloudflare tự động build và deploy.

---

## 5. Deploy lại thủ công khi có cập nhật

```bash
npm run build
npx wrangler deploy
```

---

## Tóm tắt

1. `npx wrangler login` → đăng nhập Cloudflare
2. `npx wrangler deploy` → deploy Worker
3. Cloudflare Dashboard → Workers & Pages → Custom Domains → thêm `hoatuoithanhngoc.com`
4. (Tùy chọn) Nếu dùng Cloudflare DNS: iNET cập nhật nameserver
5. (Tùy chọn) Connect to Git để auto-deploy