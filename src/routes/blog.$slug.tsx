import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { POSTS, findPost, formatDate, parseContent, type BlogPost } from "@/data/blog";
import { SITE } from "@/data/site";
import { tagSlug } from "@/data/tags";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = findPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData as { post: BlogPost };
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
      author: { "@type": "Organization", name: post.author, url: SITE.domain },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.domain,
        logo: { "@type": "ImageObject", url: `${SITE.domain}/image/logo-thanh-ngoc-flower.webp` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.tags.join(", "),
      url,
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Trang chủ", item: SITE.domain },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.domain}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    };
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: post.tags.join(", ") },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "author", content: post.author },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:image", content: post.cover },
        { property: "og:image:alt", content: post.title },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.publishedAt },
        { property: "article:modified_time", content: post.updatedAt ?? post.publishedAt },
        { property: "article:author", content: post.author },
        ...post.tags.map((t: string) => ({ property: "article:tag", content: t })),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: post.cover },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleLd) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbLd) },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-serif text-3xl">Không tìm thấy bài viết</h1>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Quay lại Blog
        </Link>
      </div>
    </SiteLayout>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData() as { post: BlogPost };
  const blocks = parseContent(post.content);
  const related = POSTS.filter((p: BlogPost) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteLayout>
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Trang chủ</Link> · <Link to="/blog" className="hover:text-primary">Blog</Link>
          <span> · </span><span className="text-foreground">{post.title}</span>
        </nav>

        <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">{post.title}</h1>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" />{post.author}</span>
          <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(post.publishedAt)}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />{post.readingMinutes} phút đọc</span>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-cream shadow-soft">
          <img src={post.cover} alt={post.title} className="aspect-[16/9] w-full object-cover" />
        </div>

        <p className="mt-8 text-lg leading-relaxed text-foreground/80">{post.excerpt}</p>

        <div className="mt-6 space-y-5 leading-relaxed text-foreground/85">
          {blocks.map((b, i) => {
            if (b.type === "h2") return <h2 key={i} className="mt-8 font-serif text-2xl font-semibold text-primary">{b.text}</h2>;
            if (b.type === "ul") return (
              <ul key={i} className="ml-5 list-disc space-y-2">
                {b.items!.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            );
            return <p key={i}>{b.text}</p>;
          })}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Thẻ bài viết</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((t: string) => (
              <Link
                key={t}
                to="/the/$tag"
                params={{ tag: tagSlug(t) }}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/80 hover:border-primary hover:text-primary"
              >
                #{t}
              </Link>
            ))}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <h2 className="font-serif text-3xl font-semibold md:text-4xl">Bài Viết Liên Quan</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p: BlogPost) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl bg-background shadow-soft transition hover:shadow-elegant">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.cover} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary">{p.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
