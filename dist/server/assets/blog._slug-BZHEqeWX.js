import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { d as Route, p as parseContent, P as POSTS, f as formatDate, t as tagSlug } from "./router-DQf0jzPI.js";
import { User, Calendar, Clock } from "lucide-react";
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
function BlogPost() {
  const {
    post
  } = Route.useLoaderData();
  const blocks = parseContent(post.content);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsxs("article", { className: "mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16", children: [
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-primary", children: "Trang chủ" }),
        " · ",
        /* @__PURE__ */ jsx(Link, { to: "/blog", className: "hover:text-primary", children: "Blog" }),
        /* @__PURE__ */ jsx("span", { children: " · " }),
        /* @__PURE__ */ jsx("span", { className: "text-foreground", children: post.title })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-5 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl", children: post.title }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
          post.author
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4" }),
          formatDate(post.publishedAt)
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
          post.readingMinutes,
          " phút đọc"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 overflow-hidden rounded-2xl bg-cream shadow-soft", children: /* @__PURE__ */ jsx("img", { src: post.cover, alt: post.title, className: "aspect-[16/9] w-full object-cover" }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-8 text-lg leading-relaxed text-foreground/80", children: post.excerpt }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-5 leading-relaxed text-foreground/85", children: blocks.map((b, i) => {
        if (b.type === "h2") return /* @__PURE__ */ jsx("h2", { className: "mt-8 font-serif text-2xl font-semibold text-primary", children: b.text }, i);
        if (b.type === "ul") return /* @__PURE__ */ jsx("ul", { className: "ml-5 list-disc space-y-2", children: b.items.map((it, j) => /* @__PURE__ */ jsx("li", { children: it }, j)) }, i);
        return /* @__PURE__ */ jsx("p", { children: b.text }, i);
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t border-border pt-6", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium uppercase tracking-wider text-muted-foreground", children: "Thẻ bài viết" }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: post.tags.map((t) => /* @__PURE__ */ jsxs(Link, { to: "/the/$tag", params: {
          tag: tagSlug(t)
        }, className: "rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80 hover:border-primary hover:text-primary", children: [
          "#",
          t
        ] }, t)) })
      ] })
    ] }),
    related.length > 0 && /* @__PURE__ */ jsx("section", { className: "bg-cream py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl font-semibold md:text-4xl", children: "Bài Viết Liên Quan" }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-6 md:grid-cols-3", children: related.map((p) => /* @__PURE__ */ jsxs(Link, { to: "/blog/$slug", params: {
        slug: p.slug
      }, className: "group overflow-hidden rounded-2xl bg-background shadow-soft transition hover:shadow-elegant", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[4/3] overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: p.cover, alt: p.title, loading: "lazy", className: "h-full w-full object-cover transition duration-500 group-hover:scale-105" }) }),
        /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg font-semibold text-foreground group-hover:text-primary", children: p.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 line-clamp-2 text-sm text-muted-foreground", children: p.excerpt })
        ] })
      ] }, p.slug)) })
    ] }) })
  ] });
}
const SplitComponent = BlogPost;
export {
  SplitComponent as component
};
