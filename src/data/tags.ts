import { PRODUCTS, type Product } from "./products";

const slugifyVi = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export type Tag = { slug: string; label: string; products: Product[] };

const map = new Map<string, { label: string; products: Product[] }>();
for (const p of PRODUCTS) {
  for (const k of p.keywords) {
    const slug = slugifyVi(k);
    if (!slug) continue;
    if (!map.has(slug)) map.set(slug, { label: k, products: [] });
    map.get(slug)!.products.push(p);
  }
}

export const TAGS: Tag[] = Array.from(map.entries())
  .map(([slug, v]) => ({ slug, label: v.label, products: v.products }))
  .sort((a, b) => b.products.length - a.products.length);

export const findTag = (slug: string): Tag | undefined => TAGS.find((t) => t.slug === slug);
export const tagSlug = (keyword: string) => slugifyVi(keyword);
