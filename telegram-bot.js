// Telegram Bot - Hoa Tuoi Thanh Ngoc
// Phien ban 3: Dong bo voi web chatbot & Zalo, gui anh san pham

const TELEGRAM_TOKEN = "8590496749:AAFcEF-33poUP8E-msNSL_WgKSVCZPzv4uc";
const OLLAMA_URL = "http://localhost:11434/api/chat";
const OLLAMA_MODEL = "qwen2.5:3b";

// Product catalog (dong bo voi Zalo bot)
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

const PRODUCT_CATALOG_TEXT = PRODUCT_CATALOG.map(
  (p) => `SLUG:${p.slug} | ${p.name} | ${p.price}`
).join("\n");

const SYSTEM_PROMPT = `Mày tên Ngọc, nhân viên tư vấn tại Hoa Tươi Thanh Ngọc — tiệm hoa ở 8 Phan Văn Hân, Bình Thạnh, TP.HCM.
Mày đang nhắn tin với khách trên Telegram, nói chuyện tự nhiên như người thật, KHÔNG phải robot.

CÁCH NÓI CHUYỆN:
- Xưng "mình", gọi khách là "bạn" hoặc "anh/chị" tùy ngữ cảnh
- Ngắn gọn, tự nhiên — tối đa 3 câu mỗi tin, không dùng bullet point dài dòng
- Chỉ hỏi tối đa 1 câu hỏi mỗi lần, không hỏi dồn
- Khi đã hiểu nhu cầu thì gợi ý sản phẩm cụ thể luôn
- Được dùng "nha", "nè", "á", "hen" cho tự nhiên
- Không chắc thì nói: "để mình hỏi lại chị chủ nha"

QUY TẮC GỢI Ý SẢN PHẨM (RẤT QUAN TRỌNG):
Khi gợi ý sản phẩm, bạn PHẢI kèm slug trong [SLUG:...] để bot có thể gửi ảnh kèm theo.
Ví dụ: "Bó Hồng Kem Tinh Tế [SLUG:bo-hoa-hong-kem-tinh-te] đang được yêu thích nè bạn ơi!"
Nếu gợi ý nhiều sản phẩm, mỗi sản phẩm đều phải có [SLUG:...].

DANH SÁCH SẢN PHẨM (dùng SLUG chính xác):
${PRODUCT_CATALOG_TEXT}

THÔNG TIN SHOP:
Địa chỉ: 8 Phan Văn Hân, Bình Thạnh, TP.HCM
Hotline: 0934 926 092 | 0866 086 574 | Mở 7:00–21:00 mỗi ngày
Giao hàng 2 giờ nội thành TP.HCM, kèm thiệp viết tay miễn phí
Có thể đổi màu hoa, giấy gói theo yêu cầu
Xem toàn bộ sản phẩm tại: hoatuoithanhngoc.com

Trả lời bằng tiếng Việt. Nếu hỏi ngoài chủ đề hoa thì nhẹ nhàng lái về.`;

// Luu lich su chat theo tung nguoi dung
const chatHistory = new Map();
const MAX_HISTORY = 10; // Nho toi da 10 tin nhan

// Menu chinh
const MAIN_MENU = {
  keyboard: [
    [{ text: "🌸 Xem hoa sinh nhật" }, { text: "💍 Hoa cưới / sự kiện" }],
    [{ text: "💐 Hoa tặng mẹ / gia đình" }, { text: "🎁 Hoa văn phòng" }],
    [{ text: "💰 Bảng giá" }, { text: "🚚 Giao hàng" }],
    [{ text: "📞 Liên hệ & địa chỉ" }, { text: "❓ Hỗ trợ" }],
  ],
  resize_keyboard: true,
  one_time_keyboard: false,
};

let lastUpdateId = 0;

async function callTelegram(method, params = {}) {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/${method}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return res.json();
}

async function callOllama(chatId, userMessage) {
  // Lay lich su chat
  if (!chatHistory.has(chatId)) {
    chatHistory.set(chatId, []);
  }
  const history = chatHistory.get(chatId);

  // Them tin nhan moi vao lich su
  history.push({ role: "user", content: userMessage });

  // Giu toi da MAX_HISTORY tin
  if (history.length > MAX_HISTORY * 2) {
    history.splice(0, 2);
  }

  try {
    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
        ],
      }),
    });
    const data = await res.json();
    const reply = data.message?.content || "Xin loi, toi dang gap su co. Vui long thu lai!";

    // Luu phan hoi vao lich su
    history.push({ role: "assistant", content: reply });
    return reply;
  } catch (err) {
    return "Xin loi, he thong AI dang gap su co. Vui long thu lai sau giay lat!";
  }
}

async function sendMessage(chatId, text, keyboard = null) {
  const params = {
    chat_id: chatId,
    text: text,
    parse_mode: "Markdown",
  };
  if (keyboard) {
    params.reply_markup = keyboard;
  }
  await callTelegram("sendMessage", params);
}

async function sendTyping(chatId) {
  await callTelegram("sendChatAction", {
    chat_id: chatId,
    action: "typing",
  });
}

async function handleMessage(msg) {
  const chatId = msg.chat.id;
  const text = msg.text || "";
  const username = msg.from?.first_name || "Khach";

  console.log(`[${new Date().toLocaleTimeString()}] ${username} (${chatId}): ${text}`);

  // Xu ly lenh /start
  if (text === "/start") {
    chatHistory.delete(chatId); // Reset lich su
    const welcome = `Ủa ${username} ơi, chào bạn nha 🌸 Mình là Ngọc bên Hoa Tươi Thanh Ngọc đây!

Bạn đang cần tư vấn hoa gì không? Cứ nhắn mình thoải mái nha 😊`;
    await sendMessage(chatId, welcome, { reply_markup: MAIN_MENU });
    return;
  }

  // Xu ly lenh /reset
  if (text === "/reset") {
    chatHistory.delete(chatId);
    await sendMessage(chatId, "🔄 Đã xóa lịch sử trò chuyện. Bắt đầu cuộc trò chuyện mới!", { reply_markup: MAIN_MENU });
    return;
  }

  // Xu ly lenh /help
  if (text === "/help") {
    const help = `📋 *Hướng dẫn sử dụng:*

/start - Bắt đầu lại từ đầu
/reset - Xóa lịch sử chat
/help - Xem hướng dẫn

Hoặc nhấn các nút bên dưới để chọn nhanh! 👇`;
    await sendMessage(chatId, help, { reply_markup: MAIN_MENU });
    return;
  }

  // Xu ly cac nut menu nhanh
  let quickReply = null;
  if (text === "📞 Liên hệ & địa chỉ") {
    quickReply = `📞 *Thông tin liên hệ:*

🏪 **Hoa Tươi Thanh Ngọc**
📍 123 Nguyễn Xiển, Bình Thạnh, TP.HCM
📱 Hotline: *0901 234 567*
🌐 Website: hoatuoithanhngoc.com
🕐 Giờ mở cửa: 7:00 - 21:00 hàng ngày

Nhắn tin tại đây hoặc gọi điện trực tiếp nhé! 😊`;
  } else if (text === "💰 Bảng giá") {
    quickReply = `💰 *Bảng giá tham khảo:*

🌸 Hoa bó nhỏ: *80k - 150k*
💐 Hoa bó trung: *150k - 350k*
🎁 Hoa bó lớn / giỏ hoa: *350k - 800k*
🎂 Hoa sinh nhật cao cấp: *500k - 2tr*
💍 Hoa cưới / sự kiện: *Liên hệ báo giá*

🚚 Phí giao hàng: 20k - 50k
📱 Đặt hàng: 0901 234 567`;
  } else if (text === "🚚 Giao hàng") {
    quickReply = `🚚 *Thông tin giao hàng:*

✅ Giao hàng: Bình Thạnh & các quận lân cận
💵 Phí ship: 20.000 - 50.000 VND
⏰ Thời gian: 1-3 tiếng sau khi đặt
🎯 Giao đúng giờ theo yêu cầu

Đặt hàng trước ít nhất *2 tiếng* để đảm bảo hoa tươi nhất! 🌸`;
  }

  if (quickReply) {
    await sendMessage(chatId, quickReply, { reply_markup: MAIN_MENU });
    return;
  }

  // Gui typing indicator
  await sendTyping(chatId);

  // Goi AI xu ly cac tin nhan khac
  const reply = await callOllama(chatId, text);

  // Parse SLUG tu reply de gui anh san pham
  const slugRegex = /\[SLUG:([^\]]+)\]/g;
  const matchedSlugs = [];
  let m;
  while ((m = slugRegex.exec(reply)) !== null) {
    if (!matchedSlugs.includes(m[1])) matchedSlugs.push(m[1]);
  }

  // Xoa [SLUG:...] khoi reply
  let cleanReply = reply.replace(/\[SLUG:[^\]]+\]/g, "").replace(/\s+/g, " ").trim();

  // Gui text truoc
  await sendMessage(chatId, cleanReply, { reply_markup: MAIN_MENU });

  // Gui anh san pham kem theo
  for (const slug of matchedSlugs.slice(0, 3)) {
    const product = PRODUCT_CATALOG.find((p) => p.slug === slug);
    if (product) {
      await new Promise((r) => setTimeout(r, 500));
      const caption = `🌸 *${product.name}*\n💰 ${product.price}\n🔗 hoatuoithanhngoc.com/san-pham/${product.slug}`;
      await callTelegram("sendPhoto", {
        chat_id: chatId,
        photo: product.img,
        caption,
        parse_mode: "Markdown",
      });
    }
  }

  console.log(`[Bot → ${username}]: ${cleanReply.substring(0, 100)}... (${matchedSlugs.length} san pham)\n`);
}

async function getUpdates() {
  const data = await callTelegram("getUpdates", {
    offset: lastUpdateId + 1,
    timeout: 10,
  });
  return data.result || [];
}

async function main() {
  console.log("===========================================");
  console.log("  TELEGRAM BOT v2 - HOA TUOI THANH NGOC");
  console.log("===========================================");
  console.log("  Co menu, nut bam, nho lich su chat");
  console.log("  Nhan Ctrl+C de dung.");
  console.log(`  Model AI: ${OLLAMA_MODEL}`);
  console.log("-------------------------------------------");

  // Kiem tra Ollama
  try {
    const check = await fetch("http://localhost:11434/api/tags");
    const data = await check.json();
    const models = data.models || [];
    const hasModel = models.find((m) => m.name.includes("qwen2.5"));
    if (hasModel) {
      console.log(`  OK: Ollama + ${hasModel.name} san sang!`);
    } else {
      console.log("  CANH BAO: Chua co model qwen2.5. Chay: ollama pull qwen2.5:7b");
    }
  } catch {
    console.log("  LOI: Ollama chua chay! Mo Ollama app truoc.");
    process.exit(1);
  }

  console.log("  Dang cho tin nhan...\n");

  while (true) {
    try {
      const updates = await getUpdates();
      for (const update of updates) {
        lastUpdateId = update.update_id;
        if (update.message) {
          await handleMessage(update.message);
        }
      }
    } catch (err) {
      console.error("Loi ket noi:", err.message);
      await new Promise((r) => setTimeout(r, 5000));
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
}

main();
