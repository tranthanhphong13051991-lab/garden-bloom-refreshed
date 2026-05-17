// Vercel Serverless Function — SSR TanStack Start
// File này import từ built server dist/server/server.js

// Khởi tạo handler (lazy load để tránh timeout ở cold start)
let handlerPromise;

async function getHandler() {
  if (!handlerPromise) {
    // Import từ built server dist (đã được build sẵn)
    handlerPromise = import("../dist/server/server.js").then((mod) => {
      return mod.default || mod;
    });
  }
  return handlerPromise;
}

export default async function handler(request, response) {
  try {
    const server = await getHandler();

    // Vercel dùng req/res model, nhưng server.fetch() cần Web API Request/Response.
    // Chuyển đổi từ Vercel req/res sang Web API Request.
    const protocol = request.headers["x-forwarded-proto"] || "https";
    const host = request.headers["x-forwarded-host"] || request.headers.host;
    const url = new URL(request.url, `${protocol}://${host}`);

    // Chuyển headers từ Vercel req sang Headers object
    const headers = new Headers();
    for (const [key, value] of Object.entries(request.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          for (const v of value) {
            headers.append(key, v);
          }
        } else {
          headers.set(key, value);
        }
      }
    }

    // Đọc body (nếu có)
    let body = undefined;
    if (request.method !== "GET" && request.method !== "HEAD") {
      body = await new Promise((resolve) => {
        let chunks = [];
        request.on("data", (chunk) => chunks.push(chunk));
        request.on("end", () => resolve(Buffer.concat(chunks).toString()));
      });
    }

    // Tạo Web API Request
    const webRequest = new Request(url.toString(), {
      method: request.method,
      headers,
      body: body || undefined,
    });

    // Gọi server.fetch (Web API)
    const webResponse = await server.fetch(webRequest, {}, {});

    // Ghi status code
    response.statusCode = webResponse.status;
    response.statusMessage = webResponse.statusText;

    // Ghi headers
    for (const [key, value] of webResponse.headers.entries()) {
      response.setHeader(key, value);
    }

    // Ghi body
    const responseBody = await webResponse.text();
    response.end(responseBody);
  } catch (error) {
    console.error("Vercel SSR error:", error);
    response.statusCode = 500;
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("<h1>500 - Internal Server Error</h1><p>Đã xảy ra lỗi máy chủ.</p>");
  }
}