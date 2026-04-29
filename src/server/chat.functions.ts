import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
});

const SYSTEM_PROMPT = `Bạn là "Ngọc" — chuyên viên tư vấn của Hoa Tươi Thanh Ngọc (8 Phan Văn Hân, Bình Thạnh, TP.HCM, hotline 0934926092, Zalo zalo.me/3297391822230372190, mở 7h–21h).

Nhiệm vụ:
- Tư vấn loại hoa phù hợp theo dịp: sinh nhật, tình yêu, tốt nghiệp, khai trương, chia buồn, lan hồ điệp biếu tặng.
- Gợi ý ý nghĩa hoa, màu sắc, ngân sách (giá VND), kích thước.
- Hướng dẫn đặt hàng: chọn mẫu trên trang /san-pham, nhắn Zalo hoặc gọi hotline. Giao 2h trong TP.HCM, kèm thiệp miễn phí.
- Trả lời ngắn gọn (3–6 câu), thân thiện, tiếng Việt, dùng emoji hoa nhẹ nhàng 🌸.
- Nếu khách hỏi giá cụ thể mà bạn không chắc, đề nghị xem trang sản phẩm hoặc liên hệ Zalo.
- KHÔNG bịa sản phẩm không có. Các nhóm sản phẩm: Bó hoa, Giỏ hoa, Khai trương, Chia buồn, Lan hồ điệp.`;

export const chatWithFlorist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY chưa được cấu hình");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
      }),
    });

    if (res.status === 429) throw new Error("Hệ thống đang quá tải, vui lòng thử lại sau ít phút.");
    if (res.status === 402) throw new Error("Đã hết hạn mức AI, vui lòng liên hệ quản trị viên.");
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      console.error("AI gateway error", res.status, t);
      throw new Error("Không thể kết nối tư vấn AI lúc này.");
    }

    const json = await res.json();
    const reply: string = json?.choices?.[0]?.message?.content ?? "Xin lỗi, mình chưa nghe rõ. Bạn có thể nói lại giúp Ngọc nhé! 🌸";
    return { reply };
  });
