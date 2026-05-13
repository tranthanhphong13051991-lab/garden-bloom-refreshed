import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { P as ProductCard } from "./ProductCard-DdHIvgrg.js";
import { P as PRODUCTS, C as CATEGORIES } from "./products-c_hw6lyT.js";
import { R as Route } from "./router-DQf0jzPI.js";
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
function ProductsPage() {
  const {
    cat
  } = Route.useSearch();
  const [q, setQ] = useState("");
  const filtered = PRODUCTS.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (q) {
      const t = q.toLowerCase();
      return p.name.toLowerCase().includes(t) || p.short.toLowerCase().includes(t);
    }
    return true;
  });
  const activeCat = cat ? CATEGORIES.find((c) => c.id === cat) : null;
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-cream py-14 md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 text-center md:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "ornament text-xs uppercase tracking-[0.35em] text-primary", children: "Bộ Sưu Tập" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 font-serif text-4xl font-semibold text-foreground md:text-6xl", children: activeCat ? activeCat.label : "Tất Cả Sản Phẩm" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-3 max-w-2xl text-muted-foreground", children: activeCat ? activeCat.description : "Khám phá tất cả các mẫu hoa tươi tại Thanh Ngọc Flower's." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-12 md:py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [
        /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap gap-2", "aria-label": "Lọc danh mục", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/san-pham", className: `rounded-full border px-4 py-2 text-sm transition ${!cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary hover:text-primary"}`, children: [
            "Tất Cả (",
            PRODUCTS.length,
            ")"
          ] }),
          CATEGORIES.map((c) => {
            const count = PRODUCTS.filter((p) => p.category === c.id).length;
            const active = cat === c.id;
            return /* @__PURE__ */ jsxs(Link, { to: "/san-pham", search: {
              cat: c.id
            }, className: `rounded-full border px-4 py-2 text-sm transition ${active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary hover:text-primary"}`, children: [
              c.label,
              " (",
              count,
              ")"
            ] }, c.id);
          })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-72", children: [
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Tìm tên hoa...", className: "w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary", "aria-label": "Tìm sản phẩm" })
        ] })
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "mt-16 text-center text-muted-foreground", children: "Không tìm thấy sản phẩm phù hợp." }) : /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: filtered.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, eager: i < 4 }, p.slug)) })
    ] }) })
  ] });
}
export {
  ProductsPage as component
};
