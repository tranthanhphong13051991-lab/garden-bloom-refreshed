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
          <p className="ornament text-xs uppercase tracking-[0.35em] text-gold">Về Chúng Tôi</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold md:text-6xl">Câu Chuyện Thanh Ngọc</h1>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85">
            Mỗi đoá hoa là một câu chuyện yêu thương được kể bằng ngôn ngữ của thiên nhiên.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="font-serif text-4xl font-semibold text-foreground md:text-5xl">Tiệm hoa nhỏ tại Bình Thạnh</h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Hoa Tươi Thanh Ngọc ra đời từ tình yêu với hoa và mong muốn mang vẻ đẹp tinh tế đến từng khách hàng tại TP.HCM. Toạ lạc tại {SITE.address}, chúng tôi tự hào là người đồng hành trong mọi khoảnh khắc đáng nhớ của bạn.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Từ bó hoa sinh nhật ấm áp, giỏ hoa cưới tinh khôi, kệ hoa khai trương phú quý cho đến hoa chia buồn trang trọng — mỗi sản phẩm đều mang trọn tâm huyết của những người yêu hoa.
            </p>
          </div>
          <div className="rounded-3xl bg-cream p-10 shadow-soft">
            <p className="font-serif text-2xl italic leading-relaxed text-primary">
              "Chúng tôi không chỉ bán hoa — chúng tôi gửi gắm yêu thương, nói lời chúc, và lưu giữ những khoảnh khắc đẹp của bạn."
            </p>
            <div className="mt-6 text-sm text-muted-foreground">— Thanh Ngọc Flower's</div>
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
