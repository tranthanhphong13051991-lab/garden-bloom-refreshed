import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Heart, Award, Leaf, Users } from "lucide-react";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
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
const values = [{
  I: Leaf,
  t: "Hoa Tươi Mỗi Ngày",
  d: "Hoa được nhập trực tiếp từ Đà Lạt và các nhà vườn uy tín, đảm bảo độ tươi và bền màu."
}, {
  I: Heart,
  t: "Tận Tâm Trong Từng Cánh Hoa",
  d: "Mỗi bó hoa đều được cắm thủ công với tình yêu và sự tỉ mỉ — không sản xuất hàng loạt."
}, {
  I: Award,
  t: "Chất Lượng Cam Kết",
  d: "Cam kết hoàn tiền nếu hoa không đạt yêu cầu. Sự hài lòng của bạn là ưu tiên cao nhất."
}, {
  I: Users,
  t: "Khách Hàng Là Bạn",
  d: "Tư vấn miễn phí, lắng nghe câu chuyện và thiết kế bó hoa phù hợp với từng khoảnh khắc của bạn."
}];
function AboutPage() {
  return /* @__PURE__ */ jsxs(SiteLayout, { children: [
    /* @__PURE__ */ jsx("section", { className: "bg-gradient-hero py-24 text-center text-primary-foreground md:py-32", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "ornament text-xs uppercase tracking-[0.35em] text-gold", children: "Câu chuyện của chúng tôi" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 font-serif text-5xl font-semibold md:text-6xl", children: "Người Giữ Hồn Tiệm Hoa" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-relaxed text-primary-foreground/85", children: "Hơn hai mươi năm, không chỉ là hoa — đó là tình yêu, là ký ức, là những dấu mốc đời người." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 md:py-28", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-6xl px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-16", children: [
      /* @__PURE__ */ jsx("div", { className: "group overflow-hidden rounded-[2.5rem] bg-white shadow-elegant transition-all hover:shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-12 md:items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-square md:aspect-[4/5] overflow-hidden md:col-span-5", children: [
          /* @__PURE__ */ jsx("img", { src: "/images/co-thanh-ngoc.jpg", alt: "Cô Thanh Ngọc - Người sáng lập", className: "h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 backdrop-blur-md", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl font-serif font-bold text-white", children: "20+" }),
            /* @__PURE__ */ jsx("span", { className: "ml-1 text-[10px] uppercase tracking-tighter text-white/80", children: "Năm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center p-8 lg:p-16 md:col-span-7", children: [
          /* @__PURE__ */ jsx("span", { className: "w-fit rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary", children: "Người sáng lập" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-6 font-serif text-3xl font-semibold", children: "Cô Thanh Ngọc" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm italic text-muted-foreground", children: "Người Giữ Hồn Tiệm Hoa" }),
          /* @__PURE__ */ jsx("div", { className: "my-6 h-px w-12 bg-primary/30" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm leading-relaxed text-muted-foreground", children: [
            /* @__PURE__ */ jsx("p", { children: "Từ những buổi sáng tinh mơ ở chợ hoa Hồ Thị Kỷ, cô Thanh Ngọc đã tự tay chọn từng cành hoa — ngắm sắc, nghe hương, để chắc chắn rằng mỗi bó hoa tới tay khách đều là điều tươi đẹp nhất trong ngày của họ." }),
            /* @__PURE__ */ jsx("p", { children: "20 năm, ba thế hệ khách hàng. Có những người đặt hoa cưới từ thời còn trẻ, nay đã quay lại đặt hoa cho con gái lấy chồng. Cô Thanh Ngọc nhớ hết — vì với cô, mỗi khách hàng là một câu chuyện, mỗi bó hoa là một dấu mốc đáng nhớ." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center text-[11px] font-medium text-primary/70", children: [
              /* @__PURE__ */ jsx(Heart, { className: "mr-2 h-3 w-3" }),
              " Chợ hoa Hồ Thị Kỷ"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center text-[11px] font-medium text-primary/70", children: [
              /* @__PURE__ */ jsx(Heart, { className: "mr-2 h-3 w-3" }),
              " Ba thế hệ"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center text-[11px] font-medium text-primary/70", children: [
              /* @__PURE__ */ jsx(Heart, { className: "mr-2 h-3 w-3" }),
              " 20 năm tận tâm"
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "group overflow-hidden rounded-[2.5rem] bg-white shadow-elegant transition-all hover:shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-12 md:items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "order-2 flex flex-col justify-center p-8 lg:p-16 md:order-1 md:col-span-7", children: [
          /* @__PURE__ */ jsx("span", { className: "w-fit rounded-full bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold", children: "Thế hệ tiếp nối" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-6 font-serif text-3xl font-semibold", children: "Thanh Tiền" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm italic text-muted-foreground", children: "Đôi Tay Giữ Lửa Nghề" }),
          /* @__PURE__ */ jsx("div", { className: "my-6 h-px w-12 bg-gold/30" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm leading-relaxed text-muted-foreground", children: [
            /* @__PURE__ */ jsx("p", { children: "Lớn lên giữa hương hoa và tiếng bước chân sớm của mẹ, Thanh Tiền thấm vào mình tình yêu dành cho hoa từ khi còn nhỏ. Với anh, hoa không chỉ là hàng hoá — đó là ngôn ngữ của những cảm xúc mà ta khó nói thành lời." }),
            /* @__PURE__ */ jsx("p", { children: "Hôm nay, đôi tay ấy — đôi tay được mẹ dạy cách trân trọng từng cành hoa, từng nhuỵ hoa mong manh — đang ngày ngày tạo nên những tác phẩm nghệ thuật tươi sống." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-8 rounded-2xl bg-cream/50 p-6 italic text-primary/80", children: /* @__PURE__ */ jsx("p", { className: "relative z-10 text-xs leading-relaxed", children: '"Mỗi bó hoa mình làm ra, mình muốn người nhận cảm nhận được — có một người đã dành cả tâm huyết cho họ."' }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center text-[11px] font-medium text-gold/80", children: [
              /* @__PURE__ */ jsx(Award, { className: "mr-2 h-3 w-3" }),
              " Nghệ thuật hoa"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center text-[11px] font-medium text-gold/80", children: [
              /* @__PURE__ */ jsx(Award, { className: "mr-2 h-3 w-3" }),
              " Truyền thống gia đình"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "order-1 relative aspect-square md:aspect-[4/5] overflow-hidden md:order-2 md:col-span-5", children: [
          /* @__PURE__ */ jsx("img", { src: "/images/thanh-tien.jpg", alt: "Thanh Tiền - Thế hệ tiếp nối", className: "h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 to-transparent p-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center text-white", children: [
            /* @__PURE__ */ jsx(Heart, { className: "mx-auto mb-2 h-5 w-5 fill-white" }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-[0.2em]", children: "Tâm Huyết" })
          ] }) })
        ] })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "bg-cream py-20 md:py-28", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "ornament text-xs uppercase tracking-[0.35em] text-primary", children: "Giá Trị Cốt Lõi" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-4 font-serif text-4xl font-semibold md:text-5xl", children: "Điều Chúng Tôi Tin" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: values.map((v) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-background p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsx(v.I, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 font-serif text-xl font-semibold", children: v.t }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: v.d })
      ] }, v.t)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 text-center md:px-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-4xl font-semibold md:text-5xl", children: "Sẵn sàng tặng hoa?" }),
      /* @__PURE__ */ jsx("p", { className: "mt-4 text-muted-foreground", children: "Khám phá bộ sưu tập hoặc liên hệ ngay để được tư vấn miễn phí." }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/san-pham", className: "rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-soft hover:bg-primary/90", children: "Xem sản phẩm" }),
        /* @__PURE__ */ jsx(Link, { to: "/lien-he", className: "rounded-full border border-primary px-7 py-3.5 font-medium text-primary hover:bg-primary hover:text-primary-foreground", children: "Liên hệ" })
      ] })
    ] }) })
  ] });
}
export {
  AboutPage as component
};
