import { Link } from "@tanstack/react-router";
import { ShoppingBag, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { SITE } from "@/data/site";

const nav = [
  { to: "/", label: "Trang Chủ" },
  { to: "/san-pham", label: "Sản Phẩm" },
  { to: "/gioi-thieu", label: "Giới Thiệu" },
  { to: "/lien-he", label: "Liên Hệ" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());
  const setCartOpen = useCart((s) => s.setOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3 group" aria-label={SITE.name}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/80 text-primary transition-transform group-hover:scale-105">
            <span className="font-serif text-2xl italic font-semibold">N</span>
          </div>
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Hoa Tươi</div>
            <div className="font-serif text-xl font-semibold text-primary">Thanh Ngọc</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "px-4 py-2 text-sm font-semibold text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phones[0]}`}
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-elegant lg:inline-flex"
          >
            <Phone className="h-4 w-4" /> {SITE.phones[0].replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
          </a>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Giỏ hàng"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-primary">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 hover:bg-secondary md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4" aria-label="Menu di động">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-base font-medium text-foreground/80"
                activeProps={{ className: "border-b border-border/40 py-3 text-base font-semibold text-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <a href={`tel:${SITE.phones[0]}`} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground">
              <Phone className="h-4 w-4" /> Gọi {SITE.phones[0]}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
