import { QueryClient } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { P as PRODUCTS, C as CATEGORIES, f as findProduct } from "./products-c_hw6lyT.js";
import { z } from "zod";
const appCss = "/assets/styles-84FyJR_4.css";
const SITE = {
  name: "Hoa Tươi Thanh Ngọc",
  brand: "Thanh Ngọc Flower's",
  domain: "https://hoatuoithanhngoc.com",
  description: "Hoa Tươi Thanh Ngọc — Tiệm hoa tươi tại Bình Thạnh, TP.HCM. Bó hoa, giỏ hoa, kệ hoa khai trương, lan hồ điệp, hoa chia buồn. Giao nhanh trong 2 giờ, thiết kế theo yêu cầu, kèm thiệp miễn phí.",
  address: "8 Phan Văn Hân, Phường 19, Bình Thạnh, TP. Hồ Chí Minh",
  phones: ["0934926092", "0866086574"],
  email: "contact@hoatuoithanhngoc.com",
  hours: "07:00 – 21:00 (Tất cả các ngày trong tuần)",
  zalo: "https://zalo.me/3297391822230372190",
  facebook: "https://www.facebook.com/hoatuoithanhngoc",
  geo: { lat: 10.7944, lng: 106.7144 },
  logo: "/images/logo/logo.png"
};
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "Florist",
  name: SITE.name,
  alternateName: SITE.brand,
  url: SITE.domain,
  telephone: `+84${SITE.phones[0].slice(1)}`,
  email: SITE.email,
  image: `${SITE.domain}/image/logo-thanh-ngoc-flower.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 Phan Văn Hân, Phường 19",
    addressLocality: "Bình Thạnh",
    addressRegion: "TP. Hồ Chí Minh",
    addressCountry: "VN"
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "07:00", closes: "21:00" }
  ],
  priceRange: "₫₫",
  sameAs: [SITE.facebook, SITE.zalo]
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-cream px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "font-serif text-7xl font-semibold text-primary", children: "404" }),
    /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-2xl text-foreground", children: "Không tìm thấy trang" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Trang bạn đang tìm không tồn tại hoặc đã được dời đi." }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "mt-6 inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: "Về trang chủ" })
  ] }) });
}
const Route$f = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hoa Tươi Thanh Ngọc — Tiệm Hoa Bình Thạnh, TP.HCM | Giao Nhanh 2h" },
      { name: "description", content: SITE.description },
      { name: "keywords", content: "hoa tươi bình thạnh, hoa tươi tphcm, đặt hoa online, hoa khai trương, lan hồ điệp, bó hoa sinh nhật, giỏ hoa, hoa chia buồn, hoa tươi thanh ngọc" },
      { name: "author", content: SITE.brand },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "theme-color", content: "#0F4C3A" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "vi_VN" },
      { property: "og:title", content: "Hoa Tươi Thanh Ngọc — Tiệm Hoa Bình Thạnh, TP.HCM | Giao Nhanh 2h" },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: SITE.domain },
      { property: "og:image", content: `${SITE.domain}/image/logo-thanh-ngoc-flower.webp` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hoa Tươi Thanh Ngọc — Tiệm Hoa Bình Thạnh, TP.HCM | Giao Nhanh 2h" },
      { name: "twitter:description", content: SITE.description }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE.domain },
      { rel: "icon", type: "image/png", href: "/images/logo/logo.png" },
      { rel: "apple-touch-icon", href: "/images/logo/logo.png" },
      { rel: "preconnect", href: "https://hoatuoithanhngoc.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusiness) }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "vi", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const $$splitComponentImporter$e = () => import("./san-pham-BFsOu0JM.js");
const Route$e = createFileRoute("/san-pham")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./lien-he-B9sgzu8c.js");
const Route$d = createFileRoute("/lien-he")({
  head: () => ({
    meta: [{
      title: "Liên Hệ — Hoa Tươi Thanh Ngọc | Đặt Hoa Bình Thạnh, TP.HCM"
    }, {
      name: "description",
      content: "Liên hệ Hoa Tươi Thanh Ngọc: 8 Phan Văn Hân, Bình Thạnh. Hotline 0934 926 092 — 0866 086 574. Email contact@hoatuoithanhngoc.com. Mở cửa 7h–21h."
    }, {
      property: "og:title",
      content: "Liên Hệ — Hoa Tươi Thanh Ngọc"
    }, {
      property: "og:description",
      content: "Đặt hoa tại Bình Thạnh — Hotline 0934 926 092."
    }],
    links: [{
      rel: "canonical",
      href: `${SITE.domain}/lien-he`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./gioi-thieu-DG_tqLzS.js");
const Route$c = createFileRoute("/gioi-thieu")({
  head: () => ({
    meta: [{
      title: "Giới Thiệu — Hoa Tươi Thanh Ngọc | Tiệm Hoa Bình Thạnh, TP.HCM"
    }, {
      name: "description",
      content: "Hoa Tươi Thanh Ngọc — tiệm hoa tươi tại 8 Phan Văn Hân, Bình Thạnh. Câu chuyện về tình yêu hoa, dịch vụ tận tâm và chất lượng cam kết."
    }, {
      property: "og:title",
      content: "Giới Thiệu — Hoa Tươi Thanh Ngọc"
    }, {
      property: "og:description",
      content: "Câu chuyện về tiệm hoa tươi Thanh Ngọc tại Bình Thạnh, TP.HCM."
    }],
    links: [{
      rel: "canonical",
      href: `${SITE.domain}/gioi-thieu`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./chinh-sach-thanh-toan-xMU6BipM.js");
const Route$b = createFileRoute("/chinh-sach-thanh-toan")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./chinh-sach-giao-hang-BrT5YxtQ.js");
const Route$a = createFileRoute("/chinh-sach-giao-hang")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./chinh-sach-doi-tra-BpJSALSd.js");
const Route$9 = createFileRoute("/chinh-sach-doi-tra")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./chinh-sach-bao-mat-2TiXbxb-.js");
const Route$8 = createFileRoute("/chinh-sach-bao-mat")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin-BmAZhynn.js");
const Route$7 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Thêm Sản Phẩm | Hoa Tươi Thanh Ngọc"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./index-aEoRGwHP.js");
const Route$6 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Hoa Tươi Thanh Ngọc — Tiệm Hoa Bình Thạnh, TP.HCM | Giao 2h"
    }, {
      name: "description",
      content: "Đặt hoa tươi tại Bình Thạnh, TP.HCM. Bó hoa, giỏ hoa, kệ hoa khai trương, lan hồ điệp, hoa chia buồn. Giao nhanh 2 giờ — kèm thiệp miễn phí. Hotline 0934 926 092."
    }, {
      property: "og:title",
      content: "Hoa Tươi Thanh Ngọc — Tiệm Hoa Bình Thạnh"
    }, {
      property: "og:description",
      content: "Tiệm hoa tươi Bình Thạnh — Giao nhanh trong 2 giờ. Bó hoa, giỏ hoa, kệ khai trương, lan hồ điệp."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const slugifyVi = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const map = /* @__PURE__ */ new Map();
for (const p of PRODUCTS) {
  for (const k of p.keywords) {
    const slug = slugifyVi(k);
    if (!slug) continue;
    if (!map.has(slug)) map.set(slug, { label: k, products: [] });
    map.get(slug).products.push(p);
  }
}
const TAGS = Array.from(map.entries()).map(([slug, v]) => ({ slug, label: v.label, products: v.products })).sort((a, b) => b.products.length - a.products.length);
const findTag = (slug) => TAGS.find((t) => t.slug === slug);
const tagSlug = (keyword) => slugifyVi(keyword);
const $$splitComponentImporter$5 = () => import("./the.index-CD-xXDse.js");
const Route$5 = createFileRoute("/the/")({
  head: () => {
    const url = `${SITE.domain}/the`;
    const title = `Tất Cả Thẻ Sản Phẩm — ${TAGS.length} Chủ Đề Hoa | Hoa Tươi Thanh Ngọc`;
    const desc = `Khám phá ${TAGS.length} thẻ chủ đề hoa: hoa hồng, sinh nhật, khai trương, lan hồ điệp, chia buồn... Tìm nhanh mẫu hoa phù hợp tại Hoa Tươi Thanh Ngọc.`;
    const collectionLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Tất cả thẻ sản phẩm",
      url,
      description: desc,
      hasPart: TAGS.map((t) => ({
        "@type": "CollectionPage",
        name: t.label,
        url: `${SITE.domain}/the/${t.slug}`
      }))
    };
    const itemListLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Danh sách thẻ sản phẩm",
      numberOfItems: TAGS.length,
      itemListElement: TAGS.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.domain}/the/${t.slug}`,
        name: t.label
      }))
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: SITE.domain
      }, {
        "@type": "ListItem",
        position: 2,
        name: "Thẻ sản phẩm",
        item: url
      }]
    };
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        name: "robots",
        content: "index, follow, max-image-preview:large"
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:type",
        content: "website"
      }, {
        property: "og:url",
        content: url
      }],
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(collectionLd)
      }, {
        type: "application/ld+json",
        children: JSON.stringify(itemListLd)
      }, {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbLd)
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./san-pham.index-BzJxUoRW.js");
const searchSchema = z.object({
  cat: z.enum(["bo-hoa", "gio-hoa", "khai-truong", "chia-buon", "lan-ho-diep"]).optional()
});
const Route$4 = createFileRoute("/san-pham/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Sản Phẩm — Hoa Tươi Thanh Ngọc | Bó Hoa, Giỏ Hoa, Kệ Khai Trương, Lan Hồ Điệp"
    }, {
      name: "description",
      content: "Bộ sưu tập hoa tươi đa dạng: bó hoa sinh nhật, giỏ hoa sang trọng, kệ hoa khai trương, lan hồ điệp, hoa chia buồn. Giao nhanh 2h tại TP.HCM."
    }, {
      property: "og:title",
      content: "Sản Phẩm — Hoa Tươi Thanh Ngọc"
    }, {
      property: "og:description",
      content: "Đa dạng mẫu hoa tươi: bó hoa, giỏ hoa, kệ khai trương, lan hồ điệp. Giao 2h tại TP.HCM."
    }, {
      rel: "canonical",
      content: `${SITE.domain}/san-pham`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const CDN = "https://hoatuoithanhngoc.com/image/responsive";
const cover = (slug) => `${CDN}/${slug}-800.webp`;
const POSTS = [
  {
    slug: "y-nghia-cac-loai-hoa-hong-theo-mau-sac",
    title: "Ý Nghĩa Các Loại Hoa Hồng Theo Màu Sắc",
    excerpt: "Hoa hồng đỏ tượng trưng tình yêu nồng cháy, hồng kem cho sự dịu dàng, hồng trắng cho sự thuần khiết — chọn đúng màu sẽ truyền tải đúng thông điệp.",
    cover: cover("hoa-hong-kem-tinh-te"),
    author: "Hoa Tươi Thanh Ngọc",
    publishedAt: "2026-04-10",
    readingMinutes: 5,
    tags: ["hoa hồng", "ý nghĩa hoa", "tặng người yêu"],
    content: `## Hoa hồng — biểu tượng vĩnh cửu của tình yêu

Trong tất cả các loài hoa, hoa hồng giữ vị trí đặc biệt trong văn hóa tặng hoa. Mỗi sắc màu lại mang một thông điệp riêng.

## Hoa hồng đỏ — Tình yêu nồng cháy
Là lựa chọn kinh điển cho ngày Valentine, kỷ niệm và lời tỏ tình. Một bó hồng đỏ thể hiện sự say đắm và cam kết lâu dài.

## Hoa hồng kem — Sự dịu dàng, tinh tế
Phù hợp tặng mẹ, tặng bạn thân hoặc người yêu trong những dịp nhẹ nhàng. Tone kem cũng dễ phối với phong cách vintage, tối giản.

## Hoa hồng trắng — Thuần khiết và khởi đầu mới
Thường xuất hiện trong đám cưới, lễ tốt nghiệp, tượng trưng cho sự khởi đầu trong sáng.

## Hoa hồng phấn (pink) — Lãng mạn và biết ơn
Lý tưởng cho ngày sinh nhật, ngày của Mẹ, hoặc gửi lời cảm ơn dịu dàng.

## Hoa hồng vàng — Tình bạn và niềm vui
Tặng bạn thân, đồng nghiệp hoặc dùng trong các dịp chúc mừng thành công.

## Mẹo chọn hoa hồng tặng đúng dịp
- Tỏ tình lần đầu: 1 bông hoặc bó nhỏ hồng đỏ + giấy kraft.
- Kỷ niệm yêu nhau: bó 33–99 bông hồng đỏ hoặc hồng phấn.
- Sinh nhật bạn nữ: hồng kem hoặc peach gói tơ lụa.
- Tốt nghiệp: hồng trắng phối baby breath.`
  },
  {
    slug: "cach-cham-hoa-tuoi-tai-nha-giu-tuoi-7-ngay",
    title: "Cách Chăm Hoa Tươi Tại Nhà Giữ Tươi 7 Ngày",
    excerpt: "Bí quyết cắm hoa, thay nước, cắt cành và bảo quản giúp bó hoa tại nhà luôn rạng rỡ suốt cả tuần.",
    cover: cover("bo-hong-phat-trang-giay-hong"),
    author: "Hoa Tươi Thanh Ngọc",
    publishedAt: "2026-04-12",
    readingMinutes: 6,
    tags: ["chăm sóc hoa", "mẹo cắm hoa", "bảo quản hoa"],
    content: `## Chuẩn bị bình hoa và nước
Bình thủy tinh sạch, nước lọc ở nhiệt độ phòng. Tránh dùng nước quá lạnh vì làm sốc cành hoa.

## Cắt cành đúng cách
Cắt vát góc 45° dưới vòi nước chảy. Việc này giúp tăng diện tích hút nước và ngăn bọt khí làm tắc mạch.

## Loại bỏ lá ngập nước
Lá ngâm trong nước sẽ phân hủy, sinh vi khuẩn và làm hoa nhanh héo.

## Thay nước mỗi ngày
- Đổ nước cũ, rửa sạch bình.
- Cắt thêm 1cm cuối cành.
- Thêm vài giọt nước rửa chén hoặc 1 thìa đường + vài giọt giấm để diệt khuẩn và nuôi hoa.

## Đặt hoa ở vị trí phù hợp
Tránh nắng trực tiếp, gió mạnh từ điều hòa, và xa trái cây chín (ethylene làm hoa mau tàn).

## Mẹo phục hồi hoa rũ
Quấn giấy báo quanh hoa, nhúng cành vào nước ấm 40°C trong 30 phút — hoa sẽ tươi trở lại đáng kể.`
  },
  {
    slug: "cach-chon-hoa-khai-truong-hop-phong-thuy",
    title: "Cách Chọn Hoa Khai Trương Hợp Phong Thủy 2026",
    excerpt: "Màu sắc, loài hoa, vị trí đặt kệ — hướng dẫn đầy đủ giúp ngày khai trương rước lộc, đón may.",
    cover: cover("ke-hoa-vang-cam-do-2-tang-khai-truong"),
    author: "Hoa Tươi Thanh Ngọc",
    publishedAt: "2026-04-15",
    readingMinutes: 7,
    tags: ["hoa khai trương", "phong thủy", "kệ hoa"],
    content: `## Vì sao hoa khai trương cần hợp phong thủy?
Kệ hoa khai trương không chỉ làm đẹp mà còn mang ý nghĩa cầu chúc tài lộc, hanh thông trong kinh doanh.

## Chọn màu theo mệnh chủ
- Mệnh Kim: trắng, vàng kim — kệ ly trắng, cúc vàng.
- Mệnh Mộc: xanh lá, xanh ngọc — kệ trắng xanh.
- Mệnh Thủy: xanh dương, đen — kệ trắng phối lá.
- Mệnh Hỏa: đỏ, hồng, cam — kệ gerbera vàng đỏ.
- Mệnh Thổ: vàng, nâu — kệ vàng cam đỏ.

## Loài hoa thường dùng
- Hoa hướng dương: thành công, năng lượng.
- Hoa cát tường: tài lộc, may mắn.
- Hoa lan hồ điệp: phú quý, sang trọng.
- Hoa đồng tiền (gerbera): tiền tài dồi dào.

## Vị trí đặt kệ hoa
Đặt hai bên cửa chính, không che khuất lối đi. Kệ 2 tầng thường đặt sảnh lớn để gây ấn tượng.

## Thời gian giao hoa
Nên giao trước 1–2 tiếng so với giờ khai trương để hoa kịp ổn định và bạn có thời gian sắp xếp.`
  },
  {
    slug: "goi-y-hoa-tang-sinh-nhat-theo-do-tuoi",
    title: "Gợi Ý Hoa Tặng Sinh Nhật Theo Độ Tuổi & Mối Quan Hệ",
    excerpt: "Tặng hoa sinh nhật cho mẹ, bạn gái, đồng nghiệp hay sếp — mỗi đối tượng có một lựa chọn phù hợp riêng.",
    cover: cover("bo-tram-hong-do-sinh-nhat"),
    author: "Hoa Tươi Thanh Ngọc",
    publishedAt: "2026-04-20",
    readingMinutes: 5,
    tags: ["hoa sinh nhật", "gợi ý quà tặng", "ý nghĩa hoa"],
    content: `## Tặng mẹ
Hoa cẩm chướng hồng hoặc hồng kem — biểu tượng của tình mẹ dịu dàng, biết ơn.

## Tặng bạn gái / vợ
- Sinh nhật tuổi 20–25: bó hồng peach hoặc baby breath.
- Sinh nhật tuổi 25–35: bó hồng đỏ gói đen hoặc giỏ hồng phấn sang trọng.
- Kỷ niệm đặc biệt: bó 99 hoặc 100 bông hồng đỏ.

## Tặng bạn thân nữ
Hoa hướng dương, tulip, hoặc bó mix tone tươi vui — thể hiện sự ấm áp và chân thành.

## Tặng đồng nghiệp / sếp nữ
Giỏ hoa thanh lịch tone trắng — xanh, hoặc chậu lan hồ điệp mini — vừa lịch sự vừa ý nghĩa.

## Tặng sếp nam / đối tác
Lan hồ điệp trắng hoặc tím — biểu tượng quý phái, phù hợp môi trường công sở.

## Lưu ý khi tặng hoa sinh nhật
- Kèm thiệp viết tay với lời chúc cá nhân hóa.
- Giao hoa đúng giờ — nhờ tiệm hoa giao tận nơi để tạo bất ngờ.`
  }
];
const findPost = (slug) => POSTS.find((p) => p.slug === slug);
const formatDate = (iso) => new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
function parseContent(md) {
  const blocks = [];
  const lines = md.split("\n");
  let listBuffer = [];
  const flushList = () => {
    if (listBuffer.length) {
      blocks.push({ type: "ul", items: listBuffer });
      listBuffer = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2).trim());
    } else {
      flushList();
      blocks.push({ type: "p", text: line });
    }
  }
  flushList();
  return blocks;
}
const $$splitComponentImporter$3 = () => import("./blog.index-BMlONFq3.js");
const Route$3 = createFileRoute("/blog/")({
  head: () => {
    const url = `${SITE.domain}/blog`;
    const title = "Blog Hoa Tươi — Mẹo Chăm Hoa, Ý Nghĩa & Gợi Ý Quà Tặng | Thanh Ngọc";
    const desc = "Cẩm nang hoa tươi của Hoa Tươi Thanh Ngọc: ý nghĩa các loài hoa, cách chăm hoa giữ tươi lâu, gợi ý hoa theo dịp và phong thủy khai trương.";
    const ld = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog Hoa Tươi Thanh Ngọc",
      url,
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.domain
      },
      blogPost: POSTS.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE.domain}/blog/${p.slug}`,
        datePublished: p.publishedAt,
        image: p.cover
      }))
    };
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        name: "robots",
        content: "index, follow, max-image-preview:large"
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:url",
        content: url
      }, {
        property: "og:type",
        content: "website"
      }],
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(ld)
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./the._tag-CSD8g8kk.js");
const $$splitNotFoundComponentImporter$2 = () => import("./the._tag-BfIfLj3p.js");
const Route$2 = createFileRoute("/the/$tag")({
  loader: ({
    params
  }) => {
    const tag = findTag(params.tag);
    if (!tag) throw notFound();
    return {
      tag
    };
  },
  head: ({
    loaderData
  }) => {
    if (!loaderData) return {};
    const {
      tag
    } = loaderData;
    const url = `${SITE.domain}/the/${tag.slug}`;
    const title = `${tag.label} — ${tag.products.length} mẫu hoa | Hoa Tươi Thanh Ngọc`;
    const desc = `Bộ sưu tập ${tag.products.length} mẫu hoa thuộc thẻ "${tag.label}" tại Hoa Tươi Thanh Ngọc — giao nhanh 2h tại TP.HCM, thiệp viết tay miễn phí.`;
    const itemListLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: tag.label,
      url,
      numberOfItems: tag.products.length,
      itemListElement: tag.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.domain}/san-pham/${p.slug}`,
        name: p.name
      }))
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: SITE.domain
      }, {
        "@type": "ListItem",
        position: 2,
        name: "Thẻ",
        item: `${SITE.domain}/the`
      }, {
        "@type": "ListItem",
        position: 3,
        name: tag.label,
        item: url
      }]
    };
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        name: "keywords",
        content: `${tag.label}, hoa tươi tphcm, ${tag.label} bình thạnh, đặt ${tag.label} online`
      }, {
        name: "robots",
        content: "index, follow, max-image-preview:large"
      }, {
        property: "og:title",
        content: title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:type",
        content: "website"
      }, {
        property: "og:url",
        content: url
      }, ...tag.products[0]?.image ? [{
        property: "og:image",
        content: tag.products[0].image
      }] : [], {
        name: "twitter:card",
        content: "summary_large_image"
      }],
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(itemListLd)
      }, {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbLd)
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./san-pham._slug-CehSersb.js");
const $$splitErrorComponentImporter = () => import("./san-pham._slug-BMwg5xeV.js");
const $$splitNotFoundComponentImporter$1 = () => import("./san-pham._slug-Df71V-GY.js");
const Route$1 = createFileRoute("/san-pham/$slug")({
  loader: ({
    params
  }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return {
      product
    };
  },
  head: ({
    loaderData
  }) => {
    if (!loaderData) return {};
    const {
      product
    } = loaderData;
    const url = `${SITE.domain}/san-pham/${product.slug}`;
    const cat = CATEGORIES.find((c) => c.id === product.category);
    const title = `${product.name} — Liên hệ báo giá | Hoa Tươi Thanh Ngọc`;
    const desc = `${product.short} Ý nghĩa, màu sắc ${product.colors.map((c) => c.name).join(", ")}, kích thước ${product.sizes[0]?.dimension}. Giao 2h tại TP.HCM, Zalo ${SITE.phones[0]}.`;
    const productLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: [product.image, ...product.gallery.map((g) => g.src)],
      description: `${product.description} ${product.meaning.join(" ")}`,
      sku: product.slug,
      mpn: product.slug,
      brand: {
        "@type": "Brand",
        name: SITE.brand
      },
      category: cat?.label,
      url,
      color: product.colors.map((c) => c.name).join(", "),
      material: product.materials.join(", "),
      size: product.sizes.map((s) => `${s.label}: ${s.dimension}`).join(" | "),
      additionalProperty: [...product.colors.map((c) => ({
        "@type": "PropertyValue",
        name: "Màu sắc",
        value: c.name
      })), ...product.sizes.map((s) => ({
        "@type": "PropertyValue",
        name: `Kích thước ${s.label}`,
        value: s.dimension
      })), {
        "@type": "PropertyValue",
        name: "Dịp tặng",
        value: product.occasions.join(", ")
      }, {
        "@type": "PropertyValue",
        name: "Ý nghĩa",
        value: product.meaning.join(" ")
      }],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.value.toFixed(1),
        reviewCount: String(product.rating.count),
        bestRating: "5",
        worstRating: "1"
      },
      offers: {
        "@type": "Offer",
        url,
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.domain
        },
        description: "Liên hệ Zalo/điện thoại để được báo giá và tư vấn miễn phí."
      }
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: SITE.domain
      }, {
        "@type": "ListItem",
        position: 2,
        name: "Sản phẩm",
        item: `${SITE.domain}/san-pham`
      }, ...cat ? [{
        "@type": "ListItem",
        position: 3,
        name: cat.label,
        item: `${SITE.domain}/san-pham?cat=${cat.id}`
      }] : [], {
        "@type": "ListItem",
        position: cat ? 4 : 3,
        name: product.name,
        item: url
      }]
    };
    const faqLd = product.faqs && product.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: product.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a
        }
      }))
    } : null;
    const tagSuggestions = product.keywords.map((k) => findTag(tagSlug(k))).filter((t) => !!t).map((t) => ({
      ...t,
      products: t.products.filter((p) => p.slug !== product.slug).slice(0, 4)
    })).filter((t) => t.products.length > 0).slice(0, 3);
    const tagListLd = tagSuggestions.length > 0 ? tagSuggestions.map((t) => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Gợi ý theo thẻ ${t.label}`,
      url: `${SITE.domain}/the/${t.slug}`,
      numberOfItems: t.products.length,
      itemListElement: t.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.domain}/san-pham/${p.slug}`,
        name: p.name
      }))
    })) : [];
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        name: "keywords",
        content: [product.name, ...product.keywords, cat?.label, "hoa tươi tphcm", "giao hoa nhanh"].filter(Boolean).join(", ")
      }, {
        name: "robots",
        content: "index, follow, max-image-preview:large"
      }, {
        property: "og:title",
        content: product.name
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:image",
        content: product.image
      }, {
        property: "og:image:alt",
        content: product.name
      }, {
        property: "og:type",
        content: "product"
      }, {
        property: "og:url",
        content: url
      }, {
        property: "product:availability",
        content: "in stock"
      }, {
        property: "product:category",
        content: cat?.label ?? ""
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: product.name
      }, {
        name: "twitter:description",
        content: desc
      }, {
        name: "twitter:image",
        content: product.image
      }],
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(productLd)
      }, {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbLd)
      }, ...faqLd ? [{
        type: "application/ld+json",
        children: JSON.stringify(faqLd)
      }] : [], ...tagListLd.map((ld) => ({
        type: "application/ld+json",
        children: JSON.stringify(ld)
      }))]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./blog._slug-BZHEqeWX.js");
const $$splitNotFoundComponentImporter = () => import("./blog._slug-Bb17vZe1.js");
const Route = createFileRoute("/blog/$slug")({
  loader: ({
    params
  }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return {
      post
    };
  },
  head: ({
    loaderData
  }) => {
    if (!loaderData) return {};
    const {
      post
    } = loaderData;
    const url = `${SITE.domain}/blog/${post.slug}`;
    const title = `${post.title} | Blog Hoa Tươi Thanh Ngọc`;
    const desc = post.excerpt;
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: desc,
      image: [post.cover],
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      author: {
        "@type": "Organization",
        name: post.author,
        url: SITE.domain
      },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.domain,
        logo: {
          "@type": "ImageObject",
          url: `${SITE.domain}/image/logo-thanh-ngoc-flower.webp`
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url
      },
      keywords: post.tags.join(", "),
      url
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: SITE.domain
      }, {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE.domain}/blog`
      }, {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url
      }]
    };
    return {
      meta: [{
        title
      }, {
        name: "description",
        content: desc
      }, {
        name: "keywords",
        content: post.tags.join(", ")
      }, {
        name: "robots",
        content: "index, follow, max-image-preview:large"
      }, {
        name: "author",
        content: post.author
      }, {
        property: "og:title",
        content: post.title
      }, {
        property: "og:description",
        content: desc
      }, {
        property: "og:image",
        content: post.cover
      }, {
        property: "og:image:alt",
        content: post.title
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:url",
        content: url
      }, {
        property: "article:published_time",
        content: post.publishedAt
      }, {
        property: "article:modified_time",
        content: post.updatedAt ?? post.publishedAt
      }, {
        property: "article:author",
        content: post.author
      }, ...post.tags.map((t) => ({
        property: "article:tag",
        content: t
      })), {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:title",
        content: post.title
      }, {
        name: "twitter:description",
        content: desc
      }, {
        name: "twitter:image",
        content: post.cover
      }],
      links: [{
        rel: "canonical",
        href: url
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify(articleLd)
      }, {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbLd)
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SanPhamRoute = Route$e.update({
  id: "/san-pham",
  path: "/san-pham",
  getParentRoute: () => Route$f
});
const LienHeRoute = Route$d.update({
  id: "/lien-he",
  path: "/lien-he",
  getParentRoute: () => Route$f
});
const GioiThieuRoute = Route$c.update({
  id: "/gioi-thieu",
  path: "/gioi-thieu",
  getParentRoute: () => Route$f
});
const ChinhSachThanhToanRoute = Route$b.update({
  id: "/chinh-sach-thanh-toan",
  path: "/chinh-sach-thanh-toan",
  getParentRoute: () => Route$f
});
const ChinhSachGiaoHangRoute = Route$a.update({
  id: "/chinh-sach-giao-hang",
  path: "/chinh-sach-giao-hang",
  getParentRoute: () => Route$f
});
const ChinhSachDoiTraRoute = Route$9.update({
  id: "/chinh-sach-doi-tra",
  path: "/chinh-sach-doi-tra",
  getParentRoute: () => Route$f
});
const ChinhSachBaoMatRoute = Route$8.update({
  id: "/chinh-sach-bao-mat",
  path: "/chinh-sach-bao-mat",
  getParentRoute: () => Route$f
});
const AdminRoute = Route$7.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$f
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$f
});
const TheIndexRoute = Route$5.update({
  id: "/the/",
  path: "/the/",
  getParentRoute: () => Route$f
});
const SanPhamIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => SanPhamRoute
});
const BlogIndexRoute = Route$3.update({
  id: "/blog/",
  path: "/blog/",
  getParentRoute: () => Route$f
});
const TheTagRoute = Route$2.update({
  id: "/the/$tag",
  path: "/the/$tag",
  getParentRoute: () => Route$f
});
const SanPhamSlugRoute = Route$1.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => SanPhamRoute
});
const BlogSlugRoute = Route.update({
  id: "/blog/$slug",
  path: "/blog/$slug",
  getParentRoute: () => Route$f
});
const SanPhamRouteChildren = {
  SanPhamSlugRoute,
  SanPhamIndexRoute
};
const SanPhamRouteWithChildren = SanPhamRoute._addFileChildren(SanPhamRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  ChinhSachBaoMatRoute,
  ChinhSachDoiTraRoute,
  ChinhSachGiaoHangRoute,
  ChinhSachThanhToanRoute,
  GioiThieuRoute,
  LienHeRoute,
  SanPhamRoute: SanPhamRouteWithChildren,
  BlogSlugRoute,
  TheTagRoute,
  BlogIndexRoute,
  TheIndexRoute
};
const routeTree = Route$f._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  POSTS as P,
  Route$4 as R,
  SITE as S,
  TAGS as T,
  Route$2 as a,
  Route$1 as b,
  findTag as c,
  Route as d,
  formatDate as f,
  parseContent as p,
  router as r,
  tagSlug as t
};
