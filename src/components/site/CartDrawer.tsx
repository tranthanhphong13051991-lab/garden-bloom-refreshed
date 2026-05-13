import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/store/cart";
import { SITE } from "@/data/site";

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, clear } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const buildOrderMessage = () => {
    const lines = items.map((i, idx) => `${idx + 1}. ${i.name} × ${i.qty}`);
    return encodeURIComponent(
      `Xin chào Hoa Tươi Thanh Ngọc, tôi muốn đặt:\n${lines.join("\n")}\n\nXin tư vấn và báo giá giúp tôi, cảm ơn!`,
    );
  };

  return (
    <>
      {open && <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" onClick={() => setOpen(false)} />}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-elegant transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Giỏ hàng"
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-2xl text-primary">Giỏ Hoa Của Bạn</h2>
          <button onClick={() => setOpen(false)} aria-label="Đóng" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="text-5xl">🌷</div>
              <p className="mt-4 font-serif text-lg text-foreground">Giỏ hàng đang trống</p>
              <p className="mt-1 text-sm text-muted-foreground">Hãy chọn những đoá hoa yêu thương nhất.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={i.slug} className="flex gap-4 rounded-xl border border-border p-3">
                  <img src={i.thumb} alt={i.name} width={80} height={80} className="h-20 w-20 rounded-lg object-cover" loading="lazy" />
                  <div className="flex flex-1 flex-col">
                    <div className="font-serif text-base leading-tight text-foreground">{i.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Liên hệ để báo giá</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button onClick={() => setQty(i.slug, i.qty - 1)} aria-label="Giảm" className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-primary">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm">{i.qty}</span>
                        <button onClick={() => setQty(i.slug, i.qty + 1)} aria-label="Tăng" className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-primary">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => remove(i.slug)} aria-label="Xoá" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="space-y-3 border-t border-border bg-cream px-6 py-5">
            <p className="text-xs text-muted-foreground">Giá sẽ được tư vấn và xác nhận qua Zalo/điện thoại.</p>
            <a
              href={`${SITE.zalo}?body=${buildOrderMessage()}`}
              target="_blank"
              rel="noopener"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:bg-primary/90"
            >
              <MessageCircle className="h-4 w-4" /> Đặt hoa qua Zalo
            </a>
            <a
              href={`tel:${SITE.phones[0]}`}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
            >
              Gọi đặt {SITE.phones[0]}
            </a>
            <button onClick={clear} className="w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline">
              Xoá toàn bộ
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}
