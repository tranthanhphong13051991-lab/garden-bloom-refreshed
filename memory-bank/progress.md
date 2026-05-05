# Progress

## Đã hoàn thành

### Core website
- [x] Homepage với hero, featured products, USPs, contact section
- [x] Trang danh sách sản phẩm `/san-pham` với filter theo danh mục
- [x] Trang chi tiết sản phẩm `/san-pham/:slug` với gallery, FAQ, JSON-LD schema
- [x] Blog (danh sách + chi tiết bài viết)
- [x] Trang tag `/the/:tag`
- [x] Giới thiệu, Liên hệ
- [x] Chính sách bảo mật, đổi trả, giao hàng, thanh toán
- [x] Header + Footer responsive
- [x] Giỏ hàng (CartDrawer, Zustand, localStorage)
- [x] FloatingActions (Zalo, gọi điện nhanh)

### AI & Admin
- [x] Chatbot "Ngọc" (Groq API, hiển thị card sản phẩm liên quan)
- [x] Admin tool: upload ảnh → Claude phân tích → xuất code sản phẩm
- [x] Admin: gallery 4 góc (chính diện, cận cảnh, trên cao, ánh sáng)
- [x] Admin: password protection

### SEO
- [x] JSON-LD LocalBusiness schema (root)
- [x] JSON-LD Product schema (trang chi tiết sản phẩm)
- [x] Meta title/description cho từng trang
- [x] OG tags

### Sản phẩm
- [x] ~57 sản phẩm với ảnh local
- [x] Tự động hydrate defaults theo category (FAQ, sizes, colors, occasions, careTips...)

## Chưa làm / Cần cải thiện
- [ ] Sửa slug trùng `gio-hoa-hong-kem-dep` (2 entry giống nhau)
- [ ] Thêm ảnh thực tế cho: `bo-hoa-hong-tuoi-tham`, `bo-hoa-hong-do-nong-nan`, `bo-hoa-mix-co-dien` (gallery rỗng)
- [ ] Danh mục `gio-hoa` và `chia-buon` còn ít sản phẩm
- [ ] Sitemap.xml chưa có
- [ ] Không có form đặt hàng online (thiết kế cố ý — khách liên hệ Zalo)
- [ ] Không có analytics (Google Analytics / Cloudflare Analytics)

## Lỗi đã biết
- Slug `gio-hoa-hong-kem-dep` trùng 2 lần trong `src/data/products.ts` dòng 662 & 675 — ảnh hưởng tới route `/san-pham/gio-hoa-hong-kem-dep` (load sản phẩm đầu tiên tìm được)
