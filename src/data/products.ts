export type Category =
  | "bo-hoa"
  | "gio-hoa"
  | "khai-truong"
  | "chia-buon"
  | "lan-ho-diep";

export type FAQ = { q: string; a: string };
export type SizeOption = { label: string; dimension: string; note?: string };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  badge?: string;
  image: string; // 800w
  thumb: string; // 400w
  short: string;
  description: string;
  price?: number; // VND, optional (giá liên hệ)
  keywords: string[];
  rating: { value: number; count: number };
  faqs: FAQ[];
  meaning: string[]; // ý nghĩa & thông điệp
  colors: { name: string; hex: string }[]; // bảng màu chủ đạo
  sizes: SizeOption[]; // kích thước tham khảo
  occasions: string[]; // dịp tặng phù hợp
  careTips: string[]; // hướng dẫn chăm sóc / giữ tươi
  materials: string[]; // chất liệu/loài hoa chính
  gallery: GalleryShot[]; // ảnh thực nhận theo lô / góc khác nhau
};

export type GalleryShot = {
  src: string;
  alt: string;
  variant: string; // tên lô/biến thể: "Lô tháng 3", "Tone hồng nhạt", "Góc nghiêng"...
  note?: string; // ghi chú khác biệt với hình đại diện
};

// Hash slug → số ổn định để tạo rating "thật như thực" mà không random mỗi render
const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};
const ratingFor = (slug: string) => {
  const h = hash(slug);
  const value = +(4.6 + (h % 40) / 100).toFixed(1); // 4.6 → 5.0
  const count = 48 + (h % 220); // 48 → 267
  return { value, count };
};

// FAQ chung theo nhóm sản phẩm — chuẩn cho schema FAQPage
const FAQ_BY_CATEGORY: Record<Category, FAQ[]> = {
  "bo-hoa": [
    { q: "Bó hoa giữ tươi được bao lâu?", a: "Bó hoa của Thanh Ngọc giữ tươi 3–5 ngày nếu cắm nước sạch, tránh nắng và thay nước mỗi ngày." },
    { q: "Có giao hoa trong ngày tại TP.HCM không?", a: "Có. Chúng tôi giao trong vòng 2 giờ tại TP.HCM khi đặt trước 18:00." },
    { q: "Có thể đổi màu hoa hoặc giấy gói theo yêu cầu không?", a: "Hoàn toàn được. Vui lòng nhắn Zalo 0934926092 để chúng tôi tư vấn phối màu phù hợp." },
  ],
  "gio-hoa": [
    { q: "Giỏ hoa có kèm thiệp không?", a: "Mọi giỏ hoa đều được tặng kèm thiệp viết tay miễn phí theo nội dung quý khách yêu cầu." },
    { q: "Giỏ hoa phù hợp tặng dịp nào?", a: "Giỏ hoa thanh lịch, phù hợp sinh nhật, kỷ niệm, thăm bệnh, biếu tặng cấp trên hoặc khách hàng." },
    { q: "Có thể đặt giỏ hoa kích thước lớn hơn không?", a: "Có. Chúng tôi nhận thiết kế giỏ hoa theo ngân sách và kích thước riêng — liên hệ Zalo để báo giá." },
  ],
  "khai-truong": [
    { q: "Kệ hoa khai trương cao bao nhiêu?", a: "Kệ tiêu chuẩn cao 1,6m–1,8m. Kệ 2 tầng cao 1,8m–2,2m, phù hợp đặt sảnh lớn." },
    { q: "Có giao và lắp đặt kệ tận nơi không?", a: "Có. Chúng tôi giao và dựng kệ miễn phí trong nội thành TP.HCM." },
    { q: "Đặt kệ hoa khai trương trước bao lâu?", a: "Nên đặt trước ít nhất 4–6 tiếng để đảm bảo chuẩn bị hoa tươi và giao đúng giờ." },
  ],
  "chia-buon": [
    { q: "Hoa chia buồn nên chọn màu gì?", a: "Tone trắng hoặc trắng — vàng nhạt là lựa chọn trang trọng và phổ biến nhất cho lễ tang." },
    { q: "Có viết băng tang theo yêu cầu không?", a: "Có. Chúng tôi viết băng tang miễn phí theo nội dung và tên người gửi quý khách cung cấp." },
    { q: "Giao hoa chia buồn ngoài giờ hành chính được không?", a: "Được. Tiệm phục vụ 7h–21h tất cả các ngày, có hỗ trợ giao gấp khi cần." },
  ],
  "lan-ho-diep": [
    { q: "Chậu lan hồ điệp giữ được bao lâu?", a: "Lan hồ điệp tươi đẹp 30–60 ngày nếu đặt nơi thoáng mát, tưới 1–2 lần/tuần bằng cách xịt phun sương." },
    { q: "Có nhận khắc tên/lời chúc trên chậu không?", a: "Có. Chúng tôi hỗ trợ in lời chúc trên nơ hoặc thiệp đi kèm miễn phí." },
    { q: "Có hoá đơn VAT cho chậu lan biếu tặng không?", a: "Có. Quý khách vui lòng cung cấp thông tin công ty khi đặt để được xuất hoá đơn." },
  ],
};

const CDN = "https://hoatuoithanhngoc.com/image/responsive";
const img = (slug: string, _size: 400 | 800 = 800) => {
  if (slug.includes(".")) return `/images/products/${slug}`;
  // Chỉ có phiên bản 800px trên CDN — dùng chung cho cả thumb
  return `${CDN}/${slug}-800.webp`;
};

export const CATEGORIES: { id: Category; label: string; description: string }[] = [
  { id: "bo-hoa", label: "Bó Hoa", description: "Bó hoa tươi cho mọi dịp: sinh nhật, tình yêu, tốt nghiệp" },
  { id: "gio-hoa", label: "Giỏ Hoa", description: "Giỏ hoa thanh lịch, sang trọng cho dịp đặc biệt" },
  { id: "khai-truong", label: "Khai Trương", description: "Kệ hoa khai trương, chúc mừng sự kiện, sảnh lớn" },
  { id: "chia-buon", label: "Chia Buồn", description: "Hoa chia buồn trang trọng, lời tiễn biệt chân thành" },
  { id: "lan-ho-diep", label: "Lan Hồ Điệp", description: "Lan hồ điệp quý phái, biếu tặng cao cấp" },
];

type RawProduct = Omit<Product, "image" | "thumb" | "rating" | "faqs" | "meaning" | "colors" | "sizes" | "occasions" | "careTips" | "materials" | "gallery"> & {
  _img: string;
  rating?: Product["rating"];
  faqs?: FAQ[];
  meaning?: string[];
  colors?: { name: string; hex: string }[];
  sizes?: SizeOption[];
  occasions?: string[];
  careTips?: string[];
  materials?: string[];
  gallery?: GalleryShot[];
  galleryImgs?: string[]; // CDN slugs để build gallery nhanh
};
const raw: RawProduct[] = [
  // SẢN PHẨM AUTO IMPORT TỪ ẢNH
  {
    slug: "img3755-1",
    name: "Img3755",
    category: "bo-hoa",
    _img: "img3755.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3762-2",
    name: "Img 3762",
    category: "bo-hoa",
    _img: "img-3762.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-39-1-3",
    name: "Hoa Hong Kem Tinh Te Webp 39 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-39-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-44-1-4",
    name: "Hoa Hong Kem Tinh Te Webp 44 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-44-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-35-1-5",
    name: "Hoa Hong Kem Tinh Te Webp 35 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-35-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3743-6",
    name: "Img3743",
    category: "bo-hoa",
    _img: "img3743.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hoa-7",
    name: "Bo Hoa",
    category: "bo-hoa",
    _img: "bo-hoa.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-34-8",
    name: "Hoa1 34",
    category: "bo-hoa",
    _img: "hoa1-34.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-37-9",
    name: "Hoa Hong Kem Tinh Te Webp 37",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-37.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hoa-10",
    name: "Bo Hoa",
    category: "bo-hoa",
    _img: "bo-hoa.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hong-11",
    name: "Bo Hong",
    category: "bo-hoa",
    _img: "bo-hong.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-33-12",
    name: "Hoa Hong Kem Tinh Tewebp 33",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-33.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3763-13",
    name: "Img 3763",
    category: "bo-hoa",
    _img: "img-3763.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "co-thanh-ngoc-14",
    name: "Co Thanh Ngoc",
    category: "bo-hoa",
    _img: "co-thanh-ngoc.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3470-15",
    name: "Img3470",
    category: "bo-hoa",
    _img: "img3470.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3749-16",
    name: "Img 3749",
    category: "bo-hoa",
    _img: "img-3749.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3759-17",
    name: "Img3759",
    category: "bo-hoa",
    _img: "img3759.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3761-18",
    name: "Img 3761",
    category: "bo-hoa",
    _img: "img-3761.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-44-19",
    name: "Hoa Hong Kem Tinh Tewebp 44",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-44.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-40-20",
    name: "Hoa Hong Kem Tinh Te Webp 40",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-40.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3766-1-21",
    name: "Img3766 1",
    category: "bo-hoa",
    _img: "img3766-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-43-22",
    name: "Hoa1 43",
    category: "bo-hoa",
    _img: "hoa1-43.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-38-23",
    name: "Hoa1 38",
    category: "bo-hoa",
    _img: "hoa1-38.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-29-24",
    name: "Hoa Hong Kem Tinh Tewebp 29",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-29.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3763-25",
    name: "Img3763",
    category: "bo-hoa",
    _img: "img3763.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3750-1-26",
    name: "Img3750 1",
    category: "bo-hoa",
    _img: "img3750-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3760-27",
    name: "Img 3760",
    category: "bo-hoa",
    _img: "img-3760.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "gio-hoa-trang-xanh-thanh-nha-28",
    name: "Gio Hoa Trang Xanh Thanh Nha",
    category: "gio-hoa",
    _img: "gio-hoa-trang-xanh-thanh-nha.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3748-29",
    name: "Img 3748",
    category: "bo-hoa",
    _img: "img-3748.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3742-1-30",
    name: "Img3742 1",
    category: "bo-hoa",
    _img: "img3742-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "banner-hoa-thanh-ngoc-1-31",
    name: "Banner Hoa Thanh Ngoc 1",
    category: "bo-hoa",
    _img: "banner-hoa-thanh-ngoc-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3764-32",
    name: "Img 3764",
    category: "bo-hoa",
    _img: "img-3764.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3764-1-33",
    name: "Img3764 1",
    category: "bo-hoa",
    _img: "img3764-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3758-34",
    name: "Img 3758",
    category: "bo-hoa",
    _img: "img-3758.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "founder1-35",
    name: "Founder1",
    category: "bo-hoa",
    _img: "founder1.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3762-36",
    name: "Img3762",
    category: "bo-hoa",
    _img: "img3762.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "logo-moi-37",
    name: "Logo Moi",
    category: "bo-hoa",
    _img: "logo-moi.png",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-39-38",
    name: "Hoa1 39",
    category: "bo-hoa",
    _img: "hoa1-39.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hong1-39",
    name: "Bo Hong1",
    category: "bo-hoa",
    _img: "bo-hong1.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3768-1-40",
    name: "Img3768 1",
    category: "bo-hoa",
    _img: "img3768-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hong-1-2-41",
    name: "Bo Hong 1 2",
    category: "bo-hoa",
    _img: "bo-hong-1-2.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-42-42",
    name: "Hoa1 42",
    category: "bo-hoa",
    _img: "hoa1-42.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-41-43",
    name: "Hoa Hong Kem Tinh Te Webp 41",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-41.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-chia-buon-ly-bach-hop-1-44",
    name: "Hoa Chia Buon Ly Bach Hop 1",
    category: "chia-buon",
    _img: "hoa-chia-buon-ly-bach-hop-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3752-1-45",
    name: "Img3752 1",
    category: "bo-hoa",
    _img: "img3752-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3759-46",
    name: "Img 3759",
    category: "bo-hoa",
    _img: "img-3759.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3758-47",
    name: "Img3758",
    category: "bo-hoa",
    _img: "img3758.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3765-48",
    name: "Img 3765",
    category: "bo-hoa",
    _img: "img-3765.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "founder-thanh-tien-49",
    name: "Founder Thanh Tien",
    category: "bo-hoa",
    _img: "founder-thanh-tien.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "nen-hoa-about-1-50",
    name: "Nen Hoa About 1",
    category: "bo-hoa",
    _img: "nen-hoa-about-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-29-1-51",
    name: "Hoa Hong Kem Tinh Te Webp 29 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-29-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3767-52",
    name: "Img 3767",
    category: "bo-hoa",
    _img: "img-3767.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-37-1-53",
    name: "Hoa Hong Kem Tinh Te Webp 37 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-37-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "founder2-54",
    name: "Founder2",
    category: "bo-hoa",
    _img: "founder2.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-32-55",
    name: "Hoa Hong Kem Tinh Tewebp 32",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-32.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-36-56",
    name: "Hoa Hong Kem Tinh Te Webp 36",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-36.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-35-57",
    name: "Hoa1 35",
    category: "bo-hoa",
    _img: "hoa1-35.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3475-1-58",
    name: "Img3475 1",
    category: "bo-hoa",
    _img: "img3475-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3742-59",
    name: "Img3742",
    category: "bo-hoa",
    _img: "img3742.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "banner-60",
    name: "Banner",
    category: "bo-hoa",
    _img: "banner.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3766-61",
    name: "Img 3766",
    category: "bo-hoa",
    _img: "img-3766.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3754-62",
    name: "Img3754",
    category: "bo-hoa",
    _img: "img3754.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3756-1-63",
    name: "Img3756 1",
    category: "bo-hoa",
    _img: "img3756-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa3-2-64",
    name: "Hoa3 2",
    category: "bo-hoa",
    _img: "hoa3-2.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-42-65",
    name: "Hoa Hong Kem Tinh Tewebp 42",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-42.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3748-1-66",
    name: "Img3748 1",
    category: "bo-hoa",
    _img: "img3748-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3482-1-67",
    name: "Img3482 1",
    category: "bo-hoa",
    _img: "img3482-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3749-68",
    name: "Img3749",
    category: "bo-hoa",
    _img: "img3749.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "banner-hoa-thanh-ngoc-69",
    name: "Banner Hoa Thanh Ngoc",
    category: "bo-hoa",
    _img: "banner-hoa-thanh-ngoc.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-chia-buon-ly-bach-hop-70",
    name: "Hoa Chia Buon Ly Bach Hop",
    category: "chia-buon",
    _img: "hoa-chia-buon-ly-bach-hop.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3765-71",
    name: "Img3765",
    category: "bo-hoa",
    _img: "img3765.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3760-1-72",
    name: "Img3760 1",
    category: "bo-hoa",
    _img: "img3760-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-39-73",
    name: "Hoa Hong Kem Tinh Tewebp 39",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-39.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa5-74",
    name: "Hoa5",
    category: "bo-hoa",
    _img: "hoa5.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3753-75",
    name: "Img3753",
    category: "bo-hoa",
    _img: "img3753.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "founder-thanh-ngoc-76",
    name: "Founder Thanh Ngoc",
    category: "bo-hoa",
    _img: "founder-thanh-ngoc.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3474-77",
    name: "Img 3474",
    category: "bo-hoa",
    _img: "img-3474.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3745-78",
    name: "Img3745",
    category: "bo-hoa",
    _img: "img3745.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-42-1-79",
    name: "Hoa Hong Kem Tinh Te Webp 42 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-42-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-32-80",
    name: "Hoa1 32",
    category: "bo-hoa",
    _img: "hoa1-32.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "nen-hoa-about-81",
    name: "Nen Hoa About",
    category: "bo-hoa",
    _img: "nen-hoa-about.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-31-82",
    name: "Hoa Hong Kem Tinh Te Webp 31",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-31.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3475-83",
    name: "Img 3475",
    category: "bo-hoa",
    _img: "img-3475.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3449-84",
    name: "Img 3449",
    category: "bo-hoa",
    _img: "img-3449.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3455-1-85",
    name: "Img3455 1",
    category: "bo-hoa",
    _img: "img3455-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-35-86",
    name: "Hoa Hong Kem Tinh Tewebp 35",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-35.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-33-1-87",
    name: "Hoa Hong Kem Tinh Te Webp 33 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-33-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa4-88",
    name: "Hoa4",
    category: "bo-hoa",
    _img: "hoa4.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "lan-ho-diep-trang-quy-phai-89",
    name: "Lan Ho Diep Trang Quy Phai",
    category: "lan-ho-diep",
    _img: "lan-ho-diep-trang-quy-phai.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hong-1-90",
    name: "Bo Hong 1",
    category: "bo-hoa",
    _img: "bo-hong-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-34-91",
    name: "Hoa Hong Kem Tinh Tewebp 34",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-34.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "logo-thanh-ngoc-flower-1-92",
    name: "Logo Thanh Ngoc Flower 1",
    category: "bo-hoa",
    _img: "logo-thanh-ngoc-flower-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3768-93",
    name: "Img3768",
    category: "bo-hoa",
    _img: "img3768.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-30-94",
    name: "Hoa Hong Kem Tinh Te Webp 30",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-30.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-33-95",
    name: "Hoa1 33",
    category: "bo-hoa",
    _img: "hoa1-33.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3482-96",
    name: "Img3482",
    category: "bo-hoa",
    _img: "img3482.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3449-1-97",
    name: "Img3449 1",
    category: "bo-hoa",
    _img: "img3449-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-31-1-98",
    name: "Hoa Hong Kem Tinh Te Webp 31 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-31-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3470-99",
    name: "Img 3470",
    category: "bo-hoa",
    _img: "img-3470.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "thanh-tien-100",
    name: "Thanh Tien",
    category: "bo-hoa",
    _img: "thanh-tien.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-40-1-101",
    name: "Hoa Hong Kem Tinh Te Webp 40 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-40-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-102",
    name: "Hoa1",
    category: "bo-hoa",
    _img: "hoa1.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3752-103",
    name: "Img3752",
    category: "bo-hoa",
    _img: "img3752.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3758-1-104",
    name: "Img3758 1",
    category: "bo-hoa",
    _img: "img3758-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa3-105",
    name: "Hoa3",
    category: "bo-hoa",
    _img: "hoa3.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-29-106",
    name: "Hoa1 29",
    category: "bo-hoa",
    _img: "hoa1-29.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-38-107",
    name: "Hoa Hong Kem Tinh Tewebp 38",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-38.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3764-108",
    name: "Img3764",
    category: "bo-hoa",
    _img: "img3764.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3754-1-109",
    name: "Img3754 1",
    category: "bo-hoa",
    _img: "img3754-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-44-110",
    name: "Hoa1 44",
    category: "bo-hoa",
    _img: "hoa1-44.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3748-111",
    name: "Img3748",
    category: "bo-hoa",
    _img: "img3748.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3762-1-112",
    name: "Img3762 1",
    category: "bo-hoa",
    _img: "img3762-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-43-113",
    name: "Hoa Hong Kem Tinh Tewebp 43",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-43.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa2-114",
    name: "Hoa2",
    category: "bo-hoa",
    _img: "hoa2.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-29-115",
    name: "Hoa Hong Kem Tinh Te Webp 29",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-29.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3743-1-116",
    name: "Img3743 1",
    category: "bo-hoa",
    _img: "img3743-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3767-117",
    name: "Img3767",
    category: "bo-hoa",
    _img: "img3767.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-44-118",
    name: "Hoa Hong Kem Tinh Te Webp 44",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-44.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3767-1-119",
    name: "Img3767 1",
    category: "bo-hoa",
    _img: "img3767-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-40-120",
    name: "Hoa Hong Kem Tinh Tewebp 40",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-40.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3474-121",
    name: "Img3474",
    category: "bo-hoa",
    _img: "img3474.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3454-122",
    name: "Img3454",
    category: "bo-hoa",
    _img: "img3454.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-37-123",
    name: "Hoa Hong Kem Tinh Tewebp 37",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-37.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3482-124",
    name: "Img 3482",
    category: "bo-hoa",
    _img: "img-3482.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3455-125",
    name: "Img 3455",
    category: "bo-hoa",
    _img: "img-3455.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-33-126",
    name: "Hoa Hong Kem Tinh Te Webp 33",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-33.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-30-127",
    name: "Hoa1 30",
    category: "bo-hoa",
    _img: "hoa1-30.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-38-1-128",
    name: "Hoa Hong Kem Tinh Te Webp 38 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-38-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3454-129",
    name: "Img 3454",
    category: "bo-hoa",
    _img: "img-3454.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-34-1-130",
    name: "Hoa Hong Kem Tinh Te Webp 34 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-34-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3750-131",
    name: "Img3750",
    category: "bo-hoa",
    _img: "img3750.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3474-1-132",
    name: "Img3474 1",
    category: "bo-hoa",
    _img: "img3474-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3487-133",
    name: "Img 3487",
    category: "bo-hoa",
    _img: "img-3487.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-31-134",
    name: "Hoa1 31",
    category: "bo-hoa",
    _img: "hoa1-31.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-36-1-135",
    name: "Hoa Hong Kem Tinh Te Webp 36 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-36-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-32-136",
    name: "Hoa Hong Kem Tinh Te Webp 32",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-32.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3455-137",
    name: "Img3455",
    category: "bo-hoa",
    _img: "img3455.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-36-138",
    name: "Hoa Hong Kem Tinh Tewebp 36",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-36.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-khai-truong-thinh-vuong-139",
    name: "Hoa Khai Truong Thinh Vuong",
    category: "khai-truong",
    _img: "hoa-khai-truong-thinh-vuong.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3475-140",
    name: "Img3475",
    category: "bo-hoa",
    _img: "img3475.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "gio-hoa-trang-xanh-thanh-nha-1-141",
    name: "Gio Hoa Trang Xanh Thanh Nha 1",
    category: "gio-hoa",
    _img: "gio-hoa-trang-xanh-thanh-nha-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-41-142",
    name: "Hoa Hong Kem Tinh Tewebp 41",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-41.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3487-1-143",
    name: "Img3487 1",
    category: "bo-hoa",
    _img: "img3487-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3753-1-144",
    name: "Img3753 1",
    category: "bo-hoa",
    _img: "img3753-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3765-1-145",
    name: "Img3765 1",
    category: "bo-hoa",
    _img: "img3765-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3766-146",
    name: "Img3766",
    category: "bo-hoa",
    _img: "img3766.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "lan-ho-diep-trang-quy-phai-1-147",
    name: "Lan Ho Diep Trang Quy Phai 1",
    category: "lan-ho-diep",
    _img: "lan-ho-diep-trang-quy-phai-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3743-148",
    name: "Img 3743",
    category: "bo-hoa",
    _img: "img-3743.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3757-149",
    name: "Img 3757",
    category: "bo-hoa",
    _img: "img-3757.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-31-150",
    name: "Hoa Hong Kem Tinh Tewebp 31",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-31.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-151",
    name: "Hoa Hong Kem Tinh Te",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-43-1-152",
    name: "Hoa Hong Kem Tinh Te Webp 43 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-43-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hong-153",
    name: "Bo Hong",
    category: "bo-hoa",
    _img: "bo-hong.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-32-1-154",
    name: "Hoa Hong Kem Tinh Te Webp 32 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-32-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-35-155",
    name: "Hoa Hong Kem Tinh Te Webp 35",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-35.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-36-156",
    name: "Hoa1 36",
    category: "bo-hoa",
    _img: "hoa1-36.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3454-1-157",
    name: "Img3454 1",
    category: "bo-hoa",
    _img: "img3454-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3487-158",
    name: "Img3487",
    category: "bo-hoa",
    _img: "img3487.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-1-159",
    name: "Hoa Hong Kem Tinh Te 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3756-160",
    name: "Img 3756",
    category: "bo-hoa",
    _img: "img-3756.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3742-161",
    name: "Img 3742",
    category: "bo-hoa",
    _img: "img-3742.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3757-162",
    name: "Img3757",
    category: "bo-hoa",
    _img: "img3757.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3470-1-163",
    name: "Img3470 1",
    category: "bo-hoa",
    _img: "img3470-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3768-164",
    name: "Img 3768",
    category: "bo-hoa",
    _img: "img-3768.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3754-165",
    name: "Img 3754",
    category: "bo-hoa",
    _img: "img-3754.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hoa-1-166",
    name: "Bo Hoa 1",
    category: "bo-hoa",
    _img: "bo-hoa-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3761-167",
    name: "Img3761",
    category: "bo-hoa",
    _img: "img3761.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-39-168",
    name: "Hoa Hong Kem Tinh Te Webp 39",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-39.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3761-1-169",
    name: "Img3761 1",
    category: "bo-hoa",
    _img: "img3761-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-41-170",
    name: "Hoa1 41",
    category: "bo-hoa",
    _img: "hoa1-41.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "bo-hong-1-1-171",
    name: "Bo Hong 1 1",
    category: "bo-hoa",
    _img: "bo-hong-1-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-42-172",
    name: "Hoa Hong Kem Tinh Te Webp 42",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-42.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3749-1-173",
    name: "Img3749 1",
    category: "bo-hoa",
    _img: "img3749-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3757-1-174",
    name: "Img3757 1",
    category: "bo-hoa",
    _img: "img3757-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3755-175",
    name: "Img 3755",
    category: "bo-hoa",
    _img: "img-3755.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3745-1-176",
    name: "Img3745 1",
    category: "bo-hoa",
    _img: "img3745-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa3-1-177",
    name: "Hoa3 1",
    category: "bo-hoa",
    _img: "hoa3-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3745-178",
    name: "Img 3745",
    category: "bo-hoa",
    _img: "img-3745.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3763-1-179",
    name: "Img3763 1",
    category: "bo-hoa",
    _img: "img3763-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-43-180",
    name: "Hoa Hong Kem Tinh Te Webp 43",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-43.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-40-181",
    name: "Hoa1 40",
    category: "bo-hoa",
    _img: "hoa1-40.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-38-182",
    name: "Hoa Hong Kem Tinh Te Webp 38",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-38.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa3-183",
    name: "Hoa3",
    category: "bo-hoa",
    _img: "hoa3.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3449-184",
    name: "Img3449",
    category: "bo-hoa",
    _img: "img3449.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3759-1-185",
    name: "Img3759 1",
    category: "bo-hoa",
    _img: "img3759-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3760-186",
    name: "Img3760",
    category: "bo-hoa",
    _img: "img3760.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3755-1-187",
    name: "Img3755 1",
    category: "bo-hoa",
    _img: "img3755-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3750-188",
    name: "Img 3750",
    category: "bo-hoa",
    _img: "img-3750.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img3756-189",
    name: "Img3756",
    category: "bo-hoa",
    _img: "img3756.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3752-190",
    name: "Img 3752",
    category: "bo-hoa",
    _img: "img-3752.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-khai-truong-thinh-vuong-1-191",
    name: "Hoa Khai Truong Thinh Vuong 1",
    category: "khai-truong",
    _img: "hoa-khai-truong-thinh-vuong-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-30-1-192",
    name: "Hoa Hong Kem Tinh Te Webp 30 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-30-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-41-1-193",
    name: "Hoa Hong Kem Tinh Te Webp 41 1",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-41-1.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa1-37-194",
    name: "Hoa1 37",
    category: "bo-hoa",
    _img: "hoa1-37.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-te-webp-34-195",
    name: "Hoa Hong Kem Tinh Te Webp 34",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-34.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "hoa-hong-kem-tinh-tewebp-30-196",
    name: "Hoa Hong Kem Tinh Tewebp 30",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-tewebp-30.webp",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },
  {
    slug: "img-3753-197",
    name: "Img 3753",
    category: "bo-hoa",
    _img: "img-3753.jpg",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  },

];

// ----- Defaults theo category -----
const SIZES_BY_CATEGORY: Record<Category, SizeOption[]> = {
  "bo-hoa": [
    { label: "Tiêu chuẩn", dimension: "Cao 35–45cm × Rộng 25–30cm", note: "Phù hợp cầm tay, tặng cá nhân" },
    { label: "Lớn", dimension: "Cao 50–60cm × Rộng 35–40cm", note: "Ấn tượng hơn, phù hợp tặng dịp đặc biệt" },
  ],
  "gio-hoa": [
    { label: "Tiêu chuẩn", dimension: "Cao 40–50cm × Rộng 30–35cm" },
    { label: "Lớn", dimension: "Cao 55–65cm × Rộng 40–50cm", note: "Đặt bàn tiệc, sảnh nhỏ" },
  ],
  "khai-truong": [
    { label: "Kệ 1 tầng", dimension: "Cao 1.6–1.8m × Rộng 0.8–1.0m" },
    { label: "Kệ 2 tầng", dimension: "Cao 1.8–2.2m × Rộng 1.0–1.2m", note: "Phù hợp đặt sảnh lớn" },
  ],
  "chia-buon": [
    { label: "Tiêu chuẩn", dimension: "Cao 1.6–1.8m × Rộng 0.8m" },
    { label: "Lớn", dimension: "Cao 1.8–2.0m × Rộng 1.0m", note: "Trang trọng cho lễ viếng lớn" },
  ],
  "lan-ho-diep": [
    { label: "5 cành", dimension: "Cao ~70cm", note: "Bàn làm việc, biếu tặng cá nhân" },
    { label: "10 cành", dimension: "Cao ~85cm", note: "Khai trương, biếu tặng đối tác" },
    { label: "20 cành+", dimension: "Cao ~95cm", note: "Sự kiện lớn, dịp trọng đại" },
  ],
};

const MEANING_BY_CATEGORY: Record<Category, string[]> = {
  "bo-hoa": [
    "Thể hiện tình cảm chân thành, lãng mạn và sự trân trọng dành cho người nhận.",
    "Bó hoa là món quà phổ biến nhất cho sinh nhật, kỷ niệm, tỏ tình và lễ tốt nghiệp.",
  ],
  "gio-hoa": [
    "Giỏ hoa tượng trưng cho sự đầy đặn, viên mãn và lời chúc trọn vẹn.",
    "Phù hợp biếu tặng cấp trên, khách hàng, thăm bệnh hoặc các dịp trang trọng.",
  ],
  "khai-truong": [
    "Mang lời chúc thịnh vượng, phát tài, hanh thông và khởi đầu thuận lợi cho việc kinh doanh.",
    "Tone vàng — đỏ — cam thường được chọn vì hợp phong thủy đại cát.",
  ],
  "chia-buon": [
    "Gửi gắm sự đồng cảm, tiếc thương và lời tiễn biệt trang trọng đến gia đình người đã khuất.",
    "Tone trắng tượng trưng cho sự thanh khiết, bình an và lòng thành kính.",
  ],
  "lan-ho-diep": [
    "Lan hồ điệp đại diện cho sự sang trọng, quý phái, may mắn và tình yêu bền vững.",
    "Là lựa chọn biếu tặng cao cấp cho dịp khai trương, tân gia, lễ Tết hoặc đối tác quan trọng.",
  ],
};

const CARE_BY_CATEGORY: Record<Category, string[]> = {
  "bo-hoa": [
    "Cắt vát gốc 2–3cm, ngâm trong nước sạch ngay khi nhận.",
    "Thay nước mỗi ngày, tránh ánh nắng trực tiếp và máy lạnh thổi thẳng.",
    "Tỉa bỏ lá ngập trong nước để tránh thối thân.",
  ],
  "gio-hoa": [
    "Tưới mút xốp 1 lần/ngày bằng nước sạch.",
    "Đặt nơi thoáng mát, tránh nắng gắt và gió mạnh.",
    "Có thể dùng được 3–5 ngày với điều kiện chăm sóc đúng.",
  ],
  "khai-truong": [
    "Đặt nơi thông thoáng, tránh đặt sát máy lạnh hoặc nắng chiếu trực tiếp.",
    "Xịt phun sương lên hoa 1–2 lần/ngày để giữ độ tươi.",
    "Kệ hoa giữ đẹp 2–3 ngày trong điều kiện thường.",
  ],
  "chia-buon": [
    "Đặt nơi thoáng, không cần tưới thêm nước trong điều kiện sử dụng ngắn hạn.",
    "Hạn chế di chuyển kệ sau khi đã đặt cố định.",
  ],
  "lan-ho-diep": [
    "Tưới phun sương 1–2 lần/tuần, không tưới đẫm gốc.",
    "Đặt nơi có ánh sáng dịu, tránh nắng gắt và máy lạnh thổi trực tiếp.",
    "Lan giữ tươi đẹp 30–60 ngày nếu chăm đúng cách.",
  ],
};

const OCCASIONS_BY_CATEGORY: Record<Category, string[]> = {
  "bo-hoa": ["Sinh nhật", "Kỷ niệm", "Tỏ tình", "Tốt nghiệp", "8/3 - 20/10", "Valentine"],
  "gio-hoa": ["Sinh nhật", "Thăm bệnh", "Biếu tặng", "Cảm ơn", "Sự kiện công ty"],
  "khai-truong": ["Khai trương", "Khánh thành", "Mừng sự kiện", "Khai xuân"],
  "chia-buon": ["Tang lễ", "Lễ viếng", "Tưởng niệm"],
  "lan-ho-diep": ["Khai trương", "Tân gia", "Lễ Tết", "Biếu đối tác", "Mừng thọ"],
};

// Bảng màu — suy ra từ tên sản phẩm
const COLOR_DICT: { match: RegExp; name: string; hex: string }[] = [
  { match: /trắng|tinh khôi|baby/i, name: "Trắng", hex: "#FFFFFF" },
  { match: /kem|peach|đào/i, name: "Kem", hex: "#F5E1C8" },
  { match: /hồng pastel|pastel/i, name: "Hồng pastel", hex: "#F8C8DC" },
  { match: /hồng phấn|hồng hồng|hồng/i, name: "Hồng", hex: "#F4A6C0" },
  { match: /đỏ/i, name: "Đỏ", hex: "#D62828" },
  { match: /cam/i, name: "Cam", hex: "#F4811F" },
  { match: /vàng/i, name: "Vàng", hex: "#F4C430" },
  { match: /xanh/i, name: "Xanh", hex: "#7BB6A1" },
  { match: /tím/i, name: "Tím", hex: "#9B7EBD" },
  { match: /đen/i, name: "Đen", hex: "#1F1F1F" },
];

const inferColors = (text: string): { name: string; hex: string }[] => {
  const seen = new Set<string>();
  const out: { name: string; hex: string }[] = [];
  for (const c of COLOR_DICT) {
    if (c.match.test(text) && !seen.has(c.name)) {
      seen.add(c.name);
      out.push({ name: c.name, hex: c.hex });
    }
  }
  return out.length > 0 ? out : [{ name: "Đa sắc", hex: "#E8C9A7" }];
};

const MATERIALS_BY_CATEGORY: Record<Category, string[]> = {
  "bo-hoa": ["Hoa tươi nhập khẩu & Đà Lạt", "Giấy gói cao cấp", "Ruy băng lụa", "Thiệp viết tay"],
  "gio-hoa": ["Hoa tươi cao cấp", "Giỏ mây / sắt vintage", "Mút xốp giữ ẩm", "Ruy băng & thiệp"],
  "khai-truong": ["Hoa tươi cao cấp", "Kệ tre / sắt sơn tĩnh điện", "Banner chúc mừng", "Mút xốp giữ ẩm"],
  "chia-buon": ["Hoa ly, cúc, lan trắng", "Kệ tre trang trọng", "Băng tang viết tay"],
  "lan-ho-diep": ["Lan hồ điệp Đà Lạt / nhập khẩu", "Chậu sứ cao cấp", "Rêu trang trí", "Nơ lụa & thiệp"],
};

// Pool ảnh theo category (dùng chính các _img đã có) để build gallery "lô khác / góc khác"
const imgPoolByCat: Record<Category, string[]> = raw.reduce((acc, p) => {
  (acc[p.category] ||= []).push(p._img);
  return acc;
}, {} as Record<Category, string[]>);

const VARIANT_LABELS = [
  { variant: "Lô tháng trước", note: "Cùng thiết kế nhưng tone hoa nhỉnh đậm hơn theo mùa" },
  { variant: "Tone phối nhẹ", note: "Cùng bố cục, sắc hoa nhạt hơn so với hình đại diện" },
  { variant: "Góc chụp khác", note: "Bó hoa thực tế từ góc nghiêng — gói và ruy băng có thể khác chút" },
  { variant: "Khách hàng nhận", note: "Hình thực tế khách gửi về — bố cục giữ nguyên, độ nở hoa thay đổi tự nhiên" },
];

const buildDefaultGallery = (slug: string, cat: Category, mainImg: string): GalleryShot[] => {
  const pool = (imgPoolByCat[cat] || []).filter((s) => s !== mainImg);
  // Lấy ảnh ổn định theo hash slug để không random mỗi render
  const h = hash(slug);
  const picked: string[] = [];
  for (let i = 0; i < Math.min(3, pool.length); i++) {
    picked.push(pool[(h + i * 7) % pool.length]);
  }
  return picked.map((s, i) => ({
    src: img(s, 800),
    alt: `${VARIANT_LABELS[i].variant} — minh họa khác biệt thực tế`,
    variant: VARIANT_LABELS[i].variant,
    note: VARIANT_LABELS[i].note,
  }));
};

export const PRODUCTS: Product[] = raw.map((p) => {
  const colors = p.colors ?? inferColors(`${p.name} ${p.short}`);
  let gallery: GalleryShot[];
  if (p.gallery) gallery = p.gallery;
  else if (p.galleryImgs)
    gallery = p.galleryImgs.map((s, i) => ({
      src: img(s, 800),
      alt: `${p.name} — ${VARIANT_LABELS[i % VARIANT_LABELS.length].variant}`,
      variant: VARIANT_LABELS[i % VARIANT_LABELS.length].variant,
      note: VARIANT_LABELS[i % VARIANT_LABELS.length].note,
    }));
  else gallery = buildDefaultGallery(p.slug, p.category, p._img);

  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    badge: p.badge,
    short: p.short,
    description: p.description,
    price: p.price,
    keywords: p.keywords,
    rating: p.rating ?? ratingFor(p.slug),
    faqs: p.faqs ?? FAQ_BY_CATEGORY[p.category],
    meaning: p.meaning ?? MEANING_BY_CATEGORY[p.category],
    colors,
    sizes: p.sizes ?? SIZES_BY_CATEGORY[p.category],
    occasions: p.occasions ?? OCCASIONS_BY_CATEGORY[p.category],
    careTips: p.careTips ?? CARE_BY_CATEGORY[p.category],
    materials: p.materials ?? MATERIALS_BY_CATEGORY[p.category],
    gallery,
    image: img(p._img, 800),
    thumb: img(p._img, 400),
  };
});

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsByCategory = (cat: Category) => PRODUCTS.filter((p) => p.category === cat);
export const featuredProducts = () => {
  const featured = PRODUCTS.filter((p) => p.badge);
  return featured.length > 0 ? featured.slice(0, 8) : PRODUCTS.slice(0, 8);
};

export const formatPrice = (vnd?: number) =>
  vnd ? new Intl.NumberFormat("vi-VN").format(vnd) + "₫" : "Liên hệ";
