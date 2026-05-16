import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flower2, Truck, Sparkles, Mail, Phone, MapPin, Heart, Star, Clock, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, featuredProducts, PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";
import { useCategoryImages } from "@/store/category-images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hoa Tươi Thanh Ngọc — Boutique Florist Bình Thạnh, TP.HCM | Giao 2h" },
      { name: "description", content: "Boutique florist tại Bình Thạnh, TP.HCM. Bó hoa thiết kế riêng, giỏ hoa sang trọng, kệ hoa khai trương, lan hồ điệp cao cấp. Giao nhanh 2 giờ — kèm thiệp viết tay miễn phí. Hotline 0934 926 092." },
      { property: "og:title", content: "Hoa Tươi Thanh Ngọc — Boutique Florist Bình Thạnh" },
      { property: "og:description", content: "Boutique florist Bình Thạnh — Hoa tươi thiết kế riêng, giao nhanh trong 2 giờ. Bó hoa, giỏ hoa, kệ khai trương, lan hồ điệp." },
    ],
  }),
  component: HomePage,
});

const PROCESS_STEPS = [
  { icon: Heart, title: "Bạn chọn mẫu", desc: "Tham khảo bộ sưu tập hoặc gửi ý tưởng riêng — chúng tôi tư vấn miễn phí." },
  { icon: Sparkles, title: "Florist thiết kế", desc: "Nghệ nhân của Thanh Ngọc tỉ mỉ chọn hoa, phối màu và gói bằng tay." },
  { icon: Truck, title: "Giao tận nơi", desc: "Vận chuyển nhẹ nhàng, đảm bảo hoa tươi nguyên khi đến tay người nhận." },
  { icon: Mail, title: "Kèm thiệp yêu thương", desc: "Mỗi đơn hoa đều kèm thiệp viết tay lời chúc theo yêu cầu của bạn." },
];

const COMMITMENTS = [
  { icon: Flower2, title: "Hoa tươi mỗi ngày", desc: "Nhập hoa trực tiếp từ Đà Lạt và nguồn nhập khẩu mỗi sáng." },
  { icon: ShieldCheck, title: "Cam kết chất lượng", desc: "Không hài lòng? Đổi hoa mới trong 24h — hoàn tiền 100%." },
  { icon: Clock, title: "Giao trong 2 giờ", desc: "Nội thành TP.HCM — đặt trước 18:00, nhận trong ngày." },
  { icon: Star, title: "Thiết kế cá nhân hoá", desc: "Mỗi bó hoa là duy nhất — florist thiết kế theo phong cách bạn." },
];

function HomePage() {
  const featured = featuredProducts();
  const catImages = useCategoryImages((s) => s.images);
  useEffect(() => { useCategoryImages.persist.rehydrate(); }, []);

  return (
    <SiteLayout>
      {/* HERO — Lifestyle với overlay xanh đậm */}
      <section className="relative overflow-hidden bg-gradient-hero text-[#F5F1E8]">
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_30%,#D8B36A_0,transparent_40%),radial-gradient(circle_at_80%_70%,#D8B36A_0,transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center md:px-8 md:py-36">
          <div className="mx-auto mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#D8B36A]/60" />
            <span className="text-xs uppercase tracking-[0.35em] text-[#D8B36A]">Boutique Florist Since 2018</span>
            <span className="h-px w-12 bg-[#D8B36A]/60" />
          </div>
          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl">
            Gửi Trọn Yêu Thương
            <span className="mt-2 block italic font-medium text-[#D8B36A] md:text-5xl lg:text-5xl">Qua Từng Cánh Hoa</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-[#F5F1E8]/85 md:text-lg">
            Mỗi bó hoa tại Thanh Ngọc là một tác phẩm — được florist tỉ mỉ chọn từng đoá,<br className="hidden md:block" />
            phối từng sắc màu và gói bằng tay để gửi trọn cảm xúc của bạn.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/san-pham" className="group inline-flex items-center gap-2 rounded-full bg-[#D8B36A] px-7 py-3.5 font-medium text-[#173F35] shadow-elegant transition hover:scale-[1.02]">
              Khám Phá Bộ Sưu Tập <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center gap-2 rounded-full border border-[#F5F1E8]/40 px-7 py-3.5 font-medium text-[#F5F1E8] transition hover:bg-[#F5F1E8]/10">
              <Phone className="h-4 w-4" /> {SITE.phones[0]}
            </a>
          </div>

          {/* Trust badges dưới hero */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#F5F1E8]/70 md:mt-16 md:gap-8">
            <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" /> Hoa tươi 100%</span>
            <span className="flex items-center gap-2"><Truck className="h-3.5 w-3.5" /> Giao 2h nội thành</span>
            <span className="flex items-center gap-2"><Star className="h-3.5 w-3.5" /> 4.8★ (200+ đánh giá)</span>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="border-b border-[#DCD5C8] bg-[#F5F1E8]">
        <div className="mx-auto grid max-w-7xl gap-px bg-[#DCD5C8] md:grid-cols-4 md:px-0">
          {[
            { I: Flower2, t: "Hoa Tươi 100%", d: "Nhập từ Đà Lạt mỗi ngày" },
            { I: Truck, t: "Giao Hàng Nhanh", d: "Tận nơi trong 2 giờ" },
            { I: Sparkles, t: "Thiết Kế Riêng", d: "Theo phong cách bạn" },
            { I: Mail, t: "Thiệp Viết Tay", d: "Lời chúc yêu thương" },
          ].map((u, i) => (
            <div key={i} className="flex items-center gap-4 bg-[#F5F1E8] p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#173F35]/20 text-[#173F35]">
                <u.I className="h-5 w-5" />
              </div>
              <div>
                <div className="font-serif text-lg font-semibold text-[#1A2E28]">{u.t}</div>
                <div className="text-xs text-[#5A6B64]">{u.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES — moved up để làm điều hướng chính */}
      <section className="bg-[#E9DFD2]/50 py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#D8B36A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">Danh Mục</span>
              <span className="h-px w-8 bg-[#D8B36A]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold text-[#1A2E28] md:text-5xl">Hoa Theo Dịp</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#5A6B64]">
              Dù là sinh nhật, kỷ niệm, khai trương hay chỉ đơn giản là muốn gửi yêu thương — luôn có một bó hoa dành riêng cho bạn.
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
                  className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elegant"
                >
                  {(catImages[c.id] || sample) && (
                    <img src={catImages[c.id] || (sample ? sample.thumb : "")} alt={c.label} loading="lazy" width={400} height={533} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173F35]/90 via-[#173F35]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-[#F5F1E8]">
                    <div className="font-serif text-2xl font-semibold">{c.label}</div>
                    <div className="mt-1 text-xs text-[#F5F1E8]/80">{c.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEST SELLER */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[#D8B36A]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">Best Seller</span>
              </div>
              <h2 className="font-serif text-4xl font-semibold text-[#1A2E28] md:text-5xl">Sản Phẩm Bán Chạy</h2>
              <p className="mt-3 max-w-2xl text-[#5A6B64]">
                Những mẫu hoa được yêu thích nhất, được florist của Thanh Ngọc chọn lọc và thiết kế tinh tế.
              </p>
            </div>
            <Link to="/san-pham" className="inline-flex items-center gap-2 text-sm font-medium text-[#173F35] hover:text-[#D8B36A]">
              Xem tất cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p, i) => <ProductCard key={p.slug} product={p} eager={i < 4} />)}
          </div>
        </div>
      </section>

      {/* QUY TRÌNH ĐẶT HOA */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#D8B36A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">Cách Đặt Hoa</span>
              <span className="h-px w-8 bg-[#D8B36A]" />
            </div>
            <h2 className="font-serif text-4xl font-semibold text-[#1A2E28] md:text-5xl">Quy Trình Đơn Giản</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#5A6B64]">
              Từ ý tưởng đến tay người nhận — chỉ với 4 bước đơn giản.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="group relative rounded-3xl border border-[#DCD5C8] bg-card p-6 text-center shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#173F35]/5 text-[#173F35] transition-colors group-hover:bg-[#173F35] group-hover:text-[#F5F1E8]">
                  <step.icon className="h-7 w-7" />
                </div>
                <div className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#D8B36A] text-xs font-bold text-[#173F35]">0{i + 1}</div>
                <h3 className="mt-2 font-serif text-xl font-semibold text-[#1A2E28]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5A6B64]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAM KẾT */}
      <section className="bg-[#173F35] py-16 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <div className="mb-3 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#D8B36A]/60" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#D8B36A]">Cam Kết</span>
              <span className="h-px w-8 bg-[#D8B36A]/60" />
            </div>
            <h2 className="font-serif text-4xl font-semibold text-[#F5F1E8] md:text-5xl">Tại Sao Chọn Thanh Ngọc?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[#F5F1E8]/70">
              Hơn 7 năm đồng hành cùng hàng ngàn khách hàng — chúng tôi hiểu giá trị của từng bó hoa.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {COMMITMENTS.map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#F5F1E8]/10 bg-[#F5F1E8]/5 p-6 text-center backdrop-blur-sm transition hover:bg-[#F5F1E8]/10">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#D8B36A]/20 text-[#D8B36A]">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#F5F1E8]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F5F1E8]/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section className="bg-[#E9DFD2]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[#D8B36A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#173F35]">Liên Hệ</span>
            </div>
            <h2 className="font-serif text-4xl font-semibold text-[#1A2E28] md:text-5xl">Đặt Hoa Cho Người Thương</h2>
            <p className="mt-4 text-[#5A6B64]">
              Để lại lời nhắn — florist của Thanh Ngọc sẽ tư vấn bó hoa phù hợp nhất. Hoặc gọi/Zalo trực tiếp để được hỗ trợ ngay.
            </p>
            <div className="mt-8 space-y-4 text-sm text-[#5A6B64]">
              <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 text-[#D8B36A]" /><div>{SITE.address}</div></div>
              <div className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 text-[#D8B36A]" /><div><a href={`tel:${SITE.phones[0]}`} className="text-[#173F35] hover:text-[#D8B36A]">{SITE.phones[0]}</a> · <a href={`tel:${SITE.phones[1]}`} className="text-[#173F35] hover:text-[#D8B36A]">{SITE.phones[1]}</a></div></div>
              <div className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 text-[#D8B36A]" /><a href={`mailto:${SITE.email}`} className="text-[#173F35] hover:text-[#D8B36A]">{SITE.email}</a></div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-3xl border border-[#D8B36A]/20 bg-[#F5F1E8] p-8 shadow-soft">
            <div className="font-serif text-2xl text-[#1A2E28]">Đặt nhanh trong 1 phút</div>
            <p className="text-sm text-[#5A6B64]">Tư vấn miễn phí — báo giá ngay — giao hoa trong 2 giờ.</p>
            <a href={SITE.zalo} target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D8B36A] px-6 py-3.5 font-medium text-[#173F35] transition hover:scale-[1.02] shadow-soft">
              Chat Zalo Tư Vấn
            </a>
            <a href={`tel:${SITE.phones[0]}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#173F35]/30 px-6 py-3 font-medium text-[#173F35] transition hover:bg-[#173F35] hover:text-[#F5F1E8]">
              <Phone className="h-4 w-4" /> Gọi {SITE.phones[0]}
            </a>
            <Link to="/lien-he" className="text-center text-xs text-[#5A6B64] underline-offset-4 hover:underline">
              Hoặc gửi yêu cầu chi tiết →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}