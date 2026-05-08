import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GROQ_API_KEY;

async function testGroqConnection() {
  console.log("--- KIỂM TRA KẾT NỐI GROQ (WEB BOT) ---");
  if (!apiKey || apiKey.startsWith('gsk_vM6Q')) {
    console.log("❌ LỖI: Chưa có Key Groq thật trong file .env (hoặc vẫn đang dùng Key giả).");
    return;
  }

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Hi" }],
        max_tokens: 5,
      }),
    });

    if (res.ok) {
      console.log("✅ KẾT NỐI THÀNH CÔNG! Bot Ngọc đã sẵn sàng phục vụ trên Web.");
    } else {
      const errorData = await res.json();
      console.log(`❌ THẤT BẠI: API trả về lỗi (${res.status})`);
      console.log("Chi tiết:", JSON.stringify(errorData, null, 2));
    }
  } catch (err) {
    console.log("❌ LỖI KẾT NỐI: Không thể gọi đến API Groq.");
    console.log(err.message);
  }
}

testGroqConnection();
