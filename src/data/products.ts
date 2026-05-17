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
// Quy chuẩn ảnh:
//   image / _img: ảnh studio chính (đại diện, thumbnail, hero)
//   galleryImgs: [ góc nghiêng, close-up, ánh sáng tự nhiên, giao hàng ]
//   KHÔNG đưa ảnh studio vào galleryImgs

const raw: RawProduct[] = [
  // ----- BÓ HOA -----
  {
    slug: "red-velvet-roses-bouquet",
    name: "Bó Hoa Hồng Đỏ Nhung",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "red-velvet-roses-bouquet.png",
    price: 950000,
    short:
      "Bó hoa hồng đỏ nổi bật với baby trắng và eucalyptus xanh bạc, mang cảm giác lãng mạn và thanh lịch cho những dịp đặc biệt.",
    description:
      "Bó Hoa Hồng Đỏ Nhung là thiết kế hoa mang vẻ đẹp cổ điển với những đóa hồng đỏ nhung phối baby trắng và eucalyptus xanh bạc. Tone gói trắng kem giúp tổng thể nhẹ nhàng nhưng vẫn nổi bật, phù hợp cho sinh nhật, kỷ niệm và những dịp cần gửi gắm cảm xúc chân thành.",
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
      "red-velvet-roses-bouquet-angle45.jpg",
      "red-velvet-roses-bouquet-closeup.jpg",
      "red-velvet-roses-bouquet-lifestyle.jpg",
      "red-velvet-roses-bouquet-delivery.jpg",
    ],
  },
  {
    slug: "golden-ivory-rose-bouquet",
    name: "Bó Hoa Hồng Kem Vàng",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "golden-ivory-rose-bouquet.png",
    price: 1250000,
    short:
      "Bó hoa hồng kem ivory phối lan vũ nữ vàng ấm áp, thanh lịch — sinh nhật, chúc mừng, lời yêu thương. Giao 2 giờ tại TP.HCM.",
    description:
      "Bó Hoa Hồng Kem Vàng là thiết kế mang vẻ đẹp nhẹ nhàng với những đóa hồng ivory form garden rose nở lớn phối cùng lan vũ nữ vàng rực rỡ. Tone màu kem vàng ấm áp kết hợp giấy gói burgundy sang trọng tạo nên tổng thể thanh lịch, nữ tính và đầy cuốn hút. Những bông hồng ivory tượng trưng cho sự thuần khiết và tinh tế, trong khi lan vũ nữ vàng mang đến niềm vui và năng lượng tích cực. Các loài hoa được phối hợp hài hòa, tạo điểm nhấn thanh nhã cho người nhận. Phù hợp cho sinh nhật, lời chúc dịu dàng, kỷ niệm, cảm ơn và những dịp đặc biệt cần sự tinh tế, sang trọng. Mỗi bó hoa đều được chọn lọc kỹ lưỡng từ những vườn hoa tươi nhập khẩu và Đà Lạt, đảm bảo chất lượng tốt nhất khi đến tay khách hàng. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa hồng kem",
      "ivory rose bouquet",
      "hoa hồng vàng kem",
      "hoa lan vũ nữ vàng",
      "garden rose bouquet",
      "luxury flower bouquet tphcm",
      "hoa sinh nhật đẹp",
      "bó hoa tone vàng kem",
    ],
    galleryImgs: [
      "golden-ivory-rose-bouquet-angle45.jpg",
      "golden-ivory-rose-bouquet-closeup.jpg",
      "golden-ivory-rose-bouquet-lifestyle.jpg",
      "golden-ivory-rose-bouquet-delivery.jpg",
    ],
  },
  {
    slug: "hong-phan-diu-em",
    name: "Bó Hoa Hồng Phấn Dịu Êm",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "hong-phan-diu-em.png",
    short:
      "Bó hồng pastel phối foliage tím sang trọng, dịu dàng và lãng mạn — sinh nhật, kỷ niệm, tỏ tình. Giao 2 giờ tại TP.HCM.",
    description:
      "“Hồng Phấn Dịu Êm” là thiết kế bó hoa mang tinh thần nữ tính hiện đại với sắc hồng pastel nhẹ nhàng kết hợp cùng foliage tím nổi bật. Những bông hồng được tuyển chọn kỹ lưỡng, bung nở mềm mại trên nền giấy gói tông hồng đồng điệu tạo nên tổng thể thanh lịch và sang trọng. Sản phẩm phù hợp cho những dịp cần sự tinh tế như sinh nhật, kỷ niệm yêu nhau, chúc mừng hay gửi lời yêu thương chân thành. Từng chi tiết được phối theo phong cách florist boutique, giữ cảm giác tự nhiên nhưng vẫn nổi bật và cuốn hút. Đây là lựa chọn lý tưởng dành cho người yêu vẻ đẹp ngọt ngào, hiện đại và đầy cảm xúc. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa hồng pastel",
      "bó hoa hồng hồng phấn",
      "hoa sinh nhật sang trọng",
      "bó hoa nữ tính",
      "hoa tặng người yêu",
      "bó hoa boutique",
      "hoa tone hồng pastel",
      "bó hoa romantic",
      "hoa chúc mừng đẹp",
      "florist luxury",
    ],
    galleryImgs: [
      "hong-phan-diu-em-angle45.jpg",
      "hong-phan-diu-em-closeup.jpg",
      "hong-phan-diu-em-lifestyle.jpg",
      "hong-phan-diu-em-delivery.jpg",
    ],
  },
  {
    slug: "nang-ruc-ro",
    name: "Bó Hoa Hướng Dương Nắng Rực Rỡ",
    category: "bo-hoa",
    badge: "Bán chạy",
    _img: "nang-ruc-ro.png",
    short:
      "Bó hướng dương phối cúc tana mang sắc vàng rạng rỡ, tượng trưng cho niềm vui — khai trương, tốt nghiệp, sinh nhật. Giao 2 giờ tại TP.HCM.",
    description:
      "“Nắng Rực Rỡ” là bó hoa mang tinh thần tươi sáng và đầy cảm hứng với những đóa hướng dương vàng nổi bật được phối cùng cúc tana trắng nhỏ xinh. Thiết kế sử dụng tone giấy gói beige hiện đại giúp tổng thể trở nên hài hòa, tự nhiên nhưng vẫn sang trọng theo phong cách florist boutique. Sắc vàng của hướng dương tượng trưng cho hy vọng, thành công và sự lạc quan, rất phù hợp để gửi lời chúc mừng trong các dịp khai trương, tốt nghiệp, sinh nhật hoặc những cột mốc đặc biệt. Điểm nhấn nơ đỏ tạo cảm giác nổi bật và mang lại nguồn năng lượng tích cực cho người nhận. Đây là lựa chọn hoàn hảo dành cho những ai yêu vẻ đẹp tươi mới, ấm áp và tràn đầy sức sống. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa hướng dương",
      "hoa hướng dương đẹp",
      "bó hoa khai trương",
      "hoa chúc mừng",
      "bó hoa tốt nghiệp",
      "hướng dương boutique",
      "bó hoa tone vàng",
      "hoa sinh nhật tươi sáng",
      "bó hoa năng lượng tích cực",
      "florist luxury",
    ],
    galleryImgs: [
      "nang-ruc-ro-angle45.jpg",
      "nang-ruc-ro-closeup.jpg",
      "nang-ruc-ro-lifestyle.jpg",
      "nang-ruc-ro-delivery.jpg",
    ],
  },
  {
    slug: "may-hong-diu-dang",
    name: "Bó Hoa Mây Hồng Dịu Dàng",
    category: "bo-hoa",
    badge: "Florist choice",
    _img: "may-hong-diu-dang.png",
    short:
      "Bó hoa pastel hồng baby phối cát tường và scabiosa trắng nhẹ nhàng, nữ tính — sinh nhật, kỷ niệm, tỏ tình. Giao 2 giờ tại TP.HCM.",
    description:
      "“Mây Hồng Dịu Dàng” là thiết kế bó hoa mang tinh thần feminine luxury với sự kết hợp hài hòa giữa hồng pastel nhẹ nhàng và cát tường mềm mại. Những bông hoa được phối theo bố cục tự nhiên, điểm thêm scabiosa trắng cùng foliage xanh non tạo cảm giác thanh thoát và tinh khôi. Tone giấy gói hồng baby đồng điệu giúp tổng thể trở nên dịu mắt, hiện đại nhưng vẫn giữ được nét sang trọng đặc trưng của florist boutique. Sản phẩm phù hợp cho các dịp sinh nhật, kỷ niệm, tỏ tình hoặc gửi lời yêu thương chân thành đến người đặc biệt. Thiết kế mang lại cảm giác nhẹ nhàng và đầy cảm xúc, thích hợp dành cho những ai yêu vẻ đẹp nữ tính và tinh tế. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa pastel hồng",
      "bó hoa cát tường",
      "bó hoa sinh nhật đẹp",
      "hoa hồng pastel cao cấp",
      "bó hoa nữ tính",
      "hoa tặng người yêu",
      "bó hoa boutique luxury",
      "bó hoa tone hồng",
      "hoa romantic pastel",
      "florist sang trọng",
    ],
    galleryImgs: [
      "may-hong-diu-dang-angle45.jpg",
      "may-hong-diu-dang-closeup.jpg",
      "may-hong-diu-dang-lifestyle.jpg",
      "may-hong-diu-dang-delivery.jpg",
    ],
  },
  {
    slug: "do-nhung-say-dam",
    name: "Bó Hoa Đỏ Nhung Say Đắm",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "do-nhung-say-dam.png",
    short:
      "Bó hồng đỏ sang trọng phối giấy gói đen huyền bí, biểu tượng của tình yêu mãnh liệt và đầy cuốn hút. Giao 2 giờ tại TP.HCM.",
    description:
      "“Đỏ Nhung Say Đắm” là thiết kế bó hoa mang tinh thần luxury romantic với những đóa hồng đỏ nhung được tuyển chọn kỹ lưỡng và sắp xếp theo bố cục tròn đầy tinh tế. Sắc đỏ nổi bật kết hợp cùng lớp giấy gói đen sang trọng tạo nên vẻ đẹp quyến rũ, hiện đại và đầy chiều sâu cảm xúc. Điểm xuyết foliage xanh nhẹ giúp tổng thể trở nên hài hòa và mềm mại hơn mà vẫn giữ được nét nổi bật đặc trưng. Thiết kế phù hợp cho những dịp đặc biệt như Valentine, cầu hôn, kỷ niệm yêu nhau hoặc gửi gắm lời yêu chân thành đến người thương. Đây là bó hoa dành cho những khoảnh khắc cần sự tinh tế, lãng mạn và cảm xúc mạnh mẽ khó quên. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa hồng đỏ",
      "bó hoa tình yêu",
      "hoa Valentine cao cấp",
      "bó hoa romantic luxury",
      "bó hồng đỏ sang trọng",
      "hoa cầu hôn",
      "bó hoa kỷ niệm",
      "bó hoa tone đỏ đen",
      "hoa tặng người yêu",
      "florist luxury",
    ],
    galleryImgs: [
      "do-nhung-say-dam-angle45.jpg",
      "do-nhung-say-dam-closeup.jpg",
      "do-nhung-say-dam-lifestyle.jpg",
      "do-nhung-say-dam-delivery.jpg",
    ],
  },
  {
    slug: "khuc-ca-hong-phan",
    name: "Khúc Ca Hồng Phấn",
    category: "bo-hoa",
    badge: "Florist choice",
    _img: "khuc-ca-hong-phan.png",
    short:
      "Bó hoa pastel phối hồng phấn và cát tường phong cách boutique — sinh nhật, kỷ niệm, gửi người thương. Giao 2 giờ tại TP.HCM.",
    description:
      "“Khúc Ca Hồng Phấn” là thiết kế bó hoa mang phong cách premium feminine với sự kết hợp tinh tế giữa hồng pastel, cát tường mềm mại và các chi tiết hoa điểm nhẹ đầy nghệ thuật. Tông màu hồng phấn chủ đạo hòa quyện cùng sắc kem champagne và foliage tím tạo nên tổng thể nhẹ nhàng nhưng vẫn nổi bật sang trọng. Thiết kế được sắp xếp theo bố cục tự nhiên với lớp giấy gói hồng hiện đại, mang lại cảm giác mềm mại và thanh thoát đúng tinh thần florist boutique. Những đóa hoa nở rộ đan xen tạo chiều sâu thị giác tinh tế, phù hợp cho các dịp sinh nhật, kỷ niệm hay gửi tặng người thương. Đây là bó hoa dành cho những khoảnh khắc cần sự dịu dàng, nữ tính và cảm xúc chân thành. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "bó hoa pastel cao cấp",
      "bó hoa hồng phấn",
      "bó hoa cát tường",
      "hoa sinh nhật sang trọng",
      "bó hoa nữ tính",
      "bó hoa boutique luxury",
      "hoa tone hồng pastel",
      "bó hoa romantic",
      "hoa tặng người yêu",
      "florist cao cấp",
    ],
    galleryImgs: [
      "khuc-ca-hong-phan-angle45.jpg",
      "khuc-ca-hong-phan-closeup.jpg",
      "khuc-ca-hong-phan-lifestyle.jpg",
      "khuc-ca-hong-phan-delivery.jpg",
    ],
  },

  // ----- GIỎ HOA -----
  {
    slug: "vuon-hoa-mong-mo",
    name: "Vườn Hoa Mộng Mơ",
    category: "gio-hoa",
    badge: "Nổi bật",
    _img: "vuon-hoa-mong-mo.png",
    short:
      "Giỏ hoa nghệ thuật phối hồng sọc, lan trắng và green trick, vẻ đẹp độc đáo đầy sức sống — khai trương, tân gia, chúc mừng. Giao 2 giờ tại TP.HCM.",
    description:
      "“Vườn Hoa Mộng Mơ” là thiết kế giỏ hoa mang phong cách garden luxury với sự kết hợp hài hòa giữa hồng sọc đỏ trắng nổi bật, lan hồ điệp trắng thanh lịch cùng green trick xanh độc đáo. Tổng thể được điểm xuyết bởi eucalyptus và baby trắng tạo cảm giác mềm mại, tự nhiên nhưng vẫn đầy chiều sâu nghệ thuật. Thiết kế sử dụng giỏ gỗ rustic kết hợp nơ xanh pastel giúp sản phẩm vừa hiện đại vừa mang nét gần gũi tinh tế. Đây là lựa chọn phù hợp cho các dịp khai trương, tân gia, chúc mừng hoặc làm quà tặng cao cấp dành cho đối tác và người thân yêu. Sự phối hợp màu sắc hài hòa cùng bố cục bay tự nhiên giúp giỏ hoa trở nên cuốn hút ở mọi không gian trưng bày. Giao 2 giờ tại TP.HCM.",
    keywords: [
      "giỏ hoa cao cấp",
      "giỏ hoa nghệ thuật",
      "hoa hồng sọc đỏ trắng",
      "giỏ hoa khai trương",
      "giỏ hoa chúc mừng",
      "lan hồ điệp trắng",
      "green trick bouquet",
      "giỏ hoa boutique",
      "hoa tặng đối tác",
      "florist luxury",
    ],
    galleryImgs: [
      "vuon-hoa-mong-mo-angle45.jpg",
      "vuon-hoa-mong-mo-closeup.jpg",
      "vuon-hoa-mong-mo-lifestyle.jpg",
      "vuon-hoa-mong-mo-delivery.jpg",
    ],
  },

  // ----- KHAI TRƯƠNG -----

  // ----- CHIA BUỒN -----
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
  { variant: "Góc nghiêng", note: "Ảnh góc nghiêng 45 độ — hình dung tổng thể sản phẩm từ góc nhìn thực tế" },
  { variant: "Cận chất liệu hoa", note: "Chi tiết hoa, cánh hoa, màu sắc và chất liệu thực tế" },
  { variant: "Ánh sáng tự nhiên", note: "Sản phẩm dưới ánh sáng ban ngày — màu sắc thực tế nhất" },
  { variant: "Giao hoa tận nơi", note: "Ảnh thực tế khi giao hàng — kiểm tra sản phẩm trước khi bàn giao" },
];

const buildDefaultGallery = (slug: string, cat: Category, mainImg: string): GalleryShot[] => {
  const pool = (imgPoolByCat[cat] || []).filter((s) => s !== mainImg);
  const h = hash(slug);
  const picked: string[] = [];
  for (let i = 0; i < Math.min(4, pool.length); i++) {
    picked.push(pool[(h + i * 7) % pool.length]);
  }
  return picked.map((s, i) => ({
    src: img(s, 800),
    alt: `THỰC TẾ — ${VARIANT_LABELS[i].variant}`,
    variant: VARIANT_LABELS[i].variant,
    note: VARIANT_LABELS[i].note,
  }));
};

export const PRODUCTS: Product[] = raw.map((p) => {
  const colors = p.colors ?? inferColors(`${p.name} ${p.short}`);
  let gallery: GalleryShot[];
  if (p.gallery) {
    // Legacy inline gallery — use as-is
    gallery = p.gallery;
  } else if (p.galleryImgs) {
    // galleryImgs should have EXACTLY 4 images: angle45, closeup, lifestyle, delivery
    gallery = p.galleryImgs.map((s, i) => ({
      src: img(s, 800),
      alt: `THỰC TẾ — ${VARIANT_LABELS[i % VARIANT_LABELS.length].variant}`,
      variant: VARIANT_LABELS[i % VARIANT_LABELS.length].variant,
      note: VARIANT_LABELS[i % VARIANT_LABELS.length].note,
    }));
  } else {
    gallery = buildDefaultGallery(p.slug, p.category, p._img);
  }

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