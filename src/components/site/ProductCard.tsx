import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const add = useCart((s) => s.add);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant">
      <Link
        to="/san-pham/$slug"
        params={{ slug: product.slug }}
        className="relative aspect-square overflow-hidden bg-cream"
        aria-label={product.name}
      >
        <img
          src={product.thumb}
          alt={product.name}
          width={400}
          height={400}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-sm">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to="/san-pham/$slug" params={{ slug: product.slug }}>
          <h3 className="font-serif text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{product.short}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="font-serif text-xl font-semibold text-primary">{formatPrice(product.price)}</div>
          <button
            onClick={() => add(product)}
            aria-label={`Thêm ${product.name} vào giỏ`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-gold hover:text-primary"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
