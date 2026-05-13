import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, ShoppingBag, X, Menu, MessageCircle, Facebook, MapPin, Mail, Clock, Minus, Plus, Trash2, MessageSquareHeart, ImageIcon, Loader2, Send } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { S as SITE } from "./router-DQf0jzPI.js";
import { C as CATEGORIES } from "./products-c_hw6lyT.js";
import { c as createSsrRpc } from "./createSsrRpc-cz3zUEHg.js";
import { z } from "zod";
import { c as createServerFn } from "./server-ma-ijNXL.js";
const useCart = create()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      setOpen: (v) => set({ open: v }),
      add: (p, qty = 1) => set((s) => {
        const existing = s.items.find((i) => i.slug === p.slug);
        if (existing) {
          return {
            items: s.items.map(
              (i) => i.slug === p.slug ? { ...i, qty: i.qty + qty } : i
            ),
            open: true
          };
        }
        return {
          items: [
            ...s.items,
            { slug: p.slug, name: p.name, thumb: p.thumb, price: p.price, qty }
          ],
          open: true
        };
      }),
      remove: (slug) => set((s) => ({ items: s.items.filter((i) => i.slug !== slug) })),
      setQty: (slug, qty) => set((s) => ({
        items: s.items.map((i) => i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i).filter((i) => i.qty > 0)
      })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, b) => a + b.qty, 0),
      total: () => get().items.reduce((a, b) => a + (b.price ?? 0) * b.qty, 0)
    }),
    { name: "thanh-ngoc-cart", skipHydration: true }
  )
);
const nav = [
  { to: "/", label: "Trang Chủ" },
  { to: "/san-pham", label: "Sản Phẩm" },
  { to: "/blog", label: "Blog" },
  { to: "/gioi-thieu", label: "Giới Thiệu" },
  { to: "/lien-he", label: "Liên Hệ" }
];
function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());
  const setCartOpen = useCart((s) => s.setOpen);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3 group", "aria-label": SITE.name, children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-white transition-transform group-hover:scale-105", children: /* @__PURE__ */ jsx("img", { src: SITE.logo, alt: "Logo Hoa Tươi Thanh Ngọc", className: "h-full w-full object-contain" }) }),
        /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Hoa Tươi" }),
          /* @__PURE__ */ jsx("div", { className: "font-serif text-xl font-semibold text-primary", children: "Thanh Ngọc" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-1 md:flex", "aria-label": "Điều hướng chính", children: nav.map((n) => /* @__PURE__ */ jsx(
        Link,
        {
          to: n.to,
          activeOptions: { exact: n.to === "/" },
          className: "px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary",
          activeProps: { className: "px-4 py-2 text-sm font-semibold text-primary" },
          children: n.label
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: `tel:${SITE.phones[0]}`,
            className: "hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-elegant lg:inline-flex",
            children: [
              /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
              " ",
              SITE.phones[0].replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setCartOpen(true),
            "aria-label": "Giỏ hàng",
            className: "relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-secondary hover:text-primary",
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "h-5 w-5" }),
              count > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-primary", children: count })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setOpen(!open),
            "aria-label": "Menu",
            className: "flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-secondary md:hidden",
            children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "border-t border-border bg-background md:hidden", children: /* @__PURE__ */ jsxs("nav", { className: "mx-auto flex max-w-7xl flex-col px-4 py-4", "aria-label": "Menu di động", children: [
      nav.map((n) => /* @__PURE__ */ jsx(
        Link,
        {
          to: n.to,
          onClick: () => setOpen(false),
          className: "border-b border-border/40 py-3 text-base font-medium text-foreground/80",
          activeProps: { className: "border-b border-border/40 py-3 text-base font-semibold text-primary" },
          children: n.label
        },
        n.to
      )),
      /* @__PURE__ */ jsxs("a", { href: `tel:${SITE.phones[0]}`, className: "mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground", children: [
        /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
        " Gọi ",
        SITE.phones[0]
      ] })
    ] }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "mt-24 border-t border-border bg-primary text-primary-foreground/90", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-6 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 lg:col-span-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-serif text-2xl font-semibold text-primary-foreground", children: "Thanh Ngọc Flower's" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-primary-foreground/70", children: "Tiệm hoa tươi tại Bình Thạnh, TP.HCM. Mỗi đóa hoa là một câu chuyện yêu thương." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex gap-3", children: [
          /* @__PURE__ */ jsx("a", { href: SITE.zalo, target: "_blank", rel: "noopener", "aria-label": "Zalo", className: "flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 transition hover:bg-primary-foreground/10", children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: SITE.facebook, target: "_blank", rel: "noopener", "aria-label": "Facebook", className: "flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 transition hover:bg-primary-foreground/10", children: /* @__PURE__ */ jsx(Facebook, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "/images/logo/bct.png",
            alt: "Đã thông báo Bộ Công Thương",
            className: "h-10 w-auto object-contain opacity-90 transition-opacity hover:opacity-100"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 font-serif text-lg text-primary-foreground", children: "Danh Mục" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2.5 text-sm", children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/san-pham", search: { cat: c.id }, className: "text-primary-foreground/70 transition hover:text-primary-foreground", children: c.label }) }, c.id)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 font-serif text-lg text-primary-foreground", children: "Liên Kết" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-primary-foreground/70 hover:text-primary-foreground", children: "Trang chủ" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/san-pham", className: "text-primary-foreground/70 hover:text-primary-foreground", children: "Tất cả sản phẩm" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/gioi-thieu", className: "text-primary-foreground/70 hover:text-primary-foreground", children: "Giới thiệu" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/lien-he", className: "text-primary-foreground/70 hover:text-primary-foreground", children: "Liên hệ" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 font-serif text-lg text-primary-foreground", children: "Chính Sách" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2.5 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/chinh-sach-bao-mat", className: "text-primary-foreground/70 hover:text-primary-foreground", children: "Bảo mật thông tin" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/chinh-sach-giao-hang", className: "text-primary-foreground/70 hover:text-primary-foreground", children: "Giao hàng & Vận chuyển" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/chinh-sach-doi-tra", className: "text-primary-foreground/70 hover:text-primary-foreground", children: "Đổi trả & Hoàn tiền" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/chinh-sach-thanh-toan", className: "text-primary-foreground/70 hover:text-primary-foreground", children: "Hướng dẫn thanh toán" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 font-serif text-lg text-primary-foreground", children: "Liên Hệ" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-3 text-sm text-primary-foreground/80", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
            SITE.address
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("a", { href: `tel:${SITE.phones[0]}`, className: "hover:text-primary-foreground", children: SITE.phones[0] }),
              " · ",
              /* @__PURE__ */ jsx("a", { href: `tel:${SITE.phones[1]}`, className: "hover:text-primary-foreground", children: SITE.phones[1] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
            /* @__PURE__ */ jsx("a", { href: `mailto:${SITE.email}`, className: "hover:text-primary-foreground", children: SITE.email })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(Clock, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
            SITE.hours
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-primary-foreground/15", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-primary-foreground/60 md:flex-row md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Hoa Tươi Thanh Ngọc. Mọi quyền được bảo lưu."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { children: "Thiết kế bởi Thanh Ngọc Flower's · hoatuoithanhngoc.com" }),
        /* @__PURE__ */ jsx(Link, { to: "/admin", className: "opacity-30 transition hover:opacity-80", children: "⚙" })
      ] })
    ] }) })
  ] });
}
function CartDrawer() {
  const { items, open, setOpen, setQty, remove, clear } = useCart();
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const buildOrderMessage = () => {
    const lines = items.map((i, idx) => `${idx + 1}. ${i.name} × ${i.qty}`);
    return encodeURIComponent(
      `Xin chào Hoa Tươi Thanh Ngọc, tôi muốn đặt:
${lines.join("\n")}

Xin tư vấn và báo giá giúp tôi, cảm ơn!`
    );
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    open && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm", onClick: () => setOpen(false) }),
    /* @__PURE__ */ jsxs(
      "aside",
      {
        className: `fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-elegant transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`,
        "aria-label": "Giỏ hàng",
        "aria-hidden": !open,
        children: [
          /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between border-b border-border px-6 py-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl text-primary", children: "Giỏ Hoa Của Bạn" }),
            /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), "aria-label": "Đóng", className: "flex h-9 w-9 items-center justify-center rounded-full hover:bg-secondary", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto px-6 py-4", children: items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex h-full flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "text-5xl", children: "🌷" }),
            /* @__PURE__ */ jsx("p", { className: "mt-4 font-serif text-lg text-foreground", children: "Giỏ hàng đang trống" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Hãy chọn những đoá hoa yêu thương nhất." })
          ] }) : /* @__PURE__ */ jsx("ul", { className: "space-y-4", children: items.map((i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 rounded-xl border border-border p-3", children: [
            /* @__PURE__ */ jsx("img", { src: i.thumb, alt: i.name, width: 80, height: 80, className: "h-20 w-20 rounded-lg object-cover", loading: "lazy" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
              /* @__PURE__ */ jsx("div", { className: "font-serif text-base leading-tight text-foreground", children: i.name }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: "Liên hệ để báo giá" }),
              /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center rounded-full border border-border", children: [
                  /* @__PURE__ */ jsx("button", { onClick: () => setQty(i.slug, i.qty - 1), "aria-label": "Giảm", className: "flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-primary", children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" }) }),
                  /* @__PURE__ */ jsx("span", { className: "w-7 text-center text-sm", children: i.qty }),
                  /* @__PURE__ */ jsx("button", { onClick: () => setQty(i.slug, i.qty + 1), "aria-label": "Tăng", className: "flex h-7 w-7 items-center justify-center text-muted-foreground hover:text-primary", children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }) })
                ] }),
                /* @__PURE__ */ jsx("button", { onClick: () => remove(i.slug), "aria-label": "Xoá", className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
              ] })
            ] })
          ] }, i.slug)) }) }),
          items.length > 0 && /* @__PURE__ */ jsxs("footer", { className: "space-y-3 border-t border-border bg-cream px-6 py-5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Giá sẽ được tư vấn và xác nhận qua Zalo/điện thoại." }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `${SITE.zalo}?body=${buildOrderMessage()}`,
                target: "_blank",
                rel: "noopener",
                className: "flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:bg-primary/90",
                children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
                  " Đặt hoa qua Zalo"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `tel:${SITE.phones[0]}`,
                className: "flex w-full items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground",
                children: [
                  "Gọi đặt ",
                  SITE.phones[0]
                ]
              }
            ),
            /* @__PURE__ */ jsx("button", { onClick: clear, className: "w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline", children: "Xoá toàn bộ" })
          ] })
        ]
      }
    )
  ] });
}
function FloatingActions() {
  return /* @__PURE__ */ jsxs("div", { className: "fixed bottom-5 right-5 z-30 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsx(
      "a",
      {
        href: SITE.zalo,
        target: "_blank",
        rel: "noopener",
        "aria-label": "Chat Zalo",
        className: "flex h-13 w-13 items-center justify-center rounded-full bg-[#0068ff] p-3.5 text-white shadow-elegant transition hover:scale-105",
        children: /* @__PURE__ */ jsx(MessageCircle, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: `tel:${SITE.phones[0]}`,
        "aria-label": "Gọi điện",
        className: "flex h-13 w-13 items-center justify-center rounded-full bg-primary p-3.5 text-primary-foreground shadow-elegant transition hover:scale-105",
        children: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" })
      }
    )
  ] });
}
const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2e3)
});
const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30)
});
const chatWithFlorist = createServerFn({
  method: "POST"
}).inputValidator((data) => InputSchema.parse(data)).handler(createSsrRpc("b8c6ee5cd835032fe39f1196ebb398701c7cffa33d6f448016e6c7e0f95deec3"));
const GREETING = {
  role: "assistant",
  content: "Xin chào! Mình là Ngọc 🌸 từ Hoa Tươi Thanh Ngọc. Bạn cần tư vấn hoa cho dịp nào ạ? (Sinh nhật, khai trương, chia buồn, lan hồ điệp…)"
};
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);
  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const result = await chatWithFlorist({ data: { messages: next.slice(-12) } });
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: result.reply,
          products: result.products
        }
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Đã có lỗi xảy ra.";
      setMessages((m) => [...m, { role: "assistant", content: `⚠️ ${msg} Bạn có thể nhắn Zalo 0934926092 để được hỗ trợ ngay nhé!` }]);
    } finally {
      setLoading(false);
    }
  }
  const suggestions = ["Hoa sinh nhật bạn gái", "Kệ hoa khai trương", "Lan hồ điệp biếu sếp", "Hoa chia buồn trang trọng"];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !open && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setOpen(true),
        "aria-label": "Mở chat tư vấn hoa",
        className: "fixed bottom-40 right-5 z-30 flex h-13 w-13 items-center justify-center rounded-full bg-gold p-3.5 text-primary shadow-elegant transition hover:scale-105",
        children: /* @__PURE__ */ jsx(MessageSquareHeart, { className: "h-5 w-5" })
      }
    ),
    open && /* @__PURE__ */ jsxs("div", { className: "fixed bottom-5 right-5 z-40 flex h-[min(600px,80vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-elegant", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-serif text-base font-semibold", children: "Tư vấn cùng Ngọc 🌸" }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] opacity-80", children: "Phản hồi trong vài giây" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setOpen(false), "aria-label": "Đóng", className: "rounded-full p-1.5 hover:bg-primary-foreground/10", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { ref: scrollRef, className: "flex-1 space-y-3 overflow-y-auto bg-cream/40 p-4", children: [
        messages.map((m, i) => /* @__PURE__ */ jsxs("div", { className: `flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`, children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `max-w-[90%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-background text-foreground shadow-soft"}`,
              children: m.content
            }
          ),
          m.products && m.products.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 grid w-full max-w-[90%] gap-2", children: m.products.map((p) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/san-pham/$slug",
              params: { slug: p.slug },
              target: "_blank",
              className: "flex items-center gap-3 rounded-xl border border-border bg-card p-2.5 shadow-soft transition hover:border-primary hover:shadow-md",
              children: [
                /* @__PURE__ */ jsx("div", { className: "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: p.thumb,
                    alt: p.name,
                    loading: "lazy",
                    width: 64,
                    height: 64,
                    className: "h-full w-full object-cover",
                    onError: (e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = '<div class="flex h-full items-center justify-center text-muted-foreground"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg></div>';
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium text-foreground", children: p.name }),
                  /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-muted-foreground", children: p.short }),
                  /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-sm font-semibold text-primary", children: p.price })
                ] }),
                /* @__PURE__ */ jsx(ImageIcon, { className: "h-4 w-4 shrink-0 text-primary" })
              ]
            },
            p.slug
          )) })
        ] }, i)),
        loading && /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl rounded-bl-sm bg-background px-3.5 py-2.5 shadow-soft", children: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" }) }) })
      ] }),
      messages.length <= 1 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 border-t border-border bg-background px-3 pt-3", children: suggestions.map((s) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setInput(s),
          className: "rounded-full border border-border bg-cream px-3 py-1 text-xs text-foreground/80 hover:border-primary hover:text-primary",
          children: s
        },
        s
      )) }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            send();
          },
          className: "flex items-center gap-2 border-t border-border bg-background p-3",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Nhập câu hỏi của bạn...",
                className: "flex-1 rounded-full border border-border bg-cream/60 px-4 py-2.5 text-sm outline-none focus:border-primary",
                disabled: loading,
                maxLength: 500
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: loading || !input.trim(),
                "aria-label": "Gửi",
                className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50",
                children: /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" })
              }
            )
          ]
        }
      )
    ] })
  ] });
}
function SiteLayout({ children }) {
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(CartDrawer, {}),
    /* @__PURE__ */ jsx(FloatingActions, {}),
    /* @__PURE__ */ jsx(ChatBot, {})
  ] });
}
export {
  SiteLayout as S,
  useCart as u
};
