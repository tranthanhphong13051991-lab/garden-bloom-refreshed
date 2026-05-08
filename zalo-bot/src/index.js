const SYSTEM_PROMPT = `Mày tên Ngọc, nhân viên tư vấn tại Hoa Tươi Thanh Ngọc (8 Phan Văn Hân, Bình Thạnh).
Nói chuyện tự nhiên, xưng "mình" gọi "bạn/anh/chị". Ngắn gọn (max 3 câu). 
KHÔNG báo giá cụ thể, hướng khách liên hệ Zalo 0934 926 092 để tư vấn đúng mẫu.`;

async function sendZaloText(userId, text, oaAccessToken) {
  await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
    method: "POST",
    headers: { "Content-Type": "application/json", access_token: oaAccessToken },
    body: JSON.stringify({ recipient: { user_id: userId }, message: { text } }),
  });
}

async function getAIReply(message, groqKey) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${groqKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ]
    })
  });
  const json = await res.json();
  if (json.error) return "Lỗi AI: " + json.error.message;
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
          const oaToken = await env.BOT_STORAGE?.get("ZALO_ACCESS_TOKEN") || env.ZALO_OA_ACCESS_TOKEN;
          const groqKey = env.GROQ_API_KEY;

          if (userId && oaToken) {
            if (!groqKey) {
              await sendZaloText(userId, "Ngọc chưa có chìa khóa AI (GROQ_API_KEY).", oaToken);
            } else {
              const reply = await getAIReply(userMessage, groqKey);
              await sendZaloText(userId, reply, oaToken);
            }
          }
        }
      } catch (err) {
        console.error("Zalo Bot Error:", err);
      }
    }
    return new Response("OK");
  }
};