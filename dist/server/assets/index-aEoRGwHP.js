import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone, Flower2, Truck, Sparkles, Mail, MapPin } from "lucide-react";
import { useEffect } from "react";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { P as ProductCard } from "./ProductCard-DdHIvgrg.js";
import { b as featuredProducts, C as CATEGORIES, P as PRODUCTS } from "./products-c_hw6lyT.js";
import { S as SITE } from "./router-DQf0jzPI.js";
import { u as useCategoryImages } from "./category-images-CfA_IKo7.js";
import "zustand";
import "zustand/middleware";
import "./createSsrRpc-cz3zUEHg.js";
import "./server-ma-ijNXL.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
import "@tanstack/react-query";
function HomePage() {
  const featured = featuredProducts();
  const catImages = useCategoryImages((s) => s.images);
  useEffect(() => {
    useCategoryImages.persist.rehydrate();
  }, []);
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-gradient-hero text-primary-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_20%_30%,white_0,transparent_40%),radial-gradient(circle_at_80%_70%,white_0,transparent_45%)]" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-24 text-center md:px-8 md:py-32", children: [
        /* @__PURE__ */ jsx("p", { className: "ornament inline-block text-xs uppercase tracking-[0.35em] text-gold", children: "Tiệm Hoa Bình Thạnh" }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 font-serif text-5xl font-semibold leading-[1.05] md:text-7xl lg:text-8xl", children: [
          "Thanh Ngọc",
          /* @__PURE__ */ jsx("span", { className: "mt-2 block font-serif text-3xl italic text-gold md:text-4xl", children: "— Flower's —" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-7 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-lg", children: "Gửi trọn yêu thương qua từng cánh hoa tươi thắm — Mỗi bó hoa là một lời nói từ trái tim." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/san-pham", className: "group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-medium text-primary shadow-elegant transition hover:scale-[1.02]", children: [
            "Xem Bộ Sưu Tập ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: `tel:${SITE.phones[0]}`, className: "inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 font-medium text-primary-foreground transition hover:bg-primary-foreground/10", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
            " ",
            SITE.phones[0]
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border bg-background", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-4 md:px-0", children: [{
      I: Flower2,
      t: "Hoa Tươi 100%",
      d: "Nhập trực tiếp mỗi ngày"
    }, {
      I: Truck,
      t: "Giao Hàng Nhanh",
      d: "Tận nơi trong 2 giờ"
    }, {
      I: Sparkles,
      t: "Thiết Kế Theo Yêu Cầu",
      d: "Cá nhân hoá từng bó hoa"
    }, {
      I: Mail,
      t: "Kèm Thiệp Miễn Phí",
      d: "Viết lời chúc yêu thương"
    }].map((u, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 bg-background p-6", children: [
      /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary", children: /* @__PURE__ */ jsx(u.I, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-serif text-lg font-semibold text-foreground", children: u.t }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: u.d })
      ] })
    ] }, i)) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "ornament text-xs uppercase tracking-[0.35em] text-primary", children: "Danh Mục" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 font-serif text-4xl font-semibold text-foreground md:text-5xl", children: "Bộ Sưu Tập Hoa" }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-2xl text-muted-foreground", children: "Mỗi đoá hoa là một câu chuyện yêu thương được kể bằng ngôn ngữ của thiên nhiên." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5", children: CATEGORIES.map((c) => {
        const sample = PRODUCTS.find((p) => p.category === c.id);
        return /* @__PURE__ */ jsxs(Link, { to: "/san-pham", search: {
          cat: c.id
        }, className: "group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft transition-transform hover:-translate-y-1", children: [
          (catImages[c.id] || sample) && /* @__PURE__ */ jsx("img", { src: catImages[c.id] || (sample ? sample.thumb : ""), alt: c.label, loading: "lazy", width: 400, height: 533, className: "absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 text-primary-foreground", children: [
            /* @__PURE__ */ jsx("div", { className: "font-serif text-2xl font-semibold", children: c.label }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 text-xs text-primary-foreground/80", children: c.description })
          ] })
        ] }, c.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "ornament text-xs uppercase tracking-[0.35em] text-primary", children: "Nổi Bật" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-4 font-serif text-4xl font-semibold md:text-5xl", children: "Sản Phẩm Bán Chạy" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/san-pham", className: "inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-gold", children: [
          "Xem tất cả ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: featured.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, eager: i < 4 }, p.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "ornament text-xs uppercase tracking-[0.35em] text-gold", children: "Liên Hệ" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 font-serif text-4xl font-semibold md:text-5xl", children: "Đặt Hoa Cho Bạn" }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 text-primary-foreground/80", children: "Để lại thông tin — chúng tôi sẽ liên hệ và tư vấn bó hoa phù hợp nhất cho bạn. Hoặc gọi/Zalo trực tiếp để được hỗ trợ ngay." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-4 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-5 w-5 text-gold" }),
            /* @__PURE__ */ jsx("div", { children: SITE.address })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Phone, { className: "mt-0.5 h-5 w-5 text-gold" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("a", { href: `tel:${SITE.phones[0]}`, className: "hover:text-gold", children: SITE.phones[0] }),
              " · ",
              /* @__PURE__ */ jsx("a", { href: `tel:${SITE.phones[1]}`, className: "hover:text-gold", children: SITE.phones[1] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "mt-0.5 h-5 w-5 text-gold" }),
            /* @__PURE__ */ jsx("a", { href: `mailto:${SITE.email}`, className: "hover:text-gold", children: SITE.email })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8", children: [
        /* @__PURE__ */ jsx("div", { className: "font-serif text-2xl", children: "Đặt nhanh trong 1 phút" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-primary-foreground/80", children: "Tư vấn miễn phí — báo giá ngay — giao hoa trong 2 giờ." }),
        /* @__PURE__ */ jsx("a", { href: SITE.zalo, target: "_blank", rel: "noopener", className: "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-medium text-primary transition hover:scale-[1.02]", children: "Chat Zalo Tư Vấn" }),
        /* @__PURE__ */ jsxs("a", { href: `tel:${SITE.phones[0]}`, className: "inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 font-medium text-primary-foreground transition hover:bg-primary-foreground/10", children: [
          /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
          " Gọi ",
          SITE.phones[0]
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/lien-he", className: "text-center text-xs text-primary-foreground/70 underline-offset-4 hover:underline", children: "Hoặc gửi yêu cầu chi tiết →" })
      ] })
    ] }) })
  ] });
}
export {
  HomePage as component
};
