# 📋 Dự án Hoa Tươi Thanh Ngọc — Task Tracker

> Cập nhật lần cuối: 15/05/2026

## 📊 Tổng quan dự án

**Tên**: Hoa Tươi Thanh Ngọc (garden-bloom-renewed-main)
**Stack**: TanStack Start (React 19) + Vite 7 + Cloudflare Workers + Tailwind CSS v4
**Routes**: `/`, `/san-pham`, `/san-pham/:slug`, `/blog`, `/blog/:slug`, `/the`, `/the/:tag`, `/gioi-thieu`, `/lien-he`, `/admin`, `/chinh-sach-bao-mat`, `/chinh-sach-doi-tra`, `/chinh-sach-giao-hang`, `/chinh-sach-thanh-toan`
**Tính năng đã có**: Chatbot AI (Groq Llama 3.3), giỏ hàng (Zustand), admin panel (AI phân tích ảnh), SEO schema.org, SSR error handling, blog (4 bài viết), floating contact buttons

---

## ✅ Việc cần làm (ưu tiên giảm dần)

### [ ] 1. Đồng bộ ảnh sản phẩm
- [ ] Sửa file `bo-hoa-hong-pastel-ngot-ngao.png.png` → xoá double extension
- [ ] Đảm bảo mỗi slug sản phẩm trong `data/products.ts` có ảnh tương ứng trong `public/images/`
- [ ] Thêm ảnh gallery (4 góc) cho từng sản phẩm

### [ ] 2. Thêm sản phẩm thực tế
- [ ] Dùng admin panel (`/admin`) để upload ảnh → AI phân tích → thêm sản phẩm
- [ ] Hoặc viết trực tiếp vào `data/products.ts`
- [ ] Cần thêm ít nhất 3-5 sản phẩm mỗi danh mục (bo-hoa, gio-hoa, khai-truong, chia-buon, lan-ho-diep)

### [ ] 3. Xây dựng luồng đặt hàng (checkout)
- [ ] Form đặt hàng với thông tin: họ tên, SĐT, địa chỉ, ghi chú
- [ ] Gửi đơn hàng qua Zalo/email
- [ ] Xác nhận đơn hàng

### [ ] 4. Sinh sitemap động
- [ ] Chuyển `public/sitemap.xml` từ tĩnh → động (dùng dữ liệu products + blog)

### [ ] 5. Thêm Google Analytics / GTM
- [ ] Tích hợp Google Tag Manager
- [ ] Theo dõi sự kiện: xem sản phẩm, thêm giỏ hàng, liên hệ

### [ ] 6. Thêm phân trang (pagination) cho trang sản phẩm
- [ ] Load more hoặc phân trang khi số lượng sản phẩm > 20

### [ ] 7. Cập nhật giá động
- [ ] Thêm trường `price` cho một số sản phẩm thay vì "Liên hệ"
- [ ] Hiển thị giá tương ứng

### [ ] 8. Kiểm thử (Testing)
- [ ] Unit test cho cart logic
- [ ] Unit test cho chatbot AI service
- [ ] Unit test cho admin functions

### [ ] 9. PWA (Progressive Web App)
- [ ] Service worker
- [ ] Web manifest

---

## ✅ Việc đã hoàn thành

### [x] 0. Kiểm tra tổng quan dự án
- [x] Phân tích cấu trúc source code
- [x] Xác định các vấn đề hiện tại
- [x] Lưu danh sách việc cần làm vào bộ nhớ (file TASKS.md)