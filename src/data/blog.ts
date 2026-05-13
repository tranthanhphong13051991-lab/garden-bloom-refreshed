export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  publishedAt: string; // ISO
  updatedAt?: string;
  readingMinutes: number;
  tags: string[];
  /** Markdown-lite: hỗ trợ ## heading, đoạn văn, gạch đầu dòng "- " */
  content: string;
};

const CDN = "https://hoatuoithanhngoc.com/image/responsive";
const cover = (slug: string) => `${CDN}/${slug}-800.webp`;

export const POSTS: BlogPost[] = [
  {
    slug: "y-nghia-cac-loai-hoa-hong-theo-mau-sac",
    title: "Ý Nghĩa Các Loại Hoa Hồng Theo Màu Sắc",
    excerpt:
      "Hoa hồng đỏ tượng trưng tình yêu nồng cháy, hồng kem cho sự dịu dàng, hồng trắng cho sự thuần khiết — chọn đúng màu sẽ truyền tải đúng thông điệp.",
    cover: cover("hoa-hong-kem-tinh-te"),
    author: "Hoa Tươi Thanh Ngọc",
    publishedAt: "2026-04-10",
    readingMinutes: 5,
    tags: ["hoa hồng", "ý nghĩa hoa", "tặng người yêu"],
    content: `## Hoa hồng — biểu tượng vĩnh cửu của tình yêu

Trong tất cả các loài hoa, hoa hồng giữ vị trí đặc biệt trong văn hóa tặng hoa. Mỗi sắc màu lại mang một thông điệp riêng.

## Hoa hồng đỏ — Tình yêu nồng cháy
Là lựa chọn kinh điển cho ngày Valentine, kỷ niệm và lời tỏ tình. Một bó hồng đỏ thể hiện sự say đắm và cam kết lâu dài.

## Hoa hồng kem — Sự dịu dàng, tinh tế
Phù hợp tặng mẹ, tặng bạn thân hoặc người yêu trong những dịp nhẹ nhàng. Tone kem cũng dễ phối với phong cách vintage, tối giản.

## Hoa hồng trắng — Thuần khiết và khởi đầu mới
Thường xuất hiện trong đám cưới, lễ tốt nghiệp, tượng trưng cho sự khởi đầu trong sáng.

## Hoa hồng phấn (pink) — Lãng mạn và biết ơn
Lý tưởng cho ngày sinh nhật, ngày của Mẹ, hoặc gửi lời cảm ơn dịu dàng.

## Hoa hồng vàng — Tình bạn và niềm vui
Tặng bạn thân, đồng nghiệp hoặc dùng trong các dịp chúc mừng thành công.

## Mẹo chọn hoa hồng tặng đúng dịp
- Tỏ tình lần đầu: 1 bông hoặc bó nhỏ hồng đỏ + giấy kraft.
- Kỷ niệm yêu nhau: bó 33–99 bông hồng đỏ hoặc hồng phấn.
- Sinh nhật bạn nữ: hồng kem hoặc peach gói tơ lụa.
- Tốt nghiệp: hồng trắng phối baby breath.`,
  },
  {
    slug: "cach-cham-hoa-tuoi-tai-nha-giu-tuoi-7-ngay",
    title: "Cách Chăm Hoa Tươi Tại Nhà Giữ Tươi 7 Ngày",
    excerpt:
      "Bí quyết cắm hoa, thay nước, cắt cành và bảo quản giúp bó hoa tại nhà luôn rạng rỡ suốt cả tuần.",
    cover: cover("bo-hong-phat-trang-giay-hong"),
    author: "Hoa Tươi Thanh Ngọc",
    publishedAt: "2026-04-12",
    readingMinutes: 6,
    tags: ["chăm sóc hoa", "mẹo cắm hoa", "bảo quản hoa"],
    content: `## Chuẩn bị bình hoa và nước
Bình thủy tinh sạch, nước lọc ở nhiệt độ phòng. Tránh dùng nước quá lạnh vì làm sốc cành hoa.

## Cắt cành đúng cách
Cắt vát góc 45° dưới vòi nước chảy. Việc này giúp tăng diện tích hút nước và ngăn bọt khí làm tắc mạch.

## Loại bỏ lá ngập nước
Lá ngâm trong nước sẽ phân hủy, sinh vi khuẩn và làm hoa nhanh héo.

## Thay nước mỗi ngày
- Đổ nước cũ, rửa sạch bình.
- Cắt thêm 1cm cuối cành.
- Thêm vài giọt nước rửa chén hoặc 1 thìa đường + vài giọt giấm để diệt khuẩn và nuôi hoa.

## Đặt hoa ở vị trí phù hợp
Tránh nắng trực tiếp, gió mạnh từ điều hòa, và xa trái cây chín (ethylene làm hoa mau tàn).

## Mẹo phục hồi hoa rũ
Quấn giấy báo quanh hoa, nhúng cành vào nước ấm 40°C trong 30 phút — hoa sẽ tươi trở lại đáng kể.`,
  },
  {
    slug: "cach-chon-hoa-khai-truong-hop-phong-thuy",
    title: "Cách Chọn Hoa Khai Trương Hợp Phong Thủy 2026",
    excerpt:
      "Màu sắc, loài hoa, vị trí đặt kệ — hướng dẫn đầy đủ giúp ngày khai trương rước lộc, đón may.",
    cover: cover("ke-hoa-vang-cam-do-2-tang-khai-truong"),
    author: "Hoa Tươi Thanh Ngọc",
    publishedAt: "2026-04-15",
    readingMinutes: 7,
    tags: ["hoa khai trương", "phong thủy", "kệ hoa"],
    content: `## Vì sao hoa khai trương cần hợp phong thủy?
Kệ hoa khai trương không chỉ làm đẹp mà còn mang ý nghĩa cầu chúc tài lộc, hanh thông trong kinh doanh.

## Chọn màu theo mệnh chủ
- Mệnh Kim: trắng, vàng kim — kệ ly trắng, cúc vàng.
- Mệnh Mộc: xanh lá, xanh ngọc — kệ trắng xanh.
- Mệnh Thủy: xanh dương, đen — kệ trắng phối lá.
- Mệnh Hỏa: đỏ, hồng, cam — kệ gerbera vàng đỏ.
- Mệnh Thổ: vàng, nâu — kệ vàng cam đỏ.

## Loài hoa thường dùng
- Hoa hướng dương: thành công, năng lượng.
- Hoa cát tường: tài lộc, may mắn.
- Hoa lan hồ điệp: phú quý, sang trọng.
- Hoa đồng tiền (gerbera): tiền tài dồi dào.

## Vị trí đặt kệ hoa
Đặt hai bên cửa chính, không che khuất lối đi. Kệ 2 tầng thường đặt sảnh lớn để gây ấn tượng.

## Thời gian giao hoa
Nên giao trước 1–2 tiếng so với giờ khai trương để hoa kịp ổn định và bạn có thời gian sắp xếp.`,
  },
  {
    slug: "goi-y-hoa-tang-sinh-nhat-theo-do-tuoi",
    title: "Gợi Ý Hoa Tặng Sinh Nhật Theo Độ Tuổi & Mối Quan Hệ",
    excerpt:
      "Tặng hoa sinh nhật cho mẹ, bạn gái, đồng nghiệp hay sếp — mỗi đối tượng có một lựa chọn phù hợp riêng.",
    cover: cover("bo-tram-hong-do-sinh-nhat"),
    author: "Hoa Tươi Thanh Ngọc",
    publishedAt: "2026-04-20",
    readingMinutes: 5,
    tags: ["hoa sinh nhật", "gợi ý quà tặng", "ý nghĩa hoa"],
    content: `## Tặng mẹ
Hoa cẩm chướng hồng hoặc hồng kem — biểu tượng của tình mẹ dịu dàng, biết ơn.

## Tặng bạn gái / vợ
- Sinh nhật tuổi 20–25: bó hồng peach hoặc baby breath.
- Sinh nhật tuổi 25–35: bó hồng đỏ gói đen hoặc giỏ hồng phấn sang trọng.
- Kỷ niệm đặc biệt: bó 99 hoặc 100 bông hồng đỏ.

## Tặng bạn thân nữ
Hoa hướng dương, tulip, hoặc bó mix tone tươi vui — thể hiện sự ấm áp và chân thành.

## Tặng đồng nghiệp / sếp nữ
Giỏ hoa thanh lịch tone trắng — xanh, hoặc chậu lan hồ điệp mini — vừa lịch sự vừa ý nghĩa.

## Tặng sếp nam / đối tác
Lan hồ điệp trắng hoặc tím — biểu tượng quý phái, phù hợp môi trường công sở.

## Lưu ý khi tặng hoa sinh nhật
- Kèm thiệp viết tay với lời chúc cá nhân hóa.
- Giao hoa đúng giờ — nhờ tiệm hoa giao tận nơi để tạo bất ngờ.`,
  },
];

export const findPost = (slug: string) => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });

/** Render markdown-lite → JSX-friendly chunks */
export function parseContent(md: string) {
  const blocks: Array<{ type: "h2" | "p" | "ul"; text?: string; items?: string[] }> = [];
  const lines = md.split("\n");
  let listBuffer: string[] = [];
  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: "ul", items: listBuffer });
      listBuffer = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2).trim());
    } else {
      flushList();
      blocks.push({ type: "p", text: line });
    }
  }
  flushList();
  return blocks;
}
