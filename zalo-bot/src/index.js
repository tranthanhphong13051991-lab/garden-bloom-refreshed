const APP_ID = "4391377450967727174";
const APP_SECRET = "P19IPY6jch9PI8tW5f3H";
const OA_SECRET_KEY = "xSKDG97veqFgForb5dFw";

// Product catalog cho Zalo AI (đồng bộ với web chatbot)
const PRODUCT_CATALOG = [
  { slug: "bo-hoa-hong-kem-tinh-te", name: "Bó Hoa Hồng Kem Tinh Tế", price: "650k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-400.webp" },
  { slug: "bo-hoa-hong-kem-tinh-te-classic", name: "Bó Hoa Hồng Kem Tinh Tế Classic", price: "680k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-33-400.webp" },
  { slug: "bo-hoa-hong-kem-sang-trong", name: "Bó Hoa Hồng Kem Sang Trọng", price: "850k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-37-400.webp" },
  { slug: "bo-hoa-hong-kem-mix-trang", name: "Bó Hoa Hồng Kem Mix Trắng", price: "700k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-41-400.webp" },
  { slug: "bo-hoa-hong-kem-tron-day", name: "Bó Hoa Hồng Kem Tròn Đầy", price: "720k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-hong-kem-tinh-te-webp-44-400.webp" },
  { slug: "bo-hoa-hong-tuoi-tham", name: "Bó Hoa Hồng Tươi Thắm", price: "550k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/bo-hong-400.webp" },
  { slug: "bo-hoa-hong-phan-lang-man", name: "Bó Hoa Hồng Phấn Lãng Mạn", price: "580k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/bo-hong-1-400.webp" },
  { slug: "bo-hoa-hong-do-nong-nan", name: "Bó Hoa Hồng Đỏ Nồng Nàn", price: "600k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/bo-hong1-400.webp" },
  { slug: "bo-hoa-tuoi-ngay-vui", name: "Bó Hoa Tươi Ngày Vui", price: "500k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/bo-hoa-400.webp" },
  { slug: "bo-hoa-mix-pastel-ngot-ngao", name: "Bó Hoa Mix Pastel Ngọt Ngào", price: "580k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa1-29-400.webp" },
  { slug: "bo-hoa-mix-trang-tim-diu-dang", name: "Bó Hoa Mix Trắng Tím Dịu Dàng", price: "600k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa1-33-400.webp" },
  { slug: "bo-hoa-mix-tong-am-ruc-ro", name: "Bó Hoa Mix Tông Ấm Rực Rỡ", price: "620k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa1-38-400.webp" },
  { slug: "bo-hoa-mix-sac-mat-tuoi-sang", name: "Bó Hoa Mix Sắc Mát Tươi Sáng", price: "590k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/hoa1-43-400.webp" },
  { slug: "bo-hoa-hong-cam-quyen-ru", name: "Bó Hoa Hồng Cam Quyến Rũ", price: "650k", cat: "bo-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/img3474-400.webp" },
  { slug: "gio-hoa-trang-xanh-thanh-nha", name: "Giỏ Hoa Trắng Xanh Thanh Nhã", price: "750k", cat: "gio-hoa", img: "https://hoatuoithanhngoc.com/image/responsive/gio-hoa-trang-xanh-thanh-nha-400.webp" },
  { slug: "ke-hoa-khai-truong-thinh-vuong", name: "Kệ Hoa Khai Trương Thịnh Vượng", price: "980k", cat: "khai-truong", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-khai-truong-thinh-vuong-400.webp" },
  { slug: "ke-hoa-khai-truong-hong-pastel-duyen-dang", name: "Kệ Hoa Khai Trương Hồng Pastel", price: "1.5tr", cat: "khai-truong", img: "https://hoatuoithanhngoc.com/image/responsive/img3449-400.webp" },
  { slug: "ke-hoa-khai-truong-vang-cam-hop-phong-thuy", name: "Kệ Hoa Khai Trương Vàng Cam", price: "1.8tr", cat: "khai-truong", img: "https://hoatuoithanhngoc.com/image/responsive/img3487-400.webp" },
  { slug: "ke-hoa-khai-truong-lan-ho-diep-kem-sang-trong", name: "Kệ Hoa Khai Trương Lan Hồ Điệp Kem", price: "2tr", cat: "khai-truong", img: "https://hoatuoithanhngoc.com/image/responsive/img3475-400.webp" },
  { slug: "lang-hoa-chia-buon-lys-bach-hop", name: "Lẵng Hoa Chia Buồn Lys Bạch Hợp", price: "680k", cat: "chia-buon", img: "https://hoatuoithanhngoc.com/image/responsive/hoa-chia-buon-ly-bach-hop-400.webp" },
  { slug: "chau-lan-ho-diep-trang-quy-phai", name: "Chậu Lan Hồ Điệp Trắng Quý Phái", price: "890k", cat: "lan-ho-diep", img: "https://hoatuoithanhngoc.com/image/responsive/lan-ho-diep-trang-quy-phai-400.webp" },
];

// Product catalog text cho AI (đồng bộ với web chatbot)
const PRODUCT_CATALOG_TEXT = PRODUCT_CATALOG.map(
  (p) => `SLUG:${p.slug} | ${p.name} | ${p.price} | ${p.cat}`
).join("\n");

const SYSTEM_PROMPT = `Mày tên Ngọc, nhân viên tư vấn tại Hoa Tươi Thanh Ngọc — tiệm hoa ở 8 Phan Văn Hân, Bình Thạnh, TP.HCM.
Mày đang nhắn Zalo với khách, nói chuyện tự nhiên như người thật, KHÔNG phải robot.

CÁCH NÓI CHUYỆN:
- Xưng "mình", gọi khách là "bạn" hoặc "anh/chị" tùy ngữ cảnh
- Ngắn gọn, tự nhiên — tối đa 3 câu mỗi tin
- Chỉ hỏi 1 câu mỗi lần, không hỏi dồn
- Khi hiểu nhu cầu thì gợi ý sản phẩm cụ thể

QUY TẮC GỢI Ý SẢN PHẨM (RẤT QUAN TRỌNG):
Khi gợi ý sản phẩm, bạn PHẢI kèm slug trong [SLUG:...] để hệ thống gửi ảnh kèm theo.
Ví dụ: "Bó Hồng Kem Tinh Tế [SLUG:bo-hoa-hong-kem-tinh-te] giá 650k đang hot lắm nè!"

DANH SÁCH SẢN PHẨM (dùng SLUG chính xác):
${PRODUCT_CATALOG_TEXT}

THÔNG TIN SHOP:
Địa chỉ: 8 Phan Văn Hân, Bình Thạnh, TP.HCM
Hotline: 0934 926 092 | 0866 086 574 | Mở 7:00–21:00 mỗi ngày
Giao hàng 2 giờ nội thành TP.HCM, kèm thiệp viết tay miễn phí
Có thể đổi màu hoa, giấy gói theo yêu cầu
Xem toàn bộ sản phẩm tại: hoatuoithanhngoc.com`;

/** Gửi tin nhắn text qua Zalo OA */
async function sendZaloText(userId, text, oaAccessToken) {
  try {
    await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
      method: "POST",
      headers: { "Content-Type": "application/json", access_token: oaAccessToken },
      body: JSON.stringify({ recipient: { user_id: userId }, message: { text } }),
    });
  } catch (err) {
    console.error("Zalo send text error:", err);
  }
}

/** Gửi ảnh sản phẩm qua Zalo OA (dùng media_id từ template hoặc gửi ảnh trực tiếp) */
async function sendZaloImage(userId, imageUrl, oaAccessToken) {
  try {
    // Zalo API gửi ảnh qua message with attachment
    await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
      method: "POST",
      headers: { "Content-Type": "application/json", access_token: oaAccessToken },
      body: JSON.stringify({
        recipient: { user_id: userId },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "media",
              elements: [{ media_type: "image", url: imageUrl }],
            },
          },
        },
      }),
    });
  } catch (err) {
    console.error("Zalo send image error:", err);
  }
}

/** Gửi tin nhắn có nút bấm xem sản phẩm */
async function sendZaloProductCard(userId, product, oaAccessToken) {
  try {
    const text = `${product.name}\n💰 Giá: ${product.price}\n🔗 Xem chi tiết: https://hoatuoithanhngoc.com/san-pham/${product.slug}`;
    // Gửi text + ảnh riêng
    await sendZaloText(userId, text, oaAccessToken);
    await sendZaloImage(userId, product.img, oaAccessToken);
  } catch (err) {
    console.error("Zalo send product card error:", err);
  }
}

/** Parse SLUG từ reply và lấy thông tin sản phẩm */
function parseSlugs(reply) {
  const slugRegex = /\[SLUG:([^\]]+)\]/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(reply)) !== null) {
    const slug = match[1].trim();
    if (!slugs.includes(slug)) slugs.push(slug);
  }
  return slugs
    .map((slug) => PRODUCT_CATALOG.find((p) => p.slug === slug))
    .filter(Boolean);
}

async function getAIReply(userId, message, ai, kv) {
  let history = [];
  try {
    const stored = await kv.get(`history:${userId}`);
    if (stored) history = JSON.parse(stored);
  } catch {}

  history.push({ role: "user", content: message });
  if (history.length > 10) history = history.slice(-10);

  const response = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
    ],
    max_tokens: 300,
  });

  const reply = response.response || "Mình chưa hiểu ý bạn lắm, bạn nói rõ hơn được không ạ?";

  // Parse sản phẩm từ reply
  const products = parseSlugs(reply);
  const cleanReply = reply.replace(/\[SLUG:[^\]]+\]/g, "").replace(/\s+/g, " ").trim();

  history.push({ role: "assistant", content: cleanReply });
  await kv.put(`history:${userId}`, JSON.stringify(history), { expirationTtl: 86400 });

  return { reply: cleanReply, products };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Zalo domain verification
    if (url.pathname.startsWith("/zalo_verifier")) {
      return new Response(
        `<html><head><meta name="zalo-platform-site-verification" content="EFA63jZHBZXRseKqtSSc8WZuYY7aZbz-DpKr"/></head><body>EFA63jZHBZXRseKqtSSc8WZuYY7aZbz-DpKr</body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // OAuth callback
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) return new Response("Khong co code", { status: 400 });

      const body = new URLSearchParams({ app_id: APP_ID, code, grant_type: "authorization_code" });

      const tokenResp = await fetch("https://oauth.zaloapp.com/v4/oa/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", secret_key: APP_SECRET },
        body: body.toString(),
      });
      const tokenData = await tokenResp.json();

      if (tokenData.access_token && env.BOT_KV) {
        await env.BOT_KV.put("oa_access_token", tokenData.access_token);
        await env.BOT_KV.put("oa_refresh_token", tokenData.refresh_token || "");
      }

      return new Response(
        `<html><body style="font-family:sans-serif;padding:40px;text-align:center">
          <h2>✅ Thành công!</h2><p>OA Access Token đã được lưu.</p>
          <pre style="background:#f0f0f0;padding:16px;text-align:left;word-break:break-all">${JSON.stringify(tokenData, null, 2)}</pre>
          <p>Bạn có thể đóng tab này.</p>
        </body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Webhook verification (GET)
    if (request.method === "GET") {
      const challenge = url.searchParams.get("hub.challenge");
      if (challenge) return new Response(challenge, { status: 200 });
      return new Response("Zalo Bot Hoa Ngoc - OK", { status: 200 });
    }

    // Webhook events (POST)
    if (request.method === "POST") {
      try {
        const data = await request.json();

        if (data.event_name === "user_send_text") {
          const userId = data.sender?.id;
          const userMessage = data.message?.text;
          if (!userId || !userMessage) return new Response("OK", { status: 200 });

          const oaToken = env.BOT_KV ? await env.BOT_KV.get("oa_access_token") : env.OA_ACCESS_TOKEN;
          if (!oaToken) return new Response("OK", { status: 200 });

          // Lấy AI reply + sản phẩm gợi ý
          const { reply, products } = await getAIReply(userId, userMessage, env.AI, env.BOT_KV);

          // Gửi text trước
          await sendZaloText(userId, reply, oaToken);

          // Gửi ảnh sản phẩm kèm theo (tối đa 3 sản phẩm để tránh spam)
          const productsToShow = products.slice(0, 3);
          for (const product of productsToShow) {
            await new Promise((r) => setTimeout(r, 500)); // delay tránh rate limit
            await sendZaloProductCard(userId, product, oaToken);
          }
        }
      } catch (err) {
        console.error(err);
      }
      return new Response("OK", { status: 200 });
    }

    return new Response("OK", { status: 200 });
  },
};