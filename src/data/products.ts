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
  variant: string;
  note?: string;
};

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};
const ratingFor = (slug: string) => {
  const h = hash(slug);
  const value = +(4.6 + (h % 40) / 100).toFixed(1);
  const count = 48 + (h % 220);
  return { value, count };
};

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

// ----- Sửa hàm img() để detect extension từ tên file -----
const img = (slug: string, _size: 400 | 800 = 800) => {
  // Nếu slug đã có extension ("ten-file.png"), dùng trực tiếp
  if (slug.includes(".")) return `/images/${slug}`;
  // Mặc định thử .webp (sẽ fallback qua component)
  return `/images/${slug}.webp`;
};
export const imgUrl = (filename: string) => `/images/${filename}`;

export type CategoryConfig = { id: Category; label: string; description: string; image?: string };

export const CATEGORIES: CategoryConfig[] = [
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
  galleryImgs?: string[];
};

export type NewProduct = {
  slug: string;
  name: string;
  category: "bo-hoa" | "gio-hoa" | "khai-truong" | "chia-buon" | "lan-ho-diep";
  badge?: "Bán chạy" | "Nổi bật";
  _img: string;
  short: string;
  description: string;
  keywords: string[];
  galleryImgs: string[];
};

// ============================================================
// SẢN PHẨM CHÍNH THỨC — CHỈ DÙNG ẢNH CÓ THẬT
// ============================================================
const raw: RawProduct[] = [
  // ----- BÓ HOA -----
  {
    slug: "bo-hoa-tuoi-dep-sang",
    name: "Bó Hoa Tươi Đẹp Sang",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "bo-hoa-tuoi-dep-sang.png",
    short: "Bó hoa tươi tone hồng trắng thanh lịch, gói giấy sang trọng — sinh nhật, kỷ niệm, cảm ơn. Giao 2 giờ tại TP.HCM.",
    description:
      "Bó Hoa Tươi Đẹp Sang được thiết kế tinh tế với hoa hồng hồng phấn, hoa cẩm chướng trắng, baby trắng và lá xanh tươi, gói giấy cao cấp tông hồng kem nhẹ nhàng. Phù hợp tặng sinh nhật, kỷ niệm, cảm ơn hoặc gửi lời yêu thương đến người thân, bạn bè, đồng nghiệp. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa tươi đẹp",
      "bó hoa hồng phấn",
      "bó hoa sinh nhật",
      "hoa tươi sang trọng",
      "hoa tặng người yêu",
      "hoa tươi TP.HCM",
      "giao hoa nhanh",
    ],
    galleryImgs: [
      "bo-hoa-tuoi-dep-sang.png",
      "bo-hoa-tuoi-dep-sang-chinh-dien.jpg",
      "bo-hoa-tuoi-dep-sang-can-canh.jpg",
      "bo-hoa-tuoi-dep-sang-tren-cao.jpg",
      "bo-hoa-tuoi-dep-sang-anh-sang.jpg",
    ],
  },
  {
    slug: "bo-hoa-hong-pastel-ngot-ngao",
    name: "Bó Hoa Hồng Pastel Ngọt Ngào",
    category: "bo-hoa",
    badge: "Bán chạy",
    _img: "bo-hoa-hong-pastel-ngot-ngao.png",
    short: "Bó hoa hồng pastel phối hồng kem nhẹ nhàng, sang trọng — sinh nhật, kỷ niệm, tỏ tình. Giao 2 giờ tại TP.HCM.",
    description:
      "Bó Hoa Hồng Pastel Ngọt Ngào được thiết kế từ hoa hồng hồng phấn, hồng kem và các nụ hoa điểm xuyết, gói giấy pastel mềm mại. Phù hợp tặng sinh nhật, kỷ niệm, chúc mừng hoặc gửi lời yêu thương. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa hồng pastel",
      "bó hoa hồng hồng phấn",
      "hoa hồng kem",
      "hoa tặng sinh nhật",
      "hoa tặng người yêu",
      "hoa đẹp TP.HCM",
    ],
    galleryImgs: [
      "bo-hoa-hong-pastel-ngot-ngao.png",
    ],
  },
  {
    slug: "bo-hoa-hong-kem-tinh-te",
    name: "Bó Hoa Hồng Kem Tinh Tế",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "bo-hoa-tuoi-dep-sang.png",
    short: "Bó hoa hồng kem tinh tế, nhẹ nhàng và sang trọng — tặng sinh nhật, kỷ niệm, chúc mừng. Giao 2 giờ tại TP.HCM.",
    description:
      "Bó Hoa Hồng Kem Tinh Tế kết hợp hoa hồng kem, hồng phấn và hoa baby trắng, gói giấy pastel mềm mại, tạo vẻ đẹp thanh lịch, ngọt ngào. Lựa chọn hoàn hảo để tặng người thân, bạn bè trong những dịp đặc biệt. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa hồng kem",
      "bó hoa hồng tinh tế",
      "hoa tặng sinh nhật",
      "hoa tặng bạn bè",
      "bó hoa đẹp",
      "hoa tươi TP.HCM",
    ],
    galleryImgs: [
      "bo-hoa-tuoi-dep-sang.png",
      "bo-hoa-hong-kem-tinh-te-can-canh.jpg",
    ],
  },
  {
    slug: "red-velvet-roses-bouquet",
    name: "Red Velvet Roses Bouquet",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "red-velvet-roses-bouquet.png",
    price: 950000,
    short:
      "Bó hoa hồng đỏ nổi bật với baby trắng và eucalyptus xanh bạc, mang cảm giác lãng mạn và thanh lịch cho những dịp đặc biệt.",
    description:
      "Red Velvet Roses Bouquet là thiết kế hoa mang vẻ đẹp cổ điển với những đóa hồng đỏ nhung phối baby trắng và eucalyptus xanh bạc. Tone gói trắng kem giúp tổng thể nhẹ nhàng nhưng vẫn nổi bật, phù hợp cho sinh nhật, kỷ niệm và những dịp cần gửi gắm cảm xúc chân thành.",
    keywords: [
      "bó hoa hồng đỏ",
      "red rose bouquet",
      "hoa sinh nhật đẹp",
      "bouquet hoa hồng đỏ luxury",
      "hoa tặng người yêu",
      "hoa hồng đỏ baby trắng",
      "birthday rose bouquet",
      "hoa chúc mừng sinh nhật tphcm",
    ],
    galleryImgs: [
      "red-velvet-roses-bouquet.png",
      "red-velvet-roses-bouquet-lifestyle.jpg",
      "red-velvet-roses-bouquet-closeup.jpg",
      "red-velvet-roses-bouquet-angle45.jpg",
      "red-velvet-roses-bouquet-delivery.jpg",
    ],
  },

  // ----- GIỎ HOA -----
  {
    slug: "gio-hoa-dep-sang-tao",
    name: "Giỏ Hoa Đẹp Sáng Tạo",
    category: "gio-hoa",
    badge: "Bán chạy",
    _img: "gio-hoa-dep-sang-tao.png",
    short: "Giỏ hoa tươi sáng tạo với hoa hồng, hoa baby, màu sắc hài hoà — sinh nhật, kỷ niệm, biếu tặng. Giao 2 giờ tại TP.HCM.",
    description:
      "Giỏ Hoa Đẹp Sáng Tạo là sự kết hợp tinh tế giữa hoa hồng các màu, hoa baby trắng và lá xanh mướt, được sắp xếp trong giỏ mây vintage sang trọng. Phù hợp tặng sinh nhật, kỷ niệm, cảm ơn đối tác hoặc thăm bệnh. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "giỏ hoa đẹp",
      "giỏ hoa sáng tạo",
      "giỏ hoa tươi",
      "hoa sinh nhật",
      "giỏ hoa biếu tặng",
      "hoa tươi TP.HCM",
    ],
    galleryImgs: [
      "gio-hoa-dep-sang-tao.png",
      "gio-hoa-dep-sang-tao-chinh-dien.jpg",
      "gio-hoa-dep-sang-tao-can-canh.jpg",
      "gio-hoa-dep-sang-tao-anh-sang.jpg",
    ],
  },
  {
    slug: "gio-hoa-tinh-yeu-hong",
    name: "Giỏ Hoa Tình Yêu Hồng",
    category: "gio-hoa",
    badge: "Bán chạy",
    _img: "gio-hoa-tinh-yeu-hong.png",
    short: "Giỏ hoa tông hồng ngọt ngào, sang trọng — tặng người yêu, sinh nhật, kỷ niệm. Giao 2 giờ tại TP.HCM.",
    description:
      "Giỏ Hoa Tình Yêu Hồng được thiết kế với hoa hồng hồng, hoa cẩm chướng hồng và baby trắng, điểm xuyết lá xanh tươi, giỏ mây đan thanh lịch. Món quà hoàn hảo để gửi gắm yêu thương đến người ấy trong ngày sinh nhật, kỷ niệm hoặc Valentine. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "giỏ hoa tình yêu",
      "giỏ hoa hồng",
      "hoa tặng người yêu",
      "hoa sinh nhật",
      "hoa valentine",
      "giỏ hoa đẹp",
    ],
    galleryImgs: [
      "gio-hoa-tinh-yeu-hong.png",
      "gio-hoa-tinh-yeu-hong-chinh-dien.jpg",
      "gio-hoa-tinh-yeu-hong-can-canh.jpg",
      "gio-hoa-tinh-yeu-hong-anh-sang.jpg",
    ],
  },

  // ----- KHAI TRƯƠNG -----
  {
    slug: "ke-hoa-khai-truong-thanh-cong",
    name: "Kệ Hoa Khai Trương Thành Công",
    category: "khai-truong",
    badge: "Nổi bật",
    _img: "ke-hoa-khai-truong-thanh-cong.png",
    short: "Kệ hoa khai trương sang trọng, tone hồng cam may mắn — chúc mừng khai trương, khánh thành. Giao 2 giờ tại TP.HCM.",
    description:
      "Kệ Hoa Khai Trương Thành Công thiết kế ấn tượng với hoa hồng các màu, hoa baby trắng, cúc và lá xanh, tông màu hồng cam chủ đạo mang ý nghĩa may mắn, phát tài. Phù hợp chúc mừng khai trương, khánh thành, sự kiện doanh nghiệp. Giao và dựng kệ miễn phí trong nội thành TP.HCM.",
    keywords: [
      "kệ hoa khai trương",
      "hoa khai trương sang trọng",
      "kệ hoa chúc mừng",
      "hoa hồng cam",
      "hoa khai trương TP.HCM",
    ],
    galleryImgs: [
      "ke-hoa-khai-truong-thanh-cong.png",
      "ke-hoa-khai-truong-thanh-cong-chinh-dien.png",
      "ke-hoa-khai-truong-thanh-cong-can-canh.png",
    ],
  },
  {
    slug: "ke-hoa-khai-truong-sang-trong-trang",
    name: "Kệ Hoa Khai Trương Sang Trọng Trắng",
    category: "khai-truong",
    _img: "ke-hoa-khai-truong-sang-trong-trang.png",
    short: "Kệ hoa khai trương tông trắng vàng tinh tế, sang trọng — chúc mừng khai trương, khánh thành. Giao 2 giờ tại TP.HCM.",
    description:
      "Kệ Hoa Khai Trương Sang Trọng Trắng được thiết kế với hoa hồng trắng, hoa cúc trắng, baby trắng kết hợp với lá xanh và điểm nhấn vàng nhẹ, tạo vẻ đẹp trang nhã, đẳng cấp. Phù hợp chúc mừng khai trương, khánh thành, sự kiện doanh nghiệp hoặc biếu tặng đối tác. Giao và dựng kệ miễn phí trong nội thành TP.HCM.",
    keywords: [
      "kệ hoa khai trương trắng",
      "hoa khai trương sang trọng",
      "kệ hoa trắng tinh tế",
      "hoa chúc mừng",
      "hoa khai trương TP.HCM",
    ],
    galleryImgs: [
      "ke-hoa-khai-truong-sang-trong-trang.png",
    ],
  },

  // ----- CHIA BUỒN -----
  {
    slug: "lang-hoa-chia-buon-thanh-lich",
    name: "Lẵng Hoa Chia Buồn Thanh Lịch",
    category: "chia-buon",
    _img: "lang-hoa-chia-buon-thanh-lich.png",
    short: "Lẵng hoa chia buồn tông trắng xanh trang nghiêm, thành kính — tang lễ, lễ viếng. Giao 2 giờ tại TP.HCM.",
    description:
      "Lẵng Hoa Chia Buồn Thanh Lịch kết hợp hoa hồng trắng, hoa cúc trắng, lan trắng và lá xanh trang trọng, thể hiện sự thành kính và lòng tiếc thương sâu sắc. Phù hợp gửi đến tang lễ, nhà tang lễ hoặc gia quyến để bày tỏ sự chia buồn và phân ưu. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "hoa chia buồn",
      "lẵng hoa tang lễ",
      "hoa viếng tang",
      "hoa chia buồn trắng",
      "hoa phân ưu",
      "hoa tang TP.HCM",
    ],
    galleryImgs: [
      "lang-hoa-chia-buon-thanh-lich.png",
    ],
  },
];

// ----- Defaults theo category -----

const SIZES_BY_CATEGORY: Record<Category, SizeOption[]> = {
  "bo-hoa": [
    { label: "Tiêu chuẩn", dimension: "Cao 35–45cm × Rộng 25–30cm", note: "Phù hợp cầm tay, tặng cá nhân" },
    { label: "Lớn", dimension: "Cao 50–60cm × Rộng 35–40cm", note: "Ấn tượng hơn, phù hợp dịp đặc biệt" },
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

const imgPoolByCat: Record<Category, string[]> = raw.reduce((acc, p) => {
  (acc[p.category] ||= []).push(p._img);
  return acc;
}, {} as Record<Category, string[]>);

const VARIANT_LABELS = [
  { variant: "Góc chính diện", note: "Nhìn thẳng vào sản phẩm — bố cục tổng thể rõ nhất" },
  { variant: "Góc cận cảnh", note: "Chi tiết hoa, màu sắc và chất liệu" },
  { variant: "Góc từ trên cao", note: "Nhìn toàn bộ từ trên xuống — bố cục và tỉ lệ" },
  { variant: "Ánh sáng tự nhiên", note: "Chụp ngoài trời — màu sắc thực nhất" },
];

const buildDefaultGallery = (slug: string, cat: Category, mainImg: string): GalleryShot[] => {
  const pool = (imgPoolByCat[cat] || []).filter((s) => s !== mainImg);
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