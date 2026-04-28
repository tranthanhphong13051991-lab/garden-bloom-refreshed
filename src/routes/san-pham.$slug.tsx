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
    const title = `${product.name} — Hoa Tươi Thanh Ngọc`;
    const desc = product.short;
    const ld = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: [product.image],
      description: product.description,
      sku: product.slug,
      brand: { "@type": "Brand", name: SITE.brand },
      category: CATEGORIES.find((c) => c.id === product.category)?.label,
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "VND",
        price: product.price ?? 0,
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: SITE.name },
      },
    };
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: product.keywords.join(", ") },
        { property: "og:title", content: product.name },
        { property: "og:description", content: desc },
        { property: "og:image", content: product.image },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { name: "twitter:image", content: product.image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(ld) }],
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
            {cat && <div className="text-xs uppercase tracking-widest text-primary">{cat.label}</div>}
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">{product.name}</h1>
            <div className="mt-5 font-serif text-3xl font-semibold text-primary">{formatPrice(product.price)}</div>
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
