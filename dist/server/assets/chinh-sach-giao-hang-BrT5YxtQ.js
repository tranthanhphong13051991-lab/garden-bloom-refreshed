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
function ShippingPolicy() {
  return /* @__PURE__ */ jsx(SiteLayout, { children: /* @__PURE__ */ jsxs("main", { className: "min-h-screen bg-cream pt-24 pb-20", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4 pt-4 md:px-8", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm text-primary hover:underline", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Về trang chủ"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-4xl px-4 md:px-8", children: /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-white p-8 shadow-elegant md:p-12 lg:p-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-serif text-3xl font-semibold md:text-4xl text-primary", children: "Chính Sách Giao Hàng" }),
        /* @__PURE__ */ jsx("div", { className: "mx-auto mt-6 h-px w-16 bg-gold/50" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "prose prose-stone mt-12 max-w-none text-muted-foreground", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "1. Thời gian giao hàng" }),
        /* @__PURE__ */ jsx("p", { children: "Hoa Tươi Thanh Ngọc cam kết giao hàng đúng thời gian đã hẹn với khách hàng. Thông thường:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Nội thành TP.HCM:" }),
            " Giao hỏa tốc trong vòng 1-2 giờ kể từ khi chốt đơn và hoàn tất thanh toán."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Khu vực ngoại thành:" }),
            " Thời gian giao hàng sẽ từ 2-4 giờ tùy khoảng cách."
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Đối với các ngày Lễ, Tết (Valentine, 8/3, 20/10...), do lượng đơn hàng tăng cao, thời gian giao hàng có thể xê dịch đôi chút. Quý khách vui lòng đặt trước 1-2 ngày để đảm bảo thời gian tốt nhất." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "2. Phí giao hàng" }),
        /* @__PURE__ */ jsx("p", { children: "Phí giao hàng được tính dựa trên khoảng cách từ cửa hàng (Quận Bình Thạnh) đến địa chỉ của người nhận. Chúng tôi sẽ thông báo phí giao hàng chính xác khi quý khách xác nhận địa chỉ:" }),
        /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Miễn phí giao hàng (Freeship) cho các quận nội thành lân cận với đơn hàng từ 1.000.000đ." }),
          /* @__PURE__ */ jsx("li", { children: "Các quận xa hoặc ngoại thành sẽ có biểu phí ship hỗ trợ (dao động từ 30.000đ - 80.000đ)." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-primary font-serif", children: "3. Quy định khi nhận hàng" }),
        /* @__PURE__ */ jsx("p", { children: "Khi nhận hoa, quý khách (hoặc người nhận hộ) vui lòng kiểm tra kỹ tình trạng hoa. Nếu hoa bị dập nát, héo úa hoặc không đúng mẫu đã đặt do quá trình vận chuyển, quý khách vui lòng phản hồi ngay lập tức cho tài xế hoặc gọi về hotline của cửa hàng để được hỗ trợ đổi trả kịp thời." }),
        /* @__PURE__ */ jsx("p", { children: "Trường hợp người nhận đi vắng, chúng tôi sẽ liên hệ trước. Nếu không thể liên lạc, chúng tôi sẽ linh động giao cho lễ tân, bảo vệ hoặc hàng xóm (nếu được người nhận đồng ý) và chụp ảnh xác nhận." })
      ] })
    ] }) })
  ] }) });
}
export {
  ShippingPolicy as component
};
