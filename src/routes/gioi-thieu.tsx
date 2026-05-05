import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Award, Leaf, Users } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/gioi-thieu")({
  head: () => ({
    meta: [
      { title: "Giới Thiệu — Hoa Tươi Thanh Ngọc | Tiệm Hoa Bình Thạnh, TP.HCM" },
      { name: "description", content: "Hoa Tươi Thanh Ngọc — tiệm hoa tươi tại 8 Phan Văn Hân, Bình Thạnh. Câu chuyện về tình yêu hoa, dịch vụ tận tâm và chất lượng cam kết." },
      { property: "og:title", content: "Giới Thiệu — Hoa Tươi Thanh Ngọc" },
      { property: "og:description", content: "Câu chuyện về tiệm hoa tươi Thanh Ngọc tại Bình Thạnh, TP.HCM." },
    ],
    links: [{ rel: "canonical", href: `${SITE.domain}/gioi-thieu` }],
  }),
  component: AboutPage,
});

const values = [
  { I: Leaf, t: "Hoa Tươi Mỗi Ngày", d: "Hoa được nhập trực tiếp từ Đà Lạt và các nhà vườn uy tín, đảm bảo độ tươi và bền màu." },
  { I: Heart, t: "Tận Tâm Trong Từng Cánh Hoa", d: "Mỗi bó hoa đều được cắm thủ công với tình yêu và sự tỉ mỉ — không sản xuất hàng loạt." },
  { I: Award, t: "Chất Lượng Cam Kết", d: "Cam kết hoàn tiền nếu hoa không đạt yêu cầu. Sự hài lòng của bạn là ưu tiên cao nhất." },
  { I: Users, t: "Khách Hàng Là Bạn", d: "Tư vấn miễn phí, lắng nghe câu chuyện và thiết kế bó hoa phù hợp với từng khoảnh khắc của bạn." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-24 text-center text-primary-foreground md:py-32">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <p className="ornament text-xs uppercase tracking-[0.35em] text-gold">Câu chuyện của chúng tôi</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold md:text-6xl">Người Giữ Hồn Tiệm Hoa</h1>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
            Hơn hai mươi năm, không chỉ là hoa — đó là tình yêu, là ký ức, là những dấu mốc đời người.
          </p>
        </div>
      </section>

      {/* Phần Người Giữ Hồn Tiệm Hoa */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-col gap-16">
            {/* Cô Thanh Ngọc */}
            <div className="group overflow-hidden rounded-[2.5rem] bg-white shadow-elegant transition-all hover:shadow-2xl">
              <div className="grid md:grid-cols-12 md:items-center">
                <div className="relative aspect-square md:aspect-[4/5] overflow-hidden md:col-span-5">
                  <img 
                    src="/images/products/co-thanh-ngoc.jpg" 
                    alt="Cô Thanh Ngọc - Người sáng lập" 
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 backdrop-blur-md">
                    <span className="text-xl font-serif font-bold text-white">20+</span>
                    <span className="ml-1 text-[10px] uppercase tracking-tighter text-white/80">Năm</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-16 md:col-span-7">
                  <span className="w-fit rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">Người sáng lập</span>
                  <h3 className="mt-6 font-serif text-3xl font-semibold">Cô Thanh Ngọc</h3>
                  <p className="mt-1 text-sm italic text-muted-foreground">Người Giữ Hồn Tiệm Hoa</p>
                  <div className="my-6 h-px w-12 bg-primary/30" />
                  <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <p>Từ những buổi sáng tinh mơ ở chợ hoa Hồ Thị Kỷ, cô Thanh Ngọc đã tự tay chọn từng cành hoa — ngắm sắc, nghe hương, để chắc chắn rằng mỗi bó hoa tới tay khách đều là điều tươi đẹp nhất trong ngày của họ.</p>
                    <p>20 năm, ba thế hệ khách hàng. Có những người đặt hoa cưới từ thời còn trẻ, nay đã quay lại đặt hoa cho con gái lấy chồng. Cô Thanh Ngọc nhớ hết — vì với cô, mỗi khách hàng là một câu chuyện, mỗi bó hoa là một dấu mốc đáng nhớ.</p>
                  </div>
                  <div className="mt-8 space-y-2">
                    <span className="flex items-center text-[11px] font-medium text-primary/70">
                      <Heart className="mr-2 h-3 w-3" /> Chợ hoa Hồ Thị Kỷ
                    </span>
                    <span className="flex items-center text-[11px] font-medium text-primary/70">
                      <Heart className="mr-2 h-3 w-3" /> Ba thế hệ
                    </span>
                    <span className="flex items-center text-[11px] font-medium text-primary/70">
                      <Heart className="mr-2 h-3 w-3" /> 20 năm tận tâm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thanh Tiền */}
            <div className="group overflow-hidden rounded-[2.5rem] bg-white shadow-elegant transition-all hover:shadow-2xl">
              <div className="grid md:grid-cols-12 md:items-center">
                <div className="order-2 flex flex-col justify-center p-8 lg:p-16 md:order-1 md:col-span-7">
                  <span className="w-fit rounded-full bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gold">Thế hệ tiếp nối</span>
                  <h3 className="mt-6 font-serif text-3xl font-semibold">Thanh Tiền</h3>
                  <p className="mt-1 text-sm italic text-muted-foreground">Đôi Tay Giữ Lửa Nghề</p>
                  <div className="my-6 h-px w-12 bg-gold/30" />
                  <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <p>Lớn lên giữa hương hoa và tiếng bước chân sớm của mẹ, Thanh Tiền thấm vào mình tình yêu dành cho hoa từ khi còn nhỏ. Với anh, hoa không chỉ là hàng hoá — đó là ngôn ngữ của những cảm xúc mà ta khó nói thành lời.</p>
                    <p>Hôm nay, đôi tay ấy — đôi tay được mẹ dạy cách trân trọng từng cành hoa, từng nhuỵ hoa mong manh — đang ngày ngày tạo nên những tác phẩm nghệ thuật tươi sống.</p>
                  </div>
                  <div className="mt-8 rounded-2xl bg-cream/50 p-6 italic text-primary/80">
                    <p className="relative z-10 text-xs leading-relaxed">
                      "Mỗi bó hoa mình làm ra, mình muốn người nhận cảm nhận được — có một người đã dành cả tâm huyết cho họ."
                    </p>
                  </div>
                  <div className="mt-8 space-y-2">
                    <span className="flex items-center text-[11px] font-medium text-gold/80">
                      <Award className="mr-2 h-3 w-3" /> Nghệ thuật hoa
                    </span>
                    <span className="flex items-center text-[11px] font-medium text-gold/80">
                      <Award className="mr-2 h-3 w-3" /> Truyền thống gia đình
                    </span>
                  </div>
                </div>
                <div className="order-1 relative aspect-square md:aspect-[4/5] overflow-hidden md:order-2 md:col-span-5">
                  <img 
                    src="/images/products/thanh-tien.jpg" 
                    alt="Thanh Tiền - Thế hệ tiếp nối" 
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/40 to-transparent p-8">
                    <div className="text-center text-white">
                      <Heart className="mx-auto mb-2 h-5 w-5 fill-white" />
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Tâm Huyết</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <p className="ornament text-xs uppercase tracking-[0.35em] text-primary">Giá Trị Cốt Lõi</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Điều Chúng Tôi Tin</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.t} className="rounded-2xl border border-border bg-background p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <v.I className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-8">
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">Sẵn sàng tặng hoa?</h2>
          <p className="mt-4 text-muted-foreground">Khám phá bộ sưu tập hoặc liên hệ ngay để được tư vấn miễn phí.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/san-pham" className="rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-soft hover:bg-primary/90">Xem sản phẩm</Link>
            <Link to="/lien-he" className="rounded-full border border-primary px-7 py-3.5 font-medium text-primary hover:bg-primary hover:text-primary-foreground">Liên hệ</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
