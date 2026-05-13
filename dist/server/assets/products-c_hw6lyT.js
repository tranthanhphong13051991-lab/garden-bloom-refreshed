const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
  return h;
};
const ratingFor = (slug) => {
  const h = hash(slug);
  const value = +(4.6 + h % 40 / 100).toFixed(1);
  const count = 48 + h % 220;
  return { value, count };
};
const FAQ_BY_CATEGORY = {
  "bo-hoa": [
    { q: "Bó hoa giữ tươi được bao lâu?", a: "Bó hoa của Thanh Ngọc giữ tươi 3–5 ngày nếu cắm nước sạch, tránh nắng và thay nước mỗi ngày." },
    { q: "Có giao hoa trong ngày tại TP.HCM không?", a: "Có. Chúng tôi giao trong vòng 2 giờ tại TP.HCM khi đặt trước 18:00." },
    { q: "Có thể đổi màu hoa hoặc giấy gói theo yêu cầu không?", a: "Hoàn toàn được. Vui lòng nhắn Zalo 0934926092 để chúng tôi tư vấn phối màu phù hợp." }
  ],
  "gio-hoa": [
    { q: "Giỏ hoa có kèm thiệp không?", a: "Mọi giỏ hoa đều được tặng kèm thiệp viết tay miễn phí theo nội dung quý khách yêu cầu." },
    { q: "Giỏ hoa phù hợp tặng dịp nào?", a: "Giỏ hoa thanh lịch, phù hợp sinh nhật, kỷ niệm, thăm bệnh, biếu tặng cấp trên hoặc khách hàng." },
    { q: "Có thể đặt giỏ hoa kích thước lớn hơn không?", a: "Có. Chúng tôi nhận thiết kế giỏ hoa theo ngân sách và kích thước riêng — liên hệ Zalo để báo giá." }
  ],
  "khai-truong": [
    { q: "Kệ hoa khai trương cao bao nhiêu?", a: "Kệ tiêu chuẩn cao 1,6m–1,8m. Kệ 2 tầng cao 1,8m–2,2m, phù hợp đặt sảnh lớn." },
    { q: "Có giao và lắp đặt kệ tận nơi không?", a: "Có. Chúng tôi giao và dựng kệ miễn phí trong nội thành TP.HCM." },
    { q: "Đặt kệ hoa khai trương trước bao lâu?", a: "Nên đặt trước ít nhất 4–6 tiếng để đảm bảo chuẩn bị hoa tươi và giao đúng giờ." }
  ],
  "chia-buon": [
    { q: "Hoa chia buồn nên chọn màu gì?", a: "Tone trắng hoặc trắng — vàng nhạt là lựa chọn trang trọng và phổ biến nhất cho lễ tang." },
    { q: "Có viết băng tang theo yêu cầu không?", a: "Có. Chúng tôi viết băng tang miễn phí theo nội dung và tên người gửi quý khách cung cấp." },
    { q: "Giao hoa chia buồn ngoài giờ hành chính được không?", a: "Được. Tiệm phục vụ 7h–21h tất cả các ngày, có hỗ trợ giao gấp khi cần." }
  ],
  "lan-ho-diep": [
    { q: "Chậu lan hồ điệp giữ được bao lâu?", a: "Lan hồ điệp tươi đẹp 30–60 ngày nếu đặt nơi thoáng mát, tưới 1–2 lần/tuần bằng cách xịt phun sương." },
    { q: "Có nhận khắc tên/lời chúc trên chậu không?", a: "Có. Chúng tôi hỗ trợ in lời chúc trên nơ hoặc thiệp đi kèm miễn phí." },
    { q: "Có hoá đơn VAT cho chậu lan biếu tặng không?", a: "Có. Quý khách vui lòng cung cấp thông tin công ty khi đặt để được xuất hoá đơn." }
  ]
};
const img = (slug, _size = 800) => {
  if (slug.includes(".")) return `/images/${slug}`;
  return `/images/${slug}.webp`;
};
const CATEGORIES = [
  { id: "bo-hoa", label: "Bó Hoa", description: "Bó hoa tươi cho mọi dịp: sinh nhật, tình yêu, tốt nghiệp" },
  { id: "gio-hoa", label: "Giỏ Hoa", description: "Giỏ hoa thanh lịch, sang trọng cho dịp đặc biệt" },
  { id: "khai-truong", label: "Khai Trương", description: "Kệ hoa khai trương, chúc mừng sự kiện, sảnh lớn" },
  { id: "chia-buon", label: "Chia Buồn", description: "Hoa chia buồn trang trọng, lời tiễn biệt chân thành" },
  { id: "lan-ho-diep", label: "Lan Hồ Điệp", description: "Lan hồ điệp quý phái, biếu tặng cao cấp" }
];
const raw = [
  {
    slug: "bo-hoa-hong-kem-tinh-te",
    name: "Bó Hoa Hồng Kem Tinh Tế",
    category: "bo-hoa",
    badge: "Bán chạy",
    _img: "products/bo-hoa-tuoi.jpg",
    short: "Bó hồng kem phối hồng pastel nhẹ nhàng, phù hợp sinh nhật và kỷ niệm.",
    description: "Thiết kế hồng kem, hồng pastel và baby breath được gói giấy champagne thanh lịch. Phù hợp tặng người yêu, mẹ, bạn thân hoặc khách hàng thân thiết. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng kem", "bó hoa sinh nhật", "bó hoa tặng người yêu", "hoa tươi tphcm"]
  },
  {
    slug: "bo-hong-do-sang-trong",
    name: "Bó Hồng Đỏ Sang Trọng",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "products/bo-hoa-tuoi.jpg",
    short: "Bó hồng đỏ nồng nàn dành cho lời tỏ tình và ngày kỷ niệm.",
    description: "Tông đỏ quyến rũ được xử lý theo dáng bó tròn hiện đại, tạo cảm giác trang trọng mà vẫn mềm mại. Phù hợp Valentine, kỷ niệm và những lời yêu thương chân thành. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa hồng đỏ", "bó hoa lãng mạn", "valentine", "hoa tươi tphcm"]
  },
  {
    slug: "gio-hoa-trang-xanh-thanh-nha",
    name: "Giỏ Hoa Trắng Xanh Thanh Nhã",
    category: "gio-hoa",
    badge: "Thanh lịch",
    _img: "products/bo-hoa-tuoi.jpg",
    short: "Giỏ hoa trắng xanh lịch sự cho biếu tặng, cảm ơn và thăm hỏi.",
    description: "Sắc trắng xanh tạo cảm giác trang nhã, chỉn chu và dễ phù hợp nhiều không gian. Mẫu giỏ được thiết kế cân đối, thích hợp tặng cấp trên, khách hàng hoặc gia đình. Giao 2 giờ tại TP.HCM.",
    keywords: ["giỏ hoa trắng xanh", "giỏ hoa sang trọng", "hoa biếu tặng", "hoa tươi tphcm"]
  },
  {
    slug: "hoa-khai-truong-thinh-vuong",
    name: "Kệ Hoa Khai Trương Thịnh Vượng",
    category: "khai-truong",
    badge: "May mắn",
    _img: "products/bo-hoa-tuoi.jpg",
    short: "Kệ hoa chúc mừng khai trương với sắc vàng đỏ rực rỡ.",
    description: "Thiết kế kệ hoa nổi bật mang thông điệp phát tài, thịnh vượng và khởi đầu thuận lợi. Phù hợp cửa hàng, showroom, văn phòng và sự kiện chúc mừng. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa khai trương", "kệ hoa chúc mừng", "hoa phát tài", "hoa tươi tphcm"]
  },
  {
    slug: "hoa-chia-buon-ly-bach-hop",
    name: "Hoa Chia Buồn Ly Bạch Hợp",
    category: "chia-buon",
    _img: "products/bo-hoa-tuoi.jpg",
    short: "Lẵng hoa trắng trang trọng gửi lời phân ưu chân thành.",
    description: "Tông trắng chủ đạo gợi sự thanh khiết, bình an và lòng thành kính. Thiết kế tiết chế, trang nghiêm, phù hợp lễ viếng và gửi lời chia buồn sâu sắc. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa chia buồn", "lẵng hoa trắng", "hoa tang lễ", "hoa tươi tphcm"]
  },
  {
    slug: "hoa-lan-ho-diep-trang-quy-phai",
    name: "Lan Hồ Điệp Trắng Quý Phái",
    category: "lan-ho-diep",
    badge: "Cao cấp",
    _img: "products/bo-hoa-tuoi.jpg",
    short: "Chậu lan hồ điệp trắng sang trọng cho biếu tặng và khai trương.",
    description: "Lan hồ điệp trắng biểu trưng cho vẻ đẹp tinh khôi, bền lâu và đẳng cấp. Mẫu chậu phù hợp tặng đối tác, tân gia, mừng thọ hoặc dịp lễ quan trọng. Giao 2 giờ tại TP.HCM.",
    keywords: ["lan hồ điệp", "lan trắng", "hoa biếu sếp", "hoa tươi tphcm"]
  },
  {
    slug: "bo-mix-pastel-ngot-ngao",
    name: "Bó Mix Pastel Ngọt Ngào",
    category: "bo-hoa",
    badge: "Dịu dàng",
    _img: "products/bo-hoa-tuoi.jpg",
    short: "Bó hoa pastel mềm mại, trẻ trung và đầy cảm xúc.",
    description: "Sắc pastel được phối nhẹ với lá xanh tạo tổng thể trong trẻo, nữ tính và dễ thương. Phù hợp tặng sinh nhật, tốt nghiệp, 8/3, 20/10 hoặc lời cảm ơn tinh tế. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa mix", "hoa pastel", "bó hoa tốt nghiệp", "hoa tươi tphcm"]
  },
  // ── THÊM 12/5/2026 ────────────────────────────────────────────
  {
    slug: "bo-hoa-tuoi-thanh-ngoc",
    name: "Bó Hoa Tươi Thanh Ngọc",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "bo-hoa-tuoi-thanh-ngoc.jpg",
    short: "Bó hoa tươi từ shop Thanh Ngọc, với màu xanh lá cây nổi bật, phù hợp làm quà tặng.",
    description: "Bó hoa tươi từ shop Thanh Ngọc với thiết kế tinh tế, màu xanh lá cây từ cây cối bên trong chữ. Phù hợp làm quà tặng trong nhiều dịp. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa tươi thanh ngọc", "bó hoa tươi", "quà tặng thanh ngọc", "hoa tphcm", "bó hoa xanh"],
    galleryImgs: []
  },
  // ── THÊM 12/5/2026 ────────────────────────────────────────────
  {
    slug: "bo-hoa-hong-kem-tinh-te",
    name: "Bó Hoa Hồng Kem Tinh Tế",
    category: "khai-truong",
    badge: "Nổi bật",
    _img: "bo-hoa-hong-kem-tinh-te.png",
    short: "Thanh Ngọc - Bó hoa hồng kem, trắng tinh tế, phù hợp khai trương",
    description: "Bó hoa gồm hồng kem, hồng phơn, lan hồ điệp trắng, baby breath và lá eucalyptus. Thiết kế 2 tầng, ribbon rườm tua, phù hợp khai trương, tặng quà. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa khai truong", "bo hoa hong kem", "lan ho diep", "tphcm", "hoa tang"],
    galleryImgs: ["bo-hoa-hong-kem-tinh-te-can-canh.jpg"]
  },
  // ── THÊM 12/5/2026 ────────────────────────────────────────────
  {
    slug: "bo-hoa-hong-kem-tinh-te",
    name: "Bó Hoa Hồng Kem Tinh Tế",
    category: "khai-truong",
    badge: "Nổi bật",
    _img: "bo-hoa-hong-kem-tinh-te.png",
    short: "Thanh Ngọc - Bó hoa kem, hồng, trắng tinh tế, phù hợp khai trương.",
    description: "Bó hoa gồm hồng kem, hồng phấn, lan hồ điệp trắng, thiết kế sang trọng. Phù hợp cho dịp khai trương, trang trí sự kiện. Giao 2 giờ tại TP.HCM.",
    keywords: ["hoa khai truong", "hoa tươi tphcm", "bó hoa hồng kem", "lan hồ điệp", "hoa trang trí sự kiện"],
    galleryImgs: ["bo-hoa-hong-kem-tinh-te-can-canh.jpg"]
  },
  // ── THÊM 13/5/2026 ────────────────────────────────────────────
  {
    slug: "ke-hoa-khai-truong-thanh-cong",
    name: "Kệ Hoa Khai Trương Thành Công",
    category: "khai-truong",
    badge: "Nổi bật",
    _img: "ke-hoa-khai-truong-thanh-cong.png",
    short: "Kệ hoa cao cấp cho khai trương, màu pastel nhẹ nhàng.",
    description: "Kệ hoa cao cấp với nhiều loại hoa như hồng, cúc, lan hồ điệp. Màu sắc pastel nhẹ nhàng, thiết kế sang trọng. Phù hợp cho khai trương, kỷ niệm. Giao 2 giờ tại TP.HCM.",
    keywords: ["kệ hoa khai trương", "hoa pastel", "hoa tươi"],
    galleryImgs: ["ke-hoa-khai-truong-thanh-cong-chinh-dien.png", "ke-hoa-khai-truong-thanh-cong-can-canh.png"]
  },
  // ── THÊM 13/5/2026 ────────────────────────────────────────────
  {
    slug: "gio-hoa-tinh-yeu-hong",
    name: "Giỏ Hoa Tình Yêu Hồng",
    category: "gio-hoa",
    badge: "Nổi bật",
    _img: "gio-hoa-tinh-yeu-hong.png",
    short: "Giỏ hoa hồng và trắng, lãng mạn, phù hợp kỷ niệm, sinh nhật",
    description: "Giỏ hoa gồm nhiều bông hồng và hoa cúc, màu sắc nhẹ nhàng, thiết kế tinh tế trong giỏ đan. Phù hợp làm quà tặng, trang trí phòng khách. Giao 2 giờ tại TP.HCM.",
    keywords: ["giỏ hoa hồng", "hoa tươi", "tình yêu", "kỷ niệm", "sinh nhật"],
    galleryImgs: ["gio-hoa-tinh-yeu-hong-chinh-dien.jpg", "gio-hoa-tinh-yeu-hong-can-canh.jpg", "gio-hoa-tinh-yeu-hong-anh-sang.jpg"]
  },
  // ── THÊM 13/5/2026 ────────────────────────────────────────────
  {
    slug: "gio-hoa-dep-sang-tao",
    name: "Giỏ Hoa Đẹp Sáng Tạo",
    category: "gio-hoa",
    badge: "Nổi bật",
    _img: "gio-hoa-dep-sang-tao.png",
    short: "Giỏ hoa tươi với hồng, xanh dương, vàng, phù hợp trang trí phòng khách.",
    description: "Sản phẩm là giỏ hoa tươi với các bông hoa hồng màu cam và xanh dương, kết hợp với các loại hoa nhỏ màu vàng và trắng. Thiết kế tinh tế trong giỏ mây, phù hợp làm quà tặng hoặc trang trí phòng khách. Giao 2 giờ tại TP.HCM.",
    keywords: ["giỏ hoa tươi", "hoa hồng", "hoa màu xanh dương", "trang trí phòng khách", "quà tặng"],
    galleryImgs: ["gio-hoa-dep-sang-tao-chinh-dien.jpg", "gio-hoa-dep-sang-tao-can-canh.jpg", "gio-hoa-dep-sang-tao-anh-sang.jpg"]
  },
  // ── THÊM 13/5/2026 ────────────────────────────────────────────
  {
    slug: "bo-hoa-tuoi-dep-sang",
    name: "Bó Hoa Tươi Đẹp Sang",
    category: "bo-hoa",
    badge: "Nổi bật",
    _img: "bo-hoa-tuoi-dep-sang.png",
    short: "Bó hoa tươi đẹp màu hồng nhạt, trắng, phù hợp làm quà tặng.",
    description: "Bó hoa gồm nhiều bông hoa màu hồng nhạt và trắng, được bọc giấy màu hồng. Bó hoa có dáng tròn, được buộc bằng ribbon. Phù hợp làm quà tặng trong các dịp quan trọng. Giao 2 giờ tại TP.HCM.",
    keywords: ["bó hoa tươi", "hoa hồng nhạt", "hoa quà tặng", "hoa tươi đẹp"],
    galleryImgs: ["bo-hoa-tuoi-dep-sang-chinh-dien.jpg", "bo-hoa-tuoi-dep-sang-can-canh.jpg", "bo-hoa-tuoi-dep-sang-anh-sang.jpg"]
  }
];
const SIZES_BY_CATEGORY = {
  "bo-hoa": [
    { label: "Tiêu chuẩn", dimension: "Cao 35–45cm × Rộng 25–30cm", note: "Phù hợp cầm tay, tặng cá nhân" },
    { label: "Lớn", dimension: "Cao 50–60cm × Rộng 35–40cm", note: "Ấn tượng hơn, phù hợp tặng dịp đặc biệt" }
  ],
  "gio-hoa": [
    { label: "Tiêu chuẩn", dimension: "Cao 40–50cm × Rộng 30–35cm" },
    { label: "Lớn", dimension: "Cao 55–65cm × Rộng 40–50cm", note: "Đặt bàn tiệc, sảnh nhỏ" }
  ],
  "khai-truong": [
    { label: "Kệ 1 tầng", dimension: "Cao 1.6–1.8m × Rộng 0.8–1.0m" },
    { label: "Kệ 2 tầng", dimension: "Cao 1.8–2.2m × Rộng 1.0–1.2m", note: "Phù hợp đặt sảnh lớn" }
  ],
  "chia-buon": [
    { label: "Tiêu chuẩn", dimension: "Cao 1.6–1.8m × Rộng 0.8m" },
    { label: "Lớn", dimension: "Cao 1.8–2.0m × Rộng 1.0m", note: "Trang trọng cho lễ viếng lớn" }
  ],
  "lan-ho-diep": [
    { label: "5 cành", dimension: "Cao ~70cm", note: "Bàn làm việc, biếu tặng cá nhân" },
    { label: "10 cành", dimension: "Cao ~85cm", note: "Khai trương, biếu tặng đối tác" },
    { label: "20 cành+", dimension: "Cao ~95cm", note: "Sự kiện lớn, dịp trọng đại" }
  ]
};
const MEANING_BY_CATEGORY = {
  "bo-hoa": [
    "Thể hiện tình cảm chân thành, lãng mạn và sự trân trọng dành cho người nhận.",
    "Bó hoa là món quà phổ biến nhất cho sinh nhật, kỷ niệm, tỏ tình và lễ tốt nghiệp."
  ],
  "gio-hoa": [
    "Giỏ hoa tượng trưng cho sự đầy đặn, viên mãn và lời chúc trọn vẹn.",
    "Phù hợp biếu tặng cấp trên, khách hàng, thăm bệnh hoặc các dịp trang trọng."
  ],
  "khai-truong": [
    "Mang lời chúc thịnh vượng, phát tài, hanh thông và khởi đầu thuận lợi cho việc kinh doanh.",
    "Tone vàng — đỏ — cam thường được chọn vì hợp phong thủy đại cát."
  ],
  "chia-buon": [
    "Gửi gắm sự đồng cảm, tiếc thương và lời tiễn biệt trang trọng đến gia đình người đã khuất.",
    "Tone trắng tượng trưng cho sự thanh khiết, bình an và lòng thành kính."
  ],
  "lan-ho-diep": [
    "Lan hồ điệp đại diện cho sự sang trọng, quý phái, may mắn và tình yêu bền vững.",
    "Là lựa chọn biếu tặng cao cấp cho dịp khai trương, tân gia, lễ Tết hoặc đối tác quan trọng."
  ]
};
const CARE_BY_CATEGORY = {
  "bo-hoa": [
    "Cắt vát gốc 2–3cm, ngâm trong nước sạch ngay khi nhận.",
    "Thay nước mỗi ngày, tránh ánh nắng trực tiếp và máy lạnh thổi thẳng.",
    "Tỉa bỏ lá ngập trong nước để tránh thối thân."
  ],
  "gio-hoa": [
    "Tưới mút xốp 1 lần/ngày bằng nước sạch.",
    "Đặt nơi thoáng mát, tránh nắng gắt và gió mạnh.",
    "Có thể dùng được 3–5 ngày với điều kiện chăm sóc đúng."
  ],
  "khai-truong": [
    "Đặt nơi thông thoáng, tránh đặt sát máy lạnh hoặc nắng chiếu trực tiếp.",
    "Xịt phun sương lên hoa 1–2 lần/ngày để giữ độ tươi.",
    "Kệ hoa giữ đẹp 2–3 ngày trong điều kiện thường."
  ],
  "chia-buon": [
    "Đặt nơi thoáng, không cần tưới thêm nước trong điều kiện sử dụng ngắn hạn.",
    "Hạn chế di chuyển kệ sau khi đã đặt cố định."
  ],
  "lan-ho-diep": [
    "Tưới phun sương 1–2 lần/tuần, không tưới đẫm gốc.",
    "Đặt nơi có ánh sáng dịu, tránh nắng gắt và máy lạnh thổi trực tiếp.",
    "Lan giữ tươi đẹp 30–60 ngày nếu chăm đúng cách."
  ]
};
const OCCASIONS_BY_CATEGORY = {
  "bo-hoa": ["Sinh nhật", "Kỷ niệm", "Tỏ tình", "Tốt nghiệp", "8/3 - 20/10", "Valentine"],
  "gio-hoa": ["Sinh nhật", "Thăm bệnh", "Biếu tặng", "Cảm ơn", "Sự kiện công ty"],
  "khai-truong": ["Khai trương", "Khánh thành", "Mừng sự kiện", "Khai xuân"],
  "chia-buon": ["Tang lễ", "Lễ viếng", "Tưởng niệm"],
  "lan-ho-diep": ["Khai trương", "Tân gia", "Lễ Tết", "Biếu đối tác", "Mừng thọ"]
};
const COLOR_DICT = [
  { match: /trắng|tinh khôi|baby/i, name: "Trắng", hex: "#FFFFFF" },
  { match: /kem|peach|đào/i, name: "Kem", hex: "#F5E1C8" },
  { match: /hồng pastel|pastel/i, name: "Hồng pastel", hex: "#F8C8DC" },
  { match: /hồng phấn|hồng hồng|hồng/i, name: "Hồng", hex: "#F4A6C0" },
  { match: /đỏ/i, name: "Đỏ", hex: "#D62828" },
  { match: /cam/i, name: "Cam", hex: "#F4811F" },
  { match: /vàng/i, name: "Vàng", hex: "#F4C430" },
  { match: /xanh/i, name: "Xanh", hex: "#7BB6A1" },
  { match: /tím/i, name: "Tím", hex: "#9B7EBD" },
  { match: /đen/i, name: "Đen", hex: "#1F1F1F" }
];
const inferColors = (text) => {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const c of COLOR_DICT) {
    if (c.match.test(text) && !seen.has(c.name)) {
      seen.add(c.name);
      out.push({ name: c.name, hex: c.hex });
    }
  }
  return out.length > 0 ? out : [{ name: "Đa sắc", hex: "#E8C9A7" }];
};
const MATERIALS_BY_CATEGORY = {
  "bo-hoa": ["Hoa tươi nhập khẩu & Đà Lạt", "Giấy gói cao cấp", "Ruy băng lụa", "Thiệp viết tay"],
  "gio-hoa": ["Hoa tươi cao cấp", "Giỏ mây / sắt vintage", "Mút xốp giữ ẩm", "Ruy băng & thiệp"],
  "khai-truong": ["Hoa tươi cao cấp", "Kệ tre / sắt sơn tĩnh điện", "Banner chúc mừng", "Mút xốp giữ ẩm"],
  "chia-buon": ["Hoa ly, cúc, lan trắng", "Kệ tre trang trọng", "Băng tang viết tay"],
  "lan-ho-diep": ["Lan hồ điệp Đà Lạt / nhập khẩu", "Chậu sứ cao cấp", "Rêu trang trí", "Nơ lụa & thiệp"]
};
const imgPoolByCat = raw.reduce((acc, p) => {
  (acc[p.category] ||= []).push(p._img);
  return acc;
}, {});
const VARIANT_LABELS = [
  { variant: "Góc chính diện", note: "Nhìn thẳng vào sản phẩm — bố cục tổng thể rõ nhất" },
  { variant: "Góc cận cảnh", note: "Chi tiết hoa, màu sắc và chất liệu" },
  { variant: "Góc từ trên cao", note: "Nhìn toàn bộ từ trên xuống — bố cục và tỉ lệ" },
  { variant: "Ánh sáng tự nhiên", note: "Chụp ngoài trời — màu sắc thực nhất" }
];
const buildDefaultGallery = (slug, cat, mainImg) => {
  const pool = (imgPoolByCat[cat] || []).filter((s) => s !== mainImg);
  const h = hash(slug);
  const picked = [];
  for (let i = 0; i < Math.min(3, pool.length); i++) {
    picked.push(pool[(h + i * 7) % pool.length]);
  }
  return picked.map((s, i) => ({
    src: img(s, 800),
    alt: `${VARIANT_LABELS[i].variant} — minh họa khác biệt thực tế`,
    variant: VARIANT_LABELS[i].variant,
    note: VARIANT_LABELS[i].note
  }));
};
const PRODUCTS = raw.map((p) => {
  const colors = p.colors ?? inferColors(`${p.name} ${p.short}`);
  let gallery;
  if (p.gallery) gallery = p.gallery;
  else if (p.galleryImgs)
    gallery = p.galleryImgs.map((s, i) => ({
      src: img(s, 800),
      alt: `${p.name} — ${VARIANT_LABELS[i % VARIANT_LABELS.length].variant}`,
      variant: VARIANT_LABELS[i % VARIANT_LABELS.length].variant,
      note: VARIANT_LABELS[i % VARIANT_LABELS.length].note
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
    thumb: img(p._img, 400)
  };
});
const findProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);
const featuredProducts = () => {
  const featured = PRODUCTS.filter((p) => p.badge);
  return featured.length > 0 ? featured.slice(0, 8) : PRODUCTS.slice(0, 8);
};
const formatPrice = (vnd) => vnd ? new Intl.NumberFormat("vi-VN").format(vnd) + "₫" : "Liên hệ";
export {
  CATEGORIES as C,
  PRODUCTS as P,
  formatPrice as a,
  featuredProducts as b,
  findProduct as f
};
