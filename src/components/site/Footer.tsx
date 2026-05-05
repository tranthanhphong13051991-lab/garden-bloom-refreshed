import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Facebook, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { CATEGORIES } from "@/data/products";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-6 md:px-8">
        <div className="md:col-span-2 lg:col-span-2">
          <div className="font-serif text-2xl font-semibold text-primary-foreground">Thanh Ngọc Flower's</div>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
            Tiệm hoa tươi tại Bình Thạnh, TP.HCM. Mỗi đóa hoa là một câu chuyện yêu thương.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={SITE.zalo} target="_blank" rel="noopener" aria-label="Zalo" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 transition hover:bg-primary-foreground/10">
              <MessageCircle className="h-4 w-4" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 transition hover:bg-primary-foreground/10">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8">
            <img 
              src="/images/logo/bct.png" 
              alt="Đã thông báo Bộ Công Thương" 
              className="h-10 w-auto object-contain opacity-90 transition-opacity hover:opacity-100" 
            />
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-primary-foreground">Danh Mục</h3>
          <ul className="space-y-2.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to="/san-pham" search={{ cat: c.id }} className="text-primary-foreground/70 transition hover:text-primary-foreground">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-primary-foreground">Liên Kết</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground">Trang chủ</Link></li>
            <li><Link to="/san-pham" className="text-primary-foreground/70 hover:text-primary-foreground">Tất cả sản phẩm</Link></li>
            <li><Link to="/gioi-thieu" className="text-primary-foreground/70 hover:text-primary-foreground">Giới thiệu</Link></li>
            <li><Link to="/lien-he" className="text-primary-foreground/70 hover:text-primary-foreground">Liên hệ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-primary-foreground">Chính Sách</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/chinh-sach-bao-mat" className="text-primary-foreground/70 hover:text-primary-foreground">Bảo mật thông tin</Link></li>
            <li><Link to="/chinh-sach-giao-hang" className="text-primary-foreground/70 hover:text-primary-foreground">Giao hàng & Vận chuyển</Link></li>
            <li><Link to="/chinh-sach-doi-tra" className="text-primary-foreground/70 hover:text-primary-foreground">Đổi trả & Hoàn tiền</Link></li>
            <li><Link to="/chinh-sach-thanh-toan" className="text-primary-foreground/70 hover:text-primary-foreground">Hướng dẫn thanh toán</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-lg text-primary-foreground">Liên Hệ</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{SITE.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span><a href={`tel:${SITE.phones[0]}`} className="hover:text-primary-foreground">{SITE.phones[0]}</a> · <a href={`tel:${SITE.phones[1]}`} className="hover:text-primary-foreground">{SITE.phones[1]}</a></span>
            </li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${SITE.email}`} className="hover:text-primary-foreground">{SITE.email}</a></li>
            <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{SITE.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-primary-foreground/60 md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} Hoa Tươi Thanh Ngọc. Mọi quyền được bảo lưu.</div>
          <div className="flex items-center gap-4">
            <span>Thiết kế bởi Thanh Ngọc Flower's · hoatuoithanhngoc.com</span>
            <Link to="/admin" className="opacity-30 transition hover:opacity-80">⚙</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
