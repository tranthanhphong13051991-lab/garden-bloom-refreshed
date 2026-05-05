# Product Context

## Tại sao dự án tồn tại
Tiệm hoa Thanh Ngọc cần website chuyên nghiệp để:
- Khách Google được tìm thấy shop khi tìm "hoa khai trương TPHCM", "bó hoa sinh nhật Bình Thạnh"
- Thay thế việc khách phải hỏi giá qua Zalo không có tài liệu tham khảo
- Tạo ấn tượng thương hiệu sang trọng, đáng tin cậy

## Trải nghiệm người dùng mong muốn

### Khách hàng
- Xem ảnh hoa đẹp → chọn sản phẩm → liên hệ Zalo/gọi điện đặt hàng
- Chatbot "Ngọc" tư vấn nhanh (không báo giá, hướng khách gọi điện)
- Trang chi tiết sản phẩm có FAQ, ý nghĩa hoa, màu sắc, kích thước, gallery nhiều góc

### Admin (chủ shop)
- Upload ảnh hoa → AI (Claude Anthropic) phân tích → copy code → paste vào `products.ts`
- Không cần CMS hay database phức tạp

## Danh mục sản phẩm
| ID | Tên | Mô tả |
|---|---|---|
| `bo-hoa` | Bó Hoa | Bó hoa cầm tay cho mọi dịp |
| `gio-hoa` | Giỏ Hoa | Giỏ hoa sang trọng |
| `khai-truong` | Khai Trương | Kệ hoa đứng 1–2 tầng |
| `chia-buon` | Chia Buồn | Lẵng hoa tang lễ |
| `lan-ho-diep` | Lan Hồ Điệp | Chậu lan quý phái |

## Quy trình đặt hàng
Website → Khách thích sản phẩm → Zalo/gọi 0934926092 → Thanh Ngọc tư vấn & báo giá → Giao trong 2 giờ nội thành TP.HCM
