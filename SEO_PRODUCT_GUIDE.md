# 📘 Hướng Dẫn ChatGPT: Phân Tích & Mô Tả Sản Phẩm Chuẩn SEO Cho Hoa Tươi Thanh Ngọc

## 1. Tổng Quan Dự Án

- **Tên shop**: Hoa Tươi Thanh Ngọc (Thanh Ngọc Flower's)
- **Website**: [hoatuoithanhngoc.com](https://hoatuoithanhngoc.com)
- **Địa chỉ**: 8 Phan Văn Hân, Phường 19, Bình Thạnh, TP. HCM
- **SĐT**: 0934926092 | **Zalo**: https://zalo.me/3297391822230372190
- **Giờ làm việc**: 07:00–21:00 (Tất cả các ngày)
- **Domain**: `https://hoatuoithanhngoc.com`
- **Stack kỹ thuật**: TanStack Start (React 19) + Vite 7 + Tailwind CSS v4 + TypeScript

## 2. Cấu Trúc Sản Phẩm (data/products.ts)

Mỗi sản phẩm có cấu trúc TypeScript như sau:

```typescript
type Product = {
  slug: string;                    // URL-friendly, tiếng việt không dấu, dùng dấu gạch ngang
  name: string;                    // Tên hiển thị (VD: "Bó Hoa Hồng Pastel Ngọt Ngào")
  category: Category;              // "bo-hoa" | "gio-hoa" | "khai-truong" | "chia-buon" | "lan-ho-diep"
  badge?: string;                  // "Bán chạy" | "Nổi bật" | undefined
  image: string;                   // Ảnh chính 800w (tự động sinh từ _img)
  thumb: string;                   // Ảnh thumbnail 400w (tự động sinh từ _img)
  short: string;                   // Mô tả ngắn < 160 ký tự — dùng cho meta description
  description: string;             // Mô tả chi tiết 100–200 từ, chuẩn SEO
  price?: number;                  // Giá VND (nếu có), undefined = "Liên hệ"
  keywords: string[];              // 5–10 từ khoá tiếng Việt (tự sinh tag page)
  rating: { value: number; count: number }; // Đánh giá (tự động)
  faqs: FAQ[];                     // 3 câu hỏi thường gặp
  meaning: string[];               // Ý nghĩa & thông điệp (2–3 câu)
  colors: { name: string; hex: string }[]; // Bảng màu chủ đạo
  sizes: SizeOption[];             // Kích thước tham khảo
  occasions: string[];             // Dịp tặng phù hợp
  careTips: string[];              // Hướng dẫn chăm sóc (2–3 bước)
  materials: string[];             // Chất liệu/loài hoa chính
  gallery: GalleryShot[];          // Ảnh thực tế từ nhiều góc
};
```

## 3. Quy Tắc Viết Nội Dung Chuẩn SEO

### 3.1. Tên sản phẩm (name)
- Độ dài: 30–50 ký tự
- Format: `"Bó Hoa/Giỏ Hoa/Kệ Hoa [tên chính] [tính từ]"`
- VD: "Bó Hoa Hồng Đỏ Trắng Lãng Mạn", "Giỏ Hoa Hồng Pink Love Ngọt Ngào"
- Luôn viết HOA chữ cái đầu mỗi từ
- **Không** thêm tên shop vào tên sản phẩm

### 3.2. Mô tả ngắn (short) — Meta Description
- Độ dài: **120–155 ký tự** (tối ưu SEO)
- Chứa từ khoá chính + từ khoá phụ
- Cấu trúc: `[Mô tả sản phẩm] + [đặc điểm nổi bật] + [dịp tặng]`
- Kết thúc bằng: "Giao 2 giờ tại TP.HCM."
- VD: `"Bó hoa hồng hồng phấn, hồng kem và nụ hoa điểm xuyết — sinh nhật, kỷ niệm, tỏ tình. Giao 2 giờ tại TP.HCM."`

### 3.3. Mô tả chi tiết (description)
- Độ dài: 150–250 từ
- Cấu trúc:
  1. Câu mở đầu: giới thiệu sản phẩm, tone màu, phong cách
  2. Câu giữa: chất liệu, loài hoa chính, kiểu gói
  3. Câu cuối: dịp tặng phù hợp, kèm "Giao 2 giờ tại TP.HCM."
- **Luôn** bao gồm:
  - Các loài hoa chính
  - Tone màu / bảng màu
  - Dịp tặng (ít nhất 3 dịp)
  - Cam kết giao 2h
- **Không** chứa:
  - Giá cả (để "Liên hệ báo giá")
  - Thông tin shop (đã có trong footer)
  - Link hoặc URL

### 3.4. Từ khoá (keywords)
- 5–10 từ khoá, mỗi từ 2–5 từ
- Từ khoá chính: tên sản phẩm biến thể (VD: "bó hoa hồng pastel")
- Từ khoá phụ: dịp tặng, màu sắc, kiểu dáng
- Từ khoá định vị: "hoa tươi TP.HCM", "giao hoa nhanh"
- **Không** trùng lặp giữa các sản phẩm >60%
- Format: viết thường, tiếng Việt có dấu đầy đủ

### 3.5. Câu hỏi thường gặp (FAQs) — Tối ưu Google FAQ Schema
- 3 câu hỏi mỗi sản phẩm
- Câu hỏi: thực tế, khách hàng hay hỏi
- Câu trả lời: 15–30 từ, đúng trọng tâm
- **Bắt buộc** có 1 câu về giao hàng
- **Bắt buộc** có 1 câu về tuỳ chỉnh/tư vấn

### 3.6. Ý nghĩa (meaning)
- 2–3 câu
- Câu 1: ý nghĩa biểu tượng của loại hoa
- Câu 2: dịp tặng phù hợp + thông điệp

### 3.7. Bảng màu (colors)
- Tự động suy luận từ mô tả (hệ thống tự động)
- Nếu màu không có trong danh sách từ điển, báo "Đa sắc"

### 3.8. Hướng dẫn chăm sóc (careTips)
- 2–3 bước cụ thể, dễ làm
- Cho mỗi category đã có default — chỉ ghi đè nếu cần đặc thù

## 4. Đồng Bộ Ảnh Sản Phẩm

### 4.1. Quy tắc đặt tên file ảnh
- Format: `[slug-san-pham].[png|jpg|webp]`
- Chỉ dùng chữ thường, không dấu, gạch ngang giữa các từ
- **Không** space, **Không** double extension (KHÔNG ".png.png")
- VD đúng: `bo-hoa-hong-pastel-ngot-ngao.png`
- VD sai: `Bó Hoa Hồng Pastel Ngọt Ngào.png`, `bo-hoa-hong-pastel-ngot-ngao.png.png`

### 4.2. Vị trí lưu ảnh
- Thư mục: `public/images/`
- Đường dẫn trong code: `/images/[tên-file]`
- Thumbnail (400px) dùng chung file với ảnh chính, resize qua CSS

### 4.3. Cấu trúc ảnh cho mỗi sản phẩm
Mỗi sản phẩm cần tối thiểu:
- **1 ảnh chính** (trường `_img`) — hiển thị chính diện, ưu tiên PNG
- **3–5 ảnh gallery** (trường `galleryImgs`) — bao gồm:
  - Ảnh chính diện
  - Ảnh cận cảnh (chi tiết hoa)
  - Ảnh từ trên cao
  - Ảnh ánh sáng tự nhiên

Quy ước đặt tên ảnh gallery:
```
[slug].png                     → Ảnh chính diện (main)
[slug]-can-canh.jpg            → Góc cận cảnh
[slug]-tren-cao.jpg            → Góc từ trên cao
[slug]-anh-sang.jpg            → Ánh sáng tự nhiên
[slug]-chinh-dien.jpg          → Góc chính diện khác
```

### 4.4. Cập nhật khi thêm sản phẩm mới

Khi thêm sản phẩm mới vào `data/products.ts`:

```typescript
// Bước 1: Thêm vào raw[] array
{
  slug: "ten-san-pham-moi",
  name: "Tên Sản Phẩm Mới",
  category: "bo-hoa", // hoặc gio-hoa, khai-truong, chia-buon, lan-ho-diep
  badge: "Bán chạy", // hoặc "Nổi bật" hoặc bỏ
  _img: "ten-san-pham-moi.png", // PHẢI tồn tại trong public/images/
  short: "Mô tả ngắn chuẩn SEO < 155 ký tự...",
  description: "Mô tả chi tiết 150–250 từ...",
  keywords: ["từ khoá 1", "từ khoá 2", ...],
  galleryImgs: [
    "ten-san-pham-moi.png",         // ảnh chính
    "ten-san-pham-moi-chinh-dien.jpg",
    "ten-san-pham-moi-can-canh.jpg",
    "ten-san-pham-moi-tren-cao.jpg",
    "ten-san-pham-moi-anh-sang.jpg",
  ],
}

// Bước 2: Upload ảnh vào public/images/ với đúng tên file
// Bước 3: Chạy dev để kiểm tra ảnh hiển thị
```

## 5. Quy Tắc Chung Khi Viết

| Trường | Tối thiểu | Tối đa | Ghi chú |
|--------|-----------|--------|---------|
| name | 25 ký tự | 60 ký tự | HOA đầu mỗi từ |
| short | 120 ký tự | 155 ký tự | Chứa từ khoá chính |
| description | 150 từ | 250 từ | Cấu trúc 3 phần |
| keywords | 5 từ | 10 từ | Mỗi từ 2–5 từ |
| meaning | 2 câu | 3 câu | Ý nghĩa + dịp tặng |
| faqs | 3 câu | 3 câu | Luôn có câu giao hàng |
| occasions | 3 dịp | 6 dịp | Liên quan category |
| careTips | 2 bước | 4 bước | Ngắn gọn, dễ làm |

## 6. Kiểm Tra Sau Khi Thêm Sản Phẩm

- [ ] Ảnh `_img` có tồn tại trong `public/images/` không?
- [ ] Tất cả ảnh trong `galleryImgs` có tồn tại không?
- [ ] `short` có ≤ 155 ký tự không?
- [ ] `keywords` có ít nhất 5 từ khoá không?
- [ ] `description` có chứa "Giao 2 giờ tại TP.HCM." không?
- [ ] Slug đã đúng format (không dấu, gạch ngang)?
- [ ] File ảnh KHÔNG có double extension (.png.png)?
- [ ] File ảnh chỉ dùng chữ thường, không space?