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
      { title: "Bộ Sưu Tập Hoa — Thanh Ngọc Flower's | Boutique Florist TP.HCM" },
      { name: "description", content: "Bộ sưu tập hoa tươi boutique tại Bình Thạnh, TP.HCM: bó hoa thiết kế riêng, giỏ hoa sang trọng, kệ hoa khai trương, lan hồ điệp cao cấp. Giao nhanh 2h." },
      { property: "og:title", content: "Bộ Sưu Tập Hoa — Thanh Ngọc Flower's" },
      { property: "og:description", content: "Boutique florist Bình Thạnh — Bó hoa, giỏ hoa, kệ khai trương, lan hồ điệp. Giao 2h." },
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
      <section className="bg-[#E9DFD2]/50 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#D8B36A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">Bộ Sưu Tập</span>
            <span className="h-px w-8 bg-[#D8B36A]" />
          </div>
          <h1 className="font-serif text-4xl font-semibold text-[#1A2E28] md:text-6xl">
            {activeCat ? activeCat.label : "Tất Cả Sản Phẩm"}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[#5A6B64]">
            {activeCat ? activeCat.description : "Khám phá tất cả các mẫu hoa tươi boutique tại Thanh Ngọc Flower's."}
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
                  !cat ? "border-[#173F35] bg-[#173F35] text-[#F5F1E8]" : "border-[#DCD5C8] bg-[#F5F1E8] text-[#5A6B64] hover:border-[#173F35] hover:text-[#173F35]"
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
                      active ? "border-[#173F35] bg-[#173F35] text-[#F5F1E8]" : "border-[#DCD5C8] bg-[#F5F1E8] text-[#5A6B64] hover:border-[#173F35] hover:text-[#173F35]"
                    }`}
                  >
                    {c.label} ({count})
                  </Link>
                );
              })}
            </nav>
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5A6B64]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Tìm tên hoa..."
                className="w-full rounded-full border border-[#DCD5C8] bg-[#F5F1E8] py-2.5 pl-10 pr-4 text-sm outline-none text-[#1A2E28] placeholder:text-[#5A6B64] transition focus:border-[#173F35]"
                aria-label="Tìm sản phẩm"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-16 text-center text-[#5A6B64]">Không tìm thấy sản phẩm phù hợp.</div>
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