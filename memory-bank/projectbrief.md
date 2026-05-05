# Project Brief

## Tên dự án
**Hoa Tươi Thanh Ngọc** — Website thương mại điện tử tiệm hoa tươi tại Bình Thạnh, TP.HCM.

## Mục tiêu
- Giới thiệu và bán sản phẩm hoa tươi online (không cần giỏ hàng thanh toán — khách liên hệ Zalo/điện thoại để đặt)
- SEO tốt trên Google để thu hút khách tìm kiếm "hoa tươi Bình Thạnh", "kệ hoa khai trương TPHCM", v.v.
- Chatbot tư vấn tự động (AI), hỗ trợ khách hỏi về sản phẩm và dịp tặng
- Admin tool: upload ảnh → AI phân tích → tự điền thông tin sản phẩm

## Thông tin shop
- **Địa chỉ:** 8 Phan Văn Hân, Phường 19, Bình Thạnh, TP.HCM
- **Hotline:** 0934 926 092 / 0866 086 574
- **Giờ mở cửa:** 07:00–21:00 mỗi ngày
- **Domain:** https://hoatuoithanhngoc.com

## Phạm vi tính năng
1. Trang sản phẩm theo danh mục + trang chi tiết sản phẩm
2. Giỏ hàng (Zustand, localStorage) — hiển thị, không thanh toán online
3. Blog
4. Trang giới thiệu, liên hệ, chính sách
5. Chatbot AI "Ngọc" (Groq llama-3.3-70b)
6. Admin: phân tích ảnh sản phẩm bằng Claude (Anthropic), xuất code để thêm vào products.ts

## Ràng buộc quan trọng
- Không có database — dữ liệu sản phẩm là static trong `src/data/products.ts`
- Không hiển thị giá trên website — khách phải liên hệ để hỏi giá
- Deploy trên Cloudflare Workers
