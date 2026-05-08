// Zalo Bot - Hoa Tuoi Thanh Ngoc
// Version 2 - Dong bo voi Web ChatBot
const SYSTEM_PROMPT = `Mày tên Ngọc, nhân viên tư vấn tại Hoa Tươi Thanh Ngọc — tiệm hoa ở 8 Phan Văn Hân, Bình Thạnh, TP.HCM.
Mày đang chat với khách trên Zalo, NÓI NHƯ NGƯỜI THẬT.

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
- Hướng khách gọi trực tiếp 0934 926 092 để được báo giá

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

// Product catalog for Zalo card sending
const PRODUCT_CATALOG = [
  { slug: "bo-hoa-hong-kem-tinh-te", name: "Bó Hoa Hồng Kem Tinh Tế", price: "650k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-800.webp" },
  { slug: "bo-hoa-hong-kem-tinh-te-classic", name: "Bó Hoa Hồng Kem Tinh Tế Classic", price: "680k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-33-800.webp" },
  { slug: "bo-hoa-hong-kem-sang-trong", name: "Bó Hoa Hồng Kem Sang Trọng", price: "850k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-37-800.webp" },
  { slug: "bo-hoa-hong-kem-mix-trang", name: "Bó Hoa Hồng Kem Mix Trắng", price: "700k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-41-800.webp" },
  { slug: "bo-hoa-hong-kem-tron-day", name: "Bó Hoa Hồng Kem Tròn Đầy", price: "720k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-44-800.webp" },
  { slug: "bo-hoa-hong-tuoi-tham", name: "Bó Hoa Hồng Tươi Thắm", price: "550k", img: "https://hoatuoithanhngoc.com/image/responsive/bo-hong-800.webp" },
  { slug: "bo-hoa-hong-phan-lang-man", name: "Bó Hoa Hồng Phấn Lãng Mạn", price: "580k", img: "https://hoatuoithanhngoc.com/image/responsive/bo-hong-1-800.webp" },
  { slug: "bo-hoa-hong-do-nong-nan", name: "Bó Hoa Hồng Đỏ Nồng Nàn", price: "600k", img: "https://hoatuoithanhngoc.com/image/responsive/bo-hong1-800.webp" },
  { slug: "bo-hoa-tuoi-ngay-vui", name: "Bó Hoa Tươi Ngày Vui", price: "500k", img: "https://hoatuoithanhngoc.com/image/responsive/bo-hoa-800.webp" },
  { slug: "bo-hoa-mix-pastel-ngot-ngao", name: "Bó Hoa Mix Pastel Ngọt Ngào", price: "580k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa1-29-800.webp" },
  { slug: "bo-hoa-mix-trang-tim-diu-dang", name: "Bó Hoa Mix Trắng Tím Dịu Dàng", price: "600k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa1-33-800.webp" },
  { slug: "bo-hoa-mix-tong-am-ruc-ro", name: "Bó Hoa Mix Tông Ấm Rực Rỡ", price: "620k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa1-38-800.webp" },
  { slug: "bo-hoa-mix-sac-mat-tuoi-sang", name: "Bó Hoa Mix Sắc Mát Tươi Sáng", price: "590k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa1-43-800.webp" },
  { slug: "bo-hoa-hong-cam-quyen-ru", name: "Bó Hoa Hồng Cam Quyến Rũ", price: "650k", img: "https://hoatuoithanhngoc.com/image/responsive/img3474-800.webp" },
  { slug: "gio-hoa-trang-xanh-thanh-nha", name: "Giỏ Hoa Trắng Xanh Thanh Nhã", price: "750k", img: "https://hoatuoithanhngoc.com/image/responsive/gio-hoa-trang-xanh-thanh-nha-800.webp" },
  { slug: "ke-hoa-khai-truong-thinh-vuong", name: "Kệ Hoa Khai Trương Thịnh Vượng", price: "980k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-khai-truong-thinh-vuong-800.webp" },
  { slug: "ke-hoa-khai-truong-hong-pastel-duyen-dang", name: "Kệ Hoa Khai Trương Hồng Pastel", price: "1.5tr", img: "https://hoatuoithanhngoc.com/image/responsive/img3449-800.webp" },
  { slug: "ke-hoa-khai-truong-vang-cam-hop-phong-thuy", name: "Kệ Hoa Khai Trương Vàng Cam", price: "1.8tr", img: "https://hoatuoithanhngoc.com/image/responsive/img3487-800.webp" },
  { slug: "ke-hoa-khai-truong-lan-ho-diep-kem-sang-trong", name: "Kệ Hoa Khai Trương Lan Hồ Điệp Kem", price: "2tr", img: "https://hoatuoithanhngoc.com/image/responsive/img3475-800.webp" },
  { slug: "lang-hoa-chia-buon-lys-bach-hop", name: "Lẵng Hoa Chia Buồn Lys Bạch Hợp", price: "680k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-chia-buon-ly-bach-hop-800.webp" },
  { slug: "chau-lan-ho-diep-trang-quy-phai", name: "Chậu Lan Hồ Điệp Trắng Quý Phái", price: "890k", img: "https://hoatuoithanhngoc.com/image/responsive/lan-ho-diep-trang-quy-phai-800.webp" },
  { slug: "ke-hoa-khai-truong-cuc-dong-tien-thac-do", name: "Kệ Hoa Sự Kiện Cúc Đồng Tiền Thác Đổ", price: "2.5tr", img: "https://hoatuoithanhngoc.com/image/responsive/img3742-800.webp" },
  { slug: "ke-hoa-khai-truong-thien-dieu-lan-trang", name: "Kệ Hoa Khai Trương Thiên Điểu Lan Trắng", price: "2tr", img: "https://hoatuoithanhngoc.com/image/responsive/img3754-800.webp" },
  { slug: "bo-hoa-mix-thanh-lich", name: "Bó Hoa Mix Thanh Lịch", price: "550k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa3-800.webp" },
  { slug: "bo-hoa-hong-nhe-nhang", name: "Bó Hoa Hồng Nhẹ Nhàng", price: "500k", img: "https://hoatuoithanhngoc.com/image/responsive/hoa2-800.webp" },
];

async function sendZaloText(userId, text, oaAccessToken) {
  const res = await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
    method: "POST",
    headers: { "Content-Type": "application/json", access_token: oaAccessToken },
    body: JSON.stringify({
      recipient: { user_id: userId },
      message: { text },
    }),
  });
  const result = await res.json();
  
  // Nếu lỗi token (code -216 hoặc -201), throw để retry
  if (result.error === -216 || result.error === -201) {
    throw new Error("TOKEN_EXPIRED");
  }
  
  return result;
}

async function sendZaloProductCard(userId, product, oaAccessToken) {
  try {
    await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
      method: "POST",
      headers: { "Content-Type": "application/json", access_token: oaAccessToken },
      body: JSON.stringify({
        recipient: { user_id: userId },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "list",
              elements: [
                {
                  title: product.name,
                  subtitle: `Giá: ${product.price} - Xem chi tiết tại hoatuoithanhngoc.com`,
                  image_url: product.img,
                  default_action: {
                    type: "oa.open.url",
                    url: `https://hoatuoithanhngoc.com/san-pham/${product.slug}`,
                  },
                },
              ],
            },
          },
        },
      }),
    });
  } catch (err) {
    console.error("Zalo send card error:", err);
  }
}

async function refreshZaloToken(env) {
  const refreshToken = await env.BOT_STORAGE?.get("ZALO_REFRESH_TOKEN") || env.ZALO_OA_REFRESH_TOKEN;
  const appId = env.ZALO_APP_ID;
  const secretKey = env.ZALO_APP_SECRET;

  if (!refreshToken || !appId || !secretKey) {
    console.error("Missing Zalo refresh credentials");
    return null;
  }

  try {
    const res = await fetch("https://oauth.zaloapp.com/v4/oa/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        secret_key: secretKey,
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        app_id: appId,
        grant_type: "refresh_token",
      }),
    });

    const data = await res.json();
    if (data.access_token) {
      if (env.BOT_STORAGE) {
        await env.BOT_STORAGE.put("ZALO_ACCESS_TOKEN", data.access_token);
        await env.BOT_STORAGE.put("ZALO_REFRESH_TOKEN", data.refresh_token);
      }
      return data.access_token;
    }
  } catch (err) {
    console.error("Refresh Zalo Token Error:", err);
  }
  return null;
}

async function getAIReply(message, groqKey) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${groqKey}`,
      "Content-Type": "application/json",
      "User-Agent": "ZaloBot/1.0",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
    }),
  });

  const json = await res.json();
  if (!res.ok || !json?.choices?.[0]?.message?.content) {
    const errorMsg = json?.error?.message || JSON.stringify(json);
    throw new Error(`AI Error: ${res.status} - ${errorMsg}`);
  }
  return json.choices[0].message.content;
}

export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      try {
        const data = await request.json();
        if (data.event_name === "user_send_text") {
          const userId = data.sender?.id;
          const userMessage = data.message?.text;
          
          // Hỗ trợ cả GROQ_KEY và GROQ_API_KEY
          const groqKey = env.GROQ_KEY || env.GROQ_API_KEY;
          
          // Lấy token từ KV trước, fallback env
          let oaToken = await env.BOT_STORAGE?.get("ZALO_ACCESS_TOKEN") || env.ZALO_OA_ACCESS_TOKEN;

          if (!userId || !oaToken) {
            console.error("Missing userId or oaToken");
            return new Response("OK");
          }

          if (!groqKey) {
            await sendZaloText(userId, "Ngọc chưa có chìa khóa AI, xin lỗi bạn nha. Bạn có thể gọi 0934 926 092 để được tư vấn trực tiếp nhé 🌸", oaToken);
            return new Response("OK");
          }

          try {
            // Gọi AI
            const reply = await getAIReply(userMessage, groqKey);

            // Parse SLUG từ reply để gửi card sản phẩm
            const slugRegex = /\[SLUG:([^\]]+)\]/g;
            const matchedSlugs = [];
            let m;
            while ((m = slugRegex.exec(reply)) !== null) {
              if (!matchedSlugs.includes(m[1])) matchedSlugs.push(m[1]);
            }

            // Xóa [SLUG:...] khỏi reply
            const cleanReply = reply.replace(/\[SLUG:[^\]]+\]/g, "").replace(/\s+/g, " ").trim();

            // Gửi text
            await sendZaloText(userId, cleanReply, oaToken);

            // Gửi card sản phẩm kèm ảnh
            for (const slug of matchedSlugs.slice(0, 3)) {
              const product = PRODUCT_CATALOG.find((p) => p.slug === slug);
              if (product) {
                await new Promise((r) => setTimeout(r, 500));
                await sendZaloProductCard(userId, product, oaToken);
              }
            }
          } catch (err) {
            // Nếu lỗi token, tự động refresh và thử lại
            if (err.message === "TOKEN_EXPIRED") {
              console.log("Zalo token expired, refreshing...");
              const newToken = await refreshZaloToken(env);
              if (newToken) {
                oaToken = newToken;
                const reply = await getAIReply(userMessage, groqKey);
                await sendZaloText(userId, reply.replace(/\[SLUG:[^\]]+\]/g, "").replace(/\s+/g, " ").trim(), oaToken);
              }
            } else {
              console.error("Zalo Bot processing error:", err);
              await sendZaloText(userId, "Ngọc xin lỗi, mình đang gặp chút trục trặc. Bạn vui lòng thử lại sau hoặc gọi 0934 926 092 để được hỗ trợ nhanh nhất nha 🌸", oaToken);
            }
          }
        }
      } catch (err) {
        console.error("Zalo Bot Error:", err);
      }
    }
    return new Response("OK");
  },
};