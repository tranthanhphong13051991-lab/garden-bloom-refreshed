import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Search } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

const searchSchema = z.object({
  cat: z.enum(["bo-hoa", "gio-hoa", "khai-truong", "chia-buon", "lan-ho-diep"]).optional(),
});

export const Route = createFileRoute("/san-pham/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Sản Phẩm — Hoa Tươi Thanh Ngọc | Bó Hoa, Giỏ Hoa, Kệ Khai Trương, Lan Hồ Điệp" },
      { name: "description", content: "Bộ sưu tập hoa tươi đa dạng: bó hoa sinh nhật, giỏ hoa sang trọng, kệ hoa khai trương, lan hồ điệp, hoa chia buồn. Giao nhanh 2h tại TP.HCM." },
      { property: "og:title", content: "Sản Phẩm — Hoa Tươi Thanh Ngọc" },
      { property: "og:description", content: "Đa dạng mẫu hoa tươi: bó hoa, giỏ hoa, kệ khai trương, lan hồ điệp. Giao 2h tại TP.HCM." },
      { rel: "canonical", content: `${SITE.domain}/san-pham` },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { cat } = Route.useSearch();
  const [q, setQ] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (q) {
      const t = q.toLowerCase();
      return p.name.toLowerCase().includes(t) || p.short.toLowerCase().includes(t);
    }
    return true;
  });

  const activeCat = cat ? CATEGORIES.find((c) => c.id === cat) : null;

  return (
    <SiteLayout>
      <section className="bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <p className="ornament text-xs uppercase tracking-[0.35em] text-primary">Bộ Sưu Tập</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-6xl">
            {activeCat ? activeCat.label : "Tất Cả Sản Phẩm"}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            {activeCat ? activeCat.description : "Khám phá tất cả các mẫu hoa tươi tại Thanh Ngọc Flower's."}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <nav className="flex flex-wrap gap-2" aria-label="Lọc danh mục">
              <Link
                to="/san-pham"
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  !cat ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary hover:text-primary"
                }`}
              >
                Tất Cả ({PRODUCTS.length})
              </Link>
              {CATEGORIES.map((c) => {
                const count = PRODUCTS.filter((p) => p.category === c.id).length;
                const active = cat === c.id;
                return (
                  <Link
                    key={c.id}
                    to="/san-pham"
                    search={{ cat: c.id }}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary hover:text-primary"
                    }`}
                  >
                    {c.label} ({count})
                  </Link>
                );
              })}
            </nav>
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm tên hoa..."
                className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary"
                aria-label="Tìm sản phẩm"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-16 text-center text-muted-foreground">Không tìm thấy sản phẩm phù hợp.</div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => <ProductCard key={p.slug} product={p} eager={i < 4} />)}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
