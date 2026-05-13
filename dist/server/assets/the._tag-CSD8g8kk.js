import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { P as ProductCard } from "./ProductCard-DdHIvgrg.js";
import { a as Route, T as TAGS } from "./router-DQf0jzPI.js";
import "react";
import "lucide-react";
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
function TagPage() {
  const {
    tag
  } = Route.useLoaderData();
  const popular = TAGS.filter((t) => t.slug !== tag.slug).slice(0, 12);
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-cream py-12 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-primary", children: "Trang chủ" }),
        " · ",
        /* @__PURE__ */ jsxs("span", { className: "text-foreground", children: [
          "Thẻ #",
          tag.label
        ] })
      ] }),
      /* @__PURE__ */ jsxs("h1", { className: "mt-3 font-serif text-4xl font-semibold text-foreground md:text-5xl", children: [
        "#",
        tag.label
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-base text-muted-foreground", children: [
        tag.products.length,
        " mẫu hoa được gắn thẻ ",
        /* @__PURE__ */ jsx("strong", { children: tag.label }),
        ". Tất cả đều giao nhanh 2h tại TP.HCM, kèm thiệp viết tay miễn phí."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: tag.products.map((p) => /* @__PURE__ */ jsx(ProductCard, { product: p }, p.slug)) }) }) }),
    popular.length > 0 && /* @__PURE__ */ jsx("section", { className: "border-t border-border bg-cream/40 py-12", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl font-semibold", children: "Khám phá thẻ khác" }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: popular.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/the/$tag", params: {
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
    ] }) })
  ] });
}
export {
  TagPage as component
};
