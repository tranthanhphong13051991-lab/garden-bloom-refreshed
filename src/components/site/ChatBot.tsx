import { useEffect, useRef, useState } from "react";
import { MessageSquareHeart, Send, X, Loader2 } from "lucide-react";
import { chatWithFlorist } from "@/server/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Xin chào! Mình là Ngọc 🌸 từ Hoa Tươi Thanh Ngọc. Bạn cần tư vấn hoa cho dịp nào ạ? (Sinh nhật, khai trương, chia buồn, lan hồ điệp…)",
};

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { reply } = await chatWithFlorist({ data: { messages: next.slice(-12) } });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Đã có lỗi xảy ra.";
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${msg} Bạn có thể nhắn Zalo 0934926092 để được hỗ trợ ngay nhé!` }]);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = ["Hoa sinh nhật bạn gái", "Kệ hoa khai trương", "Lan hồ điệp biếu sếp", "Hoa chia buồn trang trọng"];

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Mở chat tư vấn hoa"
          className="fixed bottom-24 right-5 z-30 flex h-13 w-13 items-center justify-center rounded-full bg-gold p-3.5 text-primary shadow-elegant transition hover:scale-105"
        >
          <MessageSquareHeart className="h-5 w-5" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-40 flex h-[min(560px,80vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-elegant">
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground">
            <div>
              <div className="font-serif text-base font-semibold">Tư vấn cùng Ngọc 🌸</div>
              <div className="text-[11px] opacity-80">Phản hồi trong vài giây</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Đóng" className="rounded-full p-1.5 hover:bg-primary-foreground/10">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cream/40 p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-background text-foreground shadow-soft"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-background px-3.5 py-2.5 shadow-soft">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-1.5 border-t border-border bg-background px-3 pt-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="rounded-full border border-border bg-cream px-3 py-1 text-xs text-foreground/80 hover:border-primary hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-border bg-background p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 rounded-full border border-border bg-cream/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
              disabled={loading}
              maxLength={500}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Gửi"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
