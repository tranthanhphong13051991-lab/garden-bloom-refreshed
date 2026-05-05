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

const img = (slug: string, _size: 400 | 800 = 800) => {
  if (slug.includes(".")) return `/images/${slug}`;
  return `/images/${slug}.webp`;
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
  galleryImgs?: string[];
};

const raw: RawProduct[] = [

  // ── LAN HỒ ĐIỆP ──────────────────────────────────────────────────
  {
    slug: "chau-lan-ho-diep-trang-quy-phai",
    name: "Chậu Lan Hồ Điệp Trắng Quý Phái",
    category: "lan-ho-diep",
    badge: "Bán chạy",
    _img: "lan-ho-diep-trang-quy-phai.webp",
    short: "Chậu lan hồ điệp trắng sang trọng từ Thanh Ngọc — thích hợp biếu tặng khai trương, tân gia và Tết.",
    description: "Chậu lan hồ điệp trắng thuần khiết, quý phái — biểu tượng của may mắn và thịnh vượng. Phù hợp biếu tặng đối tác, khai trương, tân gia hoặc Tết. Giao tận nơi tại TP.HCM, kèm thiệp miễn phí.",
    keywords: ["lan hồ điệp", "chậu lan hồ điệp", "lan hồ điệp trắng", "lan hồ điệp biếu tặng", "lan hồ điệp khai trương", "chậu lan đẹp tphcm"],
    galleryImgs: ["lan-ho-diep-trang-quy-phai-1.webp"],
  },

  // ── GIỎ HOA ──────────────────────────────────────────────────────
  {
    slug: "gio-hoa-trang-xanh-thanh-nha",
    name: "Giỏ Hoa Trắng Xanh Thanh Nhã",
    category: "gio-hoa",
    badge: "Bán chạy",
    _img: "gio-hoa-trang-xanh-thanh-nha.webp",
    short: "Giỏ hoa trắng xanh thanh nhã từ Thanh Ngọc — sang trọng, phù hợp sinh nhật và thăm bệnh.",
    description: "Giỏ hoa trắng xanh thiết kế thanh nhã, kết từ hoa tươi cao cấp. Phù hợp tặng sinh nhật, thăm bệnh, cảm ơn hoặc biếu tặng cấp trên. Giao hàng 2 giờ nội thành TP.HCM, kèm thiệp viết tay.",
    keywords: ["giỏ hoa", "lẵng hoa", "giỏ hoa trắng xanh", "hoa biếu tặng", "hoa thăm bệnh", "giỏ hoa sinh nhật", "giỏ hoa tươi tphcm"],
    galleryImgs: ["gio-hoa-trang-xanh-thanh-nha-1.webp"],
  },

  // ── CHIA BUỒN ────────────────────────────────────────────────────
  {
    slug: "lang-hoa-chia-buon-lys-bach-hop",
    name: "Lẵng Hoa Chia Buồn Lys Bạch Hợp",
    category: "chia-buon",
    _img: "hoa-chia-buon-ly-bach-hop.webp",
    short: "Lẵng hoa chia buồn thanh tao từ hoa lys và bạch hợp trắng — lời tiễn biệt trang trọng và chân thành.",
    description: "Lẵng hoa chia buồn kết từ hoa lys, bạch hợp và cúc trắng tinh khôi, trang trọng đúng lễ nghi. Có viết băng tang theo yêu cầu, giao tận nơi trong TP.HCM. Phục vụ 7h–21h tất cả các ngày.",
    keywords: ["hoa chia buồn", "lẵng hoa chia buồn", "hoa tang lễ", "hoa trắng chia buồn", "hoa lys tang lễ", "hoa đám tang tphcm"],
    galleryImgs: ["hoa-chia-buon-ly-bach-hop-1.webp"],
  },

  // ── KHAI TRƯƠNG ──────────────────────────────────────────────────
  {
    slug: "ke-hoa-khai-truong-thinh-vuong",
    name: "Kệ Hoa Khai Trương Thịnh Vượng",
    category: "khai-truong",
    badge: "Nổi bật",
    _img: "hoa-khai-truong-thinh-vuong.webp",
    short: "Kệ hoa khai trương thịnh vượng từ Thanh Ngọc — tone vàng đỏ rực rỡ, giao và lắp đặt tận nơi.",
    description: "Kệ hoa khai trương thiết kế tone vàng đỏ cam hợp phong thủy, cao 1,6m–1,8m. Phù hợp đặt sảnh khai trương, sự kiện, văn phòng. Giao và dựng kệ miễn phí nội thành TP.HCM, nên đặt trước 4–6 tiếng.",
    keywords: ["kệ hoa khai trương", "hoa khai trương", "hoa chúc mừng khai trương", "kệ hoa đứng", "hoa sự kiện", "hoa khai trương tphcm"],
    galleryImgs: ["hoa-khai-truong-thinh-vuong-1.webp"],
  },

  // ── BÓ HOA - SERIES HỒNG KEM ─────────────────────────────────────
  {
    slug: "bo-hoa-hong-kem-tinh-te",
    name: "Bó Hoa Hồng Kem Tinh Tế",
    category: "bo-hoa",
    badge: "Bán chạy",
    _img: "hoa-hong-kem-tinh-te.webp",
    short: "Bó hoa hồng kem tinh tế từ Thanh Ngọc — sang trọng, thích hợp sinh nhật và kỷ niệm yêu.",
    description: "Bó hoa hồng kem kết thủ công từ hoa hồng Ecuador tươi, tông kem trắng nhẹ nhàng, sang trọng. Phù hợp tặng sinh nhật, kỷ niệm, tỏ tình hoặc tri ân. Liên hệ Zalo để đặt và giao trong 2 giờ tại TP.HCM.",
    keywords: ["bó hoa hồng kem", "hoa hồng kem tinh tế", "hoa sinh nhật", "bó hoa tặng người yêu", "hoa hồng đẹp tphcm", "bó hoa kỷ niệm"],
    galleryImgs: ["hoa-hong-kem-tinh-te-1.webp", "hoa-hong-kem-tinh-te-webp-29.webp", "hoa-hong-kem-tinh-te-webp-29-1.webp"],
  },
  {
    slug: "bo-hoa-hong-kem-tinh-te-classic",
    name: "Bó Hoa Hồng Kem Tinh Tế Classic",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-33.webp",
    short: "Bó hoa hồng kem classic từ Thanh Ngọc — thiết kế tròn đầy, thích hợp sinh nhật và kỷ niệm.",
    description: "Bó hoa hồng kem classic tròn đầy, kết từ hoa hồng cao cấp tông kem trắng. Kiểu dáng kinh điển luôn được lòng người nhận. Phù hợp sinh nhật, kỷ niệm, tỏ tình. Giao 2 giờ nội thành TP.HCM.",
    keywords: ["bó hoa hồng kem classic", "hoa hồng kem", "bó hoa sinh nhật đẹp", "hoa tặng người yêu", "bó hoa đẹp tphcm"],
    galleryImgs: ["hoa-hong-kem-tinh-te-webp-33-1.webp", "hoa-hong-kem-tinh-te-webp-32.webp", "hoa-hong-kem-tinh-te-webp-32-1.webp"],
  },
  {
    slug: "bo-hoa-hong-kem-sang-trong",
    name: "Bó Hoa Hồng Kem Sang Trọng",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-37.webp",
    short: "Bó hoa hồng kem sang trọng từ Thanh Ngọc — thiết kế xòe lớn, ấn tượng cho dịp đặc biệt.",
    description: "Bó hoa hồng kem sang trọng với thiết kế xòe lớn, kết từ hoa hồng Ecuador tươi cao cấp. Ấn tượng và đẳng cấp, phù hợp sinh nhật lớn, kỷ niệm hôn nhân. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa hồng kem sang trọng", "hoa hồng cao cấp", "bó hoa đặc biệt", "hoa kỷ niệm hôn nhân", "bó hoa sinh nhật lớn tphcm"],
    galleryImgs: ["hoa-hong-kem-tinh-te-webp-37-1.webp", "hoa-hong-kem-tinh-te-webp-36.webp", "hoa-hong-kem-tinh-te-webp-36-1.webp"],
  },
  {
    slug: "bo-hoa-hong-kem-mix-trang",
    name: "Bó Hoa Hồng Kem Mix Trắng",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-41.webp",
    short: "Bó hoa hồng kem mix trắng từ Thanh Ngọc — tông màu thuần khiết, thích hợp sinh nhật và tốt nghiệp.",
    description: "Bó hoa hồng kem phối trắng mềm mại và thuần khiết. Phù hợp tặng sinh nhật, lễ tốt nghiệp, hoặc ngày phụ nữ. Thiết kế tươi sáng, dễ cầm, giao trong 2 giờ tại TP.HCM.",
    keywords: ["bó hoa hồng kem trắng", "hoa tốt nghiệp", "bó hoa sinh nhật trắng", "hoa tặng mẹ", "bó hoa 8/3 tphcm"],
    galleryImgs: ["hoa-hong-kem-tinh-te-webp-41-1.webp", "hoa-hong-kem-tinh-te-webp-40.webp", "hoa-hong-kem-tinh-te-webp-40-1.webp"],
  },
  {
    slug: "bo-hoa-hong-kem-tron-day",
    name: "Bó Hoa Hồng Kem Tròn Đầy",
    category: "bo-hoa",
    _img: "hoa-hong-kem-tinh-te-webp-44.webp",
    short: "Bó hoa hồng kem tròn đầy từ Thanh Ngọc — thiết kế đầy đặn, viên mãn, tặng dịp yêu thương.",
    description: "Bó hoa hồng kem tròn đầy với thiết kế nhiều bông, tượng trưng cho sự viên mãn. Phù hợp tặng sinh nhật, kỷ niệm hoặc lời cảm ơn chân thành. Giao tận nơi 2 giờ tại TP.HCM.",
    keywords: ["bó hoa hồng kem đầy", "hoa sinh nhật đẹp", "bó hoa tròn", "hoa tặng bạn gái", "hoa hồng kem tphcm"],
    galleryImgs: ["hoa-hong-kem-tinh-te-webp-44-1.webp", "hoa-hong-kem-tinh-te-webp-43.webp", "hoa-hong-kem-tinh-te-webp-43-1.webp"],
  },

  // ── BÓ HOA - SERIES HOA MIX NHIỀU LOÀI ──────────────────────────
  {
    slug: "bo-hoa-mix-pastel-ngot-ngao",
    name: "Bó Hoa Mix Pastel Ngọt Ngào",
    category: "bo-hoa",
    _img: "hoa1-29.webp",
    short: "Bó hoa mix pastel ngọt ngào từ Thanh Ngọc — phối màu nhẹ nhàng, thích hợp tặng sinh nhật bạn gái.",
    description: "Bó hoa mix nhiều loài tông pastel nhẹ nhàng, ngọt ngào. Kết hợp hài hòa các loài hoa tươi màu sắc dịu dàng. Phù hợp tặng sinh nhật, 8/3, Valentine. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa pastel", "bó hoa mix nhiều màu", "hoa tặng bạn gái", "hoa sinh nhật bạn gái", "bó hoa 8/3 tphcm"],
    galleryImgs: ["hoa1-30.webp", "hoa1-31.webp", "hoa1-32.webp"],
  },
  {
    slug: "bo-hoa-mix-trang-tim-diu-dang",
    name: "Bó Hoa Mix Trắng Tím Dịu Dàng",
    category: "bo-hoa",
    _img: "hoa1-33.webp",
    short: "Bó hoa mix trắng tím dịu dàng từ Thanh Ngọc — phong cách thơ mộng, tặng người đặc biệt.",
    description: "Bó hoa phối trắng và tím dịu dàng, thơ mộng. Thiết kế tinh tế phù hợp tặng sinh nhật, kỷ niệm yêu, hoặc ngày phụ nữ 20/10. Giao tận nơi tại TP.HCM.",
    keywords: ["bó hoa trắng tím", "bó hoa thơ mộng", "hoa tặng người yêu", "hoa 20/10", "bó hoa dịu dàng tphcm"],
    galleryImgs: ["hoa1-34.webp", "hoa1-35.webp", "hoa1-36.webp"],
  },
  {
    slug: "bo-hoa-mix-tone-am-ruc-ro",
    name: "Bó Hoa Mix Tông Ấm Rực Rỡ",
    category: "bo-hoa",
    _img: "hoa1-38.webp",
    short: "Bó hoa mix tông ấm rực rỡ từ Thanh Ngọc — tone cam hồng vàng nổi bật, thích hợp sinh nhật.",
    description: "Bó hoa mix tông ấm với cam, hồng và vàng rực rỡ, năng động. Mang lại cảm giác vui vẻ, ấm áp cho người nhận. Phù hợp sinh nhật, chúc mừng tốt nghiệp. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa cam hồng vàng", "hoa tông ấm", "bó hoa chúc mừng", "hoa tốt nghiệp đẹp", "bó hoa rực rỡ tphcm"],
    galleryImgs: ["hoa1-37.webp", "hoa1-39.webp", "hoa1-40.webp"],
  },
  {
    slug: "bo-hoa-mix-sac-mat-tuoi-sang",
    name: "Bó Hoa Mix Sắc Mát Tươi Sáng",
    category: "bo-hoa",
    _img: "hoa1-43.webp",
    short: "Bó hoa mix sắc mát tươi sáng từ Thanh Ngọc — tone lạnh dịu mát, thích hợp tặng cô giáo và thăm bệnh.",
    description: "Bó hoa mix tone mát với trắng, xanh và hồng nhạt tươi sáng. Phù hợp tặng thầy cô, thăm bệnh, hoặc cảm ơn. Giao tận nơi trong 2 giờ tại TP.HCM.",
    keywords: ["bó hoa tone mát", "hoa tặng cô giáo", "hoa thăm bệnh", "bó hoa cảm ơn", "bó hoa tươi sáng tphcm"],
    galleryImgs: ["hoa1-42.webp", "hoa1-41.webp", "hoa1-44.webp"],
  },

  // ── BÓ HOA - SERIES BÓ HỒNG ─────────────────────────────────────
  {
    slug: "bo-hoa-hong-tuoi-tham",
    name: "Bó Hoa Hồng Tươi Thắm",
    category: "bo-hoa",
    badge: "Bán chạy",
    _img: "bo-hong.webp",
    short: "Bó hoa hồng tươi thắm từ Thanh Ngọc — rực rỡ, cuốn hút, thích hợp tặng ngày lễ tình yêu.",
    description: "Bó hoa hồng tươi thắm kết thủ công, màu hồng rực rỡ quyến rũ. Lựa chọn hoàn hảo cho Valentine, sinh nhật, tỏ tình. Giao tận nơi trong 2 giờ tại TP.HCM, kèm thiệp miễn phí.",
    keywords: ["bó hoa hồng", "hoa hồng tươi", "hoa tặng người yêu", "hoa valentine", "bó hoa hồng sinh nhật", "hoa hồng tphcm"],
    galleryImgs: [],
  },
  {
    slug: "bo-hoa-hong-phan-lang-man",
    name: "Bó Hoa Hồng Phấn Lãng Mạn",
    category: "bo-hoa",
    _img: "bo-hong-1.webp",
    short: "Bó hoa hồng phấn lãng mạn từ Thanh Ngọc — màu phấn dịu dàng, tặng dịp tình yêu và kỷ niệm.",
    description: "Bó hoa hồng phấn nhẹ nhàng và lãng mạn, phù hợp tặng bạn gái, mẹ hoặc người thân nhân ngày đặc biệt. Giao 2 giờ tại TP.HCM, kèm thiệp viết tay.",
    keywords: ["bó hoa hồng phấn", "hoa hồng pastel", "hoa tặng bạn gái", "bó hoa lãng mạn", "hoa hồng dịu dàng tphcm"],
    galleryImgs: ["bo-hong-1-1.webp", "bo-hong-1-2.webp"],
  },
  {
    slug: "bo-hoa-hong-do-nong-nan",
    name: "Bó Hoa Hồng Đỏ Nồng Nàn",
    category: "bo-hoa",
    _img: "bo-hong1.jpg",
    short: "Bó hoa hồng đỏ nồng nàn từ Thanh Ngọc — màu đỏ rực, tượng trưng cho tình yêu mãnh liệt.",
    description: "Bó hoa hồng đỏ đậm nồng nàn, cuốn hút. Là lời tỏ tình ý nghĩa nhất dành cho người thương. Phù hợp Valentine, sinh nhật, kỷ niệm. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa hồng đỏ", "hoa hồng đỏ tình yêu", "hoa valentine đỏ", "bó hoa hồng đỏ sinh nhật", "hoa hồng đỏ tphcm"],
    galleryImgs: [],
  },
  {
    slug: "bo-hoa-tuoi-ngay-vui",
    name: "Bó Hoa Tươi Ngày Vui",
    category: "bo-hoa",
    _img: "bo-hoa.webp",
    short: "Bó hoa tươi ngày vui từ Thanh Ngọc — mix nhiều loài, rực rỡ và tươi sáng cho mọi dịp.",
    description: "Bó hoa tươi mix nhiều loài hoa theo mùa, rực rỡ và tươi sáng. Phù hợp sinh nhật, tốt nghiệp, cảm ơn hoặc bất kỳ dịp đặc biệt nào. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa tươi", "bó hoa mix", "hoa sinh nhật", "hoa tốt nghiệp", "bó hoa đẹp tphcm"],
    galleryImgs: ["bo-hoa-1.webp"],
  },

  // ── KỆ HOA - SERIES IMG34XX ───────────────────────────────────────
  {
    slug: "ke-hoa-khai-truong-hong-pastel-duyen-dang",
    name: "Kệ Hoa Khai Trương Hồng Pastel Duyên Dáng",
    category: "khai-truong",
    badge: "Bán chạy",
    _img: "img3449.webp",
    short: "Kệ hoa khai trương hồng pastel duyên dáng từ Thanh Ngọc — 2 tầng tươi sáng, giao lắp đặt miễn phí.",
    description: "Kệ hoa khai trương 2 tầng kết từ hoa hồng pastel, eustoma trắng, tím lavender nhẹ nhàng. Tone màu duyên dáng, sang trọng — phù hợp khai trương spa, thẩm mỹ, văn phòng. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương", "hoa khai trương hồng pastel", "kệ hoa 2 tầng", "hoa khai trương đẹp tphcm", "kệ hoa sự kiện"],
    galleryImgs: ["img3449-1.webp"],
  },
  {
    slug: "ke-hoa-su-kien-hoa-do-noi-bat",
    name: "Kệ Hoa Sự Kiện Hoa Đỏ Nổi Bật",
    category: "khai-truong",
    _img: "img3454.webp",
    short: "Kệ hoa sự kiện hoa đỏ nổi bật từ Thanh Ngọc — tone đỏ rực rỡ, lá monstera bạc sang trọng.",
    description: "Kệ hoa sự kiện tone đỏ rực với spray roses, cúc đỏ hồng, lá monstera bạc độc đáo. Thiết kế ấn tượng cho lễ kỷ niệm, sự kiện doanh nghiệp. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa sự kiện", "hoa khai trương đỏ", "kệ hoa đỏ rực", "hoa sự kiện doanh nghiệp", "kệ hoa kỷ niệm tphcm"],
    galleryImgs: ["img3454-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-trang-xanh-thanh-nha",
    name: "Kệ Hoa Khai Trương Trắng Xanh Thanh Nhã",
    category: "khai-truong",
    _img: "img3455.webp",
    short: "Kệ hoa khai trương trắng xanh thanh nhã từ Thanh Ngọc — 2 tầng tinh khôi, nơ voan trắng.",
    description: "Kệ hoa khai trương 2 tầng kết từ hoa hồng trắng, eustoma xanh lá nhạt, baby's breath, nơ voan trắng thanh nhã. Phù hợp khai trương phòng khám, trung tâm giáo dục, văn phòng. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương trắng", "hoa khai trương thanh nhã", "kệ hoa trắng xanh", "hoa khai trương tphcm", "kệ hoa đứng 2 tầng"],
    galleryImgs: ["img3455-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hong-kem-tuoi-sang",
    name: "Kệ Hoa Khai Trương Hồng Kem Tươi Sáng",
    category: "khai-truong",
    _img: "img3470.webp",
    short: "Kệ hoa khai trương hồng kem tươi sáng từ Thanh Ngọc — 2 tầng rực rỡ, nơ hồng dịu dàng.",
    description: "Kệ hoa khai trương 2 tầng kết từ hoa hồng kem, hồng nhạt và snapdragon vàng tươi, nơ hồng nổi bật. Phù hợp khai trương cửa hàng, nhà hàng, spa. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng kem", "hoa khai trương 2 tầng", "kệ hoa đứng tphcm", "hoa chúc mừng khai trương", "kệ hoa tươi sáng"],
    galleryImgs: ["img3470-1.webp"],
  },
  {
    slug: "bo-hoa-hong-cam-quyen-ru",
    name: "Bó Hoa Hồng Cam Quyến Rũ",
    category: "bo-hoa",
    _img: "img3474.webp",
    short: "Bó hoa hồng cam quyến rũ từ Thanh Ngọc — spray roses cam tươi, giấy gói xếp tầng độc đáo.",
    description: "Bó hoa spray roses hồng cam quyến rũ, kết thủ công với giấy gói hồng xếp tầng thời thượng. Thiết kế hiện đại, phù hợp sinh nhật, kỷ niệm, tặng bạn gái. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa hồng cam", "spray roses cam", "bó hoa sinh nhật đẹp", "hoa tặng bạn gái", "bó hoa độc đáo tphcm"],
    galleryImgs: ["img3474-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-lan-ho-diep-kem-sang-trong",
    name: "Kệ Hoa Khai Trương Lan Hồ Điệp Kem Sang Trọng",
    category: "khai-truong",
    badge: "Nổi bật",
    _img: "img3475.webp",
    short: "Kệ hoa khai trương lan hồ điệp kem sang trọng từ Thanh Ngọc — lan trắng + hồng kem, đẳng cấp.",
    description: "Kệ hoa khai trương 2 tầng kết từ lan hồ điệp trắng cao cấp, hoa hồng kem và baby's breath, nơ hồng vàng đồng. Lựa chọn đẳng cấp cho khai trương văn phòng, showroom, spa cao cấp. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương lan hồ điệp", "hoa khai trương sang trọng", "kệ hoa cao cấp tphcm", "hoa khai trương đẳng cấp", "kệ lan hồ điệp khai trương"],
    galleryImgs: ["img3475-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hong-ruc-ro",
    name: "Kệ Hoa Khai Trương Hồng Rực Rỡ",
    category: "khai-truong",
    _img: "img3482.webp",
    short: "Kệ hoa khai trương hồng rực rỡ từ Thanh Ngọc — 2 tầng hoa hồng đậm, phù hợp mọi ngành.",
    description: "Kệ hoa khai trương 2 tầng với hoa hồng fuchsia đậm, hồng nhạt và cúc trắng xen kẽ. Tone hồng nồng nàn, tươi tắn — phù hợp khai trương cửa hàng thời trang, làm đẹp, ẩm thực. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng", "hoa khai trương rực rỡ", "kệ hoa đứng hồng", "hoa chúc mừng khai trương tphcm", "kệ hoa 2 tầng hồng"],
    galleryImgs: ["img3482-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-vang-cam-hop-phong-thuy",
    name: "Kệ Hoa Khai Trương Vàng Cam Hợp Phong Thủy",
    category: "khai-truong",
    badge: "Bán chạy",
    _img: "img3487.webp",
    short: "Kệ hoa khai trương vàng cam hợp phong thủy từ Thanh Ngọc — heliconia, cúc vàng, lá monstera bạc.",
    description: "Kệ hoa khai trương 2 tầng tone vàng cam hợp phong thủy: heliconia đỏ vàng, hoa hồng vàng, cúc cam, lá monstera bạc độc đáo. Mang lời chúc phát tài phát lộc. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương vàng cam", "hoa khai trương hợp phong thủy", "kệ hoa vàng", "hoa khai trương phát tài", "kệ hoa khai trương đẹp tphcm"],
    galleryImgs: ["img3487-1.webp"],
  },

  // ── KỆ HOA - SERIES IMG37XX (MỚI NHẤT) ──────────────────────────
  {
    slug: "ke-hoa-su-kien-cuc-dong-tien-thac-do",
    name: "Kệ Hoa Sự Kiện Cúc Đồng Tiền Thác Đổ",
    category: "khai-truong",
    badge: "Nổi bật",
    _img: "img3742.webp",
    short: "Kệ hoa sự kiện cúc đồng tiền thác đổ từ Thanh Ngọc — cúc vàng đỏ cam, bố cục thác đổ ấn tượng.",
    description: "Kệ hoa sự kiện thiết kế thác đổ độc đáo: cúc đồng tiền vàng, đỏ, cam và lan vàng rực rỡ. Phù hợp đặt sảnh khách sạn, hội trường sự kiện lớn. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa sự kiện", "hoa sự kiện thác đổ", "kệ hoa cúc đồng tiền", "hoa khai trương khách sạn", "kệ hoa lớn tphcm"],
    galleryImgs: ["img3742-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-cuc-do-vang-nong-nan",
    name: "Kệ Hoa Khai Trương Cúc Đỏ Vàng Nồng Nàn",
    category: "khai-truong",
    _img: "img3743.webp",
    short: "Kệ hoa khai trương cúc đỏ vàng nồng nàn từ Thanh Ngọc — 2 tầng rực rỡ, hợp phong thủy.",
    description: "Kệ hoa khai trương 2 tầng: cúc đồng tiền đỏ, vàng, celosia đỏ trên nền lá cọ xanh. Tone màu nồng nàn hợp phong thủy, mang lời chúc thịnh vượng. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương cúc đỏ vàng", "hoa khai trương hợp phong thủy", "kệ hoa 2 tầng đỏ vàng", "hoa chúc mừng khai trương tphcm"],
    galleryImgs: ["img3743-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-trang-xanh-tuoi-mat",
    name: "Kệ Hoa Khai Trương Trắng Xanh Tươi Mát",
    category: "khai-truong",
    _img: "img3745.webp",
    short: "Kệ hoa khai trương trắng xanh tươi mát từ Thanh Ngọc — cúc xanh lá độc đáo, tinh khôi.",
    description: "Kệ hoa khai trương 2 tầng với cúc xanh lá độc đáo kết hợp hoa trắng tinh khôi. Thiết kế tươi mát, sang trọng — phù hợp khai trương phòng khám, spa, văn phòng. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương trắng xanh", "hoa khai trương tươi mát", "kệ hoa cúc xanh", "hoa khai trương đẹp tphcm", "kệ hoa đứng trắng"],
    galleryImgs: ["img3745-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-cuc-dong-tien-do-vang-ruc-ro",
    name: "Kệ Hoa Khai Trương Cúc Đồng Tiền Đỏ Vàng Rực Rỡ",
    category: "khai-truong",
    _img: "img3748.webp",
    short: "Kệ hoa khai trương cúc đồng tiền đỏ vàng rực rỡ từ Thanh Ngọc — 2 tầng nổi bật, nơ cam.",
    description: "Kệ hoa khai trương 2 tầng: cúc đồng tiền vàng, đỏ, hoa hồng đỏ, lá cọ xanh tươi tắn, nơ cam rực rỡ. Hợp phong thủy, mang lời chúc phát tài. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương cúc đồng tiền", "hoa khai trương đỏ vàng", "kệ hoa rực rỡ", "hoa chúc mừng khai trương tphcm"],
    galleryImgs: ["img3748-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-lily-vang-tuoi-vui",
    name: "Kệ Hoa Khai Trương Lily Vàng Tươi Vui",
    category: "khai-truong",
    _img: "img3749.webp",
    short: "Kệ hoa khai trương lily vàng tươi vui từ Thanh Ngọc — lily vàng + cúc đồng tiền, ấm áp.",
    description: "Kệ hoa khai trương 2 tầng nổi bật với hoa lily vàng, cúc đồng tiền vàng cam tươi vui. Thiết kế ấm áp, phong phú — phù hợp khai trương nhà hàng, quán café, cửa hàng. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương lily vàng", "hoa khai trương lily", "kệ hoa cúc đồng tiền vàng", "hoa chúc mừng khai trương tphcm"],
    galleryImgs: ["img3749-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-cuc-mix-do-vang-cam",
    name: "Kệ Hoa Khai Trương Cúc Mix Đỏ Vàng Cam",
    category: "khai-truong",
    _img: "img3750.webp",
    short: "Kệ hoa khai trương cúc mix đỏ vàng cam từ Thanh Ngọc — 2 tầng rực rỡ, hoa hồng cam điểm nhấn.",
    description: "Kệ hoa khai trương 2 tầng kết từ cúc đồng tiền đỏ, vàng, cam và hoa hồng cam điểm nhấn, lá cọ xanh tươi. Màu sắc rực rỡ hợp phong thủy. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương cúc mix", "hoa khai trương đỏ vàng cam", "kệ hoa 2 tầng", "hoa chúc khai trương tphcm"],
    galleryImgs: ["img3750-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-lily-vang-cam-sang-trong",
    name: "Kệ Hoa Khai Trương Lily Vàng Cam Sang Trọng",
    category: "khai-truong",
    _img: "img3752.webp",
    short: "Kệ hoa khai trương lily vàng cam sang trọng từ Thanh Ngọc — lily vàng + cúc đỏ + snapdragon.",
    description: "Kệ hoa khai trương 2 tầng sang trọng: lily vàng tươi, cúc đồng tiền đỏ, snapdragon vàng, nơ vàng rực. Kết hợp hài hòa hợp phong thủy. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương lily sang trọng", "hoa khai trương lily vàng", "kệ hoa vàng cam khai trương", "hoa sự kiện tphcm"],
    galleryImgs: ["img3752-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-vang-hop-phong-thuy",
    name: "Kệ Hoa Khai Trương Hoa Hồng Vàng Hợp Phong Thủy",
    category: "khai-truong",
    _img: "img3753.webp",
    short: "Kệ hoa khai trương hoa hồng vàng hợp phong thủy từ Thanh Ngọc — tròn đầy, giấy gói vàng rực.",
    description: "Kệ hoa khai trương 1 tầng tròn đầy kết từ hoa hồng vàng, cúc cam đỏ, giấy gói vàng rực. Tone màu vàng đại cát hợp phong thủy, mang lời chúc phát tài. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hoa hồng vàng", "hoa khai trương hợp phong thủy", "kệ hoa vàng khai trương", "hoa chúc khai trương phát tài tphcm"],
    galleryImgs: ["img3753-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-thien-dieu-lan-trang",
    name: "Kệ Hoa Khai Trương Thiên Điểu Lan Trắng",
    category: "khai-truong",
    badge: "Nổi bật",
    _img: "img3754.webp",
    short: "Kệ hoa khai trương thiên điểu lan trắng từ Thanh Ngọc — thiên điểu + lan trắng + cúc đỏ vàng.",
    description: "Kệ hoa khai trương 2 tầng đẳng cấp: hoa thiên điểu (bird of paradise) kết hợp lan hồ điệp trắng, cúc đồng tiền đỏ vàng, nơ vàng. Thiết kế độc đáo, phù hợp showroom, văn phòng lớn. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương thiên điểu", "hoa khai trương sang trọng", "kệ hoa lan trắng thiên điểu", "kệ hoa đẳng cấp tphcm"],
    galleryImgs: ["img3754-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-huong-duong-vang-tuoi",
    name: "Kệ Hoa Khai Trương Hướng Dương Vàng Tươi",
    category: "khai-truong",
    _img: "img3755.webp",
    short: "Kệ hoa khai trương hướng dương vàng tươi từ Thanh Ngọc — hướng dương + hoa hồng vàng, nơ vàng.",
    description: "Kệ hoa khai trương 1 tầng với hoa hướng dương nhỏ, hoa hồng vàng, cúc đỏ, lá cọ xanh và nơ vàng tươi. Biểu tượng cho sự thịnh vượng và niềm vui. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hướng dương", "hoa khai trương hướng dương", "kệ hoa vàng khai trương", "hoa chúc khai trương tphcm"],
    galleryImgs: ["img3755-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-do-kem-nong-nan",
    name: "Kệ Hoa Khai Trương Hoa Hồng Đỏ Kem Nồng Nàn",
    category: "khai-truong",
    _img: "img3756.webp",
    short: "Kệ hoa khai trương hoa hồng đỏ kem nồng nàn từ Thanh Ngọc — 2 tầng hồng đỏ + kem, voan trắng.",
    description: "Kệ hoa khai trương 2 tầng kết từ hoa hồng đỏ đậm và hồng kem nhạt, giấy gói voan trắng tinh tế. Nồng nàn và sang trọng — phù hợp khai trương spa, nhà hàng cao cấp. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng đỏ kem", "hoa khai trương hồng đỏ", "kệ hoa 2 tầng hồng", "hoa chúc khai trương đẹp tphcm"],
    galleryImgs: ["img3756-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-cuc-tim-hong-noi-bat",
    name: "Kệ Hoa Khai Trương Cúc Tím Hồng Nổi Bật",
    category: "khai-truong",
    _img: "img3757.webp",
    short: "Kệ hoa khai trương cúc tím hồng nổi bật từ Thanh Ngọc — cúc tròn tím fuchsia + hồng kem độc đáo.",
    description: "Kệ hoa khai trương 2 tầng độc đáo: cúc tròn tím fuchsia đậm kết hợp spray roses hồng kem nhạt, giấy hồng tinh tế. Màu sắc nổi bật, ấn tượng — phù hợp khai trương cửa hàng thời trang. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương cúc tím", "hoa khai trương tím hồng", "kệ hoa nổi bật", "hoa chúc khai trương độc đáo tphcm"],
    galleryImgs: ["img3757-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-do-cam-mix",
    name: "Kệ Hoa Khai Trương Hoa Hồng Đỏ Cam Mix",
    category: "khai-truong",
    _img: "img3758.webp",
    short: "Kệ hoa khai trương hoa hồng đỏ cam mix từ Thanh Ngọc — 2 tầng đa sắc, nơ voan hồng trắng.",
    description: "Kệ hoa khai trương 2 tầng phong phú: hoa hồng đỏ, cam, vàng kem mix hài hòa, nơ voan hồng trắng thanh lịch. Màu sắc đa dạng, phù hợp mọi ngành nghề khai trương. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng đỏ cam", "hoa khai trương đa sắc", "kệ hoa 2 tầng mix màu", "hoa chúc khai trương tphcm"],
    galleryImgs: ["img3758-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-do-trang-nong-nan",
    name: "Kệ Hoa Khai Trương Hoa Hồng Đỏ Trắng Nồng Nàn",
    category: "khai-truong",
    _img: "img3759.webp",
    short: "Kệ hoa khai trương hoa hồng đỏ trắng nồng nàn từ Thanh Ngọc — hồng đỏ + trắng, giấy gói hồng.",
    description: "Kệ hoa khai trương 1 tầng: hoa hồng đỏ đậm kết hợp hoa hồng trắng, cúc hồng nhỏ, giấy gói hồng xếp tầng ấn tượng. Nồng nàn và sang trọng. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng đỏ trắng", "hoa khai trương nồng nàn", "kệ hoa hồng đỏ trắng", "hoa chúc khai trương tphcm"],
    galleryImgs: ["img3759-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-do-kem-sang-trong",
    name: "Kệ Hoa Khai Trương Hoa Hồng Đỏ Kem Sang Trọng",
    category: "khai-truong",
    _img: "img3760.webp",
    short: "Kệ hoa khai trương hoa hồng đỏ kem sang trọng từ Thanh Ngọc — 2 tầng tròn đầy, giấy hồng nhạt.",
    description: "Kệ hoa khai trương 2 tầng tròn đầy: hoa hồng đỏ đậm mix hồng kem nhạt, giấy gói hồng nhạt thanh lịch. Thiết kế sang trọng, phù hợp khai trương showroom, văn phòng cao cấp. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng đỏ kem", "hoa khai trương sang trọng", "kệ hoa 2 tầng hồng đỏ", "hoa chúc khai trương đẹp tphcm"],
    galleryImgs: ["img3760-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-da-sac-ruc-ro",
    name: "Kệ Hoa Khai Trương Hoa Hồng Đa Sắc Rực Rỡ",
    category: "khai-truong",
    _img: "img3761.webp",
    short: "Kệ hoa khai trương hoa hồng đa sắc rực rỡ từ Thanh Ngọc — hồng cam đỏ kem mix, giấy gói cam.",
    description: "Kệ hoa khai trương 1 tầng rực rỡ: hoa hồng cam, đỏ, kem nhạt mix hài hòa, giấy gói hồng cam vàng nổi bật. Màu sắc đa dạng, thu hút ánh nhìn. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng đa sắc", "hoa khai trương rực rỡ", "kệ hoa 1 tầng hồng cam", "hoa chúc mừng khai trương tphcm"],
    galleryImgs: ["img3761-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hong-cam-ngot-diu",
    name: "Kệ Hoa Khai Trương Hồng Cam Ngọt Dịu",
    category: "khai-truong",
    _img: "img3762.webp",
    short: "Kệ hoa khai trương hồng cam ngọt dịu từ Thanh Ngọc — hồng cam + cúc tròn hồng, 2 tầng duyên dáng.",
    description: "Kệ hoa khai trương 2 tầng ngọt dịu: hoa hồng hồng, cam nhạt và cúc tròn hồng fuchsia, giấy hồng nhạt. Thiết kế duyên dáng, phù hợp khai trương spa, thẩm mỹ, cửa hàng phụ kiện. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng cam", "hoa khai trương ngọt dịu", "kệ hoa duyên dáng", "hoa chúc khai trương tphcm"],
    galleryImgs: ["img3762-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-cam-do-nang-dong",
    name: "Kệ Hoa Khai Trương Hoa Hồng Cam Đỏ Năng Động",
    category: "khai-truong",
    _img: "img3763.webp",
    short: "Kệ hoa khai trương hoa hồng cam đỏ năng động từ Thanh Ngọc — hồng cam + giấy đỏ nổi bật.",
    description: "Kệ hoa khai trương 2 tầng năng động: hoa hồng cam nhạt và spray roses hồng nhỏ, giấy gói đỏ nổi bật. Thiết kế trẻ trung, phù hợp khai trương quán café, cửa hàng thời trang, trung tâm thể thao. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng cam đỏ", "hoa khai trương năng động", "kệ hoa đỏ khai trương", "hoa chúc khai trương tươi tắn tphcm"],
    galleryImgs: ["img3763-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-cam-kem-tao-nha",
    name: "Kệ Hoa Khai Trương Hoa Hồng Cam Kem Tao Nhã",
    category: "khai-truong",
    _img: "img3764.webp",
    short: "Kệ hoa khai trương hoa hồng cam kem tao nhã từ Thanh Ngọc — orange roses + hồng kem, giấy kem nhiều tầng.",
    description: "Kệ hoa khai trương 1 tầng tao nhã: hoa hồng cam đậm và hồng kem nhạt, giấy gói kem nhiều tầng xếp tinh tế. Phong cách hiện đại, phù hợp khai trương spa cao cấp, phòng khám thẩm mỹ. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng cam kem", "hoa khai trương tao nhã", "kệ hoa kem tao nhã", "hoa chúc khai trương sang trọng tphcm"],
    galleryImgs: ["img3764-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-trang-diu-dang",
    name: "Kệ Hoa Khai Trương Hoa Hồng Trắng Dịu Dàng",
    category: "khai-truong",
    _img: "img3765.webp",
    short: "Kệ hoa khai trương hoa hồng trắng dịu dàng từ Thanh Ngọc — hồng trắng + cúc hồng nhỏ, giấy hồng.",
    description: "Kệ hoa khai trương 1 tầng dịu dàng: hoa hồng trắng, cúc đồng tiền hồng nhỏ và lá xanh tươi, giấy hồng thanh lịch. Thiết kế nhẹ nhàng, phù hợp khai trương phòng khám, thẩm mỹ viện, spa. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng trắng", "hoa khai trương dịu dàng", "kệ hoa trắng hồng", "hoa chúc khai trương nhẹ nhàng tphcm"],
    galleryImgs: ["img3765-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-hoa-hong-do-peach-tinh-te",
    name: "Kệ Hoa Khai Trương Hoa Hồng Đỏ Peach Tinh Tế",
    category: "khai-truong",
    _img: "img3766.webp",
    short: "Kệ hoa khai trương hoa hồng đỏ peach tinh tế từ Thanh Ngọc — 2 tầng hồng đỏ + peach, giấy xanh nhạt.",
    description: "Kệ hoa khai trương 2 tầng tinh tế: hoa hồng đỏ đậm kết hợp hồng peach/đào nhạt, giấy gói xanh nhạt hồng độc đáo. Thiết kế tinh tế, sang trọng cho khai trương cao cấp. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương hồng đỏ peach", "hoa khai trương tinh tế", "kệ hoa 2 tầng đỏ kem", "hoa chúc khai trương sang trọng tphcm"],
    galleryImgs: ["img3766-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-do-hong-vang-tuoi-tan",
    name: "Kệ Hoa Khai Trương Đỏ Hồng Vàng Tươi Tắn",
    category: "khai-truong",
    _img: "img3767.webp",
    short: "Kệ hoa khai trương đỏ hồng vàng tươi tắn từ Thanh Ngọc — 2 tầng đỏ hồng + snapdragon vàng.",
    description: "Kệ hoa khai trương 2 tầng tươi tắn: hoa hồng đỏ, hồng nhạt, cúc đồng tiền vàng và snapdragon vàng rực, lá cọ xanh. Màu sắc phong phú hợp phong thủy. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương đỏ hồng vàng", "hoa khai trương tươi tắn", "kệ hoa 2 tầng đa sắc", "hoa chúc khai trương rực rỡ tphcm"],
    galleryImgs: ["img3767-1.webp"],
  },
  {
    slug: "ke-hoa-khai-truong-cuc-vang-cam-lan-trang",
    name: "Kệ Hoa Khai Trương Cúc Vàng Cam Lan Trắng",
    category: "khai-truong",
    _img: "img3768.webp",
    short: "Kệ hoa khai trương cúc vàng cam lan trắng từ Thanh Ngọc — cúc vàng cam + lan trắng + lá monstera.",
    description: "Kệ hoa khai trương 2 tầng đặc biệt: cúc mặt trời vàng, cúc đồng tiền cam đỏ, lan hồ điệp trắng, hoa anthurium đỏ, lá monstera xanh. Thiết kế phong phú, đẳng cấp. Giao và lắp đặt miễn phí nội thành TP.HCM.",
    keywords: ["kệ hoa khai trương cúc vàng cam", "hoa khai trương lan trắng", "kệ hoa đặc biệt khai trương", "hoa chúc khai trương đẳng cấp tphcm"],
    galleryImgs: ["img3768-1.webp"],
  },

  // ── BÓ HOA - ĐƠN LẺ ─────────────────────────────────────────────
  {
    slug: "bo-hoa-mix-thanh-lich",
    name: "Bó Hoa Mix Thanh Lịch",
    category: "bo-hoa",
    _img: "hoa3.webp",
    short: "Bó hoa mix thanh lịch từ Thanh Ngọc — thiết kế tinh tế, thích hợp tặng dịp trang trọng.",
    description: "Bó hoa mix thanh lịch với thiết kế tinh tế, phù hợp tặng trong dịp trang trọng như sinh nhật, kỷ niệm. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa thanh lịch", "hoa mix tinh tế", "bó hoa trang trọng", "hoa tặng sinh nhật tphcm"],
    galleryImgs: ["hoa3-1.webp"],
  },
  {
    slug: "bo-hoa-hong-nhe-nhang",
    name: "Bó Hoa Hồng Nhẹ Nhàng",
    category: "bo-hoa",
    _img: "hoa2.jpg",
    short: "Bó hoa hồng nhẹ nhàng từ Thanh Ngọc — dịu dàng và dễ thương, tặng mọi dịp yêu thương.",
    description: "Bó hoa hồng nhẹ nhàng, dịu dàng với thiết kế tươi sáng. Phù hợp tặng sinh nhật, 8/3 hoặc dịp cảm ơn. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa hồng nhẹ nhàng", "hoa dịu dàng", "bó hoa 8/3", "hoa tươi tphcm"],
    galleryImgs: [],
  },
  {
    slug: "bo-hoa-sac-mau-mua-he",
    name: "Bó Hoa Sắc Màu Mùa Hè",
    category: "bo-hoa",
    _img: "hoa4.jpg",
    short: "Bó hoa sắc màu mùa hè từ Thanh Ngọc — rực rỡ và tươi sáng như nắng hè, tặng ngày vui.",
    description: "Bó hoa sắc màu rực rỡ như nắng mùa hè, đầy năng lượng và vui tươi. Phù hợp tặng sinh nhật, tốt nghiệp hoặc dịp chúc mừng. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa mùa hè", "hoa rực rỡ", "bó hoa chúc mừng", "hoa tươi sáng tphcm"],
    galleryImgs: [],
  },
  {
    slug: "bo-hoa-mix-co-dien",
    name: "Bó Hoa Mix Cổ Điển",
    category: "bo-hoa",
    _img: "hoa5.jpg",
    short: "Bó hoa mix cổ điển từ Thanh Ngọc — thiết kế kinh điển, sang trọng và không bao giờ lỗi mốt.",
    description: "Bó hoa mix cổ điển với thiết kế kinh điển, không bao giờ lỗi mốt. Phù hợp tặng mọi dịp từ sinh nhật, kỷ niệm đến biếu tặng. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa cổ điển", "hoa kinh điển", "bó hoa sang trọng tphcm", "hoa mix đẹp"],
    galleryImgs: [],
  },


  // ── THÊM 5/5/2026 ────────────────────────────────────────────
  {
    slug: "gio-hoa-hong-kem-dep",
    name: "Giỏ Hoa Hồng Kem Đẹp",
    category: "gio-hoa",
    badge: "Bán chạy",
    _img: "gio-hoa-hong-kem-dep.jpg",
    short: "Thanh Ngọc - Giỏ hoa hồng kem tinh tế, dịp sinh nhật.",
    description: "Giỏ hoa gồm hồng kem, hồng phơn phớt, lan hồ điệp trắng và baby's breath. Thiết kế trong giỏ mây đan, ruy băng hồng. Phù hợp dịp sinh nhật, tặng sếp. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa tươi tphcm","giỏ hoa sinh nhật","hoa hồng kem","hoa tươi thanh ngọc","quà tặng sếp"],
    galleryImgs: [],
  },

  // ── THÊM 5/5/2026 ────────────────────────────────────────────
  {
    slug: "gio-hoa-hong-kem-dep",
    name: "Giỏ Hoa Hồng Kem Đẹp",
    category: "gio-hoa",
    badge: "Bán chạy",
    _img: "gio-hoa-hong-kem-dep.jpg",
    short: "Thanh Ngọc - Giỏ hoa hồng kem tinh tế, phù hợp sinh nhật.",
    description: "Giỏ hoa gồm hồng kem, lan hồ điệp trắng và baby's breath, thiết kế sang trọng. Phù hợp dịp sinh nhật, tặng người đặc biệt. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa tươi tphcm","giỏ hoa hồng kem","hoa sinh nhật","hoa tặng sếp","hoa hồng kem","giỏ hoa thanh ngọc"],
    galleryImgs: [],
  },

  // ── THÊM 5/5/2026 ────────────────────────────────────────────
  {
    slug: "bo-hoa-tuoi-mau-sac",
    name: "Bó Hoa Tươi Màu Sắc",
    category: "gio-hoa",
    badge: "Nổi bật",
    _img: "bo-hoa-tuoi-mau-sac.jpg",
    short: "Hoa Tươi Thanh Ngọc: Sáng với hồng, vàng, cam, phù hợp tặng quà.",
    description: "Sản phẩm này là một giỏ hoa tươi đa màu sắc, bao gồm các loại hoa như cẩm chướng, hồng, cúc, và các loại hoa nhỏ khác. Màu sắc nổi bật gồm hồng, vàng và cam. Thiết kế trong hộp gỗ giúp tăng thêm sự sang trọng và phù hợp để tặng quà hoặc trang trí. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa tươi thanh ngọc","giỏ hoa tươi","hoa màu sắc","tphcm","hoa hộp gỗ","quà tặng hoa"],
    galleryImgs: [],
  },

  // ── THÊM 5/5/2026 ────────────────────────────────────────────
  {
    slug: "bo-hoa-tuoi-da-mau",
    name: "Bó Hoa Tươi Đa Màu",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "bo-hoa-tuoi-da-mau.png",
    short: "Thanh Ngọc - Bó hoa đa màu sắc, tươi sáng, phù hợp dịp lễ, sinh nhật.",
    description: "Bó hoa tươi đa màu sắc từ các loại hoa như cẩm chướng, hướng dương, hoa cúc, được thiết kế trong hộp gỗ sang trọng. Màu sắc nổi bật gồm vàng, hồng, cam, tím. Phù hợp cho các dịp lễ, sinh nhật, tặng người thân. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa tươi thanh ngọc","hoa hộp gỗ","hoa đa màu","tphcm","hoa tươi đẹp","hoa lễ"],
    galleryImgs: ["bo-hoa-tuoi-da-mau-chinh-dien.jpg","bo-hoa-tuoi-da-mau-anh-sang.jpg"],
  },

  // ── THÊM 5/5/2026 ────────────────────────────────────────────
  {
    slug: "bo-hoa-tuoi-mau-sac",
    name: "Bó Hoa Tươi Màu Sắc",
    category: "gio-hoa",
    badge: "Nổi bật",
    _img: "bo-hoa-tuoi-mau-sac.jpg",
    short: "Thanh Ngọc - Bó hoa rực rỡ với hồng, vàng, cam, tím, phù hợp mọi dịp.",
    description: "Bó hoa tươi trong hộp gỗ từ shop Hoa Tươi Thanh Ngọc, với sự kết hợp của nhiều loài hoa như hoa cúc, hoa hồng, hoa hướng dương, tạo nên một tác phẩm nghệ thuật rực rỡ. Màu sắc đa dạng bao gồm hồng, vàng, cam, tím, xanh, mang lại không gian tươi mới và tràn đầy năng lượng. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa tươi thanh ngọc","hoa tươi tphcm","bó hoa màu sắc","hoa hộp gỗ","hoa tươi đẹp"],
    galleryImgs: [],
  },

  // ── THÊM 5/5/2026 ────────────────────────────────────────────
  {
    slug: "bo-hoa-mau-sac-ruc-ro",
    name: "Bó Hoa Màu Sắc Rực Rỡ",
    category: "gio-hoa",
    badge: "Nổi bật",
    _img: "bo-hoa-mau-sac-ruc-ro.png",
    short: "Thanh Ngọc - Bó hoa rực rỡ với hồng, vàng, cam, tím, trắng, phù hợp khai trương, tặng quà.",
    description: "Bó hoa này gồm nhiều loại hoa như hoa cúc, hoa hồng, hoa hướng dương, Protea và hoa chrysanthemum với màu sắc phong phú như hồng, vàng, cam, tím và trắng. Thiết kế trong hộp gỗ giúp tăng thêm sự sang trọng và phù hợp cho các dịp khai trương, tặng quà. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa tuoi thanh ngoc","hoa hop go","bo hoa mau sac","khai truong","qua tang","tphcm"],
    galleryImgs: ["bo-hoa-mau-sac-ruc-ro-chinh-dien.jpg","bo-hoa-mau-sac-ruc-ro-can-canh.jpg","bo-hoa-mau-sac-ruc-ro-tren-cao.jpg","bo-hoa-mau-sac-ruc-ro-anh-sang.jpg"],
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
