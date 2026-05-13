import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { T as TAGS } from "./router-DQf0jzPI.js";
import { Tag } from "lucide-react";
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
function TagIndexPage() {
  const featured = TAGS.slice(0, 16);
  const rest = TAGS.slice(16);
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-cream py-14 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-4xl px-4 text-center md:px-8", children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-primary", children: "Trang chủ" }),
        " ·",
        " ",
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: "Thẻ sản phẩm" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-3 text-xs uppercase tracking-[0.3em] text-primary", children: "Khám phá theo chủ đề" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-4xl font-semibold text-foreground md:text-5xl", children: "Tất Cả Thẻ Sản Phẩm" }),
      /* @__PURE__ */ jsxs("p", { className: "mx-auto mt-4 max-w-2xl text-base text-muted-foreground", children: [
        TAGS.length,
        " chủ đề được tổng hợp từ tất cả mẫu hoa của Thanh Ngọc — chọn nhanh theo dịp, theo loài hoa hoặc theo phong cách bạn yêu thích."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl font-semibold text-foreground", children: "Thẻ nổi bật" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Những chủ đề được khách hàng tìm kiếm nhiều nhất." }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: featured.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/the/$tag", params: {
        tag: t.slug
      }, className: "group flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3.5 shadow-soft transition hover:border-primary hover:shadow-elegant", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-cream text-primary", children: /* @__PURE__ */ jsx(Tag, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-medium text-foreground group-hover:text-primary", children: [
            "#",
            t.label
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
          t.products.length,
          " mẫu"
        ] })
      ] }, t.slug)) }),
      rest.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("h2", { className: "mt-12 font-serif text-2xl font-semibold text-foreground", children: "Tất cả thẻ" }),
        /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: rest.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/the/$tag", params: {
          tag: t.slug
        }, className: "rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground/80 hover:border-primary hover:text-primary", children: [
          "#",
          t.label,
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "(",
            t.products.length,
            ")"
          ] })
        ] }, t.slug)) })
      ] })
    ] }) })
  ] });
}
export {
  TagIndexPage as component
};
