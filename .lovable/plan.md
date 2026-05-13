## Mục tiêu

Hiện tại ChatBot đã hỗ trợ hiển thị card sản phẩm (ảnh + tên + giá + link), nhưng việc chọn sản phẩm dựa trên **keyword matching thô** trong `src/lib/ai.service.server.ts` — match bất kỳ từ >2 ký tự nào trong reply trùng với tên/keyword sản phẩm. Cách này thường:
- Gửi sai sản phẩm (ví dụ khách hỏi "sinh nhật" → match nhầm bó chia buồn vì có chữ "hoa")
- Hoặc không gửi sản phẩm nào dù khách rõ ràng đang quan tâm
- Không kiểm soát được số lượng/ngữ cảnh

## Giải pháp

Chuyển sang **AI tool calling**: để chính model Groq (llama-3.3-70b) quyết định gọi tool `suggest_products` khi cần, kèm danh sách slug sản phẩm phù hợp. Backend tra cứu slug → trả card có ảnh.

### Luồng mới
```
User: "Cần bó hoa sinh nhật bạn gái màu hồng"
   ↓
Groq nhận prompt + danh sách sản phẩm rút gọn (slug, name, category, short)
   ↓
Groq trả: reply text + tool_call suggest_products(slugs: ["bo-hong-phan-lang-man", "bo-mix-pastel-ngot-ngao"])
   ↓
Backend map slug → {slug, name, thumb, price, short}
   ↓
ChatBot render card ảnh sản phẩm (UI hiện tại đã có sẵn)
```

## Thay đổi cụ thể

### 1. `src/lib/ai.service.server.ts`
- Thêm tool definition `suggest_products` với JSON schema: `{ slugs: string[] (max 3, từ danh sách cho phép) }`
- Chèn vào system prompt phần liệt kê **toàn bộ slug + tên ngắn + category** để model biết tool được gọi với giá trị gì
- Hướng dẫn model: "Khi khách quan tâm 1 dịp/loại hoa cụ thể → gọi tool. Khi chỉ chào hỏi/hỏi giá/hỏi địa chỉ → không gọi tool."
- Parse `tool_calls` từ response, lấy slugs, map sang `PRODUCTS` để dựng `products[]`
- Bỏ logic keyword matching cũ (giữ làm fallback chỉ khi model không gọi tool nhưng reply nhắc đích danh tên sản phẩm)

### 2. `src/components/site/ChatBot.tsx`
- Không cần thay đổi structure — đã render `m.products` đúng định dạng
- Cải thiện nhỏ: khi `products.length > 0` mà `reply` ngắn, vẫn hiển thị; thêm caption nhỏ "Mình gửi bạn vài mẫu nhé 🌸" nếu reply trống

### 3. `src/lib/chat.functions.ts`
- Không đổi signature, vẫn trả `ChatReply = { reply, products }`

## Phần kỹ thuật

- Groq `llama-3.3-70b-versatile` hỗ trợ tool calling chuẩn OpenAI format (`tools`, `tool_choice: "auto"`)
- Khi có tool_call, model có thể trả `content` rỗng → cần fallback text như "Mình gợi ý vài mẫu phù hợp nhé 🌸"
- Validate slug trả về: chỉ giữ slug thực sự tồn tại trong `PRODUCTS`, max 3 cái
- Giữ nguyên rule **không báo giá** trong system prompt; card sản phẩm đã ẩn giá theo yêu cầu shop (dùng `formatPrice` nhưng có thể đổi thành "Liên hệ" nếu bạn muốn — sẽ hỏi sau khi triển khai)

## Ngoài phạm vi (có thể làm sau)

- Cho khách upload ảnh hoa tham khảo để bot phân tích → cần thêm UI upload + dùng vision model (đã có `analyzeProductImage` trong admin)
- Lưu lịch sử chat vào database
- Streaming response token-by-token
