import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { S as SITE } from "./router-DQf0jzPI.js";
import "@tanstack/react-router";
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
function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    occasion: "",
    note: ""
  });
  const onSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent(`Xin chào Thanh Ngọc, tôi muốn đặt hoa:

Họ tên: ${form.name}
SĐT: ${form.phone}
Dịp: ${form.occasion || "—"}
Yêu cầu: ${form.note || "—"}`);
    window.location.href = `${SITE.zalo}?body=${body}`;
  };
  const items = [{
    I: MapPin,
    t: "Địa chỉ",
    c: SITE.address
  }, {
    I: Phone,
    t: "Hotline",
    c: SITE.phones.join(" · "),
    href: `tel:${SITE.phones[0]}`
  }, {
    I: Mail,
    t: "Email",
    c: SITE.email,
    href: `mailto:${SITE.email}`
  }, {
    I: Clock,
    t: "Giờ mở cửa",
    c: SITE.hours
  }];
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-cream py-16 text-center md:py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "ornament text-xs uppercase tracking-[0.35em] text-primary", children: "Liên Hệ" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 font-serif text-5xl font-semibold md:text-6xl", children: "Đặt Hoa Cho Bạn" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Để lại thông tin — chúng tôi sẽ liên hệ và tư vấn bó hoa phù hợp nhất cho bạn." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-16", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-5 md:px-8", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-5 md:col-span-2", children: [
        items.map((it) => /* @__PURE__ */ jsxs("div", { className: "flex gap-4 rounded-2xl border border-border bg-background p-5 shadow-soft", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(it.I, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: it.t }),
            it.href ? /* @__PURE__ */ jsx("a", { href: it.href, className: "font-serif text-lg text-foreground hover:text-primary", children: it.c }) : /* @__PURE__ */ jsx("div", { className: "font-serif text-lg text-foreground", children: it.c })
          ] })
        ] }, it.t)),
        /* @__PURE__ */ jsxs("a", { href: SITE.zalo, target: "_blank", rel: "noopener", className: "flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-medium text-primary transition hover:scale-[1.02]", children: [
          /* @__PURE__ */ jsx(MessageCircle, { className: "h-4 w-4" }),
          " Chat Zalo Ngay"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4 rounded-2xl border border-border bg-background p-8 shadow-soft md:col-span-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-2xl text-primary", children: "Gửi yêu cầu đặt hoa" }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Họ và tên *" }),
            /* @__PURE__ */ jsx("input", { required: true, value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value
            }), className: "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Số điện thoại *" }),
            /* @__PURE__ */ jsx("input", { required: true, type: "tel", value: form.phone, onChange: (e) => setForm({
              ...form,
              phone: e.target.value
            }), className: "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Dịp tặng hoa" }),
          /* @__PURE__ */ jsxs("select", { value: form.occasion, onChange: (e) => setForm({
            ...form,
            occasion: e.target.value
          }), className: "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary", children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "— Chọn dịp —" }),
            /* @__PURE__ */ jsx("option", { children: "Sinh nhật" }),
            /* @__PURE__ */ jsx("option", { children: "Kỷ niệm tình yêu" }),
            /* @__PURE__ */ jsx("option", { children: "Đám cưới" }),
            /* @__PURE__ */ jsx("option", { children: "Tốt nghiệp" }),
            /* @__PURE__ */ jsx("option", { children: "Khai trương" }),
            /* @__PURE__ */ jsx("option", { children: "Chia buồn" }),
            /* @__PURE__ */ jsx("option", { children: "Khác" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Yêu cầu đặc biệt" }),
          /* @__PURE__ */ jsx("textarea", { rows: 4, value: form.note, onChange: (e) => setForm({
            ...form,
            note: e.target.value
          }), className: "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary", placeholder: "Ví dụ: Bó hồng đỏ + giấy đen, viết thiệp chúc sinh nhật..." })
        ] }),
        /* @__PURE__ */ jsxs("button", { type: "submit", className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:bg-primary/90", children: [
          /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
          " Gửi Đơn Đặt Hoa"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-muted-foreground", children: "Khi nhấn gửi, đơn sẽ được chuyển sang Zalo của tiệm để tư vấn nhanh nhất." })
      ] })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
