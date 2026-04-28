import { createFileRoute } from "@tanstack/react-router";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const today = new Date().toISOString().slice(0, 10);
        const urls = [
          { loc: SITE.domain, priority: "1.0" },
          { loc: `${SITE.domain}/san-pham`, priority: "0.9" },
          { loc: `${SITE.domain}/gioi-thieu`, priority: "0.6" },
          { loc: `${SITE.domain}/lien-he`, priority: "0.7" },
          ...CATEGORIES.map((c) => ({ loc: `${SITE.domain}/san-pham?cat=${c.id}`, priority: "0.7" })),
          ...PRODUCTS.map((p) => ({ loc: `${SITE.domain}/san-pham/${p.slug}`, priority: "0.8" })),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
