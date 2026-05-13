import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { u as useCart } from "./SiteLayout-3xrACp3X.js";
import { a as formatPrice } from "./products-c_hw6lyT.js";
function ProductCard({ product, eager = false }) {
  const add = useCart((s) => s.add);
  return /* @__PURE__ */ jsxs("article", { className: "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/san-pham/$slug",
        params: { slug: product.slug },
        className: "relative aspect-square overflow-hidden bg-cream",
        "aria-label": product.name,
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: product.thumb,
              alt: product.name,
              width: 400,
              height: 400,
              loading: eager ? "eager" : "lazy",
              decoding: "async",
              className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            }
          ),
          product.badge && /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-sm", children: product.badge })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col p-5", children: [
      /* @__PURE__ */ jsx(Link, { to: "/san-pham/$slug", params: { slug: product.slug }, children: /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary", children: product.name }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground", children: product.short }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "font-serif text-xl font-semibold text-primary", children: formatPrice(product.price) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => add(product),
            "aria-label": `Thêm ${product.name} vào giỏ`,
            className: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-gold hover:text-primary",
            children: /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" })
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProductCard as P
};
