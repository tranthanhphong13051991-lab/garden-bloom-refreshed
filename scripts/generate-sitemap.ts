import { PRODUCTS, CATEGORIES } from "../src/data/products";
import { SITE } from "../src/data/site";
import { POSTS } from "../src/data/blog";
import { TAGS } from "../src/data/tags";
import { writeFileSync } from "node:fs";

const today = new Date().toISOString().slice(0, 10);
const urls: Array<{ loc: string; priority: string; lastmod?: string }> = [
  { loc: SITE.domain, priority: "1.0" },
  { loc: `${SITE.domain}/san-pham`, priority: "0.9" },
  { loc: `${SITE.domain}/blog`, priority: "0.8" },
  { loc: `${SITE.domain}/gioi-thieu`, priority: "0.6" },
  { loc: `${SITE.domain}/lien-he`, priority: "0.7" },
  { loc: `${SITE.domain}/the`, priority: "0.7" },
  ...CATEGORIES.map((c) => ({ loc: `${SITE.domain}/san-pham?cat=${c.id}`, priority: "0.7" })),
  ...PRODUCTS.map((p) => ({ loc: `${SITE.domain}/san-pham/${p.slug}`, priority: "0.8" })),
  ...POSTS.map((p) => ({ loc: `${SITE.domain}/blog/${p.slug}`, priority: "0.7", lastmod: (p.updatedAt ?? p.publishedAt).slice(0, 10) })),
  ...TAGS.map((t) => ({ loc: `${SITE.domain}/the/${t.slug}`, priority: "0.6" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod ?? today}</lastmod><priority>${u.priority}</priority></url>`)
  .join("\n")}
</urlset>
`;

writeFileSync("public/sitemap.xml", xml);
console.log(`Generated sitemap.xml with ${urls.length} URLs`);

