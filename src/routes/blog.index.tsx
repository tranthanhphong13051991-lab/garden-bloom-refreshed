import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { POSTS, formatDate } from "@/data/blog";
import { SITE } from "@/data/site";
import { Calendar, Clock } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => {
    const url = `${SITE.domain}/blog`;
    const title = "Blog Hoa Tươi — Mẹo Chăm Hoa, Ý Nghĩa & Gợi Ý Quà Tặng | Thanh Ngọc";
    const desc =
      "Cẩm nang hoa tươi của Hoa Tươi Thanh Ngọc: ý nghĩa các loài hoa, cách chăm hoa giữ tươi lâu, gợi ý hoa theo dịp và phong thủy khai trương.";
    const ld = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog Hoa Tươi Thanh Ngọc",
      url,
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.domain },
      blogPost: POSTS.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE.domain}/blog/${p.slug}`,
        datePublished: p.publishedAt,
        image: p.cover,
      })),
    };
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(ld) }],
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const addFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).src = "/images/blog-placeholder.svg";
  };

  return (
    <SiteLayout>
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Cẩm nang</div>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-foreground md:text-5xl">Blog Hoa Tươi Thanh Ngọc</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Mẹo chăm hoa, ý nghĩa các loài hoa và gợi ý chọn hoa theo dịp — chia sẻ từ tiệm hoa Bình Thạnh.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-soft transition hover:shadow-elegant"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-cream">
                <img src={p.cover} alt={p.title} loading="lazy" width={800} height={600} onError={addFallback} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(p.publishedAt)}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{p.readingMinutes} phút đọc</span>
                </div>
                <h2 className="mt-3 font-serif text-xl font-semibold leading-snug text-foreground group-hover:text-primary">{p.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full bg-cream px-2.5 py-0.5 text-[11px] text-foreground/70">#{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
