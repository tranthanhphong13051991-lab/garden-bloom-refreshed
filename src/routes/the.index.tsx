import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TAGS } from "@/data/tags";
import { SITE } from "@/data/site";
import { Tag as TagIcon } from "lucide-react";

export const Route = createFileRoute("/the/")({
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
        url: `${SITE.domain}/the/${t.slug}`,
      })),
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
        name: t.label,
      })),
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE.domain },
        { "@type": "ListItem", position: 2, name: "Thẻ sản phẩm", item: url },
      ],
    };

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(collectionLd) },
        { type: "application/ld+json", children: JSON.stringify(itemListLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
      ],
    };
  },
  component: TagIndexPage,
});

function TagIndexPage() {
  // Nhóm theo số lượng để dễ scan
  const featured = TAGS.slice(0, 16);
  const rest = TAGS.slice(16);

  return (
    <SiteLayout>
      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">Trang chủ</Link> ·{" "}
            <span className="text-foreground">Thẻ sản phẩm</span>
          </nav>
          <div className="mt-3 text-xs uppercase tracking-[0.3em] text-primary">Khám phá theo chủ đề</div>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-foreground md:text-5xl">
            Tất Cả Thẻ Sản Phẩm
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            {TAGS.length} chủ đề được tổng hợp từ tất cả mẫu hoa của Thanh Ngọc — chọn nhanh theo dịp, theo loài hoa
            hoặc theo phong cách bạn yêu thích.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-serif text-2xl font-semibold text-foreground">Thẻ nổi bật</h2>
          <p className="mt-1 text-sm text-muted-foreground">Những chủ đề được khách hàng tìm kiếm nhiều nhất.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featured.map((t) => (
              <Link
                key={t.slug}
                to="/the/$tag"
                params={{ tag: t.slug }}
                className="group flex items-center justify-between rounded-2xl border border-border bg-background px-4 py-3.5 shadow-soft transition hover:border-primary hover:shadow-elegant"
              >
                <span className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-primary">
                    <TagIcon className="h-4 w-4" />
                  </span>
                  <span className="font-medium text-foreground group-hover:text-primary">#{t.label}</span>
                </span>
                <span className="text-xs text-muted-foreground">{t.products.length} mẫu</span>
              </Link>
            ))}
          </div>

          {rest.length > 0 && (
            <>
              <h2 className="mt-12 font-serif text-2xl font-semibold text-foreground">Tất cả thẻ</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {rest.map((t) => (
                  <Link
                    key={t.slug}
                    to="/the/$tag"
                    params={{ tag: t.slug }}
                    className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground/80 hover:border-primary hover:text-primary"
                  >
                    #{t.label}{" "}
                    <span className="text-xs text-muted-foreground">({t.products.length})</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
