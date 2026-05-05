import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { findTag, TAGS } from "@/data/tags";
import { SITE } from "@/data/site";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/the/$tag")({
  loader: ({ params }) => {
    const tag = findTag(params.tag);
    if (!tag) throw notFound();
    return { tag };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { tag } = loaderData;
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
        name: p.name,
      })),
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE.domain },
        { "@type": "ListItem", position: 2, name: "Thẻ", item: `${SITE.domain}/the` },
        { "@type": "ListItem", position: 3, name: tag.label, item: url },
      ],
    };
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${tag.label}, hoa tươi tphcm, ${tag.label} bình thạnh, đặt ${tag.label} online` },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        ...(tag.products[0]?.image ? [{ property: "og:image" as const, content: tag.products[0].image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(itemListLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-serif text-3xl">Không tìm thấy thẻ</h1>
        <Link to="/san-pham" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Xem tất cả sản phẩm
        </Link>
      </div>
    </SiteLayout>
  ),
  component: TagPage,
});

function TagPage() {
  const { tag } = Route.useLoaderData();
  const popular = TAGS.filter((t) => t.slug !== tag.slug).slice(0, 12);

  return (
    <SiteLayout>
      <section className="bg-cream py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Trang chủ</Link> · <span className="text-foreground">Thẻ #{tag.label}</span>
          </nav>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-foreground md:text-5xl">
            #{tag.label}
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            {tag.products.length} mẫu hoa được gắn thẻ <strong>{tag.label}</strong>. Tất cả đều giao nhanh 2h tại TP.HCM, kèm thiệp viết tay miễn phí.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tag.products.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {popular.length > 0 && (
        <section className="border-t border-border bg-cream/40 py-12">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-serif text-2xl font-semibold">Khám phá thẻ khác</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {popular.map((t) => (
                <Link
                  key={t.slug}
                  to="/the/$tag"
                  params={{ tag: t.slug }}
                  className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground/80 hover:border-primary hover:text-primary"
                >
                  #{t.label} <span className="text-xs text-muted-foreground">({t.products.length})</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
