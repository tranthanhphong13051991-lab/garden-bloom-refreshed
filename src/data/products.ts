export type Category =
  | "bo-hoa"
  | "gio-hoa"
  | "khai-truong"
  | "chia-buon"
  | "lan-ho-diep"
  | "hoa-lua";

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
  "hoa-lua": [
    { q: "Hoa lụa có bền không?", a: "Hoa lụa cao cấp của Thanh Ngọc bền đẹp nhiều năm, không phai màu nếu tránh ánh nắng trực tiếp và lau nhẹ bằng khăn khô." },
    { q: "Hoa lụa có giống hoa thật không?", a: "Hoa lụa cao cấp được làm chi tiết, chân thực — nhiều khách không phân biệt được với hoa thật khi nhìn từ xa." },
    { q: "Có tư vấn bố trí hoa lụa cho nội thất không?", a: "Có. Nhắn Zalo 0934 926 092 để được tư vấn phối hợp hoa lụa phù hợp với không gian nhà bạn." },
  ],
};

/** 
 * Map slug → URL ảnh production (dùng làm fallback khi ảnh local không tồn tại)
 */
const PROD_IMAGE_MAP: Record<string, string> = {
  "bo-hoa-hong-kem-tinh-te": "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-800.webp",
  "bo-hoa-hong-kem-tinh-te-classic": "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-33-800.webp",
  "bo-hoa-hong-kem-sang-trong": "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-37-800.webp",
  "bo-hoa-hong-kem-mix-trang": "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-41-800.webp",
  "bo-hoa-hong-kem-tron-day": "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-44-800.webp",
  "bo-hoa-hong-tuoi-tham": "https://hoatuoithanhngoc.com/image/responsive/bo-hong-800.webp",
  "bo-hoa-hong-phan-lang-man": "https://hoatuoithanhngoc.com/image/responsive/bo-hong-1-800.webp",
  "bo-hoa-hong-do-nong-nan": "https://hoatuoithanhngoc.com/image/responsive/bo-hong1-800.webp",
  "bo-hoa-tuoi-ngay-vui": "https://hoatuoithanhngoc.com/image/responsive/bo-hoa-800.webp",
  "bo-hoa-mix-pastel-ngot-ngao": "https://hoatuoithanhngoc.com/image/responsive/hoa1-29-800.webp",
  "bo-hoa-mix-trang-tim-diu-dang": "https://hoatuoithanhngoc.com/image/responsive/hoa1-33-800.webp",
  "bo-hoa-mix-tong-am-ruc-ro": "https://hoatuoithanhngoc.com/image/responsive/hoa1-38-800.webp",
  "bo-hoa-mix-sac-mat-tuoi-sang": "https://hoatuoithanhngoc.com/image/responsive/hoa1-43-800.webp",
  "bo-hoa-hong-cam-quyen-ru": "https://hoatuoithanhngoc.com/image/responsive/img3474-800.webp",
  "gio-hoa-trang-xanh-thanh-nha": "https://hoatuoithanhngoc.com/image/responsive/gio-hoa-trang-xanh-thanh-nha-800.webp",
  "ke-hoa-khai-truong-thinh-vuong": "https://hoatuoithanhngoc.com/image/responsive/hoa-khai-truong-thinh-vuong-800.webp",
  "ke-hoa-khai-truong-hong-pastel-duyen-dang": "https://hoatuoithanhngoc.com/image/responsive/img3449-800.webp",
  "ke-hoa-khai-truong-vang-cam-hop-phong-thuy": "https://hoatuoithanhngoc.com/image/responsive/img3487-800.webp",
  "ke-hoa-khai-truong-lan-ho-diep-kem-sang-trong": "https://hoatuoithanhngoc.com/image/responsive/img3475-800.webp",
  "lang-hoa-chia-buon-lys-bach-hop": "https://hoatuoithanhngoc.com/image/responsive/hoa-chia-buon-ly-bach-hop-800.webp",
  "chau-lan-ho-diep-trang-quy-phai": "https://hoatuoithanhngoc.com/image/responsive/lan-ho-diep-trang-quy-phai-800.webp",
  "ke-hoa-khai-truong-cuc-dong-tien-thac-do": "https://hoatuoithanhngoc.com/image/responsive/img3742-800.webp",
  "ke-hoa-khai-truong-thien-dieu-lan-trang": "https://hoatuoithanhngoc.com/image/responsive/img3754-800.webp",
  "bo-hoa-mix-thanh-lich": "https://hoatuoithanhngoc.com/image/responsive/hoa3-800.webp",
  "bo-hoa-hong-nhe-nhang": "https://hoatuoithanhngoc.com/image/responsive/hoa2-800.webp",
};

const img = (slug: string, _size: 400 | 800 = 800) => {
  // Ưu tiên URL production từ map (vì ảnh local chưa có)
  if (PROD_IMAGE_MAP[slug]) return PROD_IMAGE_MAP[slug];
  if (slug.includes(".")) return `/images/${slug}`;
  return `/images/${slug}.webp`;
};

export const CATEGORIES: { id: Category; label: string; description: string }[] = [
  { id: "bo-hoa", label: "Bó Hoa", description: "Bó hoa tươi cho mọi dịp: sinh nhật, tình yêu, tốt nghiệp" },
  { id: "gio-hoa", label: "Giỏ Hoa", description: "Giỏ hoa thanh lịch, sang trọng cho dịp đặc biệt" },
  { id: "khai-truong", label: "Khai Trương", description: "Kệ hoa khai trương, chúc mừng sự kiện, sảnh lớn" },
  { id: "chia-buon", label: "Chia Buồn", description: "Hoa chia buồn trang trọng, lời tiễn biệt chân thành" },
  { id: "lan-ho-diep", label: "Lan Hồ Điệp", description: "Lan hồ điệp quý phái, biếu tặng cao cấp" },
  { id: "hoa-lua", label: "Hoa Lụa", description: "Hoa lụa cao cấp, bền đẹp, trang trí nội thất" },
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
  // ===== Bó Hoa =====
  {
    slug: "bo-hoa-hong-kem-tinh-te",
    name: "Bó Hoa Hồng Kem Tinh Tế",
    category: "bo-hoa",
    _img: "bo-hoa-hong-kem-tinh-te",
    short: "Bó hoa hồng kem tinh tế từ Thanh Ngọc — lựa chọn hoàn hảo cho những tình cảm nhẹ nhàng, sâu lắng.",
    description: "Bó hoa hồng kem được phối hợp tinh tế với các loại hoa phụ màu pastel, bọc trong giấy cao cấp. Tone màu kem chủ đạo tượng trưng cho sự dịu dàng, ấm áp. Phù hợp tặng sinh nhật, kỷ niệm, tỏ tình. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng kem", "bó hoa tinh tế", "hoa tươi bình thạnh", "hoa sinh nhật tphcm", "hoa tặng bạn gái"],
    badge: "Bán chạy",
  },
  {
    slug: "bo-hoa-hong-kem-tinh-te-classic",
    name: "Bó Hoa Hồng Kem Tinh Tế Classic",
    category: "bo-hoa",
    _img: "bo-hoa-hong-kem-tinh-te-classic",
    short: "Phiên bản classic của bó hồng kem — thanh lịch và sang trọng hơn với phối màu tinh tế.",
    description: "Bó hoa hồng kem classic được thiết kế với bố cục tròn đều, kết hợp hoa hồng kem và baby breath trắng. Phong cách cổ điển, trang nhã. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng kem classic", "bó hoa cổ điển", "hoa tươi tphcm", "hoa sinh nhật", "hoa tặng sếp"],
    badge: "Nổi bật",
  },
  {
    slug: "bo-hoa-hong-kem-sang-trong",
    name: "Bó Hoa Hồng Kem Sang Trọng",
    category: "bo-hoa",
    _img: "bo-hoa-hong-kem-sang-trong",
    short: "Bó hồng kem sang trọng — món quà đẳng cấp dành cho những dịp đặc biệt.",
    description: "Bó hoa hồng kem kích thước lớn, được phối hợp với hoa lily và eustoma trắng tạo điểm nhấn. Giấy gói cao cấp 3 lớp, phù hợp các dịp quan trọng như kỷ niệm, lễ tốt nghiệp, sinh nhật. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng kem sang trọng", "bó hoa cao cấp", "hoa tươi bình thạnh", "hoa kỷ niệm tphcm"],
  },
  {
    slug: "bo-hoa-hong-kem-mix-trang",
    name: "Bó Hoa Hồng Kem Mix Trắng",
    category: "bo-hoa",
    _img: "bo-hoa-hong-kem-mix-trang",
    short: "Bó hoa hồng kem mix hoa trắng — sự kết hợp hoàn hảo giữa tone kem ấm và trắng tinh khôi.",
    description: "Bó hoa phối giữa hồng kem và các loại hoa trắng như cúc trắng, thạch thảo, baby. Tone màu nhẹ nhàng, thanh lịch, phù hợp tặng mẹ, chị em gái hoặc đồng nghiệp. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng kem mix trắng", "bó hoa thanh lịch", "hoa tươi tphcm", "hoa tặng mẹ"],
    badge: "Bán chạy",
  },
  {
    slug: "bo-hoa-hong-kem-tron-day",
    name: "Bó Hoa Hồng Kem Tròn Đầy",
    category: "bo-hoa",
    _img: "bo-hoa-hong-kem-tron-day",
    short: "Bó hồng kem tròn đầy — viên mãn và trọn vẹn như tình cảm bạn muốn gửi trao.",
    description: "Bó hoa thiết kế dạng tròn đều, sử dụng hoa hồng kem chất lượng cao. Mỗi bông hoa đều được chọn lọc kỹ lưỡng, tạo nên tổng thể hài hoà, đầy đặn. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa tròn đầy", "hoa hồng kem", "hoa tươi bình thạnh", "hoa sinh nhật", "hoa tặng người yêu"],
  },
  {
    slug: "bo-hoa-hong-tuoi-tham",
    name: "Bó Hoa Hồng Tươi Thắm",
    category: "bo-hoa",
    _img: "bo-hoa-hong-tuoi-tham",
    short: "Bó hoa hồng đỏ tươi thắm — lời yêu thương cháy bỏng từ Thanh Ngọc.",
    description: "Bó hoa hồng đỏ tươi thắm với 24 bông hồng đỏ rực rỡ, tượng trưng cho tình yêu mãnh liệt. Phù hợp Valentine, kỷ niệm ngày cưới, tỏ tình. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng đỏ", "bó hoa tươi thắm", "hoa tình yêu", "hoa valentine tphcm", "hoa tươi bình thạnh"],
    badge: "Bán chạy",
  },
  {
    slug: "bo-hoa-hong-phan-lang-man",
    name: "Bó Hoa Hồng Phấn Lãng Mạn",
    category: "bo-hoa",
    _img: "bo-hoa-hong-phan-lang-man",
    short: "Bó hồng phấn lãng mạn — dịu dàng và ngọt ngào như tình đầu.",
    description: "Bó hoa hồng phấn phối với eustoma trắng và baby, tông màu pastel ngọt ngào. Thích hợp tặng bạn gái trong những ngày kỷ niệm, sinh nhật. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng phấn", "bó hoa lãng mạn", "hoa tươi tphcm", "hoa sinh nhật bạn gái", "hoa tặng người yêu"],
  },
  {
    slug: "bo-hoa-hong-do-nong-nan",
    name: "Bó Hoa Hồng Đỏ Nồng Nàn",
    category: "bo-hoa",
    _img: "bo-hoa-hong-do-nong-nan",
    short: "Bó hồng đỏ nồng nàn — trao gửi yêu thương chân thành nhất.",
    description: "Bó hoa hồng đỏ bó tròn với hoa hồng đỏ nhập khẩu, kết hợp lá xanh trang trí. Thiết kế sang trọng, phù hợp các dịp lãng mạn. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng đỏ nồng nàn", "bó hoa tình yêu", "hoa tươi bình thạnh", "hoa valentine", "hoa tặng người thương"],
  },
  {
    slug: "bo-hoa-tuoi-ngay-vui",
    name: "Bó Hoa Tươi Ngày Vui",
    category: "bo-hoa",
    _img: "bo-hoa-tuoi-ngay-vui",
    short: "Bó hoa tươi ngày vui — rực rỡ sắc màu cho mọi niềm vui.",
    description: "Bó hoa mix nhiều loại hoa tươi nhiều màu sắc: hồng, cúc, baby, thạch thảo. Phù hợp tặng trong các dịp sinh nhật, chúc mừng, tốt nghiệp. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa ngày vui", "hoa tươi nhiều màu", "hoa sinh nhật", "hoa tươi tphcm", "hoa chúc mừng"],
  },
  {
    slug: "bo-hoa-mix-pastel-ngot-ngao",
    name: "Bó Hoa Mix Pastel Ngọt Ngào",
    category: "bo-hoa",
    _img: "bo-hoa-mix-pastel-ngot-ngao",
    short: "Bó hoa mix pastel ngọt ngào — tone màu pastel dịu mắt, đẹp tinh tế.",
    description: "Bó hoa pastel với hồng phấn, tím nhạt, trắng kem và baby breath. Phối màu hài hoà, nhẹ nhàng, phù hợp tặng bạn bè, đồng nghiệp. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa pastel", "bó hoa ngọt ngào", "hoa tươi tphcm", "hoa sinh nhật", "hoa tặng bạn"],
    badge: "Nổi bật",
  },
  {
    slug: "bo-hoa-mix-trang-tim-diu-dang",
    name: "Bó Hoa Mix Trắng Tím Dịu Dàng",
    category: "bo-hoa",
    _img: "bo-hoa-mix-trang-tim-diu-dang",
    short: "Bó hoa trắng tím dịu dàng — thanh nhã và đầy nữ tính.",
    description: "Bó hoa phối giữa hoa trắng và tím: oải hương, cúc tím, baby trắng. Tone màu thanh lịch, phù hợp tặng mẹ, cô giáo ngày 8/3 hoặc 20/10. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa trắng tím", "bó hoa dịu dàng", "hoa tươi bình thạnh", "hoa 8/3", "hoa tặng cô giáo"],
  },
  {
    slug: "bo-hoa-mix-tong-am-ruc-ro",
    name: "Bó Hoa Mix Tông Ấm Rực Rỡ",
    category: "bo-hoa",
    _img: "bo-hoa-mix-tong-am-ruc-ro",
    short: "Bó hoa tông ấm rực rỡ — cam, đỏ, vàng tràn đầy năng lượng tích cực.",
    description: "Bó hoa tone ấm với hồng cam, cúc vàng, hướng dương nhỏ. Màu sắc rực rỡ, tươi vui, phù hợp tặng sinh nhật, khai trương, tân gia. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa tông ấm", "bó hoa rực rỡ", "hoa tươi tphcm", "hoa khai trương", "hoa sinh nhật"],
  },
  {
    slug: "bo-hoa-mix-sac-mat-tuoi-sang",
    name: "Bó Hoa Mix Sắc Mát Tươi Sáng",
    category: "bo-hoa",
    _img: "bo-hoa-mix-sac-mat-tuoi-sang",
    short: "Bó hoa sắc mát tươi sáng — xanh, trắng, pastel mát mắt cho ngày hè.",
    description: "Bó hoa tone mát với hoa cẩm tú cầu xanh, cúc trắng, eustoma xanh pastel. Cảm giác tươi mát, trong lành, phù hợp tặng thăm bệnh, sinh nhật. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa sắc mát", "bó hoa tươi sáng", "hoa tươi bình thạnh", "hoa thăm bệnh", "hoa tươi tphcm"],
  },
  {
    slug: "bo-hoa-hong-cam-quyen-ru",
    name: "Bó Hoa Hồng Cam Quyến Rũ",
    category: "bo-hoa",
    _img: "bo-hoa-hong-cam-quyen-ru",
    short: "Bó hồng cam quyến rũ — sắc cam ấm áp, đầy cuốn hút.",
    description: "Bó hoa hồng cam phối với hoa lily nhỏ và baby. Tone cam chủ đạo tượng trưng cho sự nhiệt huyết, đam mê. Phù hợp tặng đồng nghiệp, bạn bè. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng cam", "bó hoa quyến rũ", "hoa tươi tphcm", "hoa tặng đồng nghiệp", "hoa sinh nhật"],
  },
  {
    slug: "bo-hoa-mix-thanh-lich",
    name: "Bó Hoa Mix Thanh Lịch",
    category: "bo-hoa",
    _img: "bo-hoa-mix-thanh-lich",
    short: "Bó hoa mix thanh lịch — trang nhã và tinh tế cho mọi dịp.",
    description: "Bó hoa mix tone trung tính với hồng kem, trắng, xanh nhạt. Phong cách thanh lịch, hiện đại, phù hợp tặng sếp, đối tác hoặc người thân. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa thanh lịch", "bó hoa mix", "hoa tươi bình thạnh", "hoa tặng sếp", "hoa tươi tphcm"],
  },
  {
    slug: "bo-hoa-hong-nhe-nhang",
    name: "Bó Hoa Hồng Nhẹ Nhàng",
    category: "bo-hoa",
    _img: "bo-hoa-hong-nhe-nhang",
    short: "Bó hồng nhẹ nhàng — đơn giản mà tinh tế, gửi gắm yêu thương.",
    description: "Bó hoa hồng đơn giản với 12 bông hồng đỏ hoặc hồng phấn, bọc giấy kraft. Phong cách tối giản, nhẹ nhàng, phù hợp tặng bạn bè, người thân. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa nhẹ nhàng", "hoa hồng đơn giản", "hoa tươi tphcm", "hoa sinh nhật", "hoa tặng bạn"],
  },

  // ===== Giỏ Hoa =====
  {
    slug: "gio-hoa-trang-xanh-thanh-nha",
    name: "Giỏ Hoa Trắng Xanh Thanh Nhã",
    category: "gio-hoa",
    _img: "gio-hoa-trang-xanh-thanh-nha",
    short: "Giỏ hoa trắng xanh thanh nhã — tinh tế và sang trọng cho không gian thêm phần sức sống.",
    description: "Giỏ hoa phối giữa hoa cúc trắng, cẩm tú cầu xanh, baby và lá xanh. Đặt trong giỏ mây cao cấp, phù hợp biếu tặng, thăm bệnh hoặc trang trí. Giao 2 giờ tại TP.HCM.",
    keywords: ["giỏ hoa trắng xanh", "hoa thanh nhã", "giỏ hoa tươi", "hoa thăm bệnh", "hoa tươi bình thạnh"],
    badge: "Bán chạy",
  },

  // ===== Khai Trương =====
  {
    slug: "ke-hoa-khai-truong-thinh-vuong",
    name: "Kệ Hoa Khai Trương Thịnh Vượng",
    category: "khai-truong",
    _img: "ke-hoa-khai-truong-thinh-vuong",
    short: "Kệ hoa khai trương thịnh vượng — chúc mừng khởi đầu mới thuận lợi, phát tài.",
    description: "Kệ hoa khai trương 1 tầng với hoa hồng đỏ, cúc vàng, hướng dương. Tone đỏ - vàng hợp phong thuỷ, mang ý nghĩa may mắn, thịnh vượng. Có banner chúc mừng. Giao và dựng miễn phí. Giao 2 giờ tại TP.HCM.",
    keywords: ["kệ hoa khai trương", "hoa khai trương thịnh vượng", "hoa tươi bình thạnh", "kệ hoa sự kiện", "hoa khai trương tphcm"],
    badge: "Bán chạy",
  },
  {
    slug: "ke-hoa-khai-truong-hong-pastel-duyen-dang",
    name: "Kệ Hoa Khai Trương Hồng Pastel Duyên Dáng",
    category: "khai-truong",
    _img: "ke-hoa-khai-truong-hong-pastel-duyen-dang",
    short: "Kệ hoa khai trương hồng pastel — duyên dáng, nhẹ nhàng cho cửa hàng thời trang, spa.",
    description: "Kệ hoa 1 tầng tone hồng pastel chủ đạo, kết hợp hoa hồng phấn, baby, eustoma trắng. Phù hợp khai trương cửa hàng thời trang, salon, spa, quán cafe. Giao và dựng miễn phí. Giao 2 giờ tại TP.HCM.",
    keywords: ["kệ hoa pastel", "hoa khai trương duyên dáng", "hoa tươi tphcm", "kệ hoa hồng pastel", "hoa khai trương"],
  },
  {
    slug: "ke-hoa-khai-truong-vang-cam-hop-phong-thuy",
    name: "Kệ Hoa Khai Trương Vàng Cam Hợp Phong Thuỷ",
    category: "khai-truong",
    _img: "ke-hoa-khai-truong-vang-cam-hop-phong-thuy",
    short: "Kệ hoa khai trương vàng cam — đại cát đại lợi theo phong thuỷ.",
    description: "Kệ hoa 2 tầng cao cấp với hoa cúc vàng, hồng cam, hướng dương và cành vàng. Màu sắc rực rỡ, hợp phong thuỷ. Phù hợp khai trương công ty, nhà hàng lớn. Giao và dựng miễn phí. Giao 2 giờ tại TP.HCM.",
    keywords: ["kệ hoa phong thuỷ", "hoa khai trương vàng cam", "kệ hoa 2 tầng", "hoa tươi bình thạnh", "hoa khai trương tphcm"],
  },
  {
    slug: "ke-hoa-khai-truong-lan-ho-diep-kem-sang-trong",
    name: "Kệ Hoa Khai Trương Lan Hồ Điệp Kem Sang Trọng",
    category: "khai-truong",
    _img: "ke-hoa-khai-truong-lan-ho-diep-kem-sang-trong",
    short: "Kệ hoa lan hồ điệp kem — sang trọng, đẳng cấp cho sự kiện quan trọng.",
    description: "Kệ hoa kết hợp lan hồ điệp kem và hoa tươi cao cấp. Thiết kế sang trọng, đẳng cấp. Phù hợp khai trương công ty, showroom, ngân hàng. Giao và dựng miễn phí. Giao 2 giờ tại TP.HCM.",
    keywords: ["kệ hoa lan hồ điệp", "hoa khai trương sang trọng", "kệ hoa cao cấp", "hoa tươi tphcm", "lan hồ điệp khai trương"],
  },
  {
    slug: "ke-hoa-khai-truong-cuc-dong-tien-thac-do",
    name: "Kệ Hoa Sự Kiện Cúc Đồng Tiền Thác Đổ",
    category: "khai-truong",
    _img: "ke-hoa-khai-truong-cuc-dong-tien-thac-do",
    short: "Kệ hoa cúc đồng tiền thác đổ — ấn tượng và độc đáo cho sự kiện lớn.",
    description: "Kệ hoa 2 tầng thiết kế thác đổ với cúc đồng tiền vàng, cam, đỏ. Kiểu dáng độc đáo, ấn tượng. Phù hợp khai trương cửa hàng, sự kiện lớn. Giao và dựng miễn phí. Giao 2 giờ tại TP.HCM.",
    keywords: ["kệ hoa cúc đồng tiền", "hoa thác đổ", "kệ hoa sự kiện", "hoa tươi bình thạnh", "hoa khai trương tphcm"],
  },
  {
    slug: "ke-hoa-khai-truong-thien-dieu-lan-trang",
    name: "Kệ Hoa Khai Trương Thiên Điểu Lan Trắng",
    category: "khai-truong",
    _img: "ke-hoa-khai-truong-thien-dieu-lan-trang",
    short: "Kệ hoa thiên điểu lan trắng — hiện đại, nghệ thuật và đầy kiêu sa.",
    description: "Kệ hoa thiết kế hiện đại với hoa thiên điểu cam, lan trắng, hoa lily. Phong cách nghệ thuật, độc đáo. Phù hợp khai trương showroom, phòng tranh. Giao và dựng miễn phí. Giao 2 giờ tại TP.HCM.",
    keywords: ["kệ hoa thiên điểu", "hoa khai trương nghệ thuật", "kệ hoa lan trắng", "hoa tươi tphcm", "hoa khai trương"],
  },

  // ===== Chia Buồn =====
  {
    slug: "lang-hoa-chia-buon-lys-bach-hop",
    name: "Lẵng Hoa Chia Buồn Lys Bạch Hợp",
    category: "chia-buon",
    _img: "lang-hoa-chia-buon-lys-bach-hop",
    short: "Lẵng hoa chia buồn lys bạch hợp — lời tiễn biệt trang trọng và chân thành.",
    description: "Lẵng hoa chia buồn với hoa lys trắng, bạch hợp, cúc trắng phối trên kệ tre trang trọng. Tone trắng tinh khiết, đi kèm băng tang viết tay theo yêu cầu. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa chia buồn", "lẵng hoa lys", "hoa tang lễ", "hoa chia buồn tphcm", "hoa tươi bình thạnh"],
  },

  // ===== Lan Hồ Điệp =====
  {
    slug: "chau-lan-ho-diep-trang-quy-phai",
    name: "Chậu Lan Hồ Điệp Trắng Quý Phái",
    category: "lan-ho-diep",
    _img: "chau-lan-ho-diep-trang-quy-phai",
    short: "Chậu lan hồ điệp trắng quý phái — biểu tượng của sang trọng và đẳng cấp.",
    description: "Chậu lan hồ điệp trắng 5 cành, trồng trong chậu sứ cao cấp, trang trí rêu và sỏi trắng. Lan hồ điệp giữ tươi 30-60 ngày. Phù hợp biếu tặng đối tác, khai trương, tân gia. Giao 2 giờ tại TP.HCM.",
    keywords: ["lan hồ điệp trắng", "chậu lan quý phái", "hoa biếu tặng", "lan hồ điệp tphcm", "hoa tươi bình thạnh"],
    badge: "Nổi bật",
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
  "hoa-lua": [
    { label: "Nhỏ", dimension: "Cao 30–50cm", note: "Để bàn, kệ sách, trang trí góc nhỏ" },
    { label: "Vừa", dimension: "Cao 50–80cm", note: "Phòng khách, văn phòng" },
    { label: "Lớn", dimension: "Cao 80–120cm", note: "Sảnh, cửa hàng, không gian rộng" },
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
  "hoa-lua": [
    "Hoa lụa cao cấp giữ vẻ đẹp bền lâu, không cần chăm sóc — lý tưởng trang trí nội thất.",
    "Phù hợp văn phòng, phòng khách, không gian cần vẻ đẹp xanh tươi quanh năm.",
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
  "hoa-lua": [
    "Lau nhẹ bằng khăn khô hoặc cọ mềm định kỳ để giữ độ sáng bóng.",
    "Tránh đặt dưới ánh nắng trực tiếp lâu ngày để không bạc màu.",
    "Không cần tưới nước — bền đẹp nhiều năm không cần chăm sóc đặc biệt.",
  ],
};

const OCCASIONS_BY_CATEGORY: Record<Category, string[]> = {
  "bo-hoa": ["Sinh nhật", "Kỷ niệm", "Tỏ tình", "Tốt nghiệp", "8/3 - 20/10", "Valentine"],
  "gio-hoa": ["Sinh nhật", "Thăm bệnh", "Biếu tặng", "Cảm ơn", "Sự kiện công ty"],
  "khai-truong": ["Khai trương", "Khánh thành", "Mừng sự kiện", "Khai xuân"],
  "chia-buon": ["Tang lễ", "Lễ viếng", "Tưởng niệm"],
  "lan-ho-diep": ["Khai trương", "Tân gia", "Lễ Tết", "Biếu đối tác", "Mừng thọ"],
  "hoa-lua": ["Trang trí nội thất", "Quà tặng bền lâu", "Văn phòng", "Cửa hàng", "Tân gia"],
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
  "hoa-lua": ["Hoa lụa cao cấp nhập khẩu", "Chậu / bình / giỏ trang trí", "Cành & lá giả chân thực"],
};

const imgPoolByCat: Record<Category, string[]> = (() => {
  const pool: Record<Category, string[]> = {} as Record<Category, string[]>;
  for (const p of raw) {
    (pool[p.category] ||= []).push(p._img);
  }
  return pool;
})();

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

export const formatPrice = (_vnd?: number) => "Liên hệ";
