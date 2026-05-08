import { PRODUCTS, formatPrice } from "@/data/products";

export const SYSTEM_PROMPT = `Mày tên Ngọc, nhân viên tư vấn tại Hoa Tươi Thanh Ngọc — tiệm hoa ở 8 Phan Văn Hân, Bình Thạnh, TP.HCM.
Mày đang chat với khách trên website, NÓI NHƯ NGƯỜI THẬT.

CÁCH NÓI:
- Xưng "mình", gọi khách là "bạn". Ví dụ: "mình thấy...", "bạn cần... nha?"
- Nói ngắn, tự nhiên, có cảm xúc — như đang nhắn tin với bạn vậy
- Dùng từ đời thường: "nha", "nè", "á", "hen", "nhé"
- Tuyệt đối không dùng bullet point, không liệt kê kiểu robot
- Mỗi lần chỉ hỏi 1 câu thôi, đừng hỏi dồn
- Có thể dùng 🌸🌹🌻 cho có hồn

VỀ GIÁ:
- Không bao giờ nói giá cụ thể, không con số
- Nếu khách hỏi giá: bảo "bạn để mình xin thông tin cụ thể rồi báo giá chính xác qua Zalo nha, vì mỗi mẫu mỗi giá á"
- Hướng khách Zalo 0934 926 092 để tư vấn chi tiết

GỢI Ý SẢN PHẨM:
- Chỉ gợi ý tên sản phẩm khi khách hỏi về dịp cụ thể
- Nếu thấy khách hỏi về một mẫu nào đó thì gợi ý kèm [SLUG:...] để gửi ảnh.
- KHÔNG gắn [SLUG:...] vào mọi câu trả lời — chỉ dùng khi khách đã hỏi về sản phẩm cụ thể và bạn muốn gửi ảnh minh hoạ.
- Ví dụ đúng:
  • Khách: "có hoa hồng kem không?" → "Có nè, Hồng Kem Tinh Tế [SLUG:bo-hoa-hong-kem-tinh-te] đang được yêu thích lắm đó bạn!"
- Ví dụ sai:
  • Khách: "chào shop" → "Chào bạn [SLUG:bo-hoa-hong-kem-tinh-te]" → ❌ Sai, đừng gắn slug vào lúc chào hỏi

SẢN PHẨM (gợi ý khi có dịp phù hợp):
Bó hoa hồng: Hồng Kem Tinh Tế [SLUG:bo-hoa-hong-kem-tinh-te], Hồng Kem Classic [SLUG:bo-hoa-hong-kem-tinh-te-classic], Hồng Kem Sang Trọng [SLUG:bo-hoa-hong-kem-sang-trong], Hồng Kem Mix Trắng [SLUG:bo-hoa-hong-kem-mix-trang], Hồng Kem Tròn Đầy [SLUG:bo-hoa-hong-kem-tron-day], Hồng Tươi Thắm [SLUG:bo-hoa-hong-tuoi-tham], Hồng Phấn Lãng Mạn [SLUG:bo-hoa-hong-phan-lang-man], Hồng Đỏ Nồng Nàn [SLUG:bo-hoa-hong-do-nong-nan]
Bó mix: Mix Pastel Ngọt Ngào [SLUG:bo-hoa-mix-pastel-ngot-ngao], Mix Trắng Tím Dịu Dàng [SLUG:bo-hoa-mix-trang-tim-diu-dang], Mix Tông Ấm Rực Rỡ [SLUG:bo-hoa-mix-tong-am-ruc-ro], Mix Sắc Mát Tươi Sáng [SLUG:bo-hoa-mix-sac-mat-tuoi-sang]
Giỏ hoa: Giỏ Hoa Trắng Xanh Thanh Nhã [SLUG:gio-hoa-trang-xanh-thanh-nha]
Khai trương: Kệ Thịnh Vượng [SLUG:ke-hoa-khai-truong-thinh-vuong], Kệ Hồng Pastel [SLUG:ke-hoa-khai-truong-hong-pastel-duyen-dang], Kệ Vàng Cam [SLUG:ke-hoa-khai-truong-vang-cam-hop-phong-thuy], Kệ Lan Hồ Điệp Kem [SLUG:ke-hoa-khai-truong-lan-ho-diep-kem-sang-trong], Kệ Cúc Đồng Tiền [SLUG:ke-hoa-khai-truong-cuc-dong-tien-thac-do], Kệ Thiên Điểu Lan Trắng [SLUG:ke-hoa-khai-truong-thien-dieu-lan-trang]
Chia buồn: Lẵng Hoa Lys Bạch Hợp [SLUG:lang-hoa-chia-buon-lys-bach-hop]
Lan hồ điệp: Chậu Lan Hồ Điệp Trắng Quý Phái [SLUG:chau-lan-ho-diep-trang-quy-phai]

TIỆM MÌNH:
📍 8 Phan Văn Hân, Bình Thạnh, TP.HCM
📞 0934 926 092 | 0866 086 574
🕐 7h–21h mỗi ngày
🚚 Giao 2h nội thành TP.HCM, kèm thiệp viết tay miễn phí
🌐 hoatuoithanhngoc.com`;

export async function getNgocResponse(userMessage: string, history: any[] = [], explicitApiKey?: string) {
  // Ưu tiên đọc GROQ_KEY (biến mới né cache Cloudflare), sau đó mới tới GROQ_API_KEY
  const apiKey = explicitApiKey || process.env.GROQ_KEY || process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("LỖI: Không tìm thấy GROQ_KEY");
    // Debugging: return keys of process.env to see what's available
    const envKeys = Object.keys(process.env || {}).join(", ");
    return { 
      reply: `Ngọc đang gặp chút vấn đề về kết nối AI. (Không tìm thấy Key trong context. Debug env: ${envKeys})`, 
      products: [] 
    };
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
    }),
  });

  const json = await res.json();
  if (!res.ok || !json?.choices?.[0]?.message?.content) {
    const errorMsg = json?.error?.message || JSON.stringify(json);
    return { 
      reply: `Ngọc chưa nghe rõ, bạn nói lại nhé 🌸 (Lỗi AI: ${res.status}. Chi tiết: ${errorMsg}. Key đang dùng: ${apiKey ? apiKey.substring(0, 10) + '...' : 'Rỗng'})`, 
      products: [] 
    };
  }

  const reply = json.choices[0].message.content;

  // Chỉ lấy sản phẩm khi AI reply có [SLUG:...] — tránh gửi ảnh mọi lúc
  const slugRegex = /\[SLUG:([^\]]+)\]/g;
  const matchedSlugs: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = slugRegex.exec(reply)) !== null) {
    if (!matchedSlugs.includes(m[1])) matchedSlugs.push(m[1]);
  }

  const matchedProducts = matchedSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p !== null && p !== undefined)
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      thumb: p.thumb,
      price: formatPrice(p.price),
      short: p.short,
    }));

  return { reply, products: matchedProducts };
}
