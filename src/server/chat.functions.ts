import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PRODUCTS, formatPrice } from "@/data/products";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
});

const SYSTEM_PROMPT = `Mày tên Ngọc, nhân viên tư vấn tại Hoa Tươi Thanh Ngọc — tiệm hoa ở 8 Phan Văn Hân, Bình Thạnh, TP.HCM.
Mày đang chat với khách trên website, nói chuyện tự nhiên như người thật, KHÔNG phải robot.

CÁCH NÓI CHUYỆN:
- Xưng "mình", gọi khách là "bạn" hoặc "anh/chị"
- Ngắn gọn, tự nhiên — tối đa 3 câu, không bullet point
- Chỉ hỏi 1 câu mỗi lần, không hỏi dồn
- Được dùng emoji hoa nhẹ nhàng 🌸

SẢN PHẨM ĐANG CÓ (chỉ tư vấn đúng tên, không nói giá):
Bó hoa hồng: Hồng Kem Tinh Tế, Hồng Kem Classic, Hồng Kem Sang Trọng, Hồng Kem Mix Trắng, Hồng Kem Tròn Đầy, Hồng Tươi Thắm, Hồng Phấn Lãng Mạn, Hồng Đỏ Nồng Nàn, Bó Hoa Tươi Ngày Vui
Bó mix: Mix Pastel Ngọt Ngào, Mix Trắng Tím Dịu Dàng, Mix Tông Ấm Rực Rỡ, Mix Sắc Mát Tươi Sáng
Giỏ hoa: Giỏ Hoa Trắng Xanh Thanh Nhã
Khai trương: Kệ Hoa Khai Trương Thịnh Vượng (giao và lắp đặt tận nơi miễn phí)
Chia buồn: Lẵng Hoa Lys Bạch Hợp (kèm băng tang theo yêu cầu)
Lan hồ điệp: Chậu Lan Hồ Điệp Trắng Quý Phái

THÔNG TIN SHOP:
Địa chỉ: 8 Phan Văn Hân, Phường 19, Bình Thạnh, TP.HCM (có Google Maps)
Hotline: 0934 926 092 hoặc 0866 086 574
Mở 7:00–21:00 tất cả các ngày
Giao hàng 2 giờ nội thành TP.HCM, kèm thiệp viết tay miễn phí
Xem toàn bộ sản phẩm tại: hoatuoithanhngoc.com`;

export const chatWithFlorist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY chưa được cấu hình");

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (res.status === 429) throw new Error("Hệ thống đang quá tải, vui lòng thử lại sau ít phút.");
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      console.error("Groq API error", res.status, t);
      throw new Error("Không thể kết nối tư vấn AI lúc này.");
    }

    const json = await res.json();
    const reply: string = json?.choices?.[0]?.message?.content ?? "Xin lỗi, mình chưa nghe rõ. Bạn có thể nói lại giúp Ngọc nhé! 🌸";

    // Tìm sản phẩm từ reply (tìm tên sản phẩm trong text)
    const text = reply.toLowerCase();
    const matchedProducts = PRODUCTS.filter((p) => {
      const searchText = [p.name, ...p.keywords, ...p.occasions, p.category, ...p.colors.map((c) => c.name)].join(" ").toLowerCase();
      return searchText.split(/\s+/).some((term) => term.length > 2 && text.includes(term));
    }).slice(0, 3);

    const products = matchedProducts.length > 0
      ? matchedProducts.map((p) => ({
          slug: p.slug,
          name: p.name,
          thumb: p.thumb,
          price: formatPrice(p.price),
          short: p.short,
        }))
      : undefined;

    return { reply, products };
  });