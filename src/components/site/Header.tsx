import { Link } from "@tanstack/react-router";
import { ShoppingBag, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/store/cart";
import { SITE } from "@/data/site";

const nav = [
  { to: "/", label: "Trang Chủ" },
  { to: "/san-pham", label: "Sản Phẩm" },
  { to: "/blog", label: "Blog" },
  { to: "/gioi-thieu", label: "Giới Thiệu" },
  { to: "/lien-he", label: "Liên Hệ" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());
  const setCartOpen = useCart((s) => s.setOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#DCD5C8]/60 bg-[#F5F1E8]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3 group" aria-label={SITE.name}>
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-2 border-[#D8B36A]/30 bg-[#F5F1E8] transition-all group-hover:scale-105 group-hover:border-[#D8B36A]/60">
            <img src={SITE.logo} alt="Logo Hoa Tươi Thanh Ngọc" className="h-full w-full object-contain p-0.5" />
          </div>
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#5A6B64]">Boutique Florist</div>
            <div className="font-serif text-xl font-semibold text-[#173F35]">Thanh Ngọc</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative px-4 py-2 text-sm font-medium text-[#5A6B64] transition-colors hover:text-[#173F35] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-[#D8B36A] after:transition-transform after:duration-300 hover:after:scale-x-100"
              activeProps={{ className: "relative px-4 py-2 text-sm font-semibold text-[#173F35] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:scale-x-100 after:rounded-full after:bg-[#D8B36A]" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phones[0]}`}
            className="hidden items-center gap-2 rounded-full bg-[#173F35] px-5 py-2.5 text-sm font-medium text-[#F5F1E8] shadow-soft transition-all hover:bg-[#0F342C] hover:shadow-elegant lg:inline-flex"
          >
            <Phone className="h-4 w-4" /> {SITE.phones[0].replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}
          </a>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Giỏ hàng"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#5A6B64] transition-colors hover:bg-[#E9DFD2] hover:text-[#173F35]"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D8B36A] px-1 text-[10px] font-bold text-[#173F35]">
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#5A6B64] hover:bg-[#E9DFD2] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#DCD5C8] bg-[#F5F1E8] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4" aria-label="Menu di động">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-[#DCD5C8]/40 py-3 text-base font-medium text-[#5A6B64]"
                activeProps={{ className: "border-b border-[#DCD5C8]/40 py-3 text-base font-semibold text-[#173F35]" }}
              >
                {n.label}
              </Link>
            ))}
            <a href={`tel:${SITE.phones[0]}`} className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#173F35] px-5 py-3 text-sm font-medium text-[#F5F1E8]">
              <Phone className="h-4 w-4" /> Gọi {SITE.phones[0]}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}