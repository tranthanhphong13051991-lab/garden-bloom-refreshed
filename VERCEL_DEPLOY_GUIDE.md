# 🚀 Hướng Dẫn Deploy Lên Vercel

Dự án này sử dụng **TanStack Start (SSR)** với **Vite 7**, **React 19**, **Tailwind CSS v4**.  
Thay vì deploy qua Cloudflare Workers (phức tạp), giờ đây bạn có thể deploy lên **Vercel** dễ dàng.

---

## 📋 Các bước deploy lên Vercel

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Cài Vercel CLI (nếu chưa có)

```bash
npm install -g vercel
```

### Bước 3: Build dự án

```bash
npm run build
```

### Bước 4: Deploy lên Vercel

```bash
# Đăng nhập Vercel (mở trình duyệt)
vercel login

# Deploy lên production
vercel --prod
```

Hoặc deploy bằng cách **kết nối GitHub repository** với Vercel:

1. Vào [vercel.com](https://vercel.com) → **Add New Project**
2. Import GitHub repository `garden-bloom-refreshed`
3. Framework: **Other** (Vercel tự động nhận diện)
4. Build command: `npm run build`
5. Output directory: `dist/client`
6. **Deploy**

---

## 🛠 Cấu trúc file cho Vercel

| File | Mục đích |
|------|----------|
| `vercel.json` | Cấu hình routing, build, serverless functions |
| `api/index.js` | Serverless function chạy SSR TanStack Start |
| `vite.config.ts` | Disable Cloudflare plugin (không dùng Workers nữa) |

---

## 📝 Lưu ý quan trọng

- **Serverless Functions**: Dự án chạy SSR nên cần Node.js runtime. Vercel hỗ trợ miễn phí.
- **Môi trường**: Các biến môi trường (`VITE_*`) tự động được Vercel inject.
- **Domain**: Có thể dùng domain mặc định `*.vercel.app` hoặc trỏ domain riêng.

---

## 🔄 Cập nhật khi có code mới

### Cách 1: GitHub + Auto Deploy
Push code lên GitHub → Vercel tự động build và deploy.

### Cách 2: CLI
```bash
vercel --prod
```

---

## ❌ So sánh với Cloudflare Workers (cũ)

| Tiêu chí | Cloudflare Workers | Vercel ✅ |
|----------|-------------------|-----------|
| Đăng ký | Cần tài khoản CF, cấu hình phức tạp | Đăng nhập bằng GitHub |
| Deploy | Cần wrangler login + config DNS | `vercel --prod` hoặc auto từ GitHub |
| DNS | Phải trỏ CNAME từ iNET | Vercel tự xử lý |
| Chi phí | Miễn phí (hạn chế) | Miễn phí (hobby plan) |
| SSR | Workers (edge) | Serverless Functions (Node.js) |
| Domain custom | Cần cấu hình phức tạp | Dễ dàng trong dashboard |

---

## 🎯 Kết quả

Sau khi deploy, bạn sẽ có:
- URL: `https://garden-bloom-refreshed.vercel.app`
- Hoặc domain custom: `https://hoatuoithanhngoc.com` (cấu hình trong Vercel Dashboard)