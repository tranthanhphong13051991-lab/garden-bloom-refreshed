import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const checkAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ password: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const correct = process.env.ADMIN_PASSWORD || "thanhnoc2024";
    return { ok: data.password === correct };
  });

const ANALYZE_PROMPT = `Bạn là chuyên gia SEO và tư vấn hoa tươi cho shop "Hoa Tươi Thanh Ngọc" (Bình Thạnh, TP.HCM).

Phân tích ảnh sản phẩm hoa này và trả về JSON object (KHÔNG có text nào khác, KHÔNG có markdown):

{
  "name": "Tên tiếng Việt ngắn gọn hấp dẫn (3-6 từ, Hoa đầu mỗi từ, ví dụ: Bó Hoa Hồng Kem Tinh Tế)",
  "category": "bo-hoa | gio-hoa | khai-truong | chia-buon | lan-ho-diep | hoa-lua",
  "short": "1 câu tiếng Việt, đề cập 'Thanh Ngọc', nêu màu sắc/loài hoa nổi bật và dịp phù hợp (tối đa 120 ký tự)",
  "description": "2-3 câu tiếng Việt chi tiết: loài hoa, màu sắc, thiết kế, dịp phù hợp. Câu cuối phải là: Giao 2 giờ tại TP.HCM.",
  "keywords": ["5-7 từ khóa SEO tiếng Việt, bao gồm 1 keyword có chữ tphcm"],
  "badge": "Bán chạy" hoặc "Nổi bật" hoặc null,
  "colorNames": ["tên màu chính tiếng Việt nhìn thấy trong ảnh"]
}

PHÂN LOẠI category:
- bo-hoa: Bó hoa cầm tay, có giấy gói, thường tròn hoặc dài
- gio-hoa: Hoa đặt trong giỏ mây, hộp, lẵng
- khai-truong: Kệ hoa đứng cao 1-2 tầng, dùng khai trương/sự kiện
- chia-buon: Hoa chia buồn/tang lễ, màu trắng/nhạt, lẵng nghiêm trang
- lan-ho-diep: Chậu lan hồ điệp (phalaenopsis)
- hoa-lua: Hoa giả/hoa lụa nhân tạo, không phải hoa tươi, thường bày trí nội thất

Không cần trả về giá — shop không hiển thị giá trên web.`;

export const analyzeProductImage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        base64: z.string().max(3_000_000),
        mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
        filename: z.string(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY chưa được cấu hình");

    const dataUrl = `data:${data.mimeType};base64,${data.base64}`;

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        max_tokens: 900,
        temperature: 0.3,
        messages: [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: { url: dataUrl } },
              { type: "text", text: ANALYZE_PROMPT },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      throw new Error(`Groq API lỗi ${res.status}: ${t.slice(0, 300)}`);
    }

    const json = await res.json();
    const raw: string = json?.choices?.[0]?.message?.content ?? "{}";
    const cleaned = raw.replace(/```json\n?|```\n?/g, "").trim();

    try {
      const p = JSON.parse(cleaned);
      return {
        ok: true as const,
        filename: data.filename,
        name: String(p.name ?? "Sản phẩm mới"),
        category: String(p.category ?? "bo-hoa"),
        short: String(p.short ?? ""),
        description: String(p.description ?? ""),
        keywords: Array.isArray(p.keywords) ? (p.keywords as string[]) : [],
        badge: p.badge && p.badge !== "null" ? String(p.badge) : null,
        colorNames: Array.isArray(p.colorNames) ? (p.colorNames as string[]) : [],
      };
    } catch {
      return {
        ok: false as const,
        filename: data.filename,
        error: `Không parse được JSON: ${cleaned.slice(0, 200)}`,
      };
    }
  });
