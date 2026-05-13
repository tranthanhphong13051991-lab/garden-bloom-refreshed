import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { S as SiteLayout } from "./SiteLayout-3xrACp3X.js";
import { S as SITE } from "./router-DQf0jzPI.js";
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
function PrivacyPolicy() {
  return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-cream pt-24 pb-20", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4 pt-4 md:px-8", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm text-primary hover:underline", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Về trang chủ"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-white p-8 shadow-elegant md:p-12 lg:p-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl font-semibold md:text-4xl text-primary", children: "Chính Sách Bảo Mật Thông Tin" }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mt-6 h-px w-16 bg-gold/50" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-stone mt-12 max-w-none text-muted-foreground", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "1. Mục đích và phạm vi thu thập" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Việc thu thập dữ liệu chủ yếu trên website ",
          SITE.domain,
          " bao gồm: email, điện thoại, tên khách hàng, địa chỉ giao hàng. Đây là các thông tin mà chúng tôi cần khách hàng cung cấp bắt buộc khi đặt hàng để liên hệ xác nhận, đảm bảo quyền lợi cho người tiêu dùng."
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "2. Phạm vi sử dụng thông tin" }),
        /* @__PURE__ */ jsx("p", { children: "Chúng tôi sử dụng thông tin khách hàng cung cấp để:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Cung cấp các dịch vụ/sản phẩm đến khách hàng." }),
          /* @__PURE__ */ jsx("li", { children: "Gửi các thông báo về các hoạt động trao đổi thông tin giữa khách hàng và cửa hàng." }),
          /* @__PURE__ */ jsx("li", { children: "Liên lạc và giải quyết với khách hàng trong những trường hợp đặc biệt." }),
          /* @__PURE__ */ jsx("li", { children: "Không sử dụng thông tin cá nhân của khách hàng ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại cửa hàng." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "3. Thời gian lưu trữ thông tin" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân khách hàng sẽ được bảo mật trên máy chủ của ",
          SITE.domain,
          "."
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "4. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân" }),
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Hoa Tươi Thanh Ngọc" }),
          /* @__PURE__ */ jsx("br", {}),
          "Địa chỉ: ",
          SITE.address,
          /* @__PURE__ */ jsx("br", {}),
          "Điện thoại: ",
          SITE.phones[0],
          /* @__PURE__ */ jsx("br", {}),
          "Email: ",
          SITE.email
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "5. Cam kết bảo mật thông tin cá nhân khách hàng" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Thông tin cá nhân của khách hàng trên ",
          SITE.domain,
          " được chúng tôi cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân. Việc thu thập và sử dụng thông tin của mỗi khách hàng chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác."
        ] })
      ] })
    ] }) })
  ] }) });
}
export {
  PrivacyPolicy as component
};
