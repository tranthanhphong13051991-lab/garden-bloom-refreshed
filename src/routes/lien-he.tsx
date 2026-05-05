import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/lien-he")({
  head: () => ({
    meta: [
      { title: "Liên Hệ — Hoa Tươi Thanh Ngọc | Đặt Hoa Bình Thạnh, TP.HCM" },
      { name: "description", content: "Liên hệ Hoa Tươi Thanh Ngọc: 8 Phan Văn Hân, Bình Thạnh. Hotline 0934 926 092 — 0866 086 574. Email contact@hoatuoithanhngoc.com. Mở cửa 7h–21h." },
      { property: "og:title", content: "Liên Hệ — Hoa Tươi Thanh Ngọc" },
      { property: "og:description", content: "Đặt hoa tại Bình Thạnh — Hotline 0934 926 092." },
    ],
    links: [{ rel: "canonical", href: `${SITE.domain}/lien-he` }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", occasion: "", note: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Xin chào Thanh Ngọc, tôi muốn đặt hoa:\n\nHọ tên: ${form.name}\nSĐT: ${form.phone}\nDịp: ${form.occasion || "—"}\nYêu cầu: ${form.note || "—"}`,
    );
    window.location.href = `${SITE.zalo}?body=${body}`;
  };

  const items = [
    { I: MapPin, t: "Địa chỉ", c: SITE.address },
    { I: Phone, t: "Hotline", c: SITE.phones.join(" · "), href: `tel:${SITE.phones[0]}` },
    { I: Mail, t: "Email", c: SITE.email, href: `mailto:${SITE.email}` },
    { I: Clock, t: "Giờ mở cửa", c: SITE.hours },
  ];

  return (
    <SiteLayout>
      <section className="bg-cream py-16 text-center md:py-20">
        <div className="mx-auto max-w-2xl px-4 md:px-8">
          <p className="ornament text-xs uppercase tracking-[0.35em] text-primary">Liên Hệ</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold md:text-6xl">Đặt Hoa Cho Bạn</h1>
          <p className="mt-4 text-muted-foreground">
            Để lại thông tin — chúng tôi sẽ liên hệ và tư vấn bó hoa phù hợp nhất cho bạn.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-5 md:px-8">
          <aside className="space-y-5 md:col-span-2">
            {items.map((it) => (
              <div key={it.t} className="flex gap-4 rounded-2xl border border-border bg-background p-5 shadow-soft">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <it.I className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.t}</div>
                  {it.href ? (
                    <a href={it.href} className="font-serif text-lg text-foreground hover:text-primary">{it.c}</a>
                  ) : (
                    <div className="font-serif text-lg text-foreground">{it.c}</div>
                  )}
                </div>
              </div>
            ))}
            <a href={SITE.zalo} target="_blank" rel="noopener" className="flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-medium text-primary transition hover:scale-[1.02]">
              <MessageCircle className="h-4 w-4" /> Chat Zalo Ngay
            </a>
          </aside>

          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-background p-8 shadow-soft md:col-span-3">
            <h2 className="font-serif text-2xl text-primary">Gửi yêu cầu đặt hoa</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium text-foreground">Họ và tên *</span>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" />
              </label>
              <label className="block">
                <span className="text-xs font-medium text-foreground">Số điện thoại *</span>
                <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-medium text-foreground">Dịp tặng hoa</span>
              <select value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary">
                <option value="">— Chọn dịp —</option>
                <option>Sinh nhật</option>
                <option>Kỷ niệm tình yêu</option>
                <option>Đám cưới</option>
                <option>Tốt nghiệp</option>
                <option>Khai trương</option>
                <option>Chia buồn</option>
                <option>Khác</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-medium text-foreground">Yêu cầu đặc biệt</span>
              <textarea rows={4} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary" placeholder="Ví dụ: Bó hồng đỏ + giấy đen, viết thiệp chúc sinh nhật..." />
            </label>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-soft transition hover:bg-primary/90">
              <Send className="h-4 w-4" /> Gửi Đơn Đặt Hoa
            </button>
            <p className="text-center text-xs text-muted-foreground">Khi nhấn gửi, đơn sẽ được chuyển sang Zalo của tiệm để tư vấn nhanh nhất.</p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
