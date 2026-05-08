import { PRODUCTS } from "@/data/products";

/** 
 * Lấy Access Token Zalo từ KV (Cloudflare) hoặc .env
 * Tự động Refresh nếu hết hạn
 */
export async function getZaloAccessToken(env: any) {
  // 1. Thử lấy từ KV trước (Ưu tiên)
  let accessToken = await env.BOT_STORAGE?.get("ZALO_ACCESS_TOKEN");
  let refreshToken = await env.BOT_STORAGE?.get("ZALO_REFRESH_TOKEN");

  // Nếu KV trống, dùng từ .env làm mặc định ban đầu
  if (!accessToken) accessToken = process.env.ZALO_OA_ACCESS_TOKEN;
  if (!refreshToken) refreshToken = process.env.ZALO_OA_REFRESH_TOKEN;

  // 2. Logic kiểm tra/refresh (Zalo không có hàm check trực tiếp, 
  // nên ta thường thử gửi tin nhắn, nếu lỗi 401/403 thì mới refresh)
  // Nhưng để tối ưu, ta có thể refresh chủ động nếu muốn.
  
  return accessToken;
}

/** Hàm thực hiện Refresh Token khi cần thiết */
export async function refreshZaloToken(env: any) {
  const refreshToken = await env.BOT_STORAGE?.get("ZALO_REFRESH_TOKEN") || process.env.ZALO_OA_REFRESH_TOKEN;
  const appId = process.env.ZALO_APP_ID;
  const appSecret = process.env.ZALO_APP_SECRET;

  if (!refreshToken || !appId || !appSecret) {
    console.error("Thiếu thông tin để refresh token Zalo");
    return null;
  }

  try {
    const res = await fetch("https://oauth.zaloapp.com/v4/oa/access_token", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "secret_key": appSecret 
      },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        app_id: appId,
        grant_type: "refresh_token"
      })
    });

    const data: any = await res.json();
    if (data.access_token) {
      // Lưu lại vào KV
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

/** Gửi tin nhắn text qua Zalo OA (Có cơ chế tự sửa lỗi token) */
export async function sendZaloText(userId: string, text: string, env: any) {
  let oaAccessToken = await getZaloAccessToken(env);
  
  const attemptSend = async (token: string) => {
    return await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
      method: "POST",
      headers: { "Content-Type": "application/json", access_token: token },
      body: JSON.stringify({ recipient: { user_id: userId }, message: { text } }),
    });
  };

  let res = await attemptSend(oaAccessToken);
  let result: any = await res.json();

  // Nếu lỗi Token (thường là code -216 hoặc -201)
  if (result.error === -216 || result.error === -201) {
    console.log("Token hết hạn, đang tự động refresh...");
    const newToken = await refreshZaloToken(env);
    if (newToken) {
      res = await attemptSend(newToken);
      result = await res.json();
    }
  }
  
  return result;
}

/** Gửi card sản phẩm qua Zalo OA */
export async function sendZaloProductCard(userId: string, product: any, env: any) {
  const oaAccessToken = await getZaloAccessToken(env);
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
                  subtitle: `Giá: ${product.price} - ${product.short}`,
                  image_url: product.thumb.startsWith('http') ? product.thumb : `https://hoatuoithanhngoc.com${product.thumb}`,
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

