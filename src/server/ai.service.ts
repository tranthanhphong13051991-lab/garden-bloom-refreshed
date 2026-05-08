import { PRODUCTS, formatPrice } from "@/data/products";

export const SYSTEM_PROMPT = `Mày tên Ngọc, nhân viên tư vấn tại Hoa Tươi Thanh Ngọc (8 Phan Văn Hân, Bình Thạnh).
Nói chuyện tự nhiên, xưng "mình" gọi "bạn/anh/chị". Ngắn gọn (max 3 câu). 
KHÔNG báo giá cụ thể, hướng khách Zalo 0934 926 092 để tư vấn đúng mẫu.
Khi gợi ý sản phẩm, chỉ nêu tên.`;

export async function getNgocResponse(userMessage: string, history: any[] = []) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("LỖI: Không tìm thấy GROQ_API_KEY");
    // Debugging: return keys of process.env to see what's available
    const envKeys = Object.keys(process.env || {}).join(", ");
    return { 
      reply: `Ngọc đang gặp chút vấn đề về kết nối AI. (Debug env keys: ${envKeys})`, 
      products: [] 
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
    }),
  });

  const json = await res.json();
  const reply = json?.choices?.[0]?.message?.content || "Ngọc chưa nghe rõ, bạn nói lại nhé 🌸";

  // Logic tìm sản phẩm gợi ý
  const text = reply.toLowerCase();
  const matchedProducts = PRODUCTS.filter((p) => {
    const searchText = [p.name, ...p.keywords, p.category].join(" ").toLowerCase();
    return searchText.split(/\s+/).some((term) => term.length > 2 && text.includes(term));
  }).slice(0, 3).map(p => ({
    slug: p.slug,
    name: p.name,
    thumb: p.thumb,
    price: formatPrice(p.price),
    short: p.short
  }));

  return { reply, products: matchedProducts };
}
