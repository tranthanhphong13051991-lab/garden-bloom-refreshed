# Active Context

## Trạng thái hiện tại (cập nhật: 2026-05-05)

### Commit mới nhất
`74ad1b8` — feat: thêm gallery 4 góc cho admin và đổi nhãn variant labels

### Việc vừa làm
- Thêm gallery 4 góc (chính diện, cận cảnh, từ trên cao, ánh sáng tự nhiên) vào admin tool
- Admin có thể upload ảnh cho từng góc và xem preview trước khi export code
- Sửa đường dẫn ảnh sản phẩm (local thay vì CDN)
- Thêm nhiều sản phẩm mới (kệ hoa khai trương series img37xx, bó hoa series mới)

### Vấn đề đã biết cần sửa
- **Slug trùng:** `gio-hoa-hong-kem-dep` xuất hiện 2 lần trong `src/data/products.ts` (dòng 662 và 675)
  - Cần xóa một trong hai entry, giữ lại entry hay hơn

### Số lượng sản phẩm hiện tại
- Tổng: ~57 sản phẩm (56 slug duy nhất sau khi sửa trùng)
- Bó hoa (`bo-hoa`): ~20 sản phẩm
- Kệ hoa khai trương (`khai-truong`): ~25 sản phẩm
- Giỏ hoa (`gio-hoa`): 3 sản phẩm
- Chia buồn (`chia-buon`): 1 sản phẩm
- Lan hồ điệp (`lan-ho-diep`): 1 sản phẩm

## Focus tiếp theo
- Sửa slug trùng `gio-hoa-hong-kem-dep`
- Thêm ảnh thực tế cho các sản phẩm giỏ hoa và chia buồn
- Cân nhắc thêm sản phẩm cho danh mục `gio-hoa` và `chia-buon` (đang ít)
