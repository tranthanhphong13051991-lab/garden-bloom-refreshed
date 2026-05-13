import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { P as POSTS, f as formatDate } from "./router-DQf0jzPI.js";
import { Calendar, Clock } from "lucide-react";
import "react";
import "zustand";
import "zustand/middleware";
import "./products-c_hw6lyT.js";
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
function BlogIndex() {
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-cream py-16 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center md:px-8", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-primary", children: "Cẩm nang" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-4xl font-semibold text-foreground md:text-5xl", children: "Blog Hoa Tươi Thanh Ngọc" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-2xl text-base text-muted-foreground", children: "Mẹo chăm hoa, ý nghĩa các loài hoa và gợi ý chọn hoa theo dịp — chia sẻ từ tiệm hoa Bình Thạnh." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3", children: POSTS.map((p) => /* @__PURE__ */ jsxs(Link, { to: "/blog/$slug", params: {
      slug: p.slug
    }, className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-soft transition hover:shadow-elegant", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden bg-cream", children: /* @__PURE__ */ jsx("img", { src: p.cover, alt: p.title, loading: "lazy", className: "h-full w-full object-cover transition duration-500 group-hover:scale-105" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Calendar, { className: "h-3.5 w-3.5" }),
            formatDate(p.publishedAt)
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
            p.readingMinutes,
            " phút đọc"
          ] })
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "mt-3 font-serif text-xl font-semibold leading-snug text-foreground group-hover:text-primary", children: p.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-3 text-sm text-muted-foreground", children: p.excerpt }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-1.5", children: p.tags.slice(0, 3).map((t) => /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-cream px-2.5 py-0.5 text-[11px] text-foreground/70", children: [
          "#",
          t
        ] }, t)) })
      ] })
    ] }, p.slug)) }) })
  ] });
}
export {
  BlogIndex as component
};
