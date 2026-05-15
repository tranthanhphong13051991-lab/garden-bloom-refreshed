import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const checkAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ password: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const correct = process.env.ADMIN_PASSWORD;
    if (!correct) return { ok: false };
    return { ok: data.password === correct };
  });

const CATEGORIES = ["bo-hoa", "gio-hoa", "khai-truong", "chia-buon", "lan-ho-diep"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_PREFIX: Record<Category, string> = {
  "bo-hoa": "Bó Hoa",
  "gio-hoa": "Giỏ Hoa",
  "khai-truong": "Kệ Hoa Khai Trương",
  "chia-buon": "Hoa Chia Buồn",
  "lan-ho-diep": "Lan Hồ Điệp",
};

const ANALYZE_PROMPT = `Bạn là chuyên gia SEO và tư vấn hoa tươi cho shop "Hoa Tươi Thanh Ngọc" (Bình Thạnh, TP.HCM).

NHIỆM VỤ: Xem kỹ ẢNH sản phẩm hoa, mô tả dấu hiệu thị giác và trả về JSON thuần. Không markdown, không giải thích ngoài JSON.

QUY TẮC PHÂN LOẠI suggestedCategory:
1. "bo-hoa": hoa dạng bó cầm tay, có giấy gói/giấy bọc, có tay cầm, dáng bó tròn hoặc bó dài.
2. "gio-hoa": hoa nằm trong giỏ mây, hộp quà, lẵng thấp, khay hoặc vật chứa nhìn rõ bên dưới hoa.
3. "khai-truong": kệ hoa đứng cao, có chân kệ/chân đế, bố cục 1-2 tầng, dùng cho sảnh/cửa hàng/sự kiện.
4. "chia-buon": hoa viếng/tang lễ, tone trắng hoặc nhạt chủ đạo, bố cục trang nghiêm, có thể có băng tang.
5. "lan-ho-diep": chậu lan hồ điệp, có thân/cành lan cao, bông xếp dọc thân, lá lan to bản, chậu trang trí.

QUY TẮC ĐẶT TÊN SEO:
- seoName phải là tiếng Việt, 4-8 từ, dễ bán hàng, đúng loại sản phẩm và dịp phù hợp.
- Prefix phải khớp category: Bó Hoa, Giỏ Hoa, Kệ Hoa Khai Trương, Hoa Chia Buồn, Lan Hồ Điệp.
- Ưu tiên từ khóa như sinh nhật, khai trương, chia buồn, tông màu, sang trọng, pastel, hồng trắng.

Trả về đúng JSON này:
{
  "visualType": "mô tả ngắn dạng sản phẩm nhìn thấy trong ảnh",
  "container": "giấy gói | giỏ | hộp | lẵng | kệ đứng | chậu lan | băng tang | không rõ",
  "occasion": "sinh nhật | khai trương | chia buồn | kỷ niệm | biếu tặng | không rõ",
  "mainColors": ["màu chính trong ảnh"],
  "flowers": ["loài hoa chính nếu nhận ra"],
  "suggestedCategory": "bo-hoa | gio-hoa | khai-truong | chia-buon | lan-ho-diep",
  "seoName": "Tên sản phẩm SEO đúng prefix",
  "short": "1 câu tiếng Việt tối đa 120 ký tự, nêu loại sản phẩm + màu sắc + dịp phù hợp",
  "description": "2-3 câu tiếng Việt: loại sản phẩm, loài hoa, màu sắc, thiết kế, dịp phù hợp. Kết thúc bằng: Giao 2 giờ tại TP.HCM.",
  "keywords": ["5-7 từ khóa SEO tiếng Việt"],
  "badge": "Bán chạy" hoặc "Nổi bật" hoặc null
}`;

const normalizeText = (value: unknown) =>
  String(value ?? "")
    .normalize("NFC")
    .trim()
    .replace(/\s+/g, " ");

const normalizeCategory = (value: unknown): Category | null => {
  const raw = normalizeText(value).toLowerCase();
  return CATEGORIES.find((category) => category === raw) ?? null;
};

const toStringArray = (value: unknown) =>
  Array.isArray(value)
    ? value.map((item) => normalizeText(item)).filter(Boolean)
    : [];

const stripVietnameseMarks = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();

const hasAny = (text: string, terms: string[]) =>
  terms.some((term) => text.includes(stripVietnameseMarks(term)));

const inferCategoryFromSignals = (p: Record<string, unknown>): Category | null => {
  const signalText = stripVietnameseMarks(
    [
      p.visualType,
      p.container,
      p.occasion,
      p.seoName,
      p.name,
      p.short,
      p.description,
      ...toStringArray(p.mainColors),
      ...toStringArray(p.colorNames),
      ...toStringArray(p.flowers),
      ...toStringArray(p.keywords),
    ]
      .map(normalizeText)
      .join(" "),
  );

  if (hasAny(signalText, ["lan ho diep", "chau lan", "canh lan", "than lan", "la lan"])) {
    return "lan-ho-diep";
  }
  if (hasAny(signalText, ["ke dung", "chan ke", "ke hoa", "khai truong", "su kien", "sanh", "cua hang"])) {
    return "khai-truong";
  }
  if (hasAny(signalText, ["bang tang", "hoa vieng", "tang le", "chia buon", "phan uu"])) {
    return "chia-buon";
  }
  if (hasAny(signalText, ["gio hoa", "gio may", "gio dan", "hop hoa", "hop qua", "lang hoa", "lang dan", "khay hoa", "vat chua"])) {
    return "gio-hoa";
  }
  if (hasAny(signalText, ["giay goi", "giay boc", "bo cam tay", "tay cam", "dang bo", "bo hoa"])) {
    return "bo-hoa";
  }
  if (hasAny(signalText, ["trang", "nhat", "trang nghiem"]) && hasAny(signalText, ["vieng", "le", "tang"])) {
    return "chia-buon";
  }

  return null;
};

const CATEGORY_PREFIX_PATTERNS: Record<Category, RegExp> = {
  "bo-hoa": /^(bó|bo)\s+hoa\s+/i,
  "gio-hoa": /^(giỏ|gio)\s+hoa\s+/i,
  "khai-truong": /^kệ\s+hoa\s+khai\s+trương\s+|^ke\s+hoa\s+khai\s+truong\s+/i,
  "chia-buon": /^hoa\s+chia\s+buồn\s+|^hoa\s+chia\s+buon\s+/i,
  "lan-ho-diep": /^lan\s+hồ\s+điệp\s+|^lan\s+ho\s+diep\s+/i,
};

const GENERIC_PREFIX = /^(bó|bo|giỏ|gio|kệ|ke)\s+hoa\s+|^hoa\s+chia\s+(buồn|buon)\s+|^lan\s+(hồ\s+điệp|ho\s+diep)\s+/i;

const buildSeoName = (rawName: unknown, category: Category, p: Record<string, unknown>) => {
  const prefix = CATEGORY_PREFIX[category];
  const name = normalizeText(rawName) || normalizeText(p.name);

  if (CATEGORY_PREFIX_PATTERNS[category].test(name)) return name;

  const suffixFromName = name.replace(GENERIC_PREFIX, "").trim();
  const fallbackParts = [
    normalizeText(p.occasion).replace(/không rõ/i, ""),
    ...toStringArray(p.mainColors).slice(0, 2),
    normalizeText(p.visualType),
  ].filter(Boolean);
  const suffix = suffixFromName || fallbackParts.join(" ");
  const cleanedSuffix = suffix.replace(GENERIC_PREFIX, "").trim();

  return normalizeText(`${prefix} ${cleanedSuffix || "Sang Trọng"}`);
};

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
        max_tokens: 1000,
        temperature: 0.2,
        response_format: { type: "json_object" },
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
      const parsed = typeof p === "object" && p !== null ? (p as Record<string, unknown>) : {};
      const inferredCategory = inferCategoryFromSignals(parsed);
      const suggestedCategory = normalizeCategory(parsed.suggestedCategory ?? parsed.category);
      const category = inferredCategory ?? suggestedCategory;

      if (!category) {
        return {
          ok: false as const,
          filename: data.filename,
          error:
            "AI chưa xác định được danh mục hợp lệ. Vui lòng phân tích lại hoặc chỉnh ảnh rõ hơn.",
        };
      }

      const name = buildSeoName(parsed.seoName ?? parsed.name, category, parsed);
      const mainColors = toStringArray(parsed.mainColors);
      const colorNames = mainColors.length > 0 ? mainColors : toStringArray(parsed.colorNames);
      const keywords = toStringArray(parsed.keywords);
      const badge = normalizeText(parsed.badge);

      return {
        ok: true as const,
        filename: data.filename,
        name,
        category,
        short: normalizeText(parsed.short),
        description: normalizeText(parsed.description),
        keywords,
        badge: badge && badge.toLowerCase() !== "null" ? badge : null,
        colorNames,
      };
    } catch {
      return {
        ok: false as const,
        filename: data.filename,
        error: `Không parse được JSON: ${cleaned.slice(0, 200)}`,
      };
    }
  });
