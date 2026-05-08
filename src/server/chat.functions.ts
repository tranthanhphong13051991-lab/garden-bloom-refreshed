import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PRODUCTS, formatPrice } from "@/data/products";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
});

import { getNgocResponse } from "./ai.service";

export const chatWithFlorist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    // Chuyển đổi format tin nhắn cho phù hợp với service chung
    const lastMessage = data.messages[data.messages.length - 1].content;
    const history = data.messages.slice(0, -1);
    
    // API key sẽ được lấy từ process.env trong ai.service.ts
    // (nhờ có nodejs_compat_populate_process_env flag)
    return await getNgocResponse(lastMessage, history);
  });