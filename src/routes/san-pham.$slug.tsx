import { useState, useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, MessageCircle, Phone, Truck, Sparkles, Mail, Heart, Palette, Ruler, Leaf, AlertTriangle, Gift, Images, X, ChevronLeft, ChevronRight, ShieldCheck, Star } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { findProduct, PRODUCTS, CATEGORIES, type Product } from "@/data/products";
import { useCart } from "@/store/cart";
import { SITE } from "@/data/site";
import { tagSlug, findTag, type Tag } from "@/data/tags";

export const Route = createFileRoute("/san-pham/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { product } = loaderData as { product: Product };
    const url = `${SITE.domain}/san-pham/${product.slug}`;
    const cat = CATEGORIES.find((c) => c.id === product.category);
    const title = `${product.name} — Thanh Ngọc Flower's | Boutique Florist TP.HCM`;
    const desc = `${product.short} Ý nghĩa, màu sắc ${product.colors.map((c: Product["colors"][number]) => c.name).join(", ")}, kích thước ${product.sizes[0]?.dimension}. Giao 2h tại TP.HCM, Zalo ${SITE.phones[0]}.`;
    const productLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: [product.image, ...product.gallery.map((g: Product["gallery"][number]) => g.src)],
      description: `${product.description} ${product.meaning.join(" ")}`,
      sku: product.slug,
      mpn: product.slug,
      brand: { "@type": "Brand", name: SITE.brand },
      category: cat?.label,
      url,
      color: product.colors.map((c: Product["colors"][number]) => c.name).join(", "),
      material: product.materials.join(", "),
      size: product.sizes.map((s: Product["sizes"][number]) => `${s.label}: ${s.dimension}`).join(" | "),
      additionalProperty: [
        ...product.colors.map((c: Product["colors"][number]) => ({ "@type": "PropertyValue", name: "Màu sắc", value: c.name })),
        ...product.sizes.map((s: Product["sizes"][number]) => ({ "@type": "PropertyValue", name: `Kích thước ${s.label}`, value: s.dimension })),
        { "@type": "PropertyValue", name: "Dịp tặng", value: product.occasions.join(", ") },
        { "@type": "PropertyValue", name: "Ý nghĩa", value: product.meaning.join(" ") },
      ],
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
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        seller: { "@type": "Organization", name: SITE.name, url: SITE.domain },
        description: "Liên hệ Zalo/điện thoại để được báo giá và tư vấn miễn phí.",
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
      mainEntity: product.faqs.map((f: Product["faqs"][number]) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    } : null;

    const tagSuggestions = product.keywords
      .map((k: string) => findTag(tagSlug(k)))
      .filter((t): t is Tag => !!t)
      .map((t: Tag) => ({
        ...t,
        products: t.products.filter((p: Product) => p.slug !== product.slug).slice(0, 4),
      }))
      .filter((t: Tag) => t.products.length > 0)
      .slice(0, 3);

    const tagListLd = tagSuggestions.length > 0 ? tagSuggestions.map((t: Tag) => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `Gợi ý theo thẻ ${t.label}`,
      url: `${SITE.domain}/the/${t.slug}`,
      numberOfItems: t.products.length,
      itemListElement: t.products.map((p: Product, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE.domain}/san-pham/${p.slug}`,
        name: p.name,
      })),
    })) : [];
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: [product.name, ...product.keywords, cat?.label, "hoa tươi boutique", "giao hoa nhanh"].filter(Boolean).join(", ") },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: product.name },
        { property: "og:description", content: desc },
        { property: "og:image", content: product.image },
        { property: "og:image:alt", content: product.name },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
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
        ...tagListLd.map((ld: object) => ({ type: "application/ld+json", children: JSON.stringify(ld) })),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-serif text-3xl text-[#1A2E28]">Không tìm thấy sản phẩm</h1>
        <Link to="/san-pham" className="mt-6 inline-flex items-center gap-2 text-[#173F35] hover:text-[#D8B36A]">
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-serif text-2xl text-[#1A2E28]">Đã có lỗi xảy ra</h1>
        <p className="mt-2 text-sm text-[#5A6B64]">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-[#173F35] px-6 py-2.5 text-sm font-medium text-[#F5F1E8]">Thử lại</button>
      </div>
    </SiteLayout>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData() as { product: Product };
  const add = useCart((s) => s.add);
  const cat = CATEGORIES.find((c) => c.id === product.category);
  const related = PRODUCTS.filter((p: Product) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  const tagSuggestions = product.keywords
    .map((k: string) => findTag(tagSlug(k)))
    .filter((t): t is Tag => !!t)
    .map((t: Tag) => ({
      ...t,
      products: t.products.filter((p: Product) => p.slug !== product.slug).slice(0, 4),
    }))
    .filter((t: Tag) => t.products.length > 0)
    .slice(0, 3);

  const orderMsg = encodeURIComponent(
    `Xin chào Hoa Tươi Thanh Ngọc, tôi muốn đặt sản phẩm: ${product.name}. Xin tư vấn và báo giá giúp tôi.`,
  );

  // Gallery chỉ gồm 4 ảnh thực tế (không bao gồm ảnh studio chính)
  const galleryShots = product.gallery;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? null : (i - 1 + galleryShots.length) % galleryShots.length));
  const next = () => setLightbox((i) => (i === null ? null : (i + 1) % galleryShots.length));

  const [activeSection, setActiveSection] = useState("y-nghia");

  useEffect(() => {
    const ids = ["y-nghia", "mau-sac", "kich-thuoc", "faq"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: "0px 0px -60% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 136;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <section className="bg-[#E9DFD2]/50 py-4">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-[#5A6B64]">
            <Link to="/" className="hover:text-[#173F35]">Trang chủ</Link> · <Link to="/san-pham" className="hover:text-[#173F35]">Sản phẩm</Link>
            {cat && <> · <Link to="/san-pham" search={{ cat: cat.id }} className="hover:text-[#173F35]">{cat.label}</Link></>}
            <span> · </span><span className="text-[#1A2E28] font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero */}
      <section className="py-10 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:gap-14 md:px-8">
          {/* Image — lớn, sạch, 4:5 */}
          <div className="overflow-hidden rounded-3xl bg-[#E9DFD2] shadow-soft">
            <img src={product.image} alt={product.name} width={800} height={1000} className="aspect-product h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]" />
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              {cat && <span className="rounded-full bg-[#173F35]/10 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-[#173F35]">{cat.label}</span>}
              {product.badge && (
                <span className="rounded-full bg-[#D8B36A]/20 px-3.5 py-1 text-xs font-medium text-[#173F35]">
                  {product.badge === "Bán chạy" ? "★ Bán chạy" : "◆ Shop Chọn Mẫu"}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-[#5A6B64]">
                <Star className="h-3.5 w-3.5 fill-[#D8B36A] text-[#D8B36A]" /> {product.rating.value.toFixed(1)} · {product.rating.count} đánh giá
              </span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#1A2E28] md:text-5xl">{product.name}</h1>

            <p className="mt-5 text-base leading-relaxed text-[#5A6B64]">{product.description}</p>

            {/* Giới thiệu dịp tặng cảm xúc */}
            <div className="mt-6 rounded-2xl border border-[#D8B36A]/20 bg-[#D8B36A]/5 p-4">
              <div className="flex items-start gap-3">
                <Heart className="mt-0.5 h-5 w-5 text-[#D8B36A]" />
                <div>
                  <div className="font-serif text-base font-semibold text-[#1A2E28]">Dành cho những lời yêu thương nhẹ nhàng</div>
                  <p className="mt-1 text-sm text-[#5A6B64]">
                    Phù hợp: {product.occasions.slice(0, 3).join(", ")} — {product.meaning[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* USPs */}
            <ul className="mt-6 grid gap-3 text-sm">
              <li className="flex gap-3"><Truck className="h-5 w-5 text-[#D8B36A]" /> Giao hàng nhanh trong 2 giờ tại TP.HCM</li>
              <li className="flex gap-3"><Sparkles className="h-5 w-5 text-[#D8B36A]" /> Thiết kế cá nhân hoá theo yêu cầu</li>
              <li className="flex gap-3"><Mail className="h-5 w-5 text-[#D8B36A]" /> Tặng kèm thiệp viết tay miễn phí</li>
              <li className="flex gap-3"><ShieldCheck className="h-5 w-5 text-[#D8B36A]" /> Cam kết hoa tươi — đổi mới trong 24h</li>
            </ul>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => add(product)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#173F35] px-6 py-3.5 font-medium text-[#F5F1E8] shadow-soft transition hover:bg-[#0F342C] hover:shadow-elegant sm:flex-none">
                <ShoppingBag className="h-4 w-4" /> Thêm vào giỏ
              </button>
              <a href={`${SITE.zalo}?body=${orderMsg}`} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D8B36A] px-6 py-3.5 font-medium text-[#173F35] transition hover:scale-[1.02] shadow-soft">
                <MessageCircle className="h-4 w-4" /> Đặt qua Zalo
              </a>
              <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#173F35]/30 px-6 py-3 font-medium text-[#173F35] transition hover:bg-[#173F35] hover:text-[#F5F1E8]">
                <Phone className="h-4 w-4" /> Gọi đặt
              </a>
            </div>

            {/* Keywords */}
            {product.keywords.length > 0 && (
              <div className="mt-8 border-t border-[#DCD5C8] pt-6">
                <div className="mb-3 text-xs font-medium uppercase tracking-wider text-[#5A6B64]">Từ khoá liên quan</div>
                <div className="flex flex-wrap gap-2">
                  {product.keywords.map((k: string) => (
                    <Link
                      key={k}
                      to="/the/$tag"
                      params={{ tag: tagSlug(k) }}
                      className="rounded-full border border-[#DCD5C8] bg-[#F5F1E8] px-3 py-1 text-xs text-[#5A6B64] transition hover:border-[#173F35] hover:text-[#173F35]"
                    >
                      #{k}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY — HÌNH ẢNH THỰC TẾ */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#173F35]">
                <Images className="h-3.5 w-3.5" /> Bộ Sưu Tập Ảnh
              </div>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1A2E28] md:text-4xl">Sản Phẩm Qua Nhiều Góc Nhìn</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#5A6B64]">
                Hình ảnh thực tế của sản phẩm qua nhiều góc nhìn — giúp bạn hình dung rõ nhất về sản phẩm trước khi đặt.
              </p>
            </div>
            <span className="rounded-full bg-[#E9DFD2] px-3 py-1 text-xs font-medium text-[#5A6B64]">
              4 ảnh
            </span>
          </header>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryShots.map((shot: (typeof galleryShots)[number], i: number) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative overflow-hidden rounded-2xl border border-[#DCD5C8] bg-[#E9DFD2] shadow-soft transition hover:-translate-y-1 hover:shadow-elegant"
                aria-label={`Xem ${shot.variant}`}
              >
                <div className="aspect-product overflow-hidden">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width={400}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 text-left">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-white/80">
                    THỰC TẾ
                  </div>
                  <div className="text-sm font-semibold text-white">{shot.variant}</div>
                </div>
              </button>
            ))}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-[#5A6B64]">
            <strong className="text-[#1A2E28]">Vì sao có khác biệt?</strong> Hoa là hàng nông nghiệp tự nhiên — màu sắc, kích cỡ
            và độ nở thay đổi theo mùa và từng lô nhập. Mỗi sản phẩm được gói thủ công nên có thể chênh lệch đôi chút.
            Chúng tôi luôn giữ đúng <em>bố cục, tone chủ đạo</em> và <em>chất lượng hoa tươi</em> như mẫu.
          </p>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh phóng to"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Đóng"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Ảnh trước"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Ảnh sau"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <figure className="flex max-h-[90vh] max-w-5xl flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryShots[lightbox].src}
              alt={galleryShots[lightbox].alt}
              className="max-h-[75vh] w-auto rounded-2xl object-contain shadow-elegant"
            />
            <figcaption className="max-w-2xl rounded-xl bg-white/10 px-4 py-2.5 text-center text-sm text-white backdrop-blur">
              <span className="font-semibold">{galleryShots[lightbox].variant}</span>
              {galleryShots[lightbox].note && <> — <span className="text-white/80">{galleryShots[lightbox].note}</span></>}
              <span className="mt-1 block text-xs text-white/60">{lightbox + 1} / {galleryShots.length}</span>
            </figcaption>
          </figure>
        </div>
      )}

      {/* ANCHOR NAV */}
      <nav
        aria-label="Điều hướng nội dung"
        className="sticky top-20 z-30 border-b border-[#DCD5C8]/60 bg-[#F5F1E8]/95 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-2.5 md:px-8 scrollbar-none">
          {[
            { id: "y-nghia",    label: "Ý nghĩa"    },
            { id: "mau-sac",    label: "Màu sắc"    },
            { id: "kich-thuoc", label: "Kích thước"  },
            { id: "faq",        label: "FAQ"         },
          ].map((t: { id: string; label: string }) => (
            <button
              key={t.id}
              type="button"
              onClick={() => scrollTo(t.id)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeSection === t.id
                  ? "bg-[#173F35] text-[#F5F1E8] shadow-sm"
                  : "text-[#5A6B64] hover:bg-[#E9DFD2] hover:text-[#1A2E28]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* DETAIL SECTIONS */}
      <section className="bg-[#F0EBE0]/40 py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <header className="mb-10 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#D8B36A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">Chi Tiết</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1A2E28] md:text-4xl">Khám Phá {product.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5A6B64]">
              Tìm hiểu sâu hơn về ý nghĩa, bảng màu chủ đạo, kích thước tham khảo và cách giữ hoa tươi lâu nhất.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Ý nghĩa */}
            <article id="y-nghia" className="rounded-2xl border border-[#DCD5C8] bg-[#F5F1E8] p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-[#1A2E28]">
                <Heart className="h-5 w-5 text-[#173F35]" /> Ý nghĩa & thông điệp
              </h3>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[#5A6B64]">
                {product.meaning.map((m: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D8B36A]" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
              {product.occasions.length > 0 && (
                <div className="mt-5 border-t border-[#DCD5C8] pt-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#5A6B64]">
                    <Gift className="h-3.5 w-3.5" /> Dịp tặng phù hợp
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.occasions.map((o: string) => (
                      <span key={o} className="rounded-full bg-[#173F35]/10 px-3 py-1 text-xs text-[#173F35]">{o}</span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Màu sắc */}
            <article id="mau-sac" className="rounded-2xl border border-[#DCD5C8] bg-[#F5F1E8] p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-[#1A2E28]">
                <Palette className="h-5 w-5 text-[#173F35]" /> Bảng màu chủ đạo
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {product.colors.map((c: Product["colors"][number]) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-xl border border-[#DCD5C8] bg-[#F5F1E8]/50 px-3 py-2.5">
                    <span
                      className="h-7 w-7 shrink-0 rounded-full border border-[#DCD5C8] shadow-sm"
                      style={{ backgroundColor: c.hex }}
                      aria-label={c.name}
                    />
                    <span className="text-sm font-medium text-[#1A2E28]">{c.name}</span>
                  </div>
                ))}
              </div>
              {product.materials.length > 0 && (
                <div className="mt-5 border-t border-[#DCD5C8] pt-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#5A6B64]">
                    <Leaf className="h-3.5 w-3.5" /> Chất liệu / Loài hoa chính
                  </div>
                  <p className="text-sm text-[#5A6B64]">{product.materials.join(" · ")}</p>
                </div>
              )}
            </article>

            {/* Kích thước */}
            <article id="kich-thuoc" className="rounded-2xl border border-[#DCD5C8] bg-[#F5F1E8] p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-[#1A2E28]">
                <Ruler className="h-5 w-5 text-[#173F35]" /> Kích thước tham khảo
              </h3>
              <div className="mt-4 overflow-hidden rounded-xl border border-[#DCD5C8]">
                <table className="w-full text-sm">
                  <thead className="bg-[#E9DFD2]/60 text-left text-xs uppercase tracking-wider text-[#5A6B64]">
                    <tr>
                      <th className="px-4 py-2.5 font-medium">Phiên bản</th>
                      <th className="px-4 py-2.5 font-medium">Kích thước</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCD5C8]">
                    {product.sizes.map((s: Product["sizes"][number]) => (
                      <tr key={s.label}>
                        <td className="px-4 py-3 font-medium text-[#1A2E28]">{s.label}</td>
                        <td className="px-4 py-3 text-[#5A6B64]">
                          {s.dimension}
                          {s.note && <span className="block text-xs text-[#5A6B64]/80">{s.note}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-[#5A6B64]">
                * Kích thước có thể chênh lệch ±5–10% tuỳ kiểu thiết kế và loài hoa thực tế trong ngày.
              </p>
            </article>

            {/* Chăm sóc */}
            <article className="rounded-2xl border border-[#DCD5C8] bg-[#F5F1E8] p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold text-[#1A2E28]">
                <Sparkles className="h-5 w-5 text-[#173F35]" /> Cách giữ hoa tươi lâu
              </h3>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-[#5A6B64]">
                {product.careTips.map((t: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#173F35]/10 text-xs font-semibold text-[#173F35]">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>

          {/* LƯU Ý */}
          <aside
            role="note"
            className="mt-8 flex gap-4 rounded-2xl border border-[#D8B36A]/40 bg-[#D8B36A]/10 p-5 shadow-soft"
          >
            <AlertTriangle className="h-6 w-6 shrink-0 text-[#173F35]" aria-hidden />
            <div>
              <div className="font-serif text-lg font-semibold text-[#1A2E28]">Lưu ý quan trọng</div>
              <p className="mt-1 text-sm leading-relaxed text-[#5A6B64]">
                Sản phẩm thực nhận có thể khác đôi chút so với hình đại diện trên website do
                <strong> đặc điểm thủ công</strong> trong từng thiết kế và <strong>tính chất tự nhiên</strong> của
                hàng nông nghiệp. Chúng tôi cam kết giữ đúng tone màu, bố cục và chất lượng tươi mới.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      {product.faqs.length > 0 && (
        <section id="faq" className="py-16">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#D8B36A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">FAQ</span>
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#1A2E28] md:text-4xl">Câu Hỏi Thường Gặp</h2>
            <div className="mt-8 divide-y divide-[#DCD5C8] rounded-2xl border border-[#DCD5C8] bg-[#F5F1E8] shadow-soft">
              {product.faqs.map((f: Product["faqs"][number], i: number) => (
                <details key={i} className="group p-5 open:bg-[#E9DFD2]/40">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[#1A2E28]">
                    <span>{f.q}</span>
                    <span className="text-xl leading-none text-[#173F35] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#5A6B64]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAG SUGGESTIONS */}
      {tagSuggestions.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#D8B36A]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">Khám Phá Thêm</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1A2E28] md:text-4xl">Gợi Ý Theo Thẻ</h2>
                <p className="mt-2 max-w-2xl text-sm text-[#5A6B64]">
                  Những mẫu hoa cùng chủ đề với <strong>{product.name}</strong> — gợi ý nhanh khi bạn muốn so sánh phong cách.
                </p>
              </div>
              <Link to="/the" className="hidden text-sm text-[#173F35] hover:text-[#D8B36A] md:inline">Tất cả thẻ →</Link>
            </div>

            <div className="mt-10 space-y-12">
              {tagSuggestions.map((t: Tag) => (
                <div key={t.slug}>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-serif text-xl font-semibold text-[#1A2E28]">
                      <Link to="/the/$tag" params={{ tag: t.slug }} className="hover:text-[#173F35]">
                        #{t.label}
                      </Link>
                      <span className="ml-2 text-sm font-normal text-[#5A6B64]">({t.products.length} mẫu liên quan)</span>
                    </h3>
                    <Link
                      to="/the/$tag"
                      params={{ tag: t.slug }}
                      className="text-xs text-[#173F35] hover:text-[#D8B36A]"
                    >
                      Xem tất cả →
                    </Link>
                  </div>
                  <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {t.products.map((p: Product) => <ProductCard key={p.slug} product={p} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bg-[#E9DFD2]/50 py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-8 bg-[#D8B36A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">Liên Quan</span>
            </div>
            <h2 className="font-serif text-3xl font-semibold text-[#1A2E28] md:text-4xl">Sản Phẩm Liên Quan</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p: Product) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}