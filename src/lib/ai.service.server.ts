import { PRODUCTS, formatPrice } from "@/data/products";

const PRODUCT_CATALOG = PRODUCTS.map(
  (p) => `- ${p.slug} | ${p.name} | ${p.category} | ${p.short}`,
).join("\n");

const ALLOWED_SLUGS = PRODUCTS.map((p) => p.slug);

export const SYSTEM_PROMPT = `Mày tên Ngọc, nhân viên tư vấn tại Hoa Tươi Thanh Ngọc (8 Phan Văn Hân, Bình Thạnh, TP.HCM).

CÁCH NÓI:
- Xưng "mình", gọi "bạn/anh/chị". Tự nhiên, ngắn gọn (tối đa 3 câu).
- Được dùng emoji hoa nhẹ 🌸. Không bullet point.
- KHÔNG bao giờ báo giá cụ thể. Khách hỏi giá → hướng Zalo 0934 926 092.

KHI NÀO GỢI Ý SẢN PHẨM (gọi tool suggest_products):
- Khách nêu rõ DỊP (sinh nhật, khai trương, chia buồn, kỷ niệm...) hoặc LOẠI HOA (bó hồng, lan hồ điệp, kệ khai trương...) hoặc PHONG CÁCH (pastel, sang trọng, tươi sáng...).
- Chọn TỐI ĐA 3 sản phẩm phù hợp nhất từ danh sách dưới, dùng đúng slug.
- Khi gọi tool, phần text reply chỉ cần 1-2 câu giới thiệu ngắn ("Mình gửi bạn vài mẫu hợp với dịp này nhé 🌸"), KHÔNG liệt kê tên sản phẩm trong text.

KHI NÀO KHÔNG GỌI TOOL:
- Khách chỉ chào hỏi, hỏi địa chỉ/giờ mở cửa/giao hàng/giá → trả lời text bình thường, không gọi tool.

DANH SÁCH SẢN PHẨM (slug | tên | category | mô tả ngắn):
${PRODUCT_CATALOG}

THÔNG TIN SHOP:
- Địa chỉ: 8 Phan Văn Hân, P.19, Bình Thạnh, TP.HCM
- Hotline/Zalo: 0934 926 092 hoặc 0866 086 574
- Mở 7:00–21:00 mỗi ngày, giao 2 giờ nội thành, kèm thiệp viết tay miễn phí.`;

const SUGGEST_TOOL = {
  type: "function" as const,
  function: {
    name: "suggest_products",
    description:
      "Gợi ý 1-3 sản phẩm hoa phù hợp với nhu cầu của khách. Chỉ dùng slug có trong danh sách sản phẩm đã cho.",
    parameters: {
      type: "object",
      properties: {
        slugs: {
          type: "array",
          description: "Danh sách slug sản phẩm gợi ý (1-3 cái)",
          items: { type: "string", enum: ALLOWED_SLUGS },
          minItems: 1,
          maxItems: 3,
        },
      },
      required: ["slugs"],
      additionalProperties: false,
    },
  },
};

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function getNgocResponse(userMessage: string, history: ChatMessage[] = []) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return {
      reply:
        "Ngọc đang gặp chút vấn đề kết nối AI. Bạn nhắn Zalo 0934 926 092 để được tư vấn ngay nhé 🌸",
      products: [],
    };
  }

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
        ...history,
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      tools: [SUGGEST_TOOL],
      tool_choice: "auto",
    }),
  });

  if (!res.ok) {
    return {
      reply:
        "Ngọc đang bận chút xíu, bạn nhắn Zalo 0934 926 092 để được tư vấn ngay nhé 🌸",
      products: [],
    };
  }

  const json = await res.json();
  const message = json?.choices?.[0]?.message;
  let reply: string = message?.content?.trim() || "";

  // Lấy slug từ tool_call (nếu có)
  let slugs: string[] = [];
  const toolCalls = message?.tool_calls;
  if (Array.isArray(toolCalls) && toolCalls.length > 0) {
    for (const call of toolCalls) {
      if (call?.function?.name === "suggest_products") {
        try {
          const args = JSON.parse(call.function.arguments || "{}");
          if (Array.isArray(args.slugs)) slugs.push(...args.slugs);
        } catch {
          // ignore parse error
        }
      }
    }
  }

  // Validate slug + dedupe + max 3
  const seen = new Set<string>();
  const validSlugs = slugs
    .filter((s) => typeof s === "string" && ALLOWED_SLUGS.includes(s))
    .filter((s) => (seen.has(s) ? false : (seen.add(s), true)))
    .slice(0, 3);

  const products = validSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug)!)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      thumb: p.thumb,
      price: formatPrice(p.price),
      short: p.short,
    }));

  // Nếu có gợi ý sản phẩm nhưng reply rỗng → fallback caption
  if (products.length > 0 && !reply) {
    reply = "Mình gửi bạn vài mẫu hợp dịp này nhé 🌸";
  }
  if (!reply) {
    reply = "Ngọc chưa nghe rõ, bạn nói lại nhé 🌸";
  }

  return { reply, products };
}
