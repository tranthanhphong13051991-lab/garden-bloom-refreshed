import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const checkAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ password: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const correct = process.env.ADMIN_PASSWORD;
    if (!correct) return { ok: false };
    return { ok: data.password === correct };
  });

const ANALYZE_PROMPT = `Bạn là chuyên gia SEO và tư vấn hoa tươi cho shop "Hoa Tươi Thanh Ngọc" (Bình Thạnh, TP.HCM).

NHIỆM VỤ: Phân tích ẢNH sản phẩm hoa và trả về JSON. QUAN TRỌNG: Phải XEM KỸ ẢNH để xác định đúng category, KHÔNG SUY DIỄN.

QUY TẮC PHÂN LOẠI category — ĐỌC KỸ VÀ TUÂN THỦ NGHIÊM NGẶT:
1. "bo-hoa" (Bó hoa): Hoa được CẦM TAY, có GIẤY GÓI/GIẤY BÓC bên ngoài, dáng bó tròn/dài, có tay cầm
2. "gio-hoa" (Giỏ hoa): Hoa nằm trong GIỎ MÂY, HỘP QUÀ, LẴNG ĐAN — nhìn thấy rõ vật chứa bên dưới hoa
3. "khai-truong" (Kệ hoa khai trương): Kệ hoa ĐỨNG CAO (1-2 tầng, cao hơn người), có chân kệ/chân đế, đặt sảnh/cửa
4. "chia-buon" (Chia buồn): Hoa màu TRẮNG/NHẠT chủ đạo, lẵng/lá kèm nghiêm trang, băng tang
5. "lan-ho-diep" (Lan hồ điệp): Nhìn thấy CHẬU LAN với thân cao, nhiều bông xếp dọc thân, lá to bản

⚠️ CẢNH BÁO:
- KHÔNG bao giờ mặc định là "bo-hoa" nếu không chắc chắn — hãy xem kỹ ẢNH
- Nếu ảnh chụp một GIỎ hoa → category phải là "gio-hoa"
- Nếu ảnh chụp KỆ hoa cao → category phải là "khai-truong"
- Tên sản phẩm phải PHẢN ÁNH ĐÚNG category: nếu là giỏ hoa → tên bắt đầu bằng "Giỏ Hoa", nếu là kệ → tên bắt đầu bằng "Kệ Hoa"

Trả về JSON (KHÔNG markdown, KHÔNG text thừa):
{
  "name": "Tên tiếng Việt bắt đầu bằng đúng loại sản phẩm (3-6 từ, ví dụ: Kệ Hoa Khai Trương Thịnh Vượng)",
  "category": "bo-hoa | gio-hoa | khai-truong | chia-buon | lan-ho-diep",
  "short": "1 câu tiếng Việt (tối đa 120 ký tự), nêu rõ loại sản phẩm + màu sắc + dịp phù hợp",
  "description": "2-3 câu tiếng Việt chi tiết: loại sản phẩm, loài hoa, màu sắc, thiết kế, dịp phù hợp. Kết thúc bằng: Giao 2 giờ tại TP.HCM.",
  "keywords": ["5-7 từ khóa SEO tiếng Việt", "bao gồm từ khóa đúng loại sản phẩm"],
  "badge": "Bán chạy" hoặc "Nổi bật" hoặc null,
  "colorNames": ["màu chính trong ảnh"]
}`;

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
