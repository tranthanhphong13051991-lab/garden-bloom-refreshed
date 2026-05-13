import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Truck, Sparkles, Mail, ShoppingBag, MessageCircle, Phone, Images, X, ChevronLeft, ChevronRight, Heart, Gift, Palette, Leaf, Ruler, AlertTriangle } from "lucide-react";
import { u as useCart, S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { P as ProductCard } from "./ProductCard-DdHIvgrg.js";
import { C as CATEGORIES, P as PRODUCTS } from "./products-c_hw6lyT.js";
import { b as Route, c as findTag, t as tagSlug, S as SITE } from "./router-DQf0jzPI.js";
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
function ProductDetail() {
  const {
    product
  } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const cat = CATEGORIES.find((c) => c.id === product.category);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const tagSuggestions = product.keywords.map((k) => findTag(tagSlug(k))).filter((t) => !!t).map((t) => ({
    ...t,
    products: t.products.filter((p) => p.slug !== product.slug).slice(0, 4)
  })).filter((t) => t.products.length > 0).slice(0, 3);
  const orderMsg = encodeURIComponent(`Xin chào Hoa Tươi Thanh Ngọc, tôi muốn đặt sản phẩm: ${product.name}. Xin tư vấn và báo giá giúp tôi.`);
  const galleryShots = [{
    src: product.image,
    alt: product.name,
    variant: "Hình đại diện",
    note: "Ảnh mẫu hiển thị trên website — bố cục và tone màu chuẩn."
  }, ...product.gallery];
  const [lightbox, setLightbox] = useState(null);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => i === null ? null : (i - 1 + galleryShots.length) % galleryShots.length);
  const next = () => setLightbox((i) => i === null ? null : (i + 1) % galleryShots.length);
  const [activeSection, setActiveSection] = useState("y-nghia");
  useEffect(() => {
    const ids = ["y-nghia", "mau-sac", "kich-thuoc", "faq"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActiveSection(id);
      }, {
        rootMargin: "0px 0px -60% 0px"
      });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 136;
    window.scrollTo({
      top,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-cream py-6", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-primary", children: "Trang chủ" }),
      " · ",
      /* @__PURE__ */ jsx(Link, { to: "/san-pham", className: "hover:text-primary", children: "Sản phẩm" }),
      cat && /* @__PURE__ */ jsxs(Fragment, { children: [
        " · ",
        /* @__PURE__ */ jsx(Link, { to: "/san-pham", search: {
          cat: cat.id
        }, className: "hover:text-primary", children: cat.label })
      ] }),
      /* @__PURE__ */ jsx("span", { children: " · " }),
      /* @__PURE__ */ jsx("span", { className: "text-foreground", children: product.name })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-3xl bg-cream shadow-soft", children: /* @__PURE__ */ jsx("img", { src: product.image, alt: product.name, width: 800, height: 800, className: "aspect-square h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          cat && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary", children: cat.label }),
          product.badge && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-primary", children: product.badge }),
          /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-cream px-3 py-1 text-xs font-medium text-muted-foreground", children: [
            "★ ",
            product.rating.value.toFixed(1),
            " · ",
            product.rating.count,
            " đánh giá"
          ] })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl", children: product.name }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-serif text-2xl font-semibold text-primary", children: "Liên hệ báo giá" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Tư vấn miễn phí — kèm thiệp & gói quà" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 text-base leading-relaxed text-muted-foreground", children: product.description }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-6 grid gap-3 text-sm", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(Truck, { className: "h-5 w-5 text-gold" }),
            " Giao hàng nhanh trong 2 giờ tại TP.HCM"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-gold" }),
            " Thiết kế cá nhân hoá theo yêu cầu"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-gold" }),
            " Tặng kèm thiệp viết tay miễn phí"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => add(product), className: "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:bg-primary/90 sm:flex-none", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
            " Thêm vào giỏ"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: `${SITE.zalo}?body=${orderMsg}`, target: "_blank", rel: "noopener", className: "inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-medium text-primary transition hover:scale-[1.02]", children: [
            /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
            " Đặt qua Zalo"
          ] }),
          /* @__PURE__ */ jsxs("a", { href: `tel:${SITE.phones[0]}`, className: "inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground", children: [
            /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }),
            " Gọi đặt"
          ] })
        ] }),
        product.keywords.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8 border-t border-border pt-6", children: [
          /* @__PURE__ */ jsx("div", { className: "mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Từ khoá liên quan" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: product.keywords.map((k) => /* @__PURE__ */ jsxs(Link, { to: "/the/$tag", params: {
            tag: tagSlug(k)
          }, className: "rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80 transition hover:border-primary hover:text-primary", children: [
            "#",
            k
          ] }, k)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary", children: [
            /* @__PURE__ */ jsx(Images, { className: "h-3.5 w-3.5" }),
            " Hình Ảnh Thực Nhận"
          ] }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 font-serif text-3xl font-semibold md:text-4xl", children: "Sản phẩm thực tế qua từng lô" }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground", children: "So sánh hình đại diện với ảnh thực tế từ các lô khác nhau để bạn hình dung rõ mức độ chênh lệch tự nhiên về tone màu, độ nở của hoa và kiểu gói thủ công." })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-cream px-3 py-1 text-xs font-medium text-muted-foreground", children: [
          galleryShots.length,
          " ảnh"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: galleryShots.map((shot, i) => /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => setLightbox(i), className: "group relative overflow-hidden rounded-2xl border border-border bg-cream shadow-soft transition hover:-translate-y-1 hover:shadow-elegant", "aria-label": `Xem ${shot.variant}`, children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: shot.src, alt: shot.alt, width: 400, height: 400, loading: "lazy", decoding: "async", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-left", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[11px] font-medium uppercase tracking-wider text-white/80", children: i === 0 ? "Mẫu chuẩn" : "Lô thực tế" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold text-white", children: shot.variant })
        ] })
      ] }, i)) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-xs leading-relaxed text-muted-foreground", children: [
        /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Vì sao có khác biệt?" }),
        " Hoa là hàng nông nghiệp tự nhiên — màu sắc, kích cỡ và độ nở thay đổi theo mùa và từng lô nhập. Mỗi bó/giỏ được gói thủ công nên ruy băng, nếp giấy có thể chênh lệch đôi chút. Chúng tôi luôn giữ đúng ",
        /* @__PURE__ */ jsx("em", { children: "bố cục, tone chủ đạo" }),
        " và",
        /* @__PURE__ */ jsx("em", { children: " chất lượng hoa tươi" }),
        " như mẫu."
      ] })
    ] }) }),
    lightbox !== null && /* @__PURE__ */ jsxs("div", { role: "dialog", "aria-modal": "true", "aria-label": "Xem ảnh phóng to", className: "fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm", onClick: closeLightbox, children: [
      /* @__PURE__ */ jsx("button", { onClick: closeLightbox, "aria-label": "Đóng", className: "absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20", children: /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("button", { onClick: (e) => {
        e.stopPropagation();
        prev();
      }, "aria-label": "Ảnh trước", className: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:left-6", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("button", { onClick: (e) => {
        e.stopPropagation();
        next();
      }, "aria-label": "Ảnh sau", className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-6", children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxs("figure", { className: "flex max-h-[90vh] max-w-5xl flex-col items-center gap-3", onClick: (e) => e.stopPropagation(), children: [
        /* @__PURE__ */ jsx("img", { src: galleryShots[lightbox].src, alt: galleryShots[lightbox].alt, className: "max-h-[75vh] w-auto rounded-2xl object-contain shadow-elegant" }),
        /* @__PURE__ */ jsxs("figcaption", { className: "max-w-2xl rounded-xl bg-white/10 px-4 py-2.5 text-center text-sm text-white backdrop-blur", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: galleryShots[lightbox].variant }),
          galleryShots[lightbox].note && /* @__PURE__ */ jsxs(Fragment, { children: [
            " — ",
            /* @__PURE__ */ jsx("span", { className: "text-white/80", children: galleryShots[lightbox].note })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "mt-1 block text-xs text-white/60", children: [
            lightbox + 1,
            " / ",
            galleryShots.length
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { "aria-label": "Điều hướng nội dung sản phẩm", className: "sticky top-20 z-30 border-b border-border/60 bg-background/95 backdrop-blur-sm", children: /* @__PURE__ */ jsx("div", { className: "mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 md:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden", children: [{
      id: "y-nghia",
      label: "Ý nghĩa"
    }, {
      id: "mau-sac",
      label: "Màu sắc"
    }, {
      id: "kich-thuoc",
      label: "Kích thước"
    }, {
      id: "faq",
      label: "FAQ"
    }].map((t) => /* @__PURE__ */ jsx("button", { type: "button", onClick: () => scrollTo(t.id), className: `shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${activeSection === t.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-cream hover:text-foreground"}`, children: t.label }, t.id)) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream/40 py-14", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("header", { className: "mb-10 max-w-2xl", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Mô Tả Sản Phẩm" }),
        /* @__PURE__ */ jsxs("h2", { className: "mt-2 font-serif text-3xl font-semibold md:text-4xl", children: [
          "Chi Tiết ",
          product.name
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: "Tìm hiểu sâu hơn về ý nghĩa, bảng màu chủ đạo, kích thước tham khảo và cách giữ hoa tươi lâu nhất." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("article", { id: "y-nghia", className: "rounded-2xl border border-border bg-background p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 font-serif text-xl font-semibold text-foreground", children: [
            /* @__PURE__ */ jsx(Heart, { className: "h-5 w-5 text-primary" }),
            " Ý nghĩa & thông điệp"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground", children: product.meaning.map((m, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" }),
            /* @__PURE__ */ jsx("span", { children: m })
          ] }, i)) }),
          product.occasions.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Gift, { className: "h-3.5 w-3.5" }),
              " Dịp tặng phù hợp"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: product.occasions.map((o) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-primary/10 px-3 py-1 text-xs text-primary", children: o }, o)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("article", { id: "mau-sac", className: "rounded-2xl border border-border bg-background p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 font-serif text-xl font-semibold text-foreground", children: [
            /* @__PURE__ */ jsx(Palette, { className: "h-5 w-5 text-primary" }),
            " Bảng màu chủ đạo"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3", children: product.colors.map((c) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-border bg-cream/40 px-3 py-2.5", children: [
            /* @__PURE__ */ jsx("span", { className: "h-7 w-7 shrink-0 rounded-full border border-border shadow-sm", style: {
              backgroundColor: c.hex
            }, "aria-label": c.name }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: c.name })
          ] }, c.name)) }),
          product.materials.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-5 border-t border-border pt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground", children: [
              /* @__PURE__ */ jsx(Leaf, { className: "h-3.5 w-3.5" }),
              " Chất liệu / Loài hoa chính"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: product.materials.join(" · ") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("article", { id: "kich-thuoc", className: "rounded-2xl border border-border bg-background p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 font-serif text-xl font-semibold text-foreground", children: [
            /* @__PURE__ */ jsx(Ruler, { className: "h-5 w-5 text-primary" }),
            " Kích thước tham khảo"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 overflow-hidden rounded-xl border border-border", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsx("thead", { className: "bg-cream/60 text-left text-xs uppercase tracking-wider text-muted-foreground", children: /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2.5 font-medium", children: "Phiên bản" }),
              /* @__PURE__ */ jsx("th", { className: "px-4 py-2.5 font-medium", children: "Kích thước" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-border", children: product.sizes.map((s) => /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: s.label }),
              /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 text-muted-foreground", children: [
                s.dimension,
                s.note && /* @__PURE__ */ jsx("span", { className: "block text-xs text-muted-foreground/80", children: s.note })
              ] })
            ] }, s.label)) })
          ] }) }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: "* Kích thước có thể chênh lệch ±5–10% tuỳ kiểu thiết kế và loài hoa thực tế trong ngày." })
        ] }),
        /* @__PURE__ */ jsxs("article", { className: "rounded-2xl border border-border bg-background p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 font-serif text-xl font-semibold text-foreground", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
            " Cách giữ hoa tươi lâu"
          ] }),
          /* @__PURE__ */ jsx("ol", { className: "mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground", children: product.careTips.map((t, i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary", children: i + 1 }),
            /* @__PURE__ */ jsx("span", { children: t })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { role: "note", className: "mt-8 flex gap-4 rounded-2xl border border-gold/40 bg-gold/10 p-5 shadow-soft", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-6 w-6 shrink-0 text-primary", "aria-hidden": true }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-serif text-lg font-semibold text-foreground", children: "Lưu ý quan trọng" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm leading-relaxed text-foreground/80", children: [
            "Sản phẩm thực nhận có thể khác đôi chút so với hình đại diện trên website do",
            /* @__PURE__ */ jsx("strong", { children: " đặc điểm thủ công" }),
            " trong từng thiết kế và ",
            /* @__PURE__ */ jsx("strong", { children: "tính chất tự nhiên" }),
            " của hàng nông nghiệp (màu sắc, kích cỡ bông, độ nở của hoa thay đổi theo mùa và lô hàng). Chúng tôi cam kết giữ đúng tone màu, bố cục và chất lượng tươi mới của sản phẩm."
          ] })
        ] })
      ] })
    ] }) }),
    product.faqs.length > 0 && /* @__PURE__ */ jsx("section", { id: "faq", className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-semibold md:text-4xl", children: "Câu Hỏi Thường Gặp" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 divide-y divide-border rounded-2xl border border-border bg-background shadow-soft", children: product.faqs.map((f, i) => /* @__PURE__ */ jsxs("details", { className: "group p-5 open:bg-cream/40", children: [
        /* @__PURE__ */ jsxs("summary", { className: "flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground", children: [
          /* @__PURE__ */ jsx("span", { children: f.q }),
          /* @__PURE__ */ jsx("span", { className: "text-xl leading-none text-primary transition group-open:rotate-45", children: "+" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: f.a })
      ] }, i)) })
    ] }) }),
    tagSuggestions.length > 0 && /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Khám phá thêm" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 font-serif text-3xl font-semibold md:text-4xl", children: "Gợi Ý Theo Thẻ" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 max-w-2xl text-sm text-muted-foreground", children: [
            "Những mẫu hoa cùng chủ đề với ",
            /* @__PURE__ */ jsx("strong", { children: product.name }),
            " — gợi ý nhanh khi bạn muốn so sánh phong cách hoặc tìm phương án thay thế."
          ] })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/the", className: "hidden text-sm text-primary hover:underline md:inline", children: "Tất cả thẻ →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 space-y-12", children: tagSuggestions.map((t) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-serif text-xl font-semibold text-foreground", children: [
            /* @__PURE__ */ jsxs(Link, { to: "/the/$tag", params: {
              tag: t.slug
            }, className: "hover:text-primary", children: [
              "#",
              t.label
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "ml-2 text-sm font-normal text-muted-foreground", children: [
              "(",
              t.products.length,
              " mẫu liên quan)"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/the/$tag", params: {
            tag: t.slug
          }, className: "text-xs text-primary hover:underline", children: "Xem tất cả →" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: t.products.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.slug)) })
      ] }, t.slug)) })
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-semibold md:text-4xl", children: "Sản Phẩm Liên Quan" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: related.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.slug)) })
    ] }) })
  ] });
}
export {
  ProductDetail as component
};
