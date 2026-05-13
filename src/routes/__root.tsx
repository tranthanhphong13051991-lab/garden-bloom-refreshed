import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SITE } from "@/data/site";

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
    addressCountry: "VN",
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "07:00", closes: "21:00" },
  ],
  priceRange: "₫₫",
  sameAs: [SITE.facebook, SITE.zalo],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="max-w-md text-center">
        <div className="font-serif text-7xl font-semibold text-primary">404</div>
        <h1 className="mt-3 font-serif text-2xl text-foreground">Không tìm thấy trang</h1>
        <p className="mt-2 text-sm text-muted-foreground">Trang bạn đang tìm không tồn tại hoặc đã được dời đi.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
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
      { name: "twitter:description", content: SITE.description },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE.domain },
      { rel: "icon", type: "image/png", href: "/images/logo/logo.png" },
      { rel: "apple-touch-icon", href: "/images/logo/logo.png" },
      { rel: "preconnect", href: "https://hoatuoithanhngoc.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },

    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(localBusiness) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
