# Agent: Phân Tích & Đặt Tên Sản Phẩm Hoa Tươi Thanh Ngọc

Tài liệu này hướng dẫn agent AI phân tích từng file ảnh trong `public/images/products/` và đặt tên, slug, danh mục, keywords chuẩn SEO — đồng bộ với cấu trúc `src/data/products.ts`.

---

## 1. Cấu trúc dữ liệu cần điền (RawProduct)

Mỗi sản phẩm trong `raw[]` cần:

```ts
{
  slug: string,          // kebab-case không dấu, UNIQUE, không có số đuôi auto
  name: string,          // Tên hiển thị tiếng Việt, viết hoa từng chữ
  category: Category,    // 1 trong 5 loại bên dưới
  _img: string,          // tên file ảnh đại diện (ảnh đẹp nhất của sản phẩm)
  badge?: string,        // "Bán chạy" | "Mới" | "Nổi bật" (tuỳ chọn)
  short: string,         // 1 câu mô tả ngắn ≤ 100 ký tự, có từ khóa SEO
  description: string,   // 2–3 câu mô tả chi tiết, tự nhiên, có từ khóa SEO
  price: number,         // VND (500000 nếu không chắc, để chủ shop điền lại)
  keywords: string[],    // 5–8 từ khóa tiếng Việt cụ thể (xem bảng bên dưới)
}
```

---

## 2. Năm danh mục (Category)

| `category` | Nhãn | Mô tả sản phẩm | Từ khóa cốt lõi |
|---|---|---|---|
| `bo-hoa` | Bó Hoa | Bó hoa tươi buộc tay, tặng sinh nhật / tình yêu / tốt nghiệp | hoa hồng, hoa hướng dương, bó hoa sinh nhật, bó hoa tặng người yêu |
| `gio-hoa` | Giỏ Hoa | Hoa trong giỏ/lẵng, tặng biếu cao cấp hoặc thăm bệnh | giỏ hoa, lẵng hoa, hoa biếu tặng, hoa thăm bệnh |
| `khai-truong` | Khai Trương | Kệ hoa đứng lớn, đặt sảnh, chúc khai trương / sự kiện | kệ hoa khai trương, hoa chúc mừng khai trương, hoa khai trương |
| `chia-buon` | Chia Buồn | Lẵng/bó hoa tang lễ, tone trắng — vàng nhạt | hoa chia buồn, vòng hoa tang lễ, hoa tang lễ trắng |
| `lan-ho-diep` | Lan Hồ Điệp | Chậu lan hồ điệp, biếu tặng cao cấp, khai trương | lan hồ điệp, chậu lan hồ điệp, lan hồ điệp trắng, lan hồ điệp biếu tặng |

---

## 3. Quy tắc đặt tên SEO

### 3.1 Cấu trúc tên sản phẩm
```
[Loại SP] + [Màu chủ đạo / Loài hoa] + [Phong cách / Dịp]
```

**Ví dụ đúng:**
- `Bó Hoa Hồng Đỏ Tình Yêu` → slug: `bo-hoa-hong-do-tinh-yeu`
- `Bó Hoa Hồng Kem Tinh Tế` → slug: `bo-hoa-hong-kem-tinh-te`
- `Giỏ Hoa Trắng Xanh Thanh Nhã` → slug: `gio-hoa-trang-xanh-thanh-nha`
- `Kệ Hoa Khai Trương Thịnh Vượng` → slug: `ke-hoa-khai-truong-thinh-vuong`
- `Lẵng Hoa Chia Buồn Lys Bạch Hợp` → slug: `lang-hoa-chia-buon-lys-bach-hop`
- `Chậu Lan Hồ Điệp Trắng Quý Phái` → slug: `chau-lan-ho-diep-trang-quy-phai`

### 3.2 Quy tắc slug
- Viết thường, không dấu, dùng dấu `-` thay khoảng trắng
- **Không** giữ số thứ tự tự động như `-1`, `-2` ở cuối
- **Không** trùng với slug khác đã có trong `raw[]`
- Nếu cùng kiểu sản phẩm: thêm từ phân biệt thật sự (màu, số bông, phong cách)

### 3.3 Short & Description
```
short:       "[Loại SP] [mô tả màu/loài] từ Hoa Tươi Thanh Ngọc — [1 benefit ngắn]."
description: "[Mở rộng short]. [Phù hợp dịp nào]. [CTA nhẹ: liên hệ/đặt hàng]."
```

**Ví dụ:**
```
short:       "Bó hoa hồng kem tinh tế từ Hoa Tươi Thanh Ngọc — sang trọng, thích hợp tặng sinh nhật và kỷ niệm."
description: "Bó hoa hồng kem tinh tế được kết thủ công từ hoa hồng Ecuador cao cấp, tông màu kem — trắng nhẹ nhàng. Phù hợp tặng sinh nhật, kỷ niệm ngày cưới, hoặc tri ân đối tác. Liên hệ Zalo để đặt hàng và giao trong 2 giờ tại TP.HCM."
```

---

## 4. Bảng keywords theo nhóm (dùng để điền `keywords[]`)

### bo-hoa
```
"bó hoa", "bó hoa tươi", "hoa tặng sinh nhật", "hoa tặng người yêu",
"bó hoa hồng", "hoa hồng đẹp", "hoa tốt nghiệp", "hoa tặng mẹ",
"hoa hồng kem", "bó hoa đẹp tphcm", "hoa sinh nhật tp hồ chí minh"
```

### gio-hoa
```
"giỏ hoa", "lẵng hoa", "giỏ hoa đẹp", "hoa biếu tặng", "hoa thăm bệnh",
"giỏ hoa sinh nhật", "hoa tặng sếp", "giỏ hoa tươi", "hoa tặng cao cấp"
```

### khai-truong
```
"kệ hoa khai trương", "hoa khai trương", "hoa chúc mừng khai trương",
"kệ hoa đứng", "hoa sự kiện", "hoa tặng khai trương", "hoa khai trương tphcm"
```

### chia-buon
```
"hoa chia buồn", "hoa tang lễ", "lẵng hoa chia buồn", "vòng hoa tang lễ",
"hoa trắng chia buồn", "hoa tang lễ trắng", "hoa đám tang tphcm"
```

### lan-ho-diep
```
"lan hồ điệp", "chậu lan hồ điệp", "lan hồ điệp trắng", "lan hồ điệp biếu tặng",
"lan hồ điệp khai trương", "chậu lan đẹp", "lan hồ điệp tphcm"
```

---

## 5. Phân loại ảnh hiện có

### 5.1 ẢNH KHÔNG PHẢI SẢN PHẨM — Xóa khỏi `raw[]`

Các file dưới đây là ảnh banner / logo / ảnh người — **không hiển thị trên trang sản phẩm**:

| File | Lý do loại bỏ |
|---|---|
| `banner.jpg` | Banner website |
| `banner-hoa-thanh-ngoc.webp` | Banner website |
| `banner-hoa-thanh-ngoc-1.webp` | Variant banner |
| `nen-hoa-about.webp` | Background trang Giới thiệu |
| `nen-hoa-about-1.webp` | Variant background |
| `logo-moi.png` | Logo shop |
| `logo-thanh-ngoc-flower-1.webp` | Logo shop variant |
| `co-thanh-ngoc.jpg` | Ảnh nhân viên |
| `founder-thanh-ngoc.webp` | Ảnh founder |
| `founder-thanh-tien.webp` | Ảnh founder |
| `founder1.jpg` | Ảnh founder |
| `founder2.jpg` | Ảnh founder |
| `thanh-tien.jpg` | Ảnh cá nhân |

### 5.2 ẢNH ĐÃ CÓ TÊN MÔ TẢ — Đặt tên chuẩn trực tiếp

| File ảnh | Tên đề xuất | Category | Slug chuẩn |
|---|---|---|---|
| `lan-ho-diep-trang-quy-phai.webp` | Chậu Lan Hồ Điệp Trắng Quý Phái | `lan-ho-diep` | `chau-lan-ho-diep-trang-quy-phai` |
| `gio-hoa-trang-xanh-thanh-nha.webp` | Giỏ Hoa Trắng Xanh Thanh Nhã | `gio-hoa` | `gio-hoa-trang-xanh-thanh-nha` |
| `hoa-chia-buon-ly-bach-hop.webp` | Lẵng Hoa Chia Buồn Lys Bạch Hợp | `chia-buon` | `lang-hoa-chia-buon-lys-bach-hop` |
| `hoa-khai-truong-thinh-vuong.webp` | Kệ Hoa Khai Trương Thịnh Vượng | `khai-truong` | `ke-hoa-khai-truong-thinh-vuong` |
| `bo-hong.webp` / `bo-hong.jpg` | Bó Hoa Hồng Tươi Thắm | `bo-hoa` | `bo-hoa-hong-tuoi-tham` |
| `bo-hong-1.webp` | Bó Hoa Hồng Phấn Lãng Mạn | `bo-hoa` | `bo-hoa-hong-phan-lang-man` |
| `bo-hong-1-1.webp` | Bó Hoa Hồng Mix Pastel | `bo-hoa` | `bo-hoa-hong-mix-pastel` |
| `bo-hong-1-2.webp` | Bó Hoa Hồng Trắng Tinh Khôi | `bo-hoa` | `bo-hoa-hong-trang-tinh-khoi` |
| `bo-hong1.jpg` | Bó Hoa Hồng Đỏ Nồng Nàn | `bo-hoa` | `bo-hoa-hong-do-nong-nan` |
| `bo-hoa.webp` / `bo-hoa.jpg` | Bó Hoa Tươi Nhiều Màu | `bo-hoa` | `bo-hoa-tuoi-nhieu-mau` |
| `bo-hoa-1.webp` | Bó Hoa Rực Rỡ Ngày Vui | `bo-hoa` | `bo-hoa-ruc-ro-ngay-vui` |

### 5.3 NHÓM `hoa-hong-kem-tinh-te` (series 29–44)

Đây là cùng 1 dòng sản phẩm **Bó Hoa Hồng Kem Tinh Tế**, chụp ở nhiều góc / lô khác nhau. Cách xử lý:

- **Chọn 1 ảnh đại diện** cho mỗi biến thể phong cách (gọn, xòe, mix màu...)
- Các ảnh còn lại → đưa vào `galleryImgs[]` của sản phẩm đó
- Đặt tối đa **4–5 sản phẩm riêng** cho series này (không tạo 16 sản phẩm trùng)

**Đề xuất 5 sản phẩm từ series này:**

| Ảnh đại diện | Tên sản phẩm | Slug | Gallery (ảnh phụ) |
|---|---|---|---|
| `hoa-hong-kem-tinh-te-webp-29.webp` | Bó Hoa Hồng Kem Nhỏ Nhắn | `bo-hoa-hong-kem-nho-nhan` | 30, 31 |
| `hoa-hong-kem-tinh-te-webp-33.webp` | Bó Hoa Hồng Kem Tinh Tế Classic | `bo-hoa-hong-kem-tinh-te-classic` | 32, 34 |
| `hoa-hong-kem-tinh-te-webp-37.webp` | Bó Hoa Hồng Kem Sang Trọng | `bo-hoa-hong-kem-sang-trong` | 36, 38 |
| `hoa-hong-kem-tinh-te-webp-41.webp` | Bó Hoa Hồng Kem Mix Trắng | `bo-hoa-hong-kem-mix-trang` | 40, 42 |
| `hoa-hong-kem-tinh-te-webp-44.webp` | Bó Hoa Hồng Kem Tròn Đầy | `bo-hoa-hong-kem-tron-day` | 43, 44 |

> Lưu ý: file `hoa-hong-kem-tinh-tewebp-XX.webp` (không có dấu `-` trước `webp`) là **bản trùng** của `hoa-hong-kem-tinh-te-webp-XX.webp`. Chỉ dùng 1 bộ.

### 5.4 NHÓM `hoa1-XX` (series 29–44)

Tương tự nhóm 5.3, đây là một dòng sản phẩm khác (likely bó hoa mix nhiều loài). Xem ảnh và phân nhóm theo phong cách:

**Đề xuất 4 sản phẩm:**

| Ảnh đại diện | Tên đề xuất | Slug |
|---|---|---|
| `hoa1-29.webp` | Bó Hoa Mix Pastel Ngọt Ngào | `bo-hoa-mix-pastel-ngot-ngao` |
| `hoa1-33.webp` | Bó Hoa Mix Trắng Tím Nhẹ Nhàng | `bo-hoa-mix-trang-tim-nhe-nhang` |
| `hoa1-38.webp` | Bó Hoa Mix Hồng Vàng Rực Rỡ | `bo-hoa-mix-hong-vang-ruc-ro` |
| `hoa1-43.webp` | Bó Hoa Mix Tone Ấm Tươi Sáng | `bo-hoa-mix-tone-am-tuoi-sang` |

### 5.5 NHÓM `img3xxx` — Cần xem ảnh thực để đặt tên

Các file này là ảnh chụp trực tiếp tại cửa hàng (IMG_374x đến IMG_377x, IMG_344x–IMG_348x). Khi xem ảnh, áp dụng bảng phân loại:

| Đặc điểm thấy trong ảnh | Category | Tiền tố tên |
|---|---|---|
| Bó hoa cầm tay, dây buộc nơ | `bo-hoa` | `Bó Hoa ...` |
| Giỏ/lẵng có tay cầm, để bàn | `gio-hoa` | `Giỏ Hoa ...` |
| Kệ đứng lớn, chân sắt/gỗ | `khai-truong` | `Kệ Hoa Khai Trương ...` |
| Hoa trắng/vàng nhạt, băng rôn tang | `chia-buon` | `Lẵng Hoa Chia Buồn ...` |
| Chậu lan nhiều cành | `lan-ho-diep` | `Chậu Lan Hồ Điệp ...` |

**Tên gợi ý theo đặc điểm màu sắc:**

| Màu chủ đạo | Từ mô tả |
|---|---|
| Đỏ tươi | Nồng Nàn, Rực Rỡ, Đam Mê |
| Hồng pastel | Ngọt Ngào, Lãng Mạn, Dịu Dàng |
| Hồng đậm | Quyến Rũ, Cuốn Hút |
| Trắng | Tinh Khôi, Thuần Khiết, Thanh Tao |
| Kem / Be | Tinh Tế, Sang Trọng, Thanh Lịch |
| Vàng / Cam | Tươi Vui, Rạng Rỡ, Ấm Áp |
| Tím | Bí Ẩn, Thơ Mộng, Quyến Rũ |
| Mix nhiều màu | Đa Sắc, Rực Rỡ, Ngàn Sắc |

---

## 6. Quy trình thực hiện (cho agent)

```
BƯỚC 1 — Xem ảnh
  Mở file ảnh tại public/images/products/[tên_file]
  Xác định: loại sản phẩm, màu sắc, phong cách, số lượng ước tính

BƯỚC 2 — Đặt tên
  Áp dụng công thức: [Loại] + [Màu/Loài] + [Phong cách]
  Đảm bảo tên KHÔNG trùng với sản phẩm đã có trong raw[]

BƯỚC 3 — Gán danh mục
  Dựa vào bảng 5 danh mục (Mục 2)

BƯỚC 4 — Tạo slug
  Slugify tên tiếng Việt → kebab-case không dấu
  Kiểm tra KHÔNG trùng slug trong file

BƯỚC 5 — Chọn keywords
  Lấy 5–8 từ từ bảng Mục 4 phù hợp với sản phẩm

BƯỚC 6 — Viết short & description
  Theo template Mục 3.3
  Có đề cập đến Thanh Ngọc, dịp phù hợp, CTA nhẹ

BƯỚC 7 — Xóa ảnh không phải sản phẩm
  Loại bỏ các entry trong Mục 5.1 khỏi raw[]

BƯỚC 8 — Gộp ảnh trùng
  Ảnh `img3xxx.webp` và `img-3xxx.jpg` là cùng 1 ảnh → dùng .webp, bỏ .jpg
  Ảnh `hoa-hong-kem-tinh-tewebp-XX` trùng `hoa-hong-kem-tinh-te-webp-XX` → dùng bộ có dấu `-`
```

---

## 7. Mẫu sản phẩm chuẩn (copy & chỉnh)

```ts
{
  slug: "bo-hoa-hong-kem-tinh-te-classic",
  name: "Bó Hoa Hồng Kem Tinh Tế Classic",
  category: "bo-hoa",
  badge: "Bán chạy",
  _img: "hoa-hong-kem-tinh-te-webp-33.webp",
  short: "Bó hoa hồng kem tinh tế từ Thanh Ngọc — sang trọng, thích hợp sinh nhật và kỷ niệm.",
  description: "Bó hoa hồng kem được kết thủ công từ hoa hồng Ecuador tươi, tông kem — trắng nhẹ nhàng, sang trọng. Phù hợp tặng sinh nhật, kỷ niệm ngày cưới, hoặc tri ân đối tác. Liên hệ Zalo để đặt và giao trong 2 giờ tại TP.HCM.",
  price: 650000,
  keywords: ["bó hoa hồng kem", "hoa sinh nhật", "hoa tặng người yêu", "hoa hồng đẹp", "bó hoa tươi tphcm", "hoa kỷ niệm"],
  galleryImgs: ["hoa-hong-kem-tinh-te-webp-32.webp", "hoa-hong-kem-tinh-te-webp-34.webp"],
},
```

---

## 8. Danh sách ảnh theo nhóm (tóm tắt để gọi agent)

```
NHÓM A — Xóa khỏi raw[] (không phải sản phẩm):
  banner.jpg, banner-hoa-thanh-ngoc.webp, banner-hoa-thanh-ngoc-1.webp,
  nen-hoa-about.webp, nen-hoa-about-1.webp, logo-moi.png,
  logo-thanh-ngoc-flower-1.webp, co-thanh-ngoc.jpg,
  founder-thanh-ngoc.webp, founder-thanh-tien.webp,
  founder1.jpg, founder2.jpg, thanh-tien.jpg

NHÓM B — Đã có tên rõ, đặt tên theo Mục 5.2:
  lan-ho-diep-trang-quy-phai.webp → lan-ho-diep
  gio-hoa-trang-xanh-thanh-nha.webp → gio-hoa
  hoa-chia-buon-ly-bach-hop.webp → chia-buon
  hoa-khai-truong-thinh-vuong.webp → khai-truong
  bo-hong*.webp/.jpg → bo-hoa
  bo-hoa*.webp/.jpg → bo-hoa

NHÓM C — Series hoa hồng kem (gộp gallery):
  hoa-hong-kem-tinh-te-webp-29 đến 44 → 5 sản phẩm (Mục 5.3)
  hoa-hong-kem-tinh-tewebp-XX → BẢN TRÙNG, dùng bộ -te-webp- thay thế

NHÓM D — Series hoa1 (gộp gallery):
  hoa1-29 đến hoa1-44 → 4 sản phẩm (Mục 5.4)

NHÓM E — Ảnh img3xxx (cần xem từng ảnh):
  img3449–img3487 (series cũ)
  img3742–img3768 (series mới nhất)
  → Xem ảnh → áp dụng bảng Mục 5.5
  → File .webp ưu tiên hơn .jpg cùng tên
  → File imgXXXX-1.webp là gallery shot của imgXXXX.webp

NHÓM F — Ảnh đơn lẻ:
  hoa3.webp, hoa3-2.jpg, hoa4.jpg, hoa5.jpg → bo-hoa (xem ảnh xác nhận)
  hoa1.jpg, hoa2.jpg → bo-hoa (xem ảnh xác nhận)
  hoa-hong-kem-tinh-te.webp, hoa-hong-kem-tinh-te-1.webp → ảnh chính của series
```

---

## 9. Ưu tiên thực hiện

1. **Cao** — Xóa 13 ảnh không phải sản phẩm khỏi `raw[]` (rác dữ liệu hiện tại)
2. **Cao** — Đặt tên đúng cho nhóm B (đã có tên rõ trong filename)
3. **Trung bình** — Gộp và đặt tên series hoa hồng kem (nhóm C)
4. **Trung bình** — Gộp và đặt tên series hoa1 (nhóm D)
5. **Thấp** — Xem và đặt tên ảnh img3xxx (nhóm E) — cần nhìn ảnh thực
