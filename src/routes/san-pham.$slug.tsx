import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, MessageCircle, Phone, Truck, Sparkles, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { findProduct, formatPrice, PRODUCTS, CATEGORIES } from "@/data/products";
import { useCart } from "@/store/cart";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/san-pham/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { product } = loaderData;
    const url = `${SITE.domain}/san-pham/${product.slug}`;
    const cat = CATEGORIES.find((c) => c.id === product.category);
    const title = `${product.name} — Giá ${product.price ? new Intl.NumberFormat("vi-VN").format(product.price) + "₫" : "Liên hệ"} | Hoa Tươi Thanh Ngọc`;
    const desc = `${product.short} Giao nhanh 2h tại TP.HCM, thiệp miễn phí, đặt online qua Zalo ${SITE.phones[0]}.`;
    const productLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: [product.image],
      description: product.description,
      sku: product.slug,
      mpn: product.slug,
      brand: { "@type": "Brand", name: SITE.brand },
      category: cat?.label,
      url,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.value.toFixed(1),
        reviewCount: String(product.rating.count),
        bestRating: "5",
        worstRating: "1",
      },
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "VND",
        price: product.price ?? 0,
        priceValidUntil: "2026-12-31",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: SITE.name, url: SITE.domain },
      },
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE.domain },
        { "@type": "ListItem", position: 2, name: "Sản phẩm", item: `${SITE.domain}/san-pham` },
        ...(cat ? [{ "@type": "ListItem", position: 3, name: cat.label, item: `${SITE.domain}/san-pham?cat=${cat.id}` }] : []),
        { "@type": "ListItem", position: cat ? 4 : 3, name: product.name, item: url },
      ],
    };
    const faqLd = product.faqs && product.faqs.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: product.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    } : null;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: [product.name, ...product.keywords, cat?.label, "hoa tươi tphcm", "giao hoa nhanh"].filter(Boolean).join(", ") },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: product.name },
        { property: "og:description", content: desc },
        { property: "og:image", content: product.image },
        { property: "og:image:alt", content: product.name },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "product:price:amount", content: String(product.price ?? 0) },
        { property: "product:price:currency", content: "VND" },
        { property: "product:availability", content: "in stock" },
        { property: "product:category", content: cat?.label ?? "" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: product.name },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: product.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(productLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
        ...(faqLd ? [{ type: "application/ld+json", children: JSON.stringify(faqLd) }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-serif text-3xl">Không tìm thấy sản phẩm</h1>
        <Link to="/san-pham" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-serif text-2xl">Đã có lỗi xảy ra</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-primary px-6 py-2.5 text-primary-foreground">Thử lại</button>
      </div>
    </SiteLayout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const cat = CATEGORIES.find((c) => c.id === product.category);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  const orderMsg = encodeURIComponent(
    `Xin chào Hoa Tươi Thanh Ngọc, tôi muốn đặt sản phẩm: ${product.name}${product.price ? ` — ${formatPrice(product.price)}` : ""}. Xin tư vấn giúp tôi.`,
  );

  return (
    <SiteLayout>
      <section className="bg-cream py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Trang chủ</Link> · <Link to="/san-pham" className="hover:text-primary">Sản phẩm</Link>
            {cat && <> · <Link to="/san-pham" search={{ cat: cat.id }} className="hover:text-primary">{cat.label}</Link></>}
            <span> · </span><span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <div className="overflow-hidden rounded-3xl bg-cream shadow-soft">
            <img src={product.image} alt={product.name} width={800} height={800} className="aspect-square h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              {cat && <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">{cat.label}</span>}
              {product.badge && <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-medium text-primary">{product.badge}</span>}
              <span className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-muted-foreground">★ {product.rating.value.toFixed(1)} · {product.rating.count} đánh giá</span>
            </div>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">{product.name}</h1>
            <div className="mt-5 flex items-baseline gap-3">
              <div className="font-serif text-3xl font-semibold text-primary">{formatPrice(product.price)}</div>
              <span className="text-xs text-muted-foreground">đã bao gồm thiệp & gói quà</span>
            </div>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{product.description}</p>

            <ul className="mt-6 grid gap-3 text-sm">
              <li className="flex gap-3"><Truck className="h-5 w-5 text-gold" /> Giao hàng nhanh trong 2 giờ tại TP.HCM</li>
              <li className="flex gap-3"><Sparkles className="h-5 w-5 text-gold" /> Thiết kế cá nhân hoá theo yêu cầu</li>
              <li className="flex gap-3"><Mail className="h-5 w-5 text-gold" /> Tặng kèm thiệp viết tay miễn phí</li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => add(product)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:bg-primary/90 sm:flex-none">
                <ShoppingBag className="h-4 w-4" /> Thêm vào giỏ
              </button>
              <a href={`${SITE.zalo}?body=${orderMsg}`} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-medium text-primary transition hover:scale-[1.02]">
                <MessageCircle className="h-4 w-4" /> Đặt qua Zalo
              </a>
              <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">
                <Phone className="h-4 w-4" /> Gọi đặt
              </a>
            </div>

            {product.keywords.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Từ khoá liên quan</div>
                <div className="flex flex-wrap gap-2">
                  {product.keywords.map((k) => (
                    <span key={k} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80">#{k}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Sản Phẩm Liên Quan</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
