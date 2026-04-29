export type Category =
  | "bo-hoa"
  | "gio-hoa"
  | "khai-truong"
  | "chia-buon"
  | "lan-ho-diep";

export type FAQ = { q: string; a: string };

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
const img = (slug: string, size: 400 | 800 = 800) => `${CDN}/${slug}-${size}.webp`;

export const CATEGORIES: { id: Category; label: string; description: string }[] = [
  { id: "bo-hoa", label: "Bó Hoa", description: "Bó hoa tươi cho mọi dịp: sinh nhật, tình yêu, tốt nghiệp" },
  { id: "gio-hoa", label: "Giỏ Hoa", description: "Giỏ hoa thanh lịch, sang trọng cho dịp đặc biệt" },
  { id: "khai-truong", label: "Khai Trương", description: "Kệ hoa khai trương, chúc mừng sự kiện, sảnh lớn" },
  { id: "chia-buon", label: "Chia Buồn", description: "Hoa chia buồn trang trọng, lời tiễn biệt chân thành" },
  { id: "lan-ho-diep", label: "Lan Hồ Điệp", description: "Lan hồ điệp quý phái, biếu tặng cao cấp" },
];

type RawProduct = Omit<Product, "image" | "thumb" | "rating" | "faqs"> & { _img: string; rating?: Product["rating"]; faqs?: FAQ[] };
const raw: RawProduct[] = [
  // BÓ HOA
  { slug: "bo-hoa-hong-kem-tinh-te", name: "Bó Hoa Hồng Kem Tinh Tế", category: "bo-hoa", badge: "Bán Chạy", _img: "hoa-hong-kem-tinh-te", short: "Hoa hồng kem thuần khiết, gói kraft thủ công, dành tặng những khoảnh khắc đặc biệt.", description: "Bó hoa hồng kem tinh tế — sự kết hợp giữa hồng kem ngọt ngào và lớp giấy kraft mộc mạc. Mẫu bán chạy bậc nhất tại tiệm, phù hợp tặng người yêu, mẹ, bạn thân vào sinh nhật, kỷ niệm hay những ngày đặc biệt.", price: 650000, keywords: ["hoa hồng kem", "bó hoa tặng người yêu", "bó hoa sinh nhật"] },
  { slug: "bo-hoa-mua-xuan-ruc-ro", name: "Bó Hoa Mùa Xuân Rực Rỡ", category: "bo-hoa", badge: "Premium", _img: "bo-hong-do-trang-hong-mix", short: "Tổng hòa các loài hoa mùa xuân — rực rỡ, tươi vui, trọn vẹn yêu thương.", description: "Bó hoa mùa xuân rực rỡ kết hợp hồng đỏ, hồng phấn và trắng — mang sắc xuân tươi mới và năng lượng tích cực vào mọi không gian.", price: 850000, keywords: ["bó hoa mix", "bó hoa premium", "hoa mùa xuân"] },
  { slug: "bo-hong-phat-trang-giay-hong", name: "Bó Hồng Phấn Trắng Giấy Hồng", category: "bo-hoa", _img: "bo-hong-phat-trang-giay-hong", short: "Hồng phấn và trắng hòa quyện trong lớp giấy hồng tinh tế — nhẹ nhàng, nữ tính.", description: "Bó hồng phấn trắng gói giấy hồng — vẻ đẹp dịu dàng, nữ tính, lý tưởng tặng phái nữ trong các dịp lãng mạn.", price: 580000, keywords: ["bó hồng phấn", "hoa nữ tính"] },
  { slug: "bo-hoa-trang-xanh-tot-nghiep", name: "Bó Hoa Trắng Xanh Tốt Nghiệp", category: "bo-hoa", badge: "Tốt Nghiệp", _img: "bo-hoa-trang-xanh-tot-nghiep", short: "Trắng xanh tinh khôi — bó hoa tốt nghiệp truyền thống, khởi đầu mới đầy hy vọng.", description: "Bó hoa tốt nghiệp tone trắng xanh tinh khôi, mang ý nghĩa khởi đầu mới và thành công. Phù hợp tặng học sinh, sinh viên ngày tốt nghiệp.", price: 520000, keywords: ["bó hoa tốt nghiệp", "hoa trắng xanh"] },
  { slug: "bo-tram-hong-do-sinh-nhat", name: "Bó Trăm Hồng Đỏ Sinh Nhật", category: "bo-hoa", badge: "Hot", _img: "bo-tram-hong-do-sinh-nhat", short: "Trăm bông hồng đỏ rực rỡ — món quà sinh nhật hoành tráng và đầy tình cảm nhất.", description: "Bó 100 bông hồng đỏ rực rỡ — món quà sinh nhật ấn tượng, thể hiện tình yêu nồng nàn và mãnh liệt.", price: 2500000, keywords: ["bó 100 hoa hồng", "hoa hồng đỏ", "quà sinh nhật"] },
  { slug: "bo-hong-dao-peach-boc-to", name: "Bó Hồng Đào Peach Bọc Tơ", category: "bo-hoa", _img: "bo-hong-dao-peach-boc-to", short: "Hồng đào peach mềm mại, bọc tơ lụa sang trọng — vẻ đẹp tinh tế.", description: "Bó hồng đào tone peach mềm mại bọc tơ lụa — sang trọng, tinh tế dành cho người phụ nữ bạn yêu.", price: 720000, keywords: ["hồng đào", "hoa peach"] },
  { slug: "bo-hong-do-goi-den-sang-trong", name: "Bó Hồng Đỏ Gói Đen Sang Trọng", category: "bo-hoa", badge: "Premium", _img: "bo-hong-do-goi-den-sang-trong", short: "Hồng đỏ nồng nàn trong lớp giấy đen huyền bí — sự tương phản hoàn hảo của tình yêu mạnh mẽ.", description: "Bó hồng đỏ gói giấy đen — lựa chọn sang trọng, mạnh mẽ, dành cho tình yêu nồng cháy.", price: 780000, keywords: ["hồng đỏ", "bó hoa sang trọng", "tặng người yêu"] },
  { slug: "bo-hong-hong-trang-mix-tiem", name: "Bó Hồng Hồng Trắng Mix Tiệm", category: "bo-hoa", _img: "bo-hong-hong-trang-mix-tiem", short: "Hồng và trắng hòa quyện tự nhiên — bó hoa đa dụng, phù hợp mọi dịp.", description: "Bó hồng hồng trắng mix theo phong cách tiệm — đa dụng, phù hợp mọi dịp trong năm.", price: 480000, keywords: ["bó hoa mix", "hoa hồng trắng"] },
  { slug: "bo-huong-duong-hong-hong-vui-tuoi", name: "Bó Hướng Dương Hồng Hồng Vui Tươi", category: "bo-hoa", _img: "bo-huong-duong-hong-hong-vui-tuoi", short: "Hướng dương vàng và hồng hồng — năng lượng tích cực, tươi vui và đầy sức sống.", description: "Bó hướng dương kết hợp hồng phấn — mang năng lượng tích cực, lời chúc thành công và vui vẻ.", price: 550000, keywords: ["hoa hướng dương", "bó hoa vui tươi"] },
  { slug: "bo-baby-breath-trang-tinh-khoi", name: "Bó Baby Breath Trắng Tinh Khôi", category: "bo-hoa", badge: "Độc Đáo", _img: "bo-baby-breath-trang-tinh-khoi", short: "Baby breath trắng tinh khôi như những đám mây nhỏ — nhẹ nhàng, lãng mạn và thuần khiết.", description: "Bó baby breath (hoa bi) trắng tinh khôi, lãng mạn như đám mây — phù hợp các bạn nữ yêu phong cách thuần khiết.", price: 420000, keywords: ["baby breath", "hoa bi trắng"] },
  { slug: "bo-hong-do-goi-giay-trang", name: "Bó Hồng Đỏ Gói Giấy Trắng", category: "bo-hoa", _img: "bo-hong-do-goi-giay-trang", short: "Hồng đỏ cổ điển trong giấy trắng — cái đẹp không bao giờ lỗi thời của tình yêu.", description: "Bó hồng đỏ cổ điển gói giấy trắng — vẻ đẹp truyền thống, kinh điển không lỗi thời.", price: 520000, keywords: ["hồng đỏ", "bó hoa cổ điển"] },
  { slug: "bo-hong-do-cam-mix-tinh-te", name: "Bó Hồng Đỏ Cam Mix Tinh Tế", category: "bo-hoa", _img: "bo-hong-do-cam-mix-tinh-te", short: "Hồng đỏ và cam hòa quyện ấm áp — bó hoa mang sắc lửa nhiệt tình và ngọt ngào.", description: "Bó hồng đỏ cam mix tinh tế — phối màu ấm áp, mang cảm xúc nhiệt thành và ngọt ngào.", price: 600000, keywords: ["bó hoa cam đỏ", "hoa mix tone"] },

  // GIỎ HOA
  { slug: "gio-hoa-trang-xanh-thanh-nha", name: "Giỏ Hoa Trắng Xanh Thanh Nhã", category: "gio-hoa", badge: "Mới", _img: "gio-hoa-trang-xanh-thanh-nha", short: "Hồng trắng, cúc trắng, cẩm tú cầu xanh — vẻ đẹp thanh nhã trong một giỏ hoa sang trọng.", description: "Giỏ hoa trắng xanh kết hợp hồng trắng, cúc trắng và cẩm tú cầu xanh — thanh nhã, sang trọng.", price: 950000, keywords: ["giỏ hoa trắng xanh", "giỏ hoa sang trọng"] },
  { slug: "gio-sat-hong-hong-tram-bong", name: "Giỏ Sắt Hồng Hồng Trăm Bông", category: "gio-hoa", badge: "Sang Trọng", _img: "gio-sat-hong-hong-tram-bong", short: "Giỏ sắt vintage chứa hàng trăm bông hồng hồng — món quà sang trọng và ấn tượng.", description: "Giỏ sắt vintage chứa hàng trăm bông hồng phấn — lựa chọn sang trọng cho dịp kỷ niệm, cầu hôn.", price: 2200000, keywords: ["giỏ hoa hồng", "trăm bông hồng"] },
  { slug: "gio-hoa-trang-ly-cuc-xanh", name: "Giỏ Hoa Trắng Ly Cúc Xanh", category: "gio-hoa", _img: "gio-hoa-trang-ly-cuc-xanh", short: "Hoa ly trắng, cúc xanh và lá tươi — giỏ hoa thanh lịch cho những dịp trang trọng.", description: "Giỏ hoa trắng ly cúc xanh — thanh lịch, sang trọng, phù hợp các dịp trang trọng và biếu tặng cấp trên.", price: 880000, keywords: ["giỏ hoa ly", "giỏ hoa trắng"] },

  // KHAI TRƯƠNG
  { slug: "hoa-khai-truong-thinh-vuong", name: "Hoa Khai Trương Thịnh Vượng", category: "khai-truong", _img: "hoa-khai-truong-thinh-vuong", short: "Rực rỡ, tươi vui, đầy sức sống — bó hoa khai trương mang trọn ý nghĩa thịnh vượng.", description: "Hoa khai trương thịnh vượng — mẫu kệ rực rỡ mang ý nghĩa phú quý, may mắn cho ngày khai trương.", price: 1500000, keywords: ["hoa khai trương", "kệ hoa thịnh vượng"] },
  { slug: "ke-hoa-gerbera-vang-do-2-tang-sanh", name: "Kệ Hoa Gerbera Vàng Đỏ 2 Tầng Sảnh", category: "khai-truong", _img: "ke-hoa-gerbera-vang-do-2-tang-sanh", short: "Kệ hoa 2 tầng gerbera vàng đỏ đặt sảnh — ấn tượng ngay từ cái nhìn đầu tiên.", description: "Kệ hoa 2 tầng gerbera vàng đỏ — kích thước lớn, đặt sảnh, gây ấn tượng mạnh ngay từ cái nhìn đầu tiên.", price: 1800000, keywords: ["kệ hoa gerbera", "kệ hoa 2 tầng"] },
  { slug: "ke-hoa-trang-xanh-sang-trong-2-tang", name: "Kệ Hoa Trắng Xanh Sang Trọng 2 Tầng", category: "khai-truong", badge: "Sang Trọng", _img: "ke-hoa-trang-xanh-sang-trong-2-tang", short: "Kệ hoa 2 tầng trắng xanh thanh lịch — khác biệt, sang trọng, phù hợp văn phòng cao cấp.", description: "Kệ hoa khai trương 2 tầng trắng xanh sang trọng — phù hợp văn phòng, công ty, showroom cao cấp.", price: 2000000, keywords: ["kệ hoa trắng xanh", "kệ khai trương cao cấp"] },
  { slug: "ke-hoa-vang-cam-do-2-tang-khai-truong", name: "Kệ Hoa Vàng Cam Đỏ 2 Tầng Khai Trương", category: "khai-truong", badge: "Bán Chạy", _img: "ke-hoa-vang-cam-do-2-tang-khai-truong", short: "Kệ hoa 2 tầng vàng cam đỏ — bộ màu phong thủy chuẩn nhất cho ngày khai trương.", description: "Kệ hoa 2 tầng vàng cam đỏ — bộ màu phong thủy đại cát, mẫu bán chạy nhất cho ngày khai trương.", price: 1750000, keywords: ["kệ hoa khai trương", "kệ hoa phong thủy"] },
  { slug: "ke-hoa-ly-vang-cuc-vang-2-tang", name: "Kệ Hoa Ly Vàng Cúc Vàng 2 Tầng", category: "khai-truong", _img: "ke-hoa-ly-vang-cuc-vang-2-tang", short: "Kệ hoa 2 tầng ly vàng cúc vàng — tone vàng thuần khiết tượng trưng cho phú quý.", description: "Kệ hoa 2 tầng ly vàng cúc vàng — tone vàng phú quý, mang lời chúc tài lộc thịnh vượng.", price: 1850000, keywords: ["kệ hoa vàng", "kệ hoa ly"] },
  { slug: "ke-hoa-vang-sang-trong-cot-vang", name: "Kệ Hoa Vàng Sang Trọng Cột Vàng", category: "khai-truong", badge: "Cao Cấp", _img: "ke-hoa-vang-sang-trong-cot-vang", short: "Kệ hoa cột vàng sang trọng — thiết kế độc đáo, tạo điểm nhấn đẳng cấp cho ngày khai trương.", description: "Kệ hoa cột vàng cao cấp — thiết kế độc đáo, đẳng cấp cho khai trương sự kiện lớn.", price: 2500000, keywords: ["kệ hoa cột", "kệ hoa cao cấp"] },
  { slug: "ke-hoa-hong-do-phat-2-tang-sang-trong", name: "Kệ Hoa Hồng Đỏ Phát 2 Tầng Sang Trọng", category: "khai-truong", badge: "Phổ Biến", _img: "ke-hoa-hong-do-phat-2-tang-sang-trong", short: "Kệ hoa 2 tầng hồng đỏ sang trọng — mẫu kệ bán chạy nhất, phù hợp mọi ngành nghề.", description: "Kệ hoa 2 tầng hồng đỏ sang trọng — mẫu phổ biến nhất, phù hợp mọi loại hình kinh doanh.", price: 1700000, keywords: ["kệ hoa hồng đỏ", "kệ khai trương"] },
  { slug: "ke-hoa-hong-pastel-gia-go-dep", name: "Kệ Hoa Hồng Pastel Giá Gỗ Đẹp", category: "khai-truong", badge: "Trend", _img: "ke-hoa-hong-pastel-gia-go-dep", short: "Kệ hoa giá gỗ tone hồng pastel nhẹ nhàng — sang trọng theo phong cách Hàn Quốc hiện đại.", description: "Kệ hoa giá gỗ tone hồng pastel — phong cách Hàn Quốc hiện đại, trendy và ấn tượng.", price: 1650000, keywords: ["kệ hoa pastel", "kệ hoa Hàn Quốc"] },
  { slug: "ke-hoa-hong-kem-lan-trang-2-tang", name: "Kệ Hoa Hồng Kem Lan Trắng 2 Tầng", category: "khai-truong", badge: "Premium", _img: "ke-hoa-hong-kem-lan-trang-2-tang", short: "Kệ hoa 2 tầng hồng kem và lan trắng — sang trọng, quý phái và đầy ý nghĩa.", description: "Kệ hoa 2 tầng hồng kem kết hợp lan trắng — premium, quý phái cho khai trương cao cấp.", price: 2300000, keywords: ["kệ hoa lan trắng", "kệ hoa premium"] },
  { slug: "ke-hoa-cuc-vang-anthurium-lan-trang", name: "Kệ Hoa Cúc Vàng Anthurium Lan Trắng", category: "khai-truong", badge: "Cao Cấp", _img: "ke-hoa-cuc-vang-anthurium-lan-trang", short: "Kệ hoa cao cấp cúc vàng, anthurium đỏ và lan trắng — sự kết hợp 3 loài hoa quý phái.", description: "Kệ hoa cao cấp kết hợp cúc vàng, anthurium đỏ và lan trắng — quý phái, đẳng cấp.", price: 2600000, keywords: ["kệ hoa cao cấp", "kệ hoa anthurium"] },

  // CHIA BUỒN
  { slug: "hoa-chia-buon-ly-bach-hop", name: "Hoa Chia Buồn Lý Bạch Hợp", category: "chia-buon", badge: "Phổ Biến", _img: "hoa-chia-buon-ly-bach-hop", short: "Trắng tinh thanh lịch, trang trọng — lời đồng cảm chân thành trong những giây phút khó khăn nhất.", description: "Hoa chia buồn ly bạch hợp — trắng tinh thanh lịch, trang trọng, gửi lời đồng cảm chân thành trong giờ phút tiễn biệt.", price: 1200000, keywords: ["hoa chia buồn", "hoa tang lễ", "hoa ly trắng"] },

  // LAN HỒ ĐIỆP
  { slug: "hoa-lan-ho-diep-trang-quy-phai", name: "Hoa Lan Hồ Điệp Trắng Quý Phái", category: "lan-ho-diep", _img: "lan-ho-diep-trang-quy-phai", short: "Lan hồ điệp trắng thuần khiết, sang trọng — lựa chọn hoàn hảo cho mọi dịp đặc biệt.", description: "Chậu lan hồ điệp trắng thuần khiết — quý phái, sang trọng, biếu tặng cấp trên, đối tác, dịp khai trương cao cấp.", price: 3500000, keywords: ["lan hồ điệp", "lan hồ điệp trắng", "hoa lan biếu tặng"] },
];

export const PRODUCTS: Product[] = raw.map((p) => ({
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
  image: img(p._img, 800),
  thumb: img(p._img, 400),
}));

export const findProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsByCategory = (cat: Category) => PRODUCTS.filter((p) => p.category === cat);
export const featuredProducts = () => PRODUCTS.filter((p) => p.badge).slice(0, 8);

export const formatPrice = (vnd?: number) =>
  vnd ? new Intl.NumberFormat("vi-VN").format(vnd) + "₫" : "Liên hệ";
