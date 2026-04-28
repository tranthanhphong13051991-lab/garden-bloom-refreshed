import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flower2, Truck, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, featuredProducts, PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hoa Tươi Thanh Ngọc — Tiệm Hoa Bình Thạnh, TP.HCM | Giao 2h" },
      { name: "description", content: "Đặt hoa tươi tại Bình Thạnh, TP.HCM. Bó hoa, giỏ hoa, kệ hoa khai trương, lan hồ điệp, hoa chia buồn. Giao nhanh 2 giờ — kèm thiệp miễn phí. Hotline 0934 926 092." },
      { property: "og:title", content: "Hoa Tươi Thanh Ngọc — Tiệm Hoa Bình Thạnh" },
      { property: "og:description", content: "Tiệm hoa tươi Bình Thạnh — Giao nhanh trong 2 giờ. Bó hoa, giỏ hoa, kệ khai trương, lan hồ điệp." },
    ],
  }),
  component: HomePage,
});

const icons = { Flower2, Truck, Sparkles, Mail } as const;

function HomePage() {
  const featured = featuredProducts();
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_20%_30%,white_0,transparent_40%),radial-gradient(circle_at_80%_70%,white_0,transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-center md:px-8 md:py-32">
          <p className="ornament inline-block text-xs uppercase tracking-[0.35em] text-gold">
            Tiệm Hoa Bình Thạnh
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] md:text-7xl lg:text-8xl">
            Thanh Ngọc
            <span className="mt-2 block font-serif text-3xl italic text-gold md:text-4xl">— Flower's —</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            Gửi trọn yêu thương qua từng cánh hoa tươi thắm — Mỗi bó hoa là một lời nói từ trái tim.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/san-pham" className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-medium text-primary shadow-elegant transition hover:scale-[1.02]">
              Xem Bộ Sưu Tập <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 font-medium text-primary-foreground transition hover:bg-primary-foreground/10">
              <Phone className="h-4 w-4" /> {SITE.phones[0]}
            </a>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-4 md:px-0">
          {[
            { I: Flower2, t: "Hoa Tươi 100%", d: "Nhập trực tiếp mỗi ngày" },
            { I: Truck, t: "Giao Hàng Nhanh", d: "Tận nơi trong 2 giờ" },
            { I: Sparkles, t: "Thiết Kế Theo Yêu Cầu", d: "Cá nhân hoá từng bó hoa" },
            { I: Mail, t: "Kèm Thiệp Miễn Phí", d: "Viết lời chúc yêu thương" },
          ].map((u, i) => (
            <div key={i} className="flex items-center gap-4 bg-background p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary">
                <u.I className="h-5 w-5" />
              </div>
              <div>
                <div className="font-serif text-lg font-semibold text-foreground">{u.t}</div>
                <div className="text-xs text-muted-foreground">{u.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <p className="ornament text-xs uppercase tracking-[0.35em] text-primary">Danh Mục</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-foreground md:text-5xl">Bộ Sưu Tập Hoa</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Mỗi đoá hoa là một câu chuyện yêu thương được kể bằng ngôn ngữ của thiên nhiên.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((c) => {
              const sample = PRODUCTS.find((p) => p.category === c.id);
              return (
                <Link
                  key={c.id}
                  to="/san-pham"
                  search={{ cat: c.id }}
                  className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-soft transition-transform hover:-translate-y-1"
                >
                  {sample && (
                    <img src={sample.thumb} alt={c.label} loading="lazy" width={400} height={533} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                    <div className="font-serif text-2xl font-semibold">{c.label}</div>
                    <div className="mt-1 text-xs text-primary-foreground/80">{c.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="ornament text-xs uppercase tracking-[0.35em] text-primary">Nổi Bật</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Sản Phẩm Bán Chạy</h2>
            </div>
            <Link to="/san-pham" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-gold">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => <ProductCard key={p.slug} product={p} eager={i < 4} />)}
          </div>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-8">
          <div>
            <p className="ornament text-xs uppercase tracking-[0.35em] text-gold">Liên Hệ</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Đặt Hoa Cho Bạn</h2>
            <p className="mt-4 text-primary-foreground/80">
              Để lại thông tin — chúng tôi sẽ liên hệ và tư vấn bó hoa phù hợp nhất cho bạn. Hoặc gọi/Zalo trực tiếp để được hỗ trợ ngay.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-gold" /><div>{SITE.address}</div></div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 text-gold" /><div><a href={`tel:${SITE.phones[0]}`} className="hover:text-gold">{SITE.phones[0]}</a> · <a href={`tel:${SITE.phones[1]}`} className="hover:text-gold">{SITE.phones[1]}</a></div></div>
              <div className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 text-gold" /><a href={`mailto:${SITE.email}`} className="hover:text-gold">{SITE.email}</a></div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8">
            <div className="font-serif text-2xl">Đặt nhanh trong 1 phút</div>
            <p className="text-sm text-primary-foreground/80">Tư vấn miễn phí — báo giá ngay — giao hoa trong 2 giờ.</p>
            <a href={SITE.zalo} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-medium text-primary transition hover:scale-[1.02]">
              Chat Zalo Tư Vấn
            </a>
            <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 font-medium text-primary-foreground transition hover:bg-primary-foreground/10">
              <Phone className="h-4 w-4" /> Gọi {SITE.phones[0]}
            </a>
            <Link to="/lien-he" className="text-center text-xs text-primary-foreground/70 underline-offset-4 hover:underline">
              Hoặc gửi yêu cầu chi tiết →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
