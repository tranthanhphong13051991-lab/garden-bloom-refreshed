import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { ArrowLeft } from "lucide-react";
import "react";
import "zustand";
import "zustand/middleware";
import "./router-DQf0jzPI.js";
import "@tanstack/react-query";
import "./products-c_hw6lyT.js";
import "zod";
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
const SplitNotFoundComponent = () => /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-xl px-4 py-32 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl", children: "Không tìm thấy thẻ" }),
  /* @__PURE__ */ jsxs(Link, { to: "/san-pham", className: "mt-6 inline-flex items-center gap-2 text-primary hover:underline", children: [
    /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
    " Xem tất cả sản phẩm"
  ] })
] }) });
export {
  SplitNotFoundComponent as notFoundComponent
};
