import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
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
function PaymentPolicy() {
  return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-cream pt-24 pb-20", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4 pt-4 md:px-8", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm text-primary hover:underline", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Về trang chủ"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-white p-8 shadow-elegant md:p-12 lg:p-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl font-semibold md:text-4xl text-primary", children: "Chính Sách Thanh Toán" }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mt-6 h-px w-16 bg-gold/50" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-stone mt-12 max-w-none text-muted-foreground", children: [
        /* @__PURE__ */ jsx("p", { children: "Để mang lại sự thuận tiện nhất cho khách hàng, Hoa Tươi Thanh Ngọc áp dụng các phương thức thanh toán linh hoạt, an toàn và bảo mật sau đây:" }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "1. Thanh toán chuyển khoản ngân hàng" }),
        /* @__PURE__ */ jsx("p", { children: "Đây là hình thức phổ biến nhất. Khách hàng có thể chuyển khoản trực tiếp vào tài khoản ngân hàng của cửa hàng trước khi giao hoa. Vui lòng ghi chú mã đơn hàng hoặc số điện thoại người đặt trong nội dung chuyển khoản để chúng tôi xác nhận nhanh chóng." }),
        /* @__PURE__ */ jsxs("div", { className: "bg-primary/5 p-6 rounded-xl my-4 border border-primary/10", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2", children: /* @__PURE__ */ jsx("strong", { children: "Thông tin tài khoản:" }) }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-0", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "Ngân hàng: ",
              /* @__PURE__ */ jsx("strong", { children: "Vietcombank" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Số tài khoản: ",
              /* @__PURE__ */ jsx("strong", { children: "0123456789" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Chủ tài khoản: ",
              /* @__PURE__ */ jsx("strong", { children: "NGUYEN THANH NGOC" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "2. Thanh toán khi nhận hàng (COD)" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Khách hàng có thể thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng sau khi nhận hoa và kiểm tra tình trạng hoa.",
          /* @__PURE__ */ jsx("em", { children: " (Lưu ý: Hình thức này chỉ áp dụng cho người đặt là người trực tiếp nhận hoa)." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "3. Thanh toán qua ví điện tử" }),
        /* @__PURE__ */ jsx("p", { children: "Chúng tôi hỗ trợ thanh toán nhanh chóng qua các ví điện tử phổ biến như MoMo, ZaloPay, VNPay. Mã QR thanh toán sẽ được gửi kèm khi chốt đơn." }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "4. Quy định đặt cọc (Đối với đơn hàng lớn)" }),
        /* @__PURE__ */ jsx("p", { children: "Đối với các đơn hàng sự kiện, hoa cưới, hoa khai trương có giá trị từ 2.000.000đ trở lên, quý khách vui lòng thanh toán hoặc đặt cọc trước ít nhất 50% giá trị đơn hàng để chúng tôi tiến hành chuẩn bị hoa và thiết kế tốt nhất." })
      ] })
    ] }) })
  ] }) });
}
export {
  PaymentPolicy as component
};
