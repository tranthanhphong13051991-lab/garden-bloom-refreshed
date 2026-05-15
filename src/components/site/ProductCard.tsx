import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const add = useCart((s) => s.add);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant">
      <Link
        to="/san-pham/$slug"
        params={{ slug: product.slug }}
        className="relative aspect-product overflow-hidden bg-cream-deep"
        aria-label={product.name}
      >
        <img
          src={product.thumb}
          alt={product.name}
          width={480}
          height={600}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
        />

        {/* Badge overlay */}
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gold/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm shadow-sm">
            {product.badge === "Bán chạy" ? "★ Bán chạy" : "◆ Florist choice"}
          </span>
        )}

        {/* Giao nhanh badge */}
        <span className="absolute right-3 top-3 rounded-full bg-primary/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-primary-foreground backdrop-blur-sm">
          Giao 2h
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Nút Xem chi tiết hiện khi hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span className="rounded-full bg-primary-foreground/90 px-6 py-2.5 text-sm font-medium text-primary shadow-lg backdrop-blur-sm transition-transform hover:scale-105">
            Xem chi tiết
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <Link to="/san-pham/$slug" params={{ slug: product.slug }}>
          <h3 className="font-serif text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground md:mt-2">{product.short}</p>

        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/40 pt-3 md:mt-4 md:pt-4">
          <div className="font-serif text-xl font-semibold text-primary">{formatPrice(product.price)}</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product);
            }}
            aria-label={`Thêm ${product.name} vào giỏ`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-soft transition-all duration-300 hover:bg-gold hover:text-primary hover:scale-110 active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}