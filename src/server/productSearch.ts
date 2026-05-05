import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PRODUCTS, findProduct, type Product, formatPrice } from "@/data/products";

const SearchSchema = z.object({
  query: z.string().min(1).max(200),
});

export type ProductResult = {
  slug: string;
  name: string;
  thumb: string;
  image: string;
  price: string;
  short: string;
  category: string;
};

/**
 * Tìm kiếm sản phẩm theo keyword
 */
export const searchProducts = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => SearchSchema.parse(data))
  .handler(async ({ data }) => {
    const q = data.query.toLowerCase().trim();
    const keywords = q.split(/\s+/);

    const results = PRODUCTS
      .filter((p) => {
        const searchText = [
          p.name,
          p.short,
          p.description,
          p.slug,
          ...p.keywords,
          ...p.occasions,
          ...p.colors.map((c) => c.name),
          ...p.materials,
          p.category,
        ]
          .join(" ")
          .toLowerCase();

        // Kiểm tra tất cả từ khóa đều xuất hiện
        return keywords.every((kw) => searchText.includes(kw));
      })
      .slice(0, 5)
      .map(formatProductResult);

    return { results };
  });

/**
 * Lấy chi tiết sản phẩm kèm ảnh
 */
export const getProductDetail = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const product = findProduct(data.slug);
    if (!product) return { found: false };
    return { found: true, product: formatProductResult(product) };
  });

/**
 * Lấy tất cả sản phẩm dạng lookup (dùng cho AI context)
 */
export const getProductCatalog = createServerFn({ method: "GET" })
  .handler(async () => {
    return {
      catalog: PRODUCTS.map((p) => ({
        slug: p.slug,
        name: p.name,
        price: formatPrice(p.price),
        category: p.category,
        short: p.short,
        keywords: p.keywords,
        occasions: p.occasions,
        colors: p.colors.map((c) => c.name),
        image: p.image,
      })),
    };
  });

export function formatProductResult(p: Product): ProductResult {
  return {
    slug: p.slug,
    name: p.name,
    thumb: p.thumb,
    image: p.image,
    price: formatPrice(p.price),
    short: p.short,
    category: p.category,
  };
}

/**
 * Tìm sản phẩm bằng fuzzy matching (dùng cho AI parse)
 */
export function findProductByText(text: string): Product | undefined {
  const q = text.toLowerCase().trim();

  // Match theo slug trực tiếp
  const bySlug = findProduct(q);
  if (bySlug) return bySlug;

  // Match theo tên chính xác
  const byName = PRODUCTS.find((p) => p.name.toLowerCase() === q);
  if (byName) return byName;

  // Match theo keyword
  return PRODUCTS.find((p) =>
    p.keywords.some((kw) => kw.toLowerCase().includes(q) || q.includes(kw.toLowerCase()))
  );
}