import { jsx, jsxs } from "react/jsx-runtime";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import "react";
import "@tanstack/react-router";
import "lucide-react";
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
const SplitErrorComponent = ({
  error,
  reset
}) => /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-xl px-4 py-32 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "font-serif text-2xl", children: "Đã có lỗi xảy ra" }),
  /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
  /* @__PURE__ */ jsx("button", { onClick: reset, className: "mt-6 rounded-full bg-primary px-6 py-2.5 text-primary-foreground", children: "Thử lại" })
] }) });
export {
  SplitErrorComponent as errorComponent
};
